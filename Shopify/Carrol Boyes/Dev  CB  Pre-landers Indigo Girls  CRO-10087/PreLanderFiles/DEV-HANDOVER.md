# Dev Handover — Carrol Boyes Indigo Girls Pre-lander (CRO-10087)

This document tells a new developer everything they need to ship, iterate on, or port this pre-lander build.

---

## 1. What this is

A self-contained Shopify page build for Carrol Boyes' "Indigo Girls Canister Set — Mix of 3" marketing pre-lander. Twelve custom sections + one page template + one dedicated layout file + a folder of bundled assets. All filenames use the CRP-generic `pre-lander-crp-` prefix so the build is reusable on any other client (only the JSON template slug varies per campaign).

Internal CRP project code: **CRO-10087**. Reference only — not used in any file or class names.

Built on top of the canonical pre-lander pattern documented at `Shopify/MaroelaMark/Meta Social Pre-Lander CRO-12245/ListicleFiles/DEV-HANDOVER.md` — go read that first for the broader architecture rationale.

---

## 2. Folder layout

```
Dev  CB  Pre-landers Indigo Girls  CRO-10087/
├── PreLanderFiles/             ← Portable source of truth (the bundle)
│   ├── layout/                 ← 1 layout file
│   ├── sections/               ← 11 section liquid files
│   ├── templates/              ← 1 JSON page template
│   ├── assets/                 ← 33 bundled images, SVG icons
│   └── DEV-HANDOVER.md         ← This doc
├── Theme/                      ← Full Carrol Boyes theme pull
│   └── (standard Shopify theme structure + our pre-lander files copied in)
├── index.html                  ← Static reference HTML mockup
└── style.css                   ← Static reference CSS mockup
```

**Rule of thumb:** `Theme/` is what gets pushed to Shopify. `PreLanderFiles/` is the clean portable copy you'd take to another client. Always keep both in sync if you edit one — see section 12 for current sync status.

---

## 3. The sections (11 files)

All in `PreLanderFiles/sections/`. Each uses inline scoped CSS, no shared CSS asset, no theme-wide JS dependency.

| # | File | Display name | What it does |
|---|---|---|---|
| 1 | `pre-lander-crp-hero.liquid` | Pre-lander Hero | Top hero — logo, headline, accent quote, primary CTA, background image, configurable 3-stop gradient. Stacks the same gradient 3× in CSS for a darker overlay effect. |
| 2 | `pre-lander-crp-stats-bar.liquid` | Pre-lander Stats Bar | 4-column stats strip with icon + big number + small caption per block. Block-driven. |
| 3 | `pre-lander-crp-story.liquid` | Pre-lander Story | Heading + intro + multi-paragraph body. Plain text section, no images. |
| 4 | `pre-lander-crp-featured-in.liquid` | Pre-lander Featured In | "AS FEATURED IN" press logo row. Block-driven, optional dividers + separators. |
| 5 | `pre-lander-crp-quote.liquid` | Pre-lander Quote | Single customer review card with attribution. |
| 6 | `pre-lander-crp-comparison.liquid` | Pre-lander Comparison | CB vs competitor 2-column table with check/cross icons. |
| 7 | `pre-lander-crp-feature-cards.liquid` | Pre-lander Feature Cards | Three numbered feature cards in a row. Optional icon row + review under each card. Each card has alternating left/right image position. Used **twice** in the template (cards 01-03 and 04-06). |
| 8 | `pre-lander-crp-banner.liquid` | Pre-lander Banner | Mid-page CTA banner — background image with overlay opacity, heading + subtext + button. |
| 9 | `pre-lander-crp-lifestyle-banner.liquid` | Pre-lander Lifestyle | "Why this set is different…" lifestyle section. Background image + independent desktop+mobile gradient controls. |
| 10 | `pre-lander-crp-product-cta.liquid` | Pre-lander Product CTA | Product card section — render image + title + meta + price + installment row + pay logo blocks + CTA button + shipping row blocks. |
| 11 | `pre-lander-crp-trust-bar.liquid` | Pre-lander Trust Bar | Black footer trust strip with icon + big text + small text per block. |

### Schema name length

Every section's schema `"name"` is at most **25 characters**. Shopify rejects longer names with `Invalid schema: name is too long (max 25 characters)`. Use the convention `"Pre-lander {Topic}"` and keep `{Topic}` short enough to fit.

