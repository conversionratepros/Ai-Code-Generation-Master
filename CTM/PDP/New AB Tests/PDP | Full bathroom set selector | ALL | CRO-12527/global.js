/* CTM — Global Project JS (Convert project 10041240)
   FULL replacement content for the Global JS editor — paste this whole file.

   This is the LIVE Global JS (extracted verbatim from the served config
   1004973-10041240.js on 2026-08-16) with TWO additions:
     - experiments.test_PDP_Full_bathroom_set_selector_ALL_CRO12527
       (fires executeExperiment 1004206570 ONLY on the 32 mapped pages,
       matched by exact pathname so ?utm_medium=qa etc. can't break it)
       — pasted into Convert and live-verified 2026-08-16
     - experiments.test_PDP_Complete_your_bathroom_ALL_CRO12470
       (fires executeExperiment 1004207635 on bathroom-fixture PDPs,
       classified by product title AFTER waiting for the title + buy box
       to exist — the wait its location condition never reliably got)
     - their calls at the bottom, with the other tests
   Nothing else was changed. The 9 existing tests are reproduced exactly.

   PAIRS WITH a location change on each experience: the JS Condition becomes
   a flag check (see convert-location-js-condition.js in this folder for
   CRO-12527, and in the CRO-12470 folder for CRO-12470), replacing the
   DOM-sniffing conditions. */
