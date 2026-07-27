# Dev Test Analysis
## CRO-12443 | AB Test | Cart Pop-up | Post Add-to-Cart Confirmation | ALL

**Client:** Dometic
**Test ID:** CRO-12443
**Scope:** All PDPs (`/en-za/product/*`)
**Deliverables:** `variation.js`, `variation.css`
**Test suite:** 21 Playwright unit tests — all passing

---

## 1. What Was Built

A cart confirmation popup that fires after a user successfully adds a product to their bag on any PDP.

- **Desktop:** Fixed card in the top-right corner, fades in with a slight upward slide (`opacity + translateY`).
- **Mobile:** Bottom sheet that slides up from the screen edge (`translateY(100%) → 0`), full-width, rounded top corners.
- **Backdrop:** Semi-transparent dimmed overlay covers the full viewport on both breakpoints.

**Popup content:**
- Green circular badge with a checkmark SVG
- "Added to your bag" heading
- Close button (✕)
- Divider
- Product thumbnail, name, sale price, and strikethrough original price — all read live from the page DOM at click time
- "View cart" button → `/en-za/cart`
- "Continue shopping" button — closes the popup

**Close triggers:** ✕ button, "Continue shopping" button, clicking the dimmed backdrop.

---

## 2. Trigger Logic

The popup does **not** open on button click alone. It uses a two-step gate:

1. **Button click detected** → product data is captured, a 10-second window opens.
2. **Successful API response confirmed** → popup shows.

If the API call fails (network error, non-2xx status), the popup never appears. The 10-second window resets automatically, preventing stale state from a missed response.

This approach means the popup only shows when the item was genuinely added — not on validation errors, stock-out responses, or failed network calls.

---

## 3. Key Technical Findings from Live-Page Debug

### 3.1 — Button is outside `.buy-me-box`

The Dometic PDP renders **two** ATB buttons:

| Button | Selector | Location | Type | aria-label |
|--------|----------|----------|------|------------|
| Form submit (in buy box) | `.buy-me-box button[type="submit"]` | Inside `.buy-me-box` | `submit` | none |
| Sticky CTA (outside buy box) | `button.bg-primary[aria-label="Add to bag"]` | Outside `.buy-me-box` | `button` | "Add to bag" |

The **sticky CTA** (outside `.buy-me-box`) is the button users actually click when scrolled down the page. The initial implementation targeted only `.buy-me-box button`, which physically could not match the sticky button.

### 3.2 — React 17+ event delegation

Dometic's PDP is a Next.js (React 17+) application. In React 17+, synthetic events are delegated to the React **root element** rather than `document`. This means React can call `stopPropagation()` on events before they bubble up to `document`, silently breaking any `document`-level listener that uses the bubble phase.

Standard `live()` delegation attaches to `document` in bubble phase — making it vulnerable to being cut off by React's event system.

**Fix:** Switched the ATB button listener to `document.addEventListener('click', handler, true)` — **capture phase**. Capture fires *before* React's root-level handler, so React cannot block it regardless of what it does with the event.

### 3.3 — Button shows "Loading..." during React hydration

During the first ~2 seconds after page load, React hydrates the DOM. During this window the submit button inside `.buy-me-box` renders with the text "Loading..." and `type="submit"`. A text-only match for "Add to bag" would miss any click during this window.

**Fix:** The ATB check uses `aria-label` and `type="submit"`-in-buy-box as separate conditions, so the button is detected correctly during both the hydration phase and the fully-rendered state.

### 3.4 — Price is a single concatenated string

The price wrapper's `textContent` produces a single merged string:

```
"Sale price R 2,700.00Original price R 3,000.00"
```

A naive `textContent` read returns this as one value. A regex `/[R$€£]\s*[\d,]+(?:\.\d{1,2})?/g` extracts the two currency amounts separately — the first becomes the sale price, the second the original price (displayed with `text-decoration: line-through`).

### 3.5 — Related product tile buttons must not trigger the popup

After scrolling, the page renders related product carousels. Each tile has an `aria-label="Add to Cart"` button. A broad `indexOf("add to cart")` check would have triggered the popup for these tiles — showing the wrong product in the confirmation.

**Fix:** "Add to Cart" buttons only match if they are inside `.buy-me-box`. The sticky CTA uses the exact label "Add to bag" (`=== "add to bag"`, not `indexOf`), ensuring tiles are excluded.

---

## 4. API Interception Strategy

The variation patches both `window.fetch` and `XMLHttpRequest.prototype` to detect the cart API response.

### Fetch patch
```
window.fetch (patched)
  ↓ all calls pass through unmodified
  ↓ if addToBagClicked = true AND method ≠ GET/HEAD
      → attach .then() listener
      → on response.ok = true → showPopup()
```

The original promise is returned untouched. The site's own `.then()` / `await` chains are never affected.

### XHR patch (fallback)
Same gate logic via `XMLHttpRequest.prototype.open` (stores method) and `XMLHttpRequest.prototype.send` (attaches `load` listener when the flag is active).

Both patches are one-time (`_cro12443FetchPatched` / `_cro12443XHRPatched` guards). A 10-second safety timer resets `addToBagClicked` if no API response is detected — preventing the flag from being stuck open indefinitely.

---

## 5. Performance Assessment

| Area | Assessment |
|------|-----------|
| Fetch overhead (no ATB click) | Zero — the `.then()` is only attached when `addToBagClicked` is `true` |
| Fetch overhead (during ATB window) | One microtask per non-GET request; non-blocking |
| Click listener overhead | Capture-phase handler runs on every click; body is 3 iterations max, no DOM queries, no layout triggers |
| DOM queries at startup | One `querySelector` per 50ms poll until `.product-details` is found (max 15s), then stops |
| DOM queries at click time | 4 `querySelector` calls in `captureProductData()` — runs once per ATB click only |
| Memory | No leaks; all state inside IIFE closure; timer IDs cleared on use |
| Double-load protection | `window.cro_12443` guard prevents re-registration of event handlers if Convert.com loads the script twice |

---

## 6. Coexistence with Live Tests

This test adds a new scoped class `CRO12443` to `<body>`. All CSS rules are prefixed with `body.CRO12443` — no global styles are modified. The popup HTML uses the namespace `cro-12443-*` throughout. No existing DOM nodes are mutated.

The existing CRO-12206 deployment is unaffected.

---

## 7. Test Coverage

21 Playwright unit tests covering:

| Category | Tests |
|----------|-------|
| Init | Body class added, overlay injected, overlay hidden by default |
| Button detection | Submit button (text "Loading..."), "Add to Bag" text button, non-ATB button rejected |
| Popup — shows on success | Overlay visible, popup card visible, no show on API failure, no show on GET request |
| Popup content | Product name, sale price, original price with strikethrough, thumbnail src, view cart URL, heading text |
| Close behaviours | ✕ button, "Continue shopping", backdrop click, flag not reset prematurely |
| Duplicate injection | Re-running the script does not inject a second overlay |

All 21 tests pass on desktop viewport (1280×900). Mobile viewport tested via live-page debug session.

---

## 8. Files Delivered

| File | Purpose |
|------|---------|
| `variation.js` | All test logic — popup injection, product data capture, API interception, event handling |
| `variation.css` | Scoped styles — desktop card, mobile bottom sheet, animations, typography |
| `config.json` | Convert.com deployment config |
| `variation.test.js` | 21 Playwright unit tests + live-page debug test |
| `playwright.config.js` | Desktop + mobile Playwright projects |
