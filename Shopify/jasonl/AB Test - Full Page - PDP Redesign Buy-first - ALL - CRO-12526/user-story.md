# AB Test | Full Page | PDP Redesign Buy-first | ALL | CRO-12526

**Client:** JasonL (jasonl.com.au) — Shopify OS 2.0, Dawn-derived theme
**Targeted pages:** All product detail pages (e.g. https://www.jasonl.com.au/products/finch-ergonomic-mesh-chair)
**Devices:** Desktop + mobile
**Test type:** Full-page alternate PDP template (`templates/product.cro-12526.json`, served at `?view=cro-12526`) — NOT an edit to the live theme
**Design reference:** Figma — [Desktop](https://www.figma.com/design/dUqAvYEyhiWchtoAh9HJXc/JasonL-%E2%80%94-Product-Page--Copy-?node-id=217-90&m=dev) / [Mobile](https://www.figma.com/design/dUqAvYEyhiWchtoAh9HJXc/JasonL-%E2%80%94-Product-Page--Copy-?node-id=276-177&m=dev)
**Control reference:** live `product` template / `templates/product.crp.json` (see theme-export in the CRO-12282 folder)

---

## Background

Full PDP redesign that puts "buy" ahead of "learn" — title/price/options/CTA compressed
into a tighter, higher-contrast buy box, with supporting content (setup add-ons, compare
alternatives, brand trust, whole-office planning, showrooms) pushed below the fold in a
clearer narrative order. Built as a brand-new alternate template, following the same
alternate-template pattern documented in `learnings.md` for CRO-12405/CRO-12359 — the
live `product.json` / `product.crp.json` templates and every section/snippet inside the
control theme-export are untouched.

## What was built (new files, this folder only)

| File | Purpose |
|---|---|
| `templates/product.cro-12526.json` | New alternate template — `main` → `cro-12526-main-product`; other sections `cro-12526-complete-setup`, `product-compare` (reused), `cro-12526-about-us`, `cro-12526-planning`, `cro-12526-showrooms` |
| `sections/cro-12526-main-product.liquid` | Breadcrumb/meta, gallery, buy box, supporting info, and the **unedited** product-info tab block (Description/Spec/Dimensions/Brochure/3D models/Assembly/Warranty), copied verbatim from `main-product_crp.liquid` |
| `snippets/cro-12526-breadcrumb-meta.liquid` | Desktop breadcrumb (parent → child → product name) + range/SKU; mobile range/SKU variant |
| `snippets/cro-12526-gallery.liquid` | Wraps the existing gallery + zoom popup, adds promo tag + "view all images" link |
| `snippets/cro-12526-variant-picker.liquid` | Size as `<select>` dropdown, remaining options as swatches, native Dawn variant-select behaviour underneath |
| `sections/cro-12526-complete-setup.liquid` | "Complete the setup" — reuses the "Combines well with" tag-metafield resolution logic from `cross-sell.liquid`, new card markup |
| `sections/product-compare.liquid` | Forked copy of the control's `product-compare.liquid` (same pattern CRO-12359 used) — added eyebrow/heading/paragraph/"This product" badge/"Not sure? We'll recommend" link, `template.cro-12526` added to the See-more/less JS gate |
| `sections/cro-12526-about-us.liquid` | "New here? A bit of us" — static/schema-editable brand trust block |
| `sections/cro-12526-planning.liquid` | "Planning a whole office?" — 4 day-step blocks + bottom CTA bar |
| `sections/cro-12526-showrooms.liquid` | "Come see it" — rebuilt showroom rows, reuses `store-locator.liquid`'s global settings as the data source and `custom-modal-virtual-tour.liquid` for the 360° popup, unchanged |
| `assets/cro-12526-pdp.css` | Shared stylesheet for all `cro-12526-*` sections |
| `assets/cro-12526-pdp.js` | Gallery "view all" forwarding, add-to-cart/quote/backorder click forwarding, freight-tier live recompute, delivery-date calc, complete-setup quote-link forwarding |

## Reused unchanged (via `{% render %}` / `{% section %}` only — nothing copied or edited)

- `product-media-gallery-custom.liquid` — gallery + the existing full-screen zoom/image-viewer popup
- `best-seller-tag.liquid` — promo tag logic, only its position in the DOM moved
- `product-variant-options.liquid` (+ `swatch-input`) — underlying option markup/behaviour
- `buy-buttons_crp.liquid` — real add-to-cart / add-to-quote / back-order submit logic, cart-drawer pre-select via localStorage, MOQ handling
- `price.liquid` — price markup (kept inside `id="price-{{ section.id }}"` so Dawn's `product-info.js` still swaps it live on variant change)
- `modal-opener` / `#PopupModal-modal_change_location` — existing "Change location" popup (defined globally in the header, not rebuilt)
- `custom-modal-virtual-tour.liquid` — 360° popup (Dawn `modal-opener`/`modal-dialog`: close icon, black overlay, closes on outside click / Escape)
- `store-locator.liquid`'s data source — the same `settings.store{N}_showroom_*` global theme settings, so the showrooms row content stays 100% merchant-editable exactly as before
- `product-compare.liquid` — "Compare alternatives" comparison-row logic (tag-metafield resolution, buy-buttons, see-more/less)
- `cross-sell.liquid` — "Combines well with" tag-metafield resolution logic (duplicated into the new section, not rendered, since the card markup needed to change — see test-analysis.md)
- Typeform trigger pattern (`typeform-share getaquoteclick` class + `{{ settings.typeformurls_url_1 }}`) — used verbatim for every "Contact us" / "Plan my fitout" / "Not sure? We'll recommend" / consult-booking CTA on this page
- Product-info tabs (Description/Spec sheet/Dimensions/Brochure/3D models/Assembly instructions/Warranty) — copied byte-for-byte from `main-product_crp.liquid`, per spec "leave completely unchanged"

## Newly built (new markup/logic, not present in the control theme)

- Breadcrumb (parent → child → product name) — see test-analysis.md for why this doesn't reuse `breadcrumb-2.liquid`
- Range/SKU meta placement (desktop beside breadcrumb, mobile below gallery)
- Buy-box layout, star rating markup, freight-tier line + live JS recompute, quantity stepper wrapper, "Complete the setup" card recipe, About Us / Planning / Showrooms visual layer

## Pending client action items

1. **Product range metafield** — no `range` metafield exists in the current theme/catalog (confirmed by grep across the theme-export). `cro-12526-breadcrumb-meta.liquid` checks `product.metafields.custom.range` then `product.metafields.productmeta.range` and simply omits the range line if both are blank. Client needs to create and populate the metafield (or confirm the intended key) for the range text to appear.
2. **Star rating / review count** — no review app is actively wired into the theme (Yotpo markup is present but inert; the one "live" path is `product.metafields.reviews.rating.value` / `.rating_count.value`, currently blank on every product). The buy box's rating block reads those metafields and renders nothing until they're populated — client to confirm the intended review data source.
3. **"Complete the setup" section heading** — schema text setting (`cro-12526-complete-setup.liquid`), copy supplied per collection by the client; ships with a generic fallback string.
4. **"Planning a whole office?" bottom-bar button link** — schema URL setting (`cro-12526-planning.liquid`); falls back to the sitewide Get-a-Quote Typeform popup until the client confirms the real consult-booking destination (dedicated page? Calendly?).
5. **Custom cart vs default Shopify cart** — confirmed default: this build reuses whatever slide-out drawer mechanism the control theme already uses (`cart-drawer.liquid` / Dawn's `<cart-drawer>`), since that's what's live. See test-analysis.md §"Cart mechanism" for the reasoning and the one spot flagged with a TODO.
6. **Showroom row trailing arrow** — carried over from the Figma design with no defined interaction; rendered as decorative only. Confirm intended behaviour (likely "get directions", which `store-locator.liquid`'s `getdirectionbtn` already does elsewhere) before go-live.
7. **Compare Alternatives copy** — the forked `product-compare.liquid` now shows the Figma eyebrow/heading/paragraph copy layered on top of the control's existing comparison-row logic; confirm this is acceptable versus leaving the control's original "Compare similar popular items" heading untouched.

## Theme editor settings parity

`cro-12526-main-product.liquid`'s schema carries over every block type and setting id
from `main-product_crp.liquid` (title/price/sku/inventory/variant_picker/
quantity_selector/buy_buttons/description/specification/design-resources/warranty/
delivery-and-returns/custom-quote-1/assembly-instructions/share/custom_liquid/
collapsible_tab/popup/rating/complementary/icon-with-text) — only the icon dropdown
option lists on `collapsible_tab`/`icon-with-text` were trimmed to a representative
subset (decorative, not core to this test). `cro-12526-showrooms.liquid` retains the
control's only setting id, `showrooms_heading`. The breadcrumb/meta section is
intentionally not merchant-editable, per spec.
