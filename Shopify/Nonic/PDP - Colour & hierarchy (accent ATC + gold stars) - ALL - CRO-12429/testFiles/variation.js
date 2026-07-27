(function () {
    if (window.cro_t_12429) { return; }
    window.cro_t_12429 = true;

    try {
        var debug = 0;
        var variation_name = "cro-12429";

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

        function init() {
            addClass('body', variation_name);
        }

        waitForElement('body', init);

    } catch (e) {
        if (debug) { console.log(e, 'error in Test cro-12429'); }
    }
})();
