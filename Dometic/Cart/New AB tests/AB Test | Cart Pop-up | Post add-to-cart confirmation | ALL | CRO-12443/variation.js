(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "CRO12443";

        /* all Pure helper functions */

        function waitForElement(selector, trigger) {
            var interval = setInterval(function () {
                if (document.querySelector(selector)) {
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
                    while (el && el.matches && el !== context && !(found = el.matches(selector)))
                        el = el.parentElement;
                    if (found) callback.call(el, e);
                });
            }
            live(selector, event, callback, context);
        }

        /* ── State ── */
        var productData = { name: "", salePrice: "", originalPrice: "", image: "" };
        var addToBagClicked = false;
        var addToBagTimer = null;
        var popupShown = false;

        /* ── Capture product data from page at click time ── */
        function captureProductData() {
            var nameEl = document.querySelector(".product-details h1");
            productData.name = nameEl ? nameEl.textContent.trim() : "";

            var priceEl =
                document.querySelector(".buy-me-box .price-wrapper") ||
                document.querySelector(".buy-me-box [class*='price']") ||
                document.querySelector(".product-details [class*='price']");
            if (priceEl) {
                /* Extract individual currency amounts. Handles both orderings:
                   symbol-first  "Sale price R 2,700.00Original price R 3,000.00" (en-za)
                   symbol-last   "Aktionspreis 879,00 €Originalpreis 1465,00 €"   (de-de)
                   The two alternatives cover: [symbol][number]  and  [number][symbol]. */
                var fullText = priceEl.textContent;
                var amounts = fullText.match(/[R$€£]\s*[\d.,]+|[\d.,]+\s*[R$€£]/g) || [];
                productData.salePrice = amounts[0] ? amounts[0].trim() : "";
                productData.originalPrice = amounts[1] ? amounts[1].trim() : "";
                /* Fallback: if no currency symbol matched, take first non-empty line */
                if (!productData.salePrice) {
                    var lines = fullText.split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
                    productData.salePrice = lines[0] || "";
                }
            }

            var imgEl =
                document.querySelector(".gallery-wrapper [data-slot='carousel-item'] img") ||
                document.querySelector(".media-gallery img") ||
                document.querySelector(".product-details img");
            productData.image = imgEl ? (imgEl.getAttribute("src") || imgEl.src || "") : "";
        }

        /* ── Popup HTML ── */
        var popupHtml =
            '<div class="cro-12443-overlay">' +
            '<div class="cro-12443-popup">' +
            '<div class="cro-12443-header">' +
            '<div class="cro-12443-badge"><svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.44651e-05 4.23082L1.40203 2.82386L3.70388 5.08594L8.8097 -1.3113e-06L10.2216 1.40696L3.70388 7.88991L4.44651e-05 4.23082Z" fill="white"/></svg></div>' +
            '<span class="cro-12443-heading">Added to your bag</span>' +
            '<button class="cro-12443-close" type="button" aria-label="Close">&#x2715;</button>' +
            "</div>" +
            '<div class="cro-12443-divider"></div>' +
            '<div class="cro-12443-product">' +
            '<div class="cro-12443-thumb-wrap">' +
            '<img class="cro-12443-thumb" src="" alt="" loading="lazy">' +
            "</div>" +
            '<div class="cro-12443-info">' +
            '<span class="cro-12443-name"></span>' +
            '<div class="cro-12443-price-wrap">' +
            '<span class="cro-12443-sale-price"></span>' +
            '<span class="cro-12443-original-price"></span>' +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="cro-12443-actions">' +
            '<a href="" class="cro-12443-view-cart">View cart</a>' +
            '<button class="cro-12443-continue" type="button">Continue shopping</button>' +
            "</div>" +
            "</div>" +
            "</div>";

        function injectPopup() {
            if (document.querySelector(".cro-12443-overlay")) return;
            document.body.insertAdjacentHTML("beforeend", popupHtml);
            var t = getLocaleText();
            var heading = document.querySelector(".cro-12443-heading");
            if (heading) heading.textContent = t.heading;
            var cartLink = document.querySelector(".cro-12443-view-cart");
            if (cartLink) { cartLink.href = getCartUrl(); cartLink.textContent = t.viewCart; }
            var continueBtn = document.querySelector(".cro-12443-continue");
            if (continueBtn) continueBtn.textContent = t.continueShopping;
        }

        function populatePopup() {
            var thumb = document.querySelector(".cro-12443-thumb");
            if (thumb) {
                thumb.src = productData.image;
                thumb.alt = productData.name;
            }
            var nameEl = document.querySelector(".cro-12443-name");
            if (nameEl) nameEl.textContent = productData.name;

            var salePriceEl = document.querySelector(".cro-12443-sale-price");
            if (salePriceEl) salePriceEl.textContent = productData.salePrice;

            var origPriceEl = document.querySelector(".cro-12443-original-price");
            if (origPriceEl) {
                origPriceEl.textContent = productData.originalPrice;
                origPriceEl.style.display = productData.originalPrice ? "" : "none";
            }

            /* Red sale price only when an original (strikethrough) price also exists */
            var priceWrap = document.querySelector(".cro-12443-price-wrap");
            if (priceWrap) {
                priceWrap.classList.toggle("cro-12443-price-wrap--sale", !!productData.originalPrice);
            }
        }

        function showPopup() {
            if (popupShown) return;
            popupShown = true;
            populatePopup();

            var overlay = document.querySelector(".cro-12443-overlay");
            if (!overlay) return;
            overlay.classList.add("cro-12443-overlay--visible");

            var popup = overlay.querySelector(".cro-12443-popup");
            if (popup) {
                requestAnimationFrame(function () {
                    popup.classList.add("cro-12443-popup--visible");
                });
            }
        }

        function closePopup() {
            var overlay = document.querySelector(".cro-12443-overlay");
            if (!overlay) return;
            var popup = overlay.querySelector(".cro-12443-popup");
            if (popup) popup.classList.remove("cro-12443-popup--visible");
            setTimeout(function () {
                overlay.classList.remove("cro-12443-overlay--visible");
                popupShown = false;
            }, 320);
        }

        /* ── Patch fetch to detect successful add-to-bag API response ──
           Only intercepts non-GET requests that follow a button click.
           Returns the original promise unmodified so existing site logic is unaffected. ── */
        function patchFetch() {
            if (window._cro12443FetchPatched) return;
            window._cro12443FetchPatched = true;

            var _orig = window.fetch;
            window.fetch = function (input, init) {
                var method = "GET";
                if (init && init.method) {
                    method = init.method.toUpperCase();
                } else if (input && typeof input === "object" && input.method) {
                    method = input.method.toUpperCase();
                }

                var promise = _orig.apply(window, arguments);

                if (addToBagClicked && method !== "GET" && method !== "HEAD") {
                    promise.then(function (response) {
                        try {
                            if (response && response.ok && addToBagClicked) {
                                clearTimeout(addToBagTimer);
                                addToBagClicked = false;
                                showPopup();
                            }
                        } catch (err) { /* silent — never interrupt site fetch chain */ }
                    }, function () { /* request rejected — timer clears flag */ });
                }

                return promise;
            };
        }

        /* ── Patch XHR as a fallback — some Shopify/Next apps use XHR not fetch ── */
        function patchXHR() {
            if (window._cro12443XHRPatched) return;
            window._cro12443XHRPatched = true;

            var _open = XMLHttpRequest.prototype.open;
            var _send = XMLHttpRequest.prototype.send;

            XMLHttpRequest.prototype.open = function (method) {
                this._cro12443_method = (method || "GET").toUpperCase();
                return _open.apply(this, arguments);
            };

            XMLHttpRequest.prototype.send = function () {
                var method = this._cro12443_method || "GET";
                if (addToBagClicked && method !== "GET" && method !== "HEAD") {
                    var xhr = this;
                    xhr.addEventListener("load", function () {
                        if (addToBagClicked && xhr.status >= 200 && xhr.status < 300) {
                            clearTimeout(addToBagTimer);
                            addToBagClicked = false;
                            showPopup();
                        }
                    });
                }
                return _send.apply(this, arguments);
            };
        }

        /* ── Locale-aware UI strings ── */
        function getLocaleText() {
            var lang = (window.location.pathname.split("/")[1] || "").split("-")[0].toLowerCase();
            var map = {
                de: {
                    heading: "In den Warenkorb gelegt",
                    viewCart: "Warenkorb ansehen",
                    continueShopping: "Weiter einkaufen",
                },
            };
            return map[lang] || {
                heading: "Added to your bag",
                viewCart: "View cart",
                continueShopping: "Continue shopping",
            };
        }

        /* ── Derive locale-aware cart URL from the current page URL ──
           Verified live against Dometic's site: de→warenkorb, fr→panier, nl→winkelwagen,
           it→carrello, es→carrito, pl→koszyk. All others (en, sv, da, fi, pt, …) use "cart". */
        function getCartUrl() {
            var locale = (window.location.pathname.split("/")[1] || "en-za").toLowerCase();
            var lang = locale.split("-")[0];
            var slugs = { de: "warenkorb", fr: "panier", nl: "winkelwagen", it: "carrello", es: "carrito", pl: "koszyk" };
            return window.location.origin + "/" + locale + "/" + (slugs[lang] || "cart");
        }

        function onATBClick() {
            captureProductData();
            addToBagClicked = true;
            clearTimeout(addToBagTimer);
            addToBagTimer = setTimeout(function () {
                addToBagClicked = false;
            }, 10000);
        }

        /* ── Init ── */
        function init() {
            addClass("body", variation_name);
            injectPopup();
            patchFetch();
            patchXHR();

            /* React/Next.js hydration (~2s after load) can wipe the body class and
               remove injected DOM nodes it doesn't recognise. Poll for 10s and restore
               both if they disappear. Interval stops itself after the hydration window. */
            var hydrationGuard = setInterval(function () {
                if (!document.body.classList.contains(variation_name)) {
                    document.body.classList.add(variation_name);
                }
                if (!document.querySelector(".cro-12443-overlay")) {
                    injectPopup();
                }
            }, 300);
            setTimeout(function () { clearInterval(hydrationGuard); }, 6000);
        }

        /* ── Event handlers ── */
        function croEventHandler() {
            /* ATB button — capture phase so React 17+ stopPropagation cannot block us.
               The real ATB button (button.bg-primary[aria-label="Add to bag"]) sits OUTSIDE
               .buy-me-box, and React intercepts bubble-phase clicks before they reach document.
               Capture fires before React touches the event. Walk up 3 levels to handle clicks
               on inner SVG/span children. */
            // document.addEventListener("click", function (e) {
            //     var el = e.target;
            //     for (var i = 0; i < 3 && el && el.tagName; i++) {
            //         if (el.tagName === "BUTTON") {
            //             var ariaLabel = (el.getAttribute("aria-label") || "").toLowerCase();
            //             var text = (el.textContent || "").trim().toLowerCase();
            //             var inBuyBox = !!(el.closest && el.closest(".buy-me-box"));
            //             /* "Add to bag" anywhere = Dometic's sticky CTA (outside .buy-me-box).
            //                "Add to cart" and submit only inside .buy-me-box to avoid false
            //                positives from related-product tile buttons. */
            //             var isATB =
            //                 ariaLabel === "add to bag" ||
            //                 ariaLabel === "In den Warenkorb" ||
            //                 (inBuyBox && el.type === "submit") ||
            //                 (inBuyBox && ariaLabel.indexOf("add to cart") !== -1) ||
            //                 (inBuyBox && ariaLabel.indexOf("In den Warenkorb") !== -1) ||
            //                 (text === "add to bag");
            //             if (isATB) {
            //                 onATBClick();
            //                 return;
            //             }
            //         }
            //         el = el.parentElement;
            //     }
            // }, true);

            document.addEventListener("click", function (e) {
                var el = e.target;
                for (var i = 0; i < 3 && el && el.tagName; i++) {
                    if (el.tagName === "BUTTON") {
                        var ariaLabel = (el.getAttribute("aria-label") || "").toLowerCase();
                        var text = (el.textContent || "").trim().toLowerCase();
                        var inBuyBox = !!(el.closest && el.closest(".buy-me-box"));
                        /* "Add to bag" anywhere = Dometic's sticky CTA (outside .buy-me-box).
                           "Add to cart" and submit only inside .buy-me-box to avoid false
                           positives from related-product tile buttons. */
                        var isATB =
                            ariaLabel === "add to bag" ||
                            ariaLabel === "in den warenkorb" ||
                            (inBuyBox && el.type === "submit") ||
                            (inBuyBox && ariaLabel.indexOf("add to cart") !== -1) ||
                            (inBuyBox && ariaLabel.indexOf("in den warenkorb") !== -1) ||
                            (text === "add to bag");
                        if (isATB) {
                            onATBClick();
                            return;
                        }
                    }
                    el = el.parentElement;
                }
            }, true);

            /* Backdrop click closes popup */
            live(".cro-12443-overlay", "click", function (e) {
                if (e.target && e.target.classList && e.target.classList.contains("cro-12443-overlay")) {
                    closePopup();
                }
            });

            /* Close (✕) button */
            live(".cro-12443-close, .cro-12443-view-cart", "click", function () {
                closePopup();
            });

            /* Continue shopping */
            live(".cro-12443-continue", "click", function () {
                closePopup();
            });
        }

        if (!window.cro_12443) {
            window.cro_12443 = true;
            croEventHandler();
        }

        waitForElement(".product-details", init);

    } catch (e) {
        if (debug) console.log(e, "error in Test " + variation_name);
    }
})();