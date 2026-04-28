(function () {
	try {
		var debug = 0;
		var variation_name = "cro_t_20_carousel";

		/* Helpers */
		function waitForElement(selector, trigger) {
			var interval = setInterval(function () {
				if (document && document.querySelector(selector)) {
					clearInterval(interval);
					trigger();
				}
			}, 50);
			setTimeout(function () { clearInterval(interval); }, 15000);
		}

		function live(selector, event, callback, context) {
			function addEvent(el, type, handler) {
				if (el.attachEvent) el.attachEvent("on" + type, handler);
				else el.addEventListener(type, handler);
			}
			this && this.Element && (function (ElementPrototype) {
				ElementPrototype.matches =
					ElementPrototype.matches ||
					ElementPrototype.matchesSelector ||
					ElementPrototype.webkitMatchesSelector ||
					ElementPrototype.msMatchesSelector ||
					function (selector) {
						var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
						while (nodes[++i] && nodes[i] != node);
						return !!nodes[i];
					};
			})(Element.prototype);
			function _live(selector, event, callback, context) {
				addEvent(context || document, event, function (e) {
					var found, el = e.target || e.srcElement;
					while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
					if (found) callback.call(el, e);
				});
			}
			_live(selector, event, callback, context);
		}

		function insertHtml(selector, content, position) {
			var el = document.querySelector(selector);
			if (!position) position = "afterend";
			if (el && content) el.insertAdjacentHTML(position, content);
		}

		/* ===== Slides content ===== */
		var slidesData = [
			{
				pre: "FARM FRESH",
				h: "Best in fresh",
				sh: "Guided by the seasons, our farm-grown and locally sourced fresh produce is picked and packed at peak quality.",
				link: "https://shop.babylonstoren.com/za/t/138/categories/farm-fresh",
				bg: "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe_KI4/Recipe_KI4_Homepage_Hero_Image_Update_ALL_CRO6286_1.png"
			},
			{
				pre: "PANTRY",
				h: "Top-shelf staples",
				sh: "Gift-worthy pantry favourites from the farm and like-minded local artisans.",
				link: "https://shop.babylonstoren.com/za/t/5/categories/pantry",
				bg: "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe_KI4/Recipe_KI4_Homepage_Hero_Image_Update_ALL_CRO6286_3.png"
			},
			{
				pre: "GIFTING",
				h: "The only way to gift",
				sh: "Curated gifts for every occasion – big or small – tastefully wrapped and delivered anywhere in South Africa.",
				link: "https://shop.babylonstoren.com/za/t/10/categories/gifting",
				bg: "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe_KI4/Recipe_KI4_Homepage_Hero_Image_Update_ALL_CRO6286_2.png"
			},
			{
				pre: "WINE",
				h: "Worth the pour",
				sh: "Every bottle carries a story – from bold reds to vibrant whites, each wine begins in our gardens, shaped by curiosity and crafted with care.",
				link: "https://shop.babylonstoren.com/za/t/4/categories/wine",
				bg: "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe_KI4/Recipe_KI4_Homepage_Hero_Image_Update_ALL_CRO6286_4.png"
			}
		];

		function buildCarouselHtml() {
			var dots = slidesData.map(function (_, i) {
				return '<button class="cro20-dot" type="button" aria-label="Go to slide ' + (i + 1) + '"></button>';
			}).join("");

			var slides = slidesData.map(function (s, i) {
				return '\
<section class="cro20-slide" role="group" aria-roledescription="slide" aria-label="'+ (i + 1) + ' of ' + slidesData.length + '">\
  <div class="cro20-media" style="'+ (s.bg ? ('background-image:url(' + s.bg + ');') : '') + '"></div>\
  <div class="cro20-copy">\
    <div>\
      <div class="cro20-pre">'+ s.pre + '</div>\
      <h2 class="cro20-h">'+ s.h + '</h2>\
      <p class="cro20-sh">'+ s.sh + '</p>\
      <div class="cro_mobile_btn_wrapper"><a class="cro20-cta" href="'+ s.link + '" aria-label="' + s.pre + ' – shop now">SHOP NOW</a><span class="cro20_mobile_arrow"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.5 4.5L16 12l-7.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></div>\
    </div>\
  </div>\
</section>';
			}).join("");

			return '\
<div class="cro20-wrap" style="display: none;">\
  <div class="cro20-carousel" id="cro20-carousel" role="region" aria-label="Category carousel">\
    <div class="cro20-track" id="cro20-track" aria-live="polite">'+ slides + '</div>\
    <div class="cro_btn_wrapper">\
      <button class="cro20-arrow cro20-prev" id="cro20-prev" aria-label="Previous">\
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15.5 4.5L8 12l7.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>\
      </button>\
      <div class="cro20-indicators" id="cro20-indicators" aria-label="Slide indicators">'+ dots + '</div>\
      <button class="cro20-arrow cro20-next" id="cro20-next" aria-label="Next">\
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.5 4.5L16 12l-7.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>\
      </button>\
    </div>\
  </div>\
</div>';
		}

		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}
		/* ===== Init ===== */
		function init() {
			addClass('body', 'cro_t_20_carousel');

			var mountBeforeSelector = "x-channel-home x-page-layout .channel-content > x-section-with-image:nth-child(1)";

			if (!document.querySelector('.cro20-wrap')) {
				insertHtml(mountBeforeSelector, buildCarouselHtml(), "afterend");
			}


			var track = document.getElementById("cro20-track");
			var prevBtn = document.getElementById("cro20-prev");
			var nextBtn = document.getElementById("cro20-next");
			var indicators = document.getElementById("cro20-indicators");
			var dots = indicators ? Array.prototype.slice.call(indicators.children) : [];
			var slides = track ? Array.prototype.slice.call(track.children) : [];
			var total = slides.length;
			var index = 0;

			function setActive(i) {
				slides.forEach(function (s, idx) {
					if (idx === i) s.classList.add("cro20-active");
					else s.classList.remove("cro20-active");
				});
				if (track) track.classList.add("cro20-ready");
			}

			function updateUI() {
				setActive(index);
				dots.forEach(function (d, i) {
					d.setAttribute("aria-current", i === index ? "true" : "false");
				});

				// Left arrow disabled on first frame
				if (prevBtn) prevBtn.setAttribute("aria-disabled", (index === 0) ? "true" : "false");

				// Right arrow always active (infinite)
				if (nextBtn) nextBtn.removeAttribute("aria-disabled");
			}

			function goTo(i) {
				// if last slide, wrap to first
				if (i >= total) {
					index = 0;
				} else if (i < 0) {
					index = 0; // disable going backward before first
				} else {
					index = i;
				}
				updateUI();
			}

			if (prevBtn) prevBtn.addEventListener("click", function () {
				if (index > 0) goTo(index - 1);
			});

			if (nextBtn) nextBtn.addEventListener("click", function () {
				goTo(index + 1);
			});

			if (indicators) {
				live("#cro20-indicators .cro20-dot", "click", function () {
					var idx = dots.indexOf(this);
					if (idx > -1) goTo(idx);
				}, indicators);
			}

			var region = document.getElementById("cro20-carousel");
			if (region) {
				region.tabIndex = 0;
				region.addEventListener("keydown", function (e) {
					if (e.key === "ArrowLeft" && index > 0) goTo(index - 1);
					if (e.key === "ArrowRight") goTo(index + 1);
				});
			}

			updateUI();
		}

		// .cro20-media

		function croEventHandkler() {
			live(".cro20_mobile_arrow", "click", function () {
				document.querySelector('#cro20-next') && document.querySelector('#cro20-next').click();
			});
		}

		if (!window.cro_t_20) {
			croEventHandkler();
			window.cro_t_20 = true;
		}

		waitForElement('x-channel-home x-page-layout .channel-content > x-section-with-image:nth-child(1)', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test " + variation_name);
	}
})();