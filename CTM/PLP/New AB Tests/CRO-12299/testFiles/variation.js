(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro12299";

        /* ── Variant switch ──────────────────────────────────────────────
           1 = Variant 1 (PRIMARY): single row, horizontal scroll, chips
               never wrap, last visible chip can sit partially cut off to
               hint scrollability. This matches the Figma "Default state"
               frame (node 2:41) exactly — the 8 chips' combined width
               already exceeds a 390px mobile viewport, so the cut-off
               happens naturally from the content, no extra CSS trick
               needed.
           2 = Variant 2: two rows, filters wrap instead of scrolling.
               Same JS, same chip set/order/logic — only the CSS layout
               changes (see variation.css, rules scoped under
               `.cro12299-v2`). To switch the live variant, change the
               value below to 2. No other file needs editing.
        ------------------------------------------------------------------ */
        var CRO12299_VARIANT = 1;

        function waitForElement(selector, trigger) {
            var interval = setInterval(function () {
                if (
                    document &&
                    document.querySelector(selector) &&
                    document.querySelectorAll(selector).length > 0
                ) {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(function () {
                clearInterval(interval);
            }, 15000);
        }

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        }

        /* ── Quick-Filter Chip Row helpers ── */

        /* Sliders icon exported from Figma (node 2:66, "All filters" chip icon) */
        var ICON_SLIDERS = '<svg viewBox="0 0 12.25 12.25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.10417 2.55208H1.53125" stroke="#333333" stroke-width="1.02083" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.125 9.69792H1.53125" stroke="#333333" stroke-width="1.02083" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.14583 1.53125V3.57292" stroke="#333333" stroke-width="1.02083" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.16667 8.67708V10.7187" stroke="#333333" stroke-width="1.02083" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.7188 6.125H6.125" stroke="#333333" stroke-width="1.02083" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.7188 9.69792H8.16667" stroke="#333333" stroke-width="1.02083" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.7188 2.55208H7.14583" stroke="#333333" stroke-width="1.02083" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.08333 5.10417V7.14583" stroke="#333333" stroke-width="1.02083" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.08333 6.125H1.53125" stroke="#333333" stroke-width="1.02083" stroke-linecap="round" stroke-linejoin="round"/></svg>';

        /* Small cross icon for the "Clear all" chip — built to match the
           sliders icon's stroke style (round caps, same weight) since
           Figma did not supply a Clear-all frame for this test. */
        var ICON_CROSS = '<svg viewBox="0 0 12.25 12.25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 2.75L2.75 9.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.75 2.75L9.5 9.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

        /* Attribute option IDs are global per Magento EAV attribute — they
           do not change between category pages, only the SEO-URL slug in
           each option's href does. Sourced from CTM/PLP/control-mobile.html
           and control-desktop.html ("Tiles By Room" category filter block).
           requestVar = Amasty's data-amshopby-filter-request-var on the
           <form> wrapping that attribute's option list; value = the option
           id on that option's <input>. optionLabel = the exact data-label
           on the <li> (used to locate the element); displayLabel = what
           the chip shows (differs for Glossy, per spec). */
        var CRO12299_CHIPS = [
            { id: 'grey', type: 'colour', requestVar: 'color', value: '19', optionLabel: 'Grey', displayLabel: 'Grey', swatch: '#808080' },
            { id: 'white', type: 'colour', requestVar: 'color', value: '33', optionLabel: 'White', displayLabel: 'White', swatch: '#F5F5F5' },
            { id: 'beige', type: 'colour', requestVar: 'color', value: '22', optionLabel: 'Beige', displayLabel: 'Beige', swatch: '#F5F5DC' },
            { id: 'large', type: 'size', requestVar: 'tile_size_filter', value: '747', optionLabel: 'Large', displayLabel: 'Large' },
            { id: 'medium', type: 'size', requestVar: 'tile_size_filter', value: '748', optionLabel: 'Medium', displayLabel: 'Medium' },
            { id: 'matt', type: 'finish', requestVar: 'finish', value: '75', optionLabel: 'Matt', displayLabel: 'Matt' },
            /* Applies the real "Glossy / Shiny" filter value but the chip
               only ever DISPLAYS the word "Glossy" per spec. */
            { id: 'glossy', type: 'finish', requestVar: 'finish', value: '35', optionLabel: 'Glossy / Shiny', displayLabel: 'Glossy' }
        ];

        /* Paths that share the tile PLP template but are not tile listings
           (adhesive/grout/tools/etc.) — same exclusion approach as
           CRO-12302. Kept as a belt-and-braces guard; the primary page-type
           signal is isTileCategoryPage() actually finding our filter
           groups in the live Amasty DOM (see below). */
        var NON_TILE_PATH_PATTERN = /essentials|adhesive|grout|spacer|underfloor|tools|accessor/i;

        /* ── Locate an Amasty filter option in the live (existing) filter
           sheet DOM. Returns { li, input, anchor } or null. We re-query
           every time we need it (never cache) because Amasty may re-render
           #narrow-by-list after an AJAX filter apply. ── */
        function findFilterOption(cfg) {
            var form = document.querySelector('#narrow-by-list form[data-amshopby-filter-request-var="' + cfg.requestVar + '"]');
            if (!form) return null;
            var li = form.querySelector('li.item[data-label="' + cfg.optionLabel + '"]');
            if (!li) return null;
            var input = li.querySelector('input[value="' + cfg.value + '"]');
            var anchor = li.querySelector('a[data-am-js="filter-item-default"]');
            if (!input || !anchor) return null;
            return { li: li, input: input, anchor: anchor };
        }

        /* Multi-signal "is this option currently applied" check. Amasty's
           standard behaviour is to render `checked` on the <input> when an
           option is active; some themes also add a modifier class to the
           parent <li>. We check both so this keeps working even if one
           signal doesn't match this theme exactly (flagged for QA in the
           test README). */
        function isOptionActive(opt) {
            if (!opt) return false;
            if (opt.input.checked || opt.input.hasAttribute('checked')) return true;
            if (/checked|active|selected/i.test(opt.li.className)) return true;
            return false;
        }

        /* Only inject on genuine tile category PLPs. We treat the presence
           of our own target filter groups in the real Amasty sheet as the
           primary signal (a page without a Tile Size / Colour / Finish
           filter group is not a tile listing), backed up by a pathname
           exclusion list matching the CRO-12302 precedent. */
        function isTileCategoryPage() {
            if (!document.querySelector('.page-with-filter')) return false;
            if (NON_TILE_PATH_PATTERN.test(location.pathname)) return false;
            var hasAnyGroup = CRO12299_CHIPS.some(function (cfg) {
                return !!document.querySelector('#narrow-by-list form[data-amshopby-filter-request-var="' + cfg.requestVar + '"]');
            });
            return hasAnyGroup;
        }

        /* ── Build one chip's HTML ── */
        function buildChipHtml(cfg, selected) {
            var swatchHtml = cfg.swatch
                ? '<span class="cro12299-swatch" style="background:' + cfg.swatch + '"></span>'
                : '';
            return (
                '<button type="button" class="cro12299-chip' + (selected ? ' cro12299-chip--selected' : '') + '" data-cro12299-chip="' + cfg.id + '">' +
                swatchHtml +
                '<span class="cro12299-chip-label">' + cfg.displayLabel + '</span>' +
                '</button>'
            );
        }

        /* ── Build + wire the whole row from current DOM state ── */
        function renderChipRow() {
            /* Confirmed via Playwright: Amasty's AJAX filter transition
               doesn't just replace #narrow-by-list/.page-title-wrapper, it
               overwrites document.body.className wholesale — silently
               stripping the "cro12299" class we add in init(). Since every
               rule in variation.css is scoped under body.cro12299, losing
               that class means the row (even if re-inserted) renders
               invisible/unstyled. Re-assert it on every render pass so a
               body-class reset never permanently kills the test. */
            addClass('body', variation_name);
            if (CRO12299_VARIANT === 2) addClass('body', variation_name + '-v2');

            if (!isTileCategoryPage()) return;

            var existing = document.querySelector('.cro12299-chip-row');

            var chipsHtml = '';
            var anyActive = false;
            var visibleConfigs = [];

            CRO12299_CHIPS.forEach(function (cfg) {
                var opt = findFilterOption(cfg);
                /* Never show a chip whose filter group/value isn't actually
                   offered on this page — avoids ever producing an empty result. */
                if (!opt) return;
                visibleConfigs.push(cfg);
                var selected = isOptionActive(opt);
                if (selected) anyActive = true;
                chipsHtml += buildChipHtml(cfg, selected);
            });

            /* Nothing to show besides "All filters"? Still show the row —
               "All filters" always shows regardless of page per spec.
               The real "Clear All" control is NOT inside .filter-current —
               confirmed via Playwright: <a class="action clear filter-clear">
               lives elsewhere in the filter sheet DOM. */
            var clearAllAnchor = anyActive ? document.querySelector('a.action.clear.filter-clear') : null;
            var clearAllHtml = clearAllAnchor
                ? '<button type="button" class="cro12299-chip cro12299-chip--clear" data-cro12299-clear="1"><span class="cro12299-chip-label">Clear all</span> ' + ICON_CROSS + '</button>'
                : '';

            var allFiltersHtml = '<button type="button" class="cro12299-chip cro12299-chip--all" data-cro12299-all="1">' + ICON_SLIDERS + '<span class="cro12299-chip-label">All filters</span></button>';

            var rowHtml =
                '<div class="cro12299-chip-row"><div class="cro12299-chip-track">' +
                clearAllHtml + chipsHtml + allFiltersHtml +
                '</div></div>';

            if (existing) {
                existing.outerHTML = rowHtml;
            } else {
                var titleEl = document.querySelector('.page-title-wrapper');
                if (!titleEl) return;
                titleEl.insertAdjacentHTML('afterend', rowHtml);
            }

            bindChipEvents();
        }

        /* ── Events — bound fresh after every render since we rebuild the
           row's innerHTML each time (simplest way to stay correct; the row
           is tiny so a full rebuild is cheap). ── */
        function bindChipEvents() {
            var row = document.querySelector('.cro12299-chip-row');
            if (!row) return;

            row.querySelectorAll('[data-cro12299-chip]').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var cfg = CRO12299_CHIPS.filter(function (c) { return c.id === btn.getAttribute('data-cro12299-chip'); })[0];
                    if (!cfg) return;
                    var opt = findFilterOption(cfg);
                    if (!opt) return;
                    /* Click Amasty's own anchor for this exact option. Amasty
                       computes this href contextually (adds the filter if not
                       yet active, removes it if already active), and whatever
                       JS is bound to it (full navigation or AJAX + pushState)
                       runs exactly as if the shopper had used the sheet
                       itself — same sort order / page-1 reset, no separate
                       logic needed here. */
                    opt.anchor.click();
                });
            });

            var clearBtn = row.querySelector('[data-cro12299-clear]');
            if (clearBtn) {
                clearBtn.addEventListener('click', function () {
                    var clearAnchor = document.querySelector('a.action.clear.filter-clear');
                    if (clearAnchor) clearAnchor.click();
                });
            }

            var allBtn = row.querySelector('[data-cro12299-all]');
            if (allBtn) {
                allBtn.addEventListener('click', function () {
                    /* Same trigger element the existing sticky bottom
                       "Filter By" bar uses — just open the sheet, no reload. */
                    var trigger = document.querySelector('#layered-filter-block .filter-title strong[data-role="title"]');
                    if (trigger) trigger.click();
                });
            }
        }

        /* ── Init ── */
        function init() {
            addClass('body', variation_name);
            if (CRO12299_VARIANT === 2) addClass('body', variation_name + '-v2');

            waitForElement('#narrow-by-list', function () {
                renderChipRow();

                /* Re-sync (full rebuild) whenever Amasty's own filter sheet
                   DOM changes. Filtering here is AJAX + history.pushState,
                   NOT a hard page reload — confirmed via Playwright: clicking
                   a filter option swaps out #narrow-by-list AND every
                   wrapper up through #layered-filter-block for brand-new
                   DOM nodes (not an in-place innerHTML mutation of those
                   nodes themselves). An observer bound to the original
                   #narrow-by-list therefore goes stale the moment the first
                   AJAX filter applies — it's watching a detached node and
                   silently never fires again, which is exactly why the chip
                   row only ever showed the correct selected state after a
                   full manual refresh (a real refresh reruns this whole
                   function against a fresh node).

                   Scope: .page-title-wrapper's parent, .page-wrapper, is a
                   DIRECT CHILD OF <body> and survives every AJAX swap
                   (confirmed by tagging nodes and checking identity after a
                   click — everything from #narrow-by-list up through
                   #layered-filter-block gets replaced, .page-wrapper does
                   not). Observing document.body instead of .page-wrapper
                   was tried first and found to starve the debounce
                   indefinitely on real pageloads: this is a live commercial
                   page with constant background DOM churn from ads/chat
                   widget/analytics scripts appended as OTHER direct
                   children of <body> (siblings of .page-wrapper), so
                   body-subtree mutations never go quiet for a full 200ms —
                   confirmed via Playwright by clicking a 2nd filter (Beige,
                   with Grey already active) and finding the debounce
                   callback simply never fired again. Scoping to
                   .page-wrapper excludes that unrelated sibling noise
                   entirely. A hard max-wait timer is kept as well, as a
                   safety net against any residual churn still inside
                   .page-wrapper — it guarantees a render within 800ms of
                   the first detected change no matter how continuously
                   mutations keep arriving after that. */
                var debounceTimer = null;
                var maxWaitTimer = null;
                var observeScope = document.querySelector('.page-wrapper') || document.body;

                /* #layered-filter-block and #maincontent are direct sibling
                   children of .page-wrapper, and #maincontent runs Amasty's
                   own infinite-scroll module (amscroll) — it appends new
                   product tiles as the shopper scrolls the grid. Those
                   appends are childList mutations inside our observed
                   subtree too, but have nothing to do with the filter sheet;
                   left unfiltered they re-triggered a full chip-row rebuild
                   (outerHTML replace + event re-bind) on every debounce tick
                   while the page was mid-scroll, causing jank that showed up
                   as scrolling feeling blocked. Only resync when a mutation
                   actually touches the filter block. */
                function touchesFilterBlock(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                        var m = mutations[i];
                        var t = m.target;
                        if (t && t.id === 'layered-filter-block') return true;
                        if (t && t.closest && t.closest('#layered-filter-block')) return true;
                        var nodes = [];
                        if (m.addedNodes) nodes = nodes.concat(Array.prototype.slice.call(m.addedNodes));
                        if (m.removedNodes) nodes = nodes.concat(Array.prototype.slice.call(m.removedNodes));
                        for (var j = 0; j < nodes.length; j++) {
                            var n = nodes[j];
                            if (n.nodeType !== 1) continue;
                            if (n.id === 'layered-filter-block') return true;
                            if (n.querySelector && n.querySelector('#layered-filter-block')) return true;
                            if (n.closest && n.closest('#layered-filter-block')) return true;
                        }
                    }
                    return false;
                }

                if (window.MutationObserver) {
                    /* renderChipRow() rebuilds the row via outerHTML, which is
                       itself a scope-subtree mutation — left connected, that
                       would re-trigger this same observer forever. Disconnect
                       around our own write, then reconnect for the next real
                       (Amasty-driven) change. */
                    var observer = new MutationObserver(function (mutations) {
                        if (!touchesFilterBlock(mutations)) return;

                        if (!maxWaitTimer) {
                            maxWaitTimer = setTimeout(runResync, 800);
                        }
                        clearTimeout(debounceTimer);
                        debounceTimer = setTimeout(runResync, 200);
                    });
                    function runResync() {
                        clearTimeout(debounceTimer);
                        clearTimeout(maxWaitTimer);
                        maxWaitTimer = null;
                        observer.disconnect();
                        renderChipRow();
                        observer.observe(observeScope, { childList: true, subtree: true });
                    }
                    observer.observe(observeScope, { childList: true, subtree: true });
                }
            });
        }

        /* Initialise variation */
        waitForElement('.page-with-filter', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();
