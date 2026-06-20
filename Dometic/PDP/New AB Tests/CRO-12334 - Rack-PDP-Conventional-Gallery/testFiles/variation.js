(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "CRO_12334_Rack_PDP_Conventional_Gallery";

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

		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}

		/* ════════════════════════════════════
		   Gallery state
		════════════════════════════════════ */
		var currentIndex = 0;
		var galleryImages = [];

		var SVG_PREV = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
		var SVG_NEXT = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
		var SVG_EXPAND = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3H5C3.9 3 3 3.9 3 5V8M21 8V5C21 3.9 20.1 3 19 3H16M16 21H19C20.1 21 21 20.1 21 19V16M3 16V19C3 20.1 3.9 21 5 21H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

		/* ── Pull images from the control carousel slides ── */
		function extractImages() {
			var slides = document.querySelectorAll('.gallery-wrapper [data-slot="carousel-item"] img');
			var imgs = [];
			slides.forEach(function (img) {
				var src = img.getAttribute('src') || img.src;
				var alt = img.getAttribute('alt') || '';
				if (src) {
					var mainSrc = src.replace(/width=\d+/, 'width=1080');
					var thumbSrc = src.replace(/width=\d+/, 'width=128');
					imgs.push({ main: mainSrc, thumb: thumbSrc, alt: alt });
				}
			});
			return imgs;
		}

		/* ── Build gallery HTML ── */
		function buildGalleryHtml(images) {
			var thumbsHtml = '';
			for (var i = 0; i < images.length; i++) {
				thumbsHtml +=
					'<button class="cro-12334-thumb' + (i === 0 ? ' cro-12334-thumb--active' : '') + '" data-index="' + i + '" type="button" aria-label="View image ' + (i + 1) + ' of ' + images.length + '">' +
						'<img src="' + images[i].thumb + '" alt="' + images[i].alt + '" loading="lazy">' +
					'</button>';
			}

			return (
				'<div class="cro-12334-gallery">' +
					'<div class="cro-12334-thumbs-wrap">' +
						'<div class="cro-12334-thumbs">' + thumbsHtml + '</div>' +
					'</div>' +
					'<div class="cro-12334-main">' +
						'<div class="cro-12334-main-img-wrap">' +
							'<img class="cro-12334-main-img" src="' + images[0].main + '" alt="' + images[0].alt + '">' +
							'<button class="cro-12334-nav cro-12334-prev" type="button" aria-label="Previous image">' + SVG_PREV + '</button>' +
							'<button class="cro-12334-nav cro-12334-next" type="button" aria-label="Next image">' + SVG_NEXT + '</button>' +
						'</div>' +
						'<div class="cro-12334-bottom-bar">' +
							'<span class="cro-12334-counter">1/' + images.length + '</span>' +
							'<button class="cro-12334-expand-btn" type="button" aria-label="Enlarge image">' + SVG_EXPAND + '</button>' +
						'</div>' +
					'</div>' +
				'</div>'
			);
		}

		/* ── Navigate to a specific image index ── */
		function goToImage(index) {
			if (index < 0) index = galleryImages.length - 1;
			if (index >= galleryImages.length) index = 0;
			currentIndex = index;

			var mainImg = document.querySelector('.cro-12334-main-img');
			if (mainImg) {
				mainImg.src = galleryImages[index].main;
				mainImg.alt = galleryImages[index].alt;
			}

			var counter = document.querySelector('.cro-12334-counter');
			if (counter) counter.textContent = (index + 1) + '/' + galleryImages.length;

			var thumbs = document.querySelectorAll('.cro-12334-thumb');
			for (var i = 0; i < thumbs.length; i++) {
				if (i === index) thumbs[i].classList.add('cro-12334-thumb--active');
				else thumbs[i].classList.remove('cro-12334-thumb--active');
			}

			var activeThumb = document.querySelector('.cro-12334-thumb--active');
			if (activeThumb) activeThumb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

			syncControlCarousel(index);
		}

		/* ── Keep the hidden control carousel in sync so its Enlarge button opens the right image ── */
		function syncControlCarousel(index) {
			var thumbBtns = document.querySelectorAll('.gallery-thumbnails [data-slot="carousel-item"] button');
			if (thumbBtns[index]) {
				thumbBtns[index].click();
			}
		}

		/* ── Trigger the control's native Enlarge button (opens fullscreen viewer) ──
		      goToImage() already syncs the control Swiper on every navigation,
		      so we just open the modal directly without an extra thumb click. ── */
		var _enlarging = false;
		function triggerEnlarge() {
			if (_enlarging) return;
			_enlarging = true;
			var enlargeBtn = document.querySelector('.media-gallery button[aria-label="Enlarge image"]');
			if (enlargeBtn) enlargeBtn.click();
			setTimeout(function () { _enlarging = false; }, 600);
		}

		/* ── Inject the new gallery into .media-gallery ── */
		function injectGallery() {
			if (document.querySelector('.cro-12334-gallery')) return;

			var mediaGallery = document.querySelector('.media-gallery');
			if (!mediaGallery) return;

			galleryImages = extractImages();
			if (!galleryImages.length) return;

			/* Insert BEFORE .media-gallery (as a sibling, not a child) so Swiper's
			   MutationObserver inside .gallery-wrapper is not triggered — triggering it
			   causes React to replace the Enlarge button DOM element, orphaning it. */
			mediaGallery.insertAdjacentHTML('beforebegin', buildGalleryHtml(galleryImages));

			var expandBtn = document.querySelector('.cro-12334-expand-btn');
			if (expandBtn) {
				expandBtn.addEventListener('click', function (e) {
					e.stopPropagation();
					triggerEnlarge();
				});
			}
		}

		/* ── Init: desktop only, wait for images, inject gallery, then add body class ──
		      Body class is added AFTER gallery HTML is in the DOM so the CSS layout
		      change and the new gallery appear in a single paint — no intermediate jump.
		      A short-lived restore guard then watches for React's late hydration pass,
		      which can re-render the DOM and wipe our injected HTML / body class. ── */
		function init() {
			if (window.innerWidth < 1024) return;
			waitForElement('.gallery-wrapper [data-slot="carousel-item"] img', function () {
				injectGallery();
				addClass('body', variation_name);

				var restoreInterval = setInterval(function () {
					if (!document.querySelector('.cro-12334-gallery') && document.querySelector('.media-gallery')) {
						injectGallery();
					}
					if (!document.body.classList.contains(variation_name)) {
						addClass('body', variation_name);
					}
				}, 300);
				setTimeout(function () { clearInterval(restoreInterval); }, 8000);
			});
		}

		function croEventHandkler() {
			live('.cro-12334-thumb', 'click', function () {
				var idx = parseInt(this.getAttribute('data-index'), 10);
				if (!isNaN(idx)) goToImage(idx);
			});

			live('.cro-12334-prev', 'click', function () {
				goToImage(currentIndex - 1);
			});

			live('.cro-12334-next', 'click', function () {
				goToImage(currentIndex + 1);
			});
			/* expand-btn is wired directly inside injectGallery() with stopPropagation */
		}

		if (!window.cro_12334) {
			croEventHandkler();
			window.cro_12334 = true;
		}

		init();

	} catch (e) {
		if (debug) console.log(e, "error in Test " + variation_name);
	}
})();
