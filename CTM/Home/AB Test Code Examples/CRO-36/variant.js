(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "";

    /* helper liberary */
    var _$;
    !(function (factory) {
      _$ = factory();
    })(function () {
      var bm = function (s) {
        if (typeof s === "string") {
          this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
          this.value = [s];
        }
      };
      bm.prototype = {
        live: function (selector, event, callback, context) {
          /****Helper Functions****/
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
        },
        waitForElement: function (selector, trigger, delayInterval, delayTimeout) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);
          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });

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

    function addClass(el, cls) {
      var el = document.querySelector(el);
      if (el) {
        el.classList.add(cls);
      }
    }

    var croUpPrice = "" + '  <div class="croTotalPrice">' + '      <div class="croTotalPrice-wrapper">' + '          <div class="total-Price">Total Price: </div>' + '          <div class="croPrice"></div>' + "      </div>" + "  </div>";

    var helper = _$();
    /* Variation Init */
    function init() {
      console.log("working");
      addClass("body", "recipe94");

      helper.waitForElement(
        ".product-info-main .qty-input-group .select-text span",
        function () {
          innerHTMLContent(".product-info-main .qty-input-group .select-text span", "=");
        },
        50,
        50000
      );
      helper.waitForElement(
        ".product-info-main .qty-input-group",
        function () {
          if (!document.querySelector(".croTotalPrice")) {
            insertHtml(".product-info-main .qty-input-group", croUpPrice, "beforeend");
          }
        },
        50,
        50000
      );
      // TOTAL PRICE SECTION
      helper.waitForElement(
        ".product-info-main #qtylable strong",
        function () {
          var uomDisplay = document.querySelector(".product-info-main #qtylable strong");
          var croTotalPrice = document.querySelector(".product-info-main .croPrice");
          if (croTotalPrice) {
            croTotalPrice.innerHTML = uomDisplay.innerHTML;
          }
          helper.live(".product-info-main .ctm-input-qty .inc.qty-btn, .product-info-main .ctm-input-qty .dec.qty-btn", "click", function () {
            var textFieldValue = document.querySelector(".product-info-main #qtylable strong").innerHTML;
            if (croTotalPrice) {
              croTotalPrice.innerHTML = textFieldValue;
            }
          });

          helper.live(".product-info-main #area_to_cover", "keyup", function () {
            var textInputFieldValue = document.querySelector(".product-info-main #qtylable strong").innerHTML;
            if (croTotalPrice) {
              croTotalPrice.innerHTML = textInputFieldValue;
            }
          });
        },
        50,
        50000
      );
    }

    /* Initialise variation */
    helper.waitForElement(".product-info-main .field.qty", init, 50, 50000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();