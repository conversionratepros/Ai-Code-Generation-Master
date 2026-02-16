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
        //     waitForElement(".cro51_52-left-part .swiper", function () {
        //         new Swiper(".cro51_52-left-part .swiper", {
        //             loop: true,
        //             navigation: {
        //                 nextEl: ".cro51_52-left-part-next",
        //                 prevEl: ".cro51_52-left-part-prev",
        //             },
        //             slidesPerView: 4,
        //             spaceBetween: 15,
        //             breakpoints: {
        //                 300: {
        //                     slidesPerView: 1,

        //                 },
        //                 768: {
        //                     slidesPerView: 2,

        //                 },
        //                 1024: {
        //                     slidesPerView: 3,

        //                 },
        //                 1280: {
        //                     slidesPerView: 4,

        //                 },
        //                 1536: {
        //                     spaceBetween: 15,

        //                 },
        //                 1700: {
        //                     spaceBetween: 26,

        //                 },
        //                 // 1536: {
        //                 //     slidesPerView: 4,
        //                 //     spaceBetween: 26,

        //                 // },
        //             },
        //         });
        //     });
        // }

        function swiperInit() {
            waitForElement(".cro51_52-left-part .swiper", function () {
                new Swiper(".cro51_52-left-part .swiper", {
                    loop: true,
                    navigation: {
                        nextEl: ".cro51_52-left-part-next",
                        prevEl: ".cro51_52-left-part-prev"
                    },
                    slidesPerView: 4,
                    spaceBetween: 15,
                    grabCursor: true,
                    simulateTouch: true,
                    allowTouchMove: true,
                    breakpoints: {
                        300: {
                            slidesPerView: 1,
                            simulateTouch: true,
                            allowTouchMove: true,
                            grabCursor: true
                        },
                        768: {
                            slidesPerView: 2,
                            simulateTouch: false,
                            allowTouchMove: false,
                            grabCursor: false
                        },
                        1024: {
                            slidesPerView: 3,
                            simulateTouch: false,
                            allowTouchMove: false,
                            grabCursor: false
                        },
                        1280: {
                            slidesPerView: 4,
                            simulateTouch: false,
                            allowTouchMove: false,
                            grabCursor: false
                        },
                        1536: {
                            spaceBetween: 15,
                            simulateTouch: false,
                            allowTouchMove: false,
                            grabCursor: false
                        },
                        1700: {
                            spaceBetween: 26,
                            simulateTouch: false,
                            allowTouchMove: false,
                            grabCursor: false
                        }
                    }
                });
            });
        }

        var card = ` <div class="cro51_52-left-part" id="cro51_52-Review-Section">
        <div class="cro51_52-left-part-wrapper container">
            <div class="cro51_52-left-part-inner">
                <div class="cro51_52-header-part">
                    <h2 class="cro51_52-header-text">What our clients say about us</h2>
                    <div class="cro51_52-header-secend-part">
                        <div class="cro51_52-header-secend">
                            <p class="cro51_52-header-secend-text rated">Rated 5/5</p>
                            <img class="cro51_52-header-top-icon"
                                src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Recipe+51.52+%5BCRO-201%5D/cro-jm_51.52-1.png"
                                alt="">
                            <p class="cro51_52-header-secend-text secend-text-2">out of <strong>676</strong> reviews on
                                Hellopeter
                            </p>
                        </div>
                    </div>
                </div>
                <div class="cro51_52-left-part-inner-swiper">
                    <div class="swiper">
                        <div class="swiper-wrapper cro51_52-swiperWrapper">
                            <div class="swiper-slide">
                                <div class="cro51_52-review-card card-1">
                                    <div class="cro51_52-card-inner-parent">
                                        <div class="cro51_52-card-top">
                                            <div class="cro51_52-card-top-header-text">"I am happy and debt free"</div>
                                            <div class="cro51_52-card-top-sub-header-text">I have just received my
                                                clearance certificate and it has been shared with all relevant parties.
                                                I am happy and excited that my debt review is complete and the process
                                                was seamless. Thank you Debt Busters.</div>
                                        </div>
                                        <div class="cro51_52-card-bottom">
                                            <div class="cro51_52-card-bottom-icon">
                                                <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Recipe+51.52+%5BCRO-201%5D/cro-jm_51.52-1.png" alt="">
                                            </div>
                                            <div class="cro51_52-card-bottom-client-name">
                                                Sindile T
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cro51_52-review-card card-2">
                                    <div class="cro51_52-card-inner-parent">
                                        <div class="cro51_52-card-top">
                                            <div class="cro51_52-card-top-header-text">"I always feel better after
                                                speaking to them"</div>
                                            <div class="cro51_52-card-top-sub-header-text">I always feel better after
                                                speaking to them. DB have always been able to assist me with my
                                                financial situation, and they understand that life happens. I am
                                                grateful for the service.</div>
                                        </div>
                                        <div class="cro51_52-card-bottom">
                                            <div class="cro51_52-card-bottom-icon">
                                                <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Recipe+51.52+%5BCRO-201%5D/cro-jm_51.52-1.png" alt="">
                                            </div>
                                            <div class="cro51_52-card-bottom-client-name">
                                                Christine S
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cro51_52-review-card card-3">
                                    <div class="cro51_52-card-inner-parent">
                                        <div class="cro51_52-card-top">
                                            <div class="cro51_52-card-top-header-text">"Financial freedom with their
                                                support"</div>
                                            <div class="cro51_52-card-top-sub-header-text">I have had an excellent
                                                experience with Debt Busters thus
                                                far and am looking forward to continuing my journey toward financial
                                                freedom with their support. The
                                                advice they provided has been invaluable.</div>
                                        </div>
                                        <div class="cro51_52-card-bottom">
                                            <div class="cro51_52-card-bottom-icon">
                                                <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Recipe+51.52+%5BCRO-201%5D/cro-jm_51.52-1.png" alt="">
                                            </div>
                                            <div class="cro51_52-card-bottom-client-name">
                                                Andre T
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cro51_52-review-card card-4">
                                    <div class="cro51_52-card-inner-parent">
                                        <div class="cro51_52-card-top">
                                            <div class="cro51_52-card-top-header-text">"The road to financial freedom is
                                                easy with Debt Busters"
                                            </div>
                                            <div class="cro51_52-card-top-sub-header-text">I would like to thank Debt
                                                Busters and their team for
                                                outstanding customer service. The road to financial freedom is easy with
                                                Debt Buster. I would
                                                recommend it to my friends and family. Well done Debt Busters.</div>
                                        </div>
                                        <div class="cro51_52-card-bottom">
                                            <div class="cro51_52-card-bottom-icon">
                                                <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Recipe+51.52+%5BCRO-201%5D/cro-jm_51.52-1.png" alt="">
                                            </div>
                                            <div class="cro51_52-card-bottom-client-name">
                                                Khensani M
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cro51_52-review-card card-5">
                                    <div class="cro51_52-card-inner-parent">
                                        <div class="cro51_52-card-top">
                                            <div class="cro51_52-card-top-header-text">“My journey to eliminate debt.”
                                            </div>
                                            <div class="cro51_52-card-top-sub-header-text">Debt Busters has helped me
                                                immensely in my journey to
                                                eliminate debt. Their consultants offer great support and are easy to
                                                reach. Would recommend
                                                Debt
                                                Busters to anyone seeking financial freedom.</div>
                                        </div>
                                        <div class="cro51_52-card-bottom">
                                            <div class="cro51_52-card-bottom-icon">
                                                <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Recipe+51.52+%5BCRO-201%5D/cro-jm_51.52-1.png" alt="">
                                            </div>
                                            <div class="cro51_52-card-bottom-client-name">
                                                Dylan B
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cro51_52-review-card card-6">
                                    <div class="cro51_52-card-inner-parent">
                                        <div class="cro51_52-card-top">
                                            <div class="cro51_52-card-top-header-text">"Gaining my financial freedom
                                                back"</div>
                                            <div class="cro51_52-card-top-sub-header-text">Yooo Debt Busters saved me a
                                                lot of money. instead of
                                                paying 5k every month I'm now paying R1500 and gaining my financial
                                                freedom back</div>
                                        </div>
                                        <div class="cro51_52-card-bottom">
                                            <div class="cro51_52-card-bottom-icon">
                                                <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Recipe+51.52+%5BCRO-201%5D/cro-jm_51.52-1.png" alt="">
                                            </div>
                                            <div class="cro51_52-card-bottom-client-name">
                                                Tholakele N
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cro51_52-review-card card-7">
                                    <div class="cro51_52-card-inner-parent">
                                        <div class="cro51_52-card-top">
                                            <div class="cro51_52-card-top-header-text">"Helped me to settle 2 of my
                                                accounts"</div>
                                            <div class="cro51_52-card-top-sub-header-text">Helped me to settle 2 of my
                                                accounts and negotiated
                                                me a
                                                discount on both. I enquired 2 days ago... You rock!!!</div>
                                        </div>
                                        <div class="cro51_52-card-bottom">
                                            <div class="cro51_52-card-bottom-icon">
                                                <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Recipe+51.52+%5BCRO-201%5D/cro-jm_51.52-1.png" alt="">
                                            </div>
                                            <div class="cro51_52-card-bottom-client-name">
                                                Hillel C
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cro51_52-review-card card-8">
                                    <div class="cro51_52-card-inner-parent">
                                        <div class="cro51_52-card-top">
                                            <div class="cro51_52-card-top-header-text">"Debt Busters negotiating lower
                                                interest rates"</div>
                                            <div class="cro51_52-card-top-sub-header-text">From the time I applied for
                                                debt counselling to
                                                speaking
                                                with one of the agents to debt busters negotiating lower interest rates
                                                and monthly repayments,
                                                it
                                                was smooth, and I was reassured that as long as I didn't default, there
                                                would be progress.</div>
                                        </div>
                                        <div class="cro51_52-card-bottom">
                                            <div class="cro51_52-card-bottom-icon">
                                                <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Recipe+51.52+%5BCRO-201%5D/cro-jm_51.52-1.png" alt="">
                                            </div>
                                            <div class="cro51_52-card-bottom-client-name">
                                                Ayanda Danana
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="swiper-button-prev cro51_52-left-part-prev cro51_52-arrowbtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                            <path
                                d="M6.99219 0.503906C7.27344 0.503906 7.52344 0.597656 7.71094 0.785156C8.11719 1.16016 8.11719 1.81641 7.71094 2.19141L2.42969 7.50391L7.71094 12.7852C8.11719 13.1602 8.11719 13.8164 7.71094 14.1914C7.33594 14.5977 6.67969 14.5977 6.30469 14.1914L0.304688 8.19141C-0.101562 7.81641 -0.101562 7.16016 0.304688 6.78516L6.30469 0.785156C6.49219 0.597656 6.74219 0.503906 6.99219 0.503906Z"
                                fill="white" />
                        </svg>
                    </div>
                    <div class="swiper-button-next cro51_52-left-part-next cro51_52-arrowbtn">
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


        /* Variation Init */
        function init() {
            addClass("body", "cro-t-51_52")

            waitForElement('section.new-sec', function () {
                if (!document.querySelector('.cro51_52-left-part')) {
                    insertHtml('section.new-sec', card, "afterend");
                }
                waitForSwiper(swiperInit);
            });

        }


        /* Initialise variation */
        waitForElement('body', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();