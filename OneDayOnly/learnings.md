# One Day Only — Technical Learnings

Accumulated from CRO tests on onedayonly.co.za. Update this file whenever you discover something new about the site's stack, selectors, or behaviour.

---

## Stack

- **Framework:** Next.js / React (SSR + client hydration)
- **Fonts:** Montserrat
- **Routing:** Client-side via Next.js router

---

## PDP — Buy Box

### Key Selectors

| Element | Selector |
|---|---|
| Quantity dropdown (native) | `#product-quantity-select` |
| Add-to-cart / "I want" button | `[data-action="add-to-cart"]` |

### DOM Structure (buy box)

```
<div>                                          ← qty block root
  <label class="css-*">Quantity</label>        ← native qty label (generated class)
  <div class="css-* grid">                     ← select wrapper
    <select id="product-quantity-select">      ← native qty dropdown (options 1–N)
    </select>
  </div>
</div>
```

- The native label class (e.g. `css-1ez8z1a`) is **generated at build time** — never target it by class in CSS or JS. Navigate via DOM structure instead.
- The select is capped at the available stock quantity (not a fixed 10). Always read min/max from the actual `<option>` values.

### Quantity Stepper Pattern (CRO-10326)

- **Insert stepper** directly after `#product-quantity-select` using `sel.parentNode.insertBefore(wrapper, sel.nextSibling)` — places it inside the same grid container.
- **Hide native select** via CSS: `body.VARIATION #product-quantity-select { display: none !important; }`
- Do NOT hide the parent/grandparent container — that removes the native label too and disrupts layout.
- **Sync native select** on every stepper change (dispatch `change` + `input`) so React/Next.js listeners update cart state correctly.

### Variant change → qty options update (MutationObserver gotchas)

When the user picks a variant, React removes the current `<option>` elements one-by-one before adding the new ones. This means:

1. **Same node, mutated in place** — `#product-quantity-select` is NOT replaced; React mutates its children. A standard `MutationObserver({ childList: true })` on the select does fire.
2. **Fires 9+ times per variant change** — one callback per option removal. Reading limits and updating the stepper on every intermediate state causes a feedback loop (each `updateNativeSelect` dispatches a `change` event that triggers React mid-render).
3. **Fix: debounce the observer callback (200ms)** — wait until React finishes all option mutations before reading limits. Also do NOT call `updateNativeSelect` inside the observer; only update the stepper UI.

```js
var debounceTimer = null;
var observer = new MutationObserver(function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
        var limits = getSelectLimits();
        if (!limits) return; // guard: temporarily empty mid-render
        // update QTY_MIN, QTY_MAX, clamp currentQty, update stepper UI
        // do NOT call updateNativeSelect here
    }, 200);
});
observer.observe(sel, { childList: true, subtree: true });
```

### Pricing (CRO-12212)

| Element | Selector |
|---|---|
| Desktop price | `#product-price` (h2, always in DOM at every viewport) |
| Desktop was-price | `#product-price`'s `nextElementSibling` div (absent on non-discounted products — validate text looks like `R…`) |
| Desktop price container | parent of `#product-price` (`.show-for-desktop.css-roynbj`) |
| Mobile price block | `.hide-for-desktop` inside the sticky buy bar |

- **PDP grid container**: find it by walking up from `[data-action="add-to-cart"]` until an ancestor's computed `grid-template-areas` contains `carousel`. Base (mobile) areas: `"carousel" "title" "actions" "payflex" "additional" "price" "details" "button"`; desktop areas set at `min-width: 1024px`. Rows are auto (`grid-auto-flow: row`, no `grid-template-rows`), so extra areas can be added via a scoped `grid-template-areas` override.
- **Mobile sticky buy bar** = the `grid-area: button` child (`position: sticky; bottom: 16px`, `grid-template-columns: 1fr 1fr` = price | CTA).
- **Breakpoints**: mobile <768, tablet 768–1023, desktop ≥1024. `hide-for-desktop` hides ≥1024; `show-for-desktop` hides ≤1023. Buy bar price font steps 1.28571rem → 1.92857rem at 768px (html font-size is 14px).
- **`__NEXT_DATA__` pricing**: `product.price.value`, `product.retailPrice.value` are exact; `product.saving.fixed` is **percent-derived and rounded** (e.g. R2,100 when the true retail − price = R2,101) — compute savings as `retail − price`, don't use `saving.fixed`.
- **Expired deals**: React replaces the whole buy box with an "AG NO MAN! This deal has expired!" panel after hydration (SSR HTML still contains prices). Deals rotate daily — always QA against a product from today's homepage.
- `[data-action="add-to-cart"]` is added by **our global.js**, not the site — it only exists where the Convert project JS runs. When testing locally with Playwright, inject `OneDayOnly/global.js` before the variation files.

