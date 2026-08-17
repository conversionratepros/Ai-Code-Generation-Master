(function () {
    "use strict";
    /* ================================================================
       CRO Global Project JS — Family Education (v2, status-gated)

       Core change vs v1: every experiment trigger is gated on the
       experience's status inside the Convert config (convert.data).
       A paused / stopped / draft / archived test no longer fires its
       executeExperiment push OR its DOM side effects (body classes,
       flags), no matter how many of its conditions match.

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
           SHARED SITE HELPERS — carried over from v1.
           NONE of these are referenced by the current registry; they are
           kept so nothing from v1 is dropped and so experiment-level code
           that may still call lib.* keeps working.
           ================================================================ */

        /* v1 lib.live — delegated event binding helper (IE8-era polyfill).
           Unused by any experiment in v1; carried verbatim. */
        lib.live = function (selector, event, callback, context) {
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
        };

        /* v1 lib.launchExperiment — RETIRED direct-push helper.
           Only caller is the retired viewport-activation path below; the
           only experiment that used that path (KI5 / CRO-3671) has it
           commented out in v1 and is ported into the registry instead.
           WARNING — do not use for new activations: it bypasses the status
           gate and pushes the object form with triggerIntegrations:false on
           the FIRST fire, which suppresses integrations (GA) entirely; the
           registry's executeTest handles the array-form first fire and the
           integration-suppressed SPA re-fire correctly. */
        function launchExperiment(experimentId, testName) {
            // Set the experiment flag
            window["experiment" + experimentId + "flag"] = true;
            console.log(testName, " Activated");
            // Initialize converter queue if it doesn't exist
            window._conv_q = window._conv_q || [];

            // Push experiment execution
            window._conv_q.push({
                what: "executeExperiment",
                params: {
                    experienceId: experimentId,
                    triggerIntegrations: false
                }
            });
        }
        lib.launchExperiment = launchExperiment;

        /* v1 lib.waitForElementInViewport — RETIRED viewport-activation
           helper (IntersectionObserver + MutationObserver), kept verbatim.
           v1 bug preserved-but-fixed: two internal call sites invoked bare
           launchExperiment(experimentId) (a ReferenceError in v1's object-
           literal scope, and without testName the log printed undefined);
           here the local function declaration above makes them resolve. */
        lib.waitForElementInViewport = function (selector, experimentId, testName) {
            return new Promise(function (resolve, reject) {
                var elementFound = false;
                var elementInViewport = false;

                // Set a timeout to reject the promise
                var timeoutId = setTimeout(function () {
                    cleanup();
                    reject(new Error("Timeout waiting for element in viewport: " + selector));
                }, 5000);

                function cleanup() {
                    if (intersectionObserver) intersectionObserver.disconnect();
                    if (domObserver) domObserver.disconnect();
                    clearTimeout(timeoutId);
                }

                // Create Intersection Observer with minimum threshold
                var intersectionObserver = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        elementInViewport = entry.isIntersecting;

                        // Only launch if element is currently in viewport when found
                        if (elementFound && elementInViewport) {
                            cleanup();
                            launchExperiment(experimentId, testName);
                            resolve(entry.target);
                        }
                    });
                }, {
                    root: null,
                    threshold: 0 // trigger as soon as even 1px is visible
                });

                // Create DOM observer
                var domObserver = new MutationObserver(function () {
                    var element = document.querySelector(selector);
                    if (element && !elementFound) {
                        elementFound = true;
                        intersectionObserver.observe(element);

                        // If element is immediately in viewport when found
                        var rect = element.getBoundingClientRect();
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            elementInViewport = true;
                            cleanup();
                            launchExperiment(experimentId, testName);
                            resolve(element);
                        }
                    }
                });

                // Check if element already exists
                var element = document.querySelector(selector);
                if (element) {
                    elementFound = true;
                    intersectionObserver.observe(element);

                    // Check if already in viewport
                    var rect = element.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        elementInViewport = true;
                        cleanup();
                        lib.launchExperiment(experimentId, testName);
                        resolve(element);
                        return;
                    }
                }

                // Start observing DOM changes
                domObserver.observe(document.documentElement, {
                    childList: true,
                    subtree: true
                });
            });
        };

        /* ================================================================
           EXPERIMENT REGISTRY
           One entry per test. flag names and experiment IDs must match the
           Convert Location JS conditions exactly — do not rename.
           ================================================================ */

        var tests = [
            {
                ticket: "CRO-3671",
                name: "Recipe KI5 | Optimised class banners | ALL",
                id: "1004158798",
                flag: "crotest_KI5_Optimised_class_banners",
                classes: [],
                match: function (path) {
                    return path.indexOf("/pregnancy") !== -1 || path.indexOf("/baby-names") !== -1;
                }
                /* v1 carried two RETIRED activation approaches for this test,
                   both commented out there; recorded here for history only —
                   the live v1 code fired on the URL match alone:
                   1) viewport activation:
                      lib.waitForElementInViewport("body.page-node-type-articles", "1004158798", "Recipe KI5 | Optimised class banners | ALL | CRO-3671");
                   2) element gate (would map to):
                      gate: function (done) {
                          lib.waitForElement("body.page-node-type-articles", function () { done(true); }, 50, 15000);
                      }
                */
            },
            {
                ticket: "CRO-4386",
                name: "Recipe KI35 | Class Promotion Homepage (avg) | ALL",
                id: "1004158819",
                flag: "crotest_KI35_Class_Promotion_Homepage",
                classes: [],
                match: function (path) { return path === "/"; }
            }
        ];

        /* ================================================================
           DECORATORS — site-level DOM markers shared by several tests.
           Family Education v1 had none; section kept for future use.
           ================================================================ */

        function runDecorators() {
            /* no site decorators in v1 */
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
           v1 installed its SPA listener with an EMPTY callback, so nothing
           re-fired on pushState navigation; v2 re-runs the registry, and
           executeTest suppresses integrations on repeat fires.
           ================================================================ */

        function runAll() {
            navToken++;
            runDecorators();
            whenConvertReady(runTests);
        }

        console.log("Global JavaScript Activate (v2)");
        runAll();

        if (!window.cro_familyEducation_globalJS) {
            window.cro_familyEducation_globalJS = true;
            installLocationChangeListener(runAll);
        }

    } catch (e) {
        console.warn("[CRO] Error in Global JavaScript", e);
    }
})();
