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
                    "/za/p/3871/chenin-blanc-2025",
                    "/za/p/869/hot-cross-bun-loaf",
                    "/za/p/5724/clutch-of-chocolate-eggs",
                    "/za/p/5728/hatching-speckled-eggs",
                    "/za/p/5723/chicken-coop",
                    "/za/p/3783/egg-basket",
                    "/za/p/4785/canola-oil",
                    "/za/p/4521/babylonstoren-coffee-beans-037062",
                    "/za/p/5529/forest-raised-deep-bowl",
                    "/za/p/4254/outydse-koekieblik-122db4",
                    "/za/p/2038/leg-of-lamb",
                    "/za/p/5729/spikkels-die-hen",
                    "/za/p/3269/golden-gourmet",
                    "/za/p/3930/beef-biltong",
                    "/za/p/5726/lucky-ladybirds",
                    "/za/p/4885/rose-garland-blanket",
                    "/za/p/5743/the-easter-s-mores-soiree",
                    "/za/p/5790/sweet-salty-738a27",
                    "/za/p/4288/classic-collective",
                    "/za/p/3482/yellowtail-portions",
                    "/za/p/3933/blue-delft-knit-throw",
                    "/za/p/5718/hot-cross-chocolate-biscuits",
                    "/za/p/5814/eco-friendly-compact-umbrella-dots",
                    "/za/p/5512/everyday-energy-c65edc",
                    "/za/p/5781/packing-cube-set",
                    "/za/p/892/seasonal-harvest-box",
                    "/za/p/4041/ladies-lounge-set",
                    "/za/p/3931/beef-droewors",
                    "/za/p/3470/half-lamb",
                    "/za/p/5600/dried-mango-strips",
                    "/za/p/4458/fermentation-crock",
                    "/za/p/5732/easter-bites-6c3364",
                    "/za/p/2681/dark-chocolate-macadamia-nut-torte",
                    "/za/p/3920/almond-coconut-seed-granola",
                    "/za/p/5710/easter-egg-hunt",
                    "/za/p/3194/farmstyle-buttermilk-rusks",
                    "/za/p/557/bitterlekker",
                    "/za/p/1814/belgian-milk-chocolate-yoghurt-medium",
                    "/za/p/5722/duck-duck-goose-soetkoekie",
                    "/za/p/5017/chicken-curry-mild-7ec6ac",
                    "/za/p/5791/chickpea-aubergine-curry",
                    "/za/p/5746/hot-cross-cruffins",
                    "/za/p/5202/aluminium-bowl",
                    "/za/p/4986/milk-tart-de-natas-pack-of-12",
                    "/za/p/5478/babylonstoren-coffee-ground-ee0e87",
                    "/za/p/3845/natural-embroidered-tablecloth",
                    "/za/p/2699/gianduia",
                    "/za/p/4774/babel-bites-bf7529",
                    "/za/p/2229/trio-of-tea"
                ];

                if (
                    croAllowedPaths.indexOf(cro_pathName) > -1 &&
                    !window.croTest_Recipe_Buy_Box_PDP_Buy_Box_Redesign_ALL_CRO12051
                ) {
                    window.croTest_Recipe_Buy_Box_PDP_Buy_Box_Redesign_ALL_CRO12051 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004196676"]);
                    console.log("Experiment Recipe | Buy Box | PDP Buy Box Redesign | ALL | CRO-12051 Activated");
                } else {
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
                }
            }
        };

        console.log("Global JavaScript Activate");

        experiments.test_AddingDataPath();
        experiments.test_KI5_Simplifying_Product_Categories_and_Removing_Carousel_ALL_CRO6400();
        experiments.test_Recipe_Buy_Box_PDP_Buy_Box_Redesign_ALL_CRO12051();

    } catch (e) {
        console.log("Error in Global JavaScript", e);
    }
})();