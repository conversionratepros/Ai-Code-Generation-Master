(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro_5319";
		
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

		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}

		/* Experiment specific functions */
		function updateHeroText() {
			var h2Element = document.querySelector('.cro-t-congratulations h2');
			if (h2Element) {
				h2Element.textContent = 'No matter your credit score, this is your first step toward financial freedom.';
				if (debug) console.log(variation_name + ': Updated H2 text');
			} else {
				if (debug) console.log(variation_name + ': H2 element not found');
			}
		}

		function addReassuringSectionBeforeIcons() {
			var iconsSection = document.querySelector('#icons');
			if (!iconsSection) {
				if (debug) console.log(variation_name + ': Icons section not found');
				return;
			}

			var reassuringSectionHTML = 
				'<section class="' + variation_name + '-reassuring-section">' +
					'<div class="container">' +
						'<h2>Not sure where to begin your debt-free journey?</h2>' +
						'<p>No matter where you\'re starting from, we\'re here for you every step of the way. From loans to debt consolidation to credit counselling, let\'s find the right service for you.</p>' +
					'</div>' +
				'</section>';

			iconsSection.insertAdjacentHTML('beforebegin', reassuringSectionHTML);
			
			if (debug) console.log(variation_name + ': Successfully added reassuring section before icons');
		}

		/* Variation Init */
		function init() {
			addClass("body", variation_name);
			
			updateHeroText();
			addReassuringSectionBeforeIcons();
			
			if (debug) console.log(variation_name + ': Implementation complete');
		}

		/* Initialise variation */
		waitForElement('.cro-t-congratulations', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();