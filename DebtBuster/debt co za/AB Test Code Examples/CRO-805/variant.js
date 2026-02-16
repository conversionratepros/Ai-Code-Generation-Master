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


        var textAndIcon = `<div class="cro-recipe-5-solve-new-part">
        <div class="cro-recipe-5-solve-new-part-wrapper">
            <div class="container text-center">
                <div class="cro-recipe-5-solve-title-part">
                    <p class="cro-recipe-5-solve-title-part-text">Let us help ease your debt burden</p>
                </div>
                <div class="cro-recipe-5-icon-text-all-parts">
                    <div class="cro-recipe-5-icon-text-first-part cro-container-all">
                        <div class="cro-recipe-5-icon-">
                            <img class="cro-recipe-5-icon-first"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/1_partners.png" alt="">
                        </div>
                        <div class="cro-recipe-5-icon-text-header-part">
                            <p class="cro-recipe-5-icon-text-header">Enjoy lower interest rates</p>
                        </div>
                        <div class="cro-recipe-5-icon-sub-header">
                            <p class="cro-recipe-5-icon-sub-header-text">
                                Our team is ready to negotiate reduced interest rates on your behalf, ensuring your debt repayments are manageable.
                            </p>
                        </div>
                    </div>
                    <div class="cro-recipe-5-icon-text-second-part cro-container-all">
                        <div class="cro-recipe-5-icon-first">
                            <img class="cro-recipe-5-icon-second"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/2_interest-rate.png"
                                alt="">
                        </div>
                        <div class="cro-recipe-5-icon-text-header-part">
                            <p class="cro-recipe-5-icon-text-header">Have more money <br>
                                at the end of the month</p>
                        </div>
                        <div class="cro-recipe-5-icon-sub-header">
                            <p class="cro-recipe-5-icon-sub-header-text">
                                Paying only what you can afford, means you can take care of the things that matter most.
                            </p>
                        </div>
                    </div>
                    <div class="cro-recipe-5-icon-text-third-part cro-container-all">
                        <div class="cro-recipe-5-icon-first">
                            <img class="cro-recipe-5-icon-third"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/cro-t-7-supported-team.png" alt="">
                        </div>
                        <div class="cro-recipe-5-icon-text-header-part">
                            <p class="cro-recipe-5-icon-text-header">Be supported by <br>
                                our team of experts</p>
                        </div>
                        <div class="cro-recipe-5-icon-sub-header">
                            <p class="cro-recipe-5-icon-sub-header-text">
                                Our long-standing relationships with creditors allow us to negotiate repayment terms that suit you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

        var topBannerLeft = `<div class="cro-t-7-left-part">
        <div class="cro-t-7-left-part-wrapper">
            <p class="cro-banner-left-text">Here’s how it works:</p>
        </div>
    </div>`

        var SubHeading = `<div class="cro-t-7-subheading-part">
        <div class="cro-t-7-subheading-wrapper">
            <p class="cro-t-7-subheading-text">Quick and Easy Access to the Financial Support You Need.</p>

        </div>
    </div>`

        var mobileText = `    <div class="cro_mobile_bullets">
        <p>Do you have a poor credit score? Are you struggling to get approved for loans or credit cards? A poor credit
            score can make life tough, but it doesn’t have to hold you back any longer. At Debt.co.za, we specialise in
            helping people with a less-than-perfect credit profile to get the financial support they deserve.</p>

        <div class="cro-t-7-left-part">
            <div class="cro-t-7-left-part-wrapper">
                <p class="cro-banner-left-text">Here’s how it works:</p>
            </div>
        </div>
    </div>`;

        /* Variation Init */
        function init() {
            addClass('body', 'cro-t-7')

            waitForElement(".pt-10.pb-0 .decorated", function () {
                var parent = document.querySelector('.decorated').closest('div')
                if (parent) {
                    parent.classList.add('cro-Banner-left-parent')
                }
            });


            waitForElement('section.bg-gray', function () {
                if (!document.querySelector('.cro-recipe-5-solve-new-part')) {
                    insertHtml('section.bg-gray', textAndIcon, "afterend");
                }
            });

            waitForElement('.cro-Banner-left-parent .decorated', function () {
                if (!document.querySelector('.cro-t-7-left-part')) {
                    insertHtml('.cro-Banner-left-parent .decorated', topBannerLeft, "beforebegin");
                }
            });
            waitForElement('.cro-Banner-left-parent h1', function () {
                if (!document.querySelector('.cro-t-7-subheading-part')) {
                    insertHtml('.cro-Banner-left-parent h1', SubHeading, "afterend");
                }
            });

            waitForElement('html body.cro-t-7 .cro-Banner-left-parent>p:not(.lead)', function () {
                var bannerText = document.querySelector("html body.cro-t-7 .cro-Banner-left-parent>p:not(.lead)");

                if (bannerText) {
                    bannerText.innerHTML =
                        'Do you have a poor credit score? Are you struggling to get approved for loans or credit cards? ' +
                        'A poor credit score can make life tough, but it doesn’t have to hold you back any longer. At ' +
                        'Debt.co.za, ' +
                        'we specialise in helping people with a less-than-perfect credit profile to get the financial support they deserve.';
                }
            });

            if (window.innerWidth < 768) {
                waitForElement('.cro-153-mobileAtf', function () {
                    if (!document.querySelector('.cro_mobile_bullets')) {
                        insertHtml('.cro-153-mobileAtf', mobileText, "beforebegin");
                    }
                });

            }

        }


        /* Initialise variation */
        waitForElement('body', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();