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
