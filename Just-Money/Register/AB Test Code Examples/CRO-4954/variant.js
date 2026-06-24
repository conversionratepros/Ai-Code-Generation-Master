(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "croki69";
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

		var fromText = `<div class="croki69-new-heading-top-from">
        <div class="croki69-new-heading-top-from-text">
            Why do you need my ID number?
        </div>
    </div>`;

		var fromBottom = `<div class="croki69-new-from-bottom">
        	<div class="croki69-new-from-bottom-wrapper">
            	<div class="croki69-new-from-new-login-text">
                Already have a profile? <span>Log in</span>
            </div>
        	</div>
    	</div>`;

		var popupModal = `<div class="croki69-lightBox" style="display:none">
    <div class="croki69-overlay"></div>
    <div class="croki69-modal">
        <div class="croki69-model-open">
            <div class="croki69-cross">
                <div class="croki69-cross-img">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="croki69-cross-icon">
                        <path
                            d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                            fill="#F18B21" />
                    </svg>
                </div>
            </div>
            <div class="croki69-modal-top-part">
                <div class="croki69-modal-top-wrapper">
                    <div class="croki69-modal-top-heading-subheading">
                        <div class="croki69-modal-top-heading-text">
                            Why do you need my ID number
                        </div>
                        <div class="croki69-modal-top-subheading-parent">
                            <div class="croki69-modal-top-subheading text-1">We use it to match your details with
                                what the credit bureaus have on record.</div>
                            <div class="croki69-modal-top-subheading text-2">This ensures that the credit info we
                                display, such as your credit score, is up to date and correct.</div>
                        </div>
                    </div>
                    <div class="croki69-modal-top-input-button">
                        <div class="croki69-modal-top-input-button-wrapper">
                            <!-- <div class="croki69-modal-top-input">
		                                 <div class="floating-label-input">
		                                     <input type="text" id="floatingID" type="number" maxlength="13" required>
		                                     <label for="floatingID">ID Number</label>
		                                 </div>
		                            </div> -->
                            <div class="croki69-modal-input-btn">
                                <span>OK, thanks!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;

		var new_Heading = `<div class="croki69-new-heading">
        <div class="croki69-heading-wrapper">
            <div class="croki69-heading-inner">
                <div class="croki69-heading-new">
                    <div class="croki69-heading-text">
                        Register for your Free Credit Score
                    </div>
                </div>
                <div class="croki69-sub_heading-new">
                    <div class="croki69-sub_heading-text">Check your credit score now and take control of your finances. It’s instant and totally
                        <span>FREE!</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

		function addingHTML() {
			waitForElement('.registerform #id-number-form', function () {
				if (!document.querySelector('.croki69-new-heading-top-from')) {
					insertHtml('.registerform #id-number-form', fromText, "afterbegin");
				}
			});

			waitForElement('.registerform #id-number-form', function () {
				if (!document.querySelector('.croki69-new-from-bottom')) {
					insertHtml('.registerform #id-number-form', fromBottom, "beforeend");
				}
			});
			waitForElement('.registerholder .topcaption', function () {
				if (!document.querySelector('.croki69-new-heading')) {
					insertHtml('.registerholder .topcaption', new_Heading, "afterend");
				}
			});

			waitForElement('body', function () {
				if (!document.querySelector('.croki69-lightBox')) {
					insertHtml('body', popupModal, "afterbegin");
				}
			});

			waitForElement("#registerForm #FirstName", function () {
				var parent = document.querySelector('#FirstName').closest('.custom-row')
				if (parent) {
					parent.classList.add('cro-from-name-parent')
				}
			});

			waitForElement("#registerForm #PhoneNumber", function () {
				var parent = document.querySelector('#PhoneNumber').closest('.custom-row')
				if (parent) {
					parent.classList.add('cro-from-number-parent')
				}
			});

			waitForElement("#registerForm>.custom-row >.mobilefeldspace .password", function () {
				var parent = document.querySelector('#registerForm>.custom-row >.mobilefeldspace .password').closest('.custom-row')
				if (parent) {
					parent.classList.add('cro-from-password-parent')
				}
			});

			waitForElement("#registerForm #AcceptTerms-2", function () {
				var parent = document.querySelector('#registerForm #AcceptTerms-2').closest('.custom-row')
				if (parent) {
					parent.classList.add('cro-from-checkbox-parent')
				}
			});

			waitForElement("#registerForm button#btn_userJourney_registrationSubmit_registration", function () {
				var parent = document.querySelector('#registerForm button#btn_userJourney_registrationSubmit_registration').closest('.custom-row')
				if (parent) {
					parent.classList.add('cro-from_2_Button-parent')
				}
			});


			waitForElement(".cro-from-password-parent input", function () {
				var passwordInput = document.querySelector(".cro-from-password-parent input#Password");
				if (passwordInput && !document.querySelector(".cro69_password")) {
					passwordInput.insertAdjacentHTML("afterend", '<span class="cro69_password" style="display:none;">Password</span>');
				}

				var confirmInput = document.querySelector(".cro-from-password-parent input#ConfirmPassword");
				if (confirmInput && !document.querySelector(".cro69_Confirm_Password")) {
					confirmInput.insertAdjacentHTML("afterend", '<span class="cro69_Confirm_Password" style="display:none;">Confirm password</span>');
				}
			});
			waitForElement("input#FirstName", function () {
				var surnameInput = document.querySelector("input#FirstName");
				if (surnameInput) {
					surnameInput.setAttribute("placeholder", "First name");
				}
			});
			waitForElement("input#Surname", function () {
				var surnameInput = document.querySelector("input#Surname");
				if (surnameInput) {
					surnameInput.setAttribute("placeholder", "Last name");
				}
			});
			waitForElement("input#PhoneNumber", function () {
				var surnameInput = document.querySelector("input#PhoneNumber");
				if (surnameInput) {
					surnameInput.setAttribute("placeholder", "Cell phone number");
				}
			});

			waitForElement("input#Email", function () {
				var surnameInput = document.querySelector("input#Email");
				if (surnameInput) {
					surnameInput.setAttribute("placeholder", "Email address");
				}
			});
			waitForElement(".cro-from-password-parent #ConfirmPassword", function () {
				var surnameInput = document.querySelector(".cro-from-password-parent #ConfirmPassword");
				if (surnameInput) {
					surnameInput.setAttribute("placeholder", "Confirm password");
				}
			});


		}

		/* Variation Init */
		function init() {
			addClass("body", variation_name)
			addClass('body', 'croki69-hide')

			addingHTML()
		}

		function even_handler() {
			live('.croki69-new-heading-top-from-text', 'click', function (e) {
				e.preventDefault();
				removeClass('body', 'croki69-hide')
				addClass('html', 'cro-scroll-hide')
				// document.querySelector("#IdNumber").value
				// var inputUpdate = document.querySelector("#floatingID")

				// if (inputUpdate) {
				// 	inputUpdate.value = document.querySelector("#IdNumber").value;
				// }
			})

			live(".croki69-cross-img, .croki69-overlay, .croki69-modal-input-btn", "click", function () {
				addClass('body', 'croki69-hide')
				removeClass('html', 'cro-scroll-hide')
			})

			live(".croki69-new-from-new-login-text span", "click", function () {
				var targetLink = document.querySelector(".navbar-collapse a.nav-link");
				if (targetLink) {
					targetLink.click();
				}
			});
		}



		if (!window.croki_69) {
			waitForElement(".registerholder", init);
			even_handler();
			window.croki_69 = true;
		}


		/* Initialise variation */

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();