# Tile Calculator | Rory open-state redesign | ALL | CRO-12357

## Background

The tile calculator that opens when a shopper clicks the tile calculator button on a tile product page is being redesigned in its open state, and some functionality is being added. By giving the open calculator a clearer layout, a title, a floor or wall choice, and a clearer way to add multiple areas, we make it easier for shoppers to work out how many boxes they need, which may increase the add to cart rate.

## Summary of Changes

- The open tile calculator is being given a new title, intro text, and layout.
- A Floor and Wall selector is being added.
- The way shoppers add and remove areas is being clarified.
- The existing "How to measure" dropdown and box calculation behaviour are being kept.

## UX/UI Requirements

- Display a header bar at the top of the open calculator, with the heading "Tile Calculator" on the left and a close (X) icon on the right.
- Close the calculator when the close (X) icon is clicked, or when the shopper clicks anywhere outside the calculator.
- Display the intro text below the header: "Enter the width and length of your area in meters to calculate the quantity needed."
- Display a Floor button and a Wall button below the intro text:
  - Both buttons side by side when the tile can be used on both floors and walls.
  - Only the Floor button, full width, for floor-only tiles.
  - Only the Wall button, full width, for wall-only tiles.
  - Selected button = filled style; unselected = outlined style.
- Keep the existing "How to measure" dropdown below the Floor/Wall buttons (expand/collapse on click, same image).
- Display an area card for each area, numbered "Area 1", "Area 2", … in order:
  - Width field + length field, each with an "m" unit marker inside.
  - Label "Width in meters" above the width field.
  - Second label "Length in meters" when Floor is selected, "Height in meters" when Wall is selected.
  - "Total area:" followed by the square meter value, updating automatically.
  - Delete (bin) icon on every card except "Area 1"; clicking it removes the card and its values.
- "Add Area" button below the cards — keeps the current behaviour, adds a new empty card at the bottom.
- Footer text "Swipe up to view full Calculation Summary" below "Add Area"; swipe up reveals the full summary (replicated on desktop).
- Green "Add to cart" button at the bottom: "Add {n} boxes to cart", count updating natively.
- Helper text below the button: "Click 'Add to Cart' to view your quote | order".
- Desktop layout matches the mobile design at a wider width.

## Wall/Floor button filtering

If both buttons exist on the pop-up, each area card belongs to the button that was selected when it was added:

- If Wall is selected and the user adds a card, that card only displays while "Wall" is active.
- If Floor is selected and the user adds a card, that card only displays while "Floor" is active.
- This must not impact the existing calculations on the page (hidden cards still count toward the native totals).

Scenario: the user opens the pop-up on a floor+wall tile, clicks Wall, adds an entry (visible only under Wall), clicks Floor, adds another entry (visible only under Floor), and can switch between the entries using the buttons.

## Implementation notes

- Floor/wall availability is detected from the product heading text (`h1.page-title .base`): "floor" → Floor only, "wall" → Wall only, both/neither → both buttons.
- The native calculator markup exists twice (desktop + mobile modal instances); both are decorated.
- The native calculation, Add Area, How-to-measure, and modal open/close logic are untouched — the variation only restyles and injects small elements (toggle, card headers, bin icons, unit markers, chevron).
- Empty cards are re-tagged to the newly selected zone on toggle so the shopper never faces a blank list.
- Deleting a card removes it from the DOM and dispatches input/change/keyup on a remaining field so the native totals recalculate.
- The CTA reuses the native hidden "Add X boxes to my Cart" span (reworded to "boxes to cart") so the count keeps updating natively; mosaic products (sheets wording) are left untouched.
