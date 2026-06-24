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

		function live(selector, event, callback, context) {
			// helper for enabling IE 8 event bindings
			function addEvent(el, type, handler) {
				if (el.attachEvent) el.attachEvent("on" + type, handler);
				else el.addEventListener(type, handler);
			}
			// matches polyfill
			this &&
				this.Element &&
				(function (ElementPrototype) {
					ElementPrototype.matches =
						ElementPrototype.matches ||
						ElementPrototype.matchesSelector ||
						ElementPrototype.webkitMatchesSelector ||
						ElementPrototype.msMatchesSelector ||
						function (selector) {
							var node = this,
								nodes = (node.parentNode || node.document).querySelectorAll(selector),
								i = -1;
							while (nodes[++i] && nodes[i] != node);
							return !!nodes[i];
						};
				})(Element.prototype);
			// live binding helper using matchesSelector
			function live(selector, event, callback, context) {
				addEvent(context || document, event, function (e) {
					var found,
						el = e.target || e.srcElement;
					while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
					if (found) callback.call(el, e);
				});
			}
			live(selector, event, callback, context);
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

		function removeClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.contains(cls) && el.classList.remove(cls);
			}
		}


		/* Variation html */
		var croNewTemp = `<div class="cro-t-47-footer">
        <div class="cro-t-47-footer-wrapper">
            <div class="cro-t-47-footer-inner">
                <div class="cro-t-47-footer-innerTop">
                    <div class="relative container cro-t-47-footer-innerTop-wrapper">
                        <div class="cro-t-47-content cro-t-47-footer-contact cro-t-47-footerContent">
                            <div class="cro-t-47-footer-topContent">
                                <p>Contact us</p>
                            </div>
                            <div class="cro-t-47-footer-bottomContent">
                                <p>5th Floor, Adderly Street, Cape Town, 8001</p>
                            </div>
                        </div>
                        <div class="cro-t-47-content cro-t-47-footer-hour cro-t-47-footerContent">
                            <div class="cro-t-47-footer-topContent">
                                <p>Operating hours</p>
                            </div>
                            <div class="cro-t-47-footer-bottomContent">
                                <p class="cro-t-47-footer-bottomContent-one">Monday - Thursday: 07:00 to 21:00</p>
                                <p class="cro-t-47-footer-bottomContent-two">Friday: 07:00 to 18:00</p>
                                <p class="cro-t-47-footer-bottomContent-three">Saturday: 09:00 to 12:30</p>
                            </div>
                        </div>
                        <div class="cro-t-47-content cro-t-47-footer-description">
                            <p>Justmoney.co.za has partnered with DebtBusters to help overindebted consumers lift their burden. A debt counsellor will help you consolidate all your debts into a single and affordable monthly instalment. An illustrative example (excluding credit life insurance) of a R50 000 loan over 72 months. Once-off Initiation fee: R1 207.50 with a Monthly admin fee of R69. Representative Annual Percentage Rate (APR) 24.50%. Total amount payable: R103 155.57.</p>
                        </div>
                    </div>
                </div>
                <div class="cro-t-47-footer-innerBottom">
                    <div class="relative container cro-t-47-footer-innerBottom-wrapper">
                        <p>Copyright © JustMoney | <a href="https://www.justmoney.co.za/terms-conditions/">Terms & Conditions</a> | <a href="https://www.justmoney.co.za/privacy-policy/">Privacy Policy</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

		var croIDCheck = `<div class="cro-id-btnNew">
		  <div class="cro-id-btn-wrapperNew">
			  <div class="cro-Id-check-btnNew" type="cro-check now">Check now</div>
		  </div>
	  </div>`;

		var croLoader = `<div class="cro-jm-39-loader">
		  <div class="cro-jm-39-loader-wrapper">
			  <div class="cro-jm-39-loader-inner">
				  <div class="cro-jm-39-loader-gif">
					  <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Justmoney_recipe-39_2_loader.gif" alt="">
				  </div>
				  <div class="cro-jm-39-loader-content">
					  <h3 class="cro-jm-39-loader-text">Checking to see if you qualify...</h3>
				  </div>
			  </div>
		  </div>
	  </div>`;

		var croNewHeader = `<div class="cro-jm-39-newHeader">
		  <div class="cro-jm-39-newHeader">
			  <div class="cro-jm-39-newHeader-inner">
				  <div class="cro-jm-39-newHeader-left">
					  <div class="cro-jm-39-newHeader-img">
						  <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Justmoney_recipe-39_2_loader_circle-check.png" alt="Justmoney_recipe-39_2_loader_circle-check">
						  <!-- <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
							  <path d="M0 10.5C0 4.99219 4.45312 0.5 10 0.5C15.5078 0.5 20 4.99219 20 10.5C20 16.0469 15.5078 20.5 10 20.5C4.45312 20.5 0 16.0469 0 10.5ZM14.4922 8.78125C14.9219 8.35156 14.9219 7.6875 14.4922 7.25781C14.0625 6.82812 13.3984 6.82812 12.9688 7.25781L8.75 11.4766L6.99219 9.75781C6.5625 9.32812 5.89844 9.32812 5.46875 9.75781C5.03906 10.1875 5.03906 10.8516 5.46875 11.2812L7.96875 13.7812C8.39844 14.2109 9.0625 14.2109 9.49219 13.7812L14.4922 8.78125Z" fill="#4AAEAC"/>
						   </svg> -->
					  </div>
				  </div>
				  <div class="cro-jm-39-newHeader-right">
					  <h4 class="cro-jm-39-newHeader-content">You qualify for our services</h4>
				  </div>
			  </div>
		  </div>
	  </div>`;

		//   ------New-Update-Code--------
		var newPart = `<div class="cro-t-47-stopDebt">
        <div class="cro-t-47-stopDebt-wrapper container">
            <div class="cro-t-47-stopDebt-img-content">
                <div class="cro-t-47-stopDebt-content stopDebt-content-img">
                    <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/DB47_FF.png" alt="" class="stopDebt-content-img">
                </div>
            </div>
            <div class="cro-t-47-stopDebt-content stopDebt-content-text">
                <div class="cro-t-47-stopDebt-content-textTitle">
                    <div class="cro-t-47-stopDebt-right-content-text header-text">Take back control today!</div>
                </div>
                <div class="cro-t-47-stopDebt-content-texPara">
                    <div class="cro-t-47-stopDebt-right-content-text subheader-text">
                        Complete the FREE call-back form for a non-obligatory assessment and credit check.
                    </div>
                </div>
            </div>
        </div>
    </div>`

		var newPartMob = `<div class="cro-t-47-stopDebt-mob">
        <div class="cro-t-47-stopDebt-wrapper-mob">
            <div class="cro-t-47-stopDebt-content-mob stopDebt-content-img-mob">
                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/DB47_FF.png" alt="" class="stopDebt-content-img">
            </div>
            <div class="cro-t-47-stopDebt-text-content-mob">
                <div class="cro-t-47-stopDebt-mob-text container">
                    <div class="cro-t-47-stopDebt-content-textTitle-mob">
                        <div class="cro-t-47-stopDebt-right-mob header-text">Take back control today!</div>
                    </div>
                    <div class="cro-t-47-stopDebt-content-texPara-mob">
                        <div class="cro-t-47-stopDebt-right-mob subheader-text">
                            Complete the FREE call-back form for a non-obligatory assessment and credit check.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

		var bannerLeft = `<div class="cro-t-47-banner-left-part">
        <div class="cro-t-47-banner-subheading">
            <div class="cro-t-47-banner-subheading-text">
                Ready to get your debt under control? Let’s help you create a personalised financial plan and budget
                that can free up your cash and help you save on repayments.
            </div>
        </div>
        <div class="cro-t-47-banner-left-container">
            <div class="cro-t-47-banner-left-text-icon text-icon-1">
                <div class="cro-t-47-banner-left-text-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M17.7188 9.25C17.7188 14.0664 13.7812 17.9688 9 17.9688C4.18359 17.9688 0.28125 14.0664 0.28125 9.25C0.28125 4.46875 4.18359 0.53125 9 0.53125C13.7812 0.53125 17.7188 4.46875 17.7188 9.25ZM7.98047 13.8906L14.4492 7.42188C14.6602 7.21094 14.6602 6.82422 14.4492 6.61328L13.6406 5.83984C13.4297 5.59375 13.0781 5.59375 12.8672 5.83984L7.59375 11.1133L5.09766 8.65234C4.88672 8.40625 4.53516 8.40625 4.32422 8.65234L3.51562 9.42578C3.30469 9.63672 3.30469 10.0234 3.51562 10.2344L7.17188 13.8906C7.38281 14.1016 7.76953 14.1016 7.98047 13.8906Z"
                            fill="#E59A2C" />
                    </svg>
                </div>
                <div class="cro-t-47-banner-left-text">
                    Unlock cash
                </div>
            </div>
            <div class="cro-t-47-banner-left-text-icon text-icon-2">
                <div class="cro-t-47-banner-left-text-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M17.7188 9.25C17.7188 14.0664 13.7812 17.9688 9 17.9688C4.18359 17.9688 0.28125 14.0664 0.28125 9.25C0.28125 4.46875 4.18359 0.53125 9 0.53125C13.7812 0.53125 17.7188 4.46875 17.7188 9.25ZM7.98047 13.8906L14.4492 7.42188C14.6602 7.21094 14.6602 6.82422 14.4492 6.61328L13.6406 5.83984C13.4297 5.59375 13.0781 5.59375 12.8672 5.83984L7.59375 11.1133L5.09766 8.65234C4.88672 8.40625 4.53516 8.40625 4.32422 8.65234L3.51562 9.42578C3.30469 9.63672 3.30469 10.0234 3.51562 10.2344L7.17188 13.8906C7.38281 14.1016 7.76953 14.1016 7.98047 13.8906Z"
                            fill="#E59A2C" />
                    </svg>
                </div>
                <div class="cro-t-47-banner-left-text">
                    Get instant debt relief
                </div>
            </div>
            <div class="cro-t-47-banner-left-text-icon text-icon-3">
                <div class="cro-t-47-banner-left-text-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M17.7188 9.25C17.7188 14.0664 13.7812 17.9688 9 17.9688C4.18359 17.9688 0.28125 14.0664 0.28125 9.25C0.28125 4.46875 4.18359 0.53125 9 0.53125C13.7812 0.53125 17.7188 4.46875 17.7188 9.25ZM7.98047 13.8906L14.4492 7.42188C14.6602 7.21094 14.6602 6.82422 14.4492 6.61328L13.6406 5.83984C13.4297 5.59375 13.0781 5.59375 12.8672 5.83984L7.59375 11.1133L5.09766 8.65234C4.88672 8.40625 4.53516 8.40625 4.32422 8.65234L3.51562 9.42578C3.30469 9.63672 3.30469 10.0234 3.51562 10.2344L7.17188 13.8906C7.38281 14.1016 7.76953 14.1016 7.98047 13.8906Z"
                            fill="#E59A2C" />
                    </svg>
                </div>
                <div class="cro-t-47-banner-left-text">
                    Pay ONE, affordable installment
                </div>
            </div>
            <div class="cro-t-47-banner-left-text-icon text-icon-4">
                <div class="cro-t-47-banner-left-text-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M17.7188 9.25C17.7188 14.0664 13.7812 17.9688 9 17.9688C4.18359 17.9688 0.28125 14.0664 0.28125 9.25C0.28125 4.46875 4.18359 0.53125 9 0.53125C13.7812 0.53125 17.7188 4.46875 17.7188 9.25ZM7.98047 13.8906L14.4492 7.42188C14.6602 7.21094 14.6602 6.82422 14.4492 6.61328L13.6406 5.83984C13.4297 5.59375 13.0781 5.59375 12.8672 5.83984L7.59375 11.1133L5.09766 8.65234C4.88672 8.40625 4.53516 8.40625 4.32422 8.65234L3.51562 9.42578C3.30469 9.63672 3.30469 10.0234 3.51562 10.2344L7.17188 13.8906C7.38281 14.1016 7.76953 14.1016 7.98047 13.8906Z"
                            fill="#E59A2C" />
                    </svg>
                </div>
                <div class="cro-t-47-banner-left-text">
                    Secure legal protection
                </div>
            </div>
        </div>
    </div>`

		var fromerrormesfirst = `<div class="cro-t-47-from-wrapper first">
        <div class="cro-t-47-from-error-mes">
            <span>Please enter a first name</span>
        </div>
    </div>`

		var fromerrormeslast = `<div class="cro-t-47-from-wrapper last">
        <div class="cro-t-47-from-error-mes">
            <span>Please enter a last name</span>
        </div>
    </div>`

		var fromerrormesmail = `<div class="cro-t-47-from-wrapper mail">
        <div class="cro-t-47-from-error-mes">
            <span> Please enter email address</span>
        </div>
    </div>`

		var fromerrormesphone = `<div class="cro-t-47-from-wrapper phone">
        <div class="cro-t-47-from-error-mes">
            <span>Please enter phone number</span>
        </div>
    </div>`

		var frombutton = `<div class="cro-t-47-from-wrapper-button">
		  <div class="cro-id-btn-wrapperNew">
			  <div class="cro-t-47-check-btn-main" type="cro-check now">Apply now</div>
		  </div>
	  </div>`

		// section#call - to - action - and - form #ufu52l h2
		function validPhn() {
			var field = document.querySelector('#phone');
			var parent = field.closest('.form-field')

			if (field.required && !field.value) {
				parent.classList.add('error');
			} else {
				parent.classList.remove('error');
			}

			if (field.type === 'tel' && field.value) {
				// To accomodate various phone international number formats, we only check that the field is numeric only (apart from +,-,space, and .)
				// and then check that the length is between 9 and 13 digits
				const phoneRegex = /^[\d+-.s]+$/;
				// Strip away all non-numeric characters
				const phoneNumberNumericOnly = field.value.replace(/[^0-9]/g, '');
				if (
					!phoneRegex.test(field.value) ||
					phoneNumberNumericOnly.length < 9 ||
					phoneNumberNumericOnly.length > 13
				) {

					parent.classList.add('error');
				} else {
					parent.classList.remove('error');
				}
			}


		}

		function validEmail() {
			console.log('email')
			var field = document.querySelector('#email');
			var parent = field.closest('.form-field')

			if (field.required && !field.value) {
				parent.classList.add('error');
			} else {
				parent.classList.remove('error');
			}

			if (field.type === 'email' && field.value) {
				const emailRegex = /.+@.+..+/;
				if (!emailRegex.test(field.value)) {
					parent.classList.add('error');
					console.log('error email')
				} else {
					parent.classList.remove('error');
					console.log('valid email')
				}
			}



		}

		function firstName() {
			var field = document.querySelector('#first_name');
			var parent = field.closest('.form-field')
			if (field.required && !field.value) {
				parent.classList.add('error');
			} else {
				parent.classList.remove('error');
			}
		}

		function lastName() {
			var field = document.querySelector('#last_name');
			var parent = field.closest('.form-field')
			if (field.required && !field.value) {
				parent.classList.add('error');
			} else {
				parent.classList.remove('error');
			}
		}

		/* Variation Init */
		function init() {
			//adding a class to body
			addClass("body", "cro-t-47-newTemplate")
			addClass("body", "cro-twoPartForm-t-1")
			addClass("body", "cro-t-47")


			waitForElement("#footer", function () {
				if (!document.querySelector(".cro-t-47-footer")) {
					insertHtml("#footer", croNewTemp, "afterbegin");
				}
			});

			waitForElement(".form-field", function () {
				document.querySelector("#id_number").closest(".form-field").classList.add("cro-step1")

				document.querySelectorAll('form[method="POST"] .form-field:not(.cro-step1)').forEach(function (e) {
					e.classList.add("cro-step2")
					addClass("body", "cro-formHeader")
				})
			});

			// -------New-Part-Add---
			waitForElement('section#icons', function () {
				if (!document.querySelector('.cro-t-47-stopDebt')) {
					insertHtml('section#icons', newPart, "beforebegin");
				}
				if (!document.querySelector('.cro-t-47-stopDebt-mob')) {
					insertHtml('section#icons', newPartMob, "beforebegin");
				}
			});

			waitForElement('section#call-to-action-and-form h2', function () {
				if (!document.querySelector('.cro-t-47-banner-left-part')) {
					insertHtml('section#call-to-action-and-form h2', bannerLeft, "afterend");
				}
			})

			waitForElement('section#call-to-action-and-form .p-thinner .form-field.mb-3.cro-step2', function () {
				if (!document.querySelector('.cro-t-47-from-wrapper.first')) {
					insertHtml('section#call-to-action-and-form .p-thinner .form-field.mb-3.cro-step2 #first_name', fromerrormesfirst, "afterend");
				}
				if (!document.querySelector(".cro-t-47-from-wrapper.last")) {
					insertHtml('section#call-to-action-and-form .p-thinner .form-field.mb-3.cro-step2 #last_name', fromerrormeslast, "afterend");
				}
				if (!document.querySelector(".cro-t-47-from-wrapper.mail")) {
					insertHtml('section#call-to-action-and-form .p-thinner .form-field.mb-3.cro-step2 #email', fromerrormesmail, "afterend");
				}
				if (!document.querySelector(".cro-t-47-from-wrapper.phone")) {
					insertHtml('section#call-to-action-and-form .p-thinner .form-field.mb-3.cro-step2 #phone', fromerrormesphone, "afterend");
				}
				if (!document.querySelector(".cro-t-47-from-wrapper-button")) {
					insertHtml('section#call-to-action-and-form .p-thinner .btn.primary.lg[type="submit"]', frombutton, "afterend");
				}
			});

			//adding our own button
			waitForElement(".cro-step1", function () {
				if (!document.querySelector(".cro-id-btnNew")) {
					insertHtml(".cro-step1", croIDCheck, "afterend");
				}
			});

			waitForElement("#id_number", function () {
				var croInputField = document.querySelector('#id_number');
				if (croInputField) {
					croInputField.setAttribute('placeholder', 'ID Number');
				}
			});

			waitForElement("#call-to-action-and-form h4", function () {
				if (!document.querySelector(".cro-jm-39-loader")) {
					insertHtml("#call-to-action-and-form h4", croLoader, "afterend");

				}
			});

			eventHandeler();



		}

		function croValuePass() {
			waitForElement("#id_number", function () {
				var croInputValue = document.querySelector('#id_number').value;
				if (isValidSouthAfricanId(croInputValue) == true) {
					// console.log("valid")
					addClass("body", "cro-formHeader2")
					var croWrong = document.querySelector('.cro-wrongId')
					if (croWrong) {
						removeClass("body", "cro-wrongId")
						setTimeout(function () {
							removeClass("body", "cro-formHeader2")
							removeClass("body", "cro-formHeader")
							addClass("body", "cro-formHeader3")
						}, 2000);
					}
					setTimeout(function () {
						removeClass("body", "cro-formHeader2")
						removeClass("body", "cro-formHeader")
						addClass("body", "cro-formHeader3")
					}, 2000);
					waitForElement("body.cro-twoPartForm-t-1.cro-formHeader3 #call-to-action-and-form h4", function () {
						if (!document.querySelector(".cro-jm-39-newHeader")) {
							insertHtml("body.cro-twoPartForm-t-1.cro-formHeader3 #call-to-action-and-form h4", croNewHeader, "afterend");
						}
					});

				} else {
					addClass("body", "cro-wrongId")
				}

			});
		}

		function eventHandeler() {
			live(".cro-Id-check-btnNew", "click", function () {
				croValuePass()
			});

			live(".cro-t-47-from-wrapper-button .cro-t-47-check-btn-main", "click", function () {
				firstName();
				lastName();
				validEmail();
				validPhn();
				if (!document.querySelector('.form-field.error')) {
					document.querySelector('.btn.primary[type="submit"]') && document.querySelector('.btn.primary[type="submit"]').click()
				}
			});
		}

		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();