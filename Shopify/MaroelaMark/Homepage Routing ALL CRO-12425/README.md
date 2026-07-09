# AB Test | Homepage Routing | All | CRO-12425

Client: **MaroelaMark** (maroelamark.co.za) | Platform: **Shopify OS 2.0** (Empire/PixelUnion custom theme)
Design: [Figma — Maroelamark | CRO-12377 Homepage Routing | V1](https://www.figma.com/design/9tlIjO2sgi9RJ73MkE2omV/?node-id=2-2) (desktop `2-2`, mobile `1-2`)
The Figma file is labelled **CRO-12377**; this build is tracked as **CRO-12425** — same design.

## What this is

An Intelligems **template test**: the rebuilt homepage ships as an alternate
index template (`index.cro-12425.json`). Intelligems serves the variant
template to 50% of visitors; control stays on the live `index.json`.
**No live theme files are modified** — every file is new and prefixed `cro-12425-`.

## Files

| File | Purpose |
|------|---------|
| `templates/index.cro-12425.json` | Variant homepage template (assign in Intelligems) |
| `sections/cro-12425-mobile-search.liquid` | Mobile-only full-width sticky search bar |
| `sections/cro-12425-hero.liquid` | Rebuilt hero: centred heading + button, editable colours |
| `sections/cro-12425-icon-row.liquid` | Audience shortcut circles (4 default items) |
| `sections/cro-12425-category-grid.liquid` | "Koop volgens kategorie" image + colour cards |
| `sections/cro-12425-trust-strip.liquid` | USP strip (3 default items) |
| `sections/cro-12425-product-row.liquid` | Peek carousel product row (used twice: Winskopies + Topverkopers) |
| `sections/cro-12425-brand-story.liquid` | "Die Afrikaanse aanlyn mark" text banner |
| `assets/cro-12425-icon-*.svg` | 7 default icons exported from Figma (4 audience + 3 trust) |

Upload all `sections/`, `assets/` and `templates/` files to the live theme
(they are additive), then open the theme editor on the new template to
finish content.

## Key decisions / how it works

- **Judge.me stars**: Judge.me syncs ratings to the standard
  `product.metafields.reviews.rating` / `reviews.rating_count` metafields and
  the theme's `product-grid-item` already reads them. The product row hides
  the theme's rating markup and renders its own `★★★★★ (n)` row (design
  format) from the same metafields — **no Judge.me widget JS**. The star row
  is hidden entirely when `rating_count` is 0. Confirm with Donavan that this
  metafield approach is acceptable (it is the cleanest, flicker-free option).
- **Product cards** reuse `product-grid-item` untouched. Theme settings
  already give: ATC button always on mobile / hover on desktop
  (`product_grid_show_atc: always`), vendor shown, sale + sold-out badges,
  Afrikaans labels ("Gooi in mandjie" / "Kies opsies" / "Uitverkoop") from
  `locales/af.json`. Scoped CSS in the section recolours title (teal),
  centres text and styles the button orange.
- **"Kies opsies"**: theme default opens a quickshop modal; spec wants
  navigation to the product page. A capture-phase click listener on the
  section intercepts `[data-quickshop-slim]` and navigates instead.
- **Carousel**: dependency-free CSS scroll-snap. Desktop 5 full + half-peek
  6th with teal arrows (disabled at ends, no infinite loop); mobile 80%-wide
  cards (~20% peek), swipe.
- **Mobile search**: plain GET form to `routes.search_url` (standard Shopify
  search). JS toggles `position: fixed` + a spacer once the bar reaches the
  top of the viewport. The section also hides the header's mobile search icon
  via CSS (toggleable setting) — the header file itself is untouched.
  Hidden on ≥860px.
- **Hero exists already** as `dynamic-slideshow` (left-aligned, no button
  colour setting) — rebuilt as a lean single-image section per spec with
  centred content and editable button colour. Template defaults point at the
  same images the live slideshow uses.

## To finish in the theme editor (merchant/dev)

1. **Category grid**: upload the 10 category photos (blocks are pre-created
   with labels + links; images show a placeholder until set).
2. **Product rows**: pick 6+ products per row (blocks are pre-created empty;
   empty blocks are skipped on the storefront but visible as placeholders in
   the editor). Confirm the Topverkopers "Sien alles" link target.
3. **Icon row heading**: net-new addition, not in the design — no default
   copy. Set it in the section settings if the client supplies wording.
4. **Brand story links**: defaults guess `shopify://pages/inligting` (Lees
   meer) and `shopify://pages/word-n-verskaffer` — verify both page handles.
5. Mobile hero image: defaults to the live slideshow's mobile image; replace
   if the design supplies a new crop.

## Intelligems setup

- Template test: control = `index.json`, variant = `index.cro-12425.json`.
- 50/50 split; analyse mobile and desktop separately.
- Suggested primary metric: add-to-cart rate (confirm at setup).

## Design tokens (from Figma)

Teal `#007a80` · Orange `#e99114` · Borders `#e0e0e0` (card `#f1f1f1`) ·
Text `#1d1d1d` / body `#4d4d4d` / muted `#737373` · Price `#484848` ·
Stars `#ffb500` · Hero overlay `rgba(0,0,0,.45)` · Radius 4px (buttons) /
6px (cards) · Headings Montserrat ExtraBold 28px · UI text Nunito Sans ·
Vendor Cutive 12px uppercase (inherited from theme card styles).
