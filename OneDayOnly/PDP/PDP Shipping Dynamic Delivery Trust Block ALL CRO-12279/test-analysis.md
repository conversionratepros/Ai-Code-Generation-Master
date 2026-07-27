# Test Analysis — CRO-12279
## AB Test | Shipping - Dynamic Delivery Trust Block | ALL

---

## 1. What the test does

Replaces the existing "Excludes shipping" + "ETA: X-Y working days" text on OneDayOnly PDPs with a three-line delivery trust block in the buy box:

1. **Promoted delivery estimate** — "Delivery in [X-Y] working days", bold, near-black. The range is read live from the product's own delivery data, never hardcoded.
2. **On-time proof pill** — light-green rounded pill with a clock-and-tick icon and "98% on-time delivery" in green.
3. **Softened shipping qualifier** — "Shipping calculated at checkout" in small muted grey, replacing "Excludes shipping".

Runs on every PDP (`/products/...`). Desktop: three lines stacked, right-aligned, in the price row. Mobile: promoted estimate on its own line, pill + qualifier on the row below (wrapping if needed).

---

## 2. Data source

**Primary:** `window.__NEXT_DATA__.props.pageProps.product.customerDeliveryTime.label` — a string like `"5-10 working days"`. This is the same field the site's own `global.js` already reads via `getCustomerDeliveryLabel()` to power the CRO-12089 fast-ship experiment, so it's a confirmed-live, confirmed-correct path.

**Fallback:** if that field is missing, scan the DOM for the smallest leaf element whose text matches `/working day/i` and pull the numeric range out of it (this is the original, already-visible "ETA: X-Y working days" text before it gets hidden).

**If neither source yields a range:** the promoted estimate line is omitted entirely (per acceptance criteria — "hide the promoted delivery estimate line"). The pill and qualifier still render.

Verified dynamically across 6 live products — correctly rendered `3-5` on four products and `5-10` on two others, never a fixed value.

---

## 3. Desktop placement

**Function:** `findShippingContainer()` finds the existing "Excludes shipping" / "ETA" container (smallest element containing that text, walked up to its shared wrapper), tags it `data-cro-12279-original-shipping` (hidden via CSS), and inserts the new trust block `afterend` — so it occupies the exact same right-of-price slot the original content used.

Verified pixel-close to the Figma desktop mock via Playwright screenshot.

---

## 4. Mobile placement

This was the trickiest part of the build. OneDayOnly's buy-box column on mobile is a **CSS Grid with named row placement** (`grid-template-areas`), so DOM order does not match visual order — e.g. the Payflex block sits earlier in the DOM than the Quantity selector, but renders *after* it visually.

**Confirmed via live DOM inspection (Playwright):**
- `#product-quantity-select`'s grid cell has computed `grid-row: actions`
- Nested wrapper divs around the `<select>` also report `display: grid` on their parent (a smaller internal grid for the select + chevron), which makes a naive "walk up until parent is display:grid" check match too early and land inside the `<select>` itself — appended HTML there doesn't render at all.
- The reliable signal is **`grid-row !== 'auto'`** — only the true buy-box-level grid cell has an explicit row; nested layout wrappers are all `auto`.

**Function:** `findQuantityGridCell()` walks up from `#product-quantity-select` (max 10 levels) until it finds the ancestor with a non-`auto` computed `grid-row`, then `injectMobile()` appends the trust block **inside** that cell with `insertAdjacentHTML('beforeend', ...)`. Since it's added inside an existing, correctly-placed grid cell (not as a new sibling), the cell simply grows — pushing Payflex and everything after it down — with no new grid item/placement needed.

Verified via Playwright: block renders directly below Quantity, above the Payflex separator, matching the Figma mobile mock exactly.

---

## 5. Bugs found and fixed during review

The initial build (junior dev) was functionally close but had three real defects, all confirmed via Playwright against the live site (with `global.js` loaded, matching production) before and after each fix:

| Bug | Root cause | Fix |
|---|---|---|
| Lead time never read from the intended data field | `getLeadTime()` guessed at flat field names (`deliveryLeadTime`, `leadTime`, etc.) that don't exist on the product model — always fell through to a DOM-text scan that happened to work by luck | Read `product.customerDeliveryTime.label` directly (the field `global.js` already uses elsewhere) as the primary source |
| Hardcoded `'3-5'` fallback | Violated "do not hard-code a fixed range" and the acceptance criteria requiring the line to hide when no data is found | Removed the hardcode; `getLeadTime()` returns `false` when nothing is found, and `buildTrustBlockHtml()` omits the delivery-estimate `<div>` in that case |
| Mobile block rendered after Payflex, near the bullet list | Anchor logic walked up from the ATC-button wrapper (set by `global.js` for an unrelated purpose) and landed in the wrong grid cell | Anchor off `#product-quantity-select`'s own grid cell (see §4) instead |

Also removed unused boilerplate helpers not needed by this test: `live`, `insertHtml`, `innerHTMLContent`, `innerChildContent`, `toggleClass`, `removeClass`, `scroll`, `waitForSwiper`, `addScript`, `initializeSwiper`, and the no-op `croEventHandkler` wrapper. Kept `waitForElement` and `addClass` (both actually used).

---

## 6. Re-render survival

`init()` re-runs every 400ms for 7s after `waitForElement('body', trigger)` fires, to survive Next.js hydration/re-renders. Both `injectDesktop()` and `injectMobile()` guard against duplicate injection by checking for their own block class before inserting.

---

## 7. Files

| File | Purpose |
|---|---|
| `variation.js` | Lead-time extraction, trust block HTML builder, desktop/mobile injection logic |
| `variation.css` | Styles scoped to `body.cro-12279`, desktop/mobile block visibility swap at 1023px |
| `config.json` | fecli config — lists both files; `urls` set to a live LG monitor PDP for local hosting |

---

## 8. Local development

```bash
cd "OneDayOnly/PDP/PDP Shipping Dynamic Delivery Trust Block ALL CRO-12279"
npm run host
# Open https://localhost:8080 in incognito Chrome
```
