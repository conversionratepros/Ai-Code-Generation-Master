/* ============================================================
   CRO-12526 (v2) — Full Page PDP Redesign (Buy-first)
   Companion JS for sections/cro-12526-v2-main-product.liquid.

   Principles:
   - waitForElement-guarded init; double-init guarded via window.__cro12526v2
   - No cart/quote/back-order logic is reimplemented — the visible buttons
     forward .click() onto the control's real buy-buttons_crp.liquid buttons
     rendered (collapsed) inside [data-cro12526v2-realbuttons], so the cart
     drawer, localStorage payment pre-select, MOQ and back-order popup all
     keep working unmodified.
   - Variant changes are consumed through the theme's own global pub/sub
     (constants.js + pubsub.js, loaded unconditionally by theme.liquid):
     product-info.js publishes PUB_SUB_EVENTS.variantChange with
     { data: { sectionId, html, variant } }. A MutationObserver on the price
     container is kept only as a fallback if the pub/sub globals are absent.
   ============================================================ */
(function () {
  if (window.__cro12526v2) return;
  window.__cro12526v2 = true;

  function waitForElement(selector, callback, root) {
    root = root || document;
    var el = root.querySelector(selector);
    if (el) {
      callback(el);
      return;
    }
    var observer = new MutationObserver(function () {
      var found = root.querySelector(selector);
      if (found) {
        observer.disconnect();
        callback(found);
      }
    });
    observer.observe(root === document ? document.documentElement : root, {
      childList: true,
      subtree: true,
    });
  }

  /* ----------------------------------------------------------
     1. Gallery — "View all images" + main-image click both open
        the EXISTING viewer via its own #product-slider-zoom
        trigger. The viewer itself is untouched.
     ---------------------------------------------------------- */
  function openExistingViewer() {
    var zoomTrigger = document.getElementById('product-slider-zoom');
    if (zoomTrigger) zoomTrigger.click();
  }

  function initGallery() {
    var viewAllBtn = document.querySelector('[data-cro12526v2-view-all]');
    if (viewAllBtn) viewAllBtn.addEventListener('click', openExistingViewer);

    var mainSlider = document.querySelector('.cro12526v2-gallery .main-slider');
    if (mainSlider) {
      mainSlider.addEventListener('click', function (e) {
        var holder = document.querySelector('.product-slider-holder');
        if (holder && holder.classList.contains('zoomin')) return; // viewer already open
        if (e.target.closest('.swiper-slide')) openExistingViewer();
      });
    }
  }

  /* ----------------------------------------------------------
     2. Size dropdown — sizes are SEPARATE PRODUCTS on JasonL
        (productmeta.product_sizes metafield). Selecting one links
        through to that product, keeping the control's behaviour.
     ---------------------------------------------------------- */
  function initSizeSelect() {
    var sizeSelect = document.querySelector('[data-cro12526v2-size-select]');
    if (!sizeSelect) return;
    sizeSelect.addEventListener('change', function () {
      var readout = document.querySelector('[data-cro12526v2-size-value]');
      if (readout && sizeSelect.selectedIndex > -1) {
        readout.textContent = sizeSelect.options[sizeSelect.selectedIndex].text;
      }
      if (sizeSelect.value) window.location.href = sizeSelect.value;
    });
  }

  /* ----------------------------------------------------------
     3. Buy box — forward clicks onto the real hidden buttons.
     ---------------------------------------------------------- */
  function initBuyBoxForwarding() {
    var hiddenLayer = document.querySelector('[data-cro12526v2-realbuttons]');
    if (!hiddenLayer) return;

    var realSubmitBtn = hiddenLayer.querySelector('button[name="add"]');
    var realQuoteBtn = hiddenLayer.querySelector('#btn-addtoquote');
    var realBackorderBtn = hiddenLayer.querySelector('.backorder-btn');

    var addToCartBtn = document.querySelector('[data-cro12526v2-add-to-cart]');
    var addToQuoteBtn = document.querySelector('[data-cro12526v2-add-to-quote]');
    var backorderBtn = document.querySelector('[data-cro12526v2-backorder]');

    var realButtonsGroup = hiddenLayer.querySelector('.product-form__buttons');

    if (addToCartBtn && realSubmitBtn) {
      addToCartBtn.addEventListener('click', function () {
        if (addToCartBtn.hasAttribute('disabled')) return;
        // Back-order guard (QA round 2): perth.js flags regional
        // out-of-stock with preorder-show on the real button group — the
        // control hides its ATC entirely in that state, so never forward
        // an add for a back-ordered product.
        if (realButtonsGroup && realButtonsGroup.classList.contains('preorder-show')) return;
        try {
          // Same keys the control's drawer reads to pre-select "Buy online".
          localStorage.setItem('clickedCartBtn', 'Add to cart');
          localStorage.setItem('minicart-payement-option', 'pay-online');
        } catch (e) {}
        addToCartBtn.classList.add('cro12526v2-btn--loading');
        realSubmitBtn.click();
        setTimeout(function () {
          addToCartBtn.classList.remove('cro12526v2-btn--loading');
        }, 900);
      });
    }

    if (addToQuoteBtn && realQuoteBtn) {
      addToQuoteBtn.addEventListener('click', function () {
        // realQuoteBtn's own onclick sets localStorage ('request-quote') and
        // clicks the hidden submit — just forward.
        realQuoteBtn.click();
      });
    }

    if (backorderBtn && realBackorderBtn) {
      backorderBtn.addEventListener('click', function () {
        realBackorderBtn.click();
      });
    }
  }

  /* ----------------------------------------------------------
     4. Freight tier + SKU + option readouts on variant change.
        Primary: the theme's own pub/sub (PUB_SUB_EVENTS.variantChange,
        payload .data.variant with price in cents / sku / options).
        Fallback: MutationObserver re-parsing the rendered price text.
     ---------------------------------------------------------- */
  function freightHtmlFor(cents) {
    var amount = null;
    if (cents <= 100000) amount = 49;
    else if (cents <= 200000) amount = 149;
    else if (cents <= 1000000) amount = 199;
    var bullet = '<span class="cro12526v2-details__bullet">&middot;</span> ';
    if (amount === null) return bullet + 'Freight calculated at checkout.';
    return bullet + '<strong>Freight from $' + amount.toLocaleString('en-AU') + '</strong> &mdash; calculated at checkout.';
  }

  function renderFreight(cents) {
    var line = document.querySelector('[data-cro12526v2-freight]');
    if (!line || cents === null || isNaN(cents)) return;
    line.innerHTML = freightHtmlFor(cents);
  }

  function parsePriceCents(container) {
    if (!container) return null;
    var match = (container.textContent || '').match(/([\d,]+)(?:\.(\d{2}))?/);
    if (!match) return null;
    var dollars = parseInt(match[1].replace(/,/g, ''), 10);
    if (isNaN(dollars)) return null;
    return dollars * 100 + (match[2] ? parseInt(match[2], 10) : 0);
  }

  function initVariantChangeUpdates() {
    // NOTE: PUB_SUB_EVENTS is a top-level `const` in constants.js — it is
    // reachable as a bare identifier but is NOT a window property, so it
    // must be probed with typeof on the bare name (verified live:
    // typeof window.PUB_SUB_EVENTS === 'undefined' while the bare name is
    // an object). This script is deferred and loads after constants.js /
    // pubsub.js, so the identifiers exist by the time this runs.
    var canSubscribe = false;
    try {
      canSubscribe =
        typeof subscribe === 'function' &&
        typeof PUB_SUB_EVENTS !== 'undefined' &&
        !!PUB_SUB_EVENTS.variantChange;
    } catch (e) {
      canSubscribe = false;
    }

    if (canSubscribe) {
      subscribe(PUB_SUB_EVENTS.variantChange, function (event) {
        var variant = event && event.data && event.data.variant;
        if (!variant) return;
        renderFreight(variant.price);
        // No inline SKU text to sync (QA round 3): variant.sku on this store
        // is a compound data string; the SKU chip's popup + copy icon are
        // kept current by product-info.js's own showsku().
        // Keep the visible Add to Cart in step with the real (hidden) submit
        // button product-info.js toggles natively.
        var atcBtn = document.querySelector('[data-cro12526v2-add-to-cart]');
        if (atcBtn) {
          var label = atcBtn.querySelector('span:last-child');
          if (variant.available === false) {
            atcBtn.setAttribute('disabled', '');
            if (label) label.textContent = 'Sold out';
          } else {
            atcBtn.removeAttribute('disabled');
            if (label) label.textContent = 'Add to Cart';
          }
        }
      });
      return;
    }

    // Fallback: watch the same price container Dawn swaps natively.
    var priceContainer = document.querySelector('.cro12526v2-price__amount');
    if (!priceContainer) return;
    new MutationObserver(function () {
      renderFreight(parsePriceCents(priceContainer));
    }).observe(priceContainer, { childList: true, subtree: true, characterData: true });
  }

  /* Selected-value readouts beside each option heading — driven off the
     native change event on <variant-selects> (fires for the control's own
     radio inputs), so it works regardless of pub/sub availability. */
  function initOptionReadouts() {
    var variantSelects = document.querySelector('.cro12526v2-variants');
    if (!variantSelects) return;
    variantSelects.addEventListener('change', function (e) {
      var input = e.target;
      if (!input || input.type !== 'radio') return;
      var fieldset = input.closest('.cro12526v2-field--swatches');
      if (!fieldset) return;
      var readout = fieldset.querySelector('[data-cro12526v2-option-value]');
      if (readout) readout.textContent = input.value;
    });
  }

  /* ----------------------------------------------------------
     5. Delivery date + location.
        Date: same business-day walk as the control's calcWeekend
        (weekend skip + after-3pm rule). The control's hardcoded
        Christmas-period date overrides are intentionally NOT ported —
        port them in before any Dec/Jan window this test is live.
        Location: name from localStorage 'region' (JSON {code,name}),
        written by the theme's own change-location pop-up; a delegated
        listener on the pop-up's region list re-renders after a change.
     ---------------------------------------------------------- */
  function computeDeliveryDate(deliveryDays) {
    var today = new Date();
    var dayName = today.toString().split(' ')[0];
    var hours = today.getHours();
    if (dayName === 'Sat' || dayName === 'Sun') deliveryDays++;
    if (hours >= 15 && dayName !== 'Sat' && dayName !== 'Sun') deliveryDays++;
    for (var i = 0; i < deliveryDays; i++) {
      today.setDate(today.getDate() + 1);
      dayName = today.toString().split(' ')[0];
      if (dayName === 'Sat' || dayName === 'Sun') deliveryDays++;
    }
    return today;
  }

  function renderDeliveryLine() {
    var dateEl = document.querySelector('[data-cro12526v2-delivery-date]');
    if (dateEl) {
      var deliveryDays = parseInt(dateEl.getAttribute('data-delivery-days'), 10);
      if (deliveryDays > 0) {
        var d = computeDeliveryDate(deliveryDays);
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        dateEl.textContent = days[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()];
      }
    }

    var locationEl = document.querySelector('[data-cro12526v2-location]');
    if (locationEl) {
      try {
        var region = JSON.parse(localStorage.getItem('region'));
        if (region && region.name) locationEl.textContent = region.name;
      } catch (e) {}
    }
  }

  function initLocationPopupSync() {
    var popup = document.querySelector('#PopupModal-modal_change_location');
    if (!popup) return;
    popup.addEventListener('click', function (e) {
      if (!e.target.closest('li[data-region]')) return;
      // The theme's own changeRegion() handler writes localStorage on this
      // same click — re-render one tick later so we read the new value.
      setTimeout(renderDeliveryLine, 100);
    });
  }

  function init() {
    initGallery();
    initSizeSelect();
    initBuyBoxForwarding();
    initVariantChangeUpdates();
    initOptionReadouts();
    renderDeliveryLine();
    initLocationPopupSync();
  }

  waitForElement('#product-detail-top', function () {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  });
})();
