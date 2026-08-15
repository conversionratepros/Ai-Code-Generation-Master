(function () {
    "use strict";
    /* ================================================================
       CRO Global Project JS — reusable activation template (any client)

       Solves: manually-activated experiments (Location JS condition +
       executeExperiment from Global JS) keep firing after the test is
       paused, because project-level JS has no idea of experience status.

       Every trigger passes four gates, in order:
         1. STATUS  — experience is live in convert.data (the fix)
         2. URL     — match(path) returns true
         3. ONCE    — oncePerLoad tests don't re-arm after firing
         4. GATE    — optional async condition (dataLayer, app state, DOM)

       To onboard a client:
         - fill in the tests[] registry (one entry per experiment)
         - adjust/remove the decorators section (site-specific)
         - rename window.cro_<client>_globalJS init flag
       Reference implementation with 11 real tests: OneDayOnly/global-v2.js
       Convert API details: Convert-Reference/js-api.md
       ================================================================ */

    try {

        /* ---------- debug ---------- */
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
           EXPERIMENT REGISTRY — one entry per manually-activated test.

           {
             ticket:  "CRO-XXXXX",              // for logs
             name:    "Readable test name",     // for logs
             id:      "100XXXXXXX",             // Convert experience ID
             flag:    "crotest_...",            // window flag = Location JS condition
             classes: ["cro-xxxxx"],            // body classes to strip on cleanup
             cleanupDelay: 400,                 // optional, ms (default 400)
             oncePerLoad: false,                // optional, don't re-arm after firing
             match:   function (path) {...},    // sync URL check
             gate:    function (done) {...},    // optional async check -> done(true|false)
             onCleanup: function () {...}       // optional extra cleanup
           }
           ================================================================ */

        var tests = [
            /* EXAMPLE — plain URL-matched test:
            {
                ticket: "CRO-00000",
                name: "PLP | Example test",
                id: "1004000000",
                flag: "crotest_Example_CRO00000",
                classes: ["cro-00000"],
                match: function (path) { return path.indexOf("/category") !== -1; }
            },
            */
            /* EXAMPLE — async-gated test (dataLayer / app state):
            {
                ticket: "CRO-00001",
                name: "Checkout | Signed-out only",
                id: "1004000001",
                flag: "crotest_Example_CRO00001",
                classes: ["cro-00001"],
                oncePerLoad: true,
                match: function (path) { return path === "/checkout"; },
                gate: function (done) {
                    lib.poll(
                        function () {
                            var dl = window.dataLayer || [];
                            for (var i = dl.length - 1; i >= 0; i--) {
                                if (dl[i]?.user?.userStatus) return dl[i].user.userStatus;
                            }
                            return null;
                        },
                        function (status) { done(status === "signedOut"); },
                        50, 15000
                    );
                }
            },
            */
        ];

        /* ================================================================
           DECORATORS — site-level DOM markers shared by several tests
           (pagePath attributes, data-action tagging, ...). Run regardless
           of experiment status. Client-specific: replace per site.
           ================================================================ */

        function runDecorators() {
            /* client-specific */
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

        console.log("Global JavaScript Activate");
        runAll();

        if (!window.cro_client_globalJS) { // rename per client
            window.cro_client_globalJS = true;
            installLocationChangeListener(runAll);
        }

    } catch (e) {
        console.warn("[CRO] Error in Global JavaScript", e);
    }
})();
