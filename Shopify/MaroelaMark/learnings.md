# MaroelaMark — Client Learnings

Client: **MaroelaMark** | Platform: **Shopify (OS 2.0)**
Theme base: Custom PixelUnion theme (section/snippet architecture)

---

## Theme Architecture

- Product sections use a two-step render chain:
  `sections/static-product.liquid` → `render 'product'` → `render 'product-form'`
- `product.liquid` iterates `section.blocks` and dispatches on `block.type`
- `product-form.liquid` owns the variant selector, quantity selector, and ATC button
- The ATC button wrapper has class `.product-form--atc` and the button itself has `[data-product-atc]`
- The hidden variant select uses `[data-variants]` attribute — listen to `change` events here for real-time variant switching
- Theme fires a `variant:changed` custom event on `[data-product-wrapper]` when the variant changes

## Custom Block Types (CRO pattern)

When adding new block types to a section schema that `product.liquid` doesn't handle:
- `product.liquid` will render an empty `<div class="product-block product-block--{type}">` wrapper for each unknown block
- Hide these empty wrappers with CSS: `.product-block--{your_type} { display: none !important; }`
- Render the actual block content separately (e.g. in a trust mount div in the section), not through `product.liquid`

## CRO Template Pattern

To create a CRO variant of the PDP without editing live files:
1. Create `sections/cro-XXXXX-product.liquid` (copy section schema from `static-product.liquid`, add new settings/blocks)
2. Create new snippets for new UI components (`snippets/cro-XXXXX-*.liquid`)
3. Create `templates/product.cro-XXXXX.json` pointing to the new section
4. Assign the new template to specific products in the Shopify admin for the test

## JS DOM Injection Pattern

When new elements need to be positioned INSIDE the product form (which is owned by a shared snippet):
- Server-render all new elements in a hidden `[data-cro-trust-mount]` div in the section
- Use JS `waitForElement('.product-form--atc', callback)` to inject when the target is ready
- Use `insertBefore` / `nextSibling` for precise placement
- Set up variant listeners BEFORE moving elements (elements are queryable while still in mount)

```javascript
function waitForElement(selector, callback) {
  var el = document.querySelector(selector);
  if (el) { callback(el); return; }
  var observer = new MutationObserver(function(_, obs) {
    var found = document.querySelector(selector);
    if (found) { obs.disconnect(); callback(found); }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
```

## In-Stock Indicator

- Server-side initial state: `product.selected_or_first_available_variant.available`
- All variant availability serialised to JSON on `data-variant-availability` attribute
- Real-time updates: listen to `change` on `[data-variants]` (the hidden variant ID select)
- Also listen for `variant:changed` on `[data-product-wrapper]` for theme custom events
- `aria-live="polite"` on the indicator element for screen reader support

## Payment Strip

- Label text: stored in `section.settings.cro_payment_label`
- Payment icons: `payment_icon` blocks with `image_picker` settings
- Fallback when no icon blocks: `shop.enabled_payment_types` with `payment_type_svg_tag` filter
- Padlock icon: inline SVG stroke icon (no external dependency)

## USP List

- Each USP item is a repeatable `usp_item` block in the section schema
- Icon can be a theme icon (`icon-library` snippet) or a custom `image_picker` upload
- Image picker takes precedence over select icon
- Theme icon values that match the design: `icon-delivery`, `icon-transfer`, `icon-lock`

## Gotcha: `{% liquid %}` for-loop with `break` outputs stray number

**Problem**: When you copy the `{% liquid %}` block from `static-product.liquid` into a new section, adding more blocks to the template's `block_order` can change `section.blocks.size`. If the loop contains `break` and runs to completion without breaking, Shopify's `{% liquid %}` tag outputs `forloop.length` (= `section.blocks.size`) as a stray text node — visible on the page.

**Symptom**: A bare number (e.g. "12") appears as the first text inside the section div, before the `<script type="application/json">` tag.

**Fix**: In CRO sections where there is no `complementary_products` block, remove the `{% liquid %}` for-loop entirely. Hardcode `null` directly in the JSON data instead of using the Liquid variable:

```liquid
{% comment %} REMOVED: for-loop that searched for complementary_products block.
   CRO template has no such block; the loop with `break` can output forloop.length
   as a stray text node. Use null directly. {% endcomment %}

"product_recommendation_limit": null
```

## Judge.me Review Stars on Product Cards

- Judge.me syncs ratings into the **standard Shopify review metafields**:
  `product.metafields.reviews.rating` (value + scale_max) and
  `product.metafields.reviews.rating_count`
- The theme's `product-grid-item.liquid` already renders stars from these
  (gated on `settings.product_ratings_star_display`, which is ON)
- For custom card layouts: read the metafields directly and reuse
  `snippets/rating-stars.liquid` — **no Judge.me widget JS needed**, no flicker
