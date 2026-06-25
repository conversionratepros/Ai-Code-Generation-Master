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

		/* ── Per-rack tile definitions ── */
		/* id: null → tile renders as placeholder until video is confirmed */
		var RACK_TILES = {
			slimline2: [
				{
					badge: 'INSTALLATION',
					heading: 'SEE HOW EASY IT INSTALLS',
					copy: 'Watch a real-world, step-by-step installation of this rack on your exact vehicle.',
					id: '_F4lU9wrBPc'
				},
				{
					badge: 'WHY FRONT RUNNER',
					heading: 'FRONT RUNNER SLIMLINE II ROOF RACK',
					copy: 'Discover what makes the Slimline II the world\'s most trusted expedition rack — strength, modularity, and proven design.',
					id: 'V-XQydf0evM'
				},
				{
					badge: 'IN ACTION',
					heading: 'SLIMLINE II ROOF RACK BY FRONT RUNNER',
					copy: 'See the complete Slimline II system in the real world — trusted by overlanders and built for any terrain.',
					id: 'a_m34XmT_DQ'
				}
			],
			slimsport: [
				{
					badge: 'INSTALLATION',
					heading: 'SEE HOW EASY IT INSTALLS',
					copy: 'Watch a real-world, step-by-step installation of this rack on your exact vehicle.',
					id: '5xx7oH-lqiw'
				},
				{
					badge: 'WHY FRONT RUNNER',
					heading: 'SLIMSPORT ROOF RACK BY FRONT RUNNER',
					copy: 'The SlimSport delivers a low-profile rack solution without sacrificing the modularity Front Runner is known for.',
					id: 'yZk8bhyAhMA'
				},
				{
					badge: 'IN ACTION',
					heading: 'SLIMSPORT ROOF RACK IN ACTION',
					copy: 'Watch the SlimSport rack in real-world use — lightweight, sleek, and built for everyday adventure.',
					id: null   /* TODO: confirm animation video ID with client */
				}
			],
			slimpro: [
				{
					badge: 'INSTALLATION',
					heading: 'SEE HOW EASY IT INSTALLS',
					copy: 'Watch a real-world, step-by-step installation of this rack on your exact vehicle.',
					id: 'idivsWy7eIA'
				},
				{
					badge: 'WHY FRONT RUNNER',
					heading: 'SLIMPRO VAN RACK BY FRONT RUNNER',
					copy: 'The SlimPro Van Rack brings overlanding-ready utility to your van — camp it, haul it, live out of it.',
					id: 'XuK14IkUhAc'
				},
				{
					badge: 'IN ACTION',
					heading: 'SLIMPRO VAN RACK IN ACTION',
					copy: 'Explore the SlimPro van rack system in action — designed for van life and built for any adventure.',
					id: null   /* TODO: confirm animation video ID with client */
				}
			]
		};

		var SVG_PLAY = '<svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none"><foreignObject x="-13.0413" y="-13.0413" width="78.2477" height="78.2487"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(6.52px);clip-path:url(#bgblur_0_4172_178_clip_path);height:100%;width:100%"></div></foreignObject><g data-figma-bg-blur-radius="13.0413"><rect width="52.1653" height="52.1653" rx="6.52066" fill="white" fill-opacity="0.65"/><path d="M33.4336 24.3726C34.6706 25.176 34.6706 26.9869 33.4336 27.7903L23.1174 34.4908C21.7618 35.3714 19.9697 34.3984 19.9697 32.7819V19.3809C19.9697 17.7644 21.7618 16.7915 23.1174 17.672L33.4336 24.3726Z" stroke="#0D0D0D" stroke-width="2.44525"/></g><defs><clipPath id="bgblur_0_4172_178_clip_path" transform="translate(13.0413 13.0413)"><rect width="52.1653" height="52.1653" rx="6.52066"/></clipPath></defs></svg>';

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

		/* ── Safety net: explicitly excluded product types ── */
		function isExcludedPage() {
			var url = window.location.href.toLowerCase();
			if (url.indexOf('pro-bed') > -1) return true;
			if (url.indexOf('probed') > -1) return true;
			if (url.indexOf('load-bar') > -1) return true;
			if (url.indexOf('loadbar') > -1) return true;
			/* If the rack type cannot be determined, do not inject */
			if (!getRackType()) return true;
			return false;
		}

		/* ── Build a single tile ── */
		function buildTile(badge, heading, copy, videoId) {
			var isPlaceholder = (!videoId || videoId === 'PLACEHOLDER');
			var videoAttr = !isPlaceholder ? ' data-video-id="' + videoId + '"' : '';
			var mediaHtml = isPlaceholder
				? '<div class="cro-12323-thumb-placeholder"></div>'
				: '<img class="cro-12323-thumb" src="https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg" ' +
				  'onload="if(this.naturalWidth<=120&&this.src.indexOf(\'maxresdefault\')>-1){this.src=\'https://img.youtube.com/vi/' + videoId + '/sddefault.jpg\';}" ' +
				  'onerror="if(this.src.indexOf(\'maxresdefault\')>-1){this.src=\'https://img.youtube.com/vi/' + videoId + '/sddefault.jpg\';}" ' +
				  'alt="' + heading + '" loading="lazy">' +
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
			var tileDefs = rackType ? RACK_TILES[rackType] : null;
			if (!tileDefs) return null;

			var tilesHtml = '';
			for (var i = 0; i < tileDefs.length; i++) {
				var t = tileDefs[i];
				/* Tile 1 is the installation guide — omit entirely if no video ID */
				if (i === 0 && !t.id) continue;
				tilesHtml += buildTile(t.badge, t.heading, t.copy, t.id);
			}

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

			var sectionHtml = buildSection();
			if (!sectionHtml) return;

			/* Tag the accordion column so CSS can stretch it to full width */
			var leftCol = anchor.children[0];
			if (leftCol) {
				leftCol.classList.add('cro-12323-accordion-col');
				var innerContainer = leftCol.querySelector('.mx-auto');
				if (innerContainer) innerContainer.classList.add('cro-12323-accordion-inner');
			}

			anchor.insertAdjacentHTML('beforebegin', sectionHtml);
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
			if (isExcludedPage()) return;
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
