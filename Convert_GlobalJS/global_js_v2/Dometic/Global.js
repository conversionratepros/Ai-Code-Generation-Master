(function () {
    "use strict";
    /* ================================================================
       CRO Global Project JS — Dometic (v2, status-gated)

       Core change vs v1: every experiment trigger is gated on the
       experience's status inside the Convert config (convert.data).
       A paused / stopped / draft / archived test no longer fires its
       executeExperiment push OR its DOM side effects (body classes,
       flags), no matter how many of its conditions match.

       Dometic runs multiple country domains / locale prefixes
       (/en-us, /en-za, /de-de ...). All locale-specific URL and
       breadcrumb checks from v1 are preserved exactly — do not
       "simplify" them.

       Reusable pattern:
       Convert-Reference/global-js-activation-template.js
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
            /* Carried over from v1 unchanged. No current test uses it, but
               experiment variation code may call lib-style live bindings;
               kept so nothing that worked in v1 silently breaks. */
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
           EXPERIMENT REGISTRY
           One entry per test. flag names and experiment IDs must match the
           Convert Location JS conditions exactly — do not rename.

           v1 never ADDS body classes itself (variation code does), so every
           classes[] here is empty; the v1 else-branch class strips are
           ported verbatim into onCleanup so their guards survive.
           ================================================================ */

        var tests = [
            {
                ticket: "CRO-8905",
                name: "Recipe KI213.KI211.KI210.KI212 | Static USP strip and emphasis of USPs on PDP | ALL",
                id: "1004191584",
                flag: "crotest_KI213_KI211_KI210_KI212_Static_USP_strip_and_emphasis",
                classes: [],
                cleanupDelay: 600, // v1 ran this test's cleanup inside a 600ms settle timeout
                /* v1: url.includes('/en-us/product') — en-us locale only, on
                   location.href. Preserved exactly. */
                match: function (path) {
                    return window.location.href.indexOf("/en-us/product") !== -1;
                },
                /* v1 wrapped the whole test in setTimeout(600) before pushing;
                   preserved as a settle delay. No detection beyond the URL. */
                gate: function (done) {
                    setTimeout(function () { done(true); }, 600);
                },
                onCleanup: function () {
                    if (document.querySelector(".CRO_8905_Static_USP_strip")) {
                        document.querySelector("body").classList.remove("CRO_8905_Static_USP_strip");
                    }
                    if (document.querySelector(".cro_outStock")) {
                        document.querySelector("body").classList.remove("cro_outStock");
                    }
                    if (document.querySelector(".cro_activeStock")) {
                        document.querySelector("body").classList.remove("cro_activeStock");
                    }
                    if (document.querySelector(".cro_findStore")) {
                        document.querySelector("body").classList.remove("cro_findStore");
                    }
                    if (document.querySelector(".cro-rack-page")) {
                        document.querySelector("body").classList.remove("cro-rack-page");
                    }
                }
            },
            {
                ticket: "CRO-12206",
                name: "Rack PDP optimisation | All",
                id: "1004201653",
                flag: "crotest_Rack_PDP_optimisation_All_CRO12206",
                classes: [],
                cleanupDelay: 600, // v1 ran this test inside a 600ms settle timeout
                /* v1 had NO URL condition — rack-PDP detection is entirely the
                   breadcrumb wait in the gate (locale-specific hrefs for
                   en-us / en-za / de-de). Runs on every page, like v1. */
                match: function (path) { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        lib.waitForElement('.product-details nav [data-slot="breadcrumb-item"] a[href="/en-us/category/rack-systems/racks"], .product-details nav [data-slot="breadcrumb-item"] a[href="/en-za/category/rack-systems/racks"], .product-details nav [data-slot="breadcrumb-item"] a[href="/de-de/kategorie/rack-systems/racks"]', function () {
                            var sku = document.querySelector('.product-details nav [data-slot="breadcrumb-item"] a[href*="/rack-systems/racks"]');
                            done(!!sku);
                        }, 50, 15000);

                        /* v1 parallel sweeps (ported verbatim): strip the stale
                           CRO_12180_Slimline_PDP_V1 class after SPA navigation
                           onto a non-rack PDP or a non-PDP page. */
                        if (document.querySelector(".product-details") && document.querySelector(".CRO_12180_Slimline_PDP_V1") && !document.querySelector('.product-details nav [data-slot="breadcrumb-item"] a[href*="/rack-systems/racks"]')) {
                            var intervalCallAgain = setInterval(function () {
                                if (document.querySelector(".product-details") && document.querySelector(".CRO_12180_Slimline_PDP_V1") && !document.querySelector('.product-details nav [data-slot="breadcrumb-item"] a[href*="/rack-systems/racks"]')) {
                                    document.querySelector("body").classList.remove("CRO_12180_Slimline_PDP_V1");
                                    console.log("remove from Not PDP");
                                }
                            }, 400);
                            setTimeout(function () {
                                clearInterval(intervalCallAgain);
                            }, 7000);
                        }

                        if (!document.querySelector(".product-details") && document.querySelector(".CRO_12180_Slimline_PDP_V1")) {
                            document.querySelector("body").classList.remove("CRO_12180_Slimline_PDP_V1");
                        }
                    }, 600);
                },
                onCleanup: function () {
                    /* v1 "remove from PDP" branch (breadcrumb found, rack link
                       missing) + status-gate cleanup. */
                    if (document.querySelector(".CRO_12180_Slimline_PDP_V1")) {
                        document.querySelector("body").classList.remove("CRO_12180_Slimline_PDP_V1");
                        console.log("remove from PDP");
                    }
                }
            },
            {
                ticket: "CRO-12242",
                name: "Recipe | Rack PDP Conventional Gallery V1 | Desktop",
                id: "1004201578",
                flag: "crotest_Rack_PDP_Conventional_Gallery_V1_Desktop_CRO12242",
                classes: [],
                cleanupDelay: 600, // v1 cleanup ran inside setTimeout(600)
                /* v1: url.includes('/product') || url.includes('/produkt') on
                   location.href — /produkt covers the German locale. */
                match: function (path) {
                    var url = window.location.href;
                    return url.indexOf("/product") !== -1 || url.indexOf("/produkt") !== -1;
                },
                onCleanup: function () {
                    /* v1 guard preserved: only strip once off the product DOM. */
                    if (!document.querySelector(".product-details") && document.querySelector(".CRO_12334_Rack_PDP_Conventional_Gallery")) {
                        document.querySelector("body").classList.remove("CRO_12334_Rack_PDP_Conventional_Gallery");
                    }
                }
            },
            {
                ticket: "CRO-12323",
                name: "AB Test | Video USP Tiles",
                id: "1004203070",
                flag: "crotest_AB_Test_Video_USP_Tiles_CRO12323",
                classes: [],
                /* v1 had NO URL condition — targeting is purely the JSON-LD
                   product-title check in the gate. Runs on every page. */
                match: function (path) { return true; },
                gate: function (done) {
                    function getProductTitle() {
                        var scripts = document.querySelectorAll('script[type="application/ld+json"]');
                        for (var i = 0; i < scripts.length; i++) {
                            try {
                                var data = JSON.parse(scripts[i].textContent);
                                if (data["@type"] === "Product") return data.name;
                            } catch (e) { }
                        }
                        return null;
                    }

                    var title = getProductTitle();

                    var isTargetProduct = !!(title && (
                        /slim\s*pro/i.test(title) ||
                        /slim\s*sport/i.test(title) ||
                        /slimline\s*ii/i.test(title)
                    ));

                    done(isTargetProduct);
                },
                onCleanup: function () {
                    if (document.querySelector(".CRO_12323_Video_USP_Tiles")) {
                        document.querySelector("body").classList.remove("CRO_12323_Video_USP_Tiles");
                    }
                }
            },
            {
                ticket: "CRO-12443",
                name: "AB Test | Cart Pop-up | Post add-to-cart confirmation | ALL",
                id: "1004203075",
                flag: "crotest_Cart_Popup_Post_add_to_cart",
                classes: [],
                cleanupDelay: 600, // v1 cleanup ran inside setTimeout(600)
                /* v1: url.includes('/product') || url.includes('/produkt') on
                   location.href — /produkt covers the German locale. */
                match: function (path) {
                    var url = window.location.href;
                    return url.indexOf("/product") !== -1 || url.indexOf("/produkt") !== -1;
                },
                onCleanup: function () {
                    /* v1 guard preserved: only strip once off the product DOM. */
                    if (!document.querySelector(".product-details") && document.querySelector(".CRO12443")) {
                        document.querySelector("body").classList.remove("CRO12443");
                    }
                }
            }
        ];

        /* ================================================================
           DECORATORS — site-level DOM markers shared by several tests.
           Dometic v1 has none; section kept for future use.
           ================================================================ */

        function runDecorators() {
            /* no site-level decorators in Dometic v1 */
        }

        /* ================================================================
           SPA NAVIGATION LISTENER
           ================================================================ */

        function installLocationChangeListener(callback) {
            history.pushState = (function (f) {
                return function pushState() {
                    var ret = f.apply(this, arguments);
                    /* v1 also emitted "pushstate" — kept for any variation
                       code that listens for it. */
                    window.dispatchEvent(new Event("pushstate"));
                    window.dispatchEvent(new Event("locationchange"));
                    return ret;
                };
            })(history.pushState);
            history.replaceState = (function (f) {
                return function replaceState() {
                    var ret = f.apply(this, arguments);
                    /* v1 also emitted "replacestate" — kept for any variation
                       code that listens for it. */
                    window.dispatchEvent(new Event("replacestate"));
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

        if (!window.cro_dometic_globalJS) {
            window.cro_dometic_globalJS = true;
            installLocationChangeListener(runAll);
        }

    } catch (e) {
        console.warn("[CRO] Error in Global JavaScript", e);
    }
})();
