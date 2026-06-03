# Test Analysis — CRO-12301
## Recipe | PLP Card | Size Differentiation Visual Cue | ALL

---

## 1. What the test does

Adds a size information badge to every product card on CTM's tile product listing pages (PLPs). The badge sits to the right of the price and displays three pieces of information:

- A shape icon (square, rectangle, or plank) that visually represents the tile's proportions
- A size label: `Size: S`, `Size: M`, `Size: L`, or `Size: XL`
- The tile dimensions converted to centimetres (e.g. `60 × 60cm`, `43 × 43cm`)

Cards where no dimensions can be found in the product title receive no badge — they display exactly as control.

---

## 2. Data source

No external data feed or API call is required. All size information is derived client-side by parsing the **product title text** that already exists in the DOM on every PLP card.

Example title strings found on the site:
- `Lumina Ceramic Floor Tile - 430 x 430mm`
- `Lumina Carrara Polished Marble Look Hard Body Floor Tile - 600mm x 600mm`
- `Mosaic Tile - 300 x 300 x 4mm` (third number = thickness, ignored)

---

## 3. Dimension parsing

**Function:** `parseDimensions(title)`

**Regex:**
```
/(\d+)\s*(?:mm)?\s*[xX×]\s*(\d+)(?:\s*[xX×]\s*\d+)?\s*(?:mm)?/
```

**How it works:**
- Captures the first two dimension numbers from the title
- `(?:mm)?` after the first number handles titles like `600mm x 600mm` where the unit appears mid-string (this was a bug found during QA and fixed)
- `(?:\s*[xX×]\s*\d+)?` at the end optionally matches and discards the third number (tile thickness)
- Takes the smaller of the two values as width and the larger as height
- Returns `null` if no match — that card gets no badge

**Unit conversion:** Titles store dimensions in millimetres. The badge displays in centimetres, so both values are divided by 10 before rendering.

---

## 4. Size category logic

Derived from the longest side (height) in millimetres:

| Longest side | Label |
|---|---|
| ≤ 300mm | `Size: S` |
| 301 – 600mm | `Size: M` |
| 601 – 1000mm | `Size: L` |
| > 1000mm | `Size: XL` |

---

## 5. Shape logic

Ratio = longest side ÷ shortest side:

| Ratio | Shape | Icon |
|---|---|---|
| = 1 | Square | Small solid square SVG |
| > 1 and ≤ 2 | Rectangle | Landscape rectangle SVG |
| > 2 | Plank | Long narrow bar SVG |

All icons are inline SVGs — no image requests, no external assets, no loading delay.

---

## 6. DOM injection

**Function:** `injectSizeBadges()`

- Loops every `.product-item-info` card on the page
- Double-inject guard: skips any card that already has `.cro12301-size-badge` (prevents duplicates on re-runs)
- Reads the title from `.product-item-name a` or `.product-item-link`
- Inserts the badge HTML immediately after `.price-box` / `.price-container` using `insertAdjacentHTML('afterend', ...)`
- Cards with no parseable dimensions are silently skipped

---

## 7. Initialisation sequence

```
waitForElement('.page-with-filter', init)
  └─ init()
       ├─ addClass('body', 'cro12301')         ← scopes all CSS
       ├─ waitForElement('.product-item-info', injectSizeBadges)  ← waits for cards
       └─ MutationObserver on #amasty-shopby-product-list         ← handles View More
```

**Why two `waitForElement` calls:**
The outer one (`'.page-with-filter'`) fires when the page shell is ready. At that point the product grid may not yet be in the DOM (async render). The inner one (`'.product-item-info'`) ensures injection only runs once actual card elements exist.

---

## 8. View More / AJAX pagination

CTM PLPs use an Amasty Shopby "View More" button that appends new product cards to `#amasty-shopby-product-list` without a page reload.

**Solution:** A `MutationObserver` watches `#amasty-shopby-product-list` with `{ childList: true, subtree: true }`. When new nodes are added, a 150ms debounce timer fires `injectSizeBadges()`. The debounce prevents multiple rapid calls mid-render while Amasty is still writing card markup into the DOM.

The `injectSizeBadges` double-inject guard means re-running on the full card list is safe — already-badged cards are skipped in O(1).

---

## 9. CSS approach

All rules are scoped to `html body.cro12301` — the body class added by `addClass` in `init()`. No styles apply until the variation script has confirmed the test is active.

The `.product-item-details-action` wrapper is set to `display: flex` so the badge sits inline to the right of the price box on the same row, matching the Figma spec.

Mobile breakpoint at `768px` reduces icon sizes and font sizes slightly.

---

## 10. Bugs found and fixed during QA

| Bug | Root cause | Fix |
|---|---|---|
| Size badge not showing on some page loads | `injectSizeBadges()` was called directly in `init()` before `.product-item-info` was in the DOM | Wrapped in `waitForElement('.product-item-info', injectSizeBadges)` |
| View More products not getting badges | Observer was watching `.products.list.items` which Amasty replaces on each load | Switched observer to the stable `#amasty-shopby-product-list` parent + added 150ms debounce |
| `600mm x 600mm` title format not matching | Regex did not allow `mm` between the first number and the `x` separator | Added `(?:mm)?` after the first capture group |

---

## 11. Files

| File | Purpose |
|---|---|
| `testFiles/variation.js` | All test logic — parsing, badge building, injection, observer |
| `testFiles/variation.css` | All styles scoped to `body.cro12301` |
| `config.json` | fecli config — lists both files, `urls` left empty for bookmarklet use |

---

## 12. Local development

```bash
cd "CTM/PLP/New AB Tests/CRO-12301"
npx fecli host config.json
# Open https://localhost:8080 in incognito Chrome
```
