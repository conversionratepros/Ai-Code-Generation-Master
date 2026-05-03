(function () {
  try {
    var debug = 0;
    var variation_name = "CRO-12051";
    var cro12051AddressObserver = null;
    var cro12051ScrollHandler = null;

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

    function insertHtml(selector, content, position) {
      var el = document.querySelector(selector);
      if (!position) position = 'afterend';
      if (el && content) el.insertAdjacentHTML(position, content);
    }

    function initStickyFooter() {
      var atcEl = document.querySelector('.container-fluid .product-detail x-add-to-cart-button');
      if (!atcEl) return;

      function checkVisibility() {
        var rect = atcEl.getBoundingClientRect();
        var isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          document.body.classList.remove('cro-12051-atc-hidden');
        } else {
          document.body.classList.add('cro-12051-atc-hidden');
        }
      }

      cro12051ScrollHandler = checkVisibility;
      checkVisibility();
      document.addEventListener('scroll', checkVisibility, true);
    }

    function cleanupTest() {
      ['.cro-12051-delivery', '.cro-12051-usp-strip', '.cro-12051-payment'].forEach(function (sel) {
        var el = document.querySelector(sel);
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });
      if (cro12051AddressObserver) {
        cro12051AddressObserver.disconnect();
        cro12051AddressObserver = null;
      }
      if (cro12051ScrollHandler) {
        document.removeEventListener('scroll', cro12051ScrollHandler, true);
        cro12051ScrollHandler = null;
        document.body.classList.remove('cro-12051-atc-hidden');
      }
      window.cro_12051_sticky = false;
    }

    function observeAddressChange() {
      if (cro12051AddressObserver) return;
      var regionEl = document.querySelector('.x-region-select');
      if (!regionEl) return;

      var debounceTimer;
      cro12051AddressObserver = new MutationObserver(function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
          var existing = document.querySelector('.cro-12051-delivery');
          var existingUsp = document.querySelector('.cro-12051-usp-strip');
          if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
          if (existingUsp && existingUsp.parentNode) existingUsp.parentNode.removeChild(existingUsp);
          initDeliveryBadge();
        }, 1000);
      });

      cro12051AddressObserver.observe(regionEl, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    function watchSpaNavigation() {
      if (window.cro_12051_nav_watch) return;
      window.cro_12051_nav_watch = true;

      var lastUrl = location.href;

      function handleUrlChange() {
        if (location.href === lastUrl) return;
        lastUrl = location.href;
        cleanupTest();
        var newUrl = location.href.split('?')[0].replace(/\/$/, '');
        if (!babylonstorenProductUSPs[newUrl]) return;
        waitForElement('.container-fluid .product-detail x-add-to-cart-button', function () {
          if (window.innerWidth < 992 && !window.cro_12051_sticky) {
            initStickyFooter();
            window.cro_12051_sticky = true;
          }
          initDeliveryBadge();
          waitForElement('.shop .x-product-attributes', initPaymentSection);
          waitForElement('.x-region-select', observeAddressChange);
        });
      }

      var origPushState = history.pushState;
      var origReplaceState = history.replaceState;

      history.pushState = function () {
        origPushState.apply(this, arguments);
        handleUrlChange();
      };
      history.replaceState = function () {
        origReplaceState.apply(this, arguments);
        handleUrlChange();
      };
      window.addEventListener('popstate', handleUrlChange);
    }

    const babylonstorenProductUSPs = {
      "https://shop.babylonstoren.com/za/p/3871/chenin-blanc-2025": {
        "name": "Chenin Blanc 2025",
        "usps": [
          {
            "id": "USP17",
            "headline": "Easy, hassle-free returns",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-home.svg"
          },
          {
            "id": "USP06",
            "headline": "Great for entertaining",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          },
          {
            "id": "USP11",
            "headline": "Pairs great with food",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-utensils-crossed.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/869/hot-cross-bun-loaf": {
        "name": "Hot Cross Bun Loaf",
        "usps": [
          {
            "id": "USP03",
            "headline": "Farm fresh",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-sprout.svg"
          },
          {
            "id": "USP16",
            "headline": "Locally sourced ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-scroll.svg"
          },
          {
            "id": "USP07",
            "headline": "Artisanally made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-award.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5724/clutch-of-chocolate-eggs": {
        "name": "Clutch of Chocolate Eggs",
        "usps": [
          {
            "id": "USP06",
            "headline": "Premium ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          },
          {
            "id": "USP07",
            "headline": "Artisanally made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-award.svg"
          },
          {
            "id": "USP04",
            "headline": "Perfect gift",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-gift.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5728/hatching-speckled-eggs": {
        "name": "Hatching Speckled Eggs",
        "usps": [
          {
            "id": "USP06",
            "headline": "Premium ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          },
          {
            "id": "USP07",
            "headline": "Artisanally made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-award.svg"
          },
          {
            "id": "USP04",
            "headline": "Perfect gift",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-gift.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5723/chicken-coop": {
        "name": "Chicken Coop",
        "usps": [
          {
            "id": "USP06",
            "headline": "Premium ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          },
          {
            "id": "USP07",
            "headline": "Artisanally made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-award.svg"
          },
          {
            "id": "USP04",
            "headline": "Perfect gift",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-gift.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/3783/egg-basket": {
        "name": "Egg Basket",
        "usps": [
          {
            "id": "USP02",
            "headline": "Handcrafted",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-hand.svg"
          },
          {
            "id": "USP14",
            "headline": "A keepsake piece",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-bookmark.svg"
          },
          {
            "id": "USP19",
            "headline": "Everyday use",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-repeat.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/4785/canola-oil": {
        "name": "Canola Oil",
        "usps": [
          {
            "id": "USP01",
            "headline": "Locally sourced",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-leaf.svg"
          },
          {
            "id": "USP08",
            "headline": "Sustainably produced",
            "icon": "recycle"
          },
          {
            "id": "USP19",
            "headline": "Everyday use",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-repeat.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/4521/babylonstoren-coffee-beans-037062": {
        "name": "Babylonstoren Coffee - Beans",
        "usps": [
          {
            "id": "USP17",
            "headline": "Estate grown",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-home.svg"
          },
          {
            "id": "USP06",
            "headline": "Premium ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          },
          {
            "id": "USP07",
            "headline": "Artisanally made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-award.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5529/forest-raised-deep-bowl": {
        "name": "Forest Raised Deep Bowl",
        "usps": [
          {
            "id": "USP02",
            "headline": "Handcrafted",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-hand.svg"
          },
          {
            "id": "USP15",
            "headline": "Timeless design",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-sparkles.svg"
          },
          {
            "id": "USP19",
            "headline": "Everyday use",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-repeat.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/4254/outydse-koekieblik-122db4": {
        "name": "Outydse Koekieblik",
        "usps": [
          {
            "id": "USP16",
            "headline": "Locally sourced ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-scroll.svg"
          },
          {
            "id": "USP14",
            "headline": "",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-bookmark.svg"
          },
          {
            "id": "USP04",
            "headline": "Perfect gift",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-gift.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/4254/outydse-koekieblik-d7c975": {
        "name": "Outydse Koekieblik",
        "usps": [
          {
            "id": "USP16",
            "headline": "Locally sourced ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-scroll.svg"
          },
          {
            "id": "USP14",
            "headline": "",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-bookmark.svg"
          },
          {
            "id": "USP04",
            "headline": "Perfect gift",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-gift.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/2038/leg-of-lamb": {
        "name": "Leg of Lamb",
        "usps": [
          {
            "id": "USP01",
            "headline": "Locally sourced",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-leaf.svg"
          },
          {
            "id": "USP09",
            "headline": "Ready to cook",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+[…]+%7C+ALL+%7C+CRO-12051/CRO-12051-chef-hat.svg"
          },
          {
            "id": "USP03",
            "headline": "Farm fresh",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-sprout.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5729/spikkels-die-hen": {
        "name": "Spikkels die Hen",
        "usps": [
          {
            "id": "USP06",
            "headline": "Premium ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          },
          {
            "id": "USP02",
            "headline": "Handcrafted",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-hand.svg"
          },
          {
            "id": "USP14",
            "headline": "A keepsake piece",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-bookmark.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/3269/golden-gourmet": {
        "name": "Golden Gourmet",
        "usps": [
          {
            "id": "USP04",
            "headline": "Perfect gift",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-gift.svg"
          },
          {
            "id": "USP12",
            "headline": "Great for entertaining",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-users.svg"
          },
          {
            "id": "USP06",
            "headline": "Premium ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/3930/beef-biltong": {
        "name": "Beef Biltong",
        "usps": [
          {
            "id": "USP05",
            "headline": "Localy made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-map-pin.svg"
          },
          {
            "id": "USP16",
            "headline": "Localy sourced ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-scroll.svg"
          },
          {
            "id": "USP10",
            "headline": "Ready to eat",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-utensils.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5726/lucky-ladybirds": {
        "name": "Lucky Ladybirds",
        "usps": [
          {
            "id": "USP06",
            "headline": "Premium ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          },
          {
            "id": "USP07",
            "headline": "Artisanally made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-award.svg"
          },
          {
            "id": "USP02",
            "headline": "Handcrafted",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-hand.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/4885/rose-garland-blanket": {
        "name": "Rose Garland Blanket",
        "usps": [
          {
            "id": "USP02",
            "headline": "Handcrafted",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-hand.svg"
          },
          {
            "id": "USP15",
            "headline": "Timeless design",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-sparkles.svg"
          },
          {
            "id": "USP14",
            "headline": "A keepsake piece",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-bookmark.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5743/the-easter-s-mores-soiree": {
        "name": "The Easter S’mores Soirée",
        "usps": [
          {
            "id": "USP04",
            "headline": "Perfect gift",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-gift.svg"
          },
          {
            "id": "USP12",
            "headline": "Great for entertaining",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-users.svg"
          },
          {
            "id": "USP06",
            "headline": "Premium ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5790/sweet-salty-738a27": {
        "name": "Sweet & Salty",
        "usps": [
          {
            "id": "USP04",
            "headline": "Perfect gift",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-gift.svg"
          },
          {
            "id": "USP12",
            "headline": "Great for entertaining",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-users.svg"
          },
          {
            "id": "USP10",
            "headline": "Ready to eat",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-utensils.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/4288/classic-collective": {
        "name": "Classic Collective",
        "usps": [
          {
            "id": "USP17",
            "headline": "Estate grown",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-home.svg"
          },
          {
            "id": "USP06",
            "headline": "Premium ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          },
          {
            "id": "USP04",
            "headline": "Perfect gift",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-gift.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/3482/yellowtail-portions": {
        "name": "Yellowtail Portions",
        "usps": [
          {
            "id": "USP01",
            "headline": "Locally sourced",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-leaf.svg"
          },
          {
            "id": "USP09",
            "headline": "Ready to cook",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+[…]+%7C+ALL+%7C+CRO-12051/CRO-12051-chef-hat.svg"
          },
          {
            "id": "USP03",
            "headline": "Farm fresh",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-sprout.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/3933/blue-delft-knit-throw": {
        "name": "Blue Delft Knit Throw",
        "usps": [
          {
            "id": "USP15",
            "headline": "Timeless design",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-sparkles.svg"
          },
          {
            "id": "USP19",
            "headline": "Everyday use",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-repeat.svg"
          },
          {
            "id": "USP14",
            "headline": "A keepsake piece",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-bookmark.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5718/hot-cross-chocolate-biscuits": {
        "name": "Hot Cross Chocolate Biscuits",
        "usps": [
          {
            "id": "USP16",
            "headline": "Localy sourced ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-scroll.svg"
          },
          {
            "id": "USP07",
            "headline": "Artisanally made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-award.svg"
          },
          {
            "id": "USP10",
            "headline": "Ready to eat",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-utensils.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5814/eco-friendly-compact-umbrella-dots": {
        "name": "Eco-friendly Compact Umbrella - Dots",
        "usps": [
          {
            "id": "USP08",
            "headline": "Sustainably produced",
            "icon": "recycle"
          },
          {
            "id": "USP20",
            "headline": "Travel friendly",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-briefcase.svg"
          },
          {
            "id": "USP02",
            "headline": "Handcrafted",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-hand.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5512/everyday-energy-c65edc": {
        "name": "Everyday Energy",
        "usps": [
          {
            "id": "USP04",
            "headline": "Perfect gift",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-gift.svg"
          },
          {
            "id": "USP13",
            "headline": "Naturally nourishing",
            "icon": "http://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-heart.svg"
          },
          {
            "id": "USP12",
            "headline": "Great for entertaining",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-users.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5781/packing-cube-set": {
        "name": "Cotton Packing Cube Set - 3-piece",
        "usps": [
          {
            "id": "USP20",
            "headline": "Travel friendly",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-briefcase.svg"
          },
          {
            "id": "USP08",
            "headline": "Sustainably produced",
            "icon": "recycle"
          },
          {
            "id": "USP02",
            "headline": "Handcrafted",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-hand.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/892/seasonal-harvest-box": {
        "name": "Seasonal Harvest Box",
        "usps": [
          {
            "id": "USP01",
            "headline": "Locally sourced",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-leaf.svg"
          },
          {
            "id": "USP03",
            "headline": "Farm fresh",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-sprout.svg"
          },
          {
            "id": "USP18",
            "headline": "Seasonal & limited",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-calendar.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/4041/ladies-lounge-set": {
        "name": "Ladies’ Lounge Set",
        "usps": [
          {
            "id": "USP15",
            "headline": "Timeless design",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-sparkles.svg"
          },
          {
            "id": "USP19",
            "headline": "Everyday use",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-repeat.svg"
          },
          {
            "id": "USP02",
            "headline": "Handcrafted",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-hand.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/3931/beef-droewors": {
        "name": "Beef Droëwors",
        "usps": [
          {
            "id": "USP05",
            "headline": "Localy made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-map-pin.svg"
          },
          {
            "id": "USP16",
            "headline": "Localy sourced ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-scroll.svg"
          },
          {
            "id": "USP10",
            "headline": "Ready to eat",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-utensils.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/3470/half-lamb": {
        "name": "Half Lamb",
        "usps": [
          {
            "id": "USP01",
            "headline": "Locally sourced",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-leaf.svg"
          },
          {
            "id": "USP09",
            "headline": "Ready to cook",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+[…]+%7C+ALL+%7C+CRO-12051/CRO-12051-chef-hat.svg"
          },
          {
            "id": "USP03",
            "headline": "Farm fresh",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-sprout.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5600/dried-mango-strips": {
        "name": "Dried Mango Strips",
        "usps": [
          {
            "id": "USP13",
            "headline": "Naturally nourishing",
            "icon": "http://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-heart.svg"
          },
          {
            "id": "USP10",
            "headline": "Ready to eat",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-utensils.svg"
          },
          {
            "id": "USP20",
            "headline": "Travel friendly",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-briefcase.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/4458/fermentation-crock": {
        "name": "Fermentation Crock",
        "usps": [
          {
            "id": "USP02",
            "headline": "Handcrafted",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-hand.svg"
          },
          {
            "id": "USP19",
            "headline": "Everyday use",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-repeat.svg"
          },
          {
            "id": "USP08",
            "headline": "Sustainably produced",
            "icon": "recycle"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5732/easter-bites-6c3364": {
        "name": "Easter Bites",
        "usps": [
          {
            "id": "USP04",
            "headline": "Perfect gift",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-gift.svg"
          },
          {
            "id": "USP06",
            "headline": "Premium ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          },
          {
            "id": "USP14",
            "headline": "A keepsake piece",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-bookmark.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/2681/dark-chocolate-macadamia-nut-torte": {
        "name": "Dark Chocolate & Macadamia Flourless Torte",
        "usps": [
          {
            "id": "USP06",
            "headline": "Premium ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          },
          {
            "id": "USP07",
            "headline": "Artisanally made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-award.svg"
          },
          {
            "id": "USP02",
            "headline": "Handcrafted",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-hand.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/3920/almond-coconut-seed-granola": {
        "name": "Almond, Coconut & Seed Granola",
        "usps": [
          {
            "id": "USP13",
            "headline": "Naturally nourishing",
            "icon": "http://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-heart.svg"
          },
          {
            "id": "USP03",
            "headline": "Farm fresh",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-sprout.svg"
          },
          {
            "id": "USP16",
            "headline": "Localy sourced ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-scroll.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5710/easter-egg-hunt": {
        "name": "Easter Egg Hunt",
        "usps": [
          {
            "id": "USP04",
            "headline": "Perfect gift",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-gift.svg"
          },
          {
            "id": "USP06",
            "headline": "Premium ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          },
          {
            "id": "USP14",
            "headline": "A keepsake piece",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-bookmark.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/3194/farmstyle-buttermilk-rusks": {
        "name": "Farmstyle Buttermilk Rusks",
        "usps": [
          {
            "id": "USP16",
            "headline": "Localy sourced ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-scroll.svg"
          },
          {
            "id": "USP07",
            "headline": "Artisanally made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-award.svg"
          },
          {
            "id": "USP10",
            "headline": "Ready to eat",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-utensils.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/557/bitterlekker": {
        "name": "Bitterlekker",
        "usps": [
          {
            "id": "USP07",
            "headline": "Artisanally made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-award.svg"
          },
          {
            "id": "USP05",
            "headline": "Localy made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-map-pin.svg"
          },
          {
            "id": "USP11",
            "headline": "Pairs great with food",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-utensils-crossed.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/1814/belgian-milk-chocolate-yoghurt-medium": {
        "name": "Belgian Milk Chocolate Yoghurt - Medium",
        "usps": [
          {
            "id": "USP06",
            "headline": "Premium ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          },
          {
            "id": "USP03",
            "headline": "Farm fresh",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-sprout.svg"
          },
          {
            "id": "USP13",
            "headline": "Naturally nourishing",
            "icon": "http://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-heart.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5722/duck-duck-goose-soetkoekie": {
        "name": "Duck Duck Goose Soetkoekie",
        "usps": [
          {
            "id": "USP06",
            "headline": "Premium ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          },
          {
            "id": "USP02",
            "headline": "Handcrafted",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-hand.svg"
          },
          {
            "id": "USP16",
            "headline": "Localy sourced ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-scroll.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5017/chicken-curry-mild-7ec6ac": {
        "name": "Chicken Curry - Mild",
        "usps": [
          {
            "id": "USP10",
            "headline": "Ready to eat",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-utensils.svg"
          },
          {
            "id": "USP03",
            "headline": "Farm fresh",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-sprout.svg"
          },
          {
            "id": "USP07",
            "headline": "Artisanally made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-award.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5791/chickpea-aubergine-curry": {
        "name": "Chickpea & Aubergine Curry",
        "usps": [
          {
            "id": "USP10",
            "headline": "Ready to eat",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-utensils.svg"
          },
          {
            "id": "USP13",
            "headline": "Naturally nourishing",
            "icon": "http://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-heart.svg"
          },
          {
            "id": "USP08",
            "headline": "Sustainably produced",
            "icon": "recycle"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5746/hot-cross-cruffins": {
        "name": "Hot Cross Cruffins",
        "usps": [
          {
            "id": "USP07",
            "headline": "Artisanally made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-award.svg"
          },
          {
            "id": "USP16",
            "headline": "Localy sourced ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-scroll.svg"
          },
          {
            "id": "USP10",
            "headline": "Ready to eat",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-utensils.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5202/aluminium-bowl": {
        "name": "Aluminium Bowl",
        "usps": [
          {
            "id": "USP02",
            "headline": "Handcrafted",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-hand.svg"
          },
          {
            "id": "USP15",
            "headline": "Timeless design",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-sparkles.svg"
          },
          {
            "id": "USP19",
            "headline": "Everyday use",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-repeat.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/4986/milk-tart-de-natas-pack-of-12": {
        "name": "Milk Tart de Natas - Pack of 12",
        "usps": [
          {
            "id": "USP16",
            "headline": "Locally sourced ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-scroll.svg"
          },
          {
            "id": "USP05",
            "headline": "Locally made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-map-pin.svg"
          },
          {
            "id": "USP10",
            "headline": "Ready to eat",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-utensils.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/5478/babylonstoren-coffee-ground-ee0e87": {
        "name": "Babylonstoren Coffee - Ground",
        "usps": [
          {
            "id": "USP17",
            "headline": "Single-origin",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-home.svg"
          },
          {
            "id": "USP06",
            "headline": "Premium ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          },
          {
            "id": "USP07",
            "headline": "Artisanally made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-award.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/3845/natural-embroidered-tablecloth": {
        "name": "Natural Embroidered Tablecloth",
        "usps": [
          {
            "id": "USP02",
            "headline": "Handcrafted",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-hand.svg"
          },
          {
            "id": "USP15",
            "headline": "Timeless design",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-sparkles.svg"
          },
          {
            "id": "USP14",
            "headline": "A keepsake piece",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-bookmark.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/2699/gianduia": {
        "name": "Gianduia",
        "usps": [
          {
            "id": "USP06",
            "headline": "Premium ingredients",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-star.svg"
          },
          {
            "id": "USP07",
            "headline": "Artisanally made",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-award.svg"
          },
          {
            "id": "USP02",
            "headline": "Handcrafted",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-hand.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/4774/babel-bites-bf7529": {
        "name": "Babel Bites",
        "usps": [
          {
            "id": "USP04",
            "headline": "Perfect gift",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-gift.svg"
          },
          {
            "id": "USP12",
            "headline": "Great for entertaining",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-users.svg"
          },
          {
            "id": "USP17",
            "headline": "Estate grown",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-home.svg"
          }
        ]
      },
      "https://shop.babylonstoren.com/za/p/2229/trio-of-tea": {
        "name": "Trio of Tea",
        "usps": [
          {
            "id": "USP13",
            "headline": "Naturally nourishing",
            "icon": "http://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-heart.svg"
          },
          {
            "id": "USP01",
            "headline": "Locally sourced",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-leaf.svg"
          },
          {
            "id": "USP19",
            "headline": "Everyday use",
            "icon": "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-repeat.svg"
          }
        ]
      }
    };

    function initUspStrip() {
      if (document.querySelector('.cro-12051-usp-strip')) return;

      var currentUrl = window.location.origin + window.location.pathname;
      var product = babylonstorenProductUSPs[currentUrl];
      var usps = product ? product.usps.slice() : [];

      var hasReturns = usps.some(function (u) { return u.headline === 'Easy, hassle-free returns'; });
      if (!hasReturns) {
        usps.unshift({
          headline: 'Easy, hassle-free returns',
          icon: 'https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/Recipe+%7C+Buy+Box+%7C+PDP+Buy+Box+Redesign+%7C+ALL+%7C+CRO-12051/CRO-12051-home.svg'
        });
      }

      var items = usps.map(function (usp) {
        var iconHtml = usp.icon ? '<img class="cro-12051-usp-icon" src="' + usp.icon + '" alt="" />' : '';
        return '<div class="cro-12051-usp-item">' + iconHtml + '<span class="cro-12051-usp-label">' + usp.headline + '</span></div>';
      }).join('');

      var html = '<div class="cro-12051-usp-strip" style="display: none;">' + items + '</div>';
      var uspTarget = document.querySelector('.cro-12051-delivery')
        ? '.cro-12051-delivery'
        : '.container-fluid .product-detail x-add-to-cart-button';
      insertHtml(uspTarget, html);
    }

    function initPaymentSection() {
      if (document.querySelector('.cro-12051-payment')) return;

      var lockSvg = '<svg width="16" height="15" viewBox="2 2 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.014 13.0543V14.7233M5.84158 9.32312C6.23497 9.29908 6.71995 9.29908 7.34366 9.29908H12.6844C13.3081 9.29908 13.7931 9.29908 14.1865 9.32312M5.84158 9.32312C5.35063 9.35307 5.00233 9.4205 4.70503 9.57196C4.23397 9.81196 3.85099 10.1949 3.61098 10.666C3.33812 11.2015 3.33812 11.9025 3.33812 13.3046V14.4729C3.33812 15.875 3.33812 16.576 3.61098 17.1116C3.85099 17.5826 4.23397 17.9656 4.70503 18.2056C5.24055 18.4785 5.94159 18.4785 7.34366 18.4785H12.6844C14.0865 18.4785 14.7875 18.4785 15.323 18.2056C15.7941 17.9656 16.1771 17.5826 16.417 17.1116C16.6899 16.576 16.6899 15.875 16.6899 14.4729V13.3046C16.6899 11.9025 16.6899 11.2015 16.417 10.666C16.1771 10.1949 15.7941 9.81196 15.323 9.57196C15.0257 9.4205 14.6774 9.35307 14.1865 9.32312M5.84158 9.32312V7.63011C5.84158 5.32573 7.70965 3.45767 10.014 3.45767C12.3184 3.45767 14.1865 5.32573 14.1865 7.63011V9.32312" stroke="#4A4A4A" stroke-width="1.13803" stroke-linecap="round" stroke-linejoin="round"/></svg>';

      var html = '<div class="cro-12051-payment" style="display: none;">' +
        '<div class="cro-12051-payment-left">' +
        lockSvg +
        '<span class="cro-12051-payment-text">100% secure payments</span>' +
        '</div>' +
        '<div class="cro-12051-payment-logos">' +
        '<img src="https://res.cloudinary.com/babylon/image/upload/v1670223009/babylonstoren/icons/icon-apple-pay-logo.svg" alt="Apple Pay" />' +
        '<img src="https://res.cloudinary.com/babylon/image/upload/v1670221856/babylonstoren/icons/icon-american-express-logo.svg" alt="American Express" />' +
        '<img src="https://res.cloudinary.com/babylon/image/upload/v1670221857/babylonstoren/icons/icon-visa-logo.svg" alt="Visa" />' +
        '<img src="https://res.cloudinary.com/babylon/image/upload/v1670221856/babylonstoren/icons/icon-mastercard-logo.svg" alt="Mastercard" />' +
        '<img src="https://res.cloudinary.com/babylon/image/upload/v1670221856/babylonstoren/icons/gift_card.svg" alt="Gift Card" />' +
        '</div>' +
        '</div>';

      insertHtml('.shop .x-product-attributes', html);
    }

    function initDeliveryBadge() {
      if (document.querySelector('.cro-12051-delivery')) return;
      if (!document.querySelector('.container-fluid .product-detail x-add-to-cart-button:not(.mat-mdc-button-disabled) .button-size-medium')) return;


      var regionEl = document.querySelector('.x-region-select span.mat-caption');
      var copy = '';

      if (!regionEl) {
        // No address set — bail if product is unavailable
        var atcComp = document.querySelector('.container-fluid .product-detail x-add-to-cart-button');
        var atcTxt = atcComp ? atcComp.textContent.trim().toUpperCase() : '';
        var prodDetail = document.querySelector('.container-fluid .product-detail');
        var prodTxt = prodDetail ? prodDetail.textContent.toUpperCase() : '';
        if (atcTxt.indexOf('UNAVAILABLE') !== -1 || prodTxt.indexOf('UNAVAILABLE') !== -1) {
          return;
        }

        // Check if CPT / JHB pills are visible next to the price
        var productDetailEl = document.querySelector('.container-fluid .product-detail');
        var detailText = productDetailEl ? productDetailEl.textContent : '';
        var hasPills = detailText.indexOf('CPT') !== -1 || detailText.indexOf('JHB') !== -1;

        if (hasPills) {
          copy = '<b>Free next-day delivery</b> in Cape Town, Johannesburg &amp; Pretoria. <a class="cro-12051-delivery-link" href="https://shop.babylonstoren.com/za/l/xs9kanfdm2agix4gs9ird414/delivery">View more details.</a>';
        } else {
          copy = '<b>Free next-day delivery</b> in Cape Town, Johannesburg &amp; Pretoria. <a class="cro-12051-delivery-link" href="https://shop.babylonstoren.com/za/l/xs9kanfdm2agix4gs9ird414/delivery">View more details.</a>';
        }
      } else {
        // Address is set — check if product is unavailable
        // Read from the full x-add-to-cart-button component (covers all inner element variations)
        // and from the product detail area where the "Unavailable" pill shows next to price
        var atcComponent = document.querySelector('.container-fluid .product-detail x-add-to-cart-button');
        var atcText = atcComponent ? atcComponent.textContent.trim().toUpperCase() : '';
        var productDetail = document.querySelector('.container-fluid .product-detail');
        var detailText = productDetail ? productDetail.textContent.toUpperCase() : '';
        var isUnavailable = atcText.indexOf('UNAVAILABLE') !== -1 || detailText.indexOf('UNAVAILABLE') !== -1;
        if (isUnavailable) {
          return;
        }

        var regionText = regionEl.textContent || '';
        var isCptOrJhb = regionText.indexOf('CPT') !== -1 || regionText.indexOf('JHB') !== -1;

        if (isCptOrJhb) {
          copy = '<b>Free next-day delivery</b> in Cape Town, Johannesburg &amp; Pretoria. <a class="cro-12051-delivery-link" href="https://shop.babylonstoren.com/za/l/xs9kanfdm2agix4gs9ird414/delivery">View more details.</a>';
        } else {
          copy = 'Free delivery nationwide. <a class="cro-12051-delivery-link" href="https://shop.babylonstoren.com/za/l/xs9kanfdm2agix4gs9ird414/delivery">View more details.</a>';
        }
      }

      var truckSvg = '<svg width="16" height="13" viewBox="11 9 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M22.6666 10H12.6666V18.6667H22.6666V10Z" stroke="#09223F" stroke-width="0.852214"/>' +
        '<path d="M22.6666 13.3333H25.3333L27.3333 15.3333V18.6667H22.6666V13.3333Z" stroke="#09223F" stroke-width="0.852214"/>' +
        '<path d="M15.6667 22C16.5871 22 17.3333 21.2538 17.3333 20.3333C17.3333 19.4128 16.5871 18.6667 15.6667 18.6667C14.7462 18.6667 14 19.4128 14 20.3333C14 21.2538 14.7462 22 15.6667 22Z" stroke="#09223F" stroke-width="0.852214"/>' +
        '<path d="M24.3333 22C25.2538 22 26 21.2538 26 20.3333C26 19.4128 25.2538 18.6667 24.3333 18.6667C23.4128 18.6667 22.6666 19.4128 22.6666 20.3333C22.6666 21.2538 23.4128 22 24.3333 22Z" stroke="#09223F" stroke-width="0.852214"/>' +
        '</svg>';

      var html = '<div class="cro-12051-delivery" style="display: none;">' +
        truckSvg +
        '<p class="cro-12051-delivery-text">' + copy + '</p>' +
        '</div>';

      insertHtml('.container-fluid .product-detail x-add-to-cart-button', html);
      initUspStrip();
    }

    function init() {
      /* ---- Step 1: Desktop - Widen Add to Bag button (CSS handles the styling) ---- */
      addClass('body', variation_name);

      /* ---- Step 3: Mobile - Sticky footer slide behaviour (mobile only, runs once) ---- */
      if (window.innerWidth < 992) {
        if (!window.cro_12051_sticky) {
          waitForElement('.container-fluid .product-detail x-add-to-cart-button', initStickyFooter);
          window.cro_12051_sticky = true;
        }
      }

      /* ---- Step 4 + 5: Delivery badge then USP strip (chained) ---- */
      waitForElement('.container-fluid .product-detail x-add-to-cart-button', initDeliveryBadge);

      /* ---- Step 6: Payment section ---- */
      waitForElement('.shop .x-product-attributes', initPaymentSection);

      /* ---- SPA: watch address changes + page navigation ---- */
      var cro12051CurrentUrl = location.href.split('?')[0].replace(/\/$/, '');
      if (babylonstorenProductUSPs[cro12051CurrentUrl]) {
        waitForElement('.x-region-select', observeAddressChange);
        // watchSpaNavigation();
      }
    }

    waitForElement('body', init);
  } catch (e) {
    if (debug) console.log(e, "error in Test " + variation_name);
  }
})();