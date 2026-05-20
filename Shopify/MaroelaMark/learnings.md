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

## Tests Built

| Test | Task | Template | Description |
|------|------|----------|-------------|
| CRO-12303 | Buy Box Trust Strip | `product.cro-12303` | In-stock indicator + payment strip + USP trust list |
