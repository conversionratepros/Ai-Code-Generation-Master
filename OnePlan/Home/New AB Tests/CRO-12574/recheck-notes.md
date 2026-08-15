# CRO-12574 — AB Homepage Redesign | All — Recheck notes (2026-07-29)

## v3 RESKIN 2026-08-09 — client's updated Figma design applied

Client changes came as an updated Figma ("Oneplan — Homepage Relook (CRO-12173)",
desktop node 44-5710, mobile 56-101). The old design page (variant-b-v2) is now
superseded. variant.js + variant.css in this folder are fully rebuilt to match;
section structure, IDs and all v2 behaviours (router, loop carousel, smooth
scroll, hide+inject climb) are unchanged. **Not yet pasted into Convert
experiment 1004206057 — the experiment still runs the v2 skin.**

What the updated design changed (all now built):

1. Palette swap: indigo/green → Vivid Blue `#0000D9`, Bright Teal `#5BF1FD`
   (ALL buttons were green, now teal), Light Azura `#AEEEFD` icon badges,
   yellow `#FFD15A` "Most chosen" chip, Soft Teal "vs" badge.
2. Typography: Catamaran/Helvetica → **Anek Devanagari** (Google Fonts link is
   injected by variant.js); pre-headers specced as **Aptos Bold** — not
   web-loadable, falls back to Anek (flag to client if they care).
   Site css declares Catamaran + uppercase `!important`, countered with
   `!important` font/text-transform overrides.
3. Hero: highlight pill moved to "claims" (was "upfront"); lead copy now
   "…Oneplan Claim Card, never weeks out of pocket."; router chips are white
   cards with navy line-icons (were webp photo chips) — vertical desktop,
   2×2 horizontal mobile, teal tick badge; new family-on-couch photo as hero
   background (desktop mirrors the source photo via scaleX(-1); mobile shows
   it un-mirrored as an in-flow block below the router).
4. Trust ribbon → floating white card straddling the hero edge; mobile layout
   restructured (logo + "10/10 Trust Index" badge row, 4.59 + stars,
   "Based on 23,019 reviews").
5. Plan cards: azura icon circles with line icons, UPPERCASE titles,
   "Car & Home" → **"Car & Household"** (chips, card, final-CTA eyebrow; hero
   eyebrow stays "Car & Home" per design), copy dashes → commas.
6. Reviews: deep-blue gradient bg; "customers smile" highlight pill;
   cards restructured **name-first** + 5 gold SVG stars + scrollable quote
   with styled slim scrollbar (replaces the 7-line clamp); nav arrows now
   filled cyan circles, hidden on mobile (swipe only).
7. USP: real claim-card photograph replaces the CSS-drawn card; compare block
   is one joined panel (grey left / blue right with Oneplan-pattern bg and
   white check circles), soft-teal "vs" badge pinned to the seam; mobile
   stacks blue-panel-first; sub copy split into two sentences.
8. Answers: card borders, `#282972` dots, "See your price" teal pill.
9. Final CTA: pattern edges + two tilted card photos (left) + hand-holding-
   card photo (right); copy "…a few minutes, or chat to us if you need us.";
   link "Prefer a call? **We'll phone you.**" — still opens the site's
   #homePageCallMePopUp modal (deliberate, design links it to #router).
10. Self-serve: bare links → white cards with icon circles + underlined
    arrow links.

Also fixed in this pass: **bug 2** (init() now bails if hideLiveHomepageBody()
fails — no double homepage) and **bug 4** (un-prefixed `.finalcta .row` kill
rule is gone; every selector is prefixed).

Verified 2026-08-09 via Playwright against the live homepage (S3 URLs routed to
the local copies): native content hidden, fonts load, router updates CTA
label/href, carousel loops both directions, smooth scroll + modal attrs intact,
desktop + mobile renders match the Figma frames.

### QA bug fix 2026-08-10 — chip click didn't update the CTA label

A `cro-height` line-height fix (spans wrapped around ~30 text runs, added
directly in the Convert copy + local files) wrapped the hero CTA's label in
`<span class='cro-height'>`, so `initHeroRouter`'s
`cta.firstChild.nodeValue = …` wrote to a span ELEMENT (silent no-op) instead
of the text node — chips selected and the href updated, but the button text
never changed. Fixed in variant.js: `setCtaLabel()` writes into the
`.cro-height` span when present, falls back to the text node otherwise. Also
synced the 3 `cro-height` wraps ("usual way" steps) that existed only in the
Convert copy, so local variant.js again matches Convert's HTML exactly.
**Re-paste variant.js into Convert** (CSS unchanged). Playwright-verified:
all 4 chips update label + URL clicking chip body, text, price or icon,
desktop + mobile.

### NEW launch gates (v3)

- ~~Upload 4 assets to S3~~ — DONE 2026-08-09, uploaded under
  `Oneplan/Dev | AB Homepage Redesign | All | CRO-12574/` as
  `CRO-12574-1.jpg` (hero family), `CRO-12574-2.webp` (claim card),
  `CRO-12574-3.webp` (card in hand), `CRO-12574-4.svg` (pattern).
  Each visually verified against the intended asset before the URLs were
  wired in; code + this folder's `assets/` copies use these names. All four
  return 200 and render (Playwright, desktop + mobile, real URLs).
  (The old `CRO-12574-Homepage_Redesign-1.png` mum+baby hero is obsolete.)
- Paste variant.js (as-is, into the `function(convertContext){}` wrapper) and
  variant.css into Convert experiment 1004206057.
- Link destinations below remain placeholders — unchanged from v2.

---

