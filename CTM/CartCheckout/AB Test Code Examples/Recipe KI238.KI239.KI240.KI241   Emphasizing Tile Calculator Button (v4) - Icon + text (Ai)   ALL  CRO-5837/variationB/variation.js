(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "croki238";
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

		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}

		var newButton = `<div class="croki238-new-button">
    <div class="croki238-new-button-wrapper">
        <div class="croki238-new-button-wrapper-inner">
            <div class="croki238-new-button-icon">
                <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/CTM/Recipe_KI238_KI239_KI240_KI241/cro_ctm-ki238_1.svg" alt="">
            </div>
            <div class="croki238-new-button-text">How many tiles do I need?</div>
        </div>
    </div>
</div>`

		function init() {
			addClass("body", variation_name);


			waitForElement(".product-info-main #product_addtocart_form .calc-container #calc_btn", function () {
				if (!document.querySelector(".croki238-new-button")) {
					insertHtml(".product-info-main #product_addtocart_form .calc-container #calc_btn", newButton, "afterend");
				}
			});


		}

		function croEventHandkler() {
			live(".croki238-new-button", "click", function () {
				var btn = document.querySelector(".media-info-main .product-add-form .calc-container .btn-calculator")
				if (btn) {
					btn.click();
				}
			});
		}

		if (!window.cro_ki_238) {
			waitForElement('.product-info-main #product_addtocart_form .calc-container #calc_btn', init);
			croEventHandkler();
			window.cro_ki_238 = true;
		}


	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();