(function () {
    "use strict";
    /* ================================================================
       CRO Global Project JS — Arc (arcstore.co.za) (v2, status-gated)

       Core change vs v1: every experiment trigger is gated on the
       experience's status inside the Convert config (convert.data).
       A paused / stopped / draft / archived test no longer fires its
       executeExperiment push OR its DOM side effects (body classes,
       flags), no matter how many of its conditions match.

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
            /* Carried over from v1 (delegated-event helper). No registry test
               uses it today, but experiment variation code may rely on
               lib-style delegation — kept verbatim so nothing breaks. */
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
           SHARED SITE HELPERS (Arc)
           ================================================================ */

        /* PAGE EXCLUSIONS — skip tests + decorators entirely on these pages.
           NOTE: '/brands' is NOT globally excluded — CRO-12345 runs on brand
           pages. Brand-page blocking for other tests is handled inside each
           experiment's match(). (v1 did this as a top-of-file early return;
           v2 checks per run so SPA navigations respect it too.) */
        var EXCLUDED_PATHS = [
            "/arc/arc-exclusives",
            "/arc-personalisation",
            "/new-in",
            "/sales"
        ];
        var EXCLUDED_CONTAINS = ["/admin"];

        function isExcludedPage(path) {
            return EXCLUDED_PATHS.indexOf(path) !== -1 ||
                EXCLUDED_CONTAINS.some(function (sub) { return path.indexOf(sub) !== -1; });
        }

        /* strip any leftover test body classes (e.g. cro-7972,
           CRO_XXXX_Variation) from SPA navigation onto an excluded page */
        function stripLeftoverTestClasses() {
            Array.prototype.slice.call(document.body.classList).forEach(function (cls) {
                if (/^cro[-_]/i.test(cls)) document.body.classList.remove(cls);
            });
        }

        /* =====================================================
           ARC PAGE GUARD — used ONLY by CRO-12345 (brand banner).
           Other experiments keep their own page checks and are
           NOT gated by this guard.
           ===================================================== */

        function normalizeArcPath(path) {
            path = path || window.location.pathname || "/";
            path = String(path).split("?")[0].split("#")[0].toLowerCase();

            try {
                path = decodeURIComponent(path);
            } catch (e) {
                // keep original path if decode fails
            }

            // remove trailing slash except homepage
            if (path.length > 1) {
                path = path.replace(/\/+$/, "");
            }

            return path || "/";
        }

        function isArcExcludedPage(path) {
            path = normalizeArcPath(path);

            var excludedPatterns = [
                // Homepage
                /^\/$/,

                // No-touch brands
                /^\/brands\/dior(\/.*)?$/,
                /^\/dior-makeup(\/.*)?$/,
                /^\/dior-fragrance(\/.*)?$/,
                /^\/brands\/chanel(\/.*)?$/,
                /^\/chanel-makeup(\/.*)?$/,

                // Premium brands - test only after brand sign-off
                /^\/brands\/sol-de-janeiro(\/.*)?$/,
                /^\/brands\/drunk-elephant(\/.*)?$/,
                /^\/brands\/nars(\/.*)?$/,
                /^\/brands\/maison-margiela(\/.*)?$/,
                /^\/brands\/kylie-cosmetics-by-kylie-jenner(\/.*)?$/,
                /^\/brands\/dolce-gabbana(\/.*)?$/,
                /^\/brands\/bvlgari(\/.*)?$/,
                /^\/bvlgari-fragrances(\/.*)?$/,

                // Promo / campaign / deals / clearance pages
                /^\/fathers-day(\/.*)?$/,
                /^\/15-off-r1500$/,
                /^\/offers$/,
                /^\/last-of-the-best$/,

                // Checkout / cart / functional pages
                // /^\/arc\/arc-checkout(\/.*)?$/,
                // /^\/arc-checkout(\/.*)?$/,

                // PDP pages only: /products/<slug>/<id>
                /^\/products\/[^\/]+\/[^\/]+$/
            ];

            // Optional safety exclusion
            if (path.indexOf("/admin") !== -1) {
                return true;
            }

            for (var i = 0; i < excludedPatterns.length; i++) {
                if (excludedPatterns[i].test(path)) {
                    return true;
                }
            }

            return false;
        }

        function isArcAllowedListingPage(path) {
            path = normalizeArcPath(path);

            if (isArcExcludedPage(path)) {
                return false;
            }

            var allowedPatterns = [
                // Main listing/category pages
                /^\/products$/,
                /^\/makeup(\/.*)?$/,
                /^\/skincare(\/.*)?$/,
                /^\/fragrance(\/.*)?$/,
                /^\/haircare(\/.*)?$/,
                /^\/body(\/.*)?$/,
                /^\/accessories(\/.*)?$/,
                /^\/new-in(\/.*)?$/,
                /^\/arc\/arc-exclusives(\/.*)?$/,
                /^\/arc-personalisation(\/.*)?$/,

                // Standard brand pages are allowed by default,
                // except no-touch/premium brands already blocked above.
                /^\/brands\/[^\/]+(\/.*)?$/
            ];

            for (var i = 0; i < allowedPatterns.length; i++) {
                if (allowedPatterns[i].test(path)) {
                    return true;
                }
            }

            return false;
        }

        function arcPageGuard(context) {
            if (!isArcAllowedListingPage(window.location.pathname)) {
                console.log("CRO-12345 skipped — ARC excluded/not-in-scope page: " + window.location.pathname + (context ? " | " + context : ""));
                return false;
            }

            return true;
        }

        /* ================================================================
           EXPERIMENT REGISTRY
           One entry per test. flag names and experiment IDs must match the
           Convert Location JS conditions exactly — do not rename.

           v1 quirk kept verbatim in several match() functions:
           `indexOf('/brands') === -1 || indexOf('/sales') === -1` only
           excludes paths containing BOTH '/brands' AND '/sales' (OR, not
           AND). Do not "fix" without checking with the dashboard first.
           ================================================================ */

        var tests = [
            {
                ticket: "CRO-7521",
                name: "Recipe KI5 | Remove headers on PLPs | ALL",
                id: "1004200203",
                flag: "crotest_KI5_Remove_headers_on_PLPs_ALL_CRO7521",
                classes: [],
                match: function (path) {
                    return path.indexOf("/brands") === -1 || path.indexOf("/sales") === -1;
                },
                gate: function (done) {
                    lib.waitForElement("#multiForm", function () { done(true); }, 50, 20000);
                }
            },
            {
                ticket: "CRO-8143",
                name: "Recipe KI53 | Reduce visual overwhelm on Delivery page | ALL",
                id: "1004194416",
                flag: "crotest_Recipe_KI53_Reduce_visual_overwhelm",
                classes: [],
                match: function (path) { return true; }, // v1 had no URL check — element gate does the targeting
                gate: function (done) {
                    lib.waitForElement("#Block__AddressContainer", function () { done(true); }, 50, 20000);
                }
            },
            {
                ticket: "CRO-7972",
                name: "Recipe KI30.KI31.KI32.KI33.KI34 | PLP reduce distraction and improve navigation | ALL",
                id: "1004198304",
                flag: "crotest_PLP_reduce_distraction_improve_navigation_ALL_CRO7972",
                /* class is added by the experiment's variation code; v1 global
                   JS only stripped it (brand pages, see stripBrandPageTestClasses) */
                classes: ["cro-7972"],
                cleanupDelay: 600,
                match: function (path) {
                    return path.indexOf("/brands") === -1 || path.indexOf("/sales") === -1;
                },
                gate: function (done) {
                    lib.waitForElement("#multiForm", function () { done(true); }, 50, 20000);
                }
            },
            {
                ticket: "CRO-7505",
                name: "Recipe KI19 | Add conventional elements to the checkout | ALL",
                id: "1004199433",
                flag: "crotest_Recipe_KI19_checkout_ALL_CRO7505",
                classes: [],
                match: function (path) { return true; }, // v1 had no URL check — element gate does the targeting
                gate: function (done) {
                    /* body classes set by decorateCheckoutSteps() — checkout pages only */
                    lib.waitForElement(".cro_My_Bag, .cro_Delivery, .cro_Payment", function () { done(true); }, 50, 20000);
                }
            },
            {
                ticket: "CRO-12345",
                name: "AB Test | Brand banner | Move below products | ALL",
                id: "1004203197",
                flag: "crotest_AB_Test_Brand_banner_Move_below_products_ALL_CRO12345",
                /* classes are added by the variation; v1 global JS removed them
                   on non-brand / guarded pages (else-branch + SPA listener) —
                   cleanupTest reproduces both, immediately as v1 did */
                classes: ["CRP_ARC_SW_Brand_Banner_Below", "cro-12345-done"],
                cleanupDelay: 0,
                match: function (path) {
                    var currentPath = normalizeArcPath(path);
                    var isOnBrandPage = currentPath.indexOf("/brands/") === 0;
                    return isOnBrandPage && arcPageGuard("CRO-12345");
                },
                gate: function (done) {
                    lib.waitForElement("#multiForm", function () {
                        if (!arcPageGuard("CRO-12345 callback")) {
                            done(false);
                            return;
                        }
                        done(true);
                    }, 50, 20000);
                }
            },
            {
                ticket: "CRO-12370",
                name: "AB Test | PLP discovery blocks | Move below product grid | ALL",
                id: "1004203738",
                flag: "crotest_AB_Test_PLP_discovery_blocks_Move_below_product_grid_CRO12370",
                /* added by variation code; v1 global JS only stripped it on
                   brand pages (see stripBrandPageTestClasses) */
                classes: ["cro-12370"],
                cleanupDelay: 600,
                match: function (path) {
                    return path.indexOf("/brands") === -1 || path.indexOf("/sales") === -1;
                },
                gate: function (done) {
                    lib.waitForElement("#multiForm", function () { done(true); }, 50, 20000);
                }
            },
            {
                ticket: "CRO-12435",
                name: "AB Test | Mobile Nav | Bottom navigation bar | MOBILE",
                id: "1004204275",
                flag: "crotest_AB_Test_Mobile_Nav_Bottom_navigation_bar_MOBILE_CRO12435",
                classes: [],
                oncePerLoad: true, // v1: `if (window.crotest_...) return;`
                match: function (path) {
                    var currentPath = path.toLowerCase();
                    return currentPath.indexOf("checkout") === -1 &&
                        currentPath.indexOf("/default.aspx") === -1;
                }
            },
            {
                ticket: "CRO-12371",
                name: "AB Test | Sticky search bar (listing pages)",
                id: "1004202567",
                flag: "crotest_AB_Test_Sticky_search_bar_listing_pages_CRO12371",
                /* added by variation code; v1 global JS only stripped it on
                   brand pages (see stripBrandPageTestClasses) */
                classes: ["cro-12371"],
                cleanupDelay: 600,
                match: function (path) {
                    return path.indexOf("/brands") === -1 || path.indexOf("/sales") === -1;
                },
                gate: function (done) {
                    lib.waitForElement("#multiForm", function () { done(true); }, 50, 20000);
                }
            }
        ];

        /* ================================================================
           DECORATORS — site-level DOM markers / carry-overs shared by tests.
           Run regardless of experiment status.
           ================================================================ */

        /* v1 "test_checkout": mirrors the active checkout step onto <body>
           as cro_<Step_Label> (cro_My_Bag / cro_Delivery / cro_Payment).
           Not an experiment — no executeExperiment push — but CRO-7505's
           gate and experiment CSS depend on these classes. */
        function decorateCheckoutSteps() {
            try {
                var ACTIVE_CLASS = "step-bar__step--custom--active";
                var BODY_PREFIX = "cro_";
                lib.waitForElement(".step-bar--custom", function (stepBar) {
                    if (stepBar.__croStepSyncBound) return; // don't stack observers on SPA re-runs
                    stepBar.__croStepSyncBound = true;
                    var lastClass = "";
                    function syncBodyClass() {
                        try {
                            var activeStep = stepBar.querySelector("." + ACTIVE_CLASS);
                            var btn = activeStep && activeStep.querySelector("button");
                            var label = btn ? btn.textContent.trim().replace(/\s+/g, "_") : "";
                            var newClass = label ? BODY_PREFIX + label : "";

                            if (newClass === lastClass) return; // skip redundant work
                            if (lastClass) document.body.classList.remove(lastClass);
                            if (newClass) document.body.classList.add(newClass);
                            lastClass = newClass;
                        } catch (e) { /* swallow */ }
                    }

                    syncBodyClass();
                    new MutationObserver(syncBodyClass).observe(stepBar, {
                        attributes: true,
                        attributeFilter: ["class"],
                        subtree: true
                    });
                }, 50, 20000);
            } catch (e) { reportError("decorateCheckoutSteps", e); }
        }

        /* v1 carry-over: CRO-7972 / CRO-12370 / CRO-12371 each stripped their
           body class 600ms after run on ANY '/brands' page — a broader
           condition than their match() failing (which needs '/brands' AND
           '/sales'), so cleanupTest alone can't reproduce it. Kept verbatim. */
        function stripBrandPageTestClasses() {
            var currentPath = window.location.pathname;
            setTimeout(function () {
                if (currentPath.indexOf("/brands") !== -1) {
                    ["cro-7972", "cro-12370", "cro-12371"].forEach(function (cls) {
                        if (document.querySelector("." + cls)) {
                            document.querySelector("body").classList.remove(cls);
                        }
                    });
                }
            }, 600);
        }

        function runDecorators() {
            decorateCheckoutSteps();
            stripBrandPageTestClasses();
        }

        /* ================================================================
           SPA NAVIGATION LISTENER
           (replaces v1 lib.listener / __arcGlobalHistoryPatched; the v1
           listener's only job — CRO-12345 class cleanup off brand pages —
           is now handled by cleanupTest when its match() fails.)
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
            if (isExcludedPage(window.location.pathname)) {
                console.log("Global JavaScript skipped — excluded page: " + window.location.pathname);
                stripLeftoverTestClasses();
                return;
            }
            runDecorators();
            whenConvertReady(runTests);
        }

        console.log("Global JavaScript Activate (v2)");
        runAll();

        if (!window.cro_arc_globalJS) {
            window.cro_arc_globalJS = true;
            installLocationChangeListener(runAll);
        }

    } catch (e) {
        console.warn("[CRO] Error in Global JavaScript", e);
    }
})();
