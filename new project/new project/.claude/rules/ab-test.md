# AB Test Rules

## Before Creating — Always Ask First

When the user asks to create an AB test (any phrasing), **before creating any files**, ask:
1. **Client name** — e.g. "Babylonstoren"
2. **Test name** — e.g. "Recipe | Buy Box | PDP Buy Box Redesign | ALL | CRO-12051"

Derive the **test ID** (e.g. `CRO-12051`) and a **short slug** (e.g. `PDP-Buy-Box-Redesign`) from the test name for use in folder naming and CSS body class.

## Folder Structure

```
<ClientName>/
└── <TEST-ID> - <Short Slug>/
    ├── testFiles/
    │   ├── variation.js
    │   └── variation.css
    └── config.json
```

Example for client "Babylonstoren", test "Recipe | Buy Box | PDP Buy Box Redesign | ALL | CRO-12051":

```
Babylonstoren/
└── CRO-12051 - PDP Buy Box Redesign/
    ├── testFiles/
    │   ├── variation.js
    │   └── variation.css
    └── config.json
```

## config.json Format

```json
{
  "files": [
    "testFiles/variation.css",
    "testFiles/variation.js"
  ],
  "urls": [
    ""
  ]
}
```

- Always leave `urls` as an empty string by default unless the user provides a URL.

## variation.css Format

### Rules (always enforce these)

1. **Every rule must be prefixed with `body.<variation_name>`** — derive `<variation_name>` from the test name or the body class that will be added for the test (e.g. `body.cro-pdp-gallery-v2`). Never write a bare selector.
2. **No `nth-child` or `nth-of-type`** — always use a unique class or ID selector instead. If the target element has no unique hook, add a class via the JS `addClass` helper and target that.
3. **All selectors must be unique and scoped** — no generic tag selectors (`div`, `span`, `p`) without a scoped parent under the body class.

### Template

```css
/* Variation B - <test name> */

body.<variation_name> .your-unique-selector {

}
```

### Deriving the body class

Use the test ID lowercased with a dash: `CRO-12051` → `body.cro-12051`. If the client or test provides a specific body class, use that instead.

### Example

```css
/* Variation B - PDP Buy Box Redesign | CRO-12051 */

body.cro-12051 .product-gallery__main {
  display: flex;
}

body.cro-12051 .product-gallery__thumb {
  width: 80px;
}
```

## variation.js Format

Always use the full IIFE + try/catch boilerplate below. Include ALL helper functions — never strip them out, even if not immediately used. The user may call any of them during the test build.

