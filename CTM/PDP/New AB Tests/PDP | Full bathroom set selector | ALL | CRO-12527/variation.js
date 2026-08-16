/* ==========================================================================
   CTM — CRO-12527 "Full bathroom set" (Test 1, sprint CRO-12376 Bundle Discovery)
   Convert VARIATION JS

   What it does: on 32 mapped product pages, injects a two-option selector INSIDE
   the buy box, directly above the Add To Cart button. Option 1 = the single item
   (selected by default). Option 2 = "Full bathroom set". Choosing option 2 makes
   the page's existing Add To Cart button add the set (BOM parent) instead of the
   single item. One Add To Cart button throughout — no second button is added.

   Platform: Magento 2 (Vaimo/Vectra theme). NOT Shopify.
   Namespace: cro-12527-* for nodes, window.__cro_12527_* for guards.

   QA fixes 2026-08-12:
   1. Back-navigation: re-initialise after a back-forward-cache restore
      (pageshow persisted). See the "back-forward cache" section below.
   2. Set image swap: choosing "Full bathroom set" shows the set's own image
      over the main gallery; switching back restores the gallery untouched.
      See SET_IMG and installSetImage below.
   ========================================================================== */
(function () {
  'use strict';

  var ID = '12527';
  var NS = 'cro-' + ID;                 // class prefix
  var FLAG = '__cro_' + ID + '_init';     // run-once guard
  var MARK = 'data-cro-' + ID;            // idempotency marker

  if (window[FLAG]) { return; }
  window[FLAG] = true;

  /* ---------------------------------------------------------------------
     THE MAP — page SKU -> its single-item ids + the set it belongs to.
     p   = Magento product id of the single item on this page
     b   = set (BOM parent) SKU              bp = set Magento product id
     n   = noun for the heading ("Bath only or full bathroom set?")
     sp  = single price (display)            bpr = set price (display)
     Verified live on ctm.co.za 2026-08-01: every page and every set below
     resolves to a real, purchasable product page.
     --------------------------------------------------------------------- */
  var MAP = {
    "AQWH170036": { p: "4435", b: "XXWHTAM006", bp: "19572", n: "Bath", sp: "R 1,909.90", bpr: "R 3,619.90" },
    "BE1WH051N": { p: "35", b: "XXWH10033", bp: "19576", n: "Toilet", sp: "R 949.90", bpr: "R 3,789.90" },
    "AQWH170003": { p: "76", b: "XXWH10032", bp: "8317", n: "Bath", sp: "R 2,099.90", bpr: "R 3,839.90" },
    "BE1WH813": { p: "4483", b: "XXWHTAM006", bp: "19572", n: "Toilet", sp: "R 999.90", bpr: "R 3,619.90" },
    "BE1WH408": { p: "2814", b: "XXWH10024", bp: "6532", n: "Toilet", sp: "R 2,734.90", bpr: "R 7,690.90" },
    "AQWH170004": { p: "4423", b: "XXWHBQ17000", bp: "18900", n: "Bath", sp: "R 2,809.90", bpr: "R 5,409.90" },
    "CTSHPS903": { p: "4605", b: "XXCTSH0004", bp: "6515", n: "Shower door", sp: "R 3,199.90", bpr: "R 4,699.90" },
    "XXWH8181": { p: "1046", b: "XXWHTAM006", bp: "19572", n: "Basin", sp: "R 759.90", bpr: "R 3,619.90" },
    "AQAV170003": { p: "17055", b: "XXAV051", bp: "19236", n: "Bath", sp: "R 2,709.90", bpr: "R 4,879.90" },
    "CTSHCRP900": { p: "4595", b: "XXCTSH0005", bp: "6516", n: "Panel", sp: "R 1,999.90", bpr: "R 5,099.90" },
    "BE1WH610": { p: "2809", b: "XXWHBQ17000", bp: "18900", n: "Toilet", sp: "R 2,019.90", bpr: "R 5,409.90" },
    "FTTOFS002": { p: "7388", b: "XXFTT0FS003", bp: "9139", n: "Toilet", sp: "R 3,099.90", bpr: "R 6,599.90" },
    "BE1AL051": { p: "18632", b: "XXAL051", bp: "19077", n: "Toilet", sp: "R 1,529.90", bpr: "R 4,899.90" },
    "AQWH180008": { p: "17063", b: "XXWH10024", bp: "6532", n: "Bath", sp: "R 4,909.90", bpr: "R 7,690.90" },
    "XXWH978": { p: "6542", b: "XXWHBQ17000", bp: "18900", n: "Basin", sp: "R 869.90", bpr: "R 5,409.90" },
    "XXWH1000BP": { p: "6531", b: "XXWH10024", bp: "6532", n: "Basin", sp: "R 939.90", bpr: "R 7,690.90" },
    "BE1WH9239": { p: "20270", b: "XXBE1WH9239SW", bp: "20081", n: "Urinal", sp: "R 809.90", bpr: "R 2,495.90" },
    "AQAL170003": { p: "17066", b: "XXAL051", bp: "19077", n: "Bath", sp: "R 2,709.90", bpr: "R 4,899.90" },
    "FTTOWH012": { p: "19394", b: "XXFTTOWH013", bp: "17520", n: "Toilet", sp: "R 4,499.90", bpr: "R 7,999.90" },
    "BE1AV051": { p: "18633", b: "XXAV051", bp: "19236", n: "Toilet", sp: "R 1,529.90", bpr: "R 4,879.90" },
    "BE1BB051": { p: "18634", b: "XXBB051", bp: "19574", n: "Toilet", sp: "R 1,529.90", bpr: "R 5,019.90" },
    "AQBB170003": { p: "17070", b: "XXBB051", bp: "19574", n: "Bath", sp: "R 2,709.90", bpr: "R 5,019.90" },
    "TVCC601621": { p: "5504", b: "XXFTTOWH013", bp: "17520", n: "Cistern", sp: "R 2,299.90", bpr: "R 7,999.90" },
    "TVCC601601": { p: "2766", b: "XXWH796", bp: "6539", n: "Cistern", sp: "R 1,999.90", bpr: "R 5,059.90" },
    "XXAL8181": { p: "1041", b: "XXAL051", bp: "19077", n: "Basin", sp: "R 809.90", bpr: "R 4,899.90" },
    "XXBB8181": { p: "1042", b: "XXBB051", bp: "19574", n: "Basin", sp: "R 809.90", bpr: "R 5,019.90" },
    "TVP142005BK": { p: "6734", b: "XXFTT0FS003", bp: "9139", n: "Flush plate", sp: "R 1,299.90", bpr: "R 6,599.90" },
    "CTSHPS904": { p: "4606", b: "XXCTSH0005", bp: "6516", n: "Shower door", sp: "R 3,599.90", bpr: "R 5,099.90" },
    "TVP659041WH": { p: "5607", b: "XXWH796", bp: "6539", n: "Flush plate", sp: "R 799.90", bpr: "R 5,059.90" },
    "BE1AV218": { p: "17071", b: "XXAV051", bp: "19236", n: "Basin", sp: "R 429.90", bpr: "R 4,879.90" },
    "BE1AV318": { p: "10079", b: "XXAV051", bp: "19236", n: "Pedestal", sp: "R 469.90", bpr: "R 4,879.90" },
    "TVP0152951BK": { p: "18109", b: "XXFTTOWH013", bp: "17520", n: "Flush plate", sp: "R 1,499.90", bpr: "R 7,999.90" }
  };

  /* ---------------------------------------------------------------------
     SET IMAGES — set SKU -> the set's main product image, taken from the
     set's OWN live product page gallery (verified against ctm.co.za on
     2026-08-12; every page's SKU was checked before its image was read).
     Choosing "Full bathroom set" shows this image over the main gallery;
     switching back removes it and the gallery returns untouched.

     THREE SETS ARE DELIBERATELY ABSENT: XXAV051 (Coral Avocado), XXAL051
     (Coral Almond) and XXBB051 (Coral Blue). The only whole-set photo each
     of those has carries CTM's "BIG BIG SAVERS" banner baked into the
     pixels — a savings claim, which this test's brief forbids outright —
     and every other image in their galleries is a single component or a
     spec card. On their 10 anchor pages everything else still works; only
     the image swap stays off. If CTM ever uploads a clean set photo, add
     it here. XXWHTAM006 had the same problem but a clean "-white" variant
     of the same composite exists and is used.
     --------------------------------------------------------------------- */
  var IMG_Q = '?width=620&height=620&store=ZA&image-type=image';
  var SET_IMG = {
    "XXWHTAM006": "https://www.ctm.co.za/media/catalog/product/c/o/coral-white-7-piece-bathroom-set---top-flush-white.webp" + IMG_Q,
    "XXWH10033": "https://www.ctm.co.za/media/catalog/product/c/t/ctm-xxwh10033-coral-white-bathroom-set-bath_-basin_-pedestal-_-front-flush-toilet-suite-combo.webp" + IMG_Q,
    "XXWH10032": "https://www.ctm.co.za/media/catalog/product/c/t/ctm-xxwh10032-coral-white-bathroom-set----bath-basin-pedestal--dual-top-flush-toilet-suite1-lifestyle.webp" + IMG_Q,
    "XXWH10024": "https://www.ctm.co.za/media/catalog/product/c/t/ctm-xxwh10024-origami-white-bathroom-set---bath-basin-pedestal--dual-top-flush-toilet-suite-1-lifestyle.webp" + IMG_Q,
    "XXWHBQ17000": "https://www.ctm.co.za/media/catalog/product/c/t/ctm-xxwhbq17000-bouquet-white-bathroom-set---bath-basin-pedestal--top-flush-toilet-suite-1-lifestyle.webp" + IMG_Q,
    "XXCTSH0004": "https://www.ctm.co.za/media/catalog/product/c/t/ctm-xxctsh0004-crystaltech-white-adjustable-pivot-shower-door-_1000-to-1200-x-1850mm_-and-_800-to-1020-x-1850mm_-return-panel-set-warm-lifestyle.webp" + IMG_Q,
    "XXCTSH0005": "https://www.ctm.co.za/media/catalog/product/c/t/ctm-xxctsh0005-crystaltech-chrome-adjustable-pivot-shower-door-_ct8006-1000-to-1200-x-1850mm_-_-_ct8002-800-to-1020-x-1850mm_-panel-set-lifestyle.webp" + IMG_Q,
    "XXFTT0FS003": "https://www.ctm.co.za/media/catalog/product/s/a/sarah_white_pan_black_pyramid_plate_plain.jpg" + IMG_Q,
    "XXFTTOWH013": "https://www.ctm.co.za/media/catalog/product/x/x/xxfttowh013_tamara_black_wall_hung_toilet_soft_close_toilet_seat_l1.jpg" + IMG_Q,
    "XXBE1WH9239SW": "https://www.ctm.co.za/media/catalog/product/x/x/xxbe1wh278_-_box_urinal_alson_set_with_urinal_flushing_valve_and_universal_space_saving_bottle_trap_3__1.webp" + IMG_Q,
    "XXWH796": "https://www.ctm.co.za/media/catalog/product/x/x/xxwh796_atlantis_white_toilet_suite_44__torino_cistern___capri_plate.jpg" + IMG_Q
  };

  /* --------------------------- small helpers --------------------------- */

  function warn(msg, extra) {
    // Deliberately NOT swallowed. A silent failure here is exactly how CRO-3228
    // became unreadable, so a broken variation must be visible in QA.
    try { console.warn('[' + NS + '] ' + msg, extra === undefined ? '' : extra); } catch (e) { }
  }

  // The visible buy-box form ONLY. There is a second #product_addtocart_form on
  // every CTM product page, inside a hidden stock-check modal
  // (.to-cart_container.hidden). Targeting it would apply the module to nothing
  // the shopper can see. Scoping to .product-info-main is what keeps us honest.
  function getForm() {
    return document.querySelector('.product-info-main #product_addtocart_form');
  }

  function isVisible(el) {
    if (!el) { return false; }
    var r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }

  /* Wait for a node using MutationObserver (Magento renders the qty widget and
     the actions block via RequireJS/Knockout after DOMContentLoaded), with a
     hard cap so we never observe forever. Scoped to .product-info-main, never
     document.body — body churn from chat/analytics starves the callback. */
  function waitFor(getNode, cb, timeoutMs, onTimeout) {
    var node = getNode();
    if (node) { cb(node); return; }

    var root = document.querySelector('.product-info-main') || document.documentElement;
    var done = false;
    var obs = new MutationObserver(function () {
      if (done) { return; }
      var n = getNode();
      if (n) { done = true; obs.disconnect(); clearTimeout(timer); cb(n); }
    });
    obs.observe(root, { childList: true, subtree: true });

    var timer = setTimeout(function () {
      if (done) { return; }
      done = true;
      obs.disconnect();
      warn('timed out waiting for the Add To Cart block; module not injected');
      if (onTimeout) { try { onTimeout(); } catch (e) { } }
    }, timeoutMs || 10000);
  }

  /* ------------------------------ tracking -----------------------------
     Three events, all of them required by the brief. CRO-3228 is the reason:
     it changed one thing, fired nothing when that thing was used, and so could
     never distinguish "people saw it and said no" from "people never saw it".

       cro12527_suite_module_viewed   — fires ONCE when the module actually
                                        scrolls into view (not on page load)
       cro12527_suite_module_clicked  — fires when option 2 (the set) is chosen,
                                        carrying the set SKU
       cro12527_add_to_cart           — fires on the add, carrying which option
                                        was chosen and the SKU that is being added,
                                        so single-item and set adds are separable

     Each goes to BOTH the GA4 dataLayer and Convert's own goal bus, so the
     result is readable from either system.
     --------------------------------------------------------------------- */
  // Convert goal ids, created for this test 2026-08-01.
  var GOAL = {
    viewed: 1004123513,   // "Suite module viewed (CRO-12527)"
    chosen: 1004123514,   // "Full bathroom set option chosen (CRO-12527)"
    added: 1004123515    // "Add to cart from set selector (CRO-12527)"
  };

  function track(eventName, goalId, payload) {
    var data = payload || {};
    data.event = eventName;
    data.cro_test = 'CRO-12527';

    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(data);
    } catch (e) { warn('dataLayer push failed', e); }

    // Convert custom goal. Wrapped because _conv_q may not exist yet.
    try {
      window._conv_q = window._conv_q || [];
      window._conv_q.push(['triggerConversion', goalId]);
    } catch (e) { warn('convert goal push failed', e); }
  }

  /* -------------------- switch what Add To Cart adds --------------------
     CTM adds to cart with a native form POST to
     /checkout/cart/add/uenc/<...>/product/<id>/ — there is no AJAX handler
     stealing the payload (checked the bound jQuery events: only validation).
     So switching the product is a matter of rewriting the two hidden inputs
     Magento reads plus the product id in the form action.

     Verified end to end on the live site 2026-08-01: posting the set's product
     id adds the set to the cart at its own price.

     Note for QA: CTM auto-attaches its own installation add-on products to the
     cart. It does this for the single item too (4 add-ons) and for the set
     (9 add-ons). That is CTM's normal behaviour on BOTH arms, not something
     this test introduces. Do not treat it as a bug.
     --------------------------------------------------------------------- */
  function setFormProduct(form, productId) {
    var ok = true;

    ['product', 'item'].forEach(function (name) {
      var input = form.querySelector('input[name="' + name + '"]');
      if (input) { input.value = productId; }
      else { ok = false; }
    });

    var action = form.getAttribute('action') || '';
    if (/\/product\/\d+\/?$/.test(action)) {
      form.setAttribute('action', action.replace(/\/product\/\d+\/?$/, '/product/' + productId + '/'));
    } else {
      ok = false;
    }

    if (!ok) { warn('could not fully rewrite the add-to-cart form for product ' + productId); }
    return ok;
  }

  /* ------------- the big price at the top of the buy box ----------------
     Required by Nick 2026-08-01. If the shopper picks the set, the large
     price must change to the set price, otherwise the page shows R949.90 at
     the top while the module shows R3,789.90 — two contradictory prices on
     one screen at the moment of deciding.

     THE TRAP: a CTM product page carries ~25 elements matching `.price-box`.
     Only ONE is the shopper's price. The rest are "Matching Products" and
     "Similar Products" cards further down the page, plus hidden minicart and
     add-on templates. Worse, some of those cards are for products that are
     themselves in our map (a Coral toilet card at R999.90 sits on the Coral
     toilet's own page), so a loose selector would silently rewrite a related
     product's price. We therefore pin to all four of:
       - inside .product-info-main  (the buy-box column, not the carousels)
       - inside .product-info-price (the headline price block)
       - a .price-box whose data-product-id IS THIS PAGE'S product
       - the single .price-container .price leaf inside it
     If any of that does not resolve to exactly one node, we do nothing and
     warn, rather than guess.

     Formatting is CTM's own, copied verbatim: "R" + a normal space + comma
     thousands + two decimals (e.g. "R 3,789.90"). Confirmed character by
     character against both the item page and the set's own page, so the
     swapped number is indistinguishable from one CTM rendered itself. We
     never reformat and never build the string ourselves.

     We swap the NUMBER ONLY. No was/now, no strikethrough, no saving
     callout, no percentage, no restyle, no size change, no animation.

     SOME PAGES ARE ON PROMOTION. On those, CTM's price box holds TWO prices:
     the one the shopper pays, marked data-price-type="finalPrice", and a
     crossed-out "was" figure marked data-price-type="oldPrice". We target
     finalPrice only. Hiding the rest of CTM's promotional presentation while
     the set is selected is handled separately, by the stylesheet below. */
  function getMainPriceParts(pageProductId) {
    var scope = document.querySelector('.product-info-main .product-info-price');
    if (!scope) { return null; }

    var box = scope.querySelector('.price-box[data-product-id="' + pageProductId + '"]');
    if (!box) {
      // Fall back to a price box in the headline block, but only if there is
      // exactly one — never pick "the first of several".
      var boxes = scope.querySelectorAll('.price-box');
      if (boxes.length !== 1) { return null; }
      box = boxes[0];
    }

    // The price the shopper actually pays. Prefer the explicit finalPrice
    // marker; fall back to the sole .price leaf on non-promotional pages.
    var node = null;
    var finalWrapper = box.querySelector('[data-price-type="finalPrice"]');
    if (finalWrapper) {
      var inner = finalWrapper.querySelectorAll('.price');
      if (inner.length === 1) { node = inner[0]; }
    }
    if (!node) {
      var nodes = box.querySelectorAll('.price-container .price');
      if (nodes.length !== 1) { return null; }   // ambiguous, leave it alone
      node = nodes[0];
    }

    var r = node.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) { return null; }   // must be on screen

    return { node: node };
  }

  // Swap the number ONLY. textContent, not innerHTML. Nothing else about this
  // element is touched — same size, same position, no styling change.
  function setMainPrice(parts, priceText) {
    if (!parts || !parts.node) { return false; }
    parts.node.textContent = priceText;
    return true;
  }

  /* ------ hiding CTM's promotional wording while the set is selected -------
     Rebuilt 2026-08-03 after QA (Sujan) found the "SALE" roundel and the red
     "- R 300.00" flash still on screen with the set chosen, plus a stray dash
     in front of the set price.

     WHY THE FIRST VERSION FAILED. It looked CTM's promotional elements up once,
     at the moment the module was built, and hid them by writing inline styles.

       1. It was too early. Measured on the live Tivoli Pyramid page: the Add
          To Cart block becomes visible at about 405ms, this module is injected
          at about 956ms, but Amasty does not put the roundel and the flash
          into the gallery until about 1155ms. So the lookup ran 200ms before
          those elements existed, came back with nothing, and stayed empty for
          the life of the page. The class names it was looking for were in fact
          correct — the timing was not.
       2. Inline styles are the wrong tool here anyway. Amasty rewrites the
          whole style attribute on those gallery labels when it repositions
          them, and can replace the nodes outright, so anything written onto a
          node can be wiped.

     WHAT IT DOES NOW. One stylesheet of our own, injected once, whose rules
     only apply while the <html> element carries our class. Choosing the set
     adds the class; going back removes it. That means:

       - Nothing of CTM's is ever mutated. We never write to their style
         attribute, so "put it back" is simply "stop applying our rule", and
         their own styling returns exactly as it was, with no residue.
       - It does not matter when Amasty renders, and it keeps working if Amasty
         re-renders or replaces the labels, because the rule is keyed on the
         class name rather than on a node captured earlier.
       - "!important" outranks Amasty's inline display:block, because an
         author rule marked important beats a plain inline declaration.

     SCOPING — the part that must not go wrong. There are Matching Products and
     Similar Products cards further down the page, some of them for products
     that are themselves in this test. Every rule below is pinned BOTH to this
     page's own product id AND to the buy box or the main gallery, so no price
     or badge on one of those cards can ever move.

     The product id always sits immediately before "-prod" in an Amasty class
     ("amlabel-position-top-left-6734-prod"), so matching on "-6734-prod"
     rather than on "-6734-" is what keeps it exact: a container class also
     carries Amasty's own rule number ("amasty-label-container-199-6734-prod"),
     and a looser match could collide with another product whose id happened to
     equal that rule number. The id is checked against digits-only first, so
     nothing but a number can ever reach the stylesheet.

     The class goes on <html>, not <body>: CTM's Amasty integration wipes
     document.body.className on AJAX transitions (their own client-learnings
     note records this). <html> is not touched by that.
     --------------------------------------------------------------------- */

  var SUITE_CLS = NS + '-suite-selected';       // cro-12527-suite-selected
  var STYLE_ID = NS + '-promo-suppression';

  function installPromoSuppression(pageProductId) {
    var pid = String(pageProductId == null ? '' : pageProductId);
    if (!/^\d+$/.test(pid)) {
      warn('product id is not a plain number; promotional wording will not be hidden', pageProductId);
      return false;
    }
    if (document.getElementById(STYLE_ID)) { return true; }   // idempotent

    // The buy box only. Related and similar product cards sit outside
    // .product-info-main .product-info-price, so they are out of reach.
    var priceScope = 'html.' + SUITE_CLS + ' .product-info-main .product-info-price ' +
      '.price-box[data-product-id="' + pid + '"] ';
    // The main gallery only. .product.media is Magento's media column: one per
    // page, and it holds the Amasty overlays on both phone and desktop
    // (checked live at 390px and 1440px). The related-product carousels are
    // outside it.
    var galleryScope = 'html.' + SUITE_CLS + ' .product.media ';

    if (!document.querySelector('.product.media')) {
      warn('main gallery container not found; the sale roundel and saving flash may stay visible');
    }

    var css = [
      /* CTM's crossed-out "was" figure, and the "Special Price" label that sits
         with the price you pay. Neither is true of the set. */
      priceScope + '.old-price,',
      priceScope + '.special-price .price-label {',
      '  display: none !important;',
      '}',
      /* THE STRAY DASH. CTM draws a 1px vertical rule down the left edge of
         .special-price (border-left: 1px solid #404040, with 8px of padding
         behind it) to separate the crossed-out "was" figure from the price the
         shopper pays. Once the "was" figure is hidden that rule has nothing
         left to separate, and it renders as a short line immediately in front
         of the set price. Its padding goes with it. */
      priceScope + '.special-price {',
      '  border-left: 0 !important;',
      '  padding-left: 0 !important;',
      '}',
      /* Amasty's two gallery overlays: the green "SALE" roundel and the red
         "- R 300.00" saving flash. The first selector hides the positioned
         wrapper; the second hides the badge itself, and is kept as a second
         line of defence in case Amasty ever changes the wrapper's naming. */
      galleryScope + '[class*="amlabel-position-"][class*="-' + pid + '-prod"],',
      galleryScope + '[class~="amasty-label-for-' + pid + '"] {',
      '  display: none !important;',
      '}'
    ].join('\n');

    try {
      var style = document.createElement('style');
      style.id = STYLE_ID;
      style.setAttribute(MARK, 'promo-suppression');
      style.textContent = css;
      (document.head || document.documentElement).appendChild(style);
      return true;
    } catch (e) {
      warn('could not install the promotional-wording stylesheet', e);
      return false;
    }
  }

  /* Turn the rules above on and off. Deliberately kept separate from the price
     swap: even if the price element could not be resolved on some page, a
     crossed-out figure or a saving flash must still never sit beside the set. */
  function setPromoSuppressed(on) {
    try {
      var root = document.documentElement;
      if (on) { root.classList.add(SUITE_CLS); }
      else { root.classList.remove(SUITE_CLS); }
    } catch (e) { warn('could not switch promotional-wording hiding ' + (on ? 'on' : 'off'), e); }
  }

  /* ------------- the set's image over the main gallery (Bug 2 fix) ---------
     Added 2026-08-12 on Nick's instruction via the QA batch (not in the
     original spec). Choosing "Full bathroom set" must show the set's image
     as the main product image; going back must restore the original exactly.

     HOW. We never touch the gallery itself. A single overlay of ours is
     placed inside the gallery stage (.product.media .vaimo-gallery__stage,
     position: relative), display:none by default, and shown purely by the
     variation CSS while <html> carries our cro-12527-suite-selected marker —
     the same class the promotional hiding keys on. That means:

       - Timing does not matter. The Vaimo keen-slider can redraw, change
         slides or lazy-load whatever it likes; the overlay just sits on top
         while the marker is present.
       - Restoring is a class removal. The gallery, its slider state, its
         zoom and its thumbnails are never mutated, so switching back shows
         them exactly as they were.
       - The related/similar product carousels are outside .product.media,
         so nothing there can be affected.

     While the set is selected the CSS also hides the slider arrows and dots
     (visibility, so no layout shift) and dims/disables the thumbnails —
     otherwise they would appear to do nothing while the overlay covers the
     stage. All of it comes back with the class removal.

     The image bytes are only fetched when needed: the src is assigned on the
     first selection of the set, and the cache is warmed once the page is
     idle so that first swap is instant.

     KNOWN EDGE, accepted: if a shopper starts a gallery VIDEO and then picks
     the set, the video is covered but its audio keeps playing until they
     switch back or pause. No error, self-corrects on switch-back. */
  function installSetImage(cfg) {
    var imgUrl = SET_IMG[cfg.b];
    if (!imgUrl) { return; }   // set has no clean image — swap off by design, see SET_IMG
    var stage = document.querySelector('.product.media .vaimo-gallery__stage');
    if (!stage) {
      warn('gallery stage not found; the set image swap is off on this page');
      return;
    }
    if (stage.querySelector('[' + MARK + '="set-image"]')) { return; }   // idempotent

    var holder = document.createElement('div');
    holder.setAttribute(MARK, 'set-image');
    holder.className = NS + '-set-image';
    var im = document.createElement('img');
    im.alt = 'Full bathroom set';
    im.setAttribute('data-' + NS + '-src', imgUrl);   // assigned to src on first selection
    holder.appendChild(im);
    stage.appendChild(holder);

    /* Second marker, on <html> like the first: the gallery controls are only
       hidden/dimmed while the set is selected AND this page actually has an
       overlay. On the pages where the swap is off (no clean set image) the
       gallery keeps showing the single item, so its controls must keep
       working. */
    try { document.documentElement.classList.add(NS + '-has-set-image'); } catch (e) { }

    var warm = function () { try { var w = new Image(); w.src = imgUrl; } catch (e) { } };
    if ('requestIdleCallback' in window) { requestIdleCallback(warm, { timeout: 4000 }); }
    else { setTimeout(warm, 3000); }
  }

  // Called on every selection of the set: make sure the overlay image has its
  // src (first time only — the attribute copy is idempotent).
  function armSetImage() {
    var im = document.querySelector('.product.media [' + MARK + '="set-image"] img');
    if (im && !im.getAttribute('src')) {
      im.setAttribute('src', im.getAttribute('data-' + NS + '-src'));
    }
  }

  /* One-shot check, the first time the set is chosen: if any of this product's
     promotional elements is still taking up space on screen, say so in the
     console. A broken variation must be visible in QA rather than silent. */
  var promoChecked = false;
  function verifyPromoHidden(pageProductId) {
    if (promoChecked) { return; }
    promoChecked = true;
    setTimeout(function () {
      try {
        var pid = String(pageProductId);
        var sel = '.product-info-main .product-info-price .price-box[data-product-id="' + pid + '"] .old-price, ' +
          '.product.media [class*="amlabel-position-"][class*="-' + pid + '-prod"]';
        var stillShowing = [];
        var found = document.querySelectorAll(sel);
        for (var i = 0; i < found.length; i++) {
          if (isVisible(found[i])) { stillShowing.push(found[i]); }
        }
        if (stillShowing.length) {
          warn('promotional wording is still visible with the set selected', stillShowing);
        }
      } catch (e) { warn('could not check whether promotional wording was hidden', e); }
    }, 400);
  }

  /* ------------------------------- build ------------------------------- */

  /* Selection state and the one-shot view flag live at MODULE scope, not
     inside build(). If the buy box is re-rendered after a back-forward-cache
     restore and the module is rebuilt, any listener that survived on an
     untouched button keeps reading the LIVE state instead of a stale copy,
     and the view event still fires at most once per page. */
  var currentSelection = 'single';
  var viewFired = false;

  function build(actionsBlock, form, sku, cfg) {
    if (document.querySelector('[' + MARK + '="module"]')) { return; }   // idempotent
    currentSelection = 'single';   // a (re)build always starts on the single item

    var wrap = document.createElement('div');
    wrap.setAttribute(MARK, 'module');
    wrap.className = NS + '-wrap';

    // Heading: "[Item type] only or full bathroom set?" — first noun adapts to
    // the anchor product type, the second half is verbatim per the brief.
    var head = document.createElement('div');
    head.className = 'crp-opth';
    head.textContent = cfg.n + ' only or full bathroom set?';

    var opts = document.createElement('div');
    opts.className = 'crp-opts';

    // ---- Option 1: the single item. SELECTED BY DEFAULT so the control
    //      experience is never degraded.
    var single = document.createElement('div');
    single.className = 'crp-opt sel';
    single.setAttribute(MARK, 'single');
    single.setAttribute('role', 'radio');
    single.setAttribute('tabindex', '0');
    single.setAttribute('aria-checked', 'true');

    var sRad = document.createElement('span'); sRad.className = 'rad';
    var sOc = document.createElement('div'); sOc.className = 'oc';
    var sOt = document.createElement('div'); sOt.className = 'ot';
    sOt.textContent = cfg.n + ' only';
    var sOp = document.createElement('div'); sOp.className = 'op';
    sOp.textContent = cfg.sp;
    sOc.appendChild(sOt); sOc.appendChild(sOp);
    single.appendChild(sRad); single.appendChild(sOc);

    // ---- Option 2: the full bathroom set. Label is verbatim per the brief.
    var suite = document.createElement('div');
    suite.className = 'crp-opt';
    suite.setAttribute(MARK, 'suite');
    suite.setAttribute('role', 'radio');
    suite.setAttribute('tabindex', '0');
    suite.setAttribute('aria-checked', 'false');

    var bRad = document.createElement('span'); bRad.className = 'rad';
    var bOc = document.createElement('div'); bOc.className = 'oc';
    var bOt = document.createElement('div'); bOt.className = 'ot';
    bOt.textContent = 'Full bathroom set';
    var bOp = document.createElement('div'); bOp.className = 'op';
    bOp.textContent = cfg.bpr;
    // Approved red "Best value" badge. No savings language anywhere: no
    // "save R__", no strikethrough, no was/now, no percentage.
    var badge = document.createElement('span');
    badge.className = 'sv';
    badge.textContent = 'Best value';
    bOp.appendChild(badge);
    bOc.appendChild(bOt); bOc.appendChild(bOp);
    suite.appendChild(bRad); suite.appendChild(bOc);

    opts.appendChild(single);
    opts.appendChild(suite);
    wrap.appendChild(head);
    wrap.appendChild(opts);

    // INSIDE the buy box, directly above the Add To Cart button.
    actionsBlock.parentNode.insertBefore(wrap, actionsBlock);

    /* The big buy-box price. Resolved once, here, and its ORIGINAL text is
       captured so switching back restores exactly what CTM rendered rather
       than a string we rebuilt. If it cannot be resolved unambiguously we
       carry on without the price swap and warn loudly — the selector and the
       add-to-cart switch still work, and a visible warning in QA beats
       silently rewriting the wrong product's price. */
    var priceParts = getMainPriceParts(cfg.p);
    var originalPriceText = priceParts ? priceParts.node.textContent : null;
    if (!priceParts) {
      warn('main buy box price not resolved unambiguously; leaving it unchanged');
    }

    /* Back-forward-cache guard: if this is a REBUILD after a restore and the
       restored page still shows the SET price we wrote before the shopper
       navigated away, the current text is not CTM's original. The map's
       single price is (it was copied byte-for-byte from what CTM renders),
       so put it back and treat it as the original. */
    if (priceParts && originalPriceText === cfg.bpr) {
      setMainPrice(priceParts, cfg.sp);
      originalPriceText = cfg.sp;
    }

    /* Install the stylesheet that hides CTM's promotional wording. Installed
       here but not switched on: it does nothing at all until the shopper picks
       the set. Installing it now rather than on first click means it is ready
       before it is needed, and it does not care whether Amasty has finished
       drawing the gallery overlays yet — that late rendering is exactly what
       broke the first version. */
    installPromoSuppression(cfg.p);

    /* The set's image overlay (Bug 2 fix). Installed hidden; the variation
       CSS shows it only while the suite-selected marker class is on <html>. */
    installSetImage(cfg);

    /* ---------------------------- selection ---------------------------- */

    function select(which) {
      if (which === currentSelection) { return; }
      currentSelection = which;

      var pickSuite = (which === 'suite');
      suite.classList.toggle('sel', pickSuite);
      single.classList.toggle('sel', !pickSuite);
      suite.setAttribute('aria-checked', pickSuite ? 'true' : 'false');
      single.setAttribute('aria-checked', pickSuite ? 'false' : 'true');

      setFormProduct(form, pickSuite ? cfg.bp : cfg.p);

      /* Hide or restore CTM's promotional wording. Done first, and on its own,
         so that it happens even on a page where the price element could not be
         resolved. Restoring is a class removal, so CTM's own "was" figure,
         "Special Price" label, sale roundel and saving flash come back exactly
         as they were — we never changed them in the first place. */
      setPromoSuppressed(pickSuite);
      if (pickSuite) { armSetImage(); verifyPromoHidden(cfg.p); }

      // Swap the headline price to match what is selected. Number only. Going
      // back restores CTM's own original string character for character.
      setMainPrice(priceParts, pickSuite ? cfg.bpr : originalPriceText);

      if (pickSuite) {
        track('cro12527_suite_module_clicked', GOAL.chosen, {
          suite_sku: cfg.b,          // the set SKU, as the brief requires
          suite_product_id: cfg.bp,
          anchor_sku: sku,
          item_type: cfg.n
        });
      }
    }

    function bind(el, which) {
      el.addEventListener('click', function () { select(which); });
      el.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') {
          ev.preventDefault();
          select(which);
        }
      });
    }
    bind(single, 'single');
    bind(suite, 'suite');

    /* --------------------- add-to-cart, by SKU ------------------------- */
    var atc = form.querySelector('#product-addtocart-button');
    if (atc && !atc.hasAttribute(MARK + '-atc')) {
      // Listen, do not intercept. The native submit must still run. The
      // attribute stops a second listener being bound if the module is
      // rebuilt after a back-forward-cache restore while the button survived
      // (a duplicate would double-fire the add-to-cart tracking event).
      atc.setAttribute(MARK + '-atc', '1');
      atc.addEventListener('click', function () {
        var pickSuite = (currentSelection === 'suite');
        track('cro12527_add_to_cart', GOAL.added, {
          option_chosen: pickSuite ? 'full_bathroom_set' : 'single_item',
          added_sku: pickSuite ? cfg.b : sku,
          added_product_id: pickSuite ? cfg.bp : cfg.p,
          anchor_sku: sku,
          item_type: cfg.n
        });
      });
    } else if (!atc) {
      warn('Add To Cart button not found; add-to-cart event will not fire');
    }

    /* ------------------- view event (on scroll into view) --------------- */
    // Fires once, only when the module is genuinely on screen — NOT on page
    // load. Without this we cannot tell "saw it and said no" from "never saw
    // it", and those two findings point in opposite directions.
    if ('IntersectionObserver' in window && !viewFired) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!viewFired && entry.isIntersecting) {
            viewFired = true;
            io.disconnect();
            track('cro12527_suite_module_viewed', GOAL.viewed, {
              anchor_sku: sku,
              suite_sku: cfg.b,
              item_type: cfg.n
            });
          }
        });
      }, { threshold: 0.5 });
      io.observe(wrap);
    } else if (!('IntersectionObserver' in window)) {
      warn('IntersectionObserver unavailable; view event cannot fire');
    }
  }

  /* -------------------------------- run -------------------------------- */

  var waitPending = false;   // one injection pipeline in flight at a time

  function run() {
    if (waitPending) { return; }
    if (document.querySelector('[' + MARK + '="module"]')) { return; }   // already built

    var form = getForm();
    if (!form) { warn('visible add-to-cart form not found'); return; }

    var sku = form.getAttribute('data-product-sku');
    if (!sku) { warn('no data-product-sku on the form'); return; }

    var cfg = MAP[sku.toUpperCase()];
    if (!cfg) { return; }   // not one of the 32 test pages — silent, expected

    // Sanity check: the map's product id must match the page's own. If CTM
    // re-indexes and an id moves, we want to know rather than add the wrong item.
    var pageProductId = (form.querySelector('input[name="product"]') || {}).value;
    if (pageProductId && String(pageProductId) === String(cfg.bp)) {
      // Not a mismatch: this is OUR OWN earlier rewrite, preserved by the
      // browser's back-forward cache while the module itself was lost. Put
      // the form back on the single item (the rebuilt module starts there)
      // and carry on.
      setFormProduct(form, cfg.p);
      pageProductId = (form.querySelector('input[name="product"]') || {}).value;
    }
    if (pageProductId && String(pageProductId) !== String(cfg.p)) {
      warn('product id mismatch for ' + sku + ' (page=' + pageProductId +
        ', map=' + cfg.p + '); skipping so we never add the wrong product');
      return;
    }

    waitPending = true;
    waitFor(function () {
      var a = form.querySelector('.box-tocart .fieldset .actions');
      return (a && isVisible(a)) ? a : null;
    }, function (actionsBlock) {
      waitPending = false;
      try {
        build(actionsBlock, form, sku.toUpperCase(), cfg);
      } catch (e) {
        warn('build failed', e);
      }
    }, 10000, function () { waitPending = false; });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  /* -------------- back-forward cache (Bug 1 fix, 2026-08-12) --------------
     THE BUG. Navigate to a mapped page, click through to another page, press
     the browser's Back button: the selector did not render until a full
     manual reload.

     WHY. CTM serves its pages with Cache-Control: no-store. Chrome refuses
     to put no-store pages into its back-forward cache, so in Chrome every
     Back is a full reload and this code runs fresh — which is why the bug
     does not reproduce there (confirmed live via
     performance.navigation notRestoredReasons: "response-cache-control-
     no-store"). Safari and iOS WebKit DO restore no-store pages from their
     back-forward cache. On a restore, nothing re-runs: the page comes back
     as a frozen snapshot, this file's run-once guard (window.__cro_12527_init)
     is still set in the preserved JS heap, and there was no pageshow handling
     at all. So if the restore leaves the page without the module — Magento
     re-rendering the buy box after restore, or the shopper having left
     before the injection finished — nothing ever put it back.

     THE FIX. On pageshow with persisted=true (fires ONLY on a back-forward-
     cache restore), re-assert the module: immediately, and then on a bounded
     500ms check for 10 seconds, because Magento's post-restore re-rendering
     can wipe the buy box AFTER the pageshow moment. Every path it calls is
     idempotent, so on a healthy restore (module still present, state intact)
     it does exactly nothing. When the module IS missing, the marker class is
     cleared first so a restored "set selected" state cannot leak promotional
     hiding or the set image onto a rebuilt module that starts on the single
     item; run() then resets the form (see the cfg.bp branch above) and
     build() resets the headline price (see the cfg.bpr branch there). */
  var reassertTimer = null;
  function reassert() {
    if (reassertTimer) { clearInterval(reassertTimer); reassertTimer = null; }
    var tries = 0;
    var tick = function () {
      tries++;
      if (!document.querySelector('[' + MARK + '="module"]')) {
        setPromoSuppressed(false);   // clear a restored "set selected" marker
        try { run(); } catch (e) { warn('re-init after back-navigation failed', e); }
      }
      if (tries >= 20 && reassertTimer) { clearInterval(reassertTimer); reassertTimer = null; }
    };
    tick();
    reassertTimer = setInterval(tick, 500);
  }

  window.addEventListener('pageshow', function (ev) {
    if (ev && ev.persisted) { reassert(); }
  });
})();