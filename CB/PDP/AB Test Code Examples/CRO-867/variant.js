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

		var newReviewSection = `<div class="product-reviews-summary cro-review" itemprop="aggregateRating" itemscope=""
        itemtype="http://schema.org/AggregateRating">
        <div class="rating-summary cro-rating-summary">
            <span class="label"><span>Rating:</span></span>
            <div class="rating-result" title="100%">
                <span style="width: 100%;">
                    <span>
                        <span itemprop="ratingValue">100 </span>% of <span itemprop="bestRating">100</span>
                    </span>
                </span>
            </div>
            <div class="cro-review-part">
                <div class="cro-review-text">
                     (<span>5</span>/5)
                </div>
            </div>
        </div>
    </div>`


		/* Variation Init */
		function init() {
			addClass('body', 'cro-t-138')

			waitForElement('.product-right .page-title-wrapper', function () {
				if (!document.querySelector('.cro-review')) {
					insertHtml('.product-right .page-title-wrapper', newReviewSection, "afterbegin");
				}
			});


			waitForElement('.reviews-summary-top .rating-point', function () {
				// console.log('working')
				if (document.querySelector('.cro-review-text span')) {
					var ratingPoint = parseFloat(document.querySelector('.reviews-summary-top .rating-point').innerHTML);
					var croReviewSpan = document.querySelector('.cro-review-text span');

					croReviewSpan.innerHTML = ratingPoint;

					if (ratingPoint < 1) {
						document.querySelector('body').classList.add('cro-hide');
					}
				}
			});
		}

		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();