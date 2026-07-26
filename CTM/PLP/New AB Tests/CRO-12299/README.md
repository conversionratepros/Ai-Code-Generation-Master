# Test Analysis — CRO-12299
## Recipe | PLP Mobile Quick-Filter Chip Row | MOBILE

---

## 1. What the test does

Adds a horizontally-scrollable row of quick-filter chips on mobile tile-category
PLPs, directly below the page title (e.g. "All Floor Tiles") and above the
product grid:

`[Clear all]` (only when ≥1 chip active) → `Grey` → `White` → `Beige` → `Large`
→ `Medium` → `Matt` → `Glossy` → `All filters` (always last, always visible).

Tapping a filter chip applies/removes that filter using the site's own
existing Amasty Shopby filter sheet — not a re-implementation of it. Tapping
"All filters" opens the existing slide-out sheet without reloading. The
existing sticky bottom "Filter By / Best Selling" bar and the sheet itself are
untouched.

---

## 2. Variants

Both variants share 100% of the same JS (chip discovery, selection state,
click handling) — only the CSS layout of `.cro12299-chip-track` differs.

| | Variant 1 (PRIMARY) | Variant 2 |
|---|---|---|
| Layout | Single row, horizontal scroll | Two rows, wraps |
| Chips wrap? | No — `flex-wrap: nowrap` + `overflow-x: auto` | Yes — `flex-wrap: wrap` |
| Scroll hint | Last chip can sit partially cut off at the edge (happens naturally — the 8 chips' combined width already exceeds a 390px viewport, per the Figma "Default state" frame) | N/A |

**To switch which variant is live:** open `testFiles/variation.js` and change
one line near the top:

```js
var CRO12299_VARIANT = 1; // 1 = Variant 1 (single row, scroll). 2 = Variant 2 (two rows, wrap).
```

Setting it to `2` adds an extra `cro12299-v2` class to `<body>`, which is all
`testFiles/variation.css` needs to switch layout.

The Figma file's default node (`2:2`) only contains a single frame ("Default
state") showing Variant 1's layout — no Variant 2 frame was supplied, so
Variant 2's wrap behaviour is still built from the written spec rather than a
Figma reference. **Flag for design sign-off in QA** (only remaining open
design item — see §10).

---

## 3. Amasty selectors & filter-application mechanism

**Source:** `CTM/PLP/control-mobile.html` / `control-desktop.html` for the
static markup, plus **live Playwright debugging against the real site**
(`www.ctm.co.za` returns HTTP 403 to plain `curl`/`fetch` — Cloudflare bot
protection — but loads fine in a real browser engine, so all of the below was
confirmed by actually clicking chips on the live page with Playwright, not by
reading static HTML).

The filter sheet (`#layered-filter-block` → `#narrow-by-list`) renders one
`<form data-amshopby-filter-request-var="X">` per filter group, each
containing an `<ol>` of:

```html
<li class="item" data-label="Grey">
    <input name="amshopby[color][]" value="19" type="checkbox" checked>
    <span class="checkmark"></span>
    <a class="am-filter-item-xxxxx amshopby-link-selected" data-am-js="filter-item-default"
       href="https://www.ctm.co.za/..." rel="nofollow">
        <span class="label">Grey</span>
    </a>
</li>
```

**Chip → filter mechanism:** for each chip we look up its real `<li>` /
`<input>` / `<a>` in the *existing* (visually off-screen/collapsed) filter
sheet DOM by `data-amshopby-filter-request-var` (the attribute code, e.g.
`color`, `tile_size_filter`, `finish` — global per attribute, doesn't change
per category) + the option's `value` (the EAV option id, also global — e.g.
Grey is always `19`). We never build or copy a URL ourselves — on tap we call
`anchorEl.click()` on Amasty's own anchor.

Confirmed live: **filtering here is AJAX + `history.pushState`, not a hard
page reload** — the URL changes (e.g. `?color=19`, then `?color=22,19` after
a second colour is added) and the product grid/filter sheet re-render in
place. This is exactly why our re-sync logic in §7 exists, and it's what
guarantees byte-identical results/sort-order/pagination without any separate
handling — it's Amasty's own code path running exactly as if the shopper had
tapped the sheet.

