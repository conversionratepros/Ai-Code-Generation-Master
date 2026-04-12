(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "croki89";
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


		var heroBanner = `<section class="croki89-ab-hero" style="display: none;">

  <!-- Background Image -->
  <div class="croki89-ab-hero-bg">
    <img src="https://lexiehearing.com/uploads/final_hero1_37dca6a716.jpg" alt="hero background">
	<img class="prod" src="https://lexiehearing.com/uploads/product_a04c65d62b.png" alt="hero background" style="
    z-index: 1;
    position: absolute;
    right: 20px;
    width: 450px;
    bottom: 0;
">
  </div>

  <div class="croki89-ab-container">

    <!-- Content -->
    <div class="croki89-ab-hero-content">
        <div class="croki89-ab-hero-header">
            <h1>Don't miss another moment</h1>
            <h2>Lexie B2 Plus Hearing Aids</h2>
        </div>
        <div class="croki89-ab-hero-Sub-header">
            <p>
                Experience natural hearing on your terms with easy, self-fit setup at home.
            </p>
        </div>
    </div>

    <!-- Product Image -->
    <div class="croki89-ab-hero-product">
      <!-- <img alt="Lexie B2 Plus hearing aids showcase." src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fb2-plus.db725189.webp&amp;w=3840&amp;q=75"> -->
    </div>

  </div>
</section>`;

		var heroBannerMobile = `<section class="croki89-ab-hero-mobile" style="display: none;">
      <div class="croki89-ab-hero-mobile-container">
          <div class="croki89-ab-hero-header-mobile">
                      <h1>Don't miss another moment</h1>
                      <h2>Lexie B2 Plus Hearing Aids</h2>
          </div>
          <div class="croki89-ab-hero-bg-mobile-image">
                <div class="croki89-ab-hero-bg-mobile">
    <img src="https://lexiehearing.com/uploads/Hero_98633c2f57.png" alt="hero background">
                  </div>
                  <div class="croki89-ab-hero-bg-mobile-2">
    <img src="https://lexiehearing.com/uploads/product_a04c65d62b.png" alt="hero background">
          </div>
          </div>

          <div class="croki89-ab-hero-content-mobile">
        
        <div class="croki89-ab-hero-Sub-header">
            <p>
                Experience natural hearing on your terms with easy, self-fit setup at home.
            </p>
        </div>
        <div class="croki89-ab-price-section">
            <span class="croki89-ab-price"><sup>$</sup>999</span>
        </div>
        <div class="croki89-ab-btn-section">
            <div class="ab-btn">Buy Lexie B2 Plus</div>
        </div>
    </div>

          

      </div>
</section>`;

		var abTrust = `<section class="croki89-ab-trust" style="display: none;">
  <div class="croki89-ab-trust-badge">
    <img src="https://lexiehearing.com/uploads/badge_ac163b9cf5.png" alt="">
  </div>
  <div class="croki89-ab-trust-left mobile" style="display: none;">
      <h3>Trusted by over</h3>
      <h2>200,000</h2>
      <p>ears worldwide</p>
    </div>

  <div class="croki89-ab-trust-container">

    <div class="croki89-ab-trust-left">
      <h3>Trusted by over</h3>
      <h2>200,000</h2>
      <p>ears worldwide</p>
    </div>

    <div class="croki89-ab-trust-right">
      <ul>
        <li class="cro-icon-1"> <img src="https://lexiehearing.com/_next/static/media/warranty.68978651.webp" alt="Warranty icon"><div class="croki89-ab-trust-right-text">
          1-year warranty<sup>1</sup></div></li>
        <li><img src="https://lexiehearing.com/uploads/Icon_badge_e8971a5c37.png" alt="">
          <div class="croki89-ab-trust-right-text">45-day trial period<sup>1</sup></div></li>
        <li> <img src="https://lexiehearing.com/uploads/Icon_phone_be4bb558b6.png" alt=""> <div class="croki89-ab-trust-right-text">
            Award-winning customer support
        </div></li>
        <li> <img src="https://lexiehearing.com/uploads/Icon_health_3102ea92e6.png" alt=""> <div class="croki89-ab-trust-right-text">
            FSA/HSA eligible
        </div></li>
      </ul>
    </div>

  </div>
</section>`;


		var newFotter = `<div class="croki89-TCs-Apply-section" style="display: none;">
  <div class="croki89-TCs-Apply-text">
   <a class="croki89-TCs-Apply-link" href="/us/terms-web">T&Cs Apply</a>
  </div>
</div>`;


		function trigger() {
			var doneTypingInterval = 7000;  //time in ms, 5 seconds for example
			var intervalCallAgain = setInterval(function () {
				waitForElement('body', init);
			}, 400);

			//start the countdown
			var Timer = setTimeout(function () {
				clearInterval(intervalCallAgain);
			}, doneTypingInterval);

		}

		function init() {
			addClass("body", variation_name)

			waitForElement('section[data-cy="trust-callout-banner"]', function () {
				if (!document.querySelector(".croki89-ab-trust")) {
					insertHtml('section[data-cy="trust-callout-banner"]', abTrust, "afterend");
				}
			});

			waitForElement('#lander-footer .mx-auto', function () {
				if (!document.querySelector(".croki89-TCs-Apply-section")) {
					insertHtml('#lander-footer .mx-auto', newFotter, "afterbegin");
				}
			});

			// --------------------
			// section.relative.bg-white section > div
			var img = `  <div class="croki89-ab-hero-bg">
				<img src="https://lexiehearing.com/uploads/final_hero1_37dca6a716.jpg" alt="hero background">
				<img class="prod" src="https://lexiehearing.com/uploads/product_a04c65d62b.png" alt="hero background" style="z-index: 1; position: absolute; right: 20px;width: 450px;bottom: 0;">
			</div>`;

			waitForElement('section.relative.bg-white section > div', function () {
				if (!document.querySelector(".croki89-ab-hero-bg")) {
					insertHtml('section.relative.bg-white section > div', img, "afterbegin");
				}
			});

			var heroSection = `<div class="croki89-ab-container">
    <div class="croki89-ab-hero-content">
        <div class="croki89-ab-hero-header">
            <h1>Don't miss another moment</h1>
            <h2>Lexie B2 Plus Hearing Aids</h2>
        </div>
        <div class="croki89-ab-hero-Sub-header">
            <p>
                Experience natural hearing on your terms with easy, self-fit setup at home.
            </p>
        </div>
    </div>

    <!-- Product Image -->
    <div class="croki89-ab-hero-product">
      <!-- <img alt="Lexie B2 Plus hearing aids showcase." src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fb2-plus.db725189.webp&amp;w=3840&amp;q=75"> -->
    </div>
  </div>`;

			waitForElement('section.relative.bg-white section > div .space-y-8', function () {
				if (!document.querySelector(".croki89-ab-container")) {
					insertHtml('section.relative.bg-white section > div .space-y-8', heroSection, "afterbegin");
				}
			});

			// waitForElement('.mt-6 [data-cy="bose_b2_plus-price"]', function () {
			// 	waitForElement('.croki89-ab-price', function () {
			// 		document.querySelector('.croki89-ab-price').innerHTML = document.querySelector('.mt-6 [data-cy="bose_b2_plus-price"]').innerHTML
			// 	});

			// });

			var mobileDes = ` <div class="croki89-ab-hero-Sub-header croki89-ab-hero-mobile_crp">
            <p>
                Experience natural hearing on your terms with easy, self-fit setup at home.
            </p>
        </div>`;

			// .mt-6 [data-cy="bose_b2_plus-price"]
			// section.relative.bg-white section>div .space-y-8>div.flex.flex-col
			waitForElement('section.relative.bg-white section>div .space-y-8>div.flex.items-center.justify-center', function () {
				if (!document.querySelector(".croki89-ab-hero-mobile_crp")) {
					insertHtml('section.relative.bg-white section>div .space-y-8>div.flex.items-center.justify-center', mobileDes, "afterend");
				}
			});
		}

		function croEventHandkler() {
			live(".croki89-ab-btn-section .ab-btn", "click", function () {
				var btn = document.querySelector('section.relative [data-cy="add-to-cart-button"]')
				if (btn) {
					btn.click();
				}
			});
		}

		if (!window.cro_t_20) {
			croEventHandkler();
			window.cro_t_20 = true;
		}

		waitForElement('body', trigger);
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();