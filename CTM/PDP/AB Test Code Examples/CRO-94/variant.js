(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "";
		/* all Pure helper functions */

		function waitForElement(selector, trigger) {
			var interval = setInterval(function () {
				if (document && document.querySelector(selector) && document.querySelectorAll(selector).length > 0) {
					clearInterval(interval);
					trigger();
				}
			}, 50);
			setTimeout(function () {
				clearInterval(interval);
			}, 15000);
		}

		function live(selector, event, callback, context) {
			// helper for enabling IE 8 event bindings
			function addEvent(el, type, handler) {
				if (el.attachEvent) el.attachEvent("on" + type, handler);
				else el.addEventListener(type, handler);
			}
			// matches polyfill
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
			// live binding helper using matchesSelector
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

		function removeClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.contains(cls) && el.classList.remove(cls);
			}
		}

		// Function called when the YouTube API is ready
		function waitForYT(trigger) {
			var interval = setInterval(function () {
				if (window.YT && window.YT.loading && window.YT.Player) {
					clearInterval(interval);
					trigger();
				}
			}, 50);
			setTimeout(function () {
				clearInterval(interval);
			}, 30000);
		}

		function addYoutubeScript() {
			// Load the YouTube IFrame Player API asynchronously
			var tag = document.createElement("script");
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName("script")[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		}
		addYoutubeScript();

		var cronewpart = `
		<div class="cro-new-pdpage-container">
		  <div class="cro-new-pdpage-container-wrapper">
			<div class="cro-new-left-container">
			  <div class="cro-new-left-container-wrapper">
				<div class="cro-new-left-img-wrapper">
				  <img class="cro-new-img-banner" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Banner.png" alt="" />
				  <img class="cro-new-img-icon" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/New-icons.png" alt="" />
				</div>
			  </div>
			</div>
			<div class="cro-new-right-container">
			  <div class="cro-new-right-container-wrapper">
				<div class="cro-new-right-header-text">
				  <p class="cro-new-text-header">See & Feel Video</p>
				  <p class="cro-new-text-tile">Watch an in-person video of this tile's:</p>
				  <ul class="cro-texture-part">
					<li>Texture</li>
					<span>|</span>
					<li>Colour</li>
					<span>|</span>
					<li>Details</li>
				  </ul>
				  <div class="cro-new-last-video-icon">
					<div class="cro-new-last-icon">
					  <img class="cro-video-icon" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/expand-arrows-alt.png" alt="" />
					  <p class="cro-video-icon-text">Watch video</p>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  `;

		var cronewpartMob = `
		<div class="cro-new-pdpage-container-mob">
		  <div class="cro-new-pdpage-container-wrapper">
			<div class="cro-new-left-container">
			  <div class="cro-new-left-container-wrapper">
				<div class="cro-new-left-img-wrapper">
				  <img class="cro-new-img-banner" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Banner.png" alt="" />
				  <img class="cro-new-img-icon" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/New-icons.png" alt="" />
				</div>
			  </div>
			</div>
			<div class="cro-new-right-container">
			  <div class="cro-new-right-container-wrapper">
				<div class="cro-new-right-header-text">
				  <p class="cro-new-text-header">See & Feel Video</p>
				  <p class="cro-new-text-tile">Watch an in-person video of this tile's:</p>
				  <ul class="cro-texture-part">
					<li>Texture</li>
					<span>|</span>
					<li>Colour</li>
					<span>|</span>
					<li>Details</li>
				  </ul>
				  <div class="cro-new-last-video-icon">
					<div class="cro-new-last-icon">
					  <img class="cro-video-icon" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/expand-arrows-alt.png" alt="" />
					  <p class="cro-video-icon-text">Watch video</p>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  `;

		var footerpart = `<div class="cro-t-colour-summary">
		<div class="cro-t-colour-summary-wrapper">
		  <div class="cro-t-colour-summary-inner">
			<div class="cro-t-colour-summary-left-part">
			  <div class="cro-t-colour-summary-left-header">
				<p class="cro-t-colour-summary-left-header-text">Text, size and colour summary</p>
			  </div>
			  <div class="cro-t-colour-summary-left-subheader">
				<div class="cro-t-colour-summary-left-subheader-text">In this video, you'll find comprehensive information showcasing this tile's unique characteristics and design elements. The video dives into the intricate details and quality craftsmanship that make this tile stand out. Whether you're seeking inspiration for your next project or looking to enhance your space with elegance and durability, this video guide provides valuable insights to help you make the perfect choice.</div>
			  </div>
			  <div class="cro-t-colour-summary-left-header Cro-Video-header">
				<div class="cro-t-colour-summary-left-header-text">Video highlights</div>
			  </div>
			  <div class="cro-t-colour-summary-left-subheader-text Cro-Video-list">
				<li class="Cro-Video-list cro-list-1">Get an in-depth sense of tile texture</li>
				<li class="Cro-Video-list cro-list-2">Find out more about uses</li>
				<li class="Cro-Video-list cro-list-3">Get a visual representation on the tile size</li>
				<li class="Cro-Video-list cro-list-4">Overview on style colouring</li>
			  </div>
			</div>
			<div class="cro-t-colour-summary-right-part"></div>
		  </div>
		</div>
	  </div>`;

		var popup = `
		<div class="cro-test-121popUp-lightBox">
		  <div class="cro-test-121popUp-overlay"></div>
		  <div class="cro-test-121popUp-modal">
			<div class="cro-recipe-113-video-model-open">
			  <div class="cro-test-121popUp-cross">
				<img class="cro-test-121popUp-cross-img" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/debtbusters-cro-t-80-cross-icon-01.png" alt="" />
			  </div>
			  <div class="cro-video-top-inner"></div>
			</div>
		  </div>
		</div>
	  `;



		var newjson = [
			{
				url: "https://www.ctm.co.za/idaho-grey-slip-resistant-ceramic-floor-tile-600-x-600mm-pg1uida200522-product.html",
				link: "https://www.youtube.com/embed/sWCcw_d074M?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "sWCcw_d074M",
				img: "https://www.ctm.co.za/api/catalog/product/p/g/pg1uida200522---idaho-grey-slip-resistant-matt-ceramic-floor-tile---600-x-600mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/zest-charcoal-ecotec-slip-resistant-matt-glazed-porcelain-floor-tile-600-x-600mm-product.html",
				link: "https://www.youtube.com/embed/Su-53sx9RuE?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "Su-53sx9RuE",
				img: "https://www.ctm.co.za/api/catalog/product/g/r/gr1czea810e-zest-charcoal-ecotec-slip-resistant-matt-glazed-porcelain-floor-tile---600-x-600mm-review.jpg",
			},
			{
				url: "https://www.ctm.co.za/futura-nadine-grey-ecotec-shiny-glazed-porcelain-floor-tile-600-x-600mm-product.html",
				link: "https://www.youtube.com/embed/Nr-PSwL8L1Q?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "Nr-PSwL8L1Q",
				img: "https://www.ctm.co.za/api/catalog/product/g/r/gr1cna200e-futura-nadine-grey-ecotec-shiny-glazed-porcelain-floor-tile---600-x-600mm-review.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-jozi-stone-ecotec-matt-porcelain-floor-tile-350-x-350mm-product.html",
				link: "https://www.youtube.com/embed/0x7az5XEQrk?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "0x7az5XEQrk",
				img: "https://www.ctm.co.za/media/catalog/product/b/a/background_ctm_look_feel_copy_2.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-kgalagadi-cotta-ecotec-slip-resistant-porcelain-floor-tile-350-x-350mm-product.html",
				link: "https://www.youtube.com/embed/JQWinJL9vvA?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "JQWinJL9vvA",
				img: "https://www.ctm.co.za/api/catalog/product/v/t/vt1kkg70353e---kilimanjaro-kgalagadi-cotta-ecotec-slip-resistant-porcelain-floor-tile---350-x-350mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-mokala-slate-ecotec-slip-resistant-porcelain-floor-tile-420-x-420mm-product.html",
				link: "https://www.youtube.com/embed/yWg707Cob84?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "yWg707Cob84",
				img: "https://www.ctm.co.za/media/catalog/product/k/i/kilimanjaro_mokala_slate_ecotec_slip_resistant_porcelain_floor_tile_-_420_x_420mm.jpg",
			},
			{
				url: "https://www.ctm.co.za/subway-arles-snow-feature-glossy-wall-tile-100-x-300mm-product.html",
				link: "https://www.youtube.com/embed/aml7T2GwIVc?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "aml7T2GwIVc",
				img: "https://www.ctm.co.za/media/catalog/product/s/u/subway_arles_snow_feature_.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-limestone-grey-ecotec-matt-glazed-porcelain-floor-tile-900-x-450mm-product.html",
				link: "https://www.youtube.com/embed/BKhVsRbQsgo?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "BKhVsRbQsgo",
				img: "https://www.ctm.co.za/media/catalog/product/l/i/limestone_grey_ecotec_matt_glazed_porcelain_floor_tile_-_900_x_450mm.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-eagle-wood-beige-ecotec-matt-porcelain-floor-tile-635-x-420mm-product.html",
				link: "https://www.youtube.com/embed/Z2Nt9mkiQZY?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "Z2Nt9mkiQZY",
				img: "https://www.ctm.co.za/api/catalog/product/v/t/vt1kea30631e-kilimanjaro-eagle-wood-beige-ecotec-matt-porcelain-floor-tile---635-x-420mm-review.jpg",
			},
			{
				url: "https://www.ctm.co.za/barnwood-natural-ecotec-matt-rectified-glazed-porcelain-floor-tile-895-x-220mm-product.html",
				link: "https://www.youtube.com/embed/iBu2TFPdzus?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "iBu2TFPdzus",
				img: "https://www.ctm.co.za/api/catalog/product/g/r/gr1cba30r31e---barnwood-natural-ecotec-matt-rectified-glazed-porcelain-floor-tile---895-x-220mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-ferro-charcoal-ecotec-matt-porcelain-floor-tile-420-x-420mm-product.html",
				link: "https://www.youtube.com/embed/H0twNUhYCeE?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "H0twNUhYCeE",
				img: "https://www.ctm.co.za/media/catalog/product/f/e/ferro_charcoal.jpg",
			},
			{
				url: "https://www.ctm.co.za/mastery-charcoal-ecotec-slip-resistant-glazed-porcelain-floor-tile-1200-x-600mm-product.html",
				link: "https://www.youtube.com/embed/wJCVq4PqmDA?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "wJCVq4PqmDA",
				img: "https://www.ctm.co.za/api/catalog/product/g/r/gr1cmaa812e---mastery-charcoal-ecotec-slip-resistant-glazed-porcelain-floor-tile---1200-x-600mm-touch-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/kerry-grey-ecotec-rectified-slip-resistant-hard-body-ceramic-floor-tile-600-x-600mm-product.html",
				link: "https://www.youtube.com/embed/e2T5U4Lfg2Y?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "e2T5U4Lfg2Y",
				img: "https://www.ctm.co.za/api/catalog/product/s/p/sp1ckr20a1---kerry-grey-ecotec-rectified-slip-resistant-hard-body-ceramic-floor-tile---600-x-600mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/augrabies-brown-ecotec-matt-porcelain-floor-tile-710-x-280mm-product.html",
				link: "https://www.youtube.com/embed/CJLpjPBisj4?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "CJLpjPBisj4",
				img: "https://www.ctm.co.za/media/catalog/product/a/u/augrabies_brown_1.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-madagascar-rust-ecotec-matt-porcelain-floor-tile-710-x-280mm-product.html",
				link: "https://www.youtube.com/embed/9LQtPIXgols?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "9LQtPIXgols",
				img: "https://www.ctm.co.za/media/catalog/product/m/a/madagascar_rust.jpg",
			},
			{
				url: "https://www.ctm.co.za/valencia-azul-bevelled-turquoise-glossy-ceramic-subway-wall-tile-200-x-100mm-fttl18664-product.html",
				link: "https://www.youtube.com/embed/b0L5PvXxYxM?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "b0L5PvXxYxM",
				img: "https://www.ctm.co.za/media/catalog/product/v/a/valencia_azul_bevelled_turquoise.jpg",
			},
			{
				url: "https://www.ctm.co.za/cashmere-cement-grey-ecotec-shiny-glazed-porcelain-floor-tile-800-x-800mm-product.html",
				link: "https://www.youtube.com/embed/I7FvcVc4-5E?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "I7FvcVc4-5E",
				img: "https://www.ctm.co.za/api/catalog/product/g/r/gr1cca201se-cashmere-cement-grey-ecotec-shiny-glazed-porcelain-floor-tile---800-x-800mm-review-video.jpg",
			},
			{
				url: "https://www.ctm.co.za/skyline-charcoal-ecotec-matt-glazed-porcelain-floor-tile-800-x-800mm-product.html",
				link: "https://www.youtube.com/embed/QyWa8D66eqc?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "QyWa8D66eqc",
				img: "https://www.ctm.co.za/media/catalog/product/s/k/skyline_grey_ecotec_slip_resistant_glazed_porcelain_floor_tile_-_800_x_800mm_1.jpg",
			},
			{
				url: "https://www.ctm.co.za/skyline-grey-ecotec-slip-resistant-glazed-porcelain-floor-tile-800-x-800mm-product.html",
				link: "https://www.youtube.com/embed/YL4VaO2LFnU?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "YL4VaO2LFnU",
				img: "https://www.ctm.co.za/api/catalog/product/g/r/gr1csk201sre-skyline-grey-ecotec-slip-resistant-glazed-porcelain-floor-tile---800-x-800mm-review.jpg",
			},
			{
				url: "https://www.ctm.co.za/absolute-grey-ecotec-rectified-matt-hard-body-ceramic-floor-tile-600-x-600mm-product.html",
				link: "https://www.youtube.com/embed/la9CEsroHaw?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "la9CEsroHaw",
				img: "https://www.ctm.co.za/media/catalog/product/a/b/absolute_light_grey_ecotec_matt_glazed_porcelain_floor_tile_-_900_x_450mm.jpg",
			},
			{
				url: "https://www.ctm.co.za/juniper-black-shiny-ceramic-floor-tile-430-x-430mm-product.html",
				link: "https://www.youtube.com/embed/AIvLKkOCcio?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "AIvLKkOCcio",
				img: "https://www.ctm.co.za/api/catalog/product/p/g/pg1uju800018---juniper-black-shiny-ceramic-floor-tile---430-x-430mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/levante-ivory-shiny-ceramic-floor-tile-500-x-500mm-product.html",
				link: "https://www.youtube.com/embed/szBYJDrEyr0?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "szBYJDrEyr0",
				img: "https://www.ctm.co.za/api/catalog/product/p/g/pg1ule110030-levante-ivory-shiny-ceramic-floor-tile---500-x-500mm-tile-bord.jpg",
			},
			{
				url: "https://www.ctm.co.za/moana-beige-matt-ceramic-floor-tile-430-x-430mm-product.html",
				link: "https://www.youtube.com/embed/Ay5fnxg60CA?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "Ay5fnxg60CA",
				img: "https://www.ctm.co.za/api/catalog/product/p/g/pg1umo3018-moana-beige-matt-ceramic-floor-tile---430-x-430mm-review-video.jpg",
			},
			{
				url: "https://www.ctm.co.za/angelina-ivory-shiny-ceramic-wall-tile-600-x-300mm-product.html",
				link: "https://www.youtube.com/embed/3yKB4DMaLHk?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "3yKB4DMaLHk",
				img: "https://www.ctm.co.za/media/catalog/product/a/n/angelina_ivory_shiny_ceramic_wall_tile_-_600_x_300mm.jpg",
			},
			{
				url: "https://www.ctm.co.za/twill-cotton-ivory-satin-ceramic-wall-tile-600-x-300mm-product.html",
				link: "https://www.youtube.com/embed/0jkGDFO24dw?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "0jkGDFO24dw",
				img: "https://www.ctm.co.za/api/catalog/product/w/s/ws1ctw11a7l---twill-cotton-ivory-satin-ceramic-wall-tile---600-x-300mm.jpg",
			},
			{
				url: "https://www.ctm.co.za/eros-grey-ecotec-matt-porcelain-floor-tile-600-x-600mm-product.html",
				link: "https://www.youtube.com/embed/-fOhGlZ7pnE?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "-fOhGlZ7pnE",
				img: "https://www.ctm.co.za/api/catalog/product/g/r/gr1cer200e---eros-grey-ecotec-matt-porcelain-floor-tile---600-x-600mm.jpg",
			},
			{
				url: "https://www.ctm.co.za/stage-ivory-matt-ceramic-floor-tile-430-x-430mm-product.html",
				link: "https://www.youtube.com/embed/IMD2070qFVg?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "IMD2070qFVg",
				img: "https://www.ctm.co.za/media/catalog/product/s/t/stage_ivory_matt_ceramic_floor_tile_-_430_x_430mm_.jpg",
			},
			{
				url: "https://www.ctm.co.za/synergy-charcoal-ecotec-slip-resistant-glazed-porcelain-floor-tile-600-x-600mm-product.html",
				link: "https://www.youtube.com/embed/b4uTidbemZI?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "b4uTidbemZI",
				img: "https://www.ctm.co.za/media/catalog/product/s/y/synergy_charcoal_ecotec_slip_resistant_glazed_porcelain_floor_tile_-_600_x_600mm.jpg",
			},
			{
				url: "https://www.ctm.co.za/rivonia-taupe-ceramic-floor-tile-500-x-500mm-product.html",
				link: "https://www.youtube.com/embed/imd5wLczOQQ?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "imd5wLczOQQ",
				img: "https://www.ctm.co.za/api/catalog/product/p/g/pg1uri330030---rivonia-taupe-ceramic-floor-tile---500-x-500mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-lamu-sand-ecotec-matt-porcelain-floor-tile-420-x-420mm-product.html",
				link: "https://www.youtube.com/embed/fYjbM2ODkfc?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "fYjbM2ODkfc",
				img: "https://www.ctm.co.za/media/catalog/product/h/q/hqdefault_837.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-madagascar-stone-grey-ecotec-matt-porcelian-floor-tile-710-x-280mm-product.html",
				link: "https://www.youtube.com/embed/HYBIPEAHXfw?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "HYBIPEAHXfw",
				img: "https://www.ctm.co.za/media/catalog/product/k/i/kilimanajro_madagascar_stone_grey_1.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-rhino-grey-ecotec-matt-porcelain-floor-tile-410-x-620mm-product.html",
				link: "https://www.youtube.com/embed/lDCOQhuRO7I?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "lDCOQhuRO7I",
				img: "https://www.ctm.co.za/api/catalog/product/v/t/vt1krh24631e---kilimanjaro-rhino-grey-ecotec-matt-porcelain-floor-tile---420-x-635mm-touch-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/pavia-cementine-matt-ceramic-wall-tile-200-x-200mm-product.html",
				link: "https://www.youtube.com/embed/s8pCqWn25VQ?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "s8pCqWn25VQ",
				img: "https://www.ctm.co.za/api/catalog/product/w/s/ws1fcpa00a0l---pavia-cementine-matt-ceramic-wall-tile---200-x-200mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/dome-white-shiny-ceramic-floor-tile-600-x-600mm-pg1udo100022-product.html",
				link: "https://www.youtube.com/embed/HjFAxamrybg?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "HjFAxamrybg",
				img: "https://www.ctm.co.za/api/catalog/product/p/g/pg1udo100022---dome-white-shiny-ceramic-floor-tile---600-x-600mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/zorah-mid-grey-matt-ceramic-floor-tile-430-x-430mm-product.html",
				link: "https://www.youtube.com/embed/122ItptTaxo?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "122ItptTaxo",
				img: "https://www.ctm.co.za/api/catalog/product/p/g/pg1uzo240518-zorah-mid-grey-matt-ceramic-floor-tile---430-x-430mm-review-video.jpg",
			},
			{
				url: "https://www.ctm.co.za/subway-vita-beige-glossy-ceramic-wall-tile-200-x-100mm-product.html",
				link: "https://www.youtube.com/embed/uTfdJ4Hl3mc?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "uTfdJ4Hl3mc",
				img: "https://www.ctm.co.za/media/catalog/product/s/u/subway_vita_beige_glossy_ceramic_wall_tile_-_200_x_100mm_-_fttl21036.jpg",
			},
			{
				url: "https://www.ctm.co.za/subway-vita-natura-decor-glossy-ceramic-wall-tile-200-x-100mm-product.html",
				link: "https://www.youtube.com/embed/B8bBSpS10_c?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "B8bBSpS10_c",
				img: "https://www.ctm.co.za/media/catalog/product/p/l/play_button-1_copy.jpg",
			},
			{
				url: "https://www.ctm.co.za/freya-grey-shiny-ceramic-floor-tile-600-x-600mm-pg1ufr210022-product.html",
				link: "https://www.youtube.com/embed/q1gNG6dJNZc?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "q1gNG6dJNZc",
				img: "https://www.ctm.co.za/api/catalog/product/p/g/pg1ufr210022---freya-grey-shiny-ceramic-floor-tile---600-x-600mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/vibranium-mint-glazed-shiny-polished-porcelain-floor-tile-600-x-1200mm-product.html",
				link: "https://www.youtube.com/embed/CnbZP25_4Ew?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "CnbZP25_4Ew",
				img: "https://www.ctm.co.za/media/catalog/product/v/i/vibranium_mint_glazed_shiny_polished_porcelain_floor_tile_-_600_x_1200mm_-_dcmim1094_.00_00_00_00.still001.jpg",
			},
			{
				url: "https://www.ctm.co.za/arida-stone-ecotec-rectified-matt-porcelain-floor-tile-895-x-445mm-product.html",
				link: "https://www.youtube.com/embed/2zgZogC5-jA?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "2zgZogC5-jA",
				img: "https://www.ctm.co.za/api/catalog/product/g/r/gr1car20r32e---arida-stone-ecotec-rectified-matt-porcelain-floor-tile---895-x-445mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/serene-grey-shiny-ceramic-wall-tile-800-x-265mm-product.html",
				link: "https://www.youtube.com/embed/X1155BEDxDM?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "X1155BEDxDM",
				img: "https://www.ctm.co.za/api/catalog/product/w/s/ws1cse20a9l---serene-grey-shiny-ceramic-wall-tile---800-x-265mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-lusitano-feature-ecotec-matt-porcelain-floor-tile-420-x-420mm-vt1klu00421e-product.html",
				link: "https://www.youtube.com/embed/YajK8kE44Ug?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "YajK8kE44Ug",
				img: "https://www.ctm.co.za/media/catalog/product/l/u/lusitano_feature_floor_tile_420_x420mm_thumb.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-lusitano-cotta-ecotec-matt-porcelain-floor-tile-420-x-420mm-product.html",
				link: "https://www.youtube.com/embed/uEiiCmCP3rY?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "uEiiCmCP3rY",
				img: "https://www.ctm.co.za/api/catalog/product/v/t/vt1klu30421e---kilimanjaro-lusitano-cotta-ecotec-matt-porcelain-floor-tile---420-x-420mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/invisible-marble-glazed-polish-porcelain-floor-tile-600-x-1200mm-product.html",
				link: "https://www.youtube.com/embed/gw9R687lWLQ?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "gw9R687lWLQ",
				img: "https://www.ctm.co.za/api/catalog/product/d/c/dcmim1100-invisible-marble-glazed-polish-porcelain-floor-tile---600-x-1200mm-review.jpg",
			},
			{
				url: "https://www.ctm.co.za/elysium-black-ecotec-rectified-shiny-porcelain-floor-tile-790-x-790mm-product.html",
				link: "https://www.youtube.com/embed/Dpp67x5MM6E?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "Dpp67x5MM6E",
				img: "https://www.ctm.co.za/media/catalog/product/e/l/elysium_black_ecotec_rectified_shiny_porcelain_floor_tile_-_790_x_790mm_.jpg",
			},
			{
				url: "https://www.ctm.co.za/elysium-white-ecotec-rectified-shiny-porcelain-floor-tile-790-x-790mm-product.html",
				link: "https://www.youtube.com/embed/NLyWd4Aq-B0?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "NLyWd4Aq-B0",
				img: "https://www.ctm.co.za/media/catalog/product/e/l/elysium_white_ecotec_rectified_shiny_porcelain_floor_tile_-_790_x_790mm.jpg",
			},
			{
				url: "https://www.ctm.co.za/element-grey-ecotec-rectified-matt-porcelain-floor-tile-590-x-1190mm-product.html",
				link: "https://www.youtube.com/embed/K8Ekfp0Pbr8?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "K8Ekfp0Pbr8",
				img: "https://www.ctm.co.za/media/catalog/product/e/l/element_grey_ecotec_rectified_matt_porcelain_floor_tile_-_590_x_1190mm.jpg",
			},
			{
				url: "https://www.ctm.co.za/dyna-fantastic-rectified-shiny-glazed-porcelain-floor-tile-600-x-1200mm-product.html",
				link: "https://www.youtube.com/embed/a5X7JYOk89Q?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "a5X7JYOk89Q",
				img: "https://www.ctm.co.za/media/catalog/product/b/a/background_ctm_look_feel_copy_1.jpg",
			},
			{
				url: "https://www.ctm.co.za/fusion-blue-rectified-shiny-glazed-porcelain-floor-tile-600-x-1200mm-product.html",
				link: "https://www.youtube.com/embed/45GeUGzRsIY?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "45GeUGzRsIY",
				img: "https://www.ctm.co.za/media/catalog/product/f/u/fusion_blue_rectified_shiny_glazed_.jpg",
			},
			{
				url: "https://www.ctm.co.za/satvario-prizma-rectified-shiny-glazed-porcelain-floor-tile-800-x-1600mm-product.html",
				link: "https://www.youtube.com/embed/Lp_LKVOcKtQ?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "Lp_LKVOcKtQ",
				img: "https://www.ctm.co.za/media/catalog/product/s/a/satvario_prizma_rectified_shiny_glazed_porcelain_floor_tile_-_800_x_1600mm_.jpg",
			},
			{
				url: "https://www.ctm.co.za/onyx-green-glazed-shiny-polished-porcelain-floor-tile-600-x-1200mm-product.html",
				link: "https://www.youtube.com/embed/vN2qMR3z2SQ?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "vN2qMR3z2SQ",
				img: "https://www.ctm.co.za/media/catalog/product/o/n/onyx_green_glazed_shiny_polished_porcelain_floor_tile_-_600_x_1200mm.jpg",
			},
			{
				url: "https://www.ctm.co.za/infinity-grey-rectified-matt-glazed-porcelain-floor-tile-795-x-795mm-4-product.html",
				link: "https://www.youtube.com/embed/ZOBYguTmXrI?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "ZOBYguTmXrI",
				img: "https://www.ctm.co.za/api/catalog/product/g/r/gr1cin20r12e-infinity-grey-ecotec-rectified-matt-porcelain-floor-tile---790-x-790mm-review.jpg",
			},
			{
				url: "https://www.ctm.co.za/infinity-grey-slip-resistant-rectified-matt-glazed-porcelain-floor-tile-795-x-795mm-1-product.html",
				link: "https://www.youtube.com/embed/RDVZphNSpGs?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "RDVZphNSpGs",
				img: "https://www.ctm.co.za/api/catalog/product/g/r/gr1cin20rsr12e---infinity-grey-ecotec-rectified-slip-resistant-porcelain-floor-tile---790-x-790mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/domus-feature-shiny-ceramic-wall-tile-300-x-600mm-product.html",
				link: "https://www.youtube.com/embed/MJ5TqI80oMk?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "MJ5TqI80oMk",
				img: "https://www.ctm.co.za/media/catalog/product/d/o/domus_feature_shiny_ceramic_wall_tile_-_300_x_600mm_-_ws1fcdo00a7l.jpg",
			},
			{
				url: "https://www.ctm.co.za/olivia-feature-matt-ceramic-wall-tile-300-x-600mm-ws1fcol00a7l-product.html",
				link: "https://www.youtube.com/embed/VvccaxrNjWw?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "VvccaxrNjWw",
				img: "https://www.ctm.co.za/media/catalog/product/o/l/olivia_feature_matt_ceramic_wall_tile_-_300_x_600mm.jpg",
			},
			{
				url: "https://www.ctm.co.za/golden-camelia-shiny-ceramic-wall-tile-265-x-800mm-ws1fcgo00a9l-product.html",
				link: "https://www.youtube.com/embed/wqBQqECrUDk?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "wqBQqECrUDk",
				img: "https://www.ctm.co.za/media/catalog/product/h/q/hqdefault_837_2.jpg",
			},
			{
				url: "https://www.ctm.co.za/synergy-light-grey-ecotec-slip-resistant-porcelain-floor-tile-600-x-600mm-product.html",
				link: "https://www.youtube.com/embed/4d5gImzZgfQ?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "4d5gImzZgfQ",
				img: "https://www.ctm.co.za/media/catalog/product/s/y/synergy_light_grey.png",
			},
			{
				url: "https://www.ctm.co.za/network-sand-matt-ceramic-wall-tile-300-x-600mm-product.html",
				link: "https://www.youtube.com/embed/p17PgKaF174?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "p17PgKaF174",
				img: "https://www.ctm.co.za/api/catalog/product/w/s/ws1cne33a7l-network-sand-matt-ceramic-wall-tile---300-x-600mm-review.jpg",
			},
			{
				url: "https://www.ctm.co.za/juniper-feature-shiny-ceramic-wall-tile-250-x-400mm-ws1fcju00a4l-product.html",
				link: "https://www.youtube.com/embed/hhQEupOkz9o?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "hhQEupOkz9o",
				img: "https://www.ctm.co.za/api/catalog/product/w/s/ws1fcju00a4l---juniper-feature-shiny-ceramic-wall-tile---250-x-400mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/bocelli-nero-ecotec-rectified-shiny-hard-body-ceramic-floor-tile-600-x-600mm-sp1cbc80s1-product.html",
				link: "https://www.youtube.com/embed/VzBW9Osu9c4?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "VzBW9Osu9c4",
				img: "https://www.ctm.co.za/api/catalog/product/s/p/sp1cbc80s1---bocelli-nero-ecotec-rectified-shiny-hard-body-ceramic-floor-tile---600-x-600mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/origins-cape-point-ecotec-matt-porcelain-floor-tile-280-x-710mm-vt1kca30711e-product.html",
				link: "https://www.youtube.com/embed/4TXeau6obGM?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "4TXeau6obGM",
				img: "https://www.ctm.co.za/media/catalog/product/o/r/origins_cape_point_ecotec_matt_porcelain_floor_tile_-_280_x_710mm.jpg",
			},
			{
				url: "https://www.ctm.co.za/origins-fynbos-natural-ecotec-matt-porcelain-floor-tile-280-x-710mm-vt1kfy11711e-product.html",
				link: "https://www.youtube.com/embed/EGLn7YgoblY?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "EGLn7YgoblY",
				img: "https://www.ctm.co.za/media/catalog/product/o/r/origins_fynbos_natural_ecotec_matt_porcelain_floor_tile_-_280_x_710mm.jpg",
			},
			{
				url: "https://www.ctm.co.za/origins-fish-hoek-grey-ecotec-matt-porcelain-floor-tile-vt1kfi23711e-product.html",
				link: "https://www.youtube.com/embed/LwMcpHeXUlI?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "LwMcpHeXUlI",
				img: "https://www.ctm.co.za/api/catalog/product/v/t/vt1kfi23711e---origins-fish-hoek-grey-ecotec-matt-porcelain-floor-tile---280-x-710mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/casale-taupe-matt-ceramic-floor-tile-430-x-430mm-pg1uca330518-product.html",
				link: "https://www.youtube.com/embed/MBns2BSCd_U?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "MBns2BSCd_U",
				img: "https://www.ctm.co.za/api/catalog/product/p/g/pg1uca330518---casale-taupe-matt-ceramic-floor-tile---430-x-430mm-touch-and-feel_2.jpg",
			},
			{
				url: "https://www.ctm.co.za/casale-charcoal-matt-ceramic-floor-tile-430-x-430mm-pg1uca810518-product.html",
				link: "https://www.youtube.com/embed/i0Wgmqb0raY?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "i0Wgmqb0raY",
				img: "https://www.ctm.co.za/api/catalog/product/p/g/pg1uca810518---casale-charcoal-matt-ceramic-floor-tile---430-x-430mm-touch-feel_3.jpg",
			},
			{
				url: "https://www.ctm.co.za/cleopatra-gold-shiny-ceramic-floor-tile-500-x-500mm-pg1ucl100030-product.html",
				link: "https://www.youtube.com/embed/aK-McbUexCI?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "aK-McbUexCI",
				img: "https://www.ctm.co.za/media/catalog/product/c/l/cleopatra_gold_shiny_ceramic_floor_tile_-_500_x_500mm_1_.jpg",
			},
			{
				url: "https://www.ctm.co.za/tonga-beige-matt-ceramic-floor-tile-430-x-430mm-pg1utn300018-product.html",
				link: "https://www.youtube.com/embed/TdkNJa-Igms?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "TdkNJa-Igms",
				img: "https://www.ctm.co.za/api/catalog/product/p/g/pg1utn300018-tonga-beige-matt-ceramic-floor-tile---430-x-430mm-reveiw-video.jpg",
			},
			{
				url: "https://www.ctm.co.za/tempest-charcoal-ecotec-rectified-shiny-hard-body-ceramic-floor-tile-600-x-600mm-sp1cte81s1-product.html",
				link: "https://www.youtube.com/embed/wX47nZNMoGY?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "wX47nZNMoGY",
				img: "https://www.ctm.co.za/media/catalog/product/b/a/background_ctm_look_feel_copy_3.jpg",
			},
			{
				url: "https://www.ctm.co.za/origins-fish-hoek-grey-ecotec-slip-resistant-porcelain-floor-tile-280-x-710mm-vt1kfi23713e-product.html",
				link: "https://www.youtube.com/embed/DBGgIY7g8Ck?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "DBGgIY7g8Ck",
				img: "https://www.ctm.co.za/media/catalog/product/h/q/hqdefault_851.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-ghana-cement-grey-ecotec-matt-porcelain-floor-tile-420-x-635mm-product.html",
				link: "https://www.youtube.com/embed/QFn_KSV5Ozw?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "QFn_KSV5Ozw",
				img: "https://www.ctm.co.za/api/catalog/product/v/t/vt1kgh21631a-kilimanjaro-ghana-cement-grey-matt-porcelain-floor-tile---420-x-635mm-review.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-mawenzi-peak-ecotec-slip-resistant-porcelain-floor-tile-420-x-635mm-product.html",
				link: "https://www.youtube.com/embed/rams3rCqnE8?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "rams3rCqnE8",
				img: "https://www.ctm.co.za/media/catalog/product/k/i/kilimanjaro_mawenzi_peak_ecotec_slip_resistant_porcelain_floor_tile_-_420_x_635mm_-_vt1.jpg",
			},
			{
				url: "https://www.ctm.co.za/cleopatra-gold-shiny-ceramic-wall-tile-300-x-600mm-ws1ccl10a7l-product.html",
				link: "https://www.youtube.com/embed/zjTWiQqL1mg?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "zjTWiQqL1mg",
				img: "https://www.ctm.co.za/media/catalog/product/b/a/background_ctm_look_feel_copy.jpg",
			},
			{
				url: "https://www.ctm.co.za/onyx-white-shiny-ceramic-wall-tile-300-x-600mm-ws1con10a7l-product.html",
				link: "https://www.youtube.com/embed/wSBSpO8hajY?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "wSBSpO8hajY",
				img: "https://www.ctm.co.za/api/catalog/product/w/s/ws1con10a7l-onyx-white-shiny-ceramic-wall-tile---300-x-600mm-review.jpg",
			},
			{
				url: "https://www.ctm.co.za/element-botanical-ecotec-shiny-rectified-porcelain-floor-tile-590-x-1190mm-gr1cel00rs23e-product.html",
				link: "https://www.youtube.com/embed/oE8NTB0RUes?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "oE8NTB0RUes",
				img: "https://www.ctm.co.za/media/catalog/product/e/l/element_botanical_ecotec_shiny_rectified_porcelain_floor_tile_-_590_x_1190mm.00_00_00_13.still001.jpg",
			},
			{
				url: "https://www.ctm.co.za/ravello-grey-shiny-ceramic-wall-tile-200-x-500mm-ws1cra20m8l-product.html",
				link: "https://www.youtube.com/embed/PybeIheWq8g?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "PybeIheWq8g",
				img: "https://www.ctm.co.za/api/catalog/product/w/s/ws1cra20m8l---ravello-grey-shiny-ceramic-wall-tile---200-x-500mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/stage-light-grey-matt-ceramic-wall-tile-250-x-400mm-ws1cst21a4l-product.html",
				link: "https://www.youtube.com/embed/PbY1ZhshwSw?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "PbY1ZhshwSw",
				img: "https://www.ctm.co.za/api/catalog/product/w/s/ws1cst21a4l-stage-light-grey-matt-ceramic-wall-tile---250-x-400mm-review.jpg",
			},
			{
				url: "https://www.ctm.co.za/strelizia-cement-light-grey-satin-ceramic-wall-tile-200-x-500mm-ws1cst21a8l-product.html",
				link: "https://www.youtube.com/embed/mqjuMM4Oyic?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "mqjuMM4Oyic",
				img: "https://www.ctm.co.za/api/catalog/product/w/s/ws1cst21a8l-strelizia-cement-light-grey-satin-ceramic-wall-tile---200-x-500mm-review.jpg",
			},
			{
				url: "https://www.ctm.co.za/zorah-grey-matt-ceramic-wall-tile-250-x-400mm-ws1czo21a4l-product.html",
				link: "https://www.youtube.com/embed/u9pzK8IRnNw?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "u9pzK8IRnNw",
				img: "https://www.ctm.co.za/api/catalog/product/w/s/ws1czo21a4l-zorah-grey-matt-ceramic-wall-tile---250-x-400mm-review.jpg",
			},
			{
				url: "https://www.ctm.co.za/strelizia-feature-satin-ceramic-wall-tile-200-x-500mm-ws1fcst00a8l-product.html",
				link: "https://www.youtube.com/embed/SuV_hDeMyWk?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "SuV_hDeMyWk",
				img: "https://www.ctm.co.za/media/catalog/product/s/t/streliztia_feature.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-karisimbi-quartz-ecotec-matt-porcelain-floor-tile-420-x-635mm-vt1kka11631e-product.html",
				link: "https://www.youtube.com/embed/K3OcksXDUcc?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "K3OcksXDUcc",
				img: "https://www.ctm.co.za/api/catalog/product/v/t/vt1kka11631e-kilimanjaro-karisimbi-quartz-ecotec-matt-porcelain-floor-tile---420-x-635mm-review.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-karisimbi-slate-ecotec-matt-porcelain-floor-tile-420-x-635mm-vt1kka92631e-product.html",
				link: "https://www.youtube.com/embed/Z-EvzxsXhTQ?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "Z-EvzxsXhTQ",
				img: "https://www.ctm.co.za/api/catalog/product/v/t/vt1kka92631e-kilimanjaro-karisimbi-slate-ecotec-matt-porcelain-floor-tile---420-x-635mm-review.jpg",
			},
			{
				url: "https://www.ctm.co.za/element-ivory-matt-ceramic-wall-tile-265-x-800mm-ws1cel11a9l-product.html",
				link: "https://www.youtube.com/embed/h3iYABCeEkk?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "h3iYABCeEkk",
				img: "https://www.ctm.co.za/media/catalog/product/e/l/element_ivory_ecotec_rectified_matt_porcelain_floor_tile_-_590_x_1190mm.jpg",
			},
			{
				url: "https://www.ctm.co.za/element-charcoal-matt-ceramic-wall-tile-265-x-800mm-ws1cel81a9l-product.html",
				link: "https://www.youtube.com/embed/EybstqlaTv0?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "EybstqlaTv0",
				img: "https://www.ctm.co.za/media/catalog/product/e/l/element_charcoal_matt_ceramic_wall_tile_-_265_x_800mm_-_ws1cel81a9l_.00_00_04_12.still001.jpg",
			},
			{
				url: "https://www.ctm.co.za/eros-light-grey-matt-ceramic-wall-tile-300-x-600mm-ws1cer21a7l-product.html",
				link: "https://www.youtube.com/embed/yOGGcl3n1LE?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "yOGGcl3n1LE",
				img: "https://ctm.co.za/media/catalog/product/e/r/eros_light_grey.jpg",
			},
			{
				url: "https://www.ctm.co.za/twill-grey-satin-ceramic-wall-tile-300-x-600mm-ws1ctw21a7l-product.html",
				link: "https://www.youtube.com/embed/q1FtHmJ2T8w?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "q1FtHmJ2T8w",
				img: "https://www.ctm.co.za/api/catalog/product/w/s/ws1ctw21a7l---twill-grey-satin-ceramic-wall-tile---300-x-600mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/element-feature-matt-ceramic-wall-tile-ws1fcel00h9l-product.html",
				link: "https://www.youtube.com/embed/N-m3ITxZu0A?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "N-m3ITxZu0A",
				img: "https://www.ctm.co.za/media/catalog/product/b/a/background_ctm_look_feel_copy_4.jpg",
			},
			{
				url: "https://www.ctm.co.za/zara-feature-shiny-ceramic-wall-tile-300-x-600mm-ws1fcza00a7l-product.html",
				link: "https://www.youtube.com/embed/BOVISVuz5pw?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "BOVISVuz5pw",
				img: "https://www.ctm.co.za/media/catalog/product/z/a/zara_feature_shiny_ceramic_wall_tile_-_300_x_600mm_-_ws1fcza00a7l.00_00_01_25.still001.jpg",
			},
			{
				url: "https://www.ctm.co.za/arenys-taupe-ecotec-matt-porcelain-floor-tile-800-x-800mm-gr1car331e-product.html",
				link: "https://www.youtube.com/embed/Nr4LbEB2KyM?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "Nr4LbEB2KyM",
				img: "https://www.ctm.co.za/media/catalog/product/a/r/arenys_taupe_ecotec_matt_porcelain_floor_tile_-_800_x_800mm_.jpg",
			},
			{
				url: "https://www.ctm.co.za/arenys-charcoal-ecotec-matt-porcelain-floor-tile-800-x-800mm-gr1car811e-product.html",
				link: "https://www.youtube.com/embed/Nr4LbEB2KyM?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "Nr4LbEB2KyM",
				img: "https://www.ctm.co.za/media/catalog/product/a/r/arenys_charcoal_ecotec_matt_porcelain_floor_tile_.jpg",
			},
			{
				url: "https://www.ctm.co.za/prime-cement-grey-ecotec-matt-porcelain-floor-tile-600-x-1200mm-gr1cpr202e-product.html",
				link: "https://www.youtube.com/embed/7u55DyKtslI?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "7u55DyKtslI",
				img: "https://www.ctm.co.za/api/catalog/product/g/r/gr1cpr202e---prime-cement-grey-ecotec-matt-porcelain-floor-tile---600-x-1200mm.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-lusaka-blend-ecotec-matt-porcelain-floor-tile-350-x-350mm-vt1klu92351e-product.html",
				link: "https://www.youtube.com/embed/VhmAl_SFT8A?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "VhmAl_SFT8A",
				img: "https://www.ctm.co.za/api/catalog/product/v/t/vt1klu92351e---kilimanjaro-lusaka-blend-ecotec-matt-porcelain-floor-tile---350-x-350mm-touch-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/kilimanjaro-chwaka-slate-ecotec-matt-porcelain-floor-tile-350-x-350mm-product.html",
				link: "https://www.youtube.com/embed/2gK6xmrLcMA?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "2gK6xmrLcMA",
				img: "https://www.ctm.co.za/media/catalog/product/c/h/chwaka.jpg",
			},
			{
				url: "https://www.ctm.co.za/twill-metric-satin-ceramic-wall-tile-300-x-600mm-ws1fctw00d7l-product.html",
				link: "https://www.youtube.com/embed/uE72TTK3158?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "uE72TTK3158",
				img: "https://www.ctm.co.za/api/catalog/product/w/s/ws1fctw00d7l---twill-metric-satin-ceramic-wall-tile---300-x-600mm-touch-and-feel.jpg",
			},
			{
				url: "https://www.ctm.co.za/carrara-gold-glaze-polished-porcelain-floor-tile-600-x-1200mm-dcsu017-product.html",
				link: "https://www.youtube.com/embed/vQnMRsQZEp4?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "vQnMRsQZEp4",
				img: "https://www.ctm.co.za/media/catalog/product/c/a/carrara_gold_glazed_polished_porcelain_floo_tile_600_x_1200_-_dcsu017.00_00_00_00.still001.jpg",
			},
			{
				url: "https://www.ctm.co.za/pure-onyx-shiny-glazed-polished-porcelain-floor-tile-600-x-1200mm-product.html",
				link: "https://www.youtube.com/embed/-_ICANjsDXg?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "-_ICANjsDXg",
				img: "https://www.ctm.co.za/media/catalog/product/h/q/hqdefault_887.jpg",
			},
			{
				url: "https://www.ctm.co.za/origins-cederberg-grey-matt-ceramic-floor-tile-600-x-200mm-pg1uce2023-product.html",
				link: "https://www.youtube.com/embed/DtqzWEsqbdQ?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "DtqzWEsqbdQ",
				img: "https://www.ctm.co.za/api/catalog/product/p/g/pg1uce2023-origins-cederberg-grey-matt-ceramic-floor-tile---600-x-200mm-review-video.jpg",
			},
			{
				url: "https://www.ctm.co.za/origins-robertson-ivory-matt-ceramic-floor-tile-600-x-200mm-pg1uro1123-product.html",
				link: "https://www.youtube.com/embed/7lVG1EOMYRU?enablejsapi=1&origin=https://www.ctm.co.za/",
				youtubeID: "7lVG1EOMYRU",
				img: "https://www.ctm.co.za/api/catalog/product/p/g/pg1uro1123-origins-robertson-ivory-matt-ceramic-floor-tile---600-x-200mm-reveiw-video.jpg",
			},
		];

		function generateModalVideos(newjson) {
			var croVideoContainer = document.querySelector(".cro-video-top-inner");
			newjson.forEach(function (item) {
				var targetingUrl = item.url;
				if (window.location.href.indexOf(targetingUrl) !== -1) {
					// adding modal video
					var croVideoHTML = '<iframe id="cro-t-121-autoplay-video" width="100%" height="100%" src="' + item.link + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
					if (!document.querySelector('#cro-t-121-autoplay-video')) {
						croVideoContainer && croVideoContainer.insertAdjacentHTML("beforeend", croVideoHTML);
					}

				}
			});
		}

		function generateVideos(newjson) {
			var croVideoContainer2 = document.querySelector(".cro-t-colour-summary-right-part");

			newjson.forEach(function (item) {
				var targetingUrl = item.url;
				if (window.location.href.indexOf(targetingUrl) !== -1) {
					var croVideoHTML2 = `
					<div class="cro-t-colour-summary-right-part-video">
						<img class="colour-summary-right-img" src="${item.img}" alt="Rectangle" />
						<img class="cro-Banner-img-icon" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/New-icons.png" alt="" />
					</div>
					<div class="cro-t-video-inner cro-hide-overlay">
						<div id="cro-t-121-autoplay-video2"></div>
					</div>
				`;
					if (!document.querySelector(".cro-t-colour-summary-right-part-video")) {
						croVideoContainer2 && croVideoContainer2.insertAdjacentHTML("beforeend", croVideoHTML2);
					}

					function onYouTubeIframeAPIReady() {
						var player = new YT.Player("cro-t-121-autoplay-video2", {
							height: "452",
							width: "523",
							videoId: item.youtubeID,
						});

						var videoInner = document.querySelector(".cro-t-colour-summary-right-part-video");
						var videoWrapper = document.querySelector(".cro-t-video-inner");

						live(".cro-t-colour-summary-right-part-video", "click", function () {
							videoInner && videoInner.classList.add("cro-hide-overlay");
							if (videoWrapper.classList.contains("cro-hide-overlay")) {
								videoWrapper.classList.remove("cro-hide-overlay");
							}
							player.playVideo();
						});

						document.addEventListener("click", function (event) {
							var isClickInside = videoInner.contains(event.target);

							if (!isClickInside && player && typeof player.pauseVideo === 'function') {
								player.pauseVideo();
								// videoInner.classList.remove("cro-hide-overlay");
								// videoWrapper.classList.add("cro-hide-overlay");
							}
						});
					}

					waitForYT(function () {
						onYouTubeIframeAPIReady();
					});
				}
			});
		}

		/* Variation Init */
		function init() {
			addClass("body", "cro-t-121v");
			addClass("body", "cro-t-121v-hide");
			if (!document.querySelector(".cro-test-121popUp-lightBox")) {
				insertHtml("#html-body", popup, "afterbegin");
			}
			waitForElement(".product.media", function () {
				if (!document.querySelector("cro-new-pdpage-container")) {
					insertHtml(".product.media", cronewpart, "beforeend");
				}
			});

			waitForElement("#maincontent .product-info-main .trust-message", function () {
				if (!document.querySelector(".cro-new-pdpage-container-mob")) {
					insertHtml("#maincontent .product-info-main .trust-message", cronewpartMob, "afterend");
				}
			});

			waitForElement(".cro-t-colour-summary-right-part", function () {
				generateVideos(newjson);
			});

			waitForElement(".product #additional", function () {
				if (!document.querySelector(".cro-t-colour-summary")) {
					insertHtml(".product #additional", footerpart, "afterend");
				}
			});
		}

		live(".cro-new-left-img-wrapper, .cro-new-last-icon", "click", function (e) {
			e.preventDefault();
			removeClass("body", "cro-t-121v-hide");
			addClass("html", "cro-scroll-hide");

			waitForElement(".cro-video-top-inner", function () {
				generateModalVideos(newjson);
			});
		});
		live(".cro-test-121popUp-cross, .cro-test-121popUp-overlay", "click", function () {
			addClass("body", "cro-t-121v-hide");
			removeClass("html", "cro-scroll-hide");
			document.querySelector(".cro-video-top-inner #cro-t-121-autoplay-video") && document.querySelector(".cro-video-top-inner #cro-t-121-autoplay-video").remove();
		});

		waitForElement("#html-body .page-wrapper", init);
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();