# CTM — Client Learnings

Learnings specific to the CTM (ctm.co.za) site. Use these when building any AB test for this client.

---

## Site Stack

- Magento 2 (custom theme)
- Amasty Shopby Pro (filters + "View More" pagination)
- Font: **Source Sans Pro** (headings, UI) + **Inter** (body copy, prices)

---

## Key Selectors

### PLP (Product Listing Pages)

| Element | Selector |
|---|---|
| Page shell (PLP confirmed loaded) | `.page-with-filter` |
| Product card wrapper | `.product-item-info` |
| Product title link | `.product-item-name a` or `.product-item-link` |
| Price box | `.price-box` or `.price-container` |
| Price + action row wrapper | `.product-item-details-action` |
| AJAX product list container (stable) | `#amasty-shopby-product-list` |
| Product grid (inner, replaced on AJAX) | `.products.list.items` |

### "View More" / Infinite scroll

CTM uses **Amasty Shopby** for the "View More" button. When clicked, it appends new product cards into `#amasty-shopby-product-list`. The inner `.products.list.items` element is **replaced entirely** on each load.

Always observe `#amasty-shopby-product-list` (stable), never `.products.list.items` (unstable).

---

## Product Title Dimension Format

Titles end with dimensions in two possible formats:

```
"...Floor Tile - 600 x 600mm"       → numbers then mm at end
"...Floor Tile - 600mm x 600mm"     → mm after each number
"...Mosaic - 300 x 300 x 4mm"       → three numbers (third = thickness, ignore it)
```

Use this regex to handle all three:
```js
var match = title.match(/(\d+)\s*(?:mm)?\s*[xX×]\s*(\d+)(?:\s*[xX×]\s*\d+)?\s*(?:mm)?/);
```

Dimensions are always in **millimetres**. Display format agreed with client: `"600mm × 600mm"` (raw mm, no conversion).

---

## Size Category Thresholds (CRO-12301)

| Longest side | Category | Icon size |
|---|---|---|
| ≤ 300mm | S (Small) | Small |
| 301 – 600mm | M (Medium) | Medium |
| 601 – 800mm | L (Large) | Large |
| > 800mm | XL (Extra Large) | Large (same icon as L) |

Shape ratios (longest ÷ shortest):
- = 1 → Square
- > 1 and ≤ 2 → Rectangle (show as **landscape** icon — wider than tall)
- > 2 → Plank (show as narrow portrait bar)

---

## Body Class Naming

Variation name format: `cro` + CRO number, no dashes.

```js
var variation_name = "cro12301"; // for CRO-12301
```

CSS scoped to: `html body.cro12301 .your-selector { ... }`

---

## Colours (from Figma)

| Token | Hex |
|---|---|
| Primary text | `#161616` |
| Secondary / muted text | `#737373` |
| Light grey bg (icon circle) | `#EAEAEA` |
| Border / icon stroke | `#404040` |
| Inner pattern lines | `#ADADAD` |
| Brand red | `#ED1C24` |
| Dark text | `#404040` |

---

## PLP Card Layout — Price Row

To place an element inline to the right of the price, make `.product-item-details-action` flex:

```css
html body.cro12301 .product-item-details-action {
    display: flex;
    align-items: center;
}
```

Insert new element **after** `.price-box` using `insertAdjacentHTML('afterend', html)`.

---

## Init Pattern for CTM PLP Tests

```js
// Wait for PLP shell → then wait for cards → then inject
waitForElement('.page-with-filter', function init() {
    addClass('body', variation_name);
    waitForElement('.product-item-info', injectThings);

    // Watch for View More AJAX loads
    var debounceTimer = null;
    var list = document.querySelector('#amasty-shopby-product-list');
    if (list) {
        new MutationObserver(function () {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(injectThings, 150);
        }).observe(list, { childList: true, subtree: true });
    }
});
```

---

## Figma Access

- Figma token is stored in `~/.claude/settings.json` under `figma.X-Figma-Token`
- To fetch node data: `GET https://api.figma.com/v1/files/{fileKey}/nodes?ids={nodeIds}`
- To export SVG: `GET https://api.figma.com/v1/images/{fileKey}?ids={nodeIds}&format=svg`
- Always export icon SVGs from Figma rather than recreating by hand

---

## Tests Built

| CRO | Name | Page | Status |
|---|---|---|---|
| CRO-12301 | PLP Card Size Differentiation Visual Cue | PLP | In QA |
