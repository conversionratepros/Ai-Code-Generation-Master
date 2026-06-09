(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "CRO_12323_Video_USP_Tiles";

		/* helper functions */
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

		/* ── Video map (Tile 1: rack-type specific installation video) ── */
		var RACK_VIDEOS = {
			'slimline2': '_F4lU9wrBPc',
			'slimsport': '5xx7oH-lqiw',
			'slimpro':   'idivsWy7eIA'
		};

		var SVG_PLAY = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">' +
			'<circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.62)"/>' +
			'<polygon points="23,18 23,46 47,32" fill="#ffffff"/>' +
			'</svg>';

		/* ── Detect which rack type is on this page ── */
		function getRackType() {
			var url = window.location.href.toLowerCase();
			if (url.indexOf('slimpro') > -1) return 'slimpro';
			if (url.indexOf('slimsport') > -1) return 'slimsport';
			if (url.indexOf('slimline') > -1) return 'slimline2';

			var headingEl = document.querySelector('.product-details h1');
			if (headingEl) {
				var t = headingEl.textContent.toLowerCase();
				if (t.indexOf('slimpro') > -1) return 'slimpro';
				if (t.indexOf('slimsport') > -1) return 'slimsport';
				if (t.indexOf('slimline') > -1) return 'slimline2';
			}
			return null;
		}

		/* ── Build a single tile ── */
		function buildTile(badge, heading, copy, videoId) {
			var isPlaceholder = (!videoId || videoId === 'PLACEHOLDER');
			var videoAttr = !isPlaceholder ? ' data-video-id="' + videoId + '"' : '';
			var mediaHtml = isPlaceholder
				? '<div class="cro-12323-thumb-placeholder"></div>'
				: '<img class="cro-12323-thumb" src="https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg" alt="' + heading + '" loading="lazy">' +
				  '<button class="cro-12323-play" aria-label="Play ' + heading + '">' + SVG_PLAY + '</button>';

			return (
				'<div class="cro-12323-tile' + (isPlaceholder ? ' cro-12323-tile--placeholder' : '') + '">' +
					'<span class="cro-12323-badge">' + badge + '</span>' +
					'<h3 class="cro-12323-tile__heading">' + heading + '</h3>' +
					'<div class="cro-12323-tile__video"' + videoAttr + '>' +
						mediaHtml +
					'</div>' +
					'<p class="cro-12323-tile__copy">' + copy + '</p>' +
				'</div>'
			);
		}

		/* ── Build the full section HTML ── */
		function buildSection() {
			var rackType = getRackType();
			var installVideoId = rackType ? RACK_VIDEOS[rackType] : null;

			var tilesHtml = '';

			/* Tile 1 — installation (omitted entirely if no video exists for this rack type) */
			if (installVideoId) {
				tilesHtml += buildTile(
					'INSTALLATION',
					'SEE HOW EASY IT INSTALLS',
					'Watch a real-world, step-by-step installation of this rack on your exact vehicle.',
					installVideoId
				);
			}

			/* Tile 2 — placeholder (update when client provides video) */
			tilesHtml += buildTile(
				'PLACEHOLDER',
				'COMING SOON',
				'Client video coming soon. Update badge, heading, copy and video ID when details are confirmed.',
				'PLACEHOLDER'
			);

			/* Tile 3 — placeholder (update when client provides video) */
			tilesHtml += buildTile(
				'PLACEHOLDER',
				'COMING SOON',
				'Client video coming soon. Update badge, heading, copy and video ID when details are confirmed.',
				'PLACEHOLDER'
			);

			return (
				'<section class="cro-12323-section">' +
					'<div class="cro-12323-inner">' +
						'<div class="cro-12323-header">' +
							'<h2 class="cro-12323-title">3 Big Reasons Drivers Trust Front Runner</h2>' +
							'<p class="cro-12323-subtitle">Built for overlanding. Trusted worldwide. Watch real-world videos that prove this rack is built for adventure.</p>' +
						'</div>' +
						'<div class="cro-12323-tiles">' +
							tilesHtml +
						'</div>' +
					'</div>' +
				'</section>'
			);
		}

		/* ── Inject the section before the second-fold flex row ── */
		function injectSection() {
			if (document.querySelector('.cro-12323-section')) return;
			var anchor = document.querySelector('.product-details .lmd\\:flex-row');
			if (!anchor) return;

			/* Tag the accordion column so CSS can stretch it to full width */
			var leftCol = anchor.children[0];
			if (leftCol) {
				leftCol.classList.add('cro-12323-accordion-col');
				/* Tag the inner max-w container so we can widen it to match the tile section */
				var innerContainer = leftCol.querySelector('.mx-auto');
				if (innerContainer) innerContainer.classList.add('cro-12323-accordion-inner');
			}

			anchor.insertAdjacentHTML('beforebegin', buildSection());
		}

		/* ── Collapse any open accordions on page load ── */
		function collapseOpenAccordions() {
			var openTriggers = document.querySelectorAll(
				'.product-details [data-slot="accordion-trigger"][data-state="open"]'
			);
			for (var i = 0; i < openTriggers.length; i++) {
				openTriggers[i].click();
			}
		}

		/* ── Gate all HTML changes — only run on rack pages ── */
		function htmlAdd() {
			waitForElement(
				'.product-details nav [data-slot="breadcrumb-item"] a[href*="/category/rack-systems/racks"]',
				function () {
					waitForElement('.product-details .lmd\\:flex-row', injectSection);
					waitForElement('.product-details [data-slot="accordion-trigger"]', function () {
						setTimeout(collapseOpenAccordions, 300);
					});
				}
			);
		}

		function trigger() {
			var intervalCallAgain = setInterval(function () {
				waitForElement('.product-details', htmlAdd);
			}, 400);
			setTimeout(function () {
				clearInterval(intervalCallAgain);
			}, 7000);
		}

		function init() {
			addClass('body', variation_name);
			waitForElement('body', trigger);
		}

		/* ── Play video on tile click (replace thumbnail with embedded iframe) ── */
		function croEventHandkler() {
			live('.cro-12323-tile__video', 'click', function () {
				var videoId = this.getAttribute('data-video-id');
				if (!videoId) return;
				if (this.querySelector('iframe')) return;
				this.innerHTML =
					'<iframe src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0" ' +
					'frameborder="0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';
			});
		}

		if (!window.cro_12323) {
			croEventHandkler();
			window.cro_12323 = true;
		}

		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test " + variation_name);
	}
})();
