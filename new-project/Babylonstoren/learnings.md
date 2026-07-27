# Babylonstoren — Technical Learnings

Accumulated from CRO-007 and subsequent tests. Update this file whenever you discover something new about the site's stack, selectors, or API.

---

## Stack Overview

- **Framework:** Angular 17+ SPA
- **State:** NGXS (`_stateStream` BehaviorSubject)
- **API:** GraphQL at `/graphql`
- **Media:** Cloudinary
- **Icons:** Font Awesome (custom elements `<fa-icon>`)
- **UI library:** Angular Material (`mat-select`, `mat-dialog`, `mdc-button`)

---

## NGXS Store Access

Access the store and NgZone from variation JS (run after Angular bootstraps):

```js
var t = getAllAngularTestabilities()[0];
var recs = Array.from(t._destroyRef.records.values());
var cro007Store = (recs.find(function(r) { return r && r.value && r.value._stateStream; }) || {}).value || null;
var cro007NgZone = (recs.find(function(r) { return r && r.value && r.value.run && r.value._inner; }) || {}).value || null;
```

To read current state:
```js
var state = cro007Store._stateStream.getValue();
```

To update state (triggers Angular change detection):
```js
var newState = Object.assign({}, state, { someKey: newValue });
if (cro007NgZone && cro007NgZone.run) {
  cro007NgZone.run(function() { cro007Store._stateStream.next(newState); });
} else {
  cro007Store._stateStream.next(newState);
}
```

---

## Key NGXS State Keys

| Key | What it contains |
|---|---|
| `authState.loggedInUser` | Logged-in user object — `null` if guest |
| `wishlistState.wishlistProductIds` | Array of wishlisted product IDs (integers) |
| `wishlistState.wishlistTempItem` | Set to trigger guest login modal natively |
| `regionState.region` | Current delivery region — `null` if not yet set |
| `regionState.openOverlay` | Set to `true` to open the delivery area selector modal |
| `orderState.order.shippingAddressRegion` | Current order's shipping region |
| `taxonState.products` | Fallback product list from state (if GraphQL intercept misses it) |

---

## Auth / JWT

User JWT lives in localStorage under a compound key:

```js
var raw = localStorage.getItem('x_ecommerce_shop_x-user-token');
var token = raw ? JSON.parse(raw).token : null;
// Use as: Authorization: 'Bearer ' + token
```

Check login status via state (more reliable than token presence):
```js
var loggedIn = !!(cro007Store._stateStream.getValue().authState || {}).loggedInUser;
```

---

## GraphQL Endpoint & Headers

```js
var ENDPOINT = 'https://shop.babylonstoren.com/graphql';
var HEADERS = {
  'Content-Type': 'application/json',
  'x-channel-token': 'za',      // channel for South Africa
  'x-currency': 'ZAR',
};
// Add Authorization header when user is logged in
```

---

## GraphQL Mutations

### Cart — Add Item
```graphql
mutation ShopAddCartItem($variantId: Int!, $quantity: Int!, $orderToken: String) {
  shopAddCartItem(variantId: $variantId, quantity: $quantity, orderToken: $orderToken) {
    id token __typename
  }
}
```
Variables: `{ variantId, quantity: 1, orderToken: <from orderState.order.token> }`

### Wishlist — Add
```graphql
mutation ShopAddWishlistItem($productId: Int!) {
  shopAddWishlistItem(productId: $productId) { productId __typename }
}
```

### Wishlist — Remove
```graphql
mutation ShopRemoveWishlistItem($productId: Int!) {
  shopRemoveWishlistItem(productId: $productId)
}
```
Variables: `{ productId: <Int> }` — no order token needed, just Bearer token in header.

### Product Listing Query
`availableRegions` lives at the **variant** level, NOT at product level (schema error if placed at product root):

```graphql
query ShopProductListing(...) {
  items: shopProducts(...) {
    id name slug shortDescription __typename
    mainMedia { url __typename }
    secondaryMedia { url __typename }
    variants {
      id name slug available __typename
      price { amount currency __typename }
      availableRegions { id parentId code __typename }  # ← variant level only
    }
  }
  totalItemsCount: ...
}
```

---

## Delivery Area Gate

Products where `variant.availableRegions` contains entries with `parentId !== null` (e.g. CPT, JHB sub-regions) require a delivery area selection before add-to-cart. Trigger the native Angular modal:

