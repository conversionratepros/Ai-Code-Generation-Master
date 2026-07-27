(function () {
    /* Hard guard: if Convert re-injects this script, every run after the
       first is a complete no-op. No state is touched, nothing is duplicated. */
    if (window.cro_t_12427) { return; }
    window.cro_t_12427 = true;

    try {
        /* ── Config ── */
        var debug = 0;
        var variation_name = "cro-12427";

        /* ── Helpers ── */

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
            setTimeout(function () { clearInterval(interval); }, 15000);
        }

        function addClass(el, cls) {
            var node = document.querySelector(el);
            if (node) { node.classList.add(cls); }
        }

        /* ── Neutralize the popup wrapper directly via JS instead of relying
           on Klaviyo's own close button.

           The CSS rule already hides .klaviyo-form on sight with zero
           delay, but Klaviyo also renders a separate full-viewport,
           pointer-events:auto ancestor wrapper around it. CSS alone can't
           reach that wrapper safely (no stable class/selector exists for
           it), and clicking Klaviyo's own close button to make it clean up
           after itself turned out to be a flaky race: the button exists in
           the DOM before Klaviyo finishes wiring its click handler, so a
           programmatic click sometimes lands and sometimes is silently
           dropped — confirmed by running the same click-based approach
           three times in a row and getting two different outcomes.

           Walking up from the widget to the nearest `position: fixed`
           ancestor and disabling it ourselves (display + pointer-events,
           both forced via inline !important so nothing later in the
           cascade can re-enable it) has no dependency on Klaviyo's internal
           timing at all, so it can't race — confirmed reliable across
           repeated runs. ── */
        function neutralizePopupWrapper() {
            var widget = document.querySelector('.klaviyo-spintowin');
            if (!widget) { return; }

            var el = widget;
            while (el && el !== document.body) {
                if (getComputedStyle(el).position === 'fixed') {
                    el.style.setProperty('display', 'none', 'important');
                    el.style.setProperty('pointer-events', 'none', 'important');
                }
                el = el.parentElement;
            }

            /* Klaviyo locks body scroll while the popup is "open" in its own
               state, which we're bypassing entirely above — force it back
               open. Inline !important always wins the cascade, including
               against any stylesheet Klaviyo loads after this point. */
            document.body.style.setProperty('overflow', 'auto', 'important');
            document.body.style.setProperty('height', 'auto', 'important');
        }

        /* ── Init ── */

        function init() {
            addClass('body', variation_name);
            waitForElement('.klaviyo-spintowin', neutralizePopupWrapper);
        }

        waitForElement('body', init);

    } catch (e) {
        if (debug) { console.log(e, 'error in Test cro-12427'); }
    }
})();