---

## 4. The page template

### `templates/page.cro-10087.json`

```json
{
  "layout": "pre-lander-crp",
  "sections": { ... 12 entries ... },
  "order": [
    "pre-lander-hero",
    "pre-lander-stats-bar",
    "pre-lander-story",
    "pre-lander-featured-in",
    "pre-lander-quote",
    "pre-lander-comparison",
    "pre-lander-feature-cards",
    "pre-lander-banner",
    "pre-lander-feature-cards-2",
    "pre-lander-lifestyle-banner",
    "pre-lander-product-cta",
    "pre-lander-trust-bar"
  ]
}
```

All defaults are pre-populated from the static HTML reference build (`index.html` + `style.css` at the project root). The page renders with full content immediately when assigned to a Page.

The top-level `"layout": "pre-lander-crp"` key tells Shopify to use `layout/pre-lander-crp.liquid` for this template only. Every other page on the store still uses the standard `theme.liquid`.

---

## 5. The layout file

### `layout/pre-lander-crp.liquid`

A stripped-down version of the host theme's `layout/theme.liquid`. **Cuts**: header, footer, overlay group (newsletter popup, cart drawer), back-to-top, swym-fix (wishlist), promo-link script, mapstore script, quick-view.js, compare.js. **Keeps**: full `<head>` (meta, fonts, vendor.css, theme.css, `{{ content_for_header }}`, theme.js, vendor.js, design-mode bits, `js-variables`, `code_head` metafield), body opening with `code_body` metafield, accessibility skip-to-content, optional page-transition, `<main id="MainContent">` with `{{ content_for_layout }}`, a11y screen-reader messages.

Result: zero distractions, zero exit paths. Just the 12 sections rendering inside an otherwise blank theme shell.

Body classes still include `pre-lander-crp-body` so you can target this layout in CSS if you ever need to (e.g. removing default theme body padding).

---

## 6. Bundled assets (in `assets/`)

All prefixed with `pre-lander-crp-`. Every section that takes an image uses `image_picker` with an `asset_url` fallback to one of these bundled files, so the page renders with default imagery until a marketer uploads their own via Shopify Admin → Content → Files.

| File pattern | Count | Used by section |
|---|---|---|
| `pre-lander-crp-hero-bg.jpg`, `pre-lander-crp-banner-bg.jpg`, `pre-lander-crp-lifestyle-bg.jpg` | 3 | Hero, Banner, Lifestyle backgrounds |
| `pre-lander-crp-logo.png` | 1 | Hero logo |
| `pre-lander-crp-stat-icon-01.svg` → `-04.svg` | 4 | Stats Bar icons |
| `pre-lander-crp-story-product.jpg` | 1 | Story image (currently unused but kept) |
| `pre-lander-crp-featured-logo-01.png` → `-04.png` | 4 | Featured In press logos |
| `pre-lander-crp-comparison-cb.png`, `-competitor.png`, `-check.png`, `-cross.svg` | 4 | Comparison table imagery |
| `pre-lander-crp-feature-card-icon.png` + `pre-lander-crp-feature-card-image-01.png` → `-06.png` | 7 | Feature Cards |
| `pre-lander-crp-product-image.png`, `pre-lander-crp-pay-logo-01.png` → `-04.png`, `pre-lander-crp-check.svg` | 6 | Product CTA |
| `pre-lander-crp-trust-icon-01.svg`, `-02.svg`, `-03.svg` | 3 | Trust Bar |
| **TOTAL** | **33** | |

Block-positioned fallback pattern: for repeatable blocks (e.g. pay logos, trust items), the liquid uses `forloop.index` to pick the matching `-0X.svg` asset. Drop a marketer image to override.

---

## 7. Pushing changes to Shopify

Work in `Theme/` for anything that ends up on the remote theme. Edit a file in `PreLanderFiles/`? Copy it across to the matching `Theme/` path before pushing.

### DEV theme

- **Store handle:** `tqvz23-up` (myshopify domain: `tqvz23-up.myshopify.com`)
- **DEV theme ID:** `194323448177`
- **DEV theme name:** `CRP Master of Hyper`
- **Editor URL:** `https://admin.shopify.com/store/tqvz23-up/themes/194323448177/editor`
- **Custom domain (production):** `carrolboyes.com`

### LIVE theme

