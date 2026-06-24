(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "cro-12371";

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

    function addClass(el, cls) {
      var el = document.querySelector(el);
      if (el) {
        el.classList.add(cls);
      }
    }

    /* ---- Desktop: pin the whole header.header-top row (logo, search, icons) to the viewport ---- */
    function positionDesktopHeader() {
      var bar = document.querySelector('header#Top .header.header-top');
      var headerEl = document.querySelector('header#Top');
      if (!bar || !headerEl) return;
      headerEl.style.paddingTop = '';
      var h = bar.offsetHeight;
      headerEl.style.paddingTop = h + 'px';
      /* Force the fixed positioning inline too, so it doesn't depend on the external
         stylesheet having applied yet. */
      bar.style.position = 'fixed';
      bar.style.top = '0';
      bar.style.left = '0';
      bar.style.width = '100%';
      bar.classList.add('cro-12371-header-fixed');
    }

    function initDesktop() {
      positionDesktopHeader();

      /* Re-settle for a few seconds after init to catch late layout shifts (cookie
         banners, lazy-loaded promo strips, late CSS) that would otherwise leave the
         spacer padding stale. */
      var settleTries = 0;
      var settleInterval = setInterval(function () {
        positionDesktopHeader();
        settleTries++;
        if (settleTries >= 10) clearInterval(settleInterval);
      }, 300);

      var resizeTimer = null;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(positionDesktopHeader, 150);
      });
    }

    /* ---- Mobile: leave the panel in normal flow (right below the header, where it
       naturally renders) until it would scroll out of view, then switch it to
       position:fixed with a slide-in. A zero-height sentinel marks exactly where the
       panel naturally sits; once the sentinel scrolls above the viewport the panel is no
       longer visible in its normal spot, so we fix it to the top. Scrolling back up past
       the sentinel reverts it to normal flow. This needs no JS-computed top offset at all
       while in normal flow, and only needs the spacer while fixed. */
    function initMobile() {
      var panel = document.querySelector('.typeahead-mobile');
      var pageEl = document.getElementById('Page');
      if (!panel || !pageEl || !pageEl.parentNode) return;

      var parent = pageEl.parentNode;
      var sentinel = document.createElement('div');
      sentinel.className = 'cro-12371-mobile-sentinel';
      parent.insertBefore(sentinel, pageEl);
      parent.insertBefore(panel, pageEl);
      panel.classList.add('cro-12371-mobile-bar');

      var spacer = document.createElement('div');
      spacer.className = 'cro-12371-mobile-spacer';
      parent.insertBefore(spacer, pageEl);

      function makeFixed() {
        if (panel.classList.contains('cro-12371-mobile-fixed')) return;
        var height = panel.offsetHeight; /* measure while still in normal flow */
        spacer.style.height = height + 'px';
        panel.classList.add('cro-12371-mobile-fixed');
      }

      function makeStatic() {
        if (!panel.classList.contains('cro-12371-mobile-fixed')) return;
        panel.classList.remove('cro-12371-mobile-fixed');
        spacer.style.height = '0px';
      }

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              makeStatic();
            } else if (entry.boundingClientRect.top < 0) {
              makeFixed();
            }
          });
        }, { threshold: 0 });
        observer.observe(sentinel);
      } else {
        window.addEventListener('scroll', function () {
          var r = sentinel.getBoundingClientRect();
          if (r.top < 0) makeFixed();
          else makeStatic();
        });
      }
    }

    /* Branch on whichever search markup the server actually rendered for this device, rather than guessing a width breakpoint */
    function init() {
      addClass('body', variation_name);
      if (document.querySelector('.typeahead-mobile')) {
        waitForElement('.typeahead-mobile .js-typeahead-search-field', initMobile);
      } else if (document.querySelector('header#Top .header.header-top')) {
        waitForElement('#ProductSearchBar .js-typeahead-search-field', initDesktop);
      }
    }

    waitForElement('header#Top', init);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
