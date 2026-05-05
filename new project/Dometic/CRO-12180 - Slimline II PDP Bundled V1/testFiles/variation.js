(function () {
  try {
    /* main variables */
    var debug = 1;
    var variation_name = "CRO_12180_Slimline_PDP_V1";

    /* ── Helper functions ── */
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

    function innerHTMLContent(selector, content) {
      var el = document.querySelector(selector);
      if (el) {
        el.innerHTML = content;
      }
    }

    function innerChildContent(selector, childNumber, content) {
      var el = document.querySelector(selector);
      if (el.hasChildNodes()) {
        el.childNodes[childNumber].textContent = content;
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

    function waitForSwiper(trigger) {
      var interval = setInterval(function () {
        if (typeof window.Swiper != "undefined") {
          clearInterval(interval);
          trigger();
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 15000);
    }

    function addScript() {
      var scriptOne = document.createElement("script");
      scriptOne.src = "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.min.js";
      document.querySelector("head").appendChild(scriptOne);

      var swiperCss = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.css" crossorigin="anonymous" referrerpolicy="no-referrer" />';
      document.querySelector("head").insertAdjacentHTML("beforeend", swiperCss);
    }

    function initializeSwiper() { }

    /* ── SVG Icons ── */
    var svg_star = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="#F5A623" aria-hidden="true"><path d="M8 1l1.854 3.756 4.146.603-3 2.924.708 4.131L8 10.25l-3.708 2.164.708-4.131-3-2.924 4.146-.603z"/></svg>';

    var svg_warranty = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2.5L3.5 5.25v4.5c0 3.9 2.8 7.55 6.5 8.5 3.7-.95 6.5-4.6 6.5-8.5v-4.5L10 2.5z" stroke="#0d0d0d" stroke-width="1.4" stroke-linejoin="round"/><path d="M7 10l2 2 4-4" stroke="#0d0d0d" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var svg_returns = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.5 10a6.5 6.5 0 1 0 6.5-6.5A6.5 6.5 0 0 0 5 5.5L3.5 7" stroke="#0d0d0d" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.5 4v3h3" stroke="#0d0d0d" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var svg_shipping = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M1.5 4h10v8.5h-10z" stroke="#0d0d0d" stroke-width="1.4" stroke-linejoin="round"/><path d="M11.5 7h4l2.5 3v2.5h-6.5V7z" stroke="#0d0d0d" stroke-width="1.4" stroke-linejoin="round"/><circle cx="5" cy="14" r="1.5" stroke="#0d0d0d" stroke-width="1.4"/><circle cx="15" cy="14" r="1.5" stroke="#0d0d0d" stroke-width="1.4"/></svg>';

    var svg_verified = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
  <path d="M10.8711 0.75908L3.83137 7.86966C3.79051 7.91098 3.74199 7.94376 3.68857 7.96612C3.63516 7.98849 3.57791 8 3.52009 8C3.46227 8 3.40501 7.98849 3.3516 7.96612C3.29819 7.94376 3.24966 7.91098 3.2088 7.86966L0.128939 4.75878C0.0463807 4.67539 0 4.56229 0 4.44436C0 4.32643 0.0463807 4.21333 0.128939 4.12994C0.211497 4.04655 0.32347 3.9997 0.440225 3.9997C0.55698 3.9997 0.668953 4.04655 0.751511 4.12994L3.52009 6.92695L10.2485 0.130237C10.331 0.0468476 10.443 -8.78652e-10 10.5598 0C10.6765 8.78653e-10 10.7885 0.0468476 10.8711 0.130237C10.9536 0.213627 11 0.326728 11 0.444658C11 0.562589 10.9536 0.67569 10.8711 0.75908Z" fill="#488350"/>
</svg>`;

    var svg_payflex = '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="22" viewBox="0 0 60 22" aria-label="Payflex"><rect width="60" height="22" rx="4" fill="#6B46C1"/><text x="30" y="15" font-family="Arial,sans-serif" font-size="10" fill="#fff" text-anchor="middle" font-weight="700">payflex</text></svg>';

    /* ── Injection flags — closure-level, immune to DOM changes ── */
    var injected = { usps: false, testimonial: false };

    /* ── HTML Blocks ── */
    var html_payflex =
      '<div class="cro-12180-payflex" data-cro12180="payflex">' +
      '<span class="cro-12180-payflex__logo">' + svg_payflex + '</span>' +
      '<span class="cro-12180-payflex__text">' +
      '<strong>Buy now. Pay later. 0% interest.</strong> ' +
      'Choose your payment plan, and pay from as little as R4,533.33 today. ' +
      '<a href="#" class="cro-12180-payflex__link">Learn more</a>' +
      '</span>' +
      '</div>';

    var html_usps =
      '<div class="cro-12180-usps" data-cro12180="usps" style="display:none">' +
      '<div class="cro-12180-usp-item">' +
      '<span class="cro-12180-usp-icon">' + svg_warranty + '</span>' +
      '<span class="cro-12180-usp-text">5-Year Warranty</span>' +
      '</div>' +
      '<div class="cro-12180-usp-item">' +
      '<span class="cro-12180-usp-icon">' + svg_returns + '</span>' +
      '<span class="cro-12180-usp-text">30-Day Returns</span>' +
      '</div>' +
      '<div class="cro-12180-usp-item">' +
      '<span class="cro-12180-usp-icon">' + svg_shipping + '</span>' +
      '<span class="cro-12180-usp-text">Free Shipping on Rack Kits</span>' +
      '</div>' +
      '</div>';


    /* ── Price row: align price and official-store badge on same row ── */

    function fixPriceAlignment() {
      console.log('add')
      var imgEl = document.querySelector('.buy-me-box #Background');
      if (!imgEl) return; // no official store badge on this product — keep retrying

      var priceWrapperEl = document.querySelector('.product-details .buy-me-box .price-wrapper');
      if (!priceWrapperEl) return;

      var officialStoreEl = imgEl.closest('div');
      if (!officialStoreEl) return;

      // Always re-apply classes on every trigger cycle — idempotent, handles SPA re-renders
      priceWrapperEl.parentNode.classList.add('cro-12180-price-container');

      if (document.querySelector('.cro-12180-official-store')) {
        officialStoreEl.classList.add('cro-12180-official-store-original');
        return;
      }

      // First injection: clone before adding class so clone stays clean
      var clone = officialStoreEl.cloneNode(true);
      officialStoreEl.classList.add('cro-12180-official-store-original');
      var wrapper = document.createElement('div');
      wrapper.className = 'cro-12180-official-store';
      wrapper.style.display = 'none';
      wrapper.appendChild(clone);
      priceWrapperEl.insertAdjacentElement('afterend', wrapper);
    }

    /* ── Move product-stock below payflex widget once it loads ── */
    function moveStockBelowPayflex() {
      var payflexEl = document.querySelector('body.CRO_12180_Slimline_PDP_V1 .buy-me-box>div .product-form .payflex-product-widget');
      if (!payflexEl) return;
      if (!document.querySelector('body.CRO_12180_Slimline_PDP_V1 .buy-me-box>div .product-form .product-stock')) {
        var stockEl = document.querySelector('body.CRO_12180_Slimline_PDP_V1 .buy-me-box>div .product-stock');
        if (stockEl) payflexEl.insertAdjacentElement('afterend', stockEl);
      }
    }

    /* ── Change 2: Payflex BNPL widget ── */
    function injectPayflex() {
      if (document.querySelector('[data-cro12180="payflex"]')) return;
      insertHtml('.product-details .buy-me-box .price-wrapper', html_payflex, 'afterend');
    }

    /* ── Change 3: USP badges ── */
    function injectUsps() {
      // if (injected.usps) return;
      injected.usps = true;

      if (!document.querySelector('.cro-12180-usps')) {
        insertHtml('.product-actions.mt-4.flex.flex-col.gap-2', html_usps, 'afterend');
      }

      injectTestimonial();
    }

    /* ── Change 4: Testimonial — fetched from Yotpo API using SKU ── */
    function injectTestimonial() {
      // if (injected.testimonial) return;
      injected.testimonial = true;

      var skuInput = document.querySelector('.buy-me-box form input[name="sku"]');
      if (!skuInput || !skuInput.value) {
        if (debug) console.log('[CRO-12180] SKU input not found');
        injected.testimonial = false;
        return;
      }

      var productId = skuInput.value.trim();
      var apiUrl = 'https://api-cdn.yotpo.com/v3/storefront/store/TM12j6DD0Fk8wfSHfDMlJefzIuTiVFHiuRc3ABWu/product/' + productId + '/reviews?page=1&perPage=6&sort=rating,smart,images,date,badge';

      if (debug) console.log('[CRO-12180] fetching reviews for SKU:', productId);

      fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers: { 'accept': 'application/json', 'content-type': 'application/json' }
      })
        .then(function (response) { return response.json(); })
        .then(function (data) {
          if (debug) console.log('[CRO-12180] API response:', JSON.stringify(data).slice(0, 500));

          var reviews = data && data.reviews ? data.reviews : [];
          if (!reviews.length) {
            if (debug) console.log('[CRO-12180] no reviews found');
            return;
          }

          var first = reviews[0];
          if (debug) console.log('[CRO-12180] first review:', JSON.stringify(first).slice(0, 500));

          var quote = first.content ? '"' + first.content.trim() + '"' : '';
          var author = (first.user && first.user.displayName)
            ? '— ' + first.user.displayName.trim()
            : (first.displayName ? '— ' + first.displayName.trim() : '');

          var isVerified = (Array.isArray(first.badges) && first.badges.indexOf('verified_buyer') !== -1) ||
            (first.badges && first.badges.verified_buyer) ||
            first.verifiedBuyer || false;
          var verifiedHtml = isVerified ? '<span class="cro-12180-testimonial__verified">' + svg_verified + ' Verified Buyer</span>' : '';

          if (!quote) return;

          var score = Math.round(first.score) || 5;
          var svg_star_empty = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1l1.854 3.756 4.146.603-3 2.924.708 4.131L8 10.25l-3.708 2.164.708-4.131-3-2.924 4.146-.603z" stroke="#FFBE01" stroke-width="1"/></svg>';
          var reviewStars = '';
          for (var i = 1; i <= 5; i++) {
            reviewStars += i <= score ? svg_star : svg_star_empty;
          }

          var dynamicTestimonial =
            '<div class="cro-12180-testimonial" data-cro12180="testimonial" style="display:none">' +
            '<div><div class="cro-12180-testimonial__stars" aria-label="' + score + ' out of 5 stars">' + reviewStars + '</div>' +
            '<p class="cro-12180-testimonial__quote">' + quote + '</p></div>' +
            '<div class="cro-12180-testimonial__meta">' +
            '<span class="cro-12180-testimonial__author">' + author + '</span>' +
            verifiedHtml +
            '</div>' +
            '</div>';

          var insertAfter = document.querySelector('[data-cro12180="usps"]') ||
            document.querySelector('.product-details .buy-me-box .product-stock');
          if (insertAfter && !document.querySelector('.cro-12180-testimonial')) insertAfter.insertAdjacentHTML('afterend', dynamicTestimonial);
        })
        .catch(function (e) {
          injected.testimonial = false;
          if (debug) console.log('[CRO-12180] Yotpo API error:', e);
        });
    }

    /* ── Change 5: Sticky ATC bar (mobile only) ── */
    function buildStickyBar() {
      if (document.querySelector('[data-cro12180="sticky"]')) return;

      var nameEl = document.querySelector('.product-details h1');
      var priceEl = document.querySelector('.product-details .buy-me-box .price-wrapper');
      var imgEl = document.querySelector('.product-details [class*="gallery"] img, .product-details img');

      var productName = nameEl ? nameEl.textContent.trim() : '';
      var productPrice = priceEl ? priceEl.textContent.trim() : '';
      var productImg = imgEl ? imgEl.src : '';

      var thumbHtml = productImg
        ? '<img class="cro-12180-sticky__thumb" src="' + productImg + '" alt="" />'
        : '';

      var html_sticky =
        '<div class="cro-12180-sticky" data-cro12180="sticky" aria-hidden="true" style="display:none">' +
        '<div class="cro-12180-sticky__inner">' +
        thumbHtml +
        '<div class="cro-12180-sticky__info">' +
        '<span class="cro-12180-sticky__name">' + productName + '</span>' +
        '<span class="cro-12180-sticky__price">' + productPrice + '</span>' +
        '</div>' +
        '<button class="cro-12180-sticky__btn" type="button">Add to bag</button>' +
        '</div>' +
        '</div>';

      document.body.insertAdjacentHTML('beforeend', html_sticky);

      var atcBtn = document.querySelector('.product-details .buy-me-box button[type="submit"]')
        || document.querySelector('.product-details .buy-me-box button');

      if (atcBtn && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
          var sticky = document.querySelector('[data-cro12180="sticky"]');
          if (!sticky) return;
          sticky.classList.toggle('cro-12180-sticky--visible', !entries[0].isIntersecting);
        }, { threshold: 0 });
        observer.observe(atcBtn);
      }

    }

    /* ── Watch buy box for Vue re-renders and re-apply classes ── */
    function watchBuyBox() {
      if (window.cro_12180_watching) return;
      var buyBox = document.querySelector('.product-details .buy-me-box');
      if (!buyBox) return;
      window.cro_12180_watching = true;

      var debounce;
      new MutationObserver(function () {
        clearTimeout(debounce);
        debounce = setTimeout(fixPriceAlignment, 400);
      }).observe(buyBox, { childList: true, subtree: true });
    }

    /* ── Init ── */
    function init() {
      addClass('body', variation_name);
      // waitForElement('.product-details .buy-me-box .price-wrapper', injectPayflex);
      waitForElement('.product-details .buy-me-box .price-wrapper', fixPriceAlignment);
      waitForElement('.product-actions.mt-4.flex.flex-col.gap-2', injectUsps);
      waitForElement('.buy-me-box>div .product-form .payflex-product-widget', moveStockBelowPayflex);
      // waitForElement('.product-details .buy-me-box', buildStickyBar);
      waitForElement('.product-details .buy-me-box', watchBuyBox);
    }

    function trigger() {
      var intervalCallAgain = setInterval(function () {
        waitForElement('.product-details', init);
      }, 400);
      setTimeout(function () {
        clearInterval(intervalCallAgain);
      }, 7000);
    }

    function croEventHandkler() {
      live('.cro-12180-sticky__btn', 'click', function () {
        var mainBtn = document.querySelector('.product-details .buy-me-box button[type="submit"]')
          || document.querySelector('.product-details .buy-me-box button');
        if (mainBtn) mainBtn.click();
      });
    }

    if (!window.cro_t_12180) {
      croEventHandkler();
      window.cro_t_12180 = true;
    }

    waitForElement('body', trigger);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
