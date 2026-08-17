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
            }, waitForElementInViewport(selector, experimentId, testName) {
                return new Promise((resolve, reject) => {
                    let elementFound = false;
                    let elementInViewport = false;

                    // Set a timeout to reject the promise
                    var timeoutId = setTimeout(() => {
                        cleanup();
                        reject(new Error(`Timeout waiting for element in viewport: ${selector}`));
                    }, 5000);

                    function cleanup() {
                        if (intersectionObserver) intersectionObserver.disconnect();
                        if (domObserver) domObserver.disconnect();
                        clearTimeout(timeoutId);
                    }

                    // Create Intersection Observer with minimum threshold
                    var intersectionObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            elementInViewport = entry.isIntersecting;

                            // Only launch if element is currently in viewport when found
                            if (elementFound && elementInViewport) {
                                cleanup();
                                launchExperiment(experimentId);
                                resolve(entry.target);
                            }
                        });
                    }, {
                        root: null,
                        threshold: 0 // trigger as soon as even 1px is visible
                    });

                    // Create DOM observer
                    var domObserver = new MutationObserver(() => {
                        var element = document.querySelector(selector);
                        if (element && !elementFound) {
                            elementFound = true;
                            intersectionObserver.observe(element);

                            // If element is immediately in viewport when found
                            var rect = element.getBoundingClientRect();
                            if (rect.top < window.innerHeight && rect.bottom > 0) {
                                elementInViewport = true;
                                cleanup();
                                launchExperiment(experimentId);
                                resolve(element);
                            }
                        }
                    });

                    // Check if element already exists
                    var element = document.querySelector(selector);
                    if (element) {
                        elementFound = true;
                        intersectionObserver.observe(element);

                        // Check if already in viewport
                        var rect = element.getBoundingClientRect();
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            elementInViewport = true;
                            cleanup();
                            lib.launchExperiment(experimentId, testName);
                            resolve(element);
                            return;
                        }
                    }

                    // Start observing DOM changes
                    domObserver.observe(document.documentElement, {
                        childList: true,
                        subtree: true
                    });
                });
            }, launchExperiment(experimentId, testName) {
                // Set the experiment flag
                window[`experiment${experimentId}flag`] = true;
                console.log(testName, ' Activated')
                // Initialize converter queue if it doesn't exist
                window._conv_q = window._conv_q || [];

                // Push experiment execution
                window._conv_q.push({
                    what: "executeExperiment",
                    params: {
                        experienceId: experimentId,
                        triggerIntegrations: false
                    }
                });
            }
        };

        var experiments = {
            recipe_KI5_Optimised_class_banners_ALL_CRO3671() {
                // var SELECTOR_TO_WAIT_FOR = 'body.page-node-type-articles';  // Change to your target element's selector
                // var EXPERIMENT_ID = '1004158798';  // Change to your experiment ID
                // var Test_Name = 'Recipe KI5 | Optimised class banners | ALL | CRO-3671';
                // lib.waitForElementInViewport(SELECTOR_TO_WAIT_FOR, EXPERIMENT_ID, Test_Name);
                var pathName = window.location.pathname;
                if (pathName.indexOf('/pregnancy') != -1 || pathName.indexOf('/baby-names') != -1) {
                // lib.waitForElement('body.page-node-type-articles', function () {
                    window.crotest_KI5_Optimised_class_banners = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004158798"]);
                    console.log("Experiment Recipe KI5 | Optimised class banners | ALL | CRO-3671 Activated");
                // }, 50, 15000)
                }

            }, recipe_Recipe_KI35_Class_Promotion_Homepage_avg_ALL_CRO4386() {
                var pathName = window.location.pathname;
                if (pathName == '/') {
                    window.crotest_KI35_Class_Promotion_Homepage = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004158819"]);
                    console.log("Experiment Recipe KI35 | Class Promotion Homepage (avg) | ALL | CRO-4386 Activated");
                }
            }
        };


        console.log("Global JavaScript Activate");
        experiments.recipe_KI5_Optimised_class_banners_ALL_CRO3671();
        experiments.recipe_Recipe_KI35_Class_Promotion_Homepage_avg_ALL_CRO4386();
        /**
         * Activate all experiments on location change
         */
        function activateExpOnPageChange() {

        }

        lib.listener(activateExpOnPageChange);
    } catch (e) {
        console.log("Error in Global JavaScript");
    }
})();