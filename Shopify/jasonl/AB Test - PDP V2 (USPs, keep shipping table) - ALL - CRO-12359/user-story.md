# AB Test | PDP V2 (USPs, keep shipping table) | ALL | CRO-12359

**Client:** JasonL (jasonl.com.au) — Shopify OS 2.0, Dawn-derived theme
**Targeted pages:** All product detail pages (e.g. https://www.jasonl.com.au/products/finch-ergonomic-mesh-chair)
**Devices:** Desktop + mobile
**Test type:** Liquid template test (Intelligems) — live `product.json` vs variant `product.crp.json`
**Design reference:** `design.html` (saved snapshot of the built variant page, supplied by test owner)
**Control reference:** `Control.html` (live PDP fetched 2026-07-13)

---

## Background

Version 2 of the JasonL PDP buy-box test. The variant template already exists in the
theme (`templates/product.crp.json` → `sections/main-product_crp.liquid`), built up
across CRO-12170 (Add to Quote journey) and CRO-12359 V1. Per spec, nothing is built
from scratch — V2 is the existing variant with two deltas (see below).

## What the existing variant already covers (verified against `design.html`)

| Spec item | Where | Status |
|---|---|---|
| 3-row fulfilment USP list (icons, stacked) | `main-product_crp.liquid` `.crp-fulfillment-list` | already built |
| Row 2: in-stock line w/ delivery date, or estimated availability date | same section + delivery-days script + `preorder-show` CSS toggle | already built |
| Row 3: 10-day fitouts static line | same section | already built |
| Buy Now removed | `product.crp.json` → buy_buttons block `show_dynamic_checkout: false` | already built |
| Add to Cart hidden, Add to Quote / Back-Order full-width | `buy-buttons_crp.liquid` + `main-product-crp.css` `.crp-buy-box` rules | already built |
| Assembly notice below buy button | `.crp-assembly-notice` in section | already built |
| Flat-rate shipping table ($49 / $149 / $199), header + chevron, collapsible | `shipping-rates-table_crp.liquid` | already built |
| "Orders over $10k? Contact us for a quote" → Typeform popup | same snippet | already built (hardening applied, see below) |
| Nationwide delivery row w/ globe icon | same snippet | already built |
| Returns block ("Return" heading, 14-day line, T&Cs link new tab) | `.crp-returns` in section | already built |

## V2 changes applied in this folder

1. **Shipping table expanded by default** — added `open` to
   `<details class="crp-shipping-details">` in `snippets/shipping-rates-table_crp.liquid`.
   Chevron open/collapsed rotation already handled by existing `[open]` CSS.
2. **Category-specific USP word (row 1)** — `sections/main-product_crp.liquid` no longer
   hardcodes "Modular". The parent category is resolved via the existing
   `get_product_category` snippet (main-menu collection lookup, same as the contact
   popup uses), handleized, and mapped through a `case` per the spec's mapping table.
   Matching is on the handleized **collection title** (verified via
   `/collections.json` — two differ from the URL handle):

   | Spec category | Collection title (live) | handleized match | Word |
   |---|---|---|---|
   | Chairs | Office Chairs | `office-chairs` | Ergonomic |
   | Desks | Office Desks | `office-desks` | Adjustable |
   | Workstations | Office Workstations | `office-workstations` | Modular |
   | Storage | Office Storage | `office-storage` | Modular |
   | Tables | Office Tables | `office-tables` (URL handle is `tables`) | Collaborative |
   | Cafe & Breakout | Cafe & Hospitality Furniture | `cafe-hospitality-furniture` | Welcoming |
   | Pods & Acoustics | Acoustic Office Partitions | `acoustic-office-partitions` (URL handle is `office-partitions`) | Private |
   | Monitor Arms | Monitor Arms | `monitor-arms` | Flexible |
   | Sofas & Lounges | Sofas & Collaborative Lounges | `sofas-collaborative-lounges` | Comfortable |
   | anything else | — | — | Modular (fallback, TBC with Donavan) |
3. **Typeform link hardening** — the "Contact us for a quote" link now renders
   `{{ settings.typeformurls_url_1 }}` (the exact attribute set the header's
   "Get a quote" uses) instead of a hardcoded `data-tf-popup="SPqugn2G"`. The design
   preview theme showed a different form ID (`oq7mO0d2`), which proves the hardcoded ID
   drifts from the header; the settings-driven output can't.

## Files in this folder

All deliverables were renamed with a `cro-12359` suffix (2026-07-14) so this test is its
OWN template (`product.cro-12359`), isolated from the live `product.crp` variant that
CRO-12170 uses. The template suffix drives the `<body>` class, so it is now
`product-cro-12359` (was `product-crp`) and the CSS body-scoped selectors were updated to
match.

| File | vs theme | Purpose |
|---|---|---|
| `templates/product.cro-12359.json` | **NEW template** | variant template; `main` section type → `main-product-cro-12359`; Buy Now off (`show_dynamic_checkout:false`) |
| `sections/main-product-cro-12359.liquid` | **NEW section** (fork of `main-product_crp` + edits) | USP category-word mapping + row-omission; renders `shipping-rates-table-cro-12359` + `main-product-cro-12359.css` |
| `snippets/shipping-rates-table-cro-12359.liquid` | **NEW snippet** | flat-rate table `open` by default + settings-driven Typeform link |
| `assets/main-product-cro-12359.css` | **NEW asset** | variant styles; `.product-crp` selectors rescoped to `.product-cro-12359` |
| `sections/product-compare.liquid` | **modified shared section (1 line)** | line 374 now also matches `template == 'product.cro-12359'` so the compare "See more" JS fires on this template |
| `Control.html` / `design.html` | — | live control snapshot / built-variant design reference |

**Shared snippets/sections referenced but NOT forked** (unchanged, must already exist in
the target theme): `buy-buttons_crp`, `get_product_category`, `product-faq`,
`companies_list_slider_product`, and all the other product sections the template lists
(`product-range`, `cross-sell`, `product-compare` type, `store_availability`, etc.).

## Open questions / blockers before QA

1. ~~Category → word mapping table missing~~ **Resolved 2026-07-13** — table supplied
   from the ClickUp spec and wired in (see mapping above). Note the mapping only works
   for products whose parent category is a top-level item in the
   `main-menu-image-without-more-testing` linklist (that's how `get_product_category`
   resolves it). Categories not in the spec table (e.g. Whiteboards, Power & Data
   Management, Ergonomic Accessories) fall back to "Modular".
2. ~~Unmatched-category fallback is TBC~~ **Resolved 2026-07-14 (Donavan):** products
   that don't match the mapping table show **no row-1 word** — the row is omitted
   entirely (no "Modular" fallback). `crp_usp_word` defaults to blank and the row-1
   `<li>` is wrapped in `{% if crp_usp_word != blank %}`. Rows 2 (stock) and 3 (10-day
   fitouts) still render. Catalog audit (live store JSON, 2026-07-14): the named
   non-furniture categories total ~330+ products (Education ~153, Power & Data ~88,
   Whiteboards ~41, Decor ~34, Accessories ~11) — so this affects a real slice of the
   catalog, not a handful; Donavan accepted omitting the row for these.
3. ~~Spec contradiction on out-of-stock row 2~~ **Confirmed 2026-07-14 (Donavan):** keep
   showing the estimated availability date (built as designed).

   Original note — spec contradiction on out-of-stock row 2, resolved in favour of the design
   reference:** UX/UI section says hide row 2 when not in stock, but Background, Logic
   and Rules, *and* the built variant (`design.html`, a backorder product) all show
   "Estimated availability date: [date]". Kept as built. Flag to test owner.
4. **Buy-box buttons:** spec says "leave remaining buttons as on the live product page",
   and the built variant keeps the CRO-12170 treatment (Add to Cart hidden in DOM,
   Add to Quote + Back-Order full-width). Kept as built per "reuse existing code".

## QA — Playwright verification (2026-07-14)

Ran a Playwright pass against the rendered variant snapshot (`design.html`, a
backorder chair product) on desktop (1440) and mobile (iPhone 12). 32/33 automated
checks passed; the 1 "fail" was a test-scoping artifact (measured the ATQ button, which
is correctly `display:none` on an out-of-stock product — the visible full-width button
is Back-Order at 304px = 100% of the buy box). Screenshots in `qa-screenshots/`.

Verified against spec:
- USP list: 3 stacked rows, each with an icon; row 1 "Ergonomic - configurable to your
  fit-out needs" (chair matched), row 2 "Estimated availability date: Sun, 12 Jul, 2026"
  (backorder product), row 3 "10-day fitouts ... under 10-days". ✓
- Buy Now / dynamic checkout button absent; Add to Cart present-but-hidden; buy-box
  buttons full width. ✓
- Assembly notice copy + placement below buy button. ✓
- Shipping table open by default on desktop AND mobile; header copy exact; 3 rate
  columns $49/$149/$199; over-$10k Typeform link; nationwide row. ✓
- Collapse interaction: click header → collapses + chevron rotates; click again →
  re-opens. ✓ (native `<details>`, works irrespective of theme JS)
- Returns: "Return" heading, 14-day copy, T&Cs → shipping-and-returns page,
  `target="_blank"`. ✓

**Open finding (cosmetic, pre-existing in the built component):** the "Nationwide
delivery" row uses an **info icon (ⓘ)**, but the spec says "Show a **globe** icon".
The inherited `shipping-rates-table_crp.liquid` SVG (`.crp-nationwide-icon`) draws a
circled "i". Confirm with the test owner whether the info icon is the approved design
(it's what the design reference ships) or whether it should be swapped for a globe.

## QA — Liquid-render scenario matrix (2026-07-14, pre-deploy)

Because the Liquid can't be browser-rendered until deployed, the actual changed
fragments (the fulfilment USP block incl. the category `case` + row-omission, and the
shipping snippet) were rendered with liquidjs + Shopify-faithful `handleize`/`date`/
`escape` filters, then driven in Playwright across 11 scenarios a single-product
snapshot can't cover. **79/79 checks passed.** Screenshots: `qa-screenshots/scenarios/`.

| Scenario | Category (title) | Expected | Result |
|---|---|---|---|
| chair-instock | Office Chairs | Ergonomic + in-stock line | ✓ |
| chair-backorder | Office Chairs (OOS) | Ergonomic + estimated-availability line | ✓ |
| desk | Office Desks | Adjustable | ✓ |
| storage | Office Storage | Modular | ✓ |
| tables-handletrap | Office Tables | Collaborative (title≠url handle) | ✓ |
| cafe | Cafe & Hospitality Furniture | Welcoming | ✓ |
| partitions-trap | Acoustic Office Partitions | Private (title≠url handle) | ✓ |
| monitor | Monitor Arms | Flexible | ✓ |
| sofas | Sofas & Collaborative Lounges | Comfortable | ✓ |
| whiteboard-unmapped | Whiteboards | **row 1 OMITTED** | ✓ |
| education-unmapped (OOS) | Education Furniture | row 1 omitted + estimated-availability | ✓ |

Each scenario also asserted: correct row count, exactly one of in-stock/availability
lines, row 3 always present, shipping table `open` by default, collapse/re-open
interaction, and the over-$10k Typeform attributes.

**QA caveat to verify live:** the backorder "Estimated availability date" line is
`display:none` until the buy box gets `.preorder-show` (added by `product-info.js` /
Liquid for `contact-to-purchase`). It showed correctly in the design snapshot and in the
OOS scenarios once `preorder-show` was present. On the deployed site, confirm a real
backorder product actually receives `preorder-show` so the line appears.

## Live preview QA — control vs variant, desktop + mobile (2026-07-14)

Ran on the deployed preview theme (`preview_theme_id=188303442208`, "master CRP Copy"):
control = default `product` template, variant = `?view=cro-12359`. Verified the variant
template is actually served (body class `product-cro-12359`, not the fallback
`product-template`). Product used: `2x-chrome-height-adjustable-arms` (resolves to
Office Chairs → "Ergonomic", in stock).

**Parity — every shared component/interaction identical control↔variant:** title, price,
variant option groups + swatches, gallery images (4 swiper slides) + thumbnails (22
`[class*=thumbnail]` both), Description/Spec/Warranty tabs (+ tab switching works),
Add-to-Quote (present + enabled), Back-Order, quantity selector, compare section + "See
more" button, cross-sell "Combines well with", companies slider, header, predictive
search, footer, fitouts/showroom/team sections. Confirmed visually on both viewports.

**Intended variant-only changes all present & correct:** 3-row USP list (Ergonomic / in-
stock date / 10-day fitouts), assembly notice, new flat-rate shipping table (open by
default, $49/$149/$199, Contact-us-for-quote Typeform, nationwide row), returns block,
**Buy Now removed** (control still shows it), **old "Basket value/Shipping" table
replaced**, main buy-box Add-to-Cart hidden (`display:none`), shipping collapse/re-open
interaction works. `mainEntityOfPage` present in variant (reconciliation confirmed live).

Two initial automated "failures" were measurement artifacts, both disproven on re-probe:
desktop thumbnails (Swiper lazy-load timing — actually 22/22) and Add-to-Cart "visible"
(selector was catching the 3 related-product card buttons; the main buy-box ATC is
correctly hidden). Screenshots: `qa-screenshots/live-compare/`.

**Still to verify on a product that HAS FAQ data:** this product has no `custom.faqs`, so
FAQ presence matched (both none) but the reconciled `product-faq` render wasn't exercised.
Spot-check one FAQ product post-launch.

## Control-vs-variant drift reconciliation (2026-07-14)

`main-product_crp.liquid` was forked from `main-product.liquid` back at CRO-12170; the
control has since gained content the fork never received. Full whitespace-insensitive
diff of control vs variant found the substantive differences fall into three buckets:

1. **Intended test changes** (kept): render swaps to `buy-buttons_crp` /
   `shipping-rates-table_crp`, the CRP fulfilment USP block, assembly notice, returns
   block, `main-product-crp.css` include, and the CRO-12170 buy-box treatment.
2. **Genuine drift — RECONCILED** (control content the fork was missing):
   - Product FAQ block `{% if product.metafields.custom.faqs.value %}{% render 'product-faq' %}{% endif %}`
     — re-added before the companies slider (matches control position). Verified
     present in live Control.html, absent from the variant snapshot before this fix.
   - `mainEntityOfPage` JSON-LD node — re-added between `description` and `url` in the
     Product schema. Verified present in Control.html, absent from variant snapshot.
   - `has-custom-design-section-after` enviro conditional class on
     `companies_list_slider_wrap` — re-added.
3. **Intentional fork restructuring** (left as-is): the tabs/description layout was
   rebuilt in the fork, so control's extra `page-width > product-description-section`
   wrapper around the companies slider isn't mirrored. The slider itself renders
   correctly (confirmed in the snapshot); this is a layout restructure, not missing
   content, so forcing control's wrapper back would risk the fork's layout.

After reconciliation, the only remaining control↔variant differences are the intended
CRO-12359 / CRO-12170 changes. All schema/image/tab code verified present at equal
token counts (diff had mis-paired them due to the restructure). Liquid tag balance
checks match the untouched control (regex artifacts identical in both), and both
insertions are copied verbatim from control's proven code.

**Note:** `design.html` is a pre-reconciliation snapshot, so it does not show the
re-added FAQ/schema. Re-QA the FAQ + JSON-LD on the deployed variant.

## Deploy notes

- **Deploy onto a DUPLICATE of the live JasonL theme**, not a blank/partial one — the
  template references ~7 existing sections (`product-range`, `cross-sell`, etc.). Saving
  into a theme missing any of them throws `FileSaveError: Section type '…' does not
  refer to an existing section file`.
- Upload the 5 files in this folder to their matching theme folders:
  - `templates/product.cro-12359.json` (new template)
  - `sections/main-product-cro-12359.liquid` (new section)
  - `snippets/shipping-rates-table-cro-12359.liquid` (new snippet)
  - `assets/main-product-cro-12359.css` (new asset)
  - `sections/product-compare.liquid` (**overwrites** the shared section — 1-line change
    at line 374 so the compare "See more" JS also runs on `product.cro-12359`)
- Intelligems drives the split: live `product` template (control) vs **`product.cro-12359`**
  template (variant), served at `?view=cro-12359`. Split/targeting/goals TBC by test
  owner. No Intelligems visual-editor setup needed. This test is now isolated from the
  live `product.crp` variant (CRO-12170), which is left untouched.
- Body class on the variant template is `product-cro-12359` (from `body-classes.liquid`
  `{{template.name}}-{{template.suffix}}`); variant CSS is scoped to it or to the shared
  `crp-*` component classes (the latter come from `buy-buttons_crp` and are unchanged).
