# Dev Handover — Pre-lander build

This document tells a new developer everything they need to ship, iterate on, or port this pre-lander build to another client.

---

## 1. What this is

A self-contained Shopify section build for marketing pre-lander pages. Three custom sections + one page template + one snippet + a folder of bundled assets. Originally built for Maroelamark's "blikbeker" pre-lander (internal code CRO-12245) but designed for reuse on other clients with minimal porting work.

See [FEATURES.md](FEATURES.md) for the full feature inventory.

---

## 2. Folder layout

```
Meta Social Pre-Lander CRO-12245/
├── ListicleFiles/                 ← Portable source of truth
│   ├── sections/                  ← All 4 section liquid files
│   ├── snippets/                  ← Reusable Liquid snippets
│   ├── templates/                 ← JSON page template
│   ├── assets/                    ← Bundled images, SVG icons
│   ├── FEATURES.md                ← Feature list
│   └── DEV-HANDOVER.md            ← This doc
├── Theme/                         ← Full theme pull of CRP May 29
│   └── (standard Shopify theme structure + our pre-lander files copied in)
├── _backups/                      ← Snapshots taken before major refactors
├── images/                        ← Source design assets (PNG, JPG, SVG)
├── index.html                     ← Static reference HTML
└── styles.css                     ← Static reference CSS
```

**Rule of thumb:** `Theme/` is what gets pushed to Shopify. `ListicleFiles/` is the clean portable copy you'd take to another client. Always keep both in sync if you edit one.

---

## 3. The sections

### 3.1 `pre-lander-crp-hero.liquid`
Top hero with logo, headline + accent text, paragraph, primary CTA, feature image, optional background overlay image, configurable 3-stop gradient background.
- Single instance per template
- All settings live at section level (no blocks)
- ~16 schema fields

### 3.2 `pre-lander-crp-listicle.liquid` (standalone — legacy)
Original single-listicle section, kept on disk as a fallback for cases where someone wants a one-off numbered content block without the group container.

**Most use cases should use `pre-lander-crp-listicle-group` instead.** This file is retained because removing it would break any other templates that still reference it.

### 3.3 `pre-lander-crp-listicle-group.liquid` (preferred)
Packages multiple listicle items into one drop-in section, plus an optional side widget on the right (called "banner column" in the customizer; internally we use "side widget").

- Section-level: banner card (title, paragraph, feature image, CTA), banner background, banner reviews (master toggle + 3 individual reviews)
- Block type `listicle-item`: ~32 settings each, drag/drop reorderable in the customizer
- Inline CSS scoped to `.pre-lander-crp-listicle-group`
- Liquid `capture` blocks render the banner content and reviews once, output in two positions (desktop sticky right rail + mobile bottom block) so editing them updates both at once

### 3.4 `pre-lander-crp-footer-banner.liquid`
Closing call-to-action section: background image, gradient overlay, heading + paragraph, USP trust list, primary CTA, secondary link.

- USP items live as `usp_item` blocks (icon image + label per block)
- Renders the `pre-lander-crp-usp-list.liquid` snippet which iterates those blocks
- Gradient overlay has independent desktop / mobile controls (opacity, start, end)

---

## 4. The snippet

### `pre-lander-crp-usp-list.liquid`
Iterates `section.blocks` of type `usp_item`. Each block has an `icon_image` (image_picker), an optional `icon` select that falls back to the host theme's `icon-library` snippet, and a `label` text.

Originally lifted from `CRO-12303/snippets/cro-12303-usp-list.liquid` and renamed for our prefix. The two are functionally identical — if you fix a bug here, you may want to mirror it in CRO-12303 (and vice versa).

---

## 5. The page template

### `templates/page.pre-lander-blikbeker.json`
Alternate page template that assembles: **hero → listicle-group → footer-banner**.

All defaults are pre-populated from the static HTML reference build (`index.html` + `styles.css` in the project root). The page should render with full content immediately when assigned to a Page.

---

## 6. Bundled assets (in `assets/`)

All prefixed with `pre-lander-crp-`:

| File | Purpose |
|---|---|
| `pre-lander-crp-logo.png` | Hero logo fallback |
| `pre-lander-crp-hero-desktop.png` / `-hero-mobile.png` | Hero feature image fallback |
| `pre-lander-crp-arrow-right.svg` / `-arrow-right-black.svg` | Button + secondary link icons |
| `pre-lander-crp-listicle-01-desktop.jpg` … `-04-desktop.jpg` (+ mobile) | Listicle image fallbacks, keyed by `number_text` |
| `pre-lander-crp-banner.png` | Side widget feature image fallback |
| `pre-lander-crp-bottom-hero.jpg` | Footer banner background fallback |
| `pre-lander-crp-star.svg` | Review card star |
| `pre-lander-crp-check.svg` | "Verified customer" tick |
| `pre-lander-crp-review-avatar-placeholder.png` | Review avatar fallback |

