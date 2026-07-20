# CRO-12483 — ARC Post-Add-to-Cart Confirmation Popup

**Client:** ARC (arcstore.co.za — Dynamicweb platform)
**Test:** Post-ATC | Cart Drawer Experience | ALL
**Scope:** All product detail pages (`/products/*`)
**Variant behaviour:** After a successful add-to-bag on a PDP, show a confirmation popup (top-right card on desktop, bottom sheet on mobile) over a dimmed backdrop, containing the added item, a live bag summary, and Checkout / Continue-shopping actions.

---

## 1. How the test is built (mechanics under test)

Understanding these five mechanics explains *why* each test case below is written the way it is.

### 1.1 Trigger — the `addToCart` dataLayer event
The site pushes a Google-Enhanced-Ecommerce event to `window.dataLayer` **only when an item is genuinely added to the cart**:

```js
{ event: 'addToCart', ecommerce: { add: { products: [{ name, id, price, brand, variant, quantity }] } } }
```

The test wraps `dataLayer.push` and shows the popup when that event is seen. Consequences we must verify:
- It fires **only on a real, successful add** — never on an out-of-stock attempt (no event is pushed), and never before a required size/shade is chosen (the event only fires *after* selection completes the add).
- A guard flag (`window.__arcAtc12483`) means the wrapper is installed once, and a `.arcAtc` presence check means only **one popup** can exist at a time.

### 1.2 The added item — read from the PDP + confirmed by the cart line
- **Name** → the clean name from the event (falls back to the PDP title node, not the raw `h1`, which also contains the brand).
- **Variant line** → read from the PDP `.product__variant-group` blocks, using the site's own label, so a size product shows **"Size: 30ML"** and a shade product shows **"Colour: DEEPGOLDEN"** (never a hardcoded "Size:").
- **Was / now price** → the PDP buy-box (`.before-price` = was, `.price--product-page-discount` / `.price--product-page` = now).
- **Image** → the matched cart order line's image (exact selected variant), falling back to the PDP gallery image.

### 1.3 The bag summary — read from the live cart feed (not the DOM)
The count and totals come from the Dynamicweb **MiniCart JSON feed** (`/Default.aspx?ID=7655&feedType=MiniCart`, URL read from `#miniCartContent[data-json-feed]`), fetched with cookies so it is *this shopper's* cart:

```json
[{ "numberofproducts": 1, "subtotalprice": "R820,00", "totalprice": "R820,00",
   "totaldiscount": "", "hasDiscount": false, "OrderLines": [ … ] }]
```

- **Count** → `numberofproducts` (whole bag, not just the added item).
- **Total** → `totalprice`.
- **Sale styling** → when `hasDiscount` is true **and** `subtotalprice ≠ totalprice`, show `subtotalprice` struck-through + `totalprice` in pink; otherwise a single black total.
- If the feed fails/times out (4s), the count falls back to the header basket counter and the total is left as best-known.

### 1.4 Placement & animation (CSS, scoped under `body.cro-12483`)
- **Desktop** (`.arcAtc--desktop`) → 404px rounded card, top-right (`top/right: 20px`), slides in from the right.
- **Mobile** (`.arcAtc--mobile`, viewport ≤ 767px) → full-width bottom sheet, rounded top corners, grab handle, slides up from the bottom.
- Dimmed backdrop (`.arcAtc__scrim`) over the rest of the page.

### 1.5 Non-destructive replacement
- The native Dynamicweb "Item added to bag" modal (`#AddedToCart`, toggled by `#AddedToCartTrigger`) is **suppressed** (hidden by CSS + trigger unchecked) so there is only one confirmation.
- Closing the popup **never** removes the item or changes the basket count — all existing bag/checkout functionality stays intact.

---

## 2. Test environment & preconditions

| Item | Value |
|---|---|
| Build URL (local) | `https://localhost:8080` via `npm exec fecli host config.json` (accept the self-signed cert in an **incognito** window) |
| Live target | All PDPs — `https://www.arcstore.co.za/products/*` |
| Known in-stock product (for add flow) | `…/products/brand/mac/sunstruck-radiant-bronzer` (shade product) |
| Known **out-of-stock-online** product | `…/products/brand/dermalogica/smart-response-serum` (use for the no-trigger case) |
| Devices | Desktop ≥ 1024px wide; Mobile ≤ 767px (e.g. iPhone 390×844) |
| Browsers | Chrome, Safari, Firefox, Edge; iOS Safari + Android Chrome |

> Start each functional case with an **empty bag** unless the case says otherwise, so counts and totals are predictable.

---

## 3. Trigger test cases

