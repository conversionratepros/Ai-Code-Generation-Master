(function () {
  'use strict';

  /* Guard against duplicate execution */
  if (window.__cro12303Init) return;
  window.__cro12303Init = true;

  /* ─── waitForElement ────────────────────────────────────────────── */
  function waitForElement(selector, callback) {
    var el = document.querySelector(selector);
    if (el) {
      callback(el);
      return;
    }
    var observer = new MutationObserver(function (_, obs) {
      var found = document.querySelector(selector);
      if (found) {
        obs.disconnect();
        callback(found);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  /* ─── Variant availability update ──────────────────────────────── */
  function setupVariantListener(indicator) {
    var availability = {};
    try {
      availability = JSON.parse(
        indicator.getAttribute('data-variant-availability') || '{}'
      );
    } catch (e) {}

    function update(variantId) {
      if (!variantId || variantId === 'not-selected') {
        indicator.style.display = 'none';
        return;
      }
      indicator.style.display =
        availability[String(variantId)] === true ? '' : 'none';
    }

    /* Listen on the hidden variant <select data-variants> */
    var wrapper =
      indicator.closest('[data-product-wrapper]') || document;
    var variantSelect = wrapper.querySelector('[data-variants]');

    if (variantSelect) {
      variantSelect.addEventListener('change', function () {
        update(this.value);
      });
      /* Reflect the initially selected variant */
      update(variantSelect.value);
    }

    /* Also support the theme's custom variant:changed event */
    var productWrapper = document.querySelector('[data-product-wrapper]');
    if (productWrapper) {
      productWrapper.addEventListener('variant:changed', function (e) {
        if (e.detail && e.detail.variant) {
          update(String(e.detail.variant.id));
        }
      });
    }
  }

  /* ─── DOM injection ─────────────────────────────────────────────── */
  function inject() {
    var mount = document.querySelector('[data-cro-trust-mount]');
    if (!mount) return;

    var inStock    = mount.querySelector('[data-cro-in-stock]');
    var payment    = mount.querySelector('[data-cro-payment-strip]');
    var usp        = mount.querySelector('[data-cro-usp-list]');

    /* Set up variant listener while elements are still in mount */
    if (inStock) {
      setupVariantListener(inStock);
    }

    /* Wait for the ATC wrapper, then position trust elements */
    waitForElement('.product-form--atc', function (atcWrapper) {
      var parent = atcWrapper.parentNode;

      /* 1. In-stock indicator goes BEFORE .product-form--atc */
      if (inStock) {
        parent.insertBefore(inStock, atcWrapper);
        /* display is already managed by setupVariantListener — do not override */
      }

      /* 2. Payment strip goes AFTER .product-form--atc */
      if (payment) {
        var afterAtc = atcWrapper.nextSibling;
        parent.insertBefore(payment, afterAtc);
        payment.style.display = '';
      }

      /* 3. USP list goes after payment strip */
      if (usp) {
        var afterPayment = payment ? payment.nextSibling : atcWrapper.nextSibling;
        parent.insertBefore(usp, afterPayment);
        usp.style.display = '';
      }

      /* Remove the now-empty mount node */
      if (mount.parentNode) {
        mount.parentNode.removeChild(mount);
      }
    });
  }

  /* ─── Init ──────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
