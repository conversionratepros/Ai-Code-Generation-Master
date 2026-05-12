(function () {
  try {
    /* main variables */
    var debug = 1;
    var variation_name = "cro-007";

    /* all Pure helper functions */
    function waitForElement(selector, trigger) {
      var interval = setInterval(function () {
        if (document && document.querySelector(selector) && document.querySelectorAll(selector).length > 0) {
          clearInterval(interval);
          trigger();
        }
      }, 50);
      setTimeout(function () { clearInterval(interval); }, 15000);
    }

    function live(selector, event, callback, context) {
      function addEvent(el, type, handler) {
        if (el.attachEvent) el.attachEvent("on" + type, handler);
        else el.addEventListener(type, handler);
      }
      this && this.Element && (function (ElementPrototype) {
        ElementPrototype.matches = ElementPrototype.matches || ElementPrototype.matchesSelector || ElementPrototype.webkitMatchesSelector || ElementPrototype.msMatchesSelector || function (selector) {
          var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
          while (nodes[++i] && nodes[i] != node);
          return !!nodes[i];
        };
      })(Element.prototype);
      function live(selector, event, callback, context) {
        addEvent(context || document, event, function (e) {
          var found, el = e.target || e.srcElement;
          while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
          if (found) callback.call(el, e);
        });
      }
      live(selector, event, callback, context);
    }

    function addClass(el, cls) {
      var el = document.querySelector(el);
      if (el) { el.classList.add(cls); }
    }

    /* ── CRO-007 constants ── */
    var ENDPOINT = 'https://shop.babylonstoren.com/ecommerce/graphql';
    var STORAGE_KEY = 'x_ecommerce_shop_x-za-order-token';
    var HEADERS = { 'Content-Type': 'application/json', 'apollographql-client-name': 'ecommerce' };

    /* ── Priority order — first 12 products to show at top ── */
    var PRIORITY_NAMES = [
      "The Gentleman's Reserve",
      "The Signature Collection",
      "Sure & Steady",
      "Scents of the Cape",
      "Office Celebration",
      "With Love Hamper",
      "Farm Quintessentials Non-alc",
      "Babel Bites",
      "Classy Collection",
      "Bites of Bliss",
      "Farm Quintessentials",
      "Golden Gourmet"
    ];

    /* ── Module state ── */
    var cro007Products = [];
    var cro007Store = null;
    var cro007GridEl = null;

    /* ── Helpers ── */

    function getNgxsStore() {
      var t = getAllAngularTestabilities()[0];
      var store = null;
      t._destroyRef.records.forEach(function (rec) {
        if (!rec || store) return;
        var v = rec.value;
        if (!v || typeof v !== 'object') return;
        var p = Object.getPrototypeOf(v);
        if (p && Object.getOwnPropertyNames(p).includes('dispatch') && Object.getOwnPropertyNames(p).includes('snapshot')) {
          store = v;
        }
      });
      return store;
    }

    function formatPrice(amountCents) {
      if (amountCents == null) return '';
      return 'R ' + (amountCents / 100).toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }

    function cloudImg(url, w, h) {
      if (!url) return '';
      return url.replace(/\/upload\/(?:v\d+\/)?/, '/upload/c_thumb,w_' + (w || 350) + ',h_' + (h || 350) + ',dpr_1,f_auto/').replace(/\.[a-z]+$/, '');
    }

    function getCartQty(variantId) {
      if (!cro007Store) return 0;
      var items = cro007Store._stateStream.getValue().orderState && cro007Store._stateStream.getValue().orderState.order && cro007Store._stateStream.getValue().orderState.order.items || [];
      var item = items.find(function (i) { return i.variantId === variantId; });
      return item ? (item.quantity || 0) : 0;
    }

    function isWishlisted(productId) {
      if (!cro007Store) return false;
      try {
        var ws = cro007Store.snapshot().wishlistState || {};
        var items = ws.items || ws.productIds || ws.products || [];
        return items.some(function (i) { return (typeof i === 'object' ? (i.id || i.productId) : i) === productId; });
      } catch (e) { return false; }
    }

    function heartSVG(filled) {
      return '<svg data-prefix="fa' + (filled ? 's' : 'l') + '" data-icon="heart" class="svg-inline--fa fa-heart fa-fw" role="img" viewBox="0 0 48 48" aria-hidden="true"><path fill="currentColor" d="M24,45.2c-0.4,0-0.8-0.2-1.1-0.5l-19.2-20c-3.9-3.9-4.9-9.9-2.4-14.8c1.5-3.1,4.2-5.4,7.4-6.4c3.3-1.1,6.7-0.8,9.8,0.7c1.2,0.6,2.4,1.4,3.3,2.4l2.2,2l2.1-2.1c5-5,13.2-5,18.2,0c1,1,1.8,2.1,2.4,3.3c2.5,5,1.5,10.9-2.4,14.8l-19.2,20C24.8,45,24.4,45.2,24,45.2z"></path></svg>';
    }

    /* ── Normalise a product name for matching ── */
    function normName(s) {
      return (s || '').toLowerCase().trim()
        .replace(/[‘’‚‛′‵ʼ]/g, "'")
        .replace(/[‐‑‒–—―−]/g, '-')
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ');
    }

    /* ── Sort products: priority names first, then original order ── */
    function sortProducts(products) {
      var prioritized = [];
      var rest = products.slice();
      PRIORITY_NAMES.forEach(function (name) {
        var normTarget = normName(name);
        var idx = rest.findIndex(function (p) { return normName(p.name) === normTarget; });
        if (idx !== -1) {
          prioritized.push(rest.splice(idx, 1)[0]);
        } else if (debug) {
          console.warn('CRO-007: no match for priority name "' + name + '"');
          console.log('CRO-007: available names:', rest.map(function(p){ return p.name; }));
        }
      });
      if (debug) {
        console.log('CRO-007 sort — matched ' + prioritized.length + '/' + PRIORITY_NAMES.length + ' priority products');
        console.table(prioritized.map(function(p, i){ return { pos: i+1, name: p.name }; }));
      }
      return prioritized.concat(rest);
    }

    /* ── Fetch all products (all pages) ── */
    function fetchAllProducts(taxonId) {
      var allProducts = [];
      var pageIndex = 0;
      var total = null;
      var pageSize = 48;
      var query = 'query ShopProductListing($taxonId: Int, $locale: String!, $channelCode: String!, $sort: ShopSortInput, $page: ShopPageInput) { items: shopProducts(taxonId: $taxonId, locale: $locale, channelCode: $channelCode, sort: $sort, page: $page) { id name slug shortDescription __typename mainMedia { url __typename } secondaryMedia { url __typename } variants { id name slug available __typename price { amount currency __typename } } } totalItemsCount: shopProductsCount(taxonId: $taxonId, channelCode: $channelCode) }';

      function fetchPage() {
        return fetch(ENDPOINT, {
          method: 'POST',
          headers: HEADERS,
          body: JSON.stringify({
            operationName: 'ShopProductListing',
            variables: { taxonId: taxonId, locale: 'en-ZA', channelCode: 'za', sort: { column: 'position', order: 'asc' }, page: { size: pageSize, index: pageIndex } },
            extensions: {},
            query: query
          })
        }).then(function (r) { return r.json(); }).then(function (json) {
          var data = json.data;
          if (!data || !data.items) return allProducts;
          if (total === null) total = data.totalItemsCount;
          allProducts = allProducts.concat(data.items);
          if (allProducts.length >= total || data.items.length < pageSize) return allProducts;
          pageIndex++;
          return fetchPage();
        });
      }
      return fetchPage();
    }

    /* ── Build a single product card HTML ── */
    function buildCard(product, cartQty, wishlisted) {
      var variant = product.variants && product.variants[0];
      if (!variant) return '';
      var variantId = variant.id;
      var price = formatPrice(variant.price ? variant.price.amount : null);
      var mainImg = cloudImg(product.mainMedia ? product.mainMedia.url : null, 350, 350);
      var secImg = cloudImg(product.secondaryMedia ? product.secondaryMedia.url : null, 350, 350);
      var productUrl = '/za/p/' + product.id + '/' + product.slug + '?origin=product-listing';
      var shortDesc = product.shortDescription || '';

      var actionsHtml;
      if (cartQty > 0) {
        actionsHtml =
          '<div class="x-product-add-to-bag cro-007-in-cart">' +
            '<div class="cro-007-qty-wrap">' +
              '<button class="cro-007-qty-btn cro-007-minus" data-variant-id="' + variantId + '" data-product-id="' + product.id + '">−</button>' +
              '<span class="cro-007-qty-val">' + cartQty + '</span>' +
              '<button class="cro-007-qty-btn cro-007-plus" data-variant-id="' + variantId + '" data-product-id="' + product.id + '">+</button>' +
            '</div>' +
          '</div>';
      } else {
        actionsHtml =
          '<div class="x-product-add-to-bag">' +
            '<button class="mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-primary add-button cro-007-add" data-variant-id="' + variantId + '" data-product-id="' + product.id + '">' +
              '<span class="mdc-button__label">Add to Bag</span>' +
            '</button>' +
          '</div>';
      }

      return (
        '<div class="x-product-card col-4 cro-007-card" data-variant-id="' + variantId + '" data-product-id="' + product.id + '">' +
          '<div class="view">' +
            '<a href="' + productUrl + '">' +
              '<div class="media">' +
                (mainImg ? '<div class="main-media"><picture><img alt="' + product.name + '" loading="lazy" width="350" height="350" src="' + mainImg + '"></picture></div>' : '') +
                (secImg  ? '<div class="secondary-media"><picture><img alt="' + product.name + '" loading="lazy" width="350" height="350" src="' + secImg  + '"></picture></div>' : '') +
              '</div>' +
            '</a>' +
            '<div class="body-content">' +
              '<header class="mat-body-2">' + product.name + '</header>' +
              '<div class="description mat-display-4">' + shortDesc + '</div>' +
              '<div class="footer">' +
                '<div class="price mat-body-1">' + price + '</div>' +
              '</div>' +
              '<div class="actions"><div class="actions-container">' +
                actionsHtml +
                '<div class="x-wishlist-action">' +
                  '<button class="mdc-icon-button mat-mdc-icon-button cro-007-wishlist-btn' + (wishlisted ? ' cro-007-wishlisted' : '') + '" ' +
                    'data-product-id="' + product.id + '" ' +
                    'title="' + (wishlisted ? 'Remove from favourites' : 'Add to favourites') + '">' +
                    heartSVG(wishlisted) +
                  '</button>' +
                '</div>' +
              '</div></div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }

    /* ── Re-render a single card in place (after qty change) ── */
    function refreshCard(variantId) {
      if (!cro007GridEl) return;
      var card = cro007GridEl.querySelector('.cro-007-card[data-variant-id="' + variantId + '"]');
      if (!card) return;
      var productId = parseInt(card.getAttribute('data-product-id'));
      var product = cro007Products.find(function (p) { return p.variants && p.variants[0] && p.variants[0].id === variantId; });
      if (!product) return;
      var qty = getCartQty(variantId);
      var wishlisted = isWishlisted(productId);
      var tmp = document.createElement('div');
      tmp.innerHTML = buildCard(product, qty, wishlisted);
      card.replaceWith(tmp.firstElementChild);
    }

    /* ── Render the full grid ── */
    function renderGrid(products) {
      cro007Products = products;
      cro007Store = getNgxsStore();

      var html = '';
      products.forEach(function (p) {
        if (!p.variants || !p.variants.length) return;
        html += buildCard(p, getCartQty(p.variants[0].id), isWishlisted(p.id));
      });

      var viewport = document.querySelector('.cdk-virtual-scroll-viewport.product-list-viewport');
      var row = document.createElement('div');
      row.className = 'product-list-row row pb-5 pb-lg-5 cro-007-grid';
      row.innerHTML = html;
      viewport.parentNode.insertBefore(row, viewport);
      cro007GridEl = row;

      /* Add body class now that grid is in DOM — this hides original list */
      addClass('body', variation_name);

      /* Subscribe to NGXS cart state changes and refresh affected cards */
      if (cro007Store && cro007Store._stateStream) {
        cro007Store._stateStream.subscribe(function (state) {
          var items = (state.orderState && state.orderState.order && state.orderState.order.items) || [];
          cro007Products.forEach(function (p) {
            if (!p.variants || !p.variants.length) return;
            var vId = p.variants[0].id;
            var serverItem = items.find(function (i) { return i.variantId === vId; });
            var serverQty = serverItem ? (serverItem.quantity || 0) : 0;
            var card = cro007GridEl.querySelector('.cro-007-card[data-variant-id="' + vId + '"]');
            if (!card) return;
            var qtyEl = card.querySelector('.cro-007-qty-val');
            var currentQty = qtyEl ? parseInt(qtyEl.textContent) : 0;
            if (!qtyEl && serverQty > 0) { refreshCard(vId); }
            else if (qtyEl && serverQty !== currentQty) { refreshCard(vId); }
            else if (qtyEl && serverQty === 0) { refreshCard(vId); }
          });
        });
      }
    }

    /* ── Cart helpers (same proven logic as addToCart.js) ── */

    function getOrCreateToken() {
      var tokenData = localStorage.getItem(STORAGE_KEY);
      if (tokenData) {
        var token = JSON.parse(tokenData).token;
        var orderId = JSON.parse(atob(token.split('.')[1])).sub;
        return Promise.resolve({ token: token, orderId: orderId });
      }
      return fetch(ENDPOINT, {
        method: 'POST', headers: HEADERS,
        body: JSON.stringify({
          operationName: 'ShopOrderCreate',
          variables: { input: { locale: 'en-ZA', channelCode: 'za', referrerCode: null } },
          extensions: {},
          query: 'mutation ShopOrderCreate($input: ShopCreateCartInput!) { shopCreateCart(input: $input) { order { id } auth { token } } }'
        })
      }).then(function (r) { return r.json(); }).then(function (json) {
        var d = json.data.shopCreateCart;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: d.auth.token }));
        return { token: d.auth.token, orderId: d.order.id };
      });
    }

    function patchNgxsCart(updatedOrder) {
      var store = cro007Store;
      if (!store || !store._stateStream) return;
      var currentState = store._stateStream.getValue();
      var currentOrder = currentState.orderState && currentState.orderState.order;
      var updatedItems;
      if (currentOrder && currentOrder.items && currentOrder.items.length) {
        updatedItems = currentOrder.items.map(function (item) {
          var sv = updatedOrder.items && updatedOrder.items.find(function (i) { return i.variantId === item.variantId; });
          return sv ? Object.assign({}, item, { quantity: sv.quantity, total: sv.total }) : item;
        });
        updatedOrder.items && updatedOrder.items.forEach(function (sv) {
          if (!updatedItems.find(function (i) { return i.variantId === sv.variantId; })) updatedItems.push(sv);
        });
        /* Remove items with qty 0 */
        updatedItems = updatedItems.filter(function (i) { return i.quantity > 0; });
      } else {
        updatedItems = (updatedOrder.items || []).filter(function (i) { return i.quantity > 0; });
      }
      var newOrder = Object.assign({}, currentOrder || {}, updatedOrder, { items: updatedItems });
      store._stateStream.next(Object.assign({}, currentState, {
        orderState: Object.assign({}, currentState.orderState, { order: newOrder })
      }));
    }

    function runMutation(variantId, newQty, orderId, token) {
      return fetch(ENDPOINT, {
        method: 'POST',
        headers: Object.assign({}, HEADERS, { Authorization: 'Bearer ' + token }),
        body: JSON.stringify({
          operationName: 'ShopOrderUpdateItem',
          variables: { input: { productVariantId: variantId, quantity: newQty, orderId: orderId, context: { origin: 'product-listing' } } },
          extensions: {},
          query: 'mutation ShopOrderUpdateItem($input: ShopUpdateCartItemInput!) { shopUpdateCartItem(input: $input) { __typename id number state channelCode currency taxTotal adjustmentsTotal subtotal subtotalExcludingShipping shippingTotal total itemsTotal paidTotal isGift giftMessage instructions couponCode referrerCode checkoutAt items { __typename id productId productName variantId variantName quantity unitPrice total } } }'
        })
      }).then(function (r) { return r.json(); }).then(function (json) {
        return json.data && json.data.shopUpdateCartItem;
      });
    }

    /* ── Add to Bag handler ── */
    function handleAddToCart(variantId, productId, btn) {
      btn.classList.add('loading');
      getOrCreateToken().then(function (auth) {
        var currentQty = getCartQty(variantId);
        return runMutation(variantId, currentQty + 1, auth.orderId, auth.token);
      }).then(function (updatedOrder) {
        if (updatedOrder) patchNgxsCart(updatedOrder);
        btn.classList.remove('loading');
      }).catch(function (e) {
        btn.classList.remove('loading');
        if (debug) console.log('CRO-007 addToCart error', e);
      });
    }

    /* ── Qty stepper handler ── */
    function handleQtyChange(variantId, productId, delta, btn) {
      var currentQty = getCartQty(variantId);
      var newQty = currentQty + delta;
      if (newQty < 0) return;
      btn.classList.add('loading');
      getOrCreateToken().then(function (auth) {
        return runMutation(variantId, newQty, auth.orderId, auth.token);
      }).then(function (updatedOrder) {
        if (updatedOrder) patchNgxsCart(updatedOrder);
        btn.classList.remove('loading');
      }).catch(function (e) {
        btn.classList.remove('loading');
        if (debug) console.log('CRO-007 qtyChange error', e);
      });
    }

    /* ── Wishlist handler ── */
    function handleWishlist(productId, btn) {
      var store = cro007Store;
      if (!store) return;
      var state = store._stateStream.getValue();
      var ws = Object.assign({}, state.wishlistState || {});
      var items = (ws.items || ws.productIds || []).slice();
      var idx = items.findIndex(function (i) { return (typeof i === 'object' ? (i.id || i.productId) : i) === productId; });
      if (idx === -1) { items.push(productId); }
      else { items.splice(idx, 1); }
      var isNowWishlisted = idx === -1;
      store._stateStream.next(Object.assign({}, state, {
        wishlistState: Object.assign({}, ws, { items: items })
      }));
      btn.classList.toggle('cro-007-wishlisted', isNowWishlisted);
      btn.innerHTML = heartSVG(isNowWishlisted);
      btn.title = isNowWishlisted ? 'Remove from favourites' : 'Add to favourites';
    }

    /* ── Bind all events via delegation ── */
    function bindEvents() {
      live('.cro-007-add', 'click', function (e) {
        e.preventDefault();
        var variantId = parseInt(this.getAttribute('data-variant-id'));
        var productId = parseInt(this.getAttribute('data-product-id'));
        handleAddToCart(variantId, productId, this);
      });

      live('.cro-007-plus', 'click', function (e) {
        e.preventDefault();
        var variantId = parseInt(this.getAttribute('data-variant-id'));
        var productId = parseInt(this.getAttribute('data-product-id'));
        handleQtyChange(variantId, productId, 1, this);
      });

      live('.cro-007-minus', 'click', function (e) {
        e.preventDefault();
        var variantId = parseInt(this.getAttribute('data-variant-id'));
        var productId = parseInt(this.getAttribute('data-product-id'));
        handleQtyChange(variantId, productId, -1, this);
      });

      live('.cro-007-wishlist-btn', 'click', function (e) {
        e.preventDefault();
        var productId = parseInt(this.getAttribute('data-product-id'));
        handleWishlist(productId, this);
      });
    }

    /* ── Init ── */
    function init() {
      waitForElement('.cdk-virtual-scroll-viewport.product-list-viewport', function () {
        var taxonMatch = location.pathname.match(/\/pl\/(\d+)\//);
        var taxonId = taxonMatch ? parseInt(taxonMatch[1]) : 61;

        /* Show loading indicator in place of the original list */
        var viewport = document.querySelector('.cdk-virtual-scroll-viewport.product-list-viewport');
        var loader = document.createElement('div');
        loader.className = 'cro-007-loading';
        loader.textContent = 'Loading products…';
        viewport.parentNode.insertBefore(loader, viewport);

        fetchAllProducts(taxonId).then(function (products) {
          loader.remove();
          var sorted = sortProducts(products);
          renderGrid(sorted);
          bindEvents();
        }).catch(function (e) {
          loader.remove();
          if (debug) console.log('CRO-007: init error', e);
        });
      });
    }

    function croEventHandkler() {
      live("selector", "click", function () { });
    }

    if (!window.cro_t_007) {
      croEventHandkler();
      window.cro_t_007 = true;
    }

    waitForElement('body', init);

  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
