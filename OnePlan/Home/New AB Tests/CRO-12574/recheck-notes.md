# CRO-12574 — AB Homepage Redesign | All — Recheck notes (2026-07-29)

Source of the code in this folder: extracted from Convert.com Dev experiment `1004206057`
("Dev | AB Homepage Redesign | All | CRO-12574", status: paused, 100% to Variation 1 for QA).
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
