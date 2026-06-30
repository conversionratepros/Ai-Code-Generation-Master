# Test Analysis — Brand Banner | Move Below Products | ALL | CRO-12345

## Overview

This AB test reorders three sections on ARC brand pages so they display **below** the product grid instead of above it. The three sections moved are:

1. **Brand banner** — the full-width hero image at the top of each brand page
2. **Brand description** — the introductory paragraph about the brand
3. **Featured products carousel** — the "ARC Loves" or similar curated product row

The change is purely a DOM reorder. No copy, images, styling, or functionality is altered.

---

## How I Identified the DOM Structure

I used a live Playwright scrape of `https://www.arcstore.co.za/brands/huda-beauty` to map the page's container structure. The ARC platform renders brand pages as a flat sequence of `#content > .content-container` elements, each wrapping one section:

| Index | Element | Identifiers |
|-------|---------|-------------|
| 0 | Brand banner | Has `<img>`, no `<p>`, no `.ProductListCarousel` |
| 1 | Empty separator | No img, no text |
| 2 | Brand description | Has `<p>` with text |
| 3 | Empty separator | No img, no text |
| 4 | Featured products carousel | Has `.ProductListCarousel`, no `<p>` |
| 5 | Product list | Contains `#multiForm` |
| 6+ | Post-list content | Already below product list |

I cross-checked this against two additional brand pages (Clinique and Urban Decay) to confirm the pattern held across different brands. Urban Decay had no featured carousel, confirming the carousel is optional.

The **product list container** is always uniquely identifiable by the presence of `#multiForm` inside it.

---

## Algorithm

### 1. URL checks

```
isBrandPage()   →  pathname matches /^\/brands\/[^/]+$/
isExcluded()    →  pathname matches any entry in EXCLUDED_PATHS
```

If either check fails, the script exits immediately with no DOM changes and no body class added.

### 2. Wait for the product list

```
waitForElement('#multiForm', moveElements)
```

`#multiForm` is the ARC platform's product filter/sort form. It is always inside the product list container and only renders once products are loaded. Waiting for it ensures the full DOM is ready before any moving begins.

### 3. Collect containers before the product list

```
#content > .content-container  →  walk until we hit the one containing #multiForm
```

Everything before that is a candidate for reordering.

### 4. Identify the three sections by structure

- **Brand banner** — first container that has `<img>` and NO `<p>` and NO `.ProductListCarousel`
- **Brand description** — first container that has a non-empty `<p>` element
- **Featured products** — first container that has `.ProductListCarousel` and NO `<p>`

These structural rules work generically across all brand pages without relying on any hardcoded IDs or rowItemContent class numbers, which differ per brand.

### 5. Move in order

```
productListContainer.insertAdjacentElement('afterend', banner)
banner.insertAdjacentElement('afterend', description)
description.insertAdjacentElement('afterend', featured)
```

Result: `product list → banner → description → featured`

Any section that doesn't exist on a given brand page (e.g. no featured carousel) is simply skipped — the anchor for the next element falls back gracefully.

### 6. Hide leftover spacers

After moving the three key sections, any containers that remain before the product list are empty CSS spacers. These are tagged with `cro-12345-spacer` and hidden via the scoped CSS rule:

```css
body.CRP_ARC_SW_Brand_Banner_Below .cro-12345-spacer {
    display: none !important;
}
```

### 7. Double-injection guard

A `cro-12345-done` class is added to `document.body` at the start of `moveElements()`. If the function is called again (e.g. by Convert.com re-injecting the variation), it returns immediately.

---

## Exclusion Logic

The following brand paths are excluded — the script makes no changes and adds no body class on these pages:

- `/brands/dior`
- `/brands/chanel`
- `/brands/sol-de-janeiro`
- `/brands/drunk-elephant`
- `/brands/nars`
- `/brands/maison-margiela`
- `/brands/kylie-cosmetics`
- `/brands/kylie-cosmetics-by-kylie-jenner`
- `/brands/dolce-gabbana`
- `/brands/bvlgari`
- `/bvlgari-fragrances/bvlgari-collections` (non-standard URL — also excluded by the `isBrandPage()` check)

The full exclusion list including any additions should be referenced in the shared spreadsheet linked in the spec.

---

## Playwright Test Coverage

58 tests run across desktop (1280×900) and mobile (390×844):

| Suite | What is tested |
|-------|---------------|
| Regular brand page — element order | Product list before banner; banner before description; description before featured; body class added |
| Empty separators hidden | Spacer containers get `cro-12345-spacer`; CSS hides them; key elements are not marked as spacers |
| Exclusion list (×10 brands) | Original DOM order preserved; no body class; no done guard set |
| Non-brand pages | Home page and PLP page — no class added, no DOM change |
| Brand page without featured carousel | Graceful degradation when `.ProductListCarousel` is absent |
| Double-injection guard | Running the variation JS twice does not duplicate any element |
| Content preservation | Products, banner image, description text, and carousel heading all intact after reorder |

All 58 tests pass on first run.

---

## Key Design Decisions

**Why `#multiForm` as the wait selector?**  
It is the only element on a brand page that is unique, always present in the product list, and only injected after products render. It acts as a reliable "page ready" signal.

**Why structural selectors instead of rowItemContent IDs?**  
The `rowItemContent-XXXXX` class numbers are CMS-generated and unique per brand. Hardcoding them would mean rewriting the test for every brand. The structural approach (img/p/carousel presence) is generic and works sitewide.

**Why `insertAdjacentElement` over `appendChild`?**  
`insertAdjacentElement('afterend', el)` moves the actual DOM node — it does not clone it. Event listeners and React/framework bindings on child elements (e.g. the carousel scroll controls and product click handlers) are fully preserved because the same node is repositioned, not replaced.

**Why CSS to hide spacers instead of JS `removeChild`?**  
The spacer containers may hold CMS-generated IDs or attributes that the platform reads. Removing them with JS risks breaking hidden platform functionality. Hiding with CSS is non-destructive.
