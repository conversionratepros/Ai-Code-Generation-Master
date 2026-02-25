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


		var listPart = `<div class="cro-t-43-new-list-part">
        <ul _ngcontent-lew-c94="" class="upper-list-group">
            <li _ngcontent-lew-c94="" class="upper-list-element d-flex align-items-center justify-content-start"><span
                    _ngcontent-lew-c94="" class="me-3 d-flex align-items-center"><svg _ngcontent-lew-c94="" width="8"
                        height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle _ngcontent-lew-c94="" cx="4" cy="4" r="4" fill="#61A644"></circle>
                    </svg></span><span _ngcontent-lew-c94="" class="list-txt">View your credit snapshot</span></li>
            <li _ngcontent-lew-c94="" class="upper-list-element d-flex align-items-center justify-content-start"><span
                    _ngcontent-lew-c94="" class="me-3 d-flex align-items-center"><svg _ngcontent-lew-c94="" width="8"
                        height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle _ngcontent-lew-c94="" cx="4" cy="4" r="4" fill="#61A644"></circle>
                    </svg></span><span _ngcontent-lew-c94="" class="list-txt">Monitor payments</span></li>
            <li _ngcontent-lew-c94="" class="upper-list-element d-flex align-items-center justify-content-start"><span
                    _ngcontent-lew-c94="" class="me-3 d-flex align-items-center"><svg _ngcontent-lew-c94="" width="8"
                        height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle _ngcontent-lew-c94="" cx="4" cy="4" r="4" fill="#61A644"></circle>
                    </svg></span><span _ngcontent-lew-c94="" class="list-txt">Understand your financial position</span>
            </li>
        </ul>
    </div>`

		var listPartMob = `<div class="cro-t-43-new-list-part cro-list-part-mobile">
        <ul _ngcontent-lew-c94="" class="upper-list-group">
            <li _ngcontent-lew-c94="" class="upper-list-element d-flex align-items-center justify-content-start"><span
                    _ngcontent-lew-c94="" class="me-3 d-flex align-items-center"><svg _ngcontent-lew-c94="" width="8"
                        height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle _ngcontent-lew-c94="" cx="4" cy="4" r="4" fill="#61A644"></circle>
                    </svg></span><span _ngcontent-lew-c94="" class="list-txt">View your credit snapshot</span></li>
            <li _ngcontent-lew-c94="" class="upper-list-element d-flex align-items-center justify-content-start"><span
                    _ngcontent-lew-c94="" class="me-3 d-flex align-items-center"><svg _ngcontent-lew-c94="" width="8"
                        height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle _ngcontent-lew-c94="" cx="4" cy="4" r="4" fill="#61A644"></circle>
                    </svg></span><span _ngcontent-lew-c94="" class="list-txt">Monitor payments</span></li>
            <li _ngcontent-lew-c94="" class="upper-list-element d-flex align-items-center justify-content-start"><span
                    _ngcontent-lew-c94="" class="me-3 d-flex align-items-center"><svg _ngcontent-lew-c94="" width="8"
                        height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle _ngcontent-lew-c94="" cx="4" cy="4" r="4" fill="#61A644"></circle>
                    </svg></span><span _ngcontent-lew-c94="" class="list-txt">Understand your financial position</span>
            </li>
        </ul>
    </div>`

		var iconText = `<div class="cro-t-43_42-top-secure">
        <div class="cro-t-43_42-top-secure-wrapper">
            <div class="cro-t-43_42-top-secure-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
                    <path
                        d="M2.8125 6.76892V5.08142C2.8125 2.30408 5.0625 0.0189209 7.875 0.0189209C10.6523 0.0189209 12.9375 2.30408 12.9375 5.08142V6.76892H13.5C14.7305 6.76892 15.75 7.78845 15.75 9.01892V15.7689C15.75 17.0345 14.7305 18.0189 13.5 18.0189H2.25C0.984375 18.0189 0 17.0345 0 15.7689V9.01892C0 7.78845 0.984375 6.76892 2.25 6.76892H2.8125ZM5.0625 6.76892H10.6875V5.08142C10.6875 3.53455 9.42188 2.26892 7.875 2.26892C6.29297 2.26892 5.0625 3.53455 5.0625 5.08142V6.76892Z"
                        fill="#919191" />
                </svg>
            </div>
            <div class="cro-t-43_42-top-secure-text">
                Your ID number is secure.
            </div>
        </div>
   						 </div>`

		var iconTextMob = `<div class="cro-t-43_42-top-secure cro-t-top-secure-mob">
							<div class="cro-t-43_42-top-secure-wrapper">
								<div class="cro-t-43_42-top-secure-icon">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
										<path
											d="M2.8125 6.76892V5.08142C2.8125 2.30408 5.0625 0.0189209 7.875 0.0189209C10.6523 0.0189209 12.9375 2.30408 12.9375 5.08142V6.76892H13.5C14.7305 6.76892 15.75 7.78845 15.75 9.01892V15.7689C15.75 17.0345 14.7305 18.0189 13.5 18.0189H2.25C0.984375 18.0189 0 17.0345 0 15.7689V9.01892C0 7.78845 0.984375 6.76892 2.25 6.76892H2.8125ZM5.0625 6.76892H10.6875V5.08142C10.6875 3.53455 9.42188 2.26892 7.875 2.26892C6.29297 2.26892 5.0625 3.53455 5.0625 5.08142V6.76892Z"
											fill="#919191" />
									</svg>
								</div>
								<div class="cro-t-43_42-top-secure-text">
									Your ID number is secure.
								</div>
							</div>
												</div>`


		/* Variation Init */
		function init() {
			addClass("body", "cro-t-43_42")


			waitForElement('.registerholder .topcap .desktop-text', function () {
				if (!document.querySelector('.cro-t-43-new-list-part')) {
					insertHtml('.registerholder .topcap .desktop-text', listPart, "afterend");
				}
			});

			waitForElement('.registerholder .topcap .mobile-text', function () {
				if (!document.querySelector('.cro-list-part-mobile')) {
					insertHtml('.registerholder .topcap .mobile-text', listPartMob, "afterend");
				}
			});

			waitForElement('#divIdNumber .register-btn', function () {
				if (!document.querySelector('.cro-t-43_42-top-secure')) {
					insertHtml('#divIdNumber .register-btn', iconText, "afterend");
				}
			});

			waitForElement('#divIdNumber .register-btn', function () {
				if (!document.querySelector('.cro-t-top-secure-mob')) {
					insertHtml('#divIdNumber .register-btn', iconTextMob, "beforebegin");
				}
			});


		}


		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();