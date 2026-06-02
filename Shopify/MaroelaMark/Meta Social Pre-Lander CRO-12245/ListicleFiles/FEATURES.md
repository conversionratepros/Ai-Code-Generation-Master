# Feature list — Pre-lander build

## 1. Hero section (`pre-lander-crp-hero`)
- Editable logo image
- Editable heading + separate "accent" text (different colour)
- Editable accent text colour
- Editable paragraph text
- Editable CTA button: text, link, open-in-new-window, colour, icon (SVG)
- Editable feature image: separate desktop + mobile uploads
- Adjustable feature image bottom padding (flush vs floating)
- Editable optional background overlay image
- Editable gradient background: 3 colour stops
- Mobile: feature image moves between logo and content; accent text drops to its own line; CTA goes full-width

## 2. Listicle Group section (`pre-lander-crp-listicle-group`)
- Packages 1–N numbered listicle blocks plus optional side widget into one drop-in section
- Drag/drop reorder of listicle blocks in the customizer
- Toggle to show/hide the side widget (banner column)
- Main column locked to 781px wide; widget locked to 359px wide on desktop
- Side widget is sticky on desktop; sticks to bottom of listicles on mobile
- Side widget has its own internal vertical scroll (scrollbar hidden) when content exceeds viewport
- Background colour configurable

### Per listicle block
- Top divider toggle
- Number: show toggle, value, colour
- Heading: show toggle, text, colour
- Image: show toggle, separate desktop + mobile uploads
- Paragraph: show toggle, rich-text, colour
- Optional second paragraph (renders under the quote)
- Quote: show toggle, text, background colour, left-border colour
- Link: show toggle, text, URL, open-in-new-window, colour
- Inline review card: independent desktop/mobile show toggles, star count (0–5), date text, review body, avatar image (round), reviewer name, "Verified customer" badge toggle

### Side widget (banner) configuration
- Title, paragraph, feature image
- CTA button: text, colour, link, open-in-new-window, icon
- Background colour, optional background image
- Reviews: master toggle + 3 individual reviews each with star count, date, body, avatar, name, verified badge

## 3. Footer Banner section (`pre-lander-crp-footer-banner`)
- Editable background image (desktop + mobile share one upload)
- Editable heading + colour
- Editable paragraph + colour
- USP trust list: show toggle, marketer adds N items as blocks (icon + label per block) — reuses the CRO-12303 USP snippet
- Primary CTA: text, colour, icon, link, open-in-new-window
- Secondary link below CTA: text, colour, URL, open-in-new-window
- Gradient overlay colour
- Separate desktop and mobile overlay controls: opacity, start position, end position
- Mobile applies the same overlay-on-background pattern as desktop (image fills section, content overlaid, vertical fade)

## 4. Page template + supporting files
- New alternate page template `page.pre-lander-blikbeker.json` assembling all three sections
- All defaults pre-populated from the static HTML so the page renders with full content out of the box
- 32+ bundled assets in the theme (logos, feature images, hero/footer images, listicle 01–04 desktop+mobile, banner cup arrangement, SVG icons, star, check, review avatar)
- Snippet `pre-lander-crp-usp-list.liquid` copied in for the USP trust list
- Standalone `pre-lander-crp-listicle.liquid` (the original single-listicle version) still on disk for fallback / single-item use

## Workflow / infrastructure
- All section files self-contained — inline CSS scoped to a unique class, no shared CSS asset to wire up
- All section files mirrored in two places: `ListicleFiles/` (portable copy for reuse on other clients) and `Theme/` (full theme pull, what gets pushed to Shopify)
- Backup of the original standalone listicle section + template kept in `_backups/` before the block migration
- Local dev server (`shopify theme dev`) targeting unpublished DEV theme **CRP May 29** (#154036633786) with hot reload and auto-sync
- Static HTML + CSS reference build still in the project root for visual parity checks
