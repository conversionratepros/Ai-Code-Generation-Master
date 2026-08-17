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

        var experiments = {
            test_KI6_Sticky_add_to_cart_Mobile() {
                var currentPath = window.location.href;

                // Check if the current path matches any of the target paths
                if (currentPath.includes('/lexie-lumen-hearing-aid') || currentPath.includes('/lexie-b1-powered-by-bose-hearing-aids') || currentPath.includes('/lexie-b2-plus-powered-by-bose-hearing-aids')) {
                    window.crotest_KI6_sticky_add_to_cart = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004128947"]);
                    console.log("Experiment KI6 | Sticky add to cart | Mobile Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-ki6-sticky')) {
                            document.querySelector('body').classList.remove('cro-t-ki6-sticky')
                        }

                        if (document.querySelector('.flex.cro-button-parent')) {
                            document.querySelector('.flex.cro-button-parent').classList.remove('cro-button-parent')
                        }
                    }, 500)
                }
            },
            test_UC1_Clean_up_pricing_cards_All() {
                var currentPath = window.location.pathname;
                if (currentPath == '/us') {
                    window.crotest_UC1_Clean_up_pricing_cards = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004123991"]);
                    console.log("Experiment UC1 | Clean up pricing cards | All | HRXG-166 Activated");
                }
            },
            test_UC3_Product_information_popups() {
                var currentPath = window.location.href;

                // Check if the current path matches any of the target paths
                if (currentPath.includes('/lexie-lumen-hearing-aid') || currentPath.includes('/lexie-b1-powered-by-bose-hearing-aids') || currentPath.includes('/lexie-b2-plus-powered-by-bose-hearing-aids')) {
                    window.crotest_UC3_popups = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004124656"]);
                    console.log("Experiment UC3 | Product information popups Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-uc-3')) {
                            document.querySelector('body').classList.remove('cro-t-uc-3')
                        }

                        if (document.querySelector('#cro-uc-3-eligible')) {
                            document.querySelector('#cro-uc-3-eligible').remove();
                        }

                        if (document.querySelector('#cro-uc-3-purchase')) {
                            document.querySelector('#cro-uc-3-purchase').remove();
                        }

                        if (document.querySelector('.cro-lexie-lumen-hearing-aid')) {
                            document.querySelector('.cro-lexie-lumen-hearing-aid').remove();
                        }

                        if (document.querySelector('.cro-uc-3-klarnaBadge')) {
                            document.querySelector('.cro-uc-3-klarnaBadge').remove();
                        }

                    }, 500)
                }
            },
            test_UC2_Cart_Popup_Clean_Up() {
                var currentPath = window.location.href;
                // Check if the current path matches any of the target paths
                // if (currentPath.includes('/lexie-lumen-hearing-aid') || currentPath.includes('/lexie-b1-powered-by-bose-hearing-aids') || currentPath.includes('/lexie-b2-plus-powered-by-bose-hearing-aids')) {
                //     window.crotest_UC2_popup_cleanup = 1;
                //     window._conv_q = window._conv_q || [];
                //     window._conv_q.push(["executeExperiment", "1004126724"]);
                //     console.log("Experiment UC2 | Cart Pop-up Clean Up | All | HRXG-169 Activated");
                // } else {
                //     setTimeout(function () {
                //         if (document.querySelector('.cro-t-uc2-cart')) {
                //             document.querySelector('body').classList.remove('cro-t-uc2-cart')
                //         }
                //     }, 500)
                // }

                if (currentPath.includes('/lexie-lumen-hearing-aid') || currentPath.includes('/lexie-b1-powered-by-bose-hearing-aids') || currentPath.includes('/lexie-b2-plus-powered-by-bose-hearing-aids') || currentPath.includes('/outlet-store')) {
                    window.crotest_UC2_popup_cleanup = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004126724"]);
                    console.log("Experiment UC2 | Cart Pop-up Clean Up | All | HRXG-169 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-uc2-cart')) {
                            document.querySelector('body').classList.remove('cro-t-uc2-cart')
                        }

                        if (document.querySelector(".cro-t-169-footer")) {
                            document.querySelector(".cro-t-169-footer").remove();
                        }
                    }, 500)
                }
            },
            test_KI5_UC4_Raise_social_proof_elements() {
                if (window.location.pathname == '/us') {
                    lib.waitForElement('.us-page', function () {
                        window.crotest_KI5_UC4_Raise_social_proof_elements = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004139699"]);
                        console.log("Experiment KI5.UC4 | Raise social proof elements and products section up the homepage | All Activated");
                    }, 50, 15000)
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-t-KI5')) {
                            document.querySelector('body').classList.remove('cro-t-KI5')
                        }

                        if (document.querySelector('.cro-t-K15-UC4-BossImg')) {
                            document.querySelector('section.cro-t-K15-UC4-BossImg').classList.remove('cro-t-K15-UC4-BossImg')
                        }

                        if (document.querySelector('.cro-t-K15-UC4-comparisonCard')) {
                            document.querySelector('section.cro-t-K15-UC4-comparisonCard').classList.remove('cro-t-K15-UC4-comparisonCard')
                        }

                        if (document.querySelector('.cro-t-K15-UC4-USBadge')) {
                            document.querySelector('section.cro-t-K15-UC4-USBadge').classList.remove('cro-t-K15-UC4-USBadge')
                        }

                        if (document.querySelector('.cro-t-K15-UC4-reviews')) {
                            document.querySelector('section.cro-t-K15-UC4-reviews').classList.remove('cro-t-K15-UC4-reviews')
                        }
                    }, 500)

                }

            },
            test_KI12_KI17_KI11_Update_reviews_presentation_on_PDPs_All_CRO_316() {
                var currentPath = window.location.href;
                if (currentPath.includes('/lexie-lumen-hearing-aid') || currentPath.includes('/lexie-b1-powered-by-bose-hearing-aids') || currentPath.includes('/lexie-b2-plus-powered-by-bose-hearing-aids')) {
                    window.crotest_KI12_KI17_KI11_Update_reviews = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004136762"]);
                    console.log("Experiment KI12.KI17.KI11 | Update reviews presentation on PDPs | All | CRO-316 Activated");
                }
            },
            test_Recipe_UC8_Comparison_page_overhaul_All_CRO_317() {
                var currentPath = window.location.href;
                if (currentPath.includes('/us/compare-hearing-aids')) {
                    window.crotest_UC8_Comparison_page_CRO_317 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004137102"]);
                    console.log("Experiment Recipe UC8 | Comparison page overhaul | All | CRO-317 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro317')) {
                            document.querySelector('body').classList.remove('cro317')
                        }
                    }, 500)
                }
            },
            test_Recipe_KI3_KI10_UC9_PDP_ATF_Rework_All_CRO_310() {
                var currentPath = window.location.href;
                if (currentPath.includes('/lexie-lumen-hearing-aid') || currentPath.includes('/lexie-b1-powered-by-bose-hearing-aids') || currentPath.includes('/lexie-b2-plus-powered-by-bose-hearing-aids')) {
                    window.crotest_KI3_KI10_UC9_PDP_ATF_Rework_All = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004140849"]);
                    console.log("Experiment Recipe KI3.KI10.UC9 | PDP ATF Rework | All | CRO-310 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro310')) {
                            document.querySelector('body').classList.remove('cro310')
                        }
                    }, 600)
                }


            },
            test_UC12_Shop_outlet_clarity_in_navigation_on_outlet_page_All_CRO313() {
                var currentPath = window.location.href;
                if (currentPath.includes('/') && !currentPath.includes('/checkout')) {
                    window.crotest_UC12_Shop_outlet_clarity_CRO313 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004140793"]);
                    console.log("Experiment UC12 | Shop outlet clarity in navigation & on outlet page | All | CRO-313 Activated");
                }
            },
            test_Recipe_KI4_KI14_Amazon_style_product_page_ALL_CRO311() {
                var currentPath = window.location.href;
                if (currentPath.includes('/us/lexie-b2-plus-powered-by-bose-hearing-aids') || currentPath.includes('/us/lexie-b1-powered-by-bose-hearing-aids') || currentPath.includes('/us/lexie-lumen-hearing-aid')) {
                    window.crotest_KI4_KI14_Amazon_style_product_page_CRO311 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004150623"]);
                    console.log("Experiment Recipe KI4.KI14 | Amazon-style product page | ALL | CRO Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro311')) {
                            document.querySelector('body').classList.remove('cro311');
                        }

                        if (window.cro311EventHandler1) {
                            window.cro311EventHandler1 = false;
                        }

                        if (window.cro311EventHandler2) {
                            window.cro311EventHandler2 = false;
                        }

                        if (window.cro311EventHandler3) {
                            window.cro311EventHandler3 = false;
                        }
                    }, 500)
                }
            },
            test_Recipe_KI34_Homepage_AbovetheFold_Rework_during_Promotional_Periods_ALL() {
                if (window.location.pathname == '/us') {
                    lib.waitForElement('.us-page', function () {
                        window.crotest_KI34_Homepage_AbovetheFold_Rework_during_Promotional_Periods = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004152576"]);
                        console.log("Experiment Recipe KI34 | Homepage Above-the-Fold Rework during Promotional Periods | ALL Activated");
                    }, 50, 15000)
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.croKI34')) {
                            document.querySelector('body').classList.remove('croKI34')
                        }
                    }, 500)
                }
            },
            test_KI18_Standardised_CTAs_Sitewide_All_CRO_314() {

                var currentPath = window.location.href;
                if (window.location.pathname == '/us' || currentPath.includes('/us/lexie-b2-plus-powered-by-bose-hearing-aids') || currentPath.includes('/us/lexie-b1-powered-by-bose-hearing-aids') || currentPath.includes('/us/lexie-lumen-hearing-aid') || currentPath.includes('/us/lexie-lumen-hearing-aid') || currentPath.includes('/us/compare-hearing-aids')) {
                    window.crotest_KI18_Standardised_CTAs_Sitewide_All_CRO_314 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004144460"]);
                    console.log("Experiment KI18 | Standardised CTAs Sitewide | All | CRO-314 Activated");
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro314')) {
                            document.querySelector('body').classList.remove('cro314')
                        }
                    }, 500)
                }
            },
            test_Recipe_KI38_Showing_USPs_Navigation_Strip_Desktop() {
                var currentPath = window.location.href;
                setTimeout(function () {
                    if (currentPath.includes('/us') && !currentPath.includes('/us/checkout')) {
                        window.crotest_KI38_Showing_USPs_Navigation = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004157363"]);
                        console.log("Experiment Recipe KI38 | Showing USPs in Navigation Strip | Desktop Activated");
                        // console.log("---------Fired");
                    } else {
                        if (currentPath.includes('/checkout')) {
                            // console.log("Inside else checkout");
                            if (document.querySelector('.cro4757')) {
                                document.querySelector('body').classList.remove('cro4757')
                            }
                        }
                    }
                }, 600)


                setTimeout(function () {
                    if (currentPath.includes('/checkout')) {
                        // setTimeout(function () {
                        //   console.log("Inside if checkout");
                        if (document.querySelector('.cro4757')) {
                            document.querySelector('body').classList.remove('cro4757')
                        }
                        // }, 500)
                    }
                }, 600)



            },
            test_KI30_KI28_PDP_hesitancy_overcome_ALL_CRO318() {
                var currentPath = window.location.href;
                if (currentPath.includes('/lexie-lumen-hearing-aid') || currentPath.includes('/lexie-b1-powered-by-bose-hearing-aids') || currentPath.includes('/lexie-b2-plus-powered-by-bose-hearing-aids')) {
                    window.cr0318event = false;
                    setTimeout(function () {
                        window.croTest_KI30_KI28_PDP_hesitancy_overcome_ALL = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004158943"]);
                        console.log("Experiment Recipe KI30.KI28 | PDP hesitancy overcome | ALL | CRO-318 Activated");
                    }, 400)
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro318')) {
                            document.querySelector('body').classList.remove('cro318');
                            window.cr0318event = false;
                        }
                    }, 600)
                }


            },
            test_Recipe_KI34_Move_hearing_test_to_top_of_hearing_test_page_All_CRO4058() {
                var currentPath = window.location.href;
                if (currentPath.includes('us/best-online-hearing-test')) {
                    window.cro_t_KI34_Move_hearing_test = false;
                    setTimeout(function () {
                        window.croTest_KI34_Move_hearing_test = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004162955"]);
                        console.log("Experiment Recipe KI34 | Move hearing test to top of hearing test page | All | CRO-4058 Activated");
                    }, 400)
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-lexie-ki_34')) {
                            document.querySelector('body').classList.remove('cro-lexie-ki_34');
                            window.cro_t_KI34_Move_hearing_test = false;
                        }

                        if (document.querySelector('.heardigits-active')) {
                            document.querySelector('body').classList.remove('heardigits-active');
                        }
                    }, 600)
                }


            },
            test_Recipe_KI44_Hearing_Test_Promo_on_Homepage_ALL_CRO5512() {
                var currentPath = window.location.pathname;
                if (currentPath == '/us') {
                    // window.cro_t_KI44_Hearing_Test_Promo_on_Homepage = false;
                    window.cro_t_KI34_Move_hearing_test_homepage = false;
                    setTimeout(function () {
                        window.cro_t_KI44_Hearing_Test_Promo_on_Homepage = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004167206"]);
                        console.log("Experiment Recipe KI44 | Hearing Test Promo on Homepage | ALL | CRO-5512 Activated");
                    }, 400)
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro-lexie-ki44')) {
                            document.querySelector('body').classList.remove('cro-lexie-ki44');
                            window.cro_t_KI34_Move_hearing_test_homepage = false;
                        }
                    }, 600)
                }


            },
            test_Sales_splash_deploy() {
                var currentPath = window.location.href;
                if (currentPath.includes('us/shop-lexie-b2-plus-powered-by-bose-hearing-aids')) {
                    setTimeout(function () {
                        window.croTest_Sales_splash_deploy = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004172914"]);
                        console.log("Experiment Sales splash deploy Activated");
                    }, 400)
                } else {
                    setTimeout(function () {
                        if (document.querySelector('.cro7026')) {
                            document.querySelector('body').classList.remove('cro7026');
                        }
                    }, 600)
                }


            },
            test_Recipe_KI60_KI62_KI66_KI76_Increase_credibility_clarity_ATF_on_Hearing_Test_Page_ALL_CRO838() {
                var currentPath = window.location.href;
                if (currentPath.includes('us/best-online-hearing-test')) {
                    setTimeout(function () {
                        window.croTest_Increase_credibility_clarity_ATF = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004193055"]);
                        console.log("Experiment Recipe KI60.KI62.KI66.KI76 | Increase credibility & clarity ATF on Hearing Test Page | ALL | CRO-8386 Activated");
                    }, 400)
                } else {
                    setTimeout(function () {
                       if (document.querySelector('.croki60')) {
                            document.querySelector('body').classList.remove('croki60');
                        }

                        if (document.querySelector('.croki60-trusted')) {
                            document.querySelector('.croki60-trusted').remove();
                        }

                        if (document.querySelector('.croki60-accordion')) {
                            document.querySelector('.croki60-accordion').remove();
                        }

                        if(window.cro_t_croki60_animation){
                            window.cro_t_croki60_animation = false;
                        }

                    }, 600)
                }


            }
        };

        var currentURL = window.location.href;
        var currentHost = window.location.hostname;
        // https://lexiehearing.com/us/shop-lexie-b2-plus-powered-by-bose-hearing-aids
        // Check exclusion conditions
        var isExcluded =
            currentHost.includes('.prod.lexiehearing.com') ||
            currentHost.includes('.staging') ||
            currentURL.includes('walgreens/us') ||
            currentURL.includes('/preprod.lexiehearing') ||
            currentURL.includes('/forbes-health/us') ||
            currentURL.includes('/ncoa/us') ||
            currentURL.includes('/hearing-tracker/us') ||
            currentURL.includes('/help-guide/us') ||
            currentURL.includes('/us/outlet-store') ||
            currentURL.includes('/us/shop-lexie-b2-plus-powered-by-bose-hearing-aids');
        if (isExcluded) {
            console.log('CONVERT BLOCKED');
            return; // Stop execution
        }

        

        // if (!window.cro_globalJS) {
        console.log("Global JavaScript Activate");

        // Fullstory variant tracking - register Convert callback
        window._conv_q = window._conv_q || [];
        window._conv_q.push({
            what: 'callback',
            func: function () {
                console.log("[FS Tracking] Convert callback fired");

                if (!window.convert || !window.convert.currentData) {
                    console.log("[FS Tracking] window.convert.currentData not available - skipping");
                    return;
                }

                var sessionData = window.convert.currentData.experiments;
                var expCount = sessionData ? Object.keys(sessionData).length : 0;
                console.log("[FS Tracking] Active experiments found: " + expCount);

                if (expCount === 0) {
                    console.log("[FS Tracking] No active experiments - nothing sent to Fullstory");
                    return;
                }

                if (!window.FS) {
                    console.log("[FS Tracking] window.FS not available - cannot send to Fullstory");
                    return;
                }

                for (var expID in sessionData) {
                    var experimentName = sessionData[expID].variation_name;
                    var experimentTitle = sessionData[expID].experiment_name;

                    console.log("[FS Tracking] Sending to Fullstory - Experiment: '" + experimentTitle + "' | Variant: '" + experimentName + "'");

                    window.FS('setProperties', {
                        type: 'user',
                        properties: {
                            last_convert_experiment: experimentTitle,
                            last_convert_variant: experimentName
                        }
                    });
                }

                console.log("[FS Tracking] Done - " + expCount + " experiment(s) tracked");
            }
        });

        experiments.test_KI12_KI17_KI11_Update_reviews_presentation_on_PDPs_All_CRO_316();
        experiments.test_KI5_UC4_Raise_social_proof_elements();
        experiments.test_Recipe_UC8_Comparison_page_overhaul_All_CRO_317();
        experiments.test_Recipe_KI3_KI10_UC9_PDP_ATF_Rework_All_CRO_310();
        experiments.test_UC12_Shop_outlet_clarity_in_navigation_on_outlet_page_All_CRO313();
        experiments.test_UC2_Cart_Popup_Clean_Up();
        experiments.test_Recipe_KI4_KI14_Amazon_style_product_page_ALL_CRO311();
        experiments.test_Recipe_KI34_Homepage_AbovetheFold_Rework_during_Promotional_Periods_ALL();
        experiments.test_KI18_Standardised_CTAs_Sitewide_All_CRO_314();
        experiments.test_Recipe_KI38_Showing_USPs_Navigation_Strip_Desktop();
        experiments.test_KI30_KI28_PDP_hesitancy_overcome_ALL_CRO318();
        experiments.test_Recipe_KI34_Move_hearing_test_to_top_of_hearing_test_page_All_CRO4058();
        experiments.test_Recipe_KI44_Hearing_Test_Promo_on_Homepage_ALL_CRO5512();
        experiments.test_Recipe_KI60_KI62_KI66_KI76_Increase_credibility_clarity_ATF_on_Hearing_Test_Page_ALL_CRO838();
        // experiments.test_Sales_splash_deploy();
        // lib.listener(activateExpOnPageChange);
        // window.cro_globalJS = true;
        // }
        /**
         * Activate all experiments on location change
         */
        function activateExpOnPageChange() {
            experiments.test_KI12_KI17_KI11_Update_reviews_presentation_on_PDPs_All_CRO_316();
            experiments.test_KI5_UC4_Raise_social_proof_elements();
            experiments.test_Recipe_UC8_Comparison_page_overhaul_All_CRO_317();
            experiments.test_Recipe_KI3_KI10_UC9_PDP_ATF_Rework_All_CRO_310();
            experiments.test_UC12_Shop_outlet_clarity_in_navigation_on_outlet_page_All_CRO313();
            experiments.test_UC2_Cart_Popup_Clean_Up();
            experiments.test_Recipe_KI4_KI14_Amazon_style_product_page_ALL_CRO311();
            experiments.test_Recipe_KI34_Homepage_AbovetheFold_Rework_during_Promotional_Periods_ALL();
            experiments.test_KI18_Standardised_CTAs_Sitewide_All_CRO_314();
            experiments.test_Recipe_KI38_Showing_USPs_Navigation_Strip_Desktop();
            experiments.test_KI30_KI28_PDP_hesitancy_overcome_ALL_CRO318();
            experiments.test_Recipe_KI34_Move_hearing_test_to_top_of_hearing_test_page_All_CRO4058();

        }


    } catch (e) {
        console.log("Error in Global JavaScript");
    }
})();