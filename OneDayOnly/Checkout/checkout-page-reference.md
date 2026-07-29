# OneDayOnly Checkout — QA Reference

> Compiled 2026-07-29 from live Playwright exploration of `https://www.onedayonly.co.za/checkout`
> (desktop 1440×900 Chrome UA + mobile 390×844 iPhone UA, headless Chromium).
> Screenshots in [screenshots/](screenshots/). No orders were placed; exploration stopped before payment.

---

## 1. Platform & rendering

| Fact | Detail |
|---|---|
| Stack | Next.js SPA + Apollo GraphQL client (`window.__APOLLO_CLIENT__`), Emotion CSS-in-JS |
| SSR data | `__NEXT_DATA__.props.pageProps` on `/checkout` is only `{"layout":{"hideFooter":true}}` — **everything renders client-side** |
| `__NEXT_DATA__.page` | `/checkout` |
| Cart source of truth | Apollo cache: `Cart:<cartId>` entry with `items` → `SimpleCartItem:<id>` refs. Cart id NOT in `document.cookie`/localStorage (httpOnly or in-memory) |
| Site version marker | `v111` bottom-left of checkout pages |
| Footer | Hidden on checkout (only the WhatsApp help strip remains); top nav + deals countdown header stay visible on desktop |
| Global.js hooks | Client global JS sets `<html pagepath="checkout">` (incl. query string if present) and `cro-datapath` attr — usable as CSS scoping hooks |

## 2. Flow map

```
/checkout (any cart state, not logged in)
  └─ ENTRY STEP: "Log in" page — email+password, social, CREATE ACCOUNT, CHECKOUT AS GUEST
       ├─ [CHECKOUT AS GUEST] → /checkout?isGuest=true&step=cart
       │     ├─ cart EMPTY  → "Pushing around an empty trolley, huh?" + FILL THAT THING UP
       │     ├─ DESKTOP + items → single page: 1. Your Details / 2. Recipient Details /
       │     │                    CONFIRM ADDRESS / 3. Payment (14 methods, disabled until
       │     │                    address confirmed) + "My Cart" right rail w/ CONTINUE TO PAYMENT
       │     └─ MOBILE + items → 3-step wizard (Cart → Delivery → Payment):
       │           step=cart      My Cart + CONTINUE TO DELIVERY
       │           step=delivery  "You have not set your delivery address yet" + SET ADDRESS
       │                          + totals + CONTINUE TO PAYMENT
       │           step=payment   (not captured — requires a set address)
       └─ [LOG IN] → logged-in checkout (NOT captured — needs test credentials)
```

- The **entry step renders even with an empty cart** — the trolley-empty check only happens after choosing guest (or presumably login).
- `BACK` button on the guest step returns to the entry step. Banner on guest step: *"You have selected to Checkout as Guest"*.
- Desktop keeps everything on one page; the mobile `step` query param drives the wizard (`step=cart|delivery|payment`).

## 3. Entry step (login vs guest) — the CRO-12412 surface

Current hierarchy (identical structure desktop & mobile; see `desktop-entry-login-guest.png`, `mobile-entry-login-guest.png`):

1. `h2` "Log in" with active-tab underline
2. Email Address (`input[name="email"]`, `type=email`) + Password (`input[name="password"]`, eye toggle)
3. `FORGOT PASSWORD?` (button, right-aligned)
4. **LOG IN** — the only full-width primary CTA (`button[type="submit"]`)
5. "Continue with" → Google + Facebook buttons
6. `Or` divider → **CREATE ACCOUNT** (text-style button)
7. `Or` divider → **CHECKOUT AS GUEST** (text-style button) + disclaimer: *"By using guest checkout you will not be able to have a history of your purchases."*

Key observations:

- **Guest entry is bottom-of-stack, text-only** — on mobile it sits below the fold on a 844px viewport. Login gets the only solid CTA. (This is the imbalance CRO-12412 addresses.)
- Empty login submit → inline field errors *"Enter your email"* / *"Enter your password"*; no page navigation.
- **Google button loads async** via Google Identity Services and was **absent on some loads** (present desktop run 1, missing in the empty-cart context run). Its label follows the Google/browser locale (rendered in Bengali under our headless run) — never assert on its text.
- Facebook button label: "Log in with Facebook".

## 4. Desktop guest checkout (single page, `?isGuest=true&step=cart`)

See `desktop-guest-checkout-full.png`. Left column:

