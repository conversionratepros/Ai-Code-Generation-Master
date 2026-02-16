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

		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}

		function cardTextChange() {
			waitForElement('.register-body.cro-t-rec-2 .cro-newImg img', function () {
				document.querySelector('.register-body.cro-t-rec-2 .cro-newImg img').src = "https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/UC2+%7C+Device+variety+2.png";
			});
			waitForElement('.register-body.cro-t-rec-2 img.cro-credit-master-left-img-desktop', function () {
				document.querySelector('.register-body.cro-t-rec-2 img.cro-credit-master-left-img-desktop').src = "https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/UC2+%7C+Device+variety-DBCT-79/UC2+%7C+Device+variety1.png.png";
			});
			waitForElement('.register-body.cro-t-rec-2 img.cro-credit-master-left-img-mobile', function () {
				document.querySelector('.register-body.cro-t-rec-2 img.cro-credit-master-left-img-mobile').src = "https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/cro-t-UC2-Device-credit-score-Mobile-img.png";
			});
		}


		/* Variation Init */
		function init() {
			addClass("body", "cro-t-UC2-Device")
			cardTextChange()

		}

		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();