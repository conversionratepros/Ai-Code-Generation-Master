# AB Test | PDP | Value-prop + Brand-proof + Bundle | ALL | CRO-12473

Client: **MaroelaMark** (maroelamark.co.za) | Platform: **Shopify OS 2.0** (Empire 12.3.0, Pixel Union)
Test type: **Intelligems template test** — the variant ships as an alternate PDP
template (`product.cro-12473.json`); control stays on the live `product.json`.
**No live theme files are modified** — every file is new and prefixed `cro-12473-`.
Built on the theme copy in `../Meta Social Pre-Lander CRO-12245/Theme/` and it
**stacks on the Sprint 1 trust strip (CRO-12303)** — those snippets/assets are
reused untouched.

## Docs

- Technical documentation: https://pippen.conversionratepros.co.za/hq/doc/technical/170
- Spec: https://pippen.conversionratepros.co.za/hq/doc/spec/170
- QA doc: https://pippen.conversionratepros.co.za/hq/qa/170
- Design preview: https://design.conversionratepros.co.za/maroelamark/pdp/conversion-layer-sprint-2/
- Design sources: brain repo `Clients/Maroelamark/Sprints/2026-06 CRO-12378 PDP Conversion Layer Sprint 2/design/`
- ClickUp: https://app.clickup.com/t/869dv3z5y (CRO-12473, Pippen deliverable 170)

## Files

| File | Purpose |
|------|---------|
| `templates/product.cro-12473.json` | Variant PDP template (assign in Intelligems / product admin) |
| `sections/cro-12473-product.liquid` | Main product section — Sprint 1 trust mount kept + Sprint 2 mount, split logic, B2 gate |
| `sections/cro-12473-description.liquid` | A2: full-width "Oor hierdie produk" long-description section (2nd in section order) |
| `snippets/cro-12473-value-prop.liquid` | A1 value-prop line (mount content) |
| `snippets/cro-12473-short-desc.liquid` | A3 short description (mount content) |
| `snippets/cro-12473-trust-line.liquid` | B1 brand-trust line (mount content, zero-review only) |
| `snippets/cro-12473-bundle.liquid` | C bundle card (mount content, blocks/metafield-driven) |
| `assets/cro-12473-pdp.css` | Wrapper visibility + all Sprint 2 styles |
| `assets/cro-12473-pdp.js` | Moves mount content into wrappers + bundle wiring (modeled on cro-12303-buy-box.js) |
| `_design-mock/` | Design-phase injection script + CSS the spec came from — reference only |

Upload `sections/`, `snippets/`, `templates/` and `assets/` files to the live
theme (all additive), then open the theme editor on the new template.

## How it works (CRO-12303 architecture)

1. The section renders the product **exactly** like `static-product` (shared
   `render 'product'` — no fork, no drift risk).
2. New block types `value_prop`, `short_desc`, `bundle` sit in the template's
   `block_order` — `product.liquid` renders them as empty positioned wrappers,
   which CSS hides until filled.
3. The real content server-renders in a hidden `[data-cro-12473-mount]`;
   `cro-12473-pdp.js` moves each piece into its wrapper and reveals it
   (`.cro-12473-filled`). Variant DOM order: rating → title → **value-prop** →
   vendor → price → **short desc** → form (with Sprint 1 trust strip) →
   **bundle** → USPs → wishlist → share.
