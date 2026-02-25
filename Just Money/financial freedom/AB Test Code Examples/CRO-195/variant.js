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

		var topBannerPart = `<div class="Cro-top-banner-parts">
        <div class="cro-new-section">
            <div class="cro-new-sec-first">
                <div class="cro-top-header-part">
                    <h1 class="cro-header-text">Congratulations!</h1>
                    <p class="cro-header-sub-text-first">This is your first step towards financial freedom.</p>
                    <p class="cro-header-sub-text">Clear your credit record and become debt-free</p>
                </div>
                <div class="cro-top-header-sec-part">
                    <h5 class="cro-header-sub-text-section">
                        In seconds you can:
                    </h5>
                    <div class="cro-first-icon-text">
                        <div class="cro-first-icon">
                            <img class="cro-cash-icon"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/white-icon-money.png" alt="">
                            <p class="cro-icon-text">Unlock cash</p>
                        </div>
                        <div class="cro-secend-icon">
                            <img class="cro-intant-icon"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/white-icon-link.png"
                                alt="">
                            <p class="cro-icon-text">Get instant debt relief</p>
                        </div>
                        <div class="cro-third-icon">
                            <img class="cro-pay-icon"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/white-icon-wiegh.png" alt="">
                            <p class="cro-icon-text">Pay ONE, affordable instalment</p>
                        </div>
                        <div class="cro-fourth-icon">
                            <img class="cro-Secure-icon"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/white-icon-pay.png" alt="">
                            <p class="cro-icon-text">Secure legal protection</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>`
// 

		var bannerLastPart = `<div class="cro-secend-banner">
        <div class="cro-bnr-sec">
            <div class="cro-brn-first-parent container">
                <div class="cro-brn-first">
                    <div class="cro-bnr-header-sec">
                        <h1 class="cro-sec-header-text">Why debt counselling might be for you</h1>
                        <p class="cro-header-sec-sub-text cro-bullet-subText">If you answer yes to any of these questions, debt counselling may be an option for you. Take control of your finances NOW!</p>
                    </div>
                    <div class="cro-icon-section cro-point-one">
                        <img class="cro-icon-right"
                            src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Check.png" alt="">
                        <p class="cro-header-sec-sub-text">Are you struggling to keep up with repayments?</p>
                    </div>
                    <div class="cro-icon-section cro-point-two">
                        <img class="cro-icon-right"
                            src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Check.png" alt="">
                        <p class="cro-header-sec-sub-text">Have you considered applying for a consolidation loan?</p>
                    </div>
                    <div class="cro-icon-section cro-point-three">
                        <img class="cro-icon-right"
                            src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Check.png" alt="">
                        <p class="cro-header-sec-sub-text">Have you ever relied on a payday loan to make it through the month?</p>
                    </div>
                    <div class="cro-icon-section cro-point-four">
                        <img class="cro-icon-right"
                            src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Check.png" alt="">
                        <p class="cro-header-sec-sub-text">Do you have an income that does not sustain your lifestyle?</p>

                    </div>
                    <div class="cro-icon-section cro-point-five">
                        <img class="cro-icon-right"
                            src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Check.png" alt="">
                        <p class="cro-header-sec-sub-text">Do you worry about money?</p>
                    </div>
                    <div class="cro-icon-section cro-point-six">
                        <img class="cro-icon-right"
                            src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Check.png" alt="">
                        <p class="cro-header-sec-sub-text">Are you using most of your income to service your debt?</p>
                    </div>
                </div>
                <div class="cro-brn-first-img-part">
                    <div class="cro-brn-first-img-part-wrapper">
                        <img class="cro-brn-first-img cro-large-img" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/DEBT-3.18.41-jm-background%201-desktop.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>`

		var fronparttext = `<div class="new-form-field notice">By continuing you accept our
        <a href="https://www.justmoney.co.za/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy
            Policy</a> and
        <a href="https://www.justmoney.co.za/terms-conditions/" target="_blank" rel="noopener noreferrer">Terms &amp;
            Conditions</a>
    </div>`

		/* Variation Init */
		function init() {
			addClass("body", "cro-Recipe-3-18-41");


			waitForElement('section#call-to-action-and-form .grid>div:nth-child(2)', function () {
				if (!document.querySelector('cre-new-card-part')) {
					insertHtml('section#call-to-action-and-form .grid>div:nth-child(2)', topBannerPart, "afterend");
				}
			});
			waitForElement('section#second-call-to-action', function () {
				if (!document.querySelector('cro-secend-banner relative')) {
					insertHtml('section#second-call-to-action', bannerLastPart, "beforebegin");
				}
			});
			waitForElement('section#call-to-action-and-form .grid>div:nth-child(4) .btn.primary.lg', function () {
				if (!document.querySelector('new-form-field notice')) {
					insertHtml('section#call-to-action-and-form .grid>div:nth-child(4) .btn.primary.lg', fronparttext, "afterend");
				}
			});

            waitForElement('form #first_name', function () {
				var croFname = document.querySelector("form #first_name").closest(".form-field")
                croFname &&  croFname.classList.add("croFirstName")
                
			});

            waitForElement('form #last_name', function () {
				var croLasttName = document.querySelector("form #last_name").closest(".form-field")
                croLasttName &&  croLasttName.classList.add("croLasttName")
                
			});

            waitForElement('form #email', function () {
				var croEmail = document.querySelector("form #email").closest(".form-field")
                croEmail &&  croEmail.classList.add("croEmail")
                
			});

            waitForElement('form #id_number', function () {
				var croid_number = document.querySelector("form #id_number").closest(".form-field")
                croid_number &&  croid_number.classList.add("croid_number")
                
			});

            waitForElement('form #phone', function () {
				var crophone = document.querySelector("form #phone").closest(".form-field")
                crophone &&  crophone.classList.add("crophone")
                
			});

            waitForElement('form #email', function () {
				var croEmail = document.querySelector("form #email").closest(".form-field")
                croEmail &&  croEmail.classList.add("croEmail")
                
			});

            

		}



		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();