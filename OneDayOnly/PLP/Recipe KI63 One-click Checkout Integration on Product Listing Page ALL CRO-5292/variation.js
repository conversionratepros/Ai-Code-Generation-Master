(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro-t-ki62";
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
			function addEvent(el, type, handler) {
				if (el.attachEvent) el.attachEvent("on" + type, handler);
				else el.addEventListener(type, handler);
			}
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

		function innerHTMLContent(selector, content) {
			var el = document.querySelector(selector);
			if (el) {
				el.innerHTML = content;
			}
		}

		function innerChildContent(selector, childNumber, content) {
			var el = document.querySelector(selector);
			if (el.hasChildNodes()) {
				el.childNodes[childNumber].textContent = content;
			}
		}

		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}

		function toggleClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.toggle(cls);
			}
		}

		function removeClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.contains(cls) && el.classList.remove(cls);
			}
		}

		function scroll(click, selector) {
			click.addEventListener('click', function (event) {
				event.preventDefault();
				var target = document.querySelector(selector);
				if (target) {
					window.scrollTo({
						top: target.getBoundingClientRect().top + window.scrollY,
						behavior: 'smooth'
					});
				}
			});
		}


		var buyBtn = `<div class="cro-ki62-buyNowBtn" style="display: none;">
        <div class="cro-ki62-buyNowBtn-wrapper">
            <div class="cro-ki62-buyNowBtn-inner">
                <!-- <div class="cro-ki62-buyNowBtn-cartBtn">
                    <div class="cro-ki62-buyNowBtn-cartIcon">
                        <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/Recipe_KI62/cro_ki62-cart+.svg"
                            alt="">
                    </div>
                    <div class="cro-ki62-buyNowBtn-cartContent">
                        <span>Add to cart</span>
                    </div>
                </div> -->
                <div class="cro-ki62-buyNowBtn-buyBtn">
                    <!-- <div class="cro-ki62-buyNowBtn-buyIcon">
                        <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/Recipe_KI62/cro_ki62-buy.svg"
                            alt="">
                    </div> -->
                    <div class="cro-ki62-buyNowBtn-buyContent">
                        <span>BUY IT NOW!</span>
                    </div>
                </div>
            </div>
        </div>
</div>`;



		function init() {
			addClass("body", variation_name);

			var doneTypingInterval = 3000;  //time in ms, 5 seconds for example
			var intervalCallAgain = setInterval(function () {
				addClass("body", variation_name);
			}, 400);

			//start the countdown
			var Timer = setTimeout(function () {
				clearInterval(intervalCallAgain);
			}, doneTypingInterval);



		}

		function croEventHandkler() {
			live('button[title="Add to cart"]', 'click', function () {
				console.log('click')
					waitForElement('.modal .unbxd-addToCart', function () {
						var cartClicked = document.querySelector('.modal .unbxd-addToCart');
						if (cartClicked) {
							var doneTypingInterval = 3000;  //time in ms, 5 seconds for example
							var intervalCallAgain = setInterval(function () {
								if (!document.querySelector(".cro-ki62-buyNowBtn")) {
									insertHtml('.modal .unbxd-addToCart', buyBtn, "afterend");
								}
							}, 400);

							//start the countdown
							var Timer = setTimeout(function () {
								clearInterval(intervalCallAgain);
							}, doneTypingInterval);

						}
					});
			});

			live('.cro-ki62-buyNowBtn-buyBtn', 'click', function () {
				waitForElement('.modal .unbxd-addToCart', function () {
					var cartClicked = document.querySelector('.modal .unbxd-addToCart');
					if (cartClicked) {
						checkObserver();
						setTimeout(function () {
							cartClicked.click();
						}, 400)
					}
				});
			});
		}

		function checkObserver() {
			// Observe the cart button (always in DOM). When cart is empty the badge div may not exist,
			// so observing the button catches both: badge appearing (first add) and count changing (later adds).
			var buttonSelector = 'button[aria-label="Toggle cart"]';
			var badgeSelector = 'button[aria-label="Toggle cart"] div[color="white"]';
			var observer = null;

			function initObserver(targetNode) {
				if (!targetNode) return;

				if (observer) observer.disconnect();

				var config = {
					characterData: true,
					subtree: true,
					childList: true
				};

				// For button: track any change inside (badge added or count text changed)
				var lastValue = (document.querySelector(badgeSelector) || targetNode).textContent.trim();

				observer = new MutationObserver(function () {
					var badgeEl = document.querySelector(badgeSelector);
					var newValue = (badgeEl || targetNode).textContent.trim();
					if (newValue !== lastValue) {
						console.log("Cart updated:", newValue);
						document.body.classList.add('cro_loading');
						window.location.href = 'https://www.onedayonly.co.za/checkout';
						lastValue = newValue;
					}
				});

				observer.observe(targetNode, config);
				console.log("✅ Watching cart:", buttonSelector);
			}

			// Cart button is always present – attach observer immediately so we're ready before add-to-cart runs
			var cartBtn = document.querySelector(buttonSelector);
			if (cartBtn) {
				initObserver(cartBtn);
			} else {
				var checkInterval = setInterval(function () {
					var el = document.querySelector(buttonSelector);
					if (el) {
						clearInterval(checkInterval);
						initObserver(el);
					}
				}, 100);
				setTimeout(function () { clearInterval(checkInterval); }, 5000);
			}
		}



		if (!window.cro_t_ki_62) {
			croEventHandkler();
			window.cro_t_ki_62 = true;
		}

		waitForElement('body', init);
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})()