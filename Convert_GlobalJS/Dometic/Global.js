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
            test_KI213_KI211_KI210_KI212_Static_USP_strip_and_emphasis_of_USPs_on_PDP_ALL_CRO8905() {
                setTimeout(function () {
                    var url = window.location.href;
                    if (url.includes('/en-us/product')) {
                        window.crotest_KI213_KI211_KI210_KI212_Static_USP_strip_and_emphasis = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004191584"]);
                        console.info("Experiment Recipe KI213.KI211.KI210.KI212 | Static USP strip and emphasis of USPs on PDP | ALL | CRO-8905 Activated");
                    } else {
                        if (document.querySelector('.CRO_8905_Static_USP_strip')) {
                            document.querySelector('body').classList.remove('CRO_8905_Static_USP_strip');
                        }

                        if (document.querySelector('.cro_outStock')) {
                            document.querySelector('body').classList.remove('cro_outStock');
                        }

                        if (document.querySelector('.cro_activeStock')) {
                            document.querySelector('body').classList.remove('cro_activeStock');
                        }

                        if (document.querySelector('.cro_findStore')) {
                            document.querySelector('body').classList.remove('cro_findStore');
                        }

                        if (document.querySelector('.cro-rack-page')) {
                            document.querySelector('body').classList.remove('cro-rack-page');
                        }
                    }
                }, 600)
            }, test_Rack_PDP_optimisation_All_CRO12206() {
                setTimeout(function () {
                    lib.waitForElement('.product-details nav [data-slot="breadcrumb-item"] a[href="/en-us/category/rack-systems/racks"], .product-details nav [data-slot="breadcrumb-item"] a[href="/en-za/category/rack-systems/racks"], .product-details nav [data-slot="breadcrumb-item"] a[href="/de-de/kategorie/rack-systems/racks"]', function () {
                        var sku = document.querySelector('.product-details nav [data-slot="breadcrumb-item"] a[href*="/rack-systems/racks"]')
                        if (sku) {
                            window.crotest_Rack_PDP_optimisation_All_CRO12206 = 1;
                            window._conv_q = window._conv_q || [];
                            window._conv_q.push(["executeExperiment", "1004201653"]);
                            console.info("Experiment Rack PDP optimisation | All | CRO-12206 Activated");

                        } else {
                            if (document.querySelector('.CRO_12180_Slimline_PDP_V1')) {
                                document.querySelector('body').classList.remove('CRO_12180_Slimline_PDP_V1');
                                console.log('remove from PDP')
                            }
                        }
                    }, 50, 15000)


                    if (document.querySelector(".product-details") && document.querySelector('.CRO_12180_Slimline_PDP_V1') && !document.querySelector('.product-details nav [data-slot="breadcrumb-item"] a[href*="/rack-systems/racks"]')) {

                        var intervalCallAgain = setInterval(function () {
                            if (document.querySelector(".product-details") && document.querySelector('.CRO_12180_Slimline_PDP_V1') && !document.querySelector('.product-details nav [data-slot="breadcrumb-item"] a[href*="/rack-systems/racks"]')) {
                                document.querySelector('body').classList.remove('CRO_12180_Slimline_PDP_V1');
                                console.log('remove from Not PDP');
                            }
                        }, 400);
                        setTimeout(function () {
                            clearInterval(intervalCallAgain);
                        }, 7000);
                    }

                    if (!document.querySelector(".product-details") && document.querySelector('.CRO_12180_Slimline_PDP_V1')) {
                        document.querySelector('body').classList.remove('CRO_12180_Slimline_PDP_V1');
                    }
                }, 600)
            },
            test_Recipe_Rack_PDP_Conventional_Gallery_V1_Desktop_CRO12242() {
                var url = window.location.href;
                if (url.includes('/product') || url.includes('/produkt')) {
                    window.crotest_Rack_PDP_Conventional_Gallery_V1_Desktop_CRO12242 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004201578"]);
                    console.info("Experiment Recipe | Rack PDP Conventional Gallery V1 | Desktop | CRO-12242 Activated");
                } else {
                    setTimeout(function () {
                        if (!document.querySelector(".product-details") && document.querySelector('.CRO_12334_Rack_PDP_Conventional_Gallery')) {
                            document.querySelector('body').classList.remove('CRO_12334_Rack_PDP_Conventional_Gallery');
                        }
                    }, 600)
                }
            }, test_AB_Test_Video_USP_Tiles_CRO12323() {
                function getProductTitle() {
                    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
                    for (const s of scripts) {
                        try {
                            const data = JSON.parse(s.textContent);
                            if (data['@type'] === 'Product') return data.name;
                        } catch (e) { }
                    }
                    return null;
                }

                const title = getProductTitle();

                const isTargetProduct = title && (
                    /slim\s*pro/i.test(title) ||
                    /slim\s*sport/i.test(title) ||
                    /slimline\s*ii/i.test(title)
                );

                if (isTargetProduct) {
                    // run your test
                    window.crotest_AB_Test_Video_USP_Tiles_CRO12323 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004203070"]);
                    console.info("Experiment AB Test | Video USP Tiles | CRO-12323 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.CRO_12323_Video_USP_Tiles')) {
                            document.querySelector('body').classList.remove('CRO_12323_Video_USP_Tiles')
                        }
                    }, 400)

                }
            }, test_AB_Test_Cart_Popup_Post_add_to_cart_confirmation_ALL_CRO12443() {
                var url = window.location.href;
                if (url.includes('/product') || url.includes('/produkt')) {
                    window.crotest_Cart_Popup_Post_add_to_cart = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004203075"]);
                    console.info("Experiment AB Test | Cart Pop-up | Post add-to-cart confirmation | ALL | CRO-12443 Activated");
                } else {
                    setTimeout(function () {
                        if (!document.querySelector(".product-details") && document.querySelector('.CRO12443')) {
                            document.querySelector('body').classList.remove('CRO12443');
                        }
                    }, 600)
                }
            }
        };

        console.log("Global JavaScript Activate");
        experiments.test_KI213_KI211_KI210_KI212_Static_USP_strip_and_emphasis_of_USPs_on_PDP_ALL_CRO8905();
        experiments.test_Rack_PDP_optimisation_All_CRO12206();
        experiments.test_Recipe_Rack_PDP_Conventional_Gallery_V1_Desktop_CRO12242();
        experiments.test_AB_Test_Video_USP_Tiles_CRO12323();
        experiments.test_AB_Test_Cart_Popup_Post_add_to_cart_confirmation_ALL_CRO12443();
        /**
         * Activate all experiments on location change
         */
        function activateExpOnPageChange() {
            experiments.test_KI213_KI211_KI210_KI212_Static_USP_strip_and_emphasis_of_USPs_on_PDP_ALL_CRO8905();
            experiments.test_Rack_PDP_optimisation_All_CRO12206();
            experiments.test_Recipe_Rack_PDP_Conventional_Gallery_V1_Desktop_CRO12242();
            experiments.test_AB_Test_Video_USP_Tiles_CRO12323();
            experiments.test_AB_Test_Cart_Popup_Post_add_to_cart_confirmation_ALL_CRO12443();

        }

        if (!window.cro_globalJs) {
            lib.listener(activateExpOnPageChange);
            window.cro_globalJs = true;
        }

    } catch (e) {
        console.log("Error in Global JavaScript");
    }
})();