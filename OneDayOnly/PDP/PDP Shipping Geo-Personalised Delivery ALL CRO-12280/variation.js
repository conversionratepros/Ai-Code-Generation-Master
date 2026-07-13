(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "cro-12280";

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

    /* ---- CRO-12280: PDP Shipping — Geo-Personalised Delivery ---- */

    /*
     * Heading copy. CRP will supply the full per-location wording rules once
     * the geo signal is confirmed — until then every detected city uses the
     * "{City}? Sharp." pattern from the design, and visitors without geo data
     * get DEFAULT_HEADING.
     */
    var HEADING_SUFFIX = "? Sharp.";
    var DEFAULT_HEADING = "South Africa" + HEADING_SUFFIX;

    /* Location pin icon (sanitised Figma export — stroke-based, #0A66C2) */
    var PIN_SVG = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M11.6667 5.83333C11.6667 8.74592 8.43558 11.7792 7.35058 12.7161C7.24951 12.7921 7.12647 12.8332 7 12.8332C6.87353 12.8332 6.75049 12.7921 6.64942 12.7161C5.56442 11.7792 2.33333 8.74592 2.33333 5.83333C2.33333 4.59566 2.825 3.40867 3.70017 2.5335C4.57534 1.65833 5.76232 1.16667 7 1.16667C8.23768 1.16667 9.42466 1.65833 10.2998 2.5335C11.175 3.40867 11.6667 4.59566 11.6667 5.83333Z" stroke="#0A66C2" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 7.58333C7.9665 7.58333 8.75 6.79983 8.75 5.83333C8.75 4.86684 7.9665 4.08333 7 4.08333C6.0335 4.08333 5.25 4.86684 5.25 5.83333C5.25 6.79983 6.0335 7.58333 7 7.58333Z" stroke="#0A66C2" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    /*
     * Convert.com geo lookup. IMPORTANT: convert.getUserData().geo is only
     * populated when the experience has an audience with geo conditions
     * attached in the Convert dashboard — attach one (even a permissive
     * match-all geo audience) or this always returns null.
     */
    function getGeo() {
      try {
        if (window.convert && typeof window.convert.getUserData === "function") {
          var data = window.convert.getUserData();
          if (data && data.geo) return data.geo;
        }
      } catch (e) { }
      return null;
    }

    function titleCase(str) {
      return str.replace(/\w\S*/g, function (w) {
        return w.charAt(0).toUpperCase() + w.substr(1).toLowerCase();
      });
    }

    /* Only South African visitors get the personalised city greeting —
       everyone else (or unresolved geo) sees DEFAULT_HEADING. Convert may
       return the country as an ISO code or full name, so match both. */
    function isSouthAfrica(geo) {
      var c = geo && geo.country;
      return typeof c === "string" && /^(ZA|South Africa)$/i.test(c.trim());
    }

    function buildHeading() {
      var geo = getGeo();
      if (isSouthAfrica(geo)) {
        var loc = geo.city || geo.state;
        if (loc && typeof loc === "string") {
          return titleCase(loc.trim()) + HEADING_SUFFIX;
        }
      }
      return DEFAULT_HEADING;
    }

    /* Cache lead time so DOM traversal only runs once (success only —
       a miss is retried on later ticks while the page hydrates) */
    var _leadTime = null;

    function getLeadTime() {
      if (_leadTime) return _leadTime;

      /* 1. Primary source: __NEXT_DATA__ product.customerDeliveryTime.label
         (same field CRO-12279/CRO-12089 read — confirmed live on PDP). */
      try {
        var product = window.__NEXT_DATA__.props.pageProps.product;
        var label = product && product.customerDeliveryTime && product.customerDeliveryTime.label;
        if (label && typeof label === "string") {
          var m0 = label.match(/([\d]+\s*[-–]\s*[\d]+|[\d]+)/);
          if (m0) { _leadTime = m0[1].replace(/\s/g, "").replace("–", "-"); return _leadTime; }
        }
      } catch (e) { }

      /* 2. Parse from the visible "ETA: X-Y working days" text in the DOM */
      var allEls = Array.prototype.slice.call(document.querySelectorAll("*"));
      for (var j = 0; j < allEls.length; j++) {
        if (allEls[j].children.length > 0) continue;
        var t = allEls[j].textContent.trim();
        if (/working day/i.test(t) && t.length < 80) {
          var m2 = t.match(/([\d]+\s*[-–]\s*[\d]+)\s*working/i) || t.match(/([\d]+)\s*working/i);
          if (m2) {
            _leadTime = m2[1].replace(/\s*/g, "").replace("–", "-");
            return _leadTime;
          }
        }
      }

      return null;
    }

    /*
     * Tag every "Excludes shipping" + "ETA: [range] working days" container
     * beside the price so scoped CSS can hide them — their info now lives in
     * the badge. Walk up from each matching leaf to the wrapper that also
     * holds the ETA line (same approach live-verified in CRO-12279).
     */
    function tagOriginalShipping() {
      var allEls = Array.prototype.slice.call(document.querySelectorAll("*"));
      for (var i = 0; i < allEls.length; i++) {
        var el = allEls[i];
        if (el.children.length > 0) continue;
        if (!/excludes shipping/i.test(el.textContent)) continue;

        var cur = el;
        for (var up = 0; up < 6 && cur; up++) {
          if (/working day|ETA/i.test(cur.textContent) || cur.children.length >= 2) break;
          cur = cur.parentElement;
        }
        if (!cur) cur = el;
        if (!cur.hasAttribute("data-cro-12280-original-shipping") &&
          !cur.closest("[data-cro-12280-original-shipping]")) {
          cur.setAttribute("data-cro-12280-original-shipping", "1");
        }
      }
    }

    /*
     * The buy box is a CSS grid with explicit grid-template-areas
     * ("carousel" "title" "actions" "payflex" ...), so a new sibling gets
     * auto-placed in the wrong row (verified in CRO-12279). Instead, append
     * INSIDE the grid cell that owns the Payflex content — that cell already
     * sits below Payflex's neighbours in both layouts, so the badge lands
     * below the Payflex section and above the Colour selector (desktop) /
     * trust list (mobile). Only the true buy-box-level cell has an explicit
     * (non-"auto") computed grid-row; nested wrappers are all grid-row: auto.
     */
    function findPayflexCell() {
      var allEls = Array.prototype.slice.call(document.querySelectorAll("*"));
      var leaf = null;
      var leafLen = Infinity;
      for (var i = 0; i < allEls.length; i++) {
        var el = allEls[i];
        if (el.children.length > 0) continue;
        var txt = el.textContent;
        if (/payflex/i.test(txt) && txt.length < leafLen) {
          leaf = el;
          leafLen = txt.length;
        }
      }
      if (!leaf) return null;

      var cur = leaf;
      for (var up = 0; up < 10 && cur; up++) {
        if (getComputedStyle(cur).gridRow !== "auto") return cur;
        cur = cur.parentElement;
      }
      return null;
    }

    function buildBadgeHtml(leadTime) {
      var deliveryLine = leadTime
        ? '<div class="cro-12280-badge-delivery"><strong>Arrives in ' + leadTime +
        ' working days</strong>.</div>'
        : "";
      return '<div class="cro-12280-badge">' +
        '<span class="cro-12280-badge-icon">' + PIN_SVG + "</span>" +
        '<div class="cro-12280-badge-text">' +
        '<div class="cro-12280-badge-heading">' + buildHeading() + "</div>" +
        deliveryLine +
        '<div class="cro-12280-badge-qualifier">Shipping calculated at checkout</div>' +
        "</div></div>";
    }

    var injectAttempts = 0;

    function injectBadge() {
      if (document.querySelector(".cro-12280-badge")) return;

      var payflexCell = findPayflexCell();
      if (!payflexCell) return;

      /* Give the ETA text a few ticks to hydrate before falling back to a
         badge without the delivery line (fallback per spec) */
      var leadTime = getLeadTime();
      injectAttempts++;
      if (!leadTime && injectAttempts < 10) return;

      payflexCell.insertAdjacentHTML("beforeend", buildBadgeHtml(leadTime));
      tagOriginalShipping();
    }

    function init() {
      if (!window.location.pathname.includes("/products")) return;

      injectBadge();

      /* body class added after injection so badge + hidden labels land in one paint */
      if (document.querySelector(".cro-12280-badge") &&
        !document.body.classList.contains(variation_name)) {
        addClass("body", variation_name);
      }
    }

    /* Re-run init every 400ms for 8s to survive React re-renders on this Next.js SPA */
    function trigger() {
      var iv = setInterval(init, 400);
      setTimeout(function () { clearInterval(iv); }, 8000);
    }

    if (!window.cro_12280) {
      window.cro_12280 = true;
      waitForElement("body", trigger);
    }
  } catch (e) {
    if (debug) console.log(e, "error in Test " + variation_name);
  }
})();
