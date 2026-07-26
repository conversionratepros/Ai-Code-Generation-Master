# AB Test | Full Page | PDP Redesign Buy-first | ALL | CRO-12526 (v2)

**Client:** JasonL (jasonl.com.au) — Shopify OS 2.0, Dawn-derived theme
**Mechanism:** alternate-template test — live product template (control) vs `product.cro-12526-v2` (variant), previewable at `?view=cro-12526-v2`
**Build mode:** fresh v2 rebuild (user-requested), built **section by section** as designs arrive.
**Figma:** top section — node `31-1133` in "JasonL — Product Page (Copy)" (`dUqAvYEyhiWchtoAh9HJXc`)

## Status

| Page area | Status |
|---|---|
| Breadcrumbs & meta (range/SKU) | ✅ Built (this round) |
| Gallery (tag inside gallery, thumbs, view-all, existing viewer reused) | ✅ Built (this round) |
| Buy box (title, rating, price, options, delivery, freight, qty, ATC/ATQ/Back-Order, legals, fitout CTA) | ✅ Built (this round) |
| Tab section | ✅ Ported verbatim from control (spec: unchanged) |
| Complete the Setup | ✅ Built (round 2, Figma 33:357) |
| Compare Alternatives | ✅ Built (round 2, fork of `product-compare.liquid`, Figma 38:244) |
| New Here? A Bit of Us | ✅ Built (round 2, Figma 38:464) |
| Planning a Whole Office? | ✅ Built (round 2, Figma 38:649) |
| Come See It (showrooms) | ✅ Built (round 2, Figma 38:726) |
| Final CTA band | ✅ Built (round 2, Figma 38:927 — **in the design but NOT in the written spec**; remove `final_cta` from the template JSON if unwanted) |

## Files

- `templates/product.cro-12526-v2.json` — copy of the control `product.crp.json` composition with only the `main` section type swapped to `cro-12526-v2-main-product`; every other section entry untouched (they get replaced one by one as later designs arrive).
- `sections/cro-12526-v2-main-product.liquid` — new main product section. Head assigns (warranty/hero/MOQ/tab captures), tab section, popups/scripts/ld+json and the full `{% schema %}` are **verbatim from `main-product_crp.liquid`** (schema renamed "CRO-12526 V2 Main Product" — full block/setting parity, nothing merchant-editable dropped). Only the middle region (breadcrumb row + gallery + buy box) is new markup.
- `snippets/cro-12526-v2-breadcrumb-meta.liquid` — breadcrumb (desktop only) + range/SKU meta; `context: 'desktop' | 'mobile'`.
- `snippets/cro-12526-v2-gallery.liquid` — wrapper around the UNCHANGED `product-media-gallery-custom` (Swiper + existing zoom viewer); adds in-gallery promo tag (`best-seller-tag` reused) and the "View all images" trigger.
- `snippets/cro-12526-v2-options.liquid` — size dropdown (sibling-product metafield links) + Shopify options via the control's own `product-variant-options` (picker_type `button`) inside a native `<variant-selects>`.
- `assets/cro-12526-v2-pdp.css`, `assets/cro-12526-v2-pdp.js`.

## Round 2 build — below-fold sections (2026-07-26)

Template now composes: main → store_availability → **complete-setup** →
**compare** → **about-us** → **planning** → **showrooms** → **final-cta**.
Control's `range`, `recent_fitouts`, `locationMap` and `meetPeople` section
entries were REMOVED from the variant template (replaced by the redesign's
narrative sections — restore any of them in the template JSON if the client
objects). `store_availability` kept (functional).

- **Complete the setup** (`cro-12526-v2-complete-setup.liquid`) — control's
  cross-sell handle-resolution logic verbatim (tags → `{tag}_c` → `{key}_x`
  handle lists, [redirect] parent fallback, zero-stock skip); new card markup;
  per-card real product forms inside `<product-form>` (same drawer flow as the
  buy box; JS sets pay-online/request-quote pre-select in capture phase);
  MOQ minimum submitted as quantity; shows up to 4 cards (design) vs
  control's 3. Per-collection headings = section blocks (collection picker +
  text) — client still to supply values; default heading setting meanwhile.
- **Compare** (`cro-12526-v2-compare.liquid`) — FORK of `product-compare.liquid`;
  deltas only: new header (eyebrow/heading/copy/"Not sure? We'll recommend"
  Typeform link), "This product" badge, template gate extended (control's
  covers only product/product.crp — See more would silently not bind), schema
  rename. Rows/attribute parsing/buy-buttons untouched.
