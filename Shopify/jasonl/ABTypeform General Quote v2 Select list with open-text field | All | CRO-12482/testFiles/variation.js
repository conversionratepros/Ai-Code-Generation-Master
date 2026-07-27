(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-12482";

        /*
         * Old form ID (currently on the site): SPqugn2G
         * New form ID (v2 — select list with open-text field): Xcco8a2p
         */
        var NEW_FORM_ID      = "Xcco8a2p";
        var NEW_TYPEFORM_URL = "https://jsnl.typeform.com/to/" + NEW_FORM_ID;

        /* ── Pure helper functions ── */

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
            if (!position) { position = "afterend"; }
            if (el && content) { el.insertAdjacentHTML(position, content); }
        }

        function innerHTMLContent(selector, content) {
            var el = document.querySelector(selector);
            if (el) { el.innerHTML = content; }
        }

        function innerChildContent(selector, childNumber, content) {
            var el = document.querySelector(selector);
            if (el.hasChildNodes()) { el.childNodes[childNumber].textContent = content; }
        }

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) { el.classList.add(cls); }
        }

        function toggleClass(el, cls) {
            var el = document.querySelector(el);
            if (el) { el.classList.toggle(cls); }
        }

        function removeClass(el, cls) {
            var el = document.querySelector(el);
            if (el) { el.classList.contains(cls) && el.classList.remove(cls); }
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

        function waitForSwiper(trigger) {
            var interval = setInterval(function () {
                if (typeof window.Swiper != "undefined") {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(function () { clearInterval(interval); }, 15000);
        }

        /* ── Core: swap the Typeform popup form ID ── */

        function updateQuoteButtons() {
            var buttons = document.querySelectorAll('[data-tf-popup]');

            buttons.forEach(function (oldBtn) {
                if (oldBtn.getAttribute('data-cro12482')) return; /* double-inject guard */

                /*
                 * Clone the element to detach Typeform's registered click listeners,
                 * then set the new form ID before re-inserting so Typeform re-initialises
                 * with the correct form. The addEventListener acts as a fallback in case
                 * Typeform does not re-initialise the cloned element.
                 */
                var newBtn = oldBtn.cloneNode(true);
                newBtn.setAttribute('data-cro12482', '1');
                newBtn.setAttribute('data-tf-popup', NEW_FORM_ID);

                newBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (window.tf && typeof window.tf.createPopup === 'function') {
                        window.tf.createPopup(NEW_FORM_ID).open();
                    } else {
                        window.open(NEW_TYPEFORM_URL, '_blank');
                    }
                });

                oldBtn.parentNode.replaceChild(newBtn, oldBtn);
            });
        }

        /* ── Init ── */

        function init() {
            addClass("body", variation_name);
            waitForElement('[data-tf-popup]', updateQuoteButtons);
        }

        function croEventHandler() {
            live("selector", "click", function () { });
        }

        if (!window.cro_t_12482) {
            croEventHandler();
            window.cro_t_12482 = true;
        }

        waitForElement("body", init);

    } catch (e) {
        if (debug) console.log(e, "error in Test cro-12482");
    }
})();
