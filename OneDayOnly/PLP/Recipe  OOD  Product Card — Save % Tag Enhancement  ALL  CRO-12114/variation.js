(function () {
    try {
        var VARIATION = 'cro-t-odo-12114';

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
        

        // Get saving % from native badge first, fall back to __NEXT_DATA__
        function getSavePct(card) {
            var nativeBadge = card.querySelector('.savings-badge');
            if (nativeBadge) {
                var match = nativeBadge.textContent.match(/(\d+)/);
                if (match) return match[1];
            }
            var productId = card.id;
            if (productId && window.__NEXT_DATA__) {
                try {
                    var pp = window.__NEXT_DATA__.props.pageProps;
                    var keys = ['shopPage', 'clearanceSale', 'categoryPage'];
                    for (var i = 0; i < keys.length; i++) {
                        var data = pp[keys[i]];
                        if (!data || !data.items) continue;
                        for (var j = 0; j < data.items.length; j++) {
                            var items = data.items[j].props && data.items[j].props.items;
                            if (!items) continue;
                            for (var k = 0; k < items.length; k++) {
                                if (items[k].id === productId && items[k].saving && items[k].saving.percent) {
                                    return String(items[k].saving.percent);
                                }
                            }
                        }
                    }
                } catch (e) { }
            }
            return null;
        }

        function applyBadges() {
            document.querySelectorAll('.measure-this').forEach(function (card) {
                if (card.getAttribute('data-crp-12114')) return;
                card.setAttribute('data-crp-12114', '1');

                var imgWrapper = card.querySelector('.image-wrapper');
                if (!imgWrapper) return;

                // Save badge
                var pct = getSavePct(card);
                if (pct) {
                    var badge = document.createElement('div');
                    badge.className = 'crp-12114-badge';
                    badge.innerHTML =
                        '<span class="crp-12114-save">SAVE</span>' +
                        '<span class="crp-12114-pct">' + pct + '%</span>';
                    imgWrapper.appendChild(badge);
                }

                // Restyle native pills (Best Seller, More Options, ML, stock count)
                imgWrapper.querySelectorAll('.pill').forEach(function (pill) {
                    if (pill.classList.contains('crp-12114-styled')) return;
                    pill.classList.add('crp-12114-styled');
                    pill.parentElement.closest('div').classList.add('crp-12114-styled-parent')
                    var text = pill.textContent;
                    if (/best.?seller/i.test(text)) {
                        pill.classList.add('crp-12114-bs-pill');
                    } else if (/left|limited/i.test(text)) {
                        pill.classList.add('crp-12114-stock-pill');
                    } else {
                        pill.classList.add('crp-12114-blue-pill');
                    }
                });
            });
        }

        function init() {
            document.body.classList.add(VARIATION);
            applyBadges();
            window.addEventListener('scroll', applyBadges, { passive: true });
        }


        if (!window.cro_12114) {
            window.cro_12114 = true;
            waitForElement('.measure-this', init);
        }


    } catch (e) { }
})();