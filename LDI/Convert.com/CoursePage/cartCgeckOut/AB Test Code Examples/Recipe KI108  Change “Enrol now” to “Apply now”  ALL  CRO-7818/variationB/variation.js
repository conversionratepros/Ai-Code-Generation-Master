(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "croki108";
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

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        }

        function changeButtonText() {
            waitForElement('.elementor-button.elementor-button-link', function () {
                var buttons = document.querySelectorAll('.elementor-button.elementor-button-link');
                Array.prototype.forEach.call(buttons, function (btn) {
                    var text = btn.innerText.trim().toLowerCase();
                    if (text === 'enrol now') {
                        btn.innerText = 'Apply now';
                    }
                });
            });

            waitForElement('.elementor-nav-menu a.elementor-item.elementor-item-anchor', function () {
                var buttons2 = document.querySelectorAll('.elementor-nav-menu a.elementor-item.elementor-item-anchor');
                Array.prototype.forEach.call(buttons2, function (btn2) {
                    var text2 = btn2.innerText.trim().toLowerCase();
                    if (text2 === 'enrol now') {
                        btn2.innerText = 'Apply now';
                    }
                });
            });
        }


        function init() {
            addClass("body", variation_name);
            var doneTypingInterval = 6000;  //time in ms, 5 seconds for example
            var intervalCallAgain = setInterval(function () {
                changeButtonText();
            }, 400);

            //start the countdown
            var Timer = setTimeout(function () {
                clearInterval(intervalCallAgain);
            }, doneTypingInterval);
        }


        waitForElement('#page', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();