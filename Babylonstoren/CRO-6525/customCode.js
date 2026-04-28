(function () {
  try {
    /* main variables */
    var debug = 1;
    var recipe_name = "cro6525";

    function waitForElement(selector, trigger, delayInterval, delayTimeout) {
      var interval = setInterval(function () {
        if (document && document.querySelector(selector) && document.querySelectorAll(selector).length > 0) {
          clearInterval(interval);
          trigger();
        }
      }, delayInterval);
      setTimeout(function () {
        clearInterval(interval);
      }, delayTimeout);
    }
    function forceInsertion(trigger, interval, delay) {
      var forceTrigger = setInterval(function () {
        trigger();
      }, interval);
      setTimeout(function () {
        clearInterval(forceTrigger);
      }, delay);
    }

    function listener() {
      window.addEventListener("locationchange", function () {
        processChange();
      });
      history.pushState = (function (f) {
        return function pushState() {
          var ret = f.apply(this, arguments);
          window.dispatchEvent(new Event("pushstate"));
          window.dispatchEvent(new Event("locationchange"));
          return ret;
        };
      })(history.pushState);
      history.replaceState = (function (f) {
        return function replaceState() {
          var ret = f.apply(this, arguments);
          window.dispatchEvent(new Event("replacestate"));
          window.dispatchEvent(new Event("locationchange"));
          return ret;
        };
      })(history.replaceState);
      window.addEventListener("popstate", function () {
        window.dispatchEvent(new Event("locationchange"));
      });
    }
    function processChange() {
      var url = window.location.href;
      if (url.includes("/za")) {
        setTimeout(function () {
          init();
        }, 500);
      } else {
        document.body.classList.remove(recipe_name);
      }
    }

    var categoriesHtmlContent = `
      <div class="cro6525-container" style="display: none;">
        <div class="cro6525-wrapper">
          <div class="cro6525-content cro6525-content1">
            <div class="cro6525-content-wrapper">
              <div class="cro6525-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="18" viewBox="0 0 23 18" fill="none">
                  <path d="M6.89184 4.74775L14.3088 8.64641M14.3088 8.64641V16.9334M14.3088 8.64641L18.4354 6.45637M21.669 4.76636L18.4354 6.45637M10.8026 2.3153L13.4062 0.9725C13.985 0.673956 14.673 0.675965 15.2501 0.977884L20.953 3.96151C21.6125 4.30655 22.0259 4.9893 22.0259 5.73363V11.9454C22.0259 12.6752 21.6283 13.3471 20.9886 13.6984L15.2854 16.8305C14.6896 17.1577 13.9683 17.1599 13.3705 16.8362L7.57031 13.6961C6.92471 13.3465 6.5225 12.6714 6.5225 11.9373V5.74163C6.5225 4.9931 6.94048 4.30723 7.60573 3.96412L10.8026 2.3153ZM10.8026 2.3153L18.4354 6.45637M18.4354 6.45637V9.82103M4.12503 4.5228L1.84341 2.92794M4.12503 8.06158L0.750137 6.11269M4.12503 11.6741L0.750137 9.82103" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                </svg>
              </div>
              <div class="cro6525-text">FREE DELIVERY NATIONWIDE</div>
            </div>
          </div>
          <div class="cro6525-content cro6525-content2">
            <div class="cro6525-content-wrapper">
              <div class="cro6525-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                  <path d="M16.5063 12.1035H19.6808C19.7862 12.1035 19.8908 12.1212 19.9904 12.1557C21.0051 12.5074 21.6854 13.4634 21.6854 14.5373V14.8893M16.5063 12.1035V16.7502M16.5063 12.1035C16.5063 11.0642 15.6638 10.2217 14.6245 10.2217H12.8326M18.5368 18.788H20.6854C21.2377 18.788 21.6854 18.3403 21.6854 17.788V14.8893M18.5368 18.788V18.7502C18.5368 17.6457 17.6414 16.7502 16.5368 16.7502H16.5063M18.5368 18.788V18.8571C18.5368 19.9616 17.6414 20.8571 16.5368 20.8571H16.4758C15.3713 20.8571 14.4759 19.9616 14.4759 18.8571V18.788M14.4759 18.788V18.7502C14.4759 17.6457 15.3713 16.7502 16.4758 16.7502H16.5063M14.4759 18.788H11.0116M11.0116 18.788V18.7502C11.0116 17.6457 10.1162 16.7502 9.01164 16.7502H8.9361C7.83153 16.7502 6.9361 17.6457 6.9361 18.7502V18.788M11.0116 18.788V18.8571C11.0116 19.9616 10.1162 20.8571 9.01164 20.8571H8.9361C7.83153 20.8571 6.9361 19.9616 6.9361 18.8571V18.788M6.9361 18.788H6.26733C5.4389 18.788 4.76733 18.1164 4.76733 17.288V14.1448M21.6854 14.8893H19.0703M6.31404 3.79355V6.33713C6.31404 6.61327 6.09018 6.83713 5.81404 6.83713H3.67498M11.6879 6.21893C11.6879 3.19852 9.23934 0.75 6.21893 0.75C3.19852 0.75 0.75 3.19852 0.75 6.21893C0.75 9.23934 3.19852 11.6879 6.21893 11.6879C9.23934 11.6879 11.6879 9.23934 11.6879 6.21893Z" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="cro6525-text">NEXT DAY DELIVERY* (CPT, JHB & PTA)</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // ______________________________________________
    // ______________________________________________
    // Stores the last known scroll position to compare scroll direction
    var lastScrollTop = 0;
    // Minimum scroll distance required to trigger the animation
    var delta = 12;

    function cro6525HandleScroll() {
      var currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (Math.abs(lastScrollTop - currentScrollTop) <= delta) return;

      if (currentScrollTop > lastScrollTop) {
        // Scroll Down
        document.body.classList.add("cro6525-scroll-down");
        document.body.classList.remove("cro6525-scroll-up");
      } else {
        // Scroll Up
        document.body.classList.add("cro6525-scroll-up");
        document.body.classList.remove("cro6525-scroll-down");
      }

      // For Mobile or negative scrolling
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    }

    function categoriesHtml() {
      var header = document.querySelector("html body .x-shop-header");
      if (!document.querySelector(".cro6525-container")) {
        header && header.insertAdjacentHTML("afterBegin", categoriesHtmlContent);
      }
    }

    function init() {
      document.body.classList.add(recipe_name);
      categoriesHtml();

      if (!window.cro6525EventHandler) {
        window.addEventListener("scroll", cro6525HandleScroll);
        window.cro6525EventHandler = true;
      }
    }

    // listener();
    waitForElement("html body .x-shop-header", init, 50, 20000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + recipe_name);
  }
})();