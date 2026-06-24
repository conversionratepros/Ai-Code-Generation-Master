(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "croki74";
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

    var cro_banner_image = `
      <div class="croki74-new-banner-image" style="display:none">
        <div class="croki74-new-banner-image-wrapper">
          <div class="croki74-new-banner-image-parent">
            <img src="https://app.justmoney.co.za/registrationbg.ce2761211190336d.webp" alt="Women looking at phone and smiling" />
          </div>
        </div>
      </div>
    `;

    var credit_Score = `
 
      <div class="croki74-credit-score-section" style="display:none">
        <div class="croki74-credit-score-wrapper">
          <div class="croki74-credit-score-inner">
            <div class="croki74-credit-score-heading">
              <h2>Check your credit score now and take control of your finances. It's instant and totally <span>FREE!</span></h2>
            </div>
            <div class="croki74-sub-heading">
              <p class="croki74-sub-heading-text">You can:</p>
            </div>
            <div class="croki74-benefits-lists">
              <div class="croki74-benefits-list list-1">
                <div class="croki74-benefits-list-img">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3.99988 12.6111L8.92296 17.5L19.9999 6.50003" stroke="#4AAEAC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="croki74-benefits-list-text">Get a personal loan and credit facility</div>
              </div>
              <div class="croki74-benefits-list list-2">
                <div class="croki74-benefits-list-img">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3.99988 12.6111L8.92296 17.5L19.9999 6.50003" stroke="#4AAEAC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="croki74-benefits-list-text">Consolidate your debt</div>
              </div>
              <div class="croki74-benefits-list list-3">
                <div class="croki74-benefits-list-img">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3.99988 12.6111L8.92296 17.5L19.9999 6.50003" stroke="#4AAEAC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="croki74-benefits-list-text">Save and invest</div>
              </div>
              <div class="croki74-benefits-list list-4">
                <div class="croki74-benefits-list-img">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3.99988 12.6111L8.92296 17.5L19.9999 6.50003" stroke="#4AAEAC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="croki74-benefits-list-text">Protect your car</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    var formBottom = `
      <div class="croki74-form-bottom-icon" style="display:none">
        <div class="croki74-form-bottom-icon-wrapper">
          <div class="croki74-form-bottom-icon-innerr">
            <div class="cro-need-help">
              <div class="cro-need-help-icon">
                <span class="cro-border-orange rounded-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                    <path
                      d="M23.7918 21.6319C23.3823 21.1972 22.8884 20.9648 22.365 20.9648C21.8458 20.9648 21.3477 21.1929 20.9214 21.6276L19.5875 22.9833C19.4778 22.9231 19.368 22.8671 19.2625 22.8112C19.1105 22.7337 18.967 22.6605 18.8446 22.5831C17.5951 21.7739 16.4596 20.7195 15.3706 19.3552C14.8429 18.6752 14.4884 18.1028 14.2309 17.5218C14.577 17.199 14.8978 16.8633 15.2102 16.5405C15.3284 16.42 15.4466 16.2952 15.5648 16.1747C16.4512 15.2709 16.4512 14.1002 15.5648 13.1964L14.4124 12.0215C14.2815 11.8881 14.1465 11.7504 14.0198 11.6126C13.7666 11.3458 13.5006 11.0704 13.2263 10.8121C12.8168 10.399 12.3271 10.1795 11.8122 10.1795C11.2972 10.1795 10.7991 10.399 10.377 10.8121C10.3728 10.8164 10.3728 10.8164 10.3685 10.8207L8.93336 12.297C8.39305 12.8478 8.08491 13.5192 8.01737 14.2982C7.91606 15.5549 8.27908 16.7256 8.55767 17.4917C9.2415 19.3724 10.263 21.1155 11.7868 22.9833C13.6357 25.2342 15.8602 27.0117 18.4014 28.2641C19.3722 28.7332 20.6681 29.2884 22.116 29.3831C22.2046 29.3874 22.2975 29.3917 22.3819 29.3917C23.357 29.3917 24.1759 29.0345 24.8175 28.3244C24.8217 28.3157 24.8302 28.3114 24.8344 28.3028C25.0539 28.0317 25.3071 27.7864 25.5731 27.5238C25.7546 27.3474 25.9403 27.1623 26.1218 26.9687C26.5397 26.5254 26.7592 26.0089 26.7592 25.4795C26.7592 24.9459 26.5355 24.4337 26.1092 24.0033L23.7918 21.6319ZM25.3029 26.1638C25.2987 26.1638 25.2987 26.1681 25.3029 26.1638C25.1383 26.3446 24.9695 26.5081 24.7879 26.6889C24.5136 26.9557 24.235 27.2355 23.9733 27.5497C23.5469 28.0145 23.0446 28.234 22.3861 28.234C22.3228 28.234 22.2553 28.234 22.1919 28.2297C20.9383 28.1479 19.7732 27.6487 18.8995 27.2226C16.5103 26.0433 14.4124 24.3692 12.6691 22.2474C11.2297 20.4785 10.2672 18.8431 9.62984 17.0871C9.23728 16.0154 9.09376 15.1805 9.15708 14.3929C9.19929 13.8894 9.38924 13.4719 9.73959 13.1147L11.179 11.6471C11.3858 11.4491 11.6053 11.3415 11.8206 11.3415C12.0865 11.3415 12.3018 11.505 12.4369 11.6428C12.4411 11.6471 12.4453 11.6514 12.4496 11.6557C12.7071 11.901 12.9519 12.1549 13.2094 12.4261C13.3402 12.5638 13.4753 12.7015 13.6104 12.8435L14.7627 14.0185C15.2102 14.4747 15.2102 14.8965 14.7627 15.3527C14.6403 15.4775 14.5221 15.6023 14.3997 15.7228C14.0452 16.0929 13.7075 16.4372 13.3402 16.7729C13.3318 16.7815 13.3233 16.7858 13.3191 16.7944C12.9561 17.1646 13.0236 17.5261 13.0996 17.7714C13.1038 17.7843 13.1081 17.7972 13.1123 17.8101C13.412 18.5504 13.8341 19.2476 14.4757 20.0782L14.4799 20.0826C15.645 21.5458 16.8733 22.6864 18.2283 23.56C18.4014 23.6719 18.5787 23.7623 18.7475 23.8484C18.8995 23.9259 19.043 23.999 19.1654 24.0765C19.1823 24.0851 19.1992 24.098 19.216 24.1066C19.3596 24.1798 19.4946 24.2142 19.6339 24.2142C19.9843 24.2142 20.2038 23.9904 20.2756 23.9172L21.7192 22.4453C21.8627 22.299 22.0906 22.1226 22.3566 22.1226C22.6183 22.1226 22.8336 22.2904 22.9644 22.4367C22.9686 22.441 22.9686 22.441 22.9729 22.4453L25.2987 24.8167C25.7335 25.2557 25.7335 25.7076 25.3029 26.1638Z"
                      fill="#E59A2C"
                    />
                    <path d="M18.7938 13.8507C19.8997 14.04 20.9043 14.5737 21.7064 15.3914C22.5084 16.2091 23.0276 17.2334 23.2175 18.361C23.264 18.6451 23.5046 18.8431 23.7789 18.8431C23.8127 18.8431 23.8422 18.8388 23.876 18.8345C24.1884 18.7828 24.3952 18.4816 24.3446 18.1631C24.1166 16.7988 23.4835 15.555 22.5168 14.5694C21.5502 13.5838 20.3303 12.9382 18.9922 12.7058C18.6798 12.6542 18.3885 12.8651 18.3337 13.1793C18.2788 13.4934 18.4814 13.799 18.7938 13.8507Z" fill="#E59A2C" />
                    <path d="M27.9625 17.9952C27.5868 15.7486 26.5484 13.7043 24.9528 12.0775C23.3572 10.4506 21.3522 9.3919 19.1487 9.00886C18.8406 8.95291 18.5493 9.1681 18.4944 9.48228C18.4438 9.80076 18.6506 10.0977 18.963 10.1537C20.93 10.4937 22.724 11.4448 24.1508 12.8952C25.5775 14.3499 26.5062 16.179 26.8396 18.1846C26.8861 18.4686 27.1267 18.6666 27.401 18.6666C27.4348 18.6666 27.4644 18.6623 27.4981 18.658C27.8063 18.6107 28.0173 18.3094 27.9625 17.9952Z" fill="#E59A2C" />
                    <circle cx="18.5" cy="18.5" r="18" stroke="#E59A2C" />
                  </svg>
                </span>
              </div>
              <div class="cro-need-help-icon-parent">
                <div class="croki74-help-icon-text">Need Help?</div>
                <div class="croki74-help-icon-text-2"><span>Call us on 0875376113</span></div>
              </div>
            </div>
            <div class="cro-google-play-icon">
              <a href="https://play.google.com/store/apps/details?id=za.co.justmoneycreditsav.twa&amp;pcampaignid=web_sharewebsource=JmPlatformRegistrationTopDesktop&amp;utm_source=PlatformJm&amp;utm_medium=PlayStoreBtn&amp;utm_campaign=Registration_top_desktop&amp;utm_content=GetItOnGooglePlay" class="d-block cro-gplayimage"><img src="../../assets/images/gplay.png" alt="" class="img-fluid" /></a>
            </div>
          </div>
        </div>
      </div>
    `;

    function addingClasstoSection() {
      waitForElement(".register-hld .topcaption", function () {
        var parent = document.querySelector(".topcaption").closest(".col-12.mt-3");
        if (parent) {
          parent.classList.add("cro-credit-score-control");
        }
      });

      waitForElement(".register-hld .loginbgholder", function () {
        var parent = document.querySelector(".loginbgholder").closest(".col-lg-8");
        if (parent) {
          parent.classList.add("cro-hero-banner-bottom");
        }
      });

      waitForElement("#registerForm #FirstName", function () {
        var parent = document.querySelector("#FirstName").closest(".custom-row");
        if (parent) {
          parent.classList.add("cro-from-name-parent");
        }
      });

      waitForElement("#registerForm #PhoneNumber", function () {
        var parent = document.querySelector("#PhoneNumber").closest(".custom-row");
        if (parent) {
          parent.classList.add("cro-from-number-parent");
        }
      });

      waitForElement("#registerForm #Password", function () {
        var parent = document.querySelector("#registerForm #Password").closest(".custom-row");
        if (parent) {
          parent.classList.add("cro-from-Password-parent");
        }
      });

      waitForElement("#registerForm #AcceptTerms-2", function () {
        var parent = document.querySelector("#registerForm #AcceptTerms-2").closest(".custom-row");
        if (parent) {
          parent.classList.add("cro-from-tmc-parent");
        }
      });

      waitForElement("#registerForm #btn_userJourney_registrationSubmit_registration", function () {
        var parent = document.querySelector("#registerForm #btn_userJourney_registrationSubmit_registration").closest(".custom-row");
        if (parent) {
          parent.classList.add("cro-from-button-parent");
        }
      });
    }

    function addingNewSection() {
      waitForElement(".register-hld .rating-badge", function () {
        if (!document.querySelector(".croki74-credit-score-section")) {
          insertHtml(".register-hld .rating-badge", credit_Score, "beforebegin");
        }
      });

      waitForElement("html body.croki74 .registerholder .container", function () {
        if (!document.querySelector(".croki74-new-banner-image")) {
          insertHtml("html body.croki74 .registerholder .container", cro_banner_image, "beforeend");
        }
      });

      waitForElement(".register-hld .registerform", function () {
        if (!document.querySelector(".croki74-form-bottom-icon")) {
          insertHtml(".register-hld .registerform", formBottom, "afterend");
        }
      });
    }

    function init() {
      addClass("body", variation_name);
      addingClasstoSection();
      addingNewSection();
    }

    function croEventHandkler() {
      live("body app-root app-register #id-number-form #btn_userJourney_registrationStart_registration", "click", function () {
        var doneTypingInterval = 9000; //time in ms, 5 seconds for example
        var intervalCallAgain = setInterval(function () {
          if (!document.querySelector('#registerForm[style="display: none;"]')) {
            document.querySelector("body").classList.add("cro_step_2");
          }
        }, 400);

        //start the countdown
        var Timer = setTimeout(function () {
          clearInterval(intervalCallAgain);
        }, doneTypingInterval);
      });

      live(".croki74-help-icon-text-2", "click", function () {
        var btn = document.querySelector(".loginbgholder #callme");
        if (btn) {
          btn.click();
        }
      });
    }

    if (window.innerWidth > 1024 && !window.cro_t_20) {
      waitForElement(".registerholder", init);
      croEventHandkler();
      window.cro_t_20 = true;
    }
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();