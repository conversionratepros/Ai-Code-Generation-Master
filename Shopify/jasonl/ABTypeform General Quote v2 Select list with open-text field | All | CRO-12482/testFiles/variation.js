(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-12482";

        /*
         * Deployed as a pure-CSS test: the theme server-renders both quote
         * buttons (control A + variant B) with their native Typeform init,
         * so the JS only adds the body class that arms the visibility rules
         * in variation.css. No cloning / listener manipulation — that was
         * the v1 mistake that broke submit tracking.
         */

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

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) { el.classList.add(cls); }
        }

        /* ── Init ── */

        function init() {
            addClass("body", variation_name);
        }

        waitForElement("body", init);

    } catch (e) {
        if (debug) console.log(e, "error in Test cro-12482");
    }
})();