**Never push directly to live.** The LIVE theme ID is intentionally not recorded here so a typo can't accidentally hit production. Promotion to live happens via Shopify Admin → Themes → "Publish" after the operator approves the DEV preview.

### Push command

```bash
cd "/Users/donavanwallis/Documents/Ai-Code-Generation-Master/Shopify/Carrol Boyes/Dev  CB  Pre-landers Indigo Girls  CRO-10087/Theme"
shopify theme push --store tqvz23-up --theme 194323448177 --nodelete \
  --only layout/pre-lander-crp.liquid \
  --only sections/pre-lander-crp-*.liquid \
  --only templates/page.cro-10087.json \
  --only "assets/pre-lander-crp-*"
```

`--only` restricts the push to the listed files. `--nodelete` prevents the CLI from auto-removing remote files that aren't in the local sync. Mandatory belt-and-braces when pushing a subset.

### Pre-push checklist (mandatory)

1. Confirm the theme name + ID match the DEV theme above
2. State exactly which files will be pushed
3. Wait for the operator's explicit "yes" before running `shopify theme push`
4. Never push without `--only` flags scoped to `pre-lander-crp-*` files

---

## 8. Previewing the template

### Customizer (always works, best for iteration)

```
https://admin.shopify.com/store/tqvz23-up/themes/194323448177/editor?previewPath=%2Fpages%2Fabout-carrol-boyes%3Fview%3Dcro-10087
```

Top-left dropdown → *Pages → about-carrol-boyes (or whichever page is assigned the cro-10087 template)*. Hot reload, every schema field editable on the right.

### Customer-facing preview cookie

```
https://carrolboyes.com/?preview_theme_id=194323448177
```

Sets the preview cookie on the custom domain, then any URL on that domain renders the DEV theme. **Don't** use the myshopify URL — the 301 to the custom domain strips the query string and the cookie never gets set. Same gotcha as Maroelamark.

### Tokenised share URL

Shopify Admin → Online Store → Themes → CRP Master of Hyper → "..." menu → Share preview. Generates a URL with `preview_token=...` that anyone can open without logging in.

---

## 9. Porting to another client

The whole `PreLanderFiles/` folder is designed as a drop-in bundle. The section files are self-contained: inline CSS scoped to unique classes, no shared CSS asset to wire up, no theme-wide JavaScript dependencies.

1. Copy `PreLanderFiles/sections/pre-lander-crp-*.liquid` → new client's theme `sections/`
2. Copy `PreLanderFiles/layout/pre-lander-crp.liquid` → new client's theme `layout/`
3. Copy `PreLanderFiles/assets/pre-lander-crp-*` → new client's theme `assets/` (swap with client-specific imagery as the campaign needs)
4. Copy `PreLanderFiles/templates/page.cro-10087.json` → new client's theme `templates/`. Rename the file + section IDs to match the new campaign (e.g. `page.cro-XXXXX.json`). Edit the default text/colours to match the new client's content. Keep `"layout": "pre-lander-crp"` at the top.
5. Push only those files using `--only` flags (see section 7)
6. In Shopify Admin, create a Page assigned to the new template

No layout file edits to the host theme, no theme.liquid changes, no JS to wire up.

---

## 10. Gotchas (read before debugging anything weird)

### 10.1 Shopify section schema `name` is 25 chars max

Adding a new section with a longer schema `"name"` fails the push:
```
Invalid schema: name is too long (max 25 characters)
```
This stops the entire push — referencing files in template JSONs also fail with `Section type 'X' does not refer to an existing section file`. Already hit on this build (`Pre-lander Lifestyle Banner` was 27 chars). Use the `Pre-lander {Topic}` convention and keep `{Topic}` short.

### 10.2 `image_picker` can't be pre-populated from template JSON

Template JSONs can only set `image_picker` settings to Shopify File references — they can't point at bundled `assets/` files. Workaround used throughout this build: each section's liquid implements an `asset_url` fallback based on a known setting (block position via `forloop.index` for repeatable blocks; section setting check for single images). When a marketer hasn't picked an image, the bundled asset shows.

### 10.3 Custom domain redirect strips query params

`tqvz23-up.myshopify.com` 301-redirects to `carrolboyes.com`. The `?preview_theme_id=` query param doesn't survive the redirect, so the preview cookie never gets set if you start from the myshopify URL. Use the custom domain URL directly, the tokenised share URL, or the customizer.

