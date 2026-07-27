(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "";
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

		// function swiperInit() {
		//     waitForElement(".cro-t-43-44-left-part .swiper", function () {
		//         new Swiper(".cro-t-43-44-left-part .swiper", {
		//             loop: true,
		//             navigation: {
		//                 nextEl: ".cro-t-43-44-left-part-next",
		//                 prevEl: ".cro-t-43-44-left-part-prev",
		//             },
		//             slidesPerView: 5, // Set default slidesPerView to 5
		//             spaceBetween: 1,
		//             breakpoints: {
		//                 300: {
		//                     slidesPerView: 1, // Adjust based on screen size
		//                 },
		//                 768: {
		//                     slidesPerView: 2, // Adjust based on screen size
		//                 },
		//                 1024: {
		//                     slidesPerView: 3, // Keep 4 slides per view on larger screens
		//                 },
		//                 1280: {
		//                     slidesPerView: 4, // Keep 5 slides per view on larger screens
		//                 },
		//             },
		//         });

		//     });
		// }
		function swiperInit() {
			waitForElement(".cro-t-43-44-left-part .swiper", function () {
				new Swiper(".cro-t-43-44-left-part .swiper", {
					loop: false,
					navigation: {
						nextEl: ".cro-t-43-44-left-part-next",
						prevEl: ".cro-t-43-44-left-part-prev",
					},
					slidesPerView: 4,
					spaceBetween: 25,
					breakpoints: {
						300: {
							slidesPerView: 1,

						},
						768: {
							slidesPerView: 2,

						},
						1024: {
							slidesPerView: 3,

						},
						1280: {
							slidesPerView: 4,

						},
					},
				});
			});
		}

		function removeClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.contains(cls) && el.classList.remove(cls);
            }
        }


		var heroSection = `<div class="cro-t-193-hero-section">
            <div class="cro-t-193-hero-wrapper">
                <div class="cro-t-193-hero-inner">
                    <div class="cro-t-193-hero-top-heading">
                        Let’s put money back in your pocket and get you closer to debt freedom
                    </div>
                    <div class="cro-t-193-hero-top-subheading">
                        Clear your credit record. Pay less towards your debt. Start today.
                    </div>
                    <div class="cro-t-193-hero-top-text-financial-health">
                        Imagine paying less interest, making one payment for all your debt, unlocking cash, and confidently
                        navigating your path to debt freedom.
                    </div>
                    <div class="cro-t-193-hero-top-text-financial-health text-2">
                        <strong>Feeling overwhelmed by debt?</strong> For 17 years, JustMoney has connected thousands of
                        South Africans – just like you – to trusted debt experts, leading to these very results.
                    </div>
                    <div class="cro-t-193-review-rated">
                        <div class="cro-t-193-review-rated-wrapper">
                            <div class="cro-t-193-review-rated-inner">
                                <div class="cro-t-193-review-rated-left">
                                    <div class="cro-t-193-review-rated-left-img">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="47" viewBox="0 0 41 47"
                                            fill="none">
                                            <path
                                                d="M31.7116 46.4848C24.2379 46.4848 16.7641 46.4848 9.29039 46.4848C9.23324 46.4516 9.17609 46.415 9.11791 46.3841C8.6066 46.1187 8.3341 45.6175 8.37901 45.0259C8.42596 44.4148 8.78724 43.9628 9.34857 43.8163C9.43634 43.7935 9.52615 43.7797 9.67209 43.75C9.67209 42.8906 9.63943 42.0393 9.67822 41.1913C9.77517 39.1179 11.0652 37.3202 12.8594 36.7915C13.3799 36.6382 13.9371 36.6256 14.4801 36.5924C15.0067 36.5604 15.5364 36.5856 16.0885 36.5856C16.0885 34.6151 16.0936 32.7167 16.0773 30.8172C16.0763 30.6799 15.9416 30.5174 15.8323 30.4132C15.1445 29.753 14.4556 29.095 13.7463 28.4634C13.5524 28.2906 13.3003 28.167 13.0574 28.1029C12.4889 27.953 11.898 27.8981 11.3356 27.7241C8.6709 26.8957 6.60829 25.066 4.93045 22.6801C2.16977 18.7552 0.786872 14.202 0.237796 9.29416C0.135738 8.37643 0.0775645 7.45299 0 6.53183C0 5.96312 0 5.3944 0 4.82569C0.315361 4.04757 0.859333 3.8004 1.60538 3.82329C3.0689 3.86792 4.53344 3.83588 5.99798 3.83588C6.13984 3.83588 6.28273 3.83588 6.43479 3.83588C6.43479 3.28204 6.46031 2.77626 6.42867 2.27506C6.37662 1.43172 6.63687 0.822952 7.36659 0.515137C16.1222 0.515137 24.8768 0.515137 33.6324 0.515137C34.3621 0.822952 34.6234 1.43172 34.5703 2.2762C34.5387 2.7774 34.5642 3.28318 34.5642 3.83588C34.7152 3.83588 34.8571 3.83588 35 3.83588C36.4645 3.83588 37.9301 3.86792 39.3936 3.82214C40.1407 3.79926 40.6846 4.04528 41 4.82455C41 5.39326 41 5.96197 41 6.53069C40.9796 6.69203 40.949 6.85223 40.9418 7.01472C40.8602 8.83987 40.6428 10.6444 40.2795 12.4261C39.4048 16.7092 37.8576 20.6181 35.1459 23.8587C33.167 26.2228 30.7972 27.7791 27.863 28.1121C27.6609 28.1349 27.4466 28.2803 27.2823 28.4302C26.5791 29.0687 25.9025 29.745 25.1921 30.3743C24.9911 30.5528 24.9054 30.7096 24.9074 30.9957C24.9196 32.7007 24.9125 34.4068 24.9145 36.113C24.9145 36.2571 24.9288 36.4013 24.938 36.5959C25.6861 36.5959 26.4046 36.573 27.1221 36.6004C28.9091 36.6668 30.4982 37.9427 31.0615 39.8422C31.2554 40.4945 31.2932 41.2142 31.3432 41.9088C31.3881 42.5267 31.3524 43.1526 31.3524 43.7603C32.2903 43.9411 32.7322 44.543 32.6077 45.384C32.52 45.971 32.1485 46.2594 31.7116 46.4848ZM8.86889 3.23512C8.86889 3.34612 8.86685 3.4205 8.86889 3.49488C8.93319 6.21944 9.17201 8.92455 9.61392 11.6056C10.2508 15.4619 11.2581 19.1797 12.9441 22.6343C13.9514 24.6975 15.1649 26.5844 16.9019 27.9667C18.5247 29.2586 20.2954 29.7473 22.2355 29.0378C23.8909 28.4313 25.1432 27.1875 26.2219 25.7079C28.0477 23.2065 29.2051 20.3103 30.1073 17.2745C31.0758 14.0144 31.6433 10.657 31.926 7.239C32.0352 5.91735 32.0882 4.59111 32.1689 3.23627C24.3767 3.23512 16.6447 3.23512 8.86889 3.23512ZM28.902 43.766C28.902 42.8471 28.9663 41.9466 28.8836 41.0632C28.805 40.2244 28.0773 39.2598 26.7087 39.2689C22.6141 39.2952 18.5185 39.2781 14.4229 39.2792C14.2494 39.2792 14.0759 39.2827 13.9034 39.2964C13.0931 39.3616 12.3266 39.9509 12.1848 40.8423C12.0337 41.7944 12.0613 42.783 12.0103 43.766C17.7153 43.766 23.3122 43.766 28.902 43.766ZM2.41266 6.54556C2.49023 7.42209 2.5484 8.25628 2.63923 9.08475C3.04747 12.8254 4.04254 16.343 5.86429 19.5333C6.88181 21.315 8.1259 22.862 9.73945 23.9926C10.211 24.3233 10.7223 24.5808 11.2152 24.8714C8.3535 19.1397 7.10634 12.9616 6.59707 6.54442C5.19784 6.54556 3.84046 6.54556 2.41266 6.54556ZM34.404 6.54785C33.8937 12.9925 32.6394 19.1603 29.7685 24.8382C30.2961 24.5762 30.8125 24.3084 31.2901 23.9697C33.3201 22.5325 34.7407 20.4796 35.8675 18.151C37.1983 15.4024 37.9678 12.4478 38.3373 9.35824C38.4475 8.43365 38.5026 7.4999 38.5853 6.54671C37.1657 6.54785 35.8083 6.54785 34.404 6.54785ZM22.4855 36.565C22.4855 34.9458 22.4855 33.3712 22.4855 31.7624C21.1486 32.1468 19.8351 32.1262 18.5206 31.7727C18.5206 33.3964 18.5206 34.971 18.5206 36.565C19.8484 36.565 21.1486 36.565 22.4855 36.565Z"
                                                fill="#E59A2C" />
                                        </svg>
                                    </div>
                                    <div class="cro-t-193-review-rated-left-text-part">
                                        <div class="cro-t-193-review-rated-left-text Rated">
                                            Rated
                                        </div>
                                        <div class="cro-t-193-review-rated-left-icon-text">
                                            <div class="cro-t-193-review-rated-left-text">
                                                <span>5/5</span>
                                            </div>
                                            <div class="cro-t-193-review-rated-left-icon-star">
                                                <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/JustMoney/JM-193/JM-193_5.png"
                                                    alt="">
                                            </div>
                                        </div>
                                        <div class="cro-t-193-review-rated-left-text Hellopeter">
                                            On Hellopeter
                                        </div>
                                    </div>
                                </div>
                                <div class="cro-t-193-review-rated-right">
                                    <div class="cro-t-193-review-rated-right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51"
                                            fill="none">
                                            <circle cx="25.5" cy="25.5" r="24" stroke="#E59A2C" stroke-width="3" />
                                            <rect x="24" y="6" width="2" height="24" rx="1" fill="#263648" />
                                            <rect x="25.8521" y="29.5728" width="2" height="19.4936" rx="1"
                                                transform="rotate(159.709 25.8521 29.5728)" fill="#263648" />
                                        </svg>
                                    </div>
                                    <div class="cro-t-193-review-rated-right-text">
                                        Application results <span>within 2 minutes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>`;

		var fromImg = `<img class="from-lock-icon" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/JustMoney/CRO+198/JM-193-lock-icon.svg" alt="">`

		var newParts = `<div class="cro-t-193-Technical-jargon">
        <div class="cro-t-193-Technical-jargon-wrapper cro-container">
            <div class="cro-t-193-Technical-jargon-inner">
                <div class="cro-t-193-Technical-jargon-text">
                    JustMoney is a personal finance platform that helps you <strong>make good money choices.</strong> Registering with JustMoney gives you access to your credit report and credit score, solutions and tools tailored to your needs, coaching, plus a wealth of expert articles that can help you make the best financial decisions. We want you to be money-savvy, confident, cash-flow positive, and on the way to being financially free.
                </div>
            </div>
        </div>
    </div>`;

		var Card = `<div class="cro-t-193-Unlock-cash-container" id="cro-t-193-Benefits-Section">
        <div class="cro-t-193-Unlock-cash-wrapper cro-container">
            <div class="cro-t-193-Unlock-cash-card-container">
                <div class="cro-t-193-Unlock-cash-card card-1">
                    <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/JustMoney/CRO+198/JM-193-benefit-img-1.png"
                        alt="Unlock cash">
                    <h3 class="cro-t-193-Unlock-cash-card-header">Get instant debt relief</h3>
                    <p class="cro-t-193-Unlock-cash-card-subheader">Many South Africans struggle to manage their debt,
                        which can have stressful and lasting effects. Combine your debts into a <strong>single,
                            affordable monthly payment,</strong> unlock cash, find out more about the <strong>importance
                            of legal</strong> protection, and get closer to being <strong>debt-free.</strong> Fill in
                        the form to start the process.</p>
                </div>
                <div class="cro-t-193-Unlock-cash-card card-2">
                    <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/JustMoney/CRO+198/JM-193-benefit-img-2.png"
                        alt="Get instant debt relief">
                    <h3 class="cro-t-193-Unlock-cash-card-header">Have more cash in your pocket</h3>
                    <p class="cro-t-193-Unlock-cash-card-subheader">The cost of living is ever-increasing, and often,
                        salaries don't compete with inflation. Now more than ever, every cent counts. JustMoney offers
                        <strong>money-saving hacks and solutions</strong> that can help <strong>stretch your money
                            further.</strong> Keen to find out more? Fill in the form and let’s chat.</p>
                </div>
                <div class="cro-t-193-Unlock-cash-card card-3">
                    <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/JustMoney/CRO+198/JM-193-benefit-img-3.png"
                        alt="Pay ONE, affordable instalment">
                    <h3 class="cro-t-193-Unlock-cash-card-header">Make only one affordable payment</h3>
                    <p class="cro-t-193-Unlock-cash-card-subheader">Debt consolidation combines all your debt payments
                        into a <strong>single, manageable monthly instalment.</strong> This streamlines your payment
                        admin, frees up cash, and allows for better financial management. Fill in the form to
                        <strong>speak to an expert about debt consolidation.</strong></p>
                </div>
                <div class="cro-t-193-Unlock-cash-card card-4">
                    <div class="cro-t-193-Unlock-cash-img">
                        <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/JustMoney/CRO+198/JM-193-benefit-img-4.png"
                            alt="Secure legal protection">
                    </div>
                    <h3 class="cro-t-193-Unlock-cash-card-header">Get legal protection</h3>
                    <p class="cro-t-193-Unlock-cash-card-subheader">You never know when you might need <strong>legal
                            advice.</strong> Taking out <strong>legal cover</strong> could protect you, but how do you
                        know what sort of cover you actually need, or which legal service provider to choose? We can
                        help! Fill in the form and let’s chat about all things legal.</p>
                </div>
            </div>
        </div>
    </div>`;

		var cardSwipper = `<div class="cro-t-43-44-left-part" id="cro-t-193-Review-Section">
        <div class="cro-t-43-44-left-part-wrapper cro-container">
            <div class="cro-t-43-44-left-part-inner">
                <div class="cro-t-193-header-part">
                    <h2 class="cro-t-193-header-text">What our clients say about us</h2>
                    <div class="cro-t-193-header-secend-part">
                        <div class="cro-t-193-header-secend">
                            <p class="cro-t-193-header-secend-text rated">Rated 5/5</p>
                            <img class="cro-t-193-header-top-icon"
                                src="https://crp-clients-images.s3.af-south-1.amazonaws.com/JustMoney/JM-193/JM-193_5.png"
                                alt="">
                            <p class="cro-t-193-header-secend-text secend-text-2">out of <strong>461</strong> Reviews on
                                Hellopeter
                            </p>
                        </div>
                    </div>
                </div>
                <div class="cro-t-43-44-left-part-inner-swiper">
                    <div class="swiper">
                        <div class="swiper-wrapper cro-t-43-44-swiperWrapper">
                            <div class="swiper-slide">
                                <div class="cro-t-193-review-card card-1">
                                    <div class="cro-t-193-review-client-name">
                                        Lindokuhle
                                    </div>
                                    <!-- <div class="cro-t-193-review-client-surname">
                                        [Surname]
                                    </div> -->
                                    <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/JustMoney/JM-193/JM-193_5.png"
                                        alt="Unlock cash">
                                    <p>It's helping a lot I wasn't aware about my credit score before but now i am up to
                                        date an its helping me with
                                        healthy financial progress.</p>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cro-t-193-review-card card-2">
                                    <div class="cro-t-193-review-client-name">
                                        Rollen
                                    </div>
                                    <!-- <div class="cro-t-193-review-client-surname">
                                        [Surname]
                                    </div> -->
                                    <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/JustMoney/JM-193/JM-193_5.png"
                                        alt="Get instant debt relief">
                                    <p>Mathew has gone the extra mile by calling me to better understand my query and
                                        offered a helping hand to
                                        resolve my credit profile. I am looking forward to hearing from him as this is
                                        an ongoing process.</p>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cro-t-193-review-card card-3">
                                    <div class="cro-t-193-review-client-name">
                                        Thembalethu
                                    </div>
                                    <!-- <div class="cro-t-193-review-client-surname">
                                        [Surname]
                                    </div> -->
                                    <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/JustMoney/JM-193/JM-193_5.png"
                                        alt="Pay ONE, affordable instalment">
                                    <p>They are friendly and quick to respond. They cover every question you might have.
                                    </p>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cro-t-193-review-card card-4">
                                    <div class="cro-t-193-review-client-name">
                                        Kamohelo
                                    </div>
                                    <!-- <div class="cro-t-193-review-client-surname">
                                        [Surname]
                                    </div> -->
                                    <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/JustMoney/JM-193/JM-193_5.png"
                                        alt="Secure legal protection">
                                    <p>It was my first time chatting with Justmoney but I got help very fast I’m so
                                        happy with their service.</p>
                                </div>
                            </div>  
                        </div>

                    </div>
                    <div class="swiper-button-prev cro-t-43-44-left-part-prev cro-t-43-44-arrowbtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                            <path
                                d="M6.99219 0.503906C7.27344 0.503906 7.52344 0.597656 7.71094 0.785156C8.11719 1.16016 8.11719 1.81641 7.71094 2.19141L2.42969 7.50391L7.71094 12.7852C8.11719 13.1602 8.11719 13.8164 7.71094 14.1914C7.33594 14.5977 6.67969 14.5977 6.30469 14.1914L0.304688 8.19141C-0.101562 7.81641 -0.101562 7.16016 0.304688 6.78516L6.30469 0.785156C6.49219 0.597656 6.74219 0.503906 6.99219 0.503906Z"
                                fill="white" />
                        </svg>
                    </div>
                    <div class="swiper-button-next cro-t-43-44-left-part-next cro-t-43-44-arrowbtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                            <path
                                d="M2.00781 14.4961C1.72656 14.4961 1.47656 14.4023 1.28906 14.2148C0.882812 13.8398 0.882812 13.1836 1.28906 12.8086L6.57031 7.49609L1.28906 2.21484C0.882812 1.83984 0.882812 1.18359 1.28906 0.808594C1.66406 0.402344 2.32031 0.402344 2.69531 0.808594L8.69531 6.80859C9.10156 7.18359 9.10156 7.83984 8.69531 8.21484L2.69531 14.2148C2.50781 14.4023 2.25781 14.4961 2.00781 14.4961Z"
                                fill="white" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>`

		var croFooter = `<section class="cro-t-193-footer">
        <div class="cro-t-193-footer-wrapper cro-container">
            <div class="cro-t-193-footer-inner">
                <div class="cro-t-193-footer-Operating">
                    <div class="cro-t-193-footer-heading">
                        Operating hours
                    </div>
                    <div class="cro-t-193-footer-time-date">
                        <div class="cro-t-193-footer-text monday">
                            Monday - Thursday: 07:00 to 21:00
                        </div>
                        <div class="cro-t-193-footer-text friday">
                            Friday: 07:00 to 18:00
                        </div>
                        <div class="cro-t-193-footer-text saturday">
                            Saturday: 09:00 to 12:30
                        </div>
                    </div>
                    <div class="cro-t-193-footer-heading Contact-us">
                        Contact us
                    </div>
                    <div class="cro-t-193-footer-text addres">
                        5th Floor, Adderly Street, Cape Town, 8001
                    </div>
                </div>
                <div class="cro-t-193-footer-about">
                    <div class="cro-t-193-footer-heading about">
                        About us
                    </div>
                    <div class="cro-t-193-footer-text about-text">
                        Justmoney.co.za has partnered with DebtBusters to help overindebted consumers lift their burden.
                        A debt counsellor will help you consolidate all your debts into a single and affordable monthly
                        instalment. An illustrative example (excluding credit life insurance) of a R50 000 loan over 72
                        months. Once-off Initiation fee: R1 207.50 with a Monthly admin fee of R69. Representative
                        Annual Percentage Rate (APR) 24.50%. Total amount payable: R103 155.57.
                    </div>
                </div>

                <div class="cro-t-193-footer-other">
                    <div class="cro-t-193-footer-heading Other-links">
                        Other links
                    </div>
                    <div class="cro-t-193-footer-text terms">
                        <a href="https://www.justmoney.co.za/terms-conditions/" target="_blank" rel="noopener">Terms
                            &amp; Conditions</a>
                    </div>
                    <div class="cro-t-193-footer-text Privacy">
                        <a href="https://www.justmoney.co.za/privacy-policy/" target="_blank" rel="noopener">Privacy
                            Policy</a>
                    </div>
                    <div class="cro-t-193-footer-text PAIA">
                        <a href="https://www.justmoney.co.za/uploads/6734e5a7-e09e-4fd4-9bf6-7aea014bb458.pdf"
                            target="_blank" rel="noopener">PAIA Manual</a>

                    </div>


                </div>
                <div class="cro-t-193-footer-download-app">
                    <div class="cro-t-193-footer-heading Download">
                        Download the app
                    </div>
                    <div class="cro-t-193-footer-download-app-img">
                        <a class="cro-google-pay-link"
                            href="https://play.google.com/store/apps/details?id=za.co.justmoneycreditsav.twa&hl=en"
                            target="_blank"><img class="cro-google-pay"
                                src="https://crp-clients-images.s3.af-south-1.amazonaws.com/JustMoney/JM-193/JM-193_6.png"
                                alt=""></a>
                    </div>
                </div>
            </div>
        </div>
    </section>`

		var croNavbar = `<div class="cro-t-193-new-navbar">
        <div class="cro-t-193-new-navbar-wrapper">
            <div class="cro-t-193-new-navbar-inner">
                <div class="cro-t-193-new-navbar-left-part">
                    <div class="cro-t-193-new-navbar-left-main-img">
                        <a href="https://www.justmoney.co.za">
                            <img class="cro-just-money-img" src="/uploads/c477a272-dd69-4620-9e75-2a910eec3130.png"
                                alt=""> </a>
                    </div>
                    <div class="cro-t-193-new-navbar-left-text Apply-Now">
                        <a href="#call-to-action-and-form" class="cro-t-193-new-navbar-Apply-Now cro-color-orange">Apply Now</a>
                    </div>
                    <div class="cro-t-193-new-navbar-left-text Benefits">
                        <a href="#cro-t-193-Benefits-Section" class="cro-t-193-new-navbar-Benefits">Benefits</a>
                    </div>
                    <div class="cro-t-193-new-navbar-left-text Reviews">
                        <a href="#cro-t-193-Review-Section" class="cro-t-193-new-navbar-Review">Reviews</a>
                    </div>

                </div>
                <div class="cro-t-193-new-navbar-right-part">
                    <div class="cro-t-193-navbar-right-text">
                        Operating under DebtBusters
                        A registered NDCA member
                    </div>
                    <div class="cro-t-193-new-navbar-right-img">
                        <img class="cro-ndca-img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/JustMoney/JM-193/JM-193_7.png" alt="">
                    </div>
                </div>

            </div>
        </div>
    </div>`

		var mobileFromBottom = `<div class="cro-t-193-from-bottom" style="display: none;">
        <div class="cro-t-193-bottom-wrapper">
            <div class="cro-t-193-bottom-inner">
                <div class="cro-t-193-review-rated-right mobile-part">
                    <div class="cro-t-193-review-rated-right-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" fill="none">
                            <circle cx="25.5" cy="25.5" r="24" stroke="#E59A2C" stroke-width="3"></circle>
                            <rect x="24" y="6" width="2" height="24" rx="1" fill="#263648"></rect>
                            <rect x="25.8521" y="29.5728" width="2" height="19.4936" rx="1"
                                transform="rotate(159.709 25.8521 29.5728)" fill="#263648"></rect>
                        </svg>
                    </div>
                    <div class="cro-t-193-review-rated-right-text">
                        Application results <span>within 2 minutes</span>
                    </div>
                </div>
                <div class="cro-t-193-hero-top-text-financial-health mobile-part">
                    Imagine paying less interest, making one payment for all your debt, unlocking cash, and confidently
                    navigating your path to debt freedom.
                </div>
                <div class="cro-t-193-hero-top-text-financial-health text-2 mobile-part">
                    <strong>Feeling overwhelmed by debt?</strong> For 17 years, JustMoney has connected thousands of
                    South Africans – just like you – to trusted debt experts, leading to these very results.
                </div>  
            </div>
        </div>
    </div>`

		var formTermsConditions = `<div class="cro-form-field cro-notice cro-Terms-and-Conditions">By continuing, you accept our <a
            href="https://www.justmoney.co.za/privacy-policy/" target="_blank" rel="noopener">Privacy Policy</a> and <a
            href="https://www.justmoney.co.za/terms-conditions/" target="_blank" rel="noopener">Terms &amp;
            Conditions.</a></div>`

		/* Variation Init */
		function init() {
			addClass("body", "cro-t-193")

			waitForElement('#call-to-action-and-form .relative.container .grid.grid-cols-1>:nth-child(2)', function () {
				if (!document.querySelector('.cro-t-193-hero-section')) {
					insertHtml('#call-to-action-and-form .relative.container .grid.grid-cols-1>:nth-child(2)', heroSection, "afterend");
				}
			});

			waitForElement('#call-to-action-and-form', function () {
				if (!document.querySelector('.cro-t-193-Technical-jargon')) {
					insertHtml('#call-to-action-and-form', newParts, "afterend");
				}
				if (!document.querySelector('.cro-t-193-Unlock-cash-container')) {
					insertHtml('.cro-t-193-Technical-jargon', Card, "afterend");
				}
				if (!document.querySelector('.cro-t-43-44-left-part')) {
					insertHtml('.cro-t-193-Unlock-cash-container', cardSwipper, "afterend");
				}
				waitForSwiper(swiperInit);
			});

			waitForElement('section#second-call-to-action', function () {
				if (!document.querySelector('.cro-t-193-footer')) {
					insertHtml('section#second-call-to-action', croFooter, "afterend");
				}
			});

			waitForElement('section#landing-page-justmoney-logo-white-header-global-section> .relative', function () {
				if (!document.querySelector('.cro-t-193-new-navbar')) {
					insertHtml('section#landing-page-justmoney-logo-white-header-global-section> .relative', croNavbar, "beforeend");
				}
			});
			waitForElement('#call-to-action-and-form .relative.container .grid.grid-cols-1>:nth-child(4)', function () {
				if (!document.querySelector('.cro-t-193-from-bottom')) {
					insertHtml('#call-to-action-and-form .relative.container .grid.grid-cols-1>:nth-child(4)', mobileFromBottom, "afterend");
				}
			});
			waitForElement('html body.cro-t-193 #call-to-action-and-form .relative.container .grid.grid-cols-1>:nth-child(4) form .form-field:nth-child(8)', function () {
				if (!document.querySelector('.cro-Terms-and-Conditions')) {
					insertHtml('html body.cro-t-193 #call-to-action-and-form .relative.container .grid.grid-cols-1>:nth-child(4) form .form-field:nth-child(8)', formTermsConditions, "afterend");
				}
			});

			waitForElement('#call-to-action-and-form .relative.container .grid.grid-cols-1>:nth-child(4) #id_number', function () {
				if (!document.querySelector('.from-lock-icon')) {
					insertHtml('#call-to-action-and-form .relative.container .grid.grid-cols-1>:nth-child(4) #id_number', fromImg, "afterend");
				}
			});


			waitForElement('#call-to-action-and-form #id_number', function () {
				document.getElementById("id_number").setAttribute("placeholder", "Identity number");

			});

			

			// updated code
			removeCroClasses();
		}

		function removeCroClasses(){
			addClass("body","cro-t-trust-101")
			waitForElement('.cro-step2.form-field', function () {
				var croFormFields = document.querySelectorAll('.cro-step2.form-field');

				croFormFields.forEach(function(field) {
					removeClass('.cro-step2.form-field', 'cro-step2');
				});
			});
		}


		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();