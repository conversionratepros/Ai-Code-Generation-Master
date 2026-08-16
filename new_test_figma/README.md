# CRO-12173 — OnePlan Homepage Relook (Variant B v2)

Pipeline test build: Figma REST spec extraction → standalone mockup → live-site AB test variation.

## Files

| File | What it is |
|---|---|
| `spec-desktop.md` / `spec-mobile.md` | Ground-truth spec sheets from Figma REST API (`tools/figma-spec.py`) — every font/spacing/colour value used in the build |
| `assets/` + `assets-mobile/` | All images + icon SVGs via REST (`tools/figma-assets.py`), named by Figma layer, `manifest.json` maps them |
| `index.html` + `styles.css` | Standalone mockup (view via `python3 -m http.server 8763` → http://localhost:8763) |
| `variation.js` + `variation.css` | **The AB test** — injects the redesign over https://www.oneplan.co.za/ |
| `figma-desktop.png` / `figma-mobile.png` | Figma frame renders (design reference) |
| `built-*.png` / `live-var-*.png` | Playwright verification screenshots (mockup / live injection) at 1440 + 390 |

## How the variation works

- Flicker guard hides `#main-content-rb > .container-fluid-rb` (all native homepage sections) via CSS before JS runs.
- **Native header, footer and CALL ME modals are kept.** "Prefer a call?" link opens the native `#homePageCallMePopUp` modal.
- JS injects the full redesigned page as first child of `#main-content-rb`, then reveals with `body.cro12173-on`.
- Hellopeter rating / review count / trust index are **parsed live** from the native `#hellopeter` block (fallback: design values).
- Hero product picker: selecting a tile swaps the CTA label + funnel URL (health/pet/gap/short-term subdomains, existing `referrer=getquoteHomePage` params kept).
- Reviews carousel: prev/next scroll the track.
- Site-CSS hardening block at the end of variation.css (site forces uppercase h1/h2 + margins — do not remove).

## Before Convert deploy

1. Upload `assets/` + `assets-mobile/` to S3, change `BASE` in variation.js (one constant).
2. Confirm with client/CRP: app store badge URLs (none exist on live homepage — currently `#`),
   "Get my Car quote" CTA wording, native header kept as-is, Anek Devanagari webfont injection OK.
3. Wire Convert goals (picker CTA click, plan-card quote clicks, sign-up CTA clicks).
4. Add experience-status gate + QA at 1440/390 via fecli preview.

## Local verification

Node + Playwright harness injects the files over the live page, serving assets from disk
on `https://cro-assets.local` via request interception (no mixed-content issues, no S3 needed).
