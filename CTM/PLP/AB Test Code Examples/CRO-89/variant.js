(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "";

    /* helper liberary */
    var _$;
    !(function (factory) {
      _$ = factory();
    })(function () {
      var bm = function (s) {
        if (typeof s === "string") {
          this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
          this.value = [s];
        }
      };
      bm.prototype = {
        eq: function (n) {
          this.value = [this.value[n]];
          return this;
        },
        each: function (fn) {
          [].forEach.call(this.value, fn);
          return this;
        },
        waitForElement: function (selector, trigger, delayInterval, delayTimeout) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);
          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });

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

    var arrowMobileFilter = ` 
	  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
		<path d="M14.2812 7.75C14.2812 11.4961 11.2461 14.5313 7.5 14.5312C3.75391 14.5312 0.71875 11.4961 0.71875 7.75C0.71875 4.00391 3.75391 0.96875 7.5 0.96875C11.2461 0.96875 14.2812 4.00391 14.2812 7.75ZM7.96484 10.8672L11.6562 7.17578C11.9023 6.90234 11.9023 6.49219 11.6562 6.24609L11.1914 5.78125C10.9453 5.53516 10.5078 5.53516 10.2617 5.78125L7.5 8.57031L4.71094 5.78125C4.46484 5.53516 4.02734 5.53516 3.78125 5.78125L3.31641 6.24609C3.07031 6.49219 3.07031 6.92969 3.31641 7.17578L7.03516 10.8672C7.28125 11.1406 7.69141 11.1406 7.96484 10.8672Z" fill="white"/>
	  </svg>`;

    var productFilterSection = `
		<div class="crp54-container">
		  <div class="crp54-wrapper">
			<div class="crp54-wrapper-inside">
			  <div class="crp54-content crp54-category">
				<div class="crp54-category-header crp54-header">Category</div>
				<div class="crp54-category-name"></div>
			  </div>
			  <div class="crp54-content crp54-selected-items cro-t-54-hide">
				<ul class="crp54-selected-list"></ul>
				<div class="crp54-clear-all-selected crp54-text">Clear all filters</div>
			  </div>
			  <div class="crp54-content crp54-filtered-by cro-t-54-hide">
				<div class="crp54-filter-header crp54-header">Filter By</div>
				<div class="crp54-filter-wrapper"></div>
			  </div>
			</div>
		  </div>
		</div>
	  `;
    var productMobileFilterSection = `
		<div class="crp54-container-modal-close">
		  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
			<path d="M8.82031 7.25L12.3359 10.8008C12.793 11.2227 12.793 11.9258 12.3359 12.3477L11.5625 13.1211C11.1406 13.5781 10.4375 13.5781 10.0156 13.1211L6.5 9.60547L2.94922 13.1211C2.52734 13.5781 1.82422 13.5781 1.40234 13.1211L0.628906 12.3477C0.171875 11.9258 0.171875 11.2227 0.628906 10.8008L4.14453 7.25L0.628906 3.73438C0.171875 3.3125 0.171875 2.60938 0.628906 2.1875L1.40234 1.41406C1.82422 0.957031 2.52734 0.957031 2.94922 1.41406L6.5 4.92969L10.0156 1.41406C10.4375 0.957031 11.1406 0.957031 11.5625 1.41406L12.3359 2.1875C12.793 2.60938 12.793 3.3125 12.3359 3.73438L8.82031 7.25Z" fill="#ED1C24"/>
		  </svg>
		</div>
		<div class="crp54-container">
		  <div class="crp54-wrapper">
			<div class="crp54-wrapper-inside">
			  <div class="crp54-content crp54-category">
				<div class="crp54-category-header crp54-header">Category</div>
				<div class="crp54-category-name"></div>
			  </div>
			  <div class="crp54-content crp54-filtered-by cro-t-54-hide">
				<div class="crp54-filter-header crp54-header">Filter By</div>
				<div class="crp54-filter-wrapper"></div>
			  </div>
			</div>
		  </div>
		</div>
	  `;

    var productFilterSectionDesktop = `<div class="crp54-desktop-container">${productFilterSection}</div>`;

    var productFilterSectionMobile = `
      <div class="crp54-mobile-filter-overlay"></div>
      <div class="crp54-mobile-container">
        <div class="crp54-container-modal-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
            <path d="M8.82031 7.25L12.3359 10.8008C12.793 11.2227 12.793 11.9258 12.3359 12.3477L11.5625 13.1211C11.1406 13.5781 10.4375 13.5781 10.0156 13.1211L6.5 9.60547L2.94922 13.1211C2.52734 13.5781 1.82422 13.5781 1.40234 13.1211L0.628906 12.3477C0.171875 11.9258 0.171875 11.2227 0.628906 10.8008L4.14453 7.25L0.628906 3.73438C0.171875 3.3125 0.171875 2.60938 0.628906 2.1875L1.40234 1.41406C1.82422 0.957031 2.52734 0.957031 2.94922 1.41406L6.5 4.92969L10.0156 1.41406C10.4375 0.957031 11.1406 0.957031 11.5625 1.41406L12.3359 2.1875C12.793 2.60938 12.793 3.3125 12.3359 3.73438L8.82031 7.25Z" fill="#ED1C24"/>
          </svg>
        </div>
        ${productFilterSection}
      </div>
    `;

    var selectedProductFilter = `
		<div class="crp54-content crp54-selected-items crp54-selected-items-mobile cro-t-54-hide">
		  <ul class="crp54-selected-list"></ul>
		  <div class="crp54-clear-all-selected crp54-text">Clear all filters</div>
		</div>
	  `;

    var productFilterButton = ` 
	  <div class="cro-mobile-filter-button-container">
		<div class="cro-mobile-filter-button-wrapper">
		  <div class="cro-mobile-filter-button-text">Filter</div>
		  <div class="cro-mobile-filter-button-icon">${arrowMobileFilter}</div>
		</div>
	  </div>`;

    function listener() {
      window.addEventListener("locationchange", function () {
        if (document.querySelector(".crp54-desktop-container")) {
          document.querySelector(".crp54-desktop-container").remove();
        }

        if (document.querySelector(".crp54-mobile-container")) {
          document.querySelector(".crp54-mobile-container").remove();
        }

        if (document.querySelector(".crp54-modalOpen")) {
          document.querySelector("body").classList.remove("crp54-modalOpen");
        }

        if (document.querySelector(".crp54-scroll-off")) {
          document.querySelector(".crp54-scroll-off").classList.remove("crp54-scroll-off");
        }

        if (document.querySelector(".crp54-mobile-filter-overlay.crp54-overlay-open")) {
          document.querySelector(".crp54-mobile-filter-overlay").classList.remove("crp54-overlay-open");
        }

        setTimeout(function () {
          if (!document.querySelector(".catalog-category-view")) {
            document.querySelector("body").classList.remove("cro_Test54_product_filters");
          } else {
            helper.waitForElement(
              "body",
              function () {
                document.querySelector("body").classList.add("cro_Test54_product_filters");
                helper.waitForElement("#amasty-shopby-product-list > .wrapper.products", init, 50, 25000);
              },
              50,
              25000
            );
          }
        }, 600);
      });
      history.pushState = ((f) =>
        function pushState() {
          var ret = f.apply(this, arguments);
          window.dispatchEvent(new Event("pushstate"));
          window.dispatchEvent(new Event("locationchange"));
          return ret;
        })(history.pushState);
      history.replaceState = ((f) =>
        function replaceState() {
          var ret = f.apply(this, arguments);
          window.dispatchEvent(new Event("replacestate"));
          window.dispatchEvent(new Event("locationchange"));
          return ret;
        })(history.replaceState);
      window.addEventListener("popstate", function () {
        window.dispatchEvent(new Event("locationchange"));
      });
    }
    function filterBySection() {
      helper.waitForElement(
        ".crp54-filter-wrapper",
        function () {
          helper.waitForElement(
            ".filter-options-title",
            function () {
              if (document.querySelector(".crp54-content.crp54-filtered-by.cro-t-54-hide")) {
                document.querySelector(".crp54-content.crp54-filtered-by.cro-t-54-hide").classList.remove("cro-t-54-hide");
              }

              document.querySelectorAll(".filter-options-title").forEach(function (item) {
                var filterCategory = item.textContent.trim();
                var htmlString =
                  "" +
                  '  <div class="crp54-filter-content" cro-category="' +
                  filterCategory +
                  '">' +
                  '      <div class="crp54-filter-content-header crp54-text">' +
                  '          <div class="crp54-filter-item-header-text">' +
                  filterCategory +
                  "</div>" +
                  '          <div class="crp54-filter-item-header-cross"><img src="https://www.ctm.co.za/static/version1708330036/frontend/Vectra/ctmkenya/en_US/images/icons/cart-arrow.svg" alt="Dropdown Icon" /></div>' +
                  "      </div>" +
                  '      <div class="crp54-filter-item-wrapper">' +
                  '          <ol class="crp54-filter-item">' +
                  "          </ol>" +
                  "      </div>" +
                  "  </div>";

                if (!document.querySelector('[cro-category="' + filterCategory + '"]')) {
                  document.querySelector(".crp54-filter-wrapper").insertAdjacentHTML("beforeend", htmlString);
                }
              });
            },
            50,
            15000
          );
        },
        50,
        15000
      );

      helper.waitForElement(
        ".crp54-filter-item",
        function () {
          var oldFilterItems = document.querySelectorAll(".filter-options form > :first-child");
          var newFilterItems = document.querySelectorAll(".crp54-filter-item");

          // Loop through the source items and move their labels to the corresponding target items
          for (var i = 0; i < oldFilterItems.length; i++) {
            var oldFilterItem = oldFilterItems[i];
            var newFilterItem = newFilterItems[i];
            var listItems = oldFilterItem.querySelectorAll('.filter-options [class*="label"]');

            for (var j = 0; j < listItems.length; j++) {
              var getDataAttribute = listItems[j].textContent;
              getDataAttribute = getDataAttribute.trim();

              var htmlString = "<li class='cro-filter-list-item' cro-data-label='" + getDataAttribute + "' ><span class='cro39-label'>" + getDataAttribute + "</span><span class='crp-checkbox'></span></li>";

              if (!document.querySelector("[cro-data-label='" + getDataAttribute + "']")) {
                newFilterItem.insertAdjacentHTML("beforeend", htmlString);
              }
            }
          }
        },
        50,
        15000
      );

      var croFilterItems = document.querySelectorAll(".cro-filter-list-item");

      croFilterItems.forEach(function (croFilterItem) {
        croFilterItem.addEventListener("click", function () {
          var croDataLabel = croFilterItem.getAttribute("cro-data-label");

          document.querySelectorAll('.filter-options [class*="label"]').forEach(function (e) {
            var croParentOldFilter = e.closest(".item");
            var croOldInputBox = croParentOldFilter.querySelector("input");
            if (e.textContent === croDataLabel) {
              if (croOldInputBox) {
                croOldInputBox.click();
              }
            }
          });
        });
      });
    }

    function croFilterDropdown() {
      helper.waitForElement(
        ".crp54-filter-content-header",
        function () {
          var filterContents = document.querySelectorAll(".crp54-filter-content");
          filterContents.forEach(function (item, index) {
            if (index < 3) {
              item.classList.add("cro54-active");
            }
          });
        },
        50,
        25000
      );
    }
    live(".crp54-filter-content-header", "click", function () {
      var dropDownParent = this.closest(".crp54-filter-content");
      if (dropDownParent) {
        if (dropDownParent.classList.contains("cro54-active")) {
          dropDownParent.classList.remove("cro54-active");
        } else {
          dropDownParent.classList.add("cro54-active");
        }
      }
    });

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
    function stickyButton() {
      // We select the element we want to target
      var target = document.querySelector(".catalog-category-view .column.main .products .custom-toolbar");
      // Next we want to create a function that will be called when that element is intersected
      function callback(entries, observer) {
        // The callback will return an array of entries, even if you are only observing a single item
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Show button
            document.body.classList.add("cro54-sticky-filter");
          } else {
            // Hide button
            document.body.classList.remove("cro54-sticky-filter");
          }
        });
      }

      let observer = new IntersectionObserver(callback);
      // Finally start observing the target element
      observer.observe(target);
    }
    var helper = _$();
    /* Variation Init */
    function init() {
      if (!document.querySelector(".crp54-container")) {
        if (window.innerWidth > 768) {
          insertHtml("#amasty-shopby-product-list > .wrapper.products", productFilterSectionDesktop, "afterend");
        } else {
          insertHtml("body", productFilterSectionMobile, "afterbegin");
          helper.waitForElement(
            "#amasty-shopby-product-list .custom-toolbar",
            function () {
              if (!document.querySelector(".cro-mobile-filter-button-container")) {
                insertHtml("#amasty-shopby-product-list .custom-toolbar", productFilterButton, "beforeend");
              }

              if (!document.querySelector(".crp54-selected-items-mobile")) {
                insertHtml("#amasty-shopby-product-list .custom-toolbar", '<div class="crp54-content crp54-selected-items crp54-selected-items-mobile cro-t-54-hide"></div>', "afterend");
              }

              // .crp54-content.crp54-selected-items:not(.crp54-selected-items-mobile) .crp54-selected-list .crp54-selected-list-item
              helper.waitForElement(
                ".crp54-content.crp54-selected-items:not(.crp54-selected-items-mobile) .crp54-selected-list .crp54-selected-list-item",
                function () {
                  if (document.querySelector(".crp54-content.crp54-selected-items.crp54-selected-items-mobile.cro-t-54-hide")) {
                    document.querySelector(".crp54-content.crp54-selected-items.crp54-selected-items-mobile.cro-t-54-hide").classList.remove("cro-t-54-hide");
                  }

                  var mainHTML = document.querySelector(".crp54-content.crp54-selected-items:not(.crp54-selected-items-mobile) ");
                  document.querySelector(".crp54-selected-items-mobile").innerHTML = mainHTML.innerHTML;
                },
                50,
                25000
              );
            },
            50,
            25000
          );
        }

        helper.waitForElement(
          ".breadcrumbs .items > .item:first-child + .item a",
          function () {
            var pageTitleOldLink = document.querySelector(".breadcrumbs .items > .item:first-child + .item a");
            var pageTitleOld = document.querySelector(".breadcrumbs .items > .item:first-child + .item");
            var pageTitleNew = pageTitleOld.textContent.trim();

            var categoryFilterSubHeader =
              "" +
              '  <div class="crp54-category-sub-header">' +
              '      <span class="crp54-category-sub-header-icon">' +
              '  		<svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">' +
              '  			<path d="M0.683593 4.41791L4.47266 0.609314C4.66797 0.433533 4.96094 0.433533 5.13672 0.609314L5.58594 1.05853C5.76172 1.23431 5.76172 1.52728 5.58594 1.7226L2.57812 4.74994L5.58594 7.75775C5.76172 7.95306 5.76172 8.24603 5.58594 8.42181L5.13672 8.87103C4.96094 9.04681 4.66797 9.04681 4.47266 8.87103L0.683593 5.06244C0.507812 4.88666 0.507812 4.59369 0.683593 4.41791Z" fill="#7A7A7A" />' +
              "  		</svg>" +
              "  	</span>" +
              '      <span class="crp54-category-sub-header-text">' +
              pageTitleNew +
              "</span>" +
              "  </div>";

            if (!document.querySelector(".crp54-category-sub-header")) {
              document.querySelector(".crp54-content .crp54-category-header") && document.querySelector(".crp54-content .crp54-category-header").insertAdjacentHTML("afterend", categoryFilterSubHeader);
            }

            live(".crp54-category-sub-header", "click", function (e) {
              pageTitleOldLink.click();
            });
          },
          50,
          25000
        );

        helper.waitForElement(
          "#page-title-heading .base",
          function () {
            var pageSubTitleOld = document.querySelector("#page-title-heading .base");
            var pageSubTitleNew = document.querySelector(".crp54-category-name");

            if (pageSubTitleNew) {
              pageSubTitleNew.textContent = pageSubTitleOld.textContent;
            }
          },
          50,
          25000
        );

        filterBySection();
        helper.waitForElement(".catalog-category-view .column.main .products .custom-toolbar", stickyButton, 50, 15000);
      }

      helper.waitForElement(
        "#am-shopby-container .amshopby-items.items li.item",
        function () {
          if (document.querySelector(".crp54-content.crp54-selected-items.cro-t-54-hide")) {
            document.querySelector(".crp54-content.crp54-selected-items.cro-t-54-hide").classList.remove("cro-t-54-hide");
          }

          document.querySelectorAll("#am-shopby-container .amshopby-items.items li.item").forEach(function (e) {
            var croDataValue = e.getAttribute("data-value");
            var croHeading;

            if (e.querySelector(".amshopby-filter-value .am-shopby-form .color-label")) {
              croHeading = e.querySelector(".amshopby-filter-value .am-shopby-form .color-label").innerHTML;
            } else {
              croHeading = e.querySelector(".amshopby-filter-value").innerHTML;
            }

            var dropdown = `
				<li class="crp54-selected-list-item" crofiltter="${croDataValue}">
				  <span class="crp54-selected-list-item-text crp54-text">${croHeading}</span>
				  <span class="crp54-selected-list-item-cross">
					<svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
					  <path d="M8.82031 7.25L12.3359 10.8008C12.793 11.2227 12.793 11.9258 12.3359 12.3477L11.5625 13.1211C11.1406 13.5781 10.4375 13.5781 10.0156 13.1211L6.5 9.60547L2.94922 13.1211C2.52734 13.5781 1.82422 13.5781 1.40234 13.1211L0.628906 12.3477C0.171875 11.9258 0.171875 11.2227 0.628906 10.8008L4.14453 7.25L0.628906 3.73438C0.171875 3.3125 0.171875 2.60938 0.628906 2.1875L1.40234 1.41406C1.82422 0.957031 2.52734 0.957031 2.94922 1.41406L6.5 4.92969L10.0156 1.41406C10.4375 0.957031 11.1406 0.957031 11.5625 1.41406L12.3359 2.1875C12.793 2.60938 12.793 3.3125 12.3359 3.73438L8.82031 7.25Z" fill="#ED1C24" />
					</svg>
				  </span>
				</li>
			  `;

            if (!document.querySelector('.crp54-selected-list [crofiltter="' + croDataValue + '"]')) {
              document.querySelector(".crp54-selected-list") && document.querySelector(".crp54-selected-list").insertAdjacentHTML("beforeend", dropdown);
            }
          });
        },
        50,
        25000
      );

      helper.waitForElement(
        ".filter-options input",
        function () {
          document.querySelectorAll(".filter-options input").forEach(function (e) {
            var parent = e.closest("li.item");
            var dataLabel;

            if (e.checked) {
              if (parent) {
                dataLabel = parent.getAttribute("data-label");
              } else {
                var colorParent = e.closest(".item");
                dataLabel = colorParent.querySelector("a").getAttribute("data-label");
              }

              helper.waitForElement(
                ".cro-filter-list-item",
                function () {
                  document.querySelector('.cro-filter-list-item[cro-data-label="' + dataLabel + '"]').classList.add("cro-selected");
                },
                50,
                25000
              );
            }
          });
        },
        50,
        25000
      );
      croFilterDropdown();
      modalEventHandler();
    }

    live(".cro-filter-list-item", "click", function () {
      var croLabel = this.getAttribute("cro-data-label");

      if (document.querySelector('#narrow-by-list .filter-options-item ol li[data-label="' + croLabel + '"]')) {
        document.querySelector('#narrow-by-list .filter-options-item ol li[data-label="' + croLabel + '"]').click();
      } else {
        document.querySelector('#narrow-by-list .filter-options-item a[data-label="' + croLabel + '"]').click();
      }
    });

    live(".crp54-selected-list .crp54-selected-list-item", "click", function (e) {
      var croLabel = this.getAttribute("crofiltter");
      document.querySelector('#am-shopby-container .amshopby-items.items li.item[data-value="' + croLabel + '"] a').click();
    });

    live(".crp54-clear-all-selected", "click", function (e) {
      if (document.querySelector(".footer-filter .filter-actions .clear.filter-clear")) {
        document.querySelector(".footer-filter .filter-actions .clear.filter-clear").click();
      }
    });

    function modalEventHandler() {
      live(".cro-mobile-filter-button-container", "click", function (item) {
        if (document.querySelector(".crp54-mobile-container")) {
          document.querySelector(".crp54-mobile-container").classList.add("crp54-modal-open");
          document.querySelector(".crp54-mobile-filter-overlay").classList.add("crp54-overlay-open");
          document.body.classList.add("crp54-modalOpen");
          document.querySelector("html").classList.add("crp54-scroll-off");
        }
      });

      live(".crp54-mobile-filter-overlay, .crp54-container-modal-close, .page-wrapper #navbar", "click", function (item) {
        if (document.querySelector(".crp54-mobile-container.crp54-modal-open")) {
          document.querySelector(".crp54-mobile-container").classList.remove("crp54-modal-open");
          document.querySelector(".crp54-mobile-filter-overlay").classList.remove("crp54-overlay-open");
          document.body.classList.remove("crp54-modalOpen");
          document.querySelector("html").classList.remove("crp54-scroll-off");
        }
      });
    }

    listener();
    /* Initialise variation */
    helper.waitForElement(
      "body",
      function () {
        document.querySelector("body").classList.add("cro_Test54_product_filters");
        helper.waitForElement("#amasty-shopby-product-list > .wrapper.products ", init, 50, 25000);
      },
      50,
      25000
    );
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();