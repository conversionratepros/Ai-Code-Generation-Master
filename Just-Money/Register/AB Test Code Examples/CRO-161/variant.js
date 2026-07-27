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

        var newSubheading = `<div class="cro-t-22-subheading">
        <div class="cro-t-22-subheading-wrapper">
            <div class="cro-t-22-subheading-text">
                and see how it affects your interest rates and ability to secure loans. Don't let a poor credit score
                hold you back. Let us help you.
            </div>
        </div>
    </div>`

        /* Variation Init */
        function init() {
            addClass("body", "cro-t-22_28");


            waitForElement(".register-hld.register h1.topcaption", function () {
                var parent = document.querySelector('h1.topcaption').closest('.col-lg-6')
                if (parent) {
                    parent.classList.add('cro-heading-parent')
                }
            });

            waitForElement('.register-hld.register h1.topcaption', function () {
                if (!document.querySelector('.cro-t-22-subheading')) {
                    insertHtml('.register-hld.register h1.topcaption', newSubheading, "afterend");
                }
            });

        }


        /* Initialise variation */
        waitForElement('body', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();