```js
(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "";
    /* all Pure helper functions */

    function waitForElement(selector, trigger) {
      var interval = setInterval(function () {
        if (
          document &&
          document.querySelector(selector) &&
          document.querySelectorAll(selector).length > 0
        ) {
          clearInterval(interval);
          trigger();
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 15000);
    }

    function live(selector, event, callback, context) {
      function addEvent(el, type, handler) {
        if (el.attachEvent) el.attachEvent("on" + type, handler);
        else el.addEventListener(type, handler);
      }
      this &&
        this.Element &&
        (function (ElementPrototype) {
          ElementPrototype.matches =
            ElementPrototype.matches ||
            ElementPrototype.matchesSelector ||
            ElementPrototype.webkitMatchesSelector ||
            ElementPrototype.msMatchesSelector ||
            function (selector) {
              var node = this,
                nodes = (node.parentNode || node.document).querySelectorAll(selector),
                i = -1;
              while (nodes[++i] && nodes[i] != node);
              return !!nodes[i];
            };
        })(Element.prototype);
      function live(selector, event, callback, context) {
        addEvent(context || document, event, function (e) {
          var found,
            el = e.target || e.srcElement;
          while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
          if (found) callback.call(el, e);
        });
      }
      live(selector, event, callback, context);
    }

    function insertHtml(selector, content, position) {
      var el = document.querySelector(selector);
      if (!position) {
        position = "afterend";
      }
      if (el && content) {
        el.insertAdjacentHTML(position, content);
      }
    }

    function innerHTMLContent(selector, content) {
      var el = document.querySelector(selector);
      if (el) {
        el.innerHTML = content;
      }
    }

    function innerChildContent(selector, childNumber, content) {
      var el = document.querySelector(selector);
      if (el.hasChildNodes()) {
        el.childNodes[childNumber].textContent = content;
      }
    }

    function addClass(el, cls) {
      var el = document.querySelector(el);
      if (el) {
        el.classList.add(cls);
      }
    }

    function toggleClass(el, cls) {
      var el = document.querySelector(el);
      if (el) {
        el.classList.toggle(cls);
      }
    }

    function removeClass(el, cls) {
      var el = document.querySelector(el);
      if (el) {
        el.classList.contains(cls) && el.classList.remove(cls);
      }
    }

    function scroll(click, selector) {
      click.addEventListener('click', function (event) {
        event.preventDefault();
        var target = document.querySelector(selector);
        if (target) {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY,
            behavior: 'smooth'
          });
        }
      });
    }

    function waitForSwiper(trigger) {
      var interval = setInterval(function () {
        if (typeof window.Swiper != "undefined") {
          clearInterval(interval);
          trigger();
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 15000);
    }

    function addScript() {
      var scriptOne = document.createElement("script");
      scriptOne.src = "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.min.js";
      document.querySelector("head").appendChild(scriptOne);

      var swiperCss = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.css" crossorigin="anonymous" referrerpolicy="no-referrer" />';
      document.querySelector("head").insertAdjacentHTML("beforeend", swiperCss);
    }

    function initializeSwiper() {
      var galleryThumb = new Swiper(".cro_12_32_47-swiper-thumb-wrapper", {
        slidesPerView: 5,
        spaceBetween: 10,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        slidesPerGroup: 1,
        breakpoints: {
          767: {
            spaceBetween: 12,
          },
        },
      });

      var galleryTop = new Swiper(".cro_12_32_47-swiper-wrapper", {
        slidesPerView: 1,
        loop: false,
        centeredSlides: false,
        navigation: {
          nextEl: ".cro_12_32_47-next",
          prevEl: ".cro_12_32_47-prev",
        },
        speed: 300,
        spaceBetween: 10,
        thumbs: {
          swiper: galleryThumb,
        },
      });
    }

    function init() {
      /* test logic goes here */
    }

    function croEventHandkler() {
      live("selector", "click", function () { });
    }

    if (!window.cro_t_20) {
      croEventHandkler();
      window.cro_t_20 = true;
    }

    waitForElement('body', init);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
```

## Helper Function Reference

| Function | Purpose |
|---|---|
| `waitForElement(selector, trigger)` | Polls every 50ms until selector exists, then calls trigger. Times out at 15s. |
| `live(selector, event, callback, context)` | Event delegation — attaches to document, matches bubbled events against selector. |
| `insertHtml(selector, content, position)` | Inserts HTML adjacent to a selector (`afterend` by default). |
| `innerHTMLContent(selector, content)` | Sets innerHTML of matched element. |
| `innerChildContent(selector, childNumber, content)` | Sets textContent of a child node by index. |
| `addClass(el, cls)` | Adds a class to matched element. |
| `toggleClass(el, cls)` | Toggles a class on matched element. |
| `removeClass(el, cls)` | Removes a class from matched element. |
| `scroll(click, selector)` | Smooth-scrolls to selector when click element is clicked. |
| `waitForSwiper(trigger)` | Polls until `window.Swiper` is available, then calls trigger. Times out at 15s. |
| `addScript()` | Injects Swiper 8.3.2 JS + CSS into `<head>`. |
| `initializeSwiper()` | Initialises a thumb + main Swiper gallery pair. |

## Localhost

To serve the test locally, run:
```
npm exec fecli host config.json
```
Then open an incognito Chrome window at `https://localhost:8080`.
