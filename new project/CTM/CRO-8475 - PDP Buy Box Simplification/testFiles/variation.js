(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "CRO-8475";
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

        function insertHtml(selector, content, position) {
            var el = document.querySelector(selector);
            if (!position) {
                position = "afterend";
            }
            if (el && content) {
                el.insertAdjacentHTML(position, content);
            }
        }

        function innerHTMLContent(selector, content) {
            var el = document.querySelector(selector);
            if (el) {
                el.innerHTML = content;
            }
        }

        function innerChildContent(selector, childNumber, content) {
            var el = document.querySelector(selector);
            if (el.hasChildNodes()) {
                el.childNodes[childNumber].textContent = content;
            }
        }

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        }

        function toggleClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.toggle(cls);
            }
        }

        function removeClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.contains(cls) && el.classList.remove(cls);
            }
        }

        function scroll(click, selector) {
            click.addEventListener('click', function (event) {
                event.preventDefault();
                var target = document.querySelector(selector);
                if (target) {
                    window.scrollTo({
                        top: target.getBoundingClientRect().top + window.scrollY,
                        behavior: 'smooth'
                    });
                }
            });
        }

        function updateVASIcons() {
            var newIcons = {
                ".modal_1 .vas-modal_icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/CTM/PDP+%7C+Buy+Box+simplification+%7C+All+%7C+CRO-8475/CRO-8475-1.svg",
                ".modal_2 .vas-modal_icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/CTM/PDP+%7C+Buy+Box+simplification+%7C+All+%7C+CRO-8475/CRO-8475-2.svg",
                ".modal_3 .vas-modal_icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/CTM/PDP+%7C+Buy+Box+simplification+%7C+All+%7C+CRO-8475/CRO-8475-3.svg",
                ".modal_4 .vas-modal_icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/CTM/PDP+%7C+Buy+Box+simplification+%7C+All+%7C+CRO-8475/CRO-8475-4.svg"
            };

            Object.keys(newIcons).forEach(function(selector) {
                var img = document.querySelector(selector);
                if (img) {
                    img.src = newIcons[selector];
                }
            });
        }

        function init() {
            updateVASIcons();
            addClass("body", variation_name);
        }

        waitForElement('body', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();