- **About us** (`cro-12526-v2-about-us.liquid`) — static; stats as blocks;
  logos strip + fit-out photo are image_pickers falling back to bundled
  Figma exports (`cro-12526-v2-about-logos.svg`, `cro-12526-v2-about-fitout.png`);
  "See Recent Projects" → /blogs/fitouts ("Proyects" typo corrected).
- **Planning** (`cro-12526-v2-planning.liquid`) — static; steps as blocks;
  consult button URL setting is PENDING client — falls back to the sitewide
  Typeform until set so the CTA is never dead ("hole" typo corrected).
- **Showrooms** (`cro-12526-v2-showrooms.liquid`) — reads the SAME global
  `settings.store{N}_showroom_*` fields as the control's showrooms (no
  re-platforming); Granville excluded like control; 360° pop-up reuses
  `custom-modal-virtual-tour` unchanged (visible pill forwards the click; JS
  moves the modal-dialog to body on first open); phone is click-to-call;
  right-hand image = active row's existing per-location photo (hover/focus
  swaps; hidden on tablet/mobile); row arrow links to the showroom page —
  ASSUMED answer to the spec's "confirm what the arrow does".
  "walk-trough" typo corrected to "walk-through".
- **Final CTA** (`cro-12526-v2-final-cta.liquid`) — design-only addition (not
  in spec); static; Plan-my-fitout → Typeform; "Book a showroom visit" →
  showrooms anchor by default.

## Control-logic mapping (all user-verified 2026-07-26)

1. **Naming** — `cro-12526-v2` template suffix + file prefix so nothing collides with the v1 build if it is still on the theme.
2. **Buy buttons** — the control's `buy-buttons_crp.liquid` renders **collapsed** inside `[data-cro12526v2-realbuttons]`; the new visible Add to Cart / Add to Quote / Back-Order buttons forward `.click()` onto the real ones. Cart drawer opening, `minicart-payement-option` localStorage pre-select (`pay-online` / `request-quote`), MOQ and the back-order popup (`contactPurchaseModal`) all run unmodified. ATQ/Back-Order swap on the control's `preorder-show` state class via `html:has()`.
3. **Breadcrumb** — simple `product.collections`-based parent → child → product-name (skips `all` and range-template collections). Intentional simplification of `breadcrumb-2.liquid`'s ~330-line heuristics; **QA a sample of products per top-level category**.
4. **Price/freight updates** — subscribed to the theme's own pub/sub: `product-info.js` publishes `PUB_SUB_EVENTS.variantChange` (`event.data.variant`), globals loaded unconditionally by `theme.liquid` (`constants.js` + `pubsub.js`). Freight tier and SKU re-render from the variant payload; a MutationObserver on `#price-{{ section.id }}` is retained only as fallback. Freight bands: ≤$1,000 → $49 · ≤$2,000 → $149 · ≤$10,000 → $199 · above → "calculated at checkout." only.

## Key control facts this build depends on (verified in theme export + live PDP)

- **Sizes are separate products**, not variants: parsed from `product.metafields.productmeta.product_sizes` (`[item][opt]label[/opt][redirect]handle[/redirect]`, optional `[default]`). The size `<select>` navigates to the sibling product. Real Shopify options are numbered **after** the size field (the control's `size_count` offset). *(v1 got this wrong — it rendered Shopify option 1 as the size dropdown.)*
- **Option swatch images** come from `productmeta.product_options` markup via the control's `product-variant-options` snippet (radio + label + 38px img) — reused verbatim and CSS-restyled to 50px squares, black ring on checked. *(Not Dawn's `value.swatch`, which is unpopulated on this store — v1 used the `swatch` branch and would have rendered empty swatches.)*
- **Gallery viewer** = `.zoomin` state on `.product-slider-holder`, opened by `#product-slider-zoom`, closed by `#swiper-button-close`; all restyles are scoped `:not(.zoomin)` so the pop-up is pixel-identical. Thumbs = `.thumbs-container` Swiper, active = `.swiper-slide-thumb-active`.
- **Change-location pop-up** is global (`theme.liquid` → `#PopupModal-modal_change_location`); region stored as JSON `{code,name}` in `localStorage['region']`. JS re-renders the location name after a region click in the pop-up.
- **"Get it by" date is not Shopify-native** — business-day walk (weekend skip, +1 after 3pm) ported from `product-shipping-and-returns.liquid`. The control's hardcoded **Christmas-period overrides were intentionally not ported** — port before any Dec/Jan live window.
- **Back-order date precedence** — product `productmeta.custom_availability_date` when future, else shop `custom_fields.availability_date` (verbatim from control).
- **Typeform triggers** (Contact us, Plan my fitout) — `typeform-share` class + `{{ settings.typeformurls_url_1 }}` raw attrs; embed script auto-binds, no JS needed.
- **Body class** is `product-cro-12526-v2` (suffix-based) — fine because `product-page.css` is effectively unscoped and tab styling lives in unscoped `component-product-detail-tab.css`; the `.product-crp`-scoped rules in `main-product-crp.css` are crp buy-box overrides this build replaces anyway.