(function () {
    try {
        // LIBRARY FUNCTIONS
        var lib = {
            live(selector, event, callback, context) {
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
            getCookie(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(";");
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == " ") c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            },
            waitForElement(selector, trigger, delayInterval, delayTimeout) {
                var interval = setInterval(function () {
                    if (
                        document &&
                        document.querySelector(selector) &&
                        document.querySelectorAll(selector).length > 0
                    ) {
                        clearInterval(interval);
                        trigger();
                    }
                }, delayInterval);
                setTimeout(function () {
                    clearInterval(interval);
                }, delayTimeout);
            },
            listener(trigger) {
                window.addEventListener("locationchange", function () {
                    trigger();
                    console.log("Global JavaScript Activate");
                });
                history.pushState = ((f) =>
                    function pushState() {
                        var ret = f.apply(this, arguments);
                        window.dispatchEvent(new Event("pushstate"));
                        window.dispatchEvent(new Event("locationchange"));
                        return ret;
                    })(history.pushState);
                history.replaceState = ((f) =>
                    function replaceState() {
                        var ret = f.apply(this, arguments);
                        window.dispatchEvent(new Event("replacestate"));
                        window.dispatchEvent(new Event("locationchange"));
                        return ret;
                    })(history.replaceState);
                window.addEventListener("popstate", () => {
                    window.dispatchEvent(new Event("locationchange"));
                });
            },
        };

        var experiments = {
            test_Recipe_KI211_Buy_now_pay_later_from_pricing_on_cart_ALL_CRO4974() {
                var url = window.location.href;
                if (url.indexOf('/checkout/cart') != -1) {
                    window.crotest_KI211_Buy_now_pay_later = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004196689"]);
                    console.log("Test Recipe KI211 | Buy now pay later from pricing on cart | ALL | CRO-4974 Activated");
                }
            }, test_Recipe_121_v2_See_feel_video_widget_All() {
                var pathCheck = window.location.pathname;
                if (pathCheck.includes('product.html')) {
                    lib.waitForElement('#calc_btn', function () {
                        window.crotest_Recipe_121_v2_See_feel_video_widget = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004197363"]);
                        console.log("Test Recipe 121 (v2) | See/feel video widget | All Activated");
                    }, 25, 15000);
                }
            }, test_PDP_Buy_Box_simplification_All_CRO8475() {
                var pathCheck = window.location.pathname;
                if (pathCheck.includes('product.html')) {
                    lib.waitForElement('#calc_btn', function () {
                        window.crotest_PDP_Buy_Box_simplification_All_CRO8475 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004198473"]);
                        console.log("Test PDP | Buy Box simplification | All | CRO-8475 Activated");
                    }, 25, 15000);
                }
            }, test_Recipe_PLP_Card_Size_Differentiation_Visual_Cue_ALL_CRO_12301() {
                var pathCheck = window.location.pathname;
                if (pathCheck.indexOf('category') != -1 && pathCheck.indexOf('tiles') != -1) {
                    window.crotest_PLP_Card_Size_Differentiation_Visual_Cue_ALL_CRO_12301 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004200512"]);
                    console.log("Test Recipe | PLP Card | Size Differentiation Visual Cue | ALL | CRO-12301 Activated");
                }
            }, test_Recipe114_Minimizing_installation_products_on_cart_V2_ALL_CRO3029() {
                var url = window.location.href;
                if (url.indexOf('/checkout/cart') != -1) {
                    window.crotest_Recipe114_Minimizing_installation_products_on_cart_V2 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004201119"]);
                    console.log("Test Recipe 114 | Minimizing installation products on cart (V2) | ALL | CRO-3029 Activated");
                } else {
                    if (document.querySelector('.cro-t-ctm-114-v2')) {
                        document.querySelector('body').classList.remove('cro-t-ctm-114-v2')
                    }
                }
            }, test_100_form_input_width_CRO8024() {
                var url = window.location.href;
                if (url.indexOf('/checkout/#customer-details-step') != -1 || url.indexOf('/checkout/#shipping') != -1) {
                    window.crotest_100_form_input_width_CRO8024 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004201296"]);
                    console.log("Test 100% form input width | CRO-8024 Activated");
                } else {
                    if (document.querySelector('.CRO8024')) {
                        document.querySelector('body').classList.remove('CRO8024')
                    }
                }
            }, test_Recipe_129_Buy_Now_Pay_later_accordian_ALL_CRO_3228() {
                var pathCheck = window.location.pathname;
                if (pathCheck.includes('product.html')) {
                // lib.waitForElement('#calc_btn', function () {
                // 100463775
                // Place your code here
                // QA: 1004117564
                window.crotest_129_Buy_Now_Pay_later = 1;
                window._conv_q = window._conv_q || [];
                window._conv_q.push(["executeExperiment", "1004203276"]);
                console.log("Test Recipe 129 | Buy Now Pay later accordian | ALL | CRO-3228 Activated");
                // }, 25, 15000);
                }
            }, test_Dual_Image_PLP_Swipe_Able_Second_Image_CRO12302() {
                var pathCheck = window.location.pathname;
                if (pathCheck.indexOf('category') != -1 && pathCheck.indexOf('tiles') != -1) {
                    window.crotest_Dual_Image_PLP_Swipe_Able_Second_Image_CRO12302 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004203457"]);
                    console.log("Test Dual-Image PLP (Swipe-Able Second Image) | CRO-12302 Activated");
                }
            }, test_AB_Test_PLP_Mobile_Quick_Filter_Chip_Row_MOBILE_CRO12299() {
                var pathCheck = window.location.pathname;
                if (pathCheck.indexOf('category') != -1 && pathCheck.indexOf('tiles') != -1) {
                    window.crotest_Mobile_Quick_Filter_Chip_Row_MOBILE_CRO12299 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004205467"]);
                    console.log("Test AB Test | PLP Mobile Quick-Filter Chip Row | MOBILE | CRO-12299 Activated");
                }
            }, test_PDP_Full_bathroom_set_selector_ALL_CRO12527() {
                /* CRO-12527 — fires ONLY on the 32 mapped set-component pages.
                   Matched by exact PATHNAME, never the full href: the QA preview
                   link carries ?utm_medium=qa, and an href equality check would
                   fail on it (that trap is live in the old test_121_videos).
                   No DOM sniffing here — the pathname is known before parsing,
                   so this decision cannot lose a timing race. variation.js does
                   its own waiting for the buy box and its own SKU-map check. */
                var paths = [
                    "/tammy-white-built-in-straight-bath-without-handles-1700-x-700mm-product.html",
                    "/coral-white-front-flush-toilet-suite-product.html",
                    "/coral-white-built-in-straight-bath-with-handles-1700-x-700mm-product.html",
                    "/coral-dual-top-flush-toilet-suite-product.html",
                    "/origami-white-dual-top-flush-toilet-suite-incl-seat-product.html",
                    "/bouquet-white-built-in-straight-bath-1700-x-750mm-product.html",
                    "/crystaltech-inline-white-adjustable-pivot-shower-door-cte805-1000-to-1200-x-1850mm-product.html",
                    "/coral-white-wall-mounted-basin-and-floor-pedestal-set-812-x-465-x-570mm-product.html",
                    "/coral-avocado-built-in-straight-bath-with-handles-1700-x-700mm-product.html",
                    "/crystaltech-adjustable-chrome-return-panel-ct8002-800-1020-x-1850mm-product.html",
                    "/bouquet-white-dual-top-flush-toilet-suite-product.html",
                    "/sarah-white-floor-mount-toilet-pan-incl-seat-product.html",
                    "/coral-almond-dual-top-flush-toilet-includes-seat-be1-al051-product.html",
                    "/origami-white-bath-built-in-straight-bath-1795-x-795mm-product.html",
                    "/bouquet-white-wall-mounted-basin-and-pedestal-set-810-x-415-x-495mm-product.html",
                    "/origami-white-wall-mounted-basin-and-floor-pedestal-set-830-x-505-x-610mm-xxwh1000bp-product.html",
                    "/alson-super-white-box-urinal-incl-kit-spreader-product.html",
                    "/coral-almond-builtin-straight-bath-with-handles-1700-x-700mm-aqal170003-product.html",
                    "/tamara-black-wall-hung-pan-soft-close-seat-530-x-360-x-325mm-product.html",
                    "/coral-avo-dual-top-flush-toilet-includes-seat-be1-av051-product.html",
                    "/coral-blue-dual-top-flush-toilet-including-seat-product.html",
                    "/coral-bermuda-blue-built-in-straight-bath-with-handles-1700-x-700mm-product.html",
                    "/tivoli-torino-80-wall-mounted-concealed-cistern-product.html",
                    "/torino-74-concealed-cistern-for-use-with-floor-mounted-toilets-product.html",
                    "/coral-almond-wall-mounted-basin-and-floor-pedestal-set-812-x-465-x-570mm-product.html",
                    "/coral-blue-wall-mounted-basin-and-floor-pedestal-set-812-x-465-x-570mm-product.html",
                    "/tivoli-pyramid-flush-plate-black-product.html",
                    "/crystaltech-inline-chrome-adjustable-pivot-shower-door-ct8006-1000-to-1200-x-1850mm-ctshps904-product.html",
                    "/tivoli-capri-flush-plate-white-product.html",
                    "/coral-avocado-wall-mounted-basin-570-x-465-x-182mm-be1av218-product.html",
                    "/coral-avocado-pedestal-165-x-175-x-630mm-be1av318-product.html",
                    "/tivoli-black-globe-flush-plate-product.html"
                ];
                if (paths.indexOf(window.location.pathname) === -1) { return; }

                /* Status gate: never fire for a paused/archived experience.
                   On the current Convert script convert.data.experiences is an
                   array holding ONLY active experiences, so "absent" = paused.
                   If convert.data is unreadable we fire anyway — the push is a
                   Convert-side no-op for a dead id and our only side effects
                   are this flag and a log line. A preview/force URL naming the
                   experience bypasses the gate so drafts stay QA-able. */
                var EXP_ID = "1004206570";
                try {
                    var d = window.convert && window.convert.data;
                    var list = d && (d.experiences || d.experiments);
                    if (list) {
                        var found = false;
                        if (Array.isArray(list)) {
                            for (var i = 0; i < list.length; i++) {
                                if (String(list[i].id) === String(EXP_ID)) { found = true; break; }
                            }
                        } else {
                            found = !!(list[EXP_ID] || list[String(EXP_ID)]);
                        }
                        var forced = window.location.search.indexOf(EXP_ID) !== -1 &&
                            (window.location.search.indexOf("_conv_eforce=") !== -1 ||
                             window.location.search.indexOf("convert_vpreview") !== -1);
                        if (!found && !forced) { return; }
                    }
                } catch (e) { /* fire anyway, see above */ }

                window.crotest_PDP_Full_bathroom_set_selector_CRO12527 = 1;
                window._conv_q = window._conv_q || [];
                window._conv_q.push(["executeExperiment", EXP_ID]);
                console.log("Test PDP | Full bathroom set selector | ALL | CRO-12527 Activated");
            }, test_PDP_Complete_your_bathroom_ALL_CRO12470() {
                /* CRO-12470 — bathroom-fixture PDPs, classified by the product
                   TITLE (no fixed URL list exists for this test). The title and
                   buy-box form are waited for with a real 25ms poll (15s cap)
                   before classifying — its old location condition evaluated
                   once at script run and its executeExperimentLooped retry
                   evidently doesn't re-fire reliably, so on cached loads it
                   died before the DOM existed. The classification regexes below
                   are ported VERBATIM from that location condition:
                   reject tile/flooring pages outright, strip fitting phrases
                   (taps, toilet seats, wastes, shower heads, flush plates...),
                   then require a fixture word in what remains. */
                var pathCheck = window.location.pathname;
                if (pathCheck.indexOf('product.html') === -1) { return; }
                lib.waitForElement('.product-info-main #product_addtocart_form', function () {
                    lib.waitForElement('.page-title .base', function () {
                        try {
                            var el = document.querySelector('.page-title .base');
                            var t = (el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
                            if (!t) { return; }
                            if (/tile|mosaic|grout|adhesive|laminate|vinyl|carpet|\bsheet\b|cleaner|\bmat\b|sealant|\btrim\b|spacer/.test(t)) { return; }
                            var t2 = t.replace(/\b(?:(?:basin|bath|shower|sink|bidet|wall|kitchen)\s+){0,2}(?:mixer|tap|taps|spout|faucet)s?\b/g, ' ')
                                .replace(/\b(?:soft\s+close\s+)?toilet\s+seat\b/g, ' ')
                                .replace(/\b(?:basin|bath|shower|sink|toilet)\s+(?:waste|trap|plug)s?\b/g, ' ')
                                .replace(/shower\s+(?:head|arm|column|rail|rose|tray|kit|hose)/g, ' ')
                                .replace(/handshower/g, ' ')
                                .replace(/\bwaste\b|bottle\s+trap|angle\s+valve|plumbers\s+tape|flush\s+plate|\bconnector\b|\bhinge\b|silicone/g, ' ');
                            if (!/\bbasin\b|\btoilet\b|\bbath\b|\bshower\b|\bcabinet\b|\bvanity\b|pedestal/.test(t2)) { return; }

                            /* Status gate — same shape as CRO-12527 above: never
                               fire for a paused/archived experience (absent from
                               convert.data.experiences on the current script);
                               preview/force URLs naming the id bypass it. */
                            var EXP_ID = "1004207635";
                            var d = window.convert && window.convert.data;
                            var list = d && (d.experiences || d.experiments);
                            if (list) {
                                var found = false;
                                if (Array.isArray(list)) {
                                    for (var i = 0; i < list.length; i++) {
                                        if (String(list[i].id) === String(EXP_ID)) { found = true; break; }
                                    }
                                } else {
                                    found = !!(list[EXP_ID] || list[String(EXP_ID)]);
                                }
                                var forced = window.location.search.indexOf(EXP_ID) !== -1 &&
                                    (window.location.search.indexOf("_conv_eforce=") !== -1 ||
                                     window.location.search.indexOf("convert_vpreview") !== -1);
                                if (!found && !forced) { return; }
                            }

                            window.crotest_PDP_Complete_your_bathroom_CRO12470 = 1;
                            window._conv_q = window._conv_q || [];
                            window._conv_q.push(["executeExperiment", EXP_ID]);
                            console.log("Test PDP | Complete your bathroom | ALL | CRO-12470 Activated");
                        } catch (e) { console.log("Error in CRO-12470 activation"); }
                    }, 25, 15000);
                }, 25, 15000);
            }
        };

        // experiments.test_Recipe_KI238_KI239_KI240_KI241_Emphasizing_Tile_Calculator_Button_v4_Icon_ALL_CRO5837();

        experiments.test_Recipe_KI211_Buy_now_pay_later_from_pricing_on_cart_ALL_CRO4974();

        experiments.test_Recipe_121_v2_See_feel_video_widget_All();

        experiments.test_PDP_Buy_Box_simplification_All_CRO8475();

        experiments.test_Recipe_PLP_Card_Size_Differentiation_Visual_Cue_ALL_CRO_12301();

        experiments.test_Recipe114_Minimizing_installation_products_on_cart_V2_ALL_CRO3029();

        experiments.test_100_form_input_width_CRO8024();

        experiments.test_Recipe_129_Buy_Now_Pay_later_accordian_ALL_CRO_3228();

        experiments.test_Dual_Image_PLP_Swipe_Able_Second_Image_CRO12302();

        experiments.test_AB_Test_PLP_Mobile_Quick_Filter_Chip_Row_MOBILE_CRO12299();

        experiments.test_PDP_Full_bathroom_set_selector_ALL_CRO12527();

        experiments.test_PDP_Complete_your_bathroom_ALL_CRO12470();

        console.log("Global JavaScript");
    } catch (e) {
        console.log("Error in Global JavaScript");
    }
})();