### Design spec workflow (no Figma)

ODO specs now come as HTML previews at `design.conversionratepros.co.za/onedayonly/...` — an index page linking `control-desktop.html`, `variant-desktop.html`, `control-mobile.html`, `variant-mobile.html` (saved post-hydration DOM of the live page with the change applied inline). To extract the exact change: download all four, pretty-print (`.replace(/></g,'>\n<')`), and `diff` control vs variant — the designer's inline styles are the spec values.

### "I want" Button

- The primary CTA displays dynamic text: **"I want one"**, **"I want two"**, etc.
- Text uses written words for quantities 1–25; **"I want [to be confirmed]"** for quantities above 25.
- The button may contain nested `<span>` elements — check for a span matching `/i want/i` before falling back to `btn.textContent`.

---

## Brand / Design Tokens

| Token | Value |
|---|---|
| Primary blue | `#0093D0` |
| Blue hover | `#007AB3` |
| Blue active | `#006699` |
| Disabled blue | `#B3D9ED` |
| Input border | `#99ABB9` |
| Error / sale red | `#E50E62` |
| Font family | `'Montserrat', sans-serif` |

---

## PLP / Shop Pages (from CRO-8037)

- **Card selector:** `.unbxdanalyticsProduct` (tag also carries `data-unbxd-identifier`). Card `id` = product slug + date suffix; `data-pid` = numeric id.
- **DOM structure:** every card sits alone in its own `<section>` inside a flex-item wrapper (emotion class; `flex: 0 1 33.333%/25%/50%` desktop, `100%/50%` mobile — widths vary per section pattern) inside a wrapping flex container (one per data section), all stacked in a `display: grid` parent. Gutters = `padding-left` on wrappers (32px desktop / 16px mobile) + negative `margin-left` on the container.
- **Page data:** `pageProps.(categoryPage|shopPage|clearanceSale).items[].props.items` — the arrays contain **null/dead slots** (expired deals) that never render a card. Always filter `p && p.id` before counting products. `prod.id` is the slug and appears in card hrefs (`/products/<id>`).
- **`window.__NEXT_DATA__` goes stale after SPA navigation** — read live props via `window.next.router.components[router.route].props.pageProps` with a `__NEXT_DATA__` fallback.
- **Cards mount progressively after first paint.** Anything computing visual rows must keep re-validating for several seconds and must measure the flex-item **wrappers**, not the cards — wrappers occupy layout before card content paints (cards report height 0 while mounting).
- **Clearance-sale virtualises the list on scroll**: card wrappers are unmounted as they leave the viewport region and replaced with spacer `<div>`s (DOM card count hovers ~24–60 out of ~500); scrolled-past cards *remount* when you scroll back. Foreign injected nodes are left alone by React and keep their absolute position next to the spacers. Consequence for injected content: never let a position fallback that counts *rendered* cards relocate an already-placed element (it will chase the scroll position); pin placement and only move it when the anchor product's card is actually in the DOM. A `MutationObserver({childList:true})` on the injected node's container fires exactly on virtualisation mount/unmount cycles.

---

## General Patterns

- **Init flow:** `waitForElement('#product-quantity-select')` → `init()` → add body class → `waitForElement('[data-action="add-to-cart"]')` → build/inject UI.
- **Duplicate-run guard:** `if (!window.cro_XXXXX) { window.cro_XXXXX = true; ... }`
- **CSS scoping:** always prefix every rule with `body.cro-t-odo-XXXXX` to avoid polluting the global scope.
- **SPA navigation is handled by Convert itself** — do NOT add `locationchange` re-init listeners inside variation.js. Convert re-executes the experiment on client-side navigation (global.js pushes `executeExperiment` on locationchange); the `window.cro_XXXXX` guard then prevents duplicate observers, and build functions are idempotent.
