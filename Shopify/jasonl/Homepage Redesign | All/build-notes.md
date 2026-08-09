# JasonL — Homepage Redesign | All (CRO-HP)

Ten-beat descending-argument homepage rebuilt as a full alternate Shopify template.
**No ticket assigned yet** — files use the `cro-hp` prefix; rename to `cro-XXXXX` when the ticket lands.

- **Design board (canonical for layout/type/colour):** figma.com/design/deFz3gobijm1jsiGYgTjna — desktop frame only (1900w, content 1540)
- **Spec (canonical for copy/structure/CTA wording/behaviour):** ten-beat spec, walked top to bottom
- **Preview:** `/?view=cro-hp` after upload (template `index.cro-hp.json`)
- **Header/nav: unchanged from control** (out of scope; theme.liquid renders it outside the template)

## Files

| File | Beat |
|---|---|
| `templates/index.cro-hp.json` | Assembles all 12 sections, full block instances (presets don't auto-apply from templates) |
| `sections/cro-hp-hero.liquid` | S1 Hero — claim, CTAs, live badge, trust strip |
| `sections/cro-hp-proof-band.liquid` | S2 Live proof band (black #1B1C15) — counters tick once, logos + recency stamps |
| `sections/cro-hp-how-it-works.liquid` | S3 Fitouts? Handled. — timeline draws once, mechanism strip |
| `sections/cro-hp-interior.liquid` | S4 Interior design offer (mustard NEW tag) |
| `sections/cro-hp-case-studies.liquid` | S5 Three static cards (no carousel) |
| `sections/cro-hp-pricing.liquid` | S6 Tiers + lime estimator panel |
| `sections/cro-hp-furniture.liquid` | S7 Furniture door — chips + live collection grid |
| `sections/cro-hp-people.liquid` | S8 Zac + DigiDirect bubble + Talk to Zac's team |
| `sections/cro-hp-showrooms.liquid` | S9 Compact list from `settings.store{N}_showroom_*` + Matterport modal reuse |
| `sections/cro-hp-final-ask.liquid` | S10 Second black band — single Typeform CTA |
| `sections/cro-hp-footer.liquid` | S11 Footer — fitout journey leads columns; theme footer hidden via CSS |
| `sections/cro-hp-sticky-bar.liquid` | Mobile sticky Call / Plan my fitout |
| `assets/cro-hp.css` | Whole design system, scoped where it touches theme (body.index-cro-hp) |
| `assets/cro-hp.js` | Guarded once-run: counters, timeline, estimator→Typeform hidden fields, sticky-bar hide |
| `assets/cro-hp-zac.png`, `cro-hp-zac-signature.png`, `cro-hp-logo.svg` | Board exports, bundled as fallbacks (image_picker wins) |

## Design tokens (from board SVGs, not eyeballed)

Lime `#C6D644` · band black `#1B1C15` · grey text `#6F7268` · muted-on-dark `#B3B7AC` · off-white-on-dark `#F3F5DF` / `#C9CBB2` · mustard `#EDBC3A` · placeholder `#EEF1F3` (thumbs `#F6F6F1`, S4/S6/S8 bands `#F8FAFB`, estimator `#E9F1AB`) · media radius 30 / cards 20 / strips 10 · buttons 66px pill (final ask 84px).

## Behaviour wiring

- **Every "Plan my fitout"-family CTA** reuses the sitewide Typeform popup trigger verbatim (`typeform-share getaquoteclick typeform-embed` + `{{ settings.typeformurls_url_1 }}` + `data-tf-on-ready` — same as header-contacts.liquid), so existing GA tracking on `getaquoteclick` keeps working. All also carry `data-crohp-typeform`.
- **Estimator → Typeform hidden fields:** answers stored in `sessionStorage.croHpEstimator`; a capture-phase click handler intercepts any `data-crohp-typeform` trigger when answers exist and opens `window.tf.createPopup(formId, {hidden:{headcount,city,timeframe}})`. Fallback: attributes are also mirrored to `data-tf-hidden`; with no answers or no `window.tf`, the native embed binding runs untouched. ⚠️ **The `headcount`, `city`, `timeframe` hidden fields must be created in the Typeform itself**, and the Typeform welcome screen should repeat the face + two-hour promise (Typeform-side config).
- **Sticky bar** hides while the final ask is in viewport (`data-crohp-final-ask` observer) so the two asks never compete. Mobile only (<750px), safe-area padded.
- **Motion:** counters and timeline run once on scroll-in; `prefers-reduced-motion` renders final state; hidden start-states apply only after JS confirms running (no-JS safe).
- **Theme footer** is hidden only on this template (`body.index-cro-hp .footer-wrapper`) — body class comes free from body-classes.liquid (`{{template.name}}-{{template.suffix}}`).
- **Showrooms** read the same global Theme Settings as control (store1–8; Granville excluded like control) and re-render the theme's `custom-modal-virtual-tour` snippet (modal-opener + deferred iframe — no heavy embed).
- **Furniture grid** renders a merchant-picked collection live: dedupe by handle, unavailable skipped, max 12 — no hand-typed SKUs (the duplicated-SKU bug is the cautionary tale). Chips link to collections.

## Board ⇄ spec conflicts (decided, all merchant-editable)

1. **Hero secondary button:** spec says outline; board draws both CTAs solid lime → followed board.
2. **Mustard:** spec says exactly once (live badge). Board: badge dot is LIME; mustard appears on the S4 "NEW" tag and S6 "MOST COMMON" tag → followed board (`--crohp-mustard: #EDBC3A` token if reassignment wanted).
3. **S5 heading:** spec "See for yourself." (used) vs board "Big or small, we've done one like yours." (in schema info).
4. **S6 framing line:** spec wording used; board draft kept in schema info.
5. **Tier figures:** board `$5k/$12k` bands used as placeholders (spec had `$18k/$55k`) — all QA 4.8 anyway.
6. **No mobile frames exist in the Figma file** — mobile built to the spec's explicit behaviours (sticky bar, stacked layouts, chip rail) as a deliberate mobile design.

## QA register (spec 4.x)

| # | Status |
|---|---|
| 4.1 showroom count consistency | Defaults consistent (7 everywhere); hero strip + proof stat are text settings — keep in sync with Theme Settings store list. Info notes on both schemas. |
| 4.2 82% on-time may undercut | Kept per board; editable stat — flag to CRP/client. |
| 4.3 duplicate client logo | **Fixed** — 5th logo slot defaults to CreditorWatch instead of the board's second Hutchinson; board's "Las week" typo corrected. |
| 4.4 "<4 days" vs 10-day headline | Kept per board; editable — flag to CRP/client. |
| 4.5 identical quotes | **Blocker visible by design**: cards 1–2 default to `[QA 4.5 — replace…]` placeholders (real quotes can't be invented); card 3 carries the verified CreditorWatch quote. |
| 4.6 wrong city label | ABC Ballarat defaults to board's "Perth" with a verify note in the placeholder + schema. |
| 4.7 duplicated subcopy | **Fixed** — S5 has its own subcopy (suggested line, needs sign-off). |
| 4.8 placeholder pricing | All figures editable; "Show estimator" checkbox = static-bands-only fallback. Launch gate: sales-owned numbers. |
| 4.9 header IA | Out of scope, unchanged (next-phase follow-up; CRO-12288 separately flags the PDP header quote button). |

## Launch checklist

- [ ] Upload assets + sections + template to a duplicate/dev theme; preview `/?view=cro-hp`
- [ ] Create `headcount`/`city`/`timeframe` hidden fields in the quote Typeform; set welcome screen (face + 2-hour promise)
- [ ] Photography: hero, S4, case cards, S9 side photo (grey placeholders render until then)
- [ ] White client logos uploaded (proof band blocks) — five distinct clients (4.3)
- [ ] Three verified distinct quotes + city check (4.5/4.6)
- [ ] Sales-owned pricing numbers or untick estimator (4.8)
- [ ] Chip + footer link URLs set (fitout-journey links auto-anchor on-page when blank)
- [ ] `cro-hp-zac.png` is 1.2MB — compress (~200KB webp/png) before theme upload
- [ ] Poppins 500 is loaded via a `<link>` in the hero section — if hero is ever removed from the template, move that link into another section
- [ ] Confirm live badge / "38 fitouts this week" numbers have an owner + update cadence (spec: real, fed, flattering)
- [ ] Convert experiment: Split URL or template-swap targeting `/?view=cro-hp` per CRP standard
