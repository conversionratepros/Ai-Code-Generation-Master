(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-12482";

        /*
         * The theme (snippets/typeform-embed-manual.liquid) renders BOTH quote
         * buttons server-side in each placement:
         *   A (control): [data-tf-popup="SPqugn2G"] .get-a-quote-btn-a — old form
         *   B (variant): [data-tf-popup="Xcco8a2p"] .get-a-quote-btn-b — new v2 form
         * Both are initialised natively by the Typeform embed script, so the
         * submit/ready tracking callbacks stay intact on B. The variant only
         * toggles visibility via the theme's show-ab-a / show-ab-b classes —
         * no cloning, no listener manipulation. Hiding A lives in variation.css
         * with !important because site JS sets inline display on these buttons
         * after the Typeform embed initialises.
         * Selectors are keyed on data-tf-popup (not show-ab-*) so they keep
         * matching after the site mutates the buttons' classes at runtime.
         */
        var OLD_BTN = '.get-a-quote-btn-ab[data-tf-popup="SPqugn2G"]';
        var NEW_BTN = '.get-a-quote-btn-ab[data-tf-popup="Xcco8a2p"]';

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

        /* ── Core: toggle the server-rendered A/B quote buttons ── */

        function swapQuoteButtons() {
            document.querySelectorAll(OLD_BTN).forEach(function (btn) {
                btn.classList.remove('show-ab-a');
            });

            document.querySelectorAll(NEW_BTN).forEach(function (btn) {
                btn.classList.remove('show-ab-a');
                btn.classList.add('show-ab-b');
                /* last resort if a placement ships no .show-ab-b display rule */
                if (window.getComputedStyle(btn).display === 'none') {
                    btn.style.setProperty('display', 'block', 'important');
                }
            });
        }

        function watchLateButtons() {
            var observer = new MutationObserver(function () {
                if (document.querySelector(NEW_BTN + ':not(.show-ab-b)')) {
                    swapQuoteButtons();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }

        /* ── Init ── */

        function init() {
            waitForElement(NEW_BTN, function () {
                swapQuoteButtons();
                /* body class after the swap so A hides and B shows in one paint */
                addClass("body", variation_name);
                watchLateButtons();
            });
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