```js
var product = cro007Products.find(function(p) {
  return p.variants && p.variants[0] && p.variants[0].id === variantId;
});
var regions = (product && product.variants && product.variants[0] && product.variants[0].availableRegions) || [];
var needsRegion = regions.some(function(r) { return r.parentId !== null; });
var regionState = cro007Store._stateStream.getValue().regionState || {};

if (needsRegion && !regionState.region) {
  // Open Angular's delivery overlay — do not show a custom modal
  var state = cro007Store._stateStream.getValue();
  cro007Store._stateStream.next(Object.assign({}, state, {
    regionState: Object.assign({}, regionState, { openOverlay: true })
  }));
  return; // stop — don't add to cart
}
```

---

## Font Awesome Icons

- The site uses `<fa-icon>` Angular custom elements, not `<i class="fa-...">` 
- Always use `data-prefix="fal"` (Font Awesome Light / outline) — never `fas`
- Visual "filled" state is toggled via an `active` CSS class on the button + `cro-007-wishlisted` class — the SVG path itself does not change
- `fa-icon.icon-size-x-large` CSS targets the `<FA-ICON>` custom element directly with `width`/`height` (~25px). A plain `<span>` wrapper does NOT inherit this — you must add explicit CSS in variation.css:
  ```css
  body.cro-007 .cro-007-wishlist-btn .ng-fa-icon,
  body.cro-007 .cro-007-wishlist-btn .ng-fa-icon svg {
    width: 25px !important;
    height: 25px !important;
  }
  ```

Heart icon SVG (use this exact markup):
```html
<fa-icon icon="heart" class="ng-fa-icon heart icon-size-x-large">
  <svg data-prefix="fal" data-icon="heart" class="svg-inline--fa fa-heart fa-undefined fa-fw fa-pull-undefined" role="img" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="currentColor" d="M24,45.2c-0.4,0-0.8-0.2-1.1-0.5l-19.2-20c-3.9-3.9-4.9-9.9-2.4-14.8c1.5-3.1,4.2-5.4,7.4-6.4  c3.3-1.1,6.7-0.8,9.8,0.7c1.2,0.6,2.4,1.4,3.3,2.4l2.2,2l2.1-2.1c5-5,13.2-5,18.2,0c1,1,1.8,2.1,2.4,3.3c2.5,5,1.5,10.9-2.4,14.8  l-19.2,20C24.8,45,24.4,45.2,24,45.2z"></path>
  </svg>
</fa-icon>
```

---

## Cloudinary Media

Transform helper — handles both image and video URLs:

```js
function cloudImg(url, w, h) {
  if (!url) return '';
  var transforms = 'c_thumb,w_' + (w || 350) + ',h_' + (h || 350) + ',dpr_1,f_auto';
  var result = url
    .replace(/\/upload\/(?:v\d+\/)?/, '/upload/' + transforms + '/')
    .replace(/\.[a-z0-9]+$/i, '');
  // Video URLs need .jpg appended to return a poster frame
  if (url.includes('/video/upload/')) result += '.jpg';
  return result;
}
```

Video products have URLs like `.../video/upload/...mp4`. Stripping the extension without adding `.jpg` produces a black image.

---

## Sort / Filter Detection

The sort dropdown (`mat-select[formcontrolname="sortBy"]` inside `x-product-listing-sort`) updates `window.location.search` when changed. Poll for URL changes to detect sort/filter interaction and revert to control:

```js
function watchSortFilter() {
  var lastSearch = window.location.search;
  var interval = setInterval(function() {
    if (window.location.search !== lastSearch) {
      clearInterval(interval);
      document.body.classList.remove(variation_name);
      if (cro007GridEl) cro007GridEl.style.display = 'none';
    }
  }, 200);
}
```

---

## Login / Auth Redirect

Unauthenticated users trying to wishlist: redirect to login with a return URL.

```js
window.location.href = 'https://shop.babylonstoren.com/login?redirect=%2Fza%2Fpl%2F61%2Fcategories%2Fgifting%2Fhampers';
```

Adjust the `redirect` query param per the target page.

---

## Test Credentials (Dev / Debug Only)

| Field | Value |
|---|---|
| Email | testcheckrat@gmail.com |
| Password | RAT4321!!! |
