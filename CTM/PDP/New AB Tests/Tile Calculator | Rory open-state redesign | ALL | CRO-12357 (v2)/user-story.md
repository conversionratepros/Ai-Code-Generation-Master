# Tile Calculator | Rory open-state redesign | ALL | CRO-12357 (v2)

## Summary
Rebuild of the CTM PDP Tile Calculator as a **custom-built modal** (v2), following the
Figma redesign, while reusing the **validated calculation + add-to-cart logic** from the
control-matched clone.

- **Client / Page:** CTM — PDP (product pages with the Tile Calculator)
- **Ticket:** CRO-12357
- **Figma:** https://www.figma.com/design/sZznaTVI3rVV1BDGwHTvJC (frames 5527-13601 floor open,
  5537-13972 how-to expanded, 5570-11499 wall selected, 5570-11571 summary sheet)

## Difference from v1
v1 decorated the native Magento modal in place. **v2 builds a fully custom modal** (own chrome,
Floor/Wall toggle, card layout, summary bottom-sheet) and takes over `#calc_btn` so it opens
instead of the native modal.

## Behaviour
1. Gate on `#calc_btn` (`waitForElement`). Add `body.cro-12357-v2`, inject the modal, take over
   `#calc_btn` (clone-to-strip native handler) so it opens the redesigned modal.
2. **Floor / Wall toggle** with **independent card lists per zone** (each zone keeps its own
   default Area 1, its own numbering, and its own values). Wall's second field is labelled
   "Height in meters", Floor's "Length in meters". A card added under Wall shows only under Wall,
   and vice-versa. Floor-only / Wall-only tiles show a single full-width button (detected from the
   product title keywords). Zone visibility is toggled with the `hidden` attribute — both lists stay
   in the DOM so the totals/boxes count all areas (no impact on the existing page calculation).
3. **How to measure** — green accordion expands the room-measurement diagram; resets to closed on
   zone switch and on every modal reopen.
4. **Area cards** — each computes `Total area = width × length` (shown as `0.00m²`, no space,
   same format in both zones); Add Area appends a card; delete removes it (bin hidden on Area 1);
   cards renumber per zone. **Labels ("Width" / "Length" / "Height") show only on Area 1.**
5. **Swipe up** opens a **separate summary bottom-sheet** (never resizes the main popup):
   Area measured, 10% extra for installation, "You will need: N boxes = M square meters" (#404040).
6. **Add N boxes to cart** — writes boxes → `#qty-box`, padded area → `#area_to_cover`
   (dispatching input/keyup/change so the site recalculates), then submits `#product_addtocart_form`.
7. Mobile (≤767px) is a full-screen white sheet; the popup sits above the chat icon / promo banner
   (very high z-index).

## Calculation (unchanged — matches the control)
- `m² per box = #umrez / #umren` (fallback 2.52)
- `area = width × length` per card; `total = Σ area`
- `10% extra = total × 0.1`
- `boxes = ceil(total × 1.1 / m²perBox)`; `You will need = total × 1.1` m²
- Values formatted with thousands separators + 2 decimals (m²), integer boxes.

## Test URLs
See `config.json` — porcelain floor tile, ceramic wall tile, and a wall-and-floor tile
(covers Floor-only, Wall-only, and both).

## QA coverage
Built against the full CRO-12357 QA thread (29 bugs + Rafee's follow-ups). All addressed and
Playwright-verified across desktop + iPhone-SE:
- Independent Floor/Wall lists, per-zone Area 1 + numbering, values retained (#14,15,16,19,20).
- Labels only on Area 1 (#35); `0.00m²` no space, same in both zones (#10,34).
- Separate summary sheet that never shrinks the main popup (#17,21); summary colour #404040 (#18);
  one divider under "Summary:" (#26).
- How-to resets per zone switch and per reopen (#22,36).
- Full-screen mobile sheet, no page behind (#1,13); high z-index over chat/promo (#23,28,33).
- Add Area weight 400 (#7); Floor active border #6D6D6D (#9); 8px gap between cards (#27);
  toggle has no transition so no flash/overlap (#11,12); labels stay on one line (#25).

## Notes
- Summary "Area measured" sums all cards across both zones (hidden cards count, matching native) —
  flag if per-zone totals are ever required instead.
- Room diagram loads from CTM's own static image (same-origin on the live PDP).
