(function () {
	try {
		var debug = 1;
		var variation_name = "CRP_ARC_SW_Brand_Banner_Below";

		/* ---------------- helper functions ---------------- */

		function waitForElement(selector, trigger) {
			var interval = setInterval(function () {
				if (document && document.querySelector(selector)) {
					clearInterval(interval);
					trigger();
				}
			}, 50);
			setTimeout(function () {
				clearInterval(interval);
			}, 15000);
		}

		function addClass(selector, className) {
			var el = document.querySelector(selector);
			if (el) el.classList.add(className);
		}

		/* ---------------- element finders ---------------- */

		function findProductListContainer() {
			var multiForm = document.querySelector('#multiForm');
			if (!multiForm) return null;
			return multiForm.closest('#content > .content-container');
		}

		function getContainersBeforeProductList(productListContainer) {
			var all = document.querySelectorAll('#content > .content-container');
			var result = [];
			for (var i = 0; i < all.length; i++) {
				if (all[i] === productListContainer) break;
				result.push(all[i]);
			}
			return result;
		}

		/* ---------------- main logic ---------------- */

		function moveElements() {
			// Double-injection guard
			if (document.body.classList.contains('cro-12345-done')) return;
			document.body.classList.add('cro-12345-done');

			var productListContainer = findProductListContainer();
			if (!productListContainer) return;

			var containersBefore = getContainersBeforeProductList(productListContainer);

			if (debug) console.log(variation_name, 'containers before product list:', containersBefore.length);

			// Move every content-bearing container (in original order) to after the product list.
			// Empty spacers (no text, no img) get hidden in place instead.
			var anchor = productListContainer;
			for (var i = 0; i < containersBefore.length; i++) {
				var c = containersBefore[i];
				var hasContent = !!(c.textContent.trim() || c.querySelector('img'));
				if (hasContent) {
					anchor.insertAdjacentElement('afterend', c);
					anchor = c;
				} else {
					c.classList.add('cro-12345-spacer');
				}
			}
		}

		var EXCLUDED_BRANDS = [
			'/brands/dior',
			'/brands/chanel',
			'/brands/sol-de-janeiro',
			'/brands/drunk-elephant',
			'/brands/nars',
			'/brands/maison-margiela',
			'/brands/kylie-cosmetics',
			'/brands/kylie-cosmetics-by-kylie-jenner',
			'/brands/dolce-gabbana',
			'/brands/bvlgari'
		];

		function isExcluded(path) {
			for (var i = 0; i < EXCLUDED_BRANDS.length; i++) {
				if (path === EXCLUDED_BRANDS[i] || path.indexOf(EXCLUDED_BRANDS[i] + '/') === 0) {
					return true;
				}
			}
			return false;
		}

		function init() {
			var path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
			if (path.indexOf('/brands/') !== 0 || isExcluded(path)) return;

			addClass('body', variation_name);
			waitForElement('#multiForm', moveElements);
		}

		waitForElement('body', init);
	} catch (e) {
		console.log(e, 'error in Test');
	}
})();
