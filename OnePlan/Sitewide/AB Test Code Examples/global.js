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
            test_27() {
                var url = window.location.href;
                if (url.includes('plans/HealthPlans')) {
                    window.crotest_27 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004117317"]);
                    console.log("Recipe 27 | Health pricing table clarity | Desktop | OP-343 Activate");
                }

            },
            test_101() {
                var url = window.location.href;
                if (url.includes('/Landings/pet-insurance-s')) {
                    window.crotest_101 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004119248"]);
                    console.log("Recipe 101 | LP Benefits push | All | OP-384 Activate");
                }

            },
            test_Recipe_KI193_Warm_Imagery_on_Pet_Landing_Page_ALL_CRO_261() {
                var url = window.location.href;
                if (url.includes('/Landings/pet-insurance-s')) {
                    window.crotest_KI193_Warm_Imagery = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004140626"]);
                    console.log("Recipe Recipe KI193 | Warm Imagery on Pet Landing Page | ALL | CRO-261 Activate");
                }

            },
            test_117_Available_on_weekends_badge_All_CRO247() {
                var today = new Date();
                var day = today.getDay(); // 0 = Sunday, 6 = Saturday
                var url = window.location.pathname;

                if (day === 0 || day === 6 && url == '/') {
                    window.crotest_117_Available_on_weekends_badge = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004157426"]);
                    console.log("Recipe 117 | Available on weekends badge [PET] | All | CRO-247 Activate");
                    console.log("Running on the weekend!");
                }
            },
            test_Recipe_121_Making_Logo_Clickable_on_Landing_Pages_ALL_CRO4740() {
                var url = window.location.href;
                if (url.includes('/Landings/pet-insurance-s') || url.includes('/Landings/health-insurance-s')) {
                    window.crotest_Recipe_121_Making_Logo_Clickable_on_CRO4740 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004157368"]);
                    console.log("Recipe Recipe 121 | Making Logo Clickable on Landing Pages | ALL | CRO-4740 Activate");
                }

            },
            test_Recipe_193_Warm_imagery_on_Health_Landing_page_All() {
                var url = window.location.href;
                if (url.includes('/Landings/health-insurance-s')) {
                    window.crotest_Recipe_193_Warm_imagery_on_Health = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004157747"]);
                    console.log("Recipe Recipe 193 | Warm imagery on Health Landing page | All Activate");
                }

            },
            test_Recipe_KI69_CTA_Colour_on_Health_LP_ALL_CRO_5257() {
                var url = window.location.href;
                if (url.includes('/Landings/health-insurance-s')) {
                    window.crotest_Recipe_KI69_CTA_Colour_on_Health_LP_ALL_CRO_5257 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004164279"]);
                    console.log("Recipe Recipe KI69 | CTA Colour on Health LP | ALL | CRO-5257 Activate");
                }

            },
            test_Recipe_86_117_Homepage_pricing_USP_wording_All_CRO259() {
                var url = window.location.pathname;
                if (url == '/') {
                    window.crotest_Recipe_86_117_Homepage_pricing_USP = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004140617"]);
                    console.log("Recipe Recipe 86.117 | Homepage pricing USP wording | All | CRO-259 Activate");
                }

            }
        };

        console.log("Global JavaScript Activate");
        experiments.test_117_Available_on_weekends_badge_All_CRO247();
        experiments.test_Recipe_86_117_Homepage_pricing_USP_wording_All_CRO259();
        experiments.test_Recipe_KI69_CTA_Colour_on_Health_LP_ALL_CRO_5257();
        /**
         * Activate all experiments on location change
         */

    } catch (e) {
        console.log("Error in Global JavaScript");
    }
})();