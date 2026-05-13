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

        /**
         * Trigger converion goal
         */

        /**
         * Manual activation
         */
        var cro_pathName = window.location.pathname;
        var cro_href = window.location.href;

        var experiments = {
            test_AddingDataPath() {
                var pathName = window.location.pathname;

                lib.waitForElement('html', function () {
                    var htmlTag = document.querySelector('html');
                    htmlTag.setAttribute('cro-datapath', pathName);
                }, 25, 15000);
            },
            test_KI5_Simplifying_Product_Categories_and_Removing_Carousel_ALL_CRO6400() {
                if (cro_pathName == '/za' && window.innerWidth < 992) {
                    window.croTest_KI5_Simplifying_Product_Categories_and_Removing_Carousel_ALL_CRO6400 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004172383"]);
                    console.log("Experiment Recipe KI5 | Simplifying Product Categories and Removing Carousel | ALL | CRO-6400 Activated");
                }
            },
            test_Recipe_Buy_Box_PDP_Buy_Box_Redesign_ALL_CRO12051() {


                var croAllowedPaths = [
                    "/za/p/557/bitterlekker",
                    "/za/p/3871/chenin-blanc-2025",
                    "/za/p/4254/outydse-koekieblik-122db4",
                    "/za/p/3930/beef-biltong",
                    "/za/p/4774/babel-bites-bf7529",
                    "/za/p/4521/babylonstoren-coffee-beans-037062",
                    "/za/p/4288/classic-collective",
                    "/za/p/3269/golden-gourmet",
                    "/za/p/3933/blue-delft-knit-throw",
                    "/za/p/3931/beef-droewors",
                    "/za/p/5360/torta-di-gelato",
                    "/za/p/5529/forest-raised-deep-bowl",
                    "/za/p/3920/almond-coconut-seed-granola",
                    "/za/p/3370/chocolate-boutique",
                    "/za/p/5512/everyday-energy-c65edc",
                    "/za/p/4458/fermentation-crock",
                    "/za/p/4785/canola-oil",
                    "/za/p/3826/delft-tablecloth",
                    "/za/p/5111/nuts-about-nibbles",
                    "/za/p/2699/gianduia",
                    "/za/p/4942/rooibos-honeybush-kombucha-with-fresh-ginger",
                    "/za/p/2492/garden-advent-calendar",
                    "/za/p/2229/trio-of-tea",
                    "/za/p/5065/panino-collection-pack-of-4",
                    "/za/p/5478/babylonstoren-coffee-ground",
                    "/za/p/5454/diving-duck-doorstop",
                    "/za/p/4885/rose-garland-blanket",
                    "/za/p/4171/tortoise-treasures",
                    "/za/p/4238/rooibos-honeybush-kombucha",
                    "/za/p/5295/oom-roelof-s-chianina-beef-lasagne-a3dc7c",
                    "/za/p/5230/summer-heirloom-candle",
                    "/za/p/2681/dark-chocolate-macadamia-nut-torte",
                    "/za/p/5600/dried-mango-strips",
                    "/za/p/5311/blissful-moment",
                    "/za/p/1822/sweet-summer-bliss",
                    "/za/p/5556/sweet-snack-box-4e69e5",
                    "/za/p/4957/bites-of-bliss-e81246",
                    "/za/p/5109/decadently-delft-8f36cf",
                    "/za/p/5231/baci-di-gelato",
                    "/za/p/5202/aluminium-bowl",
                    "/za/p/3865/mourvedre-rose-2025",
                    "/za/p/5179/caramel-espresso-moments",
                    "/za/p/3845/natural-embroidered-tablecloth",
                    "/za/p/4227/babel-2024",
                    "/za/p/5113/simple-pleasures-1c64f4",
                    "/za/p/5110/simple-spoils",
                    "/za/p/5167/savoury-selection-9467f1",
                    "/za/p/3350/lazy-grazing",
                    "/za/p/4254/outydse-koekieblik",
                    "/za/p/5178/teekoekies",
                    "/za/p/5269/west-coast-fynbos-raw-honey",
                    "/za/p/3846/white-embroidered-tablecloth",
                    "/za/p/4692/fynbos-raw-honey",
                    "/za/p/5464/lilac-delft-collage-tablecloth",
                    "/za/p/4041/ladies-lounge-set",
                    "/za/p/5017/chicken-curry-mild",
                    "/za/p/4091/babylonstoren-book",
                    "/za/p/5320/sweet-salty",
                    "/za/p/5107/tuinier-fragrance-oils-exploration-set",
                    "/za/p/4590/orange-dark-chocolate-malvalekkers",
                    "/za/p/4959/the-orchard-offering",
                    "/za/p/2197/olive-oil-trio",
                    "/za/p/5575/with-love-hamper-021940",
                    "/za/p/4343/summer-blues-tablecloth",
                    "/za/p/23/extra-virgin-olive-oil-blend",
                    "/za/p/5506/scalloped-flower-frog",
                    "/za/p/4428/reusable-shopper",
                    "/za/p/5184/chocolate-honeycomb-rocks"
                ];

                var isCroAllowedPath = croAllowedPaths.some(function (allowedPath) {
                    return cro_pathName.indexOf(allowedPath) > -1;
                });

                if (isCroAllowedPath) {
                    window.croTest_Recipe_Buy_Box_PDP_Buy_Box_Redesign_ALL_CRO12051 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004196676"]);
                    console.log("Experiment Recipe | Buy Box | PDP Buy Box Redesign | ALL | CRO-12051 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.CRO-12051')) {
                            document.querySelector('body').classList.remove('CRO-12051');
                        }

                        if (document.querySelector('.cro-12051-payment')) {
                            document.querySelector('.cro-12051-payment').remove();
                        }

                        if (document.querySelector('.cro-12051-delivery')) {
                            document.querySelector('.cro-12051-delivery').remove();
                        }

                        if (document.querySelector('.cro-12051-usp-strip')) {
                            document.querySelector('.cro-12051-usp-strip').remove();
                        }
                    }, 500)
                }
            },
            test_Merch_Order_Hampers_PLP_RPV_Ranked_ALL_CRO12204() {

                var croAllowedPaths = [
                    "/za/pl/61/categories/gifting/hampers"
                ];

                var isCroAllowedPath = croAllowedPaths.some(function (allowedPath) {
                    return cro_pathName.indexOf(allowedPath) > -1;
                });

                if (isCroAllowedPath) {
                    window.croTest_Merch_Order_Hampers_CRO12204 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004198013"]);
                    console.log("Experiment Merch Order | Hampers PLP RPV-Ranked | ALL | CRO-12204 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-007')) {
                            document.querySelector('body').classList.remove('cro-007');
                        }
                    }, 500)
                }
            }
        };

        console.log("Global JavaScript Activate");

        experiments.test_AddingDataPath();
        experiments.test_KI5_Simplifying_Product_Categories_and_Removing_Carousel_ALL_CRO6400();
        experiments.test_Recipe_Buy_Box_PDP_Buy_Box_Redesign_ALL_CRO12051();
        experiments.test_Merch_Order_Hampers_PLP_RPV_Ranked_ALL_CRO12204();

    } catch (e) {
        console.log("Error in Global JavaScript", e);
    }
})();