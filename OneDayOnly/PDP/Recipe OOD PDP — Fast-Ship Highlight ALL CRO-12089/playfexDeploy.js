(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-oneDay-ki_61";
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

        function insertHtml(selector, content, position) {
            var el = document.querySelector(selector);
            if (!position) {
                position = "afterend";
            }
            if (el && content) {
                el.insertAdjacentHTML(position, content);
            }
        }

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        }

        function toggleClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.toggle(cls);
            }
        }

        function removeClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.contains(cls) && el.classList.remove(cls);
            }
        }

        function trigger() {
            var doneTypingInterval = 9000;  //time in ms, 5 seconds for example
            var intervalCallAgain = setInterval(function () {
                waitForElement('#__next', init);
                croOneDayCustom();
            }, 400);

            //start the countdown
            var Timer = setTimeout(function () {
                clearInterval(intervalCallAgain);
            }, doneTypingInterval);

        }

        var payment_61 = `<div class="cro-ki61_payment cro-ki61_paymentDesktop" style="display:none;">
        <div class="cro-ki61_payment-wrapper">
            <div class="cro-ki61_payment-inner">
                <div class="cro-ki61_payment-header">
                    <div class="cro-ki61_payment-content">
                        <div class="cro-ki61_payment-text">
                            <p>Buy Now, Pay Later from as little as <span></span> per instalment with Payflex</p>
                        </div>
                        <div class="cro-ki61_payment-icon">
                            <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/Recipe+KI61+%7C+Increase+Prominence+of+Credit+Payment+Options+%7C+ALL+%7C+CRO-4798/ki_61_payment.svg" alt="">
                        </div>
                    </div>
                    <div class="cro-ki61_payment-img">
                        <div class="cro-ki61_payment-imgOpen">
                            <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/Recipe+KI61+%7C+Increase+Prominence+of+Credit+Payment+Options+%7C+ALL+%7C+CRO-4798/ki_61_expand_plus.svg" alt="">
                        </div>
                        <div class="cro-ki61_payment-imgClose">
                            <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/Recipe+KI61+%7C+Increase+Prominence+of+Credit+Payment+Options+%7C+ALL+%7C+CRO-4798/ki_61_expand_minus.svg" alt="">
                        </div>
                    </div>
                </div>
                <div class="cro-ki61_payment-body">
                    <div class="cro-ki61_payment-box">
                        <h3 class="cro-ki61_payment-title">No interest, no fees. Choose the payment plan that suits you best.</h3>
                        <h4 class="cro-ki61_payment-subtitle">How it works:</h4>

                        <div class="cro-ki61_payment-step">
                        <strong>1. Choose your payment plan</strong>
                        <p>Select Payflex at checkout and choose between paying for your order in 4 interest-free payments over 6 weeks OR 3 interest-free payments over 3 paydays.</p>
                        </div>

                        <div class="cro-ki61_payment-step">
                        <strong>2. Get approved</strong>
                        <p>You'll get an instant response, whereafter you will pay the first instalment. Your order will then be processed immediately!</p>
                        </div>

                        <div class="cro-ki61_payment-note">
                        <strong>Please note</strong>
                        <ul>
                            <li>You must be 18 years or older</li>
                            <li>You must have a valid South African ID</li>
                            <li>You must have a debit or credit card issued by Mastercard, Visa, or Amex.</li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

        var payment_61_mobile = `<div class="cro-ki61_payment cro-ki61_paymentMobile" style="display:none;">
        <div class="cro-ki61_payment-wrapper">
            <div class="cro-ki61_payment-inner">
                <div class="cro-ki61_payment-header">
                    <div class="cro-ki61_payment-content">
                        <div class="cro-ki61_payment-text">
                            <p>Buy Now, Pay Later from as little as <span></span> per instalment with Payflex</p>
                        </div>
                        <div class="cro-ki61_payment-icon">
                            <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/Recipe+KI61+%7C+Increase+Prominence+of+Credit+Payment+Options+%7C+ALL+%7C+CRO-4798/ki_61_payment.svg" alt="">
                        </div>
                    </div>
                    <div class="cro-ki61_payment-img">
                        <div class="cro-ki61_payment-imgOpen">
                            <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/Recipe+KI61+%7C+Increase+Prominence+of+Credit+Payment+Options+%7C+ALL+%7C+CRO-4798/ki_61_expand_plus.svg" alt="">
                        </div>
                        <div class="cro-ki61_payment-imgClose">
                            <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/Recipe+KI61+%7C+Increase+Prominence+of+Credit+Payment+Options+%7C+ALL+%7C+CRO-4798/ki_61_expand_minus.svg" alt="">
                        </div>
                    </div>
                </div>
                <div class="cro-ki61_payment-body">
                    <div class="cro-ki61_payment-box">
                        <h3 class="cro-ki61_payment-title">No interest, no fees. Choose the payment plan that suits you best.</h3>
                        <h4 class="cro-ki61_payment-subtitle">How it works:</h4>

                        <div class="cro-ki61_payment-step">
                        <strong>1. Choose your payment plan</strong>
                        <p>Select Payflex at checkout and choose between paying for your order in 4 interest-free payments over 6 weeks OR 3 interest-free payments over 3 paydays.</p>
                        </div>

                        <div class="cro-ki61_payment-step">
                        <strong>2. Get approved</strong>
                        <p>You'll get an instant response, whereafter you will pay the first instalment. Your order will then be processed immediately!</p>
                        </div>

                        <div class="cro-ki61_payment-note">
                        <strong>Please note</strong>
                        <ul>
                            <li>You must be 18 years or older</li>
                            <li>You must have a valid South African ID</li>
                            <li>You must have a debit or credit card issued by Mastercard, Visa, or Amex.</li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

        function croOneDayCustom() {
            waitForElement('h2#product-price', function () {
                var element = document.querySelector('h2#product-price');
                var closestAncestor = element?.closest('[class*="css"]')
                    ?.parentElement
                    ?.closest('[class*="css"]')
                    ?.parentElement
                    ?.closest('[class*="css"]')
                    ?.parentElement;
                if (closestAncestor) {
                    closestAncestor.setAttribute('cro-price_61', 'cro-productPrice_61');
                } else {
                    console.log('Could not find all required ancestors');
                }
            });
        }

        function init() {
            addClass("body", variation_name);

            if (window.innerWidth < 1024) {
                waitForElement('[cro-quantity="cro-product"]', function () {
                    if (!document.querySelector(".cro-ki61_paymentMobile")) {
                        insertHtml('[cro-quantity="cro-product"]', payment_61_mobile, "beforeend");
                    }
                });
                waitForElement('[pagepath="gift-vouchers" ] [cro-price_61="cro-productPrice_61"]+div', function () {
                    if (!document.querySelector(".cro-ki61_paymentMobile")) {
                        insertHtml('[pagepath="gift-vouchers" ] [cro-price_61="cro-productPrice_61"]+div', payment_61_mobile, "beforebegin");
                    }
                });
            } else {
                waitForElement('[cro-price_61="cro-productPrice_61"]', function () {
                    if (!document.querySelector(".cro-ki61_paymentDesktop")) {
                        insertHtml('[cro-price_61="cro-productPrice_61"]', payment_61, "beforeend");
                    }
                });
            }

            waitForElement('.cro-ki61_payment-text span', function () {
                var priceText = document.querySelector("#product-price").textContent.replace(/[^\d.]/g, "");
                var price = parseFloat(priceText);

                var instalment = (price / 4).toFixed(2);

                document.querySelector(".cro-ki61_payment-text span").textContent = "R" + instalment;

            });


        }

        function scroll(click, selector) {
            click.addEventListener('click', function (event) {
                event.preventDefault();
                var target = document.querySelector(selector);
                if (target) {
                    window.scrollTo({
                        top: target.getBoundingClientRect().top + window.scrollY,
                        behavior: 'smooth'
                    });
                }
            });
        }

        function croEventHandkler() {
            live(".cro-ki61_payment-header", "click", function () {
                toggleClass("body", "cro-61-openDropDown");

                setTimeout(function () {
                    if (window.innerWidth < 1024) {
                        if (document.querySelector('.cro-61-openDropDown')) {
                            var target = document.querySelector('.cro-ki61_payment-wrapper');
                            if (target) {
                                window.scrollTo({
                                    top: target.getBoundingClientRect().top + window.scrollY - 60,
                                    behavior: 'smooth'
                                });
                            }
                        }
                    }

                }, 100)

            });
        }

        if (!window.cro_t_ki_61) {
            croEventHandkler();
            trigger();
            window.cro_t_ki_61 = true;
        }

        waitForElement('#__next', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();