- `rating-stars` relies on global `#icon-star` SVG defs (in layout), safe anywhere

## Product Card Reuse (grid/carousel contexts)

- `render 'product-grid-item', product: p` is fully self-contained: image,
  badges, price, vendor, stars, quick-buy
- Theme settings: `product_grid_show_atc: always` → button always visible on
  mobile, hover-overlay on desktop (matches most CRO specs natively)
- Single-variant products: button has `data-quick-buy` → AJAX ATC delegated
  globally by empire.js — works in any section without extra wiring
- Multi-variant products: button has `data-quickshop-slim` → quickshop modal.
  To send users to the PDP instead, intercept with a **capture-phase** click
  listener and navigate to `[data-product-item]`'s `data-product-quickshop-url`
- Afrikaans button labels come free from `locales/af.json`
  ("Gooi in mandjie" / "Kies opsies" / "Uitverkoop")

## Homepage Template Test Pattern (Intelligems)

- Variant homepage = new `templates/index.cro-XXXXX.json` + new prefixed
  sections; Intelligems splits traffic between templates — live `index.json`
  untouched
- Live homepage hero is `dynamic-slideshow` (slide blocks); its image handles
  can be reused as defaults in the variant template JSON
  (`shopify://shop_images/Cover_Maroela-mark.jpg`)
- Theme container max-width: 1400px (`--layout-container-max-width`);
  design content width 1280px; section heading convention `home-section--title`
- `rimg` snippet takes an Image Drop (`img:` param) — works directly with
  `section.settings.image_picker` values
- Mobile breakpoint used across CRO sections: 860px (matches header collapse)

## Inline SVG Icons from Figma Exports (CRO-12425)

- Prefer one `snippets/cro-XXXXX-icon.liquid` with a `{% case icon %}` of
  inline SVGs over uploading icon assets — one file, no asset step
- Figma `download_assets` SVG exports of nested nodes carry junk that MUST be
  sanitized before inlining (verify by rendering on a non-white background):
  - a grey `#E5E5E5` viewBox-sized backdrop rect + page-sized white rects
  - neighbouring-element artifacts drawn via `path-N-inside` masks (e.g. the
    trust strip's border hairlines, a parent circle's border) — remove the
    `<mask>` defs, then any path still referencing a removed mask id
  - do NOT remove white viewBox-sized rects inside `<clipPath>` — an empty
    clipPath clips the whole icon away (blank icon)
- Namespace all internal `id`s per icon (`cro12425-{slug}-…`) — several inline
  SVGs on one page share the document id space; duplicate clip-path ids
  resolve to the first match and break rendering

## Gotcha: New Shopify "code space" editor does NOT autosave

- Files created/edited in the new VS Code-style admin code editor stay as
  **browser-local drafts** until each file is explicitly saved (Cmd+S / Save
  button per file). Symptom: file visible in the editor's file tree, but the
  customizer template list, storefront `?view=` URL, and Themes "Last saved"
  don't reflect it. Timeline panel shows "File Saved" as hollow/pending.
- Alternate `index.*.json` templates only appear in the customizer's
  "Home page" dropdown (chevron + submenu) once ≥2 saved index templates
  exist; the customizer fetches the template list on page load only.
- Fast diagnostic chain: storefront `/?view={suffix}` (bypasses editor) →
  theme ID match between code editor and customizer URLs → per-file save state.

## Gotcha: Customizer cannot open alternate index (home) templates

- Confirmed on this store (2026-07): the Home page dropdown never lists
  alternate `index.*.json` templates, search finds them but clicking
  redirects to the control home page, and `editor?template=index.{suffix}`
  gets stripped from the URL. Products/collections/pages route fine because
  they are resources with template assignment; home is not.
- **Workaround — duplicate-theme edit flow**: duplicate the live theme →
  on the duplicate, replace `index.json` contents with the variant template
  JSON → customize the duplicate (variant is now its default home page) →
  copy the edited `index.json` back into the live theme's
  `index.{suffix}.json` → verify via `/?view={suffix}` → delete duplicate.
- Safe because template JSON is store-level: images are
  `shopify://shop_images/<filename>` refs and products are handles — the
  JSON ports between themes verbatim.

## Restyling an existing section per-template (CSS-only section pattern)

- To reuse a live/control section in a CRO template with different styling,
  ship a **CSS-only section** (`{% style %}` + empty-ish schema) and add it
  once to the CRO template JSON — overrides then exist only on that
  template; the shared section file is never edited
- Beat the original's single-class selectors with two-class descendant
  selectors — no `!important` needed
- Theme font hooks: `var(--heading-font-family)`, `var(--body-font-family)`,
  `var(--button-font-family)` (Empire 12/13 exposes these on :root)