| Section | Fields (`name` attr) |
|---|---|
| 1. Your Details | `guestFirstName`, `guestLastName`, `guestEmail` |
| — | checkbox "RECIPIENT IS THE SAME AS GUEST" (React-generated id `:rN:` — unstable) |
| 2. Recipient Details | `firstName`, `lastName`, `phone` (SA flag, +27 prefix), `label` (Location nickname, optional), `organisation` (Company, optional), `addressLine1`, `addressLine2`, suburb (autocomplete input, unstable id), `specialInstructions` (textarea) |
| — | **CONFIRM ADDRESS** (full-width blue) · "Having trouble?" helper · "Send this as a gift" checkbox |
| 3. Payment | 14 radios, all `name="selectedPaymentMethod"`, **greyed out until address confirmed**: Visa/Mastercard (Stitch), SnapScan, Google Pay, Ozow, Capitec Pay, Samsung Pay, Zapper, Payflex, Amex, Pay by bank (Stitch), eBucks, Discovery Miles, EFT, Mobicred. Footer: "Your data is secure and encrypted" |

Right rail — **My Cart**:

- Urgency copy: *"Hurry! Stuff in your cart can sell out before you finalise your order. Checkout before someone else does."*
- Line item: brand, product name, **ETA: X-Y working days**, unit price, qty `<select id="quantity-<itemId>">` (options 1–10), trash icon, line total
- Subtotal / **Total** / "VAT included" amount (e.g. R456 on R3,499)
- Green **CONTINUE TO PAYMENT** CTA + T&Cs line + "Quick and easy returns. Read More"
- Empty-submit validation appears above the CTA in pink: *"Oh no! You need to add an address to continue"* (`desktop-guest-validation-address.png`)

## 5. Mobile guest checkout (wizard)

- Progress header: Cart → Delivery → Payment icons; active step green (`mobile-step-cart.png`).
- **step=cart**: "My Cart" + urgency copy, line item w/ ETA + qty select + trash, "Cart total — Excludes shipping", **CONTINUE TO DELIVERY**.
- **step=delivery**: empty state *"You have not set your delivery address yet"* + **SET ADDRESS** (opens address form), Cart total / Total / VAT included, **CONTINUE TO PAYMENT** (`mobile-step-delivery.png`).
- Note: cart total says "Excludes shipping" on the cart step; shipping presumably added after address.

## 6. Selector strategy (important)

- **All classes are Emotion hashes (`css-xxxxxxx`) — regenerated per deploy. Never target them.**
- Input/React ids like `email-:r0:`, `quantity-71210941`, `1367397-:R2kiq…:` are **generated — unstable across sessions/renders**.
- Stable anchors:
  - `input[name=…]`: `email`, `password`, `guestFirstName`, `guestLastName`, `guestEmail`, `firstName`, `lastName`, `phone`, `label`, `organisation`, `addressLine1`, `addressLine2`, `specialInstructions`, `selectedPaymentMethod`
  - `button[type="submit"]` = LOG IN on entry step
  - Button **text matching** (the client global JS does exactly this): `LOG IN`, `CREATE ACCOUNT`, `CHECKOUT AS GUEST`, `CONTINUE TO PAYMENT`, `CONTINUE TO DELIVERY`, `SET ADDRESS`, `CONFIRM ADDRESS`, `BACK`, `FILL THAT THING UP`
  - `html[pagepath="checkout"]` (global.js) — but it includes the query string when present (`checkout?isGuest=true&step=cart`), so use `[pagepath^="checkout"]`
  - URL params: `isGuest=true`, `step=cart|delivery|payment`
- React re-renders replace nodes: follow repo patterns — `waitForElement` double-chain, MutationObserver on a stable ancestor, double-inject guards, late-hydration restore.

## 7. QA gotchas & bugs observed

