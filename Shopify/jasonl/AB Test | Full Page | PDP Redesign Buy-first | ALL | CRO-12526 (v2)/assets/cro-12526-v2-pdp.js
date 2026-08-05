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

    // The reused best-seller-tag snippet outputs "BESTSELLER" as one word;
    // the Figma pill reads "BEST SELLER". The snippet stays untouched
    // (control reuse), so split the word here — our gallery tag only.
    var tagSpan = document.querySelector('.cro12526v2-gallery__tag .tag-box span');
    if (tagSpan && /^\s*BESTSELLER\s*$/i.test(tagSpan.textContent)) {
      tagSpan.textContent = 'BEST SELLER';
    }

    var mainSlider = document.querySelector('.cro12526v2-gallery .main-slider');
    if (!mainSlider) return;

    // QA bug 6 (final resolution): Swiper's native pointer drag DOES work
    // on desktop — verified live; drags under 50% of the slide width were
    // snapping back (default longSwipesRatio). Soften the thresholds on
    // the EXISTING instance so normal human drags register. No custom
    // drag code: Swiper handles the gesture and suppresses the post-drag
    // click natively (the zoom overlay still opens the viewer on click).
    function tuneSwiper() {
      var sw = mainSlider.swiper;
      if (!sw) return false;
      sw.params.longSwipesRatio = 0.15;
      sw.params.longSwipesMs = 500;
      sw.params.threshold = 5;
      return true;
    }
    if (!tuneSwiper()) {
      var tries = 0;
      var t = setInterval(function () {
        if (tuneSwiper() || ++tries > 40) clearInterval(t);
      }, 250);
    }

    // stop the browser's native image ghost-drag from fighting the gesture
    mainSlider.addEventListener('dragstart', function (e) {
      e.preventDefault();
    });
  }

  /* ----------------------------------------------------------
     2. Size dropdown — CUSTOM listbox (replaces the native <select>;
        client request). Sizes are SEPARATE PRODUCTS on JasonL
        (productmeta.product_sizes), so choosing one simply navigates —
        this is not a form input, which is why a custom dropdown is safe.
        Full lifecycle control fixes the native-picker limitations:
        styled option hover, reliable caret state, outside-click close.
     ---------------------------------------------------------- */
  function initSizeSelect() {
    var wrap = document.querySelector('[data-cro12526v2-size-dropdown]');
    if (!wrap) return;
    var toggle = wrap.querySelector('[data-cro12526v2-size-toggle]');
    var list = wrap.querySelector('[data-cro12526v2-size-list]');
    if (!toggle || !list) return;
    var options = Array.prototype.slice.call(list.querySelectorAll('[data-cro12526v2-size-option]'));

    function setOpen(open) {
      wrap.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        list.removeAttribute('hidden');
        var sel = list.querySelector('.is-selected') || options[0];
        if (sel) sel.focus();
      } else {
        list.setAttribute('hidden', '');
      }
    }
    function isOpen() {
      return wrap.classList.contains('is-open');
    }

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });
    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setOpen(true);
      }
    });

    options.forEach(function (opt, i) {
      opt.addEventListener('click', function () {
        var current = document.querySelector('[data-cro12526v2-size-current]');
        var readout = document.querySelector('[data-cro12526v2-size-value]');
        if (current) current.textContent = opt.textContent.trim();
        if (readout) readout.textContent = opt.textContent.trim();
        setOpen(false);
        var url = opt.getAttribute('data-url');
        if (url) window.location.href = url;
      });
      opt.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          (options[i + 1] || options[0]).focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          (options[i - 1] || options[options.length - 1]).focus();
        } else if (e.key === 'Escape') {
          setOpen(false);
          toggle.focus();
        } else if (e.key === 'Tab') {
          setOpen(false);
        }
      });
    });

    document.addEventListener('pointerdown', function (e) {
      if (isOpen() && !wrap.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
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
        } catch (e) { }
        addToCartBtn.classList.add('cro12526v2-btn--loading');
        realSubmitBtn.click();
        setTimeout(function () {
          addToCartBtn.classList.remove('cro12526v2-btn--loading');
        }, 900);
      });
    }

    // Compare section's current-product Add to Cart (client request):
    // identical forwarding path as the buy-box ATC.
    // Mobile: the control collapses compare with a 600px pixel-crop, which
    // would swallow the in-table Add to Cart row — clear the inline cap on
    // mobile; the collapse is row-count driven there (CSS hides attribute
    // rows past the first five while .seemore_active is on).
    if (window.matchMedia('(max-width: 749px)').matches) {
      document.querySelectorAll('.section-cro12526v2-compare .seemore_holder').forEach(function (h) {
        h.style.maxHeight = 'none';
      });
    }

    document.querySelectorAll('[data-cro12526v2-compare-atc]').forEach(function (compareAtc) {
      if (!realSubmitBtn) return;
      compareAtc.addEventListener('click', function () {
        if (compareAtc.hasAttribute('disabled')) return;
        if (realButtonsGroup && realButtonsGroup.classList.contains('preorder-show')) return;
        try {
          localStorage.setItem('clickedCartBtn', 'Add to cart');
          localStorage.setItem('minicart-payement-option', 'pay-online');
        } catch (e) { }
        compareAtc.classList.add('cro12526v2-btn--loading');
        realSubmitBtn.click();
        setTimeout(function () {
          compareAtc.classList.remove('cro12526v2-btn--loading');
        }, 900);
      });
    });

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
      } catch (e) { }
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

  /* ----------------------------------------------------------
     6. "Complete the setup" cards — real per-card product forms
        (Dawn product-form handles the fetch + drawer). We only set
        the drawer's payment pre-select before submit: ATC → Buy
        online, ATQ → Add to quote (ATQ submits the same form).
     ---------------------------------------------------------- */
  function initSetupCards() {
    document.addEventListener(
      'click',
      function (e) {
        var atc = e.target.closest('[data-cro12526v2-setup-atc]');
        if (atc) {
          try {
            localStorage.setItem('clickedCartBtn', 'Add to cart');
            localStorage.setItem('minicart-payement-option', 'pay-online');
          } catch (err) { }
          return;
        }
        var atq = e.target.closest('[data-cro12526v2-setup-atq]');
        if (atq && !atq.hasAttribute('disabled')) {
          var form = document.getElementById(atq.getAttribute('data-cro12526v2-setup-form'));
          if (!form) return;
          try {
            localStorage.setItem('clickedCartBtn', 'Add to quote');
            localStorage.setItem('minicart-payement-option', 'request-quote');
          } catch (err) { }
          if (form.requestSubmit) {
            form.requestSubmit();
          } else {
            form.submit();
          }
        }
      },
      true // capture: pre-select must be written before product-form's submit runs
    );
  }

  /* ----------------------------------------------------------
     7. Showrooms — visible 360° pill forwards to the row's reused
        (hidden) custom-modal-virtual-tour opener; the side image
        shows the active row's existing per-location photo.
     ---------------------------------------------------------- */
  function initShowrooms() {
    var rows = document.querySelectorAll('[data-cro12526v2-showroom-row]');
    if (!rows.length) return;
    var imagePane = document.querySelector('[data-cro12526v2-showroom-image]');

    function activate(row) {
      rows.forEach(function (r) {
        r.classList.toggle('is-active', r === row);
      });
      if (!imagePane) return;
      var tpl = row.querySelector('template[data-cro12526v2-showroom-img]');
      imagePane.innerHTML = '';
      if (tpl) imagePane.appendChild(tpl.content.cloneNode(true));
    }

    rows.forEach(function (row) {
      var tourBtn = row.querySelector('[data-cro12526v2-tour-btn]');
      if (tourBtn) {
        tourBtn.addEventListener('click', function () {
          // Reused modal must live outside the [hidden] wrapper to display —
          // move it up to the row once, then forward the click.
          var nativeWrap = row.querySelector('.cro12526v2-showrooms__tour-native');
          if (nativeWrap && nativeWrap.hasAttribute('hidden')) {
            var dialog = nativeWrap.querySelector('modal-dialog');
            if (dialog) document.body.appendChild(dialog);
            nativeWrap.removeAttribute('hidden');
            nativeWrap.style.display = 'none';
          }
          var nativeBtn = nativeWrap ? nativeWrap.querySelector('modal-opener button') : null;
          if (nativeBtn) nativeBtn.click();
        });
      }
      row.addEventListener('mouseenter', function () {
        // hover-activate is a desktop behaviour; on touch, the synthetic
        // mouseenter fired before click would pre-activate the row and the
        // accordion toggle would instantly close it again.
        if (window.matchMedia('(hover: hover)').matches) activate(row);
      });
      row.addEventListener('focusin', function () {
        activate(row);
      });
      // QA bug 56: mobile accordion — tapping a row expands it (single-open)
      // and tapping the OPEN row collapses it again. Toggle-off is
      // mobile-only: on desktop a row must stay active to drive the side
      // image, and hover handles switching there.
      row.addEventListener('click', function (e) {
        if (e.target.closest('a, button')) return; // links/tour keep working
        var mobile = window.matchMedia('(max-width: 749px)').matches;
        if (mobile && row.classList.contains('is-active')) {
          row.classList.remove('is-active');
          return;
        }
        activate(row);
      });
    });

    var first = document.querySelector('[data-cro12526v2-showroom-row].is-active') || rows[0];
    activate(first);
  }

  function init() {
    initGallery();
    initSizeSelect();
    initBuyBoxForwarding();
    initVariantChangeUpdates();
    initOptionReadouts();
    renderDeliveryLine();
    initLocationPopupSync();
    initSetupCards();
    initShowrooms();
  }

  waitForElement('#product-detail-top', function () {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  });
})();
