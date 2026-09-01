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
- **Estimator → Typeform hidden fields** (reworked 2026-08-12 per Don/client): answers stored in `sessionStorage.croHpEstimator`; a capture-phase click handler intercepts any `data-crohp-typeform` trigger once the estimator has been submitted and opens `window.tf.createPopup(formId, {hidden})`. The hidden payload contains **only the dropdowns actually answered** (empty ones omitted — client requirement) plus constant `entry_point=homepage-estimator`; values are slugified from the display labels (`11–30`→`11-30`, `Within a month`→`within-a-month`, `30+`→`30-plus`). Submit always proceeds, 0–3 answers. The estimator's own trigger no longer uses `settings.typeformurls_url_1` — it renders explicit attrs from section setting `est_typeform_id` (default **`oq7mO0d2`**, the live general-quote form) plus `data-tf-on-submit`/`data-tf-on-ready` (attributes are a full replacement because duplicate HTML attributes resolve to the first occurrence). Fallback: same non-empty set mirrored to `data-tf-hidden`; with no submit yet or no `window.tf`, the native embed binding runs untouched (hero/other CTAs unaffected). The embed SDK delivers hidden fields in the iframe URL **hash fragment**, not the query string — equivalent to the client's `?headcount=…` URL test. Verified via Playwright harness vs the real embed.js 2026-08-12 (partial answers, zero answers, slug edge cases, native path, fallback attr — 14/14). ⚠️ **The `headcount`, `city`, `timeframe`, `entry_point` hidden fields must exist in the `oq7mO0d2` Typeform itself** (client's URL test suggests the first three do; `entry_point` is new — confirm), and the Typeform welcome screen should repeat the face + two-hour promise (Typeform-side config).
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
- [ ] Confirm `headcount`/`city`/`timeframe` + new `entry_point` hidden fields exist in Typeform `oq7mO0d2`; set welcome screen (face + 2-hour promise)
- [ ] Confirm slug vocabulary with client (Don's example `timeframe=1-2-months` ≠ configured options `asap`/`within-a-month`/`1-3-months`/`just-planning` — option labels or a value map must come from them if reporting expects specific strings)
- [ ] Photography: hero, S4, case cards, S9 side photo (grey placeholders render until then)
- [ ] White client logos uploaded (proof band blocks) — five distinct clients (4.3)
- [ ] Three verified distinct quotes + city check (4.5/4.6)
- [ ] Sales-owned pricing numbers or untick estimator (4.8)
- [ ] Chip + footer link URLs set (fitout-journey links auto-anchor on-page when blank)
- [ ] `cro-hp-zac.png` is 1.2MB — compress (~200KB webp/png) before theme upload
- [ ] Poppins 500 is loaded via a `<link>` in the hero section — if hero is ever removed from the template, move that link into another section
- [ ] Confirm live badge / "38 fitouts this week" numbers have an owner + update cadence (spec: real, fed, flattering)
- [ ] Convert experiment: Split URL or template-swap targeting `/?view=cro-hp` per CRP standard

---

# v2 respec — "Temp - JasonL — Website 2026" board (2026-08-10)

Client supplied a new Figma (5JZZIzKcjO1Yzv2rCBszng) with desktop (478:940, 2000w/1540 content)
AND real mobile frames (478:1991, 390w/358 content). Full type/spacing/margin re-verification done
with Playwright against the live preview theme (188303442208).

- **Extracted specs:** `recon/figma-desktop-spec.md` + `recon/figma-mobile-spec.md` (per-band text + layout tables).
- **New tokens:** ink `#161616` (was #0A0A0A), grey `#777`, light band `#F6FAFB`, dividers `#E9E9E9`,
  orange `#FF9F17` (replaces mustard), dark bands `#161616` (was #1B1C15), on-dark `#F6FAFB`/`#E5ECF0`.
- **Type scale:** H1 74/84 (was 106), H2 42/50 (Showrooms 50), body 16/28, small 14/24; buttons h54 r50
  label 14/600 (People + Final CTA 16; Final CTA px60); eyebrow 10/600/ls2.4 + 11px dot.
- **CTA flips per board:** hero "Shop furniture" + interior "Find out more" → dark outline;
  furniture "Shop all furniture" → light `#E9E9E9` outline (`--outline-light`).
- **Mobile system (new):** 16px gutters, pt/pb 40 bands, full-width 54px buttons (15/600), H2 28/34,
  body 13; stats 2×2 + logos 2×3 grids; how-steps 2×2; case-card RAIL (275w, snap, JS progress hint);
  chip rail; estimator full-bleed band; people reordered (title→photo→signature→CTA via display:contents);
  showrooms ACCORDION (closed 63px #F6FAFB rows, chevrons, "See on Google" link) + footer accordion.
- **Structural adds:** `snippets/cro-hp-modal-virtual-tour.liquid` (fork; label now "360º Virtual walk-through"),
  chevron + See-on-Google spans in showrooms, footer col classes, Poppins 300/300-italic loaded (proof-band
  "this week" is Light Italic).
- **Verification:** 59-point Playwright check (both viewports) — 59/59 within 0.01px after fixes
  (`scratchpad/verify.py` pattern: disable old cro-hp.css links, inject new CSS at body end, compare
  computed styles to spec tables).
- **Deliberate deviations:** photo `opacity .2` washes in the comp treated as placeholder art direction —
  NOT applied to merchant-uploaded images; sticky mobile bar kept (not drawn in new board, mandated by
  conversion spec); showrooms section CTA kept (soft conversion; absent from new board); mobile
  "Notification strip" (cream #FFF7D6 interior-design teaser, hidden layer in comp) NOT built pending
  confirmation; comp inconsistencies normalized (Hanken Grotesk/Inter → Poppins, eyebrow tracking unified,
  tier eyebrows standardized to 13/1.3).

**Re-upload list for preview theme 188303442208:** assets/cro-hp.css, assets/cro-hp.js,
assets/cro-hp-zac.png + cro-hp-zac-signature.png + cro-hp-logo.svg (binaries currently 404),
sections/cro-hp-hero.liquid, cro-hp-proof-band.liquid, cro-hp-interior.liquid, cro-hp-furniture.liquid,
cro-hp-showrooms.liquid, cro-hp-footer.liquid, snippets/cro-hp-modal-virtual-tour.liquid (NEW).

## v2.1 — client QA round (2026-08-10, after first live review)

1. **Cases mismatch root cause:** a hand-added `.crohp-section p { margin-top: 15px }` rule — `p`-element
   specificity (0,1,1) beat every single-class margin rule on `<p>` elements (case meta lost its 30px
   insets, subs/eyebrows gained phantom gaps; also why the hero-eyebrow `!important` hack existed).
   Reset is now `.crohp-section :where(p) { margin: 0 }` — beats theme resets, ties (and loses by
   order) to our per-element rules. All 10 affected margins re-verified live.
   "See the fitout" also now renders on every card (falls back to section URL / #) per comp.
2. Pricing H2 max-width 730→700 so "Roughly this." wraps to line 2 like the comp.
3. Case-rail progress reworked: fixed-width thumb travels the 179px track (width + translateX,
   recalculated on scroll AND resize). Verified: translateX 3→101px across full scroll.
4. MOST COMMON tag centered over its tier (left 50% / translate(-50%,-50%)) — desktop + mobile, verified 0px delta.
5. First showroom accordion row opens by default on mobile load (comp default state).
6. `body.index-cro-hp .collection-slider-holder.large-hide { display:none !important }` — theme's
   mobile category slider no longer renders above the variant hero.

Re-upload: assets/cro-hp.css, assets/cro-hp.js, sections/cro-hp-case-studies.liquid, sections/cro-hp-pricing.liquid.

## QA round 1 — 33 bugs from #qa-l1 (thread 1786418061.845479, fixed 2026-08-11)

**Root cause of the font-size batch (bugs 1,7,8,11,14,16,25,27,30,33):** type was scaled with vw
clamps against the 2000px design canvas — QA measures absolute px at ~1440, where clamp(28px,2.1vw,42px)
renders ~30px. All type is now FIXED px (74/50/42/70 desktop, mobile block per mobile frame).
Process change: verification now runs at 1440 + 390 (QA's real viewports), never the design canvas width.

Other fixes: badge fully 600 (2) · trust seps 30px each (3) · removed the `!important` eyebrow hack that
pinned the mobile gap at 20 (4) · microline + mech lead break via `strong{display:block}` mobile (5,13) ·
trust rows are flex+gap so spacing survives Shopify's setting-trim (6) · proof headline 3 lines mobile (9) ·
logo grid 15px centered cells (10) · How divider is static again — draw animation removed, steps still
stagger (12) · cases copy/pills/button to Figma: heading "Big or small…", board sub, outline button,
pills fully 600 with no flex gap before • (15,17,18) · Figma quote on all three cards (19) · margins
30/20 per QA (16,20,21,22,24,26,30) + people 45 (33) · rail scroll-padding 16 (23) · select focus =
hairline box-shadow, no browser ring (28 — native popup position itself is OS-rendered, not controllable) ·
estimator button inline 18px removed → 14/15 (29,31) · product card text vertically centered (32).

Open judgment calls flagged to QA: cases eyebrow kept "Recent fitouts" (Figma component shows placeholder
"Complete the setup"); identical quotes ×3 now match Figma but contradict original spec QA 4.5 (verified
distinct quotes) — content gate stands; cases sub now duplicates How's sub per Figma (spec QA 4.7 conflict).

Re-upload: assets/cro-hp.css, sections/cro-hp-pricing.liquid, sections/cro-hp-case-studies.liquid,
templates/index.cro-hp.json. Slack summary posts to the thread after live re-verification.

## Port: showrooms / final CTA / footer reused from CRO-12526 v2 (2026-08-11)

Per Rafee: the PDP Buy-first test (CRO-12526 v2) already built these three sections in the same
2026 design system and they survived 15 QA rounds — reused instead of my rebuilds. Class names and
CSS kept VERBATIM (cro12526v2-*; 100-rule extraction from cro-12526-v2-pdp.css, verified complete
after fixing a comment-brace parser bug), so their QA fixes ride along: address note-line cleanup
(their Bug 22), handleized modal names for "&" (Bug 23), hover/focus side-image swap, mobile
accordion single-open+toggle-off (Bug 56), centered mobile final CTA (57), inline jason.l SVG
wordmark, client-verified footer URLs.

Homepage adaptations: page-width → crohp-container (band alignment); id="cro-hp-showrooms" kept for
anchors; showrooms title row keeps the ten-beat soft-conversion CTA (Typeform); final CTA carries
data-crohp-final-ask (sticky-bar hide) + data-crohp-typeform (estimator hidden fields) and DROPS the
12526 mobile brand block (homepage footer owns the brand block); footer = link blocks ×15 in template
JSON (Pricing guide → #cro-hp-pricing, Book a showroom visit → #cro-hp-showrooms anchors; Reviews /
Careers / Contact URLs blank — need client destinations). Old .crohp-rooms/.crohp-ask/.crohp-footer
CSS is inert, marked deprecated pending QA sign-off. snippets/cro-hp-modal-virtual-tour.liquid
deleted (superseded — remove from theme too, optional). initShowrooms12526 ported into cro-hp.js.

Re-upload: assets/cro-hp.css, assets/cro-hp.js, sections/cro-hp-showrooms.liquid,
sections/cro-hp-final-ask.liquid, sections/cro-hp-footer.liquid, templates/index.cro-hp.json.

## PDP Round 2 mirror (2026-08-25) — three homepage items from the CRO-12526 v2 client round

Client "PDP Rebuild Updates" Round 2 named the homepage explicitly on #1 and the other two use the
same components, so they were applied here in the same pass (details in the PDP folder's
user-story.md round 17):
- #1 "Fitouts? Handled." step columns gap 40 → 100 (`.crohp-how__grid`, ≥990 only).
- #2 mechanism strip copy breaks before "No middlemen, …" on desktop: new `mech_rest_2` setting +
  `<br class="crohp-br-desktop">`; `mech_rest` default is now the first sentence only.
  index.cro-hp.json stores nothing for this section, so defaults apply — if "Copy" was ever saved
  in the theme editor, shorten it there.
- #4 orange "Want to elevate your space?" bar hidden on this template
  (`body.index-cro-hp .pdp-header-banner`) — it is rendered from layout/theme.liquid.
- #6 "Big or small, we've done one like yours." — last two words glued (`.crohp-nowrap` span from
  Liquid) + `text-wrap: balance` on the cases heading.

Re-upload: assets/cro-hp.css, sections/cro-hp-how-it-works.liquid, sections/cro-hp-case-studies.liquid.

## Client round — background videos in Hero + Interior (2026-08-27, Don)

Ask: "add these videos" — Hero (Drive `19GwF7d1Ia8aNscJoZUBEDhI9SqElkeYA`) + "Dedicated design" = `#cro-hp-interior`
(Drive `1nqcnEwLc8y5Ap5i_TKssXnW3KdiHI9HZ`); "for the mobile hero make an overflow so there is no black border"
= cover-crop the 3:1 clip in the 1.3:1 mobile slot instead of letterboxing.

**Source files (as supplied):** HEVC Main-10 `.mov` with a silent AAC track — hero 1920×648 (2.96:1, exactly the
1540×520 desktop slot) 18.6 s 21.6 MB; interior 1920×1546 (1.24:1 vs the 740×620 slot's 1.19) 12.8 s 14 MB.
No baked-in black bars (cropdetect = full frame). HEVC 10-bit does not play in Firefox / most Chrome → re-encoded:
H.264 High 8-bit, no audio, `+faststart`, CRF 26/27, GOP 60 → `media/`:
`cro-hp-hero-video.mp4` 1920×648 4.4 MB · `cro-hp-hero-video-mobile.mp4` 716×552 1.5 MB (centre crop 840×648 → 358/276)
· `cro-hp-interior-video.mp4` 1480×1192 3.3 MB · `cro-hp-interior-video-mobile.mp4` 716×800 1.2 MB (centre crop 1384×1546
→ 358/400) · `cro-hp-hero-poster.jpg` / `cro-hp-interior-poster.jpg` (frame @0.2 s, for the image/poster settings).
Mobile hero shows the centre ~44 % of the 3:1 frame (jason.l signage / hands stay centred) — if the client wants more
of the shot on phones, ask for a 4:3 export and drop it in "Video — mobile".

**Build:**
- `snippets/cro-hp-video.liquid` (NEW, shared): renders `<video class="crohp-video" muted playsinline loop preload="none">`
  ON TOP of the slot's existing `<img>` (image stays poster / LCP / fallback) + inert `<template data-crohp-video-sources=
  "desktop|mobile">` holding the `<source>`s. Shopify `video` upload → HLS first then MP4s largest→smallest; mobile with no
  dedicated upload → the desktop video's ≤720p rendition; custom MP4 URL → single source. Uploaded video beats the URL.
- Hero + Interior schema: `video`, `video_mobile`, `video_mobile_enabled` (default on), `video_url`, `video_url_mobile`;
  `image` relabelled "… / video poster". Existing `image` id unchanged — nothing the editor holds is lost.
- `cro-hp.js` `initVideos()`: clones the desktop OR mobile set in (one download only, split at 749px like the CSS),
  `load()` + `play()` with `muted` re-asserted; hero (`defer="load"`) arms after `window.load` so the poster image keeps LCP;
  interior (`defer="view"`) arms 200 px before entering the viewport; both pause off-screen; `is-playing` class fades the
  video in. Reduced-motion / Save-Data / no-JS → sources never attach, image shows. `data-crohp-video-mobile="off"` skips
  phones when the checkbox is off.
- `cro-hp.css`: `.crohp-video` absolute + `object-fit: cover` (the "overflow, no black border"), opacity fade, `isolation:
  isolate` on both media boxes (Safari radius clipping), `display:none` under `prefers-reduced-motion`.

**Verification:** Playwright harness of the rendered markup + real cro-hp.css/js in Google Chrome (`channel="chrome"` —
bundled Chromium has no H.264): 27/27 at 1440 / 390 / reduced-motion / JS-off — correct source set per viewport, playing
with no media error, video rect == media box rect (no letterbox), live badge above the video, interior not armed until
scrolled in and paused when out, mobile-off block image-only at 390 and playing at 1440.

**Deploy (two hosting routes, either works):**
A. Theme editor → Hero / Interior sections → "Video — desktop" (+ optional "Video — mobile") pick `media/*.mp4`; set
   `media/*-poster.jpg` as the image. Shopify transcodes (~2 min; image shows meanwhile).
B. S3 `crp-clients-images` (as Babylonstoren CRO-12516) → paste URLs into "Custom MP4 URL — desktop / mobile".
Re-upload: `snippets/cro-hp-video.liquid` (NEW), `sections/cro-hp-hero.liquid`, `sections/cro-hp-interior.liquid`,
`assets/cro-hp.css`, `assets/cro-hp.js`. Do NOT re-upload `templates/index.cro-hp.json` — the editor's copy will hold the
video/image picks; pull it back into the repo afterwards.

### Follow-up (2026-08-27) — interior video "looking very small" + keep left copy from wrapping

Root cause: `.crohp-id__grid { grid-template-columns: minmax(0,1fr) minmax(320px, 40px) }` — a minmax whose max is
below its min resolves to the min, so the media column was a fixed 320px at every width (the 740×620 Figma slot never
rendered). Fix measured in Chrome across 2000/1762/1440/1366/1280/1024 before choosing (equal 1fr/1fr per Figma pushed
the sub-copy to a 3rd line at 1440 — client asked that the left text NOT gain lines):
- ≥1280: `minmax(0,1.15fr) minmax(0,1fr)` → media 605×507 @1440, 726×608 @2000 (Figma 740×620); h2 3L / sub 2L /
  bullets 1L / CTAs one row — identical line counts to before at 1440, 1762 (Don's viewport) and 2000.
- 990–1279: `minmax(0,1.75fr) minmax(0,1fr)` → bullets single-line down to 1024, media ≥ the old 320 everywhere.
- ≤989 unchanged (stacked, full-width image; mobile 358×400).
Re-upload: assets/cro-hp.css only.

## Round 3 #1 (2026-08-31) — furniture chips wired to categories

Client: "Need a furniture-only section — direct these badges to the relevant categories." The
section already exists (S7 furniture door); the 9 chips just had labels only, so every pill
rendered with an empty href. `templates/index.cro-hp.json` now stores a `url` per chip, verified
against the live nav: office-chairs / office-desks / office-workstations / office-storage /
tables / sofas-lounges-collaborative-soft-furniture / whiteboards-presentation-boards; **Privacy
pods + Acoustics both → /collections/office-partitions** — the live site has no separate
collections (every "Pods & Acoustics" submenu item links there); flag to client in case they want
dedicated URLs. Re-upload: templates/index.cro-hp.json only.
