(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "croki51";
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

		var paymentIcon = `<div class="croki51-secure-payments" style="display: none;">
        <div class="croki51-secure-payments-wrapper">
            <div class="croki51-secure-payments-inner">
                <div class="croki51-secure-payments-top">
                    <div class="croki51-secure-payments-lock-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
  <path d="M9.19999 10.1167V11.65M5.36665 6.68874C5.72808 6.66666 6.17364 6.66666 6.74666 6.66666H11.6533C12.2263 6.66666 12.6719 6.66666 13.0333 6.68874M5.36665 6.68874C4.91561 6.71626 4.59561 6.77821 4.32248 6.91736C3.8897 7.13786 3.53784 7.48968 3.31734 7.92246C3.06665 8.41451 3.06665 9.05851 3.06665 10.3467V11.42C3.06665 12.7082 3.06665 13.3522 3.31734 13.8442C3.53784 14.277 3.8897 14.6288 4.32248 14.8493C4.81447 15.1 5.45853 15.1 6.74666 15.1H11.6533C12.9415 15.1 13.5855 15.1 14.0775 14.8493C14.5103 14.6288 14.8621 14.277 15.0826 13.8442C15.3333 13.3522 15.3333 12.7082 15.3333 11.42V10.3467C15.3333 9.05851 15.3333 8.41451 15.0826 7.92246C14.8621 7.48968 14.5103 7.13786 14.0775 6.91736C13.8044 6.77821 13.4844 6.71626 13.0333 6.68874M5.36665 6.68874V5.13333C5.36665 3.01623 7.0829 1.29999 9.19999 1.29999C11.3171 1.29999 13.0333 3.01623 13.0333 5.13333V6.68874" stroke="black" stroke-width="0.766668" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                    </div>
                    <div class="croki51-secure-payments-text">
                        100% secure payments
                    </div>
                </div>
                <div class="croki51-secure-payments-bottom-icon">
                    <div class="croki51-secure-payments-bottom-icon-wrapper">
                        <div class="croki51-secure-payments-icon icon-1">
                            <img class="cro-icon" src="https://res.cloudinary.com/babylon/image/upload/v1670223009/babylonstoren/icons/icon-apple-pay-logo.svg" alt="">
                        </div>
                        <div class="croki51-secure-payments-icon icon-2">
                            <img class="cro-icon" src="https://res.cloudinary.com/babylon/image/upload/v1670221856/babylonstoren/icons/icon-american-express-logo.svg" alt="">
                        </div>
                        <div class="croki51-secure-payments-icon icon-3">
                            <img class="cro-icon" src="https://res.cloudinary.com/babylon/image/upload/v1670221857/babylonstoren/icons/icon-visa-logo.svg" alt="">
                        </div>
                        <div class="croki51-secure-payments-icon icon-4">
                            <img class="cro-icon" src="https://res.cloudinary.com/babylon/image/upload/v1670221856/babylonstoren/icons/icon-mastercard-logo.svg" alt="">
                        </div>
                        <div class="croki51-secure-payments-icon icon-5">
                            <img class="cro-icon" src="https://res.cloudinary.com/babylon/image/upload/v1670221856/babylonstoren/icons/gift_card.svg" alt="">
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>`;

		function init() {
			addClass("body", variation_name)
			// waitForElement(".x-product-view .x-page-panel .product-detail .x-product-attributes", function () {
			//     if (!document.querySelector(".croki51-secure-payments")) {
			//         insertHtml(".x-product-view .x-page-panel .product-detail .x-product-attributes", paymentIcon, "afterend");
			//     }
			// });

			waitForElement(".x-page-row .product-detail .x-product-attributes", function () {
				if (!document.querySelector(".croki51-secure-payments")) {
					insertHtml(".x-page-row .product-detail .x-product-attributes", paymentIcon, "afterend");
				}
			});


		}


		waitForElement('body', init);
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();