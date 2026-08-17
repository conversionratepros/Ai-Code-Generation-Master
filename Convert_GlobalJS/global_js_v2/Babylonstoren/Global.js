(function () {
    "use strict";
    /* ================================================================
       CRO Global Project JS — Babylonstoren (v2, status-gated)

       Core change vs v1: every experiment trigger is gated on the
       experience's status inside the Convert config (convert.data).
       A paused / stopped / draft / archived test no longer fires its
       executeExperiment push OR its DOM side effects (body classes,
       flags), no matter how many of its conditions match.

       Every trigger passes four gates, in order:
         1. STATUS  — experience is live in convert.data (the fix)
         2. URL     — match(path) returns true
         3. ONCE    — oncePerLoad tests don't re-arm after firing
         4. GATE    — optional async condition (dataLayer, app state, DOM)

       Reusable pattern: Convert-Reference/global-js-activation-template.js
       Reference implementation: OneDayOnly/global-v2.js
       ================================================================ */

    try {

        /* ---------- debug ----------
           Activation logs always print (QA relies on them).
           Verbose logs (skips, status checks) need ?cro_debug=1
           or localStorage.cro_debug = "1". */
        var DEBUG = /(\?|&)cro_debug=1/.test(window.location.search) ||
            (function () { try { return window.localStorage.getItem("cro_debug") === "1"; } catch (e) { return false; } })();

        function log() {
            if (DEBUG && window.console) console.log.apply(console, ["[CRO]"].concat(Array.prototype.slice.call(arguments)));
        }
        function reportError(where, err) {
            if (window.console) console.warn("[CRO] error in " + where, err);
        }

        /* Bumped on every SPA navigation; async gates capture it at start and
           abort if it changed, so a slow poll can't act on the wrong page. */
        var navToken = 0;

        /* ---------- generic helpers ---------- */
        var lib = {
            waitForElement: function (selector, trigger, delayInterval, delayTimeout) {
                var interval = setInterval(function () {
                    var el = document.querySelector(selector);
                    if (el) {
                        clearInterval(interval);
                        try { trigger(el); } catch (e) { reportError("waitForElement(" + selector + ")", e); }
                    }
                }, delayInterval || 50);
                setTimeout(function () { clearInterval(interval); }, delayTimeout || 15000);
            },
            poll: function (readFn, onValue, delayInterval, delayTimeout) {
                var interval = setInterval(function () {
                    var v;
                    try { v = readFn(); } catch (e) { v = null; }
                    if (v) {
                        clearInterval(interval);
                        try { onValue(v); } catch (e) { reportError("poll callback", e); }
                    }
                }, delayInterval || 50);
                setTimeout(function () { clearInterval(interval); }, delayTimeout || 15000);
            },
            getCookie: function (name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(";");
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) === " ") c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            },
            /* Delegated event binding, carried over from v1 (unused by the
               current registry but preserved for experiment scripts that
               may call into it). */
            live: function (selector, event, callback, context) {
                function addEvent(el, type, handler) {
                    if (el.attachEvent) el.attachEvent("on" + type, handler);
                    else el.addEventListener(type, handler);
                }

                // matches polyfill
                this &&
                    this.Element &&
                    (function (ElementPrototype) {
                        ElementPrototype.matches =
                            ElementPrototype.matches ||
                            ElementPrototype.matchesSelector ||
                            ElementPrototype.webkitMatchesSelector ||
                            ElementPrototype.msMatchesSelector ||
                            function (selector) {
                                var node = this,
                                    nodes = (node.parentNode || node.document).querySelectorAll(selector),
                                    i = -1;
                                while (nodes[++i] && nodes[i] != node);
                                return !!nodes[i];
                            };
                    })(Element.prototype);

                function live(selector, event, callback, context) {
                    addEvent(context || document, event, function (e) {
                        var found,
                            el = e.target || e.srcElement;
                        while (el && el.matches && el !== context && !(found = el.matches(selector)))
                            el = el.parentElement;
                        if (found) callback.call(el, e);
                    });
                }

                live(selector, event, callback, context);
            }
        };

        /* ================================================================
           CONVERT STATUS GATE
           convert.data is the project config the snippet ships with; it can
           include paused/draft experiences (status field), and archived ones
           disappear from it entirely. Both cases must not fire.
           NOTE: config propagation via CDN takes ~5 minutes — a just-paused
           test can fire for up to that long. That lag is Convert-side.
           ================================================================ */

        /* "1" = legacy-script configs that encode active status numerically
           (s:"1"). New-script configs use status:"active" and serve ONLY
           active experiences (verified on a live project 2026-08-12) — for
           paused tests getExperienceConfig() returns null. */
        var LIVE_STATUSES = { running: 1, active: 1, live: 1, "1": 1 };

        /* QA escape hatch: a preview/force URL param naming this experiment
           bypasses the status gate so drafts stay testable. */
        function isForcedByUrl(expId) {
            var s = window.location.search;
            if (s.indexOf(expId) === -1) return false;
            return s.indexOf("_conv_eforce=") !== -1 || s.indexOf("convert_vpreview") !== -1;
        }

        function getExperienceConfig(expId) {
            try {
                var data = window.convert && window.convert.data;
                if (!data) return null;
                var list = data.experiments || data.experiences; // legacy | new script
                if (!list) return null;
                if (Array.isArray(list)) {
                    for (var i = 0; i < list.length; i++) {
                        if (String(list[i].id) === String(expId)) return list[i];
                    }
                    return null;
                }
                return list[expId] || list[String(expId)] || null;
            } catch (e) { return null; }
        }

        function isExperienceLive(expId) {
            var exp = getExperienceConfig(expId);
            if (!exp) return false;                              // absent => never fire
            var status = exp.s !== undefined ? exp.s : exp.status; // legacy `s` | new `status`
            if (status === undefined || status === null) return true; // served without status => live-only config
            return !!LIVE_STATUSES[String(status).toLowerCase()];
        }

        /* Global Project JS runs inside the snippet so convert.data normally
           already exists; the function-push is Convert's documented
           run-when-ready fallback. */
        function whenConvertReady(fn) {
            if (window.convert && window.convert.data) { fn(); return; }
            window._conv_q = window._conv_q || [];
            window._conv_q.push([fn]);
        }

        /* ================================================================
           ACTIVATION / CLEANUP RUNNER
           ================================================================ */

        var executedThisLoad = {};

        function executeTest(test) {
            if (test.flag) window[test.flag] = 1; // Location JS condition, set BEFORE the push
            window._conv_q = window._conv_q || [];
            if (executedThisLoad[test.id]) {
                /* SPA re-fire: suppress integrations so GA doesn't get a
                   duplicate experiment event (documented object form). */
                window._conv_q.push({
                    what: "executeExperiment",
                    params: { experienceId: test.id, triggerIntegrations: false }
                });
            } else {
                executedThisLoad[test.id] = true;
                window._conv_q.push(["executeExperiment", test.id]);
            }
            console.log("Experiment " + test.name + " | " + test.ticket + " Activated");
        }

        function cleanupTest(test, delayMs) {
            var wait = delayMs !== undefined ? delayMs
                : (test.cleanupDelay !== undefined ? test.cleanupDelay : 400);
            setTimeout(function () {
                try {
                    if (test.classes && test.classes.length && document.body) {
                        document.body.classList.remove.apply(document.body.classList, test.classes);
                    }
                    if (test.onCleanup) test.onCleanup();
                } catch (e) { reportError("cleanup " + test.ticket, e); }
            }, wait);
        }

        function runTests() {
            var path = window.location.pathname;
            var token = navToken;
            tests.forEach(function (test) {
                try {
                    if (!isExperienceLive(test.id) && !isForcedByUrl(test.id)) {
                        log(test.ticket + " skipped — experience " + test.id + " not live in Convert config");
                        cleanupTest(test, 0);
                        return;
                    }
                    if (!test.match(path)) { cleanupTest(test); return; }
                    if (test.oncePerLoad && window[test.flag]) return;
                    if (test.gate) {
                        test.gate(function (ok) {
                            if (token !== navToken) return; // navigated away mid-poll
                            if (ok) executeTest(test);
                            else cleanupTest(test);
                        });
                    } else {
                        executeTest(test);
                    }
                } catch (e) { reportError(test.ticket, e); }
            });
        }

        /* ================================================================
           SHARED SITE HELPERS (Babylonstoren)
           ================================================================ */

        /* CRO-12051 PDP allow-list, copied verbatim from v1. */
        var CRO12051_PDP_PATHS = [
            "/za/p/557/bitterlekker",
            "/za/p/3871/chenin-blanc-2025",
            "/za/p/4254/outydse-koekieblik-122db4",
            "/za/p/3930/beef-biltong",
            "/za/p/4774/babel-bites-bf7529",
            "/za/p/4521/babylonstoren-coffee-beans-037062",
            "/za/p/4288/classic-collective",
            "/za/p/3269/golden-gourmet",
            "/za/p/3933/blue-delft-knit-throw",
            "/za/p/3931/beef-droewors",
            "/za/p/5360/torta-di-gelato",
            "/za/p/5529/forest-raised-deep-bowl",
            "/za/p/3920/almond-coconut-seed-granola",
            "/za/p/3370/chocolate-boutique",
            "/za/p/5512/everyday-energy-c65edc",
            "/za/p/4458/fermentation-crock",
            "/za/p/4785/canola-oil",
            "/za/p/3826/delft-tablecloth",
            "/za/p/5111/nuts-about-nibbles",
            "/za/p/2699/gianduia",
            "/za/p/4942/rooibos-honeybush-kombucha-with-fresh-ginger",
            "/za/p/2492/garden-advent-calendar",
            "/za/p/2229/trio-of-tea",
            "/za/p/5065/panino-collection-pack-of-4",
            "/za/p/5478/babylonstoren-coffee-ground",
            "/za/p/5454/diving-duck-doorstop",
            "/za/p/4885/rose-garland-blanket",
            "/za/p/4171/tortoise-treasures",
            "/za/p/4238/rooibos-honeybush-kombucha",
            "/za/p/5295/oom-roelof-s-chianina-beef-lasagne-a3dc7c",
            "/za/p/5230/summer-heirloom-candle",
            "/za/p/2681/dark-chocolate-macadamia-nut-torte",
            "/za/p/5600/dried-mango-strips",
            "/za/p/5311/blissful-moment",
            "/za/p/1822/sweet-summer-bliss",
            "/za/p/5556/sweet-snack-box-4e69e5",
            "/za/p/4957/bites-of-bliss-e81246",
            "/za/p/5109/decadently-delft-8f36cf",
            "/za/p/5231/baci-di-gelato",
            "/za/p/5202/aluminium-bowl",
            "/za/p/3865/mourvedre-rose-2025",
            "/za/p/5179/caramel-espresso-moments",
            "/za/p/3845/natural-embroidered-tablecloth",
            "/za/p/4227/babel-2024",
            "/za/p/5113/simple-pleasures-1c64f4",
            "/za/p/5110/simple-spoils",
            "/za/p/5167/savoury-selection-9467f1",
            "/za/p/3350/lazy-grazing",
            "/za/p/4254/outydse-koekieblik",
            "/za/p/5178/teekoekies",
            "/za/p/5269/west-coast-fynbos-raw-honey",
            "/za/p/3846/white-embroidered-tablecloth",
            "/za/p/4692/fynbos-raw-honey",
            "/za/p/5464/lilac-delft-collage-tablecloth",
            "/za/p/4041/ladies-lounge-set",
            "/za/p/5017/chicken-curry-mild",
            "/za/p/4091/babylonstoren-book",
            "/za/p/5320/sweet-salty",
            "/za/p/5107/tuinier-fragrance-oils-exploration-set",
            "/za/p/4590/orange-dark-chocolate-malvalekkers",
            "/za/p/4959/the-orchard-offering",
            "/za/p/2197/olive-oil-trio",
            "/za/p/5575/with-love-hamper-021940",
            "/za/p/4343/summer-blues-tablecloth",
            "/za/p/23/extra-virgin-olive-oil-blend",
            "/za/p/5506/scalloped-flower-frog",
            "/za/p/4428/reusable-shopper",
            "/za/p/5184/chocolate-honeycomb-rocks"
        ];

        /* ================================================================
           EXPERIMENT REGISTRY
           One entry per test. flag names and experiment IDs must match the
           Convert Location JS conditions exactly — do not rename.
           NOTE: v1 flags use the croTest_ prefix (capital T) — kept verbatim.
           ================================================================ */

        var tests = [
            {
                ticket: "CRO-6400",
                name: "Recipe KI5 | Simplifying Product Categories and Removing Carousel | ALL",
                id: "1004172383",
                flag: "croTest_KI5_Simplifying_Product_Categories_and_Removing_Carousel_ALL_CRO6400",
                classes: [],
                /* v1 condition kept verbatim: homepage + mobile viewport. */
                match: function (path) {
                    return path === "/za" && window.innerWidth < 992;
                }
            },
            {
                ticket: "CRO-12051",
                name: "Recipe | Buy Box | PDP Buy Box Redesign | ALL",
                id: "1004196676",
                flag: "croTest_Recipe_Buy_Box_PDP_Buy_Box_Redesign_ALL_CRO12051",
                /* The experiment script (not this file) adds the CRO-12051 body
                   class and the cro-12051-* elements; v1 only stripped them on
                   non-matching pages, so classes stays [] and the strip lives
                   in onCleanup. */
                classes: [],
                cleanupDelay: 500, // v1 stripped leftovers 500ms after mismatch
                match: function (path) {
                    return CRO12051_PDP_PATHS.some(function (allowedPath) {
                        return path.indexOf(allowedPath) > -1;
                    });
                },
                onCleanup: function () {
                    if (document.querySelector(".CRO-12051")) {
                        document.querySelector("body").classList.remove("CRO-12051");
                    }
                    if (document.querySelector(".cro-12051-payment")) {
                        document.querySelector(".cro-12051-payment").remove();
                    }
                    if (document.querySelector(".cro-12051-delivery")) {
                        document.querySelector(".cro-12051-delivery").remove();
                    }
                    if (document.querySelector(".cro-12051-usp-strip")) {
                        document.querySelector(".cro-12051-usp-strip").remove();
                    }
                }
            },
            {
                ticket: "CRO-12204",
                name: "Merch Order | Hampers PLP RPV-Ranked | ALL",
                id: "1004198013",
                flag: "croTest_Merch_Order_Hampers_CRO12204",
                /* cro-007 is added by the experiment script; v1 only removed it
                   (at 800ms in the else branch, plus a duplicate 600ms
                   path-mismatch sweep — collapsed into one cleanup here). */
                classes: [],
                cleanupDelay: 800,
                match: function (path) {
                    var params = new URLSearchParams(window.location.search);
                    var sortBy = params.get("sortBy");

                    var croAllowedPaths = [
                        "/za/pl/61/categories/gifting/hampers"
                    ];

                    var isCroAllowedPath = croAllowedPaths.some(function (allowedPath) {
                        return path === allowedPath;
                    });

                    return isCroAllowedPath &&
                        sortBy !== "2" && sortBy !== "3" && sortBy !== "4" && sortBy !== "5";
                },
                onCleanup: function () {
                    if (document.querySelector(".cro-007")) {
                        document.querySelector("body").classList.remove("cro-007");
                    }
                }
            }
        ];

        /* ================================================================
           DECORATORS — site-level DOM markers shared by several tests.
           Run regardless of experiment status.
           ================================================================ */

        /* v1 test_AddingDataPath: mirror the current pathname onto <html>
           as cro-datapath (experiment CSS/JS keys off it). */
        function decorateDataPath() {
            var pathName = window.location.pathname;
            lib.waitForElement("html", function (htmlTag) {
                htmlTag.setAttribute("cro-datapath", pathName);
            }, 25, 15000);
        }

        function runDecorators() {
            decorateDataPath();
        }

        /* ================================================================
           SPA NAVIGATION LISTENER
           ================================================================ */

        function installLocationChangeListener(callback) {
            history.pushState = (function (f) {
                return function pushState() {
                    var ret = f.apply(this, arguments);
                    window.dispatchEvent(new Event("locationchange"));
                    return ret;
                };
            })(history.pushState);
            history.replaceState = (function (f) {
                return function replaceState() {
                    var ret = f.apply(this, arguments);
                    window.dispatchEvent(new Event("locationchange"));
                    return ret;
                };
            })(history.replaceState);
            window.addEventListener("popstate", function () {
                window.dispatchEvent(new Event("locationchange"));
            });
            window.addEventListener("locationchange", callback);
        }

        /* ================================================================
           BOOT
           ================================================================ */

        function runAll() {
            navToken++;
            runDecorators();
            whenConvertReady(runTests);
        }

        console.log("Global JavaScript Activate (v2)");
        runAll();

        if (!window.cro_babylonstoren_globalJS) {
            window.cro_babylonstoren_globalJS = true;
            installLocationChangeListener(runAll);
        }

    } catch (e) {
        console.warn("[CRO] Error in Global JavaScript", e);
    }
})();
