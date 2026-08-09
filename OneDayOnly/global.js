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
        /* Login / logout check — "signedIn" | "signedOut" | null while unknown.
           ODO pushes a user object ({ userStatus, userID, ... }) with the page_load
           event on every page; scan the dataLayer backwards for the latest one. */
        function cro_getUserStatus() {
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

        /* Poll until the dataLayer user object lands (it arrives with page_load,
           which can lag hydration), then hand the status to the trigger. */
        function cro_waitForUserStatus(trigger, delayInterval, delayTimeout) {
            var interval = setInterval(function () {
                var status = cro_getUserStatus();
                if (status) {
                    clearInterval(interval);
                    trigger(status);
                }
            }, delayInterval || 50);
            setTimeout(function () {
                clearInterval(interval);
            }, delayTimeout || 15000);
        }

        /* Homepage guard — the Convert snippet now loads on '/', which shares the
           product-card DOM with the category tabs. Any PLP/PDP test body class that
           rides along on an SPA navigation gets stripped here; experiment CSS is
           gated on these classes. Runs every 500ms for 10s to outlast experiment
           scripts that re-apply their own class after navigation. */
        function cro_homepageSweep() {
            if (window.location.pathname !== '/') return;
            var sweeps = 0;
            var interval = setInterval(function () {
                if (window.location.pathname !== '/') {
                    clearInterval(interval);
                    return;
                }
                document.body.classList.remove(
                    'CRO-8037_Banner_After_Every_4th_Row',
                    'cro-ki69',
                    'cro-t-odo-10225',
                    'cro-t-odo-12114',
                    'cro-t-odo-10185',
                    'cro-t-odo-12212',
                    'cro-12280',
                    'cro-12412',
                    'cro-12412-login-tab',
                    'cro_3_5_Working_Days',
                    'cro_delivery_3_5',
                    'cro_delivery_5_10',
                    'cro_delivery_10_20'
                );
                if (++sweeps >= 20) clearInterval(interval);
            }, 500);
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
                    /* 'homepage' is deliberately distinct from the category tabs'
                       'home' — homepage tests must not match /category and vice versa */
                    addingAttribute('homepage')
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
            },
            test_i3_Advertise_XTD_page_with_banners_ALL_CRO8037() {
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
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-odo-12114')) {
                            document.querySelector('body').classList.remove('cro-t-odo-12114');
                        }
                    }, 400)
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
            },
            test_PDP_Shipping_Fast_Ship_Dated_CRO12281() {
                var pathName = window.location.href;
                if (pathName.includes('/products')) {

                    waitForDeliveryLabel(function (label) {
                        var cleanLabel = label.trim().toLowerCase();
                        if (cleanLabel === "3-5 working days" || cleanLabel === "5-10 working days" || cleanLabel === "10-20 working days") {
                            lib.waitForElement('[data-action="add-to-cart"]', function () {
                                document.querySelector('body').classList.add('cro_3_5_Working_Days')
                                window.crotest_PDP_Shipping_Fast_Ship_Dated_CRO12281 = 1;
                                window._conv_q = window._conv_q || [];
                                window._conv_q.push(["executeExperiment", "1004200806"]);
                                console.log("Experiment PDP Shipping — Fast Ship Dated | CRO-12281 Activated");
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
            }, test_PDP_FastShip_Highlight_CRO12089_CRO12281() {
                var pathName = window.location.href;
                if (pathName.includes('/products')) {
                    waitForDeliveryLabel(function (label) {
                        var cleanLabel = label.trim().toLowerCase();
                        var isValid = (
                            cleanLabel === "3-5 working days" ||
                            cleanLabel === "5-10 working days" ||
                            cleanLabel === "10-20 working days"
                        );

                        if (isValid) {
                            lib.waitForElement('[data-action="add-to-cart"]', function () {
                                // Add condition-specific class
                                if (cleanLabel === "3-5 working days") {
                                    document.body.classList.add('cro_delivery_3_5');
                                } else if (cleanLabel === "5-10 working days") {
                                    document.body.classList.add('cro_delivery_5_10');
                                } else if (cleanLabel === "10-20 working days") {
                                    document.body.classList.add('cro_delivery_10_20');
                                }

                                window.crotest_PDP_FastShip_Highlight_CRO12089_CRO12281 = 1;
                                window._conv_q = window._conv_q || [];
                                window._conv_q.push(["executeExperiment", "1004201173"]);
                                console.log("Experiment PDP | Fast-Ship Highlight | [CRO-12089 + CRO-12281] Activated");
                            }, 25, 15000);

                        } else {
                            setTimeout(function () {
                                document.body.classList.remove('cro_delivery_3_5', 'cro_delivery_5_10', 'cro_delivery_10_20');
                            }, 600);
                        }
                    });
                }
            }, test_Product_Card_Absolute_Savings_Line_CRO10185() {
                var pathName = window.location.href;
                if (pathName.includes('/category') || pathName.includes('/everyday-essentials') || pathName.includes('/clearance-sale') || pathName.includes('/extra-time-deals')) {
                    window.crotest_Product_Card_Absolute_Savings_Line_CRO10185 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004201385"]);
                    console.log("Experiment Product Card — Absolute Savings Line | CRO-10185 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-odo-10185')) {
                            document.querySelector('body').classList.remove('cro-t-odo-10185');
                        }
                    }, 400)
                }
            },
            test_OneClick_Checkout_V2_Revised_Button_Labels_CRO_10225() {
                var pathName = window.location.href;
                if (pathName.includes('/category') || pathName.includes('/extra-time-deals') || pathName.includes('/everyday-essentials') || pathName.includes('/clearance-sale')) {
                    window.crotest_OneClick_Checkout_CRO_10225 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004201727"]);
                    console.log("Experiment One-Click Checkout V2 — Revised Button Labels | CRO-10225 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-odo-10225')) {
                            document.querySelector('body').classList.remove('cro-t-odo-10225');
                        }
                    }, 400)
                }
            },
            test_AB_Test_PDP_Buy_Box_Strikethrough_price_ALL() {
                var pathName = window.location.href;
                if (pathName.includes('/products')) {
                    window.crotest_AB_Test_PDP_Buy_Box_Strikethrough_price_ALL = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004203736"]);
                    console.log("Experiment AB Test | PDP Buy Box Strikethrough price | ALL Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-odo-12212')) {
                            document.querySelector('body').classList.remove('cro-t-odo-12212');
                            window.cro_12212 = false;

                        }
                    }, 400)
                }
            },
            test_PDP_Shipping_GeoPersonalised_Delivery_ALL_CRO_12280() {
                var pathName = window.location.href;
                if (pathName.includes('/products')) {
                    window.crotest_PDP_Shipping_GeoPersonalised_Delivery_ALL_CRO_12280 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004204444"]);
                    console.log("Experiment PDP Shipping | Geo-Personalised Delivery | ALL | CRO-12280 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-12280')) {
                            document.querySelector('body').classList.remove('cro-12280');
                            window.cro_12280 = false;

                        }
                    }, 400)
                }
            }, test_Checkout_Equal_Weight_Login_vs_Guest_Entry_CRO12412() {
                var path = window.location.pathname;
                var searchParams = new URLSearchParams(window.location.search);

                var isMainCheckout =
                    path === "/checkout" &&
                    !searchParams.has("step") &&
                    !searchParams.has("isGuest");

                var isGuestCartCheckout =
                    path === "/checkout" &&
                    searchParams.get("isGuest") === "true" &&
                    searchParams.get("step") === "cart";

                var isEntryStep = isMainCheckout || isGuestCartCheckout;

                if (isEntryStep) {
                    cro_waitForUserStatus(function (status) {
                        if (status === "signedOut") {
                            // lib.waitForElement('form input[name="password"]', function () {
                            if (window.crotest_Checkout_Equal_Weight_Login_vs_Guest_CRO12412) {
                                return;
                            }

                            window.crotest_Checkout_Equal_Weight_Login_vs_Guest_CRO12412 = 1;

                            window._conv_q = window._conv_q || [];
                            window._conv_q.push([
                                "executeExperiment",
                                "1004206164"
                            ]);

                            console.log(
                                "Experiment AB Test Checkout Equal-Weight Login vs Guest Entry ALL CRO-12412 Activated"
                            );
                            // }, 25, 15000);
                        }
                    });
                } else {
                    setTimeout(function () {
                        document.body.classList.remove(
                            "cro-12412",
                            "cro-12412-login-tab"
                        );
                    }, 400);
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
        experiments.test_AddingDataPath();
        experiments.test_AddingClass_ProductPage();

        experiments.test_Recipe_KI2_KI6_PDP_Cleanup_and_Option_selectors_ALL_CRO4796();
        experiments.test_Recipe_KI69_Improving_User_Experience_with_Category_Carousels();
        experiments.test_Recipe_KI55_Prominent_Add_To_Cart_Buttons_Green_ODO_Request_ALL_CRO6458();
        experiments.test_Recipe_OOD_Product_Card_Save_Tag_Enhancement_ALL_CRO_12114_Activated();
        // experiments.test_PDP_FastShip_Highlight_ALL_CRO12089();
        experiments.test_i3_Advertise_XTD_page_with_banners_ALL_CRO8037();
        // experiments.test_PDP_Shipping_Fast_Ship_Dated_CRO12281();
        experiments.test_PDP_FastShip_Highlight_CRO12089_CRO12281();
        experiments.test_OneClick_Checkout_V2_Revised_Button_Labels_CRO_10225();
        experiments.test_Product_Card_Absolute_Savings_Line_CRO10185();
        experiments.test_AB_Test_PDP_Buy_Box_Strikethrough_price_ALL();
        experiments.test_PDP_Shipping_GeoPersonalised_Delivery_ALL_CRO_12280();
        experiments.test_Checkout_Equal_Weight_Login_vs_Guest_Entry_CRO12412();
        cro_homepageSweep();

        function activateListner() {
            experiments.test_AddingDataPath();
            experiments.test_AddingClass_ProductPage();


            experiments.test_Recipe_KI2_KI6_PDP_Cleanup_and_Option_selectors_ALL_CRO4796();
            experiments.test_Recipe_KI69_Improving_User_Experience_with_Category_Carousels();
            experiments.test_Recipe_KI55_Prominent_Add_To_Cart_Buttons_Green_ODO_Request_ALL_CRO6458();
            experiments.test_Recipe_OOD_Product_Card_Save_Tag_Enhancement_ALL_CRO_12114_Activated();
            /* Retired singles CRO-12089 / CRO-12281 must stay out of this list —
               both are superseded by the combined 1004201173 experiment */
            experiments.test_i3_Advertise_XTD_page_with_banners_ALL_CRO8037();
            experiments.test_PDP_FastShip_Highlight_CRO12089_CRO12281();
            experiments.test_Product_Card_Absolute_Savings_Line_CRO10185();
            experiments.test_OneClick_Checkout_V2_Revised_Button_Labels_CRO_10225();
            experiments.test_AB_Test_PDP_Buy_Box_Strikethrough_price_ALL();
            experiments.test_PDP_Shipping_GeoPersonalised_Delivery_ALL_CRO_12280();
            experiments.test_Checkout_Equal_Weight_Login_vs_Guest_Entry_CRO12412();
            cro_homepageSweep();
        }

        if (!window.cro_oneDayOnly_globalJS) {
            lib.listener(activateListner)
            window.cro_oneDayOnly_globalJS = true;
        }
    } catch (e) {
        console.log("Error in Global JavaScript");
    }
})();
