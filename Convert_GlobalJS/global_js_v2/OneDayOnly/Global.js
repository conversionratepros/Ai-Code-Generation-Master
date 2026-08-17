(function () {
    "use strict";
    /* ================================================================
       CRO Global Project JS — OneDayOnly (v2, status-gated)

       Core change vs v1: every experiment trigger is gated on the
       experience's status inside the Convert config (convert.data).
       A paused / stopped / draft / archived test no longer fires its
       executeExperiment push OR its DOM side effects (body classes,
       flags), no matter how many of its conditions match.

       Reusable pattern for other clients:
       Convert-Reference/global-js-activation-template.js
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

        /* Increments on every SPA navigation. Async gates capture it when
           they start and abort if it changed — prevents a slow poll started
           on a PDP from adding classes after the user navigated away. */
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
            /* Polls readFn() until truthy, then onValue(value). Replaces the
               per-test copy-pasted setInterval blocks. */
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
           CONVERT STATUS GATE — the fix for paused tests still firing

           Verified against the live ODO config (cdn-4 .../1004973-100412012.js,
           2026-08-12): the new script serves ONLY active experiences
           ("status":"active"); paused/stopped tests are absent entirely, so
           for them getExperienceConfig() returns null and nothing fires.
           "1" is whitelisted for legacy-script projects whose config encodes
           active status numerically (s:"1").
           ================================================================ */

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
                var list = data.experiments || data.experiences;
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
            /* Not in the served config at all => archived/deleted/paused-and-
               stripped. Never fire. */
            if (!exp) return false;
            /* Legacy config uses `s`, new script uses `status`. A served
               experience with no status field is treated as live (some
               config builds only serve running experiences). */
            var status = exp.s !== undefined ? exp.s : exp.status;
            if (status === undefined || status === null) return true;
            return !!LIVE_STATUSES[String(status).toLowerCase()];
        }

        /* Global Project JS executes inside the snippet, so convert.data is
           normally already there; the function-push is the documented
           fallback that runs once the snippet is ready. */
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
            /* The window flag is the experiment's Location JS condition
               (e.g. "crotest_X == 1") — must be set BEFORE the push. */
            if (test.flag) window[test.flag] = 1;
            window._conv_q = window._conv_q || [];
            if (executedThisLoad[test.id]) {
                /* Repeat fire after SPA navigation: suppress integrations so
                   GA doesn't receive a duplicate experiment event.
                   (documented object form, manual-activation KB article) */
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
                    /* GATE 1 — experience must be live in Convert.
                       Paused/stopped/draft => cleanup + skip, always
                       (unless a QA preview/force URL param names it). */
                    if (!isExperienceLive(test.id) && !isForcedByUrl(test.id)) {
                        log(test.ticket + " skipped — experience " + test.id + " is not live in Convert config");
                        cleanupTest(test, 0);
                        return;
                    }
                    /* GATE 2 — URL match. */
                    if (!test.match(path)) {
                        cleanupTest(test);
                        return;
                    }
                    /* GATE 3 — once-per-pageload tests don't re-arm. */
                    if (test.oncePerLoad && window[test.flag]) return;
                    /* GATE 4 — optional async condition (dataLayer,
                       __NEXT_DATA__, element presence, ...). */
                    if (test.gate) {
                        test.gate(function (ok) {
                            if (token !== navToken) return; // user navigated away mid-poll
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
           SHARED SITE READERS (ODO / Next.js)
           ================================================================ */

        function readDeliveryLabel() {
            return window.__NEXT_DATA__?.props?.pageProps?.product?.customerDeliveryTime?.label || "";
        }

        /* Login / logout check — "signedIn" | "signedOut" | null while unknown.
           ODO pushes a user object ({ userStatus, userID, ... }) with the
           page_load event on every page; scan the dataLayer backwards for
           the latest one. */
        function readUserStatus() {
            try {
                var dl = window.dataLayer || [];
                for (var i = dl.length - 1; i >= 0; i--) {
                    if (dl[i] && dl[i].user && dl[i].user.userStatus) {
                        return dl[i].user.userStatus;
                    }
                }
            } catch (e) { }
            return null;
        }

        var PLP_PATHS = ["/category", "/extra-time-deals", "/everyday-essentials", "/clearance-sale"];
        function isPlpPath(path) {
            return PLP_PATHS.some(function (p) { return path.indexOf(p) !== -1; });
        }

        /* ================================================================
           EXPERIMENT REGISTRY
           One entry per test. flag names and experiment IDs must match the
           Convert Location JS conditions exactly — do not rename.
           ================================================================ */

        var tests = [
            {
                ticket: "CRO-4796",
                name: "Recipe KI2.KI6 | PDP Cleanup and Option selectors | ALL",
                id: "1004191412",
                flag: "crotest_KI2_KI6_PDP_Cleanup_and_Option_selectors_ALL",
                classes: [],
                match: function (path) { return path.indexOf("/products") !== -1; },
                gate: function (done) {
                    lib.poll(
                        function () { return window.__NEXT_DATA__?.props?.pageProps?.product?.customizableOptions; },
                        function (categories) {
                            var ukFound = Array.isArray(categories) && categories.some(function (cat) {
                                return cat?.label && cat.label.indexOf("Size") !== -1 &&
                                    Array.isArray(cat.values) &&
                                    cat.values.some(function (v) { return v?.label && v.label.indexOf("UK") !== -1; });
                            });
                            done(ukFound);
                        },
                        50, 5000
                    );
                }
            },
            {
                ticket: "CRO-8037",
                name: "i3 | Advertise XTD page with banners | ALL",
                id: "1004188508",
                flag: "crotest_i3_Advertise_XTD_page_with_banners_ALL_CRO8037",
                classes: ["CRO-8037_Banner_After_Every_4th_Row"],
                cleanupDelay: 200,
                match: function (path) {
                    return path.indexOf("/everyday-essentials") !== -1 ||
                        path.indexOf("/category") !== -1 ||
                        path.indexOf("/clearance-sale") !== -1;
                }
            },
            {
                ticket: "CRO-6458",
                name: "Recipe KI55 | Prominent Add-To-Cart Buttons - Green ODO Request | ALL",
                id: "1004191002",
                flag: "crotest_Recipe_KI55_Prominent_Add_To_Cart_Buttons_Green_ALL_CRO6458",
                classes: [],
                match: isPlpPath
            },
            {
                ticket: "CRO-12114",
                name: "Recipe | OOD | Product Card — Save % Tag Enhancement | ALL",
                id: "1004196432",
                flag: "crotest_Recipe_OOD_Product_Card_Save_Tag_Enhancement_ALL_CRO_12114",
                classes: ["cro-t-odo-12114"],
                match: isPlpPath
            },
            {
                ticket: "KI69",
                name: "Recipe KI69 | XTD - Improving User Experience with Category Carousels | ALL",
                id: "1004199324",
                flag: "crotest_Recipe_KI69_Improving_User_Experience_with_Category_Carousels",
                classes: ["cro-ki69"],
                match: function (path) { return path.indexOf("/extra-time-deals") !== -1; }
            },
            {
                /* Combined experiment. Retired singles CRO-12089 (1004199026)
                   and CRO-12281 (1004200806) must stay out of this registry —
                   both are superseded by 1004201173. */
                ticket: "CRO-12089+CRO-12281",
                name: "PDP | Fast-Ship Highlight (combined)",
                id: "1004201173",
                flag: "crotest_PDP_FastShip_Highlight_CRO12089_CRO12281",
                classes: ["cro_delivery_3_5", "cro_delivery_5_10", "cro_delivery_10_20"],
                cleanupDelay: 600,
                match: function (path) { return path.indexOf("/products") !== -1; },
                gate: function (done) {
                    lib.poll(readDeliveryLabel, function (label) {
                        var clean = label.trim().toLowerCase();
                        var cls = clean === "3-5 working days" ? "cro_delivery_3_5"
                            : clean === "5-10 working days" ? "cro_delivery_5_10"
                                : clean === "10-20 working days" ? "cro_delivery_10_20"
                                    : null;
                        if (!cls) { done(false); return; }
                        lib.waitForElement('[data-action="add-to-cart"]', function () {
                            document.body.classList.add(cls);
                            done(true);
                        }, 25, 15000);
                    }, 50, 10000);
                }
            },
            {
                ticket: "CRO-10225",
                name: "One-Click Checkout V2 — Revised Button Labels",
                id: "1004201727",
                flag: "crotest_OneClick_Checkout_CRO_10225",
                classes: ["cro-t-odo-10225"],
                match: isPlpPath
            },
            {
                ticket: "CRO-10185",
                name: "Product Card — Absolute Savings Line",
                id: "1004201385",
                flag: "crotest_Product_Card_Absolute_Savings_Line_CRO10185",
                classes: ["cro-t-odo-10185"],
                match: isPlpPath
            },
            {
                ticket: "CRO-12212",
                name: "AB Test | PDP Buy Box Strikethrough price | ALL",
                id: "1004203736",
                flag: "crotest_AB_Test_PDP_Buy_Box_Strikethrough_price_ALL",
                classes: ["cro-t-odo-12212"],
                match: function (path) { return path.indexOf("/products") !== -1; },
                onCleanup: function () { window.cro_12212 = false; }
            },
            {
                ticket: "CRO-12280",
                name: "PDP Shipping | Geo-Personalised Delivery | ALL",
                id: "1004204444",
                flag: "crotest_PDP_Shipping_GeoPersonalised_Delivery_ALL_CRO_12280",
                classes: ["cro-12280"],
                match: function (path) { return path.indexOf("/products") !== -1; },
                onCleanup: function () { window.cro_12280 = false; }
            },
            {
                ticket: "CRO-12412",
                name: "AB Test Checkout Equal-Weight Login vs Guest Entry ALL",
                id: "1004206164",
                flag: "crotest_Checkout_Equal_Weight_Login_vs_Guest_CRO12412",
                classes: ["cro-12412", "cro-12412-login-tab"],
                oncePerLoad: true,
                match: function (path) {
                    if (path !== "/checkout") return false;
                    var q = new URLSearchParams(window.location.search);
                    var isMainCheckout = !q.has("step") && !q.has("isGuest");
                    var isGuestCartCheckout = q.get("isGuest") === "true" && q.get("step") === "cart";
                    return isMainCheckout || isGuestCartCheckout;
                },
                gate: function (done) {
                    lib.poll(readUserStatus, function (status) {
                        done(status === "signedOut");
                    }, 50, 15000);
                }
            }
        ];

        /* ================================================================
           DECORATORS — site-level DOM markers, not tied to any experiment.
           These run regardless of experiment status (multiple tests and
           their CSS selectors depend on the attributes existing).
           ================================================================ */

        /* pagePath attribute on <html> — 'homepage' is deliberately distinct
           from the category tabs' 'home'; homepage tests must not match
           /category and vice versa. */
        function decoratePagePath() {
            var pathName = window.location.pathname;
            lib.waitForElement("html", function (htmlTag) {
                htmlTag.setAttribute("cro-datapath", pathName);
            }, 25, 15000);

            function setPagePath(value) {
                lib.waitForElement("html", function (htmlTag) {
                    htmlTag.setAttribute("pagePath", value);
                }, 25, 15000);
            }

            if (pathName.indexOf("/products") !== -1) {
                lib.poll(
                    function () {
                        return window.next?.router?.components?.["/products/[id]"]?.props?.pageProps?.layout?.selectedTopTab;
                    },
                    function (indexPath) { setPagePath(indexPath); },
                    50, 15000
                );
            }

            if (pathName === "/") {
                setPagePath("homepage");
            } else if (pathName.indexOf("/category") !== -1) {
                setPagePath("home");
            } else if (pathName.indexOf("/extra-time-deals") !== -1) {
                setPagePath("extra-time-deals");
                lib.waitForElement("div#__next picture", function (element) {
                    var closestAncestor = element?.closest('[class*="css"]')
                        ?.parentElement?.closest('[class*="css"]')
                        ?.parentElement?.closest('[class*="css"]')
                        ?.parentElement;
                    if (closestAncestor) {
                        closestAncestor.setAttribute("cro-MainContainer", "cro-product-container");
                    }
                }, 25, 15000);
            } else if (pathName.indexOf("/everyday-essentials") !== -1) {
                setPagePath("everyday-essentials");
            } else if (pathName.indexOf("/gift-vouchers") !== -1) {
                setPagePath("gift-vouchers");
            } else if (pathName.indexOf("/clearance-sale") !== -1) {
                setPagePath("clearancesale");
            } else if (pathName.indexOf("/checkout") !== -1) {
                setPagePath("checkout" + (window.location.search || ""));
            } else {
                setPagePath("");
            }
        }

        /* data-action / ancestor markers on PDP + checkout buttons.
           v1 spawned a new pair of waitForElement intervals every 400ms
           (an interval storm); v2 is one idempotent sweep on a single
           interval with the same effective coverage window. */
        function decorateButtons() {
            var path = window.location.pathname;
            if (path.indexOf("/products") === -1 && path.indexOf("/checkout") === -1) return;

            var sweeps = 0;
            var interval = setInterval(function () {
                try {
                    document.querySelectorAll('button[type="button"]').forEach(function (e) {
                        if (e.innerText.indexOf("I WANT ONE") !== -1) {
                            e.setAttribute("data-action", "add-to-cart");
                            var closestAncestor = e?.closest('[class*="css"]')
                                ?.parentElement?.closest('[class*="css"]')
                                ?.parentElement?.closest('[class*="css"]');
                            if (closestAncestor) {
                                closestAncestor.setAttribute("cro-proBtn", "cro-wantOneBtn");
                            }
                        }
                        if (e.innerHTML.indexOf("Submit Order") !== -1 || e.innerHTML.indexOf("Submitting Order") !== -1) {
                            e.setAttribute("data-action", "Submit-Order");
                        }
                    });

                    var qty = document.querySelector("#product-quantity-select");
                    if (qty && !qty.__croQtyMarked) {
                        var qtyAncestor = qty?.closest('[class*="css"]')
                            ?.parentElement?.closest('[class*="css"]')
                            ?.parentElement?.closest('[class*="css"]')
                            ?.parentElement;
                        if (qtyAncestor) {
                            qtyAncestor.setAttribute("cro-quantity", "cro-product");
                            qty.__croQtyMarked = true;
                        }
                    }
                } catch (e) { reportError("decorateButtons", e); }

                if (++sweeps >= 75) clearInterval(interval); // 75 × 200ms = 15s
            }, 200);
        }

        /* Homepage guard — the Convert snippet loads on '/', which shares the
           product-card DOM with the category tabs. Any PLP/PDP test body
           class that rides along on an SPA navigation gets stripped here;
           experiment CSS is gated on these classes. Runs every 500ms for 10s
           to outlast experiment scripts that re-apply their own class after
           navigation. Class list is derived from the registry so new tests
           are covered automatically. */
        var LEGACY_SWEEP_CLASSES = ["cro-t-odo-10185", "cro_3_5_Working_Days", "cro_Working_Days"];
        function homepageSweep() {
            if (window.location.pathname !== "/") return;
            var allClasses = LEGACY_SWEEP_CLASSES.slice();
            tests.forEach(function (t) {
                (t.classes || []).forEach(function (c) {
                    if (allClasses.indexOf(c) === -1) allClasses.push(c);
                });
            });
            var sweeps = 0;
            var interval = setInterval(function () {
                if (window.location.pathname !== "/") {
                    clearInterval(interval);
                    return;
                }
                document.body.classList.remove.apply(document.body.classList, allClasses);
                if (++sweeps >= 20) clearInterval(interval);
            }, 500);
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
            decoratePagePath();
            decorateButtons();
            whenConvertReady(runTests);
            homepageSweep();
        }

        console.log("Global JavaScript Activate (v2)");
        runAll();

        if (!window.cro_oneDayOnly_globalJS) {
            window.cro_oneDayOnly_globalJS = true;
            installLocationChangeListener(runAll);
        }

    } catch (e) {
        /* v1 swallowed the error object — always keep it visible */
        console.warn("[CRO] Error in Global JavaScript", e);
    }
})();