## Theme editor settings

Full schema parity with `main-product_crp.liquid` (verbatim schema, renamed). Buy-box blocks are looked up by type (`title`, `price`, `variant_picker`, `quantity_selector`, `buy_buttons`) so `shopify_attributes` still map in the editor. Breadcrumb/meta intentionally has no settings (spec).

## Pending client action points (unchanged from spec)

1. **Range metafield** — `product.metafields.custom.range` / `productmeta.range` checked defensively; line omitted while blank. Client to create/populate.
2. **Rating & reviews** — renders only if `product.metafields.reviews.rating` exists; source + click-through behaviour still to be confirmed.
3. **Complete the setup** — per-collection headings to be supplied.
4. **Planning a whole office?** — consult-button destination to be supplied.

## QA round 1 (2026-07-26, preview theme 188303442208) — findings & fixes

All five reported issues were root-caused live (Playwright against the preview)
and fixed; ATC/ATQ drawer flows re-verified live with the fixes simulated in-browser:

1. **SKU** — control functionality (copy-to-clipboard icon + "SKU" pop-up with
   per-location quantities) now repositioned into the breadcrumb meta row
   (desktop) with a second opener below the gallery (mobile, same modal).
   This also fixed a crash: `product-info.js#showsku` getElementById's
   `#cpylinkbtn-title` / `.showsku` unguarded on every option change.
2. **Reviews** — static, theme-editor editable (section settings: enable
   checkbox, rating, count text; defaults 4.6 / "128 reviews").
3. **Change location** — the control reloads the page after a region pick, but
   only when `body.product-template` exists (perth.js), which suffixed templates
   never get. The section now adds that class; reload verified live.
4. **ATC / ATQ dead** — two stacked causes: (a) the squeezed Add to Cart button
   (see 5) couldn't receive clicks; (b) the drawer never opened because
   `product-info.js#fetchQuantityRules` (fired via the cartUpdate publish inside
   product-form.js, *before* `renderContents`) crashed on the missing
   `.quantity__rules-cart .loading__spinner` span — restored the control's exact
   quantity-label markup. Verified live: ATC → drawer active, 1 item, "Buy
   online" radio checked; ATQ → drawer active, "Add to quote" radio checked.
5. **UI break** — theme CSS forces `.product-form__input` to `flex:0 0 100%;
   max-width:44rem`, crushing Add to Cart to ~56px; explicit overrides added.
   Also neutralised the theme's grey quantity chrome.
   Plus: `#options_container` id added to the options wrapper — two control
   inline MutationObserver scripts require it (page-load TypeErrors otherwise).

JS correction found during verification: `PUB_SUB_EVENTS` is a top-level const,
NOT a window property — the subscribe guard now probes the bare identifier
(verified live: variantChange payload received, freight re-rendered).

## QA round 2 (2026-07-26) — back-order gating + Figma spacing

1. **Back-order products could still be added to cart** (e.g. lark-drafting-chair).
   Control behaviour verified live on the control PDP: perth.js reads per-region
   stock from `#page-load-info` (rendered by `store_availability_quickadd`, which
   this build includes) and toggles `preorder-show` / `buynow-show` on
   `.product-form__buttons`; under `preorder-show` the control hides BOTH Add to
   Cart and Add to Quote — only Back-Order (plus qty) stays. v2 now mirrors this:
   CSS hides the visible ATC under the same `html:has(...preorder-show)` state
   hook, and the JS forwarder refuses to forward an ATC click in that state.
   Verified live on the variant lark PDP: ATC hidden, ATQ hidden, Back-Order +
   estimated-availability line visible.
2. **Option-area spacing didn't match Figma.** Causes: the theme's
   `variant-selects { border: 1px solid #d9d9d9 }` box, and accordion
   padding/margins from `.product-form__input` bleeding into our fieldsets.
   Both neutralised inside `.cro12526v2-options`; swatches now match the Figma
   geometry (60px outer / 50px inner, radius 15/10, 4px ring gap on selected;
   selectors specificity-bumped so they beat the theme stylesheet regardless of
   load order). Verified live: field gaps exactly 25px, options padding 30px,
   no border box, zero margins.

