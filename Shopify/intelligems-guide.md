# Shopify — Intelligems AB Test Guide

---

## What is Intelligems

Intelligems is a Shopify app for running A/B tests via JavaScript/CSS injection, without editing theme files directly. Tests are created inside the Intelligems dashboard and injected at runtime based on traffic splits and targeting rules.

---

## Test Types

| Type | When to use |
|------|-------------|
| **Onsite Edit** | JS/CSS injection — use this for all CRO code-based tests |
| Split URL | Redirect users to a different URL variant |
| Template | Test different Shopify page templates |
| Theme | Test full theme redesigns |
| Pricing / Shipping | Profit tests — require Plus plan |

**Always use Onsite Edit for JS injection tests.**

---

## JavaScript Injection Timing

| Option | When to use |
|--------|-------------|
| **Immediately** | Do NOT use — fires before the DOM is ready |
| **After Page Load** | Use this — DOM and third-party scripts (e.g. Typeform) are loaded |
| Delay | Only if you need a timed delay for a specific reason |

**Always select "After Page Load".**

---

## Page Targeting Rules

Intelligems matches on the **URL path only** — everything after the domain. Do NOT include the domain name in targeting rules.

| Goal | Rule |
|------|------|
| All pages | URL Path **contains** `/` |
| Exclude checkout | AND URL Path **does not contain** `/checkout` |
| Specific collection | URL Path **contains** `/collections/your-collection` |
| Homepage only | URL Path **is exactly** `/` |

**Common mistake:** entering `www.domain.com` in the path field — this will never match and the test won't run on any page.

---

## JS Code Structure

All Intelligems tests follow the same IIFE + try/catch boilerplate:

```js
(function () {
    try {
        var debug = 0;
        var variation_name = "cro-XXXXX";

        /* helper functions: waitForElement, addClass, live, etc. */

        function init() {
            addClass("body", variation_name);
            /* test logic */
        }

        waitForElement("body", init);

    } catch (e) {
        if (debug) console.log(e, "error in Test cro-XXXXX");
    }
})();
```

### Key rules
- Always wrap in IIFE + try/catch
- Always add body class via `addClass("body", variation_name)`
- Always use `waitForElement` — never call `querySelector` directly as a top-level guard
- Body class format: `cro-XXXXX` (lowercase, hyphenated) e.g. `cro-12287`
- Use double-inject guards: `if (el.getAttribute('data-croXXXXX')) return;`
- Never edit Shopify theme files directly — JS injection only

---

## CSS Structure

All CSS must be scoped to the body class:

```css
body.cro-XXXXX .your-selector {
    /* styles */
}
```

### Key rules
- Never write bare/unscoped selectors
- No `nth-child` or `nth-of-type` — use class hooks instead
- All selectors prefixed with `body.cro-XXXXX`

---

## Typeform Popup Tests (JasonL-specific)

JasonL uses Typeform embed popups in the header. The button does **not** use a real `href` — it uses:

```html
<a class="typeform-share typeform-embed"
   data-tf-popup="FORM_ID"
   href="javascript:void(0)">
  Get a quote
</a>
```

### How to swap the form

Changing `href` does nothing. To swap the Typeform:

1. Target `[data-tf-popup]` elements
2. **Clone** the element — this strips Typeform's registered click event listeners
3. Set `data-tf-popup` to the new form ID on the clone
4. Add a fallback click handler using `window.tf.createPopup(NEW_FORM_ID).open()`
5. Replace the old element with the clone

```js
var buttons = document.querySelectorAll('[data-tf-popup]');
buttons.forEach(function (oldBtn) {
    if (oldBtn.getAttribute('data-cro12287')) return;
    var newBtn = oldBtn.cloneNode(true);
    newBtn.setAttribute('data-cro12287', '1');
    newBtn.setAttribute('data-tf-popup', NEW_FORM_ID);
    newBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (window.tf && typeof window.tf.createPopup === 'function') {
            window.tf.createPopup(NEW_FORM_ID).open();
        } else {
            window.open(NEW_TYPEFORM_URL, '_blank');
        }
    });
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);
});
```

### URL parameters

JasonL's Typeform **automatically captures URL parameters** (UTMs, gclid, fbclid, etc.) and passes them to their middleware as hidden fields. **Do not manually forward params** — Typeform handles this natively.

---

## Folder Structure

```
Shopify/
└── <client>/
    └── <Test Name> | ALL | CRO-XXXXX/
        ├── testFiles/
        │   ├── variation.js
        │   └── variation.css
        ├── config.json
        └── QA-test-cases.md
```

### config.json

```json
{
  "files": [
    "testFiles/variation.css",
    "testFiles/variation.js"
  ],
  "urls": [
    "https://www.client-domain.com"
  ]
}
```

---

## Local Development

Run the test locally before uploading to Intelligems:

```bash
cd "path/to/test/folder"
npm exec fecli host config.json
```

Then open **incognito Chrome** at `https://localhost:8080` and navigate to the client site.

---

## Intelligems Upload Steps

1. Shopify Admin → Apps → Intelligems
2. Create Test → **Onsite Edit**
3. Name the test (match the CRO ticket name)
4. On Variation B: paste `variation.js` into the JavaScript tab
5. On Variation B: paste `variation.css` into the CSS Styles tab
6. Set injection timing to **After Page Load**
7. Page Targeting: URL Path contains `/` AND does not contain `/checkout`
8. Set traffic split (default 50/50)
9. Preview and QA before launching

---

## Access

Intelligems access is managed per Shopify store. For JasonL:
- Store: `jasonl4.myshopify.com`
- Access granted by: **Donavan**
