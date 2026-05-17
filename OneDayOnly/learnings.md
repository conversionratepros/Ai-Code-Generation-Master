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

## General Patterns

- **Init flow:** `waitForElement('#product-quantity-select')` → `init()` → add body class → `waitForElement('[data-action="add-to-cart"]')` → build/inject UI.
- **Duplicate-run guard:** `if (!window.cro_XXXXX) { window.cro_XXXXX = true; ... }`
- **CSS scoping:** always prefix every rule with `body.cro-t-odo-XXXXX` to avoid polluting the global scope.
