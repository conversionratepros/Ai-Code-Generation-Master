(function () {
    try {
        var debug = 0;
        var variation_name = "CRO10229";

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
            if (el) {
                el.classList.add(cls);
            }
        }

        function init() {
            addClass("body", variation_name);

            var callbackBtn = document.querySelector(".cro-10120-from-button #buttonsWrapper #Callback");
            var applyBtn = document.querySelector(".cro-10120-from-button #buttonsWrapper #Online");
            var waBtn = document.querySelector(".cro-10120-from-button #buttonsWrapper #Whatsapp");

            // Remove "Call Me" entirely - down to a two-button layout
            if (callbackBtn) {
                var callbackWrapper = callbackBtn.closest("div");
                if (callbackWrapper && callbackWrapper.parentNode) {
                    callbackWrapper.parentNode.removeChild(callbackWrapper);
                }
            }

            // Apply Now becomes the secondary outline button
            if (applyBtn) {
                var applyWrapper = applyBtn.closest("div");
                if (applyWrapper) applyWrapper.classList.add("cro10229-apply");
            }

            // Chat on WhatsApp becomes the primary solid pill
            if (waBtn) {
                var waWrapper = waBtn.closest("div");
                if (waWrapper) waWrapper.classList.add("cro10229-wa");
            }
        }

        waitForElement(".cro-10120-from-button #buttonsWrapper #Whatsapp", init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();
