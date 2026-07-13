# PDP Shipping | Geo-Personalised Delivery | ALL | CRO-12280

## Designs

- Test core design: https://www.figma.com/design/zFbXiCh9oCBuPWlVUqzRq7/PDP-Shipping-%7C-Geo-Personalised-Delivery-%7C-ALL-%7C-CRO-12280?node-id=9-108&m=dev
- Test full page design: https://www.figma.com/design/zFbXiCh9oCBuPWlVUqzRq7/PDP-Shipping-%7C-Geo-Personalised-Delivery-%7C-ALL-%7C-CRO-12280?node-id=9-3&m=dev
- Mobile design: https://www.figma.com/design/zFbXiCh9oCBuPWlVUqzRq7/PDP-Shipping-%7C-Geo-Personalised-Delivery-%7C-ALL-%7C-CRO-12280?node-id=9-186&m=dev

## Background

On the current OneDayOnly product detail page, the buy box shows the delivery information in a plain, low-emphasis way. Two small grey labels sit to the right of the price: an "Excludes shipping" label and an "ETA: 3-5 working days" label (the working-days range changes from product to product).

This test replaces those two plain labels with a single, more confident "Geo-Personalised Delivery" badge. The badge is a highlighted box that names the shopper's own location and tells them when their order will arrive, so the delivery promise feels personal and specific rather than generic. The test runs on every product detail page.

## Developer Note — location signal (resolved)

The location signal is **Convert.com's own geo lookup**: `convert.getUserData().geo` (`.city` / `.state` / `.country`), resolved from the visitor's IP via Akamai.

**IMPORTANT:** `convert.getUserData().geo` is only populated when the experience has an **audience with geo conditions attached** in the Convert dashboard. A permissive match-all geo audience must be added to the experience or the geo object is always null and every visitor sees the default heading.

CRP will supply the full per-location wording rules. Until then the build uses:
- Visitor in South Africa (`geo.country` = ZA) with a detected city → `"{City}? Sharp."` (design pattern, e.g. "Cape Town? Sharp."; falls back to region name if city is missing)
- Visitor outside South Africa, or no geo data → default heading `"South Africa? Sharp."` (placeholder — confirm wording with CRP)

## UX/UI — Geo-Personalised Delivery Badge

- One highlighted box: light tinted background fill (`rgba(10,102,194,0.04)`), 3px coloured vertical bar down the left edge (`#0093D0`).
- Pin icon (14×14, stroke `#0A66C2`) at top left, to the left of the text.
- Line 1 — location-aware heading, bold (Montserrat 700, 13.5px/18px, `#0F172A`), e.g. "Cape Town? Sharp."
- Line 2 — delivery message: "**Arrives in [range] working days**." — "Arrives in" and the range bold; trailing full stop regular (Montserrat, 13px/18px, `#334155`).
- Line 3 — shipping qualifier: "Shipping calculated at checkout" — small, italic, muted grey (Montserrat italic, 11px/14px, `#64748B`).
- Display only — no buttons, links, fields, or hover behaviour.

## Placement

- **Desktop:** in the buy box, below the Payflex "Buy Now, Pay Later" section and above the "Colour" selector; full width of the buy box column.
- **Mobile:** below the Payflex section and above the trust list ("Customers rate OneDayOnly", "Send as a gift", "Easy returns"); full width of the buy box column.
- Implementation note: both placements are the same DOM position — the badge is appended inside the Payflex buy-box grid cell (`beforeend`), because the buy box grid uses explicit `grid-template-areas` and a new sibling would be auto-placed in the wrong row (verified in CRO-12279).

## Logic & Rules

- Runs on all product detail pages (`/products` paths).
- Delivery lead time is dynamic per product: read from `__NEXT_DATA__` `product.customerDeliveryTime.label` (primary) or the visible "ETA: X-Y working days" text (fallback) — never hard-coded.
- The existing "Excludes shipping" and standalone "ETA: [range] working days" labels are hidden once the badge is injected, so delivery info never shows twice.
- If a product shows no delivery lead time at all, the delivery message line of the badge is hidden (fallback — pending confirmation).
- All existing buy box functionality remains intact: price block, "More options", variant and quantity selectors, "I want one" button, Payflex section, cart/checkout behaviour.

## Acceptance Criteria

- Badge appears in the buy box on every product detail page.
- Badge shows pin icon, bold location heading, bold "Arrives in [range] working days" line, italic "Shipping calculated at checkout" line.
- Delivery message uses the lead time the product page already shows, not a fixed range; products with different lead times (5-10, 10-15) show their own range.
- Old "Excludes shipping" and "ETA: [range] working days" labels no longer appear beside the price; delivery info is not shown twice anywhere in the buy box.
- Desktop: badge below Payflex, above "Colour" selector, full width of buy box.
- Mobile: badge below Payflex, above trust list, full width of buy box.
- Price block, "More options", variant and quantity selectors, "I want one" button, and Payflex section unchanged.
