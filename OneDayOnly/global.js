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

        function trigger() {
            var doneTypingInterval = 5000;  //time in ms, 5 seconds for example
            var intervalCallAgain = setInterval(function () {
                croOneDayCustom();
            }, 400);

            //start the countdown
            var Timer = setTimeout(function () {
                clearInterval(intervalCallAgain);
            }, doneTypingInterval);

        }

        function croOneDayCustom() {
            lib.waitForElement('button[type="button"]', function () {
                document.querySelectorAll('button[type="button"]').forEach(function (e) {
                    if (e.innerText.indexOf('I WANT ONE') != -1) {
                        e.setAttribute('data-action', 'add-to-cart');

                        var closestAncestor = e?.closest('[class*="css"]')
                            ?.parentElement
                            ?.closest('[class*="css"]')
                            ?.parentElement
                            ?.closest('[class*="css"]');

                        if (closestAncestor) {
                            closestAncestor.setAttribute('cro-proBtn', 'cro-wantOneBtn');
                        } else {
                            console.log('Could not find all required ancestors');
                        }
                    }

                    if (e.innerHTML.indexOf('Submit Order') != -1 || e.innerHTML.indexOf('Submitting Order') != -1) {
                        e.setAttribute('data-action', 'Submit-Order');
                    }
                });

            }, 25, 15000);

            lib.waitForElement('#product-quantity-select', function () {
                var element = document.querySelector('#product-quantity-select');
                var closestAncestor = element?.closest('[class*="css"]')
                    ?.parentElement
                    ?.closest('[class*="css"]')
                    ?.parentElement
                    ?.closest('[class*="css"]')
                    ?.parentElement;

                if (closestAncestor) {
                    closestAncestor.setAttribute('cro-quantity', 'cro-product');
                } else {
                    console.log('Could not find all required ancestors');
                }
            }, 25, 15000);
        }

        function waitForComponentAndProps(path, trigger) {
            var interval = setInterval(function () {
                try {
                    // Check if `window.next.router.components` and the specified path exist
                    if (
                        window.next &&
                        window.next.router &&
                        window.next.router.components &&
                        window.next.router.components[path] &&
                        window.next.router.components[path]["props"] &&
                        window.next.router.components[path]["props"].pageProps &&
                        window.next.router.components[path]["props"].pageProps["layout"]
                    ) {
                        clearInterval(interval); // Stop the interval
                        const indexPath = window.next.router.components[path]["props"].pageProps["layout"].selectedTopTab;
                        trigger(indexPath); // Trigger the callback with the value
                    }
                } catch (e) {
                    // Catch errors in case of unexpected structure
                    console.error("Error checking components:", e);
                }
            }, 50);

            // Stop checking after 15 seconds
            setTimeout(function () {
                clearInterval(interval);
            }, 15000);
        }

        function addingAttribute(location) {
            lib.waitForElement('html', function () {
                document.querySelector('html').setAttribute('pagePath', location);
            }, 25, 15000)
        }

        function checkObserver() {
            var targetSelector = "#__next .spacer";
            var observer = null; // define in outer scope

            function initObserver() {
                var targetNode = document.querySelector(targetSelector);
                if (!targetNode) return;

                // disconnect if already observing
                if (observer) observer.disconnect();

                var config = {
                    childList: true,       // watch for added/removed nodes
                    subtree: true,         // watch inside children too
                    attributes: true,      // watch for attribute changes
                    characterData: true    // watch for text changes
                };

                observer = new MutationObserver(function (mutationsList) {
                    console.log("Change detected inside", targetSelector, mutationsList);
                    window.crotest_KI64_Checkout_sticky_button = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004166275"]);
                    console.log("Experiment KI64 | Checkout sticky button | MOBILE | CRO-4802 Activated");

                });

                observer.observe(targetNode, config);
                console.log("✅ MutationObserver attached to", targetSelector);
            }

            if (window.location.href.includes("/checkout")) {
                // Wait for the element to appear if not instantly available
                var checkInterval = setInterval(function () {
                    if (document.querySelector(targetSelector)) {
                        clearInterval(checkInterval);
                        initObserver();
                    }
                }, 200);

                // safety timeout
                setTimeout(function () {
                    clearInterval(checkInterval);
                }, 10000);
            } else {
                if (observer) {
                    observer.disconnect();
                    observer = null;
                    console.log("❌ MutationObserver disconnected (not on checkout page)");
                }
            }
        }

        var experiments = {
            test_AddingDataPath() {
                var pathName = window.location.pathname;
                lib.waitForElement('html', function () {
                    var htmlTag = document.querySelector('html')
                    htmlTag.setAttribute('cro-datapath', pathName);
                }, 25, 15000)

                if (pathName.includes('/products')) {
                    waitForComponentAndProps("/products/[id]", function (indexPath) {
                        console.log("Found indexPath:", indexPath);
                        addingAttribute(indexPath)
                    });
                }

                if (pathName == '/') {
                    addingAttribute('home')
                } else if (pathName.includes('/category')) {
                    addingAttribute('home')
                } else if (pathName.includes('/extra-time-deals')) {
                    addingAttribute('extra-time-deals');
                    function addingClass() {
                        var element = document.querySelector('div#__next picture');
                        var closestAncestor = element?.closest('[class*="css"]')
                            ?.parentElement
                            ?.closest('[class*="css"]')
                            ?.parentElement
                            ?.closest('[class*="css"]')
                            ?.parentElement;

                        if (closestAncestor) {
                            closestAncestor.setAttribute('cro-MainContainer', 'cro-product-container');
                        }
                    }

                    lib.waitForElement('div#__next picture', function () {
                        addingClass();
                    }, 25, 15000)
                } else if (pathName.includes('/everyday-essentials')) {
                    addingAttribute('everyday-essentials')
                } else if (pathName.includes('/gift-vouchers')) {
                    addingAttribute('gift-vouchers')
                } else if (pathName.includes('/clearance-sale')) {
                    addingAttribute('clearancesale')
                } else if (pathName.includes('/checkout')) {
                    var cro_search = window.location.search;
                    if (cro_search) {
                        addingAttribute('checkout' + cro_search + '')
                        console.log('added')
                    } else {
                        addingAttribute('checkout')
                    }

                } else {
                    addingAttribute('')
                }
            },
            test_AddingClass_ProductPage() {
                var pathName = window.location.pathname;
                if (pathName.includes('/products') || pathName.includes('/checkout')) {
                    trigger();
                }
            },
            test_10_ATC_icon_on_PLP() {
                var pathName = window.location.pathname;
                if (pathName.includes('/shops') || pathName.includes('/category') || pathName.includes('/clearance-sale')) {
                    window.crotest_ATC_10 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004105382"]);
                    console.log("Experiment Recipe 10 | ATC icon on PLP | All Activated");
                }
            },
            test_26_Keep_sub_navigation_search_visible() {
                var pathName = window.location.pathname;
                if (pathName.includes('/shops') || pathName.includes('/category') || pathName.includes('/clearance-sale') || pathName == '/') {
                    window.crotest_26 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004111779"]);
                    console.log("Experiment Recipe 26 | Keep sub-navigation & search visible | All Activated");
                }
            },
            test_12_Verified_vendor_badge() {
                var pathName = window.location.pathname;
                if (pathName.includes('/products')) {
                    window.crotest_vendorBadge_12 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004111780"]);
                    console.log("Experiment Recipe 12 | Verified vendor badge | All Activated");
                }
            },
            test_4_Continue_to_payment_CTA() {
                var pathName = window.location.pathname;
                if (pathName.includes('/checkout')) {
                    window.crotest_4_CTA = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004114046"]);
                    console.log("Experiment 4 | Continue to payment CTA | All Activated");
                }
            },
            test_11_27() {
                if (window.location.href.indexOf('/') != -1) {
                    // lib.waitForElement('html[pagepath="home"],html[pagepath="everyday-essentials"], html[pagepath="clearancesale"], html[pagepath="extra-time-deals"]', function () {
                    window.crotest_11_27 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004117808"]);
                    console.log("Experiment Recipe 11.27 | Category clarity | All | ODO-136 Activated");
                    // }, 25, 15000)
                }
            },
            test_1_Add_to_cart_CTA_All() {
                var pathName = window.location.pathname;
                if (pathName.includes('/products')) {
                    window.crotest_1_Add_to_Cart = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004102488"]);
                    console.log("Experiment Recipe 1 | Add to cart CTA | All Activated");
                }
            },
            test_18_2_tab_login_page_All() {
                var pathName = window.location.pathname;
                if (pathName.includes('/checkout')) {
                    // html[cro-datapath='/checkout'] body form
                    lib.waitForElement("html[cro-datapath='/checkout'] body form", function () {
                        document.querySelectorAll("html[cro-datapath='/checkout'] body h2").forEach(function (e) {
                            if (e.innerHTML.includes('Log in') || e.innerHTML.includes('Create account')) {
                                window.crotest_login_tab = 1;
                                window._conv_q = window._conv_q || [];
                                window._conv_q.push(["executeExperiment", "1004104418"]);
                                console.log("Experiment Recipe 18 | 2 tab login page | All Activated");
                            }
                        })
                    }, 25, 15000);
                    setTimeout(function () {
                        if (!document.querySelector("html[cro-datapath='/checkout'] body form")) {
                            console.log('-----selector not found')
                            if (document.querySelector('.cro18-checkout-page')) {
                                document.querySelector('body').classList.remove('cro18-checkout-page')
                            }

                            if (document.querySelector('.cro18-login')) {
                                document.querySelector('body').classList.remove("cro18-login");
                            }

                            if (document.querySelector('.cro18-create-account')) {
                                document.querySelector('body').classList.remove("cro18-create-account");
                            }
                        }
                    }, 2000)

                    function removeClass(el, cls) {
                        var el = document.querySelector(el);
                        if (el) {
                            el.classList.contains(cls) && el.classList.remove(cls);
                        }
                    }

                    lib.live('button[type="button"]', 'click', function () {
                        if (document.querySelector('.cro18-checkout-page')) {

                            removeClass("body", "cro18-checkout-page");

                        }

                        if (document.querySelector('.cro18-login')) {
                            removeClass("body", "cro18-login");
                        }

                        if (document.querySelector('.cro18-create-account')) {
                            removeClass("body", "cro18-create-account");
                        }
                    })
                }

                if (pathName.indexOf('/checkout') == -1) {
                    console.log('-----not checkout');
                    if (document.querySelector('.cro18-checkout-page')) {
                        document.querySelector('body').classList.remove('cro18-checkout-page')
                    }

                    if (document.querySelector('.cro18-login')) {
                        document.querySelector('body').classList.remove("cro18-login");
                    }

                    if (document.querySelector('.cro18-create-account')) {
                        document.querySelector('body').classList.remove("cro18-create-account");
                    }
                }
            },
            test_Recipe_30_Price_filters_on_PLPs_All() {
                var pathName = window.location.pathname;
                if (pathName.includes('/shops/everyday-essentials') || pathName.includes('/shops/extra-time-deals') || pathName.includes('/clearance-sale')) {
                    window.crotest_30_Price_filters = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004134486"]);
                    console.log("Experiment Recipe 30 | Price filters on PLPs | All Activated");
                }
            },
            test_Recipe_7_Stock_left_counter_on_PLP_All_CRO_335() {
                var pathName = window.location.href;
                if (pathName.includes('/category') || pathName.includes('/everyday-essentials') || pathName.includes('/extra-time-deals') || pathName.includes('/clearance-sale')) {
                    window.crotest_7_Stock_left_counter = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004137601"]);
                    console.log("Experiment Recipe 7 | Stock left counter on PLP | All | CRO-335 Activated");
                }
            },
            test_Recipe_KI5_Category_sidebar_menu_DESKTOP_CRO_338() {
                var pathName = window.location.href;
                if (pathName.includes('/category')) {
                    window.crotest_KI5_Category_sidebar_menu = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004137841"]);
                    console.log("Experiment Recipe KI5 | Category sidebar menu | DESKTOP | CRO-338 Activated");
                }
            },
            test_Recipe_55_Add_sort_by_labels_to_ETD_page_v1() {
                var pathName = window.location.pathname;
                if (pathName.includes('/extra-time-deals')) {
                    window.crotest_55_filters_v1 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004141929"]);
                    console.log("Experiment Recipe 55 | Add sort by labels to ETD page (V1) Activated");
                }
            },
            test_Recipe_55_Add_sort_by_labels_to_ETD_page_v2() {
                var pathName = window.location.pathname;
                if (pathName.includes('/extra-time-deals')) {
                    window.crotest_55_filters_v2 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004142698"]);
                    console.log("Experiment Recipe 55 | Add sort by labels to ETD page (V2) Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-30')) {
                            document.querySelector('body').classList.remove('cro-t-30')
                        }
                    }, 600)

                }
            },
            test_Recipe_54_55_56_Product_card_hierarchy_improvements_XTD_page_All() {
                var pathName = window.location.pathname;
                if (pathName.includes('/extra-time-deals')) {
                    window.crotest_54_55_56_Product_card_hierarchy = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004149785"]);
                    console.log("Experiment Recipe 54.55.56 | Product card hierarchy improvements XTD page | All Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-oneDay-xtd-54_56')) {
                            document.querySelector('body').classList.remove('cro-t-oneDay-xtd-54_56')
                            window.cro_t_xtd_54_55_56 = false;
                        }
                    }, 400)
                }
            },
            test_Recipe_47_48_49_50_51_52_Improve_spacing_and_legibility_on_XTD_page_All() {
                var pathName = window.location.pathname;
                if (pathName.includes('/extra-time-deals')) {
                    window.crotest_47_48_49_50_51_52_Improve_spacing = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004151207"]);
                    console.log("Experiment Recipe 47.48.49.50.51.52 | Improve spacing and legibility on XTD page | All Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro_t_47_52_cro_t_legibility')) {
                            document.querySelector('body').classList.remove('cro_t_47_52_cro_t_legibility')
                            window.cro_t_47_48_49_50_51_52 = false;
                        }
                    }, 400)
                }
            },
            test_Recipe_KI33_Delivery_Time_Context_Enhancement_ALL_CRO337() {
                var pathName = window.location.pathname;
                if (pathName.includes('/products')) {
                    window.crotest_KI33_Delivery_Time_Context_Enhancement_ALL_CRO337 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004136452"]);
                    console.log("Experiment Recipe KI33 | Delivery Time Context Enhancement | ALL | CRO-337 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-KI-33')) {
                            document.querySelector('body').classList.remove('cro-t-KI-33')
                            window.cro_t_KI33 = false;
                        }
                    }, 400)
                }
            },
            test_KI35_Back_to_category_navigation_on_PDP_ALL_CRO352() {
                var pathName = window.location.pathname;
                if (pathName.includes('/products')) {
                    window.crotest_KI35_Back_to_category = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004154654"]);
                    console.log("Experiment Recipe KI35 | Back to category navigation on PDP | ALL | CRO-352 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-352-stickyNav')) {
                            document.querySelector('body').classList.remove('cro-t-352-stickyNav')
                        }
                    }, 400)
                }
            },
            test_Recipe_KI46_Enhancing_Visibility_of_Product_Titleson_PLPs_ALL() {
                var pathName = window.location.href;
                if (!pathName.includes('/category') && !pathName.includes('/everyday-essentials') && !pathName.includes('/clearance-sale')) {
                    // window.crotest_KI46_Enhancing_Visibility = 1;
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-ki46')) {
                            document.querySelector('body').classList.remove('cro-t-ki46')
                        }
                    }, 400)
                }
            },
            test_KI54_SAVE_percentage_labels_clarity_CRO4025() {
                var pathName = window.location.href;
                if (pathName.includes('/extra-time-deals')) {
                    window.crotest_KI54_SAVE_percentage_labels_clarity = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004158959"]);
                    console.log("Experiment KI54 | SAVE percentage labels clarity | CRO-4025 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-oneDayOnly-ki54')) {
                            document.querySelector('body').classList.remove('cro-t-oneDayOnly-ki54')
                        }
                    }, 400)
                }
            },
            test_KI60_Pricing_clarity_on_PDP_CRO4030() {
                var pathName = window.location.href;
                if (pathName.includes('/products')) {
                    window.croTest_KI60_Pricing_clarity_on_PDP = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004160516"]);
                    console.log("Experiment KI60 | Pricing clarity on PDP | CRO-4030 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-oneDayOnly-ki60')) {
                            document.querySelector('body').classList.remove('cro-t-oneDayOnly-ki60')
                        }
                    }, 400)
                }
            },
            test_Recipe_KI66_Categorize_products_on_XTD_page_All_CRO5520() {
                var pathName = window.location.href;
                setTimeout(function () {
                    if (!pathName.includes('/shops/extra-time-deals') && document.querySelector('.cro5520')) {
                        document.querySelector('body').classList.remove('cro5520')
                    }
                }, 400)

            }, test_Recipe_KI64_Checkout_sticky_button_MOBILE_CRO4802() {
                var pathName = window.location.pathname;
                if (pathName.includes('/checkout')) {
                    window.crotest_KI64_Checkout_sticky_button = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004166275"]);
                    console.log("Experiment KI64 | Checkout sticky button | MOBILE | CRO-4802 Activated");
                }

                // lib.waitForElement('#__next .spacer', function () {
                //     checkObserver();
                // }, 25, 15000)
            },
            test_i1_XTD_sort_function_ALL_CRO_6211() {
                var pathName = window.location.href;
                console.log("Experiment test_i1_XTD_sort Activated");
                setTimeout(function () {
                    if (!pathName.includes('/shops/extra-time-deals') && document.querySelector('.cro-t-30')) {
                        document.querySelector('body').classList.remove('cro-t-30');
                        console.log("Experiment test_i1_XTD_sort class removed");
                    }
                }, 400)

            },
            test_Recipe_KI62_Oneclick_Checkout_Integration_on_Product_Detail_Page_ALL_CRO_5291() {
                var pathName = window.location.href;
                if (pathName.includes('/products') || pathName.includes('/checkout')) {
                    window.croTest_KI62_Oneclick_Checkout = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004169620"]);
                    console.log("Experiment Recipe KI62 | One-click Checkout Integration on Product Detail Page | ALL | CRO-5291 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-ki62')) {
                            document.querySelector('body').classList.remove('cro-t-ki62')
                        }
                    }, 400)
                }
            },
            test_Recipe_47_48_49_50_51_52_Spacing_legibility_on_XTD_page_Desktop_CRO3284() {
                var pathName = window.location.href;
                if (pathName.includes('/extra-time-deals')) {
                    window.crotest_47_48_49_50_51_52_Spacing_legibility_on_XTD_page_Desktop = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004170957"]);
                    console.log("Experiment Recipe 47.48.49.50.51.52 | Spacing & legibility on XTD page (column only) | Desktop | CRO-3284 Activated");
                }
            },
            test_Recipe_47_48_49_50_51_52_Spacing_legibility_on_XTD_page_Mobile_CRO3284() {
                var pathName = window.location.href;
                if (pathName.includes('/extra-time-deals')) {
                    window.crotest_47_48_49_50_51_52_Spacing_legibility_on_XTD_page_Mobile = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004170960"]);
                    console.log("Experiment Recipe 47.48.49.50.51.52 | Spacing & legibility on XTD page (column only) | Mobile | CRO-3284 Activated");
                }
            },
            test_Recipe_KI63_PDP_Section_titles_update_ALL_CRO_4800() {
                var pathName = window.location.href;
                if (pathName.includes('/products')) {
                    window.crotest_KI63_PDP_Section_titles_update_ALL_CRO_4800 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004171139"]);
                    console.log("Experiment Recipe KI63 | PDP Section titles update | ALL | CRO-4800 Activated");
                }
            },
            test_Recipe_KI67_XTD_Advanced_filtering_ALL_CRO7105() {
                var pathName = window.location.href;
                if (pathName.includes('/extra-time-deals')) {
                    window.crotest_KI67_XTD_Advanced_filtering_ALL_CRO7105 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004180504"]);
                    console.log("Experiment Recipe KI67 | XTD Advanced filtering | ALL | CRO-7105 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-30')) {
                            document.querySelector('body').classList.remove('cro-t-30')
                        }
                    }, 400)
                }
            },
            test_Recipe_KI55_Prominent_Add_To_Cart_Buttons_ALL_CRO6458() {
                var pathName = window.location.href;
                if (pathName.includes('/category') || pathName.includes('/extra-time-deals') || pathName.includes('/everyday-essentials') || pathName.includes('/clearance-sale')) {
                    window.crotest_Recipe_KI55_Prominent_Add_To_Cart_Buttons_ALL_CRO6458 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004180506"]);
                    console.log("Experiment Recipe KI55 | Prominent Add-To-Cart Buttons | ALL | CRO-6458 Activated");
                }
            },
            test_Recipe_KI2_KI6_PDP_Cleanup_and_Option_selectors_ALL_CRO4796() {
                var pathName = window.location.href;
                if (pathName.includes('/products')) {

                    waitForNextData(function () {
                        var categories =
                            window.__NEXT_DATA__?.props?.pageProps?.product?.customizableOptions;
                        if (!Array.isArray(categories)) return;
                        var ukFound = false;
                        for (var i = 0; i < categories.length; i++) {
                            var category = categories[i];

                            // 1️⃣ Only check Size options
                            if (category?.label && category.label.indexOf("Size") !== -1) {
                                // console.log("Size category found:", category.label);

                                if (Array.isArray(category.values)) {
                                    for (var j = 0; j < category.values.length; j++) {
                                        var value = category.values[j];

                                        // 2️⃣ Detect UK size
                                        if (value?.label && value.label.indexOf("UK") !== -1) {
                                            // console.log("UK size found 🇬🇧", value.label);

                                            window.crotest_KI2_KI6_PDP_Cleanup_and_Option_selectors_ALL = 1;
                                            window._conv_q = window._conv_q || [];
                                            window._conv_q.push(["executeExperiment", "1004191412"]);
                                            console.log("Recipe KI2.KI6 | PDP Cleanup and Option selectors | ALL | CRO-4796");

                                            ukFound = true;
                                            break; // stop checking values
                                        }
                                    }
                                }
                            }

                            if (ukFound) break; // stop checking other size categories
                        }
                    })

                }

                function waitForNextData(trigger, delayInterval = 50, delayTimeout = 5000) {
                    const interval = setInterval(function () {
                        if (window.__NEXT_DATA__?.props?.pageProps?.product?.customizableOptions) {
                            clearInterval(interval);
                            trigger();
                        }
                    }, delayInterval);
                    setTimeout(function () {
                        clearInterval(interval);
                    }, delayTimeout);
                }
            }, test_Recipe_KI63_Oneclick_Checkout_Integration_on_Product_Listing_Page_ALL_CRO5292() {
                var pathName = window.location.pathname;
                if (pathName.includes('/shops') || pathName.includes('/category') || pathName.includes('/clearance-sale')) {
                    window.crotest_Oneclick_Checkout_Integration_on_Product_Listing_Page = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004185507"]);
                    console.log("Experiment Recipe KI63 | One-click Checkout Integration on Product Listing Page | ALL | CRO-5292 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-ki62')) {
                            document.querySelector('body').classList.remove('cro-t-ki62')
                        }
                    }, 200)
                }
            },
            test_rerun_Recipe_KI67_XTD_Advanced_filtering_ALL_CRO7105() {
                var pathName = window.location.href;
                if (pathName.includes('/extra-time-deals')) {
                    window.crotest_rerun_KI67_XTD_Advanced_filtering_ALL_CRO7105 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004186033"]);
                    console.log("Experiment Rerun Recipe KI67 | XTD Advanced filtering | ALL | CRO-7105 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-30')) {
                            document.querySelector('body').classList.remove('cro-t-30')
                        }
                    }, 400)
                }
            }, test_i3_Advertise_XTD_page_with_banners_ALL_CRO8037() {
                var pathName = window.location.pathname;
                if (pathName.includes('/everyday-essentials') || pathName.includes('/category') || pathName.includes('/clearance-sale')) {
                    window.crotest_i3_Advertise_XTD_page_with_banners_ALL_CRO8037 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004188508"]);
                    console.log("Experiment i3 | Advertise XTD page with banners | ALL | CRO-8037 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.CRO-8037_Banner_After_Every_4th_Row')) {
                            document.querySelector('body').classList.remove('CRO-8037_Banner_After_Every_4th_Row')
                        }
                    }, 200)
                }
            },
            test_Recipe_KI55_Prominent_Add_To_Cart_Buttons_Green_ODO_Request_ALL_CRO6458() {
                var pathName = window.location.href;
                if (pathName.includes('/category') || pathName.includes('/extra-time-deals') || pathName.includes('/everyday-essentials') || pathName.includes('/clearance-sale')) {
                    window.crotest_Recipe_KI55_Prominent_Add_To_Cart_Buttons_Green_ALL_CRO6458 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004191002"]);
                    console.log("Experiment Recipe KI55 | Prominent Add-To-Cart Buttons - Green ODO Request | ALL | CRO-6458 Activated");
                }
            },
            test_Recipe_OOD_Product_Card_Save_Tag_Enhancement_ALL_CRO_12114_Activated() {
                var pathName = window.location.href;
                if (pathName.includes('/category') || pathName.includes('/extra-time-deals') || pathName.includes('/everyday-essentials') || pathName.includes('/clearance-sale')) {
                    window.crotest_Recipe_OOD_Product_Card_Save_Tag_Enhancement_ALL_CRO_12114 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004196432"]);
                    console.log("Experiment Recipe | OOD | Product Card — Save % Tag Enhancement | ALL | CRO-12114 Activated");
                }
            },
            test_PDP_FastShip_Highlight_ALL_CRO12089() {
                var pathName = window.location.href;
                if (pathName.includes('/products')) {

                    waitForDeliveryLabel(function (label) {
                        var cleanLabel = label.trim().toLowerCase();
                        if (cleanLabel === "3-5 working days") {
                            lib.waitForElement('[data-action="add-to-cart"]', function () {
                                document.querySelector('body').classList.add('cro_3_5_Working_Days')
                                window.crotest_PDP_FastShip_Highlight_ALL_CRO_12089 = 1;
                                window._conv_q = window._conv_q || [];
                                window._conv_q.push(["executeExperiment", "1004199026"]);
                                console.log("Experiment PDP | Fast-Ship Highlight | ALL | CRO-12089 Activated");
                            }, 25, 15000);

                        } else {
                            setTimeout(function () {
                                if (document.querySelector('.cro_3_5_Working_Days')) {
                                    document.querySelector('body').classList.remove('cro_3_5_Working_Days')
                                }
                            }, 600)
                        }
                    });
                }
            },
            test_Recipe_KI69_Improving_User_Experience_with_Category_Carousels() {
                var pathName = window.location.href;
                if (pathName.includes('/extra-time-deals')) {
                    window.crotest_Recipe_KI69_Improving_User_Experience_with_Category_Carousels = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004199324"]);
                    console.log("Experiment Recipe KI69 | XTD - Improving User Experience with Category Carousels | ALL Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-ki69')) {
                            document.querySelector('body').classList.remove('cro-ki69')
                        }
                    }, 400)
                }
            }
        };

        function getCustomerDeliveryLabel() {
            return window.__NEXT_DATA__?.props?.pageProps?.product?.customerDeliveryTime?.label || "";
        }

        function waitForDeliveryLabel(callback) {
            var interval = setInterval(function () {
                var label = getCustomerDeliveryLabel();

                if (label) {
                    clearInterval(interval);
                    callback(label);
                }
            }, 50);

            setTimeout(function () {
                clearInterval(interval);
            }, 10000);
        }


        console.log("Global JavaScript Activate");
        // experiments.test_4_Continue_to_payment_CTA();
        experiments.test_AddingDataPath();
        experiments.test_AddingClass_ProductPage();


        experiments.test_Recipe_KI63_Oneclick_Checkout_Integration_on_Product_Listing_Page_ALL_CRO5292();
        experiments.test_Recipe_KI2_KI6_PDP_Cleanup_and_Option_selectors_ALL_CRO4796();
        experiments.test_Recipe_KI55_Prominent_Add_To_Cart_Buttons_Green_ODO_Request_ALL_CRO6458();
        experiments.test_rerun_Recipe_KI67_XTD_Advanced_filtering_ALL_CRO7105();
        experiments.test_i3_Advertise_XTD_page_with_banners_ALL_CRO8037();
        experiments.test_Recipe_OOD_Product_Card_Save_Tag_Enhancement_ALL_CRO_12114_Activated();
        experiments.test_PDP_FastShip_Highlight_ALL_CRO12089();
        experiments.test_Recipe_KI69_Improving_User_Experience_with_Category_Carousels();

        function activateListner() {
            // console.log("Global JavaScript Activate");
            // experiments.test_4_Continue_to_payment_CTA();
            experiments.test_AddingDataPath();
            experiments.test_AddingClass_ProductPage();
            experiments.test_Recipe_KI63_Oneclick_Checkout_Integration_on_Product_Listing_Page_ALL_CRO5292();
            experiments.test_Recipe_KI2_KI6_PDP_Cleanup_and_Option_selectors_ALL_CRO4796();
            experiments.test_Recipe_KI55_Prominent_Add_To_Cart_Buttons_Green_ODO_Request_ALL_CRO6458();
            experiments.test_rerun_Recipe_KI67_XTD_Advanced_filtering_ALL_CRO7105();
            experiments.test_i3_Advertise_XTD_page_with_banners_ALL_CRO8037();
            experiments.test_Recipe_OOD_Product_Card_Save_Tag_Enhancement_ALL_CRO_12114_Activated();
            experiments.test_PDP_FastShip_Highlight_ALL_CRO12089();
            experiments.test_Recipe_KI69_Improving_User_Experience_with_Category_Carousels();


        }

        if (!window.cro_oneDayOnly_globalJS) {
            lib.listener(activateListner)
            window.cro_oneDayOnly_globalJS = true;
        }
    } catch (e) {
        console.log("Error in Global JavaScript");
    }
})();