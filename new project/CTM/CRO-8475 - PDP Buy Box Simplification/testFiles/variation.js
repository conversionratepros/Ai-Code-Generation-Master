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

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        }

        function updateVASIcons() {

            const newIcons = {
                ".modal_1 .vas-modal_icon":
                    "https://crp-clients-images.s3.af-south-1.amazonaws.com/CTM/PDP+%7C+Buy+Box+simplification+%7C+All+%7C+CRO-8475/CRO-8475-1.svg",

                ".modal_2 .vas-modal_icon":
                    "https://crp-clients-images.s3.af-south-1.amazonaws.com/CTM/PDP+%7C+Buy+Box+simplification+%7C+All+%7C+CRO-8475/CRO-8475-2.svg",

                ".modal_3 .vas-modal_icon":
                    "https://crp-clients-images.s3.af-south-1.amazonaws.com/CTM/PDP+%7C+Buy+Box+simplification+%7C+All+%7C+CRO-8475/CRO-8475-3.svg",

                ".modal_4 .vas-modal_icon":
                    "https://crp-clients-images.s3.af-south-1.amazonaws.com/CTM/PDP+%7C+Buy+Box+simplification+%7C+All+%7C+CRO-8475/CRO-8475-4.svg"
            };

            Object.keys(newIcons).forEach(function (selector) {

                const img = document.querySelector(selector);

                if (img) {
                    img.src = newIcons[selector];
                }

            });

        }

        function init() {
            addClass("body", variation_name);
            waitForElement('.modal_1 .vas-modal_icon', updateVASIcons);
        }

        waitForElement('body', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();