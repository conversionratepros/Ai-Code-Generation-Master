(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "";
		var pathCheck = window.location.pathname;
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
		function live(selector, event, callback, context) {
			// helper for enabling IE 8 event bindings
			function addEvent(el, type, handler) {
				if (el.attachEvent) el.attachEvent("on" + type, handler);
				else el.addEventListener(type, handler);
			}
			// matches polyfill
			this &&
				this.Element &&
				(function (ElementPrototype) {
					ElementPrototype.matches =
						ElementPrototype.matches ||
						ElementPrototype.matchesSelector ||
						ElementPrototype.webkitMatchesSelector ||
						ElementPrototype.msMatchesSelector ||
						function (selector) {
							var node = this,
								nodes = (node.parentNode || node.document).querySelectorAll(selector),
								i = -1;
							while (nodes[++i] && nodes[i] != node);
							return !!nodes[i];
						};
				})(Element.prototype);
			// live binding helper using matchesSelector
			function live(selector, event, callback, context) {
				addEvent(context || document, event, function (e) {
					var found,
						el = e.target || e.srcElement;
					while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
					if (found) callback.call(el, e);
				});
			}
			live(selector, event, callback, context);
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
		function removeClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.contains(cls) && el.classList.remove(cls);
			}
		}
		var newpart = ` <div class="cro-new-section-move">
        <div class="cro-new-section-move-wrapper">
            
        </div>
        </div>`

		var htmlString = `
            <li class="cro-install vas-modal_button">
  <div class="vas-modal_icon"> <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/install%201.png" alt=""> </div>
  <div class="vas-modal-title"> <span>How to install</span> </div>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.82841 2.99475C8.7289 2.99478 8.63167 3.02449 8.54914 3.08008C8.46661 3.13568 8.40255 3.21464 8.36515 3.30685C8.32775 3.39906 8.31871 3.50033 8.33919 3.59771C8.35966 3.69509 8.40873 3.78414 8.4801 3.85347L12.2933 7.66663H2.50029C2.43403 7.66569 2.36825 7.67793 2.30676 7.70264C2.24528 7.72734 2.18932 7.76402 2.14213 7.81055C2.09495 7.85707 2.05748 7.9125 2.03191 7.97363C2.00633 8.03476 1.99316 8.10036 1.99316 8.16663C1.99316 8.23289 2.00633 8.29849 2.03191 8.35962C2.05748 8.42075 2.09495 8.47618 2.14213 8.52271C2.18932 8.56923 2.24528 8.60591 2.30676 8.63062C2.36825 8.65532 2.43403 8.66756 2.50029 8.66663H12.2933L8.4801 12.4798C8.43212 12.5259 8.39381 12.581 8.36742 12.6421C8.34102 12.7032 8.32708 12.7689 8.32641 12.8354C8.32573 12.9019 8.33833 12.9679 8.36348 13.0295C8.38862 13.0911 8.4258 13.147 8.47284 13.1941C8.51988 13.2411 8.57583 13.2783 8.63742 13.3034C8.69901 13.3286 8.76499 13.3412 8.83151 13.3405C8.89803 13.3398 8.96375 13.3259 9.02481 13.2995C9.08588 13.2731 9.14106 13.2348 9.18713 13.1868L13.8538 8.52014C13.9475 8.42637 14.0002 8.29921 14.0002 8.16663C14.0002 8.03404 13.9475 7.90688 13.8538 7.81311L9.18713 3.14644C9.14053 3.09845 9.08477 3.06029 9.02315 3.03424C8.96153 3.00818 8.89531 2.99475 8.82841 2.99475Z" fill="#595959"></path>
  </svg>
</li>`
		var popup = `<div class="cro-t-113-lightBox">
        <div class="cro-t-113-overlay"></div>
        <div class="cro-t-113-modal">
            <div class="cro-recipe-113-model-open">
            <div class="cro-t-113-cross">
            <img class="cro-t-113-cross-img" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/times.png"
            alt="">
            </div>
                <div class="cro-recipe-113-modal-top-part">
                    <div class="cro-recipe-113-img-part">
                    <div class="cro-recipe-113-img-new-part">
                        <img class="cro-recipe-113-img"
                            src="" alt="">
                            </div>
                    </div>
                    <div class="cro-recipe-113-text-part">
                        <p class="cro-top-header-text">To secure your tile guarantee</p>
                        <p class="cro-top-header-text-sub">Use [Product name] Installation products</p>
                        <div class="cro-card-icon-text">
                            <img class="cro-card-icon"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/shopping-cart%20(1).png"
                                alt="">
                            <p class="cro-card-text">Add all items to cart</p>
                        </div>
                        <p class="cro-recipe-113-sub-text-last">Tiles & Installation products will be added to your
                            cart*</p>
                    </div>
                </div>
                <div class="cro-recipe-113-modal-lower-part">
                    <div class="cro-recipe-113-modal-lower">
                        <p class="cro-recipe-113-modal-lower-text">How to install tiles</p>
                    </div>
                </div>
            </div>
        </div>
                    </div>`;
		/* Variation Init */
		function init() {
			addClass('body', 'cro-t-113')
			addClass('body', 'cro-t-113-hide')
			if (!document.querySelector('.cro-t-113-modal')) {
				insertHtml('#html-body', popup, "afterbegin");
				waitForElement('.tab-content#HowToInstall', function () {
					document.querySelector('.cro-recipe-113-modal-lower-part').insertAdjacentElement('afterend', document.querySelector('.tab-content#HowToInstall'))
				});
			}
			waitForElement('.pdp-vas-modals', function () {
				if (!document.querySelector('.cro-install')) {
					insertHtml('.pdp-vas-modals', htmlString, "afterbegin");
				}
			});
			waitForElement('.cro-t-113-lightBox', function () {
				if (!document.querySelector('.cro-new-section-move')) {
					insertHtml('.cro-t-113-lightBox', newpart, "afterend");
				}
			});
			waitForElement('.original-slider .gallery--container .gallery--item:nth-child(1)', function () {
				console.log(document.querySelector('.original-slider .gallery--container .gallery--item:nth-child(1) img').src)
				var controlimg = document.querySelector('.original-slider .gallery--container .gallery--item:nth-child(1) img').src
				var newimg = document.querySelector('.cro-recipe-113-img')
				newimg.src = controlimg
			});
			// .product-info-main [data-ui-id="page-title-wrapper"]
			waitForElement('.product-info-main [data-ui-id="page-title-wrapper"]', function () {
				console.log(document.querySelector('.product-info-main [data-ui-id="page-title-wrapper"]').innerHTML)
				var controlHeading = document.querySelector('.product-info-main [data-ui-id="page-title-wrapper"]').innerHTML
				var newHeading = document.querySelector('.cro-top-header-text-sub')
				newHeading.innerHTML = 'Use ' + controlHeading + ' Installation products'
			});
		}
		function t_130() {
			addClass('body', 'cro-t-130')
			// html body.cro-t-130.catalog-product-view .vas-modals-container .pdp-vas-modals .vas-modal_button.modal_2 .vas-modal-title
			waitForElement('.vas-modals-container .pdp-vas-modals .vas-modal_button.modal_2 .vas-modal-title', function () {
				document.querySelector('.vas-modals-container .pdp-vas-modals .vas-modal_button.modal_2 .vas-modal-title').innerHTML = 'Fast Nationwide delivery';
			});
		}
		function checkListners() {
			live('.cro-card-icon-text', 'click', function (e) {
				document.querySelector('.media-info-main .box-tocart .actions #product-addtocart-button').click()
				setTimeout(function () {
					addClass('body', 'cro-t-113-hide')
				}, 4000)
				removeClass('html', 'cro-scroll-hide')
			})
			live('.cro-install.vas-modal_button', 'click', function (e) {
				e.preventDefault();
				removeClass('body', 'cro-t-113-hide')
				addClass('html', 'cro-scroll-hide')
			})
			live(".cro-t-113-cross-img, .cro-t-113-overlay", "click", function () {
				addClass('body', 'cro-t-113-hide')
				removeClass('html', 'cro-scroll-hide')
			})
		}

		if (pathCheck.includes('-tile')) {
			waitForElement('#HowToInstall', function () {
				checkListners();

				if (!document.querySelector('.cro-t-113')) {
					waitForElement('.tab-content#HowToInstall', init);
				}

				waitForElement('body', t_130);
			});
		}
		/* Initialise variation */

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();