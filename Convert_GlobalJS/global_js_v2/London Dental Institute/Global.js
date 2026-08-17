(function () {
    "use strict";
    /* ================================================================
       CRO Global Project JS — London Dental Institute (v2, status-gated)

       Core change vs v1: every experiment trigger is gated on the
       experience's status inside the Convert config (convert.data).
       A paused / stopped / draft / archived test no longer fires its
       executeExperiment push OR its DOM side effects (flags), no
       matter how many of its conditions match.

       Ported from: Convert_GlobalJS/London Dental Institute/Global.js
       Template:    Convert-Reference/global-js-activation-template.js
       Reference:   OneDayOnly/global-v2.js

       v1 notes carried forward:
       - v1's own SPA re-activation (lib.listener(activateExpOnPageChange))
         was commented out — experiments only fired on the initial load.
         v2 installs the standard locationchange listener; the status /
         URL / once gates make re-runs safe (LDI is a WordPress site, so
         history-API navigations are rare anyway).
       - 6 experiments existed in v1 only as functions whose invocations
         were commented out — they are carried over below as RETIRED
         commented-out registry entries.
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
            /* Delegated event binding — carried over verbatim (ES5-ified)
               from v1 lib. Not referenced inside this file, but kept in case
               experiment-level code or Convert goals rely on the pattern. */
            live: function (selector, event, callback, context) {
                function addEvent(el, type, handler) {
                    if (el.attachEvent) el.attachEvent("on" + type, handler);
                    else el.addEventListener(type, handler);
                }
                // matches polyfill (IE)
                if (window.Element) {
                    (function (ElementPrototype) {
                        ElementPrototype.matches =
                            ElementPrototype.matches ||
                            ElementPrototype.matchesSelector ||
                            ElementPrototype.webkitMatchesSelector ||
                            ElementPrototype.msMatchesSelector ||
                            function (sel) {
                                var node = this,
                                    nodes = (node.parentNode || node.document).querySelectorAll(sel),
                                    i = -1;
                                while (nodes[++i] && nodes[i] != node);
                                return !!nodes[i];
                            };
                    })(Element.prototype);
                }
                addEvent(context || document, event, function (e) {
                    var found,
                        el = e.target || e.srcElement;
                    while (el && el.matches && el !== context && !(found = el.matches(selector)))
                        el = el.parentElement;
                    if (found) callback.call(el, e);
                });
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
           active experiences — for paused tests getExperienceConfig()
           returns null. */
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
           SHARED SITE HELPERS (LDI)
           The three course-page paths repeat across most tests. v1 was
           inconsistent about trailing slashes and pathname-vs-href — both
           variants are kept EXACTLY as v1 checked them:
             - isCoursePageStrict: trailing slash on the first two paths
               (used by the tests that checked '/…-orthopaedics/', '/…-dentistry/')
             - isCoursePage: no trailing slashes
           Each registry entry passes in the same string v1 used
           (window.location.pathname via `path`, or window.location.href).
           ================================================================ */

        function isCoursePage(str) {
            return str.indexOf("/orthodontics-dentofacial-orthopaedics") !== -1 ||
                str.indexOf("/aesthetic-restorative-dentistry") !== -1 ||
                str.indexOf("/dental-implantology-oral-surgery") !== -1;
        }

        function isCoursePageStrict(str) {
            return str.indexOf("/orthodontics-dentofacial-orthopaedics/") !== -1 ||
                str.indexOf("/aesthetic-restorative-dentistry/") !== -1 ||
                str.indexOf("/dental-implantology-oral-surgery") !== -1;
        }

        /* ================================================================
           EXPERIMENT REGISTRY
           One entry per test. flag names and experiment IDs must match the
           Convert Location JS conditions exactly — do not rename.
           NOTE: some IDs are 9 digits (older experiences) — that is normal,
           copied character-for-character from v1.
           ================================================================ */

        var tests = [
            {
                ticket: "LDI-176",
                name: "Recipe 51 | Course page functional design | All",
                id: "1004118419",
                flag: "crotest_51_Course_page",
                classes: [],
                match: function (path) { return isCoursePageStrict(path); }
            },
            {
                ticket: "CRO-652",
                name: "Recipe 57.58.59 | Dental courses restructure | ALL",
                id: "1004140883",
                flag: "crotest_57_58_59_Dental_courses",
                classes: [],
                /* v1 checked location.href, not pathname — kept verbatim */
                match: function (path) { return window.location.href.indexOf("/dental-courses") !== -1; }
            },
            {
                ticket: "LDI-237",
                name: "Recipe 21.32 | In-person training clarity | All",
                id: "1004132390",
                flag: "crotest_person_training_clarity21_32",
                classes: [],
                match: function (path) { return isCoursePageStrict(path); }
            },
            {
                ticket: "LDI-233",
                name: "54.55.56 | Registration Page Guidance | All",
                id: "1004127508",
                flag: "crotest_Registration_Page_Guidance_All_LDI_233",
                classes: [],
                match: function (path) {
                    return path.indexOf("-registration") !== -1 ||
                        path.indexOf("-registration-step-02") !== -1 ||
                        path.indexOf("/membership-checkout") !== -1;
                }
            },
            {
                ticket: "KI80.KI81",
                name: "Recipe KI80.KI81 | VLE Page Redesign and Navigation Integration | ALL",
                id: "1004151142",
                flag: "crotest_KI80_KI81_VLE_Page_Redesign_and_Navigation_Integration",
                classes: [],
                /* v1: window.location.href.includes('/') — effectively
                   site-wide; kept verbatim, do not "fix" */
                match: function (path) { return window.location.href.indexOf("/") !== -1; }
            },
            {
                ticket: "KI82",
                name: "Recipe KI82 | Enhancing Course Page with VLE Product and Video Section | ALL",
                id: "1004155618",
                flag: "crotest_KI82_Enhancing_Course_Page_with_VLE_Product_and_Video_Section_ALL",
                classes: [],
                /* v1 checked location.href — kept verbatim */
                match: function (path) { return isCoursePage(window.location.href); }
            },
            {
                ticket: "CRO-5194",
                name: "Recipe 57.58.59 | Dental courses restructure (v2) | ALL",
                id: "1004162981",
                flag: "crotest_57_58_59_Dental_courses_v2",
                classes: [],
                /* v1 checked location.href — kept verbatim */
                match: function (path) { return window.location.href.indexOf("/dental-courses") !== -1; }
            },
            {
                ticket: "CRO-5386",
                name: "Recipe KI103 | Adding PDP section with prospectus download | ALL",
                id: "1004164274",
                flag: "crotest_KI103_Adding_PDP_section_with_prospectus_download_ALL_CRO_5386",
                classes: [],
                /* v1 checked location.href — kept verbatim */
                match: function (path) { return isCoursePage(window.location.href); }
            },
            {
                ticket: "CRO-5404",
                name: "Recipe KI105.KI96 | Emphasizing who LDI is for | ALL",
                id: "1004167234",
                flag: "crotest_KI105_KI96_Emphasizing_who_LDI_is_for_ALL_CRO5404",
                classes: [],
                /* v1 checked location.href — kept verbatim */
                match: function (path) { return isCoursePage(window.location.href); }
            },
            {
                ticket: "CRO-5660",
                name: "Recipe KI82 | Enhancing Course Page with VLE Product and Video Section (v2) | ALL",
                id: "1004169196",
                flag: "crotest_KI82_Enhancing_Course_Page_with_VLE_Product_and_Video_Section_v2_ALL_CRO5660",
                classes: [],
                /* v1 checked location.href — kept verbatim */
                match: function (path) { return isCoursePage(window.location.href); }
            },
            {
                ticket: "CRO-6073",
                name: "Recipe KI112 | 'Register your interest' CTA | ALL",
                id: "1004174300",
                flag: "crotest_Register_your_interest_CTA",
                classes: [],
                match: function (path) {
                    return path === "/" ||
                        path.indexOf("/dental-courses") !== -1 ||
                        isCoursePage(path);
                }
            },
            {
                ticket: "CRO-6683",
                name: "Recipe KI122.KI121 | Mentor Highlight and Improved Imagery on Homepage | ALL",
                id: "1004174814",
                flag: "crotest_Improved_Imagery_on_Homepage",
                classes: [],
                match: function (path) { return path === "/"; }
            },
            {
                ticket: "CRO-7818",
                name: "Recipe KI108 | Change “Enrol now” to “Apply now” | ALL",
                id: "1004175845",
                flag: "crotest_Recipe_KI108_Change_CTA",
                classes: [],
                match: function (path) { return isCoursePage(path); }
            },
            {
                ticket: "CRO-6922",
                name: "Recipe KI130 | Add urgency by emphasizing instant access | ALL",
                id: "1004182178",
                flag: "crotest_KI130_Add_urgency_by_emphasizing_instant_access_ALL_CRO6922",
                classes: [],
                match: function (path) { return path === "/" || isCoursePage(path); }
            },
            {
                ticket: "CRO-8171",
                name: "Recipe KI138 | ATF Course Page Redesign | ALL",
                id: "1004182635",
                flag: "crotest_KI138_ATF_Course_Page_Redesign_ALL_CRO8171",
                classes: [],
                /* v1 checked location.href — kept verbatim */
                match: function (path) { return isCoursePage(window.location.href); }
            }

            /* ============================================================
               RETIRED / DISABLED — these existed in v1 only as functions
               whose invocations were commented out; they never fired.
               Kept here (commented out) so IDs/flags stay documented.
               Do NOT re-enable without confirming status in Convert.
               ============================================================

            {
                ticket: "Recipe 4.34.41.48",
                name: "Recipe 4.34.41.48 | Accreditation promotion section | All",
                id: "1004109941",
                flag: "crotest_Accreditation_promotion",
                classes: [],
                match: function (path) {
                    return path === "/" ||
                        path.indexOf("/dental-courses") !== -1 ||
                        isCoursePageStrict(path);
                }
            },
            {
                ticket: "LDI-199",
                name: "Recipe 4.34.41.48 | V2 Accreditation promotion badge | All",
                id: "1004117509",
                flag: "crotest_Accreditation_promotion_v2",
                classes: [],
                match: function (path) {
                    return path === "/" ||
                        path.indexOf("/dental-courses") !== -1 ||
                        isCoursePageStrict(path);
                }
            },
            {
                ticket: "BrandVideo",
                name: "Rollback | Home page brand video | All",
                id: "1004118108",
                flag: "crotest_BrandVideo",
                classes: [],
                match: function (path) { return path === "/"; }
            },
            {
                ticket: "3.49",
                name: "3.49 | CTAs and prospectus download | All",
                id: "100479143",          // 9-digit ID — correct, older experience
                flag: "crotest_CTA_prospectus",
                classes: [],
                match: function (path) { return path.indexOf("/") !== -1; } // site-wide in v1
            },
            {
                ticket: "LDI-187",
                name: "Rollback | Course page | All",
                id: "1004124553",
                flag: "crotest_rollBack_Course_page_LDI_187",
                classes: [],
                match: function (path) { return isCoursePageStrict(path); }
            },
            {
                ticket: "CRO-87",
                name: "Recipe 52.53 | Mobile 'what's on this page' updates | Mobile",
                id: "1004135399",
                flag: "crotest_52_53_Course_Whats_on_the_page",
                classes: [],
                // v1 checked location.href — kept verbatim
                match: function (path) { return isCoursePage(window.location.href); }
            },
            ============================================================ */
        ];

        /* ================================================================
           DECORATORS — site-level DOM markers, not tied to any experiment.
           Run regardless of experiment status.
           ================================================================ */

        /* v1 test_AddingDataPath: cro-datapath attribute on <html> —
           experiment CSS/JS selectors depend on it. */
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
           (replaces v1 lib.listener + activateExpOnPageChange, which were
           commented out in v1 anyway)
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

        if (!window.cro_ldi_globalJS) {
            window.cro_ldi_globalJS = true;
            installLocationChangeListener(runAll);
        }

    } catch (e) {
        /* v1 swallowed the error object — always keep it visible */
        console.warn("[CRO] Error in Global JavaScript", e);
    }
})();
