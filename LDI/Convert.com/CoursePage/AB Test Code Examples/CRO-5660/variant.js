(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "croki82_v2";
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

		function trigger() {
			var doneTypingInterval = 5000;  //time in ms, 5 seconds for example
			var intervalCallAgain = setInterval(function () {
				waitForElement('h1.elementor-heading-title', function () {
					addingClassToSection()
				});
			}, 400);

			//start the countdown
			var Timer = setTimeout(function () {
				clearInterval(intervalCallAgain);
			}, doneTypingInterval);

		}

		function addingClassToSection() {
			document.querySelectorAll('h1.elementor-heading-title').forEach(function (e) {
				if (e.textContent.includes('ORTHODONTICS COURSES')) {
					e.closest('section').classList.add('cro-t-KI82-HeroSection', 'cro-ORTHO');
				}

				if (e.textContent.includes('IMPLANTOLOGY & ORAL SURGERY COURSES')) {
					e.closest('section').classList.add('cro-t-KI82-HeroSection', 'cro-IMPLANTOLOGY');
				}

				if (e.textContent.includes('AESTHETIC & RESTORATIVE DENTISTRY COURSES')) {
					e.closest('section').classList.add('cro-t-KI82-HeroSection', 'cro-AESTHETIC');
				}
			});
		}


		var pageData = {
			"https://londondentalinstitute.com/orthodontics-dentofacial-orthopaedics/": {
				"subtitle": "ORTHODONTICS COURSES",
				"rating_icon": "https://media.londondentalinstitute.com/wp-content/uploads/2024/11/16064242/Group-1715.svg",
				"title": "Study for your <span>Diploma in Orthodontics & Dentofacial Orthopaedics (PG Dip.)</span>",
				"desc_1": "Advance your clinical expertise with our 12-month online programme, empowering dentists to confidently deliver high-quality orthodontic and dentofacial orthopaedic treatments",
				"desc_2": "Master the latest orthodontic techniques, from clear aligners to fixed and removable appliances, and build the confidence to transform your patients’ smiles—all without leaving your practice.",
				"enrol_url": "https://vle.londondentalinstitute.com/orthodontics-and-dentofacial-orthopaedics-registration/",
				"prospectus_url": "https://londondentalinstitute.com/ortho-prospectus-download/",
				"image": "https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI82+/image+(4)+(1).png",
				"vimeoVideo": "https://player.vimeo.com/video/1074336960"
			},
			"https://londondentalinstitute.com/dental-implantology-oral-surgery/": {
				"subtitle": "IMPLANTOLOGY & ORAL SURGERY COURSES",
				"rating_icon": "https://media.londondentalinstitute.com/wp-content/uploads/2024/11/16064242/Group-1715.svg",
				"title": "Study for your <span>Diploma in <br>Dental Implantology & Oral <br class='mobile'>Surgery <br>(PG Dip.)</span>",
				"desc_1": "Advance your clinical expertise with our 12-month online programme, empowering dentists to confidently deliver superior dental implants.",
				"desc_2": "Access world-class educators and comprehensive evidence-based teaching from anywhere in the world, delivering clinical expertise directly to you—no travel required.",
				"enrol_url": "https://vle.londondentalinstitute.com/diploma-in-dental-implantology-oral-surgery-registration/",
				"prospectus_url": "https://londondentalinstitute.com/dios-prospectus-download/",
				"image": "https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI82+/image+(4)+(1).png",
				"vimeoVideo": "https://player.vimeo.com/video/1111262328"
			},
			"https://londondentalinstitute.com/aesthetic-restorative-dentistry/": {
				"subtitle": "AESTHETIC & RESTORATIVE DENTISTRY COURSES",
				"rating_icon": "https://media.londondentalinstitute.com/wp-content/uploads/2024/11/16064242/Group-1715.svg",
				"title": "Study for your <span>Diploma in Aesthetic & Restorative Dentistry (PG Dip.)</span>",
				"desc_1": "Advance your clinical expertise with our 12-month online programme, empowering dentists to deliver high-quality, aesthetically-focused restorative dentistry",
				"desc_2": "Access world-class educators and comprehensive evidence-based teaching from anywhere in the world, delivering clinical expertise directly to you—no travel required.",
				"enrol_url": "https://vle.londondentalinstitute.com/aesthetic-and-restorative-dentistry-registration/",
				"prospectus_url": "https://londondentalinstitute.com/ARD-prospectus-download/",
				"image": "https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI82+/image+(4)+(1).png",
				"vimeoVideo": "https://player.vimeo.com/video/1083478678"
			}
		}

		var currentUrl = window.location.href.split("?")[0];
		var data = pageData[currentUrl];

		if (data) {
			var heroBannerVideo = `
    <div class="croki82-hero-banner-section">
      <div class="croki82-hero-banner-wrapper cro-container">
        <div class="croki82-hero-banner-inner">

          <!-- LEFT -->
          <div class="croki82-hero-banner-left">
            <div class="croki82-hero-banner-left-wrapper">
              <div class="croki82-banner-subtitle">
                <div class="croki82-hero-banner-subtitle">${data.subtitle}</div>
                <div class="croki82-hero-banner-rating">
                  <div class="croki82-hero-banner-rating-text">
                    Rated <span><img class="croki82-hero-banner-rating-icon" src="${data.rating_icon}" alt=""></span>
                    by past graduates
                  </div>
                </div>
              </div>

              <div class="croki82-hero-banner-title-desc">
                <div class="croki82-hero-banner-title">
                  <h1 class="croki82-hero-banner-title-text">${data.title}</h1>
                </div>
                <div class="croki82-hero-banner-desc-parent">
                  <div class="croki82-hero-banner-desc desc-1">${data.desc_1}</div>
                  <div class="croki82-hero-banner-desc desc-2">${data.desc_2}</div>
                </div>
              </div>

              <div class="croki82-hero-banner-buttons">
			  <div class="croki82-hero-banner-buttons-wrapper">
                <a href="${data.enrol_url}" class="cro-btn"> <span class="cro-btn-primary">Enrol now</span></a>
                <a href="${data.prospectus_url}" class="cro-btn"> <span class="cro-btn-outline">Download prospectus</span></a>
              </div>
			  </div>
            </div>

          </div>

          <!-- RIGHT -->
          <div class="croki82-hero-banner-right">
            <div class="croki82-hero-banner-right-wrapper">
              <div class="croki82-high-quality-video-content">
                <div class="croki82-high-quality-video-main-img">
                  <img src="${data.image}" alt="">
                </div>
                <div class="croki82-play-icon"> 
				<svg xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 76 76"
		                                 fill="none">
		                                 <ellipse cx="37.6437" cy="37.6287" rx="37.6437" ry="37.6287" fill="#F8FBFB"
		                                     fill-opacity="0.6" />
		                                <path d="M52.9092 37.8632L29.4289 47.113L29.4289 28.6133L52.9092 37.8632Z"
	                                    fill="#00A9E0" />
		                            </svg></div>
                <div class="cre_KI80_Video_container" style="padding:56.25% 0 0 0;position:relative;"><iframe class="cre_KI80_Video" src="${data.vimeoVideo}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title=""></iframe></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>`;
		}



		function AddPageClass() {
			var url = window.location.href;

			if (url === "https://londondentalinstitute.com/orthodontics-dentofacial-orthopaedics/") {
				addClass("body", "cro-page-orthodontics");
			}

			if (url === "https://londondentalinstitute.com/dental-implantology-oral-surgery/") {
				addClass("body", "cro-page-implantology");
			}

			if (url === "https://londondentalinstitute.com/aesthetic-restorative-dentistry/") {
				addClass("body", "cro-page-aesthetic");
			}
		};



		/* Variation Init */
		function init() {
			addClass("body", variation_name);
			trigger();

			AddPageClass()

			waitForElement('.cro-t-KI82-HeroSection', function () {
				if (!document.querySelector('.croki82-hero-banner-section')) {
					insertHtml('.cro-t-KI82-HeroSection', heroBannerVideo, "afterend");

					if (window.innerWidth <= 1024) {

						waitForElement('.croki82-hero-banner-inner', function () {
							checkwidth();
						})
					}
				}
			});

		}


		function addEvent() {
			live(".croki82-high-quality-video-main-img, .croki82-play-icon", "click", function () {
				addClass('body', 'cro-t-86-hide')
				removeClass('html', 'cro-scroll-hide')
				document.querySelector('.croki82-high-quality-video-content').classList.add('cro-t-180-hide');
				setTimeout(function () {
					// var iframeVideo = document.querySelector('.cre_KI80_Video');
					// var player = new Vimeo.Player(iframeVideo);
					// player && player.play();
				}, 40)

			})
		}


		function checkwidth() {
			waitForElement('.cre_KI80_Video', function () {
				var div = document.querySelector(".croki82-hero-banner-inner");
				if (div) {
					var width = div.offsetWidth; // numeric width in px
					var video = document.querySelector('.cre_KI80_Video');
					if (video) {
						var height = width - 100; // custom height rule
						video.style.width = width + "px";
						video.style.height = height + "px";

						console.log("Width:", width);
						console.log("Height:", height);
					}
				}
			});
		}


		if (!window.cro82) {
			waitForElement('#content', init);
			addEvent();
			window.cro82 = true;
		}

		/* Initialise variation */


	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();