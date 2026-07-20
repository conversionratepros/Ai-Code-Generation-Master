(function () {
  'use strict';
  try {
    /* ===== CRO-12483 · Post-Add-to-Cart confirmation ===== */
    var variation_name = 'cro-12483';
    var NS = 'arcAtc';
    var CHECKOUT_URL = '/arc/arc-checkout';
    var FEED_FALLBACK = '/Default.aspx?ID=7655&feedType=MiniCart';

    if (window.__arcAtc12483) return;
    window.__arcAtc12483 = true;

    /* Scope the variation styles (CSS is prefixed with body.cro-12483) */
    if (document.body) document.body.classList.add(variation_name);

    /* -------- helpers -------- */
    function text(el) { return el ? (el.textContent || '').replace(/\s+/g, ' ').trim() : ''; }

    function firstEcomImage() {
      var imgs = document.querySelectorAll('img');
      for (var i = 0; i < imgs.length; i++) {
        var s = imgs[i].currentSrc || imgs[i].src || '';
        if (/Ecom\/Brands/i.test(s)) return imgs[i];
      }
      return null;
    }

    /* Build a sized ARC image URL from a raw /Files/... path */
    function imageFromPath(path) {
      if (!path) return '';
      if (/^https?:/i.test(path) || /GetImage\.ashx/i.test(path)) return path;
      return '/Admin/Public/GetImage.ashx?Width=200&Height=200&Crop=5&DoNotUpscale=True&FillCanvas=True&Image=' + encodeURIComponent(path) + '&AlternativeImage=/Images/missing_image.jpg';
    }

    /* Selected variant line, with the PDP's own label ("Size: 30ML", "Colour: DEEPGOLDEN"),
       joining every variant dimension the product has */
    function readVariantLine() {
      var groups = document.querySelectorAll('.product__variant-group');
      var parts = [];
      for (var i = 0; i < groups.length; i++) {
        var label = text(groups[i].querySelector('.product__variant-group-name'));
        var val = text(groups[i].querySelector('.product__variant-variant-name'));
        if (val) parts.push((label ? label.replace(/:?\s*$/, ': ') : '') + val);
      }
      if (parts.length) return parts.join('  ·  ');
      return text(document.querySelector('.product__variant-variant-name'));
    }

    /* Just-added item — prefer clean values from the addToCart event, fall back to the PDP DOM */
    function readItem(prod, orderLine) {
      var d = { name: '', size: '', img: '', was: '', now: '', onSale: false };

      /* name: event name is clean ("Smart Response Serum"); PDP h1 also holds the brand, so take the title node only */
      var titleNode = document.querySelector('.product__title, .product-details__title, h1 span, h1');
      d.name = (prod && prod.name) || (orderLine && orderLine.name) || text(titleNode) || '';

      /* selected variant — the PDP shows the friendly selected value + its correct label */
      d.size = readVariantLine() || (orderLine && orderLine.variantname) || '';

      /* item price (was / now) from the PDP buy box */
      var wasEl = document.querySelector('.before-price');
      var nowEl = document.querySelector('.price--product-page-discount')
        || document.querySelector('.price--product-page:not(.price--product--custom-option)')
        || document.querySelector('.price--product-page');
      d.onSale = !!wasEl;
      d.was = wasEl ? text(wasEl) : '';
      d.now = nowEl ? text(nowEl) : (prod && prod.price != null ? 'R' + prod.price : '');

      /* image: the matched order line reflects the exact selected variant; else the PDP gallery */
      if (orderLine && orderLine.image) {
        d.img = imageFromPath(orderLine.image);
      } else {
        var imgEl = document.querySelector('.product__image img, [class*=gallery] img, .slick-current img') || firstEcomImage();
        d.img = imgEl ? (imgEl.currentSrc || imgEl.src) : '';
      }
      return d;
    }

    /* Live bag summary — count + totals + cart-level discount state, straight from the mini-cart feed */
    function fetchCart(cb) {
      var mcEl = document.getElementById('miniCartContent');
      var url = (mcEl && mcEl.getAttribute('data-json-feed')) || FEED_FALLBACK;
      var done = false;
      var timer = setTimeout(function () { if (!done) { done = true; cb(null); } }, 4000);
      try {
        fetch(url, { credentials: 'include' })
          .then(function (r) { return r.json(); })
          .then(function (j) {
            if (done) return; done = true; clearTimeout(timer);
            cb(Array.isArray(j) ? j[0] : j);
          })
          .catch(function () { if (!done) { done = true; clearTimeout(timer); cb(null); } });
      } catch (e) { if (!done) { done = true; clearTimeout(timer); cb(null); } }
    }

    function findOrderLine(cart, prod) {
      if (!cart || !cart.OrderLines || !cart.OrderLines.length) return null;
      if (prod && prod.id) {
        for (var i = 0; i < cart.OrderLines.length; i++) {
          if (String(cart.OrderLines[i].id) === String(prod.id)) return cart.OrderLines[i];
        }
      }
      return cart.OrderLines[cart.OrderLines.length - 1]; /* most recently added */
    }

    /* -------- suppress the native Dynamicweb "Item added to bag" modal (we replace it) -------- */
    function suppressNative() {
      var trig = document.getElementById('AddedToCartTrigger');
      if (trig) trig.checked = false;
    }

    /* -------- render -------- */
    function close(root) {
      if (!root || !root.parentNode) return;
      root.parentNode.removeChild(root);
      document.removeEventListener('keydown', root.__esc);
    }

    function showConfirmation(prod) {
      if (document.querySelector('.' + NS)) return; /* one popup at a time */
      suppressNative();

      var isMobile = window.matchMedia('(max-width: 767px)').matches;

      /* render immediately with item data; the bag summary fills in once the feed resolves */
      var item = readItem(prod, null);

      var root = document.createElement('div');
      root.className = NS + ' ' + NS + (isMobile ? '--mobile' : '--desktop') + (item.onSale ? ' ' + NS + '--sale' : '');
      root.setAttribute('role', 'dialog');
      root.setAttribute('aria-modal', 'true');
      root.setAttribute('aria-label', 'Added to your bag');

      var itemPrice = item.onSale
        ? '<span class="' + NS + '__price"><span class="' + NS + '__was"></span><span class="' + NS + '__now"></span></span>'
        : '<span class="' + NS + '__price"><span class="' + NS + '__now"></span></span>';

      root.innerHTML =
        '<div class="' + NS + '__scrim" data-arc-close></div>' +
        '<div class="' + NS + '__panel">' +
          '<span class="' + NS + '__grab" aria-hidden="true"></span>' +
          '<button type="button" class="' + NS + '__close" data-arc-close aria-label="Close">&times;</button>' +
          '<div class="' + NS + '__head">' +
            '<span class="' + NS + '__tick" aria-hidden="true"><i class="fal fa-check"></i></span>' +
            '<span class="' + NS + '__title">Added to your bag</span>' +
          '</div>' +
          '<div class="' + NS + '__item">' +
            '<span class="' + NS + '__thumb"><img alt=""></span>' +
            '<span class="' + NS + '__meta">' +
              '<span class="' + NS + '__name"></span>' +
              '<span class="' + NS + '__size"></span>' +
              itemPrice +
            '</span>' +
          '</div>' +
          '<div class="' + NS + '__divider" aria-hidden="true"></div>' +
          '<div class="' + NS + '__summary">' +
            '<span class="' + NS + '__summary-count">Your bag</span>' +
            '<span class="' + NS + '__summary-total"></span>' +
          '</div>' +
          '<div class="' + NS + '__actions">' +
            '<a class="' + NS + '__btn ' + NS + '__btn--primary" href="' + CHECKOUT_URL + '">Checkout now</a>' +
            '<button type="button" class="' + NS + '__btn ' + NS + '__btn--secondary" data-arc-close>Continue shopping</button>' +
          '</div>' +
        '</div>';

      /* fill item */
      setText(root, '.' + NS + '__name', item.name);
      var sizeEl = root.querySelector('.' + NS + '__size');
      if (item.size) { sizeEl.textContent = item.size; } else { sizeEl.style.display = 'none'; }
      setText(root, '.' + NS + '__now', item.now);
      if (item.onSale) setText(root, '.' + NS + '__was', item.was);
      var img = root.querySelector('.' + NS + '__thumb img');
      if (img && item.img) { img.src = item.img; img.alt = item.name; }

      document.body.appendChild(root);

      /* close interactions: any button (plus scrim / ✕ / Esc) removes the popup.
         The primary CTA is a link, so remove the popup and then follow it to checkout. */
      root.addEventListener('click', function (ev) {
        var link = ev.target.closest('a.' + NS + '__btn');
        if (link) {
          ev.preventDefault();
          var href = link.getAttribute('href');
          close(root);
          if (href) window.location.href = href;
          return;
        }
        if (ev.target.closest('[data-arc-close]') || ev.target.closest('.' + NS + '__btn')) {
          ev.preventDefault();
          close(root);
        }
      });
      root.__esc = function (ev) { if (ev.key === 'Escape') close(root); };
      document.addEventListener('keydown', root.__esc);

      /* fill the live bag summary from the feed */
      fetchCart(function (cart) {
        if (!root.parentNode) return; /* closed before it resolved */
        renderSummary(root, cart, prod, item);
      });
    }

    function renderSummary(root, cart, prod, item) {
      var countEl = root.querySelector('.' + NS + '__summary-count');
      var totalEl = root.querySelector('.' + NS + '__summary-total');

      /* refine the item image/size once the order line is known */
      if (cart) {
        var ol = findOrderLine(cart, prod);
        if (ol) {
          if (!item.img && ol.image) { var im = root.querySelector('.' + NS + '__thumb img'); if (im) im.src = imageFromPath(ol.image); }
          var szEl = root.querySelector('.' + NS + '__size');
          if (szEl && szEl.style.display === 'none' && ol.variantname) { szEl.textContent = ol.variantname; szEl.style.display = ''; }
        }
      }

      var count = cart && cart.numberofproducts != null ? cart.numberofproducts : null;
      if (count == null) {
        var cc = document.querySelector('.js-mini-cart-counter-content');
        count = cc ? parseInt(cc.getAttribute('data-count') || '0', 10) : 1;
      }
      countEl.textContent = 'Your bag: ' + count + (count === 1 ? ' item' : ' items');

      var subtotal = cart && cart.subtotalprice ? cart.subtotalprice : '';
      var total = cart && cart.totalprice ? cart.totalprice : (cart && cart.subtotalprice ? cart.subtotalprice : '');
      /* cart is "on sale" when the payable total is below the subtotal (a discount exists) */
      var cartOnSale = !!(cart && cart.hasDiscount && subtotal && total && subtotal !== total);

      if (cartOnSale) {
        totalEl.innerHTML = '<span class="' + NS + '__bag-was"></span><span class="' + NS + '__bag-now ' + NS + '__bag-now--sale"></span>';
        totalEl.querySelector('.' + NS + '__bag-was').textContent = subtotal;
        totalEl.querySelector('.' + NS + '__bag-now').textContent = total;
      } else {
        totalEl.innerHTML = '<span class="' + NS + '__bag-now"></span>';
        totalEl.querySelector('.' + NS + '__bag-now').textContent = total || subtotal || '';
      }
    }

    function setText(root, sel, val) { var el = root.querySelector(sel); if (el) el.textContent = val || ''; }

    /* -------- trigger: fire only on a successful add-to-cart (GA dataLayer event) -------- */
    function handleEvent(e) {
      if (e && e.event === 'addToCart' && e.ecommerce && e.ecommerce.add) {
        var prod = (e.ecommerce.add.products || [])[0] || null;
        showConfirmation(prod);
      }
    }

    var dl = (window.dataLayer = window.dataLayer || []);
    var originalPush = dl.push;
    dl.push = function () {
      try { for (var i = 0; i < arguments.length; i++) handleEvent(arguments[i]); } catch (err) {}
      return originalPush.apply(this, arguments);
    };
  } catch (e) {
    /* swallow — never break the host page */
  }
})();