## QA round 3 (2026-07-26) — SKU value text + mobile design

1. **Stray text beside the SKU chip** — `variant.sku` on this store is a
   compound data string ("NONE,{sku},NONE|0,517,0()"), not a display SKU.
   Figma shows the chip only, so the inline value spans were removed on both
   desktop and mobile (the popup + copy icon keep carrying the real data via
   product-info.js's own showsku()); the pub/sub SKU-sync JS was dropped.
2. **Mobile now follows Figma node 276-272** (CSS-only — the DOM order already
   matched: title → gallery → range/SKU row → reviews → price → options →
   details → actions → legals → callout → fitout). Key values: title 20px/35,
   price 28px, gallery radius 8 + 75px thumbs, ink-bordered size dropdown and
   qty stepper, 60px-high buttons with radius 8, details/legals at 12px,
   full-width fitout button. Verified live at 390px: element order correct,
   breadcrumb hidden, SKU chip present, no horizontal scroll, ATC ≈210px
   beside a flexing stepper.
   The quantity-stepper rules were also specificity-bumped
   (`.cro12526v2-buybox` scope + pseudo-element kill) — the live check showed
   theme `.quantity` chrome still winning over the flat-class overrides.

## QA round 4 (2026-07-26) — range fallback, qty/swatch cascade, disabled ATC, mobile view-all, fonts

1. **Range text now renders** — falls back from the (still empty) range
   metafields to the first collection whose template_suffix contains "range"
   (the same membership rule `product-range.liquid` uses), so "Quadro Range"
   shows immediately; the metafield still wins once the client populates it.
2. **Quantity stepper geometry locked** — theme CSS was collapsing the
   buttons to 11px (64px total box). The whole cluster is now `!important`-
   locked (130×64 box, 40px buttons, 46px input). Verified live.
3. **Selected swatch ring fixed** — theme CSS zeroed the label border-width
   (computed "rgb(22,22,22) 0px") and squashed height to 44px; base + checked
   rules now force 60×60 and `border: 1px solid ink !important`. Verified live.
4. **Back-order ATC behaviour changed per client request** (deviation from
   control, which hides it): under `preorder-show` the Add to Cart stays
   visible but disabled — opacity .45, `pointer-events: none`, plus the JS
   forwarder guard. Back-Order still replaces Add to Quote. Also confirmed
   via control A/B that option changes on available products keep
   `buynow-show` (no false preorder state).
5. **Mobile hides "View all images"** (per QA; the viewer stays reachable by
   tapping the main image).
6. **Fonts matched to Figma** — desktop title 50px/58, price 48px (previously
   42/44); mobile values from round 3 unchanged (title 20px/35, price 28px,
   details/legals 12px).

## QA round 5 (2026-07-26) — first formal QA pass (Slack thread 1785079510.699799)

8 bugs reported on finch-ergonomic-mesh-chair; 6 fixed (CSS only), 2 verified
as control parity and answered in-thread with evidence:

- **1+8 badge**: theme styles the tag's inner span (#F9BA06 + own padding) —
  styling the outer box produced a two-tone badge and "extra space" (which was
  also partly the 2px letter-spacing rendering after the final R). Fixed on the
  span with asymmetric right padding (-2px).
- **2 "none" X icon**: control draws it via CSS scoped to
  `.product-form__input--pill`; recreated the identical X under our scope.
- **4 italic links**: added `font-style: italic` to callout links.
- **5 dropdown ring**: removed the select's 2px `:focus-visible` outline.
- **7 radius**: computes 18px with the deployed CSS (stale QA screenshot);
  hardened with `!important`.
- **3 mobile viewer + 6 desktop swipe**: measured and screenshotted identical
  behaviour on the live control (same viewer metrics; control desktop gallery
  does not mouse-drag either — the zoom-trigger button overlays the image on
  both). Reported as control parity; any change there is a change to the
  shared control component and needs a product decision.

## QA notes for this round

- Verify breadcrumb crumbs on a sample of products per top-level category (simplified logic).
- Verify freight tier across all four bands while switching options ($1,000 / $2,000 / $10,000 boundaries).
- Verify ATC → drawer opens with "Buy online" pre-selected; ATQ → "Add to quote" pre-selected; back-order products swap the button and open the back-order pop-up.
- Verify gallery: tag top-left, no arrows inline, swipe works, thumb active border, main image + "View all images" both open the existing viewer (unchanged inside).
- Mobile: breadcrumb hidden, range/SKU under the gallery, mobile title above gallery.
