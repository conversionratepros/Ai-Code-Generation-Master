(function () {
    "use strict";
    /* ================================================================
       CRO Global Project JS — Carrol Boyes (v2, status-gated)

       Core change vs v1: every experiment trigger is gated on the
       experience's status inside the Convert config (convert.data).
       A paused / stopped / draft / archived test no longer fires its
       executeExperiment push OR its DOM side effects (body classes,
       flags), no matter how many of its conditions match.

       Ported 1:1 from the v1 Global.js in this folder — every
       executeExperiment push became one registry entry; flags and
       experiment IDs are copied verbatim (Location JS conditions in
       the Convert dashboard reference them by name).

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
            /* v1 helper (carried over verbatim) — delegated event binding
               with IE8 fallback + matches polyfill. Used by the CRO-5163
               full-width cart drawer gate. */
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
            },
            /* v1 helper (carried over) — waits for a dataLayer entry with the
               given event name. Used by the CRO-4566 in-stock punt gate. */
            waitForDataLayer: function (eventName, trigger) {
                var interval = setInterval(function () {
                    if (
                        window.dataLayer &&
                        window.dataLayer.some(function (obj) {
                            return obj.event === eventName;
                        })
                    ) {
                        clearInterval(interval);
                        try { trigger(); } catch (e) { reportError("waitForDataLayer(" + eventName + ")", e); }
                    }
                }, 50);
                setTimeout(function () {
                    clearInterval(interval);
                }, 15000);
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
           SHARED SITE HELPERS (carried over from v1)
           ================================================================ */

        /* Polls the dataLayer until an entry satisfies conditionFn, then
           calls trigger() once. Times out silently after 15s (v1 behavior:
           the experiment simply never fires). Used by the CRO-412 gate. */
        function waitForDataLayerEvent(conditionFn, trigger) {
            var interval = setInterval(function () {
                if (window.dataLayer && window.dataLayer.some(conditionFn)) {
                    clearInterval(interval);
                    try { trigger(); } catch (e) { reportError("waitForDataLayerEvent", e); }
                }
            }, 100);
            setTimeout(function () {
                clearInterval(interval);
            }, 15000);
        }

        /* ================================================================
           EXPERIMENT REGISTRY
           One entry per test. flag names and experiment IDs must match the
           Convert Location JS conditions exactly — do not rename.
           NOTE: several IDs are 9 digits — this is an older Convert
           project, they are correct as-is.
           ================================================================ */

        var tests = [
            {
                /* v1 test44 — its (commented) log line called it
                   "Experiment 144"; the flag is crotest_44. */
                ticket: "Test 44",
                name: "Test 44 | Checkout | ALL",
                id: "100497907",
                flag: "crotest_44",
                classes: [],
                match: function (path) { return window.location.href.includes("/za/checkout"); }
            },
            {
                ticket: "Recipe 25.62.130-134",
                name: "Recipe 25.62.130.131.132.133.134 | Cart Drawer",
                id: "1004163089",
                flag: "crotest_Cart_Drawer_25_62",
                classes: [],
                match: function (path) { return true; }, // v1 ran on every page, gated on element only
                gate: function (done) {
                    lib.waitForElement("a.view-za", function () {
                        done(true);
                    }, 50, 15000);
                }
            },
            {
                ticket: "Test 124",
                name: "Test 124 | Filter Restyle",
                id: "1004109298",
                flag: "crotest_124_FilterRestyle",
                classes: [],
                match: function (path) {
                    var pageUrl = window.location.href;
                    return pageUrl.includes(".html") && !pageUrl.includes("/checkout");
                },
                gate: function (done) {
                    lib.waitForElement(".catalog-category-view", function () {
                        done(true);
                    }, 50, 15000);
                }
            },
            {
                /* v1's activation log was commented out; v2's executeTest
                   logs uniformly. */
                ticket: "Recipe Cart Sidebar",
                name: "Recipe | Cart continue sidebar",
                id: "100421982",
                flag: "crotest_cartSidebar",
                classes: [],
                match: function (path) { return window.location.href.includes("/za/checkout"); }
            },
            {
                ticket: "Recipe ATF Rework",
                name: "Recipe | ATF Rework | Mobile",
                id: "1004124884",
                flag: "crotest_ATF_Rework",
                classes: [],
                match: function (path) {
                    var pageUrl = window.location.href;
                    return pageUrl.includes(".html") && !pageUrl.includes("gift-voucher-1.html");
                },
                gate: function (done) {
                    lib.waitForElement("body.catalog-product-view", function () {
                        done(true);
                    }, 50, 15000);
                }
            },
            {
                ticket: "CB-546",
                name: "UC1 | Users aren't aware of the quality of the products | All",
                id: "1004125222",
                flag: "crotest_uc1_cb_546",
                classes: [],
                match: function (path) {
                    var pageUrl = window.location.href;
                    return pageUrl.includes(".html") && !pageUrl.includes("gift-voucher-1.html");
                },
                gate: function (done) {
                    lib.waitForElement("body.catalog-product-view", function () {
                        done(true);
                    }, 50, 15000);
                }
            },
            {
                ticket: "CB-550",
                name: "Recipe 149 | Display credit payment methods on cart | All",
                id: "1004125372",
                flag: "crotest_149_credit_payment_methods",
                classes: [],
                match: function (path) { return window.location.href.includes("/za/checkout"); }
            },
            {
                ticket: "CRO-682",
                name: "Recipe 120 | v2 Replace PDP value drop downs with statements",
                id: "1004155617",
                flag: "crotest_120_dropdown_CRO682",
                classes: [],
                match: function (path) {
                    var pageUrl = window.location.href;
                    return pageUrl.includes(".html") && !pageUrl.includes("gift-voucher-1.html") && pageUrl.includes("/za");
                },
                gate: function (done) {
                    lib.waitForElement("body.catalog-product-view", function () {
                        done(true);
                    }, 50, 15000);
                }
            },
            {
                ticket: "Recipe 54.57.58.59",
                name: "Recipe 54.57.58.59 | Product collection page attention correction | All",
                id: "100421991",
                flag: "crotest_54_57_58_59_Product_collection_page",
                classes: [],
                match: function (path) { return true; }, // v1 ran on every page, gated on elements only
                gate: function (done) {
                    lib.waitForElement("a.view-za", function () {
                        lib.waitForElement("body.page-with-filter", function () {
                            done(true);
                        }, 50, 15000);
                    }, 50, 15000);
                }
            },
            {
                ticket: "CB-567",
                name: "UC1 | PLP ATF Rework | Mobile",
                id: "1004156357",
                flag: "crotest_UC1_PLP_ATF_Rework_Mobile",
                classes: ["cro-cb-567-atfRework"],
                cleanupDelay: 0, // v1 removed the class immediately on non-matching pages
                match: function (path) { return window.location.href.includes(".html"); },
                gate: function (done) {
                    lib.waitForElement(".switcher.language.switcher-language:not(#switcher-language-nav) a.view-za", function () {
                        lib.waitForElement(".catalog-category-view", function () {
                            done(true);
                        }, 50, 15000);
                        /* v1 inline cleanup: .html URL but not a category page
                           and the class is still on <body> */
                        if (!document.querySelector(".catalog-category-view") && document.querySelector(".cro-cb-567-atfRework")) {
                            document.querySelector("body").classList.remove("cro-cb-567-atfRework");
                            console.log("Removed- ATF Rework");
                        }
                    }, 50, 15000);
                }
            },
            {
                ticket: "Recipe 142",
                name: "Recipe 142 | Sitewide colour invert | All",
                id: "1004124226",
                flag: "crotest_142_Sitewide_colour_invert_All",
                classes: [],
                match: function (path) {
                    var pageUrl = window.location.href;
                    return pageUrl.includes("/") && !pageUrl.includes("/checkout");
                }
            },
            {
                ticket: "CRO-412",
                name: "Recipe | Fable USP Section | All",
                id: "1004158826",
                flag: "crotest_Fable_USP_Section_All_CRO412",
                classes: [],
                /* v1 ran on every page: fires immediately on /za mug/cup
                   URLs, otherwise waits for a productDetail dataLayer event
                   with list "Mugs" — so the URL branch lives in the gate. */
                match: function (path) { return true; },
                gate: function (done) {
                    var href = window.location.href;
                    if (!href.includes("gift-voucher-1.html") && href.includes("/za") && (href.includes("mug") || href.includes("cup"))) {
                        done(true);
                        return;
                    }
                    waitForDataLayerEvent(function (obj) {
                        return (
                            obj.event === "productDetail" &&
                            obj.ecommerce &&
                            obj.ecommerce.detail &&
                            obj.ecommerce.detail.actionField &&
                            obj.ecommerce.detail.actionField.list === "Mugs"
                        );
                    }, function () {
                        done(window.location.href.includes("/za"));
                    });
                }
            },
            {
                ticket: "KI153",
                name: "Recipe KI153 | Order Summary update | Mobile",
                id: "1004162984",
                flag: "crotest_KI153_Order_Summary_update",
                classes: [],
                match: function (path) { return window.location.href.includes("/za/checkout"); }
            },
            {
                /* NOTE: flag is cro_-prefixed (not crotest_) in v1 — keep
                   exact, the Location JS condition references this name. */
                ticket: "CRO-4566",
                name: "Recipe 70.71 | CI-Aligned In stock punt | All",
                id: "1004163747",
                flag: "cro_70_71_CI_Aligned_In_stock_punt_All_CRO4566",
                classes: [],
                oncePerLoad: true, // v1 ran this on initial load only (absent from its locationchange list)
                match: function (path) { return true; },
                gate: function (done) {
                    lib.waitForDataLayer("productDetail", function () {
                        done(true);
                    });
                }
            },
            {
                /* v1's else-branch stripped both classes off <body> whenever
                   the URL didn't match — cleanupTest now does that. */
                ticket: "KI151.KI152",
                name: "Recipe KI151.KI152 | Checkout reduce distraction & CTA standardising | ALL",
                id: "1004167209",
                flag: "crotest_KI151_KI152_Checkout_reduce_distraction",
                classes: ["RecipeCartContinue", "cro-t-ki151_ki152"],
                match: function (path) {
                    var pageUrl = window.location.href;
                    return pageUrl.includes("/za") && pageUrl.includes("#checkoutShippingCart");
                }
            },
            {
                ticket: "Recipe 50.51.53",
                name: "Recipe 50.51.53 | Deals page updates",
                id: "100498753",
                flag: "crotest_Recipe_50_51_53_Deals_page_updates",
                classes: ["test-50_51_53", "cro-test-50_51_53_larryDesign"],
                match: function (path) { return window.location.href.includes("/deals.html"); },
                gate: function (done) {
                    lib.waitForElement("a.view-za", function () {
                        done(true);
                    }, 50, 15000);
                },
                onCleanup: function () {
                    try {
                        if (window.sessionStorage.getItem("croIndex")) {
                            window.sessionStorage.removeItem("croIndex");
                        }
                    } catch (e) { }
                }
            },
            {
                ticket: "CRO-1561",
                name: "Recipe 86 | Pay sidebar | Desktop",
                id: "1004171027",
                flag: "crotest_86_Pay_sidebar_Desktop_CRO_1561",
                classes: [],
                match: function (path) { return window.location.href.includes("/za/checkout"); }
            },
            {
                ticket: "CRO-5296",
                name: "KI153 | Simplifying Side Bar Menu Categorisation (Ai) | ALL",
                id: "1004171147",
                flag: "crotest_KI153_Simplifying_Side_Bar_Menu_Categorisation_ALL_CRO_5296",
                classes: ["cro-t-sideBar-ki153"],
                cleanupDelay: 0, // v1 removed the class immediately on non-matching pages
                match: function (path) { return window.location.href.includes(".html"); },
                gate: function (done) {
                    lib.waitForElement(".switcher.language.switcher-language:not(#switcher-language-nav) a.view-za", function () {
                        lib.waitForElement(".catalog-category-view", function () {
                            done(true);
                        }, 50, 15000);
                        /* v1 inline cleanup: .html URL but not a category page
                           and the class is still on <body> */
                        if (!document.querySelector(".catalog-category-view") && document.querySelector(".cro-t-sideBar-ki153")) {
                            document.querySelector("body").classList.remove("cro-t-sideBar-ki153");
                        }
                    }, 50, 15000);
                }
            },
            {
                ticket: "CB-408",
                name: "Recipe 127 | Delivery timelines PDP & Nav | All",
                id: "1004110230",
                flag: "crotest_127_Delivery_timelines_PDP_Nav_All_CB408",
                classes: [],
                oncePerLoad: true, // v1 ran this on initial load only (absent from its locationchange list)
                match: function (path) { return true; },
                gate: function (done) {
                    lib.waitForElement("body.catalog-product-view", function () {
                        done(true);
                    }, 50, 15000);
                }
            },
            {
                ticket: "CRO-5163",
                name: "Recipe KI134.KI92.KI93.KI94.KI130.KI91.KI95.KI98 | Full width cart drawer | Mobile",
                id: "1004168181",
                flag: "crotest_Full_width_cart_drawer_Mobile",
                classes: [],
                match: function (path) { return true; }, // v1 ran on every page, gated on element only
                gate: function (done) {
                    lib.waitForElement("a.view-za", function () {
                        done(true); // push first (v1 order), then bind the click listener
                        lib.live("#top-cart-btn-checkout", "click", function () {
                            // Checkout Button Click On Cart Drawer (CRO-5163)
                            // window._conv_q = window._conv_q || [];
                            // please modify the following code to include the number of the JS Goal or click goal you have already created
                            // window._conv_q.push(["triggerConversion", "1004113658"]);
                            // console.log('----GOAL FIRE--Checkout Button Click On Cart Drawer (CRO-5163)')
                        });
                    }, 50, 15000);
                }
            },
            {
                ticket: "CRO-6452",
                name: "Recipe KI154 | Black CTA Buttons | ALL",
                id: "1004179210",
                flag: "crotest_KI154_Black_CTA_Buttons_ALL_CRO6452",
                classes: [],
                match: function (path) {
                    var pageUrl = window.location.href;
                    return !pageUrl.includes("gift-voucher-1.html") && !pageUrl.includes("/za/deals.html");
                },
                gate: function (done) {
                    lib.waitForElement("a.view-za", function () {
                        /* v1 raced two waits (PLP body class vs homepage body
                           class); whichever appears first fires — once. */
                        var fired = false;
                        function fire() {
                            if (!fired) { fired = true; done(true); }
                        }
                        lib.waitForElement("body.page-with-filter", fire, 50, 15000);
                        lib.waitForElement("body.cms-home", fire, 50, 15000);
                    }, 50, 15000);
                }
            },
            {
                ticket: "CRO-688",
                name: "Recipe 147 | 3 column PDP | Desktop",
                id: "1004133461",
                flag: "crotest_147_3_column_PDP_Desktop_CRO_688",
                classes: [],
                match: function (path) { return true; }, // v1 ran on every page, gated on element only
                gate: function (done) {
                    lib.waitForElement("body.catalog-product-view", function () {
                        done(true);
                    }, 50, 15000);
                }
            }

            /* ============================================================
               RETIRED — commented out in v1 (both call sites disabled).
               Kept for reference; re-enable by moving back into tests[].
               ============================================================

            {
                ticket: "Test 72",
                name: "Test 72 | Checkout Shipping Cart",
                id: "100486419",
                flag: "crotest_72",
                classes: [],
                match: function (path) { return window.location.href.includes("/#checkoutShippingCart"); }
            },
            {
                ticket: "Test 104",
                name: "Test 104 | Checkout Shipping",
                id: "100467255",
                flag: "crotest_104",
                classes: [],
                match: function (path) { return window.location.href.includes("#shipping"); }
            },
            {
                ticket: "Test 78",
                name: "Test 78 | Checkout Shipping Cart",
                id: "100459239",
                flag: "crotest_78",
                classes: [],
                match: function (path) { return window.location.href.includes("/#checkoutShippingCart"); }
            },
            {
                ticket: "Test 86",
                name: "Test 86 | Checkout",
                id: "100444855",
                flag: "crotest_86",
                classes: [],
                match: function (path) { return window.location.href.includes("/checkout"); }
            },
            {
                ticket: "Test 88",
                name: "Test 88 | Checkout",
                id: "100493757",
                flag: "crotest_88",
                classes: [],
                match: function (path) { return window.location.href.includes("/checkout"); }
            },
            {
                ticket: "Test 120",
                name: "Test 120 | Replace PDP value drop downs with statements",
                id: "1004102850",
                flag: "crotest_120_dropdown",
                classes: [],
                match: function (path) {
                    var pageUrl = window.location.href;
                    return pageUrl.includes(".html") && !pageUrl.includes("gift-voucher-1.html");
                },
                gate: function (done) {
                    lib.waitForElement("body.catalog-product-view", function () {
                        done(true);
                    }, 50, 15000);
                }
            },
            {
                ticket: "CB-472",
                name: "Test 145 | Gift/voucher cart updates | All",
                id: "1004112087",
                flag: "crotest_145_Gift_voucher",
                classes: [],
                match: function (path) { return window.location.href.includes("/za/checkout/"); }
            },

               ============================================================ */
        ];

        /* ================================================================
           DECORATORS — site-level DOM markers shared by several tests.
           Run regardless of experiment status (experiment CSS selectors
           depend on the attributes existing).
           ================================================================ */

        /* v1 test_AddingDataPath — cro-datapath attribute on <html> plus a
           data-cro-step marker for the hash-routed checkout steps. */
        function decorateDataPath() {
            var pathName = window.location.pathname;
            var currentURL = window.location.href;

            lib.waitForElement("html", function (htmlTag) {
                htmlTag.setAttribute("cro-datapath", pathName);

                if (currentURL.includes("#checkoutShippingCart")) {
                    htmlTag.setAttribute("data-cro-step", "cro_my_cart");
                }

                if (currentURL.includes("#shipping")) {
                    htmlTag.setAttribute("data-cro-step", "cro_delivery");
                }

                if (currentURL.includes("#payment")) {
                    htmlTag.setAttribute("data-cro-step", "cro_payment");
                }
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
                    /* v1 compatibility: variation code may listen for these */
                    window.dispatchEvent(new Event("pushstate"));
                    window.dispatchEvent(new Event("locationchange"));
                    return ret;
                };
            })(history.pushState);
            history.replaceState = (function (f) {
                return function replaceState() {
                    var ret = f.apply(this, arguments);
                    /* v1 compatibility: variation code may listen for these */
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

        if (!window.cro_carrolBoyes_globalJS) {
            window.cro_carrolBoyes_globalJS = true;
            installLocationChangeListener(runAll);
        }

    } catch (e) {
        console.warn("[CRO] Error in Global JavaScript", e);
    }
})();
