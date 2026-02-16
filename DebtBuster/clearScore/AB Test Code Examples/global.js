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

        /**
         * Trigger converion goal
         */

        /**
         * Manual activation
         */

        var experiments = {
            test_83_DBCS_94_Template_Start_new_All() {
                var pageUrl = window.location.href;
                if (pageUrl.indexOf('/landing-pages/omni-lp') != -1 || pageUrl.indexOf('/landing-pages/2022-07-image-text-above-lp2') != -1 || pageUrl.indexOf('/2023-02-facebook-dr-turbo') != -1) {
                    window.crotest_DBCS_Template = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004126224"]);
                    console.log("TEST 83 Activated");
                }

            }, test_91_Hide_prefilled_form_ALL_CRO4781() {
                var pageUrl = window.location.href;
                const isFromClearScore = () => {
                    const params = new URLSearchParams(location.search);

                    return (
                        params.get('utm_source') === 'ClearScore' &&
                        params.get('utm_medium') === 'Web' &&
                        !!params.get('u')?.trim()
                    );
                };


                if (pageUrl.indexOf('https://start.debtbusters.co.za/custom-landing-pages-debt-counselling-clear-score-landing') != -1) {
                    // Usage
                    if (isFromClearScore()) {
                        // Your test logic here...
                        window.crotest_test_91_Hide_prefilled_form = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004162890"]);
                        console.log("TEST 91 | Hide pre-filled form | ALL | CRO-4781 Activated");
                    }
                }
            }
        };


        // experiments.test_83_DBCS_94_Template_Start_new_All();

        console.log("Global JavaScript Activate");
        experiments.test_91_Hide_prefilled_form_ALL_CRO4781();
        /**
         * Activate all experiments on location change
         */
        function activateExpOnPageChange() {
            // experiments.test_83_DBCS_94_Template_Start_new_All();

        }
        lib.listener(activateExpOnPageChange);
    } catch (e) {
        console.log("Error in Global JavaScript");
    }
})();