| ID | Title | Preconditions | Steps | Expected result |
|---|---|---|---|---|
| **TR-01** | Popup shows on a successful add | On an in-stock PDP | 1. Select a required size/shade (if any). 2. Click **Add to bag**. | The confirmation popup appears within ~1s. The item is genuinely added (header basket count increments). |
| **TR-02** | No popup on out-of-stock add | On an OOS-online PDP (serum) | 1. Attempt to add to bag (button reads "Out of stock online"). | **No popup appears.** No item added; basket count unchanged. |
| **TR-03** | Popup waits for the option selector | On a PDP where a size/shade must be chosen | 1. Click **Add to bag** *without* choosing a variant. 2. Then choose the variant and complete the add. | Popup **does not** appear at step 1. It appears **only** after the variant is selected and the add actually completes. |
| **TR-04** | Quick-buy / sticky buy bar add | On a PDP using the sticky/quick-buy add button | 1. Add via the sticky buy button. | Popup appears exactly as in TR-01. |
| **TR-05** | Only one popup at a time | Popup already open | 1. With the popup open, trigger another add event. | Still exactly **one** `.arcAtc` popup in the DOM (no stacking/duplication). |
| **TR-06** | Non-PDP pages | On a listing/category/home page | 1. Add an item (if quick-add exists there). | Popup does **not** appear (test is scoped to `/products/*`). |

---

## 4. Content test cases

| ID | Title | Steps | Expected result |
|---|---|---|---|
| **CT-01** | Header — tick + title | Open the popup | A circular badge (blue `#1841c4`) with a white **Font Awesome check** (`fal fa-check`) followed by the heading **"Added to your bag"**. |
| **CT-02** | Close control | Inspect the popup top-right | An **✕** close control is present and clearly tappable. |
| **CT-03** | Item — image | Add a specific variant | The thumbnail shows the **exact added variant's** image (not a generic/placeholder image). |
| **CT-04** | Item — name | Add an item | The product name matches the added product; the brand is **not** jammed into the name line. |
| **CT-05** | Item — size label (size product) | Add a size product (e.g. 30ML) | Reads **"Size: 30ML"**. |
| **CT-06** | Item — variant label (shade product) | Add a shade product | Reads **"Colour: <shade>"** (correct label, not "Size:"). |
| **CT-07** | Divider | Inspect below the item | A thin divider line separates the item from the bag summary. |
| **CT-08** | Bag summary — count label | Add 1 item to an empty bag | Left side reads **"Your bag: 1 item"** (singular). |
| **CT-09** | Bag summary — plural | Have ≥ 2 items in the bag | Left side reads **"Your bag: N items"** (plural). |
| **CT-10** | Bag summary — total | Any bag | Right side shows the **live bag total** matching the mini-cart / basket page. |
| **CT-11** | Primary button | Inspect actions | A solid **dark, full-width** **"Checkout now"** button. |
| **CT-12** | Secondary button | Inspect actions | An **outlined, full-width** **"Continue shopping"** button below the primary. |

---

## 5. Price & sale-logic test cases

| ID | Title | Preconditions | Steps | Expected result |
|---|---|---|---|---|
| **SL-01** | Item price — not on sale | Added item is not discounted | Open popup | Item price shows a single price in **black**; no strike-through. |
| **SL-02** | Item price — on sale | Added item has a "was" price | Open popup | Item price shows **was** (grey, struck-through) + **now** (pink `#ff1694`). |
| **SL-03** | Bag total — no discount in cart | Cart has no cart-level discount (`hasDiscount` false / subtotal = total) | Open popup | Bag total shows a **single black** figure; **no** strike-through. |
| **SL-04** | Bag total — discount in cart | Cart total is below subtotal (`hasDiscount` true) | Open popup | Bag total shows **subtotal** struck-through + **total** in pink `#ff1694`. |
| **SL-05** | Currency formatting | Any | Open popup | Amounts render in ARC's format (e.g. `R1 919,40`) exactly as the feed/PDP provides — no re-formatting or rounding errors. |

> **Known data limitation to confirm in QA (SL-04):** ARC bakes *product-level* sale prices into each cart line, so the feed reports `subtotal == total` (`hasDiscount` false) for a cart of on-sale items — meaning the **bag total** renders black even though each **item line** still shows its was/now. The pink struck-through **bag total** only appears for **cart-level** discounts/vouchers. This is validated with a stubbed discounted cart; verify the desired behaviour against a live in-stock **on-sale** product once one is available.

---

## 6. Live bag-data test cases

| ID | Title | Steps | Expected result |
|---|---|---|---|
| **BD-01** | Count reflects the whole bag | 1. Add item A. 2. Continue shopping. 3. Add item B. | On the 2nd popup, count reads **"Your bag: 2 items"** and total = A + B (not just B). |
| **BD-02** | Total matches the basket page | 1. Note the popup total. 2. Open the basket page. | The two totals match. |
| **BD-03** | Feed failure fallback | Simulate the mini-cart feed failing/slow | Popup still appears with the item; count falls back to the header basket counter; no JS error; popup is still closable. |
| **BD-04** | Image fallback | Add an item whose order-line image is missing | The PDP gallery image is used; the thumbnail is not broken/empty. |

