/* CRO-12357 (v2) — Tile Calculator | Rory open-state redesign | ALL
   Custom-built modal following the Figma redesign, reusing the validated control
   calc logic (area = w×l, +10%, boxes = ceil(area×1.1 / m²perBox), setField
   event-dispatch, #calc_btn take-over, form submit).

   Built against the full CRO-12357 QA thread (29 bugs + follow-ups) — key ones:
   independent Floor/Wall lists (#14-16,19,20), labels only on Area 1 (#35),
   "0.00m²" no space + same in both zones (#10,34), separate summary sheet (#17,21),
   how-to resets per zone/reopen (#22,36), high z-index over chat/banner (#23,28,33),
   #404040 summary colour (#18), 8px card gap (#27), font-weight 400 Add Area (#7). */
(function () {
  'use strict';

  var VARIATION = 'cro-12357-v2';

  var waitForElement = function (selector, callback) {
    var el = document.querySelector(selector);
    if (el) { callback(el); } else { setTimeout(function () { waitForElement(selector, callback); }, 100); }
  };

  function num(sel) { var el = document.querySelector(sel); return el ? parseFloat(el.value) : NaN; }

  var ROOM_IMG = 'https://www.ctm.co.za/static/version1784096908/frontend/Vectra/ctmkenya/en_US/images/tile-calculator-room.png';

  var ICON = {
    close: '<svg viewBox="0 0 20 20" fill="none" stroke="#99a1af" stroke-width="1.6" stroke-linecap="round"><path d="M5 5l10 10M15 5L5 15"/></svg>',
    floor: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2.5" y="2.5" width="11" height="11" rx="1.5"/></svg>',
    wall: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M8 1.7l5.5 3.1v6.4L8 14.3 2.5 11.2V4.8L8 1.7z"/><path d="M2.6 4.9L8 8l5.4-3.1M8 8v6.3"/></svg>',
    chevron: '<svg viewBox="0 0 16 16" fill="none" stroke="#008236" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>',
    bin: '<svg viewBox="0 0 12 12" fill="none" stroke="#99a1af" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 3h9M4.5 3V2.2c0-.4.3-.7.7-.7h1.6c.4 0 .7.3.7.7V3M9.5 3l-.4 6.3c0 .5-.4.9-.9.9H3.8c-.5 0-.9-.4-.9-.9L2.5 3M5 5.3v3M7 5.3v3"/></svg>',
    cart: '<svg viewBox="0 0 18 18" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 1.7h1.9l1.5 8.1c.1.4.4.7.8.7h6.7c.4 0 .8-.3.8-.7l1-5.3H4.2"/><circle cx="6.2" cy="14.4" r="1.1"/><circle cx="12.6" cy="14.4" r="1.1"/></svg>'
  };

  /* which zones this tile supports — floor-only / wall-only / both (bug: full-width single button) */
  function detectZones() {
    var t = (document.querySelector('.page-title .base, h1.page-title .base, .page-title-wrapper .base') || {}).textContent || document.title || '';
    t = t.toLowerCase();
    var floor = t.indexOf('floor') !== -1, wall = t.indexOf('wall') !== -1;
    if (floor && !wall) { return ['floor']; }
    if (wall && !floor) { return ['wall']; }
    return ['floor', 'wall'];
  }

  function label2(zone) { return zone === 'wall' ? 'Height in meters' : 'Length in meters'; }

  /* labels are rendered in every card but only shown on Area 1 via CSS (.is-first) — QA #35 */
  function cardHTML(zone, n, first) {
    return '<div class="cro-12357-card' + (first ? ' is-first' : '') + '">' +
      '<div class="cro-12357-card-head"><span class="cro-12357-card-title">Area ' + n + '</span>' +
      '<button class="cro-12357-card-del" type="button" aria-label="Remove area">' + ICON.bin + '</button></div>' +
      '<div class="cro-12357-card-labels"><span>Width in meters</span><span class="cro-12357-lbl2">' + label2(zone) + '</span></div>' +
      '<div class="cro-12357-card-inputs">' +
      '<div class="cro-12357-inp"><input type="number" class="cro-12357-w" inputmode="decimal" min="0"><span class="cro-12357-unit">m</span></div>' +
      '<span class="cro-12357-x">×</span>' +
      '<div class="cro-12357-inp"><input type="number" class="cro-12357-l" inputmode="decimal" min="0"><span class="cro-12357-unit">m</span></div>' +
      '</div>' +
      '<p class="cro-12357-card-total">Total area: <b>0.00m²</b></p>' +
      '</div>';
  }

  function buildMarkup(zones) {
    var toggle = zones.map(function (z) {
      var active = z === zones[0] ? ' is-active' : '';
      var icon = z === 'wall' ? ICON.wall : ICON.floor;
      var name = z === 'wall' ? 'Wall' : 'Floor';
      return '<button class="cro-12357-toggle-btn' + active + '" type="button" data-zone="' + z + '">' + icon + name + '</button>';
    }).join('');

    var zoneLists = zones.map(function (z) {
      var hidden = z === zones[0] ? '' : ' hidden';
      return '<div class="cro-12357-cards" data-zone="' + z + '"' + hidden + '>' + cardHTML(z, 1, true) + '</div>';
    }).join('');

    return '' +
      '<div class="cro-12357-overlay" id="cro-12357-overlay"></div>' +
      '<div class="cro-12357-modal" id="cro-12357-modal" role="dialog" aria-modal="true" aria-label="Tile Calculator"><div class="cro-12357-panel">' +
      '<header class="cro-12357-header"><h2 class="cro-12357-title">Tile Calculator</h2>' +
      '<button class="cro-12357-close" id="cro-12357-close" type="button" aria-label="Close">' + ICON.close + '</button></header>' +
      '<div class="cro-12357-body">' +
      '<p class="cro-12357-subtitle">Enter the width and length of your area in meters to calculate the quantity needed.</p>' +
      '<div class="cro-12357-toggle' + (zones.length === 1 ? ' is-single' : '') + '">' + toggle + '</div>' +
      '<div class="cro-12357-howto" id="cro-12357-howto">' +
      '<button class="cro-12357-howto-head" id="cro-12357-howto-head" type="button" aria-expanded="false"><span>How to measure</span>' + ICON.chevron + '</button>' +
      '<div class="cro-12357-howto-body"><img src="' + ROOM_IMG + '" alt="Room measurement diagram" loading="lazy"></div>' +
      '</div>' +
      '<div class="cro-12357-zones" id="cro-12357-zones">' + zoneLists + '</div>' +
      '<button class="cro-12357-add-area" id="cro-12357-add-area" type="button">Add Area</button>' +
      '<div class="cro-12357-footer">' +
      '<button class="cro-12357-swipe" id="cro-12357-swipe" type="button">' +
      '<span class="cro-12357-swipe-desktop">Click here to view full Calculation Summary</span>' +
      '<span class="cro-12357-swipe-mobile">Swipe up to view full Calculation Summary</span>' +
      '</button>' +
      '<button class="cro-12357-atc" id="cro-12357-atc-main" type="button">' + ICON.cart + '<span class="cro-12357-atc-label">Add 0 boxes to cart</span></button>' +
      '<p class="cro-12357-note">Click "Add to Cart" to view your quote | order</p>' +
      '</div>' +
      '</div>' +
      /* summary sheet lives INSIDE the panel so it slides up from the modal's bottom, not the page's */
      '<div class="cro-12357-sheet-backdrop" id="cro-12357-sheet-backdrop"></div>' +
      '<div class="cro-12357-sheet" id="cro-12357-sheet">' +
      '<div class="cro-12357-grip"></div>' +
      '<button class="cro-12357-swipe" id="cro-12357-sheet-swipe" type="button">Swipe up to view full Calculation Summary</button>' +
      '<h3 class="cro-12357-sheet-title">Summary:</h3>' +
      '<div class="cro-12357-sum-rows">' +
      '<div class="cro-12357-sum-row"><span>Area measured</span><span class="v"><b class="cro-12357-s-area">0.00</b> square meters</span></div>' +
      '<div class="cro-12357-sum-row"><span>10% extra for installation</span><span class="v"><b class="cro-12357-s-extra">0.00</b> square meters</span></div>' +
      '<div class="cro-12357-sum-row cro-12357-sum-need"><span>You will need:</span><span class="v cro-12357-s-need">0 boxes = 0.00 square meters</span></div>' +
      '</div>' +
      '<button class="cro-12357-atc" id="cro-12357-atc-sheet" type="button">' + ICON.cart + '<span class="cro-12357-atc-label">Add 0 boxes to cart</span></button>' +
      '<p class="cro-12357-note">Click "Add to Cart" to view your quote | order</p>' +
      '</div>' +
      '</div></div>';
  }

  function init() {
    if (document.getElementById('cro-12357-modal')) { return; }
    document.body.classList.add(VARIATION);

    var M2_PER_BOX = (num('#umren') && num('#umrez')) ? (num('#umrez') / num('#umren')) : 2.52;  // 63/25 = 2.52
    var zones = detectZones();

    var host = document.createElement('div');
    host.id = 'cro-12357-host';
    host.innerHTML = buildMarkup(zones);
    document.body.appendChild(host);

    var $ = function (s) { return host.querySelector(s); };
    var overlay = $('#cro-12357-overlay'), modalEl = $('#cro-12357-modal'), zonesEl = $('#cro-12357-zones');
    var sheet = $('#cro-12357-sheet'), sheetBackdrop = $('#cro-12357-sheet-backdrop'), howto = $('#cro-12357-howto');
    var bodyEl = $('.cro-12357-body');
    var state = { zone: zones[0], boxes: 0, withExtra: 0 };

    function activeList() { return zonesEl.querySelector('.cro-12357-cards[data-zone="' + state.zone + '"]'); }

    function fmtM2(n) { return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
    function fmtInt(n) { return n.toLocaleString('en-US'); }

    function setField(sel, val) {                 // push value into a real qty field + fire the events the site listens for
      var el = document.querySelector(sel);
      if (!el) { return; }
      el.value = val;
      ['input', 'keyup', 'change'].forEach(function (t) { el.dispatchEvent(new Event(t, { bubbles: true })); });
      if (window.jQuery) { window.jQuery(el).val(val).trigger('change'); }
    }

    function renumber(list) {                      // per-zone numbering, Area 1 keeps labels (QA #15,19,35)
      list.querySelectorAll('.cro-12357-card').forEach(function (c, i) {
        c.querySelector('.cro-12357-card-title').textContent = 'Area ' + (i + 1);
        c.classList.toggle('is-first', i === 0);
      });
    }

    /* sum across BOTH zones (hidden cards still count toward native totals) — same as control */
    function recalc() {
      var total = 0;
      zonesEl.querySelectorAll('.cro-12357-card').forEach(function (c) {
        var w = parseFloat(c.querySelector('.cro-12357-w').value) || 0;
        var l = parseFloat(c.querySelector('.cro-12357-l').value) || 0;
        var a = w * l;
        total += a;
        c.querySelector('.cro-12357-card-total b').textContent = fmtM2(a) + 'm²';   // no space — QA #10,34
      });
      var extra = total * 0.1;
      var withExtra = total * 1.1;
      var boxes = total > 0 ? Math.ceil(withExtra / M2_PER_BOX) : 0;
      state.boxes = boxes; state.withExtra = withExtra;

      $('.cro-12357-s-area').textContent = fmtM2(total);
      $('.cro-12357-s-extra').textContent = fmtM2(extra);
      $('.cro-12357-s-need').innerHTML = '<b>' + fmtInt(boxes) + ' boxes = ' + fmtM2(withExtra) + ' square meters</b>';

      var label = 'Add ' + fmtInt(boxes) + ' boxes to cart';
      host.querySelectorAll('.cro-12357-atc-label').forEach(function (el) { el.textContent = label; });
    }

    function addToCart() {
      if (!state.boxes) { return; }
      setField('#qty-box', state.boxes);
      setField('#area_to_cover', state.withExtra.toFixed(2));
      var form = document.getElementById('product_addtocart_form');
      if (form) { form.requestSubmit ? form.requestSubmit() : form.submit(); }
      close();                                            // close our modal after adding (bug: modal stayed open)
    }

    function resetHowto() { howto.classList.remove('is-open'); $('#cro-12357-howto-head').setAttribute('aria-expanded', 'false'); }

    /* wipe every input back to a single empty Area 1 per zone — so returning from cart/checkout
       never shows stale values (the modal persists on this SPA) */
    function resetCalculator() {
      zones.forEach(function (z) {
        var list = zonesEl.querySelector('.cro-12357-cards[data-zone="' + z + '"]');
        list.innerHTML = cardHTML(z, 1, true);
        list.hidden = z !== zones[0];
      });
      state.zone = zones[0];
      host.querySelectorAll('.cro-12357-toggle-btn').forEach(function (b) {
        b.classList.toggle('is-active', b.getAttribute('data-zone') === zones[0]);
      });
      recalc();
    }

    function open() { resetCalculator(); resetHowto(); closeSheet(); overlay.classList.add('is-open'); modalEl.classList.add('is-open'); document.body.classList.add('cro-12357-open'); }
    function close() { overlay.classList.remove('is-open'); modalEl.classList.remove('is-open'); closeSheet(); document.body.classList.remove('cro-12357-open'); }
    function openSheet() { recalc(); sheetBackdrop.classList.add('is-open'); sheet.classList.add('is-open'); }
    function closeSheet() { sheetBackdrop.classList.remove('is-open'); sheet.classList.remove('is-open'); }

    /* events */
    zonesEl.addEventListener('input', function (e) { if (e.target.matches('.cro-12357-w,.cro-12357-l')) { recalc(); } });
    zonesEl.addEventListener('click', function (e) {
      var del = e.target.closest('.cro-12357-card-del'); if (!del) { return; }
      var list = del.closest('.cro-12357-cards'), card = del.closest('.cro-12357-card');
      if (list.querySelectorAll('.cro-12357-card').length > 1) { card.remove(); renumber(list); recalc(); }
    });
    $('#cro-12357-add-area').addEventListener('click', function () {
      var list = activeList();
      var n = list.querySelectorAll('.cro-12357-card').length + 1;
      list.insertAdjacentHTML('beforeend', cardHTML(state.zone, n, false));
      renumber(list); recalc();
    });
    host.querySelectorAll('.cro-12357-toggle-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.classList.contains('is-active')) { return; }
        host.querySelectorAll('.cro-12357-toggle-btn').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        state.zone = btn.getAttribute('data-zone');
        zonesEl.querySelectorAll('.cro-12357-cards').forEach(function (l) {
          l.hidden = l.getAttribute('data-zone') !== state.zone;               // independent lists — QA #14,16
        });
        resetHowto();                                                          // how-to not shared across zones — QA #22,36
      });
    });
    $('#cro-12357-howto-head').addEventListener('click', function () {
      var isOpen = howto.classList.toggle('is-open');
      this.setAttribute('aria-expanded', String(isOpen));
    });
    /* Desktop: plain click opens the summary. Mobile: requires an actual swipe-up gesture
       (a tap alone must not open it) — QA follow-up: "Click here…" desktop / "Swipe up…" mobile.
       The gesture is tracked on the whole modal (not just the button) so a swipe up anywhere
       reveals the summary, but only once the scrollable body is already at its bottom — this
       stops it from hijacking a normal scroll through the area cards. */
    var isMobile = function () { return window.matchMedia('(max-width: 767px)').matches; };
    var swipeBtn = $('#cro-12357-swipe');
    var panelTouchStartY = null;
    swipeBtn.addEventListener('click', function (e) {
      if (isMobile()) { e.preventDefault(); return; }
      openSheet();
    });
    modalEl.addEventListener('touchstart', function (e) {
      if (!isMobile()) { return; }
      panelTouchStartY = e.touches[0].clientY;
    }, { passive: true });
    modalEl.addEventListener('touchend', function (e) {
      if (!isMobile() || panelTouchStartY === null) { return; }
      var dy = panelTouchStartY - e.changedTouches[0].clientY;
      panelTouchStartY = null;
      if (dy <= 40) { return; }                            // upward drag > 40px counts as a swipe
      var atBottom = bodyEl.scrollHeight - bodyEl.scrollTop - bodyEl.clientHeight < 4;
      if (atBottom) { openSheet(); }
    });
    $('#cro-12357-sheet-swipe').addEventListener('click', closeSheet);
    sheetBackdrop.addEventListener('click', closeSheet);
    $('#cro-12357-close').addEventListener('click', close);
    overlay.addEventListener('click', close);
    modalEl.addEventListener('click', function (e) { if (e.target === modalEl) { close(); } });  // click backdrop area (outside the panel) to close
    $('#cro-12357-atc-main').addEventListener('click', addToCart);
    $('#cro-12357-atc-sheet').addEventListener('click', addToCart);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modalEl.classList.contains('is-open')) { close(); } });

    /* Take over the trigger so ONLY our modal opens. A capture-phase listener on document
       runs before any native handler — whether bound directly on #calc_btn or delegated, and
       even though the native calc.js binds LATER via RequireJS — and stopImmediatePropagation
       prevents the native Magento modal from also opening behind ours. */
    document.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('#calc_btn') : null;
      if (t) { e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); open(); }
    }, true);

    /* Safety net: if the native tile-calc modal ever slips open, force it (and its stray overlay) shut. */
    function killNative() {
      var opened = document.querySelector('.area-calculator-wrap.modal-popup._show');
      if (!opened) { return; }
      opened.classList.remove('_show');
      if (!document.querySelector('.modal-popup._show')) {
        var ov = document.querySelector('.modals-overlay'); if (ov) { ov.style.display = 'none'; }
      }
    }
    document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('#calc_btn')) { setTimeout(killNative, 0); setTimeout(killNative, 300); } }, true);

    window.openTileCalc = open;
    recalc();
  }

  waitForElement('#calc_btn', init);
})();