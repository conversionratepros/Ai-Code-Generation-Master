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
            // Recipe 177.178.179 | Delivery/Collection USPs | All
            test_177_178_179_USPs() {
                var url = window.location.href;
                if (url.indexOf('/checkout') != -1) {
                    window.crotest_177_178_179_USPs = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004109702"]);
                    console.log("Test Recipe 177.178.179 | Delivery/Collection USPs | All Activated");
                }
            }, test_121_videos() {
                const urlsToRunCode = [
                    "https://www.ctm.co.za/idaho-grey-slip-resistant-ceramic-floor-tile-600-x-600mm-pg1uida200522-product.html",
                    "https://www.ctm.co.za/zest-charcoal-ecotec-slip-resistant-matt-glazed-porcelain-floor-tile-600-x-600mm-product.html",
                    "https://www.ctm.co.za/futura-nadine-grey-ecotec-shiny-glazed-porcelain-floor-tile-600-x-600mm-product.html",
                    "https://www.ctm.co.za/kilimanjaro-kgalagadi-cotta-ecotec-slip-resistant-porcelain-floor-tile-350-x-350mm-product.html",
                    "https://www.ctm.co.za/subway-arles-snow-feature-glossy-wall-tile-100-x-300mm-product.html",
                    "https://www.ctm.co.za/kilimanjaro-eagle-wood-beige-ecotec-matt-porcelain-floor-tile-635-x-420mm-product.html",
                    "https://www.ctm.co.za/barnwood-natural-ecotec-matt-rectified-glazed-porcelain-floor-tile-895-x-220mm-product.html",
                    "https://www.ctm.co.za/mastery-charcoal-ecotec-slip-resistant-glazed-porcelain-floor-tile-1200-x-600mm-product.html",
                    "https://www.ctm.co.za/kerry-grey-ecotec-rectified-slip-resistant-hard-body-ceramic-floor-tile-600-x-600mm-product.html",
                    "https://www.ctm.co.za/cashmere-cement-grey-ecotec-shiny-glazed-porcelain-floor-tile-800-x-800mm-product.html",
                    "https://www.ctm.co.za/skyline-charcoal-ecotec-matt-glazed-porcelain-floor-tile-800-x-800mm-product.html",
                    "https://www.ctm.co.za/skyline-grey-ecotec-slip-resistant-glazed-porcelain-floor-tile-800-x-800mm-product.html",
                    "https://www.ctm.co.za/juniper-black-shiny-ceramic-floor-tile-430-x-430mm-product.html",
                    "https://www.ctm.co.za/levante-ivory-shiny-ceramic-floor-tile-500-x-500mm-product.html",
                    "https://www.ctm.co.za/moana-beige-matt-ceramic-floor-tile-430-x-430mm-product.html",
                    "https://www.ctm.co.za/angelina-ivory-shiny-ceramic-wall-tile-600-x-300mm-product.html",
                    "https://www.ctm.co.za/twill-cotton-ivory-satin-ceramic-wall-tile-600-x-300mm-product.html",
                    "https://www.ctm.co.za/eros-grey-ecotec-matt-porcelain-floor-tile-600-x-600mm-product.html",
                    "https://www.ctm.co.za/stage-ivory-matt-ceramic-floor-tile-430-x-430mm-product.html",
                    "https://www.ctm.co.za/rivonia-taupe-ceramic-floor-tile-500-x-500mm-product.html",
                    "https://www.ctm.co.za/kilimanjaro-rhino-grey-ecotec-matt-porcelain-floor-tile-410-x-620mm-product.html",
                    "https://www.ctm.co.za/pavia-cementine-matt-ceramic-wall-tile-200-x-200mm-product.html",
                    "https://www.ctm.co.za/dome-white-shiny-ceramic-floor-tile-600-x-600mm-pg1udo100022-product.html",
                    "https://www.ctm.co.za/zorah-mid-grey-matt-ceramic-floor-tile-430-x-430mm-product.html",
                    "https://www.ctm.co.za/subway-vita-natura-decor-glossy-ceramic-wall-tile-200-x-100mm-product.html",
                    "https://www.ctm.co.za/freya-grey-shiny-ceramic-floor-tile-600-x-600mm-pg1ufr210022-product.html",
                    "https://www.ctm.co.za/arida-stone-ecotec-rectified-matt-porcelain-floor-tile-895-x-445mm-product.html",
                    "https://www.ctm.co.za/serene-grey-shiny-ceramic-wall-tile-800-x-265mm-product.html",
                    "https://www.ctm.co.za/kilimanjaro-lusitano-cotta-ecotec-matt-porcelain-floor-tile-420-x-420mm-product.html",
                    "https://www.ctm.co.za/invisible-marble-glazed-polish-porcelain-floor-tile-600-x-1200mm-product.html",
                    "https://www.ctm.co.za/infinity-grey-rectified-matt-glazed-porcelain-floor-tile-795-x-795mm-4-product.html",
                    "https://www.ctm.co.za/infinity-grey-slip-resistant-rectified-matt-glazed-porcelain-floor-tile-795-x-795mm-1-product.html",
                    "https://www.ctm.co.za/domus-feature-shiny-ceramic-wall-tile-300-x-600mm-product.html",
                    "https://www.ctm.co.za/olivia-feature-matt-ceramic-wall-tile-300-x-600mm-ws1fcol00a7l-product.html",
                    "https://www.ctm.co.za/golden-camelia-shiny-ceramic-wall-tile-265-x-800mm-ws1fcgo00a9l-product.html",
                    "https://www.ctm.co.za/network-sand-matt-ceramic-wall-tile-300-x-600mm-product.html",
                    "https://www.ctm.co.za/juniper-feature-shiny-ceramic-wall-tile-250-x-400mm-ws1fcju00a4l-product.html",
                    "https://www.ctm.co.za/bocelli-nero-ecotec-rectified-shiny-hard-body-ceramic-floor-tile-600-x-600mm-sp1cbc80s1-product.html",
                    "https://www.ctm.co.za/origins-fish-hoek-grey-ecotec-matt-porcelain-floor-tile-vt1kfi23711e-product.html",
                    "https://www.ctm.co.za/casale-taupe-matt-ceramic-floor-tile-430-x-430mm-pg1uca330518-product.html",
                    "https://www.ctm.co.za/casale-charcoal-matt-ceramic-floor-tile-430-x-430mm-pg1uca810518-product.html",
                    "https://www.ctm.co.za/tonga-beige-matt-ceramic-floor-tile-430-x-430mm-pg1utn300018-product.html",
                    "https://www.ctm.co.za/tempest-charcoal-ecotec-rectified-shiny-hard-body-ceramic-floor-tile-600-x-600mm-sp1cte81s1-product.html",
                    "https://www.ctm.co.za/kilimanjaro-ghana-cement-grey-ecotec-matt-porcelain-floor-tile-420-x-635mm-product.html",
                    "https://www.ctm.co.za/onyx-white-shiny-ceramic-wall-tile-300-x-600mm-ws1con10a7l-product.html",
                    "https://www.ctm.co.za/element-botanical-ecotec-shiny-rectified-porcelain-floor-tile-590-x-1190mm-gr1cel00rs23e-product.html",
                    "https://www.ctm.co.za/ravello-grey-shiny-ceramic-wall-tile-200-x-500mm-ws1cra20m8l-product.html",
                    "https://www.ctm.co.za/stage-light-grey-matt-ceramic-wall-tile-250-x-400mm-ws1cst21a4l-product.html",
                    "https://www.ctm.co.za/strelizia-cement-light-grey-satin-ceramic-wall-tile-200-x-500mm-ws1cst21a8l-product.html",
                    "https://www.ctm.co.za/zorah-grey-matt-ceramic-wall-tile-250-x-400mm-ws1czo21a4l-product.html",
                    "https://www.ctm.co.za/strelizia-feature-satin-ceramic-wall-tile-200-x-500mm-ws1fcst00a8l-product.html",
                    "https://www.ctm.co.za/kilimanjaro-karisimbi-quartz-ecotec-matt-porcelain-floor-tile-420-x-635mm-vt1kka11631e-product.html",
                    "https://www.ctm.co.za/kilimanjaro-karisimbi-slate-ecotec-matt-porcelain-floor-tile-420-x-635mm-vt1kka92631e-product.html",
                    "https://www.ctm.co.za/element-ivory-matt-ceramic-wall-tile-265-x-800mm-ws1cel11a9l-product.html",
                    "https://www.ctm.co.za/element-charcoal-matt-ceramic-wall-tile-265-x-800mm-ws1cel81a9l-product.html",
                    "https://www.ctm.co.za/twill-grey-satin-ceramic-wall-tile-300-x-600mm-ws1ctw21a7l-product.html",
                    "https://www.ctm.co.za/element-feature-matt-ceramic-wall-tile-ws1fcel00h9l-product.html",
                    "https://www.ctm.co.za/zara-feature-shiny-ceramic-wall-tile-300-x-600mm-ws1fcza00a7l-product.html",
                    "https://www.ctm.co.za/prime-cement-grey-ecotec-matt-porcelain-floor-tile-600-x-1200mm-gr1cpr202e-product.html",
                    "https://www.ctm.co.za/kilimanjaro-lusaka-blend-ecotec-matt-porcelain-floor-tile-350-x-350mm-vt1klu92351e-product.html",
                    "https://www.ctm.co.za/twill-metric-satin-ceramic-wall-tile-300-x-600mm-ws1fctw00d7l-product.html",
                    "https://www.ctm.co.za/origins-cederberg-grey-matt-ceramic-floor-tile-600-x-200mm-pg1uce2023-product.html",
                    "https://www.ctm.co.za/origins-robertson-ivory-matt-ceramic-floor-tile-600-x-200mm-pg1uro1123-product.html"
                ];
                function shouldRunCode() {
                    var currentURL = window.location.href;
                    return urlsToRunCode.includes(currentURL);
                }
                // Run your code if the condition is met
                if (shouldRunCode()) {
                    // Place your code here
                    window.crotest_121_video = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004116047"]);
                    console.log("Test Recipe 121 | See/Feel videos | All Activated");
                }
            }, test_130() {
                var pathCheck = window.location.pathname;
                if (pathCheck.includes('product.html')) {
                    lib.waitForElement('#calc_btn', function () {
                        // 100463775
                        // Place your code here
                        // QA: 1004117564
                        window.crotest_130 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004102232"]);
                        console.log("Test Recipe 130 | Updated Design VAS section | All Activated");
                    }, 25, 15000);
                }
            }, test_63_89_101_Installation_products_clarity_All() {
                var pathCheck = window.location.pathname;
                if (pathCheck.includes('product.html')) {
                    lib.waitForElement('#calc_btn', function () {
                        // 100463775
                        // Place your code here
                        // QA: 1004117564
                        window.crotest_63_89_101 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "100442594"]);
                        console.log("Test Recipe 63.89.101 | Installation products clarity | All Activated");
                    }, 25, 15000);
                }
            },
            test_196_PLP_Tile_CTA_switch() {
                var pathCheck = window.location.pathname;
                if (pathCheck.indexOf('category.html') != -1 && pathCheck.indexOf('tiles') != -1) {
                    window.crotest_196_CTA = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004124850"]);
                    console.log("Test Recipe 196 | PLP Tile CTA switch | All Activated");
                }
            }, test_Recipe_KI232_Shorter_SeeFeel_Videos_ALL() {
                const urlsToRunCode = [
                    "https://www.ctm.co.za/kyra-grey-matt-ceramic-floor-tile-350-x-350mm-product.html",
                    "https://www.ctm.co.za/origins-fynbos-grey-matt-porcelain-floor-tile-280-x-710mm-vt1kfy20711a-v1-product.html",
                    "https://www.ctm.co.za/kilimanjaro-chwaka-slate-matt-porcelain-floor-tile-350-x-350mm-vt1kch00351a-v1-product.html",
                    "https://www.ctm.co.za/dover-grey-ecotec-rectified-matt-hard-body-ceramic-floor-tile-600-x-600mm-product.html",
                    "https://www.ctm.co.za/domus-white-shiny-ceramic-wall-tile-600-x-300mm-product.html",
                    "https://www.ctm.co.za/idaho-grey-matt-ceramic-floor-tile-600-x-600mm-product.html",
                    "https://www.ctm.co.za/argento-grey-matt-recified-hard-body-ceramic-floor-tile-600-x-600mm-sp1car20m1qa-product.html",
                    "https://www.ctm.co.za/carrara-white-glazed-polished-porcelain-floor-tile-dcsu021-600-x-600mm-product.html",
                    "https://www.ctm.co.za/kilimanjaro-mazoni-grey-matt-porcelain-floor-tile-350-x-350mm-vt1kma21351a-v1-product.html",
                    "https://www.ctm.co.za/kilimanjaro-umgazi-smoke-matt-porcelain-floor-tile-420-x-635mm-vt1kum20631-v1-product.html",
                    "https://www.ctm.co.za/onaka-grey-ecotec-matt-porcelain-floor-tile-600-x-1200mm-product.html",
                    "https://www.ctm.co.za/origins-lagoon-wood-matt-porcelain-floor-tile-710-x-280mm-vt1kla31711-v1-product.html",
                    "https://www.ctm.co.za/origins-robertson-ivory-matt-ceramic-floor-tile-600-x-200mm-pg1uro1123-product.html",
                    "https://www.ctm.co.za/origins-trinidad-grey-matt-porcelain-floor-tile-710-x-280mm-vt1ktr20711-product.html",
                    "https://www.ctm.co.za/shanghai-glazed-polished-porcelain-floor-tile-750-x-1500mm-dcmim1001-product.html",
                    "https://www.ctm.co.za/valencia-bevelled-glossy-red-ceramic-subway-wall-tile-200-x-100mm-fttl16935-product.html",
                    "https://www.ctm.co.za/trellick-grey-shiny-ceramic-floor-tile-500-x-500mm-product.html",
                    "https://www.ctm.co.za/stage-ivory-matt-ceramic-wall-tile-250-x-400mm-ws1cst11a4l-product.html",
                    "https://www.ctm.co.za/network-charcoal-matt-ceramic-wall-tile-600-x-300mm-product.html",
                    "https://www.ctm.co.za/linden-grey-ecotec-matt-porcelain-floor-tile-450-x-900mm-gr1cli213e-product.html",
                    "https://www.ctm.co.za/kilimanjaro-chwaka-slate-slip-resistant-porcelain-floor-tile-350-x-350mm-vt1kch00353a-v1-product.html",
                    "https://www.ctm.co.za/ibumba-rouge-matt-porcelain-floor-tile-350-x-350-mm-vt1vib70351-product.html",
                    "https://www.ctm.co.za/cyprus-rectified-matt-hardbody-ceramic-floor-tile-600-x-600mm-sp1ccy21m1qa-product.html",
                    "https://www.ctm.co.za/cobblestone-matt-ceramic-floor-tile-430-x-430mm-product.html",
                    "https://www.ctm.co.za/alika-grey-shiny-ceramic-floor-tile-430-x-430mm-product.html",
                    "https://www.ctm.co.za/dover-grey-ecotec-rectified-matt-hard-body-floor-tile-600-x-600mm-product.html",
                    "https://www.ctm.co.za/argento-grey-matt-recified-hard-body-floor-tile-600-x-600mm-sp1car20m1qa-product.html",
                    "https://www.ctm.co.za/linden-cement-grey-ecotec-matt-porcelain-floor-tile-450-x-900mm-gr1cli213e-product.html",
                    "https://www.ctm.co.za/carrara-white-glazed-polished-hardbody-floor-tile-dcsu021-600-x-600mm-product.html",
                    "https://www.ctm.co.za/cyprus-rectified-matt-hardbody-floor-tile-600-x-600mm-sp1ccy21m1qa-product.html"

                ];
                // function shouldRunCode() {
                //     var currentURL = window.location.href;
                //     return urlsToRunCode.includes(currentURL);
                // }
                function shouldRunCode() {
                    var currentURL = window.location.href;
                    return urlsToRunCode.some(url => currentURL.startsWith(url));
                }

                // Run your code if the condition is met
                if (shouldRunCode()) {
                    // Place your code here
                    window.crotest_KI232_Shorter_SeeFeel_Videos = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004151385"]);
                    console.log("Test Recipe KI232 | Shorter See-Feel Videos | ALL Activated");
                }
            },
            test_Recipe_213_PLP_addtocart_popup_clarity_updates_All_CRO648() {
                var pathCheck = window.location.pathname;
                if (pathCheck.indexOf('category.html') != -1 && pathCheck.indexOf('tiles') != -1) {
                    window.crotest_213_PLP_addtocart_popup = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004154645"]);
                    console.log("Test Recipe 213 | PLP add-to-cart pop-up clarity updates | All | CRO-648 Activated");
                }
            },
            test_Recipe_215_Hide_VI3D_Keep_VIMR_PDP_All() {
                var pathCheck = window.location.pathname;
                if (pathCheck.indexOf('.html') != -1 && pathCheck.indexOf('tile') != -1) {
                    lib.waitForElement('#maincontent.page-main .media-info-main .product.media .roomvo-product-display-button-desktop', function () {
                        window.crotest_215_Hide_VI3D_Keep_VIMR_PDP_All = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "100489027"]);
                        console.log("Test Recipe 215 | Hide VI3D (Keep VIMR) PDP | All Activated");
                    }, 25, 15000);
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
                    window._conv_q.push(["executeExperiment", "1004158374"]);
                    console.log("Test Recipe 129 | Buy Now Pay later accordian | ALL | CRO-3228 Activated");
                    // }, 25, 15000);
                }
            }, test_KI238_KI239_KI240_Emphasizing_Tile_Calculator_Button_ALL_CRO5285() {
                var pathCheck = window.location.pathname;
                if (pathCheck.includes('product.html')) {
                    lib.waitForElement('#calc_btn', function () {
                        window.crotest_Emphasizing_Tile_Calculator_Button_CRO5285 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004162891"]);
                        console.log("Test Recipe KI238.KI239.KI240 | Emphasizing Tile Calculator Button | ALL | CRO-5285 Activated");
                    }, 25, 15000);
                }
            }
        };

        experiments.test_Recipe_KI232_Shorter_SeeFeel_Videos_ALL();
        experiments.test_177_178_179_USPs();
        // experiments.test_121_videos();
        // experiments.test_130();
        // experiments.test_63_89_101_Installation_products_clarity_All();
        experiments.test_196_PLP_Tile_CTA_switch();

        experiments.test_Recipe_213_PLP_addtocart_popup_clarity_updates_All_CRO648();
        experiments.test_Recipe_215_Hide_VI3D_Keep_VIMR_PDP_All();
        experiments.test_Recipe_129_Buy_Now_Pay_later_accordian_ALL_CRO_3228();
        experiments.test_KI238_KI239_KI240_Emphasizing_Tile_Calculator_Button_ALL_CRO5285();
        console.log("Global JavaScript Activate");
        /**
         * Activate all experiments on location change
         */
        function activateExpOnPageChange() {
            experiments.test_177_178_179_USPs();
            // experiments.test_121_videos();
            // experiments.test_130();
            // experiments.test_63_89_101_Installation_products_clarity_All();
            experiments.test_196_PLP_Tile_CTA_switch();
            experiments.test_Recipe_KI232_Shorter_SeeFeel_Videos_ALL();
            experiments.test_Recipe_213_PLP_addtocart_popup_clarity_updates_All_CRO648();
            experiments.test_Recipe_215_Hide_VI3D_Keep_VIMR_PDP_All();
            experiments.test_Recipe_129_Buy_Now_Pay_later_accordian_ALL_CRO_3228();

        }
        lib.listener(activateExpOnPageChange);
    } catch (e) {
        console.log("Error in Global JavaScript");
    }
})();