(function () {
    try {
        var debug = 1;
        var variation_name = "pdp-gallery-fetch";

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
            if (el) el.classList.add(cls);
        }

        /* ── 1 GraphQL request for all 24 products at once ── */

        function fetchAllGalleries(callback) {
            var cards = document.querySelectorAll('.product-item');

            // SKU lives on the wishlist div id e.g. id="GR1CER200E"
            var skuMap = {};
            cards.forEach(function (card) {
                var wishlist = card.querySelector('[data-role="add-to-links"]');
                var link = card.querySelector('a.product-item-link');
                if (wishlist && wishlist.id && link) {
                    skuMap[wishlist.id] = { card: card, url: link.href };
                }
            });

            var skus = Object.keys(skuMap);
            if (!skus.length) { callback({}); return; }

            var query = '{ products(filter: { sku: { in: ' + JSON.stringify(skus) + ' } }, pageSize: 50) { items { sku media_gallery { url label } } } }';

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
                    if (!entry) return;
                    results[item.sku] = {
                        card: entry.card,
                        images: item.media_gallery.map(function (m) { return m.url; })
                    };
                });

                if (debug) console.log('[PDP-Gallery] GraphQL returned', items.length, 'products in 1 request', results);
                callback(results);
            })
            .catch(function (err) {
                if (debug) console.warn('[PDP-Gallery] GraphQL failed:', err);
                callback({});
            });
        }

        /* ── inject first 2 gallery images into each PLP card ── */

        function injectGalleryImages(results) {
            Object.keys(results).forEach(function (sku) {
                var entry = results[sku];
                var images = entry.images.slice(0, 2);
                if (!images.length) return;

                var strip = '<div class="cro-gallery-strip">';
                images.forEach(function (src) {
                    strip += '<img src="' + src + '" loading="lazy" alt="" />';
                });
                strip += '</div>';

                var photoEl = entry.card.querySelector('.product-item-photo');
                if (photoEl) photoEl.insertAdjacentHTML('afterend', strip);
            });
        }

        /* ── init ── */

        function init() {
            addClass("body", variation_name);

            fetchAllGalleries(function (results) {
                injectGalleryImages(results);
            });
        }

        waitForElement('.product-item', init);

    } catch (e) {
        console.log(e, "error in pdp-gallery-fetch");
    }
})();
