(function () {
    "use strict";
    /* ================================================================
       CRO Global Project JS — CTM / Tile Africa (v2, status-gated)
       Convert project 10041240 — Magento site.

       Core change vs v1 (Global.js in this folder): every experiment
       trigger is gated on the experience's status inside the Convert
       config (convert.data). A paused / stopped / draft / archived
       test no longer fires its executeExperiment push OR its DOM side
       effects (body classes, flags), no matter how many of its
       conditions match.

       v1 was a hybrid: 9 old-style tests (flag + push) plus two newer
       status-gated activation functions (CRO-12527 full bathroom set,
       CRO-12470 PDP Complete your bathroom) that each carried a LOCAL
       copy of the status-gate / force-URL logic. Those local copies
       are deleted here — the single shared isExperienceLive /
       isForcedByUrl pair below now gates ALL tests identically.

       Flag names and experiment IDs must match the Convert Location
       JS conditions exactly — do not rename.

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
            /* Carried over from v1 unchanged — no test in this file calls it
               today, but it was part of the CTM lib and experiment snippets
               have historically been written against it. */
            live: function (selector, event, callback, context) {
                // helper for enabling IE 8 event bindings
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
                // live binding helper using matchesSelector
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
           SHARED SITE DATA (CTM)
           ================================================================ */

        /* CRO-12527 — the 32 mapped set-component pages, ported VERBATIM
           from v1. Matched by exact PATHNAME, never the full href: the QA
           preview link carries ?utm_medium=qa, and an href equality check
           would fail on it (that trap is live in the old test_121_videos).
           No DOM sniffing here — the pathname is known before parsing, so
           this decision cannot lose a timing race. variation.js does its
           own waiting for the buy box and its own SKU-map check. */
        var CRO12527_PATHS = [
            "/tammy-white-built-in-straight-bath-without-handles-1700-x-700mm-product.html",
            "/coral-white-front-flush-toilet-suite-product.html",
            "/coral-white-built-in-straight-bath-with-handles-1700-x-700mm-product.html",
            "/coral-dual-top-flush-toilet-suite-product.html",
            "/origami-white-dual-top-flush-toilet-suite-incl-seat-product.html",
            "/bouquet-white-built-in-straight-bath-1700-x-750mm-product.html",
            "/crystaltech-inline-white-adjustable-pivot-shower-door-cte805-1000-to-1200-x-1850mm-product.html",
            "/coral-white-wall-mounted-basin-and-floor-pedestal-set-812-x-465-x-570mm-product.html",
            "/coral-avocado-built-in-straight-bath-with-handles-1700-x-700mm-product.html",
            "/crystaltech-adjustable-chrome-return-panel-ct8002-800-1020-x-1850mm-product.html",
            "/bouquet-white-dual-top-flush-toilet-suite-product.html",
            "/sarah-white-floor-mount-toilet-pan-incl-seat-product.html",
            "/coral-almond-dual-top-flush-toilet-includes-seat-be1-al051-product.html",
            "/origami-white-bath-built-in-straight-bath-1795-x-795mm-product.html",
            "/bouquet-white-wall-mounted-basin-and-pedestal-set-810-x-415-x-495mm-product.html",
            "/origami-white-wall-mounted-basin-and-floor-pedestal-set-830-x-505-x-610mm-xxwh1000bp-product.html",
            "/alson-super-white-box-urinal-incl-kit-spreader-product.html",
            "/coral-almond-builtin-straight-bath-with-handles-1700-x-700mm-aqal170003-product.html",
            "/tamara-black-wall-hung-pan-soft-close-seat-530-x-360-x-325mm-product.html",
            "/coral-avo-dual-top-flush-toilet-includes-seat-be1-av051-product.html",
            "/coral-blue-dual-top-flush-toilet-including-seat-product.html",
            "/coral-bermuda-blue-built-in-straight-bath-with-handles-1700-x-700mm-product.html",
            "/tivoli-torino-80-wall-mounted-concealed-cistern-product.html",
            "/torino-74-concealed-cistern-for-use-with-floor-mounted-toilets-product.html",
            "/coral-almond-wall-mounted-basin-and-floor-pedestal-set-812-x-465-x-570mm-product.html",
            "/coral-blue-wall-mounted-basin-and-floor-pedestal-set-812-x-465-x-570mm-product.html",
            "/tivoli-pyramid-flush-plate-black-product.html",
            "/crystaltech-inline-chrome-adjustable-pivot-shower-door-ct8006-1000-to-1200-x-1850mm-ctshps904-product.html",
            "/tivoli-capri-flush-plate-white-product.html",
            "/coral-avocado-wall-mounted-basin-570-x-465-x-182mm-be1av218-product.html",
            "/coral-avocado-pedestal-165-x-175-x-630mm-be1av318-product.html",
            "/tivoli-black-globe-flush-plate-product.html"
        ];

        /* ================================================================
           EXPERIMENT REGISTRY — one entry per manually-activated test.
           flag names and experiment IDs must match the Convert Location JS
           conditions exactly — do not rename.
           ================================================================ */

        var tests = [
            /* COMMENTED-OUT IN v1 — carried over, not active:
               // experiments.test_Recipe_KI238_KI239_KI240_KI241_Emphasizing_Tile_Calculator_Button_v4_Icon_ALL_CRO5837();
               v1 only contained this commented-out CALL — the function body,
               experiment id and flag were already deleted from the file, so
               there is nothing to register here. */
            {
                ticket: "CRO-4974",
                name: "Recipe KI211 | Buy now pay later from pricing on cart | ALL",
                id: "1004196689",
                flag: "crotest_KI211_Buy_now_pay_later",
                classes: [],
                match: function () { return window.location.href.indexOf("/checkout/cart") !== -1; }
            },
            {
                /* No CRO number in v1 — ticket derived from the flag/log line. */
                ticket: "Recipe-121-v2",
                name: "Recipe 121 (v2) | See/feel video widget | All",
                id: "1004197363",
                flag: "crotest_Recipe_121_v2_See_feel_video_widget",
                classes: [],
                match: function (path) { return path.indexOf("product.html") !== -1; },
                gate: function (done) {
                    lib.waitForElement("#calc_btn", function () { done(true); }, 25, 15000);
                }
            },
            {
                ticket: "CRO-8475",
                name: "PDP | Buy Box simplification | All",
                id: "1004198473",
                flag: "crotest_PDP_Buy_Box_simplification_All_CRO8475",
                classes: [],
                match: function (path) { return path.indexOf("product.html") !== -1; },
                gate: function (done) {
                    lib.waitForElement("#calc_btn", function () { done(true); }, 25, 15000);
                }
            },
            {
                ticket: "CRO-12301",
                name: "Recipe | PLP Card | Size Differentiation Visual Cue | ALL",
                id: "1004200512",
                flag: "crotest_PLP_Card_Size_Differentiation_Visual_Cue_ALL_CRO_12301",
                classes: [],
                match: function (path) { return path.indexOf("category") !== -1 && path.indexOf("tiles") !== -1; }
            },
            {
                /* v1 stripped body class cro-t-ctm-114-v2 (added by the
                   experiment's variation code) whenever the URL didn't match;
                   cleanupTest reproduces that via classes[]. */
                ticket: "CRO-3029",
                name: "Recipe 114 | Minimizing installation products on cart (V2) | ALL",
                id: "1004201119",
                flag: "crotest_Recipe114_Minimizing_installation_products_on_cart_V2",
                classes: ["cro-t-ctm-114-v2"],
                match: function () { return window.location.href.indexOf("/checkout/cart") !== -1; }
            },
            {
                /* Hash-based URLs — must stay on window.location.href.
                   v1 stripped body class CRO8024 (added by the experiment's
                   variation code) whenever the URL didn't match. */
                ticket: "CRO-8024",
                name: "100% form input width",
                id: "1004201296",
                flag: "crotest_100_form_input_width_CRO8024",
                classes: ["CRO8024"],
                match: function () {
                    var url = window.location.href;
                    return url.indexOf("/checkout/#customer-details-step") !== -1 || url.indexOf("/checkout/#shipping") !== -1;
                }
            },
            {
                /* v1 kept a commented-out waitForElement('#calc_btn') wrapper
                   around this push — carried over, still disabled:
                   // lib.waitForElement('#calc_btn', function () {
                   // 100463775
                   // Place your code here
                   // QA: 1004117564
                   // }, 25, 15000); */
                ticket: "CRO-3228",
                name: "Recipe 129 | Buy Now Pay later accordian | ALL",
                id: "1004203276",
                flag: "crotest_129_Buy_Now_Pay_later",
                classes: [],
                match: function (path) { return path.indexOf("product.html") !== -1; }
            },
            {
                ticket: "CRO-12302",
                name: "Dual-Image PLP (Swipe-Able Second Image)",
                id: "1004203457",
                flag: "crotest_Dual_Image_PLP_Swipe_Able_Second_Image_CRO12302",
                classes: [],
                match: function (path) { return path.indexOf("category") !== -1 && path.indexOf("tiles") !== -1; }
            },
            {
                ticket: "CRO-12299",
                name: "AB Test | PLP Mobile Quick-Filter Chip Row | MOBILE",
                id: "1004205467",
                flag: "crotest_Mobile_Quick_Filter_Chip_Row_MOBILE_CRO12299",
                classes: [],
                match: function (path) { return path.indexOf("category") !== -1 && path.indexOf("tiles") !== -1; }
            },
            {
                /* CRO-12527 — fires ONLY on the 32 mapped set-component
                   pages (CRO12527_PATHS above). v1 carried a LOCAL copy of
                   the status gate + preview/force check inside this
                   function; deleted here — the shared isExperienceLive /
                   isForcedByUrl gates in runTests() now cover it. */
                ticket: "CRO-12527",
                name: "PDP | Full bathroom set selector | ALL",
                id: "1004206570",
                flag: "crotest_PDP_Full_bathroom_set_selector_CRO12527",
                classes: [],
                match: function (path) { return CRO12527_PATHS.indexOf(path) !== -1; }
            },
            {
                /* CRO-12470 — bathroom-fixture PDPs, classified by the
                   product TITLE (no fixed URL list exists for this test).
                   The title and buy-box form are waited for with a real
                   25ms poll (15s cap) before classifying — its old location
                   condition evaluated once at script run and its
                   executeExperimentLooped retry evidently doesn't re-fire
                   reliably, so on cached loads it died before the DOM
                   existed. The classification regexes below are ported
                   VERBATIM from v1 (which ported them verbatim from the
                   location condition): reject tile/flooring pages outright,
                   strip fitting phrases (taps, toilet seats, wastes, shower
                   heads, flush plates...), then require a fixture word in
                   what remains. v1 also carried a LOCAL copy of the status
                   gate + preview/force check; deleted here — the shared
                   isExperienceLive / isForcedByUrl gates in runTests() now
                   cover it. */
                ticket: "CRO-12470",
                name: "PDP | Complete your bathroom | ALL",
                id: "1004207635",
                flag: "crotest_PDP_Complete_your_bathroom_CRO12470",
                classes: [],
                match: function (path) { return path.indexOf("product.html") !== -1; },
                gate: function (done) {
                    lib.waitForElement(".product-info-main #product_addtocart_form", function () {
                        lib.waitForElement(".page-title .base", function (el) {
                            var t = (el.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
                            if (!t) { done(false); return; }
                            if (/tile|mosaic|grout|adhesive|laminate|vinyl|carpet|\bsheet\b|cleaner|\bmat\b|sealant|\btrim\b|spacer/.test(t)) { done(false); return; }
                            var t2 = t.replace(/\b(?:(?:basin|bath|shower|sink|bidet|wall|kitchen)\s+){0,2}(?:mixer|tap|taps|spout|faucet)s?\b/g, " ")
                                .replace(/\b(?:soft\s+close\s+)?toilet\s+seat\b/g, " ")
                                .replace(/\b(?:basin|bath|shower|sink|toilet)\s+(?:waste|trap|plug)s?\b/g, " ")
                                .replace(/shower\s+(?:head|arm|column|rail|rose|tray|kit|hose)/g, " ")
                                .replace(/handshower/g, " ")
                                .replace(/\bwaste\b|bottle\s+trap|angle\s+valve|plumbers\s+tape|flush\s+plate|\bconnector\b|\bhinge\b|silicone/g, " ");
                            if (!/\bbasin\b|\btoilet\b|\bbath\b|\bshower\b|\bcabinet\b|\bvanity\b|pedestal/.test(t2)) { done(false); return; }
                            done(true);
                        }, 25, 15000);
                    }, 25, 15000);
                }
            }
        ];

        /* ================================================================
           DECORATORS — site-level DOM markers shared by several tests.
           CTM v1 Global JS had none; section kept for future use.
           ================================================================ */

        function runDecorators() {
            /* no CTM decorators */
        }

        /* ================================================================
           SPA NAVIGATION LISTENER
           (v1 defined lib.listener for this but never invoked it; this
           template listener is the working replacement. CTM is Magento —
           full page loads — so it is effectively dormant, and harmless.)
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

        if (!window.cro_ctm_globalJS) {
            window.cro_ctm_globalJS = true;
            installLocationChangeListener(runAll);
        }

    } catch (e) {
        console.warn("[CRO] Error in Global JavaScript", e);
    }
})();
