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
		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}
		function listener() {
			/* These are the modifications: */
			window.addEventListener('locationchange', function () {
				waitForElement('body', init);
			});
			history.pushState = (f => function pushState() {
				var ret = f.apply(this, arguments);
				window.dispatchEvent(new Event('pushstate'));
				window.dispatchEvent(new Event('locationchange'));
				return ret;
			})(history.pushState);
			history.replaceState = (f => function replaceState() {
				var ret = f.apply(this, arguments);
				window.dispatchEvent(new Event('replacestate'));
				window.dispatchEvent(new Event('locationchange'));
				return ret;
			})(history.replaceState);
			window.addEventListener('popstate', () => {
				window.dispatchEvent(new Event('locationchange'))
			});
		}

		var newIcon = `<div class="cro-t-53-card-icon">
        <div class="cro-t-53-card-icon-wrapper">
            <div class="cro-t-53-card-icon-img">
                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/cro-t-53-card-icon.png" alt=""
                    class="cro-card-icon">
            </div>
            <div class="cro-t-53-card-icon-text">
                <span>Add To Cart</span>
            </div>
        </div>
    					</div>`


		/* Variation Init */
		function init() {
			addClass('body', 'cro-t-53')

			waitForElement('.catalog-category-view .column.main .products.product-items li.item.product-item .product-item-info .product-item-photo .product-item-details', function () {
				document.querySelectorAll(".catalog-category-view .column.main .products.product-items li.item.product-item .product-item-info .product-item-photo .product-item-details").forEach(function (e) {
					var newInner = e.querySelector('.product-item-details-action');
					if (!e.querySelector('.cro-t-53-card-icon')) {
						newInner.insertAdjacentHTML('afterend', newIcon);
					}
				});
			});
		}

		function eventHandler() {
			live(".cro-t-53-card-icon", "click", function () {
				var cardClick = this.closest('.product-item-details')
				cardClick.querySelector('.actions-primary [title="Add to Cart"]') && cardClick.querySelector('.actions-primary [title="Add to Cart"]').click()
			})
		}


		if (!window.cro13EventHandler) {
			eventHandler();
			window.cro13EventHandler = true;
			listener()
		}

		/* Initialise variation */
		waitForElement('body', init);


	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();