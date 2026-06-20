/*
 * fetchPDPGalleries — fetches PDP gallery images for every product card on the PLP.
 *
 * Structure confirmed via Playwright scrape (2026-06-15):
 *   PLP card       : .product-item
 *   PDP link       : a.product-item-link  (href)
 *   PDP gallery    : .vaimo-gallery__slide[data-media-type="image"] img  (src)
 *
 * Usage:
 *   fetchAllPDPGalleries(function(results) {
 *     // results = { "https://ctm.co.za/product.html": ["https://..img1..", "https://..img2.."], ... }
 *     // inject images into PLP cards here
 *   });
 */

// ── core fetcher ────────────────────────────────────────────────────────────

function fetchPDPImages(pdpUrl) {
    return fetch(pdpUrl, { credentials: 'omit' })
        .then(function(res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.text();
        })
        .then(function(html) {
            var doc = new DOMParser().parseFromString(html, 'text/html');
            var slides = doc.querySelectorAll('.vaimo-gallery__slide[data-media-type="image"]');
            var images = [];
            slides.forEach(function(slide) {
                var img = slide.querySelector('img');
                if (img && img.src) images.push(img.src);
            });
            return images;
        });
}

// ── concurrency-limited batch runner ────────────────────────────────────────

function fetchAllPDPGalleries(callback) {
    var cards = document.querySelectorAll('.product-item');
    var queue = [];

    cards.forEach(function(card) {
        var link = card.querySelector('a.product-item-link');
        if (link && link.href) queue.push({ card: card, url: link.href });
    });

    var results = {};
    var CONCURRENCY = 4;
    var index = 0;
    var active = 0;
    var completed = 0;
    var total = queue.length;

    if (total === 0) { callback(results); return; }

    function next() {
        while (active < CONCURRENCY && index < total) {
            (function(item) {
                active++;
                index++;
                fetchPDPImages(item.url)
                    .then(function(images) {
                        results[item.url] = images;
                    })
                    .catch(function() {
                        results[item.url] = [];
                    })
                    .then(function() {
                        active--;
                        completed++;
                        if (completed === total) {
                            callback(results);
                        } else {
                            next();
                        }
                    });
            })(queue[index]);
        }
    }

    next();
}

// ── example: inject first PDP gallery image into each PLP card ──────────────

/*
fetchAllPDPGalleries(function(results) {
    var cards = document.querySelectorAll('.product-item');
    cards.forEach(function(card) {
        var link = card.querySelector('a.product-item-link');
        if (!link) return;
        var images = results[link.href];
        if (!images || images.length < 2) return;

        // Build a mini image strip under the main card image
        var strip = '<div class="cro-pdp-gallery-strip">';
        images.slice(0, 4).forEach(function(src) {
            strip += '<img src="' + src + '" loading="lazy" />';
        });
        strip += '</div>';

        var photoEl = card.querySelector('.product-item-photo');
        if (photoEl) photoEl.insertAdjacentHTML('afterend', strip);
    });
});
*/
