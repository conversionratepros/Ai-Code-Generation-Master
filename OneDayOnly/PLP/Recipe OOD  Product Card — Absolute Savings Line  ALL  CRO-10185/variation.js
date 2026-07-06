(function () {
    try {
        var VARIATION = 'cro-t-odo-10185';

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

        function parsePrice(el) {
            if (!el) return 0;
            var text = (el.textContent || '').replace(/from\s*/gi, '').replace(/R/gi, '').replace(/,/g, '').trim();
            var num = parseFloat(text);
            return isNaN(num) ? 0 : num;
        }

        function formatAmount(amount) {
            var n = Math.round(amount);
            return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        // Backend saving objects from __NEXT_DATA__, keyed by product id (the
        // .measure-this element's DOM id). The native savings badge renders
        // from saving.percent / saving.fixed, which are computed server-side
        // from unrounded prices — arithmetic on the rounded display prices
        // drifts by 1% / R1 (e.g. R999/R1,800 shows 45% computed vs 44% native).
        function getSavingsMap() {
            if (window.cro_10185_savings) return window.cro_10185_savings;
            var map = {};
            try {
                var el = document.getElementById('__NEXT_DATA__');
                if (el) {
                    (function walk(node) {
                        if (!node || typeof node !== 'object') return;
                        if (node.id && node.price && node.saving && typeof node.saving === 'object') {
                            map[node.id] = node.saving;
                        }
                        for (var k in node) {
                            if (node[k] && typeof node[k] === 'object') walk(node[k]);
                        }
                    })(JSON.parse(el.textContent));
                }
            } catch (e) { }
            window.cro_10185_savings = map;
            return map;
        }

        // Normalizes casing (source text varies: "more options", "MORE OPTIONS",
        // "More Options") without ever discarding the actual dynamic content.
        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function (w) {
                return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
            });
        }

        var FLAME_SVG = '<svg class="cro-10185-bs-flame" xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none"><path d="M4.61397 15.4L5.30696 10.07H0.530965C0.117465 10.07 -0.136785 9.61772 0.0779651 9.26447L5.55922 0.256219C5.85697 -0.233031 6.61122 0.0319688 6.53747 0.599969L5.84447 5.93172H10.6207C11.0342 5.93172 11.2885 6.38397 11.0737 6.73722L5.59222 15.744C5.29447 16.233 4.54022 15.9677 4.61397 15.4Z" fill="#E2081B"/></svg>';

        var CART_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18.8926 15.2719L19.5917 11.4766C19.607 11.3968 19.6025 11.3145 19.5785 11.2368C19.5546 11.1591 19.512 11.0885 19.4545 11.0311C19.397 10.9737 19.3263 10.9312 19.2485 10.9074C19.1708 10.8837 19.0885 10.8793 19.0087 10.8947C18.677 10.9646 18.339 10.9999 18 11C16.7531 11 15.5512 10.5341 14.63 9.69366C13.7088 8.85326 13.1348 7.69901 13.0207 6.45731C13.0101 6.33286 12.9534 6.21686 12.8615 6.1322C12.7697 6.04755 12.6495 6.00038 12.5246 6H5.48442L5.41205 5.67431C5.33802 5.34125 5.15263 5.04339 4.88649 4.82989C4.62036 4.6164 4.28938 4.50003 3.94819 4.5H2.52661C2.27751 4.5 2.0467 4.67016 2.00667 4.91602C1.99451 4.98777 1.99814 5.06131 2.01732 5.13151C2.0365 5.20171 2.07076 5.26688 2.11771 5.32248C2.16466 5.37809 2.22318 5.42278 2.28918 5.45344C2.35518 5.48411 2.42707 5.5 2.49984 5.50003H3.94781C4.0617 5.49951 4.17233 5.53809 4.2612 5.60932C4.35007 5.68055 4.41181 5.78012 4.43611 5.89139L7.14745 18.093C6.75145 18.2172 6.40382 18.4614 6.15261 18.7917C5.9014 19.1221 5.75902 19.5223 5.74514 19.9371C5.73126 20.3519 5.84657 20.7608 6.07514 21.1072C6.3037 21.4536 6.63423 21.7205 7.02104 21.8709C7.40785 22.0214 7.83184 22.0479 8.23439 21.9469C8.63695 21.846 8.9982 21.6224 9.26821 21.3072C9.53821 20.992 9.70365 20.6008 9.74164 20.1875C9.77963 19.7742 9.6883 19.3593 9.48028 19.0002H15.7698C15.55 19.3813 15.462 19.8244 15.5197 20.2607C15.5773 20.6969 15.7773 21.1019 16.0886 21.4129C16.3999 21.7239 16.8051 21.9235 17.2414 21.9807C17.6777 22.0379 18.1207 21.9496 18.5017 21.7294C18.8826 21.5091 19.1803 21.1694 19.3484 20.7627C19.5166 20.3561 19.5459 19.9053 19.4317 19.4804C19.3176 19.0554 19.0664 18.68 18.7172 18.4123C18.3679 18.1446 17.9401 17.9997 17.5 18H8.15119L7.81786 16.5H17.4175C17.7682 16.5 18.1078 16.3771 18.3772 16.1528C18.6467 15.9284 18.8291 15.6167 18.8926 15.2719ZM7.75003 20.75C7.60169 20.75 7.45669 20.706 7.33335 20.6236C7.21002 20.5412 7.11389 20.4241 7.05712 20.287C7.00035 20.15 6.9855 19.9992 7.01444 19.8537C7.04338 19.7082 7.11481 19.5746 7.2197 19.4697C7.32459 19.3648 7.45823 19.2934 7.60371 19.2644C7.7492 19.2355 7.9 19.2503 8.03704 19.3071C8.17409 19.3639 8.29122 19.46 8.37363 19.5833C8.45604 19.7067 8.50003 19.8517 8.50003 20C8.50003 20.1989 8.42101 20.3897 8.28036 20.5303C8.13971 20.671 7.94894 20.75 7.75003 20.75ZM18.25 20C18.25 20.1483 18.206 20.2934 18.1236 20.4167C18.0412 20.54 17.9241 20.6362 17.787 20.6929C17.65 20.7497 17.4992 20.7645 17.3537 20.7356C17.2082 20.7067 17.0746 20.6352 16.9697 20.5303C16.8648 20.4255 16.7934 20.2918 16.7644 20.1463C16.7355 20.0008 16.7504 19.85 16.8071 19.713C16.8639 19.576 16.96 19.4588 17.0834 19.3764C17.2067 19.294 17.3517 19.25 17.5 19.25C17.6989 19.25 17.8897 19.329 18.0304 19.4697C18.171 19.6103 18.25 19.8011 18.25 20Z" fill="white"/><path d="M18 2C17.2089 2 16.4355 2.23459 15.7777 2.67412C15.1199 3.11364 14.6072 3.73836 14.3045 4.46926C14.0017 5.20016 13.9225 6.00442 14.0769 6.78034C14.2312 7.55626 14.6122 8.26899 15.1716 8.8284C15.731 9.38781 16.4437 9.76877 17.2196 9.92311C17.9955 10.0774 18.7998 9.99824 19.5307 9.69549C20.2616 9.39274 20.8863 8.88005 21.3259 8.22226C21.7654 7.56446 22 6.79111 22 5.99998C22 4.93913 21.5785 3.92172 20.8284 3.17158C20.0782 2.42144 19.0608 2.00001 18 2ZM19.75 6.5H18.5V7.75002C18.5006 7.81608 18.4882 7.88162 18.4633 7.94284C18.4385 8.00407 18.4018 8.05976 18.3553 8.10671C18.3088 8.15365 18.2535 8.19091 18.1925 8.21635C18.1315 8.24178 18.0661 8.25487 18 8.25487C17.9339 8.25487 17.8685 8.24178 17.8075 8.21635C17.7466 8.19091 17.6912 8.15365 17.6447 8.10671C17.5982 8.05976 17.5615 8.00407 17.5367 7.94284C17.5118 7.88162 17.4994 7.81608 17.5 7.75002V6.5H16.25C16.1839 6.50064 16.1184 6.48818 16.0572 6.46334C15.9959 6.4385 15.9403 6.40177 15.8933 6.35528C15.8464 6.30879 15.8091 6.25345 15.7837 6.19247C15.7582 6.13149 15.7451 6.06608 15.7451 6.00001C15.7451 5.93394 15.7582 5.86852 15.7837 5.80754C15.8091 5.74656 15.8464 5.69123 15.8933 5.64474C15.9403 5.59824 15.9959 5.56152 16.0572 5.53668C16.1184 5.51184 16.1839 5.49938 16.25 5.50002H17.5V4.25C17.4994 4.18393 17.5118 4.11839 17.5367 4.05717C17.5615 3.99595 17.5982 3.94025 17.6447 3.89331C17.6912 3.84637 17.7466 3.8091 17.8075 3.78367C17.8685 3.75824 17.9339 3.74514 18 3.74514C18.0661 3.74514 18.1315 3.75824 18.1925 3.78367C18.2535 3.8091 18.3088 3.84637 18.3553 3.89331C18.4018 3.94025 18.4385 3.99595 18.4633 4.05717C18.4882 4.11839 18.5006 4.18393 18.5 4.25V5.50002H19.75C19.8818 5.50129 20.0077 5.55453 20.1004 5.64816C20.1932 5.74179 20.2452 5.86823 20.2452 6.00001C20.2452 6.13178 20.1932 6.25823 20.1004 6.35186C20.0077 6.44548 19.8818 6.49872 19.75 6.5H19.75Z" fill="white"/></svg>';

        var TRENDING_SVG = '<svg class="cro-10185-avail-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6f389b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>';

        // Best Seller badge — inserted into the title anchor, before the heading
        // container div (which has overflow:hidden, clipping absolute children)
        function addBestSellerBadge(titleLink) {
            if (!titleLink) return;
            var bsBadge = document.createElement('div');
            bsBadge.className = 'cro-10185-bs-badge';
            bsBadge.innerHTML = FLAME_SVG + '<span class="cro-10185-bs-text">Best Seller</span>';
            var headingContainer = titleLink.querySelector('[role="group"]') || titleLink.firstElementChild;
            if (headingContainer) {
                titleLink.insertBefore(bsBadge, headingContainer);
            } else {
                titleLink.prepend(bsBadge);
            }
            titleLink.classList.add('cro-10185-has-bs');
        }

        function processCard(card) {
            if (card.getAttribute('data-cro-10185')) return;
            card.setAttribute('data-cro-10185', '1');

            // ── Stable element discovery (no CSS-in-JS hash classes) ─────────
            var imgWrapper = card.querySelector('.image-wrapper');
            var atcButton = card.querySelector('button[title="Add to cart"]');
            var sellingEl = card.querySelector('.highlightOnHover[aria-label]');

            // Derive structural elements positionally
            var priceGroup = sellingEl ? sellingEl.parentElement : null;
            var contentWrap = priceGroup ? priceGroup.parentElement : null;
            var originalEl = sellingEl ? sellingEl.nextElementSibling : null;
            // The title anchor contains h2 headings. The image anchor also has
            // color="primary" so querySelector would grab the wrong one — find
            // specifically the anchor that wraps the heading group.
            var titleLink = null;
            card.querySelectorAll('a').forEach(function (a) {
                if (a.querySelector('h2') || a.querySelector('[role="group"]')) {
                    titleLink = a;
                }
            });

            // Pills container — found via its pill children
            var firstPill = imgWrapper ? imgWrapper.querySelector('.pill') : null;
            var pillContainer = firstPill ? firstPill.parentElement : null;

            // Some templates (e.g. clearance-sale) render size/option badges as a
            // plain text row below the price block instead of inside the image —
            // no native .pill class, just generic CSS-in-JS hash classes. When no
            // real pill container was found, that row is contentWrap's next sibling.
            var altPillsSource = (!pillContainer && contentWrap) ? contentWrap.nextElementSibling : null;

            if (!imgWrapper) return;

            // ── Stamp stable custom classes so CSS never needs hash selectors ─
            if (contentWrap) contentWrap.classList.add('cro-10185-price-block');
            if (titleLink) titleLink.classList.add('cro-10185-title-link');
            if (pillContainer) pillContainer.classList.add('cro-10185-pills-container');
            if (atcButton && atcButton.parentElement) {
                atcButton.parentElement.classList.add('cro-10185-native-atc-wrap');
            }
            // Tag grid cell (card → section → grid cell)
            var section = card.parentElement;
            var gridCell = section ? section.parentElement : null;
            if (gridCell) gridCell.classList.add('cro-10185-grid-cell');

            // ── Savings calculation ───────────────────────────────────────────
            // Priority: backend saving object → hidden native badge text →
            // computed from display prices (last resort, can drift by 1%/R1).
            var sellingPrice = parsePrice(sellingEl);
            var originalPrice = parsePrice(originalEl);
            var computedSaving = (originalPrice > 0 && sellingPrice > 0 && originalPrice > sellingPrice)
                ? originalPrice - sellingPrice : 0;
            var saving = 0, pct = 0;
            var pctSource = 'none';

            var backendSaving = getSavingsMap()[card.id];
            if (backendSaving && backendSaving.percent > 0) {
                pct = backendSaving.percent;
                saving = backendSaving.fixed ? backendSaving.fixed.value : 0;
                pctSource = 'backend';
            }
            if (!pct) {
                // SPA-loaded card absent from __NEXT_DATA__: the native badge
                // (hidden by our CSS but still in the DOM) has the true percent.
                var nativeBadge = card.querySelector('.savings-badge');
                var badgePct = nativeBadge && (nativeBadge.textContent || '').match(/(\d+)\s*%/);
                if (badgePct) {
                    pct = parseInt(badgePct[1], 10);
                    pctSource = 'badge';
                }
            }
            if (!pct && computedSaving) {
                pct = Math.round((computedSaving / originalPrice) * 100);
                pctSource = 'computed';
            }
            if (!saving) saving = computedSaving;
            var hasSaving = pct > 0 && saving > 0;

            if (hasSaving) {
                // SAVE badge on image
                var saveBadge = document.createElement('div');
                saveBadge.className = 'cro-10185-save-badge';
                saveBadge.innerHTML =
                    '<span class="cro-10185-save-label">SAVE</span>' +
                    '<span class="cro-10185-save-pct">' + pct + '%</span>';
                imgWrapper.appendChild(saveBadge);
            }

            // ── Savings line — always injected so price rows align across cards
            // Invisible placeholder when there is no saving, visible green when there is.
            if (contentWrap && priceGroup) {
                var savingsLine = document.createElement('div');
                savingsLine.className = 'cro-10185-savings-line';
                if (hasSaving) {
                    savingsLine.textContent = 'You save R' + formatAmount(saving) + ' (' + pct + '%)';
                } else {
                    savingsLine.classList.add('cro-10185-savings-line--empty');
                    savingsLine.setAttribute('aria-hidden', 'true');
                }
                contentWrap.insertBefore(savingsLine, priceGroup.nextSibling);
            }

            // ── ATC button inside image (bottom-right) ────────────────────────
            if (atcButton) {
                var atcWrap = document.createElement('div');
                atcWrap.className = 'cro-10185-atc';
                if (atcButton.disabled) {
                    atcWrap.classList.add('cro-10185-atc--disabled');
                }
                atcWrap.innerHTML = CART_SVG;
                atcWrap.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!atcButton.disabled) {
                        atcButton.click();
                    }
                });
                imgWrapper.appendChild(atcWrap);
            }

            // ── Pills: classify + Best Seller badge + stock availability row ──
            var stockText = null;
            var bsPill = null;

            if (pillContainer) {
                pillContainer.querySelectorAll('.pill').forEach(function (pill) {
                    if (/best.?seller/i.test(pill.textContent)) {
                        bsPill = pill;
                        pill.classList.add('cro-10185-pill-hidden');
                        return;
                    }
                    if (/more.?options/i.test(pill.textContent)) {
                        pill.classList.add('cro-10185-pill-more-options');
                        pill.textContent = toTitleCase(pill.textContent.trim());
                    } else if (/\d+\s*left/i.test(pill.textContent)) {
                        pill.classList.add('cro-10185-pill-stock');
                        pill.textContent = pill.textContent.trim().replace(/\bleft\b/gi, 'Left');
                        stockText = pill.textContent.trim();
                    } else {
                        pill.classList.add('cro-10185-pill-size');
                    }
                    pill.classList.add('cro-10185-pill');
                });

                if (bsPill) addBestSellerBadge(titleLink);
            } else if (altPillsSource) {
                // Clone each badge into a real pill inside the image, matching the
                // markup used on pages that render pills natively, then hide the
                // original text row so it isn't shown twice.
                pillContainer = document.createElement('div');
                pillContainer.className = 'cro-10185-pills-container';

                Array.prototype.forEach.call(altPillsSource.children, function (badge) {
                    var text = badge.textContent.trim();
                    if (!text) return;
                    if (/best.?seller/i.test(text)) {
                        bsPill = badge;
                        return;
                    }
                    var pill = document.createElement('div');
                    pill.className = 'pill cro-10185-pill';
                    if (/more.?options/i.test(text)) {
                        pill.classList.add('cro-10185-pill-more-options');
                        pill.textContent = toTitleCase(text);
                    } else if (/\d+\s*left/i.test(text)) {
                        pill.classList.add('cro-10185-pill-stock');
                        pill.textContent = text.replace(/\bleft\b/gi, 'Left');
                        stockText = pill.textContent;
                    } else {
                        pill.classList.add('cro-10185-pill-size');
                        pill.textContent = text;
                    }
                    pillContainer.appendChild(pill);
                });

                imgWrapper.appendChild(pillContainer);
                altPillsSource.style.display = 'none';

                if (bsPill) addBestSellerBadge(titleLink);
            }

            // ── QA DEBUG: log every pill for this product, keyed by its heading,
            // so QA can match against control in the DevTools console.
            (function logPillsForQA() {
                var heading = titleLink
                    ? Array.prototype.map.call(titleLink.querySelectorAll('h2'), function (h) { return h.textContent.trim(); }).join(' ')
                    : card.id;
                var pillTexts = pillContainer
                    ? Array.prototype.map.call(pillContainer.querySelectorAll('.pill'), function (p) { return p.textContent.trim(); })
                    : [];
                console.log('[CRO-10185 pills]', heading, pillTexts);
                console.log('[CRO-10185 savings]', heading, { pct: pct, saving: saving, source: pctSource });
            })();

        }

        // Tags the closest [id] ancestor of each section/category heading
        // (font-size="4" — a much larger heading than product titles) so the
        // CSS min-height fix in variation.css can target that row container.
        function tagH2Parents() {
            document.querySelectorAll('h2[aria-label][font-size="4"]').forEach(function (h2) {
                var parent = h2.closest('[id]');
                if (parent) {
                    parent.classList.add('cro-10185-h2-parent');
                }
            });
        }

        function applyToAll() {
            document.body.classList.add(VARIATION);
            document.querySelectorAll('.measure-this').forEach(processCard);
            tagH2Parents();
        }

        function init() {
            applyToAll();

            // Scroll — catches lazy-loaded cards as user scrolls down
            window.addEventListener('scroll', applyToAll, { passive: true });

            // MutationObserver — catches AJAX / infinite-scroll card batches
            var debounce = null;
            var container = document.querySelector('#__next');
            if (container) {
                new MutationObserver(function () {
                    clearTimeout(debounce);
                    debounce = setTimeout(applyToAll, 150);
                }).observe(container, { childList: true, subtree: true });
            }
        }

        if (!window.cro_10185) {
            window.cro_10185 = true;
            waitForElement('.measure-this', init);
        }

    } catch (e) { }
})();