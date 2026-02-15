(function () {
    try {
      /* main variables */
      var debug = 0;
      var variation_name = "cro-t-oneDay-xtd-54_56";
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
  
      function trigger() {
        var doneTypingInterval = 5000;  //time in ms, 5 seconds for example
        var intervalCallAgain = setInterval(function () {
          croOneDayCustom();
        }, 400);
  
        //start the countdown
        var Timer = setTimeout(function () {
          clearInterval(intervalCallAgain);
        }, doneTypingInterval);
  
      }
  
      function croOneDayCustom() {
        waitForElement('section svg.icon', function () {
            var element = document.querySelector('section svg.icon');
            var closestAncestor = element?.closest('[class*="css"]')
                ?.parentElement
                ?.closest('[class*="css"]')
                ?.parentElement
                ?.closest('[class*="css"]')
                ?.parentElement
                ?.closest('[class*="css"]')
                ?.parentElement
                ?.closest('[class*="css"]')
                ?.parentElement
                ?.closest('[class*="css"]')
                ?.parentElement
                ?.closest('[class*="css"]')
                ?.parentElement
                ?.closest('[class*="css"]')
                ?.parentElement;

            if (closestAncestor) {
                closestAncestor.setAttribute('cro-MainContainer', 'cro-product-container');
            }
        });
      }
  
  
    //   var croHeader = `<div class="cro-xtd-54_56-header" style="display: none;">
    //       <div class="cro-xtd-54_56-header-wrapper">
    //           <div class="cro-xtd-54_56-heading">
    //               <p>Extra Time Deals:</p>
    //           </div>
    //           <div class="cro-xtd-54_56-subHeading">
    //               <p>Deals so good we're giving you another chance</p>
    //           </div>
    //       </div>
    //   </div>`;
  
      function init() {
        addClass("body", variation_name);
        addClass("body", "cro-ki55-cta");
        trigger();
  
        // waitForElement('[cro-MainContainer="cro-product-container"]', function () {
        //   if (!document.querySelector(".cro-xtd-54_56-header")) {
        //     insertHtml('[cro-MainContainer="cro-product-container"]', croHeader, "beforebegin");
        //   }
        // });
      }
  
      if (!window.cro_t_xtd_54_55_56) {
        waitForElement('body', init);
        window.cro_t_xtd_54_55_56 = true;
      }
  
  
    } catch (e) {
      if (debug) console.log(e, "error in Test" + variation_name);
    }
  })();