(function () {
    try {
        var debug = 1;
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

        var ICON_NEXT = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
        var ICON_PREV = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';

        /* ── Single GraphQL request for all PLP products ── */

        function fetchAllGalleries(callback) {
            var cards = document.querySelectorAll('.product-item');
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

            var query = '{ products(filter: { sku: { in: ' + JSON.stringify(skus) + ' } }, pageSize: 50) { items { sku media_gallery { url } } } }';

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
                    // Only process products with 2+ images
                    if (!entry || item.media_gallery.length < 2) return;
                    results[item.sku] = {
                        card: entry.card,
                        pdpUrl: entry.pdpUrl,
                        img1: item.media_gallery[0].url + '&width=700',
                        img2: item.media_gallery[1].url + '&width=700'
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
                '<button class="cro12302-arrow cro12302-arrow--next" aria-label="Next image" type="button">' + ICON_NEXT + '</button>' +
                '<button class="cro12302-arrow cro12302-arrow--prev" aria-label="Previous image" type="button">' + ICON_PREV + '</button>'
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

        function init() {
            addClass('body', variation_name);

            fetchAllGalleries(function (results) {
                Object.keys(results).forEach(function (sku) {
                    var r = results[sku];
                    buildSlider(r.card, r.pdpUrl, r.img2);
                });
            });
        }

        waitForElement('.product-item', init);

    } catch (e) {
        console.log(e, 'error in CRO12302');
    }
})();