- The newer live theme (in `Meta Social Pre-Lander CRO-12245/Theme/`) has
  `sections/custom-product-rows.liquid`: collection-driven peek carousel,
  **randomises products per pageview** (Fisher-Yates), direct first-variant
  ATC via form POST, hard-coded English "Sold Out", stars from
  `reviews.rating_count` only (always 5 gold stars)

## Position-marker blocks: fill, don't hide (CRO-12473)

Extension of the empty-wrapper pattern for elements that sit BETWEEN existing
blocks (not inside the form): give the new block type a place in the
template's `block_order` — `product.liquid` renders its empty wrapper at that
exact position — then JS moves the mount content INTO the wrapper instead of
hiding it:

- CSS: wrapper `display:none` by default (a whitespace-only wrapper still
  takes block margin — `:empty` does NOT match it), JS adds `.cro-XXXXX-filled`
  which flips it to block
- Placement is then controlled entirely from the template JSON, and the shared
  `product.liquid` is never forked (no drift to reconcile)
- Data-only blocks (e.g. companion product pickers) also land in `block_order`
  — hide their wrappers permanently like `usp_item`

## Product description authored shape (this store)

Merchant descriptions follow one shape, split server-side with string filters:

```
Short description: <div class="entry-content">…short…</div> Description: …long…
```

- Short = `split: '<div class="entry-content">'` → `[1]` → `split: '</div>' | first`
- Long = everything after the standalone `Description:` label — use
  `remove_first: prefix | remove_first: 'Description:'` (split-prefix trick),
  NOT `split | last` (breaks if the label recurs)
- `'Description:'` is case-sensitive so it does not match inside
  `"Short description:"`
- Always fall back to the full description for products without the shape

## Judge.me zero-review suppression (CRO-12473)

- Gate server-side on `product.metafields.reviews.rating_count < 1`, then emit
  `<style>.shopify-section:has(.jdgm-review-widget){display:none!important}</style>`
  — no flicker, no JS (tiny JS fallback for non-`:has` browsers)
- **TRAP**: scope to `.jdgm-review-widget`, never `.jdgm-widget` — the footer
  contains a hidden Judge.me preview badge; the wider selector hides the
  entire footer (this bug shipped in the CRO-12473 design mock)
- The rating block renders empty for zero-review products (product.liquid
  gates on `reviews.rating.value`) — safe slot for an injected trust line;
  products with reviews keep their stars untouched

## Gotcha: alternate templates break the H1 title (CRO-12473)

`product.liquid`'s title block uses `{% case template %}{% when 'product' %}`
to pick `<h1>` — but on an alternate template `template` stringifies WITH the
suffix (`product.cro-12473`), so the case falls through and the title renders
as bare `<h2 class="product-title">`. The theme's brand CSS then styles it as
a product-CARD title (15px teal Proxima, centred) because the big dark PDP
heading is only restored for `h1.product-title` selectors. Every alternate
product template on this store hits this. Fix without touching product.liquid:
mirror the theme's `h1.product-title` rules onto
`.product-details h2.product-title` in the test CSS (kills the teal paint) and
swap the tag back to `<h1>` in the test JS for markup parity.

## Gotcha: preview drafts go stale — labels live in three places

The trust strip's strings come from three different sources: the in-stock
label is HARDCODED in `snippets/cro-12303-in-stock.liquid` (live theme says
"In voorraad"; old May 29 draft still says "In stock"), the USP labels are
usp_item BLOCK SETTINGS in the template JSON, and the payment label is a
SECTION SETTING (`cro_payment_label`, live value "Veilige betalings via").
When copying a template JSON from a test folder, its block settings may be
older than live — pull current strings from the live page/mirror, and always
duplicate the CURRENT live theme for previews, not an old draft.

## Per-product content for template tests (CRO-12473)

One template serves every product, so per-product test content can't live in
template JSON alone. Pattern: product metafield wins, template block defaults
fall back — `custom.value_prop` (single line) for copy, `custom.companions`
(product list) over `companion_product` picker blocks for the bundle. Collect
blocks product-agnostically with
`section.blocks | where: 'type', 'companion_product' | map: 'settings' | map: 'product'`.

## Tests Built

| Test | Task | Template | Description |
|------|------|----------|-------------|
| CRO-12303 | Buy Box Trust Strip | `product.cro-12303` | In-stock indicator + payment strip + USP trust list |
| CRO-12425 | Homepage Routing (Intelligems template test) | `index.cro-12425` | Full homepage rebuild: sticky mobile search, hero, icon row, category grid, trust strip, 2× product-row peek carousels, brand story. Figma file labelled CRO-12377 |
| CRO-12473 | PDP Value-prop + Brand-proof + Bundle (Sprint 2, Intelligems template test) | `product.cro-12473` | Value-prop line under title, short desc under price, long desc relocated to "Oor hierdie produk" section, zero-review trust line + review suppression, "Gaan goed saam met" AJAX bundle. Stacks on CRO-12303 trust strip |
