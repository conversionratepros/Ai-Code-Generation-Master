# Recipe OOD | PDP — Buy Box Strikethrough Price | ALL | CRO-12212

**Spec:** https://design.conversionratepros.co.za/onedayonly/pdp/buybox-strikethrough/ (HTML preview — control vs variant, desktop + mobile; no Figma for this test)

## What changes in the variant

1. **Red struck-through was-price** — the was-price (e.g. R3,500) moves onto the same line as the deal price, styled `#E50E62`, `font-weight: 600`, `line-through` (instead of the faint grey line below it).
2. **Savings line** — a new line underneath spells out the rand saving:
   `Retail R3,500 — You save R2,101`
   (Montserrat 14px / 400 / `#747E86`.)
3. **Mobile only** — the whole price block moves up to sit directly under the product name (new `newprice` grid row between `title` and `actions`). The original price inside the sticky bottom buy bar is hidden and the "I want one!" CTA takes the full bar width. On desktop the price already sits under the name, so only styling changes.
4. Nothing else on the page is touched.

## Implementation notes

- **Savings amount = exact `retail − price`** read from the live DOM price elements (`#product-price` + sibling). The backend `__NEXT_DATA__` `saving.fixed` value is percent-derived and rounded (R2,100 for the spec product) and does **not** match the design's R2,101 — deliberately not used.
- Desktop price row found via `#product-price`; mobile buy bar found by walking up from `[data-action="add-to-cart"]` to the grid whose `grid-template-areas` contains `carousel` — no generated `css-*` classes are targeted (they change every build).
- Mobile grid gets a `newprice` area via a scoped `grid-template-areas` override (`max-width: 1023px`; rows are auto-sized, `grid-auto-flow: row`).
- The injected mobile block carries the site's own `hide-for-desktop` utility class so the site CSS hides it at ≥1024px.
- Products without a was-price: no strikethrough, no savings line; the mobile block just shows the price.
- A debounced MutationObserver on the desktop price row + PDP grid re-syncs values after variant selection and re-injects if React wipes the nodes. `locationchange` (dispatched by global.js's patched history) re-inits after client-side navigation.

## QA checklist

- [ ] Desktop: deal price + red strikethrough retail on one baseline, savings line under them.
- [ ] Mobile (<768) and tablet (768–1023): price block under product name, correct font sizes (18px/27px price step-up at 768px).
- [ ] Mobile sticky bar: price gone, CTA full width, still sticky.
- [ ] Change colour/size variant → prices and savings line update.
- [ ] Product without a was-price → no savings line, layout intact.
