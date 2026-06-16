(function () {
	try {
		var debug = 0;
		var variation_name = "cro-t-odo-10225";

		/* ─── Helpers ─────────────────────────────────────────────────────── */

		// Polls at 100ms (not 50ms) — sufficient for modal appearance
		function waitForElement(selector, trigger) {
			var interval = setInterval(function () {
				if (document && document.querySelector(selector)) {
					clearInterval(interval);
					trigger();
				}
			}, 100);
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

		/* ─── HTML template ──────────────────────────────────────────────── */

		var buyNowBtnHtml = [
			'<div class="cro-10225-buy-now-wrap">',
			'<button class="cro-10225-buy-now-btn" type="button">BUY IT NOW!</button>',
			'<p class="cro-10225-buy-now-sub">Take me straight to checkout</p>',
			'</div>'
		].join('');

		/* ─── Body class: apply + hydration restore ──────────────────────── */

		// FIX: single shared interval — cleared and restarted on each SPA navigation
		var restoreInterval = null;

		function applyBodyClass() {
			document.body.classList.add(variation_name);
		}

		function init() {
			applyBodyClass();

			// FIX: Late hydration restore — React/Next.js wipes body classes ~2s after
			// load. Poll for 8s after every init() call to keep the class applied.
			if (restoreInterval) clearInterval(restoreInterval);
			var restoreCount = 0;
			restoreInterval = setInterval(function () {
				applyBodyClass();
				if (++restoreCount >= 26) {        // 26 × 300ms = ~8s
					clearInterval(restoreInterval);
					restoreInterval = null;
				}
			}, 300);
		}

		/* ─── Inject BUY IT NOW (duplicate-injection guard) ─────────────── */

		function injectBuyNowBtn() {
			if (document.querySelector('.cro-10225-buy-now-wrap')) return;
			var atcBtn = document.querySelector('.modal .unbxd-addToCart');
			if (!atcBtn) return;
			atcBtn.insertAdjacentHTML('afterend', buyNowBtnHtml);
		}

		/* ─── Cart observer + timeout fallback ───────────────────────────── */

		// FIX: module-level references so any re-trigger disconnects the previous observer
		var activeObserver = null;
		var observerTimeout = null;

		function disconnectObserver() {
			if (activeObserver) {
				activeObserver.disconnect();
				activeObserver = null;
			}
			if (observerTimeout) {
				clearTimeout(observerTimeout);
				observerTimeout = null;
			}
		}

		function redirectToCheckout() {
			disconnectObserver();
			document.body.classList.add('cro_loading');
			window.location.href = 'https://www.onedayonly.co.za/checkout';
		}

		function checkCartAndRedirect() {
			// FIX: disconnect any previous observer before starting a new one (double-click safe)
			disconnectObserver();

			var buttonSelector = 'button[aria-label="Toggle cart"]';
			var badgeSelector  = 'button[aria-label="Toggle cart"] div[color="white"]';

			function initObserver(targetNode) {
				if (!targetNode) return;

				var lastValue = (document.querySelector(badgeSelector) || targetNode).textContent.trim();

				activeObserver = new MutationObserver(function () {
					var badgeEl  = document.querySelector(badgeSelector);
					var newValue = (badgeEl || targetNode).textContent.trim();
					if (newValue !== lastValue) {
						redirectToCheckout();
					}
				});

				activeObserver.observe(targetNode, { characterData: true, subtree: true, childList: true });

				// FIX: Timeout fallback for signed-out users — clicking ATC while signed
				// out shows a login modal instead of updating the cart badge. Without this
				// the observer would sit forever and the user would be stuck.
				observerTimeout = setTimeout(redirectToCheckout, 10000);
			}

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

		/* ─── Modal close watcher ────────────────────────────────────────── */

		// FIX: disconnect the cart observer and clean up injected HTML when the user
		// closes the modal without clicking BUY IT NOW — prevents a stale observer
		// firing the next time the user naturally adds something to their cart.
		var modalWatchInterval = null;

		function watchModalClose() {
			if (modalWatchInterval) clearInterval(modalWatchInterval);

			modalWatchInterval = setInterval(function () {
				if (!document.querySelector('.modal .unbxd-addToCart')) {
					clearInterval(modalWatchInterval);
					modalWatchInterval = null;
					disconnectObserver();
					var wrap = document.querySelector('.cro-10225-buy-now-wrap');
					if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
				}
			}, 300);

			// Safety ceiling — clear regardless after 30s
			setTimeout(function () {
				if (modalWatchInterval) {
					clearInterval(modalWatchInterval);
					modalWatchInterval = null;
				}
			}, 30000);
		}

		/* ─── Event binding ──────────────────────────────────────────────── */

		function bindEvents() {
			// FIX: SPA navigation — global.js already wraps history.pushState and
			// dispatches 'locationchange'. Listen here (don't re-wrap) to restore
			// the body class on every client-side page change.
			window.addEventListener('locationchange', init);
			window.addEventListener('popstate', init);

			// Product card ATC click → wait for modal → inject BUY IT NOW
			live('button[title="Add to cart"]', 'click', function () {
				waitForElement('.modal .unbxd-addToCart', function () {
					injectBuyNowBtn();
					watchModalClose();
				});
			});

			// BUY IT NOW click → start cart observer → trigger add to cart
			live('.cro-10225-buy-now-btn', 'click', function () {
				var atcBtn = document.querySelector('.modal .unbxd-addToCart');
				if (atcBtn) {
					checkCartAndRedirect();
					setTimeout(function () { atcBtn.click(); }, 400);
				}
			});
		}

		/* ─── Entry point: everything inside guard ───────────────────────── */

		// FIX: init() moved inside the guard so it never runs twice on duplicate
		// script loads. live() listeners are also safely bound only once.
		if (!window.cro_10225) {
			window.cro_10225 = true;
			init();
			bindEvents();
		}

	} catch (e) {
		if (debug) console.log(e, 'error in Test ' + variation_name);
	}
})();
