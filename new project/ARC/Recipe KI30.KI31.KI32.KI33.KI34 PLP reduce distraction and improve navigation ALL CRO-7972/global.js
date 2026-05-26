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
            test_checkout() {
                (function () {
                    try {
                        const ACTIVE_CLASS = 'step-bar__step--custom--active';
                        const BODY_PREFIX = 'cro_';
                        lib.waitForElement('.step-bar--custom', function () {
                            const stepBar = document.querySelector('.step-bar--custom');
                            let lastClass = '';
                            function syncBodyClass() {
                                try {
                                    const activeStep = stepBar.querySelector('.' + ACTIVE_CLASS);
                                    const btn = activeStep && activeStep.querySelector('button');
                                    const label = btn ? btn.textContent.trim().replace(/\s+/g, '_') : '';
                                    const newClass = label ? BODY_PREFIX + label : '';

                                    if (newClass === lastClass) return; // skip redundant work
                                    if (lastClass) document.body.classList.remove(lastClass);
                                    if (newClass) document.body.classList.add(newClass);
                                    lastClass = newClass;
                                } catch (e) { /* swallow */ }
                            }

                            syncBodyClass();
                            new MutationObserver(syncBodyClass).observe(stepBar, {
                                attributes: true,
                                attributeFilter: ['class'],
                                subtree: true,
                            });
                        }, 50, 20000)

                    } catch (e) { /* swallow */ }
                })();
            },
            test_Recipe_KI14_KI2_Introduce_site_and_brands_ALL_CRO7537() {
                var currentPath = window.location.pathname;
                if (currentPath == '/') {
                    window.crotest_KI14_KI2_Introduce_site_and_brands_ALL = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004189372"]);
                    console.log("Experiment Recipe KI14.KI2 | Introduce site and brands | ALL | CRO-7537 Activated");
                }
            },
            test_Recipe_KI5_Remove_headers_on_PLPs_ALL_CRO7521() {
                var currentPath = window.location.pathname;
                if (currentPath.indexOf('/brands') == -1) {
                    lib.waitForElement('#multiForm', function () {
                        window.crotest_KI5_Remove_headers_on_PLPs_ALL_CRO7521 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004197011"]);
                        console.log("Experiment Recipe KI5 | Remove headers on PLPs | ALL | CRO-7521 Activated");
                    }, 50, 20000)

                }
            }, test_Recipe_KI53_Reduce_visual_overwhelm_on_Delivery_page_ALL_CRO8143() {
                lib.waitForElement('#Block__AddressContainer', function () {
                    window.crotest_Recipe_KI53_Reduce_visual_overwhelm = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004194416"]);
                    console.log("Experiment Recipe KI53 | Reduce visual overwhelm on Delivery page | ALL | CRO-8143 Activated");
                }, 50, 20000)
            }, test_Recipe_KI19_Add_conventional_elements_to_the_checkout_ALL_CRO7505() {
                lib.waitForElement('.cro_My_Bag, .cro_Delivery, .cro_Payment', function () {
                    window.crotest_Recipe_KI19_checkout_ALL_CRO7505 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004199433"]);
                    console.log("Experiment Recipe KI19 | Add conventional elements to the checkout | ALL | CRO-7505 Activated");
                }, 50, 20000)
            }, test_PLP_reduce_distraction_improve_navigation_ALL_CRO7972() {
                lib.waitForElement('#multiForm', function () {
                    window.crotest_PLP_reduce_distraction_improve_navigation_ALL_CRO7972 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004198304"]);
                    console.log("Experiment Recipe KI30.KI31.KI32.KI33.KI34 | PLP reduce distraction and improve navigation | ALL | CRO-7972 Activated");
                }, 50, 20000)
            }


        };


        console.log("Global JavaScript Activate");
        experiments.test_checkout();
        experiments.test_Recipe_KI14_KI2_Introduce_site_and_brands_ALL_CRO7537();
        experiments.test_Recipe_KI5_Remove_headers_on_PLPs_ALL_CRO7521();
        experiments.test_Recipe_KI53_Reduce_visual_overwhelm_on_Delivery_page_ALL_CRO8143();
        experiments.test_Recipe_KI19_Add_conventional_elements_to_the_checkout_ALL_CRO7505();
        experiments.test_PLP_reduce_distraction_improve_navigation_ALL_CRO7972();
        /**
         * Activate all experiments on location change
         */
        function activateExpOnPageChange() {
            //SPA Calls
        }
        // lib.listener(activateExpOnPageChange);
    } catch (e) {
        console.log("Error in Global JavaScript");
    }
})();