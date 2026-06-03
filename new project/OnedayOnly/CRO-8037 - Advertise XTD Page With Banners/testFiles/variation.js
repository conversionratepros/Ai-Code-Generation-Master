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
      // S3 filenames are swapped — mobile.svg is the wide desktop banner, desktop.svg is the square mobile banner
      imgDesktop:
        "https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/i3+%7C+Advertise+XTD+page+with+banners+%7C+ALL+%7C+CRO-8037/i3_Advertise_banners_ALL_CRO8037_mobile.svg",
      imgMobile:
        "https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/i3+%7C+Advertise+XTD+page+with+banners+%7C+ALL+%7C+CRO-8037/i3_Advertise_banners_ALL_CRO8037_desktop.svg",
      link: "https://www.onedayonly.co.za/shops/extra-time-deals"
    };

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

    var lastCardCount = -1;

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

    // Given a free product's id from __NEXT_DATA__, find its .unbxdanalyticsProduct in
    // the DOM and return the afterEl for the last card in the same visual row.
    function findFreeCardRowEl(productId) {
      var allCards = document.querySelectorAll(CRO.cardSel);
      var targetCard = null;
      for (var i = 0; i < allCards.length; i++) {
        if (allCards[i].querySelector('a[href*="/' + productId + '"]')) {
          targetCard = allCards[i];
          break;
        }
      }
      if (!targetCard) {
        // if (debug) // console.log("[CRO-8037] Product '" + productId + "' not in DOM — falling back to visual sort");
        return null;
      }
      var r = targetCard.getBoundingClientRect();
      var rowTop = Math.round((r.top + window.scrollY) / 10) * 10;
      // if (debug) // console.log("[CRO-8037] Found '" + productId + "' in DOM at rowTop=" + rowTop);
      var rowCards = [];
      for (var i = 0; i < allCards.length; i++) {
        var cr = allCards[i].getBoundingClientRect();
        if (cr.height > 0 && Math.round((cr.top + window.scrollY) / 10) * 10 === rowTop) {
          rowCards.push({ el: allCards[i], left: cr.left });
        }
      }
      if (rowCards.length === 0) return getFlexItemAncestor(targetCard) || targetCard;
      rowCards.sort(function (a, b) { return a.left - b.left; });
      var lastInRow = rowCards[rowCards.length - 1].el;
      return getFlexItemAncestor(lastInRow) || lastInRow;
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
            var t = Math.round((r2.top + window.scrollY) / 10) * 10;
            if (t > max) max = t;
          }
        }
        return max;
      });

      var cardData = allCards.map(function (c) {
        var r = c.getBoundingClientRect();
        if (r.height > 0) {
          return { el: c, top: Math.round((r.top + window.scrollY) / 10) * 10, left: r.left };
        }
        var groupEl = c.closest("[" + CRO.shopMoreAttr + "]");
        if (!groupEl) return null;
        var gi = shopMoreEls.indexOf(groupEl);
        return { el: c, top: groupLastTop[gi] + 1, left: Infinity };
      }).filter(Boolean);

      cardData.sort(function (a, b) { return a.top !== b.top ? a.top - b.top : a.left - b.left; });

      if (debug) {
        // console.log("[CRO-8037] Visual sort — total cards (incl. hidden group):", cardData.length);
        cardData.forEach(function (d, i) {
          var name = d.el.textContent.trim().slice(0, 35);
          // console.log("[CRO-8037] #" + (i + 1) + (i === 15 ? " ← 16th" : "") + ": \"" + name + "\" top=" + d.top + " left=" + (d.left === Infinity ? "hidden" : Math.round(d.left)) + " inGroup=" + !!d.el.closest("[" + CRO.shopMoreAttr + "]"));
        });
      }

      var targetData = cardData.length >= 16 ? cardData[15] : cardData[cardData.length - 1];
      var targetCard = targetData.el;
      var shopMoreParent = targetCard.closest("[" + CRO.shopMoreAttr + "]");

      if (shopMoreParent) return shopMoreParent;

      var rowTop = targetData.top;
      var rowCards = cardData.filter(function (d) {
        return d.top === rowTop && !d.el.closest("[" + CRO.shopMoreAttr + "]");
      });
      var lastInRow = rowCards[rowCards.length - 1].el;
      return getFlexItemAncestor(lastInRow) || lastInRow;
    }

    function insertBannerAfter16Products(allowVisualFallback) {
      var currentCount = document.querySelectorAll(CRO.cardSel).length;
      var bannerExists = !!document.querySelector("[" + CRO.bannerAttr + "]");
      if (currentCount === lastCardCount && bannerExists) return;

      // Resolve __NEXT_DATA__ BEFORE committing to run.
      // If it's not ready yet and visual fallback isn't allowed, return without updating
      // lastCardCount so the next retry re-checks rather than skipping.
      var nextProps = window.__NEXT_DATA__ && window.__NEXT_DATA__.props && window.__NEXT_DATA__.props.pageProps;
      var page = nextProps && (nextProps.categoryPage || nextProps.shopPage || nextProps.clearanceSale);
      var dataItems = page && Array.isArray(page.items) ? page.items : null;

      if (!dataItems && !allowVisualFallback) {
        if (debug) console.log("[CRO-8037] __NEXT_DATA__ not ready — will retry");
        return;
      }

      lastCardCount = currentCount;
      removeExistingBanners();

      var shopMoreEls = buildShopMoreEls();
      var afterEl = null;

      if (dataItems) {
        var totalProducts = 0;
        for (var si = 0; si < dataItems.length; si++) {
          totalProducts += ((dataItems[si] && dataItems[si].props && dataItems[si].props.items) || []).length;
        }
        var targetN = Math.min(16, totalProducts);
        var count = 0;
        var groupsSeen = 0;
        var found = false;

        if (debug) console.log("[CRO-8037] __NEXT_DATA__ total products:", totalProducts, "| targeting #" + targetN);

        for (var si = 0; si < dataItems.length && !found; si++) {
          var sectionProds = (dataItems[si] && dataItems[si].props && dataItems[si].props.items) || [];
          var isGroup = sectionProds.length > 1;

          for (var pi = 0; pi < sectionProds.length && !found; pi++) {
            count++;
            if (count === targetN) {
              var prod = sectionProds[pi];
              if (debug) console.log("[CRO-8037] #" + targetN + " (via __NEXT_DATA__): \"" + (prod.shortName || prod.id) + "\" | inGroup=" + isGroup + " | groupIdx=" + (isGroup ? groupsSeen : "n/a"));

              if (isGroup) {
                // Find product in DOM by URL match
                var allDomCards = document.querySelectorAll(CRO.cardSel);
                var matchedCard = null;
                for (var k = 0; k < allDomCards.length; k++) {
                  if (allDomCards[k].querySelector('a[href*="/' + prod.id + '"]')) {
                    matchedCard = allDomCards[k];
                    break;
                  }
                }
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
                  // 3. No DOM group found — insert after the 16th product's visual row
                  if (!afterEl) afterEl = findFreeCardRowEl(prod.id);
                }
                // Product not yet in DOM (collapsed/hidden) → fall back to positional index
                if (!afterEl) afterEl = shopMoreEls[groupsSeen] || null;
                // if (debug && afterEl)  console.log("[CRO-8037] → Banner after:", afterEl.querySelector && afterEl.querySelector("h2") ? afterEl.querySelector("h2").textContent.trim() : afterEl);
              } else {
                afterEl = findFreeCardRowEl(prod.id);
              }
              found = true;
            }
          }
          if (!found && isGroup) groupsSeen++;
        }
      }

      cleanupShopMoreEls(shopMoreEls);

      // FALLBACK: visual sort (if __NEXT_DATA__ unavailable or product not found in DOM)
      if (!afterEl) {
        // if (debug)  console.log("[CRO-8037] Falling back to visual sort");
        shopMoreEls = buildShopMoreEls();
        afterEl = find16thVisualSort(shopMoreEls);
        cleanupShopMoreEls(shopMoreEls);
      }

      if (!afterEl) return;

      var parentDisplay = afterEl.parentElement ? window.getComputedStyle(afterEl.parentElement).display : "";
      var isFlexItem = parentDisplay.indexOf("flex") !== -1;

      // if (debug)  console.log("[CRO-8037] Inserting after:", afterEl, "| isFlexItem:", isFlexItem);
      afterEl.insertAdjacentElement("afterend", createBannerNode(isFlexItem));
    }

    function init() {
      addClass('body', variation_name);

      waitForElement(CRO.cardSel, function () {
        insertBannerAfter16Products(false);

        // Retry every 400ms for up to 5 seconds, stopping as soon as the banner is placed.
        // Passes allowVisualFallback=true only on the last attempts (after 4.5s) so that
        // the visual sort is a true last resort — not an early-fire on hidden/unrendered cards.
        var start = Date.now();
        var intervalCallAgain = setInterval(function () {
          if (document.querySelector("[" + CRO.bannerAttr + "]")) {
            clearInterval(intervalCallAgain);
            return;
          }
          var elapsed = Date.now() - start;
          insertBannerAfter16Products(elapsed >= 4500);
          if (elapsed >= 5000) clearInterval(intervalCallAgain);
        }, 400);
      });
    }

    if (!window[CRO.flag]) {
      window[CRO.flag] = true;

    }
    waitForElement("body", init);

  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
