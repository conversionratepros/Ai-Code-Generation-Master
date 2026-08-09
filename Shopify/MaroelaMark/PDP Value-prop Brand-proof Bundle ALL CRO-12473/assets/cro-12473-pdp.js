(function () {
  'use strict';

  /* Guard against duplicate execution */
  if (window.__cro12473Init) return;
  window.__cro12473Init = true;

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

  /* ─── Money formatting ("R 1 049,00") ───────────────────────────── */
  function formatMoney(cents) {
    var parts = (cents / 100).toFixed(2).split('.');
    var whole = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return 'R ' + whole + ',' + parts[1];
  }

  /* ─── Fill a positioned block wrapper with a mount element ──────── */
  function fillWrapper(wrapperSelector, el) {
    if (!el) return;
    waitForElement(wrapperSelector, function (wrapper) {
      wrapper.appendChild(el);
      el.style.display = '';
      wrapper.classList.add('cro-12473-filled');
    });
  }

  /* ─── C — bundle interactivity ──────────────────────────────────── */
  function setupBundle(bundle) {
    var totalEl = bundle.querySelector('[data-cro-bundle-total]');
    var mainPriceEl = bundle.querySelector('[data-cro-bundle-main-price]');
    var addBtn = bundle.querySelector('[data-cro-bundle-add]');
    var mainPrice = parseInt(bundle.getAttribute('data-main-price'), 10) || 0;

    function checkboxes() {
      return bundle.querySelectorAll('[data-cro-bundle-cb]');
    }

    function recalc() {
      var total = mainPrice;
      checkboxes().forEach(function (cb) {
        if (cb.checked) total += parseInt(cb.getAttribute('data-price'), 10) || 0;
      });
      if (totalEl) totalEl.textContent = formatMoney(total);
    }

    checkboxes().forEach(function (cb) {
      cb.addEventListener('change', recalc);
    });

    /* Follow variant price changes (theme fires variant:changed with the
       variant object — same hook the Sprint 1 in-stock indicator uses). */
    var productWrapper = document.querySelector('[data-product-wrapper]');
    if (productWrapper) {
      productWrapper.addEventListener('variant:changed', function (e) {
        if (e.detail && e.detail.variant && typeof e.detail.variant.price === 'number') {
          mainPrice = e.detail.variant.price;
          bundle.setAttribute('data-main-price', String(mainPrice));
          if (mainPriceEl) mainPriceEl.textContent = formatMoney(mainPrice);
          recalc();
        }
      });
    }

    /* Current main variant id: live from the hidden variant select,
       falling back to the server-rendered initial variant. */
    function getMainVariantId() {
      var select = document.querySelector('[data-product-wrapper] [data-variants]');
      var id = select && parseInt(select.value, 10);
      if (id) return id;
      return parseInt(bundle.getAttribute('data-main-variant'), 10) || null;
    }

    function getMainQty() {
      var qty = document.querySelector('[data-product-form-regular] [name="quantity"]');
      var q = qty && parseInt(qty.value, 10);
      return q > 0 ? q : 1;
    }

    function updateCartCount() {
      fetch('/cart.js')
        .then(function (r) { return r.json(); })
        .then(function (cart) {
          document.querySelectorAll('[data-header-cart-count]').forEach(function (c) {
            c.textContent = cart.item_count;
          });
          document.querySelectorAll('.cart-count').forEach(function (c) {
            c.textContent = '(' + cart.item_count + ')';
          });
        });
    }

    if (addBtn) {
      addBtn.addEventListener('click', function () {
        if (addBtn.hasAttribute('disabled')) return;

        var items = [];
        var mainId = getMainVariantId();
        if (mainId) items.push({ id: mainId, quantity: getMainQty() });
        checkboxes().forEach(function (cb) {
          if (cb.checked) {
            items.push({ id: parseInt(cb.getAttribute('data-variant-id'), 10), quantity: 1 });
          }
        });
        if (!items.length) return;

        var label = addBtn.textContent;
        addBtn.setAttribute('disabled', 'disabled');
        addBtn.textContent = 'Voeg by…';

        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: items })
        })
          .then(function (r) {
            if (!r.ok) throw new Error('add failed');
            return r.json();
          })
          .then(function () {
            updateCartCount();
            addBtn.textContent = 'Bygevoeg ✓';
            setTimeout(function () {
              addBtn.textContent = label;
              addBtn.removeAttribute('disabled');
            }, 2500);
          })
          .catch(function () {
            addBtn.textContent = 'Kon nie byvoeg nie — probeer weer';
            setTimeout(function () {
              addBtn.textContent = label;
              addBtn.removeAttribute('disabled');
            }, 2500);
          });
      });
    }
  }

  /* ─── B2 fallback — for browsers without :has() support ─────────── */
  function hideEmptyReviewSection() {
    var supportsHas = false;
    try {
      supportsHas = CSS.supports('selector(:has(*))');
    } catch (e) {}
    if (supportsHas) return; /* the section's server-gated <style> handles it */

    waitForElement('.jdgm-review-widget', function (widget) {
      var section = widget.closest('.shopify-section');
      if (section) section.style.display = 'none';
    });
  }

  /* ─── Title tag parity ──────────────────────────────────────────────
     On alternate templates product.liquid renders the title as <h2>
     (its `case template` only matches 'product'). Swap it back to <h1>
     so the markup matches control exactly — the theme's own
     h1.product-title rules then apply (CSS covers the pre-swap paint). */
  function restoreTitleTag() {
    var h2 = document.querySelector('.product-details .product-block--title h2.product-title');
    if (!h2) return;
    var h1 = document.createElement('h1');
    h1.className = h2.className;
    while (h2.firstChild) h1.appendChild(h2.firstChild);
    h2.parentNode.replaceChild(h1, h2);
  }

  /* ─── DOM injection ─────────────────────────────────────────────── */
  function inject() {
    restoreTitleTag();
    var mount = document.querySelector('[data-cro-12473-mount]');
    if (!mount) return;

    var noReviews = mount.getAttribute('data-cro-no-reviews') === 'true';
    var valueProp = mount.querySelector('[data-cro-12473-value-prop]');
    var shortDesc = mount.querySelector('[data-cro-12473-short-desc]');
    var trustLine = mount.querySelector('[data-cro-12473-trust-line]');
    var bundle = mount.querySelector('[data-cro-12473-bundle]');

    /* Wire bundle behaviour while it is still in the mount */
    if (bundle) setupBundle(bundle);

    /* A1 — value-prop line into its positioned wrapper (under the title) */
    fillWrapper('.product-block--value_prop', valueProp);

    /* A3 — short description into its positioned wrapper (under the price) */
    fillWrapper('.product-block--short_desc', shortDesc);

    /* B1 — trust line into the (empty) rating block. Server only renders
       it for zero-review products, so real star ratings are never touched. */
    if (trustLine) {
      waitForElement('.product-block--rating', function (ratingBlock) {
        ratingBlock.appendChild(trustLine);
        trustLine.style.display = '';
      });
    }

    /* C — bundle card into its positioned wrapper (below the ATC form) */
    fillWrapper('.product-block--bundle', bundle);

    /* B2 fallback where :has() is unsupported */
    if (noReviews) hideEmptyReviewSection();

    /* Remove the mount once everything has been claimed. fillWrapper is
       async (waitForElement), so defer removal to the next frame after
       all wrappers exist; leftover elements ride along until then. */
    var mountCleanup = setInterval(function () {
      if (!mount.childElementCount && mount.parentNode) {
        mount.parentNode.removeChild(mount);
        clearInterval(mountCleanup);
      }
    }, 500);
    setTimeout(function () { clearInterval(mountCleanup); }, 10000);
  }

  /* ─── Init ──────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
