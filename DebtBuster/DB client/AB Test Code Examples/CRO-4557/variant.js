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
        };
        function insertHtml(selector, content, position) {
            var el = document.querySelector(selector);
            if (!position) {
                position = "afterend";
            }
            if (el && content) {
                el.insertAdjacentHTML(position, content);
            }
        };
        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        };
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
        };
        function addScript() {
            var scriptOne = document.createElement("script");
            scriptOne.src = "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.min.js";
            document.querySelector("head").appendChild(scriptOne);
            var swiperCss = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.css" integrity="sha512-ipO1yoQyZS3BeIuv2A8C5AwQChWt2Pi4KU3nUvXxc4TKr8QgG8dPexPAj2JGsJD6yelwKa4c7Y2he9TTkPM4Dg==" crossorigin="anonymous" referrerpolicy="no-referrer" />';
            document.querySelector("head").insertAdjacentHTML("beforeend", swiperCss);
        };
        function swiperInit() {
            waitForElement(".cro360-Debt-Free .swiper", function () {
                new Swiper(".cro360-Debt-Free .swiper", {
                    loop: false,
                    navigation: {
                        nextEl: ".cro360-left-part-next",
                        prevEl: ".cro360-left-part-prev",
                    },
                    pagination: {
                        el: ".cro360-pagination",
                        clickable: true,
                        dynamicBullets: false,
                    },
                    slidesPerView: 3,
                    spaceBetween: 24,
                    breakpoints: {
                        1310: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        900: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                        }
                        ,
                        300: {
                            slidesPerView: 1,
                            spaceBetween: 15,
                        }
                    },
                });
            });
        };

        var newParts = `<div class="cro360-Debt-Free">
        <div class="cro360-Debt-Free-wrapper">
            <div class="cro360-Debt-Free-inner">
                <div class="cro360-Debt-Free-top-heading">
                    <div class="cro360-Debt-Free-top-heading-text">Everything you need to manage your credit</div>
                    <div class="cro360-Debt-Free-top-subheading-text">
                        Access powerful tools and insights that help thousands of South Africans improve their financial
                        health every month.
                    </div>
                </div>
                <div class="cro360-left-part-inner-swiper">
                <div class="swiper_inner_section"> 
                <div class="swiper-button-prev cro360-left-part-prev cro360-arrowbtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                            <path
                                d="M6.99219 0.503906C7.27344 0.503906 7.52344 0.597656 7.71094 0.785156C8.11719 1.16016 8.11719 1.81641 7.71094 2.19141L2.42969 7.50391L7.71094 12.7852C8.11719 13.1602 8.11719 13.8164 7.71094 14.1914C7.33594 14.5977 6.67969 14.5977 6.30469 14.1914L0.304688 8.19141C-0.101562 7.81641 -0.101562 7.16016 0.304688 6.78516L6.30469 0.785156C6.49219 0.597656 6.74219 0.503906 6.99219 0.503906Z"
                                fill="white" />
                        </svg>
                    </div>
                    <div class="swiper-button-next cro360-left-part-next cro360-arrowbtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                            <path
                                d="M2.00781 14.4961C1.72656 14.4961 1.47656 14.4023 1.28906 14.2148C0.882812 13.8398 0.882812 13.1836 1.28906 12.8086L6.57031 7.49609L1.28906 2.21484C0.882812 1.83984 0.882812 1.18359 1.28906 0.808594C1.66406 0.402344 2.32031 0.402344 2.69531 0.808594L8.69531 6.80859C9.10156 7.18359 9.10156 7.83984 8.69531 8.21484L2.69531 14.2148C2.50781 14.4023 2.25781 14.4961 2.00781 14.4961Z"
                                fill="white" />
                        </svg>
                    </div>
                    <div class="swiper">
                        <div class="swiper-wrapper cro360-swiperWrapper">
                            <div class="swiper-slide">
                                <div class="cro360-Debt-Free-card card-1">
                                    <div class="cro360-Debt-Free-card-wrapper">
                                        <div class="cro360-Debt-Free-card-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                viewBox="0 0 32 32" fill="none">
                                                <g clip-path="url(#clip0_23_25)">
                                                    <path
                                                        d="M28.0308 2.60765H3.2593C3.00003 2.59854 2.74166 2.6429 2.50027 2.73796C2.25888 2.83301 2.03964 2.97674 1.85619 3.16018C1.67275 3.34363 1.52902 3.56287 1.43396 3.80426C1.33891 4.04565 1.29455 4.30402 1.30366 4.56329V12.3207H4.75862L5.93201 9.90871C6.03486 9.68663 6.20121 9.5 6.41005 9.37238C6.61888 9.24476 6.86085 9.18187 7.10539 9.19165C7.34685 9.19704 7.58258 9.26622 7.78866 9.39215C7.99474 9.51809 8.16383 9.69631 8.27878 9.90871L10.1692 13.8852L13.2983 7.236C13.405 7.01557 13.5717 6.82968 13.7792 6.6996C13.9868 6.56953 14.2267 6.50054 14.4716 6.50054C14.7166 6.50054 14.9565 6.56953 15.1641 6.6996C15.3716 6.82968 15.5383 7.01557 15.645 7.236L18.057 12.3207H19.5563C19.9021 12.3207 20.2337 12.458 20.4782 12.7025C20.7227 12.947 20.8601 13.2787 20.8601 13.6244C20.8601 13.9702 20.7227 14.3018 20.4782 14.5463C20.2337 14.7908 19.9021 14.9282 19.5563 14.9282H17.2095C16.9631 14.9099 16.7256 14.8283 16.5201 14.6913C16.3145 14.5542 16.1478 14.3664 16.0362 14.1459L14.4716 10.8865L11.3426 17.5357C11.2277 17.7481 11.0586 17.9263 10.8525 18.0523C10.6464 18.1782 10.4107 18.2474 10.1692 18.2528C9.92469 18.2626 9.68272 18.1997 9.47389 18.0721C9.26505 17.9444 9.0987 17.7578 8.99585 17.5357L7.10539 13.5592L6.77945 14.1459C6.67947 14.3751 6.5157 14.5707 6.30766 14.7094C6.09961 14.8481 5.85607 14.9241 5.60607 14.9282H1.30366V22.816C1.30366 23.3346 1.5097 23.832 1.87645 24.1988C2.2432 24.5656 2.74063 24.7716 3.2593 24.7716H28.0308C28.5494 24.7716 29.0469 24.5656 29.4136 24.1988C29.7804 23.832 29.9864 23.3346 29.9864 22.816V4.56329C29.9955 4.30402 29.9512 4.04565 29.8561 3.80426C29.761 3.56287 29.6173 3.34363 29.4339 3.16018C29.2504 2.97674 29.0312 2.83301 28.7898 2.73796C28.5484 2.6429 28.29 2.59854 28.0308 2.60765ZM19.1652 20.4692C18.9245 20.7148 18.5965 20.8554 18.2526 20.8603H15.645C15.2993 20.8603 14.9676 20.723 14.7231 20.4785C14.4786 20.2339 14.3413 19.9023 14.3413 19.5566C14.331 19.3845 14.361 19.2124 14.4289 19.054C14.4968 18.8955 14.6007 18.7551 14.7324 18.6439C14.9731 18.3983 15.3011 18.2577 15.645 18.2528H18.2526C18.5983 18.2528 18.93 18.3902 19.1745 18.6347C19.419 18.8792 19.5563 19.2108 19.5563 19.5566C19.5666 19.7286 19.5366 19.9007 19.4687 20.0591C19.4008 20.2176 19.2969 20.358 19.1652 20.4692ZM25.684 20.4692C25.4433 20.7148 25.1153 20.8554 24.7714 20.8603H22.1638C21.8181 20.8603 21.4864 20.723 21.2419 20.4785C20.9974 20.2339 20.8601 19.9023 20.8601 19.5566C20.8498 19.3845 20.8798 19.2124 20.9477 19.054C21.0156 18.8955 21.1195 18.7551 21.2512 18.6439C21.4919 18.3983 21.82 18.2577 22.1638 18.2528H24.7714C25.1171 18.2528 25.4488 18.3902 25.6933 18.6347C25.9378 18.8792 26.0751 19.2108 26.0751 19.5566C26.0854 19.7286 26.0554 19.9007 25.9875 20.0591C25.9196 20.2176 25.8157 20.358 25.684 20.4692Z"
                                                        fill="#61A644" />
                                                    <path
                                                        d="M24.1196 26.0754H7.17071C6.82493 26.0754 6.49331 26.2127 6.24881 26.4572C6.0043 26.7017 5.86694 27.0334 5.86694 27.3791C5.86694 27.7249 6.0043 28.0565 6.24881 28.301C6.49331 28.5455 6.82493 28.6829 7.17071 28.6829H24.1196C24.4654 28.6829 24.797 28.5455 25.0415 28.301C25.286 28.0565 25.4234 27.7249 25.4234 27.3791C25.4234 27.0334 25.286 26.7017 25.0415 26.4572C24.797 26.2127 24.4654 26.0754 24.1196 26.0754Z"
                                                        fill="#61A644" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_23_25">
                                                        <rect width="31.2903" height="31.2903" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div class="cro360-Debt-Free-card-heading">
                                            <div class="cro360-Debt-Free-card-heading-text">
                                                Real-Time Credit Monitoring
                                            </div>
                                            <div class="cro360-Debt-Free-card-sub_heading-text">
                                                Track your credit score changes instantly with automated alerts when
                                                your score
                                                improves or needs attention.
                                            </div>
                                        </div>
                                        <div class="cro360-Debt-Free-card-bottom-Credit-Score">
                                            <div class="cro360-Debt-Free-card-bottom-Credit-Score-wrapper">
                                                <div class="cro360-Debt-Free-Credit-Score-text">Credit Score</div>
                                                <div class="cro360-Debt-Free-Credit-Score-text-right">88%</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cro360-Debt-Free-card card-2">
                                    <div class="cro360-Debt-Free-card-wrapper">
                                        <div class="cro360-Debt-Free-card-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                viewBox="0 0 32 32" fill="none">
                                                <g clip-path="url(#clip0_23_40)">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M10.1397 8.98107C10.1397 8.26103 10.7235 7.67731 11.4435 7.67731H19.2661C19.9861 7.67731 20.5698 8.26103 20.5698 8.98107C20.5698 9.70111 19.9861 10.2848 19.2661 10.2848H11.4435C10.7235 10.2848 10.1397 9.70111 10.1397 8.98107ZM19.2661 16.8036C19.9861 16.8036 20.5698 17.3873 20.5698 18.1074V22.0187C20.5698 22.7388 19.9861 23.3224 19.2661 23.3224C18.546 23.3224 17.9623 22.7388 17.9623 22.0187V18.1074C17.9623 17.3873 18.546 16.8036 19.2661 16.8036ZM19.2661 12.8924C18.546 12.8924 17.9623 13.4761 17.9623 14.1961C17.9623 14.9162 18.546 15.4999 19.2661 15.4999H19.2791C19.9992 15.4999 20.5829 14.9162 20.5829 14.1961C20.5829 13.4761 19.9992 12.8924 19.2791 12.8924H19.2661ZM14.051 14.1961C14.051 13.4761 14.6347 12.8924 15.3548 12.8924H15.3678C16.0879 12.8924 16.6716 13.4761 16.6716 14.1961C16.6716 14.9162 16.0879 15.4999 15.3678 15.4999H15.3548C14.6347 15.4999 14.051 14.9162 14.051 14.1961ZM11.4435 12.8924C10.7235 12.8924 10.1397 13.4761 10.1397 14.1961C10.1397 14.9162 10.7235 15.4999 11.4435 15.4999H11.4565C12.1766 15.4999 12.7603 14.9162 12.7603 14.1961C12.7603 13.4761 12.1766 12.8924 11.4565 12.8924H11.4435ZM10.1397 18.1074C10.1397 17.3873 10.7235 16.8036 11.4435 16.8036H11.4565C12.1766 16.8036 12.7603 17.3873 12.7603 18.1074C12.7603 18.8275 12.1766 19.4112 11.4565 19.4112H11.4435C10.7235 19.4112 10.1397 18.8275 10.1397 18.1074ZM15.3548 16.8036C14.6347 16.8036 14.051 17.3873 14.051 18.1074C14.051 18.8275 14.6347 19.4112 15.3548 19.4112H15.3678C16.0879 19.4112 16.6716 18.8275 16.6716 18.1074C16.6716 17.3873 16.0879 16.8036 15.3678 16.8036H15.3548ZM14.051 22.0187C14.051 21.2986 14.6347 20.7149 15.3548 20.7149H15.3678C16.0879 20.7149 16.6716 21.2986 16.6716 22.0187C16.6716 22.7388 16.0879 23.3224 15.3678 23.3224H15.3548C14.6347 23.3224 14.051 22.7388 14.051 22.0187ZM11.4435 20.7149C10.7235 20.7149 10.1397 21.2986 10.1397 22.0187C10.1397 22.7388 10.7235 23.3224 11.4435 23.3224H11.4565C12.1766 23.3224 12.7603 22.7388 12.7603 22.0187C12.7603 21.2986 12.1766 20.7149 11.4565 20.7149H11.4435ZM11.3577 2.46226C11.3862 2.46226 11.4148 2.46226 11.4435 2.46226H19.3519C20.5076 2.4622 21.5035 2.46214 22.301 2.56936C23.1556 2.68427 23.9749 2.94337 24.6393 3.60785C25.3038 4.27234 25.5628 5.09156 25.6778 5.94619C25.785 6.74365 25.785 7.73948 25.7849 8.89524V22.1045C25.785 23.2603 25.785 24.2561 25.6778 25.0536C25.5628 25.9082 25.3038 26.7275 24.6393 27.3919C23.9749 28.0564 23.1556 28.3155 22.301 28.4305C21.5035 28.5376 20.5076 28.5376 19.3519 28.5375H11.3577C10.2019 28.5376 9.20608 28.5376 8.40861 28.4305C7.55398 28.3155 6.73476 28.0564 6.07028 27.3919C5.4058 26.7275 5.14669 25.9082 5.03179 25.0536C4.92457 24.2561 4.92462 23.2603 4.92469 22.1045V8.98107C4.92469 8.95237 4.92469 8.92376 4.92469 8.89524C4.92462 7.73948 4.92457 6.74365 5.03179 5.94619C5.14669 5.09156 5.4058 4.27234 6.07028 3.60785C6.73476 2.94337 7.55398 2.68427 8.40861 2.56936C9.20607 2.46214 10.2019 2.4622 11.3577 2.46226Z"
                                                        fill="#61A644" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_23_40">
                                                        <rect width="31.2903" height="31.2903" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div class="cro360-Debt-Free-card-heading">
                                            <div class="cro360-Debt-Free-card-heading-text">
                                                Smart Savings Calculator
                                            </div>
                                            <div class="cro360-Debt-Free-card-sub_heading-text">
                                                See exactly how much you can save by optimizing your debt payments with
                                                our
                                                AI-powered recommendations.
                                            </div>
                                        </div>
                                        <div class="cro360-Debt-Free-card-bottom-Credit-Score">
                                            <div class="cro360-Debt-Free-card-bottom-Credit-Score-wrapper">
                                                <div class="cro360-Debt-Free-Credit-Score-text">Potential Monthly
                                                    Savings</div>
                                                <div class="cro360-Debt-Free-Credit-Score-text-right">R 6,564/month
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cro360-Debt-Free-card card-3">
                                    <div class="cro360-Debt-Free-card-wrapper">
                                        <div class="cro360-Debt-Free-card-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33"
                                                viewBox="0 0 32 33" fill="none">
                                                <path
                                                    d="M28.6827 7.37357C28.6827 9.53371 26.9317 11.2849 24.7715 11.2849C22.6113 11.2849 20.8602 9.53371 20.8602 7.37357C20.8602 5.21344 22.6113 3.46229 24.7715 3.46229C26.9317 3.46229 28.6827 5.21344 28.6827 7.37357Z"
                                                    fill="#61A644" />
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M15.6451 3.46229C17.4688 3.46229 19.0218 3.46229 20.3543 3.51217C19.4516 4.54398 18.9045 5.8949 18.9045 7.37357C18.9045 10.6138 21.5312 13.2405 24.7714 13.2405C26.2502 13.2405 27.601 12.6935 28.6328 11.7907C28.6827 13.1232 28.6827 14.6762 28.6827 16.4999C28.6827 22.6458 28.6827 25.7189 26.7734 27.6282C24.8641 29.5375 21.791 29.5375 15.6451 29.5375C9.4991 29.5375 6.42611 29.5375 4.5168 27.6282C2.60748 25.7189 2.60748 22.6458 2.60748 16.4999C2.60748 10.3539 2.60748 7.28091 4.5168 5.37161C6.42611 3.46229 9.4991 3.46229 15.6451 3.46229ZM18.9045 14.8702C18.3645 14.8702 17.9267 14.4324 17.9267 13.8924C17.9267 13.3524 18.3645 12.9146 18.9045 12.9146H22.1639C22.7039 12.9146 23.1417 13.3524 23.1417 13.8924V17.1518C23.1417 17.6918 22.7039 18.1296 22.1639 18.1296C21.6239 18.1296 21.1861 17.6918 21.1861 17.1518V16.2531L18.5621 18.8769C17.6711 19.7679 16.2266 19.7679 15.3356 18.8769L13.2681 16.8094C13.1407 16.6822 12.9344 16.6822 12.8071 16.8094L9.81772 19.7988C9.43586 20.1807 8.81673 20.1807 8.43487 19.7988C8.05301 19.4169 8.05301 18.7979 8.43487 18.416L11.4242 15.4266C12.3153 14.5357 13.7599 14.5357 14.6509 15.4266L16.7184 17.4942C16.8457 17.6214 17.052 17.6214 17.1794 17.4942L19.8032 14.8702H18.9045Z"
                                                    fill="#61A644" />
                                            </svg>
                                        </div>
                                        <div class="cro360-Debt-Free-card-heading">
                                            <div class="cro360-Debt-Free-card-heading-text">
                                                Debt Sustainability Tracker
                                            </div>
                                            <div class="cro360-Debt-Free-card-sub_heading-text">
                                                Monitor your Debt Sustainability Indicator (DSI) and get personalized
                                                action
                                                plans
                                                to improve your financial health.
                                            </div>
                                        </div>
                                        <div class="cro360-Debt-Free-card-bottom-Credit-Score">
                                            <div class="cro360-Debt-Free-card-bottom-Credit-Score-wrapper">
                                                <div class="cro360-Debt-Free-Credit-Score-text">DSI Score</div>
                                                <div class="cro360-Debt-Free-Credit-Score-right">
                                                    <div class="cro360-Debt-Free-Credit-Score-right-icon"></div>
                                                    <div class="cro360-Debt-Free-Credit-Score-text-right">84%</div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cro360-Debt-Free-card card-4">
                                    <div class="cro360-Debt-Free-card-wrapper">
                                        <div class="cro360-Debt-Free-card-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                viewBox="0 0 32 32" fill="none">
                                                <path
                                                    d="M12.4435 2.60754H5.92466C4.48457 2.60754 3.31714 3.77497 3.31714 5.21507V14.3414C3.31714 15.7815 4.48457 16.9489 5.92466 16.9489H12.4435C13.8836 16.9489 15.051 15.7815 15.051 14.3414V5.21507C15.051 3.77497 13.8836 2.60754 12.4435 2.60754Z"
                                                    fill="#61A644" />
                                                <path
                                                    d="M26.7849 2.60754H20.2661C18.826 2.60754 17.6586 3.77497 17.6586 5.21507V9.12635C17.6586 10.5664 18.826 11.7339 20.2661 11.7339H26.7849C28.225 11.7339 29.3924 10.5664 29.3924 9.12635V5.21507C29.3924 3.77497 28.225 2.60754 26.7849 2.60754Z"
                                                    fill="#61A644" />
                                                <path
                                                    d="M12.4435 19.5564H5.92466C4.48457 19.5564 3.31714 20.7238 3.31714 22.1639V26.0752C3.31714 27.5153 4.48457 28.6827 5.92466 28.6827H12.4435C13.8836 28.6827 15.051 27.5153 15.051 26.0752V22.1639C15.051 20.7238 13.8836 19.5564 12.4435 19.5564Z"
                                                    fill="#61A644" />
                                                <path
                                                    d="M26.7849 14.3413H20.2661C18.826 14.3413 17.6586 15.5087 17.6586 16.9488V26.0752C17.6586 27.5153 18.826 28.6827 20.2661 28.6827H26.7849C28.225 28.6827 29.3924 27.5153 29.3924 26.0752V16.9488C29.3924 15.5087 28.225 14.3413 26.7849 14.3413Z"
                                                    fill="#61A644" />
                                            </svg>
                                        </div>
                                        <div class="cro360-Debt-Free-card-heading">
                                            <div class="cro360-Debt-Free-card-heading-text">
                                                Complete Account Overview
                                            </div>
                                            <div class="cro360-Debt-Free-card-sub_heading-text">
                                                View all your accounts, payment history, and arrears in one simple
                                                dashboard
                                                accessible on any device.
                                            </div>
                                        </div>
                                        <div class="cro360-Debt-Free-card-bottom-Credit-Score">
                                            <div class="cro360-Debt-Free-card-bottom-Credit-Score-wrapper">
                                                <div class="cro360-Debt-Free-card-bottom-Credit-icon-text icon-text-1">
                                                    <div class="cro360-Debt-Free-card-bottom-Credit-icon"></div>
                                                    <div class="cro360-Debt-Free-Credit-Score-text">Accounts 4</div>
                                                </div>
                                                <div class="cro360-Debt-Free-card-bottom-Credit-icon-text icon-text-2">
                                                    <div class="cro360-Debt-Free-card-bottom-Credit-icon"></div>
                                                    <div class="cro360-Debt-Free-Credit-Score-text">Arrears 0</div>
                                                </div>
                                                <div class="cro360-Debt-Free-card-bottom-Credit-icon-text icon-text-3">
                                                    <div class="cro360-Debt-Free-card-bottom-Credit-icon"></div>
                                                    <div class="cro360-Debt-Free-Credit-Score-text">New 0%</div>
                                                </div>
                                                <div class="cro360-Debt-Free-card-bottom-Credit-icon-text icon-text-4">
                                                    <div class="cro360-Debt-Free-card-bottom-Credit-icon"></div>
                                                    <div class="cro360-Debt-Free-Credit-Score-text">Usage 0%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cro360-Debt-Free-card card-5">
                                    <div class="cro360-Debt-Free-card-wrapper">
                                        <div class="cro360-Debt-Free-card-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32"
                                                viewBox="0 0 33 32" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M11.2849 6.51883V10.4355C10.6357 10.4448 10.0555 10.4698 9.55377 10.5372C8.69912 10.6521 7.8799 10.9112 7.21543 11.5757C6.55094 12.2402 6.29183 13.0594 6.17693 13.914C6.06971 14.7115 6.06976 15.7074 6.06983 16.8631V22.2498C6.06976 23.4055 6.06971 24.4014 6.17693 25.1989C6.29183 26.0535 6.55094 26.8728 7.21543 27.5372C7.8799 28.2017 8.69912 28.4607 9.55377 28.5757C10.3512 28.6829 11.3471 28.6829 12.5028 28.6828H20.4971C21.6528 28.6829 22.6486 28.6829 23.4461 28.5757C24.3007 28.4607 25.12 28.2017 25.7844 27.5372C26.4489 26.8728 26.708 26.0535 26.823 25.1989C26.9301 24.4014 26.9301 23.4055 26.93 22.2498V16.8631C26.9301 15.7074 26.9301 14.7115 26.823 13.914C26.708 13.0594 26.4489 12.2402 25.7844 11.5757C25.12 10.9112 24.3007 10.6521 23.4461 10.5372C22.9444 10.4698 22.3641 10.4448 21.715 10.4355V6.51883C21.715 4.35869 19.9639 2.60754 17.8037 2.60754H15.1962C13.036 2.60754 11.2849 4.35869 11.2849 6.51883ZM15.1962 5.21507C14.4761 5.21507 13.8924 5.79879 13.8924 6.51883V10.4301H19.1074V6.51883C19.1074 5.79879 18.5238 5.21507 17.8037 5.21507H15.1962ZM16.4999 16.9489C15.0598 16.9489 13.8924 18.1163 13.8924 19.5564C13.8924 20.9966 15.0598 22.164 16.4999 22.164C17.9401 22.164 19.1074 20.9966 19.1074 19.5564C19.1074 18.1163 17.9401 16.9489 16.4999 16.9489Z"
                                                    fill="#61A644" />
                                            </svg>
                                        </div>
                                        <div class="cro360-Debt-Free-card-heading">
                                            <div class="cro360-Debt-Free-card-heading-text">
                                                Legal Protection Insurance
                                            </div>
                                            <div class="cro360-Debt-Free-card-sub_heading-text">
                                                Get expert legal advice and assistance for civil, criminal, and labour
                                                matters
                                                for
                                                only R200 per month.
                                            </div>
                                        </div>
                                        <div class="cro360-Debt-Free-card-bottom-Credit-Score">
                                            <div class="cro360-Debt-Free-card-bottom-Credit-Score-wrapper">
                                                <div class="cro360-Debt-Free-Credit-Score-text">Legal Coverage</div>
                                                <div class="cro360-Debt-Free-Credit-Score-text-right">Active</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cro360-Debt-Free-card card-6">
                                    <div class="cro360-Debt-Free-card-wrapper">
                                        <div class="cro360-Debt-Free-card-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                viewBox="0 0 32 32" fill="none">
                                                <g clip-path="url(#clip0_23_100)">
                                                    <path
                                                        d="M15.6452 2.60754C12.8789 2.60754 10.226 3.70643 8.26998 5.66245C6.31396 7.61847 5.21508 10.2714 5.21508 13.0376V15.5148C4.82178 15.8575 4.5031 16.2773 4.27882 16.7483C4.05455 17.2193 3.92946 17.7313 3.91132 18.2527C3.94101 19.0087 4.19839 19.738 4.64972 20.3453C5.10105 20.9525 5.72528 21.4092 6.44061 21.6555C8.1355 25.7102 11.5383 28.6828 15.6452 28.6828H19.5565V26.0753H15.6452C12.6987 26.0753 10.026 23.8589 8.68308 20.3517L8.40929 19.6347L7.64007 19.5564C7.32681 19.5122 7.04034 19.3555 6.83405 19.1156C6.62775 18.8757 6.51573 18.569 6.51884 18.2527C6.52021 18.0252 6.58111 17.802 6.69547 17.6053C6.80983 17.4086 6.97367 17.2452 7.17072 17.1314L7.8226 16.7534V14.3414C7.8226 13.9956 7.95996 13.664 8.20446 13.4195C8.44897 13.175 8.78058 13.0376 9.12636 13.0376H22.164C22.5098 13.0376 22.8414 13.175 23.0859 13.4195C23.3304 13.664 23.4677 13.9956 23.4677 14.3414V20.8602H18.1354C18.017 20.5283 17.8112 20.2346 17.5396 20.01C17.2681 19.7854 16.9409 19.6384 16.5927 19.5845C16.2444 19.5306 15.8881 19.5717 15.5614 19.7036C15.2346 19.8355 14.9495 20.0532 14.7363 20.3338C14.5231 20.6143 14.3897 20.9472 14.3501 21.2974C14.3105 21.6475 14.3662 22.0019 14.5114 22.3229C14.6566 22.644 14.8859 22.9199 15.175 23.1214C15.464 23.3229 15.8022 23.4426 16.1536 23.4677H26.0753C26.7668 23.4677 27.4301 23.193 27.9191 22.704C28.4081 22.215 28.6828 21.5518 28.6828 20.8602V18.2527C28.6828 17.5611 28.4081 16.8979 27.9191 16.4089C27.4301 15.9199 26.7668 15.6452 26.0753 15.6452V13.0376C26.0753 10.2714 24.9764 7.61847 23.0204 5.66245C21.0643 3.70643 18.4114 2.60754 15.6452 2.60754Z"
                                                        fill="#61A644" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_23_100">
                                                        <rect width="31.2903" height="31.2903" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div class="cro360-Debt-Free-card-heading">
                                            <div class="cro360-Debt-Free-card-heading-text">
                                                Expert Support Team
                                            </div>
                                            <div class="cro360-Debt-Free-card-sub_heading-text">
                                                Access our qualified debt counselors and financial experts via phone,
                                                chat, or
                                                email
                                                whenever you need help.
                                            </div>
                                        </div>
                                        <div class="cro360-Debt-Free-card-bottom-Credit-Score">
                                            <div class="cro360-Debt-Free-card-bottom-Credit-Score-wrapper">
                                                <div class="cro360-Debt-Free-Credit-Score-text-right">0861 365 910</div>
                                                <div class="cro360-Debt-Free-Credit-Score-text">Mon-Thu 07:00-21:00
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="swiper-pagination cro360-pagination"></div>
                   
                </div>
            </div>
        </div>
    </div>`;


        function addingHtML() {
            waitForElement('section.register-hld', function () {
                if (!document.querySelector('.cro360-Debt-Free')) {
                    insertHtml('section.register-hld', newParts, "afterend");
                }
                waitForSwiper(swiperInit);
            });
        }

        /* Variation Init */
        function init() {
            addClass("body", "cro_uc1");
            addingHtML();
        }

        if (!window.cro_cro_uc1) {
            addScript();
            window.cro_cro_uc1 = true;
        }

        /* Initialise variation */
        waitForElement('section.register-hld', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();