4. **A2**: the `description` block is simply absent from `block_order` (server-
   side, zero flicker) and `cro-12473-description` renders it full-width
   directly after the main section. No clamp, no toggle (per the injection
   script — it supersedes the older spec's clamp wording).

### Content sources (client decisions — Donavan, Slack 2026-08-06)

- **A1 value-prop**: product metafield `custom.value_prop` wins (Donavan
  created the definition; **confirm the exact namespace/key matches**);
  otherwise the static design line from the section setting
  `cro_value_prop_default` ("Diep kalmte wat jou liggaam opneem. Geen
  dofheid, geen lakseer-drama." — per the design preview, editable in the
  customizer). Client/vendors to populate metafields per product (Nick
  deciding workflow).
- **A3 short desc**: the first **150 characters of the plain description
  text** (`strip_html | truncate: 150` — headings and all styling force-
  flattened to paragraph text, per Donavan's 1a) + a **"Lees meer"** link that
  anchors to `#cro-12473-description` ("Oor hierdie produk") with smooth
  scroll and sticky-header clearance. The `Short description:` /
  `Description:` labels some supplement PDPs author into their text are
  removed before truncation so they can't leak into the blurb.
- **A2 full description**: rendered **completely unmodified** in "Oor hierdie
  produk" below — nothing removed, nothing split (supersedes all earlier
  split/fallback logic).
- **B1/B2 gate**: `product.metafields.reviews.rating_count` (Judge.me syncs
  into standard review metafields — see learnings.md). Zero reviews → trust
  line renders into the empty rating block, and a server-gated
  `:has(.jdgm-review-widget)` style hides the review section (JS fallback for
  non-`:has` browsers). Products with reviews: real stars, review section
  visible, nothing injected.
- **C companions** (per Donavan): the **first collection the product belongs
  to → its first three eligible products** (the product itself and sold-out
  items are skipped, scanning past them until three rows fill). Optional
  per-product override via the `custom.companions` metafield;
  `companion_product` blocks remain as a fallback for products in no
  collection. Note: Liquid orders `product.collections` alphabetically by
  collection title — flag to Donavan if "first" was meant differently.
- **C add-all**: POST `/cart/add.js` with the live main variant (current
  `[data-variants]` value, form quantity) + each checked companion ×1, then
  header cart-count refresh. Total follows checkbox toggles AND
  `variant:changed` price updates.

### Metafield definitions needed (Settings → Custom data → Products)

| Metafield | Type | Used for |
|-----------|------|----------|
| `custom.value_prop` | Single line text | A1 line — the ONLY source (no fallback). Donavan created the definition; confirm the key matches |
| `custom.companions` | List of products | C bundle picks — optional override of the first-collection rule |

## Design-mock bug fixed in this build

The mock's B2 hid the closest `.shopify-section` of **any** zero-review
`.jdgm-widget` — the site footer contains a hidden Judge.me preview badge, so
on live it would have hidden the entire footer. This build scopes to
`.jdgm-review-widget` only (the review section widget).

## Verified (Playwright, simulated server render on the saved control mirror, 2026-08-05)

Block order matches the spec table; all wrappers fill; description out of the
buy box and into the section after main; trust line in the empty rating slot;
review section hidden with footer + main untouched; total R 949,00 → R 600,00
on untick → follows a simulated variant price change (R 250 → R 550); add-all
POSTs `{main variant, qty} + checked companions` and updates the header count;
mount removes itself. Liquid validated for balanced tags; template JSON parses.

## Preview QA round 1 (2026-08-06, theme 154036633786 "CRP May 29" draft)

Structure verified working on the real preview: block order correct,
description relocated to "Oor hierdie produk", Sprint 1 trust elements
injected, trust line + bundle render, total correct (R 1 111,00 on the Blush
bundle), review section hidden, footer/header intact. Two regressions found
and fixed:

1. **Small teal title** — alternate templates make `product.liquid` render the
   title as `<h2>` (its `{% case template %}{% when 'product' %}` doesn't
   match `product.cro-12473`), and the theme's brand CSS only restores the big
   dark heading for `h1.product-title`. Fixed: h1-parity CSS on the h2 (no
   flash) + JS swaps the tag back to `<h1>` (markup identical to control).
2. **English trust labels** — the template JSON copied from the CRO-12303 test
   folder carried English usp/payment labels; live is Afrikaans. Fixed:
   `Landswye aflewering` / `7 dae-terugsendingsbeleid` /
   `Geënkripteerde betaalpunt` / `Veilige betalings via`.

Re-upload after these fixes: `templates/product.cro-12473.json`,
`assets/cro-12473-pdp.css`, `assets/cro-12473-pdp.js`.

**Known preview-only artifacts** (all reproduce on the draft's CONTROL too —
not caused by the cro-12473 files):

- "In stock" shows in English: the May 29 draft's `cro-12303-in-stock.liquid`
  predates the live Afrikaans update ("In voorraad" is hardcoded in that
  snippet on the live theme).
- Mobile "Voorgestelde produkte" renders empty: on the draft theme the
  recommendations AJAX returns 200 but the section never injects cards — on
  control AND variant. On the LIVE theme mobile the same product renders 5
  cards fine (verified 2026-08-06).
- `Failed to construct 'URL': Invalid URL` console errors: present on the
  draft's control as well — pre-existing theme/app issue.

Use a duplicate of the CURRENT live theme for the next QA round. Note the
live store has Sprint 1 baked in: live `product.json` points at the
`cro-12303-product` section — which is why control gets `template == 'product'`
and keeps its h1.

## Preview QA round 2 (2026-08-06)

"Short description not showing" report: verified working on the authored
products (magnesium shows value-prop + short desc + h1 title with the
re-uploaded files). Root cause on other products: only 10 of 2 567 catalog
products have the authored entry-content shape the spec described — the rest
surfaced nothing. Added the first-paragraph fallback (point 2 above),
verified by emulating the split over the full catalog dump: 990 products gain
a blurb, no duplication introduced. Value-prop fallback also tightened to
10–120 chars so a rambling first sentence can't render as a giant teal line.
**Re-upload: `sections/cro-12473-product.liquid` +
`sections/cro-12473-description.liquid`.**

## Preview QA round 3 (2026-08-06) — teaser/anchor/description fixes

1. **"Lees meer" cropped the heading** under the sticky header — the fragment
   jump ignored the overlay. Fixed: `cro-12473-pdp.js` now handles the click,
   measuring the live header height (`.smart-sticky-wrapper` /
   `.site-header`) at click time and smooth-scrolling past it;
   `scroll-margin-top: 130px` kept as a no-JS fallback. Verified on the
   spice-grinder page: heading lands fully visible.
2. **Teaser words glued** ("vinegarNo artificial…") — `strip_html` leaves no
   space where adjacent tags met. Fixed: `replace: '<', ' <'` before
   stripping (every removed tag leaves a space), newlines converted to
   spaces, double spaces collapsed before the 150-char truncate. Verified on
   the real description.
3. **Description restyle** — merchants author lines in h4s/p tags with
   `<p><br></p>` spacers inconsistently. All heading levels inside
   `.cro-12473-desc-body` now render as the same 15.5px bold lead-line, body
   text 15px regular, spacer paragraphs hidden (`:empty` / `:has(> br)`),
   uniform 10px rhythm.

**Re-upload: both `sections/` files + both `assets/` files** (the deployed
description section also predates the `#cro-12473-description` anchor id).

## Preview QA round 4 (2026-08-06) — anchor v2 + static value-prop

1. **"Lees meer" still cropped** — the sticky element is the theme's nav row
   (`#site-header-nav`, ~66 px), not the full header, and it can attach after
   the scroll settles. The handler now measures what is actually pinned over
   the viewport top (candidate list + `elementFromPoint` walk), scrolls with
   that offset (never less than 66 + 20), and re-checks at 650 ms/1300 ms,
   nudging until the heading clears the nav.
2. **Value-prop static default** — new section setting
   `cro_value_prop_default`, defaulted to the design line; metafield still
   wins when set. Every product now shows the brand-voice line.

Re-upload: `sections/cro-12473-product.liquid`, `assets/cro-12473-pdp.js`,
`templates/product.cro-12473.json`.

## Preview QA round 6 (2026-08-06) — teaser sentence separators

Merged blocks in the teaser now read as sentences: closing block tags
(`</p>`, `</h1>`–`</h6>`, `</li>`, `</div>`) become `. ` before stripping
("…Balsamic vinegar. No artificial…"), with cleanup passes so text already
ending in `.`/`!`/`?`/`:` never doubles up, no leading orphan dot, and no
`....` when truncation lands after a period. Emulated across the four
description shapes. **Re-upload: `sections/cro-12473-product.liquid` only.**

## Preview QA round 5 (2026-08-06) — anchor v3 (the real fix)

The sticky overlay is a STACK: the 30 px teal strip plus the smart-sticky
logo/search row pinned BELOW it (~106 px total). The v2 measurement only
counted elements whose top edge sat at the viewport top, so it measured
30 px and believed the heading was clear while the logo row covered it.
v3 probes a column of points down the viewport (y = 6/40/80/120/160) and
takes the deepest bottom edge of any fixed/sticky layer covering a probe —
verified with a real scroll on theme 155670839482: heading lands at 186 px
(desktop) / 126 px (mobile) against a 106 px overlay, fully visible on both.
**Re-upload: `assets/cro-12473-pdp.js` only.**

## QA handover

**Setup**: duplicate the CURRENT live theme (not the May 29 draft), upload all
files from `sections/`, `snippets/`, `templates/`, `assets/`, then open
`/products/<handle>?view=cro-12473` on the duplicate's preview. QA doc:
https://pippen.conversionratepros.co.za/hq/qa/170

**Test matrix** (desktop + mobile):

- [ ] **Any product with a description**: 150-char plain-text teaser under the price (no headings/bold leaking through), "Lees meer" smooth-scrolls to "Oor hierdie produk", which shows the FULL unmodified description; no description in the buy box
- [ ] **Supplement PDP** (e.g. `magnesium-glycinate-tablets-600mg`): the authored "Short description:"/"Description:" labels do NOT appear in the teaser
- [ ] **Value-prop line**: shows ONLY where the metafield is populated; absent elsewhere
- [ ] **Bundle sourcing**: rows = first 3 in-stock products (excluding itself) of the product's first collection; product in no collection falls back to the template's companion blocks
- [ ] **Product WITH reviews**: real stars show, NO trust line, review section visible, nothing else changed
- [ ] **Empty-description product**: no teaser block, no "Oor hierdie produk" section, page otherwise intact
- [ ] **Multi-variant product**: change options — buy box intact, bundle main price + total follow the variant price, no duplicate injections
- [ ] **Bundle**: untick companions → total updates; "Voeg almal by die mandjie" → main product (at chosen qty) + checked companions land in cart, header count updates, button shows "Bygevoeg ✓"
- [ ] **Title**: big dark h1 look identical to control (not small teal)
- [ ] Trust strip labels Afrikaans (Landswye aflewering / 7 dae-terugsendingsbeleid / Geënkripteerde betaalpunt / Veilige betalings via / In voorraad)
- [ ] Sold-out companion is hidden from the bundle; bundle disappears entirely if no companions survive
- [ ] Control (`?view=` removed) unchanged everywhere

**Do NOT log as bugs** (draft-theme artifacts, reproduce on the draft's own
control): English "In stock", empty mobile "Voorgestelde produkte",
`Failed to construct 'URL'` console errors. Also: a leftover QA cart may show
3 items from build-time testing.

## Still to confirm before launch

- [ ] Confirm the value-prop metafield Donavan created is `custom.value_prop` (code reads that key; one-line change if his differs)
- [ ] Value-prop population workflow: client or vendors fill it per product (Nick deciding) — line simply stays absent until populated
- [ ] B1 trust-line copy sign-off with the client (editable: section setting)
- [ ] Confirm "first collection" intent — Liquid sorts `product.collections` alphabetically by title
- [ ] Exclude sold-out hero / gift-card products from template assignment (Andries)
- [ ] Live QA on a multi-variant product (variant repaint, price sync)
- [ ] CRO-12303 trust-strip test concluded (or baked in) before launch — no overlap

Resolved by the 2026-08-06 client decisions: companion picks (first-collection
rule), A2 approach (full description relocated, nothing removed), and the
description-shape concerns (the 150-char plain-text teaser works on every
description shape).

## Pre-launch resets

Swap off the QA-only audience; reset any QA deploy/preview; confirm the 50/50
all-visitor split. Goals — primary: PDP add-to-cart rate; secondary:
begin-checkout, purchase + RPV, products per order. Min runtime 4 weeks; no
reads before 2 full weeks.
