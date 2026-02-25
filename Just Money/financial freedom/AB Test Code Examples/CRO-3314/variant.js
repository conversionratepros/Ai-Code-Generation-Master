(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro46";
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

		var newHeading = ` <div class="cro46-heading-subheading">
        <div class="cro46-heading-subheading-inner">
            <div class="cro46-heading-text">
                <span>Congratulations!</span> Check your Credit Score and rebuild today
            </div>
            <div class="cro46-sub_heading-text">
                Start your journey to <span>debt freedom.</span> Enter your ID to check your credit score.
            </div>
        </div>

    </div>`;

		/* Variation Init */
		function init() {
			addClass("body", variation_name);

			waitForElement('#call-to-action-and-form .relative .grid>div:nth-child(2)', function () {
				if (!document.querySelector('.cro46-heading-subheading')) {
					insertHtml('#call-to-action-and-form .relative .grid>div:nth-child(2)', newHeading, "afterbegin");
				}
			});

		}



		/* Initialise variation */
		waitForElement('section#call-to-action-and-form', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();