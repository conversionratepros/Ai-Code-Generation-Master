(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro-t-Promotional-Campaign";
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
		var newPart = `<div class="cro-t-Promotional-part">
        <div class="cro-t-Promotional-wrapper">
            <div class="cro-t-Promotional-inner">
                <div class="cro-t-Promotional-img">
                    <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Promotional+Campaign+/db-Promotional-Badge.gif"
                        alt="" class="cro-t-Promotional-main-gif">
                </div>
                <div class="cro-t-Promotional-right-text">
                    <div class="cro-t-Promotional-right-header">
                        Get on track to financial freedom
                    </div>
                    <div class="cro-t-Promotional-right-subheader text-1">
                        Join Nicole, Yvonne, Yando and Dorianne, and a million more South Africans who are changing
                        their financial future with our help.
                    </div>
                    <div class="cro-t-Promotional-right-subheader register-text">
                        Register now, and take control.
                    </div>
                </div>
            </div>
        </div>
    </div>`


		/* Variation Init */
		function init() {
			addClass("body", variation_name)

			waitForElement('section.register-hld', function () {
				if (!document.querySelector('.cro-t-Promotional-part')) {
					insertHtml('section.register-hld', newPart, "afterend");
				}
			});
		}


		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();