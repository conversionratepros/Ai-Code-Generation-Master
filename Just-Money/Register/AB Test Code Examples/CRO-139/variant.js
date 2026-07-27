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

		var desktopNav = ` <div class="crok62-credit-score crok62-credit-scoreDesk">
        <div class="crok62-credit-score-wrapper">
            <div class="crok62-credit-score-inner">
                <div class="crok62-credit-score-text">
                    See your credit score <span> in 2 minutes</span>
                </div>
                <div class="crok62-credit-score-img">
                    <img class="credit-score-img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/JustMoney/Recipe+KI62/jm-ki62-1.png" alt="">
                </div>
            </div>
        </div>
    						</div>`;

		var mobpNav = ` <div class="crok62-credit-score crok62-credit-scoreMob">
							<div class="crok62-credit-score-wrapper">
								<div class="crok62-credit-score-inner">
									<div class="crok62-credit-score-text">
										See your credit score <span>in 2 minutes</span>
									</div>
									<div class="crok62-credit-score-img">
										<img class="credit-score-img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/JustMoney/Recipe+KI62/jm-ki62-1.png" alt="">
									</div>
								</div>
							</div>
												</div>`;


		var navRatedtext = `<div class="cro-t-rating-badge-star-icon">
        <div class="cro-t-rating-badge-star-icon-wrapper">
            <div class="cro-t-rating-badge-star-icon-inner">
                <div class="cro-t-rating-text">Rated</div>
                <div class="cro-t-rating-badge-star">
                    <div class="cro-t-rating-text">
                        <span>5/5</span>
                    </div>
                    <div class="cro-t-rating-star">
                        <i _ngcontent-pos-c83="" class="bi bi-star-fill cro-star-fill"><svg _ngcontent-pos-c83="" width="20"
                                height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path _ngcontent-pos-c83=""
                                    d="M7.00419 1.1926C7.18804 0.822576 7.71589 0.822577 7.89974 1.1926L9.5346 4.48302C9.60741 4.62955 9.7473 4.73119 9.90916 4.75515L13.5437 5.2932C13.9525 5.35371 14.1156 5.85572 13.8205 6.14492L11.1963 8.71655C11.0794 8.83108 11.026 8.99553 11.0532 9.15687L11.6647 12.7798C11.7334 13.1872 11.3064 13.4975 10.9401 13.3062L7.68346 11.6052C7.53843 11.5294 7.36551 11.5294 7.22048 11.6052L3.96379 13.3062C3.59756 13.4975 3.17052 13.1872 3.23928 12.7798L3.85071 9.15687C3.87794 8.99553 3.82451 8.83108 3.70764 8.71655L1.08347 6.14492C0.788363 5.85572 0.951479 5.35371 1.36021 5.2932L4.99478 4.75515C5.15664 4.73119 5.29653 4.62955 5.36934 4.48302L7.00419 1.1926Z"
                                    fill="#FFC700"></path>
                            </svg></i><i _ngcontent-pos-c83="" class="bi bi-star-fill cro-star-fill"><svg _ngcontent-pos-c83=""
                                width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path _ngcontent-pos-c83=""
                                    d="M7.00419 1.1926C7.18804 0.822576 7.71589 0.822577 7.89974 1.1926L9.5346 4.48302C9.60741 4.62955 9.7473 4.73119 9.90916 4.75515L13.5437 5.2932C13.9525 5.35371 14.1156 5.85572 13.8205 6.14492L11.1963 8.71655C11.0794 8.83108 11.026 8.99553 11.0532 9.15687L11.6647 12.7798C11.7334 13.1872 11.3064 13.4975 10.9401 13.3062L7.68346 11.6052C7.53843 11.5294 7.36551 11.5294 7.22048 11.6052L3.96379 13.3062C3.59756 13.4975 3.17052 13.1872 3.23928 12.7798L3.85071 9.15687C3.87794 8.99553 3.82451 8.83108 3.70764 8.71655L1.08347 6.14492C0.788363 5.85572 0.951479 5.35371 1.36021 5.2932L4.99478 4.75515C5.15664 4.73119 5.29653 4.62955 5.36934 4.48302L7.00419 1.1926Z"
                                    fill="#FFC700"></path>
                            </svg></i><i _ngcontent-pos-c83="" class="bi bi-star-fill cro-star-fill"><svg _ngcontent-pos-c83=""
                                width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path _ngcontent-pos-c83=""
                                    d="M7.00419 1.1926C7.18804 0.822576 7.71589 0.822577 7.89974 1.1926L9.5346 4.48302C9.60741 4.62955 9.7473 4.73119 9.90916 4.75515L13.5437 5.2932C13.9525 5.35371 14.1156 5.85572 13.8205 6.14492L11.1963 8.71655C11.0794 8.83108 11.026 8.99553 11.0532 9.15687L11.6647 12.7798C11.7334 13.1872 11.3064 13.4975 10.9401 13.3062L7.68346 11.6052C7.53843 11.5294 7.36551 11.5294 7.22048 11.6052L3.96379 13.3062C3.59756 13.4975 3.17052 13.1872 3.23928 12.7798L3.85071 9.15687C3.87794 8.99553 3.82451 8.83108 3.70764 8.71655L1.08347 6.14492C0.788363 5.85572 0.951479 5.35371 1.36021 5.2932L4.99478 4.75515C5.15664 4.73119 5.29653 4.62955 5.36934 4.48302L7.00419 1.1926Z"
                                    fill="#FFC700"></path>
                            </svg></i><i _ngcontent-pos-c83="" class="bi bi-star-fill cro-star-fill"><svg _ngcontent-pos-c83=""
                                width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path _ngcontent-pos-c83=""
                                    d="M7.00419 1.1926C7.18804 0.822576 7.71589 0.822577 7.89974 1.1926L9.5346 4.48302C9.60741 4.62955 9.7473 4.73119 9.90916 4.75515L13.5437 5.2932C13.9525 5.35371 14.1156 5.85572 13.8205 6.14492L11.1963 8.71655C11.0794 8.83108 11.026 8.99553 11.0532 9.15687L11.6647 12.7798C11.7334 13.1872 11.3064 13.4975 10.9401 13.3062L7.68346 11.6052C7.53843 11.5294 7.36551 11.5294 7.22048 11.6052L3.96379 13.3062C3.59756 13.4975 3.17052 13.1872 3.23928 12.7798L3.85071 9.15687C3.87794 8.99553 3.82451 8.83108 3.70764 8.71655L1.08347 6.14492C0.788363 5.85572 0.951479 5.35371 1.36021 5.2932L4.99478 4.75515C5.15664 4.73119 5.29653 4.62955 5.36934 4.48302L7.00419 1.1926Z"
                                    fill="#FFC700"></path>
                            </svg></i><i _ngcontent-pos-c83="" class="bi bi-star-fill cro-star-fill"><svg _ngcontent-pos-c83=""
                                width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path _ngcontent-pos-c83=""
                                    d="M7.00419 1.1926C7.18804 0.822576 7.71589 0.822577 7.89974 1.1926L9.5346 4.48302C9.60741 4.62955 9.7473 4.73119 9.90916 4.75515L13.5437 5.2932C13.9525 5.35371 14.1156 5.85572 13.8205 6.14492L11.1963 8.71655C11.0794 8.83108 11.026 8.99553 11.0532 9.15687L11.6647 12.7798C11.7334 13.1872 11.3064 13.4975 10.9401 13.3062L7.68346 11.6052C7.53843 11.5294 7.36551 11.5294 7.22048 11.6052L3.96379 13.3062C3.59756 13.4975 3.17052 13.1872 3.23928 12.7798L3.85071 9.15687C3.87794 8.99553 3.82451 8.83108 3.70764 8.71655L1.08347 6.14492C0.788363 5.85572 0.951479 5.35371 1.36021 5.2932L4.99478 4.75515C5.15664 4.73119 5.29653 4.62955 5.36934 4.48302L7.00419 1.1926Z"
                                    fill="#FFC700"></path>
                            </svg></i>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

		/* Variation Init */
		function init() {
			addClass("body", "cro-t-KI62")

			waitForElement('.navbar-collapse .rating-badge__content', function () {
				if (!document.querySelector('.crok62-credit-scoreDesk')) {
					insertHtml('.navbar-collapse .rating-badge__content', desktopNav, "afterend");
				}
			});

			waitForElement('.register-hld p.rating-badge__text', function () {
				if (!document.querySelector('.cro-t-rating-badge-star-icon')) {
					insertHtml('.register-hld p.rating-badge__text', navRatedtext, "afterend");
				}
			});

			waitForElement('.register-hld .rating-badge__content', function () {
				if (!document.querySelector('.crok62-credit-scoreMob')) {
					insertHtml('.register-hld .rating-badge__content', mobpNav, "afterend");
				}
			});


		}


		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();