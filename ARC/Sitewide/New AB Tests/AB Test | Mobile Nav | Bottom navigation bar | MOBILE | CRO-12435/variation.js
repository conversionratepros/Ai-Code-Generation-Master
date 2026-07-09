(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "cro-12435";
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

    /* ---------- Test-specific functions ---------- */

    // Site's real controls, confirmed on the live DOM:
    // - hamburger menu is driven by checkbox #MobileNavTrigger, opened via label.mobile-nav-trigger-button
    // - search flyout is driven by checkbox #MobileSearchTrigger, opened via label.menu__link--icon[for="MobileSearchTrigger"]
    // - suggestions feed renders into ul#MobileProductSearchBarContent

    function injectBottomNav() {
      if (document.querySelector('.cro-12435-bottom-nav')) return;
      /* Icons are the design's inline SVGs (fa-home/fa-th-large/fa-tags are not
         used anywhere on the site, so those glyphs are unverified in its FA build).
         Bag keeps the FA basket to match the top-header cart icon. */
      var html =
        '<nav class="cro-12435-bottom-nav" aria-label="Mobile bottom navigation">' +
        '<button type="button" class="cro-12435-nav-item" data-nav="home">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>' +
        '<span>Home</span>' +
        '</button>' +
        '<button type="button" class="cro-12435-nav-item" data-nav="categories">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.2"/></svg>' +
        '<span>Categories</span>' +
        '</button>' +
        '<button type="button" class="cro-12435-nav-item" data-nav="search">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>' +
        '<span>Search</span>' +
        '</button>' +
        '<button type="button" class="cro-12435-nav-item" data-nav="brands">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-6.6-6.6a2 2 0 0 1-.6-1.4V5a2 2 0 0 1 2-2h6.6a2 2 0 0 1 1.4.6l6.6 6.6a2 2 0 0 1 0 2.8z"/><circle cx="8" cy="8" r="1.4"/></svg>' +
        '<span>Brands</span>' +
        '</button>' +
        '<button type="button" class="cro-12435-nav-item" data-nav="bag">' +
        '<i class="fal fa-shopping-basket" aria-hidden="true"></i>' +
        '<span>Bag</span>' +
        '</button>' +
        '</nav>';
      document.body.insertAdjacentHTML('beforeend', html);
    }

    function openSiteMenu() {
      var trigger = document.querySelector('label.mobile-nav-trigger-button[for="MobileNavTrigger"]');
      if (trigger) trigger.click();
    }

    function toggleSearchBar() {
      var label = document.querySelector('label.menu__link--icon[for="MobileSearchTrigger"]');
      if (label) label.click();
    }

    function closeSearchBar() {
      var checkbox = document.getElementById('MobileSearchTrigger');
      if (checkbox && checkbox.checked) {
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    /* Spec: the X removes only the suggestions list - the input keeps its value */
    function removeSuggestionsList() {
      var list = document.getElementById('MobileProductSearchBarContent');
      if (list) list.innerHTML = '';
    }

    function closeSuggestions() {
      removeSuggestionsList();
      var input = document.querySelector('.js-typeahead-search-field');
      if (input) input.value = '';
    }

    function submitSearch() {
      var input = document.querySelector('.js-typeahead-search-field');
      var query = input ? input.value.trim() : '';
      if (query) {
        /* same URL the typeahead's "See all results" button uses */
        window.location.href = '/products?Search=' + encodeURIComponent(query);
      } else if (input) {
        input.focus();
      }
    }

    function focusSearchInput() {
      var input = document.querySelector('.js-typeahead-search-field');
      if (input) {
        setTimeout(function () {
          input.focus();
        }, 50);
      }
    }

    function updateSearchCopy() {
      var input = document.querySelector('.js-typeahead-search-field');
      if (input && input.getAttribute('placeholder') !== 'Search for a brand or product') {
        input.setAttribute('placeholder', 'Search for a brand or product');
      }
      var btn = document.querySelector('.typeahead-mobile .search-button-override');
      if (btn && !btn.classList.contains('cro-12435-search-btn')) {
        btn.classList.add('cro-12435-search-btn');
        btn.innerHTML = '<span>Search</span>';
      }
    }

    function injectSuggestionsClose() {
      if (document.querySelector('.cro-12435-suggestions-close')) return;
      var list = document.getElementById('MobileProductSearchBarContent');
      if (!list) return;
      var btnHtml =
        '<button type="button" class="cro-12435-suggestions-close" aria-label="Close suggestions">' +
        '<i class="fal fa-times" aria-hidden="true"></i>' +
        '</button>';
      list.insertAdjacentHTML('afterend', btnHtml);
      watchSuggestionsList(list);
    }

    function watchSuggestionsList(list) {
      function sync() {
        var btn = document.querySelector('.cro-12435-suggestions-close');
        if (!btn) return;
        if (list.children.length > 0) {
          btn.classList.add('cro-12435-visible');
        } else {
          btn.classList.remove('cro-12435-visible');
        }
      }
      sync();
      new MutationObserver(sync).observe(list, { childList: true });
    }

    function bindSearchStateSync() {
      var checkbox = document.getElementById('MobileSearchTrigger');
      if (!checkbox || checkbox.hasAttribute('data-cro-12435-bound')) return;
      checkbox.setAttribute('data-cro-12435-bound', 'true');
      checkbox.addEventListener('change', function () {
        var panel = document.querySelector('.typeahead-mobile');
        if (checkbox.checked) {
          if (panel) panel.classList.add('cro-12435-search-open');
          updateSearchCopy();
          focusSearchInput();
        } else {
          if (panel) panel.classList.remove('cro-12435-search-open');
          closeSuggestions();
        }
        syncActiveNav();
      });
    }

    /* keep the Categories item highlighted while the menu is open, however it was opened */
    function bindMenuStateSync() {
      var checkbox = document.getElementById('MobileNavTrigger');
      if (!checkbox || checkbox.hasAttribute('data-cro-12435-bound')) return;
      checkbox.setAttribute('data-cro-12435-bound', 'true');
      checkbox.addEventListener('change', syncActiveNav);
    }

    // #Top (the site header) is `position:relative; z-index:90`, which makes it its own
    // stacking context. Left inside it, .typeahead-mobile's z-index only ranks against its
    // header siblings, capped at 90 against the rest of the page - any unrelated element
    // elsewhere with z-index >= 90 (badges, stickers, promo overlays) paints over it. Moving
    // it to be a direct child of <body> lets its z-index compete at the root level instead.
    // This also detaches it from the checkbox's native ":checked + .typeahead-mobile" sibling
    // rule, so open/close now runs entirely through the cro-12435-search-open class above.
    function relocateSearchPanel() {
      var panel = document.querySelector('.typeahead-mobile');
      if (!panel || panel.parentElement === document.body) return;
      document.body.appendChild(panel);
    }

    // iOS Safari jump fix: as the address bar collapses/expands mid-scroll, its layout
    // viewport height changes momentarily, so `position:fixed; bottom:Npx` elements visibly
    // shift before settling. window.visualViewport reports the actual visible area (already
    // net of the toolbar), so we shift the bottom nav/search bar/suggestions by the
    // difference via transform, keeping them pinned to the true visible bottom edge.
    function bindViewportPin() {
      if (!window.visualViewport || window.cro_12435_viewport_bound) return;
      window.cro_12435_viewport_bound = true;
      var ticking = false;

      function update() {
        ticking = false;
        var vv = window.visualViewport;
        var offset = Math.max(0, window.innerHeight - (vv.height + vv.offsetTop));
        var shift = offset ? 'translateY(-' + offset + 'px)' : '';
        var nav = document.querySelector('.cro-12435-bottom-nav');
        var panel = document.querySelector('.typeahead-mobile');
        var suggestions = document.getElementById('MobileProductSearchBarContent');
        if (nav) nav.style.transform = shift;
        if (panel) panel.style.transform = shift;
        if (suggestions) suggestions.style.transform = shift;
      }

      function requestUpdate() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      }

      window.visualViewport.addEventListener('resize', requestUpdate);
      window.visualViewport.addEventListener('scroll', requestUpdate);
      update();
    }

    function bindOutsideClose() {
      if (window.cro_12435_outside_bound) return;
      window.cro_12435_outside_bound = true;
      document.addEventListener('click', function (e) {
        var checkbox = document.getElementById('MobileSearchTrigger');
        if (!checkbox || !checkbox.checked) return;
        var panel = document.querySelector('.typeahead-mobile');
        var searchNavBtn = document.querySelector('.cro-12435-nav-item[data-nav="search"]');
        var target = e.target;
        var insidePanel = panel && panel.contains(target);
        var onNavBtn = searchNavBtn && searchNavBtn.contains(target);
        // Clicking a <label for="MobileSearchTrigger"> makes the browser forward a second,
        // nested click straight at the checkbox after it is already checked. That nested
        // click's target is the checkbox/label itself (not inside the panel), so without this
        // guard it looks like an "outside tap" and immediately re-closes the bar it just opened.
        var onTrigger = target === checkbox || (target.closest && target.closest('label[for="MobileSearchTrigger"]'));
        if (!insidePanel && !onNavBtn && !onTrigger) {
          closeSearchBar();
        }
      });
    }

    function setActiveNav(nav) {
      var el = document.querySelector('.cro-12435-nav-item[data-nav="' + nav + '"]');
      if (el) el.classList.add('cro-12435-active');
    }

    function syncActiveNav() {
      var items = document.querySelectorAll('.cro-12435-nav-item');
      items.forEach(function (item) {
        item.classList.remove('cro-12435-active');
      });

      var searchCheckbox = document.getElementById('MobileSearchTrigger');
      if (searchCheckbox && searchCheckbox.checked) {
        setActiveNav('search');
        return;
      }

      var menuCheckbox = document.getElementById('MobileNavTrigger');
      if (menuCheckbox && menuCheckbox.checked) {
        setActiveNav('categories');
        return;
      }

      var path = window.location.pathname.replace(/\/+$/, '') || '/';
      if (path === '/') {
        setActiveNav('home');
      } else if (path.indexOf('/brands') === 0) {
        setActiveNav('brands');
      } else if (path.indexOf('/arc/arc-checkout') === 0 || path.indexOf('/cart') === 0) {
        setActiveNav('bag');
      }
    }

    function handleNavAction(action) {
      if (action === 'home') {
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (action === 'categories') {
        closeSearchBar();
        openSiteMenu();
      } else if (action === 'search') {
        toggleSearchBar();
      } else if (action === 'brands') {
        window.location.href = '/brands';
      } else if (action === 'bag') {
        window.location.href = '/arc/arc-checkout?Purge=True';
      }
    }

    function croEventHandler() {
      live('.cro-12435-nav-item', 'click', function (e) {
        e.preventDefault();
        handleNavAction(this.getAttribute('data-nav'));
      });

      live('.cro-12435-suggestions-close', 'click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        removeSuggestionsList();
      });

      /* .search-button-override is a plain decorative span in the control DOM -
         no native click handler - so the "Search" button needs its own submit */
      live('.cro-12435-search-btn', 'click', function (e) {
        e.preventDefault();
        submitSearch();
      });
    }

    function init() {
      addClass('body', variation_name);
      injectBottomNav();
      relocateSearchPanel();
      injectSuggestionsClose();
      bindSearchStateSync();
      bindMenuStateSync();
      bindOutsideClose();
      bindViewportPin();
      syncActiveNav();
    }

    if (!window.cro_12435_events_bound) {
      croEventHandler();
      window.cro_12435_events_bound = true;
    }

    waitForElement('#Top', init);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();