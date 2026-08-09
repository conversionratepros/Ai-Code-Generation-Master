# JasonL — Client Learnings

Client: **JasonL** (jasonl.com.au) | Platform: **Shopify (OS 2.0)**
Theme base: Dawn-derived custom theme

---

## Theme Architecture

- Homepage hero is `sections/hero-banner-b.liquid`, type `hero-banner-b`, rendered via the `"hero"` key in `templates/index.json`. Headline/description/button are hardcoded in the section (not all schema-driven) — the only schema settings are the background images and the CTA button text/link.
- The "GET A QUOTE" / "START YOUR FITOUT" buttons across the theme don't navigate — they open a **Typeform popup**. The trigger pattern is: a link/button with class `typeform-share` (plus cosmetic classes like `get-a-quote-btn-ab getaquoteclick`) and the raw attribute output `{{ settings.typeformurls_url_1 }}` (renders `data-tf-popup="..."` etc from theme settings), `href="javascript:void(0)"`, `data-tf-on-ready="ready"`. The Typeform embed script (`embed.typeform.com/next/embed.js`, injected globally via `assets/js_homepage.js`) auto-binds to any element with a `data-tf-popup` attribute — no custom JS needed to wire a new "Get a quote" trigger, just copy the class list + attribute output from `snippets/header-contacts.liquid`.
- Predictive search is **standard Dawn**: `<predictive-search>` custom element (`assets/predictive-search.js`, extends `SearchForm` from `assets/search-form.js`) fetches `routes.predictive_search_url?q=...&section_id=predictive-search` and renders the `predictive-search` section's markup into a local `[data-predictive-search]` div. Multiple `<predictive-search>` instances are supported on one page out of the box (`this.allPredictiveSearchInstances` keeps result caches in sync) — so a second search bar elsewhere on the page (e.g. a homepage hero) just needs to reuse the same form markup (`snippets/header-search.liquid` minus the `<details-modal>` wrapper) and it gets identical live suggestions automatically. Both `predictive-search.js`/`search-form.js` and `routes.predictive_search_url`/`component-predictive-search.css` are loaded **unconditionally** in `layout/theme.liquid` (gated only by `settings.predictive_search_enabled`), so no extra script tags are required.
- Graceful degradation is free: the predictive search markup is a real `<form action="{{ routes.search_url }}" method="get">`. If `predictive-search.js` fails to load, the unrecognized `<predictive-search>` custom element just behaves like an inline wrapper and the form still submits natively to the search results page.

## Alternate Homepage Template Pattern (CRO tests)

Shopify supports alternate templates for the homepage the same way as product/page templates: `templates/index.<suffix>.json`, served via `/?view=<suffix>`. The repo already had `templates/index.variant-b.json` as precedent before CRO-12405.

