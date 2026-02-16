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

        /* Variation Html */
        var newcards = `<div class="cro-client-say">
        <div class="cro-wapper-part container">
            <div class="cro-cards">
                <div class="cro-card-one croCliCard">
                    <div class="cro-img-content">
                        <div class="card-image">
                            <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/ashley.jpg" alt=""
                                class="card-img">
                        </div>
                    </div>
                    <div class="card-content">
                        <p class="card-text-first">
                            "The phone calls (from my creditors) just stopped because the DebtBusters consultant
                            contacted the creditors. And some did try, but then I just told them, don't talk to me, talk
                            to my debt consultant at DebtBusters."

                        </p>
                        <p class="client-name">Ashley</p>
                        <p class="sub-text">DebtBusters client</p>
                    </div>

                </div>
                <div class="cro-card-two croCliCard">
                    <div class="cro-img-content">
                        <div class="card-image">
                            <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/josh.jpg" alt=""
                                class="card-img">
                        </div>
                    </div>
                    <div class="card-content">
                        <p class="card-text-first">
						"The beautiful thing about this solution is you learn how to manage your cash better. You are able to start on a clear slate."

                        </p>
                        <p class="client-name">Josh</p>
                        <p class="sub-text">DebtBusters client</p>
                    </div>

                </div>
                <div class="cro-card-three croCliCard">
                    <div class="cro-img-content">
                        <div class="card-image">
                            <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/mawande.jpg" alt=""
                                class="card-img">
                        </div>
                    </div>
                    <div class="card-content">
                        <p class="card-text-first">
						"I knew by that time and at the end of that period I'll be debt-free. That's when I gained trust in DebtBusters. They are present and here for their clients."
                        </p>
                        <p class="client-name">Mawande</p>
                        <p class="sub-text">DebtBusters client</p>
                    </div>

                </div>
                <div class="cro-card-four croCliCard">
                    <div class="cro-img-content">
                        <div class="card-image">
                            <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/chantel.jpg" alt=""
                                class="card-img">
                        </div>
                    </div>
                    <div class="card-content">
                        <p class="card-text-first">
						"It was really a pleasant experience. No hassles. No more phone calls (from creditors). No more worries"

                        </p>
                        <p class="client-name">Chantal</p>
                        <p class="sub-text">DebtBusters client</p>
                    </div>

                </div>

            </div>
        </div>


    </div>`

        var croFooter = `<div class="bottom-part">
        <div class="logo-section container">
            <img class="logo-img"
                src="https://start.debtbusters.co.za/hs-fs/hubfs/debtbusters-logo.png"
                alt="">
            <p class="last-text">
                DebtBusters is a subsidiary of Intelligent Debt Management (Pty) Ltd and the holding company is IDM
                Holdings (Pty) Ltd.
            </p>
        </div>
    </div>`;

        var croFormText = `<div class="cro-form-leftText">
        <div class="cro-form-leftText-wrapper">
            <div class="cro-form-leftTextTitle leftText-title">
                <h2 class="cro-form-leftText-title">Clear your debt with DebtBusters</h2>
            </div>
            <div class="cro-form-leftTextSubTitle leftText-subTitle">
                <p class="cro-form-leftText-subTitle">Ready to get your debt under control? Let's help you create a personalised financial plan and budget that can free up your cash and help you save on repayments.</p>
            </div>
            <div class="cro-form-leftTextPoints leftText-points">
                <div class="cro-form-leftText-point point-one">
                    <div class="leftText-point-img">
                        <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/check-circle%20(1).png" alt="" class="leftText-point-imgImg">
                    </div>
                    <div class="leftText-point-text">
                        <h3 class="leftText-point-textPara">One monthly payment</h3>
                    </div>
                </div>
                <div class="cro-form-leftText-point point-two">
                    <div class="leftText-point-img">
                        <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/check-circle%20(1).png" alt="" class="leftText-point-imgImg">
                    </div>
                    <div class="leftText-point-text">
                        <h3 class="leftText-point-textPara">Lower interest rates</h3>
                    </div>
                </div>
                <div class="cro-form-leftText-point point-three">
                    <div class="leftText-point-img">
                        <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/check-circle%20(1).png" alt="" class="leftText-point-imgImg">
                    </div>
                    <div class="leftText-point-text">
                        <h3 class="leftText-point-textPara">Unlock extra cash</h3>
                    </div>
                </div>
                <div class="cro-form-leftText-point  point-four">
                    <div class="leftText-point-img">
                        <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/check-circle%20(1).png" alt="" class="leftText-point-imgImg">
                    </div>
                    <div class="leftText-point-text">
                        <h3 class="leftText-point-textPara">Protect your assets from repossession</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

        var croStopDebt = `<div class="cro-stopDebt">
        <div class="cro-stopDebt-wrapper container">
            <div class="cro-stopDebt-content stopDebt-content-img">
                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/person-happy.png" alt="" class="stopDebt-content-img">
            </div>
            <div class="cro-stopDebt-content stopDebt-content-text">
                <div class="stopDebt-content-textTitle">
                    <h2 class="stopDebt-content-text-title">Reduce your debt and keep your assets</h2>
                </div>
                <div class="stopDebt-content-texPara">
                    <p class="stopDebt-content-text-para">Our team of experts is on hand to help you get your debt under control with a realistic budget and repayment plan that stops your debt from growing and keeps your home and car safe from repossession.
                    </p>
                </div>
            </div>
        </div>
    </div>`

        var croClientheader = `<div class="cro-client-say-header">
        <div class="cro-client-say-header-wapper container">
            <p class="client-header-title">What our clients say</p>
        </div>
    </div>`



        /* Variation Init */
        function init() {

            addClass("body", "cro-Recipe-i1")
            addClass("body", "cro-67-68")

            waitForElement('.hs_cos_wrapper.hs_cos_wrapper_widget[data-hs-cos-type="module"]', function () {
                if (!document.querySelector('.cro-client-say')) {
                    insertHtml('.hs_cos_wrapper.hs_cos_wrapper_widget[data-hs-cos-type="module"]', newcards, "beforeend");
                }
            });


            waitForElement('.cro-stopDebt', function () {
                if (!document.querySelector('.cro-client-say-header')) {
                    insertHtml('.cro-stopDebt', croClientheader, "afterend");
                }
            });


            waitForElement('.cro-client-say', function () {
                if (!document.querySelector('.bottom-part')) {
                    insertHtml('.cro-client-say', croFooter, "afterend");
                }
            });

            waitForElement("#form-embed-placeholder .hbspt-form", function () {
                if (!document.querySelector(".cro-form-leftText")) {
                    insertHtml("#form-embed-placeholder .hbspt-form", croFormText, "beforebegin");
                }
            });

            waitForElement("html body.cro-Recipe-i1 .actions .hs-button", function () {
                var croInputElement = document.querySelector('html body.cro-Recipe-i1 .actions .hs-button');
                if (croInputElement) {
                    croInputElement.value = 'Continue';
                }
            });

            waitForElement(".cro-client-say", function () {
                if (!document.querySelector(".cro-stopDebt")) {
                    insertHtml(".cro-client-say", croStopDebt, "beforebegin");
                }
            });
        }

        /* Initialise variation */
        waitForElement('body', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();