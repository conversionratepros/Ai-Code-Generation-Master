# ARC Client Learnings

Site: arcstore.co.za
Platform: Dynamicweb (custom DW commerce)

---

## DOM Structure

### Filter sidebar
- Selector: `#Block__Navigation .facets-container.dw-mod`
- Each filter group is **two sibling elements**: `INPUT.expand-trigger.js-remember-state` followed by `DIV.expand-container.facets-container__box.dw-mod.js-filter`
- The INPUT controls open/close state via CSS `:checked + div` accordion pattern
- Filter label text lives inside the DIV (inside `button`, `legend`, `label`, `h2–h4`, or `span`)
- Mobile filters: `#productList .facets-container.dw-mod` — same structure, separate container

### Platform re-render on filter selection
**Critical:** When a user selects any filter option, ARC **completely replaces** the filter container DOM via AJAX. Any classes added to filter elements are wiped. Always use `MutationObserver` on the stable parent (`#Block__Navigation`) with `subtree: true` to re-apply classes after each re-render. See general ab-test.md for the full `watchFilterContainer` pattern.

### Page headings — inconsistent across pages
ARC PLPs use different heading structures depending on the page:

| Page type | Heading element | Notes |
|---|---|---|
| Top-level category (e.g. `/makeup`) | `h1` inside `.content-row__item__body.sp1` | Update text, hide duplicate h1s |
| Sub-category (e.g. `/makeup/eyes/eye-primer`) | `.content-row__item__body.sp1` exists but contains `h2` (no h1) + `h2.plp-header` elsewhere | Hide `.sp1` container, reveal `h2.plp-header` |
| Other category (e.g. `/electrical`) | Two native h1 elements — one in `.u-margin-bottom--lg`, one in a separate `.content-row__item__body` | After updating the `.sp1` h1, hide all other h1 containers |

### Breadcrumb
- Native breadcrumb selector: `.breadcrumb` (exists on sub-category pages)
- No native breadcrumb on top-level category pages — inject one if absent
- When injecting a heading and a native breadcrumb exists, insert after the breadcrumb's `.content-container` ancestor, not at `afterbegin` of `#content`

### Product list
- Selector: `#productList` — always present on PLPs, reliable `waitForElement` trigger
- Closest `.content-container` ancestor is the layout wrapper — tag it with a class for later targeting

### Promotional banners
- Inside `#ProductsContainer`, non-product divs: `#ProductsContainer > div:not([data-template="GridViewItem"])`
- To relocate: clone them into a new wrapper, insert after the product list container

---

## CSS Patterns

### Body class
`body.cro-XXXX` — always scope every rule to the body class.

### Hiding distracting content
```css
/* Banners/carousels above product list */
body.cro-XXXX .content-container:not(.cro-XXXX-product-list-container):has(.background-image.imgpara),
body.cro-XXXX .content-container:not(.cro-XXXX-product-list-container):has(.ProductListCarousel),
body.cro-XXXX .content-container:not(.cro-XXXX-product-list-container):has(.carousel) {
  display: none;
}
```

### Filter flex ordering
```css
body.cro-XXXX #Block__Navigation .facets-container.dw-mod,
body.cro-XXXX #productList .facets-container.dw-mod {
  display: flex !important;
  flex-direction: column;
}
```

---

## JS Patterns

### Reliable waitForElement triggers (use these)
| Goal | Trigger selector |
|---|---|
| Any PLP logic | `#productList` |
| Heading update | `#productList` (check `.sp1` inside the function) |
| Filter reorder | `#Block__Navigation .facets-container` |
| Mobile filters | `#productList .facets-container` |
| Accordion collapse | `#Block__Navigation input` |

### Heading resolution order
1. Check for `.content-row__item__body.sp1`:
   - Has `h1` → update text, hide other h1 containers
   - Has no `h1` (has h2) → hide `.sp1` container, reveal `h2.plp-header` via keep class
2. No `.sp1` → inject heading from `h2.plp-header` text (or URL slug as fallback), insert after native breadcrumb container

### Filter label helpers
```js
function getFilterLabel(el) {
  var heading = el.querySelector('button, legend, label, h2, h3, h4, span');
  return heading ? heading.textContent.trim().toLowerCase() : '';
}

function getPrecedingInput(el) {
  var prev = el.previousElementSibling;
  return (prev && prev.tagName === 'INPUT') ? prev : null;
}
```
