(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro-t-63_89";
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

		var tooltip = `<div class="cro-t-63-tool-tips-container">
        <div class="cro-input-title"><span>Installation products will be added to your cart for your convenience.</span>
            <div class="cro-pdp-tooltip">
                <p class="cro-pdp-info-icon"><img
                        src="https://www.ctm.co.za/static/version1732278997/frontend/Vectra/ctmkenya/en_US/images/icons/pdp-info-icon.png"
                        class=""></p>
                <div class="cro-pdp-info">
                    <span></span>
                    <div>
                        <p>You can remove these products on checkout. These products are needed to maintain our quality
                            guarantee.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`


		/* Variation Init */
		function init() {
			addClass('body', variation_name)

			waitForElement('.trust-message', function () {
				if (!document.querySelector('.cro-t-63-tool-tips-container')) {
					insertHtml('.trust-message', tooltip, "beforebegin");
				}
			});

		}


		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();