(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "";
		var checkScreen = window.innerWidth;
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
			function addEvent(el, type, handler) {
				if (el.attachEvent) el.attachEvent("on" + type, handler);
				else el.addEventListener(type, handler);
			}
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

		function innerHTMLContent(selector, content) {
			var el = document.querySelector(selector);
			if (el) {
				el.innerHTML = content;
			}
		}

		function innerChildContent(selector, childNumber, content) {
			var el = document.querySelector(selector);
			if (el.hasChildNodes()) {
				el.childNodes[childNumber].textContent = content;
			}
		}

		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}

		function toggleClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.toggle(cls);
			}
		}

		function removeClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.contains(cls) && el.classList.remove(cls);
			}
		}

		var checkoutBTN = `<div class="cro_checkout_btn"><span>Checkout</span></div>`;

		function my_Bag() {
			ProgressShow();

			waitForElement('.cro-progress-fill', function () {
				updateProgressBar(1);
			});

			waitForElement('#Cart .card>.grid.u-border-top .grid__col-sm-3', function () {
				if (!document.querySelector(".cro_checkout_btn") && checkScreen > 1023) {
					insertHtml('#Cart .card>.grid.u-border-top .grid__col-sm-3', checkoutBTN, "beforeend");
				}
			});

			waitForElement('#Block__StepNavigation .u-pull--left.u-clear--left', function () {
				if (!document.querySelector(".cro_checkout_btn") && checkScreen < 1024) {
					insertHtml('#Block__StepNavigation .u-pull--left.u-clear--left', checkoutBTN, "beforebegin");
				}
			});

			waitForElement('#cartCounter', observerBTNcart);

		}

		var checkoutBTNDel = `<div class="cro_payment_btn"><span>Continue to Payment</span></div>`;

		var croDeliveryIcon = `<div class="card-header u-no-border dw-mod cro_delivery_heading">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
			<path d="M33.9942 17.7096L32.3634 15.4454C31.9984 14.9327 31.5164 14.5145 30.9574 14.2254C30.3984 13.9362 29.7785 13.7846 29.1492 13.7829H22.2142V10.3946C22.2142 9.34477 21.7972 8.33795 21.0548 7.59562C20.3125 6.85329 19.3057 6.43625 18.2559 6.43625H7.22005C6.17114 6.43917 5.16602 6.85715 4.42432 7.59885C3.68262 8.34055 3.26464 9.34567 3.26172 10.3946V26.1329C3.26172 26.7628 3.51194 27.3669 3.95734 27.8123C4.40274 28.2577 5.00683 28.5079 5.63672 28.5079H7.56839C7.68794 29.355 8.10942 30.1305 8.75526 30.6916C9.4011 31.2527 10.2279 31.5617 11.0834 31.5617C11.9389 31.5617 12.7657 31.2527 13.4115 30.6916C14.0574 30.1305 14.4788 29.355 14.5984 28.5079H23.4017C23.5213 29.355 23.9428 30.1305 24.5886 30.6916C25.2344 31.2527 26.0612 31.5617 26.9167 31.5617C27.7723 31.5617 28.599 31.2527 29.2448 30.6916C29.8907 30.1305 30.3122 29.355 30.4317 28.5079H32.3634C32.9933 28.5079 33.5974 28.2577 34.0428 27.8123C34.4882 27.3669 34.7384 26.7628 34.7384 26.1329V20.0054C34.7345 19.1815 34.4745 18.3791 33.9942 17.7096ZM11.0834 29.9804C10.6919 29.9804 10.3093 29.8643 9.98382 29.6469C9.65835 29.4294 9.40467 29.1203 9.25487 28.7586C9.10507 28.397 9.06588 27.9991 9.14225 27.6151C9.21861 27.2312 9.40711 26.8786 9.6839 26.6018C9.96069 26.325 10.3133 26.1365 10.6973 26.0601C11.0812 25.9837 11.4791 26.0229 11.8408 26.1727C12.2024 26.3225 12.5115 26.5762 12.729 26.9017C12.9465 27.2272 13.0626 27.6098 13.0626 28.0012C13.0626 28.5262 12.854 29.0296 12.4829 29.4007C12.1117 29.7719 11.6083 29.9804 11.0834 29.9804ZM20.6309 26.9246H14.4876C14.257 26.2028 13.803 25.5729 13.1911 25.126C12.5792 24.6791 11.8411 24.4383 11.0834 24.4383C10.3257 24.4383 9.58755 24.6791 8.97565 25.126C8.36376 25.5729 7.90976 26.2028 7.67922 26.9246H5.63672C5.42676 26.9246 5.22539 26.8412 5.07693 26.6927C4.92846 26.5442 4.84505 26.3429 4.84505 26.1329V10.3946C4.84505 9.76469 5.09527 9.1606 5.54067 8.7152C5.98607 8.2698 6.59016 8.01958 7.22005 8.01958H18.2559C18.8858 8.01958 19.4899 8.2698 19.9353 8.7152C20.3807 9.1606 20.6309 9.76469 20.6309 10.3946V26.9246ZM26.9167 29.9804C26.5253 29.9804 26.1426 29.8643 25.8172 29.6469C25.4917 29.4294 25.238 29.1203 25.0882 28.7586C24.9384 28.397 24.8992 27.9991 24.9756 27.6151C25.0519 27.2312 25.2404 26.8786 25.5172 26.6018C25.794 26.325 26.1467 26.1365 26.5306 26.0601C26.9145 25.9837 27.3125 26.0229 27.6741 26.1727C28.0358 26.3225 28.3449 26.5762 28.5623 26.9017C28.7798 27.2272 28.8959 27.6098 28.8959 28.0012C28.8959 28.5262 28.6874 29.0296 28.3162 29.4007C27.945 29.7719 27.4416 29.9804 26.9167 29.9804ZM33.1551 26.1329C33.1551 26.3429 33.0716 26.5442 32.9232 26.6927C32.7747 26.8412 32.5733 26.9246 32.3634 26.9246H30.3209C30.0903 26.2028 29.6363 25.5729 29.0245 25.126C28.4126 24.6791 27.6744 24.4383 26.9167 24.4383C26.159 24.4383 25.4209 24.6791 24.809 25.126C24.1971 25.5729 23.7431 26.2028 23.5126 26.9246H22.2142V15.3662H29.1492C29.527 15.3688 29.8988 15.4604 30.2345 15.6338C30.5701 15.8071 30.8601 16.0572 31.0809 16.3637L32.7117 18.6279C32.9967 19.0311 33.1514 19.5118 33.1551 20.0054V26.1329Z" fill="#0D3DCC"></path>
			<path d="M28.5457 19.3246H25.3791C25.1691 19.3246 24.9677 19.2412 24.8193 19.0927C24.6708 18.9442 24.5874 18.7429 24.5874 18.5329C24.5874 18.3229 24.6708 18.1216 24.8193 17.9731C24.9677 17.8246 25.1691 17.7412 25.3791 17.7412H28.5457C28.7557 17.7412 28.9571 17.8246 29.1055 17.9731C29.254 18.1216 29.3374 18.3229 29.3374 18.5329C29.3374 18.7429 29.254 18.9442 29.1055 19.0927C28.9571 19.2412 28.7557 19.3246 28.5457 19.3246Z" fill="#0D3DCC"></path>
			</svg><span class="mybasket">Delivery</span></span>
			</div>`;


		function deliveryPage() {
			// html body.cro_Delivery .order-summary-body-container
			ProgressShow();

			waitForElement('.cro-progress-fill', function () {
				updateProgressBar(2);
			});

			waitForElement('.order-summary-body-container', function () {
				if (!document.querySelector(".cro_payment_btn") && checkScreen > 1023) {
					insertHtml('.order-summary-body-container', checkoutBTNDel, "beforeend");
				}


			});

			waitForElement('#Block__StepNavigation .u-pull--left:not(.u-clear--left) button', function () {
				if (document.querySelector('#Block__StepNavigation .u-pull--left:not(.u-clear--left) button').disabled && document.querySelector(".cro_payment_btn")) {
					document.querySelector(".cro_payment_btn").classList.add("disabled");
				}
			});

			waitForElement('#Block__StepBar', function () {
				if (!document.querySelector(".cro_delivery_heading")) {
					insertHtml('#Block__StepBar', croDeliveryIcon, "afterend");
				}
			});
		}



		var payBTN = `<div class="cro_pay_btn"><span>Pay</span></div>`;

		var croPaymentIcon = `<div class="card-header u-no-border dw-mod cro_payment_heading">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
  <path d="M26.4534 6.90347C28.4644 6.90347 30.1087 8.47332 30.2278 10.4544L30.2347 10.6847V22.3792C30.2347 24.3902 28.6648 26.0345 26.6838 26.1536L26.4534 26.1605H6.54639C4.53541 26.1605 2.89108 24.5906 2.77204 22.6096L2.76514 22.3792V10.6847C2.76514 8.67374 4.33498 7.02942 6.31604 6.91037L6.54639 6.90347H26.4534ZM28.171 15.1177H4.82626L4.82764 22.3792C4.82764 23.2691 5.50396 24.0011 6.37065 24.0891L6.54639 24.098H26.4534C27.3433 24.098 28.0753 23.4216 28.1633 22.5549L28.1722 22.3792L28.171 15.1177ZM25.0977 19.9375C25.6672 19.9375 26.1289 20.3992 26.1289 20.9687C26.1289 21.4908 25.741 21.9223 25.2376 21.9906L25.0977 22H21.6602C21.0906 22 20.6289 21.5383 20.6289 20.9687C20.6289 20.4467 21.0169 20.0152 21.5203 19.9469L21.6602 19.9375H25.0977ZM26.4534 8.96597H6.54639C5.65647 8.96597 4.92453 9.6423 4.83651 10.509L4.82764 10.6847L4.82626 13.0552H28.171L28.1722 10.6847C28.1722 9.79481 27.4958 9.06286 26.6291 8.97485L26.4534 8.96597Z" fill="#1841C4"/>
</svg><span class="mybasket">Payment</span></span>
			</div>`;

		function paymentPage() {
			ProgressShow();


			// html body.cro_Delivery .order-summary-body-container
			waitForElement('.order-summary-body-container', function () {
				if (!document.querySelector(".cro_pay_btn") && checkScreen > 1023) {
					insertHtml('.order-summary-body-container', payBTN, "beforeend");
				}


			});

			waitForElement('#Block__StepNavigation .u-pull--left:not(.u-clear--left) button', function () {
				if (document.querySelector('#Block__StepNavigation .u-pull--left:not(.u-clear--left) button').disabled) {
					document.querySelector(".cro_pay_btn").classList.add("disabled");
				}
			})


			if (checkScreen < 1024) {
				waitForElement('#Block__SummaryContainer', function () {
					waitForElement('#Block__StaticSummary', function () {
						if (!document.querySelector('#OrderSubmit .grid.grid--external-bleed-x > #Block__StaticSummary')) {
							document.querySelector('#Block__SummaryContainer').insertAdjacentElement('beforebegin', document.querySelector('#Block__StaticSummary'))
						}
					})
				})
			}


			waitForElement('#Block__StepBar', function () {
				if (!document.querySelector(".cro_payment_heading")) {
					insertHtml('#Block__StepBar', croPaymentIcon, "afterend");
				}
			});

			waitForElement('.cro-progress-fill', function () {
				updateProgressBar(3);
			});

			waitForElement('#LsGiftCardCode', function () {
				var input = document.querySelector('#LsGiftCardCode');
				input.placeholder = "Enter gift card code";
			});



		}

		function croEventHandkler() {
			live(".cro_checkout_btn", "click", function () {
				document.querySelector('html body.cro_My_Bag #Block__StepNavigation button') && document.querySelector('html body.cro_My_Bag #Block__StepNavigation button').click();
			});

			live(".cro_payment_btn", "click", function () {
				if (!document.querySelector('#Block__StepNavigation .u-pull--left:not(.u-clear--left) button').disabled) {
					document.querySelector('#Block__StepNavigation .u-pull--left:not(.u-clear--left) button') && document.querySelector('#Block__StepNavigation .u-pull--left:not(.u-clear--left) button').click();
				}
			});

			live(".cro_pay_btn", "click", function () {
				if (!document.querySelector('#Block__StepNavigation .u-pull--left:not(.u-clear--left) button').disabled) {
					document.querySelector('#Block__StepNavigation .u-pull--left:not(.u-clear--left) button') && document.querySelector('#Block__StepNavigation .u-pull--left:not(.u-clear--left) button').click();
				}
			});

			// cro_pay_btn
		}

		var progressBar = `<div class="cro-progress-wrap">
							<div class="cro-progress-bar">
								<div class="cro-progress-line">
								<div class="cro-progress-fill"></div>
								</div>

								<div class="cro-step active" data-step="1">
								<div class="cro-step-circle">
									<span class="cro-step-number">1</span>
									<span class="cro-step-check"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#0D3DCC"/>
  <path d="M19.6264 9.95975C20.0167 10.3503 20.0168 10.9835 19.6264 11.374L13.1236 17.8767C12.7331 18.2669 12.0999 18.267 11.7094 17.8767L8.37345 14.5408C7.98303 14.1503 7.98323 13.5171 8.37345 13.1265L8.54263 12.9574C8.93315 12.5668 9.56632 12.5668 9.95684 12.9574L12.4165 15.417L18.043 9.79057C18.4335 9.40004 19.0667 9.40004 19.4572 9.79057L19.6264 9.95975Z" fill="white"/>
</svg></span>
								</div>
								<div class="cro-step-label">My Bag</div>
								</div>

								<div class="cro-step" data-step="2">
								<div class="cro-step-circle">
									<span class="cro-step-number">2</span>
									<span class="cro-step-check"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#0D3DCC"/>
  <path d="M19.6264 9.95975C20.0167 10.3503 20.0168 10.9835 19.6264 11.374L13.1236 17.8767C12.7331 18.2669 12.0999 18.267 11.7094 17.8767L8.37345 14.5408C7.98303 14.1503 7.98323 13.5171 8.37345 13.1265L8.54263 12.9574C8.93315 12.5668 9.56632 12.5668 9.95684 12.9574L12.4165 15.417L18.043 9.79057C18.4335 9.40004 19.0667 9.40004 19.4572 9.79057L19.6264 9.95975Z" fill="white"/>
</svg></span>
								</div>
								<div class="cro-step-label">Delivery</div>
								</div>

								<div class="cro-step" data-step="3">
								<div class="cro-step-circle">
									<span class="cro-step-number">3</span>
									<span class="cro-step-check"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#0D3DCC"/>
  <path d="M19.6264 9.95975C20.0167 10.3503 20.0168 10.9835 19.6264 11.374L13.1236 17.8767C12.7331 18.2669 12.0999 18.267 11.7094 17.8767L8.37345 14.5408C7.98303 14.1503 7.98323 13.5171 8.37345 13.1265L8.54263 12.9574C8.93315 12.5668 9.56632 12.5668 9.95684 12.9574L12.4165 15.417L18.043 9.79057C18.4335 9.40004 19.0667 9.40004 19.4572 9.79057L19.6264 9.95975Z" fill="white"/>
</svg></span>
								</div>
								<div class="cro-step-label">Payment</div>
								</div>
							</div>
							</div>`;

		if (!window.cro_t_KI19) {
			croEventHandkler();
			window.cro_t_KI19 = true;
		}

		function ProgressShow() {
			waitForElement('#Block__StepBar', function () {
				if (!document.querySelector(".cro-progress-wrap")) {
					insertHtml('#Block__StepBar', progressBar, "beforebegin");
				}
			});
		}

		function updateProgressBar(currentStep) {
			var steps = document.querySelectorAll('.cro-step');
			var fill = document.querySelector('.cro-progress-fill');

			steps.forEach(function (step, index) {
				var stepNumber = index + 1;

				step.classList.remove('active', 'completed');

				if (stepNumber < currentStep) {
					step.classList.add('completed');
				} else if (stepNumber === currentStep) {
					step.classList.add('active');
				}
			});

			var fillWidth = 0;

			if (currentStep === 1) {
				fillWidth = 0;
			} else if (currentStep === 2) {
				fillWidth = 50;
			} else if (currentStep === 3) {
				fillWidth = 100;
			}

			fill.style.width = fillWidth + '%';
		}

		function observerBTN() {
			var target = document.querySelector('#Block__OrderContainerRow .card .u-pull--left:not(.u-clear--left) button');

			if (!target) {
				console.warn('Target not found');
				return;
			}

			var observer = new MutationObserver(function (mutationsList) {
				mutationsList.forEach(function (mutation) {

					// 1. TEXT changes
					if (mutation.type === 'characterData') {
						console.log('Text changed:', mutation.target.textContent);
					}

					// 2. CHILD added/removed
					if (mutation.type === 'childList') {
						if (mutation.addedNodes.length) {
							console.log('Node added:', mutation.addedNodes);
						}
						if (mutation.removedNodes.length) {
							console.log('Node removed:', mutation.removedNodes);
						}
					}

					// 3. ATTRIBUTE changes (class, etc)
					if (mutation.type === 'attributes') {
						console.log(
							'Attribute changed:',
							mutation.attributeName,
							'on',
							mutation.target
						);


					}
				});

				// 👉 Your custom logic here
				handleCartUpdate();

			});

			observer.observe(target, {
				childList: true,       // detect add/remove
				subtree: true,         // include children
				characterData: true,   // detect text change
				attributes: true       // detect class/style change
			});

			function handleCartUpdate() {
				console.log('Cart summary updated');
				if (!document.querySelector('#Block__StepNavigation .u-pull--left:not(.u-clear--left) button').disabled) {
					if (document.querySelector(".cro_payment_btn.disabled")) {
						document.querySelector(".cro_payment_btn").classList.remove("disabled");
					} else {
						if (document.querySelector(".cro_payment_btn")) {
							document.querySelector(".cro_payment_btn").classList.remove("disabled");
						}

					}

				}

				if (document.querySelector('#Block__StepNavigation .u-pull--left:not(.u-clear--left) button').disabled && document.querySelector(".cro_payment_btn")) {
					document.querySelector(".cro_payment_btn").classList.add("disabled");
				}


				// --------------------
				if (!document.querySelector('#Block__StepNavigation .u-pull--left:not(.u-clear--left) button').disabled) {
					if (document.querySelector(".cro_pay_btn.disabled")) {
						document.querySelector(".cro_pay_btn").classList.remove("disabled");
					} else {
						if (document.querySelector(".cro_pay_btn")) {
							document.querySelector(".cro_pay_btn").classList.remove("disabled");
						}

					}

				}

				if (document.querySelector('#Block__StepNavigation .u-pull--left:not(.u-clear--left) button').disabled && document.querySelector(".cro_pay_btn")) {
					document.querySelector(".cro_pay_btn").classList.add("disabled");
				}

			}
		}

		function observerBTNcart() {
			var target = document.querySelector('#cartCounter');

			if (!target) {
				console.warn('Target not found');
				return;
			}

			var observer = new MutationObserver(function (mutationsList) {
				mutationsList.forEach(function (mutation) {

					// 1. TEXT changes
					if (mutation.type === 'characterData') {
						console.log('Text changed:', mutation.target.textContent);
					}

					// 2. CHILD added/removed
					if (mutation.type === 'childList') {
						if (mutation.addedNodes.length) {
							console.log('Node added:', mutation.addedNodes);
						}
						if (mutation.removedNodes.length) {
							console.log('Node removed:', mutation.removedNodes);
						}
					}

				});

				// 👉 Your custom logic here
				handleCartUpdate();

			});

			observer.observe(target, {
				childList: true,       // detect add/remove
				subtree: true,         // include children
				characterData: true,   // detect text change
				attributes: true       // detect class/style change
			});

			function handleCartUpdate() {
				console.log('Cart summary updated');
				waitForElement('#Cart .card>.grid.u-border-top .grid__col-sm-3', function () {
					if (!document.querySelector(".cro_checkout_btn") && checkScreen > 1023) {
						insertHtml('#Cart .card>.grid.u-border-top .grid__col-sm-3', checkoutBTN, "beforeend");
					}
				});

				waitForElement('#Block__StepNavigation .u-pull--left.u-clear--left', function () {
					if (!document.querySelector(".cro_checkout_btn") && checkScreen < 1024) {
						insertHtml('#Block__StepNavigation .u-pull--left.u-clear--left', checkoutBTN, "beforebegin");
					}
				});

			}
		}

		waitForElement('.cro_My_Bag', my_Bag);
		waitForElement('.cro_Delivery', deliveryPage);
		waitForElement('.cro_Payment', paymentPage);
		if (checkScreen > 991) {
			waitForElement('#Block__OrderContainerRow .card .u-pull--left:not(.u-clear--left) button', observerBTN);
		}



		// waitForElement('body', init);
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();