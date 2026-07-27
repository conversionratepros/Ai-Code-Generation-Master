# New Test Pre-flight Checklist

Fill this in before writing a single line of code. Paste it as a comment at the top of your session notes or just answer inline.

---

## 1. Site Tech Stack

| Question | Answer |
|---|---|
| Is the page rendered by React or Next.js? | Yes / No |
| Does the page use a Swiper or carousel component? | Yes / No |
| Is this a Shopify build (Liquid) or a Convert.com JS/CSS overlay? | Shopify / Convert |
| Does the site have a CSP that blocks inline styles or eval? | Yes / No / Unknown |

**If React = Yes:**
- Use `hydrationGuard()` after init
- Use `beforebegin` not `afterbegin` for any Swiper injection
- Do NOT use `live()` for event delegation — attach listeners directly after injection
- Inject HTML first, then `addClass('body', variation_name)` — single paint, no jump

---

## 2. Assets & Icons

| Question | Answer |
|---|---|
| Are there any SVG icons in the design? | Yes / No |
| If yes — have you fetched and read the raw SVG XML? | Yes / No |
| Does the SVG have a `fill` baked inside the `<path>` or `<svg>` element? | Yes / No |

**If SVG fill is baked in:** you cannot override it with CSS `background-color` or `color`. You must replace the SVG source or use `fill` on the element itself.

---

## 3. DOM Timing

| Question | Answer |
|---|---|
| What is the selector for the element that signals the page is ready? | e.g. `.cart-items`, `#content` |
| Is that element injected by JS after load (dynamic) or server-rendered? | Dynamic / Server-rendered |
| Are there price or quantity elements that update after load (AJAX)? | Yes / No |

**Rules:**
- All init logic must be gated behind `waitForElement(targetSelector, init)`
- Never call `querySelector` directly as a guard in `init()`
- If prices update via AJAX → use `observeChanges()` with a flag to avoid duplicate observers

---

## 4. Breakpoints

| Question | Answer |
|---|---|
| Does the design have a separate mobile layout? | Yes / No |
| Mobile breakpoint (default 767px) | ≤767px / other: ___ |
| Desktop breakpoint | ≥1200px / other: ___ |

---

## 5. Figma

| Question | Answer |
|---|---|
| Is a Figma link provided? | Yes / No |
| Have you downloaded all image assets and visually verified they match their label? | Yes / No |

**If Figma assets downloaded:** always open the downloaded files and visually confirm each image matches its intended label before wiring filenames into code (download order ≠ design order).

---

## 6. Quick Copy — Variant Boilerplate

```js
(function () {
    try {
        var debug = 0;
        var variation_name = "cro-[CLIENT]-[ID]";

        function waitForElement(selector, trigger) {
            var interval = setInterval(function () {
                if (document && document.querySelector(selector) && document.querySelectorAll(selector).length > 0) {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(function () { clearInterval(interval); }, 15000);
        }

        function addClass(el, cls) {
            var node = document.querySelector(el);
            if (node) node.classList.add(cls);
        }

        function insertHtml(selector, content, position) {
            var el = document.querySelector(selector);
            if (el && content) el.insertAdjacentHTML(position || 'afterend', content);
        }

        function init() {
            // 1. Inject HTML
            // 2. addClass('body', variation_name)  ← after injection
        }

        waitForElement('READY_SELECTOR', init);
    } catch (e) {
        if (debug) console.log(e, 'error in test ' + variation_name);
    }
})();
```
