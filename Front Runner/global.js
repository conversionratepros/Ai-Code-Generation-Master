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
            globalTest() {
                setTimeout(function () {
                    lib.waitForElement('.ProductPage .ProductActions-Attribute_type_product_sku span', function () {
                        var sku = document.querySelector('.ProductPage .ProductActions-Attribute_type_product_sku span')
                        if (sku) {
                            var strng = sku.getAttribute('content')
                            if (strng.includes('KR') || strng.includes('KS') || strng.includes('KV')) {
                                document.querySelector('body').classList.add('cro-rack')
                            } else {
                                if (document.querySelector('.cro-rack')) {
                                    document.querySelector('body').classList.remove('cro-rack')
                                }
                            }

                        } else {
                            if (document.querySelector('.cro-rack')) {
                                document.querySelector('body').classList.remove('cro-rack')
                            }
                        }
                    }, 50, 5000)

                    if (!document.querySelector(".ProductPage") && document.querySelector('.cro-rack')) {
                        document.querySelector('body').classList.remove('cro-rack');
                    }
                }, 600)
            },
            test128() {
                setTimeout(function () {
                    var pageSelector = document.querySelector(".ProductPage")
                    if (pageSelector) {
                        window.crotest_128 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "100455397"]);
                    }
                }, 600)
            },
            test47_12() {
                setTimeout(function () {
                    var pageSelector = document.querySelector(".HomePage")
                    if (pageSelector) {
                        window.crotest_47_12 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "100457631"]);
                    }
                }, 600)
            },
            test112() {
                setTimeout(function () {
                    lib.waitForElement('.CategoryPage', function () {
                        console.log("Test 112 Activate outside");
                        var pageSelector = document.querySelector(".CategoryPage")
                        if (pageSelector) {
                            window.crotest_112 = 1;
                            window._conv_q = window._conv_q || [];
                            window._conv_q.push(["executeExperiment", "100459266"]);
                            console.log("Test 112 Activate inside");

                        } else if (!document.querySelector(".CategoryPage") && document.querySelector(".recipe-112-t-1")) {
                            document.querySelector("body").classList.remove(".recipe-112-t-1");
                        }
                    }, 50, 5000)

                    if (!document.querySelector(".CategoryPage") && document.querySelector(".recipe-112-t-1")) {
                        document.querySelector("body").classList.remove(".recipe-112-t-1");
                    }
                }, 600)
            },
            test129() {
                setTimeout(function () {
                    var pageSelector = document.querySelector(".ProductPage")
                    if (pageSelector) {
                        window.crotest_129 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "100447139"]);
                        console.log("Experiment 129 Activated");
                    }
                }, 600)
            }, Prinsu_badges() {
                setTimeout(function () {
                    var pageSelector = document.querySelector(".ProductPage")
                    if (pageSelector) {
                        window.crotest_Prinsu_badges = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "100468746"]);
                        console.log("Experiment Prinsu badges Activated");
                    }
                }, 600)
            },
            test68_131() {
                setTimeout(function () {
                    var pageSelector = document.querySelector(".ProductPage")
                    if (pageSelector) {
                        window.crotest_68_131 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "100447612"]);
                        console.log("Experiment 68.131 Activated");
                    }
                }, 600)
            }, test104_106() {
                setTimeout(function () {
                    if (!document.querySelector('main.Checkout')) {
                        window.crotest_104_106 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "100472878"]);
                        console.log("Experiment 104_106 Activated");
                    }
                }, 600)
            },
            test137_139() {
                setTimeout(function () {

                    lib.waitForElement('main.Checkout', function () {
                        window.crotest_137_139 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "100462292"]);
                        console.log("Experiment 137_139 Activated");
                    }, 50, 5000)
                }, 600)
            }, test120() {
                setTimeout(function () {
                    var pageSelector = document.querySelector(".ProductPage")
                    var sku = document.querySelector("section[aria-label*='Main'] .ProductActions [itemprop='sku']") ? document.querySelector("section[aria-label*='Main'] .ProductActions [itemprop='sku']").getAttribute("content") : 'none';

                    if (pageSelector && /^(KR)/i.test(sku)) {
                        window.crotest_120 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "100442775"]);
                        console.log("Experiment 120 Activated");
                    }
                }, 600)

            },
            test111() {
                setTimeout(function () {
                    lib.waitForElement('.ProductPage .ProductActions-Attribute_type_product_sku span', function () {
                        var sku = document.querySelector('.ProductPage .ProductActions-Attribute_type_product_sku span')
                        if (sku) {
                            var strng = sku.getAttribute('content')
                            if (strng.includes('KR') || strng.includes('KS') || strng.includes('KV')) {
                                window.crotest_111 = 1;
                                window._conv_q = window._conv_q || [];
                                window._conv_q.push(["executeExperiment", "100464867"]);
                                console.log("INSIDE Experiment 111 Activated");
                            }

                        } else {
                            if (document.querySelector('.recipe-t-1-warranty')) {
                                document.querySelector('body').classList.remove('recipe-t-1-warranty')
                            }
                        }
                    }, 50, 5000)

                    if (!document.querySelector(".ProductPage") && document.querySelector('.recipe-t-1-warranty')) {
                        document.querySelector('body').classList.remove('recipe-t-1-warranty')
                    }

                }, 600)

            },
            test_163_Video_PDP() {
                setTimeout(function () {
                    lib.waitForElement('.ProductPage .ProductActions > [content*="Slimline II"],.ProductPage .ProductActions > [content*="Slimpro"],.ProductPage .ProductActions > [content*="Slimsport"],.ProductPage .ProductActions > [content*="Pro Bed System"]', function () {
                        window.crotest_163_Video_PDP = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004100566"]);
                        console.log("Experiment 163 | Place video in PDP Activated");
                    }, 50, 5000)
                }, 600)
            },
            test159_160() {
                setTimeout(function () {
                    lib.waitForElement('.CategoryPage', function () {
                        window.crotest_159_160 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "100497849"]);
                        console.log("Test 159_160  PLP product card cleanup Activate");


                    }, 50, 5000)

                    if (!document.querySelector(".CategoryPage") && document.querySelector(".recipe_159-160")) {
                        document.querySelector("body").classList.remove(".recipe_159-160");
                    }
                }, 600)
            },
            test_Dometic_PLP_header_intro_text_Mobile() {
                setTimeout(function () {
                    lib.waitForElement('.CategoryPage', function () {
                        window.crotest_607 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004119027"]);
                        console.log("Test Recipe | Dometic PLP header intro text | Mobile | FR-607 Activate");


                    }, 50, 5000)

                    // if (!document.querySelector(".CategoryPage") && document.querySelector(".cro-t-607-dometicHeader") && document.querySelector(".cro-fr-607")) {
                    //     document.querySelector(".cro-t-607-dometicHeader").remove();
                    //     document.querySelector("body").classList.remove("cro-fr-607");
                    // }
                }, 600)
            },
            test_UC1_Mobile_users_have_no_filters_on_PLPs_Mobile() {
                setTimeout(function () {
                    lib.waitForElement('.CategoryPage', function () {
                        window.crotest_Mobile_filters = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004121896"]);
                        console.log("Experiment UC1 | Mobile users have no filters on PLPs | Mobile | FR-590 Activated");
                    }, 50, 5000)
                }, 600)
            },
            test_Pill_sub_cat_horizontally_scrollable() {
                setTimeout(function () {
                    lib.waitForElement('.CategoryPage .CategoryName .CategoryNameLink', function () {


                        setTimeout(function () {
                            if (!document.querySelector(".CategoryPage .CategoryName .CategoryNameLink")) {
                                if (document.querySelector(".cro-t-pill-subcats")) {
                                    document.querySelector("body").classList.remove('cro-t-pill-subcats');
                                }
                            }

                            lib.waitForElement('.CategoryPage', function () {
                                window.crotest_Pill = 1;
                                window._conv_q = window._conv_q || [];
                                window._conv_q.push(["executeExperiment", "1004124287"]);
                                console.log("Experiment Recipe | Pill sub-cat horizontally scrollable | Mobile Activated");
                            }, 50, 5000)

                        }, 600);
                    }, 50, 5000)
                }, 800)
            },
            test_158_Rollback_Test_for_Mini_Cart_ALL_CRO_531() {
                if (window.location.href.includes('/us/') && window.location.href.indexOf('/checkout')) {
                    window.crotest_158_Rollback_Test = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004135620"]);
                    console.log("Experiment Recipe 158 | Rollback Test for Mini Cart | ALL | CRO-531 Activated");
                }
            },
            test_Recipe_DMTC2_Gallery_Updates_ALL_CRO2554() {
                setTimeout(function () {
                    lib.waitForElement('.ProductPage', function () {
                        window.crotest_DMTC2_Gallery_Updates_ALL_CRO2554 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004144900"]);
                        console.log("Experiment Recipe DMTC2 | Gallery Updates | ALL | CRO-2554 Activated");
                    }, 50, 5000)
                }, 600)
            },
            test_DMTC5_USP_strip_Awards_PDP_All() {
                setTimeout(function () {
                    lib.waitForElement('.ProductPage .ProductActions-Attribute_type_product_sku span', function () {
                        var sku = document.querySelector('.ProductPage .ProductActions-Attribute_type_product_sku span')
                        if (sku) {
                            var strng = sku.getAttribute('content')
                            if (strng.includes('KR') || strng.includes('KS') || strng.includes('KV')) {
                                window.crotest_DMTC5_USP_strip_Awards_PDP_All = 1;
                                window._conv_q = window._conv_q || [];
                                window._conv_q.push(["executeExperiment", "1004160088"]);
                                console.info("Experiment DMTC5 | USP strip & Awards PDP | All Activated");
                            } else {
                                if (document.querySelector('.cro4596')) {
                                    document.querySelector('body').classList.remove('cro4596')
                                    // window.cro_test_4596_slider = false;
                                }
                            }

                        } else {
                            if (document.querySelector('.cro4596')) {
                                document.querySelector('body').classList.remove('cro4596')
                                // window.cro_test_4596_slider = false;

                            }
                        }
                    }, 50, 5000)

                    if (!document.querySelector('.ProductPage') && document.querySelector('.cro4596')) {
                        document.querySelector('body').classList.remove('cro4596')
                        // window.cro_test_4596_slider = false;
                    }
                }, 600)
            },
            test_126_Installation_USPs_on_PDP_ALL() {
                setTimeout(function () {
                    lib.waitForElement('.ProductPage', function () {
                        window.crotest_126_Installation_USPs_on_PDP_ALL = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004154651"]);
                        console.log("Experiment Recipe 126 | Installation USPs on PDP (Product highlights) | ALL Activated");
                    }, 50, 5000)

                    if (!document.querySelector('.ProductPage') && document.querySelector('.cro126')) {
                        document.querySelector('body').classList.remove('cro126')
                    }
                }, 600)
            },
            test_Recipe_203_Built_out_vehicle_finder_Desktop_CRO529() {
                setTimeout(function () {
                    lib.waitForElement('main.HomePage', function () {
                        window.crotest_203_Built_out_vehicle_finder_Desktop = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004155821"]);
                        console.log("Experiment Recipe 203 | Built-out vehicle finder | Desktop | CRO-529 Activated");
                    }, 50, 5000)

                    if (!document.querySelector('main.HomePage') && document.querySelector('.cro529') && window.cro_test_529_usp) {
                        document.querySelector('body').classList.remove('cro529');
                        window.cro_test_529_usp = false;
                    }
                }, 600)
            }
        };

        // experiments.test128();
        // experiments.test137_139();
        // experiments.test129();
        // experiments.test68_131();
        // experiments.test120()
        // experiments.test47_12()
        // experiments.test111();
        // experiments.test112();


        // experiments.test104_106();
        // experiments.test_163_Video_PDP();
        // experiments.test159_160();
        // experiments.test_Dometic_PLP_header_intro_text_Mobile();
        // experiments.test_UC1_Mobile_users_have_no_filters_on_PLPs_Mobile();
        // experiments.test_Pill_sub_cat_horizontally_scrollable();
        // experiments.test_158_Rollback_Test_for_Mini_Cart_ALL_CRO_531()
        console.log("Global JavaScript Activate");
        experiments.globalTest();
        experiments.Prinsu_badges();
        experiments.test_Recipe_DMTC2_Gallery_Updates_ALL_CRO2554();
        experiments.test_DMTC5_USP_strip_Awards_PDP_All();
        experiments.test_126_Installation_USPs_on_PDP_ALL();
        experiments.test_Recipe_203_Built_out_vehicle_finder_Desktop_CRO529();
        /**
         * Activate all experiments on location change
         */
        function activateExpOnPageChange() {
            experiments.globalTest();
            experiments.Prinsu_badges();
            experiments.test_Recipe_DMTC2_Gallery_Updates_ALL_CRO2554();
            experiments.test_DMTC5_USP_strip_Awards_PDP_All();
            experiments.test_126_Installation_USPs_on_PDP_ALL();
            experiments.test_Recipe_203_Built_out_vehicle_finder_Desktop_CRO529();

            // experiments.test137_139();
            // experiments.test128();
            // experiments.test129();
            // experiments.test68_131();
            // experiments.test120();
            // experiments.test47_12()
            // experiments.test111();
            // experiments.test112();

            // experiments.test104_106();
            // experiments.test_163_Video_PDP();
            // experiments.test159_160();
            // experiments.test_Dometic_PLP_header_intro_text_Mobile();
            // experiments.test_UC1_Mobile_users_have_no_filters_on_PLPs_Mobile();
            // experiments.test_Pill_sub_cat_horizontally_scrollable();
            // experiments.test_158_Rollback_Test_for_Mini_Cart_ALL_CRO_531()
        }
        lib.listener(activateExpOnPageChange);
    } catch (e) {
        console.log("Error in Global JavaScript");
    }
})();