// CRO-12089 | OOD PDP — Fast-Ship Highlight | ALL
// Build session: 2026-05-20
(function () {
    try {
        var VARIATION = 'cro-t-odo-12089';

        // ─── Helpers ──────────────────────────────────────────────────────────────

        function waitForElement(selector, cb, maxTries) {
            var tries = 0;
            var max = maxTries || 200;
            var timer = setInterval(function () {
                if (document.querySelector(selector)) {
                    clearInterval(timer);
                    cb();
                } else if (++tries >= max) {
                    clearInterval(timer);
                }
            }, 100);
        }

        function insertHtml(selector, content, position) {
            var el = document.querySelector(selector);
            if (!position) position = 'afterend';
            if (el && content) el.insertAdjacentHTML(position, content);
        }

        function toggleClass(el, cls) {
            var target = document.querySelector(el);
            if (target) target.classList.toggle(cls);
        }

        function live(selector, event, callback, context) {
            function addEvent(el, type, handler) {
                if (el.attachEvent) el.attachEvent('on' + type, handler);
                else el.addEventListener(type, handler);
            }
            this && this.Element && (function (EP) {
                EP.matches = EP.matches || EP.matchesSelector || EP.webkitMatchesSelector || EP.msMatchesSelector || function (sel) {
                    var node = this, nodes = (node.parentNode || node.document).querySelectorAll(sel), i = -1;
                    while (nodes[++i] && nodes[i] !== node);
                    return !!nodes[i];
                };
            })(Element.prototype);
            addEvent(context || document, event, function (e) {
                var found, el = e.target || e.srcElement;
                while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
                if (found) callback.call(el, e);
            });
        }

        // ─── Fast Ship HTML ───────────────────────────────────────────────────────

        function getDeliveryEta() {
            if (document.body.classList.contains('cro_delivery_3_5'))  return '3-5 working days';
            if (document.body.classList.contains('cro_delivery_5_10')) return '5-10 working days';
            if (document.body.classList.contains('cro_delivery_10_20')) return '10-20 working days';
            return null;
        }

        function buildFastShipStrip(etaText) {
            var el = document.createElement('div');
            el.className = 'crp-12089-fast-ship';
            el.style.display = 'none'; // revealed by body.cro-t-odo-12089 CSS rule
            var labelHtml = etaText === '3-5 working days'
                ? '<strong>Fast Shipping</strong><span class="crp-12089-fs-mid"> - Arrives in </span><strong>2-3 working days</strong>'
                : '<span class="crp-12089-fs-mid">Arrives in </span><strong>' + etaText + '</strong>';
            el.innerHTML =
                '<span class="crp-12089-fs-icon" aria-hidden="true">' +
                '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<circle cx="10" cy="10" r="10" fill="#1A9B3C"/>' +
                '<path d="M5.5 10L8.5 13L14.5 7" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
                '</svg>' +
                '</span>' +
                '<span class="crp-12089-fs-label">' + labelHtml + '</span>';
            return el;
        }

        function insertFastShipStrip(etaText) {
            if (window.innerWidth > 1023) {
                waitForElement('.cro-ki61_payment', function () {
                    if (document.querySelector('.crp-12089-fast-ship')) return;
                    var anchor = document.querySelector('.cro-ki61_payment');
                    anchor.insertAdjacentElement('afterend', buildFastShipStrip(etaText));
                });
            } else {
                waitForElement('[cro-heading="cro-heading-Parent"]', function () {
                    if (document.querySelector('.crp-12089-fast-ship')) return;
                    var anchor = document.querySelector('[cro-heading="cro-heading-Parent"]');
                    anchor.insertAdjacentElement('beforeend', buildFastShipStrip(etaText));
                });
            }
        }

        // ─── Payflex HTML ─────────────────────────────────────────────────────────

        var payment_61 = '<div class="cro-ki61_payment cro-ki61_paymentDesktop" style="display:none;">' +
            '<div class="cro-ki61_payment-wrapper">' +
            '<div class="cro-ki61_payment-inner">' +
            '<div class="cro-ki61_payment-header">' +
            '<div class="cro-ki61_payment-content">' +
            '<div class="cro-ki61_payment-text">' +
            '<p>Buy Now, Pay Later from as little as <span></span> per instalment with Payflex</p>' +
            '</div>' +
            '<div class="cro-ki61_payment-icon">' +
            '<img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/Recipe+KI61+%7C+Increase+Prominence+of+Credit+Payment+Options+%7C+ALL+%7C+CRO-4798/ki_61_payment.svg" alt="">' +
            '</div>' +
            '</div>' +
            '<div class="cro-ki61_payment-img">' +
            '<div class="cro-ki61_payment-imgOpen">' +
            '<img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/Recipe+KI61+%7C+Increase+Prominence+of+Credit+Payment+Options+%7C+ALL+%7C+CRO-4798/ki_61_expand_plus.svg" alt="">' +
            '</div>' +
            '<div class="cro-ki61_payment-imgClose">' +
            '<img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/Recipe+KI61+%7C+Increase+Prominence+of+Credit+Payment+Options+%7C+ALL+%7C+CRO-4798/ki_61_expand_minus.svg" alt="">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="cro-ki61_payment-body">' +
            '<div class="cro-ki61_payment-box">' +
            '<h3 class="cro-ki61_payment-title">No interest, no fees. Choose the payment plan that suits you best.</h3>' +
            '<h4 class="cro-ki61_payment-subtitle">How it works:</h4>' +
            '<div class="cro-ki61_payment-step">' +
            '<strong>1. Choose your payment plan</strong>' +
            '<p>Select Payflex at checkout and choose between paying for your order in 4 interest-free payments over 6 weeks OR 3 interest-free payments over 3 paydays.</p>' +
            '</div>' +
            '<div class="cro-ki61_payment-step">' +
            '<strong>2. Get approved</strong>' +
            '<p>You\'ll get an instant response, whereafter you will pay the first instalment. Your order will then be processed immediately!</p>' +
            '</div>' +
            '<div class="cro-ki61_payment-note">' +
            '<strong>Please note</strong>' +
            '<ul>' +
            '<li>You must be 18 years or older</li>' +
            '<li>You must have a valid South African ID</li>' +
            '<li>You must have a debit or credit card issued by Mastercard, Visa, or Amex.</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        var payment_61_mobile = '<div class="cro-ki61_payment cro-ki61_paymentMobile" style="display:none;">' +
            '<div class="cro-ki61_payment-wrapper">' +
            '<div class="cro-ki61_payment-inner">' +
            '<div class="cro-ki61_payment-header">' +
            '<div class="cro-ki61_payment-content">' +
            '<div class="cro-ki61_payment-text">' +
            '<p>Buy Now, Pay Later from as little as <span></span> per instalment with Payflex</p>' +
            '</div>' +
            '<div class="cro-ki61_payment-icon">' +
            '<img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/Recipe+KI61+%7C+Increase+Prominence+of+Credit+Payment+Options+%7C+ALL+%7C+CRO-4798/ki_61_payment.svg" alt="">' +
            '</div>' +
            '</div>' +
            '<div class="cro-ki61_payment-img">' +
            '<div class="cro-ki61_payment-imgOpen">' +
            '<img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/Recipe+KI61+%7C+Increase+Prominence+of+Credit+Payment+Options+%7C+ALL+%7C+CRO-4798/ki_61_expand_plus.svg" alt="">' +
            '</div>' +
            '<div class="cro-ki61_payment-imgClose">' +
            '<img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/Recipe+KI61+%7C+Increase+Prominence+of+Credit+Payment+Options+%7C+ALL+%7C+CRO-4798/ki_61_expand_minus.svg" alt="">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="cro-ki61_payment-body">' +
            '<div class="cro-ki61_payment-box">' +
            '<h3 class="cro-ki61_payment-title">No interest, no fees. Choose the payment plan that suits you best.</h3>' +
            '<h4 class="cro-ki61_payment-subtitle">How it works:</h4>' +
            '<div class="cro-ki61_payment-step">' +
            '<strong>1. Choose your payment plan</strong>' +
            '<p>Select Payflex at checkout and choose between paying for your order in 4 interest-free payments over 6 weeks OR 3 interest-free payments over 3 paydays.</p>' +
            '</div>' +
            '<div class="cro-ki61_payment-step">' +
            '<strong>2. Get approved</strong>' +
            '<p>You\'ll get an instant response, whereafter you will pay the first instalment. Your order will then be processed immediately!</p>' +
            '</div>' +
            '<div class="cro-ki61_payment-note">' +
            '<strong>Please note</strong>' +
            '<ul>' +
            '<li>You must be 18 years or older</li>' +
            '<li>You must have a valid South African ID</li>' +
            '<li>You must have a debit or credit card issued by Mastercard, Visa, or Amex.</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        // ─── Sets cro-price_61 on the price block container (desktop Payflex anchor) ─

        function croOneDayCustom() {
            waitForElement('h2#product-price', function () {
                var element = document.querySelector('h2#product-price');
                var closestAncestor = element
                    && element.closest('[class*="css"]')
                    && element.closest('[class*="css"]').parentElement
                    && element.closest('[class*="css"]').parentElement.closest('[class*="css"]')
                    && element.closest('[class*="css"]').parentElement.closest('[class*="css"]').parentElement
                    && element.closest('[class*="css"]').parentElement.closest('[class*="css"]').parentElement.closest('[class*="css"]')
                    && element.closest('[class*="css"]').parentElement.closest('[class*="css"]').parentElement.closest('[class*="css"]').parentElement;
                if (closestAncestor) {
                    closestAncestor.setAttribute('cro-price_61', 'cro-productPrice_61');
                }
            });


            waitForElement('h2#product-price', function () {
                var element = document.querySelector('h1[font-family="header"]');
                var closestAncestor = element
                    && element.closest('[class*="css"]')
                    && element.closest('[class*="css"]').parentElement
                    && element.closest('[class*="css"]').parentElement.closest('[class*="css"]')
                    && element.closest('[class*="css"]').parentElement.closest('[class*="css"]').parentElement;
                if (closestAncestor) {
                    closestAncestor.setAttribute('cro-heading', 'cro-heading-Parent');
                }
            });

        }

        // ─── Payflex expand/collapse click handler ────────────────────────────────

        function croEventHandler() {
            live('.cro-ki61_payment-header', 'click', function () {
                toggleClass('body', 'cro-61-openDropDown');
                setTimeout(function () {
                    if (window.innerWidth < 1024 && document.querySelector('.cro-61-openDropDown')) {
                        var target = document.querySelector('.cro-ki61_payment-wrapper');
                        if (target) {
                            window.scrollTo({
                                top: target.getBoundingClientRect().top + window.scrollY - 60,
                                behavior: 'smooth'
                            });
                        }
                    }
                }, 100);
            });
        }

        // ─── Init ─────────────────────────────────────────────────────────────────

        function init() {
            document.body.classList.add(VARIATION);
            document.body.classList.add('cro-oneDay-ki_61');

            var etaText = getDeliveryEta();

            croOneDayCustom();
            shipping();
            if (etaText) insertFastShipStrip(etaText);

            // Payflex — mobile (<1024px): inside [cro-quantity="cro-product"]
            if (window.innerWidth < 1024) {
                waitForElement('[cro-quantity="cro-product"]', function () {
                    if (!document.querySelector('.cro-ki61_paymentMobile')) {
                        insertHtml('[cro-quantity="cro-product"]', payment_61_mobile, 'beforeend');
                    }
                });
                waitForElement('[pagepath="gift-vouchers"] [cro-price_61="cro-productPrice_61"]+div', function () {
                    if (!document.querySelector('.cro-ki61_paymentMobile')) {
                        insertHtml('[pagepath="gift-vouchers"] [cro-price_61="cro-productPrice_61"]+div', payment_61_mobile, 'beforebegin');
                    }
                });
            } else {
                // Payflex — desktop (≥1024px): inside price block
                waitForElement('[cro-price_61="cro-productPrice_61"]', function () {
                    if (!document.querySelector('.cro-ki61_paymentDesktop')) {
                        insertHtml('[cro-price_61="cro-productPrice_61"]', payment_61, 'beforeend');
                    }
                });
            }

            // Instalment price calculation
            waitForElement('.cro-ki61_payment-text span', function () {
                var priceText = document.querySelector('#product-price').textContent.replace(/[^\d.]/g, '');
                var instalment = (parseFloat(priceText) / 4).toFixed(2);
                document.querySelector('.cro-ki61_payment-text span').textContent = 'R' + instalment;
            });

        }

        // Hide ETA and affordability teaser rows; if all children are hidden also hide "Excludes shipping" sibling
        function shipping() {
            waitForElement('[cro-price_61="cro-productPrice_61"] button div[font-weight="normal"]', function () {
                var items = document.querySelectorAll('[cro-price_61="cro-productPrice_61"] button div[font-weight="normal"]');
                var buttonsContainer = null;

                for (var i = 0; i < items.length; i++) {
                    var btn = items[i].closest('button');
                    if (btn) {
                        btn.style.display = 'none';
                        buttonsContainer = btn.parentNode;
                    }
                }

                // If every button in the container is now hidden, hide the "Excludes shipping" text sibling
                if (buttonsContainer) {
                    var allButtons = buttonsContainer.querySelectorAll('button');
                    var allHidden = true;
                    for (var j = 0; j < allButtons.length; j++) {
                        if (allButtons[j].style.display !== 'none') {
                            allHidden = false;
                            break;
                        }
                    }
                    if (allHidden) {
                        var outerDiv = buttonsContainer.parentNode;
                        var siblings = outerDiv.children;
                        for (var k = 0; k < siblings.length; k++) {
                            if (siblings[k] !== buttonsContainer) {
                                siblings[k].textContent = 'Shipping calculated at checkout';
                                // siblings[k].style.display = 'none';

                            }
                        }

                        // Tag the padded parent so CSS can remove mobile padding
                        if (outerDiv.parentNode) {
                            outerDiv.parentNode.classList.add('crp-12089-shipping-wrapper');
                        }
                    }
                }

            });
        }

        waitForElement('h2#product-price', function () {
            init();
        });

        if (!window.cro_12089) {
            window.cro_12089 = true;
            croEventHandler();
        }

    } catch (e) { }
})();