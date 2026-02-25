(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "";
        /* all Pure helper functions */
        function waitForElement(selector, trigger) {
            var interval = setInterval(function () {
                if (
                    document &&
                    document.querySelector(selector) &&
                    document.querySelectorAll(selector).length > 0
                ) {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(function () {
                clearInterval(interval);
            }, 15000);
        }
        function live(selector, event, callback, context) {
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
                    while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
                    if (found) callback.call(el, e);
                });
            }
            live(selector, event, callback, context);
        }
        function insertHtml(selector, content, position) {
            var el = document.querySelector(selector);
            if (!position) {
                position = "afterend";
            }
            if (el && content) {
                el.insertAdjacentHTML(position, content);
            }
        }
        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        }
        function removeClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.contains(cls) && el.classList.remove(cls);
            }
        }

		/* Variation html */
        var croWidgetAdd = `<div class="cro-top-button-inner-desktop cro-top-button-inner-right">
        <div class="btn-text-sec">
            <p class="btn-first-text">Application results</p>
            <p class="btn-sec-text">within 2 minutes</p>
        </div>
        <div class="main-icon main-icon-two">
            <img class="img-icon cro-img-clockIcon" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/justMoney-cro-t-58-clock.png" alt="">
        </div>
    </div>`;

    var croMobWidgetAdd = `<div class="cro-top-button-inner-mobile cro-top-button-inner-right">
        <div class="btn-text-sec">
            <p class="btn-first-text">Application results</p>
            <p class="btn-sec-text">within 2 minutes</p>
        </div>
        <div class="main-icon main-icon-two">
            <img class="img-icon cro-img-clockIcon" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/justMoney-cro-t-58-clock.png" alt="">
        </div>
    </div>`;

        function onscrollSticky() {
            var stickyClass = document.querySelector('body');
            window.onscroll = function () {
                if (window.pageYOffset > 400) {
                    stickyClass.classList.add("cro-sticky");
                }
                else {
                    stickyClass.classList.remove("cro-sticky");
                }
            }
        }

        /* Variation Init */
        function init() {
			addClass("body","cro-t-58-widget")

            waitForElement('.cro-top-button-sec .top-button', function () {
                var croNewParentDiv = document.createElement("div");
                croNewParentDiv.className = "cro-top-button-inner-left";

                var croMainIcon = document.querySelector(".cro-top-button-sec .main-icon");
                var croBtnTextSec = document.querySelector(".cro-top-button-sec .btn-text-sec");

                var croTopButton = document.querySelector(".cro-top-button-sec .top-button");

                croNewParentDiv.appendChild(croMainIcon);
                croNewParentDiv.appendChild(croBtnTextSec);

                croTopButton.appendChild(croNewParentDiv);
            });

            waitForElement('.cro-top-button-sec-mobile .top-button', function () {
                var croNewParentDiv = document.createElement("div");
                croNewParentDiv.className = "cro-top-button-inner-left-mob";

                var croMainIcon = document.querySelector(".cro-top-button-sec-mobile .main-icon");
                var croBtnTextSec = document.querySelector(".cro-top-button-sec-mobile .btn-text-sec");

                var croTopButton = document.querySelector(".cro-top-button-sec-mobile .top-button");

                croNewParentDiv.appendChild(croMainIcon);
                croNewParentDiv.appendChild(croBtnTextSec);

                croTopButton.appendChild(croNewParentDiv);
            });

            waitForElement(".cro-top-button-inner-left", function () {
                if (!document.querySelector(".cro-top-button-inner-desktop")) {
                    insertHtml(".cro-top-button-inner-left", croWidgetAdd, "afterend");
                }
            });

            waitForElement(".cro-top-button-inner-left-mob", function () {
                if (!document.querySelector(".cro-top-button-inner-mobile")) {
                    insertHtml(".cro-top-button-inner-left-mob", croMobWidgetAdd, "afterend");
                }
            });

        }
        waitForElement('body', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();