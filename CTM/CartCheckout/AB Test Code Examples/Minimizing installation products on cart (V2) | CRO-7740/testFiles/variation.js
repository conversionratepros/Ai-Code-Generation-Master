(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-t-ctm-114-v2";
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

        function live(selector, event, callback, context) {
            function addEvent(el, type, handler) {
                if (el.attachEvent) el.attachEvent("on" + type, handler);
                else el.addEventListener(type, handler);
            }
            this &&
                this.Element &&
                (function (ElementPrototype) {
                    ElementPrototype.matches =
                        ElementPrototype.matches ||
                        ElementPrototype.matchesSelector ||
                        ElementPrototype.webkitMatchesSelector ||
                        ElementPrototype.msMatchesSelector ||
                        function (selector) {
                            var node = this,
                                nodes = (node.parentNode || node.document).querySelectorAll(selector),
                                i = -1;
                            while (nodes[++i] && nodes[i] != node);
                            return !!nodes[i];
                        };
                })(Element.prototype);
            function live(selector, event, callback, context) {
                addEvent(context || document, event, function (e) {
                    var found,
                        el = e.target || e.srcElement;
                    while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
                    if (found) callback.call(el, e);
                });
            }
            live(selector, event, callback, context);
        }

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        }

        function parsePrice(el) {
            if (!el) return 0;
            var text = el.textContent.replace(/[^0-9.]/g, '');
            return parseFloat(text) || 0;
        }

        function formatPrice(num) {
            var fixed = num.toFixed(2);
            var parts = fixed.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return 'R' + parts[0] + '.' + parts[1];
        }

        function getProductSubtotal(groupEl) {
            var el = groupEl.querySelector('.cart.item.addoncount .item-info .cart-price .price');
            if (debug) console.log('[CRO-7740] product price el:', el, '| value:', el ? el.textContent.trim() : 'NOT FOUND');
            return parsePrice(el);
        }

        function getInstallationSubtotal(groupEl) {
            var el = groupEl.querySelector('span.show-ins-price');
            if (debug) console.log('[CRO-7740] show-ins-price el:', el, '| value:', el ? el.textContent.trim() : 'NOT FOUND');
            return parsePrice(el);
        }

        function init() {
            addClass("body", variation_name);
            waitForElement('.grouped-item.addoncount.has-addon', trigger);
        }

        function cro_114_v2_updateCounts() {
            var addonGroups = document.querySelectorAll(".grouped-item.addoncount.has-addon");
            var addonSpans = document.querySelectorAll(".cro-114-v2-addons");
            addonGroups.forEach(function (group, index) {
                var count = group.querySelectorAll(".cart.item.addon-product").length;
                if (addonSpans[index]) {
                    addonSpans[index].textContent = count;
                }
            });
        }

        function cro_114_v2_updatePrices() {
            document.querySelectorAll('.grouped-item.addoncount.has-addon').forEach(function (e) {
                var section = e.querySelector('.cro-114-v2-subtotal-section');
                if (!section) return;

                var productSubtotal = getProductSubtotal(e);
                var installationSubtotal = getInstallationSubtotal(e);
                if (debug) console.log('[CRO-7740] updatePrices — product:', productSubtotal, '| install:', installationSubtotal);

                var total = productSubtotal + installationSubtotal;

                var productVal = section.querySelector('.cro-114-v2-product-row .cro-114-v2-value');
                var installVal = section.querySelector('.cro-114-v2-installation-row .cro-114-v2-value');
                var totalVal = section.querySelector('.cro-114-v2-total-row .cro-114-v2-value');

                if (productVal) productVal.textContent = formatPrice(productSubtotal);
                if (installVal) installVal.textContent = formatPrice(installationSubtotal);
                if (totalVal) totalVal.textContent = formatPrice(total);
            });
        }

        /* module-level so trigger() can cancel the previous interval before starting a new one */
        var triggerInterval = null;

        function trigger() {
            if (triggerInterval) {
                clearInterval(triggerInterval);
                triggerInterval = null;
            }

            var doneTypingInterval = 3000;
            triggerInterval = setInterval(function () {
                newInit();
            }, 400);
            setTimeout(function () {
                clearInterval(triggerInterval);
                triggerInterval = null;
            }, doneTypingInterval);
        }

        function newInit() {
            document.querySelectorAll('.grouped-item.addoncount.has-addon').forEach(function (e, index) {
                var numberOfAddons = e.querySelectorAll('.cart.item.addon-product');
                var instalationText = e.querySelector('.installation-span');
                var installView = e.querySelector('.installation.install-view');

                /* Accordion state — only set once per group to avoid repeated clicks */
                if (installView && !e.classList.contains('cro-114-v2-accordion-set')) {
                    e.classList.add('cro-114-v2-accordion-set');
                    var isExpanded = e.querySelector('.installation.install-view.flip');
                    if (index === 0) {
                        /* First product: keep expanded */
                        if (!isExpanded) installView.click();
                    } else {
                        /* All other products: collapse */
                        if (isExpanded) installView.click();
                    }
                }

                /* Add installation header with hammer icon */
                if (instalationText && !e.querySelector('.cro-114-v2-installation-header')) {
                    var cro_114_v2_header = `<div class="cro-114-v2-installation-header">
                        <div class="cro-114-v2-installation-header-inner">
                            <div class="cro-114-v2-installation-header-img">
                                <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/CTM/Recipe+114+_CTM_hammerIcon.svg" alt="">
                            </div>
                            <div class="cro-114-v2-installation-header-text">
                                <p>Required Installation Products (<span class="cro-114-v2-addons">${numberOfAddons.length}</span>)</p>
                            </div>
                        </div>
                    </div>`;
                    instalationText.insertAdjacentHTML('beforebegin', cro_114_v2_header);
                }

                /* Add pricing breakdown section */
                if (!e.querySelector('.cro-114-v2-subtotal-section')) {
                    var productSubtotal = getProductSubtotal(e);
                    var installationSubtotal = getInstallationSubtotal(e);
                    var total = productSubtotal + installationSubtotal;
                    if (debug) console.log('[CRO-7740] newInit — product:', productSubtotal, '| install:', installationSubtotal, '| total:', total);

                    var subtotalHtml = `<div class="cro-114-v2-subtotal-section">
                        <div class="cro-114-v2-subtotal-divider"></div>
                        <div class="cro-114-v2-subtotal-rows">
                            <div class="cro-114-v2-subtotal-row cro-114-v2-product-row">
                                <span class="cro-114-v2-label">Product Subtotal</span>
                                <span class="cro-114-v2-value">${formatPrice(productSubtotal)}</span>
                            </div>
                            <div class="cro-114-v2-subtotal-row cro-114-v2-installation-row">
                                <span class="cro-114-v2-label">Installation Products Subtotal</span>
                                <span class="cro-114-v2-value">${formatPrice(installationSubtotal)}</span>
                            </div>
                            <div class="cro-114-v2-subtotal-row cro-114-v2-total-row">
                                <span class="cro-114-v2-label">Subtotal</span>
                                <span class="cro-114-v2-value">${formatPrice(total)}</span>
                            </div>
                        </div>
                    </div>`;

                    /* Insert BEFORE the installation dropdown */
                    var installSection = e.querySelector('.installation.install-view');
                    if (installSection) {
                        installSection.insertAdjacentHTML('beforebegin', subtotalHtml);
                    } else {
                        e.insertAdjacentHTML('beforeend', subtotalHtml);
                    }
                }
            });
        }

        function observeGroupPrice(groupEl) {
            var priceEl = groupEl.querySelector('.cart.item.addoncount .item-info .cart-price .price');
            if (!priceEl) {
                /* fallback: wait for AJAX then refresh */
                setTimeout(function () { cro_114_v2_updatePrices(); }, 2000);
                return;
            }

            var snapshot = priceEl.textContent.trim();

            /* watch only this price element; disconnect once changed */
            var qtyObs = new MutationObserver(function () {
                if (priceEl.textContent.trim() !== snapshot) {
                    qtyObs.disconnect();
                    if (debug) console.log('[CRO-7740] price changed → updating section');
                    cro_114_v2_updatePrices();
                }
            });
            qtyObs.observe(priceEl, { childList: true, subtree: true, characterData: true });

            /* safety: always disconnect after 10 s in case price never changes */
            setTimeout(function () { qtyObs.disconnect(); }, 10000);
        }

        function watchQtyControls() {
            /* qty +/- buttons */
            live('.cart.items .grouped-item .cart.item.addoncount .item-info .qty-btn', 'click', function () {
                var groupEl = this.closest('.grouped-item.addoncount.has-addon');
                if (groupEl) observeGroupPrice(groupEl);
            });

            /* typed qty inputs — fires when user tabs out or presses Enter */
            live('.cart.items .grouped-item .cart.item.addoncount .item-info input[data-role="cart-item-qty"]', 'change', function () {
                var groupEl = this.closest('.grouped-item.addoncount.has-addon');
                if (groupEl) observeGroupPrice(groupEl);
            });

            live('.cart.items .grouped-item .cart.item.addoncount .item-info input.addon-input', 'change', function () {
                var groupEl = this.closest('.grouped-item.addoncount.has-addon');
                if (groupEl) observeGroupPrice(groupEl);
            });
        }

        function observer() {
            function observeCartTotalItems(callback) {
                var targetSelector = '.cart-summary-wrapper #cart-totals .grand.totals .price';
                var targetNode = document.querySelector(targetSelector);

                if (!targetNode) {
                    if (debug) console.warn('[CRO-7740] Target element not found: ' + targetSelector);
                    return;
                }

                var debounceTimer = null;
                var obs = new MutationObserver(function (mutationsList) {
                    for (var i = 0; i < mutationsList.length; i++) {
                        var mutation = mutationsList[i];
                        if (mutation.type === "childList" || mutation.type === "characterData") {
                            clearTimeout(debounceTimer);
                            debounceTimer = setTimeout(function () {
                                callback(targetNode.textContent.trim());
                            }, 300);
                            break;
                        }
                    }
                });

                obs.observe(targetNode, { childList: true, subtree: true, characterData: true });
                return obs;
            }

            observeCartTotalItems(function (newValue) {
                if (debug) console.log('[CRO-7740] grand total changed →', newValue);
                if (!document.querySelector('.cro-114-v2-installation-header')) {
                    trigger();
                } else {
                    cro_114_v2_updateCounts();
                    cro_114_v2_updatePrices();
                }
            });
        }

        if (!window.cro_t_ctm_114_v2) {
            waitForElement('.cart-summary-wrapper #cart-totals .grand.totals .price', observer);
            watchQtyControls();
            waitForElement('.cart-container', init);
            window.cro_t_ctm_114_v2 = true;
        }

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();
