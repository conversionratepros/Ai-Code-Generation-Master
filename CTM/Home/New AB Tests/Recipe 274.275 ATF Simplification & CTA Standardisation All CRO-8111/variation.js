(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-ctm-274_275";
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
        
        function innerHTMLContent(selector, content) {
            var el = document.querySelector(selector);
            if (el) {
                el.innerHTML = content;
            }
        }
        
        function innerChildContent(selector, childNumber, content) {
            var el = document.querySelector(selector);
            if (el.hasChildNodes()) {
                el.childNodes[childNumber].textContent = content;
            }
        }
        
        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        }
        
        function toggleClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.toggle(cls);
            }
        }
        
        function removeClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.contains(cls) && el.classList.remove(cls);
            }
        }
        
        function scroll(click, selector) {
            click.addEventListener('click', function (event) {
                event.preventDefault();
                var target = document.querySelector(selector);
                if (target) {
                    window.scrollTo({
                        top: target.getBoundingClientRect().top + window.scrollY,
                        behavior: 'smooth'
                    });
                }
            });
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
        
        function addScript() {
            var scriptOne = document.createElement("script");
            scriptOne.src = "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.min.js";
            document.querySelector("head").appendChild(scriptOne);
            
            var swiperCss = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.css" crossorigin="anonymous" referrerpolicy="no-referrer" />';
            document.querySelector("head").insertAdjacentHTML("beforeend", swiperCss);
        }
        
        function initializeSwiper() {
            var galleryThumb = new Swiper(".cro_12_32_47-swiper-thumb-wrapper", {
                slidesPerView: 5,
                spaceBetween: 10,
                freeMode: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                slideToClickedSlide: true,
                slidesPerGroup: 1,
                breakpoints: {
                    767: {
                        spaceBetween: 12,
                    },
                },
            });
            
            var galleryTop = new Swiper(".cro_12_32_47-swiper-wrapper", {
                slidesPerView: 1,
                loop: false,
                centeredSlides: false,
                navigation: {
                    nextEl: ".cro_12_32_47-next",
                    prevEl: ".cro_12_32_47-prev",
                },
                speed: 300,
                spaceBetween: 10,
                thumbs: {
                    swiper: galleryThumb,
                },
            });
        }

        var croBanner = `<div class="cro-274_275-banner">
        <div class="cro-274_275-banner-wrapper">
            <div class="cro-274_275-banner-inner">
                <div class="cro-274_275-heroBanner">
                    <div class="cro-274_275-banner-content"><h2 class="cro-274_275-banner-heading">Big savings. More style.</h2><a href="https://www.ctm.co.za/big-big-savers-category.html" class="cro-274_275-banner-cta">SHOP NOW</a>
                    </div>
                <div class="cro-274_275-banner-img">
                    <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/CTM/Recipe_274-275/cro-275_275-ctm-BannerImg.png" alt="">
                </div>
                </div>
                <div class="cro-274_275-bannerStrip">
                    <div class="cro-274_275-strip-inner">
                        <div class="cro-274_275-strip-item">
                            <span class="cro-274_275-strip-icon" aria-hidden="true">
                                <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/CTM/Recipe_274-275/cro-275_275-ctm-card.svg" alt="">
                            </span>
                            <span class="cro-274_275-strip-text">Shop Online. Get it delivered.</span>
                        </div>
                        <div class="cro-274_275-strip-item">
                            <span class="cro-274_275-strip-icon" aria-hidden="true">
                                <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/CTM/Recipe_274-275/cro-275_275-ctm-fire.svg" alt="">
                            </span>
                            <span class="cro-274_275-strip-text">Tiles deals from R69.90m2 - <a href="https://www.ctm.co.za/all-tiles/tile-application/indoor-tiles-category.html?product_list_dir=asc&product_list_order=google_feed_price" class="cro-274_275-strip-link">Shop Now</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>`;
        
        function init() {
            addClass("body", variation_name);

            waitForElement(".container-homepage", function () {
                if (!document.querySelector(".cro-274_275-banner")) {
                    insertHtml(".container-homepage", croBanner, "beforebegin");
                }
            });


            waitForElement(".category-title", function () {
                document.querySelectorAll('.category-title').forEach(function(e){
                    var parent = e.closest('section');
                    if (parent) {
                        if (e.innerHTML.indexOf('Everyday savers') != -1) {
                            parent.classList.add('cro-274-savers');
                        }
                        if (e.innerHTML.indexOf('Comprehensive Services for Your Convenience') != -1) {
                            parent.classList.add('cro-274-services');
                        }
                    }
                });
            });

            
        }
        
        function croEventHandkler() {
            live("selector", "click", function () {});
        }
        
        if (!window.cro_t_20) {
            croEventHandkler();
            window.cro_t_20 = true;
        }
        
        waitForElement('.container-homepage', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();