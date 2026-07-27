(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "cro-12279";

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

    function addClass(el, cls) {
      var el = document.querySelector(el);
      if (el) {
        el.classList.add(cls);
      }
    }

    /* ---- CRO-12279: Shipping — Dynamic Delivery Trust Block ---- */

    /* Clock + tick badge SVG icon for the on-time pill */
    var ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.99976 0.567139C9.97045 0.569464 11.8602 1.35333 13.2537 2.74683C14.647 4.14026 15.431 6.02921 15.4333 7.99976C15.4333 9.46993 14.9972 10.9072 14.1804 12.1296C13.3636 13.352 12.2027 14.3053 10.8445 14.8679C9.4863 15.4304 7.99138 15.5776 6.54956 15.2908C5.10783 15.0039 3.78337 14.296 2.7439 13.2566C1.70433 12.217 0.996534 10.8919 0.709717 9.44995C0.422971 8.00811 0.569991 6.51321 1.13257 5.15503C1.69518 3.79698 2.64765 2.6358 3.86987 1.81909C5.09219 1.00237 6.5297 0.567204 7.99976 0.567139ZM10.2576 2.54956C9.17961 2.1031 7.99371 1.98605 6.84937 2.21362C5.70488 2.44128 4.65301 3.00275 3.82788 3.82788C3.00275 4.65301 2.44128 5.70488 2.21362 6.84937C1.98605 7.99371 2.1031 9.17961 2.54956 10.2576C2.99612 11.3357 3.75216 12.2577 4.72241 12.906C5.69252 13.5541 6.83306 13.9001 7.99976 13.9001C9.56398 13.8982 11.0636 13.2758 12.1697 12.1697C13.2758 11.0636 13.8982 9.56398 13.9001 7.99976C13.9001 6.83306 13.5541 5.69252 12.906 4.72241C12.2577 3.75216 11.3357 2.99612 10.2576 2.54956Z" fill="#16A34A" stroke="#16A34A" stroke-width="0.2"/><path d="M8.00024 3.23376C8.20346 3.23385 8.39854 3.31467 8.54224 3.45837C8.68581 3.60212 8.76685 3.79719 8.76685 4.00037V7.68298L10.5432 9.45935C10.6828 9.60391 10.7598 9.79746 10.7581 9.99841C10.7563 10.1994 10.6756 10.3914 10.5334 10.5336C10.3913 10.6757 10.1993 10.7564 9.99829 10.7582C9.79734 10.7599 9.60379 10.6829 9.45923 10.5433L7.45825 8.54236C7.31454 8.39869 7.23377 8.20357 7.23364 8.00037V4.00037C7.23364 3.79703 7.31447 3.60215 7.45825 3.45837C7.60203 3.3146 7.79691 3.23376 8.00024 3.23376Z" fill="#16A34A" stroke="#16A34A" stroke-width="0.2"/></svg>';

    /* Cache lead time so DOM traversal only runs once */
    var _leadTime = null;

    function getLeadTime() {
      if (_leadTime) return _leadTime;

      /* 1. Primary source: __NEXT_DATA__ product.customerDeliveryTime.label
         (the same field the site's own global.js already reads via
         getCustomerDeliveryLabel() for CRO-12089 — confirmed live on PDP). */
      try {
        var product = window.__NEXT_DATA__.props.pageProps.product;
        var label = product && product.customerDeliveryTime && product.customerDeliveryTime.label;
        if (label && typeof label === 'string') {
          var m0 = label.match(/([\d]+\s*[-–]\s*[\d]+|[\d]+)/);
          if (m0) { _leadTime = m0[1].replace(/\s/g, '').replace('–', '-'); return _leadTime; }
        }
      } catch (e) { }

      /* 2. Parse from the visible "ETA: X-Y working days" text in the DOM
         (fallback in case the data model field is ever renamed/missing). */
      var allEls = Array.prototype.slice.call(document.querySelectorAll('*'));
      for (var j = 0; j < allEls.length; j++) {
        if (allEls[j].children.length > 0) continue;
        var t = allEls[j].textContent.trim();
        if (/working day/i.test(t) && t.length < 80) {
          var m2 = t.match(/([\d]+\s*[-–]\s*[\d]+)\s*working/i) || t.match(/([\d]+)\s*working/i);
          if (m2) {
            _leadTime = m2[1].replace(/\s*/g, '').replace('–', '-');
            return _leadTime;
          }
        }
      }

      /* Nothing found — caller must hide the promoted delivery estimate line */
      _leadTime = false;
      return _leadTime;
    }

    function buildTrustBlockHtml(leadTime, isDesktop) {
      var cls = isDesktop ? 'cro-12279-trust-block-desktop' : 'cro-12279-trust-block-mobile';
      var deliveryLine = leadTime ? '<div class="cro-12279-delivery-estimate">Delivery in ' + leadTime + ' working days</div>' : '';
      var pill = '<div class="cro-12279-ontime-pill">' + ICON_SVG + '<span>98% on-time delivery</span></div>';
      var qualifier = '<div class="cro-12279-shipping-qualifier">Shipping calculated at checkout</div>';

      var body;
      if (isDesktop) {
        /* Desktop: three lines stacked, right-aligned */
        body = deliveryLine + pill + qualifier;
      } else {
        /* Mobile: delivery estimate alone, then pill + qualifier side-by-side (can wrap) */
        body = deliveryLine +
          '<div class="cro-12279-mobile-row">' + pill +
          '<span class="cro-12279-shipping-qualifier">Shipping calculated at checkout</span></div>';
      }

      return '<div class="cro-12279-trust-block ' + cls + '">' + body + '</div>';
    }

    /*
     * Find the container that the site already renders to the RIGHT of the price.
     * On ODO's PDP it shows "Excludes shipping" + "ETA: X working days" in a
     * small right-aligned block inside the price flex row. We replace it rather
     * than creating a new wrapper so the site's existing flex layout stays intact.
     *
     * Strategy: find the smallest element that contains "Excludes shipping" AND
     * either "working days" or "ETA" — that's the right-side price-row container.
     */
    function findShippingContainer() {
      var allEls = Array.prototype.slice.call(document.querySelectorAll('*'));
      var best = null;
      var bestLen = Infinity;

      for (var i = 0; i < allEls.length; i++) {
        var el = allEls[i];
        var txt = el.textContent.trim();
        if (/excludes shipping/i.test(txt) && txt.length < bestLen) {
          best = el;
          bestLen = txt.length;
        }
      }

      if (!best) return null;

      /* Walk up until we find the element that also contains the ETA text
         OR has at least 2 children (i.e. the shared wrapper of both lines) */
      var cur = best;
      for (var up = 0; up < 6 && cur; up++) {
        if (/working day|ETA/i.test(cur.textContent) || cur.children.length >= 2) {
          return cur;
        }
        cur = cur.parentElement;
      }
      return best;
    }

    /*
     * Desktop injection: find the existing right-side shipping/ETA container,
     * hide it (it's already in the correct flex slot), and insert our trust
     * block after it so it occupies the same right-side position.
     *
     * The container's own parent (site class, e.g. css-12pflkp) carries its
     * own padding/margin independent of its children. Hiding the desktop
     * block via `display: none` on mobile leaves that padding behind as a
     * blank gap. We tag the parent with a class so CSS can zero its box
     * model out under the mobile breakpoint without touching desktop.
     */
    function injectDesktop(leadTime) {
      if (document.querySelector('.cro-12279-trust-block-desktop')) return;

      var shippingContainer = findShippingContainer();
      if (!shippingContainer) return;

      shippingContainer.setAttribute('data-cro-12279-original-shipping', '1');
      shippingContainer.insertAdjacentHTML('afterend', buildTrustBlockHtml(leadTime, true));

      if (shippingContainer.parentElement) {
        shippingContainer.parentElement.classList.add('cro-12279-desktop-shipping-slot');
      }
    }

    /*
     * The buy box column is a CSS grid with named/explicit row placement
     * (confirmed: the quantity block's computed grid-row is "actions"), so
     * DOM order does NOT match visual order — Payflex sits after Quantity
     * visually while coming earlier in the raw DOM. Inserting a new sibling
     * gets auto-placed by the grid and lands in the wrong spot (verified: it
     * renders below the ATC button, near the bullet list, well past Payflex).
     *
     * Fix: find the grid CELL that already contains #product-quantity-select
     * and append our block inside it with beforeend. That cell already owns
     * the correct grid row, so appending inside it just grows that row —
     * pushing Payflex (and everything after it) down, with no new grid item
     * needed.
     *
     * Note: there are smaller nested grids inside the quantity control itself
     * (e.g. the select + chevron wrapper), so "parentElement is display:grid"
     * matches too early. The reliable signal is the computed grid-row value —
     * only the true buy-box-level grid cell has an explicit (non-"auto")
     * grid-row (confirmed via DOM inspection: it resolves to the named line
     * "actions"); the nested layout wrappers are all grid-row: auto.
     */
    function findQuantityGridCell() {
      var qtySel = document.querySelector('#product-quantity-select');
      if (!qtySel) return null;
      var cur = qtySel;
      for (var i = 0; i < 10 && cur; i++) {
        if (getComputedStyle(cur).gridRow !== 'auto') return cur;
        cur = cur.parentElement;
      }
      return null;
    }

    function injectMobile(leadTime) {
      if (document.querySelector('.cro-12279-trust-block-mobile')) return;

      var qtyCell = findQuantityGridCell();
      if (qtyCell) {
        qtyCell.insertAdjacentHTML('beforeend', buildTrustBlockHtml(leadTime, false));
        return;
      }

      /* last-resort fallback if the grid cell can't be found */
      var qEl = document.querySelector('[cro-quantity="cro-product"]');
      if (qEl) qEl.insertAdjacentHTML('afterend', buildTrustBlockHtml(leadTime, false));
    }

    function init() {
      if (!window.location.pathname.includes('/products')) return;

      var leadTime = getLeadTime();
      injectDesktop(leadTime);
      injectMobile(leadTime);

      if (!document.body.classList.contains(variation_name)) {
        addClass('body', variation_name);
      }
    }

    /* Re-run init every 400ms for 7s to survive React re-renders on this Next.js SPA */
    function trigger() {
      var iv = setInterval(init, 400);
      setTimeout(function () { clearInterval(iv); }, 7000);
    }

    waitForElement('body', trigger);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();