/**
 * addToCart — Babylonstoren shop console utility
 *
 * Usage (paste into browser console on any babylonstoren.com/za page):
 *   await addToCart(6237)        // add 1 of variant 6237
 *   await addToCart(6237, 2)     // add 2 at once
 *
 * Calling multiple times increments correctly (reads current qty before each call).
 * Updates both the cart badge and the Shopping Bag mini-cart without a page refresh.
 * Safe to use alongside normal site interactions — uses the same GraphQL mutation as
 * the "Add to Bag" button and only patches the NGXS UI state; server state is always
 * updated via the real API.
 */
async function addToCart(productVariantId, quantity = 1) {
  const ENDPOINT = 'https://shop.babylonstoren.com/ecommerce/graphql';
  const STORAGE_KEY = 'x_ecommerce_shop_x-za-order-token';
  const HEADERS = { 'Content-Type': 'application/json', 'apollographql-client-name': 'ecommerce' };

  /* ── 1. Get or create cart token ── */
  let tokenData = localStorage.getItem(STORAGE_KEY);
  let token, orderId;

  if (tokenData) {
    token = JSON.parse(tokenData).token;
    orderId = JSON.parse(atob(token.split('.')[1])).sub;
  } else {
    const cartRes = await fetch(ENDPOINT, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        operationName: 'ShopOrderCreate',
        variables: { input: { locale: 'en-ZA', channelCode: 'za', referrerCode: null } },
        extensions: {},
        query: `mutation ShopOrderCreate($input: ShopCreateCartInput!) {
          shopCreateCart(input: $input) { order { id } auth { token } }
        }`
      })
    });
    const d = (await cartRes.json()).data.shopCreateCart;
    token = d.auth.token;
    orderId = d.order.id;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token }));
  }

  /* ── 2. Find the NGXS store instance ── */
  let store = null;
  getAllAngularTestabilities()[0]._destroyRef.records.forEach(rec => {
    if (!rec || store) return;
    const v = rec.value;
    if (!v || typeof v !== 'object') return;
    const p = Object.getPrototypeOf(v);
    if (p && Object.getOwnPropertyNames(p).includes('dispatch') && Object.getOwnPropertyNames(p).includes('snapshot')) {
      store = v;
    }
  });

  /* ── 3. Read current qty so repeated calls increment correctly ── */
  const currentState = store?._stateStream?.getValue();
  const currentOrder = currentState?.orderState?.order;
  const currentQty = currentOrder?.items?.find(i => i.variantId === productVariantId)?.quantity || 0;

  /* ── 4. Run the mutation (same one the site's "Add to Bag" button uses) ── */
  const mutRes = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { ...HEADERS, Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      operationName: 'ShopOrderUpdateItem',
      variables: {
        input: {
          productVariantId,
          quantity: currentQty + quantity,
          orderId,
          context: { origin: 'product-listing' }
        }
      },
      extensions: {},
      query: `mutation ShopOrderUpdateItem($input: ShopUpdateCartItemInput!) {
        shopUpdateCartItem(input: $input) {
          __typename id number state channelCode currency
          taxTotal adjustmentsTotal subtotal subtotalExcludingShipping
          shippingTotal total itemsTotal paidTotal
          isGift giftMessage instructions couponCode referrerCode checkoutAt
          items { __typename id productId productName variantId variantName quantity unitPrice total }
        }
      }`
    })
  });
  const updatedOrder = (await mutRes.json()).data?.shopUpdateCartItem;
  if (!updatedOrder) throw new Error('addToCart: mutation failed');

  /* ── 5. Patch NGXS state to update badge + mini-cart without page refresh ── */
  if (store?._stateStream) {
    let newOrder;

    if (currentOrder?.items?.length) {
      // Items already in NGXS — preserve the full item structure (media, taxAmount, taxRate,
      // unitsTotal, adjustments, shippingCategories, etc.) that the mutation response omits.
      // Only update quantity and total from the server response.
      const updatedItems = currentOrder.items.map(item => {
        const sv = updatedOrder.items?.find(i => i.variantId === item.variantId);
        return sv ? { ...item, quantity: sv.quantity, total: sv.total } : item;
      });
      // Append any brand-new items not yet in NGXS
      updatedOrder.items?.forEach(sv => {
        if (!updatedItems.find(i => i.variantId === sv.variantId)) updatedItems.push(sv);
      });
      newOrder = { ...currentOrder, ...updatedOrder, items: updatedItems };
    } else {
      // No items in NGXS yet (fresh cart or page loaded before login) — re-fetch the full
      // order using the app's own query so items include media, availability, taxRate, etc.
      const fullQuery = `query ShopOrder($id: Int!) {
        shopOrder(id: $id) {
          id number state channelCode currency taxTotal adjustmentsTotal subtotal
          subtotalExcludingShipping shippingTotal total itemsTotal paidTotal isGift
          giftMessage instructions couponCode referrerCode checkoutAt createdAt
          paymentState userId __typename
          items {
            id adjustmentsTotal productId productName variantId variantName quantity
            taxAmount taxRate total unitPrice unitsTotal productHidden source __typename
            adjustments { type label orderItemId amount __typename }
            shippingCategories { id __typename }
            media { url type __typename }
            availableRegions { id name code channelCode channelId parentId label description __typename }
            availability {
              isAvailable minAvailableDate maxAvailableDate maxAvailableQuantity unavailableReason __typename
              region { id name code channelCode channelId parentId label description __typename }
            }
            context { objectId queryIndex position queryId taxonId origin associationId shopAdId shopAdPlacement __typename }
          }
          adjustments { type label orderItemId amount __typename }
          shipment { costCalculation collection requestedSlotId methodName __typename }
        }
      }`;

      const fullRes = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { ...HEADERS, Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          operationName: 'ShopOrder',
          variables: { id: orderId },
          extensions: {},
          query: fullQuery
        })
      });
      const fullOrder = (await fullRes.json()).data?.shopOrder;
      newOrder = fullOrder || { ...updatedOrder };
    }

    store._stateStream.next({
      ...currentState,
      orderState: { ...currentState?.orderState, order: newOrder }
    });
  }

  console.log(
    `addToCart(${productVariantId}): qty = ${updatedOrder.items?.find(i => i.variantId === productVariantId)?.quantity}`,
    '| itemsTotal =', updatedOrder.itemsTotal
  );
  return updatedOrder;
}