Source of the code in this folder: extracted from Convert.com Dev experiment `1004206057`
("Dev | AB Homepage Redesign | All | CRO-12574", status: paused, 100% to Variation 1 for QA).

## Convert re-check 2026-08-09

- Experiment now **active** (version 12), still 100% to Variation 1 / Original stopped —
  Dev/QA weighting unchanged.
- Convert's Variation 1 CSS + JS are byte-identical to this folder's variant.css/variant.js
  (only diff: a leading blank line in the local JS) — the 2026-07-29 fixes (carousel loop,
  auto-advance removal, smooth-scroll anchors) ARE now in the experiment.
- Experiment data is NOT in the public prod bundle (`experiences:[]`); the global-JS
  `executeExperiment("1004206057")` call is a no-op for regular visitors — not publicly visible.
- Still open in the live code: bug 2 (unguarded `injectRedesign()`) and bug 4
  (unprefixed `.finalcta .row::before/::after` at CSS lines 1184–1185), the 5 spec-vs-design
  decisions, and all "Before launch" items below.
`variant.js` has Convert's `function(convertContext){}` wrapper stripped — paste the file
contents into the variation's Custom JS as-is.

Design reference: https://design.conversionratepros.co.za/oneplan/homepage/variant-b-v2/
The build is a faithful copy of the design page (HTML/CSS/JS all match; links absolutized,
placeholders tagged `data-cro-placeholder="verify-destination"`).

## Open bugs (vs ticket Logic & Rules)

1. ~~Reviews carousel prev/next do not loop at the ends~~ — FIXED in this folder's
   variant.js 2026-07-29 (arrows wrap both directions, auto-advance pauses on hover
   and resumes on mouseleave). NOT yet pasted back into the Convert experiment.
2. `init()` runs `injectRedesign()` even when `hideLiveHomepageBody()` fails —
   if the client re-skins the page again and the `.jumbotron` climb breaks, visitors
   would see both homepages. Gate: `if (!hideLiveHomepageBody()) return;` — still open.
3. ~~Carousel auto-advance~~ — REMOVED entirely 2026-07-29 (was not in spec; carousel
   is now user-driven only). Playwright-verified on the live page: no movement over
   10s idle + 5s post-interaction; arrows still loop both directions.
4. Minor: `.finalcta .row::before/::after` kill-rule at the bottom of the CSS is the
   only selector missing the `#cro-12574-redesign` prefix — still open.
5. FIXED 2026-07-29: in-page anchor buttons (both "Get a free online quote" -> #router,
   "Make a claim" -> #answers) now smooth-scroll with a sticky-nav offset via
   `scrollToTarget()` (the site's #header.sticky flips to position:fixed/61px once
   scrolled; raw hash jumps were instant and parked targets under it). Includes an
   800ms settle-correction for late-image layout shift. Playwright-verified: all
   three land at 77px below viewport top, animation confirmed smooth.

## Spec text vs design reference conflicts — junior matched the DESIGN; ticket says otherwise. Needs a decision:

- Mobile: spec says KEEP carousel prev/next; design hides them (`.rev-nav{display:none}`).
- Mobile comparison stack: spec = "The usual way" on top; design puts "With your Oneplan
  Card" first (`order:1`).
- Review card content order: spec = stars, heading, quote, name; design shows name first.
- Mobile question cards: spec = plus control on heading; design uses a green dot, no accordion.
- Spec = four plan cards equal visual weight; design elevates the Health card (shadow-lift).
- Design's `.rev::after` teal accent bar is commented out in the variant CSS.

## Verified working (2026-07-29)

- All asset URLs and all quote/plan destinations return 200. The two hero image URLs
  (oneplan.co.za/assets/2024/about-health-header.png vs the CRP S3 copy) are byte-identical.
- Hide+inject climb logic works on BOTH the old control.html DOM and the current live DOM
  (live now wraps content in `main#main-content-rb`; climb handles it).
- `#homePageCallMePopUp` exists on live, Bootstrap 3.4.1 loaded — modal trigger works
  (design linked "Prefer a call?" to `#router`; the modal wiring is deliberate, confirm it).
- Catamaran font loaded on live incl. weights 800/900. No ID collisions
  (`router/products/answers/revTrack/quoteCta`). R250/R80/R150, 4.59, 23,019 consistent.
- Homepage-only gating correct in global.js (pathname === '/') and Convert location rule.

## Before launch

- All link destinations are placeholders per the ticket — final URLs to be supplied.
- Dev experiment is 100% weighted to the variation; the live clone needs the real split.
- Dead CSS to strip: `.btn-blue`, `.btn-outline`, `.btn-ghost`, `.tlink`, `.center`,
  `.muted`, and the `.foot` block (no matching markup in the injected fragment).

## Client-requested updates (2026-08-12)

- USP section ("Most cover pays you back. We pay upfront.") "Get a free online quote"
  CTA: `#router` → `#products` (anchors to "What each plan covers").
- Final CTA ("Ready when you are") "Get a free online quote": `#router` → `#products`.
- Answers section ("Everything you want to know before you decide"): all three card
  links/buttons removed (Compare plans, See your price, Read about waiting periods) —
  client has no URLs for these. Cards are now heading + copy only; `.ans>a` /
  `.ans .btn-teal` CSS rules are dead but left in place so variant.css stays
  byte-identical with Convert (only variant.js needs re-pasting).
- Playwright-verified on live (1440 + 390): both CTAs smooth-scroll to #products at
  77px below viewport top (61px sticky header + 16px offset), zero `#router` hrefs
  left, zero links inside `.ans` cards, card spacing intact via flex gap.
