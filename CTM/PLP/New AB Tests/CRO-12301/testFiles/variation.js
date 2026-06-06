(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro12301";
        /* all Pure helper functions */

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

        /* ── Size Differentiation helpers ── */

        var cro12301uid = 0;

        function parseDimensions(title) {
            /* Handles "430 x 430mm", "600mm x 600mm", "300 x 300 x 4mm" */
            var match = title.match(/(\d+)\s*(?:mm)?\s*[xX×]\s*(\d+)(?:\s*[xX×]\s*\d+)?\s*(?:mm)?/);
            if (!match) return null;
            var a = parseInt(match[1], 10);
            var b = parseInt(match[2], 10);
            return { w: Math.min(a, b), h: Math.max(a, b) };
        }

        function getSizeCategory(maxMm) {
            if (maxMm <= 300) return 'S';
            if (maxMm <= 600) return 'M';
            if (maxMm <= 800) return 'L';
            return 'XL'; /* XL uses the Large icon — same size as L */
        }

        function getShape(w, h) {
            var ratio = h / w;
            if (ratio === 1) return 'square';
            if (ratio <= 2) return 'rectangle';
            return 'plank';
        }

        /* Figma-spec: 43×43 circle + white tile shape + 45° diagonal hatching masked to tile */
        function getShapeSVG(shape, category) {
            var uid = 'cro12301-' + (++cro12301uid);
            var clipId = uid + '-clip';
            var maskId = uid + '-mask';

            /* XL uses the same icon size as L */
            var iconSize = (category === 'XL') ? 'L' : category;

            /* Tile dimensions inside the 43px circle.
               Square    → equal sides scaled by S/M/L
               Rectangle → landscape (wider than tall), brief: "landscape rectangle icon"
               Plank     → narrow portrait bar */
            var tw, th;
            if (shape === 'square') {
                tw = iconSize === 'S' ? 14 : iconSize === 'M' ? 20 : 26;
                th = tw;
            } else if (shape === 'rectangle') {
                if (iconSize === 'S') { tw = 18; th = 10; }
                else if (iconSize === 'M') { tw = 22; th = 13; }
                else { tw = 27; th = 16; }
            } else {
                if (iconSize === 'S') { tw = 7; th = 20; }
                else if (iconSize === 'M') { tw = 9; th = 26; }
                else { tw = 11; th = 34; }
            }

            var txF = parseFloat((21.5 - tw / 2).toFixed(1));
            var tyF = parseFloat((21.5 - th / 2).toFixed(1));
            var rx = 1;

            /* 45° diagonal hatching lines spaced 3px — matches Figma exactly */
            var lines = '';
            var spacing = 3;
            var reach = tw + th + 6;
            for (var offset = -reach; offset < reach; offset += spacing) {
                var x1 = (txF + offset).toFixed(1);
                var y1 = (tyF + th).toFixed(1);
                var x2 = (txF + offset + th).toFixed(1);
                var y2 = tyF.toFixed(1);
                lines += '<path d="M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2 + '" stroke="#ADADAD"/>';
            }

            var tR = 'x="' + txF + '" y="' + tyF + '" width="' + tw + '" height="' + th + '" rx="' + rx + '"';

            return (
                '<svg class="cro12301-tile-icon" viewBox="0 0 43 43" xmlns="http://www.w3.org/2000/svg">' +
                '<defs>' +
                /* Circle clipPath keeps all tile content within the circle boundary */
                '<clipPath id="' + clipId + '">' +
                '<circle cx="21.5" cy="21.5" r="21.5"/>' +
                '</clipPath>' +
                '<mask id="' + maskId + '" style="mask-type:luminance" maskUnits="userSpaceOnUse" ' +
                'x="' + txF + '" y="' + tyF + '" width="' + tw + '" height="' + th + '">' +
                '<rect ' + tR + ' fill="white" stroke="white"/>' +
                '</mask>' +
                '</defs>' +
                '<circle cx="21.5" cy="21.5" r="21.5" fill="#EAEAEA"/>' +
                '<g clip-path="url(#' + clipId + ')">' +
                '<rect ' + tR + ' fill="white"/>' +
                '<g mask="url(#' + maskId + ')">' + lines + '</g>' +
                '<rect ' + tR + ' fill="none" stroke="#404040" stroke-width="2"/>' +
                '</g>' +
                '</svg>'
            );
        }

        function buildSizeBadge(dims) {
            var category = getSizeCategory(dims.h);
            var shape = getShape(dims.w, dims.h);
            var svg = getShapeSVG(shape, category);
            var label = 'Size: ' + category;
            /* display raw mm values, larger dimension first */
            var dimText = dims.h + 'mm × ' + dims.w + 'mm';

            return (
                '<div class="cro12301-size-badge">' +
                svg +
                '<div class="cro12301-size-text">' +
                '<span class="cro12301-size-label">' + label + '</span>' +
                '<span class="cro12301-size-dims">' + dimText + '</span>' +
                '</div>' +
                '</div>'
            );
        }

        function injectSizeBadges() {
            var cards = document.querySelectorAll('.product-item-info');
            cards.forEach(function (card) {
                if (card.querySelector('.cro12301-size-badge')) return;

                var titleEl = card.querySelector('.product-item-name a, .product-item-link');
                if (!titleEl) return;

                var dims = parseDimensions(titleEl.textContent || '');
                if (!dims) return;

                var badge = buildSizeBadge(dims);

                var priceBox = card.querySelector('.price-box, .price-container');
                if (priceBox) {
                    priceBox.insertAdjacentHTML('afterend', badge);
                }
            });
        }

        /* Variation Init */
        function setupObserver() {
            var debounceTimer = null;
            var listingContainer = document.querySelector('#amasty-shopby-product-list');
            if (listingContainer) {
                var observer = new MutationObserver(function () {
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(injectSizeBadges, 150);
                });
                observer.observe(listingContainer, { childList: true, subtree: true });
            }
        }

        function init() {
            addClass("body", variation_name);

            /* Wait for product cards to be in the DOM before first inject */
            waitForElement('.product-item-info', injectSizeBadges);

            /* Wait for the stable Amasty wrapper before setting up the View More observer */
            waitForElement('#amasty-shopby-product-list', setupObserver);
        }

        /* Initialise variation */
        waitForElement('.page-with-filter', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();