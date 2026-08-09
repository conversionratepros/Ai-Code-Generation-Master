(function () {
  try {
    var debug = 1;
    var variation_name = "CRO-8037_Banner_After_Every_4th_Row";

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

    /* =============================
       Test-specific logic starts
    ============================== */

    var CRO = {
      flag: "cro_t_8037",
      bannerAttr: "data-cro-xtd-banner",
      shopMoreAttr: "data-cro-sm",
      cardSel: ".unbxdanalyticsProduct",
      rowTolerance: 8,
      // S3 filenames are swapped — mobile.svg is the wide desktop banner, desktop.svg is the square mobile banner
      imgDesktop:
        "https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/i3+%7C+Advertise+XTD+page+with+banners+%7C+ALL+%7C+CRO-8037/i3_Advertise_banners_ALL_CRO8037_mobile.svg",
      imgMobile:
        "https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/i3+%7C+Advertise+XTD+page+with+banners+%7C+ALL+%7C+CRO-8037/i3_Advertise_banners_ALL_CRO8037_desktop.svg",
      link: "https://www.onedayonly.co.za/shops/extra-time-deals"
    };

    // Set once page data is parsed — lets the retry loop stop as soon as every
    // product has a card in the DOM and the banner sits in the right place.
    var expectedCardCount = 0;

    function createBannerNode(isFlexItem) {
      var wrap = document.createElement("div");
      wrap.setAttribute(CRO.bannerAttr, "1");
      wrap.className = "cro-xtd-banner" + (isFlexItem ? " cro-xtd-banner--flexItem" : "");
      wrap.innerHTML =
        '<a class="cro-xtd-banner__link" href="' + CRO.link + '">' +
        "<picture>" +
        '<source media="(min-width: 768px)" srcset="' + CRO.imgDesktop + '">' +
        '<img class="cro-xtd-banner__img" src="' + CRO.imgMobile + '" alt="Extra Time Deals" />' +
        "</picture>" +
        "</a>";
      return wrap;
    }

    function removeExistingBanners() {
      var nodes = document.querySelectorAll("[" + CRO.bannerAttr + "]");
      for (var i = 0; i < nodes.length; i++) nodes[i].remove();
    }

    // Walk up from el and return the element whose direct parent is a flex container.
    function getFlexItemAncestor(el) {
      var current = el;
      while (current && current !== document.body) {
        var parent = current.parentElement;
        if (parent && window.getComputedStyle(parent).display.indexOf("flex") !== -1) {
          return current;
        }
        current = parent;
      }
      return null;
    }

    function absTop(el) {
      return el.getBoundingClientRect().top + window.scrollY;
    }

    // Return the last element of the visual row containing cardEl.
    // Measures the card's flex-item wrapper and its siblings, not the cards
    // themselves: a wrapper occupies layout even while its card content is
    // still mounting (height 0), so half-painted rows are grouped correctly.
    function findRowEndEl(cardEl) {
      var item = getFlexItemAncestor(cardEl) || cardEl;
      var parent = item.parentElement;
      if (!parent) return item;
      var top = absTop(item);
      var rowEls = [];
      for (var i = 0; i < parent.children.length; i++) {
        var sib = parent.children[i];
        if (sib.hasAttribute(CRO.bannerAttr)) continue;
        if (Math.abs(absTop(sib) - top) < CRO.rowTolerance) rowEls.push(sib);
      }
      if (rowEls.length === 0) return item;
      rowEls.sort(function (a, b) {
        return a.getBoundingClientRect().left - b.getBoundingClientRect().left;
      });
      return rowEls[rowEls.length - 1];
    }

    function findCardById(productId) {
      var allCards = document.querySelectorAll(CRO.cardSel);
      for (var i = 0; i < allCards.length; i++) {
        if (allCards[i].querySelector('a[href*="/' + productId + '"]')) return allCards[i];
      }
      return null;
    }

    // Build the ordered list of top-level group sections (sections with > 1 product card).
    // Returns the array and leaves the data-cro-sm attribute set — caller must clean up.
    function buildShopMoreEls() {
      var shopMoreEls = [];
      var allSections = document.querySelectorAll("section");
      for (var i = 0; i < allSections.length; i++) {
        var sec = allSections[i];
        if (sec.closest("[" + CRO.shopMoreAttr + "]")) continue;
        if (sec.querySelectorAll(CRO.cardSel).length > 1) {
          sec.setAttribute(CRO.shopMoreAttr, "1");
          shopMoreEls.push(sec);
        }
      }
      return shopMoreEls;
    }

    function cleanupShopMoreEls(shopMoreEls) {
      for (var i = 0; i < shopMoreEls.length; i++) shopMoreEls[i].removeAttribute(CRO.shopMoreAttr);
    }

    // Fallback: derive insertion point purely from visible DOM positions.
    function find16thVisualSort(shopMoreEls) {
      var allCards = Array.prototype.slice.call(document.querySelectorAll(CRO.cardSel));
      if (allCards.length === 0) return null;

      var groupLastTop = shopMoreEls.map(function (sm) {
        var max = 0;
        var smCards = sm.querySelectorAll(CRO.cardSel);
        for (var ci = 0; ci < smCards.length; ci++) {
          var r2 = smCards[ci].getBoundingClientRect();
          if (r2.height > 0) {
            var t = r2.top + window.scrollY;
            if (t > max) max = t;
          }
        }
        return max;
      });

      var cardData = allCards.map(function (c) {
        var r = c.getBoundingClientRect();
        if (r.height > 0) {
          return { el: c, top: r.top + window.scrollY, left: r.left };
        }
        var groupEl = c.closest("[" + CRO.shopMoreAttr + "]");
        if (!groupEl) return null;
        var gi = shopMoreEls.indexOf(groupEl);
        return { el: c, top: groupLastTop[gi] + 1, left: Infinity };
      }).filter(Boolean);

      cardData.sort(function (a, b) { return a.top !== b.top ? a.top - b.top : a.left - b.left; });

      var targetData = cardData.length >= 16 ? cardData[15] : cardData[cardData.length - 1];
      var targetCard = targetData.el;
      var shopMoreParent = targetCard.closest("[" + CRO.shopMoreAttr + "]");

      if (shopMoreParent) return shopMoreParent;

      return findRowEndEl(targetCard);
    }

    // window.__NEXT_DATA__ is the initial SSR payload and goes stale after a
    // client-side navigation — prefer the router's live pageProps for the
    // current route, falling back to __NEXT_DATA__ on first load.
    function getPageProps() {
      try {
        var r = window.next && window.next.router;
        if (r && r.components && r.components[r.route] && r.components[r.route].props && r.components[r.route].props.pageProps) {
          return r.components[r.route].props.pageProps;
        }
      } catch (err) { }
      return window.__NEXT_DATA__ && window.__NEXT_DATA__.props && window.__NEXT_DATA__.props.pageProps;
    }

    // Compute where the banner belongs right now. Returns null while it can't
    // be resolved yet (caller retries).
    function computeAfterEl(allowVisualFallback) {
      var nextProps = getPageProps();
      var page = nextProps && (nextProps.categoryPage || nextProps.shopPage || nextProps.clearanceSale);
      var dataItems = page && Array.isArray(page.items) ? page.items : null;

      var afterEl = null;
      var confident = false;
      var shopMoreEls = buildShopMoreEls();

      if (dataItems) {
        // Flatten to real products only — shop feeds contain null/dead slots
        // (e.g. expired deals) that never render a card but would shift the
        // count, parking the banner mid-row.
        var flat = [];
        var groupsSeen = 0;
        for (var si = 0; si < dataItems.length; si++) {
          var sectionProds = ((dataItems[si] && dataItems[si].props && dataItems[si].props.items) || [])
            .filter(function (p) { return p && p.id; });
          var isGroup = sectionProds.length > 1;
          for (var pi = 0; pi < sectionProds.length; pi++) {
            flat.push({ prod: sectionProds[pi], isGroup: isGroup, groupIdx: isGroup ? groupsSeen : -1 });
          }
          if (isGroup) groupsSeen++;
        }
        expectedCardCount = flat.length;

        if (flat.length > 0) {
          var targetN = Math.min(16, flat.length);
          var target = flat[targetN - 1];
          var prod = target.prod;
          var matchedCard = findCardById(prod.id);

          if (target.isGroup) {
            if (matchedCard) {
              // 1. Check if the card is inside one of the already-identified section groups
              for (var gi = 0; gi < shopMoreEls.length; gi++) {
                if (shopMoreEls[gi].contains(matchedCard)) {
                  afterEl = shopMoreEls[gi];
                  break;
                }
              }
              // 2. Only walk up for a div-based group wrapper when section groups exist on this page.
              // If shopMoreEls is empty the page has no DOM grouping — treat as free card instead.
              if (!afterEl && shopMoreEls.length > 0) {
                var totalDomCards = document.querySelectorAll(CRO.cardSel).length;
                var cur = matchedCard.parentElement;
                while (cur && cur !== document.body) {
                  var cnt = cur.querySelectorAll(CRO.cardSel).length;
                  if (cnt > 1 && cnt < totalDomCards) { afterEl = cur; break; }
                  cur = cur.parentElement;
                }
              }
              // 3. No DOM group found — insert after the target product's visual row
              if (!afterEl) afterEl = findRowEndEl(matchedCard);
            }
            // Product not yet in DOM (collapsed/hidden) → fall back to positional index
            if (!afterEl) afterEl = shopMoreEls[target.groupIdx] || null;
          } else {
            if (matchedCard) afterEl = findRowEndEl(matchedCard);
          }
          // Only a position derived from the target product's actual card is
          // authoritative; the positional group fallback below is not.
          confident = !!(matchedCard && afterEl);
        }
      }

      cleanupShopMoreEls(shopMoreEls);

      // FALLBACK: visual sort (if __NEXT_DATA__ unavailable or product not found in DOM)
      if (!afterEl && allowVisualFallback) {
        shopMoreEls = buildShopMoreEls();
        afterEl = find16thVisualSort(shopMoreEls);
        cleanupShopMoreEls(shopMoreEls);
      }

      return { el: afterEl, confident: confident };
    }

    // Idempotent: computes the desired position and only touches the DOM when
    // the banner is missing or in the wrong place. An existing banner is taken
    // out of flow during measurement so it can't distort the very rows it is
    // being validated against (a mid-row banner reshapes every row after it).
    //
    // Sticky rules for virtualised lists (clearance unmounts/remounts card
    // wrappers on scroll): fallback positions may CREATE the banner but never
    // MOVE it, and when the target card is temporarily out of the DOM the
    // banner stays exactly where it is. Only a confident position — derived
    // from the target product's actual card — may relocate an existing banner.
    function placeBanner(allowVisualFallback) {
      var existing = document.querySelector("[" + CRO.bannerAttr + "]");
      var prevDisplay = "";
      if (existing) {
        prevDisplay = existing.style.display;
        existing.style.display = "none";
      }

      var result = computeAfterEl(allowVisualFallback && !existing);
      var afterEl = result.el;

      if (existing) {
        if (!afterEl || !result.confident || existing.previousElementSibling === afterEl) {
          existing.style.display = prevDisplay;
          return true;
        }
      } else if (!afterEl) {
        return false;
      }

      removeExistingBanners();
      var parentDisplay = afterEl.parentElement ? window.getComputedStyle(afterEl.parentElement).display : "";
      var isFlexItem = parentDisplay.indexOf("flex") !== -1;
      afterEl.insertAdjacentElement("afterend", createBannerNode(isFlexItem));
      watchBannerContainer();
      if (debug) console.log("[CRO-8037] banner placed after:", afterEl);
      return true;
    }

    // Re-validate placement whenever the banner's container gains or loses
    // children — this is exactly when a virtualised list mounts/unmounts card
    // wrappers, and it also restores the banner if the site removes it. Runs
    // indefinitely (unlike the settle interval); the sticky rules above stop
    // it from ever chasing the scroll position.
    var observedContainer = null;
    function watchBannerContainer() {
      var banner = document.querySelector("[" + CRO.bannerAttr + "]");
      var container = banner && banner.parentElement;
      if (!container || container === observedContainer) return;
      if (window.__cro8037Observer) window.__cro8037Observer.disconnect();
      var debounceTimer = null;
      var observer = new MutationObserver(function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () { placeBanner(false); }, 200);
      });
      observer.observe(container, { childList: true });
      window.__cro8037Observer = observer;
      observedContainer = container;
    }

    function init() {
      // Never advertise the XTD page on itself (Convert re-runs init on SPA
      // navigation, so this must be checked per run, not once per load).
      if (window.location.pathname.indexOf("/extra-time-deals") !== -1) return;

      addClass("body", variation_name);

      waitForElement(CRO.cardSel, function () {
        placeBanner(false);

        // Cards mount progressively, so the row the banner belongs after can
        // gain members well after first paint — keep re-validating every 400ms
        // and self-heal if the computed position changes. Stops early once all
        // products from the page data have cards in the DOM and the banner is
        // in the right spot; hard stop at 12s. The visual-sort fallback
        // unlocks only after 4.5s as a true last resort.
        var start = Date.now();
        var intervalCallAgain = setInterval(function () {
          var elapsed = Date.now() - start;
          var placed = placeBanner(elapsed >= 4500);
          var domCount = document.querySelectorAll(CRO.cardSel).length;
          if ((placed && expectedCardCount > 0 && domCount >= expectedCardCount) || elapsed >= 12000) {
            clearInterval(intervalCallAgain);
          }
        }, 400);
      });
    }

    if (!window[CRO.flag]) {
      window[CRO.flag] = true;
    }
    // Outside the run-once guard: Convert re-executes the experiment on SPA
    // navigation and init must re-run to place the banner on the new page.
    waitForElement("body", init);

  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