**Option IDs used:**

| Chip | requestVar | option value | li `data-label` |
|---|---|---|---|
| Grey | `color` | `19` | `Grey` |
| White | `color` | `33` | `White` |
| Beige | `color` | `22` | `Beige` |
| Large | `tile_size_filter` | `747` | `Large` |
| Medium | `tile_size_filter` | `748` | `Medium` |
| Matt | `finish` | `75` | `Matt` |
| Glossy (displays "Glossy" only) | `finish` | `35` | `Glossy / Shiny` |

**"All filters" chip:** clicks the same trigger element the existing sticky
bottom "Filter By" bar uses:
```js
document.querySelector('#layered-filter-block .filter-title strong[data-role="title"]').click();
```
This does not navigate/reload — it only opens the sheet.

**"Clear all" chip — confirmed live, corrected from the original build:**
```js
document.querySelector('a.action.clear.filter-clear').click();
```
The original guess (`.filter-current .action.clear`) was **wrong** — that
element is not inside `.filter-current` (which only ever contains per-item
`a.amshopby-remove` links plus an always-empty `<li class="amshopby-button-wrap">`).
Found by searching the live DOM for the actual rendered "Clear All" text.

Also confirmed: unlike individual filter chips, **clicking "Clear All"
triggers a genuine hard page reload**, not AJAX — the site's own scripts
(GTM init, other live AB tests on this page) re-fire their startup logs from
scratch. This is transparent in a real deployment (Tampermonkey/Convert.com
re-injects the variation script on every navigation, hard or soft) — it only
needs special handling if you're debugging locally with a bare Playwright
script that injects just once (re-inject on `page.on('framenavigated', ...)`
in that case).

**Reading current filter state — confirmed live:** `input.checked` is
reliable and updates immediately, even mid-AJAX before the URL/pushState
settles. (`hasAttribute('checked')` / `checked|active|selected` li-class
checks are kept as defensive fallback signals but weren't needed in
practice.)

---

## 4. Page-type detection (tile category PLPs only)

`isTileCategoryPage()` in `variation.js` requires ALL of:
1. `.page-with-filter` exists on the page (confirms it's a Magento PLP shell —
   same signal CRO-12301 uses).
2. `location.pathname` does **not** match `/essentials|adhesive|grout|spacer|underfloor|tools|accessor/i`
   (same style of exclusion CRO-12302 uses for non-tile PLPs sharing this
   template).
3. At least one of our 3 target filter groups (`color`, `tile_size_filter`,
   `finish`) actually exists in `#narrow-by-list` on this page — i.e. the
   real, live Amasty filter data is the primary signal, not a guessed
   pathname list.

---

## 5. Empty-chip hiding logic

`findFilterOption(cfg)` looks the option up live by `requestVar` +
`data-label`; if the `<form>`, `<li>`, `<input>`, or `<a>` isn't found,
`renderChipRow()` simply skips that chip. This runs on every render (initial
load + every resync), so if the shopper navigates between categories that
offer different option subsets, the chip set updates accordingly.

The "Clear all" chip uses the same never-show-if-not-found approach: only
rendered when ≥1 chip-tracked filter is currently active **and**
`a.action.clear.filter-clear` is actually present in the DOM.

---

## 6. Selected-state styling — confirmed via Figma "Active state" frame

The original build guessed `#333` for the selected fill since only a
"Default state" Figma frame existed at the time. An "Active state" frame
(node `2:1360`) was supplied later and sampled directly for exact colours:

- Selected chip fill: **`#161616`** (CTM's "Cod Gray" token — not `#333`,
  which is the *unselected* chip text colour). Text/icon → `#fff`, bold.
- Colour-chip swatches stay visible at full colour inside the dark fill.
- **"Clear all" chip:** white fill, `#ED1C24` (CTM brand red — same token
  used sitewide, e.g. the promo bar/SALE badge) border + bold red text + red
  X icon. Not a dark/inverted chip like the filter chips.

---

## 7. Init / re-sync sequence

