(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro56";
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



		var newNavber = `<div id="cro-right" class="cro-right-icon-text">
        <div class="cro-right-icon-text-wrapper">
            <div class="cro-right-icon-text-inner">
                <div class="cro-right-text">
                    Proud partner of:
                </div>
                <a class="cro-debt_buster-img-link" href="https://www.debtbusters.co.za/">
                    <div class="cro-debt_buster-img">
                        <img class="cro-debt_buster-img"
                            src="https://debtbusters-client.co.za/assets/images/db-logo.png" alt="debt_busters">
							<div class="cro-right-text-Mobile" style="display:none">PARTNER</div>
                    </div>
                </a>
            </div>
        </div>`


		var newNavDesktop = `<div class="cro-bottom-nav-new">
        <div class="cro-bottom-nav-new-wrapper">
            <div class="cro-bottom-nav-new-inner">
                <div class="cro-bottom-nav-left">
                    <div class="cro-bottom-nav-left-icon-parent">
                        <img class="cro-cup-icon"
                            src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/justMoneyVector1.png" alt="">
                    </div>
                    <div class="cro-bottom-nav-left-rated-text">
                        Rated <span>5/5</span>
                    </div>
                    <div class="cro-bottom-nav-left-star-icon">
                        <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202a.png" alt="">
                    </div>
                    <div class="cro-bottom-nav-left-Hellopeter-text">On Hellopeter</div>
                </div>
                <div class="cro-bottom-nav-right">
                    <div class="cro-bottom-nav-right-clock-icon">
                        <img class="cro-clock-icon"
                            src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/justMoney-cro-t-58-clock.png"
                            alt="">
                    </div>
                    <div class="cro-bottom-nav-right-text">Application results <span>within 2 minutes</span></div>
                </div>
            </div>
        </div>
    		</div>`



		/* Variation Init */
		function init() {
			addClass("body", variation_name);

			waitForElement('#landing-page-justmoney-logo-white-header-global-section .grid > div.grid-column', function () {
				if (!document.querySelector('.cro-right-icon-text')) {
					insertHtml('#landing-page-justmoney-logo-white-header-global-section .grid > div.grid-column', newNavber, "afterend");
				}
			});

			waitForElement('#landing-page-justmoney-logo-white-header-global-section', function () {
				if (!document.querySelector('.cro-bottom-nav-new')) {
					insertHtml('#landing-page-justmoney-logo-white-header-global-section', newNavDesktop, "afterend");
				}
			});
		}


		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();