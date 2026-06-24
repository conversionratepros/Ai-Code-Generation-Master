(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro71";
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

		var newBannerHeading = `<div class="cro71-hero-Banner">
        <div class="cro71-hero-Banner-wrapper">
            <div class="cro71-hero-Banner-inner">
                <div class="cro71-hero-Banner-heading">
                    <div class="cro71-hero-Banner-text heading">
                        You may qualify for a personal loan of <span>R24 000</span> with a repayment term of
                        <span>12</span> months.
                    </div>
                </div>
                <div class="cro71-hero-Banner-Sub_heading">
                    <div class="cro71-hero-Banner-text Sub_heading">
                        Instantly see if you qualify — for FREE!
                    </div>
                </div>
            </div>
        </div>
    </div>`;


		var newBenefit = `<div class="cro71-benefits-section cro-loginbottompart">
        <div class="cro71-benefits-section-wrapper">
            <h3 class="cro71-benefits-title">Benefits of a JustMoney personal loan:</h3>
            <ul class="cro71-benefits-list">
                <li>Easy application</li>
                <li>Quick approval</li>
                <li>Helps grow your credit profile</li>
                <li>Can fund studies, kickstart a side hustle, or cover unexpected costs</li>
                <li>Personalised interest rates</li>
                <li>Affordable instalments</li>
                <li>No upfront fees</li>
                <li>Instant application feedback</li>
            </ul>
        </div>
    </div>`;

		/* Variation Init */
		function init() {
			addClass("body", variation_name);

			waitForElement('.registerholder h1.topcaption', function () {
				if (!document.querySelector('.cro71-hero-Banner')) {
					insertHtml('.registerholder h1.topcaption', newBannerHeading, "afterend");
				}
			});

			waitForElement('.registerholder .loginbottompart', function () {
				if (!document.querySelector('.cro71-benefits-section.cro-loginbottompart')) {
					insertHtml('.registerholder .loginbottompart', newBenefit, "beforebegin");
				} eforebegin
			});


		}


		/* Initialise variation */
		waitForElement('.registerholder', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();