```
waitForElement('.page-with-filter', init)
  └─ init()
       ├─ addClass('body', 'cro12299')                 ← scopes all CSS
       ├─ addClass('body', 'cro12299-v2')               ← only if CRO12299_VARIANT === 2
       ├─ waitForElement('#narrow-by-list', renderChipRow)
       └─ MutationObserver on .page-wrapper              ← re-syncs chip
            (debounced 200ms, hard-capped at 800ms)         state after any
            → renderChipRow()                              Amasty AJAX
                                                             re-render
```

`renderChipRow()` re-asserts `body.cro12299` (and `-v2` if set) on every call,
then does a full, idempotent rebuild (`.cro12299-chip-row`'s `outerHTML`) —
cheap given the row is tiny, and avoids partial-sync bugs.

**Why the observer is scoped to `.page-wrapper`, not `#narrow-by-list` and
not `document.body`** — three real bugs, all found and fixed via Playwright
debugging after initial build/QA:

1. Amasty's AJAX filter-apply replaces `#narrow-by-list` **and every wrapper
   up through `#layered-filter-block`** with brand-new DOM nodes, not an
   in-place mutation. An observer bound to `#narrow-by-list` itself (the
   original implementation) goes stale after the very first filter click —
   it's watching a detached node and never fires again. This was the root
   cause of "selected background only shows after a manual refresh": a real
   refresh reruns `init()` against a fresh node and works fine; the AJAX path
   silently stopped resyncing. `.page-wrapper` (a direct child of `<body>`)
   was confirmed to survive every AJAX swap.
2. Amasty's AJAX transition also overwrites `document.body.className`
   wholesale, silently stripping the `cro12299` class — since every CSS rule
   is scoped under `body.cro12299`, losing it meant the row (even if
   correctly re-inserted) rendered invisible/unstyled. Fixed by re-asserting
   the class inside `renderChipRow()` itself, not just once in `init()`.
3. `document.body` was tried as the observer scope first and found to starve
   the debounce indefinitely on the real page — it has constant background
   DOM churn from ads/chat-widget/analytics scripts appended as *siblings*
   of `.page-wrapper`, so body-subtree mutations never go 200ms quiet once
   the page is "busy." Confirmed by clicking a 2nd filter chip (Beige, with
   Grey already active) and finding the resync simply never fired again over
   several seconds — multi-select silently broke. Scoping to `.page-wrapper`
   excludes that unrelated noise; a hard 800ms max-wait cap was also added
   as a safety net so a resync is guaranteed even under residual churn.

(Full detail + the generalized version of these gotchas — reusable for any
future CTM PLP test that reacts to Amasty filter state — is in
`CTM/client-learnings.md`.)

---

## 8. Files

| File | Purpose |
|---|---|
| `testFiles/variation.js` | All test logic — chip config, page/option detection, render, click handling for both variants |
| `testFiles/variation.css` | All styles scoped to `body.cro12299` (+ `.cro12299-v2` modifier for Variant 2) |
| `config.json` | fecli config — lists both files + the target URL |

---

## 9. Local development / QA

**Live preview (Tampermonkey):**
```bash
cd "CTM/PLP/New AB Tests/CRO-12299"
npx fecli host config.json
# Visit https://localhost:8080, install the Tampermonkey userscript if needed,
# then open the target URL with ?fecli=activate appended.
```

**Debugging filter-state behaviour:** don't use `curl`/`fetch` against
ctm.co.za — it returns HTTP 403 (Cloudflare bot protection). Use Playwright
with a real Chrome engine (mobile emulation, e.g. `devices['iPhone 13']`) —
it loads the site fine and lets you click chips, inspect live DOM state, and
tag/diff node identity across AJAX transitions (this is how all of §3 and §7
were confirmed).

---

## 10. Open items for QA / client sign-off

- Variant 2 (two-row wrap) — not in the supplied Figma file, built from the
  written spec only. Client needs to choose Variant 1 vs Variant 2 per the
  original ticket ("The client is only going to choose one").
- All other selectors, colours, and the AJAX resync behaviour are confirmed
  live as of this build — no other outstanding ambiguities.
