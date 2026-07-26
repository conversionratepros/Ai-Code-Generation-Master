(function () {
  try {
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

    var ribbonHeight = 0;

    // The client runs a separate promo ribbon (id^="wps-ribbon") in normal document
    // flow above header#Top -- it is not ours to hide. It scrolls away like any other
    // in-flow content, so once fixed the header's `top` must shrink from the ribbon's
    // height down to 0 as the page scrolls, or the fixed header sits at top:0 and gets
    // covered by the ribbon (the ribbon's z-index is effectively max) while it's still
    // on screen. position:sticky can't do this here -- header#Top (its containing
    // block) is barely taller than the bar itself, so a sticky child runs out of room
    // to stick within a few dozen pixels of scroll and scrolls away regardless.
    function measureRibbon() {
      var ribbon = document.querySelector('[id^="wps-ribbon"]');
      ribbonHeight = ribbon ? ribbon.getBoundingClientRect().height : 0;
    }

    // All positioning (fixed/left/width/padding-top) lives in variation.css, scoped
    // under body.cro-12371. JS only ever writes CSS custom properties -- never
    // element.style.<property> directly -- so that if the global exclusion script
    // strips the cro-12371 body class on a given page, every consuming rule stops
    // matching immediately and nothing is left behind to manually clean up.
    function updateHeaderTop() {
      var bar = document.querySelector('header#Top .header.header-top');
      if (!bar) return;
      var offset = Math.max(0, ribbonHeight - window.scrollY);
      document.body.style.setProperty('--cro-12371-header-offset', offset + 'px');
    }

    function positionDesktopHeader() {
      var bar = document.querySelector('header#Top .header.header-top');
      var headerEl = document.querySelector('header#Top');
      if (!bar || !headerEl) return;
      document.body.style.setProperty('--cro-12371-header-height', bar.offsetHeight + 'px');
      bar.classList.add('cro-12371-header-fixed');
      measureRibbon();
      updateHeaderTop();
    }

    function initDesktop() {
      positionDesktopHeader();

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

      var ticking = false;
      window.addEventListener('scroll', function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            updateHeaderTop();
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }

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
        var height = panel.offsetHeight;
        document.body.style.setProperty('--cro-12371-mobile-spacer-height', height + 'px');
        panel.classList.add('cro-12371-mobile-fixed');
      }

      function makeStatic() {
        if (!panel.classList.contains('cro-12371-mobile-fixed')) return;
        panel.classList.remove('cro-12371-mobile-fixed');
        document.body.style.setProperty('--cro-12371-mobile-spacer-height', '0px');
      }

      // Track scroll direction. When the mobile browser chrome collapses on scroll-down,
      // the visual viewport briefly expands upward, which can fool the IntersectionObserver
      // into thinking the sentinel is visible. Guarding makeStatic on !scrollingDown
      // prevents the false trigger — the chrome only collapses while scrolling down.
      var lastScrollY = window.scrollY;
      var scrollingDown = false;
      window.addEventListener('scroll', function () {
        scrollingDown = window.scrollY > lastScrollY;
        lastScrollY = window.scrollY;
      }, { passive: true });

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !scrollingDown) {
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