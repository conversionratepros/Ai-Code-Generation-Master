# Test Analysis — AB Test | Full Page | PDP Redesign Buy-first | ALL | CRO-12526

**Client:** JasonL (jasonl.com.au) — B2B/B2C office furniture, Shopify OS 2.0
**Pages:** All product detail pages | **Devices:** Desktop + mobile
**Mechanism:** alternate-template test — live `product` template (control) vs `product.cro-12526` template (variant), served at `?view=cro-12526`
**Status:** Code-complete 2026-07-21; pending client action items listed below and in `user-story.md`

---

## 1. Hypothesis

> **If** we lead the PDP with a tighter, higher-contrast buy box (title, live price, plain-language option selectors, one clear primary CTA) and move supporting/trust content — add-on recommendations, alternatives comparison, brand credibility, whole-office planning, showrooms — into a clear narrative order below the fold, **then** more visitors will add to cart and complete checkout, **because** the current PDP asks buyers to parse a dense options/USP block before they can act, while the true objections (assembly, returns, delivery cost, "am I picking the right one") are answered *after* the point of decision instead of woven into the path to it.

## 2. Rationale — why each change should move the needle

| # | Change | Behavioural lever | Reasoning |
|---|--------|-------------------|-----------|
| 1 | Buy-first buy box: title → price (live) → options → freight tier → qty + Add to Cart, Add to Quote demoted to secondary | Primary-action clarity (Hick's law) | CRO-12170/CRO-12359 deliberately promoted Add to Quote for the B2B/PO buyer. CRO-12526 tests the opposite bet for the general visitor: make Add to Cart the obvious default, keep quote/PO as an explicit but secondary path ("Need a quote? Paying by PO? We do both."), rather than making every visitor choose between two equally-weighted CTAs. |
| 2 | Freight tier shown inline, tied to live price ("Freight from $49 — calculated at checkout.") | Price transparency / uncertainty reduction | Same lever CRO-12359 bet on for the shipping table, applied earlier and more concisely — one line, no click, updates as the visitor changes options, so the total cost is legible before Add to Cart rather than at checkout. |
| 3 | Promo tag moved into the gallery, "view all images" link, black-bordered active thumbnail/swatch | Visual hierarchy / reduced buy-box clutter | Moving the badge off the title line and tightening the gallery interaction frees the buy box to focus purely on the purchase decision; a consistent black "selected" affordance across thumbnails and swatches reduces the chance a visitor misreads which option is active. |
| 4 | "Complete the setup" cards with a visible Add to Cart per card | Cross-sell at the moment of highest intent | Placing category-relevant add-ons (with their own one-click Add to Cart) directly after the main CTA — while purchase intent is highest — should lift AOV more than the control's lower-key "Combines well with" row. |
| 5 | Compare Alternatives kept, restyled with a "This product" badge + explicit "Not sure? We'll recommend" escape hatch | Decision confidence / reduced bounce-to-compare | Visitors who leave a PDP to comparison-shop often don't come back. Surfacing the comparison in-page, with the current product visibly anchored, aims to resolve the doubt without a lost session — and the Typeform "recommend" link catches visitors whose doubt isn't answered by a spec-sheet comparison. |
| 6 | Brand-trust ("New here? A bit of us") + "Planning a whole office?" + showrooms sections, in that order | Trust before commitment escalation | New/uncertain visitors get credibility signals (tenure, scale, in-house delivery) right after the immediate purchase decision is made or deferred; visitors with a bigger need (whole office, not one desk) are then offered a clear escalation path instead of having to hunt for it, with showrooms as the final "still not sure" offline option. |

## 3. What the visitor sees (control → variant)

- **Control (`product.crp`):** promo tag above the title; heavier fulfilment USP list (3 stacked rows with icons) ahead of the buy buttons; Add to Cart hidden in the DOM, Add to Quote/Back-Order full-width and primary; static shipping-rate table; `cross-sell` "Combines well with" row with no per-card quote option; `product-compare` with its original "Compare similar popular items" heading; no whole-office planning or refreshed showrooms content on the PDP itself.
- **Variant (`product.cro-12526`):** promo tag inside the gallery; compact buy box (title → rating → price → options → delivery/freight → qty + Add to Cart, primary) → Add to Quote/Back-Order secondary → supporting info (returns/assembly/warning callout/fitout CTA) → **unchanged** product-info tabs → Complete the setup (with per-card Add to Cart + Add to quote) → Compare alternatives (restyled) → New here? A bit of us → Planning a whole office? → Come see it (showrooms).

## 4. Metrics

**Primary KPI (decide the test):**
- Transaction conversion rate (orders / sessions hitting a PDP), with revenue per visitor as the money metric.

**Secondary KPIs (explain the result):**
- Add-to-Cart rate (expect ↑ — it's now the obvious primary action instead of competing with Add to Quote)
- Add-to-Quote rate (expect it to hold for genuine PO/bulk buyers via the explicit secondary CTA, but drop as a share of total actions vs control, since it's no longer the default)
- "Complete the setup" attach rate / AOV uplift from add-on cards
- Compare-alternatives engagement (expand rate, "This product" click-through, "Not sure? We'll recommend" click rate)
- Scroll depth / engagement with the About Us / Planning / Showrooms sections (do visitors who reach them convert at a higher rate?)
- PDP → cart → checkout progression (watch that demoting Add to Quote doesn't cost genuine PO buyers a step)

**Guardrails:**
- Add-to-Quote / PO conversion rate specifically (JasonL's AOV strategy leans on this journey per CRO-12170/CRO-12359 — this test must not silently starve it)
- Checkout completion rate among Add to Cart sessions

## 5. Segments worth splitting in analysis

- **New vs returning visitors** — the brand-trust section should matter more to new/uncertain visitors; returning visitors may skip straight to Add to Cart regardless of buy-box changes.
- **Order value bands** ($0–1k / 1–2k / 2–10k / 10k+) — the freight tier line maps directly onto these; watch whether visibility of the tier changes behaviour differently per band, especially near the $1,000/$2,000 boundaries.
- **B2B/PO-signalled traffic vs general retail** — if the site can identify likely PO buyers (referral source, logged-in trade account, etc.), segment Add-to-Quote rate separately; a drop in the *general* population's quote rate is the intended effect, a drop in the *PO-buyer* population's quote rate is a regression.
- **Device** — the buy box is markedly more compact on this variant; mobile visitors may respond more to reduced scroll-to-CTA distance than desktop visitors do.
- **Backorder vs in-stock products** — the back-order button replaces Add to Quote entirely in that state; verify this doesn't suppress conversion on backorder SKUs relative to control.

## 6. Risks & trade-offs

1. **Demoting Add to Quote** is the single biggest bet in this test and directly cuts against the emphasis CRO-12170/CRO-12359 built. If JasonL's revenue mix leans more B2B/PO than expected, this could suppress quote volume more than Add to Cart gains offset. The guardrail above is the tell — watch it from day one, not just at the end.
2. **Freight-tier line is JS-recomputed, not server-swapped**, on variant change (see §"Freight tier" below) — a MutationObserver parses the rendered price text rather than hooking Dawn's internal pub/sub events, to avoid a hard dependency on undocumented Dawn internals. Low risk, but worth a QA pass confirming the tier updates correctly across all four price bands when switching variants.
3. **Range metafield and review data are both currently empty** (see Pending client action items) — the buy box will look slightly sparser than the Figma comp (no range line, no stars) until those are populated. This degrades gracefully (no broken layout), but it does mean the shipped variant won't visually match the polished Figma mock until the client acts.
4. **Breadcrumb is a new, simpler implementation**, not a port of `breadcrumb-2.liquid`'s tag-matching logic (see below) — there's a small risk it resolves a different parent/child pair than the legacy breadcrumb would for products with unusual collection memberships. Recommend a QA pass across a sample of products per top-level category before go-live.
5. **"Complete the setup" and Compare Alternatives both depend on the `shop.metafields.tagproducts` tag-metafield being populated for a given product** (same dependency the control already has) — on products without compare/cross-sell tags configured, those sections simply don't render, same as control.

## 7. Notable build decisions (for future maintainers)

### Cart mechanism
Confirmed default: this build reuses the theme's existing Dawn `<cart-drawer>` (opens
automatically after a successful `/cart/add`, same as every other Add to Cart button on
the site) rather than building a custom cart. The new visible Add to Cart / Add to Quote
/ Back-Order buttons in the buy box are NOT the real submit buttons — they forward
`.click()` onto the actual `buy-buttons_crp.liquid` buttons, which are rendered hidden
in the same section (`[data-cro12526-realbuttons]`). This keeps 100% of the existing
localStorage payment-option pre-select, MOQ handling, and cart-drawer wiring intact
without touching `buy-buttons_crp.liquid` at all. No remaining ambiguity here; this was
the only viable option once `buy-buttons_crp.liquid` was inspected (see the "Add to
quote" click handler already using the identical hidden-button-forwarding pattern for
its own submit button).

### Breadcrumb — new implementation, not a port of breadcrumb-2.liquid
`snippets/breadcrumb-2.liquid` resolves parent/child category via a long chain of
tag-string and linklist-title matching heuristics (see its ~330 lines) tuned against
specific linklist handles (`shop-by-workspaces`, `main-menu-image`) and specific
collection titles hardcoded in the logic ("Office Furniture", "Cafe & Hospitality
Furniture"). Porting it as-is risked either silently breaking on products it wasn't
tuned for, or requiring a full audit of every linklist/collection-title dependency to
verify safely — out of proportion to a breadcrumb's role in this test. CRO-12526 instead
resolves parent/child directly off `product.collections` (first two non-"all",
non-range-template collections), which is simpler and more predictable, at the cost of
not replicating breadcrumb-2's more sophisticated tag-based category inference for edge
cases. Recommend a spot-check across a handful of products per top-level category during
QA to confirm the simpler heuristic produces sensible crumbs.

### Freight tier
Computed server-side on first render from `product.selected_or_first_available_variant.price`
against the spec's four bands ($0–1,000 → $49, $1,001–2,000 → $149, $2,001–10,000 → $199,
$10,001+ → no "from" amount). On variant change, `cro-12526-pdp.js` re-parses the visible
price text (regex) inside the same `id="price-{{ section.id }}"` container Dawn's
`product-info.js` swaps natively, and re-renders the freight line — chosen over hooking
Dawn's `PUB_SUB_EVENTS.variantChange` pub/sub system directly, since that requires
importing `pubsub.js`'s exact exports and is more coupled to the specific Dawn version
in place. The regex approach is resilient to Dawn internals changing.

### Delivery-date calculation
Mirrors `product-shipping-and-returns.liquid`'s existing `window.calcWeekend` logic
(skip weekends, +1 day for orders placed after 3pm) but intentionally does **not** port
that snippet's hardcoded Christmas-period date overrides (specific `Dec 18–Jan 5`
special-cased strings baked into the live snippet). If this test is still running over
a Christmas/New Year period, port those overrides into `cro-12526-pdp.js`'s
`initDeliveryDate()` before that window — otherwise the delivery date shown will be
technically wrong (a business day count through the closure period) during that stretch
only.

### Theme editor schema parity
See `user-story.md` §"Theme editor settings parity" — full block-type parity with
`main-product_crp.liquid` was carried over into `cro-12526-main-product.liquid`'s
schema; only decorative icon-dropdown option lists were trimmed for brevity, no
merchant-editable field or block type was dropped.

## 8. Measurement / setup notes

- No CMS/testing-tool wiring is included in this folder (this is a template-level test,
  not an Intelligems visual-editor test) — split/targeting/goals config is on the test
  owner, same pattern as CRO-12359.
- GA4 caveat carried over from CRO-12465/learnings.md: the site's `window.gtag` silently
  drops events — any new custom GA4 events (e.g. tracking the "Complete the setup"
  add-to-cart clicks, or the Compare Alternatives "Not sure? We'll recommend" click)
  must be pushed as an `Arguments` object onto the default `dataLayer`, not via
  `window.gtag(...)`.
- Every Typeform trigger on this page (Contact us, Plan my fitout, Not sure? We'll
  recommend, and the Planning section's consult-booking fallback) fires the SAME
  `settings.typeformurls_url_1` form as the sitewide header "Get a quote" button — if
  per-CTA attribution is wanted for analysis, that needs a hidden field or distinct
  tracking event added before launch, same open item CRO-12359 flagged for its own
  >$10k quote link.

## 9. Success / decision framework

- **Win:** transaction CR or RPV up with the Add-to-Quote guardrail flat or improving →
  roll the buy-first layout into the base template; consider a follow-up test isolating
  which single change (buy-box compression vs freight-tier line vs section reordering)
  drove the lift.
- **Flat but Add-to-Cart up / Add-to-Quote down:** the buy box is successfully shifting
  behaviour toward self-serve purchase, but if transactions don't follow, the leak is
  downstream of the PDP (cart/checkout) — same diagnostic path CRO-12359 laid out.
- **Loss, concentrated in PO/bulk segments:** the quote-demotion bet was wrong for this
  audience — the fix is promoting Add to Quote back to a co-primary CTA rather than
  abandoning the rest of the redesign (setup cards, compare, trust sections can likely
  be kept regardless of the buy-box CTA hierarchy finding).
