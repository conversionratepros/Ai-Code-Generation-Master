# AB Test | Mobile Nav | Bottom navigation bar | MOBILE | CRO-12435

Design: https://design.conversionratepros.co.za/arc/homepage/mobile-bottom-nav/

## Summary of Changes

- Add a fixed bottom navigation bar to the bottom of the screen on mobile.
- Fill the bar with five items: Home, Categories, Search, Brands, and Bag.
- Reveal a search bar directly above the bottom navigation bar when the shopper taps Search.

## UX/UI

Note: The current search bar icon should continue to display.

### Bottom navigation bar

- Add a fixed bottom navigation bar pinned to the bottom of the screen on mobile, shown on every page and staying in place while the shopper scrolls.
- Display five items in the bar, evenly spaced from left to right, each shown as an icon with its label directly beneath it, in this order: Home, Categories, Search, Brands, Bag.
- Highlight the one item that matches the shopper's current context as the active item, so it stands out from the other four (for example, Home is highlighted on the homepage, and Search is highlighted while the search bar is open).
- Display the Home item with a house icon and the label "Home". When a shopper taps Home, take them to the homepage.
- Display the Categories item with a grid icon and the label "Categories". When a shopper taps Categories, open the site's existing menu (the same menu the header hamburger button opens).
- Display the Search item with a magnifying-glass icon and the label "Search". When a shopper taps Search, reveal the search bar directly above the bottom navigation bar and mark the Search item as active.
- Display the Brands item with a tag icon and the label "Brands". When a shopper taps Brands, take them to the Brands page.
- Display the Bag item with a bag icon and the label "Bag". When a shopper taps Bag, take them to the cart.

### Search bar

- Display the search bar as a single row sitting directly above the bottom navigation bar.
- Show a text input with the placeholder "Search for a brand or product".
- Show a "Search" button to the right of the input.
- When a shopper taps into the input and begins typing, display the site's existing search suggestions list.
- Show the suggestions list filling the bottom 75% of the screen, anchored to the bottom of the screen and sitting above the search bar.
- Populate the list with the site's current search suggestions for what the shopper has typed.
- Display a close "X" icon in the top right corner of the suggestions list. When a shopper taps the close "X" icon, remove the suggestions list.
- Dismiss the search bar when the shopper taps anywhere outside the search input, or taps the Search item in the bottom navigation bar again.
- When the search bar is dismissed, hide both the search bar and any open suggestions list, and remove the active highlight from the Search item.

## Logic & Rules

- Show the bottom navigation bar at mobile widths only. Do not display it on desktop.
- Display the bottom navigation bar across all pages of the site, since it is a site-wide element and not specific to the homepage.
- Keep the existing top header, hamburger menu, on-site search, and cart fully functional. The bottom navigation bar is an additional way to reach these, not a replacement for any of them.
- Make sure the bottom navigation bar sits above the page content and does not cover important content or the existing footer. Add spacing at the bottom of the page if needed so nothing is hidden behind the bar.

## Acceptance Criteria

- A fixed bottom navigation bar appears on mobile on every page and stays in place while the shopper scrolls.
- The bar shows five items in this order: Home, Categories, Search, Brands, Bag, each with an icon and a label.
- Tapping Home takes the shopper to the homepage.
- Tapping Categories opens the site's existing menu.
- Tapping Search reveals a search bar above the bar, with the placeholder "Search for a brand or product" and a "Search" button, and marks the Search item as active.
- Typing in the input displays the site's existing search suggestions list, filling the bottom 75% of the screen, anchored to the bottom and above the search bar.
- The suggestions list shows a close "X" icon in its top right corner, and tapping it removes the suggestions list.
- Tapping outside the search input, or tapping Search again, hides the search bar and any open suggestions list and clears the Search active highlight.
- Tapping Brands takes the shopper to the Brands page.
- Tapping Bag takes the shopper to the cart.
- The item matching the shopper's current context is highlighted as the active item.
- The bottom navigation bar does not appear on desktop.
- The existing top header, hamburger menu, on-site search, and cart all remain fully functional.

## Implementation Notes (build)

- `body` gets class `cro-12435`; all layout CSS lives in a `max-width: 1023px` media query, so nothing renders on desktop.
- Bottom nav is injected at the end of `body` (60px bar, active colour `#ab2454`). Home/Categories/Search/Brands use the design's inline SVGs (the site's Font Awesome build doesn't use `fa-home`/`fa-th-large`/`fa-tags`, so those glyphs are unverified); Bag keeps `fal fa-shopping-basket` to match the header cart icon.
- `.typeahead-mobile` is relocated to be a direct child of `body` so its z-index competes at root level instead of being capped by `#Top`'s `z-index:90` stacking context. That breaks the native `:checked ~` sibling toggle, so open/close runs on the `cro-12435-search-open` class, driven by a change listener on `#MobileSearchTrigger`. Side effect (accepted): the header search icon now also opens the bottom search bar.
- The native `.search-button-override` span is restyled as the "Search" button; it has no native click handler, so `submitSearch()` navigates to `/products?Search=<query>` (same URL as the typeahead's "See all results").
- Suggestions render into the native `#MobileProductSearchBarContent`, repositioned to fill the bottom 75% of the screen (top edge at 25vh, anchored above the 133px search-bar + nav stack). A MutationObserver toggles the close "X"; the X removes only the list (input keeps its value), full dismissal also clears the input.
- Outside-tap dismissal has a guard for the label→checkbox forwarded click that would otherwise instantly re-close the bar.
- A `visualViewport` pin translates the bar/search/suggestions during iOS address-bar collapse so they stay glued to the visible bottom edge.
- Categories toggles the menu via the native hamburger label; active state syncs from both checkboxes (`#MobileSearchTrigger`, `#MobileNavTrigger`) and the URL (`/` → Home, `/brands*` → Brands, cart → Bag). Home taps on the homepage scroll to top.
- Footer clearance comes from `padding-bottom` on `body` (not `main` — the footer sits after `</main>`, so padding there would leave it covered by the bar).
- Per the note in the story, the existing header search icon is NOT hidden (the design mock removed it; the story overrides that).
