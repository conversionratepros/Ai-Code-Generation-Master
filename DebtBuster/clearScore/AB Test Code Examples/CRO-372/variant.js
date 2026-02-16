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
		var croFromtext = `<div class="cro-t-73-77-hero-top-part">
        <div class="cro-t-73-77-hero-top-part-wrapper">
            <div class="cro-t-73-77-hero-top-part-inner">
                <div class="cro-t-73-77-left-part">
                    <div class="cro-t-73-77-left-part-text">Rated <span>4.1</span> out of <span>5</span></div>
                </div>
                <div class="cro-t-73-77-left-part-right-part">
                    <a href="">
                        <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/DebtBuster-Recipe-73-77_google-reviews.png.png" alt="" class="cro-from-top-img">
                    </a>
                </div>
            </div>
        </div>
    </div>`

		var croFromtextNew = `<div class="cro-t-73-77-from-top-part">
				<div class="cro-t-73-77-from-top-part-wrapper">
					<div class="cro-t-73-77-from-top-part-inner">
						<div class="cro-t-73-77-from-left-part">
							<div class="cro-t-73-77-from-left-part-icon">
								<img class="cro-review-icon" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/cro-t-73.77-new-update-Review-logo.png" alt="">
							</div>
							<div class="cro-t-73-77-from-left-part-text">
								4.2/5 <span>(1,186 Reviews)</span>
							</div>
						</div>
						<div class="cro-t-73-77-from-right-part">
							<a href="">
								<img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/cro-t-73.77-new-update-google-logo.png"
									alt="" class="cro-from-top-img">
							</a>
						</div>
					</div>
				</div>
				</div>`

		var croIconText = `<div class="cro-Featured-container">
        <div class="cro-Featured-container-wrapper container">
            <div class="cro-Featured-inner">
                <div class="cro-Featured-top">
                    <div class="cro-Featured-top-text">Featured on:</div>
                </div>
                <div class="cro-Featured-footer">
                    <div class="cro-Featured-footer-wrapper">
                        <div class="cro-footer-icon-container">
                            <div class="cro-footer-icon-img cro-footer-icon-img-One">
                                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/DebtBuster-Recipe-73-77-businesstech.png" alt="">
                            </div>
                            <div class="cro-footer-icon-img cro-footer-icon-img-Two">
                                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/DebtBuster-Recipe-73-77%20-sabc.png" alt="">
                            </div>
                            <div class="cro-footer-icon-img cro-footer-icon-img-Three">
                                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/DebtBuster-Recipe-73-77%20-iol.png" alt="">
                            </div>
                            <div class="cro-footer-icon-img cro-footer-icon-img-Four">
                                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/DebtBuster-Recipe-73-77%20-moneyweb.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
    
            </div>
        </div>
        </div>`

		var croIconTextMob = `<div class="cro-Featured-container-mob">
        <div class="cro-Featured-container-wrapper-mob container">
            <div class="cro-Featured-inner-mob">
                <div class="cro-Featured-top-mob">
                    <div class="cro-Featured-top-text-mob">Featured on:</div>
                </div>
                <div class="cro-Featured-footer-mob">
                    <div class="cro-Featured-footer-wrapper-mob">
                        <div class="cro-footer-icon-container-mob">
                            <div class="cro-footer-icon-container-mob-one">
                                <div class="cro-footer-icon-img-mob cro-footer-icon-img-One-mob">
                                    <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/DebtBuster-Recipe-73-77-businesstech.png" alt="">
                                </div>
                                <div class="cro-footer-icon-img-mob cro-footer-icon-img-Two-mob">
                                    <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/DebtBuster-Recipe-73-77%20-sabc.png" alt="">
                                </div>
                            </div>
                            <div class="cro-footer-icon-container-mob-Two">
                                <div class="cro-footer-icon-img-mob cro-footer-icon-img-three-mob">
                                    <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/DebtBuster-Recipe-73-77%20-moneyweb.png" alt="">
                                </div>
                                <div class="cro-footer-icon-img-mob cro-footer-icon-img-four-mob">
                                    <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/DebtBuster-Recipe-73-77%20-iol.png" alt="">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>`


		/* Variation Init */
		function init() {

			addClass("body", "cro-73-77")

			waitForElement('.cro-client-say-header', function () {
				if (!document.querySelector('.cro-Featured-container')) {
					insertHtml('.cro-client-say-header', croIconText, "beforebegin");
				}
			});
			waitForElement('.cro-client-say-header', function () {
				if (!document.querySelector('.cro-Featured-container-mob')) {
					insertHtml('.cro-client-say-header', croIconTextMob, "beforebegin");
				}
			});


			waitForElement('#form-embed-placeholder .hbspt-form .hs-form', function () {
				if (!document.querySelector('.cro-t-73-77-from-top-part')) {
					insertHtml('#form-embed-placeholder .hbspt-form .hs-form', croFromtextNew, "beforebegin");
				}
			});
		}

		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();