The section liquid files include `asset_url` fallback logic so these images render when the marketer hasn't yet uploaded their own via Shopify Admin → Content → Files.

---

## 7. Pushing changes to Shopify

Work in `Theme/` for anything that ends up on the remote theme. `Theme/` is a fresh pull of CRP May 29 plus our pre-lander files copied in.

### Run the local dev server (recommended for iteration)
```bash
cd "/Users/donavanwallis/Documents/Ai-Code-Generation-Master/Shopify/MaroelaMark/Meta Social Pre-Lander CRO-12245/Theme"
shopify theme dev --store maroel-1649 --theme 154036633786
```
Opens `http://127.0.0.1:9292`. Hot reload on save. Auto-syncs every save up to the remote DEV theme.

### Or push manually
```bash
cd "/Users/donavanwallis/Documents/Ai-Code-Generation-Master/Shopify/MaroelaMark/Meta Social Pre-Lander CRO-12245/Theme"
shopify theme push --store maroel-1649 --theme 154036633786 --nodelete \
  --only sections/pre-lander-crp-*.liquid \
  --only snippets/pre-lander-crp-*.liquid \
  --only templates/page.pre-lander-blikbeker.json \
  --only "assets/pre-lander-crp-*"
```

### Push targets
- **DEV theme:** `CRP May 29` (#154036633786) on store `maroel-1649` — unpublished, safe to push to
- **LIVE theme:** `Empire 12.3.0` (#152791417018) — **never push directly to live**; promote via Shopify Admin after Nick approves the DEV preview

---

## 8. Previewing the template

The myshopify domain redirects to `maroelamark.co.za`, so a few preview paths actually work depending on context.

### Customizer (always works, most reliable for iteration)
```
https://maroel-1649.myshopify.com/admin/themes/154036633786/editor?hr=9292
```
Top-left dropdown → *Pages → Pre-lander Blikbeker*. Hot reload via dev server, every schema field editable on the right.

### Customer-facing preview cookie
```
https://maroelamark.co.za/?preview_theme_id=154036633786
```
Sets the preview cookie on the custom domain, then any URL on that domain renders CRP May 29. **Don't** use the myshopify URL — it 301s to the custom domain and the query string is dropped en route.

### Tokenised share URL (no login required)
Shopify Admin → Online Store → Themes → CRP May 29 → "..." menu → Share preview. Generates a URL with `preview_token=...` that anyone can open.

---

## 9. Porting to another client

Drop-in pattern. The section files are self-contained: inline CSS scoped to unique classes, no shared CSS asset to wire up, no theme-wide JavaScript dependencies.

1. Copy `ListicleFiles/sections/pre-lander-crp-*.liquid` → new client's theme `sections/`
2. Copy `ListicleFiles/snippets/pre-lander-crp-usp-list.liquid` → new client's theme `snippets/`
3. Copy `ListicleFiles/assets/pre-lander-crp-*` → new client's theme `assets/` (replace with client-specific imagery as you go)
4. Copy `ListicleFiles/templates/page.pre-lander-blikbeker.json` → new client's theme `templates/`. Rename the file + section IDs as needed (e.g. `page.pre-lander-clientname.json`). Edit the default text/colours to match the new client's content
5. Push only those files using `--only` flags (see section 7)
6. In Shopify Admin, create a Page assigned to the new template

That's it. No layout file edits, no theme.liquid changes, no JS to wire up.

---

## 10. Gotchas (read these before debugging anything weird)

### 10.1 `shopify theme dev --path <minimal-dir>` is destructive
If you run `theme dev` pointing at a folder that doesn't have the full theme pulled (e.g. `ListicleFiles/`), the CLI will try to **delete** every remote file that's not in your local folder so the remote mirrors local. Critical Shopify files (theme.liquid, settings_data.json, gift_card.liquid, settings_schema.json) are protected by Shopify's API and won't actually delete — but section/snippet/asset files don't have the same protection. Always run theme dev from `Theme/`, which has the full pull.

### 10.2 myshopify → custom domain redirect strips query params
`maroel-1649.myshopify.com` 301-redirects to `maroelamark.co.za`. The `?preview_theme_id=` query param doesn't survive the redirect, so the preview cookie never gets set if you start from the myshopify URL. Use the custom domain URL directly, or the tokenised share URL, or the customizer.

### 10.3 Liquid bracket access can't include chained filters
This is **invalid** in Shopify Liquid and will throw a syntax error:
```liquid
{{ section.settings[prefix | append: 'star_count'] }}
```
Assign the key string to a variable first, then access:
```liquid
{%- assign full_key = prefix | append: 'star_count' -%}
{{ section.settings[full_key] }}
```

### 10.4 `image_picker` can't be pre-populated from template JSON
Template JSONs can only set `image_picker` settings to Shopify File references — they can't point at bundled `assets/` files. The standard workaround used in this build: each section's liquid implements an `asset_url` fallback based on a known setting (e.g. `number_text` for the listicle fallback images). When a marketer hasn't picked an image yet, the bundled asset shows.

### 10.5 Admin "Theme template" dropdown reads from the LIVE theme only
A page template that only exists on the unpublished DEV theme will NOT appear in the Pages admin's Theme template dropdown. Two ways around it:
- Preview via the customizer's template selector (top-left dropdown)
- Create a Page on the default template + add `?view=pre-lander-blikbeker` to the URL when previewing the DEV theme

When you publish to live, the template appears in the dropdown and marketers can assign normally.

### 10.6 Sticky banner + overflow flexbox quirk
The side widget uses `position: sticky` + `max-height: calc(100vh - 80px)` + `overflow-y: auto`. Children inside it (the banner card and the review stack) must have `flex-shrink: 0` or flexbox tries to squash them to fit the viewport instead of letting the parent scroll. If you add a new child element inside the banner, add `flex-shrink: 0` to its CSS.

### 10.7 Listicle group main column width comes from the GRID, not the section
The main listicle column is locked to 781px via `grid-template-columns: minmax(0, 781px) 359px;` on the inner container. The inner needs `max-width: 1440px` and `padding: 60px 120px` so the grid math (`781 + 60 gap + 359 = 1200`) fits in the inner content box. If you ever change one number, recalculate the others.

---

## 11. Naming reference

- **"side widget"** — internal name for the column that appears as the sticky right rail on desktop / block at the bottom on mobile inside the listicle-group section. The customizer labels this **"Banner column"** (the term shown to marketers).
- **"listicle group"** — the packaged section that holds 1–N listicle items + the optional side widget. File name: `pre-lander-crp-listicle-group.liquid`. Customizer label: **"Pre-lander Listicle Group"**.
- **"listicle item"** — one numbered content block inside the listicle group. Block type ID: `listicle-item`.
- **CRO-12245** — the internal CRP project code for the Maroelamark Meta Social Pre-lander build. Reference only — not used in any code identifiers.

---

## 12. Open / known gaps

| Item | Note |
|---|---|
| USP icon defaults | Image_picker can't be pre-populated, so default USP items render with empty icon space. Marketer needs to upload icons to Files and select them per block. Could be solved by hardcoding fallback asset URLs in the snippet. |
| Mobile background image — footer banner | Currently uses the same image as desktop, cropped via `object-position: center bottom`. If a campaign needs a distinct portrait-aspect mobile crop, add a second `image_picker` setting and a mobile `<source>` swap. |
| Gradient direction | Hardcoded: left-to-right on desktop, top-to-bottom on mobile. If a campaign needs different angles, expose as a select field (4 presets) or a numeric range (degrees). |
| Layout / nav-hiding | The footer banner doesn't hide the host theme's header and footer by itself. To make a true full-screen pre-lander, either edit the host theme's `layout/theme.liquid` to conditionally skip header/footer when `template == 'page.pre-lander-blikbeker'`, or use a dedicated layout file (`layout/pre-lander.liquid`) referenced by the template JSON's `"layout"` property. Not built yet. |
| Standalone listicle section | The original `pre-lander-crp-listicle.liquid` is still on disk for fallback. If a future template never references it, it can be removed. Backup exists in `_backups/`. |

---

## 13. Where to start if something breaks

1. **Customizer doesn't show updated settings:** the theme dev server may need restarting (`lsof -ti :9292 | xargs kill -9`, then re-run). The customizer caches schema separately from the storefront preview.
2. **Layout looks wrong after a CSS edit:** check the inline `style=""` on the section element first — many tokens (colours, gradient stops) come from CSS vars set inline.
3. **Liquid syntax error:** the most common cause is the bracket-access pattern in section 10.3 above.
4. **Pre-lander page returns 404:** the page handle in Shopify Admin probably doesn't exist, or the template assignment is missing. Or the redirect issue (10.2). Test with the customizer URL first — if that works, the rendering is fine and the issue is page-level.
5. **Files pushed but not showing:** the CDN sometimes caches assets by content hash. If you edit a CSS asset and the change doesn't appear, add or edit a comment in the file to bust the cache. Liquid section files are server-rendered and don't have this issue.

---
*Last updated: 2026-05-30. Update this doc when you ship new sections or change the build pattern significantly.*
