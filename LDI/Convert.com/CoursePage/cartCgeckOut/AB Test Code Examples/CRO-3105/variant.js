(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-Ldi-ki-82";
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

        function removeClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.contains(cls) && el.classList.remove(cls);
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

        function swiperInit() {
            waitForElement(".cro180-university-terms .swiper", function () {
                new Swiper(".cro180-university-terms .swiper", {
                    loop: false,
                    navigation: {
                        nextEl: ".cro180_left-part-next",
                        prevEl: ".cro180_left-part-prev",
                    },
                    pagination: {
                        el: ".cro180-swiper-pagination",
                        clickable: true,
                    },
                    slidesPerView: 1,
                    spaceBetween: 15,
                });
            });

            waitForElement(".cro180_181-high-quality-video .swiper", function () {
                new Swiper(".cro180_181-high-quality-video .swiper", {
                    loop: false,
                    navigation: {
                        nextEl: ".cro181_left-part-next",
                        prevEl: ".cro181_left-part-prev",
                    },
                    pagination: {
                        el: ".cro181-swiper-pagination",
                        clickable: true,
                    },
                    slidesPerView: 1,
                    spaceBetween: 15,
                });
            });
        }

        var cro_t_82_videoMap = {
            "/orthodontics-dentofacial-orthopaedics/": {
                main: "https://player.vimeo.com/video/1074336960?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
                demo: "https://player.vimeo.com/video/1077609161?badge=0&autopause=0&player_id=0&app_id=58479",
                thumb: "https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI82+/reipe-ki82-ldi_1.svg"
            },
            "/aesthetic-restorative-dentistry/": {
                main: "https://player.vimeo.com/video/1083478678?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
                demo: "https://player.vimeo.com/video/1077609161?badge=0&autopause=0&player_id=0&app_id=58479",
                thumb: "https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI82+/reipe-ki82-ldi_2.svg"
            },
            "/dental-implantology-oral-surgery/": {
                main: "https://player.vimeo.com/video/1083478083?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
                demo: "https://player.vimeo.com/video/1077609161?badge=0&autopause=0&player_id=0&app_id=58479",
                thumb: "https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI82+/reipe-ki82-ldi_3.svg"
            }
        };



        function injectVideoModal(videoURL) {
            var modalContent = document.querySelector('.cro-recipe-82-model-open');
            if (modalContent) {
                if (videoURL.indexOf('autoplay=1') === -1) {
                    videoURL += (videoURL.indexOf('?') > -1 ? '&' : '?') + 'autoplay=0&muted=0';
                }

                modalContent.innerHTML =
                    '<div class="cro-t-82-videoWrapper" style="position:relative;padding-bottom:56.25%;height:0;">' +
                    '<iframe src="' + videoURL + '" ' +
                    'frameborder="0" ' +
                    'allow="autoplay; fullscreen; picture-in-picture" ' +
                    'allowfullscreen ' +
                    'style="position:absolute;top:0;left:0;width:100%;height:100%;">' +
                    '</iframe>' +
                    '</div>';
            }
        }


        function isSecondPaginationActive() {
            var bullet = document.querySelector(
                ".cro180_181-high-quality-video .swiper-pagination .swiper-pagination-bullet:nth-child(2).swiper-pagination-bullet-active"
            );
            return !!bullet;
        }

        function updateThumbImageFromJSON() {
            var path = window.location.pathname;
            var videoSet = cro_t_82_videoMap[path];
            if (!videoSet || !videoSet.thumb) return;

            var attempts = 0;
            var maxAttempts = 100;
            var interval = setInterval(function () {
                var imgEl = document.querySelector('.cro180_181-high-quality-video-thumb-1 img');
                if (imgEl) {
                    clearInterval(interval);
                    imgEl.setAttribute('src', videoSet.thumb);
                    imgEl.setAttribute('alt', 'Video thumbnail'); // optional alt text
                }
                if (++attempts >= maxAttempts) {
                    clearInterval(interval);
                }
            }, 50);
        }



        var cro_82_modal = `<div class="cro-t-82-lightBox">
            <div class="cro-t-82-overlay"></div>
            <div class="cro-t-82-modal">
                <div class="cro-recipe-82-model-open">
                    
                </div>
            </div>
        </div>`;

        var feedBack = `<div class="cro180-university-terms">
            <div class="cro180-university-terms-wrapper cro-container">
                <div class="cro180-university-terms-top-header">
                    <div class="cro180-university-terms-top-header-text">
                        University-level learning on your terms
                    </div>
                </div>
                <div class="cro180-university-terms-inner">
                    <div class="cro180-university-terms-left">
                        <div class="cro180_left-part-inner-swiper">
                            <div class="swiper">
                                <div class="swiper-wrapper cro51_52-swiperWrapper">
                                    <div class="swiper-slide">
                                        <div class="cro180-swiper-image-parent">
                                            <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI80.KI81+/cro-Ldi-180_181-20.png"
                                                alt="">
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="cro180-swiper-image-parent">
                                            <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI80.KI81+/cro-Ldi-180_181-21.png"
                                                alt="">
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="cro180-swiper-image-parent">
                                            <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI80.KI81+/cro-Ldi-180_181-22.png"
                                                alt="">
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="cro180-swiper-image-parent">
                                            <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI82+%7C+Enhancing+Course+Page+with+VLE+Product+and+Video+Section+%7C+ALL/cro-82-LDI-01.png"
                                                alt="">
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="cro180-swiper-image-parent">
                                            <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI80.KI81+/cro-Ldi-180_181-23.png"
                                                alt="">
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="cro180-swiper-image-parent">
                                            <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI80.KI81+/cro-Ldi-180_181-1-24.png"
                                                alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-pagination cro180-swiper-pagination"></div>
                            <div class="swiper-button-prev cro180_left-part-prev cro51_52-arrowbtn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15"
                                    fill="none">
                                    <path
                                        d="M6.99219 0.503906C7.27344 0.503906 7.52344 0.597656 7.71094 0.785156C8.11719 1.16016 8.11719 1.81641 7.71094 2.19141L2.42969 7.50391L7.71094 12.7852C8.11719 13.1602 8.11719 13.8164 7.71094 14.1914C7.33594 14.5977 6.67969 14.5977 6.30469 14.1914L0.304688 8.19141C-0.101562 7.81641 -0.101562 7.16016 0.304688 6.78516L6.30469 0.785156C6.49219 0.597656 6.74219 0.503906 6.99219 0.503906Z"
                                        fill="white" />
                                </svg>
                            </div>
                            <div class="swiper-button-next cro180_left-part-next cro51_52-arrowbtn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15"
                                    fill="none">
                                    <path
                                        d="M2.00781 14.4961C1.72656 14.4961 1.47656 14.4023 1.28906 14.2148C0.882812 13.8398 0.882812 13.1836 1.28906 12.8086L6.57031 7.49609L1.28906 2.21484C0.882812 1.83984 0.882812 1.18359 1.28906 0.808594C1.66406 0.402344 2.32031 0.402344 2.69531 0.808594L8.69531 6.80859C9.10156 7.18359 9.10156 7.83984 8.69531 8.21484L2.69531 14.2148C2.50781 14.4023 2.25781 14.4961 2.00781 14.4961Z"
                                        fill="white" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="cro180-university-terms-right">
                        <div class="cro180-university-terms-right-wrapper">
                            <div class="cro180-university-terms-right-text top-subheading">
                                Advance your career without pausing your practice. Our VLE helps you build real-world
                                skills, boost treatment quality, and grow your income—all with the flexibility to study
                                anytime, anywhere.
                            </div>
                            <div class="cro180-university-terms-right-feedbackParent">
                                <div class="cro180-university-terms-right vle-text">Why choose the VLE?</div>
                                <div class="cro180-university-terms-right-feedback-part">
                                <div class="cro180-university-terms-right-icon-text-parent">
                                    <div class="cro180-university-terms-right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17"
                                            fill="none">
                                            <g clip-path="url(#clip0_245_22)">
                                                <path
                                                    d="M8.00141 16.292C12.4205 16.292 16.0028 12.7097 16.0028 8.2906C16.0028 3.87154 12.4205 0.289185 8.00141 0.289185C3.58235 0.289185 0 3.87154 0 8.2906C0 12.7097 3.58235 16.292 8.00141 16.292Z"
                                                    fill="#00A9E0" />
                                                <path
                                                    d="M6.6734 12.0048L3.55469 9.10623L4.48042 8.10994L6.6734 10.1477L11.5222 5.64319L12.448 6.63948L6.6734 12.0048Z"
                                                    fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_245_22">
                                                    <rect width="16" height="16" fill="white"
                                                        transform="translate(0 0.289185)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div class="cro180-university-terms-right-text">
                                        Upload your patient cases and receive expert tutor feedback
                                    </div>
                                </div>
                                <div class="cro180-university-terms-right-icon-text-parent">
                                    <div class="cro180-university-terms-right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17"
                                            fill="none">
                                            <g clip-path="url(#clip0_245_22)">
                                                <path
                                                    d="M8.00141 16.292C12.4205 16.292 16.0028 12.7097 16.0028 8.2906C16.0028 3.87154 12.4205 0.289185 8.00141 0.289185C3.58235 0.289185 0 3.87154 0 8.2906C0 12.7097 3.58235 16.292 8.00141 16.292Z"
                                                    fill="#00A9E0" />
                                                <path
                                                    d="M6.6734 12.0048L3.55469 9.10623L4.48042 8.10994L6.6734 10.1477L11.5222 5.64319L12.448 6.63948L6.6734 12.0048Z"
                                                    fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_245_22">
                                                    <rect width="16" height="16" fill="white"
                                                        transform="translate(0 0.289185)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div class="cro180-university-terms-right-text">
                                        Join live, tutor-led Study Clubs for clinical discussion
                                    </div>
                                </div>
                                <div class="cro180-university-terms-right-icon-text-parent">
                                    <div class="cro180-university-terms-right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17"
                                            fill="none">
                                            <g clip-path="url(#clip0_245_22)">
                                                <path
                                                    d="M8.00141 16.292C12.4205 16.292 16.0028 12.7097 16.0028 8.2906C16.0028 3.87154 12.4205 0.289185 8.00141 0.289185C3.58235 0.289185 0 3.87154 0 8.2906C0 12.7097 3.58235 16.292 8.00141 16.292Z"
                                                    fill="#00A9E0" />
                                                <path
                                                    d="M6.6734 12.0048L3.55469 9.10623L4.48042 8.10994L6.6734 10.1477L11.5222 5.64319L12.448 6.63948L6.6734 12.0048Z"
                                                    fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_245_22">
                                                    <rect width="16" height="16" fill="white"
                                                        transform="translate(0 0.289185)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div class="cro180-university-terms-right-text">
                                        Connect and collaborate with dentists around the world
                                    </div>
                                </div>
                                <div class="cro180-university-terms-right-icon-text-parent">
                                    <div class="cro180-university-terms-right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17"
                                            fill="none">
                                            <g clip-path="url(#clip0_245_22)">
                                                <path
                                                    d="M8.00141 16.292C12.4205 16.292 16.0028 12.7097 16.0028 8.2906C16.0028 3.87154 12.4205 0.289185 8.00141 0.289185C3.58235 0.289185 0 3.87154 0 8.2906C0 12.7097 3.58235 16.292 8.00141 16.292Z"
                                                    fill="#00A9E0" />
                                                <path
                                                    d="M6.6734 12.0048L3.55469 9.10623L4.48042 8.10994L6.6734 10.1477L11.5222 5.64319L12.448 6.63948L6.6734 12.0048Z"
                                                    fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_245_22">
                                                    <rect width="16" height="16" fill="white"
                                                        transform="translate(0 0.289185)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div class="cro180-university-terms-right-text">
                                        Earn badges, leaderboard points and community recognition
                                    </div>
                                </div>
                                <div class="cro180-university-terms-right-icon-text-parent">
                                    <div class="cro180-university-terms-right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17"
                                            fill="none">
                                            <g clip-path="url(#clip0_245_22)">
                                                <path
                                                    d="M8.00141 16.292C12.4205 16.292 16.0028 12.7097 16.0028 8.2906C16.0028 3.87154 12.4205 0.289185 8.00141 0.289185C3.58235 0.289185 0 3.87154 0 8.2906C0 12.7097 3.58235 16.292 8.00141 16.292Z"
                                                    fill="#00A9E0" />
                                                <path
                                                    d="M6.6734 12.0048L3.55469 9.10623L4.48042 8.10994L6.6734 10.1477L11.5222 5.64319L12.448 6.63948L6.6734 12.0048Z"
                                                    fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_245_22">
                                                    <rect width="16" height="16" fill="white"
                                                        transform="translate(0 0.289185)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div class="cro180-university-terms-right-text">
                                        Watch high-quality, practical training videos anytime
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="cro180-university-terms-right-button">
                            <a href="/dental-courses/">
                                <div class="cro180-university-terms-right-button-text">
                                    Choose your course
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cro180-university-terms-right mobile-part cro-container" style="display: none;">
            <div class="cro180-university-terms-right-wrapper">
                
                <div class="cro180-university-terms-right-feedbackParent">
                    <div class="cro180-university-terms-right vle-text">Why choose the VLE?</div>
                    <div class="cro180-university-terms-right-feedback-part">
                    <div class="cro180-university-terms-right-icon-text-parent">
                        <div class="cro180-university-terms-right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <g clip-path="url(#clip0_245_22)">
                                    <path
                                        d="M8.00141 16.292C12.4205 16.292 16.0028 12.7097 16.0028 8.2906C16.0028 3.87154 12.4205 0.289185 8.00141 0.289185C3.58235 0.289185 0 3.87154 0 8.2906C0 12.7097 3.58235 16.292 8.00141 16.292Z"
                                        fill="#00A9E0"></path>
                                    <path
                                        d="M6.6734 12.0048L3.55469 9.10623L4.48042 8.10994L6.6734 10.1477L11.5222 5.64319L12.448 6.63948L6.6734 12.0048Z"
                                        fill="white"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_245_22">
                                        <rect width="16" height="16" fill="white" transform="translate(0 0.289185)"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="cro180-university-terms-right-text">
                            Upload your patient cases and receive expert tutor feedback
                        </div>
                    </div>
                    <div class="cro180-university-terms-right-icon-text-parent">
                        <div class="cro180-university-terms-right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <g clip-path="url(#clip0_245_22)">
                                    <path
                                        d="M8.00141 16.292C12.4205 16.292 16.0028 12.7097 16.0028 8.2906C16.0028 3.87154 12.4205 0.289185 8.00141 0.289185C3.58235 0.289185 0 3.87154 0 8.2906C0 12.7097 3.58235 16.292 8.00141 16.292Z"
                                        fill="#00A9E0"></path>
                                    <path
                                        d="M6.6734 12.0048L3.55469 9.10623L4.48042 8.10994L6.6734 10.1477L11.5222 5.64319L12.448 6.63948L6.6734 12.0048Z"
                                        fill="white"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_245_22">
                                        <rect width="16" height="16" fill="white" transform="translate(0 0.289185)"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="cro180-university-terms-right-text">
                            Join live, tutor-led Study Clubs for clinical discussion
                        </div>
                    </div>
                    <div class="cro180-university-terms-right-icon-text-parent">
                        <div class="cro180-university-terms-right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <g clip-path="url(#clip0_245_22)">
                                    <path
                                        d="M8.00141 16.292C12.4205 16.292 16.0028 12.7097 16.0028 8.2906C16.0028 3.87154 12.4205 0.289185 8.00141 0.289185C3.58235 0.289185 0 3.87154 0 8.2906C0 12.7097 3.58235 16.292 8.00141 16.292Z"
                                        fill="#00A9E0"></path>
                                    <path
                                        d="M6.6734 12.0048L3.55469 9.10623L4.48042 8.10994L6.6734 10.1477L11.5222 5.64319L12.448 6.63948L6.6734 12.0048Z"
                                        fill="white"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_245_22">
                                        <rect width="16" height="16" fill="white" transform="translate(0 0.289185)"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="cro180-university-terms-right-text">
                            Connect and collaborate with dentists around the world
                        </div>
                    </div>
                    <div class="cro180-university-terms-right-icon-text-parent">
                        <div class="cro180-university-terms-right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <g clip-path="url(#clip0_245_22)">
                                    <path
                                        d="M8.00141 16.292C12.4205 16.292 16.0028 12.7097 16.0028 8.2906C16.0028 3.87154 12.4205 0.289185 8.00141 0.289185C3.58235 0.289185 0 3.87154 0 8.2906C0 12.7097 3.58235 16.292 8.00141 16.292Z"
                                        fill="#00A9E0"></path>
                                    <path
                                        d="M6.6734 12.0048L3.55469 9.10623L4.48042 8.10994L6.6734 10.1477L11.5222 5.64319L12.448 6.63948L6.6734 12.0048Z"
                                        fill="white"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_245_22">
                                        <rect width="16" height="16" fill="white" transform="translate(0 0.289185)"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="cro180-university-terms-right-text">
                            Earn badges, leaderboard points and community recognition
                        </div>
                    </div>
                    <div class="cro180-university-terms-right-icon-text-parent">
                        <div class="cro180-university-terms-right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <g clip-path="url(#clip0_245_22)">
                                    <path
                                        d="M8.00141 16.292C12.4205 16.292 16.0028 12.7097 16.0028 8.2906C16.0028 3.87154 12.4205 0.289185 8.00141 0.289185C3.58235 0.289185 0 3.87154 0 8.2906C0 12.7097 3.58235 16.292 8.00141 16.292Z"
                                        fill="#00A9E0"></path>
                                    <path
                                        d="M6.6734 12.0048L3.55469 9.10623L4.48042 8.10994L6.6734 10.1477L11.5222 5.64319L12.448 6.63948L6.6734 12.0048Z"
                                        fill="white"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_245_22">
                                        <rect width="16" height="16" fill="white" transform="translate(0 0.289185)"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="cro180-university-terms-right-text">
                            Watch high-quality, practical training videos anytime
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="cro180-university-terms-right-button">
                <a href="/dental-courses/">
                    <div class="cro180-university-terms-right-button-text">
                        Choose your course
                    </div>
                </a>
            </div>
            </div>
        </div>`;

        var videoSection = `<div class="cro180_181-high-quality-video">
            <div class="cro180_181-high-quality-video-wrapper cro-container">
                <div class="cro180_181-high-quality-video-inner">
                    <div class="cro180_181-high-quality-video-top-heading">
                        <div class="cro180_181-high-quality-video-top-heading-text">Video 1 of 2</div>
                    </div>
                    <div class="cro180_181-high-quality-video-content">
                        <div class="cro180_181-high-quality-video-main-img">
                            <div class="cro181_left-part-inner-swiper">
                        <div class="swiper swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                            <div class="swiper-wrapper cro51_52-swiperWrapper" id="swiper-wrapper-410aac41321ba71076" aria-live="polite" style="transform: translate3d(0px, 0px, 0px);">
                                <div class="swiper-slide swiper-slide-active" style="width: 648px; margin-right: 15px;" role="group" aria-label="1 / 5">
                                    <div class="cro180-swiper-image-parent cro180_181-high-quality-video-thumb-1">
                                        <img src="g" alt="">
                                    </div>
                                    <img class="cro180_181-play-icon" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI80.KI81+/cro-Ldi-180_181-10.png"alt="cro180_181-play-icon-main">
                                </div>
                                <div class="swiper-slide swiper-slide-next" style="width: 648px; margin-right: 15px;" role="group" aria-label="2 / 5">
                                    <div class="cro180-swiper-image-parent cro180_181-high-quality-video-thumb-2">
                                        <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI82+/reipe-ki82-ldi_4.svg"alt="cro180_181-play-icon-demo" alt="">
                                    </div>
                                    <img class="cro180_181-play-icon" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI80.KI81+/cro-Ldi-180_181-10.png">
                                </div>
                            </div>
                        <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                        <div class="swiper-pagination cro181-swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"><span class="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex="0" role="button" aria-label="Go to slide 1" aria-current="true"></span><span class="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 2"></span><span class="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 3"></span><span class="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 4"></span><span class="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 5"></span></div>
                        <div class="swiper-button-prev cro181_left-part-prev cro51_52-arrowbtn" tabindex="-1" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-410aac41321ba71076" aria-disabled="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                                <path d="M6.99219 0.503906C7.27344 0.503906 7.52344 0.597656 7.71094 0.785156C8.11719 1.16016 8.11719 1.81641 7.71094 2.19141L2.42969 7.50391L7.71094 12.7852C8.11719 13.1602 8.11719 13.8164 7.71094 14.1914C7.33594 14.5977 6.67969 14.5977 6.30469 14.1914L0.304688 8.19141C-0.101562 7.81641 -0.101562 7.16016 0.304688 6.78516L6.30469 0.785156C6.49219 0.597656 6.74219 0.503906 6.99219 0.503906Z" fill="white"></path>
                            </svg>
                        </div>
                        <div class="swiper-button-next cro181_left-part-next cro51_52-arrowbtn" tabindex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-410aac41321ba71076" aria-disabled="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                                <path d="M2.00781 14.4961C1.72656 14.4961 1.47656 14.4023 1.28906 14.2148C0.882812 13.8398 0.882812 13.1836 1.28906 12.8086L6.57031 7.49609L1.28906 2.21484C0.882812 1.83984 0.882812 1.18359 1.28906 0.808594C1.66406 0.402344 2.32031 0.402344 2.69531 0.808594L8.69531 6.80859C9.10156 7.18359 9.10156 7.83984 8.69531 8.21484L2.69531 14.2148C2.50781 14.4023 2.25781 14.4961 2.00781 14.4961Z" fill="white"></path>
                            </svg>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        function trigger() {
            var doneTypingInterval = 9000;  //time in ms, 5 seconds for example
            var intervalCallAgain = setInterval(function () {
                addingClassToSection();
            }, 400);

            //start the countdown
            var Timer = setTimeout(function () {
                clearInterval(intervalCallAgain);
            }, doneTypingInterval);

        }

        function addingClassToSection() {
            waitForElement('h2.elementor-heading-title', function () {
                if (window.location.href.includes("orthodontics-dentofacial-orthopaedics")) {
                    document.querySelectorAll('h2.elementor-heading-title').forEach(function (e) {
                        if (e.textContent.includes('How will the Orthodontics & Dentofacial Orthopaedics PG Dip. benefit you?')) {
                            e.closest('section').classList.add('cro-t-82-benefit');
                        }
                        if (e.textContent.includes('Requirements and accreditation')) {
                            e.closest('section').classList.add('cro-t-82-requirements');
                        }
                        if (e.textContent.includes('Optional in-person training')) {
                            e.closest('section').classList.add('cro-t-82-training');
                        }
                        if (e.textContent.includes('Experience the VLE')) {
                            e.closest('section').classList.add('cro-t-82-experience');
                        }
                        if (e.textContent.includes('Download the app')) {
                            e.closest('section').classList.add('cro-t-82-downloadApp');
                        }
                        if (e.textContent.includes('Elevate your career with a PG Dip. in Orthodontics & Dentofacial Orthopaedics')) {
                            e.closest('section').classList.add('cro-t-82-elevate');
                        }

                    });
                    addClass("body", "cro-t-82-coursePage");
                }

                if (window.location.href.includes("dental-implantology-oral-surgery")) {
                    document.querySelectorAll('h2.elementor-heading-title').forEach(function (e) {
                        if (e.textContent.includes('How will the Dental Implantology and Oral Surgery PG Dip. benefit you?')) {
                            e.closest('section').classList.add('cro-t-82-benefit');
                        }
                        if (e.textContent.includes('Requirements and accreditation')) {
                            e.closest('section').classList.add('cro-t-82-requirements');
                        }
                        if (e.textContent.includes('Optional in-person training')) {
                            e.closest('section').classList.add('cro-t-82-training');
                        }
                        if (e.textContent.includes('Experience the VLE')) {
                            e.closest('section').classList.add('cro-t-82-experience');
                        }
                        if (e.textContent.includes('Download the app')) {
                            e.closest('section').classList.add('cro-t-82-downloadApp');
                        }
                        if (e.textContent.includes('Elevate your career with a PG Dip. in Dental Implantology and Oral Surgery')) {
                            e.closest('section').classList.add('cro-t-82-elevate');
                        }
                    });
                    addClass("body", "cro-t-82-coursePage");
                }

                if (window.location.href.includes("aesthetic-restorative-dentistry")) {
                    document.querySelectorAll('h2.elementor-heading-title').forEach(function (e) {
                        if (e.textContent.includes('How will the Aesthetic and Restorative PG Dip. benefit you?')) {
                            e.closest('section').classList.add('cro-t-82-benefit');
                        }
                        if (e.textContent.includes('Requirements and accreditation')) {
                            e.closest('section').classList.add('cro-t-82-requirements');
                        }
                        if (e.textContent.includes('Optional in-person training')) {
                            e.closest('section').classList.add('cro-t-82-training');
                        }
                        if (e.textContent.includes('Experience the VLE')) {
                            e.closest('section').classList.add('cro-t-82-experience');
                        }
                        if (e.textContent.includes('Download the app')) {
                            e.closest('section').classList.add('cro-t-82-downloadApp');
                        }
                        if (e.textContent.includes('Elevate your career with a PG Dip. in Aesthetic & Restorative Dentistry')) {
                            e.closest('section').classList.add('cro-t-82-elevate');
                        }
                    });
                    addClass("body", "cro-t-82-coursePage");
                }
            });



            // waitForElement('.cro-t-82-benefit', function () {
            //     if (!document.querySelector('.cro180-university-terms')) {
            //         insertHtml('.cro-t-82-benefit', feedBack, "afterend");
            //     }
            // });

        }

        function cro_ki82_slider() {

            waitForElement('body', function () {
                if (!document.querySelector('.cro-t-82-lightBox')) {
                    insertHtml('body', cro_82_modal, "afterbegin");
                }
            });

            waitForElement('.cro-t-82-benefit', function () {
                if (!document.querySelector('.cro180-university-terms')) {
                    insertHtml('.cro-t-82-benefit', feedBack, "afterend");
                }
            });

            waitForElement('.cro180-university-terms', function () {
                if (!document.querySelector('.cro180_181-high-quality-video')) {
                    insertHtml('.cro180-university-terms', videoSection, "afterend");
                }
            });



            waitForSwiper(swiperInit);
        }

        function init() {
            addClass("body", variation_name);
            trigger();
            cro_ki82_slider();
            updateThumbImageFromJSON();

        }

        function croEventHandkler() {

            live('.cro180_181-play-icon, .cro180_181-high-quality-video-wrapper.cro-container .cro180-swiper-image-parent img', 'click', function () {
                var path = window.location.pathname;
                var videoSet = cro_t_82_videoMap[path];
                if (!videoSet) return;

                var selectedVideo = isSecondPaginationActive() ? videoSet.demo : videoSet.main;

                injectVideoModal(selectedVideo);
                addClass('body', 'cro-t-82-show');
                addClass('html', 'cro-scroll-show');
            });

            // live(".cro180-swiper-image-parent img", "click", function () {
            //     var thumbnailImg = this.closest('.swiper-slide').querySelector('.cro180_181-play-icon');
            //     if (thumbnailImg) {
            //         thumbnailImg.click();
            //     }
            // });



            live(" .cro-t-82-overlay", "click", function () {
                removeClass('body', 'cro-t-82-show');
                removeClass('html', 'cro-scroll-show');
                var modalContent = document.querySelector('.cro-recipe-82-model-open');
                if (modalContent) modalContent.innerHTML = '';
            });

        }

        if (!window.cro_t_ki_82) {
            addScript();
            croEventHandkler();
            window.cro_t_ki_82 = true;
        }

        waitForElement('h2.elementor-heading-title', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();