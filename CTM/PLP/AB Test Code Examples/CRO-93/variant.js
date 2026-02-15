(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "";
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
            // helper for enabling IE 8 event bindings
            function addEvent(el, type, handler) {
                if (el.attachEvent) el.attachEvent("on" + type, handler);
                else el.addEventListener(type, handler);
            }
            // matches polyfill
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
            // live binding helper using matchesSelector
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
        function listener() {
            /* These are the modifications: */
            window.addEventListener('locationchange', function () {
                trigger();
            });
            history.pushState = (f => function pushState() {
                var ret = f.apply(this, arguments);
                window.dispatchEvent(new Event('pushstate'));
                window.dispatchEvent(new Event('locationchange'));
                return ret;
            })(history.pushState);
            history.replaceState = (f => function replaceState() {
                var ret = f.apply(this, arguments);
                window.dispatchEvent(new Event('replacestate'));
                window.dispatchEvent(new Event('locationchange'));
                return ret;
            })(history.replaceState);
            window.addEventListener('popstate', () => {
                window.dispatchEvent(new Event('locationchange'))
            });
        }
        function dynamicLink(url, callback) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var getNav = document.createElement('div');
                    getNav.innerHTML = this.responseText;
                    // Fetch product price
                    var priceElement = getNav.querySelector('.product-info-price .uom-display');
                    if (priceElement !== null) {
                        var priceValue = priceElement.innerHTML
                        callback(priceValue);
                    }
                }
            };
            xhttp.open("GET", url, true);
            xhttp.send();
        }
        function trigger() {
            var doneTypingInterval = 4000;  //time in ms, 5 seconds for example
            var intervalCallAgain = setInterval(function () {
                init();
            }, 400);
            //start the countdown
            var Timer = setTimeout(function () {
                clearInterval(intervalCallAgain);
            }, doneTypingInterval);
        }
        listener();
        trigger();
        /* Variation Init */
        function init() {
            addClass("body", "cro-blank_canvas")
            waitForElement('.hasImageLabel [src="https://www.ctm.co.za/media/amasty/amlabel/CT2640_-_Website_Banner_Triangles_200x2005.png"]', function () {
                document.querySelectorAll('li.item.product-item').forEach(function (e) {
                    var onlineOnly = e.querySelector('.hasImageLabel [src="https://www.ctm.co.za/media/amasty/amlabel/CT2640_-_Website_Banner_Triangles_200x2005.png"]')
                    if (onlineOnly) {
                        onlineOnly.src = 'https://cdn-3.convertexperiments.com/uf/1004973/10041240/ribbon-online-only.png';
                    }
                })
            })
            waitForElement('.hasImageLabel [src="https://www.ctm.co.za/media/amasty/amlabel/Label-for-April_1.png"]', function () {
                document.querySelectorAll('li.item.product-item').forEach(function (e) {
                    var bestSeller = e.querySelector('.hasImageLabel [src="https://www.ctm.co.za/media/amasty/amlabel/Label-for-April_1.png"]')
                    if (bestSeller) {
                        bestSeller.src = 'https://cdn-3.convertexperiments.com/uf/1004973/10041240/ribbon-best-seller.png';
                    }
                })
            })
            waitForElement('.hasImageLabel [src="https://www.ctm.co.za/media/amasty/amlabel/CT2640_-_Website_Banner_Triangles_200x2003.png"]', function () {
                document.querySelectorAll('li.item.product-item').forEach(function (e) {
                    var newProduct = e.querySelector('.hasImageLabel [src="https://www.ctm.co.za/media/amasty/amlabel/CT2640_-_Website_Banner_Triangles_200x2003.png"]')
                    if (newProduct) {
                        newProduct.src = 'https://cdn-3.convertexperiments.com/uf/1004973/10041240/ribbon-new.png';
                    }
                })
            })
            waitForElement('.hasImageLabel [src="https://www.ctm.co.za/media/amasty/amlabel/Splash.png"]', function () {
                document.querySelectorAll('li.item.product-item').forEach(function (e) {
                    var newProduct = e.querySelector('.hasImageLabel [src="https://www.ctm.co.za/media/amasty/amlabel/Splash.png"]')
                    if (newProduct) {
                        newProduct.src = 'https://cdn-3.convertexperiments.com/uf/1004973/10041240/ribbon-sale.png';
                    }
                })
            })
            waitForElement("li.item.product-item .product-item-photo .product-item-details .product-item-link , .price-box.price-final_price", function () {
                document.querySelectorAll('li.item.product-item').forEach(function (e) {
                    var croProtitle = e.querySelector('.product-item-photo .product-item-details');
                    var croProPrice = e.querySelector('.price-box.price-final_price');
                    var croProLink = e.querySelector('.product-item-details .product-item-link');
                    var croProImg = e.querySelector('.product-item-photo .product-photo-actions');
                    if (!e.querySelector('.cro-heartIcon') && croProImg) {
                        croProImg.insertAdjacentHTML('beforebegin', '<div class="cro-heartIcon"><div class="cro-heartIcon-wrapper"><img src="https://www.ctm.co.za/static/version1696593472/frontend/Vectra/ctmkenya/en_US/images/icons/not-in-wishlist.png" alt="" class="cro-heartIcon-img"></div></div>');
                    }
                    if (!e.querySelector(".cro-roomBox") && croProPrice) {
                        croProPrice.insertAdjacentHTML('afterend', '<div class="cro-roomBox"><h2 class="cro-roomBox-text"><span class="cro-room"></span></h2></div>')
                        dynamicLink(croProLink.href, function (price) {
                            var priceElement = e.querySelector('h2.cro-roomBox-text .cro-room');
                            if (priceElement !== null) {
                                priceElement.innerHTML = price;
                            }
                        });
                    }
                    if (!e.querySelector(".cro-display-button") && e.querySelector('.roomvo-product-display-button')) {
                        croProtitle.insertAdjacentHTML('afterbegin', '<div class="cro-display-button"><div class="cro-display-button-wrapper"><div class="cro-display-viewRoom viewRoom-360"><div class="cro-display-viewRoom-img"><img src="https://cdn-3.convertexperiments.com/uf/1004973/10041240/icon-eye%20(1).png" alt="" class="cro-display-viewRomm-imgImg"></div> <div class="cro-display-viewRoom-text"><h2 class="cro-display-viewRoom-textTxt">View in my room</h2></div></div><div class="cro-display-viewRoom viewRoom-3d"><div class="cro-display-viewRoom-img"><img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/360-degrees%20png-01.png" alt="" class="cro-display-viewRomm-imgImg"></div><div class="cro-display-viewRoom-text"><h2 class="cro-display-viewRoom-textTxt">View in 3D</h2></div></div></div></div>')
                    }
                    if (!e.querySelector(".cro-labels") && e.querySelector('.product-item-photo .product-labels .sale-label')) {
                        var price = e.querySelector('.product-item-photo .product-labels .sale-label').innerHTML
                        croProPrice.insertAdjacentHTML('beforebegin', '<div class="cro-labels"><div class="cro-labels-text">' + price + ' Off</div></div>')
                    }
                });
            });
            waitForElement(".cro-labels-text", function () {
                var croLabelsTextElements = document.querySelectorAll('.cro-labels-text');
                croLabelsTextElements.forEach(function(element) {
                var labelText = element.textContent;
                var cleanedText = labelText.replace('-', '');
                element.textContent = cleanedText;
                });
            });
        }
        live(".cro-heartIcon", "click", function (e) {
            var croHeartIcon = this;
            var parent = croHeartIcon.closest('li.item.product-item');
            if (parent) {
                var parentChild = parent.querySelector('.action.towishlist.guest.guest');
                if (parentChild) {
                    parentChild.click();
                }
            }
        });
        live(".cro-display-viewRoom.viewRoom-360", "click", function (e) {
            var croHeartIcon = this;
            var parent = croHeartIcon.closest('li.item.product-item');
            if (parent) {
                var parentChild = parent.querySelector('.roomvo-stimr');
                if (parentChild) {
                    parentChild.click();
                }
            }
        });
        live(".cro-display-viewRoom.viewRoom-3d", "click", function (e) {
            var croHeartIcon3d = this;
            var parent = croHeartIcon3d.closest('li.item.product-item');
            if (parent) {
                var parentChild = parent.querySelector('.roomvo-product-display-button');
                if (parentChild) {
                    parentChild.click();
                }
            }
        });
        /* Initialise variation */
        waitForElement('li.item.product-item', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();