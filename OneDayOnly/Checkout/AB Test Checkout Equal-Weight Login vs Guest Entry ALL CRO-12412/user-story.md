# AB Test | Checkout | Equal-Weight Login vs Guest Entry | ALL | CRO-12412

**Client:** OneDayOnly
**Page:** Checkout entry step (`/checkout`, no `step=`/`isGuest=` params)
**Devices:** ALL — same tab layout/behaviour on desktop and mobile
**Design:** https://odo-checkout-two-tab-cro12412.lovable.app/
**Page recon:** see [../checkout-page-reference.md](../checkout-page-reference.md)

## Background

On the current checkout entry step, guest checkout is the last option on the page. A new customer must scroll past the full login form, the Google and Facebook login options, and the Create Account link before finding the "Checkout as guest" button at the very bottom (below the fold on mobile). Giving guest checkout equal weight with login — as one of two tabs at the top of the step — lets new customers start their order immediately, expected to reduce drop-off at the start of checkout and increase purchase rate.

## Summary of changes

- Replace the single login layout with two equal-weight tabs: **"Checkout as guest"** (left, active on load) and **"Log in"** (right).
- Guest tab: Email Address, First Name, Last Name + full-width **CONTINUE TO DELIVERY**, then supporting copy ("Prefer to save your details? Tap Log in above.") and the existing guest disclaimer with its T&C link.
- Log in tab: all existing login functionality unchanged and in order (email, password + show-toggle, forgot password, LOG IN, Continue with Google/Facebook, Or, Create Account). No disclaimer on this tab.
- The standalone bottom "Checkout as guest" button + its "Or" divider + disclaimer fall away (hidden, not removed).
- Valid guest submit continues exactly like the native guest button (programmatic click → `?isGuest=true&step=cart`), and the captured details are pre-populated into the native `guestEmail` / `guestFirstName` / `guestLastName` fields on the next step (fill-once, stays editable).
- Validation on CONTINUE TO DELIVERY: email format + non-empty names; inline errors in the native style (11px Open Sans #e50e62 under the field): "Enter your email" / "Enter a valid email address" / "Enter your first name" / "Enter your last name". Invalid → no navigation.

## Activation rules (global.js)

- Fire only on the entry step for signed-out users — helpers in [global-fire.js](global-fire.js):
  - `cro_getUserStatus()` / `cro_waitForUserStatus()` — reusable login/logout check off the GTM dataLayer `page_load` user object (`"signedIn"`/`"signedOut"`).
  - `test_Checkout_Equal_Weight_Login_vs_Guest_Entry_CRO12412()` — experiments-object fire function; Convert experience id still to be filled in (`EXPERIMENT_ID`).
- Logged-in users are redirected by the site to `/checkout?step=cart`, guests continue to `/checkout?step=cart&isGuest=true` — the variation never shows on either (URL check + body-class strip + inline `display:none` on injected HTML).

## Implementation notes

- Nothing removed from control. JS tags native elements (`data-cro-12412-heading`, `data-cro-12412-login-el`, `data-cro-12412-gone`) and all show/hide is scoped under `body.cro-12412` (+ `cro-12412-login-tab` for the tab state). Emotion `css-*` classes and React ids are unstable — only `name` attrs, text matching, and structure are used.
- Injected tab strip + guest panel carry inline `display:none`; CSS under the body class reveals them (SPA safety on all other pages).
- Disclaimer in the guest tab is a live clone of the native disclaimer node (copy, styling, and T&C href stay in sync with control).
- A 400ms sync interval keeps the variation alive through React late hydration / login-error re-renders, and strips body classes off-entry (SPA navigation).
- Prefill uses the React native value setter + `input`/`change` events (plain `.value=` is ignored by React). Poll window ~3min because on mobile the guest fields only render on the delivery step.
- Styling tokens measured from the live site: brand blue #0093d0, tab baseline #dfe5eb, muted #6b7a86, error #e50e62; Montserrat 700 for labels/tabs/button, Open Sans for input/copy text; pill button radius 50px, height 45px.

## Status

- Built + live dry-run verified (Playwright injection on production entry step) 2026-07-29.
- Convert deployment QA'd via `?utm_medium=qa` 2026-07-29: 17/18 — activation, tabs, guest flow, prefill, SPA cleanup, and no-leakage on home/category/PDP all pass on desktop + mobile.
- ⚠️ The variation JS pasted into Convert had `startSync()` commented out (manual-QA version). Repo file re-enabled — **re-paste variation.js into Convert before launch**, else SPA back-navigation to the entry step shows control to bucketed variation users (data dilution) and the late-hydration guard is off.
- Pending: client test account to verify the logged-in redirect assumption end-to-end.
