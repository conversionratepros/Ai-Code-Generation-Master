(function () {
    try {
        var debug = 0;
        var variation_name = 'cro12302';

        function waitForElement(selector, trigger) {
            var interval = setInterval(function () {
                if (document && document.querySelector(selector) && document.querySelectorAll(selector).length > 0) {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(function () { clearInterval(interval); }, 15000);
        }

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) el.classList.add(cls);
        }

        var ICON_CHEVRON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.5264 25.6514" fill="none"><path d="M1.1748 1.14648C2.00492 0.280665 3.4164 0.284992 4.24023 1.16016L14.3662 11.2852H14.3652C15.2463 12.1134 15.2459 13.5367 14.3652 14.3652L4.24121 24.4912L4.24023 24.4902C3.41631 25.3661 2.00502 25.3704 1.1748 24.5039C1.16514 24.495 1.15594 24.4856 1.14648 24.4766V24.4756C0.276198 23.6407 0.284765 22.2181 1.1748 21.3965L9.71973 12.8008L1.16016 4.24121V4.24023C0.284992 3.4164 0.280665 2.00492 1.14648 1.1748C1.15101 1.1699 1.15559 1.16501 1.16016 1.16016C1.16501 1.15559 1.1699 1.15101 1.1748 1.14648Z" fill="white" stroke="black" stroke-width="0.75"/></svg>';

        /* ── Single GraphQL request for all PLP products ── */

        function fetchAllGalleries(cards, callback) {
            var skuMap = {};

            cards.forEach(function (card) {
                var wishlist = card.querySelector('[data-role="add-to-links"]');
                var link = card.querySelector('a.product-item-link');
                if (wishlist && wishlist.id && link) {
                    skuMap[wishlist.id] = { card: card, pdpUrl: link.href };
                }
            });

            var skus = Object.keys(skuMap);
            if (!skus.length) { callback({}); return; }

            var query = '{ products(filter: { sku: { in: ' + JSON.stringify(skus) + ' } }, pageSize: 50) { items { sku media_gallery { url position } } } }';

            fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Store': 'ZA' },
                body: JSON.stringify({ query: query })
            })
            .then(function (r) { return r.json(); })
            .then(function (data) {
                var items = (data && data.data && data.data.products && data.data.products.items) || [];
                var results = {};

                items.forEach(function (item) {
                    var entry = skuMap[item.sku];
                    if (!entry || !item.media_gallery || item.media_gallery.length < 2) return;

                    // media_gallery is NOT returned in merchant-configured order, so sort
                    // by position first (position 0 is treated as the existing PLP image).
                    var gallery = item.media_gallery.slice().sort(function (a, b) {
                        return a.position - b.position;
                    });

                    results[item.sku] = {
                        card: entry.card,
                        pdpUrl: entry.pdpUrl,
                        img2: gallery[1].url + '&width=700'
                    };
                });

                if (debug) console.log('[CRO12302] GraphQL:', items.length, 'products,', Object.keys(results).length, 'eligible (2+ images)');
                callback(results);
            })
            .catch(function (err) {
                if (debug) console.warn('[CRO12302] GraphQL error:', err);
                callback({});
            });
        }

        /* ── Build slider for one card ── */

        function buildSlider(card, pdpUrl, img2) {
            var wrapper = card.querySelector('.product-photo-actions-wrapper');
            var actionsEl = card.querySelector('.product-photo-actions');
            if (!wrapper || !actionsEl || wrapper.classList.contains('cro12302-init')) return;
            wrapper.classList.add('cro12302-init');

            // Tag existing slide
            var slide1 = wrapper.querySelector('a');
            if (slide1) slide1.classList.add('cro12302-slide', 'cro12302-slide--1');

            // Slide 2
            wrapper.insertAdjacentHTML('beforeend',
                '<a href="' + pdpUrl + '" class="cro12302-slide cro12302-slide--2" tabindex="-1" aria-hidden="true">' +
                    '<img src="' + img2 + '" loading="lazy" alt="">' +
                '</a>' +
                '<button class="cro12302-arrow cro12302-arrow--next" aria-label="Next image" type="button">' + ICON_CHEVRON + '</button>' +
                '<button class="cro12302-arrow cro12302-arrow--prev" aria-label="Previous image" type="button">' + ICON_CHEVRON + '</button>'
            );

            // Indicator bar — goes between image area and product name
            actionsEl.insertAdjacentHTML('afterend',
                '<div class="cro12302-indicator">' +
                    '<div class="cro12302-seg cro12302-seg--active" data-idx="0"></div>' +
                    '<div class="cro12302-seg" data-idx="1"></div>' +
                '</div>'
            );

            var indicator = actionsEl.nextElementSibling;
            var nextBtn = wrapper.querySelector('.cro12302-arrow--next');
            var prevBtn = wrapper.querySelector('.cro12302-arrow--prev');

            initInteractions(wrapper, indicator, nextBtn, prevBtn);
        }

        /* ── Interactions: arrows, indicator, swipe ── */

        function initInteractions(wrapper, indicator, nextBtn, prevBtn) {
            var current = 0;

            function goTo(idx) {
                current = idx;
                wrapper.classList.toggle('cro12302-at-2', idx === 1);
                indicator.querySelectorAll('.cro12302-seg').forEach(function (seg, i) {
                    seg.classList.toggle('cro12302-seg--active', i === idx);
                });
            }

            nextBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                goTo(1);
            });

            prevBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                goTo(0);
            });

            indicator.querySelectorAll('.cro12302-seg').forEach(function (seg) {
                seg.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    goTo(parseInt(seg.getAttribute('data-idx'), 10));
                });
            });

            // Touch swipe
            var touchStartX = null;
            wrapper.addEventListener('touchstart', function (e) {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });

            wrapper.addEventListener('touchend', function (e) {
                if (touchStartX === null) return;
                var diff = touchStartX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 30) {
                    if (diff > 0 && current === 0) goTo(1);
                    if (diff < 0 && current === 1) goTo(0);
                }
                touchStartX = null;
            }, { passive: true });
        }

        /* ── Init ── */

        // Only fetch/build for cards not already handled — lets this run again
        // safely after "View More" / infinite-scroll appends fresh .product-item cards.
        function processCards() {
            var newCards = Array.prototype.filter.call(document.querySelectorAll('.product-item'), function (card) {
                var wrapper = card.querySelector('.product-photo-actions-wrapper');
                return wrapper && !wrapper.classList.contains('cro12302-init');
            });
            if (!newCards.length) return;

            fetchAllGalleries(newCards, function (results) {
                Object.keys(results).forEach(function (sku) {
                    var r = results[sku];
                    buildSlider(r.card, r.pdpUrl, r.img2);
                });
            });
        }

        function init() {
            addClass('body', variation_name);
            processCards();

            // PLP grids here load extra products via AJAX (e.g. "View More" / infinite
            // scroll) without a page reload. That AJAX appends a whole new sibling grid
            // (e.g. "amscroll-pages") next to the original one rather than new <li>s into
            // it, so watch the shared grid container, not just the first grid itself.
            var firstItem = document.querySelector('.product-item');
            var watchTarget = firstItem && (firstItem.parentElement.parentElement || firstItem.parentElement);
            if (watchTarget && window.MutationObserver) {
                var pending = false;
                var observer = new MutationObserver(function () {
                    if (pending) return;
                    pending = true;
                    setTimeout(function () {
                        pending = false;
                        processCards();
                    }, 300);
                });
                observer.observe(watchTarget, { childList: true, subtree: true });
            }
        }

        waitForElement('.product-item', init);

    } catch (e) {
        console.log(e, 'error in CRO12302');
    }
})();
