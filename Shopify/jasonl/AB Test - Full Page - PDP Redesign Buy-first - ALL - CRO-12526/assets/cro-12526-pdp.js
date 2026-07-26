/* ============================================================
   CRO-12526 — Full Page PDP Redesign (Buy-first)
   Companion JS for sections/cro-12526-*.liquid.

   Design principles followed (see learnings.md / shopify-build patterns):
   - waitForElement-style guarded init, no direct querySelector-and-assume calls
   - real add-to-cart/quote/backorder logic is never reimplemented — this file only
     forwards clicks from the new visible buttons onto the EXISTING hidden
     buy-buttons_crp.liquid buttons, so cart-drawer opening, localStorage payment-
     option pre-select, MOQ handling etc. all keep working unmodified
   - double-init guarded via window.__cro12526
   ============================================================ */
(function () {
  if (window.__cro12526) return;
  window.__cro12526 = true;

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
     1. Gallery — "view all images" opens the existing zoom popup
     ---------------------------------------------------------- */
  function initGalleryViewAll() {
    var viewAllBtn = document.querySelector('[data-cro12526-view-all-images]');
    if (!viewAllBtn) return;
    viewAllBtn.addEventListener('click', function () {
      var zoomTrigger = document.getElementById('product-slider-zoom');
      if (zoomTrigger) zoomTrigger.click();
    });
  }

  /* ----------------------------------------------------------
     2. Buy box — forward Add to cart / Add to quote / Back-Order
        clicks onto the real hidden buy-buttons_crp buttons.
     ---------------------------------------------------------- */
  function initBuyBoxForwarding() {
    var hiddenLayer = document.querySelector('[data-cro12526-realbuttons]');
    if (!hiddenLayer) return;

    var realSubmitBtn = hiddenLayer.querySelector('button[name="add"]');
    var realQuoteBtn = hiddenLayer.querySelector('#btn-addtoquote');
    var realBackorderBtn = hiddenLayer.querySelector('.backorder-btn');

    var addToCartBtn = document.querySelector('[data-cro12526-add-to-cart]');
    var addToQuoteBtn = document.querySelector('[data-cro12526-add-to-quote]');
    var backorderBtn = document.querySelector('[data-cro12526-backorder]');

    if (addToCartBtn && realSubmitBtn) {
      addToCartBtn.addEventListener('click', function () {
        if (addToCartBtn.hasAttribute('disabled')) return;
        try {
          localStorage.setItem('clickedCartBtn', 'Add to cart');
          localStorage.setItem('minicart-payement-option', 'pay-online');
        } catch (e) {}
        addToCartBtn.classList.add('cro12526-btn--loading');
        realSubmitBtn.click();
        setTimeout(function () {
          addToCartBtn.classList.remove('cro12526-btn--loading');
        }, 800);
      });
    }

    if (addToQuoteBtn && realQuoteBtn) {
      addToQuoteBtn.addEventListener('click', function () {
        // realQuoteBtn's own onclick already sets localStorage + clicks the hidden
        // submit button + shows an "Adding.." state — just forward the click.
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
     3. Freight tier — recompute on live price change.
        Watches the same #price-{{ section.id }} container Dawn's
        product-info.js swaps on variant change; re-parses the
        rendered price text (regex, no dependency on Dawn internals)
        and updates the freight line + tier.
     ---------------------------------------------------------- */
  function parsePriceCents(priceContainer) {
    if (!priceContainer) return null;
    var text = priceContainer.textContent || '';
    var match = text.match(/([\d,]+)(?:\.(\d{2}))?/);
    if (!match) return null;
    var dollars = parseInt(match[1].replace(/,/g, ''), 10);
    var cents = match[2] ? parseInt(match[2], 10) : 0;
    if (isNaN(dollars)) return null;
    return dollars * 100 + cents;
  }

  function freightAmountFor(cents) {
    if (cents <= 100000) return 4900;
    if (cents <= 200000) return 14900;
    if (cents <= 1000000) return 19900;
    return -1;
  }

  function formatMoney(cents) {
    var dollars = Math.round(cents / 100);
    return '$' + dollars.toLocaleString('en-AU');
  }

  function initFreightObserver() {
    var freightLine = document.querySelector('[data-cro12526-freight-line]');
    var priceContainer = document.querySelector('[data-cro12526-price]');
    if (!freightLine || !priceContainer) return;

    function render() {
      var cents = parsePriceCents(priceContainer);
      if (cents === null) return;
      var amount = freightAmountFor(cents);
      if (amount === -1) {
        freightLine.innerHTML = '<strong>&middot;</strong> Freight &mdash; calculated at checkout.';
      } else {
        freightLine.innerHTML =
          '<strong>&middot;</strong> <strong>Freight from ' +
          formatMoney(amount) +
          '</strong> &mdash; calculated at checkout.';
      }
    }

    var observer = new MutationObserver(function () {
      render();
    });
    observer.observe(priceContainer, { childList: true, subtree: true, characterData: true });
  }

  /* ----------------------------------------------------------
     4. Delivery date — "Get it by [date]" business-day calc.
        Mirrors snippets/product-shipping-and-returns.liquid's
        window.calcWeekend logic (weekend skip + after-3pm rule),
        WITHOUT the control site's hardcoded Christmas-period
        overrides — see test-analysis.md for why this was
        intentionally simplified and a note to port those overrides
        if this test is still running over a Christmas period.
     ---------------------------------------------------------- */
  function initDeliveryDate() {
    var el = document.querySelector('.cro12526-delivery-date');
    if (!el) return;
    var deliveryDays = parseInt(el.getAttribute('data-cro12526-delivery-days'), 10);
    if (!deliveryDays || deliveryDays <= 0) return;

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

    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    el.textContent = days[today.getDay()] + ', ' + today.getDate() + ' ' + months[today.getMonth()];

    try {
      var region = localStorage.getItem('region');
      var locationEl = document.querySelector('.cro12526-location-name');
      if (region && locationEl) locationEl.textContent = region;
    } catch (e) {}
  }

  /* ----------------------------------------------------------
     5. Complete the setup cards — "Add to quote" forwards to the
        card's own product-form, pre-selecting the quote tab in the
        cart drawer exactly like the main buy box does.
     ---------------------------------------------------------- */
  function initCompleteSetupQuoteLinks() {
    var quoteLinks = document.querySelectorAll('[data-cro12526-cs-addquote]');
    quoteLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        var formId = link.getAttribute('data-cro12526-cs-form');
        var form = formId ? document.getElementById(formId) : null;
        if (!form) return;
        try {
          localStorage.setItem('clickedCartBtn', 'Add to quote');
          localStorage.setItem('minicart-payement-option', 'request-quote');
        } catch (e) {}
        if (form.requestSubmit) {
          form.requestSubmit();
        } else {
          form.submit();
        }
      });
    });
  }

  function init() {
    initGalleryViewAll();
    initBuyBoxForwarding();
    initFreightObserver();
    initDeliveryDate();
    initCompleteSetupQuoteLinks();
  }

  waitForElement('#product-detail-top', init);
})();
