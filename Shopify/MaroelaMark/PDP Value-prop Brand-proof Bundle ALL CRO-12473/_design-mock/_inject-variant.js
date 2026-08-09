/* ============================================================
   CRO-12378 — Maroelamark PDP Conversion Layer Sprint 2
   Variant injection (mirrors the Intelligems variant logic).
   Namespaced ig-pdp2-* so nothing bleeds into the control.
   Three scoped modules only:
     A. Above-the-fold value-prop line + long-description relocated below buy box
     B. Empty review slot -> honest brand-trust line; suppress "be first to review"
     C. "Gaan goed saam met" curated bundle at point of intent (below ATC)
   ============================================================ */
(function () {
  var BRAND_ORANGE = '#E99114', TEAL = '#008080', INK = '#1d1d1d', GREY = '#737373';

  /* ---- Real companion products (pulled from products.json 2026-06-23) ---- */
  var MAIN = { title: 'Magnesium Glycinate Tablets (600mg)', price: 300, img: 'https://cdn.shopify.com/s/files/1/0623/7906/5530/files/WhatsApp-Image-2025-03-14-at-18.02.06.jpg?v=1781773380' };
  var COMPANIONS = [
    { title: 'D3, Zinc, Selenium & K2', handle: 'd3-zinc-selenium-k2-tablets', price: 300, img: 'https://cdn.shopify.com/s/files/1/0623/7906/5530/files/WhatsApp-Image-2025-03-14-at-18.20.52.jpg?v=1781783059' },
    { title: 'Wild Harvested African Cranberry 100g', handle: 'african-cranberry-100g', price: 349, img: 'https://cdn.shopify.com/s/files/1/0623/7906/5530/files/ChatGPT-Image-Jun-4-2026-04_24_28-PM.png?v=1781783061' }
  ];

  function R(n) { return 'R ' + n.toFixed(2).replace('.', ','); }
  function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }

  /* ===== Element A1 — value-prop line under the title ===== */
  var titleBlock = document.querySelector('.product-block--title');
  if (titleBlock && !document.querySelector('.ig-pdp2-vp')) {
    var vp = el('<div class="product-block ig-pdp2-vp">Diep kalmte wat jou liggaam opneem. Geen dofheid, geen lakseer-drama.</div>');
    titleBlock.parentNode.insertBefore(vp, titleBlock.nextSibling);
  }

  /* ===== Element A3 — surface the real short description beneath the price
     (above in-stock); strip the inline "Short description:" / "Description:"
     labels from the rte so the relocated section reads clean. ===== */
  var priceBlock = document.querySelector('.product-block--price');
  var rte = document.querySelector('.product-description');
  var shortDescSrc = rte && rte.querySelector('.entry-content');
  if (priceBlock && shortDescSrc && !document.querySelector('.ig-pdp2-shortdesc')) {
    var sd = el('<div class="product-block ig-pdp2-shortdesc">' + shortDescSrc.innerHTML + '</div>');
    priceBlock.parentNode.insertBefore(sd, priceBlock.nextSibling);
    shortDescSrc.remove();
  }
  if (rte) {
    Array.prototype.slice.call(rte.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        var t = node.textContent.trim().toLowerCase();
        if (t === 'short description:' || t === 'description:') node.remove();
      }
    });
  }

  /* ===== Element B — empty review slot -> brand-trust line; suppress "be first" ===== */
  var rating = document.querySelector('.product-block--rating');
  // Only act when there is no real review widget content (zero-review PDP)
  if (rating && rating.innerText.trim() === '' && !document.querySelector('.ig-pdp2-trust')) {
    rating.appendChild(el('<div class="ig-pdp2-trust"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="' + TEAL + '" stroke-width="2"><path d="M12 2 4 6v6c0 5 3.5 7.5 8 10 4.5-2.5 8-5 8-10V6l-8-4z"/></svg><span>Verkoop &amp; versend deur Maroela-mark — jou bestelling is veilig.</span></div>'));
  }
  // Suppress the "be the first to review" empty state lower on the page (house rule:
  // never show an empty "write the first review" widget on a zero-review PDP — suppress
  // it entirely and lean on brand-level proof). Hide the whole review section when the
  // Judge.me widget reports zero reviews.
  document.querySelectorAll('.jdgm-widget').forEach(function (w) {
    var n = parseInt(w.getAttribute('data-number-of-reviews') || '0', 10);
    var hasReviews = n > 0 || w.querySelector('.jdgm-rev');
    if (!hasReviews) {
      var section = w.closest('.shopify-section, .product-section--container') || w;
      section.classList.add('ig-pdp2-hide');
    }
  });

  /* ===== Element A2 — move the long description OUT of the buy box into its own
     full-width section below the gallery/buy box, so the Add-to-cart button rises
     onto the first screen (Finding 1). Full description stays readable lower down —
     no clamp, no toggle. ===== */
  var descBlock = document.querySelector('.product-block--description');
  var mainSection = document.querySelector('.product--section');
  if (descBlock && mainSection && !document.querySelector('.ig-pdp2-desc-section')) {
    var descSection = el(
      '<div class="ig-pdp2-desc-section">' +
        '<div class="ig-pdp2-desc-inner">' +
          '<h2 class="ig-pdp2-desc-title">Oor hierdie produk</h2>' +
        '</div>' +
      '</div>'
    );
    mainSection.parentNode.insertBefore(descSection, mainSection.nextSibling);
    descSection.querySelector('.ig-pdp2-desc-inner').appendChild(descBlock);
  }

  /* ===== Element C — "Gaan goed saam met" curated bundle, below the ATC ===== */
  var form = document.querySelector('.product-block--form');
  if (form && !document.querySelector('.ig-pdp2-bundle')) {
    var rows = COMPANIONS.map(function (c, i) {
      return '<label class="ig-pdp2-b-row">' +
        '<input type="checkbox" class="ig-pdp2-b-cb" data-price="' + c.price + '" checked>' +
        '<img src="' + c.img + '" alt="" class="ig-pdp2-b-img">' +
        '<span class="ig-pdp2-b-name">' + c.title + '</span>' +
        '<span class="ig-pdp2-b-price">' + R(c.price) + '</span>' +
        '</label>';
    }).join('');
    var bundle = el(
      '<div class="product-block ig-pdp2-bundle">' +
        '<div class="ig-pdp2-b-head">Gaan goed saam met</div>' +
        '<label class="ig-pdp2-b-row ig-pdp2-b-this">' +
          '<input type="checkbox" checked disabled>' +
          '<img src="' + MAIN.img + '" alt="" class="ig-pdp2-b-img">' +
          '<span class="ig-pdp2-b-name">' + MAIN.title + ' <em>(hierdie item)</em></span>' +
          '<span class="ig-pdp2-b-price">' + R(MAIN.price) + '</span>' +
        '</label>' +
        rows +
        '<div class="ig-pdp2-b-foot">' +
          '<span class="ig-pdp2-b-total">Saam: <strong>' + R(MAIN.price + COMPANIONS.reduce(function (s, c) { return s + c.price; }, 0)) + '</strong></span>' +
          '<button type="button" class="ig-pdp2-b-add">Voeg almal by die mandjie</button>' +
        '</div>' +
        '<div class="ig-pdp2-b-note">Bou jou kalmte-roetine in een bestelling.</div>' +
      '</div>'
    );
    form.parentNode.insertBefore(bundle, form.nextSibling);
    // running total
    var addBtn = bundle.querySelector('.ig-pdp2-b-add'), totalEl = bundle.querySelector('.ig-pdp2-b-total strong');
    function recalc() {
      var t = MAIN.price;
      bundle.querySelectorAll('.ig-pdp2-b-cb').forEach(function (cb) { if (cb.checked) t += parseFloat(cb.dataset.price); });
      totalEl.textContent = R(t);
    }
    bundle.querySelectorAll('.ig-pdp2-b-cb').forEach(function (cb) { cb.addEventListener('change', recalc); });
  }

  /* ===== corner label (mock only) ===== */
  if (!document.querySelector('.ig-pdp2-label')) {
    var lab = el('<div class="ig-pdp2-label">VARIANT — CRO-12378 PDP Sprint 2</div>');
    document.body.appendChild(lab);
  }
})();
