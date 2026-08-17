(function () {
    "use strict";
    /* ================================================================
       CRO Global Project JS — Front Runner USA (v2, status-gated)

       Ported 2026-08-17 from "Convert_GlobalJS/Front Runner USA/Global.js"
       (v1). Core change vs v1: every experiment trigger is gated on the
       experience's status inside the Convert config (convert.data).
       A paused / stopped / draft / archived test no longer fires its
       executeExperiment push OR its DOM side effects (body classes,
       flags), no matter how many of its conditions match.

       NOTE: this is an older Convert project — several experience IDs
       are 9 digits (e.g. 100468746). That is correct; do not pad or
       alter them.

       Template: Convert-Reference/global-js-activation-template.js
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
            /* Delegated event binding helper carried over verbatim from v1.
               No current test or decorator uses it; kept for parity so
               nothing from v1 is dropped. */
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
           SHARED SITE HELPERS (Front Runner USA / ScandiPWA)
           The site is a SPA — page type is detected from the rendered DOM
           (.ProductPage / .CategoryPage / .HomePage / main.Checkout), not
           from the URL, exactly as v1 did. v1's 600ms settle delay before
           each detection is preserved inside the gates.
           ================================================================ */

        /* Rack products (roof racks) are identified by SKU prefix on the PDP. */
        var RACK_SKU_SELECTOR = ".ProductPage .ProductActions-Attribute_type_product_sku span";
        function isRackSku(content) {
            return content.includes("KR") || content.includes("KS") || content.includes("KV");
        }

        /* ================================================================
           EXPERIMENT REGISTRY
           One entry per test. flag names and experiment IDs must match the
           Convert Location JS conditions exactly — do not rename.
           v1 had no URL conditions (except retired 158), so match() returns
           true and page detection lives in the gates.
           ================================================================ */

        var tests = [
            {
                ticket: "Prinsu",
                name: "Prinsu badges",
                id: "100468746",
                flag: "crotest_Prinsu_badges",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    /* v1: single .ProductPage check 600ms after (re)load */
                    setTimeout(function () {
                        done(!!document.querySelector(".ProductPage"));
                    }, 600);
                }
            },
            {
                ticket: "CRO-2554",
                name: "Recipe DMTC2 | Gallery Updates | ALL",
                id: "1004144900",
                flag: "crotest_DMTC2_Gallery_Updates_ALL_CRO2554",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        lib.waitForElement(".ProductPage", function () { done(true); }, 50, 5000);
                    }, 600);
                }
            },
            {
                /* Body class "cro4596" is added by the variation JS, not by
                   this file; v1 only stripped it off-PDP / on non-rack SKUs. */
                ticket: "DMTC5",
                name: "DMTC5 | USP strip & Awards PDP | All",
                id: "1004160088",
                flag: "crotest_DMTC5_USP_strip_Awards_PDP_All",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        lib.waitForElement(RACK_SKU_SELECTOR, function (sku) {
                            done(isRackSku(sku.getAttribute("content") || ""));
                        }, 50, 5000);
                        /* v1: immediate strip when the SPA has left the PDP */
                        if (!document.querySelector(".ProductPage") && document.querySelector(".cro4596") && document.body) {
                            document.body.classList.remove("cro4596");
                        }
                    }, 600);
                },
                onCleanup: function () {
                    if (document.body) document.body.classList.remove("cro4596");
                }
            },
            {
                /* Body class "cro126" is added by the variation JS; v1 only
                   stripped it off-PDP. */
                ticket: "126",
                name: "Recipe 126 | Installation USPs on PDP (Product highlights) | ALL",
                id: "1004154651",
                flag: "crotest_126_Installation_USPs_on_PDP_ALL",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        lib.waitForElement(".ProductPage", function () { done(true); }, 50, 5000);
                        /* v1: immediate strip when the SPA has left the PDP */
                        if (!document.querySelector(".ProductPage") && document.querySelector(".cro126") && document.body) {
                            document.body.classList.remove("cro126");
                        }
                    }, 600);
                },
                onCleanup: function () {
                    if (document.body) document.body.classList.remove("cro126");
                }
            },
            {
                /* Body class "cro529" + window.cro_test_529_usp are set by the
                   variation JS; v1 only reset them off-homepage. */
                ticket: "CRO-529",
                name: "Recipe 203 | Built-out vehicle finder | Desktop",
                id: "1004155821",
                flag: "crotest_203_Built_out_vehicle_finder_Desktop",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        lib.waitForElement("main.HomePage", function () { done(true); }, 50, 5000);
                        /* v1: immediate reset when the SPA has left the homepage */
                        if (!document.querySelector("main.HomePage") && document.querySelector(".cro529") && window.cro_test_529_usp) {
                            if (document.body) document.body.classList.remove("cro529");
                            window.cro_test_529_usp = false;
                        }
                    }, 600);
                },
                onCleanup: function () {
                    if (document.body) document.body.classList.remove("cro529");
                    window.cro_test_529_usp = false;
                }
            }

            /* ============================================================
               RETIRED / DISABLED experiments — their activation calls were
               already commented out in v1. Carried over as commented-out
               registry entries; uncomment an entry to re-enable it.
               ============================================================ */

            /* RETIRED — Test 128 (v1 experiments.test128, call disabled)
            , {
                ticket: "128",
                name: "Test 128",
                id: "100455397",
                flag: "crotest_128",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        done(!!document.querySelector(".ProductPage"));
                    }, 600);
                }
            }
            */

            /* RETIRED — Test 47.12 (v1 experiments.test47_12, call disabled)
            , {
                ticket: "47.12",
                name: "Test 47.12",
                id: "100457631",
                flag: "crotest_47_12",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        done(!!document.querySelector(".HomePage"));
                    }, 600);
                }
            }
            */

            /* RETIRED — Test 112 (v1 experiments.test112, call disabled)
               v1 stripped body class "recipe-112-t-1" off-category, but
               called classList.remove(".recipe-112-t-1") with a leading
               dot (a no-op bug) — fixed in this port.
            , {
                ticket: "112",
                name: "Test 112",
                id: "100459266",
                flag: "crotest_112",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        lib.waitForElement(".CategoryPage", function () { done(true); }, 50, 5000);
                        if (!document.querySelector(".CategoryPage") && document.querySelector(".recipe-112-t-1") && document.body) {
                            document.body.classList.remove("recipe-112-t-1");
                        }
                    }, 600);
                },
                onCleanup: function () {
                    if (document.body) document.body.classList.remove("recipe-112-t-1");
                }
            }
            */

            /* RETIRED — Test 129 (v1 experiments.test129, call disabled)
            , {
                ticket: "129",
                name: "Test 129",
                id: "100447139",
                flag: "crotest_129",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        done(!!document.querySelector(".ProductPage"));
                    }, 600);
                }
            }
            */

            /* RETIRED — Test 68.131 (v1 experiments.test68_131, call disabled)
            , {
                ticket: "68.131",
                name: "Test 68.131",
                id: "100447612",
                flag: "crotest_68_131",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        done(!!document.querySelector(".ProductPage"));
                    }, 600);
                }
            }
            */

            /* RETIRED — Test 104_106 (v1 experiments.test104_106, call disabled)
               NOTE v1 fired this on every page EXCEPT checkout.
            , {
                ticket: "104_106",
                name: "Test 104_106",
                id: "100472878",
                flag: "crotest_104_106",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        done(!document.querySelector("main.Checkout"));
                    }, 600);
                }
            }
            */

            /* RETIRED — Test 137_139 (v1 experiments.test137_139, call disabled)
            , {
                ticket: "137_139",
                name: "Test 137_139",
                id: "100462292",
                flag: "crotest_137_139",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        lib.waitForElement("main.Checkout", function () { done(true); }, 50, 5000);
                    }, 600);
                }
            }
            */

            /* RETIRED — Test 120 (v1 experiments.test120, call disabled)
            , {
                ticket: "120",
                name: "Test 120",
                id: "100442775",
                flag: "crotest_120",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        var el = document.querySelector("section[aria-label*='Main'] .ProductActions [itemprop='sku']");
                        var sku = el ? el.getAttribute("content") : "none";
                        done(!!document.querySelector(".ProductPage") && /^(KR)/i.test(sku));
                    }, 600);
                }
            }
            */

            /* RETIRED — Test 111 (v1 experiments.test111, call disabled)
               Body class "recipe-t-1-warranty" is added by the variation JS;
               v1 only stripped it off-PDP.
            , {
                ticket: "111",
                name: "Test 111",
                id: "100464867",
                flag: "crotest_111",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        lib.waitForElement(RACK_SKU_SELECTOR, function (sku) {
                            done(isRackSku(sku.getAttribute("content") || ""));
                        }, 50, 5000);
                        if (!document.querySelector(".ProductPage") && document.querySelector(".recipe-t-1-warranty") && document.body) {
                            document.body.classList.remove("recipe-t-1-warranty");
                        }
                    }, 600);
                },
                onCleanup: function () {
                    if (document.body) document.body.classList.remove("recipe-t-1-warranty");
                }
            }
            */

            /* RETIRED — 163 | Place video in PDP (v1 experiments.test_163_Video_PDP, call disabled)
            , {
                ticket: "163",
                name: "163 | Place video in PDP",
                id: "1004100566",
                flag: "crotest_163_Video_PDP",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        lib.waitForElement('.ProductPage .ProductActions > [content*="Slimline II"],.ProductPage .ProductActions > [content*="Slimpro"],.ProductPage .ProductActions > [content*="Slimsport"],.ProductPage .ProductActions > [content*="Pro Bed System"]', function () {
                            done(true);
                        }, 50, 5000);
                    }, 600);
                }
            }
            */

            /* RETIRED — 159_160 | PLP product card cleanup (v1 experiments.test159_160, call disabled)
               v1 stripped body class "recipe_159-160" off-category, with the
               same leading-dot classList.remove bug as Test 112 — fixed here.
            , {
                ticket: "159_160",
                name: "159_160 | PLP product card cleanup",
                id: "100497849",
                flag: "crotest_159_160",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        lib.waitForElement(".CategoryPage", function () { done(true); }, 50, 5000);
                        if (!document.querySelector(".CategoryPage") && document.querySelector(".recipe_159-160") && document.body) {
                            document.body.classList.remove("recipe_159-160");
                        }
                    }, 600);
                },
                onCleanup: function () {
                    if (document.body) document.body.classList.remove("recipe_159-160");
                }
            }
            */

            /* RETIRED — FR-607 | Dometic PLP header intro text | Mobile
               (v1 experiments.test_Dometic_PLP_header_intro_text_Mobile, call
               disabled). v1 also carried an already-commented cleanup block
               removing ".cro-t-607-dometicHeader" and body class "cro-fr-607".
            , {
                ticket: "FR-607",
                name: "Recipe | Dometic PLP header intro text | Mobile",
                id: "1004119027",
                flag: "crotest_607",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        lib.waitForElement(".CategoryPage", function () { done(true); }, 50, 5000);
                    }, 600);
                }
            }
            */

            /* RETIRED — FR-590 | UC1 Mobile users have no filters on PLPs
               (v1 experiments.test_UC1_Mobile_users_have_no_filters_on_PLPs_Mobile,
               call disabled)
            , {
                ticket: "FR-590",
                name: "UC1 | Mobile users have no filters on PLPs | Mobile",
                id: "1004121896",
                flag: "crotest_Mobile_filters",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        lib.waitForElement(".CategoryPage", function () { done(true); }, 50, 5000);
                    }, 600);
                }
            }
            */

            /* RETIRED — Pill sub-cat horizontally scrollable | Mobile
               (v1 experiments.test_Pill_sub_cat_horizontally_scrollable, call
               disabled). Body class "cro-t-pill-subcats" is added by the
               variation JS; v1 stripped it if the sub-cat link disappeared.
            , {
                ticket: "Pill",
                name: "Recipe | Pill sub-cat horizontally scrollable | Mobile",
                id: "1004124287",
                flag: "crotest_Pill",
                classes: [],
                match: function () { return true; },
                gate: function (done) {
                    setTimeout(function () {
                        lib.waitForElement(".CategoryPage .CategoryName .CategoryNameLink", function () {
                            setTimeout(function () {
                                if (!document.querySelector(".CategoryPage .CategoryName .CategoryNameLink") &&
                                    document.querySelector(".cro-t-pill-subcats") && document.body) {
                                    document.body.classList.remove("cro-t-pill-subcats");
                                }
                                lib.waitForElement(".CategoryPage", function () { done(true); }, 50, 5000);
                            }, 600);
                        }, 50, 5000);
                    }, 800);
                },
                onCleanup: function () {
                    if (document.body) document.body.classList.remove("cro-t-pill-subcats");
                }
            }
            */

            /* RETIRED — CRO-531 | Recipe 158 Rollback Test for Mini Cart | ALL
               (v1 experiments.test_158_Rollback_Test_for_Mini_Cart_ALL_CRO_531,
               call disabled). Match kept verbatim from v1, including its bug:
               indexOf("/checkout") returns -1 (truthy) when absent, so the
               second clause only fails when the href STARTS with "/checkout".
               v1 had no 600ms delay and no gate on this one.
            , {
                ticket: "CRO-531",
                name: "Recipe 158 | Rollback Test for Mini Cart | ALL",
                id: "1004135620",
                flag: "crotest_158_Rollback_Test",
                classes: [],
                match: function () {
                    return window.location.href.includes("/us/") && window.location.href.indexOf("/checkout");
                }
            }
            */
        ];

        /* ================================================================
           DECORATORS — site-level DOM markers shared by several tests.
           Run regardless of experiment status.
           ================================================================ */

        /* v1 "globalTest" — not an experiment: tags rack-SKU PDPs (KR/KS/KV)
           with body class "cro-rack" and strips it everywhere else;
           experiment CSS keys off this class. Ported near-verbatim. */
        function decorateRackClass() {
            setTimeout(function () {
                lib.waitForElement(RACK_SKU_SELECTOR, function () {
                    var sku = document.querySelector(RACK_SKU_SELECTOR);
                    if (sku) {
                        var strng = sku.getAttribute("content") || "";
                        if (isRackSku(strng)) {
                            document.body.classList.add("cro-rack");
                        } else if (document.querySelector(".cro-rack")) {
                            document.body.classList.remove("cro-rack");
                        }
                    } else if (document.querySelector(".cro-rack")) {
                        document.body.classList.remove("cro-rack");
                    }
                }, 50, 5000);

                if (!document.querySelector(".ProductPage") && document.querySelector(".cro-rack")) {
                    document.body.classList.remove("cro-rack");
                }
            }, 600);
        }

        function runDecorators() {
            decorateRackClass();
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

        if (!window.cro_frontRunnerUSA_globalJS) {
            window.cro_frontRunnerUSA_globalJS = true;
            installLocationChangeListener(runAll);
        }

    } catch (e) {
        /* v1 swallowed the error object — always keep it visible */
        console.warn("[CRO] Error in Global JavaScript", e);
    }
})();
