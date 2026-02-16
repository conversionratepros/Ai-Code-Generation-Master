(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro_ki_72";
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
            function addEvent(el, type, handler) {
                if (el.attachEvent) el.attachEvent("on" + type, handler);
                else el.addEventListener(type, handler);
            }
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

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        }

        var ki_header = `<div class="cro-ki_72_header">
        <div class="cro-ki_72_header-wrapper relative container">
            <div class="cro-ki_72_header-inner">
                <h2></h2>
            </div>
            <div class="cro-ki_72_header-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 15 9" fill="none">
                    <path d="M1.3999 1.43994L7.3999 7.43994L13.3999 1.43994" stroke="black" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    </div>`;

        function init() {
            addClass("body", variation_name);

            waitForElement("main section", function () {
                document.querySelectorAll("main section").forEach(function (section) {
                    var originalHeading = section.querySelector(".relative h2") || section.querySelector(".relative h3");

                    var titleText = originalHeading ? originalHeading.textContent.trim() : "";

                    if (!section.querySelector(".cro-ki_72_header")) {
                        section.insertAdjacentHTML("afterbegin", ki_header);
                    }

                    var newH2 = section.querySelector(".cro-ki_72_header h2");
                    if (newH2 && titleText) {
                        newH2.textContent = titleText;
                    }

                    if (originalHeading) {
                        originalHeading.remove();
                    }
                });

                document.querySelectorAll('main section').forEach(function (section) {
                    section.classList.add('cro-ki_72_dropdown');
                });
            });

            waitForElement("#tertiary", function () {
                var parent = document.querySelector('#tertiary').closest('.container')
                if (parent) {
                    parent.classList.add('cro-ki-72-tertiary')
                }
            });
        }

        function croEventHandkler() {
            live(".cro-ki_72_header-wrapper", "click", function () {
                var section = this.closest("section.cro-ki_72_dropdown");
                if (!section) return;

                section.querySelectorAll(".container:not(.cro-ki_72_header-wrapper)").forEach(function (el) {
                    el.classList.toggle("show");
                });

                var arrow = this.querySelector(".cro-ki_72_header-arrow");
                if (arrow) {
                    arrow.classList.toggle("up");
                }

                var header = this.querySelector(".cro-ki_72_header-inner");
                if (header) {
                    header.classList.toggle("up");
                }
            });
        }

        if (!window.cro_ki_72) {
            croEventHandkler();
            window.cro_ki_72 = true;
        }

        if (window.innerWidth < 768) {
            waitForElement('#primary', init);
        }
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();