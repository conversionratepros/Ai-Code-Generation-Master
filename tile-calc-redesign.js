/* CTM Tile Calculator — CRO-12357 redesign (Figma sZznaTVI3rVV1BDGwHTvJC).
   SAME build logic as the clone version (area = w×l, +10%, boxes = ceil(area×1.1 / m²perBox),
   setField event-dispatch, #calc_btn take-over, form submit) — only the UI follows the new design. */
(function () {
  if (window.__tileCalcRedesign) { window.openTileCalc && window.openTileCalc(); return; }
  window.__tileCalcRedesign = true;

  /* -------- product config (same source the native calc uses) -------- */
  function num(sel) { var el = document.querySelector(sel); return el ? parseFloat(el.value) : NaN; }
  var M2_PER_BOX = (num('#umren') && num('#umrez')) ? (num('#umrez') / num('#umren')) : 2.52;  // 63/25 = 2.52
  var ROOM_IMG = 'https://www.ctm.co.za/static/version1784096908/frontend/Vectra/ctmkenya/en_US/images/tile-calculator-room.png';

  /* -------- inline icons (self-contained, no expiring Figma assets) -------- */
  var ICON = {
    close: '<svg viewBox="0 0 20 20" fill="none" stroke="#99a1af" stroke-width="1.6" stroke-linecap="round"><path d="M5 5l10 10M15 5L5 15"/></svg>',
    floor: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2.5" y="2.5" width="11" height="11" rx="1.5"/></svg>',
    wall:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M8 1.7l5.5 3.1v6.4L8 14.3 2.5 11.2V4.8L8 1.7z"/><path d="M2.6 4.9L8 8l5.4-3.1M8 8v6.3"/></svg>',
    chevron: '<svg viewBox="0 0 16 16" fill="none" stroke="#008236" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>',
    bin: '<svg viewBox="0 0 12 12" fill="none" stroke="#99a1af" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 3h9M4.5 3V2.2c0-.4.3-.7.7-.7h1.6c.4 0 .7.3.7.7V3M9.5 3l-.4 6.3c0 .5-.4.9-.9.9H3.8c-.5 0-.9-.4-.9-.9L2.5 3M5 5.3v3M7 5.3v3"/></svg>',
    cart: '<svg viewBox="0 0 18 18" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 1.7h1.9l1.5 8.1c.1.4.4.7.8.7h6.7c.4 0 .8-.3.8-.7l1-5.3H4.2"/><circle cx="6.2" cy="14.4" r="1.1"/><circle cx="12.6" cy="14.4" r="1.1"/></svg>'
  };

  /* -------- styles -------- */
  var CSS = `
  .tcx-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99998;display:none;}
  .tcx-overlay.is-open{display:block;}
  .tcx-modal{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:16px;
    font-family:Inter,'Source Sans Pro',Roboto,Arial,sans-serif;-webkit-font-smoothing:antialiased;}
  .tcx-modal.is-open{display:flex;}
  .tcx-panel{background:#fff;border-radius:10px;width:min(420px,94vw);max-height:92vh;display:flex;flex-direction:column;
    box-shadow:0 10px 7.5px rgba(0,0,0,.1),0 4px 3px rgba(0,0,0,.1);overflow:hidden;}
  .tcx-header{display:flex;align-items:center;justify-content:space-between;height:61px;padding:16px;
    border-bottom:1px solid #e5e7eb;flex:0 0 auto;}
  .tcx-title{margin:0;font-size:18px;line-height:28px;font-weight:600;color:#101828;}
  .tcx-close{width:20px;height:20px;padding:0;background:none;border:0;cursor:pointer;}
  .tcx-close svg{width:20px;height:20px;display:block;}
  .tcx-body{overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:18px;}
  .tcx-subtitle{margin:0;font-size:14px;line-height:20px;color:#4a5565;}

  .tcx-toggle{display:flex;gap:8px;}
  .tcx-toggle-btn{flex:1;height:38px;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;
    border-radius:4px;font-size:14px;font-weight:500;background:#fff;border:1px solid #d1d5dc;color:#364153;}
  .tcx-toggle-btn svg{width:16px;height:16px;}
  .tcx-toggle-btn.is-active{background:#6d6d6d;border-color:#6d6d6d;color:#fff;}

  .tcx-howto{border-radius:4px;overflow:hidden;}
  .tcx-howto-head{width:100%;height:36px;display:flex;align-items:center;justify-content:space-between;
    padding:8px 12px;background:#f0fdf4;border:0;cursor:pointer;font-size:14px;font-weight:500;color:#008236;}
  .tcx-howto-head svg{width:16px;height:16px;transition:transform .2s ease;}
  .tcx-howto.is-open .tcx-howto-head svg{transform:rotate(180deg);}
  .tcx-howto-body{display:none;background:#f0fdf4;padding:0 12px 12px;}
  .tcx-howto.is-open .tcx-howto-body{display:block;}
  .tcx-howto-body img{width:100%;border-radius:6px;display:block;}

  .tcx-card{background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:16px;
    box-shadow:0 1px 1.5px rgba(0,0,0,.1),0 1px 1px rgba(0,0,0,.1);display:flex;flex-direction:column;gap:12px;}
  .tcx-card-head{display:flex;align-items:center;justify-content:space-between;height:24px;}
  .tcx-card-title{font-size:14px;font-weight:500;color:#101828;}
  .tcx-card-del{width:24px;height:24px;padding:0;background:none;border:0;cursor:pointer;border-radius:4px;
    display:flex;align-items:center;justify-content:center;}
  .tcx-card-del svg{width:13px;height:13px;}
  .tcx-card.is-first .tcx-card-del{display:none;}
  .tcx-card-labels{display:flex;gap:24px;}
  .tcx-card-labels span{flex:1;font-size:14px;line-height:16px;font-weight:500;color:#717182;}
  .tcx-card-inputs{display:flex;align-items:center;gap:9px;}
  .tcx-inp{position:relative;flex:1;}
  .tcx-inp input{width:100%;height:36px;box-sizing:border-box;padding:4px 32px 4px 12px;border-radius:8px;
    border:1.1px solid #6d6d6d;background:#fff;font-size:16px;color:#0a0a0a;outline:none;-moz-appearance:textfield;}
  .tcx-inp input::-webkit-outer-spin-button,.tcx-inp input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}
  .tcx-inp input:focus{border-color:#00a63e;}
  .tcx-unit{position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:12px;color:#717182;pointer-events:none;}
  .tcx-x{font-size:16px;color:#717182;flex:0 0 auto;}
  .tcx-card-total{margin:0;font-size:14px;line-height:20px;color:#101828;}
  .tcx-card-total b{font-weight:600;}

  .tcx-add-area{width:100%;height:48px;border-radius:7px;background:#eaf9eb;border:1px dashed #1a7b24;color:#1a7b24;
    font-size:15px;font-weight:500;cursor:pointer;}

  .tcx-divider{border-top:1px solid #f3f4f6;}
  .tcx-swipe{margin:0;padding:0;background:none;border:0;width:100%;text-align:center;cursor:pointer;
    font-size:12px;line-height:16px;color:#717182;}
  .tcx-note{margin:0;text-align:center;font-size:12px;line-height:16px;color:#717182;}

  .tcx-atc{width:100%;height:48px;border-radius:4px;background:#00a63e;border:0;cursor:pointer;color:#fff;
    font-size:16px;font-weight:500;display:flex;align-items:center;justify-content:center;gap:8px;}
  .tcx-atc svg{width:18px;height:18px;}
  .tcx-atc:hover{background:#009137;}

  /* summary bottom sheet */
  .tcx-sheet-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:100000;display:none;}
  .tcx-sheet-backdrop.is-open{display:block;}
  .tcx-sheet{position:fixed;left:50%;bottom:0;width:min(460px,100%);box-sizing:border-box;z-index:100001;
    background:#fff;border-radius:16px 16px 0 0;padding:8px 16px 20px;box-shadow:0 -8px 24px rgba(0,0,0,.15);
    transform:translate(-50%,100%);transition:transform .3s ease;font-family:Inter,Arial,sans-serif;
    display:flex;flex-direction:column;gap:12px;}
  .tcx-sheet.is-open{transform:translate(-50%,0);}
  .tcx-grip{width:48px;height:4px;border-radius:2px;background:#d1d5dc;margin:4px auto 0;}
  .tcx-sheet-title{margin:0;font-size:18px;font-weight:600;color:#101828;}
  .tcx-sum-row{display:flex;align-items:baseline;justify-content:space-between;font-size:14px;color:#4a5565;gap:12px;}
  .tcx-sum-row .v{color:#101828;text-align:right;}
  .tcx-sum-row .v b{font-weight:600;}
  .tcx-sum-need{color:#101828;font-weight:600;}
  .tcx-sum-need .v{font-weight:600;}
  `;

  /* -------- markup -------- */
  function cardHTML(n, first) {
    return '<div class="tcx-card' + (first ? ' is-first' : '') + '">' +
      '<div class="tcx-card-head"><span class="tcx-card-title">Area ' + n + '</span>' +
        '<button class="tcx-card-del" aria-label="Remove area">' + ICON.bin + '</button></div>' +
      '<div class="tcx-card-labels"><span>Width in meters</span><span class="tcx-lbl2">Length in meters</span></div>' +
      '<div class="tcx-card-inputs">' +
        '<div class="tcx-inp"><input type="number" class="tcx-w" inputmode="decimal" min="0"><span class="tcx-unit">m</span></div>' +
        '<span class="tcx-x">×</span>' +
        '<div class="tcx-inp"><input type="number" class="tcx-l" inputmode="decimal" min="0"><span class="tcx-unit">m</span></div>' +
      '</div>' +
      '<p class="tcx-card-total">Total area: <b>0.00 m²</b></p>' +
    '</div>';
  }

  var MODAL_HTML =
    '<div class="tcx-overlay" id="tcx-overlay"></div>' +
    '<div class="tcx-modal" id="tcx-modal" role="dialog" aria-modal="true" aria-label="Tile Calculator"><div class="tcx-panel">' +
      '<header class="tcx-header"><h2 class="tcx-title">Tile Calculator</h2>' +
        '<button class="tcx-close" id="tcx-close" aria-label="Close">' + ICON.close + '</button></header>' +
      '<div class="tcx-body">' +
        '<p class="tcx-subtitle">Enter the width and length of your area in meters to calculate the quantity needed.</p>' +
        '<div class="tcx-toggle">' +
          '<button class="tcx-toggle-btn is-active" data-zone="floor">' + ICON.floor + 'Floor</button>' +
          '<button class="tcx-toggle-btn" data-zone="wall">' + ICON.wall + 'Wall</button>' +
        '</div>' +
        '<div class="tcx-howto" id="tcx-howto">' +
          '<button class="tcx-howto-head" id="tcx-howto-head" aria-expanded="false"><span>How to measure</span>' + ICON.chevron + '</button>' +
          '<div class="tcx-howto-body"><img src="' + ROOM_IMG + '" alt="Room measurement diagram" loading="lazy"></div>' +
        '</div>' +
        '<div class="tcx-cards" id="tcx-cards">' + cardHTML(1, true) + '</div>' +
        '<button class="tcx-add-area" id="tcx-add-area">Add Area</button>' +
        '<div class="tcx-divider"></div>' +
        '<button class="tcx-swipe" id="tcx-swipe">Swipe up to view full Calculation Summary</button>' +
        '<button class="tcx-atc" id="tcx-atc-main">' + ICON.cart + '<span class="tcx-atc-label">Add to cart</span></button>' +
        '<p class="tcx-note">Click "Add to Cart" to view your quote | order</p>' +
      '</div>' +
    '</div></div>' +
    '<div class="tcx-sheet-backdrop" id="tcx-sheet-backdrop"></div>' +
    '<div class="tcx-sheet" id="tcx-sheet">' +
      '<div class="tcx-grip"></div>' +
      '<button class="tcx-swipe" id="tcx-sheet-swipe">Swipe up to view full Calculation Summary</button>' +
      '<div class="tcx-divider"></div>' +
      '<h3 class="tcx-sheet-title">Summary:</h3>' +
      '<div class="tcx-sum-row"><span>Area measured</span><span class="v"><b class="tcx-s-area">0.00</b> square meters</span></div>' +
      '<div class="tcx-sum-row"><span>10% extra for installation</span><span class="v"><b class="tcx-s-extra">0.00</b> square meters</span></div>' +
      '<div class="tcx-sum-row tcx-sum-need"><span>You will need:</span><span class="v tcx-s-need">0 boxes = 0.00 square meters</span></div>' +
      '<button class="tcx-atc" id="tcx-atc-sheet">' + ICON.cart + '<span class="tcx-atc-label">Add to cart</span></button>' +
      '<p class="tcx-note">Click "Add to Cart" to view your quote | order</p>' +
    '</div>';

  /* -------- boot -------- */
  var style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);
  var host = document.createElement('div'); host.innerHTML = MODAL_HTML; document.body.appendChild(host);

  var $ = function (s) { return host.querySelector(s); };
  var overlay = $('#tcx-overlay'), modalEl = $('#tcx-modal'), cardsEl = $('#tcx-cards');
  var sheet = $('#tcx-sheet'), sheetBackdrop = $('#tcx-sheet-backdrop');
  var state = { zone: 'floor', boxes: 0, withExtra: 0, seq: 1 };

  /* -------- helpers -------- */
  function fmtM2(n) { return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function fmtInt(n) { return n.toLocaleString('en-US'); }

  function setField(sel, val) {          // push value into a real qty field + fire the events the site listens for
    var el = document.querySelector(sel);
    if (!el) return;
    el.value = val;
    ['input', 'keyup', 'change'].forEach(function (t) { el.dispatchEvent(new Event(t, { bubbles: true })); });
    if (window.jQuery) window.jQuery(el).val(val).trigger('change');
  }

  function renumber() {
    var cards = cardsEl.querySelectorAll('.tcx-card');
    cards.forEach(function (c, i) {
      c.querySelector('.tcx-card-title').textContent = 'Area ' + (i + 1);
      c.classList.toggle('is-first', i === 0);
    });
  }

  function applyZoneLabels() {
    var label = state.zone === 'wall' ? 'Height in meters' : 'Length in meters';
    host.querySelectorAll('.tcx-lbl2').forEach(function (el) { el.textContent = label; });
  }

  /* -------- the calculation (identical logic to the validated control build) -------- */
  function recalc() {
    var total = 0;
    cardsEl.querySelectorAll('.tcx-card').forEach(function (c) {
      var w = parseFloat(c.querySelector('.tcx-w').value) || 0;
      var l = parseFloat(c.querySelector('.tcx-l').value) || 0;
      var a = w * l;
      total += a;
      c.querySelector('.tcx-card-total b').textContent = fmtM2(a) + ' m²';
    });
    var extra = total * 0.1;                                  // 10% extra only
    var withExtra = total * 1.1;                             // padded area (drives boxes)
    var boxes = total > 0 ? Math.ceil(withExtra / M2_PER_BOX) : 0;

    state.boxes = boxes; state.withExtra = withExtra;

    $('.tcx-s-area').textContent = fmtM2(total);
    $('.tcx-s-extra').textContent = fmtM2(extra);
    $('.tcx-s-need').innerHTML = '<b>' + fmtInt(boxes) + ' boxes = ' + fmtM2(withExtra) + ' square meters</b>';

    var label = boxes > 0 ? 'Add ' + fmtInt(boxes) + ' boxes to cart' : 'Add to cart';
    host.querySelectorAll('.tcx-atc-label').forEach(function (el) { el.textContent = label; });
  }

  /* -------- add to cart: same wiring as the control build -------- */
  function addToCart() {
    if (!state.boxes) return;
    setField('#qty-box', state.boxes);
    setField('#area_to_cover', state.withExtra.toFixed(2));
    var form = document.getElementById('product_addtocart_form');
    if (form) { form.requestSubmit ? form.requestSubmit() : form.submit(); }
  }

  /* -------- open / close -------- */
  function open() { recalc(); overlay.classList.add('is-open'); modalEl.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  function close() { overlay.classList.remove('is-open'); modalEl.classList.remove('is-open'); closeSheet(); document.body.style.overflow = ''; }
  function openSheet() { recalc(); sheetBackdrop.classList.add('is-open'); sheet.classList.add('is-open'); }
  function closeSheet() { sheetBackdrop.classList.remove('is-open'); sheet.classList.remove('is-open'); }

  /* -------- events -------- */
  cardsEl.addEventListener('input', function (e) { if (e.target.matches('.tcx-w,.tcx-l')) recalc(); });
  cardsEl.addEventListener('click', function (e) {
    var del = e.target.closest('.tcx-card-del'); if (!del) return;
    var card = del.closest('.tcx-card');
    if (cardsEl.querySelectorAll('.tcx-card').length > 1) { card.remove(); renumber(); recalc(); }
  });
  $('#tcx-add-area').addEventListener('click', function () {
    state.seq++;
    cardsEl.insertAdjacentHTML('beforeend', cardHTML(state.seq, false));
    renumber(); applyZoneLabels(); recalc();
  });
  host.querySelectorAll('.tcx-toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      host.querySelectorAll('.tcx-toggle-btn').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      state.zone = btn.getAttribute('data-zone');
      applyZoneLabels();
    });
  });
  $('#tcx-howto-head').addEventListener('click', function () {
    var w = $('#tcx-howto'), open = w.classList.toggle('is-open');
    this.setAttribute('aria-expanded', String(open));
  });
  $('#tcx-swipe').addEventListener('click', openSheet);
  $('#tcx-sheet-swipe').addEventListener('click', closeSheet);
  sheetBackdrop.addEventListener('click', closeSheet);
  $('#tcx-close').addEventListener('click', close);
  overlay.addEventListener('click', close);
  $('#tcx-atc-main').addEventListener('click', addToCart);
  $('#tcx-atc-sheet').addEventListener('click', addToCart);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modalEl.classList.contains('is-open')) close(); });

  /* -------- take over the trigger so OUR modal opens instead of the native one -------- */
  var btn = document.getElementById('calc_btn');
  if (btn) {
    var fresh = btn.cloneNode(true);
    btn.parentNode.replaceChild(fresh, btn);
    fresh.addEventListener('click', function (e) { e.preventDefault(); open(); });
  }

  window.openTileCalc = open;
  recalc();
  console.log('[tile-calc redesign] ready — m²/box =', M2_PER_BOX, '· click "Tile Calculator" or run openTileCalc()');
})();
