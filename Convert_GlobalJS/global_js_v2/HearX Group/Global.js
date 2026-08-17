(function () {
    "use strict";
    /* ================================================================
       CRO Global Project JS — HearX Group / lexiehearing.com (v2, status-gated)

       Core change vs v1: every experiment trigger is gated on the
       experience's status inside the Convert config (convert.data).
       A paused / stopped / draft / archived test no longer fires its
       executeExperiment push OR its DOM side effects (body classes,
       flags), no matter how many of its conditions match.

       Carried over from v1 (Convert_GlobalJS/HearX Group/Global.js):
         - host/URL exclusion guard ("CONVERT BLOCKED" early return)
         - Fullstory variant-tracking Convert callback
         - lib.live helper (no current callers, preserved)
       Note: v1 defined an SPA listener (lib.listener) but its call was
       commented out — v2 wires the template listener, so tests now
       (re)evaluate on SPA navigations as designed.

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
            /* v1 helper, preserved as-is (no current callers in this file).
               Delegated event binding with an IE-era matches polyfill. */
            live: function (selector, event, callback, context) {
                function addEvent(el, type, handler) {
                    if (el.attachEvent) el.attachEvent("on" + type, handler);
                    else el.addEventListener(type, handler);
                }
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
           SHARED SITE HELPERS (HearX / lexiehearing.com)
           ================================================================ */

        /* v1 exclusion guard — staging/preprod hosts and partner-embedded
           storefronts never run any CRO code. Conditions verbatim from v1.
           Checked once at boot (hard early return, exactly like v1) and
           re-checked on every SPA navigation inside runAll. */
        function isExcluded() {
            var currentURL = window.location.href;
            var currentHost = window.location.hostname;
            return currentHost.includes(".prod.lexiehearing.com") ||
                currentHost.includes(".staging") ||
                currentURL.includes("walgreens/us") ||
                currentURL.includes("/preprod.lexiehearing") ||
                currentURL.includes("/forbes-health/us") ||
                currentURL.includes("/ncoa/us") ||
                currentURL.includes("/hearing-tracker/us") ||
                currentURL.includes("/help-guide/us") ||
                currentURL.includes("/us/outlet-store") ||
                currentURL.includes("/us/shop-lexie-b2-plus-powered-by-bose-hearing-aids");
        }

        /* The three Lexie PDP slugs most PDP tests target — v1 checked these
           on location.href in each test; factored once, semantics identical.
           (CRO-311 uses "/us/"-prefixed variants and keeps its own inline
           condition.) */
        function isPdpHref() {
            var currentPath = window.location.href;
            return currentPath.includes("/lexie-lumen-hearing-aid") ||
                currentPath.includes("/lexie-b1-powered-by-bose-hearing-aids") ||
                currentPath.includes("/lexie-b2-plus-powered-by-bose-hearing-aids");
        }

        /* Fullstory variant tracking — registers a Convert callback that
           mirrors bucketed experiment/variant names onto the FS user.
           Verbatim from v1; registered once per page load at boot. */
        function registerFullstoryTracking() {
            window._conv_q = window._conv_q || [];
            window._conv_q.push({
                what: "callback",
                func: function () {
                    console.log("[FS Tracking] Convert callback fired");

                    if (!window.convert || !window.convert.currentData) {
                        console.log("[FS Tracking] window.convert.currentData not available - skipping");
                        return;
                    }

                    var sessionData = window.convert.currentData.experiments;
                    var expCount = sessionData ? Object.keys(sessionData).length : 0;
                    console.log("[FS Tracking] Active experiments found: " + expCount);

                    if (expCount === 0) {
                        console.log("[FS Tracking] No active experiments - nothing sent to Fullstory");
                        return;
                    }

                    if (!window.FS) {
                        console.log("[FS Tracking] window.FS not available - cannot send to Fullstory");
                        return;
                    }

                    for (var expID in sessionData) {
                        var experimentName = sessionData[expID].variation_name;
                        var experimentTitle = sessionData[expID].experiment_name;

                        console.log("[FS Tracking] Sending to Fullstory - Experiment: '" + experimentTitle + "' | Variant: '" + experimentName + "'");

                        window.FS('setProperties', {
                            type: 'user',
                            properties: {
                                last_convert_experiment: experimentTitle,
                                last_convert_variant: experimentName
                            }
                        });
                    }

                    console.log("[FS Tracking] Done - " + expCount + " experiment(s) tracked");
                }
            });
        }

        /* ================================================================
           EXPERIMENT REGISTRY
           One entry per test. flag names and experiment IDs must match the
           Convert Location JS conditions exactly — do not rename (some v1
           flags use croTest_/cro_t_ casing; kept character-for-character).
           ================================================================ */

        var tests = [
            {
                ticket: "CRO-316",
                name: "KI12.KI17.KI11 | Update reviews presentation on PDPs | All",
                id: "1004136762",
                flag: "crotest_KI12_KI17_KI11_Update_reviews",
                classes: [],
                match: function (path) { return isPdpHref(); }
            },
            {
                ticket: "KI5.UC4",
                name: "KI5.UC4 | Raise social proof elements and products section up the homepage | All",
                id: "1004139699",
                flag: "crotest_KI5_UC4_Raise_social_proof_elements",
                classes: ["cro-t-KI5"],
                cleanupDelay: 500,
                match: function (path) { return path === "/us"; },
                gate: function (done) {
                    lib.waitForElement(".us-page", function () { done(true); }, 50, 15000);
                },
                onCleanup: function () {
                    /* v1 also stripped these section-level classes */
                    ["cro-t-K15-UC4-BossImg", "cro-t-K15-UC4-comparisonCard",
                        "cro-t-K15-UC4-USBadge", "cro-t-K15-UC4-reviews"].forEach(function (cls) {
                            var el = document.querySelector("section." + cls);
                            if (el) el.classList.remove(cls);
                        });
                }
            },
            {
                ticket: "CRO-317",
                name: "Recipe UC8 | Comparison page overhaul | All",
                id: "1004137102",
                flag: "crotest_UC8_Comparison_page_CRO_317",
                classes: ["cro317"],
                cleanupDelay: 500,
                match: function (path) { return window.location.href.includes("/us/compare-hearing-aids"); }
            },
            {
                ticket: "CRO-310",
                name: "Recipe KI3.KI10.UC9 | PDP ATF Rework | All",
                id: "1004140849",
                flag: "crotest_KI3_KI10_UC9_PDP_ATF_Rework_All",
                classes: ["cro310"],
                cleanupDelay: 600,
                match: function (path) { return isPdpHref(); }
            },
            {
                /* v1 condition kept verbatim: href always contains "/", so this
                   effectively means "any page except checkout". */
                ticket: "CRO-313",
                name: "UC12 | Shop outlet clarity in navigation & on outlet page | All",
                id: "1004140793",
                flag: "crotest_UC12_Shop_outlet_clarity_CRO313",
                classes: [],
                match: function (path) {
                    var currentPath = window.location.href;
                    return currentPath.includes("/") && !currentPath.includes("/checkout");
                }
            },
            /* RETIRED — earlier UC2 variant for this SAME experience id
               (1004126724), already commented out in v1 and superseded by the
               active entry below. It lacked the "/outlet-store" match leg and
               its cleanup only removed the "cro-t-uc2-cart" body class (no
               ".cro-t-169-footer" removal). Reference only — do not restore. */
            {
                ticket: "HRXG-169",
                name: "UC2 | Cart Pop-up Clean Up | All",
                id: "1004126724",
                flag: "crotest_UC2_popup_cleanup",
                classes: ["cro-t-uc2-cart"],
                cleanupDelay: 500,
                match: function (path) {
                    return isPdpHref() || window.location.href.includes("/outlet-store");
                },
                onCleanup: function () {
                    var footer = document.querySelector(".cro-t-169-footer");
                    if (footer) footer.remove();
                }
            },
            {
                ticket: "CRO-311",
                name: "Recipe KI4.KI14 | Amazon-style product page | ALL",
                id: "1004150623",
                flag: "crotest_KI4_KI14_Amazon_style_product_page_CRO311",
                classes: ["cro311"],
                cleanupDelay: 500,
                match: function (path) {
                    var currentPath = window.location.href;
                    return currentPath.includes("/us/lexie-b2-plus-powered-by-bose-hearing-aids") ||
                        currentPath.includes("/us/lexie-b1-powered-by-bose-hearing-aids") ||
                        currentPath.includes("/us/lexie-lumen-hearing-aid");
                },
                onCleanup: function () {
                    if (window.cro311EventHandler1) window.cro311EventHandler1 = false;
                    if (window.cro311EventHandler2) window.cro311EventHandler2 = false;
                    if (window.cro311EventHandler3) window.cro311EventHandler3 = false;
                }
            },
            {
                ticket: "KI34",
                name: "Recipe KI34 | Homepage Above-the-Fold Rework during Promotional Periods | ALL",
                id: "1004152576",
                flag: "crotest_KI34_Homepage_AbovetheFold_Rework_during_Promotional_Periods",
                classes: ["croKI34"],
                cleanupDelay: 500,
                match: function (path) { return path === "/us"; },
                gate: function (done) {
                    lib.waitForElement(".us-page", function () { done(true); }, 50, 15000);
                }
            },
            {
                ticket: "CRO-314",
                name: "KI18 | Standardised CTAs Sitewide | All",
                id: "1004144460",
                flag: "crotest_KI18_Standardised_CTAs_Sitewide_All_CRO_314",
                classes: ["cro314"],
                cleanupDelay: 500,
                match: function (path) {
                    /* v1 condition verbatim (it listed the lumen slug twice;
                       deduplicated here, coverage unchanged). */
                    var currentPath = window.location.href;
                    return path === "/us" ||
                        currentPath.includes("/us/lexie-b2-plus-powered-by-bose-hearing-aids") ||
                        currentPath.includes("/us/lexie-b1-powered-by-bose-hearing-aids") ||
                        currentPath.includes("/us/lexie-lumen-hearing-aid") ||
                        currentPath.includes("/us/compare-hearing-aids");
                }
            },
            {
                /* Ticket derived from the v1 cleanup class "cro4757" — the v1
                   log line carries no ticket number for this test. */
                ticket: "CRO-4757",
                name: "Recipe KI38 | Showing USPs in Navigation Strip | Desktop",
                id: "1004157363",
                flag: "crotest_KI38_Showing_USPs_Navigation",
                classes: ["cro4757"],
                cleanupDelay: 600,
                match: function (path) {
                    var currentPath = window.location.href;
                    return currentPath.includes("/us") && !currentPath.includes("/us/checkout");
                },
                gate: function (done) {
                    /* v1 delayed the whole check + push by 600ms */
                    setTimeout(function () { done(true); }, 600);
                }
            },
            {
                ticket: "CRO-318",
                name: "Recipe KI30.KI28 | PDP hesitancy overcome | ALL",
                id: "1004158943",
                flag: "croTest_KI30_KI28_PDP_hesitancy_overcome_ALL",
                classes: ["cro318"],
                cleanupDelay: 600,
                match: function (path) { return isPdpHref(); },
                gate: function (done) {
                    /* v1 pre-push reset (variable name has a zero: cr0318event)
                       then a 400ms delay before the push. */
                    window.cr0318event = false;
                    setTimeout(function () { done(true); }, 400);
                },
                onCleanup: function () { window.cr0318event = false; }
            },
            {
                ticket: "CRO-4058",
                name: "Recipe KI34 | Move hearing test to top of hearing test page | All",
                id: "1004162955",
                flag: "croTest_KI34_Move_hearing_test",
                classes: ["cro-lexie-ki_34", "heardigits-active"],
                cleanupDelay: 600,
                match: function (path) {
                    /* v1 condition verbatim — no leading slash on the slug */
                    return window.location.href.includes("us/best-online-hearing-test");
                },
                gate: function (done) {
                    /* v1 pre-push reset then 400ms delay */
                    window.cro_t_KI34_Move_hearing_test = false;
                    setTimeout(function () { done(true); }, 400);
                },
                onCleanup: function () { window.cro_t_KI34_Move_hearing_test = false; }
            },
            {
                ticket: "CRO-5512",
                name: "Recipe KI44 | Hearing Test Promo on Homepage | ALL",
                id: "1004167206",
                flag: "cro_t_KI44_Hearing_Test_Promo_on_Homepage", /* v1 flag — not crotest_-prefixed; do not rename */
                classes: ["cro-lexie-ki44"],
                cleanupDelay: 600,
                match: function (path) { return path === "/us"; },
                gate: function (done) {
                    /* v1 resets the KI34 homepage variable here (looks like a
                       copy-paste from CRO-4058 but kept as-is) then 400ms delay */
                    window.cro_t_KI34_Move_hearing_test_homepage = false;
                    setTimeout(function () { done(true); }, 400);
                },
                onCleanup: function () { window.cro_t_KI34_Move_hearing_test_homepage = false; }
            },
            {
                /* v1 function name says CRO838, its activation log says
                   CRO-8386 — the log wins. */
                ticket: "CRO-8386",
                name: "Recipe KI60.KI62.KI66.KI76 | Increase credibility & clarity ATF on Hearing Test Page | ALL",
                id: "1004193055",
                flag: "croTest_Increase_credibility_clarity_ATF",
                classes: ["croki60"],
                cleanupDelay: 600,
                match: function (path) { return window.location.href.includes("us/best-online-hearing-test"); },
                gate: function (done) {
                    /* v1 delayed the push by 400ms */
                    setTimeout(function () { done(true); }, 400);
                },
                onCleanup: function () {
                    var trusted = document.querySelector(".croki60-trusted");
                    if (trusted) trusted.remove();
                    var accordion = document.querySelector(".croki60-accordion");
                    if (accordion) accordion.remove();
                    if (window.cro_t_croki60_animation) window.cro_t_croki60_animation = false;
                }
            }

            /* ================================================================
               RETIRED / NOT WIRED IN V1 — reference only.
               KI6, UC1 and UC3 were fully defined in v1 but never invoked by
               its boot sequence; "Sales splash deploy" had its invocation
               commented out (and its target URL is also on the exclusion
               list). None of them fired in production under v1, so none are
               registered as active here. Confirm status in the Convert
               dashboard before ever re-enabling one.

            {
                ticket: "KI6",
                name: "KI6 | Sticky add to cart | Mobile",
                id: "1004128947",
                flag: "crotest_KI6_sticky_add_to_cart",
                classes: ["cro-t-ki6-sticky"],
                cleanupDelay: 500,
                match: function (path) { return isPdpHref(); },
                onCleanup: function () {
                    var el = document.querySelector(".flex.cro-button-parent");
                    if (el) el.classList.remove("cro-button-parent");
                }
            },
            {
                ticket: "HRXG-166",
                name: "UC1 | Clean up pricing cards | All",
                id: "1004123991",
                flag: "crotest_UC1_Clean_up_pricing_cards",
                classes: [],
                match: function (path) { return path === "/us"; }
            },
            {
                ticket: "UC3",
                name: "UC3 | Product information popups",
                id: "1004124656",
                flag: "crotest_UC3_popups",
                classes: ["cro-t-uc-3"],
                cleanupDelay: 500,
                match: function (path) { return isPdpHref(); },
                onCleanup: function () {
                    ["#cro-uc-3-eligible", "#cro-uc-3-purchase",
                        ".cro-lexie-lumen-hearing-aid", ".cro-uc-3-klarnaBadge"].forEach(function (sel) {
                            var el = document.querySelector(sel);
                            if (el) el.remove();
                        });
                }
            },
            {
                ticket: "CRO-7026",
                name: "Sales splash deploy",
                id: "1004172914",
                flag: "croTest_Sales_splash_deploy",
                classes: ["cro7026"],
                cleanupDelay: 600,
                match: function (path) { return window.location.href.includes("us/shop-lexie-b2-plus-powered-by-bose-hearing-aids"); },
                gate: function (done) { setTimeout(function () { done(true); }, 400); }
            },
               ================================================================ */
        ];

        /* ================================================================
           DECORATORS — HearX v1 has no page decorators. The Fullstory
           callback registration is one-time wiring done at boot
           (registerFullstoryTracking), not a per-navigation decorator.
           ================================================================ */

        function runDecorators() {
            /* intentionally empty — no HearX site decorators in v1 */
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
            if (isExcluded()) {
                log("runAll skipped — excluded host/URL");
                return;
            }
            runDecorators();
            whenConvertReady(runTests);
        }

        /* v1 guard, kept first: on excluded hosts/URLs nothing runs at all —
           no boot log, no FS callback, no experiments, no SPA listener. */
        if (isExcluded()) {
            console.log("CONVERT BLOCKED");
            return;
        }

        console.log("Global JavaScript Activate (v2)");
        registerFullstoryTracking();
        runAll();

        if (!window.cro_hearx_globalJS) {
            window.cro_hearx_globalJS = true;
            installLocationChangeListener(runAll);
        }

    } catch (e) {
        console.warn("[CRO] Error in Global JavaScript", e);
    }
})();
