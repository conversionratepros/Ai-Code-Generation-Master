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

## QA rounds 7–9 (2026-07-27) — Slack bugs 9–34 + compare revert

- Bugs 9–24 and 28–34: all fixed (see the two Slack thread summaries for
  per-bug root causes). Highlights: control's `translateX(-30px)` clipped the
  compare heading; "Perth & Distribution Centre" broke the tour modal's CSS
  selector (handleized); planning consult button is now INERT until the client
  URL setting is filled (Typeform fallback rejected by QA); companies slider
  removed; desktop drag-swipe implemented in our JS (this Swiper build ignores
  mouse drags — the control cannot drag either); mobile `.zoomin` viewer is a
  true fullscreen overlay (deviation from control, QA-mandated).
- **Compare section (round 9, client decision): control UI kept UNTOUCHED.**
  All table/card/See-more restyling was removed — the control's own compare
  CSS renders the table exactly as live. Only additive Figma elements remain:
  eyebrow, new heading text (control's own title styling), category-aware
  copy, orange "This product" badge, recommend pill. This supersedes the
  round-6 grid re-tracking and the mobile horizontal-scroll compare.
- About Us: fit-out photo + logos are merchant-editable (image_picker
  settings); missing fallback asset now hides gracefully instead of showing a
  broken image. `cro-12526-v2-about-fitout.jpg` still needs uploading.
- Client data still pending: Gold Coast matterport ID, per-collection
  headings, consult button URL, range metafield, review source.

## Final verification round (2026-07-27, Playwright vs preview)

Deployed state at verification: sections + JS current, CSS still round-6/7,
fit-out JPG missing. Full bug matrix result:

- **Verified LIVE (sections already deployed):** 9 (card ATQ), 14 ("chair's"),
  22 (clean addresses), 23 (Perth tour opens), 32 (inert consult), 33
  (companies gone), 7 showroom rows, "Perth" name.
- **Verified via injected local CSS (lands with the CSS upload):** 3 (mobile
  fullscreen viewer), 5, 10–13 (control compare UI + additive elements), 15,
  17–20, 24 (dark overlay), 28–31, 34.
- **Bug 6 FINAL RESOLUTION:** Swiper's native pointer drag was working all
  along — drags under the default 50% longSwipesRatio snap back (identical on
  control). Custom drag code removed (it listened to mouse events, which
  headless never fired — and pointer-porting it would have double-advanced);
  instead cro-12526-v2-pdp.js softens the EXISTING instance's thresholds
  (longSwipesRatio .15, longSwipesMs 500, threshold 5) + prevents native img
  ghost-drag. Verified live: 30% drags advance both directions, post-drag
  click suppressed by Swiper (viewer does not open).
- **Bug 16:** requires `cro-12526-v2-about-fitout.jpg` upload (asset 404s);
  about-us section additionally hides the pane gracefully via onerror.
- **Bug 21:** client data — empty `store8_matterport_id` (Gold Coast).
- Bug 34 caret flip made class-based (`is-open` on the select wrap) —
  `:focus` sibling selectors alone were unreliable.

## Round 12 (2026-07-27) — custom size dropdown

The native size `<select>` is replaced by a custom listbox (client request):
toggle button (reuses the field styles) + absolutely-positioned option panel
with hover/selected states, keyboard support (arrows/Escape/Tab), and
outside-click close. SAFE swap because the size field is purely navigational
(sibling-product URLs — not a form input; product-info.js never reads it).
This resolves the two native-select limitations QA hit: unstylable option
hover (bug 34) and the untrackable picker-dismiss state (stale caret).
Files: cro-12526-v2-options.liquid, cro-12526-v2-pdp.js, cro-12526-v2-pdp.css.
Also: gallery badge text is split "BEST SELLER" via JS (guarded, our tag only).

## Round 13 (2026-07-28) — compare: current-product ATC + mobile order

- Current product's compare column gets an Add to Cart (client request):
  new row after the collapsible table mirrors the control's 4-track grid so
  the lime button aligns under the active column on desktop; full-width on
  mobile. Forwards to the buy box's real hidden submit (same MOQ/drawer/
  pay-online path) with the preorder-show back-order gating.
- Mobile column order: the CONTROL's own CSS pushes the active column last
  (`.table-col.activeproduct{order:1}` — verified live at x=650). Countered
  with scoped higher-specificity order rules: labels → current product →
  alternatives. Verified live by injection.
