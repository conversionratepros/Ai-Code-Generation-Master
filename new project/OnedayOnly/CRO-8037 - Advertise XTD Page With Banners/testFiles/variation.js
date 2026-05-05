(function () {
  try {
    var debug = 0;
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
      // S3 filenames are swapped — mobile.svg is the wide desktop banner, desktop.svg is the square mobile banner
      imgDesktop:
        "https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/i3+%7C+Advertise+XTD+page+with+banners+%7C+ALL+%7C+CRO-8037/i3_Advertise_banners_ALL_CRO8037_mobile.svg",
      imgMobile:
        "https://crp-clients-images.s3.af-south-1.amazonaws.com/OneDayOnly/i3+%7C+Advertise+XTD+page+with+banners+%7C+ALL+%7C+CRO-8037/i3_Advertise_banners_ALL_CRO8037_desktop.svg",
      link: "https://www.onedayonly.co.za/shops/extra-time-deals",
      productLinkSel: '[width="1"] > div [href*="/products"]'
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

    function getAbsoluteTop(el) {
      return el.getBoundingClientRect().top + window.scrollY;
    }

    function getFlexItemFromLink(linkEl) {
      var el = linkEl;
      while (el && el !== document.body) {
        var parent = el.parentElement;
        if (parent && window.getComputedStyle(parent).display.indexOf("flex") !== -1) {
          var siblings = parent.children;
          for (var s = 0; s < siblings.length; s++) {
            if (siblings[s] !== el && siblings[s].querySelector('[href*="/products"]')) return el;
          }
        }
        el = parent;
      }
      return null;
    }

    function groupFlexItemsIntoVisualRows(flexItems) {
      // batch all getBoundingClientRect reads before sorting to avoid repeated reflows
      var rects = [];
      for (var i = 0; i < flexItems.length; i++) {
        rects.push(flexItems[i].getBoundingClientRect());
      }

      var map = {};
      for (var i = 0; i < flexItems.length; i++) {
        var key = String(Math.round(rects[i].top / 5) * 5);
        if (!map[key]) map[key] = [];
        map[key].push({ el: flexItems[i], left: rects[i].left });
      }

      var keys = Object.keys(map).sort(function (a, b) {
        return parseFloat(a) - parseFloat(b);
      });

      var rows = [];
      for (var k = 0; k < keys.length; k++) {
        var rowItems = map[keys[k]];
        rowItems.sort(function (a, b) { return a.left - b.left; });
        rows.push(rowItems.map(function (r) { return r.el; }));
      }
      return rows;
    }

    function buildUnifiedGroups() {
      var groups = [];

      var namedSections = [];
      var allSections = document.querySelectorAll('section');
      for (var i = 0; i < allSections.length; i++) {
        var el = allSections[i];
        if (
          el.querySelector('h2[font-weight="700"][font-size="4"]') &&
          el.querySelectorAll('[href*="/products"]').length > 1 &&
          !el.closest('[data-cro-ns]')
        ) {
          el.setAttribute('data-cro-ns', '1');
          namedSections.push(el);
          groups.push({ kind: "namedSection", afterEl: el, top: getAbsoluteTop(el) });
        }
      }

      var links = document.querySelectorAll(CRO.productLinkSel);
      var seen = new WeakSet();
      var flexItems = [];

      for (var i = 0; i < links.length; i++) {
        if (links[i].closest('[data-cro-ns]')) continue;
        var item = getFlexItemFromLink(links[i]);
        if (!item || seen.has(item)) continue;
        seen.add(item);
        flexItems.push(item);
      }

      var productRows = groupFlexItemsIntoVisualRows(flexItems);
      for (var j = 0; j < productRows.length; j++) {
        var lastItem = productRows[j][productRows[j].length - 1];
        if (lastItem) groups.push({ kind: "productRow", afterEl: lastItem, top: getAbsoluteTop(lastItem) });
      }

      groups.sort(function (a, b) { return a.top - b.top; });
      for (var i = 0; i < namedSections.length; i++) namedSections[i].removeAttribute('data-cro-ns');

      return groups;
    }

    var lastProductCount = -1;

    function insertBannersAfterEvery4thGroup() {
      // skip the expensive DOM work if the page content hasn't changed
      var currentCount = document.querySelectorAll(CRO.productLinkSel).length;
      if (currentCount === lastProductCount) return;
      lastProductCount = currentCount;

      removeExistingBanners();
      var groups = buildUnifiedGroups();
      if (groups.length === 0) return;

      if (debug) {
        console.log("[CRO-8037] Total groups detected:", groups.length);
        for (var d = 0; d < groups.length; d++) {
          console.log("[CRO-8037] Group " + (d + 1) + ":", groups[d].kind, "| top:", Math.round(groups[d].top), "| el:", groups[d].afterEl);
        }
      }

      for (var i = 0; i < groups.length; i++) {
        if ((i + 1) % 4 !== 0) continue;
        var g = groups[i];
        g.afterEl.insertAdjacentElement("afterend", createBannerNode(g.kind !== "namedSection"));
      }
    }

    function init() {
      addClass('body', variation_name);

      waitForElement(CRO.productLinkSel, function () {
        insertBannersAfterEvery4thGroup();

        var retries = 0;
        var intervalCallAgain = setInterval(function () {
          insertBannersAfterEvery4thGroup();
          if (++retries >= 15) clearInterval(intervalCallAgain);
        }, 400);
      });
    }

    if (!window[CRO.flag]) {
      window[CRO.flag] = true;
      waitForElement("body", init);
    }


  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
