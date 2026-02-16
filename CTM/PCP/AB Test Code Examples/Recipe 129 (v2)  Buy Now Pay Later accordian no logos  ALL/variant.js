(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro-ctm-129-buyNow";

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
		
		function toggleClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.toggle(cls);
			}
		}

		function priceCheck_129() {
			var priceEl = document.querySelector('.product-info-price .special-price .price-wrapper .price');

			if (!priceEl) {
				priceEl = document.querySelector('.product-info-price .price-wrapper .price');
			}

			var payflexEl = document.querySelector('.cro-129-dropDown-payflex .cro-129-dropDown-content p span');
			var payJustEl = document.querySelector('.cro-129-dropDown-payJustNow .cro-129-dropDown-content p span');

			if (priceEl && payflexEl) {
				var priceText = priceEl.textContent;
				var priceValue = parseFloat(priceText.replace(/[^0-9.]/g, ''));
				var divided = (priceValue / 4).toFixed(2);
				payflexEl.textContent = 'R' + divided;
			}

			if (priceEl && payJustEl) {
				var priceText = priceEl.textContent;
				var priceValue = parseFloat(priceText.replace(/[^0-9.]/g, ''));
				var divided = (priceValue / 3).toFixed(2);
				payJustEl.textContent = 'R' + divided;
			}
		}

        var cro_129_accordion = `<div class="cro-129-accordion">
            <div class="cro-129-accordion-wrapper">
                <div class="cro-129-accordion-inner">
                    <div class="cro-129-accordion-content">
                        <div class="cro-129-accordion-header">
                            <p>Buy Online Now. Pay Later, Interest Free.</p>
                        </div>
                    </div>
                    <div class="cro-129-accordion-img">
                        <div class="cro-129-accordion-arrowImg">
                            <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/CTM/Recipe+129+%7C+Buy+Now+Pay+later+accordian+%7C+ALL+%7C+CRO-3228/ctm_Recipe+129+_+Buy+Now+Pay+later+accordian+_+ALL.svg" alt="">
                        </div>
                    </div>
                </div>
                <div class="cro-129-accordion-dropDown">
                    <div class="cro-129-dropDown">
                        <div class="cro-129-dropDown-payflex">
                            <div class="cro-129-dropDown-content">
                                <p><b>3</b> interest-free payments<span class="cro-129-hideAmount">of <span>R0.00</span> with</span></p>
                            </div>
                            <div class="cro-129-dropDown-img">
                                <div class="cro-129-dropDown-imgPay">
                                    <img src="https://www.ctm.co.za/static/version1750330608/frontend/Vectra/ctmkenya/en_US/images/icons/payflex-payments-logo.png" alt="">
                                </div>
                                <div class="cro-129-dropDown-img-tooltip custom-tooltip-wrapper">
                                    <img src="https://www.ctm.co.za/static/version1750330608/frontend/Vectra/ctmkenya/en_US/images/icons/pdp-info-icon.png" alt="">
                                    <div class="custom-tooltip-text">Select Payflex at checkout</div>
                                </div>
                            </div>
                        </div>
                        <div class="cro-129-dropDown-payJustNow">
                            <div class="cro-129-dropDown-content">
                                <p><b>3</b> interest-free payments<span class="cro-129-hideAmount">of <span>R0.00</span> with</span></p>
                            </div>
                            <div class="cro-129-dropDown-img">
                                <div class="cro-129-dropDown-imgPay">
                                    <img src="https://www.ctm.co.za/static/version1750330608/frontend/Vectra/ctmkenya/en_US/images/icons/logo_black-pjn.png" alt="">
                                </div>
                                <div class="cro-129-dropDown-img-tooltip custom-tooltip-wrapper">
                                    <img src="https://www.ctm.co.za/static/version1750330608/frontend/Vectra/ctmkenya/en_US/images/icons/pdp-info-icon.png" alt="">
                                    <div class="custom-tooltip-text">Select PayJustNow at checkout</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
		
		function init() {
			addClass("body", variation_name);
            addClass("body", 'cro-ctm-129-buyNow-v2');

			waitForElement(".product-info-price", function () {
				if (!document.querySelector(".cro-129-accordion")) {
					insertHtml(".product-info-price", cro_129_accordion, "afterend");
				}

				priceCheck_129();
			});
		}
		
		function croEventHandkler() {
			live(".cro-129-accordion-inner", "click", function () {
				toggleClass("body", "cro-129-dropDownSection");
			});
		}
		
		if (!window.cro_t_ctm_129) {
			croEventHandkler();
			window.cro_t_ctm_129 = true;
		}
		
		waitForElement('.catalog-product-view .product-info-price', init);
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();