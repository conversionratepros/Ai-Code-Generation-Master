(function () {
  try {
    /* main variables */
    var debug = 1;
    var recipe_name = "cro147";

    function addClass(el, cls) {
      var el = document.querySelector(el);
      if (el) {
        el.classList.add(cls);
      }
    }
    function removeClass(el, cls) {
      var element = document.querySelector(el);
      if (element) {
        element.classList.remove(cls);
      }
    }
    function waitForElement(selector, trigger, delay) {
      var interval = setInterval(function () {
        if (document && document.querySelector(selector) && document.querySelectorAll(selector).length > 0) {
          clearInterval(interval);
          trigger();
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, delay);
    }
    function waitForElementJQ(selector, trigger) {
      var interval = setInterval(function () {
        if (jQuery(selector).length > 0) {
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
      scriptOne.src = "https://cdnjs.cloudflare.com/ajax/libs/Swiper/10.0.4/swiper-bundle.min.js";
      document.querySelector("head").appendChild(scriptOne);

      var swiperCss = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/10.0.4/swiper-bundle.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />';
      document.querySelector("head").insertAdjacentHTML("beforeend", swiperCss);
    }
    addScript();

    var productInfoHtml = `
		<div class="cro147-product-info-container">
		  <div class="cro147-product-info-wrapper">
			<div class="cro147-product-info cro147-product-info1 cro147-review-wrapper cro147-review-hide">
			  <div class="cro147-review-container">
				<div class="cro147-review-icon"></div>
				<div class="cro147-review-text"></div>
			  </div>
			</div>
			<div class="cro147-product-info cro147-product-info2"></div>
			<div class="cro147-product-info cro147-product-info3"></div>
			<div class="cro147-product-info cro147-product-info4"></div>
			<div class="cro147-product-info cro147-product-info5"></div>
			<div class="cro147-product-info cro147-product-info6"></div>
			<div class="cro147-product-info cro147-product-info7"></div>
		  </div>
		</div>
	  `;

    var modalOpeningIcon = `
      <div class="cro147-zoom-wrapper cro147-zoom-icon">
        <div class="cro147-zoom-container">
          <img src="https://d27c6j8064skg9.cloudfront.net/ConversionRateExpert/VectorVest/VEC57/zoom-in.png" alt="" />
        </div>
      </div>
    `;

    var imageGallerySlider = `
      <div id="cro147-gallery-section" class="cro147-gallery-container">
        <div class="cro147-gallery-wrapper">
          <div class="cro147-swiper-container">
            <div class="cro147-swiper-wrapper">
              <div class="swiper-wrapper">
                <!-- Main slides will be generated here -->
              </div>
            </div>
            <!-- <div class="swiper-button-next cro147-next"></div> -->
            <!-- <div class="swiper-button-prev cro147-prev"></div> -->
            <!-- ${modalOpeningIcon} -->
          </div>
          <div class="cro147-swiper-thumb-container">
            <div class="cro147-swiper-thumb-wrapper">
              <div class="swiper-wrapper">
                <!-- Thumbnail slides will be generated here -->
              </div>
            </div>
            <div class="swiper-button-next cro147-thumb-next"></div>
            <div class="swiper-button-prev cro147-thumb-prev"></div>
          </div>
        </div>
      </div>
    `;

    var imageGallerySliderModal = `
		<!-- <div class="cro147-modal-overlay"></div> -->
		<div class="cro147-modal-wrapper">
		  <div class="cro147-modal-container">
			<div class="cro147-modal-cross"></div>
			<div class="cro147-modal-main cro147-swiper-modal-container">
			  <div class="cro147-modal-swiper-wrapper">
				<div class="swiper-wrapper">
				  <!-- Main slides will be generated here -->
				</div>
			  </div>
			  <div class="swiper-button-next cro147-modal-next"></div>
			  <div class="swiper-button-prev cro147-modal-prev"></div>
			</div>
			<div class="cro147-modal-swiper-thumb-container">
			  <div class="cro147-modal-swiper-thumb-wrapper">
				<div class="swiper-wrapper">
				  <!-- Thumbnail slides will be generated here -->
				</div>
			  </div>
			  <div class="swiper-button-next cro147-modal-thumb-next"></div>
			  <div class="swiper-button-prev cro147-modal-thumb-prev"></div>
			</div>
		  </div>
		</div>
	  `;
    // function generateSlides() {
    //   var mainSliderContainer = document.querySelector(".cro147-swiper-wrapper .swiper-wrapper");
    //   var thumbSliderContainer = document.querySelector(".cro147-swiper-thumb-wrapper .swiper-wrapper");
    //   var modalSliderContainer = document.querySelector(".cro147-swiper-modal-container .swiper-wrapper");
    //   var modalThumbSliderContainer = document.querySelector(".cro147-modal-swiper-thumb-wrapper .swiper-wrapper");

    //   document.querySelectorAll(".fotorama__stage .fotorama__img").forEach(function (image, index) {
    //     var imageUrl = image.src;
    //     var imageAlt = image.alt;

    //     if (imageUrl && imageAlt) {
    //       // Create main slide
    //       var mainSlideHTML = `
    //         <div class="swiper-slide">
    //           <div class="cro147-slider-image">
    //             <img src="${imageUrl}" alt="${imageAlt}" />
    //           </div>
    //         </div>
    //       `;

    //       mainSliderContainer.insertAdjacentHTML("beforeend", mainSlideHTML);
    //       modalSliderContainer.insertAdjacentHTML("beforeend", mainSlideHTML);

    //       // Create thumbnail slide
    //       var thumbSlideHTML = `
    //         <div class="swiper-slide">
    //           <div class="cro147-slider-image">
    //             <img src="${imageUrl}" alt="${imageAlt}" />
    //           </div>
    //         </div>
    //       `;

    //       thumbSliderContainer.insertAdjacentHTML("beforeend", thumbSlideHTML);
    //       modalThumbSliderContainer.insertAdjacentHTML("beforeend", thumbSlideHTML);
    //     }
    //   });
    // }
    function generateSlides() {
      waitForElementJQ("[data-gallery-role=gallery-placeholder]", function () {
        jQuery("[data-gallery-role=gallery-placeholder]").each(function () {
          var mainSliderContainer = document.querySelector(".cro147-swiper-wrapper .swiper-wrapper");
          var thumbSliderContainer = document.querySelector(".cro147-swiper-thumb-wrapper .swiper-wrapper");
          var modalSliderContainer = document.querySelector(".cro147-swiper-modal-container .swiper-wrapper");
          var modalThumbSliderContainer = document.querySelector(".cro147-modal-swiper-thumb-wrapper .swiper-wrapper");
          var $gallery = jQuery(this);
          var galleryData = $gallery.data("gallery");

          if (!galleryData || !galleryData.fotorama || !galleryData.fotorama.data) {
            console.warn("Gallery data not found");
            return;
          }

          // Extract image URLs from the gallery configuration
          var imageUrls = galleryData.fotorama.data.map(function (item) {
            return item.img; // Extracts the main image URLs
          });

          console.log("Extracted Image URLs:", imageUrls);

          imageUrls.forEach(function (imageUrl) {
            // Check if image is already added
            var existingMainImage = mainSliderContainer.querySelector(`img[src="${imageUrl}"]`);
            if (existingMainImage) return; // Skip if the image is already present

            // Create main slide
            var mainSlideHTML = `
							<div class="swiper-slide">
								<div class="cro147-slider-image">
									<img src="${imageUrl}" alt="Product Image" />
								</div>
							</div>
						`;

            mainSliderContainer.insertAdjacentHTML("beforeend", mainSlideHTML);
            modalSliderContainer.insertAdjacentHTML("beforeend", mainSlideHTML);

            // Create thumbnail slide
            var thumbSlideHTML = `
							<div class="swiper-slide">
								<div class="cro147-slider-image">
									<img src="${imageUrl}" alt="Thumbnail Image" />
								</div>
							</div>
						`;

            thumbSliderContainer.insertAdjacentHTML("beforeend", thumbSlideHTML);
            modalThumbSliderContainer.insertAdjacentHTML("beforeend", thumbSlideHTML);
          });
        });
      });
    }

    function sliderInsertion() {
      waitForElement(
        "#maincontent .gallery-container .fotorama__stage .fotorama__img",
        function () {
          if (!document.querySelector(".cro147-gallery-container")) {
            document.querySelector("#maincontent .gallery-container").insertAdjacentHTML("beforebegin", imageGallerySlider);
          }
          if (!document.querySelector(".cro147-modal-wrapper")) {
            document.querySelector("body").insertAdjacentHTML("beforeend", imageGallerySliderModal);
          }

          var forceTrigger = setInterval(() => {
            generateSlides();
          }, 50);
          setTimeout(() => {
            clearInterval(forceTrigger);
            waitForSwiper(intializeSwiper);
          }, 1000);
        },
        15000
      );
    }

    function updateProductInfo(selector, targetSelector) {
      waitForElement(
        selector,
        function () {
          var element = document.querySelector(selector);
          var target = document.querySelector(targetSelector);
          if (target) {
            target.textContent = element.textContent.trim();
          }
        },
        10000
      );
    }

    function productInfoSection() {
      waitForElement(
        ".product-info-main .product-left",
        function () {
          if (!document.querySelector(".cro147-product-info-container")) {
            document.querySelector(".product-info-main .product-left").insertAdjacentHTML("afterend", productInfoHtml);
          }
          var productInfo1 = document.querySelector(".cro147-product-info1");

          updateProductInfo(".product-info-main .product-cb-name", ".cro147-product-info2");
          updateProductInfo(".product-info-main .product-cb-name-only", ".cro147-product-info2");
          updateProductInfo(".product-info-main .product-cb-range", ".cro147-product-info3");
          updateProductInfo(".product-info-main .product.attribute.sku .value", ".cro147-product-info4");

          waitForElement(
            ".product-info-main .stock",
            function () {
              var productInfo5 = document.querySelector(".cro147-product-info5");
              var productStock = document.querySelector(".product-info-main .stock");
              if (productInfo5) {
                if (productStock.classList.contains("available")) {
                  productInfo5.classList.add("cro147-available");
                  productInfo5.textContent = "In stock";
                } else {
                  productInfo5.classList.add("cro147-unavailable");
                  productInfo5.textContent = "Out of stock";
                }
              }
            },
            10000
          );
          updateProductInfo(".product-info-main .product.attribute.overview .value", ".cro147-product-info6");

          waitForElement(
            ".product-info-main .product-static-text",
            function () {
              var productInfo7 = document.querySelector(".cro147-product-info7");
              var tabsCbAccordion = document.querySelector(".product-info-main .product-static-text");
              productInfo7 && productInfo7.insertAdjacentElement("beforeend", tabsCbAccordion);
            },
            10000
          );
        },
        10000
      );
    }

    function ratingContent() {
      waitForElement(
        ".product-review-wrap .product-reviews-summary .reviews-summary-top .rating-point ~ .rating-summary .rating-result",
        function () {
          setTimeout(function () {
            var ratingResult = document.querySelector(".product-review-wrap .product-reviews-summary .rating-result");
            var ratingPoint = document.querySelector(".product-review-wrap .product-reviews-summary .rating-point");
            var reviewWrapper = document.querySelector(".cro147-review-wrapper");
            var reviewIcon = document.querySelector(".cro147-review-icon");
            var reviewText = document.querySelector(".cro147-review-text");

            if (ratingResult && ratingPoint) {
              var ratingPercentage = ratingResult.getAttribute("title");
              var ratingHTML = ratingResult.innerHTML.trim();
              var ratingValue = ratingPoint.textContent.trim();

              reviewWrapper.setAttribute("cre-title", ratingPercentage);
              reviewIcon.innerHTML = `<div class="cro147-review-title" cre-title="${ratingPercentage}">${ratingHTML}</div>`;
              reviewText.textContent = `Rated ${ratingValue}/5`;

              // hidden it if rating-point is greater than 0
              if (parseFloat(ratingValue) > 0) {
                reviewWrapper.classList.remove("cro147-review-hide");
              }
            }
          }, 300);
        },
        10000
      );
    }

    function intializeSwiper() {
      // Initialize thumbnail swiper for main slider
      var swiperThumbs = new Swiper(".cro147-swiper-thumb-wrapper", {
        direction: "vertical",
        slidesPerView: "auto",
        spaceBetween: 10,
        watchSlidesProgress: true,

        centeredSlides: false,
        loop: false,
        slideToClickedSlide: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        navigation: {
          nextEl: ".cro147-thumb-next",
          prevEl: ".cro147-thumb-prev",
        },
      });

      // Initialize main swiper
      var swiperMain = new Swiper(".cro147-swiper-wrapper", {
        slidesPerView: 1,
        spaceBetween: 2,
        loop: false,
        thumbs: {
          swiper: swiperThumbs,
        },
        // navigation: {
        //   nextEl: ".cro147-next",
        //   prevEl: ".cro147-prev",
        // },
      });

      // Initialize thumbnail swiper for modal slider
      var swiperModalThumbs = new Swiper(".cro147-modal-swiper-thumb-wrapper", {
        slidesPerView: "auto",
        spaceBetween: 10,
        watchSlidesProgress: true,
        navigation: {
          nextEl: ".cro147-modal-thumb-next",
          prevEl: ".cro147-modal-thumb-prev",
        },
      });

      // Initialize main modal swiper
      var swiperModalMain = new Swiper(".cro147-modal-swiper-wrapper", {
        slidesPerView: 1,
        spaceBetween: 2,
        loop: false,
        thumbs: {
          swiper: swiperModalThumbs,
        },
        navigation: {
          nextEl: ".cro147-modal-next",
          prevEl: ".cro147-modal-prev",
        },
      });

      // Function to open modal and sync swiper index
      live(".cro147-swiper-container .cro147-slider-image", "click", function () {
        var activeIndex = swiperMain.activeIndex; // Get current index of main swiper
        document.querySelector("body").classList.add("cro147-modal-open"); // Show modal
        swiperModalMain.slideTo(activeIndex, 0, false); // Sync modal swiper to same index
      });

      // Function to close modal and sync back swiper index
      live(".cro147-modal-cross", "click", function () {
        document.querySelector("body").classList.remove("cro147-modal-open"); // Hide modal
        swiperMain.slideTo(swiperModalMain.activeIndex, 0, false); // Sync main swiper back
      });

      // Sync modal swiper with main swiper
      swiperMain.on("slideChange", function () {
        swiperModalMain.slideTo(swiperMain.activeIndex, 0, false);
      });

      // Sync main swiper with modal swiper
      swiperModalMain.on("slideChange", function () {
        swiperMain.slideTo(swiperModalMain.activeIndex, 0, false);
      });
    }


    function dropdownFunctionality() {
      function dropdownClose() {
        var allDropdowns = document.querySelectorAll(".tabs-CB-accordion .tab-CB-accordion");
        allDropdowns.forEach(function (item) {
          item.classList.remove("cro417-dropdown-open");
        });
      }

      live(".tabs-CB-accordion .tab-CB-accordion-label", "click", function (event) {
        event.preventDefault();

        var parent = this.parentElement;
        if (!parent) return;

        if (parent.classList.contains("cro417-dropdown-open")) {
          parent.classList.remove("cro417-dropdown-open");
        } else {
          dropdownClose();
          parent.classList.add("cro417-dropdown-open");
        }
      });
    }

    /* Variation Init */
    function init() {
      addClass("body", recipe_name);

      sliderInsertion();
      productInfoSection();
      ratingContent();

      dropdownFunctionality();
    }

    waitForElement(
      ".catalog-product-view #maincontent",
      function () {
        if (window.innerWidth > 1023) {
          init();
        }
      },
      25000
    );
  } catch (e) {
    if (debug) console.log(e, "error in Test" + recipe_name);
  }
})();