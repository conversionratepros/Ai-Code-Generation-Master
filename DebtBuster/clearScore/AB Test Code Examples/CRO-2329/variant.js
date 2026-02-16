(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro-t-86_87";
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
		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}

		/* Variation Init */
		function init() {
			addClass("body", variation_name);

			waitForElement('.actions input[type="submit"]', function () {
				var button = document.querySelector('.actions input[type="submit"]');
				if (button) {
					button.value = 'Complete my application';
				}
			})
		}

		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();