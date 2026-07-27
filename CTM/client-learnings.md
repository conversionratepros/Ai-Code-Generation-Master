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

## Amasty Filter Application Mechanism (CRO-12299)

Discovered while building a custom quick-filter chip row that had to produce
byte-identical results to the existing Amasty filter sheet.

### Filter option markup

Each filter group in the sheet (`#layered-filter-block` → `#narrow-by-list`)
is a `<form data-amshopby-filter="attr_X" data-amshopby-filter-request-var="X">`
containing an `<ol>` of options:

```html
<li class="item" data-label="Grey">
    <input name="amshopby[color][]" value="19" type="checkbox">
    <span class="checkmark"></span>
    <a class="am-filter-item-xxxxx" data-am-js="filter-item-default"
       href="https://www.ctm.co.za/floors/tiles-by-room/grey-category.html" rel="nofollow">
        <span class="label">Grey</span>
    </a>
</li>
```

- `data-amshopby-filter-request-var` (e.g. `color`, `tile_size_filter`,
  `finish`) and the option's `input value` (the EAV attribute option id, e.g.
  Grey = `19`) are **global per attribute** — they don't change between
  category pages. Only the `<a href>`'s SEO-URL slug is category-specific.
- Selectors confirmed present on every tile PLP checked so far: `color`
  (Grey=19, White=33, Beige=22), `tile_size_filter` (Large=747, Medium=748),
  `finish` (Matt=75, "Glossy / Shiny"=35).

### How to apply a filter identically to the sheet

Don't reconstruct the URL. Amasty renders each `<a href>` **contextually** —
it already resolves to the correct combined add/remove URL for the shopper's
current filter state. To replicate the sheet exactly from custom UI, look up
the real `<li>`/`<input>`/`<a>` for the target option in the live (even if
visually hidden/off-screen) filter sheet DOM by `requestVar` + option
`value`, then call `anchorEl.click()` on Amasty's own anchor. Whatever Amasty
actually does internally (full navigation vs AJAX + `pushState` — this theme
has `.amshopby-loader` / `.amshopby-overlay-block` classes suggesting AJAX
filtration may be in play) runs exactly as if the shopper tapped it
themselves, including sort-order preservation and pagination reset — no
separate logic needed.

### Reading current filter state

Confirmed live via Playwright (real Chrome — plain `fetch`/`curl` gets HTTP
403 from this site, but a real browser engine loads it fine, so debug PLP
filter behaviour with Playwright, not curl): `input.checked` is reliable —
Amasty sets it on the option's `<input>` the moment a filter is applied,
even mid-AJAX before the URL/pushState settles.

### "All filters" / open-the-sheet trigger

Same element the existing sticky bottom "Filter By" bar uses:
```js
document.querySelector('#layered-filter-block .filter-title strong[data-role="title"]').click();
```

### "Clear all" (Now Shopping By)

**Correction — the `.filter-current .action.clear` guess from earlier builds
was wrong**, confirmed via Playwright. The real "Clear All" link is **not**
inside `.filter-current` at all (that block only contains per-item
`a.amshopby-remove` links, one per active filter, plus an always-empty
`<li class="amshopby-button-wrap">`). The actual control lives elsewhere in
the filter sheet DOM:
```js
document.querySelector('a.action.clear.filter-clear').click();
```
It only exists in the DOM once ≥1 filter is active (same as `.filter-current`).

### Amasty AJAX filtering — three gotchas that will bite any script reading/reacting to filter state

Confirmed via Playwright by tagging live DOM nodes and diffing identity
before/after a filter click (see CRO-12299):

1. **Individual filter option clicks are AJAX + `history.pushState`, not a
   hard reload** — the URL changes and `#narrow-by-list` re-renders, but the
   document itself survives (your script's JS state/listeners persist).
   However Amasty replaces `#narrow-by-list` **and every wrapper up through
   `#layered-filter-block`** with brand-new DOM nodes (not in-place
   mutation) — the first stable ancestor above that replaced subtree is
   `.page-wrapper` (a direct child of `<body>`). **Any `MutationObserver`
   bound directly to `#narrow-by-list` (or any node under it) goes stale
   after the first filter click** — it's watching a detached node and never
   fires again. Bind to `.page-wrapper` (or `#narrow-by-list`'s current
   parent chain, re-resolved fresh) instead, never to a node reference
   captured once at init.
2. **`document.body.className` gets overwritten wholesale** during this same
   AJAX transition, silently stripping any custom class your script added
   (e.g. a `croXXXXX` variation class used to scope all your CSS). If your
   CSS is scoped under `body.croXXXXX`, re-assert that class on every
   re-render, not just once in `init()`.
3. **The "Clear All" link (`a.action.clear.filter-clear`) triggers a genuine
   hard page navigation**, unlike individual filter options — confirmed by
   the page's own scripts (GTM init, other live AB tests) re-firing their
   startup logs from scratch. This is normal/correct in a real deployment
   (Tampermonkey/Convert.com re-injects your script on every navigation,
   hard or soft) but will look "broken" in a bare Playwright debug harness
   that only injects once — re-inject on `page.on('framenavigated', ...)`
   when testing this flow locally.
4. **Don't observe `document.body` on this site** if you need a
   `MutationObserver` to resync state — it's a live commercial page with
   constant background DOM churn (ads/chat widget/analytics) appended as
   *other* direct children of `<body>`, siblings of `.page-wrapper`. A
   trailing-edge debounce (wait for N ms of silence) can starve
   indefinitely once the page is "busy" — confirmed by clicking a 2nd filter
   with one already active and finding the debounce callback simply never
   fired again over several seconds. Scope the observer to `.page-wrapper`
   (excludes that sibling noise) **and** pair the debounce with a hard
   max-wait cap (e.g. force a resync within 800ms of the first detected
   change no matter how continuously mutations keep arriving) so state can
   never be starved forever.

---

## Tests Built

| CRO | Name | Page | Status |
|---|---|---|---|
| CRO-12301 | PLP Card Size Differentiation Visual Cue | PLP | In QA |
| CRO-12299 | PLP Mobile Quick-Filter Chip Row | PLP | Built, pending QA |
