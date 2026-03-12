(function () {
	try {
		/* main variables */
		var debug = 1;
		var recipe_name = "cro6996";

		function waitForElement(selector, trigger, delayInterval, delayTimeout) {
			var interval = setInterval(function () {
				if (document && document.querySelector(selector) && document.querySelectorAll(selector).length > 0) {
					clearInterval(interval);
					trigger();
				}
			}, delayInterval);
			setTimeout(function () {
				clearInterval(interval);
			}, delayTimeout);
		}
		function forceInsertion(trigger, interval, delay) {
			var forceTrigger = setInterval(function () {
				trigger();
			}, interval);
			setTimeout(function () {
				clearInterval(forceTrigger);
			}, delay);
		}

		function live(selector, event, callback, context) {
			function addEvent(el, type, handler) {
				if (el.attachEvent) el.attachEvent("on" + type, handler);
				else el.addEventListener(type, handler);
			}
			if (!Element.prototype.matches) {
				Element.prototype.matches =
					Element.prototype.matchesSelector ||
					Element.prototype.webkitMatchesSelector ||
					Element.prototype.msMatchesSelector ||
					function (s) {
						var nodes = (this.parentNode || this.ownerDocument).querySelectorAll(s);
						for (var i = 0; i < nodes.length; i++) if (nodes[i] === this) return true;
						return false;
					};
			}
			addEvent(context || document, event, function (e) {
				let el = e.target;
				while (el && el !== context && !el.matches(selector)) el = el.parentElement;
				if (el && el.matches(selector)) callback.call(el, e);
			});
		}

		function listener() {
			window.addEventListener("locationchange", function () {
				processChange();
			});
			history.pushState = (function (f) {
				return function pushState() {
					var ret = f.apply(this, arguments);
					window.dispatchEvent(new Event("pushstate"));
					window.dispatchEvent(new Event("locationchange"));
					return ret;
				};
			})(history.pushState);
			history.replaceState = (function (f) {
				return function replaceState() {
					var ret = f.apply(this, arguments);
					window.dispatchEvent(new Event("replacestate"));
					window.dispatchEvent(new Event("locationchange"));
					return ret;
				};
			})(history.replaceState);
			window.addEventListener("popstate", function () {
				window.dispatchEvent(new Event("locationchange"));
			});
		}
		function processChange() {
			var url = window.location.href;
			if (url.includes("/za")) {
				setTimeout(function () {
					init();
				}, 500);
			} else {
				document.body.classList.remove(recipe_name);
			}
		}

		var desktopNavHtml = `
        <div class="cro6996-search-bar-wrapper">
          <div class="cro6996-search-bar-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.5 16C15.3667 16 15.2333 15.9667 15.1333 15.8667L10.8 11.5333C10.3 11.9667 9.73333 12.3333 9.09999 12.6C5.76666 14 1.93333 12.4667 0.533327 9.13333C-0.900006 5.76667 0.666661 1.93333 3.96666 0.533332C5.56666 -0.166668 7.36666 -0.166668 8.96666 0.499999C10.6 1.16667 11.8667 2.4 12.5333 4C13.2 5.6 13.2333 7.4 12.5667 9C12.3 9.66667 11.9333 10.2667 11.4667 10.8L15.8 15.1333C16 15.3333 16 15.6333 15.8 15.8333C15.7667 15.9667 15.6333 16 15.5 16ZM1.43333 8.7C2.63333 11.5 5.89999 12.8333 8.69999 11.6333C9.33333 11.3667 9.93333 10.9667 10.4 10.5L10.4333 10.4667L10.4667 10.4333C10.9667 9.93333 11.3667 9.3 11.6333 8.63333C12.2 7.26667 12.1667 5.76667 11.6 4.4C11.0333 3.03333 9.93333 1.96667 8.56666 1.43333C7.19999 0.866666 5.69999 0.899999 4.33333 1.46667C1.56666 2.63333 0.233327 5.9 1.43333 8.7Z" fill="#4A4A4A" />
            </svg>
          </div>
          <div class="cro6996-search-bar-text">Search products...</div>
        </div>
      
    `;
		var desktopNavSearchBox = ` <div class="cro6996-search-bar-container cro6996-search-bar-container-desktop" style="display: none;">${desktopNavHtml}</div> `;
		var mobileNavSearchBox = ` <div class="cro6996-search-bar-container cro6996-search-bar-container-mobile" style="display: none;">${desktopNavHtml}</div> `;

		function htmlInsertion() {
			forceInsertion(
				function () {
					var header = document.querySelector("x-main-menu nav x-search-button");
					if (!document.querySelector(".cro6996-search-bar-container-desktop")) {
						header && header.insertAdjacentHTML("afterend", desktopNavSearchBox);
					}

					var headerMobile = document.querySelector(".x-channel-router x-header-layout .header-layout");
					if (!document.querySelector(".cro6996-search-bar-container-mobile")) {
						headerMobile && headerMobile.insertAdjacentHTML("afterend", mobileNavSearchBox);
					}
				},
				300,
				5000
			);
		}
		function eventHandler() {
			// desktop search
			live(".cro6996-search-bar-container-desktop", "click", function () {
				var searchIcon = document.querySelector("x-main-menu nav x-search-button button.search-button");
				if (searchIcon) {
					searchIcon.click();

					setTimeout(function () {
						var searchBar = document.querySelector(".cdk-overlay-container .search-container");
						if (searchBar) {
							var searchParent = searchBar.closest(".cdk-overlay-container");
							if (searchParent && !searchParent.classList.contains("cro6996-search-bar-active")) {
								searchParent.classList.add("cro6996-search-bar-active");
							}
							var searchParent2 = searchBar.closest(".cdk-overlay-connected-position-bounding-box");
							if (searchParent2 && !searchParent2.classList.contains("cro6996-search-bar-active2")) {
								searchParent2.classList.add("cro6996-search-bar-active2");
							}
						}
					}, 100);
				}
			});

			// mobile search
			live(".cro6996-search-bar-container-mobile", "click", function () {
				var searchIcon = document.querySelector(".x-channel-router x-header-layout .header-layout  .actions-right .search-button");
				if (searchIcon) {
					searchIcon.click();

					setTimeout(function () {
						var searchBar = document.querySelector(".cdk-overlay-container .search-container");
						if (searchBar) {
							var searchParent = searchBar.closest(".cdk-overlay-container");
							if (searchParent && !searchParent.classList.contains("cro6996-search-bar-active")) {
								searchParent.classList.add("cro6996-search-bar-active");
							}
							var searchParent2 = searchBar.closest(".cdk-overlay-connected-position-bounding-box");
							if (searchParent2 && !searchParent2.classList.contains("cro6996-search-bar-active2")) {
								searchParent2.classList.add("cro6996-search-bar-active2");
							}
						}
					}, 100);
				}
			});
		}

		function init() {
			document.body.classList.add(recipe_name);

			htmlInsertion();

			if (!window.cro6996EventHandler) {
				eventHandler();
				window.cro6996EventHandler = true;
			}
		}

		// listener();

		// var isZaPs = document.querySelector('html[cro-datapath*="/za/ps/"]');
		waitForElement("html body .x-shop-layout x-shop-header", init, 50, 20000);
		waitForElement('html[cro-datapath*="/za/ps/"]', function () {
			setTimeout(function () {
				if (document.querySelector('.cro6996')) {
					document.querySelector('body').classList.remove('cro6996');
				}
			}, 300)
		}, 50, 20000);



	} catch (e) {
		if (debug) console.log(e, "error in Test" + recipe_name);
	}
})();