- Also this round: showrooms accordion toggle-off on tap + touch mouseenter
  gating; custom size dropdown (round 12); BEST SELLER text split.

## QA notes for this round

- Verify breadcrumb crumbs on a sample of products per top-level category (simplified logic).
- Verify freight tier across all four bands while switching options ($1,000 / $2,000 / $10,000 boundaries).
- Verify ATC → drawer opens with "Buy online" pre-selected; ATQ → "Add to quote" pre-selected; back-order products swap the button and open the back-order pop-up.
- Verify gallery: tag top-left, no arrows inline, swipe works, thumb active border, main image + "View all images" both open the existing viewer (unchanged inside).
- Mobile: breadcrumb hidden, range/SKU under the gallery, mobile title above gallery.

---

## Round 15 — Client updates (2026-08-04)

1. **Complete-the-setup heading → static.** Client copy: heading "Great on its own.
   Better as a set.", sub-line unchanged ("Add the pieces that finish it — or take the
   lot as a bundle and save."). Replaced the (briefly dynamic) heading logic with a new
   setting id `heading_static` — a NEW id on purpose: the theme editor had persisted the
   old heading into the template JSON, and stored values beat schema defaults, so
   changing the default under the old id would never show. Per-collection heading blocks
   kept as a manual override only.
2. **Planning consult CTA → Get a Quote Typeform.** "Start step 1 — book a free consult"
   now renders with `{{ settings.typeformurls_url_1 }}` + `typeform-share get-a-quote-btn-ab
   getaquoteclick` classes — the identical trigger as the header menu and this template's
   Contact us / fitout CTAs (supersedes QA bug 32's inert state). `consult_url` setting
   kept as an optional override.
3. **New footer (Figma 38-983 desktop / 276-1171 mobile).** New
   `sections/cro-12526-v2-footer.liquid`: #161616 bg, inline sanitized lime logo SVG
   (8 paths #C6D644, Figma export was clean), brand blurb + ★ rating line, three link
   columns as editable link blocks (column select + label + URL), mobile accordion
   (closed by default, chevron flips, toggles closed — verified in DOM simulation).
   Native footer is `{% section 'footer-custom' %}` in theme.liquid (footer-group.json is
   legacy/unused) → hidden with `#shopify-section-footer-custom{display:none!important}`
   in cro-12526-v2-pdp.css (round 14), which only loads on this template.
   Link defaults verified against the live site (sitemap + homepage nav): 13/15 real;
   "How it works" and "Pricing guide" default to /pages/we-make-your-office-fitout-easy-fast
   — no dedicated pages exist, CLIENT TO CONFIRM. "Book a showroom visit" → /#showroom-section.
   Deploy note: add the footer via theme editor (Add section → "CRO-12526 V2 Footer",
   drag to last) — do NOT paste the local template JSON over the theme's copy (it would
   reset all customizer-stored settings).

### Round 15 follow-up (2026-08-05) — client footer links + 2 fixes
- **Final link set from client** (all 15 URLs probed 200, note the live page is the
  singular `/pages/terms-and-condition` — the plural 404s): Fitouts = How it works
  (/blogs/fitouts), Interior design, Case studies (/blogs/fitouts), Blog (/blogs/main),
  FAQs (/apps/help-center). Shop = Chairs, Desks, Workstations, Storage, Tables
  (/collections/tables). Company = About us, Privacy Policy, Terms of Use,
  Shipping & returns, Assembly Instructions (/pages/assembly).
  Preset updated — since presets only apply on insert, the already-added footer section
  must be REMOVED and RE-ADDED in the theme editor to pick up the new links.
- **"Double section" on mobile**: not the footer twice — the final-cta section's
  mobile-only brand block (QA bug 58, added before a footer existed) sat directly above
  the footer's identical brand block. Hidden via CSS (`.cro12526v2-finalcta__brand`).
- Mobile footer accordion links reduced 15px → 14px per client.

### Round 16 (2026-08-17) — Figma sync against the NEW canonical file "Website 2026 (Copy)"
New Figma file from Don: `Of0HOmZCY8do9VPmencu9z` (desktop node 492-969, mobile 492-1441)
— treated as canonical, superseding both files from the 2026-08-09 QA (dUqAv... "Product
Page Copy" and P5x4... "Website 2026"). Ground truth pulled with the new REST pipeline
(`tools/figma-spec.py`) → `QA/figma-spec-desktop-492-969.md` / `QA/figma-spec-mobile-492-1441.md`.
Live preview measured with Playwright at 1440/390 before editing.

**Key finding — the new file RESCALES desktop type DOWN.** The build matched the old
file's larger values; the new file wants: h1 40/48 (was 50/58), all section headings
42/50 (was 50–58/60), section sublines 16/28 (was 22), buy-box price 40/48, Final-CTA
button 16px (the old design's 26px is GONE), eyebrows 10px/ls2.4 desktop + 12px/ls2.88
mobile (Final CTA mobile stays 13/ls0.52 — design's own exception). Mobile values mostly
already matched.

**Theme-asset drift discovered:** the deployed theme copy of cro-12526-v2-pdp.css had 7
hotfix rules appended (old-design values: 26px final-CTA btn, .52px desktop eyebrow ls,
16px setup category, 18px pill/ATC, piecemeal font-family:Poppins patches) that were
never synced to this folder. The updated local file replaces them all — paste the FULL
local file over the theme asset; nothing from the theme tail must survive.

Fixes in this round (see the artifact table for the full change list):
1. **Hanken Grotesk finally loaded** (Google Fonts link in main-product liquid) and
   applied via `--cro12526v2-price-font` to buy-box price, setup card prices, compare
   prices — QA fail group 2 closed.
2. **Arial fallbacks killed globally**: `font-family: inherit` on every build button/
   select/input (QA fail group 1).
3. **Desktop thumbnails 5-up 3:2 r18** (QA fail group 3): thumbs Swiper params retuned
   in cro-12526-v2-pdp.js (slidesPerView 5, spaceBetween 12, ≥750px only) + aspect-ratio
   guard; mobile keeps control sizing. Mobile main image radius now actually 8px (the
   old rule lost to the base 18px !important).
4. **Compare type matched to Figma** (fail group 4; post-dates the round-9 "control UI
   untouched" decision per Don's Figma QA): table text 13/19.5 both viewports (was 11px
   mobile), names 14/24 desktop / 13 mobile, prices Hanken 600 20px (was 12px mobile),
   See-more 13/16.9 + the missing 2px tracking (12/15.6 mobile), badge 13/16.9 ls2
   pad 5/12 (11 mobile), pill 14/24 pad 15/40 (15/19.5 mobile).
5. **Swatches now match the design's states**: unselected fills the 60px box (r18),
   selected shrinks to 50px img with 4px gap + ink ring (r15). Was: everything padded.
6. **Buy box**: title 40/48, price Hanken 40/48, field labels 600 14/24 (500 on mobile
   per mobile frame), size select Poppins 16/28 h54 (was Arial 15), qty value 700 16
   desktop / 600 20 mobile, ATC/quote 16/24, all detail/legal/note lines to 24px lh,
   callout text 14/24, mobile action row 56px tall (was 60).
7. **Sections**: headings 42/50 + sublines 16/28 everywhere; planning bar bg #F6FAFB
   desktop / #E5ECF0 mobile (was swapped); step-day 10/ls2.4; panel + step headings
   weight 500 desktop / 600 mobile; showroom names 16/28, addresses 14/24, tour btn
   14/24 pad 16/28; Final CTA btn 16/28 pad 20/60, call 42/50 w500 desktop, note+meta
   14/24; footer blurb 16/28, grid pad 60; underline/google links 2px lime underline;
   tab labels 600 12/21 desktop / 14 mobile; section paddings 80 desktop.

Deliberate deviations from the new file (design noise, kept consistent): four tab labels
drawn Bold 700 → all 600; mobile selected-swatch pad 5 → 4 (desktop value, QA-approved);
mobile Final-CTA note drawn in Inter → Poppins (standing decision); typos in design copy
(walk-trough/proyects/Sidney/HOLE) NOT copied into build text.

Deploy checklist: paste full pdp.css + pdp.js over theme assets, paste main-product
section (font link + fitout <strong>). Template JSON untouched this round.

### Round 17 (2026-08-25) — client "PDP Rebuild Updates" Round 2 (+ Round 2A fold)
Figma re-pulled first (`QA/figma-spec-desktop-492-969-r2.md`, `-mobile-492-1441-r2.md`, plus the
non-backup "Product Page" frame `figma-spec-desktop-478-3359.md`): file lastModified
2026-08-17T12:20Z, buy box byte-identical to the round-16 pull — the "adjusted gaps" are NOT in
Figma, so the build was matched to the existing Purchase Panel values. 478-3359 differs from
492-969 only in tab weights, a different setup heading copy ("One piece is just the start.") and
footer link lists — client copy "Great on its own…" stands.

**Round 2A — CTAs above the fold (desktop, ≥750 only):**
- New `.cro12526v2-buybox__head` wrapper (title + rating + price) → gap 10 (was 20+20, Figma
  Frame 26); price note margin 10; options pad 20/0 gap 20 (was 30/25); swatch fields gap 6
  (was 10). ≈ −56px for a 3-option product, −67px for 4 options.
- Two OPTIONAL levers as main-product section settings ("Above-the-fold levers", default off):
  `cro12526v2_small_title` → `.cro12526v2-buybox--small-title` (h1 32/40; 3-line title → 2 lines
  ≈ −64px) and `cro12526v2_small_swatches` → `.cro12526v2-buybox--small-swatches` (50px swatches,
  r15 / selected pad 3 r12; −10px per swatch row).
- Orange bar hide (item 4) is a −64px bonus on desktop.
- Honest fold budget (typical 3-option product, 1440 wide): header+bar 186 → ATC bottom ≈1135
  today; ≈1015 after Figma match + bar hide; ≈900–950 with both levers. Above the fold on
  1080p monitors, still ~110–160px under a 900px-tall laptop window. Structural options for
  the client: sticky ATC bar, qty+ATC above the option groups, or collapsing option groups 3+.
  Numbers are estimates from the round-16 screenshot — re-measure live once a preview theme is
  available (the old preview 188303442208 and `?view=cro-12526-v2` on live no longer serve v2).

**Round 2 items (PDP + homepage mirrored):**
1. Planning steps gap 40→100 at ≥990 (`.cro12526v2-planning__steps`); homepage
   `.crohp-how__grid` same. 2-up/mobile gaps untouched.
2. Bar copy breaks before "No middlemen…" on desktop: new setting `bar_copy_2` + `<br
   class="cro12526v2-br-desktop">` (display none <750). `bar_copy` default = first sentence.
   THEME EDITOR: the stored "Bottom bar copy" carries the full sentence — shorten it to
   "Stocked Australian warehouses and our own install crews." or the sentence renders twice.
   Homepage: `mech_rest` / `mech_rest_2` same pattern (index.cro-hp.json stores no values there).
3. Thumbnails: theme snippet renders `img_url:'100x'` (verified live: `COLETO-BK_100x.jpg`) —
   100px source shown 5-up at ~180px + 2× DPR = blurry. Gallery snippet now captures the
   unchanged theme snippet and rewrites `_100x.` → `_400x.` (main slides are 1001x/2002x).
4. Orange "Want to elevate your space?" bar: rendered by `layout/theme.liquid`
   `{%- render 'pdp-header-banner' -%}` (unless-list of page templates only) — cannot be
   removed from template files. Hidden via `.pdp-header-banner{display:none!important}` in the
   template-only CSS (PDP) and `body.index-cro-hp .pdp-header-banner` (homepage). A true removal
   = one-line edit to theme.liquid's unless-list (`or template == 'product.cro-12526-v2' or
   template == 'index.cro-hp'`) — shared layout file, for JasonL's devs / explicit sign-off.
5. Setup cards: title ONE line + CSS ellipsis (truncatewords removed, full title in `title`
   attr); category `<p>` always rendered with min-height (1.4rem / 1.82rem mobile) so
   category/title/price/buttons align across cards.
6. Homepage "Big or small, we've done one like yours.": last two words glued in
   `<span class="crohp-nowrap">` (Liquid split/slice, any 4+ word heading) + `text-wrap:
   balance` on the cases heading only.

Round 1 items (consult CTA → Typeform, footer, Figma font sync, setup copy) were closed in
rounds 15–16 — nothing further.

Deploy: paste FULL pdp.css + main-product + planning + complete-setup + gallery snippet
(PDP); cro-hp.css + how-it-works + case-studies (homepage). Template JSON: do NOT paste — set
`bar_copy` in the theme editor (see item 2). Client artifact:
https://claude.ai/code/artifact/bdb7f0d1-8287-447d-9518-b75500a4dfb8
