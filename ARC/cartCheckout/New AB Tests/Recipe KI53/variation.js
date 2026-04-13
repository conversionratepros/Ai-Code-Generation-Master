(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "CRO_8143";(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "CRO_8143";
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

		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}

		var backButton = `<div class="cro_top_back_button">
        <span class=""><i
                class="fas fa-angle-left"></i> Back to My Bag</span>
    	</div>`;

		var radioBtn_text = `<div class="cro_delivery_message"><span></span></div>`;

		var pickuplocation = `   <div class="cro_store_pickup_message">
        <div class="cro_store_location">

        </div>
        <i class="fas fa-map-marker u-margin-left"></i>
        <div class="cro_pickup_button">
            <button>Select Pick Up Point</button>
        </div>

    </div>`;

		function addingHTML() {
			waitForElement('#Block__StepBar', function () {
				if (!document.querySelector('.cro_top_back_button')) {
					insertHtml('#Block__StepBar', backButton, 'beforeend');
				}
			});

			waitForElement('#content .content-row__item__body .paragraph-container #Block__Shipping .u-shipping-card-body', function () {
				if (!document.querySelector('.cro_delivery_message')) {
					insertHtml('#content .content-row__item__body .paragraph-container #Block__Shipping .u-shipping-card-body', radioBtn_text, 'beforeend');
				}
			});

			/////////
			waitForElement('#ShippingProviderContent', function () {
				if (document.querySelector('.cro_delivery_message') && !document.querySelector('.cro_store_pickup_message')) {
					insertHtml('.cro_delivery_message', pickuplocation, 'afterend');
				}
			});

			waitForElement('#content .content-row__item__body .paragraph-container #Block__Shipping .u-shipping-method>.dw-mod input[checked*="Checked"]', function () {
				if (document.querySelector('.cro_delivery_message span')) {
					document.querySelector('.cro_delivery_message span').innerHTML = document.querySelector('#content .content-row__item__body .paragraph-container #Block__Shipping .u-shipping-method>.dw-mod input[checked*="Checked"] + label .u-shipping-method-description').innerHTML;
				}

				document.querySelector('#content .content-row__item__body .paragraph-container #Block__Shipping .u-shipping-method>.dw-mod input[checked*="Checked"]').closest('div').classList.add('cro_selected_shipping');
			});
		}

		function observeButtonDisabled(buttonSelector, callback) {
			var button = document.querySelector(buttonSelector);
			if (!button) {
				console.warn(`Button not found: ${buttonSelector}`);
				return null;
			}

			var observer = new MutationObserver((mutations) => {
				for (var mutation of mutations) {
					if (mutation.attributeName === 'disabled') {
						var isDisabled = button.disabled;
						callback(isDisabled, button);
					}
				}
			});

			// Only observe attribute changes, and only the 'disabled' attribute
			observer.observe(button, {
				attributes: true,
				attributeFilter: ['disabled'],
				// These are all explicitly OFF to avoid performance overhead
				childList: false,
				subtree: false,
				characterData: false,
			});

			// Fire the callback once with the initial state
			callback(button.disabled, button);

			// Return a cleanup function
			return () => observer.disconnect();
		}

		function observeContentChange(selector, callback) {
			var element = document.querySelector(selector);
			if (!element) {
				console.warn(`Element not found: ${selector}`);
				return null;
			}

			var observer = new MutationObserver((mutations) => {
				// Fire callback with the updated content
				callback(element.textContent, element.innerHTML, element);
			});

			observer.observe(element, {
				childList: true,      // Detect added/removed child nodes
				subtree: true,        // Detect changes in nested children too
				characterData: true,  // Detect text content changes
			});

			// Fire once with initial content
			callback(element.textContent, element.innerHTML, element);

			return () => observer.disconnect();
		}

		function buttonObserver() {

			// form .grid--external-bleed-x

			var payment_button = `<div class="cro_payement_button">
					<button type="submit" class="btn btn--primary dw-mod u-pull--right u-no-margin"
						id="CRO_GotoStep2" disabled="">Continue to Payment</button>
				</div>`;

			if (!document.querySelector('.cro_delivery_message')) {
				insertHtml('form .grid--external-bleed-x', payment_button, 'beforeend');
			}


			var cleanup = observeButtonDisabled('.cart-navigation-btn-custom', (isDisabled, btn) => {
				if (isDisabled) {
					console.log('Button is disabled');
					document.querySelector('.cro_payement_button button').disabled = true;
				} else {
					console.log('Button is enabled');
					document.querySelector('.cro_payement_button button').disabled = false;
				}
			});





		}

		function watchCheckboxes(callback) {
			var inputs = document.querySelectorAll('.u-shipping-card-body input');

			var handler = () => {
				let anyChecked = false;

				inputs.forEach((input) => {
					if (input.checked) anyChecked = true;
				});

				callback(anyChecked);
			};

			inputs.forEach((input) => {
				input.addEventListener('change', handler);
			});

			// Fire once with initial state
			handler();

			// Cleanup
			return () => {
				inputs.forEach((input) => {
					input.removeEventListener('change', handler);
				});
			};
		}


		function init() {
			addClass("body", variation_name);

			waitForElement('.u-shipping-card-body input', function () {
				var cleanup = watchCheckboxes((anyChecked) => {
					if (anyChecked) {
						console.log('At least one shipping option is selected');
						if (document.querySelector('cro_details_hide')) {
							document.querySelector('body').classList.remove('cro_details_hide');
						}
					} else {
						console.log('No shipping option selected');
						document.querySelector('body').classList.add('cro_details_hide');
					}
				});
			});



			addingHTML();

		}

		function croEventHandkler() {
			live(".cro_top_back_button", "click", function () {
				document.querySelector('#Block__OrderContainerRow #Block__StepNavigation .u-pull--left button.u-cart-navigation-link__nobutton') && document.querySelector('#Block__OrderContainerRow #Block__StepNavigation .u-pull--left button.u-cart-navigation-link__nobutton').click();
			});

			live(".cro_payement_button button", "click", function (e) {
				e.preventDefault();
				document.querySelector('button.cart-navigation-btn-custom') && document.querySelector('button.cart-navigation-btn-custom').click();
			});

			live(".cro_pickup_button button", "click", function (e) {
				e.preventDefault();
				document.querySelector('#ParcelShopsIFrameModalTrigger') && document.querySelector('#ParcelShopsIFrameModalTrigger').click();
			});


		}



		if (!window.cro_t_20) {
			croEventHandkler();
			if (window.innerWidth < 992) {
				waitForElement('.cart-navigation-btn-custom', buttonObserver);
			}

			waitForElement('#dispPupCont', function () {
				var cleanupContent = observeContentChange('#dispPupCont', (textContent, innerHTML, element) => {
					// console.log('Div content updated:', textContent);
					// Do whatever you need here
					if (document.querySelector('.cro_store_location')) {
						document.querySelector('.cro_store_location').innerHTML = innerHTML;
					}

					document.querySelector('.cro_store_location').classList.add('cro_location_updated');
				});
			});
			window.cro_t_20 = true;
		}

		waitForElement('body', init);
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();
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

		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}

		var backButton = `<div class="cro_top_back_button">
        <span class=""><i
                class="fas fa-angle-left"></i> Back to My Bag</span>
    	</div>`;

		var radioBtn_text = `<div class="cro_delivery_message"><span></span></div>`;

		function addingHTML() {
			waitForElement('#Block__StepBar', function () {
				if (!document.querySelector('.cro_top_back_button')) {
					insertHtml('#Block__StepBar', backButton, 'beforeend');
				}
			});

			waitForElement('#content .content-row__item__body .paragraph-container #Block__Shipping .u-shipping-card-body', function () {
				if (!document.querySelector('.cro_delivery_message')) {
					insertHtml('#content .content-row__item__body .paragraph-container #Block__Shipping .u-shipping-card-body', radioBtn_text, 'beforeend');
				}
			});

			waitForElement('#content .content-row__item__body .paragraph-container #Block__Shipping .u-shipping-method>.dw-mod input[checked*="Checked"]', function () {
				if (document.querySelector('.cro_delivery_message span')) {
					document.querySelector('.cro_delivery_message span').innerHTML = document.querySelector('#content .content-row__item__body .paragraph-container #Block__Shipping .u-shipping-method>.dw-mod input[checked*="Checked"] + label .u-shipping-method-description').innerHTML;
				}

				document.querySelector('#content .content-row__item__body .paragraph-container #Block__Shipping .u-shipping-method>.dw-mod input[checked*="Checked"]').closest('div').classList.add('cro_selected_shipping');
			});
		}

		function observeButtonDisabled(buttonSelector, callback) {
			var button = document.querySelector(buttonSelector);
			if (!button) {
				console.warn(`Button not found: ${buttonSelector}`);
				return null;
			}

			var observer = new MutationObserver((mutations) => {
				for (var mutation of mutations) {
					if (mutation.attributeName === 'disabled') {
						var isDisabled = button.disabled;
						callback(isDisabled, button);
					}
				}
			});

			// Only observe attribute changes, and only the 'disabled' attribute
			observer.observe(button, {
				attributes: true,
				attributeFilter: ['disabled'],
				// These are all explicitly OFF to avoid performance overhead
				childList: false,
				subtree: false,
				characterData: false,
			});

			// Fire the callback once with the initial state
			callback(button.disabled, button);

			// Return a cleanup function
			return () => observer.disconnect();
		}

		function buttonObserver() {

			// form .grid--external-bleed-x

			var payment_button = `<div class="cro_payement_button">
					<button type="submit" class="btn btn--primary dw-mod u-pull--right u-no-margin"
						id="CRO_GotoStep2" disabled="">Continue to Payment</button>
				</div>`;

			if (!document.querySelector('.cro_delivery_message')) {
				insertHtml('form .grid--external-bleed-x', payment_button, 'beforeend');
			}


			var cleanup = observeButtonDisabled('.cart-navigation-btn-custom', (isDisabled, btn) => {
				if (isDisabled) {
					console.log('Button is disabled');
					document.querySelector('.cro_payement_button button').disabled = true;
				} else {
					console.log('Button is enabled');
					document.querySelector('.cro_payement_button button').disabled = false;
				}
			});
		}

		function watchCheckboxes(callback) {
			var inputs = document.querySelectorAll('.u-shipping-card-body input');

			var handler = () => {
				let anyChecked = false;

				inputs.forEach((input) => {
					if (input.checked) anyChecked = true;
				});

				callback(anyChecked);
			};

			inputs.forEach((input) => {
				input.addEventListener('change', handler);
			});

			// Fire once with initial state
			handler();

			// Cleanup
			return () => {
				inputs.forEach((input) => {
					input.removeEventListener('change', handler);
				});
			};
		}


		function init() {
			addClass("body", variation_name);

			waitForElement('.u-shipping-card-body input', function () {
				var cleanup = watchCheckboxes((anyChecked) => {
					if (anyChecked) {
						console.log('At least one shipping option is selected');
						if (document.querySelector('cro_details_hide')) {
							document.querySelector('body').classList.remove('cro_details_hide');
						}
					} else {
						console.log('No shipping option selected');
						document.querySelector('body').classList.add('cro_details_hide');
					}
				});
			});



			addingHTML();

		}

		function croEventHandkler() {
			live(".cro_top_back_button", "click", function () {
				document.querySelector('#Block__OrderContainerRow #Block__StepNavigation .u-pull--left button.u-cart-navigation-link__nobutton') && document.querySelector('#Block__OrderContainerRow #Block__StepNavigation .u-pull--left button.u-cart-navigation-link__nobutton').click();
			});

			live(".cro_payement_button button", "click", function (e) {
				e.preventDefault();
				document.querySelector('button.cart-navigation-btn-custom') && document.querySelector('button.cart-navigation-btn-custom').click();
			});


		}



		if (!window.cro_t_20) {
			croEventHandkler();
			if (window.innerWidth < 992) {
				waitForElement('.cart-navigation-btn-custom', buttonObserver);
			}
			window.cro_t_20 = true;
		}

		waitForElement('body', init);
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();