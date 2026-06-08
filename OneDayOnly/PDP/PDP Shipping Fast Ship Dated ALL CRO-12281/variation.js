// CRO-12281 | OOD PDP — Fast-Ship Dated | ALL
// Build session: 2026-06-07
(function () {
    try {
        var VARIATION = 'cro-t-odo-12281';

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

        // ─── ETA detection + date calculation ────────────────────────────────────

        // Reads the lower bound from "ETA: X-X working days" text on the page
        // using XPath (fast, no JS loop over all elements).
        // Returns 3, 5, or 10 based on the detected range, or null if not found.
        function readEtaDaysFromPage() {
            try {
                var xpResult = document.evaluate(
                    '//*[contains(translate(text(), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "working days")]',
                    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
                );
                var node = xpResult.singleNodeValue;
                if (node) {
                    var match = node.textContent.match(/(\d+)\s*[-–]\s*(\d+)\s*working\s*days/i);
                    if (match) {
                        var lower = parseInt(match[1], 10);
                        if (lower <= 3)  return 3;
                        if (lower <= 5)  return 5;
                        return 10;
                    }
                }
            } catch (e) {}
            return null;
        }

        // Polls until the ETA text is found on the page, then calls cb(days).
        function waitForEtaText(cb, maxTries) {
            var tries = 0;
            var max = maxTries || 200;
            var timer = setInterval(function () {
                var days = readEtaDaysFromPage();
                if (days !== null) {
                    clearInterval(timer);
                    cb(days);
                } else if (++tries >= max) {
                    clearInterval(timer);
                }
            }, 100);
        }

        // Advances `workingDays` business days from today, skipping Sat/Sun.
        // Weekend days that fall within the window are naturally added to the
        // calendar total (per spec: "include weekends and add to the days above").
        function calcDeliveryDate(workingDays) {
            var date = new Date();
            var added = 0;
            while (added < workingDays) {
                date.setDate(date.getDate() + 1);
                var d = date.getDay();
                if (d !== 0 && d !== 6) added++;
            }
            return date;
        }

        function formatDeliveryDate(date) {
            var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var dd = ('0' + date.getDate()).slice(-2);
            return dayNames[date.getDay()] + ', ' + dd + ' ' + monthNames[date.getMonth()];
        }

        // ─── Fast Ship HTML ───────────────────────────────────────────────────────

        function buildFastShipStrip(dateStr) {
            var el = document.createElement('div');
            el.className = 'crp-12281-fast-ship';
            el.style.display = 'none'; // revealed by body.cro-t-odo-12281 CSS rule
            el.innerHTML =
                '<span class="crp-12281-fs-icon" aria-hidden="true">' +
                '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<circle cx="10" cy="10" r="10" fill="#1A9B3C"/>' +
                '<path d="M5.5 10L8.5 13L14.5 7" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
                '</svg>' +
                '</span>' +
                '<span class="crp-12281-fs-label">' +
                '<strong>Fast Shipping</strong>' +
                '<span class="crp-12281-fs-mid"> - Get it by </span>' +
                '<strong>' + dateStr + '</strong>' +
                '</span>';
            return el;
        }

        // ─── Payflex HTML (KI61 / CRO-4798) ──────────────────────────────────────

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

        // ─── Hide ETA and affordability rows; update "Excludes shipping" text ─────

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
                            }
                        }

                        if (outerDiv.parentNode) {
                            outerDiv.parentNode.classList.add('crp-12281-shipping-wrapper');
                        }
                    }
                }
            });
        }

        // ─── Init ─────────────────────────────────────────────────────────────────

        function init(etaDays) {
            document.body.classList.add(VARIATION);
            document.body.classList.add('cro-oneDay-ki_61');

            var dateStr = formatDeliveryDate(calcDeliveryDate(etaDays));

            croOneDayCustom();
            shipping();

            if (window.innerWidth < 1024) {
                // Mobile layout:
                // 1. Fast Ship strip inserted BEFORE the variant/quantity block
                // 2. Payflex inserted AFTER the variant/quantity block
                waitForElement('[cro-quantity="cro-product"]', function () {
                    if (!document.querySelector('.crp-12281-fast-ship')) {
                        var anchor = document.querySelector('[cro-quantity="cro-product"]');
                        anchor.insertAdjacentElement('beforebegin', buildFastShipStrip(dateStr));
                    }
                    if (!document.querySelector('.cro-ki61_paymentMobile')) {
                        insertHtml('[cro-quantity="cro-product"]', payment_61_mobile, 'afterend');
                    }
                });

                // Gift voucher pages use a different structure
                waitForElement('[pagepath="gift-vouchers"] [cro-price_61="cro-productPrice_61"]+div', function () {
                    if (!document.querySelector('.cro-ki61_paymentMobile')) {
                        insertHtml('[pagepath="gift-vouchers"] [cro-price_61="cro-productPrice_61"]+div', payment_61_mobile, 'beforebegin');
                    }
                });

            } else {
                // Desktop layout:
                // 1. Payflex inserted inside the price block (below price, above Fast Ship)
                // 2. Fast Ship inserted immediately after Payflex
                waitForElement('[cro-price_61="cro-productPrice_61"]', function () {
                    if (!document.querySelector('.cro-ki61_paymentDesktop')) {
                        insertHtml('[cro-price_61="cro-productPrice_61"]', payment_61, 'beforeend');
                    }
                });

                waitForElement('.cro-ki61_paymentDesktop', function () {
                    if (!document.querySelector('.crp-12281-fast-ship')) {
                        var anchor = document.querySelector('.cro-ki61_paymentDesktop');
                        anchor.insertAdjacentElement('afterend', buildFastShipStrip(dateStr));
                    }
                });
            }

            // Instalment price: product price ÷ 4, applied to all Payflex instances
            waitForElement('.cro-ki61_payment-text span', function () {
                var priceEl = document.querySelector('#product-price');
                if (!priceEl) return;
                var instalment = (parseFloat(priceEl.textContent.replace(/[^\d.]/g, '')) / 4).toFixed(2);
                var spans = document.querySelectorAll('.cro-ki61_payment-text span');
                for (var i = 0; i < spans.length; i++) {
                    spans[i].textContent = 'R' + instalment;
                }
            });
        }

        // ─── Activation ───────────────────────────────────────────────────────────
        // Parses "ETA: X-X working days" text directly from the DOM —
        // no reliance on injected CSS classes which don't exist on the live page.

        var cro12281Started = false;
        waitForEtaText(function (days) {
            if (!cro12281Started) {
                cro12281Started = true;
                init(days);
            }
        });

        if (!window.cro_12281) {
            window.cro_12281 = true;
            croEventHandler();
        }

    } catch (e) { }
})();