To build a homepage CRO test without touching the live `index.json`:
1. Duplicate `templates/index.json` exactly into `templates/index.cro-XXXXX.json`.
2. Only change the section(s) in scope (e.g. swap the `"hero"` key's `"type"` to a new section type) — leave every other section/order entry byte-identical.
3. Build the new section as `sections/cro-XXXXX-*.liquid` with its own schema (settings + blocks), never editing `hero-banner-b.liquid` or any other existing section.
4. Because the swap happens in the served template (server-rendered), there's no client-side hero swap and therefore **no flash of the old hero** — this is preferable to a JS-based DOM swap for above-the-fold elements.

## Editable Category/Tile Blocks Pattern

When a CRO spec calls for a merchant-editable repeating tile list (image + text + link), use a repeatable section block with `image_picker` + `text` + `url` settings. Since `image_picker` defaults can't reference a not-yet-uploaded file, ship Figma-exported placeholder images as bundled theme assets and fall back to them in Liquid when `block.settings.image` is blank:

```liquid
{%- if block.settings.image -%}
  <img src="{{ block.settings.image | image_url: width: 192 }}" ...>
{%- else -%}
  <img src="{{ fallback_asset | asset_url }}" ...>
{%- endif -%}
```

`block.settings.image` always wins once the merchant uploads one — same precedence pattern as the USP List image-picker-over-icon rule.

## Tests Built

| Test | Task | Template | Description |
|------|------|----------|--------------|
| CRO-12282 | Quote Form Native Cart redesign | `sections/cro-12282-custom-checkout.liquid` | Request-a-Quote / Purchase Order custom checkout page redesign |
| CRO-12287 | Get a Quote — Typeform sitewide router | — | Sitewide "Get a Quote" Typeform redesign |
| CRO-12327 | Credibility Trust Bar | — | Trust bar, test 1 of credibility system |
| CRO-12405 | Homepage ATF — Search + Category Pills | `templates/index.cro-12405.json` → `sections/cro-12405-hero-search.liquid` | Replaces static homepage hero with a predictive-search bar (reuses Dawn's nav search exactly), a Typeform "Get a Quote" link (reuses header's trigger exactly), and 8 editable category tiles (image_picker + url, falls back to bundled Figma placeholder images) |
| CRO-12359 | PDP V2 — USPs, keep shipping table | `templates/product.crp.json` → `sections/main-product_crp.liquid` | V2 of the PDP buy-box test: in-place edit of the existing crp variant template (shipping `<details>` now `open` by default; USP row-1 word now category-mapped via `get_product_category`, office-chairs → "Ergonomic", fallback "Modular"; over-$10k quote link switched to settings-driven Typeform attrs) |
| CRO-12526 | Full Page — PDP Redesign Buy-first | `templates/product.cro-12526.json` → `sections/cro-12526-main-product.liquid` | Full PDP redesign, buy-first buy box (Add to Cart primary, Add to Quote demoted to secondary — opposite emphasis from CRO-12170/12359's quote-first crp lineage). New sections for Complete the setup, About us, Planning a whole office, Showrooms; `product-compare.liquid` forked (same pattern as CRO-12359: template-gate line + light copy edits) rather than a from-scratch compare section |
| CRO-12526 (v2) | Full Page — PDP Redesign Buy-first, fresh rebuild | `templates/product.cro-12526-v2.json` → `sections/cro-12526-v2-main-product.liquid` | Section-by-section rebuild (2026-07-26, top section done: breadcrumb/meta, gallery, buy box; tabs verbatim). Fixes two v1 data-model mistakes (see "JasonL PDP option model" below); price/freight updates now via the theme's own `PUB_SUB_EVENTS.variantChange` pub/sub instead of price-text regex. Remaining page sections pending design hand-offs. |
| CRO-HP (ticket TBC) | Homepage Redesign \| All | `templates/index.cro-hp.json` → 12 `cro-hp-*` sections | Full ten-beat homepage rebuild (hero → proof band → how-it-works → interior design → case studies → pricing+estimator → furniture door → people → showrooms → final ask → own footer + mobile sticky bar). Shared `cro-hp.css/js` design system |

## Full-template homepage builds (CRO-HP findings)

- **Template JSON must instantiate blocks explicitly.** Section-schema `presets` only
  apply when a merchant adds the section in the theme editor — a `templates/index.*.json`
  entry gets NO preset blocks. Every repeatable block (trust items, stats, logos, steps,
  tiers, chips, cards) must be written into the template JSON with ids + `block_order`.
- **Replacing the theme footer per-template:** theme.liquid renders `{% section 'footer-custom' %}`
  on every page; an alternate template can't remove it. Hide it with CSS scoped to the
  template body class (`body.index-cro-hp .footer-wrapper { display:none !important }` —
  body-classes.liquid emits `{{template.name}}-{{template.suffix}}` for free) and render a
  custom footer section as the last template section.
- **Typeform popup with dynamic hidden fields:** embed.js binds `data-tf-popup` elements at
  load and captures config then — editing `data-tf-hidden` later is unreliable. Deterministic
  path: capture-phase document click listener on the trigger → `e.preventDefault()/stopPropagation()`
  → `window.tf.createPopup(formId, { hidden: {...} }).open()` (formId read off the element's
  `data-tf-popup`, which `{{ settings.typeformurls_url_1 }}` renders). Keep the stock
  `typeform-share getaquoteclick` classes so existing GA bindings keep firing, and fall back
  to the native binding when no dynamic values exist.
- **Scroll-in animations must be no-JS safe:** apply the hidden start-state class from JS
  (`el.classList.add('crohp-anim-ready')`) rather than in base CSS, so a script failure never
  leaves content invisible. `prefers-reduced-motion` renders final state immediately.
- **Board SVG exports are the colour source of truth** — this board's mustard (#EDBC3A) and
  band black (#1B1C15) don't match the spec text's colour assignments; curl the asset SVGs and
  read the fills before writing tokens (same lesson as the SVG-inspection rule).

## The `cro-12526` PDP Buy-first Template

`templates/product.cro-12526.json` → `sections/cro-12526-main-product.liquid` is a
**separate lineage from the `crp` variant** (does not extend `product.crp.json` — built
fresh alongside it), because its core bet (Add to Cart primary, Add to Quote secondary)
is the opposite of what `buy-buttons_crp.liquid` visually emphasises. It still reuses
`buy-buttons_crp.liquid`'s real submit/quote/backorder buttons for 100% of the actual
add-to-cart/quote/backorder logic — the new visible buttons just render hidden and
forward `.click()` calls onto the real ones (`[data-cro12526-realbuttons]`). This is a
generally reusable pattern for any future test that needs a *different visual emphasis*
of an existing button set without touching the button snippet itself.

## JasonL PDP option model — sizes are sibling PRODUCTS, swatch images are a metafield

Two facts any PDP rebuild must respect (both got wrong in the CRO-12526 v1 picker and
were corrected in v2):

1. **"Size" is not a Shopify variant option.** It comes from
   `product.metafields.productmeta.product_sizes` — markup of the form
   `[title]Select a size[/title][item][opt]1800L x 1450W[/opt][redirect]product-handle[/redirect][/item]...`
   (optional `[default]` flag) — and every size is a **separate product**; choosing one
   navigates to that product's URL. The real Shopify options (leg colour, top colour,
   modesty panel, ...) are numbered AFTER the size field via the `size_count` offset
   that `main-product_crp.liquid` passes into `product-variant-picker`. Shopify option
   names already include the prompt (e.g. `Select a leg colour`) — don't prepend
   "Select a".
2. **Option swatch/value images come from `productmeta.product_options` markup**,
   parsed inside `product-variant-options.liquid` (`picker_type: 'button'` branch:
   radio + label + 38px `<img>`; matching is option-name AND value). Dawn's native
   `value.swatch` data is NOT populated on this store — rendering the `swatch` /
   `swatch-input` branch produces empty grey swatches. To restyle options as colour
   squares, reuse the `button` branch markup and restyle with CSS.

Also: `pubsub.js` + `constants.js` are loaded globally by theme.liquid, and
`product-info.js` publishes `PUB_SUB_EVENTS.variantChange` with
`{ data: { sectionId, html, variant } }` — subscribing to that is the clean way for
custom PDP JS to react to option changes (variant.price is in cents; variant.sku
included). The global change-location popup is `#PopupModal-modal_change_location`
(rendered by theme.liquid on every page), and the chosen region is stored as JSON
`{code, name, source}` in `localStorage['region']`.

## Hard DOM dependencies every custom JasonL PDP section MUST satisfy

Found via live QA of CRO-12526 v2 (2026-07-26). The theme's global JS makes
unguarded lookups; a custom main-product section that omits any of these breaks
core flows with NO obvious connection to the symptom:

1. **`.quantity__rules-cart .loading__spinner` must exist inside `<product-info>`**
   (control keeps it in the quantity label). `product-info.js#fetchQuantityRules`
   is subscribed to the `cartUpdate` pub/sub event, which `product-form.js`
   publishes synchronously BEFORE `cart.renderContents()`. If the lookup throws,
   the exception propagates through `publish()` back into product-form's `.then()`
   → **the cart drawer silently never opens after add-to-cart/add-to-quote**
   (the /cart/add POST still succeeds — items land in the cart).
2. **`#cpylinkbtn-title` and `.showsku[data-variant-id]` must exist (exactly once)**
   — `product-info.js#showsku` runs on EVERY option change and getElementById's
   them unguarded; missing → option changes crash before the price swap /
   variantChange publish.
3. **`#options_container` must wrap the option pickers** — inline MutationObserver
   scripts in `product-media-gallery-custom.liquid` and the main product section's
   tail (Tippy re-init + option-image preloader) observe that exact id and throw
   on load without it.
4. **`PUB_SUB_EVENTS` is a top-level `const`** in constants.js — reachable as a
   bare identifier from later scripts but `window.PUB_SUB_EVENTS` is `undefined`.
   Feature-detect with `typeof PUB_SUB_EVENTS !== 'undefined'`, never via window.
5. **`body.product-template` gates perth.js's region-change reload** (that reload
   is what refreshes the "Get it by" date on the live PDP). Suffixed templates
   never get the class from body-classes.liquid — the live control is the
   UNSUFFIXED product.json — so alternate-template PDP tests must add it
   themselves (`document.body.classList.add('product-template')`).
6. **Dawn CSS trap:** `.product-form__input` gets `flex: 0 0 100%; max-width: 44rem`
   from section-main-product.css — any flex row containing the quantity wrapper
   must override flex/width/max-width explicitly or siblings get crushed.
7. **Regional stock state is perth.js, not Liquid**: on page load perth.js reads
   `#page-load-info` (rendered by `store_availability_quickadd` — include it!) and
   sets `preorder-show` or `buynow-show` on `.product-form__buttons` for the
   user's region. Under `preorder-show` the control hides BOTH Add to Cart and
   Add to Quote — only Back-Order (and the qty stepper) remain, and the delivery
   line swaps to the estimated-availability line (verified live on
   lark-drafting-chair: `product.available` is TRUE in JSON, buttons enabled in
   HTML — visibility is 100% this runtime class). Custom buy boxes must mirror
   this state or back-order products become purchasable.
8. `localStorage['clickedCartBtn']` ends up as the REAL submit button's innerText
   ("Buy now" — the add_to_cart translation) via cart-payment-options.liquid's
   global click binding on `.product-form__buttons button[name="add"]` — identical
   on control, not a bug.

## Tag-metafield product-recommendation system (`shop.metafields.tagproducts`)

JasonL's "Combines well with" (`sections/cross-sell.liquid`) and "Compare alternatives"
(`sections/product-compare.liquid`) are **two independent systems sharing one metafield
namespace**, `shop.metafields.tagproducts`, keyed by a handleized-and-truncated (24
char) product tag with a suffix:
- `_c` suffix → cross-sell (comma-separated list of product **handles** to recommend
  alongside this product)
- `_x` suffix → compare (comma-separated list of product **handles** to compare against)

Both sections independently walk `product.tags`, build the `{tag}_c` / `{tag}_x` key,
look it up on the shop metafield, and fall back to parsing a legacy `[redirect]...
[/redirect]` marker out of `product.description` (a size-variant-to-canonical-product
link) if the direct tag lookup finds nothing. Neither is Shopify's native product
recommendations API — `sections/related-products.liquid` (`routes.product_recommendations_url`)
is the one genuinely native recommendations section in the theme, and it is **not**
included in either `product.crp.json` or `product.cro-12526.json`.

`sections/product-range.liquid` ("this product is part of a range") is unrelated to
both — it derives range membership from **collection template suffix** (any collection
the product belongs to whose `template_suffix` contains "range"), not a product
metafield. No `range` metafield exists anywhere in the codebase today (confirmed by
grep) — CRO-12526's breadcrumb range/SKU line checks `product.metafields.custom.range`
/ `productmeta.range` defensively and simply omits the line when both are blank.

## Showrooms data model

`sections/showrooms.liquid` has exactly one real setting (`showrooms_heading`) — all
actual showroom content (name/address/phone/email/image/matterport ID/opening hours/
display order, 8 slots) lives in **global theme settings**, `settings.store{N}_showroom_*`
(N = 1–8), consumed by `snippets/store-locator.liquid`'s loop, not by section blocks or
a metaobject. Any rebuild of the showrooms section should read those same global
settings keys rather than re-platforming showroom data onto blocks — it's already fully
merchant-editable via Theme Settings. The 360°/Matterport popup trigger
(`snippets/custom-modal-virtual-tour.liquid`) is a clean, reusable, unchanged
Dawn `modal-opener`/`modal-dialog` pair — only renders when `store{N}_matterport_id`
is set.

## "Get it by [date]" delivery estimate is NOT Shopify-native

Despite reading like a Shopify shipping/localization feature, the "Get it by [date]"
line on the PDP (`snippets/product-shipping-and-returns.liquid`,
`sections/main-product_crp.liquid`) is pure custom client-side JS
(`window.calcWeekend`) that walks forward `settings.delivery_days_jasonl` /
`settings.delivery_days_suppliers` business days from `now`, skipping weekends and
adding a day for orders placed after 3pm — plus a set of **hardcoded Christmas-period
date-string overrides** baked directly into the script (specific `Dec`/`Jan` date
literals, not calculated). Any new PDP variant that wants this line has to either reuse
one of the two existing copies of this script or port its own trimmed copy (CRO-12526
intentionally dropped the Christmas overrides — see its test-analysis.md — and flagged
porting them back in if the test is still live over a holiday period).

## Native Dawn `<quantity-input>` custom element

`main-product_crp.liquid`'s `quantity_selector` block uses the **stock Dawn**
`<quantity-input>` custom element (`-`/`+` buttons + a `type="number"` input,
`form="{{ product_form_id }}"`) — not a custom stepper. Any new buy-box build that
needs a quantity stepper should reuse this markup verbatim rather than hand-rolling one;
it already handles min/step from `quantity_rule`/MOQ metafields and ties into the
existing product form via the `form` attribute alone (no extra JS required).


## The `crp` PDP Variant Template (layered CRO tests)

`templates/product.crp.json` → `sections/main-product_crp.liquid` is a long-lived
variant PDP that CRO tests layer onto rather than rebuild:
- `buy-buttons_crp.liquid` came from **CRO-12170** (Add to Quote journey — Add to Cart
  hidden in DOM but kept for form submission, ATQ/Back-Order full-width via
  `.crp-buy-box` in `main-product-crp.css`).
- The fulfilment USP list, assembly notice, `shipping-rates-table_crp.liquid`, and
  returns block were added for **CRO-12359**.
- Buy Now is removed via the template JSON (`buy_buttons` block →
  `"show_dynamic_checkout": false`), not by editing the snippet — the payment button
  is Shopify's dynamic checkout `{{ form | payment_button }}`.
- Body class is `product-crp` (from `body-classes.liquid`:
  `{{template.name}}-{{template.suffix}}`); `main-product-crp.css` mirrors
  `product-page.css` rules there because that stylesheet scopes to `.product-template`.
- Stock-state UI: `.crp-instock-text` / `.crp-backorder-text` are both in the DOM;
  CSS toggles them via `html:has(.product-form__buttons.preorder-show)` (class set by
  `product-info.js` and by Liquid for `contact-to-purchase` products).
- Product category for per-category copy: `{% render 'get_product_category', product: product %}`
  returns the product's parent collection **title** by matching `product.collections`
  against the `main-menu-image-without-more-testing` linklist (same lookup the contact
  popup uses) — handleize it before mapping.

## GA4 Event Tracking on JasonL (CRO-12465 findings)

The GA4 property `G-W3QG4GQNB5` is loaded on every page **twice into the default
`dataLayer`**: by GTM (`GTM-TCCRT9`) and by a plain theme `gtag/js?id=G-W3QG4GQNB5`
include (plus a third copy inside Shopify's sandboxed Google & YouTube channel pixel,
which is unreachable from page JS). Consequences for firing custom GA4 events:

- **`window.gtag(...)` silently drops events.** The site's `window.gtag` is
  `function(){o.push(arguments)}` where `o` is a stale captured queue that is never
  processed — verified: no collect hit fires.
- **A second isolated gtag instance (`gtag/js?...&l=customLayer`) never processes its
  queue** because `google_tag_manager['G-W3QG4GQNB5']` is already registered — the layer
  stays raw (`push === Array.prototype.push`).
- **What works:** push a gtag-style `arguments` object straight onto the default layer
  (must be an Arguments object, not an array):

  ```js
  function g() { window.dataLayer.push(arguments); }
  g('event', 'my_event', { my_param: 'x', send_to: 'G-W3QG4GQNB5' });
  ```

  Verified live: collect POST to `analytics.google.com/g/collect` with
  `en=my_event&ep.my_param=x`, often **batched** — the event name sits in the POST body,
  not the URL, so network checks must inspect the body.

## Formbricks (survey tool used by CRO-12465)

- Responses are submitted with the public unauthenticated client API:
  `POST https://app.formbricks.com/api/v1/client/{environmentId}/responses` with
  `{ surveyId, finished: true, data: { [questionId]: ["<choice label>"] } }`.
- The "workspace" ID in the new Formbricks dashboard URL
  (`/workspaces/{id}/surveys/...`) **is** the client-API environment ID.
- Choice answers are matched by **label text**, not choice ID.
