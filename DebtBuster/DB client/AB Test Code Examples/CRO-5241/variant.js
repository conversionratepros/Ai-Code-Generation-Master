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

		var newImageBanner = `<div class="croki51-new-banner desktop">
        <div class="croki51-new-banner-wrapper">
            <div class="croki51-new-banner-inner">
                <img class="croki51_image" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Debt-co-za/Recipe_KI51/cro-db-51-1.png" alt="">
            </div>
        </div>
    						</div>`;
		var newImageBannerMobile = `<div class="croki51-new-banner mobile" style="display: none;">
									<div class="croki51-new-banner-wrapper">
										<div class="croki51-new-banner-inner">
											<img class="croki51_image" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Debt-co-za/Recipe_KI51/cro-db-51-1.png" alt="">
										</div>
									</div>
    								</div>`;


		function addClass_and_Html() {
			waitForElement(".phone1and2img-desktop", function () {
				var parent = document.querySelector('.phone1and2img-desktop').closest('div')
				if (parent) {
					parent.classList.add('cro_Control-Banner')
				}
			});

			waitForElement('.cro_Control-Banner', function () {
				if (!document.querySelector('.croki51-new-banner.desktop')) {
					insertHtml('.cro_Control-Banner', newImageBanner, "afterend");
				}
			});

			waitForElement('.phone1and2img-mobile-div', function () {
				if (!document.querySelector('.croki51-new-banner.mobile')) {
					insertHtml('.phone1and2img-mobile-div', newImageBannerMobile, "afterend");
				}
			});
		}


		/* Variation Init */
		function init() {
			addClass("body", variation_name);
			addClass_and_Html()


		}

		/* Initialise variation */
		waitForElement('.registerholder', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();