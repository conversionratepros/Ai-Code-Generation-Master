(function () {
  try {
    /* main variables */
    var debug = 0;
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
    var USER_TOKEN_KEY = 'x_ecommerce_shop_x-user-token';
    var HEADERS = { 'Content-Type': 'application/json', 'apollographql-client-name': 'ecommerce' };

    /* ── Priority order — first 12 products to show at top ── */
    var PRIORITY_NAMES = [
      "The Gentleman's Reserve",
      "The Signature Collection",
      "Sure & Steady",
      "Scents of the Cape",
      "Office Celebration",
      "With Love Hamper",
      "Farm Quintessentials - Non-alcoholic",
      "Babel Bites",
      "Classy Collection",
      "Bites of Bliss",
      "Farm Quintessentials",
      "Golden Gourmet"
    ];

    /* ── Module state ── */
    var cro007Products = [];
    var cro007Store = null;
    var cro007NgZone = null;
    var cro007GridEl = null;
    var cro007StateSub = null;
    var cro007LastRegionCode = undefined; // undefined = not yet initialised

    /* ── Helpers ── */

    function isUserLoggedIn() {
      if (!cro007Store) return false;
      try {
        var auth = cro007Store._stateStream.getValue().authState;
        return !!(auth && auth.loggedInUser);
      } catch (e) { return false; }
    }

    function getUserToken() {
      try {
        var data = localStorage.getItem(USER_TOKEN_KEY);
        if (!data) return null;
        return JSON.parse(data).token || null;
      } catch (e) { return null; }
    }

    function getNgxsStore() {
      var t = getAllAngularTestabilities()[0];
      if (t._ngZone && !cro007NgZone) cro007NgZone = t._ngZone;
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
      var transforms = 'c_thumb,w_' + (w || 350) + ',h_' + (h || 350) + ',dpr_1,f_auto';
      var result = url.replace(/\/upload\/(?:v\d+\/)?/, '/upload/' + transforms + '/').replace(/\.[a-z0-9]+$/i, '');
      if (url.includes('/video/upload/')) result += '.jpg';
      return result;
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
        var ws = cro007Store._stateStream.getValue().wishlistState || {};
        var ids = ws.wishlistProductIds || ws.items || ws.productIds || [];
        return ids.some(function (i) { return (typeof i === 'object' ? (i.id || i.productId) : i) === productId; });
      } catch (e) { return false; }
    }

    function heartSVG() {
      return '<fa-icon icon="heart" class="ng-fa-icon heart icon-size-x-large"><svg data-prefix="fal" data-icon="heart" class="svg-inline--fa fa-heart fa-undefined fa-fw fa-pull-undefined" role="img" viewBox="0 0 48 48" aria-hidden="true"><path fill="currentColor" d="M24,45.2c-0.4,0-0.8-0.2-1.1-0.5l-19.2-20c-3.9-3.9-4.9-9.9-2.4-14.8c1.5-3.1,4.2-5.4,7.4-6.4  c3.3-1.1,6.7-0.8,9.8,0.7c1.2,0.6,2.4,1.4,3.3,2.4l2.2,2l2.1-2.1c5-5,13.2-5,18.2,0c1,1,1.8,2.1,2.4,3.3c2.5,5,1.5,10.9-2.4,14.8  l-19.2,20C24.8,45,24.4,45.2,24,45.2z"></path></svg></fa-icon>';

      // return '<svg data-prefix="fal" data-icon="heart" class="svg-inline--fa fa-heart fa-undefined fa-fw fa-pull-undefined" role="img" viewBox="0 0 48 48" aria-hidden="true"><path fill="currentColor" d="M24,45.2c-0.4,0-0.8-0.2-1.1-0.5l-19.2-20c-3.9-3.9-4.9-9.9-2.4-14.8c1.5-3.1,4.2-5.4,7.4-6.4  c3.3-1.1,6.7-0.8,9.8,0.7c1.2,0.6,2.4,1.4,3.3,2.4l2.2,2l2.1-2.1c5-5,13.2-5,18.2,0c1,1,1.8,2.1,2.4,3.3c2.5,5,1.5,10.9-2.4,14.8  l-19.2,20C24.8,45,24.4,45.2,24,45.2z"></path></svg>';
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
          console.log('CRO-007: available names:', rest.map(function (p) { return p.name; }));
        }
      });
      if (debug) {
        console.log('CRO-007 sort — matched ' + prioritized.length + '/' + PRIORITY_NAMES.length + ' priority products');
        console.table(prioritized.map(function (p, i) { return { pos: i + 1, name: p.name }; }));
      }
      return prioritized.concat(rest);
    }

    /* ── Fetch all products (all pages) ── */
    function fetchAllProducts(taxonId) {
      var allProducts = [];
      var pageIndex = 0;
      var total = null;
      var pageSize = 48;
      var query = 'query ShopProductListing($taxonId: Int, $locale: String!, $channelCode: String!, $sort: ShopSortInput, $page: ShopPageInput) { items: shopProducts(taxonId: $taxonId, locale: $locale, channelCode: $channelCode, sort: $sort, page: $page) { id name slug shortDescription __typename mainMedia { url __typename } secondaryMedia { url __typename } variants { id name slug available __typename price { amount currency __typename } availableRegions { id parentId code __typename } availability { isAvailable unavailableReason __typename } } } totalItemsCount: shopProductsCount(taxonId: $taxonId, channelCode: $channelCode) }';

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

      var isAvailable = variant.availability ? !!variant.availability.isAvailable : !!variant.available;

      var regionLabelMap = { 'za': 'SA', 'za-cpt': 'CPT', 'za-jhb': 'JHB' };
      var regions = variant.availableRegions || [];
      var regionBadgesHtml = '';
      if (regions.length > 0) {
        regionBadgesHtml = '<div class="cro-007-regions">';
        regions.forEach(function (r) {
          var label = regionLabelMap[(r.code || '').toLowerCase()] || r.code;
          regionBadgesHtml += '<span class="cro-007-region-badge">' + label + '</span>';
        });
        regionBadgesHtml += '</div>';
      }

      var actionsHtml;
      if (!isAvailable) {
        actionsHtml =
          '<div class="x-product-add-to-bag">' +
          '<a href="' + productUrl + '" class="mdc-button mdc-button--outlined mat-mdc-outlined-button mat-unthemed notify-button cro-007-notify">' +
          '<fa-icon _ngcontent-ng-c3143085172="" icon="bell" xiconsize="medium" class="ng-fa-icon icon-size-medium"><svg data-prefix="fal" data-icon="bell" class="svg-inline--fa fa-bell fa-undefined fa-fw fa-pull-undefined" role="img" viewBox="0 0 18.31 20.57" aria-hidden="true"><path fill="currentColor" d="M18.1,17.25s-1.23-1.29-1.23-7.39c0-2.06-.8-4-2.26-5.46-1.32-1.32-3.03-2.11-4.86-2.24V.6c0-.34-.27-.6-.6-.6s-.6.26-.6.6v1.56c-1.83.13-3.54.92-4.86,2.24-1.46,1.46-2.27,3.4-2.27,5.46,0,5.65-1.28,7.46-1.29,7.47-.14.18-.17.42-.07.63.1.21.31.34.54.34h6.11c-.07.13-.08.27-.04.42.16.53.49,1,.93,1.34.45.33,1,.51,1.55.51s1.11-.18,1.55-.51c.44-.34.77-.81.93-1.34.04-.15.03-.29-.04-.42h6.11c.25,0,.49-.15.58-.39.08-.24.02-.5-.18-.66ZM10.48,18.38c-.08.28-.26.54-.5.72-.47.35-1.18.35-1.66,0-.23-.18-.41-.44-.49-.72-.01-.03-.02-.06-.04-.08h2.73s-.03.05-.04.08ZM1.58,17.1c.45-1.13,1.05-3.35,1.05-7.24,0-1.74.67-3.38,1.91-4.62,1.23-1.23,2.87-1.91,4.61-1.91s3.38.68,4.61,1.91c1.24,1.24,1.92,2.88,1.92,4.62,0,4.03.5,6.15.96,7.24H1.58Z"></path></svg></fa-icon>' +
          '<span class="mdc-button__label">Notify Me</span>' +
          '</a>' +
          '</div>';
      } else if (cartQty > 0) {
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

      var wishlistBtn =
        '<div class="x-wishlist-action">' +
        '<button class="mdc-icon-button mat-mdc-icon-button mat-mdc-button-base mat-unthemed size-normal cro-007-wishlist-btn' + (wishlisted ? ' cro-007-wishlisted active' : '') + '" ' +
        'data-product-id="' + product.id + '" ' +
        'title="' + (wishlisted ? 'Remove from favourites' : 'Add to favourites') + '">' +
        '<span class="mat-mdc-button-persistent-ripple mdc-icon-button__ripple"></span>' +
        '<span class="ng-fa-icon heart icon-size-x-large">' + heartSVG() + '</span>' +
        '<span class="mat-focus-indicator"></span>' +
        '<span class="mat-mdc-button-touch-target"></span>' +
        '</button>' +
        '</div>';

      return (
        '<div class="x-product-card col-4 cro-007-card" data-variant-id="' + variantId + '" data-product-id="' + product.id + '">' +
        '<div class="view">' +
        '<a href="' + productUrl + '">' +
        '<div class="media">' +
        (mainImg ? '<div class="main-media"><picture><img alt="' + product.name + '" loading="lazy" width="350" height="350" src="' + mainImg + '"></picture></div>' : '') +
        (secImg ? '<div class="secondary-media"><picture><img alt="' + product.name + '" width="350" height="350" src="' + secImg + '"></picture></div>' : '') +
        '</div>' +
        '</a>' +
        '<div class="body-content">' +
        '<header class="mat-body-2">' + product.name + '</header>' +
        '<div class="description mat-display-4">' + shortDesc + '</div>' +
        (isAvailable ? regionBadgesHtml : '<div class="cro-007-oos-badge">Out Of Stock</div>') +
        '<div class="footer">' +
        '<div class="price mat-body-1">' + price + '</div>' +
        '</div>' +
        '<div class="actions"><div class="actions-container">' +
        actionsHtml +
        wishlistBtn +
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

      /* Remove any existing grid from a previous IIFE run (cro007GridEl may be null in a new closure) */
      var existing = document.querySelector('.cro-007-grid');
      if (existing) existing.remove();

      var html = '';
      products.forEach(function (p) {
        if (!p.variants || !p.variants.length) return;
        html += buildCard(p, getCartQty(p.variants[0].id), isWishlisted(p.id));
      });

      var viewport = document.querySelector('.cdk-virtual-scroll-viewport.product-list-viewport');
      var row = document.createElement('div');
      row.className = 'product-list-row row pb-5 pb-lg-5 cro-007-grid';
      row.setAttribute('style', 'display: none;');
      row.innerHTML = html;
      viewport.parentNode.insertBefore(row, viewport);
      cro007GridEl = row;

      /* Subscribe to NGXS state changes — handles both cart qty and region changes */
      if (cro007StateSub) { try { cro007StateSub.unsubscribe(); } catch (e) { } }
      cro007LastRegionCode = undefined;
      if (cro007Store && cro007Store._stateStream) {
        cro007StateSub = cro007Store._stateStream.subscribe(function (state) {
          /* Re-render every card when the delivery region changes */
          var newRegionCode = (state.regionState && state.regionState.region && state.regionState.region.code) || null;
          if (newRegionCode !== cro007LastRegionCode) {
            cro007LastRegionCode = newRegionCode;
            if (cro007GridEl) {
              cro007Products.forEach(function (p) {
                if (p.variants && p.variants.length) refreshCard(p.variants[0].id);
              });
            }
            return;
          }

          /* Cart quantity changes */
          var items = (state.orderState && state.orderState.order && state.orderState.order.items) || [];
          cro007Products.forEach(function (p) {
            if (!p.variants || !p.variants.length) return;
            var vId = p.variants[0].id;
            var serverItem = items.find(function (i) { return i.variantId === vId; });
            var serverQty = serverItem ? (serverItem.quantity || 0) : 0;
            var card = cro007GridEl && cro007GridEl.querySelector('.cro-007-card[data-variant-id="' + vId + '"]');
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

    /* ── Cart helpers ── */

    function getOrCreateToken() {
      var tokenData = localStorage.getItem(STORAGE_KEY);
      if (tokenData) {
        var parsed = JSON.parse(tokenData);
        var token = parsed.token;
        /* Angular stores orderId directly in the object; fall back to JWT sub if absent */
        var orderId = parsed.orderId || JSON.parse(atob(token.split('.')[1])).sub;
        return Promise.resolve({ token: token, orderId: orderId });
      }
      return fetch(ENDPOINT, {
        method: 'POST', headers: HEADERS,
        body: JSON.stringify({
          operationName: 'ShopOrderCreate',
          variables: { input: { locale: 'en-ZA', channelCode: 'za', referrerCode: null } },
          extensions: {},
          /* Request all auth fields so localStorage is stored in the same shape Angular
             expects — orderId, channelCode, expiresAt etc. Without this Angular can't
             read back the order on cart-open or page refresh. */
          query: 'mutation ShopOrderCreate($input: ShopCreateCartInput!) { shopCreateCart(input: $input) { order { id } auth { token orderId channelCode expiresAt issuedAt __typename } } }'
        })
      }).then(function (r) { return r.json(); }).then(function (json) {
        var d = json.data.shopCreateCart;
        /* Store the full auth object so Angular can load the order correctly */
        localStorage.setItem(STORAGE_KEY, JSON.stringify(d.auth));
        return { token: d.auth.token, orderId: d.auth.orderId || d.order.id };
      });
    }

    /* shopUpdateCartItem may return only the mutated item, not the full cart.
       We merge the server response into the current state, but use modifiedVariantId
       to know which item to DROP if the server omits it (qty became 0). */
    function patchNgxsCart(updatedOrder, modifiedVariantId) {
      var store = cro007Store;
      if (!store || !store._stateStream) return;
      var currentState = store._stateStream.getValue();
      var currentOrder = currentState.orderState && currentState.orderState.order;
      var serverItems = updatedOrder.items || [];
      var updatedItems;

      if (currentOrder && currentOrder.items && currentOrder.items.length) {
        updatedItems = currentOrder.items
          .map(function (item) {
            var sv = serverItems.find(function (i) { return i.variantId === item.variantId; });
            /* Merge all server fields into the existing item — this preserves any fields
               the server returns (media, availability, etc.) while keeping any client-only
               fields from the current item that the server didn't return. */
            if (sv) return Object.assign({}, item, sv);
            /* Item absent from server response — only remove it if it's the one we just
               modified (server dropped it because qty reached 0). Preserve all others. */
            if (item.variantId === modifiedVariantId) return null;
            return item;
          })
          .filter(function (item) { return item && (item.quantity || 0) > 0; });

        /* Add the modified item if it is brand-new (not in currentOrder) */
        serverItems.forEach(function (sv) {
          if ((sv.quantity || 0) > 0 && !updatedItems.find(function (i) { return i.variantId === sv.variantId; })) {
            updatedItems.push(sv);
          }
        });
      } else {
        updatedItems = serverItems.filter(function (i) { return (i.quantity || 0) > 0; });
      }

      var newOrder = Object.assign({}, currentOrder || {}, updatedOrder, { items: updatedItems });
      var newState = Object.assign({}, currentState, {
        orderState: Object.assign({}, currentState.orderState, { order: newOrder })
      });
      /* Emit inside Angular zone so OnPush components (cart drawer) detect the change */
      if (cro007NgZone && cro007NgZone.run) {
        cro007NgZone.run(function () { store._stateStream.next(newState); });
      } else {
        store._stateStream.next(newState);
      }
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
        if (debug && json.errors) console.log('CRO-007 mutation errors:', JSON.stringify(json.errors));
        return json.data && json.data.shopUpdateCartItem;
      });
    }

    /* Fetch the full order using the same query Angular uses after page load.
       The mutation response omits fields like item.media and item.availability that
       the cart drawer template needs — so we fetch the complete order afterwards. */
    function fetchFullOrder(orderId, token) {
      return fetch(ENDPOINT, {
        method: 'POST',
        headers: Object.assign({}, HEADERS, { Authorization: 'Bearer ' + token }),
        body: JSON.stringify({
          operationName: 'ShopOrder',
          variables: { id: orderId },
          extensions: {},
          query: 'query ShopOrder($id: Int!) { shopOrder(id: $id) { id number state channelCode currency taxTotal adjustmentsTotal subtotal subtotalExcludingShipping shippingTotal total itemsTotal paidTotal isGift giftMessage instructions couponCode referrerCode checkoutAt createdAt paymentState items { id adjustmentsTotal adjustments { type label orderItemId amount __typename } productId productName variantId variantName quantity taxAmount taxRate total unitPrice unitsTotal shippingCategories { id __typename } media { url type __typename } availableRegions { id name code channelCode channelId parentId label description __typename } availability { isAvailable region { id name code channelCode channelId parentId label description __typename } minAvailableDate maxAvailableDate maxAvailableQuantity unavailableReason __typename } productHidden source context { objectId queryIndex position queryId taxonId origin associationId shopAdId shopAdPlacement __typename } __typename } adjustments { type label orderItemId amount __typename } userId shippingAddress { id type alias firstName lastName email phoneNumber street complex suburb city businessName postalCode province country instructions hash coordinates isDefaultShippingAddress isDefaultBillingAddress recipientHash __typename } shippingAddressRegion { id name code channelCode channelId parentId label description definitions { id center boundary __typename } __typename } shipment { costCalculation collection requestedSlotId methodName __typename } __typename } }'
        })
      }).then(function (r) { return r.json(); }).then(function (json) {
        if (debug && json.errors) console.log('CRO-007 shopOrder errors:', JSON.stringify(json.errors));
        return json.data && json.data.shopOrder;
      }).catch(function (e) {
        if (debug) console.log('CRO-007 fetchFullOrder error:', e.message);
        return null;
      });
    }

    /* ── Add to Bag handler ── */
    function handleAddToCart(variantId, btn) {
      /* Delivery area gate — match control behaviour for region-restricted products */
      if (cro007Store) {
        var product = cro007Products.find(function (p) { return p.variants && p.variants[0] && p.variants[0].id === variantId; });
        var variant = product && product.variants && product.variants[0];
        var regions = (variant && variant.availableRegions) || [];
        var needsRegion = regions.some(function (r) { return r.parentId !== null; });
        var currentState = cro007Store._stateStream.getValue();
        var regionState = currentState.regionState || {};
        if (needsRegion && !regionState.region) {
          var newState = Object.assign({}, currentState, {
            regionState: Object.assign({}, regionState, { openOverlay: true })
          });
          if (cro007NgZone && cro007NgZone.run) {
            cro007NgZone.run(function () { cro007Store._stateStream.next(newState); });
          } else {
            cro007Store._stateStream.next(newState);
          }
          return;
        }
      }

      btn.classList.add('loading');
      var savedAuth = null;
      getOrCreateToken().then(function (auth) {
        savedAuth = auth;
        var currentQty = getCartQty(variantId);
        return runMutation(variantId, currentQty + 1, auth.orderId, auth.token);
      }).then(function (updatedOrder) {
        /* Patch immediately with basic data so the card stepper appears */
        if (updatedOrder) patchNgxsCart(updatedOrder, variantId);
        btn.classList.remove('loading');
        /* Then fetch the full order to give the cart drawer complete item data */
        return savedAuth ? fetchFullOrder(savedAuth.orderId, savedAuth.token) : null;
      }).then(function (fullOrder) {
        if (fullOrder) patchNgxsCart(fullOrder, variantId);
      }).catch(function (e) {
        btn.classList.remove('loading');
        if (debug) console.log('CRO-007 addToCart error', e);
      });
    }

    /* ── Qty stepper handler ── */
    function handleQtyChange(variantId, delta, btn) {
      var currentQty = getCartQty(variantId);
      var newQty = currentQty + delta;
      if (newQty < 0) return;
      btn.classList.add('loading');
      var savedAuth = null;
      getOrCreateToken().then(function (auth) {
        savedAuth = auth;
        return runMutation(variantId, newQty, auth.orderId, auth.token);
      }).then(function (updatedOrder) {
        if (updatedOrder) patchNgxsCart(updatedOrder, variantId);
        btn.classList.remove('loading');
        return savedAuth ? fetchFullOrder(savedAuth.orderId, savedAuth.token) : null;
      }).then(function (fullOrder) {
        if (fullOrder) patchNgxsCart(fullOrder, variantId);
      }).catch(function (e) {
        btn.classList.remove('loading');
        if (debug) console.log('CRO-007 qtyChange error', e);
      });
    }

    /* ── Wishlist handler ── */
    function handleWishlist(productId, btn) {
      if (!isUserLoggedIn()) {
        window.location.href = 'https://shop.babylonstoren.com/login?redirect=%2Fza%2Fpl%2F61%2Fcategories%2Fgifting%2Fhampers';
        return;
      }
      var store = cro007Store;
      if (!store) return;
      var state = store._stateStream.getValue();
      var ws = Object.assign({}, state.wishlistState || {});
      var ids = (ws.wishlistProductIds || []).slice();
      var idx = ids.indexOf(productId);
      var isNowWishlisted = idx === -1;

      /* Optimistic UI update */
      if (isNowWishlisted) { ids.push(productId); }
      else { ids.splice(idx, 1); }
      store._stateStream.next(Object.assign({}, state, {
        wishlistState: Object.assign({}, ws, { wishlistProductIds: ids })
      }));
      btn.classList.toggle('cro-007-wishlisted', isNowWishlisted);
      btn.classList.toggle('active', isNowWishlisted);
      var iconSpan = btn.querySelector('.ng-fa-icon');
      if (iconSpan) iconSpan.innerHTML = heartSVG();
      btn.title = isNowWishlisted ? 'Remove from favourites' : 'Add to favourites';

      /* Fire real API mutation */
      var token = getUserToken();
      var opName = isNowWishlisted ? 'ShopAddWishlistItem' : 'ShopRemoveWishlistItem';
      var query = isNowWishlisted
        ? 'mutation ShopAddWishlistItem($productId: Int!) { shopAddWishlistItem(productId: $productId) { productId __typename } }'
        : 'mutation ShopRemoveWishlistItem($productId: Int!) { shopRemoveWishlistItem(productId: $productId) }';
      fetch(ENDPOINT, {
        method: 'POST',
        headers: Object.assign({}, HEADERS, token ? { Authorization: 'Bearer ' + token } : {}),
        body: JSON.stringify({ operationName: opName, variables: { productId: productId }, extensions: {}, query: query })
      }).then(function (r) { return r.json(); })
        .then(function (json) {
          if (debug) console.log('CRO-007 wishlist response:', JSON.stringify(json));
          if (json.errors) {
            /* Revert optimistic update on error */
            var cur = store._stateStream.getValue();
            var curWs = Object.assign({}, cur.wishlistState || {});
            var revertIds = (curWs.wishlistProductIds || []).slice();
            if (isNowWishlisted) { var ri = revertIds.indexOf(productId); if (ri !== -1) revertIds.splice(ri, 1); }
            else { revertIds.push(productId); }
            store._stateStream.next(Object.assign({}, cur, { wishlistState: Object.assign({}, curWs, { wishlistProductIds: revertIds }) }));
            btn.classList.toggle('cro-007-wishlisted', !isNowWishlisted);
            btn.classList.toggle('active', !isNowWishlisted);
            if (iconSpan) iconSpan.innerHTML = heartSVG();
            btn.title = !isNowWishlisted ? 'Remove from favourites' : 'Add to favourites';
          }
        })
        .catch(function (e) {
          if (debug) console.log('CRO-007 wishlist error:', e.message);
        });
    }

    /* ── Bind all events via delegation from the grid element ── */
    /* Delegating from the grid (not document) means listeners die when the grid
       is removed — no stale closures survive SPA re-navigation. */
    function bindEvents() {
      live('.cro-007-add', 'click', function (e) {
        e.preventDefault();
        var variantId = parseInt(this.getAttribute('data-variant-id'));
        handleAddToCart(variantId, this);
      }, cro007GridEl);

      live('.cro-007-plus', 'click', function (e) {
        e.preventDefault();
        var variantId = parseInt(this.getAttribute('data-variant-id'));
        handleQtyChange(variantId, 1, this);
      }, cro007GridEl);

      live('.cro-007-minus', 'click', function (e) {
        e.preventDefault();
        var variantId = parseInt(this.getAttribute('data-variant-id'));
        handleQtyChange(variantId, -1, this);
      }, cro007GridEl);

      live('.cro-007-wishlist-btn', 'click', function (e) {
        e.preventDefault();
        var productId = parseInt(this.getAttribute('data-product-id'));
        handleWishlist(productId, this);
      }, cro007GridEl);
    }

    /* ── Init ── */
    function init() {
      addClass('body', variation_name);

      waitForElement('.cdk-virtual-scroll-viewport.product-list-viewport', function () {
        /* Remove any leftover grid from a previous init (SPA re-navigation) */
        if (cro007GridEl && cro007GridEl.parentNode) {
          cro007GridEl.remove();
          cro007GridEl = null;
        }

        var taxonMatch = location.pathname.match(/\/pl\/(\d+)\//);
        var taxonId = taxonMatch ? parseInt(taxonMatch[1]) : 61;

        /* Show loading indicator in place of the original list */
        var viewport = document.querySelector('.cdk-virtual-scroll-viewport.product-list-viewport');
        var loader = document.createElement('div');
        loader.className = 'cro-007-loading';
        loader.textContent = 'Loading products…';
        if (!document.querySelector('.cro-007-loading')) {
          viewport.parentNode.insertBefore(loader, viewport);
        }



        fetchAllProducts(taxonId).then(function (products) {
          loader.remove();

          var sorted = sortProducts(products);
          renderGrid(sorted);
          bindEvents();
          watchSortFilter();

          var totalCards = cro007GridEl ? cro007GridEl.querySelectorAll('.cro-007-card').length : 0;
          var notifyCards = cro007GridEl ? cro007GridEl.querySelectorAll('.cro-007-notify').length : 0;
          var addCards = cro007GridEl ? cro007GridEl.querySelectorAll('.cro-007-add').length : 0;
          console.log('CRO-007 grid rendered — total cards:', totalCards, '| Add to Bag:', addCards, '| Notify Me:', notifyCards);
        }).catch(function (e) {
          loader.remove();
          document.body.classList.remove(variation_name);
          if (debug) console.log('CRO-007: init error', e);
        });
      });
    }

    function watchSortFilter() {
      var lastSearch = window.location.search;
      var interval = setInterval(function () {
        if (window.location.search !== lastSearch) {
          clearInterval(interval);
          /* User changed sort/filter — revert to native control */
          document.body.classList.remove(variation_name);
          if (cro007GridEl) cro007GridEl.style.display = 'none';
        }
      }, 200);
    }



    waitForElement('body', init);

  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();