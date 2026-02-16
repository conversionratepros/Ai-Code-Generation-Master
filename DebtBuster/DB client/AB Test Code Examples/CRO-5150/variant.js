(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "croKI152";
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

        var newLogo = `<div class="cro152-credibility-logos">
        <div class="cro152-credibility-logos-wrapper">
            <div class="cro152-credibility-logos-inner">
                <div class="cro152-credibility-logos-left">
                    <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Debt-co-za/Recipe+KI52.KI53.KI55+%7C+More+prominent+credibility+logos+%7C+ALL+%7C+CRO-5150/cro_db_KI52_3.png" alt="National debt counsellors association">
                </div>
                <div class="cro152-credibility-logos-right">
                    <div class="cro152-credibility-logos-right-wrapper">
                        <div class="cro152-credibility-logos-right-ncr">
                            <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Debt-co-za/Recipe+KI52.KI53.KI55+%7C+More+prominent+credibility+logos+%7C+ALL+%7C+CRO-5150/cro_db_KI52_4.png"
                                alt="National Credit Regulator">
                        </div>
                        <div class="cro152-credibility-logos-right-text">
                            <div class="cro152-credibility-right-DEBT-text">
                                REGISTERED DEBT COUNSELLOR
                            </div>
                            <div class="cro152-credibility-right-DEBT-num-text">
                                <span>NCRDC1801</span>
                                <span>NCRDC2374</span>
                                <span>NCRDC2499</span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>`;

        var newLogoMobile = `<div class="cro152-credibility-logos mobile" style='display:none'>
        <div class="cro152-credibility-logos-wrapper">
            <div class="cro152-credibility-logos-inner">
                <div class="cro152-credibility-logos-left">
                    <!-- <img src="https://i.ibb.co/kgBnLNBK/default-1.png" alt="National debt counsellors association"> -->
                    <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Debt-co-za/Recipe+KI52.KI53.KI55+%7C+More+prominent+credibility+logos+%7C+ALL+%7C+CRO-5150/cro_db_KI52_3.png"
                        alt="National debt counsellors association">
                </div>
                <div class="cro152-credibility-logos-right">
                    <div class="cro152-credibility-logos-right-wrapper">
                        <div class="cro152-credibility-logos-right-ncr">
                            <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Debt-co-za/Recipe+KI52.KI53.KI55+%7C+More+prominent+credibility+logos+%7C+ALL+%7C+CRO-5150/cro_db_KI52_4.png"
                                alt="National Credit Regulator">
                        </div>
                        <div class="cro152-credibility-logos-right-text">
                            <div class="cro152-credibility-right-DEBT-text">
                                REGISTERED DEBT COUNSELLOR
                            </div>
                            <div class="cro152-credibility-right-DEBT-num-text">
                                <span>NCRDC1801</span>
                                <span>NCRDC2374</span>
                                <span>NCRDC2499</span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>`;

        /* Variation Init */
        function init() {
            addClass("body", variation_name);

            waitForElement('.register-hld #bgcontrol .frmhold #genregister :not(span).login-button', function () {
                if (!document.querySelector('.cro152-credibility-logos')) {
                    insertHtml('.register-hld #bgcontrol .frmhold #genregister :not(span).login-button', newLogo, "afterend");
                }
            });
            waitForElement('section.register-hld', function () {
                if (!document.querySelector('.cro152-credibility-logos.mobile')) {
                    insertHtml('section.register-hld', newLogoMobile, "afterend");
                }
            });

        }

        /* Initialise variation */
        waitForElement('.registerholder', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();