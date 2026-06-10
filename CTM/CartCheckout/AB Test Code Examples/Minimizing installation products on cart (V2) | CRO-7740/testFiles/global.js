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
                if (pathCheck.indexOf('category.html') != -1 && pathCheck.indexOf('tiles') != -1) {
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
                    window._conv_q.push(["executeExperiment", "1004196689"]);
                    console.log("Test Recipe 114 | Minimizing installation products on cart (V2) | ALL | CRO-3029 Activated");
                } else {
                    if (document.querySelector('.cro-t-ctm-114-v2')) {
                        document.querySelector('body').classList.remove('cro-t-ctm-114-v2')
                    }
                }
            },
        };

        // experiments.test_Recipe_KI238_KI239_KI240_KI241_Emphasizing_Tile_Calculator_Button_v4_Icon_ALL_CRO5837();

        experiments.test_Recipe_KI211_Buy_now_pay_later_from_pricing_on_cart_ALL_CRO4974();

        experiments.test_Recipe_121_v2_See_feel_video_widget_All();

        experiments.test_PDP_Buy_Box_simplification_All_CRO8475();

        experiments.test_Recipe_PLP_Card_Size_Differentiation_Visual_Cue_ALL_CRO_12301();

        experiments.test_Recipe114_Minimizing_installation_products_on_cart_V2_ALL_CRO3029()
    } catch (e) {
        console.log("Error in Global JavaScript");
    }
})();