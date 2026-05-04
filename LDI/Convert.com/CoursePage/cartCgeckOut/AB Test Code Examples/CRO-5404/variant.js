(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "croki105";
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

        var newSection = `<div class="cro105-dentists-section">
        <div class="cro105-dentists--wrapper">
            <div class="cro105-dentists-parent">
                <div class="cro105-dentists-text">
                    <span>Suitable for :</span> Graduate dentists | Newly qualified dentists | Hospital dentists | Private dentists | Experienced dentists
                </div>
            </div>
        </div>
    </div>`;


        /* Variation Init */
        function init() {
            addClass("body", variation_name);

            waitForElement('h1.elementor-heading-title', () => {
                var targets = [
                    "ORTHODONTICS COURSES",
                    "IMPLANTOLOGY & ORAL SURGERY COURSES",
                    "AESTHETIC & RESTORATIVE DENTISTRY COURSES"
                ];

                document.querySelectorAll('h1.elementor-heading-title').forEach(e => {
                    if (targets.includes(e.textContent.trim())) {
                        e.closest('section')?.classList.add('cro-hero-Banner');
                    }

                });
            });

            waitForElement('.cro-hero-Banner', function () {
                if (!document.querySelector('.cro105-dentists-section')) {
                    insertHtml('.cro-hero-Banner', newSection, "afterend");
                }
            });


        }


        var pageLocation = window.location.href;
        var allowedPaths = [
            "/orthodontics-dentofacial-orthopaedics/",
            "/dental-implantology-oral-surgery/",
            "/aesthetic-restorative-dentistry/"
        ];

        var isMatch = allowedPaths.some(function (path) {
            return pageLocation.includes(path);
        });

        if (isMatch) {
            waitForElement("#page.site", init);
        }



    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();