(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "cro-7972";
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

    function initializeSwiper() {
      var galleryThumb = new Swiper(".cro_12_32_47-swiper-thumb-wrapper", {
        slidesPerView: 5,
        spaceBetween: 10,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        slidesPerGroup: 1,
        breakpoints: {
          767: {
            spaceBetween: 12,
          },
        },
      });

      var galleryTop = new Swiper(".cro_12_32_47-swiper-wrapper", {
        slidesPerView: 1,
        loop: false,
        centeredSlides: false,
        navigation: {
          nextEl: ".cro_12_32_47-next",
          prevEl: ".cro_12_32_47-prev",
        },
        speed: 300,
        spaceBetween: 10,
        thumbs: {
          swiper: galleryThumb,
        },
      });
    }

    function movePromoBanners() {
      var banners = document.querySelectorAll('#ProductsContainer > div:not([data-template="GridViewItem"])');
      if (!banners.length) return;

      var empty = document.createElement('div');
      empty.className = 'cro-7972-promo-banners__empty';

      var cards = document.createElement('div');
      cards.className = 'cro-7972-promo-banners__cards';

      banners.forEach(function (banner) {
        cards.appendChild(banner.cloneNode(true));
      });

      var inner = document.createElement('div');
      inner.className = 'cro-7972-promo-banners__inner';
      inner.appendChild(empty);
      inner.appendChild(cards);

      var wrapper = document.createElement('div');
      wrapper.className = 'cro-7972-promo-banners';
      wrapper.appendChild(inner);

      var productList = document.querySelector('#productList');
      if (!productList) return;
      var productContainer = productList.closest('.content-container');
      if (!productContainer) return;

      if (!document.querySelector('.cro-7972-promo-banners')) {
        productContainer.insertAdjacentElement('afterend', wrapper);
      }

    }

    function injectCategoryHeading() {
      if (document.querySelector('.cro-7972-injected-heading')) return;

      var categoryName = '';

      // Priority 1: use h2.plp-header text
      var plpHeader = document.querySelector('h2.plp-header');
      if (plpHeader) {
        categoryName = plpHeader.textContent.trim()
          .replace(/^shop\s+all\s+/i, '').replace(/^shop\s+/i, '').trim();
      }

      // Priority 2: derive from URL — but only on platform category pages.
      // Bug 3 fix: if the page has a plain editorial h2 (no dw-mod class) and no
      // plp-header, this is a custom editorial page with its own heading — don't inject.
      if (!categoryName) {
        var editorialH2 = Array.prototype.find.call(
          document.querySelectorAll('.content-row__item__body h2'),
          function (h2) {
            return !h2.classList.contains('dw-mod') && !h2.classList.contains('plp-header');
          }
        );
        if (editorialH2) return;

        var segments = window.location.pathname.split('/').filter(function (s) { return s.length > 0; });
        var lastSegment = segments[segments.length - 1] || '';
        categoryName = lastSegment.replace(/-/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
      }

      if (!categoryName) return;

      var headingHtml =
        '<div class="content-container dw-mod cro-7972-injected-heading">' +
        '<div class="content-row__item__body sp1 padding-size-md padding-position-around dw-mod">' +
        '<h1 class="cro-7972-generated-h1">Shop all ' + categoryName + '</h1>' +
        '</div>' +
        '</div>';

      // Insert after our injected breadcrumb if it exists
      var croBreadcrumb = document.querySelector('.cro-7972-breadcrumb');
      if (croBreadcrumb) {
        croBreadcrumb.insertAdjacentHTML('afterend', headingHtml);
      } else {
        // Native breadcrumb present — insert after its outermost container
        var nativeBreadcrumb = document.querySelector('.breadcrumb');
        if (nativeBreadcrumb) {
          var bcContainer = nativeBreadcrumb.closest('.content-container') || nativeBreadcrumb.parentElement;
          if (bcContainer) {
            bcContainer.insertAdjacentHTML('afterend', headingHtml);
          }
        } else {
          // Fallback: insert just before the product list
          var plcContainer = document.querySelector('.cro-7972-product-list-container');
          if (plcContainer) {
            plcContainer.insertAdjacentHTML('beforebegin', headingHtml);
          } else {
            insertHtml('#content', headingHtml, 'afterbegin');
          }
        }
      }

      // Bug 1 fix: hide the native platform category heading (h2 in .u-margin-bottom--lg)
      // that would otherwise duplicate our injected h1.
      // Use .u-margin-bottom--lg directly — walking up to .content-container is too broad
      // and can reach the product list container when the h2 is inside the same wrapper.
      document.querySelectorAll('.content-row__item__body h2').forEach(function (h2) {
        if (h2.classList.contains('plp-header')) return;
        var llContainer = h2.closest('.u-margin-bottom--lg');
        if (llContainer) llContainer.classList.add('cro-7972-hidden');
      });
    }

    function updateCategoryHeading() {
      // Always tag the product list container first — needed by other functions
      var productList = document.querySelector('#productList');
      if (!productList) return;
      var productContainer = productList.closest('.content-container');
      if (!productContainer) return;
      productContainer.classList.add('cro-7972-product-list-container');

      var container = document.querySelector('.content-row__item__body.sp1');

      if (container) {
        var heading = container.querySelector('h1');
        if (heading) {
          var categoryName = heading.textContent.trim();
          categoryName = categoryName.replace(/^shop\s+all\s+/i, '').replace(/^shop\s+/i, '').trim();
          heading.textContent = 'Shop all ' + categoryName;

          // Bug 1 fix: hide any other h1 on the page that would create a duplicate heading
          document.querySelectorAll('h1').forEach(function (otherH1) {
            if (!container.contains(otherH1)) {
              var dup = otherH1.closest('.content-container');
              if (dup) dup.classList.add('cro-7972-hidden');
            }
          });
        } else {
          // .sp1 has no h1 (e.g. has h2 instead) — hide the sp1 container and reveal
          // the existing h2.plp-header rather than injecting a new heading
          var spContainer = container.closest('.content-container');
          if (spContainer) spContainer.classList.add('cro-7972-hidden');
          var plpHeader = document.querySelector('h2.plp-header');
          if (plpHeader) {
            var plpContainer = plpHeader.closest('.u-margin-bottom--lg') || plpHeader.closest('.content-container');
            if (plpContainer) plpContainer.classList.add('cro-7972-keep-plp-header');
          }
        }

        var subtext = container.querySelector('p');
        if (subtext) {
          var subtextHTML = subtext.outerHTML;
          subtext.classList.add('cro-7972-hidden');
          if (subtext.closest('.content-row__item')) {
            subtext.closest('.content-row__item').classList.add('cro_subtext_parent');
          }
          var bottomHTML =
            '<div class="content-container dw-mod cro-7972-subtext" style="background-color: ">' +
            '<div class="content-row content-row--full content-row--column-gap-lg content-row--center  content-row--spacing-none content-row--spacing-position-bottom  dw-mod">' +
            '<div class="content-row__item rowItemContent-19795  dw-mod" style="background-color: ; color: ">' +
            '<div class="u-full-width u-align-center  u-align-self-center  dw-mod">' +
            '<div class="content-row__item__body  padding-size-md padding-position-around  margin-md  margin-position-around card-paragraph dw-mod" style="background-color: #ffffff;">' +
            subtextHTML +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
          if (!document.querySelector('.cro-7972-subtext')) {
            insertHtml('.cro-7972-product-list-container', bottomHTML, 'afterend');
          }
        }
      } else {
        injectCategoryHeading();
      }
    }

    function buildBreadcrumb() {
      if (document.querySelector('.breadcrumb')) return;

      var segments = window.location.pathname.split('/').filter(function (s) { return s.length > 0; });
      if (segments.length === 0) return;

      var items = '';

      if (segments.length === 1) {
        items += '<li class="breadcrumb__item  dw-mod"><a href="/" title="Home">Home</a></li>';
      }

      for (var i = 0; i < segments.length; i++) {
        var label = segments[i].replace(/-/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
        var href = '/' + segments.slice(0, i + 1).join('/');
        var isLast = i === segments.length - 1;

        if (isLast) {
          items += '<li class="breadcrumb__item active dw-mod"><span class="dw-mod">' + label + '</span></li>';
        } else {
          items += '<li class="breadcrumb__item  dw-mod"><a href="' + href + '" title="' + label + '">' + label + '</a></li>';
        }
      }

      var html =
        '<div class="content-container dw-mod cro-7972-breadcrumb">' +
        '<div class="content-row content-row--full content-row--column-gap-lg content-row--center  content-row--spacing-none content-row--spacing-position-bottom  dw-mod">' +
        '<div class="content-row__item rowItemContent-17858  dw-mod" style="background-color: ; color: ">' +
        '<div class="content-row__item__body padding-size-sm padding-position-around u-align-left  u-align-self-start  dw-mod">' +
        '<div class="u-full-width">' +
        '<ul class="breadcrumb dw-mod">' + items + '</ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

      insertHtml('#content', html, 'afterbegin');
    }

    function getFilterLabel(el) {
      var heading = el.querySelector('button, legend, label, h2, h3, h4, span');
      return heading ? heading.textContent.trim().toLowerCase() : '';
    }

    function getPrecedingInput(el) {
      var prev = el.previousElementSibling;
      return (prev && prev.tagName === 'INPUT') ? prev : null;
    }

    function reorderFilterContainer(container) {
      if (!container) return;

      var filters = Array.prototype.slice.call(container.children);
      var seen = {};

      filters.forEach(function (filter) {
        var name = getFilterLabel(filter);
        if (!name) return;
        var input = getPrecedingInput(filter);

        if (seen[name]) {
          filter.classList.add('cro-7972-duplicate-filter');
          if (input) input.classList.add('cro-7972-duplicate-filter');
          return;
        }
        seen[name] = true;

        // Bug 3 fix: tag with order classes instead of moving DOM nodes so
        // platform accordion JS cannot break the visual order on interaction
        if (name === 'category') {
          filter.classList.add('cro-7972-order-1');
          if (input) input.classList.add('cro-7972-order-1');
        } else if (name === 'sub category' || name === 'subcategory') {
          filter.classList.add('cro-7972-order-2');
          if (input) input.classList.add('cro-7972-order-2');
        }
      });
    }

    function reorderFilters() {
      reorderFilterContainer(document.querySelector('#Block__Navigation .facets-container'));
    }

    function reorderMobileFilters() {
      reorderFilterContainer(document.querySelector('#productList .facets-container'));
    }

    function watchFilterContainer(parentSelector, reorderFn) {
      var parent = document.querySelector(parentSelector);
      if (!parent) return;
      var debounceTimer = null;
      var observer = new MutationObserver(function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () { reorderFn(); }, 100);
      });
      observer.observe(parent, { childList: true, subtree: true });
    }

    function tagHeadingContainers() {
      document.querySelectorAll('.content-row__item__body h3').forEach(function (h3) {
        var container = h3.closest('.content-container.dw-mod');
        // Bug 2 fix: don't hide a container that carries the page's main h1
        if (container && !container.querySelector('h1')) {
          container.classList.add('cro-7972-has-h3');
        }
      });

      document.querySelectorAll('.content-row__item__body h2.plp-header').forEach(function (h2) {
        var container = h2.closest('.u-margin-bottom--lg');
        if (container) container.classList.add('cro-7972-has-plp-header');
      });
    }

    function updateMobileFilterBtn() {
      var btn = document.querySelector('.btn.btn--primary.btn--full--mobile.dw-mod.js-expand-hide');
      if (btn) btn.textContent = 'Shop by';
    }

    function hideLongParagraphs() {
      document.querySelectorAll('.content-row__item__body p').forEach(function (p) {
        var lineHeight = parseFloat(window.getComputedStyle(p).lineHeight);
        if (!lineHeight || isNaN(lineHeight)) return;
        var lines = Math.round(p.getBoundingClientRect().height / lineHeight);
        if (lines > 2) {
          p.classList.add('cro-7972-long-paragraph');
        }
      });

      document.querySelectorAll('.card-paragraph.content-row__item__body').forEach(function (card) {
        var paragraphs = Array.prototype.slice.call(card.querySelectorAll('p'));
        if (!paragraphs.length) return;
        var allHidden = paragraphs.every(function (p) {
          return p.classList.contains('cro-7972-long-paragraph') || p.textContent.replace(/ /g, '').trim() === '';
        });
        if (allHidden) {
          card.classList.add('cro-7972-empty-card');
        }
      });
    }

    function collapseAccordions() {
      document.querySelectorAll('#Block__Navigation input').forEach(function (input) {
        if (input.getAttribute('checked') === 'true' || input.checked) {
          input.setAttribute('checked', 'false');
          input.checked = false;
        }
      });
    }

    function init() {
      addClass('body', variation_name);
      waitForElement('#content', buildBreadcrumb);
      waitForElement('#productList', updateCategoryHeading);
      waitForElement('#ProductsContainer', movePromoBanners);
      waitForElement('#Block__Navigation .facets-container', function () {
        reorderFilters();
        watchFilterContainer('#Block__Navigation', reorderFilters);
      });
      waitForElement('#productList .facets-container', function () {
        reorderMobileFilters();
        watchFilterContainer('#productList', reorderMobileFilters);
      });
      waitForElement('.content-row__item__body h3', tagHeadingContainers);
      waitForElement('.content-row__item__body h2.plp-header', tagHeadingContainers);
      waitForElement('#Block__Navigation input', collapseAccordions);
      waitForElement('.btn.btn--primary.btn--full--mobile.dw-mod.js-expand-hide', updateMobileFilterBtn);
      waitForElement('.content-row__item__body p', hideLongParagraphs);
    }


    waitForElement('#multiForm', init);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();