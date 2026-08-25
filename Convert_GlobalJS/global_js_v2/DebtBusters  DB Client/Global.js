(function () {
    "use strict";
    /* ================================================================
       CRO Global Project JS — DebtBusters DB Client (v2, status-gated)

       Core change vs v1: every experiment trigger is gated on the
       experience's status inside the Convert config (convert.data).
       A paused / stopped / draft / archived test no longer fires its
       executeExperiment push OR its DOM side effects (window flags),
       no matter how many of its conditions match.

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
            /* Carried over from v1 (delegated event binding helper).
               Unused by the current registry/decorators but kept so any
               experiment-level code referencing it keeps working. */
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
           SHARED TEST CONDITIONS (DebtBusters DB Client)
           ================================================================ */

        /* All three active tests target the same ClearScore landing page.
           v1 matched on the full href (host pinned to
           start.debtbusters.co.za) — kept verbatim. */
        var CLEARSCORE_LANDING = "https://start.debtbusters.co.za/custom-landing-pages-debt-counselling-clear-score-landing";
        function matchClearScoreLanding() {
            return window.location.href.indexOf(CLEARSCORE_LANDING) !== -1;
        }

        /* v1's isFromClearScore(): ClearScore-referred visit carrying a
           non-empty `u` payload. utm_medium differs per test ("Web" vs
           "qa") — ported verbatim, do not normalize. */
        function isFromClearScore(medium) {
            try {
                var params = new URLSearchParams(window.location.search);
                return (
                    params.get("utm_source") === "ClearScore" &&
                    params.get("utm_medium") === medium &&
                    !!(params.get("u") || "").trim()
                );
            } catch (e) { return false; }
        }

        /* ================================================================
           EXPERIMENT REGISTRY
           One entry per test. flag names and experiment IDs must match the
           Convert Location JS conditions exactly — do not rename.
           ================================================================ */

        var tests = [
            {
                ticket: "CRO-4781",
                name: "TEST 91 | Hide pre-filled form | ALL",
                id: "1004162890",
                flag: "crotest_test_91_Hide_prefilled_form",
                classes: [],
                match: matchClearScoreLanding,
                gate: function (done) { done(isFromClearScore("Web")); }
            },
            {
                ticket: "CRO-6614",
                name: "Recipe KI93 | Wording change & Confirm CTA (it3) | ALL",
                /* 2026-08-24: was "1004175777" ((Ai) copy) — that experience is
                   no longer served in the CDN config, so the status gate
                   skipped it and the flag never got set. 1004171970 is the
                   active it3 experiment. */
                id: "1004171970",
                /* v1 flag reads "test_93_Hide_prefilled_form" (copy-paste of
                   TEST 91's naming, not this test's name) — it is what the
                   Location JS condition checks, do NOT rename. */
                flag: "crotest_test_93_Hide_prefilled_form",
                classes: [],
                match: matchClearScoreLanding,
                /* it3 URLs carry the prefill as plain params
                   (firstname/email/id_number…) instead of the legacy `u`
                   payload — the QA URL in the variation code has no `u`.
                   Accept either payload form; do NOT reuse the shared
                   isFromClearScore() (TEST 91 still needs strict `u`). */
                gate: function (done) {
                    try {
                        var p = new URLSearchParams(window.location.search);
                        var hasPayload =
                            !!(p.get("u") || "").trim() ||
                            !!(p.get("id_number") || "").trim() ||
                            !!(p.get("email") || "").trim();
                        done(
                            p.get("utm_source") === "ClearScore" &&
                            p.get("utm_medium") === "Web" &&
                            hasPayload
                        );
                    } catch (e) { done(false); }
                }
            },
            {
                ticket: "CRO-6612",
                name: "Recipe KI92 | Non-Editable Fields (it 2) | ALL",
                id: "1004178360",
                flag: "crotest_test_KI92_NonEditable_Fields_it2_ALL_CRO6612",
                classes: [],
                match: matchClearScoreLanding,
                /* WARNING: v1 requires utm_medium === "qa" (the other two
                   use "Web") — looks like a QA condition left in, so this
                   test only ever fires on qa-tagged traffic. Ported
                   verbatim; change to "Web" only with sign-off. */
                gate: function (done) { done(isFromClearScore("qa")); }
            }

            /* RETIRED — defined in v1 but its invocation was commented out
               (boot + SPA listener). Re-adding would fire the test again.
            {
                ticket: "TEST 83",
                name: "DBCS 94 Template Start (new) | ALL",
                id: "1004126224",
                flag: "crotest_DBCS_Template",
                classes: [],
                match: function () {
                    var href = window.location.href;
                    return href.indexOf("/landing-pages/omni-lp") !== -1 ||
                        href.indexOf("/landing-pages/2022-07-image-text-above-lp2") !== -1 ||
                        href.indexOf("/2023-02-facebook-dr-turbo") !== -1;
                }
            }
            */
        ];

        /* ================================================================
           DECORATORS — site-level DOM markers shared by several tests.
           DebtBusters DB Client v1 has none; add here when needed.
           ================================================================ */

        function runDecorators() {
            /* none for DebtBusters DB Client (v1 had no decorators) */
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

        if (!window.cro_dbClient_globalJS) {
            window.cro_dbClient_globalJS = true;
            installLocationChangeListener(runAll);
        }

    } catch (e) {
        /* v1 swallowed the error object — always keep it visible */
        console.warn("[CRO] Error in Global JavaScript", e);
    }
})();
