(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro-t-ldi-187";
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

		function waitForSwiper(trigger) {
			var interval = setInterval(function () {
				if (typeof window.Swiper != "undefined") {
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

		/* Swiper */
		function waitForSwiper(trigger) {
			var interval = setInterval(function () {
				if (typeof window.Swiper !== "undefined") {
					clearInterval(interval);
					trigger();
				}
			}, 50);
			setTimeout(function () {
				clearInterval(interval);
			}, 15000);
		}

		function addScript() {
			var scriptOne = document.createElement("script");
			scriptOne.src = "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.min.js";
			document.querySelector("head").appendChild(scriptOne);
			var swiperCss = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.css" integrity="sha512-ipO1yoQyZS3BeIuv2A8C5AwQChWt2Pi4KU3nUvXxc4TKr8QgG8dPexPAj2JGsJD6yelwKa4c7Y2he9TTkPM4Dg==" crossorigin="anonymous" referrerpolicy="no-referrer" />';
			document.querySelector("head").insertAdjacentHTML("beforeend", swiperCss);
		}

		addScript();

		function swiperInit() {
			waitForElement(".cro_187-slider-promotionBadge .swiper", function () {
				new Swiper(".cro_187-slider-promotionBadge .swiper", {
					loop: true,
					pagination: {
						el: '.cro_187-slider-promotionBadge .swiper-pagination',
						clickable: true,
					},
					navigation: {
						nextEl: ".cro_187-slider-promotionBadge-next",
						prevEl: ".cro_187-slider-promotionBadge-prev",
					},
					slidesPerView: 1,
					spaceBetween: 20, // Adjust the spacing between slides
					speed: 300,
				});
			});
		}

		// variation html
		var cro_187_testimonial = `<section class="cro_187-slider-promotionBadge">
        <div class="cro_187-slider-promotionBadge-wrapper">
            <div class="cro_187-slider-promotionBadge-inner">
                <div class="cro_187-slider-promotionBadge-header">
                    <h2 class="cro_187-slider-home">TESTIMONIALS</h2>
                </div>
                <div class="cro_187-slider-promotionBadge-content">
                    <p class="cro_187-slider-promotionBadge-topContent">Hear from our alumni</p>
                </div>
                <div class="cro_187-slider-promotionBadge-images">
                    <div class="cro_187-slider-inner-left-part-inner-swiper">
                        <div class="swiper">
                          <div class="swiper-wrapper cro_187-slider-inner-swiperWrapper">
                               <div class="swiper-slide">
                              <a
                                href="https://media.londondentalinstitute.com/wp-content/uploads/2024/11/12213817/dr-tejaswi-video-testimonial.jpg?_gl=1*gp5vln*_gcl_au*MTU2ODQ5OTI2Mi4xNzM1NDk4Nzg2*FPAU*MTU2ODQ5OTI2Mi4xNzM1NDk4Nzg2*_ga*MTUxMjI3NDgzOS4xNzM1NDk4Nzg5*_ga_6HHV1XKWQ8*MTczNTQ5ODc4OC4xLjEuMTczNTQ5ODc5MC4wLjAuMzUwMDczNDI4*_fplc*UUNhbThHWjZLeHVyZmslMkZZa003NzVVUUxmSW1iSmpIYTIlMkJiM2xKR1M3SEFHcXRBSXMlMkZvSUMlMkZESExRWXowbUEwTkNkMGFhY0dTWXRTWGJLUnIzJTJCJTJCYVllSUl4QndXWTlzeiUyQnNwWW16QW9ob0JvdDllbEttVzBvbklDT0tQVHclM0QlM0Q."
                                data-elementor-open-lightbox="yes"
                                data-elementor-lightbox-slideshow="1c69a48"
                                data-elementor-lightbox-title="dr-tejaswi-video-testimonial.jpg"
                                data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjEwLCJ1cmwiOiJodHRwczpcL1wvbWVkaWEubG9uZG9uZGVudGFsaW5zdGl0dXRlLmNvbVwvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyNFwvMTFcLzEyMjEzODE3XC9kci10ZWphc3dpLXZpZGVvLXRlc3RpbW9uaWFsLmpwZyIsInNsaWRlc2hvdyI6IjFjNjlhNDgifQ%3D%3D"
                                data-elementor-lightbox-video="https://player.vimeo.com/video/806239451?autoplay=1&amp;rel=0&amp;controls=0#t="
                                >
                                    <div class="cro_187-slider-wrapper-img">
                                        <div class="cro_187-slider-inner-img">
                                            <img src="https://media.londondentalinstitute.com/wp-content/uploads/2024/11/12213817/dr-tejaswi-video-testimonial.jpg?_gl=1*gp5vln*_gcl_au*MTU2ODQ5OTI2Mi4xNzM1NDk4Nzg2*FPAU*MTU2ODQ5OTI2Mi4xNzM1NDk4Nzg2*_ga*MTUxMjI3NDgzOS4xNzM1NDk4Nzg5*_ga_6HHV1XKWQ8*MTczNTQ5ODc4OC4xLjEuMTczNTQ5ODc5MC4wLjAuMzUwMDczNDI4*_fplc*UUNhbThHWjZLeHVyZmslMkZZa003NzVVUUxmSW1iSmpIYTIlMkJiM2xKR1M3SEFHcXRBSXMlMkZvSUMlMkZESExRWXowbUEwTkNkMGFhY0dTWXRTWGJLUnIzJTJCJTJCYVllSUl4QndXWTlzeiUyQnNwWW16QW9ob0JvdDllbEttVzBvbklDT0tQVHclM0QlM0Q." alt="">
                                        </div>
                                        <div class="cro_187-slider-inner-playIcon">
                                            <img src=" https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Rollback+%7C+Course+page+%7C+All+%7C+LDI-187/ldi-187-playIcon.svg" alt="">
                                        </div>
                                    </div>
                              </a>
                            </div>
                            <div class="swiper-slide">
                              <a href="https://media.londondentalinstitute.com/wp-content/uploads/2024/11/12213817/vlcsnap-2022-12-28-15h56m34s481.jpg"
                                data-elementor-open-lightbox="yes"
                                data-elementor-lightbox-slideshow="1c69a48"
                                data-elementor-lightbox-title="vlcsnap-2022-12-28-15h56m34s481.jpg"
                                data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjExLCJ1cmwiOiJodHRwczpcL1wvbWVkaWEubG9uZG9uZGVudGFsaW5zdGl0dXRlLmNvbVwvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyNFwvMTFcLzEyMjEzODE3XC92bGNzbmFwLTIwMjItMTItMjgtMTVoNTZtMzRzNDgxLmpwZyIsInNsaWRlc2hvdyI6IjFjNjlhNDgifQ%3D%3D"
                                data-elementor-lightbox-video="https://player.vimeo.com/video/804865202?autoplay=1&amp;rel=0&amp;controls=0#t="
                                >
                                <div class="cro_187-slider-wrapper-img">
                                    <div class="cro_187-slider-inner-img">
                                        <img src="https://media.londondentalinstitute.com/wp-content/uploads/2024/11/12213817/vlcsnap-2022-12-28-15h56m34s481.jpg" alt="">
                                    </div>
                                    <div class="cro_187-slider-inner-playIcon">
                                        <img src=" https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Rollback+%7C+Course+page+%7C+All+%7C+LDI-187/ldi-187-playIcon.svg" alt="">
                                    </div> 
                                </div>
                              </a>
                            </div>
                            <div class="swiper-slide">
                              <a
                                href="https://media.londondentalinstitute.com/wp-content/uploads/2024/11/12213817/dr-abhinav-video-testimonial.jpg"
                                data-elementor-open-lightbox="yes"
                                data-elementor-lightbox-slideshow="1c69a48"
                                data-elementor-lightbox-title="dr-abhinav-video-testimonial.jpg"
                                data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjEyLCJ1cmwiOiJodHRwczpcL1wvbWVkaWEubG9uZG9uZGVudGFsaW5zdGl0dXRlLmNvbVwvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyNFwvMTFcLzEyMjEzODE3XC9kci1hYmhpbmF2LXZpZGVvLXRlc3RpbW9uaWFsLmpwZyIsInNsaWRlc2hvdyI6IjFjNjlhNDgifQ%3D%3D"
                                data-elementor-lightbox-video="https://player.vimeo.com/video/804864536?autoplay=1&amp;rel=0&amp;controls=0#t="
                                >
                                <div class="cro_187-slider-wrapper-img">
                                    <div class="cro_187-slider-inner-img">
                                        <img src="https://media.londondentalinstitute.com/wp-content/uploads/2024/11/12213817/dr-abhinav-video-testimonial.jpg" alt="">
                                    </div>
                                    <div class="cro_187-slider-inner-playIcon">
                                        <img src=" https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Rollback+%7C+Course+page+%7C+All+%7C+LDI-187/ldi-187-playIcon.svg" alt="">
                                    </div>                            
                                </div>
                              </a>
                            </div>
                            <div class="swiper-slide">
                              <a
                                href="https://media.londondentalinstitute.com/wp-content/uploads/2024/11/12213817/thabo-thumb.jpg"
                                data-elementor-open-lightbox="yes"
                                data-elementor-lightbox-slideshow="1c69a48"
                                data-elementor-lightbox-title="thabo-thumb.jpg"
                                data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjEzLCJ1cmwiOiJodHRwczpcL1wvbWVkaWEubG9uZG9uZGVudGFsaW5zdGl0dXRlLmNvbVwvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyNFwvMTFcLzEyMjEzODE3XC90aGFiby10aHVtYi5qcGciLCJzbGlkZXNob3ciOiIxYzY5YTQ4In0%3D"
                                data-elementor-lightbox-video="https://player.vimeo.com/video/806238796?autoplay=1&amp;rel=0&amp;controls=0#t="
                                >
                                <div class="cro_187-slider-wrapper-img">
                                    <div class="cro_187-slider-inner-img">
                                        <img src="https://media.londondentalinstitute.com/wp-content/uploads/2024/11/12213817/thabo-thumb.jpg" alt="">
                                    </div>
                                    <div class="cro_187-slider-inner-playIcon">
                                        <img src=" https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Rollback+%7C+Course+page+%7C+All+%7C+LDI-187/ldi-187-playIcon.svg" alt="">
                                    </div>                            
                                </div>
                              </a>
                            </div>
                            <div class="swiper-slide">
                              <a
                                href="https://media.londondentalinstitute.com/wp-content/uploads/2024/11/12213817/max-thumb.jpg"
                                data-elementor-open-lightbox="yes"
                                data-elementor-lightbox-slideshow="1c69a48"
                                data-elementor-lightbox-title="max-thumb.jpg"
                                data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjE0LCJ1cmwiOiJodHRwczpcL1wvbWVkaWEubG9uZG9uZGVudGFsaW5zdGl0dXRlLmNvbVwvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyNFwvMTFcLzEyMjEzODE3XC9tYXgtdGh1bWIuanBnIiwic2xpZGVzaG93IjoiMWM2OWE0OCJ9"
                                data-elementor-lightbox-video="https://player.vimeo.com/video/804864897?autoplay=1&amp;rel=0&amp;controls=0#t="
                                > 
                                <div class="cro_187-slider-wrapper-img">
                                    <div class="cro_187-slider-inner-img">
                                        <img src="https://media.londondentalinstitute.com/wp-content/uploads/2024/11/12213817/max-thumb.jpg" alt="">
                                    </div>
                                    <div class="cro_187-slider-inner-playIcon">
                                        <img src=" https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Rollback+%7C+Course+page+%7C+All+%7C+LDI-187/ldi-187-playIcon.svg" alt="">
                                    </div>                            
                                </div>  
                              </a>
                            </div>   
                                  
                          </div>
                          
                        </div>
                        <div class="swiper-pagination"></div>
                          <div class="swiper-button-prev cro_187-slider-promotionBadge-prev cro_187-slider-arrowbtn">
                          
                          
                          </div>
                          <div class="swiper-button-next cro_187-slider-promotionBadge-next cro_187-slider-arrowbtn">
                          
                            
                          </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

		// Main variation
		function cro_orthopaedics() {
			addClass("body", variation_name);

			waitForElement(".elementor-top-section .elementor-widget-container h2", function () {
				document.querySelectorAll('.elementor-top-section .elementor-widget-container h2').forEach(function (e) {
					var parent = e.closest('.elementor-top-section')
					if (e.innerHTML.indexOf('Pricing') != -1) {
						parent.classList.add('cro-t-187-pricing')
					}
					if (e.innerHTML.indexOf('Requirements and accreditation') != -1) {
						parent.classList.add('cro-t-187-accreditation')
					}
					if (e.innerHTML.indexOf('Module overview') != -1) {
						parent.classList.add('cro-t-187-module')
					}
					if (e.innerHTML.indexOf('Why dentists love our courses') != -1) {
						parent.classList.add('cro-t-187-dentistsCourses')
					}
					if (e.innerHTML.indexOf('benefit you?') != -1) {
						parent.classList.add('cro-t-187-benefit')
					}
				})
			});

			waitForElement(".cro-t-187-pricing", function () {
				if (!document.querySelector(".cro_187-slider-promotionBadge")) {
					insertHtml(".cro-t-187-pricing", cro_187_testimonial, "beforebegin");
					// waitForSwiper(function () {
					// 	if (!document.querySelector('.cro_187_alumniTestimonial [data-swiper-slide-index]')) {
					// 		if (!window.cro_t_187) {

					// 			console.log('Fire')
					// 			window.cro_t_187 = true;
					// 		}
					// 	}
					// 	// 
					// });
					waitForSwiper(swiperInit);
				}
			});

			// waitForElement(".cro-t-187-pricing", function () {
			// 	if (!document.querySelector(".cro_187_alumniTestimonial")) {
			// 		insertHtml(".cro-t-4_34_courses", cro_187_testimonial, "beforebegin");
			// 	}
			// 	waitForSwiper(swiperInit);
			// });


			waitForElement('.cro-t-187-pricing', function () {
				document.querySelector('.cro-t-187-pricing').insertAdjacentElement('afterend', document.querySelector('.cro-t-187-benefit'))
			});

			waitForElement('.cro-t-187-benefit', function () {
				document.querySelector('.cro-t-187-benefit').insertAdjacentElement('afterend', document.querySelector('.cro-t-187-accreditation'))
			});


			waitForElement('.cro-t-187-accreditation', function () {
				document.querySelector('.cro-t-187-accreditation').insertAdjacentElement('afterend', document.querySelector('.cro-t-187-module'))
			});

			waitForElement('.cro-t-187-module', function () {
				document.querySelector('.cro-t-187-module').insertAdjacentElement('afterend', document.querySelector('.cro-t-187-dentistsCourses'))
			});

			// cro_187_sectionFetch('https://londondentalinstitute.com/about/');
		}

		function callingSwiper() {
			var myCardSwiper = new Swiper('.cro_187_alumniTestimonial .swiperx', {
				slidesPerView: 1,
				spaceBetween: 20,
				pagination: {
					el: '.cro_187_alumniTestimonial .swiper-pagination',
					clickable: true,
				},
				navigation: {
					nextEl: '.cro_187_alumniTestimonial .elementor-swiper-button-next',
					prevEl: '.cro_187_alumniTestimonial .elementor-swiper-button-prev',
				},
				loop: true,
			});
		}

		function cro_187_sectionFetch(link) {
			var url = link;
			var xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function () {
				if (this.readyState === 4) {
					if (this.status === 200) {
						var parser = new DOMParser();
						var doc = parser.parseFromString(this.responseText, 'text/html');
						// Extract specific content
						var sectionContent = doc.querySelector('section .elementor-widget-container h4.elementor-heading-title').closest('section');
						if (sectionContent) {
							document.querySelector('.cro_187_alumniTestimonial-inner').innerHTML = sectionContent.innerHTML;
							waitForSwiper(function () {
								callingSwiper();
							});

						} else {
							console.error('Section not found on the page.');
							// Optionally, display a message in the modal body
							document.querySelector('.cro_187_alumniTestimonial-inner').innerHTML = '<p>Content not found.</p>';
						}
					}
				}
			};

			xhttp.open("GET", url, true);
			xhttp.send();
		}


		function croEventHandkler() {
			live("selector", "click", function () { });
		}

		// if (!window.cro_t_187) {
		// 	// croEventHandkler();
		// 	window.cro_t_187 = true;
		// }

		/* Initialise variation */
		var url = window.location.pathname;
		if (url === '/') {
			// waitForElement('body', homepage);
		} else if (url.includes('/dental-courses/')) {
			// waitForElement('body', dentalCourses);
		} else if (url.includes('/aesthetic-restorative-dentistry/') || url.includes('/dental-implantology-oral-surgery/')) {
			waitForElement('body', cro_orthopaedics);
		} else if (url.includes('/orthodontics-dentofacial-orthopaedics/')) {
			waitForElement('body', cro_orthopaedics);
		} else if (url.includes('/about/')) {
			// waitForElement('body', cro_about);
		}
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();