1. **Required-option products silently fail ATC.** "I WANT ONE!" does nothing (no error, no redirect in-page) if the Option `<select>` isn't chosen. Programmatically setting the native select + dispatching `change`/`input` does NOT register (React controlled select) — in automation, either use Playwright `selectOption` with real events or **pick a product without options** (check `__NEXT_DATA__.props.pageProps.product.customizableOptions` is empty).
2. **Entry page shows with an empty cart** — a variation must not assume items exist at the entry step. The empty-trolley screen only appears after the guest branch.
3. **Mobile hydration is slow** — first run rendered header/footer with a blank content area for 5–10s; a 4s wait was not enough, 10–12s was. Any mobile variation JS must tolerate long waits (default 15s `waitForElement` timeout is fine, but don't shorten it).
4. **Newsletter popup interrupts mobile checkout** (`mobile-newsletter-popup-interrupt.png`): full-screen pink "SUBSCRIBE … R100 VOUCHER" modal appeared over the guest cart step ~seconds after landing. It will sit on top of any variation UI and contaminate screenshots/session recordings. Close via its X button.
5. **Google login button is async and locale-dependent** — sometimes absent entirely; text not English-stable. Any "equal-weight" layout must not depend on its presence for alignment (flex/grid must not collapse when it's missing).
6. **Cookie banner** ("Cookies: nom nom nom." + GOT IT) overlays bottom-right on desktop, bottom sheet on mobile.
7. **Chat widget** (green bubble + "Hi there. Click here to chat with us!") floats bottom-right on the guest step, overlapping the right rail area on smaller desktop viewports.
8. **Deals countdown timer** in the header keeps running on checkout — screenshots/diffs will never be pixel-identical.
9. Header cart badge (green "1") is the only immediate ATC feedback visible; no mini-cart drawer opened on PDP ATC in headless runs.
10. Qty select allows 1–10 per line item on the guest step (`quantity-<itemId>`).

## 8. Scenario matrix (verified)

| State | URL result | What renders |
|---|---|---|
| Guest, empty cart → `/checkout` | stays `/checkout` | Full Log in entry step |
| Guest, items → `/checkout` | stays `/checkout` | Full Log in entry step (identical) |
| Guest branch, empty cart | `/checkout?isGuest=true` | Empty trolley + FILL THAT THING UP |
| Guest branch, items, desktop | `/checkout?isGuest=true&step=cart` | Single-page checkout (all 3 sections + rail) |
| Guest branch, items, mobile | same URL | Wizard step=cart |
| Mobile CONTINUE TO DELIVERY | `…&step=delivery` | Address empty state + totals |
| Logged-in checkout | — | **NOT captured — needs test account credentials** |
| Payment step / after CONFIRM ADDRESS | — | Not captured (stopped before creating addresses/orders) |

## 9. Automation recipe (Playwright)

```js
// 1. Find an options-free product (homepage links → /products/*), else ATC no-ops:
//    window.__NEXT_DATA__.props.pageProps.product.customizableOptions   // must be empty/absent
// 2. Click by text — classes are useless:
//    [...document.querySelectorAll('button')].find(b => /i want one/i.test(b.innerText)).click()
// 3. VERIFY the cart before proceeding (Apollo cache is source of truth):
//    const cache = window.__APOLLO_CLIENT__.cache.extract();
//    Object.keys(cache).some(k => /^Cart:/.test(k) && (cache[k].items || []).length)
// 4. goto /checkout, wait long (mobile: 10s+), dismiss cookie banner + newsletter modal,
//    then click CHECKOUT AS GUEST by text.
```

Known-good options-free test product during exploration: `frosty-ice-cream-and-frozen-treat-maker-with-3-pint-cups-20260728` (deal URLs rotate daily — re-find one each session).

## 10. Detecting login state from variation JS

Verified live (signed-out) + confirmed in the `_app` bundle (2026-07-29):

- **Primary — GTM dataLayer (verified live):** every `page_load` push carries a `user` object:
  `{ userStatus: "signedOut", userID: "" }` when logged out; the bundle shows the signed-in shape is
  `{ userStatus: "signedIn", userID, subscribed, first_name, last_name, email, mobile_number }`.

  ```js
  function getUserStatus() {
    try {
      var dl = window.dataLayer || [];
      for (var i = dl.length - 1; i >= 0; i--) {
        if (dl[i] && dl[i].user && dl[i].user.userStatus) return dl[i].user.userStatus;
      }
    } catch (e) { }
    return null; // dataLayer not ready yet — poll, it appears with the page_load event
  }
  ```

- **Secondary — redux-persist localStorage:** auth lives in a Redux store (NOT Apollo; store not exposed on `window`), persisted per-slice with keys `persist:customer`, `persist:cart`, `persist:order`, `persist:return`. **No `persist:` keys exist at all while signed out** (verified) — the slices only appear once written. After login, `persist:customer` should contain `authToken` (login/socialLogin/createCustomer mutations all return `authToken` + `customer` and dispatch them into the store). Treat presence of a parsed non-null authToken as signed-in; unverified on the logged-in side.
- **Weak — `sHid` cookie:** set via js-cookie on every login path (`login`, `socialLogin`, `createCustomer` → `customer.sHid`). No removal on logout found in the bundle, so it may linger after logout — do not use alone.
- **DOM tell:** the header MY ACCOUNT component renders a greeting variant only when `isLoggedIn && customer.firstName` (from the bundle). Signed-out dropdown items: Track My Order / My Account / My Orders / Log a Return / Our Banking Details.
- **Checkout-specific:** the login/guest entry gate itself only renders for signed-out users — a logged-in user presumably skips straight to the checkout form (unverified, needs credentials). For CRO-12412 this means the entry-step surface is inherently signed-out-only.
- Logout is a GraphQL `logout` mutation; after it, the next `page_load` push should read `signedOut`.

## 11. Open items for future tests

- **Logged-in flow** unverified — request a staging/test account from the client before building anything that touches the login branch.
- Payment step (mobile `step=payment`, desktop enabled payment radios) unverified — requires confirming an address; decide with the client how far QA may go on production.
- CREATE ACCOUNT flow unverified (won't create accounts on production without sign-off).
- Whether `step=delivery`/`step=payment` deep-links are guarded when visited directly on desktop.