---

## 7. Placement & responsive test cases

| ID | Title | Device | Expected result |
|---|---|---|---|
| **PL-01** | Desktop position | ≥ 1024px | Rounded card, **top-right** near the basket icon, over a dimmed page; slides in from the right. |
| **PL-02** | Mobile sheet | ≤ 767px | Full-width **bottom sheet**, rounded top corners, grab handle centred at the top; slides **up** from the bottom on open and **down** on close. |
| **PL-03** | Backdrop dim | Both | The rest of the page is visibly dimmed while the popup is open. |
| **PL-04** | Long content / small height | Short viewport | Desktop card scrolls internally (`max-height: calc(100vh - 40px)`) rather than overflowing the screen. |
| **PL-05** | Above all page chrome | Both | Popup sits above headers, sticky bars, chat widgets, promo strips (high z-index). |
| **PL-06** | Orientation / resize | Mobile | Rotating or resizing does not break the sheet layout. |

---

## 8. Buttons & closing test cases

| ID | Title | Steps | Expected result |
|---|---|---|---|
| **CL-01** | Checkout now | Click **Checkout now** | Popup is removed **and** the browser navigates to checkout (`/arc/arc-checkout`). |
| **CL-02** | Continue shopping | Click **Continue shopping** | Popup is removed; shopper **stays on the current PDP**; nothing else changes. |
| **CL-03** | Close ✕ | Click the ✕ | Popup is removed; shopper stays on the page. |
| **CL-04** | Backdrop click | Click/tap the dimmed area outside the panel | Popup is removed (desktop **and** mobile). |
| **CL-05** | Esc key | Press **Esc** (desktop) | Popup is removed. |
| **CL-06** | Any button dismisses | Click each button in turn | **Every** button removes the popup on click (Checkout now also navigates). |
| **CL-07** | Re-open after close | Close the popup, then add another item | A fresh popup appears with the newly-added item and updated bag summary. |

---

## 9. Integrity / regression test cases

| ID | Title | Steps | Expected result |
|---|---|---|---|
| **IN-01** | Item not removed on close | 1. Add an item. 2. Close via ✕ / Continue / backdrop. 3. Open the basket. | The item is still in the bag; basket count unchanged by the close. |
| **IN-02** | Header basket count intact | Throughout | The header basket counter behaves exactly as on control (increments on add, correct number). |
| **IN-03** | Native "Item added" modal suppressed | Add an item | The stock Dynamicweb "Item added to bag" modal does **not** appear alongside our popup (no double confirmation). |
| **IN-04** | Basket page unaffected | Open `/arc/arc-checkout` | The basket page renders and totals exactly as control; no test styling leaks in. |
| **IN-05** | Checkout flow unaffected | Complete a checkout | The full checkout flow works as on control. |
| **IN-06** | No console errors | Open dev console during the flow | No errors thrown by the test (`arcAtc` / cro-12483). |
| **IN-07** | Style isolation | Browse non-test areas | No `arcAtc` styles bleed onto the rest of the site (all rules scoped under `body.cro-12483`, classes namespaced `arcAtc__*`). |
| **IN-08** | SPA / re-navigation | Navigate between PDPs and add again | Popup keeps working; no duplicate wrappers or stale popups. |

---

## 10. Cross-browser / accessibility test cases

| ID | Title | Expected result |
|---|---|---|
| **AC-01** | Dialog semantics | Popup root has `role="dialog"`, `aria-modal="true"`, and an `aria-label`. |
| **AC-02** | Close affordance labels | ✕ control has an accessible label ("Close"). |
| **AC-03** | Keyboard | Popup can be dismissed with **Esc**; buttons are reachable/activatable by keyboard. |
| **AC-04** | Browser matrix | Renders and functions on Chrome, Safari, Firefox, Edge, iOS Safari, Android Chrome. |
| **AC-05** | Font availability | The `fal fa-check` tick renders (ARC serves Font Awesome 5 Pro); if the font ever fails, the badge is still a clean circle (no broken glyph box in place of content). |

---

## 11. Regression checklist (quick pass before sign-off)

- [ ] Add on an in-stock size product → **"Size: …"**, correct image, correct name.
- [ ] Add on an in-stock shade product → **"Colour: …"**.
- [ ] OOS-online product → **no popup**.
- [ ] Desktop = top-right card; Mobile = bottom sheet; both dim the page.
- [ ] Count singular/plural correct; total matches basket page.
- [ ] All four close methods work; every button removes the popup.
- [ ] Checkout now navigates to checkout; Continue shopping stays put.
- [ ] Item stays in bag after closing; header count intact.
- [ ] Native "Item added" modal does not appear.
- [ ] No console errors; no style bleed.