### 10.4 Liquid bracket access can't include chained filters

This is invalid Liquid and throws a syntax error:
```liquid
{{ section.settings[prefix | append: 'star_count'] }}
```
Assign the key string to a variable first, then access:
```liquid
{%- assign full_key = prefix | append: 'star_count' -%}
{{ section.settings[full_key] }}
```

### 10.5 Admin "Theme template" dropdown reads from the LIVE theme only

A page template that only exists on the unpublished DEV theme will NOT appear in the Pages admin's Theme template dropdown. Two ways around it:
- Preview via the customizer's template selector
- Create a Page on the default template + add `?view=cro-10087` to the URL when previewing the DEV theme

When you publish to live, the template appears in the dropdown and marketers can assign normally.

### 10.6 Pre-lander icon images for trust bar / pay logos are SVG, not PNG

Trust bar icons and check icons are SVG. Pay logos are PNG. When you swap them for a new client, the asset URL fallback is hardcoded to the file extension (`.svg` for icons, `.png` for logos) — if you replace an SVG with a PNG (or vice versa), update the asset_url filename in the section liquid too.

---

## 11. Naming reference

- **`pre-lander-crp-`** — universal file prefix. Every section, snippet, asset, and layout file uses it. CRP-generic, never client-specific.
- **`cro-10087`** — the only campaign-specific code. Used in the template filename (`page.cro-10087.json`) and nowhere else. Future campaigns get a new `cro-XXXXX.json` template only.
- **CRO-10087** — internal CRP project code for the Carrol Boyes Indigo Girls Canister Set pre-lander. Reference only — not used in any file or class names.
- **`PreLanderFiles/`** — portable copy of just the pre-lander files. Named to match the MaroelaMark `ListicleFiles/` convention (with a slightly more descriptive name for this build).

---

## 12. Open / known gaps

| Item | Status | Note |
|---|---|---|
| Layout file `pre-lander-crp.liquid` | **Staged in `PreLanderFiles/` only** | Not yet copied to `Theme/layout/`, not yet pushed to remote DEV theme. Operator paused pushing before the layout work landed. To finish: copy `PreLanderFiles/layout/pre-lander-crp.liquid` → `Theme/layout/`, also copy `PreLanderFiles/templates/page.cro-10087.json` → `Theme/templates/` (it has the new `"layout"` key), then push both. |
| `pre-lander-crp-product-bleed.png` orphan | **On remote DEV theme** | Was pushed earlier, then the bleed functionality was removed. The asset is unreferenced but still on the remote. Harmless. Clean up by manually deleting via Shopify Admin → Assets if it bothers you. |
| `pre-lander-crp-story-product.jpg` | **On disk** | In the bundled assets but the Story section currently uses no image. Kept in case future iteration adds one. |

---

## 13. Where to start if something breaks

1. **Customizer doesn't show updated settings:** restart the theme dev server (`lsof -ti :9292 | xargs kill -9`, then re-run). The customizer caches schema separately from the storefront preview.
2. **Schema rejected on push:** check schema `"name"` length (10.1) and any chained filter inside bracket access (10.4).
3. **Section type does not refer to existing section file:** likely the section file failed to push due to a schema error — fix the section, re-push both the section and the template JSON together.
4. **Layout looks wrong after a CSS edit:** check the inline `style=""` on the section element first — many tokens (colours, gradient stops) come from CSS vars set inline.
5. **Pre-lander page returns 404:** the page handle in Shopify Admin probably doesn't exist, or the template assignment is missing. Or the redirect issue (10.3). Test with the customizer URL first — if that works, the rendering is fine and the issue is page-level.
6. **Header/footer/popups still showing on the pre-lander page:** the `"layout"` key in the template JSON isn't being read. Confirm `templates/page.cro-10087.json` has `"layout": "pre-lander-crp"` at the top, the layout file exists at `layout/pre-lander-crp.liquid` on the remote theme, and that the page in Shopify Admin is assigned to this template (not the default `page.liquid`).
7. **Files pushed but not showing:** CDN sometimes caches assets by content hash. If you edit a CSS asset and the change doesn't appear, add or edit a comment in the file to bust the cache. Liquid section files are server-rendered and don't have this issue.

---
*Last updated: 2026-06-09. Update this doc when you ship new sections, change the build pattern significantly, or close items in section 12.*
