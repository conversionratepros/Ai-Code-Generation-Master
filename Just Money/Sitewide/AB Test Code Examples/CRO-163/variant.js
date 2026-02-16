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

        function checkPageAndPerformAction() {
            var url = window.location.pathname;
            if (url === '/themes/personal-loans/') {
                waitForElement('.silo-page section#overview', function () {
                    if (!document.querySelector('.cro-t-overview-section')) {
                        insertHtml('.silo-page section#overview', newPart, "afterend");
                    }
                    if (!document.querySelector('.cro-t-overview-section-mob')) {
                        insertHtml('.silo-page section#overview', newPartMob, "afterend");
                    }
                });
                addClass('body', 'cro-t-not-fire');
                console.log('Personal Loans Page');
            } else {
                console.log('Class add');
                // Add the class to the body element
            }
        }

        var newPart = `<div class="cro-t-overview-section">
        <div class="cro-t-overview-section-wrapper">
            <div class="cro-t-overview-section-wrapper-inner">
                <div class="cro-t-overview-left-part">
                    <h2>Overview</h2>
                    <div class="body-text w-full lead columns-1">
                        <p>Whether you are facing a car repair crisis, unexpected medical bills, or a student loan
                            limit, a personal loan can give you a quick cash injection at a customised interest rate.
                            Based on an affordability assessment and your credit score, we offer instant feedback when
                            you apply for a loan of up to R300,000.</p>
                        <p>Log in to JustMoney now, visit the Products tab, navigate to GET money, and click the View
                            Offer button to see your FREE personal loan quote.</p>
                    </div>
                    <a href="https://justmoneycreditsav.co.za/register?websource=justmoneycoza&amp;utm_source=website&amp;utm_medium=website&amp;utm_campaign=website_registration&amp;utm_content=realise_my_dreams&amp;utm_id=welcome"
                        class="btn primary lg" target="_blank" rel="noopener noreferrer">Log in to see if I qualify</a>
                </div>
                <div class="cro-t-overview-right-part">
                    <div class="cro-t-overview-right-img">
                        <img src="/uploads/16b94be0-70e7-41a7-96d7-47330f0d0583.jpg" alt="" class='cro-t-banner-img'>
                    </div>
                </div>
            </div>
        </div>
                    </div>`

        var newPartMob = `
        <div class="cro-t-overview-section-mob">
        <div class="cro-t-overview-section-wrapper-mob">
            <div class="cro-t-overview-section-wrapper-inner-mob">
                <div class="cro-t-overview-left-part-mob">
                    <h2>Overview</h2>
                    <div class="body-text w-full lead columns-1">
                        <p class='cro-banner-text-1'>Whether you are facing a car repair crisis, unexpected medical
                            bills, or a student loan
                            limit, a personal loan can give you a quick cash injection at a customised interest rate.
                            Based on an affordability assessment and your credit score, we offer instant feedback when
                            you apply for a loan of up to R300,000.</p>
                        <p class='cro-banner-text-2'>Log in to JustMoney now, visit the Products tab, navigate to GET
                            money, and click the View
                            Offer button to see your FREE personal loan quote.</p>

                    </div>
                </div>
                <div class="cro-t-overview-right-part-mob">
                    <div class="cro-t-overview-right-img-mob">
                        <img src="/uploads/16b94be0-70e7-41a7-96d7-47330f0d0583.jpg"
                            alt="" class="cro-t-banner-img-mob">
                    </div>
                </div>
                <div class="cro-t-overview-footer-text-mob">
                    <p>You can also apply for online shopping credit with Mobicred, Truworths and Identity store
                        accounts, and a Nedbank credit card.</p>
                </div>

            </div>
        </div>
            </div>`

        /* Variation Init */
        function init() {
            addClass("body", "cro-t-63_64");


            checkPageAndPerformAction();
        }

        /* Initialise variation */
        waitForElement('body', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();