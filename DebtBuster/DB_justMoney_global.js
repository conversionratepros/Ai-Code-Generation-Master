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
            test_63_64_ThemePageCleanup() {
                var url = window.location.pathname;
                if (url.indexOf('/themes') != -1) {
                    window.cro_t_63_64_ThemePageCleanup = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "100497843"]);
                    console.log("Experiment Test 63.64 ThemePageCleanup Activated");
                }
            },
        };
        // window.location.pathname
        // experiments.test_63_64_ThemePageCleanup();
        console.log("Global JavaScript Activate");

        /**
         * Activate all experiments on location change
         */
        function activateExpOnPageChange() {
            // experiments.test_63_64_ThemePageCleanup();
        }
        lib.listener(activateExpOnPageChange);
    } catch (e) {
        console.log("Error in Global JavaScript");
    }
})();