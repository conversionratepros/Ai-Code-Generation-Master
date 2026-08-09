# CRO-12574 — Homepage Redesign v3 — QA handover (2026-08-09)

Experiment: **Dev | AB Homepage Redesign | All | CRO-12574** (Convert `1004206057`, 100% to Variation 1)
Page: https://www.oneplan.co.za/ (homepage only)
Design reference: Figma "Oneplan — Homepage Relook" — desktop frame 44-5710, mobile frame 56-101
Breakpoint: mobile layout kicks in at ≤900px

The whole variation was reskinned to the client's updated Figma. Same sections
and behaviours as before — new colours, font, layout details, and photography.

## Global changes

1. **All buttons are now bright teal** (#5BF1FD) pills with navy text and an
   arrow icon — every CTA that used to be green.
2. **New font everywhere: Anek Devanagari** (loaded from Google Fonts).
   Headings are sentence case (site normally forces UPPERCASE — that override
   is part of the test). Small uppercase "pre-header" lines (HEALTH · PET ·
   GAP…) are specced in Aptos — they fall back to Anek since Aptos isn't a
   web font. Not a bug.
3. New palette: vivid blue #0000D9, navy #09075C text, light-azura #AEEEFD
   accents.

## Section by section

### 1. Hero
- Headline: "Insurance that pays your **claims** upfront." — teal rounded
  pill behind the word **"claims"** (used to be "upfront").
- New sub copy: "…with your Oneplan **Claim** Card, **never** weeks out of
  pocket…"
- Product picker chips: now white cards with navy **line icons** (no more
  product photos). Desktop = 4 upright cards side by side; mobile = 2×2 grid,
  icon left of text. Selected chip gets a teal border + teal tick badge
  top-right.
- Clicking a chip still updates the big CTA's label and destination
  ("Get my Health quote" → "Get my Pet quote" etc., incl. "Get my Car &
  Household quote").
- New hero photo: family on a blue couch. Desktop: background, family on the
  RIGHT (image is intentionally mirrored). Mobile: photo block below the
  picker, un-mirrored.
- "About 2 minutes" + clock sits next to (desktop) / under (mobile) the CTA.

### 2. Trust ribbon (Hellopeter)
- Now a **floating white card** overlapping the bottom edge of the hero.
- Desktop: logo · 4.59 · stars · 23,019 reviews · 10/10 Trust Index in a row.
- Mobile: logo + "10/10 Trust Index" (cyan) on top row, big 4.59 + stars,
  "Based on 23,019 reviews" underneath.

### 3. What each plan covers
- Card icons: line icons in light-blue circles (no product photos).
- Card titles UPPERCASE; 4th product renamed **"Car & Household"** (was
  "Car & Home") — in the chips, this card, and the final CTA eyebrow. The
  hero eyebrow keeps "CAR & HOME" (per design).
- "Most chosen" chip on Health is now **yellow**, centred, overlapping the
  card's top edge.
- Buttons teal with arrow; "See plans & what's covered" underlined navy on
  all 4 cards.
- Copy tweaks: dashes became commas ("Mediclinic, plus day-to-day…",
  "threshold, plus cover…", "flexible cover, because…").

### 4. Reviews
- Background: deep-blue gradient (was flat indigo).
- Heading: "Making our **customers smile** is at the heart of what we do" —
  teal pill behind "customers smile" (no longer italic).
- Cards restructured: **name first**, then 5 gold stars (SVGs, not ★ text),
  then review title, then the quote in bold.
- Long quotes **scroll inside the card** with a slim grey/cyan scrollbar
  (replaces the old 7-line cut-off).
- Prev/next arrows: filled cyan circles, vertically centred at the sides.
  They loop in both directions (last → first, first → last). **No
  auto-advance** — user-driven only.
- Mobile: arrows hidden, swipe only (per design).
- "See all 23,019 reviews on Hellopeter →" is teal + underlined.

### 5. Claim Card USP ("Most cover pays you back…")
- The CSS-drawn card is replaced by a **real claim-card photo** (A NKOSI).
- Compare block is one joined panel: grey "THE USUAL WAY" (numbered steps in
  light-blue circles) + vivid-blue "WITH YOUR ONEPLAN CARD" (white tick
  circles, Oneplan pattern fading in at its right edge). Blue panel is
  slightly taller than the grey one — intentional.
- "vs" badge: soft-teal circle with white ring pinned to the seam between
  the panels (right edge desktop / top edge mobile).
- Mobile order: **blue panel first**, then vs, then grey panel; headings
  switch to sentence case on mobile (per design).
- Sub copy is now two sentences: "…on the spot. You're never out of pocket
  waiting for a refund."

### 6. Everything you want to know (answers)
- White cards with light border on grey; navy dot bullets; "See your price"
  is a teal pill.

### 7. Final CTA ("Ready when you are")
- Vivid-blue section with the Oneplan pattern showing at the left/right edges
  (desktop) or as a bottom band (mobile).
- New photography: two tilted claim cards (desktop left / mobile bottom-right)
  and a hand holding a card (desktop right / mobile bottom-left).
- Eyebrow reads "…CAR & HOUSEHOLD".
- Copy ends "…It only takes a few minutes, or chat to us if you need us."
- Link text is now "Prefer a call? **We'll phone you.**" — it still opens the
  site's existing "Let us call you" modal (deliberate; do not flag that it
  doesn't scroll).

### 8. Already with Oneplan?
- The three links are now **white cards**: icon in a tinted circle (WhatsApp
  one is green-tinted), bold title, underlined sub-link with a small arrow.

## Behaviour that must still work (regression checks)

- Native homepage content fully hidden; no double homepage. If the variation
  can't find its anchors it now **does nothing at all** (fail-safe).
- Chip click → CTA label + URL update (all 4 products).
- Quote destinations: health / onepet / gap / shortterm with
  `?referrer=homepagequote`.
- "Get a free online quote" buttons (USP + final CTA) smooth-scroll to the
  hero picker, landing below the sticky header.
- "Make a claim" card smooth-scrolls to the answers section.
- Carousel loops both ways; no movement when idle.
- Call-me modal opens from "Prefer a call? We'll phone you."

## Known / not bugs

- Link destinations are still the agreed placeholders (login, Hellopeter,
  WhatsApp number) — pending final URLs, same as v2.
- Aptos pre-header font renders as Anek Devanagari (see Global #2).
- Desktop hero photo is mirrored vs the source file — intentional (design).
- Floating site widgets (WhatsApp bubble, "ONE" button) overlap the hero CTA
  area on small screens — site-level, present on control too.

## Assets (all live on S3, 200-checked)

`Oneplan/Dev | AB Homepage Redesign | All | CRO-12574/`
- CRO-12574-1.jpg — hero family photo
- CRO-12574-2.webp — claim card
- CRO-12574-3.webp — hand holding card
- CRO-12574-4.svg — background pattern
