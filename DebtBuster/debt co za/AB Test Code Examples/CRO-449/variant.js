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

		var topBanner = `<div class="croRB-t-2-top-banner">
        <div class="croRB-t-2-top-banner-wrapper">
            <div class="croRB-t-2-top-banner-inner">
                <div class="croRB-t-2-top-banner-heading-top">
                    <div class="croRB-t-2-top-banner-heading-text">
                        Find the best solution for you:
                    </div>
                    <div class="croRB-t-2-top-banner-subheading-text">
                        Enter your details below, and our system will calculate the best solution for your debt needs.
                    </div>
                </div>
                <div class="croRB-t-2-top-banner-bottom-bullet">
                    <div class="croRB-t-2-top-banner-bullet">
                        <div class="croRB-t-2-top-bullet bullet-1">
                            <div class="croRB-t-2-top-bullet-icon">1</div>
                            <div class="croRB-t-2-top-bullet-icon-text">
                                Answer a few questions about your debt.
                            </div>
                        </div>
                        <div class="croRB-t-2-top-bullet bullet-2">
                            <div class="croRB-t-2-top-bullet-icon">2</div>
                            <div class="croRB-t-2-top-bullet-icon-text">
                                Use our free calculator to find a solution tailored to your situation.
                            </div>
                        </div>
                        <div class="croRB-t-2-top-bullet bullet-3">
                            <div class="croRB-t-2-top-bullet-icon">3</div>
                            <div class="croRB-t-2-top-bullet-icon-text">
                                We’ll pick the best solution for you.
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="croRB-t-2-top-banner-left-img">
                <img class="cro-calculator" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Rollback+Test+%7C+Recipe+2/db-rollback-t-2-1.png" alt="">
            </div>
        </div>
    </div>`
		var newFromFooter = `<div class="croRB-t-2-premium-partners">
        <div class="croRB-t-2-premium-partners-wrapper container">
            <div class="croRB-t-2-premium-partners-inner">
                <div class="croRB-t-2-number-of-premium-partners-text text-1">
                    Debt.co.za has a number of premium partners who each apply their own credit criteria to assess loan
                    applications.
                    The interest rates charged on their loans range between 20.25% and 24.50%, with payment terms
                    between 24 and 72
                    months.
                </div>
                <div class="croRB-t-2-number-of-premium-partners-text text-2">
                    An illustrative example (excluding credit life insurance) of a R50 000 loan over 72 months. Once-off
                    Initiation fee:
                    R1 207.50 with a Monthly admin fee R69. Representative Annual Percentage Rate (APR) 24.50%. Total
                    amount payable:
                    R103 155.57.
                </div>
            </div>

            <div class="croRB-t-2-partners-logos">
                <div class="croRB-t-2-partners-logo-wrapper">
                    <div class="croRB-t-2-partners-logo-inner">
                        <div class="croRB-t-2-partners-logo-text">
                            <div class="croRB-t-2-partners-text">
                                Our partners:
                            </div>
                        </div>
                        <div class="croRB-t-2-partners-logo">
                            <div class="croRB-t-2-partners-logo-main logo-1">
                                <a href="https://www.debt.co.za/our-partners/debtbusters/">
                                <img class="croRB-t-2-partner-img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Rollback+Test+%7C+Recipe+2/db-rollback-t-2-2.png"
                                    alt="debt-busters"></a>
                            </div>
                            <div class="croRB-t-2-partners-logo-main logo-2">
                                <a href="https://www.debt.co.za/our-partners/justmoney/">
                                <img class="croRB-t-2-partner-img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Rollback+Test+%7C+Recipe+2/db-rollback-t-2-3.png"
                                    alt="jm-img"></a>
                            </div>
                            <div class="croRB-t-2-partners-logo-main logo-3">
                                <a href="https://www.debt.co.za/our-partners/idm/">
                                <img class="croRB-t-2-partner-img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Rollback+Test+%7C+Recipe+2/db-rollback-t-2-4.png"
                                    alt="idm-img"></a>
                            </div>
                            <div class="croRB-t-2-partners-logo-main logo-4">
                                <a href="https://www.debt.co.za/our-partners/sanlam/">
                                <img class="croRB-t-2-partner-img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Rollback+Test+%7C+Recipe+2/db-rollback-t-2-5.png"
                                    alt="sanlam-img"></a>
                            </div>
                            <div class="croRB-t-2-partners-logo-main logo-5">
                                <a href="https://www.debt.co.za/our-partners/fincheck/">
                                <img class="croRB-t-2-partner-img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Rollback+Test+%7C+Recipe+2/db-rollback-t-2-6.png"
                                    alt="fin-check"></a>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div class="croRB-t-2-footer-container">
                <div class="croRB-t-2-footer-wrapper">
                    <div class="croRB-t-2-footer-inner">
                        <div class="croRB-t-2-footer-Copyright-text">
                            Copyright &copy; 2025 Debt.co.za - For every debt solution. All rights reserved.
                        </div>
                        <div class="croRB-t-2-footer-debt-solutions-text">
							<a href="https://www.debt.co.za"> Home</a> |<a href="https://www.debt.co.za/our-partners/debtbusters/"> Our
        partners</a> | <a href="https://www.debt.co.za/our-debt-solutions/debt-counselling/">Our debt solutions</a> | <a
        href="https://www.debt.co.za/how-we-work/">How we work</a> | <a
        href="https://www.debt.co.za/free-calculator/">Free calculator</a> |
        <a href="https://www.debt.co.za/contact-us/">Contact us</a> | <a href="https://www.debt.co.za/privacy/">Privacy</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`


		function waitForAndAddClass(selector, closestSelector, className) {
			waitForElement(selector, function () {
				var parent = document.querySelector(selector);
				if (parent) {
					parent = parent.closest(closestSelector);
					if (parent) {
						parent.classList.add(className);
					}
				}
			});
		}

		function applyModifications() {
			var elementsToModify = [
				{ selector: ".main-form #first_name", closest: ".grid", className: "cro-from-name-parent" },
				{ selector: ".main-form #phone_mobile", closest: ".grid", className: "cro-from-number-parent" },
				{ selector: ".main-form #id_number", closest: ".grid", className: "cro-from-id-number-parent" },
				{ selector: ".main-form #Callback", closest: ".grid", className: "cro-from-button-parent" },
				// { selector: 'section>.container [alt="Fincheck"]', closest: 'a', className: 'cro-Fincheck-logo' },
				// { selector: 'section>.container [alt="Sanlam"]', closest: 'a', className: 'cro-Sanlam-logo' },
				{ selector: 'section>.container [alt="DebtBusters"]', closest: 'a', className: 'cro-DebtBusters-logo' },
				// { selector: 'section>.container [alt="JustMoney"]', closest: 'a', className: 'cro-JustMoney-logo' },
				// { selector: 'section>.container [alt="Intelligent Debt Management (IDM)"]', closest: 'a', className: 'cro-IDM-logo' },
				{ selector: '.cro-DebtBusters-logo', closest: '.grid', className: 'cro-icon-parent' },
				{ selector: '.cro-icon-parent', closest: 'section', className: 'cro-icon-section-parent' }
			];

			elementsToModify.forEach(function (item) {
				waitForAndAddClass(item.selector, item.closest, item.className);
			});
		}


		/* Variation Init */
		function init() {
			addClass("body", "cro-t-rollback")

			applyModifications()

			waitForElement('.pt-10.pb-0 h1 strong', function () {
				document.querySelectorAll('.pt-10.pb-0 h1 strong').forEach(function (e) {
					var parent = e.closest('div');
					if (parent && e.innerHTML.indexOf('Free Loan Calculator') !== -1) {
						parent.classList.add('cro-free-loan-parent');
					}
				});
			});


			waitForElement('section.pt-10 .decorated', function () {
				if (!document.querySelector('.croRB-t-2-top-banner')) {
					insertHtml('section.pt-10 .decorated', topBanner, "afterend");
				}
			});

			waitForElement('section.pt-10', function () {
				if (!document.querySelector('.croRB-t-2-premium-partners')) {
					insertHtml('section.pt-10', newFromFooter, "afterend");
				}
			});


			waitForElement('section.pt-10 .container ', function () {
				var container = document.querySelector('.pt-10 .container');

				var newParentDiv = document.createElement('div');
				newParentDiv.className = 'croRB-t-2-custom-parent-wrapper';
				while (container.firstChild) {
					newParentDiv.appendChild(container.firstChild);
				}
				container.appendChild(newParentDiv);
			});

			waitForElement(".cro-from-button-parent #Online", function () {
				var croInputElement = document.querySelector('.cro-from-button-parent #Online');
				if (croInputElement) {
					croInputElement.value = 'APPLY NOW';
				}
			});
			waitForElement('.main-form> p', function () {
				document.querySelectorAll('.main-form> p').forEach(function (e) {
					var parent = e.closest('p');
					if (parent && e.innerHTML.indexOf('By continuing you accept our') !== -1) {
						parent.classList.add('croRB-t-2-From-tnc');
					}
				});
			});

		}


		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();