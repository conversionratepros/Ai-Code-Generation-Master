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

		/* ── Localised copy ── */
		/* Add a new key matching the locale prefix (e.g. 'de', 'fr') when the  */
		/* client provides translations. Falls back to 'en' for any unknown locale. */
		var COPY = {
			en: {
				sectionTitle: '3 Big Reasons Drivers Trust Front Runner',
				sectionSubtitle: 'Built for overlanding. Trusted worldwide. Watch real-world videos that prove this rack is built for adventure.',
				tiles: [
					{ badge: 'Easy install', heading: 'NO DRILLING REQUIRED', copy: 'Mounts to your factory mounting points. No tools beyond what\'s in the kit.' },
					{ badge: 'Built to last', heading: 'BUILT TO CARRY THE HEAVY STUFF', copy: 'Engineered to hold serious loads. Tested in the toughest conditions.' },
					{ badge: 'Trusted worldwide', heading: 'THE ROOF RACK THE WORLD CHOOSES', copy: 'Trusted by overlanders worldwide. The Front Runner standard.' }
				]
			},
			/* ── TODO: replace all German strings below once client provides translations ── */
			de: {
				sectionTitle: '3 Big Reasons Drivers Trust Front Runner',
				sectionSubtitle: 'Built for overlanding. Trusted worldwide. Watch real-world videos that prove this rack is built for adventure.',
				tiles: [
					{ badge: 'Easy install', heading: 'NO DRILLING REQUIRED', copy: 'Mounts to your factory mounting points. No tools beyond what\'s in the kit.' },
					{ badge: 'Built to last', heading: 'BUILT TO CARRY THE HEAVY STUFF', copy: 'Engineered to hold serious loads. Tested in the toughest conditions.' },
					{ badge: 'Trusted worldwide', heading: 'THE ROOF RACK THE WORLD CHOOSES', copy: 'Trusted by overlanders worldwide. The Front Runner standard.' }
				]
			}
		};

		/* ── Detect page locale from the URL (e.g. /de-de/ → 'de') ── */
		function getLang() {
			var match = window.location.pathname.match(/^\/([a-z]{2})-[a-z]{2}\//);
			return match ? match[1] : 'en';
		}

		/* ── Get the copy object for the current locale, falling back to English ── */
		function getCopy() {
			var lang = getLang();
			return COPY[lang] || COPY['en'];
		}

		/* Arrow-only SVG — frosted white background is applied via CSS on the button */
		/* Arrow-only SVG — white frosted background handled by CSS on the button */
		var SVG_PLAY = '<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none"><path d="M20.3926 11.3315C21.6295 12.135 21.6295 13.9458 20.3926 14.7493L10.0764 21.4498C8.72074 22.3304 6.92871 21.3574 6.92871 19.7409V6.33988C6.92871 4.72341 8.72074 3.75051 10.0764 4.63101L20.3926 11.3315Z" stroke="#0D0D0D" stroke-width="2.44525"/></svg>';

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
			if (!getRackType()) return true;
			return false;
		}

		/* ── Known video IDs for tiles 2 and 3 per rack type ── */
		/* Some pages carry extra product-specific videos in the control that   */
		/* must not appear in our tiles. Pinning tile 2 and 3 by ID ensures we  */
		/* always pull the correct generic rack videos regardless of how many   */
		/* videos the control lists or in what order.                           */
		var RACK_VIDEO_IDS = {
			slimline2: ['j4SgRDYt4Xw', 'a_m34XmT_DQ'],
			slimsport:  ['yZk8bhyAhMA', 'PyLzCAS0i3s'],
			slimpro:    ['XuK14IkUhAc', 'zC-ofGog5sU']
		};

		/* ── Read video thumbnails from the control's hidden video list ── */
		/* Tile 1 — installation guide — is detected by aria-label.             */
		/* Tiles 2 & 3 are matched by the known video IDs above so that         */
		/* product-specific extra videos on some pages are never picked up.     */
		/* Returns up to 3 entries: { thumbnail, videoId }                     */
		function readControlVideos() {
			var rackType = getRackType();
			var knownIds = rackType ? RACK_VIDEO_IDS[rackType] : [];
			var btns = Array.prototype.slice.call(
				document.querySelectorAll('.product-content ul li button[aria-label^="play "]')
			);

			/* Helper: extract YouTube ID from a button's img src */
			function getVideoId(btn) {
				var img = btn.querySelector('img');
				if (!img || !img.src) return null;
				var m = img.src.match(/\/vi\/([^/]+)\//);
				return m ? m[1] : null;
			}

			/* Helper: build a video entry from a button */
			function makeEntry(btn) {
				var videoId = getVideoId(btn);
				var src = videoId
					? 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg'
					: null;
				return { thumbnail: src, videoId: videoId };
			}

			/* Tile 1: product-specific installation guide (detected by label) */
			var installBtn = null;
			for (var i = 0; i < btns.length; i++) {
				var label = (btns[i].getAttribute('aria-label') || '').toLowerCase();
				if (label.indexOf('install') > -1) { installBtn = btns[i]; break; }
			}

			/* Tiles 2 & 3: match by pinned video ID */
			function findBtnById(id) {
				for (var i = 0; i < btns.length; i++) {
					if (getVideoId(btns[i]) === id) return btns[i];
				}
				return null;
			}

			var ordered = [
				installBtn,
				knownIds[0] ? findBtnById(knownIds[0]) : null,
				knownIds[1] ? findBtnById(knownIds[1]) : null
			];

			var videos = [];
			for (var k = 0; k < ordered.length; k++) {
				videos.push(ordered[k] ? makeEntry(ordered[k]) : { thumbnail: null, videoId: null });
			}
			return videos;
		}

		/* ── Build a single tile ── */
		/* videoId is stored on the tile so the click handler can locate the  */
		/* correct control button by matching img src, regardless of DOM order */
		function buildTile(badge, heading, copy, thumbnail, videoId) {
			var hasThumb = !!(thumbnail && videoId);
			var mediaHtml = hasThumb
				? '<img class="cro-12323-thumb" src="' + thumbnail + '" ' +
				'onerror="if(this.src.indexOf(\'maxresdefault\')>-1){this.src=this.src.replace(\'maxresdefault\',\'hqdefault\');}" ' +
				'alt="' + heading + '" loading="lazy">' +
				'<button class="cro-12323-play" aria-label="Play ' + heading + '">' + SVG_PLAY + '</button>'
				: '<div class="cro-12323-thumb-placeholder"></div>';

			return (
				'<div class="cro-12323-tile' + (hasThumb ? '' : ' cro-12323-tile--placeholder') + '">' +
				'<span class="cro-12323-badge">' + badge + '</span>' +
				'<h3 class="cro-12323-tile__heading">' + heading + '</h3>' +
				'<div class="cro-12323-tile__video"' + (videoId ? ' data-video-id="' + videoId + '"' : '') + '>' +
				mediaHtml +
				'</div>' +
				'<p class="cro-12323-tile__copy">' + copy + '</p>' +
				'</div>'
			);
		}

		/* ── Build the full section HTML ── */
		function buildSection(controlVideos) {
			if (!getRackType()) return null;

			var copy = getCopy();
			var tilesHtml = '';
			for (var i = 0; i < copy.tiles.length; i++) {
				var t = copy.tiles[i];
				var cv = controlVideos[i];
				/* Tile 1 is the installation guide — omit entirely if the control has no video for it */
				if (i === 0 && (!cv || !cv.thumbnail)) continue;
				tilesHtml += buildTile(t.badge, t.heading, t.copy, cv ? cv.thumbnail : null, cv ? cv.videoId : null);
			}

			if (!tilesHtml) return null;

			return (
				'<section class="cro-12323-section" style="display: none;">' +
				'<div class="cro-12323-inner">' +
				'<div class="cro-12323-header">' +
				'<h2 class="cro-12323-title">' + copy.sectionTitle + '</h2>' +
				'<p class="cro-12323-subtitle">' + copy.sectionSubtitle + '</p>' +
				'</div>' +
				'<div class="cro-12323-tiles">' +
				tilesHtml +
				'</div>' +
				'</div>' +
				'</section>'
			);
		}

		/* ── Inject the section before the second-fold flex row ── */
		function injectSection(controlVideos) {
			if (document.querySelector('.cro-12323-section')) return;
			var anchor = document.querySelector('.product-details .lmd\\:flex-row');
			if (!anchor) return;

			var sectionHtml = buildSection(controlVideos);
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
				'.product-details nav [data-slot="breadcrumb-item"] a[href*="/rack-systems/racks"]',
				function () {
					/* Read the control buttons first, then inject our section */
					waitForElement('.product-content ul li button[aria-label^="play "]', function () {
						var controlVideos = readControlVideos();
						waitForElement('.product-details .lmd\\:flex-row', function () {
							injectSection(controlVideos);
						});
					});
					waitForElement('.product-details [data-slot="accordion-trigger"]', function () {
						setTimeout(collapseOpenAccordions, 300);
					});
				}
			);
		}

		function trigger() {
			var intervalCallAgain = setInterval(function () {
				/* Only restore the body class on pages this test should target.      */
				/* On non-target pages global.js removes it — we must not fight back. */
				if (!isExcludedPage() && !document.body.classList.contains(variation_name)) {
					document.body.classList.add(variation_name);
				}
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

		/* ── Re-run on SPA navigation ── */
		/* Next.js uses pushState/replaceState for routing; on each navigation    */
		/* React remounts the page and the body class is lost. Re-initialise so   */
		/* the class and section are restored on the new page if it is a rack PDP */
		function onLocationChange() {
			/* Small delay to let Next.js finish its DOM swap before we inspect */
			setTimeout(function () {
				/* Only re-activate on target pages; let global.js handle removal elsewhere */
				if (!isExcludedPage()) {
					addClass('body', variation_name);
				}
				trigger();
			}, 300);
		}

		if (!window.cro_12323_nav) {
			(function () {
				var _push = history.pushState;
				var _replace = history.replaceState;
				history.pushState = function () {
					_push.apply(history, arguments);
					onLocationChange();
				};
				history.replaceState = function () {
					_replace.apply(history, arguments);
					onLocationChange();
				};
				window.addEventListener('popstate', onLocationChange);
			})();
			window.cro_12323_nav = true;
		}

		/* ── On tile click: trigger the corresponding control video button     ── */
		/* The control button is hidden via CSS but still in the DOM;          ── */
		/* clicking it programmatically fires React's event handler and        ── */
		/* opens the same modal the control uses.                              ── */
		/* We match by video ID (from the button's img src) so ordering in     ── */
		/* the control list doesn't matter.                                    ── */
		function croEventHandkler() {
			live('.cro-12323-tile__video', 'click', function () {
				var videoId = this.getAttribute('data-video-id');
				if (!videoId) return;
				var btns = document.querySelectorAll('.product-content ul li button[aria-label^="play "]');
				for (var i = 0; i < btns.length; i++) {
					var img = btns[i].querySelector('img');
					if (img && img.src && img.src.indexOf(videoId) > -1) {
						btns[i].click();
						return;
					}
				}
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