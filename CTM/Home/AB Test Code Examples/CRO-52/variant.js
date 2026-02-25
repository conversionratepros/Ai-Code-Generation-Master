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
    var croProminentText = '' +
      '  <div class="cro-prominent">' +
      '      <div class="cro-prominent-wrapper">' +
      '          <h3 class="cro-prominent-text">90 days hassle free returns</h3>' +
      '      </div>' +
      '  </div>';
    /* Variation Init */
    function init() {
      addClass("body", "cro-test-recipe106")

      if (window.innerWidth < 801) {
        waitForElement(".media-info-main .price-sku-container-mobile", function () {
          if (!document.querySelector(".cro-prominent")) {
            insertHtml(".media-info-main .price-sku-container-mobile", croProminentText, "afterend");
          }
        });
      } else {
        waitForElement(".product-info-main .price-sku-container", function () {
          if (!document.querySelector(".cro-prominent")) {
            insertHtml(".product-info-main .price-sku-container", croProminentText, "afterend");
          }

        });
      }
    }


    function addEvent() {
      live(".cro-prominent-text", "click", function () {
        var cromodal_3 = document.querySelector(".modal_3.vas-modal_button");
        cromodal_3 && cromodal_3.click();
      });
    }


    if (!window.cro_106_90Days) {
      waitForElement('.catalog-product-view', init);
      addEvent();
      window.cro_106_90Days = true;
    }

    /* Initialise variation */


  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();