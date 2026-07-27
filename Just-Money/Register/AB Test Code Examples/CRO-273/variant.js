(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro-new-slider";
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

		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}

		/* Variation html */
		var newSec = `<section class="cro-21_51_newSection">
		<div class="cro-new-sec-wrapper relative container">
		  <div class="cro-header-part">
			<h2 class="top-header">What our clients say about us</h2>
			<div class="sec-part">
			  <div class="sec-header-part">
				<p class="sec-frst-text">Rated 5/5</p>
				<img class="top-icon" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
				<p class="sec-sec-text">out of <strong>461</strong> Reviews on Hellopeter</p>
			  </div>
			</div>
		  </div>
		  <div class="cro-cards-part-inner">
			<div class="cro-cards-part-inner-slider">
			  <div class="swiper">
				<div class="swiper-wrapper">
				  <div class="swiper-slide">
					<div class="first-card cro-review-card">
					  <div class="back-part">
						<!-- <h3 class="card-header">"Great Service. Great Team"</h3> -->
						<p class="under-text">I have received the best, most precise and understandable information re my score; and they
						  have provided the best strategies to improve it.</p>
						<img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
						<p class="clint-name">Thapelo</p>
	  
					  </div>
					</div>
				  </div>
				  <div class="swiper-slide">
					<div class="sec-card cro-review-card">
					  <div class="back-part">
						<!-- <h3 class="card-header">"Very professional and friendly"</h3> -->
						<p class="under-text">My question has been answered perfectly, thank you once again</p>
						<img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
						<p class="clint-name">Nkululeko</p>
	  
					  </div>
					</div>
				  </div>
				  <div class="swiper-slide">
					<div class="third-card cro-review-card">
					  <div class="back-part">
						<!-- <h3 class="card-header">"On top of their game"</h3> -->
						<p class="under-text">When I started, my accounts were worth R90 000. But yesterday I received a confirmation that my
						  last account was ruled in my favour. I have gone from R90 000 to R0 balance with guidance and
						  advice from JustMoney. I'm debt free and I want to thank the JustMoney team.</p>
						<img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
						<p class="clint-name">Nepo D</p>
	  
					  </div>
					</div>
				  </div>
				  <div class="swiper-slide">
					<div class="four-card cro-review-card">
					  <div class="back-part">
						<!-- <h3 class="card-header">"Thanks to JustMoney"</h3> -->
						<p class="under-text">JustMoney is the best experience I have ever had.</p>
						<img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
						<p class="clint-name">Khuthatso</p>
					  </div>
					</div>
				  </div>
				  <div class="swiper-slide">
					<div class="first-card cro-review-card">
					  <div class="back-part">
						<!-- <h3 class="card-header">"Great Service. Great Team"</h3> -->
						<p class="under-text">Eager to assist you.</p>
						<img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
						<p class="clint-name">Tina K</p>
	  
					  </div>
					</div>
				  </div>
				  <div class="swiper-slide">
					<div class="first-card cro-review-card">
					  <div class="back-part">
						<!-- <h3 class="card-header">"Great Service. Great Team"</h3> -->
						<p class="under-text">I love that they call almost immediately if one needs to speak to a consultant. They are well spoken helpful and
						  to the point</p>
						<img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
						<p class="clint-name">Shamima</p>
	  
					  </div>
					</div>
				  </div>
				  <div class="swiper-slide">
					<div class="sec-card cro-review-card">
					  <div class="back-part">
						<!-- <h3 class="card-header">"Very professional and friendly"</h3> -->
						<p class="under-text">JustMoney is a superb solution for your credit score, and solutions about how to fix your credit score.</p>
						<img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
						<p class="clint-name">Thokozani</p>
	  
					  </div>
					</div>
				  </div>
				  <div class="swiper-slide">
					<div class="third-card cro-review-card">
					  <div class="back-part">
						<!-- <h3 class="card-header">"On top of their game"</h3> -->
						<p class="under-text">Very efficient and useful. I'm impressed.</p>
						<img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
						<p class="clint-name">Londiwe</p>
	  
					  </div>
					</div>
				  </div>
				  <div class="swiper-slide">
					<div class="four-card cro-review-card">
					  <div class="back-part">
						<!-- <h3 class="card-header">"Thanks to JustMoney"</h3> -->
						<p class="under-text">JustMoney helped me to realise how important it is to keep my credit rating checked. Also, it
						  offers ways on how to improve my score.</p>
						<img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
						<p class="clint-name">Molefe M</p>
					  </div>
					</div>
				  </div>
				  <!-- <div class="swiper-slide">
					<div class="four-card cro-review-card">
					  <div class="back-part">
						<p class="under-text">Thanks to JustMoney. I didn't know this company was so
						  helpful in this
						  manner. Your staff is excellent...your service is too. Thanks</p>
						<img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
						<p class="clint-name">Pryzene M</p>
					  </div>
					</div>
				  </div> -->
				  <div class="swiper-slide">
					<div class="four-card cro-review-card">
					  <div class="back-part">
						<!-- <h3 class="card-header">"Thanks to JustMoney"</h3> -->
						<p class="under-text">It is great working with JustMoney. l can get a lot of information about my credit score and how to improve my profile.</p>
						<img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
						<p class="clint-name">Noqazo A</p>
					  </div>
					</div>
				  </div>
				</div>
				
			  </div>
			</div>
			<div class="swiper-pagination"></div>
				<div class="swiper-button-prev cro-swiperButton">
				  <img class="cro-swiper-button-prev" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/t-21_51_justMoney-leftIcon.png" alt="">
				</div>
				<div class="swiper-button-next cro-swiperButton">
				  <img class="cro-swiper-button-next" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/t-21_51_justMoney-rightIcon.png" alt="">
				</div>
		  </div>
		</div>
	  </section>`;

		/* Variation Script */
		function addScript() {
			var scriptOne = document.createElement("script");
			scriptOne.src = "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.min.js";
			document.querySelector("head").appendChild(scriptOne);

			var swiperCss =
				'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.css" integrity="sha512-ipO1yoQyZS3BeIuv2A8C5AwQChWt2Pi4KU3nUvXxc4TKr8QgG8dPexPAj2JGsJD6yelwKa4c7Y2he9TTkPM4Dg==" crossorigin="anonymous" referrerpolicy="no-referrer" />';
			document.querySelector("head").insertAdjacentHTML("beforeend", swiperCss);
		}
		addScript();

		function swiperInit() {
			var swiper = new Swiper(".cro-21_51_newSection .swiper", {
				// autoHeight: true,
				loop: true,
				slidesPerView: 1,
				spaceBetween: 10,
				breakpoints: {
					// when window width is >= 480px
					768: {
						slidesPerView: 2,
						spaceBetween: 10,
					},
					// when window width is >= 480px
					1024: {
						slidesPerView: 3,
						spaceBetween: 10,
					},
					// when window width is >= 640px
					1280: {
						slidesPerView: 4,
						spaceBetween: 10,
					}
				},

				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
				speed: 850,
			});
		}


		/* Variation Init */
		function init() {
			// addClass("body", "recipe-t-review-1")
			addClass("body", "recipe-t-review-buildSlider")
			// addClass("body", "cro-new-slider")
			waitForElement(".ng-star-inserted .register-hld.register", function () {
				if (!document.querySelector(".cro-21_51_newSection")) {
					document.querySelector(".ng-star-inserted .register-hld.register").insertAdjacentHTML("afterend", newSec);
				}
				waitForSwiper(swiperInit);
			})


		}

		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();