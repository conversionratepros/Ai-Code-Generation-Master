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

    /* Variation html */
    var croLogoCredit = `<section class="cro-partnerLogos-t-57">
        <div class="cro-partnerLogos-t-57-wrapper relative container">
            <div class="cro-partnerLogos-t-57-inner">
                <h3 class="cro-partnerLogos-t-57-header">Partner brands</h3>
                <div class="cro-partnerLogos-t-57-images">
                    <div class="cro-partnerLogos-t-57-img cro-partnerLogos-t-57-one">
                        <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/JM_Recipe%2057_BebtBuster.png" alt="">
                        
                    </div>
                    <div class="cro-partnerLogos-t-57-img cro-partnerLogos-t-57-two">
                        <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/JM_Recipe%2057_nedbank-logo%20.png" alt="">
                        
                    </div>
                    <div class="cro-partnerLogos-t-57-img cro-partnerLogos-t-57-three">
                        <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/JM_Recipe%2057_sanlam.png" alt="">
                       
                    </div>
                    <div class="cro-partnerLogos-t-57-img cro-partnerLogos-t-57-four">
                        <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/JM_Recipe%2057_ooba.png" alt="">
                        
                    </div>
                </div>
            </div>
        </div>
    </section>`;

    /* Variation Init */
    function init() {

      addClass("body", "cro-brandingCreditSav");

      waitForElement(".register-hld.register .testimonials", function () {
        if (!document.querySelector(".cro-partnerLogos-t-57")) {
          insertHtml(".register-hld.register .testimonials", croLogoCredit, "beforebegin");
        }
      });
      // waitForElement(".new-sec", function () {
      //   if (document.querySelector(".cro-partnerLogos-t-57")) {
      //     // insertHtml(".register-hld.register", croLogoCredit, "afterend");
      //     document.querySelector('.new-sec').insertAdjacentElement('beforebegin', document.querySelector('.cro-partnerLogos-t-57'))
      //   }
      // });
    }

    /* Initialise variation */
    waitForElement('body', init);

  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();