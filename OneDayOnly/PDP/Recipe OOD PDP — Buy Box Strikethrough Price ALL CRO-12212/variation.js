(function () {
    try {
        var VARIATION = 'cro-t-odo-12212';

        var priceObserver = null;
        var backendCache = {};

        function waitForElement(selector, cb) {
            var tries = 0;
            var timer = setInterval(function () {
                if (document.querySelector(selector)) {
                    clearInterval(timer);
                    cb();
                } else if (++tries >= 200) {
                    clearInterval(timer);
                }
            }, 100);
        }

        function parsePrice(text) {
            if (!text) return null;
            var cleaned = String(text).replace(/[^0-9.,]/g, '').replace(/,/g, '');
            if (!cleaned) return null;
            var value = parseFloat(cleaned);
            return isNaN(value) ? null : value;
        }

        function formatRand(value) {
            var whole = Math.floor(value);
            var cents = Math.round((value - whole) * 100);
            var str = String(whole).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            if (cents > 0) str += '.' + (cents < 10 ? '0' + cents : cents);
            return 'R' + str;
        }

        // Desktop buy box price elements: #product-price h2 + was-price sibling div.
        // The was-price div is absent on non-discounted products — validate it looks like a price.
        function getDesktopPriceEls() {
            var priceEl = document.getElementById('product-price');
            if (!priceEl || !priceEl.parentElement) return null;
            var wasEl = priceEl.nextElementSibling;
            if (
                wasEl &&
                (wasEl.classList.contains('cro-12212-savings') ||
                    !/^R\s?[\d.,\s]+$/.test(wasEl.textContent.trim()))
            ) {
                wasEl = null;
            }
            return { priceEl: priceEl, wasEl: wasEl, row: priceEl.parentElement };
        }

        function buildDesktop() {
            var els = getDesktopPriceEls();
            if (!els) return;
            els.row.setAttribute('cro-12212-price-row', 'desktop');
        }

        // Mobile: the sticky bottom buy bar (grid-area: button) holds price + CTA.
        // Walk up from the ATB button to the PDP grid container (the ancestor whose
        // grid-template-areas contains "carousel") — never rely on generated css-* classes.
        function buildMobile() {
            var btn = document.querySelector('[data-action="add-to-cart"]');
            if (!btn) return;

            var bar = null;
            var grid = null;
            var node = btn;
            while (node && node !== document.body) {
                var parent = node.parentElement;
                if (!parent) break;
                var areas = getComputedStyle(parent).gridTemplateAreas || '';
                if (areas.indexOf('carousel') !== -1) {
                    bar = node;
                    grid = parent;
                    break;
                }
                node = parent;
            }
            if (!grid || !bar) return;

            grid.setAttribute('cro-12212-grid', '');
            bar.setAttribute('cro-12212-buybar', '');

            var oldPrice = bar.querySelector('.hide-for-desktop');
            if (oldPrice) oldPrice.setAttribute('cro-12212-old-price', '');

            var btnWrap = btn.parentElement;
            if (btnWrap && btnWrap !== bar) btnWrap.setAttribute('cro-12212-btn-wrap', '');

            if (!grid.querySelector('.cro-12212-mobile-price')) {
                var block = document.createElement('div');
                block.className = 'cro-12212-mobile-price hide-for-desktop';
                block.innerHTML =
                    '<div class="cro-12212-mobile-row">' +
                    '<h2 class="cro-12212-mobile-now"></h2>' +
                    '<div class="cro-12212-mobile-was"></div>' +
                    '</div>' +
                    '<div class="cro-12212-savings"></div>';
                grid.appendChild(block);
            }
        }

        // Backend product object for the CURRENT page. window.__NEXT_DATA__ is a
        // page-load snapshot and goes stale on client-side navigation, so only trust
        // it when product.id matches the URL slug; otherwise fetch this PDP's HTML
        // once and parse its __NEXT_DATA__ (no /_next/data JSON route — the CDN
        // rewrites it to HTML). Returns null while a fetch is pending or failed.
        function getBackendProduct() {
            var m = location.pathname.match(/\/products\/([^\/?#]+)/);
            var slug = m && m[1];
            if (!slug) return null;

            try {
                var nd = window.__NEXT_DATA__;
                var p = nd && nd.props && nd.props.pageProps && nd.props.pageProps.product;
                if (p && p.id === slug) return p;
            } catch (e) { }

            var cached = backendCache[slug];
            if (cached && cached !== 'pending' && cached !== 'failed') return cached;
            if (!cached) {
                backendCache[slug] = 'pending';
                fetch(location.href, { credentials: 'same-origin' })
                    .then(function (r) { return r.text(); })
                    .then(function (html) {
                        var match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
                        var fresh = match ? JSON.parse(match[1]).props.pageProps.product : null;
                        if (fresh && fresh.id === slug) {
                            backendCache[slug] = fresh;
                            updateDisplay();
                        } else {
                            backendCache[slug] = 'failed';
                        }
                    })
                    .catch(function () { backendCache[slug] = 'failed'; });
            }
            return null;
        }

        // Prices come from the desktop buy box DOM (React keeps them updated at every
        // viewport). The savings line comes from the backend saving object in
        // __NEXT_DATA__ (client-requested, 2026-07-09) — note saving.fixed is
        // percent-derived and rounded, so it can differ from exact retail − price
        // by a rand or two (R2,100 vs R2,101 on the spec product); accepted.
        // Exact DOM math is only the fallback while backend data is unavailable.
        function updateDisplay() {
            var els = getDesktopPriceEls();
            if (!els) return;

            var nowText = els.priceEl.textContent.trim();
            var wasText = els.wasEl ? els.wasEl.textContent.trim() : '';

            var savings = '';
            var product = getBackendProduct();
            if (product) {
                if (product.saving && product.saving.fixed && product.saving.fixed.formattedValue) {
                    var retail =
                        product.retailPrice && product.retailPrice.formattedValue
                            ? product.retailPrice.formattedValue
                            : wasText;
                    savings = 'Retail ' + retail + ' — You save ' + product.saving.fixed.formattedValue;
                }
            } else {
                var now = parsePrice(nowText);
                var was = parsePrice(wasText);
                if (now !== null && was !== null && was > now) {
                    savings = 'Retail ' + formatRand(was) + ' — You save ' + formatRand(was - now);
                }
            }

            // Desktop savings line lives inside the (now flex) price row
            var dSav = els.row.querySelector('.cro-12212-savings');
            if (savings) {
                if (!dSav) {
                    dSav = document.createElement('div');
                    dSav.className = 'cro-12212-savings';
                    els.row.appendChild(dSav);
                }
                if (dSav.textContent !== savings) dSav.textContent = savings;
            } else if (dSav && dSav.parentNode) {
                dSav.parentNode.removeChild(dSav);
            }

            // Mobile injected block mirrors the desktop values
            var block = document.querySelector('.cro-12212-mobile-price');
            if (!block) return;
            var mNow = block.querySelector('.cro-12212-mobile-now');
            var mWas = block.querySelector('.cro-12212-mobile-was');
            var mSav = block.querySelector('.cro-12212-savings');

            if (mNow && mNow.textContent !== nowText) mNow.textContent = nowText;
            if (mWas) {
                mWas.style.display = wasText ? '' : 'none';
                if (wasText && mWas.textContent !== wasText) mWas.textContent = wasText;
            }
            if (mSav) {
                mSav.style.display = savings ? '' : 'none';
                if (savings && mSav.textContent !== savings) mSav.textContent = savings;
            }
        }

        // Variant selection re-renders prices; React may also wipe injected nodes.
        // Observe stable parents, debounce, and re-build idempotently.
        function watchChanges() {
            if (priceObserver) priceObserver.disconnect();

            var els = getDesktopPriceEls();
            var grid = document.querySelector('[cro-12212-grid]');
            var debounceTimer = null;

            priceObserver = new MutationObserver(function () {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(function () {
                    buildDesktop();
                    buildMobile();
                    updateDisplay();
                }, 150);
            });

            if (els) priceObserver.observe(els.row, { childList: true, subtree: true, characterData: true });
            if (grid) priceObserver.observe(grid, { childList: true });
        }

        function init() {
            buildDesktop();
            buildMobile();
            updateDisplay();
            document.body.classList.add(VARIATION);
            watchChanges();
        }

        if (!window.cro_12212) {
            window.cro_12212 = true;

            waitForElement('#product-price', function () {
                waitForElement('[data-action="add-to-cart"]', init);
            });

        }
    } catch (e) { }
})();