(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro12357";

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

		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}

		/* icons exported from Figma (stroke = currentColor so CSS controls the state colour) */
		var icons = {
			floor: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.6667 2H3.33333C2.59695 2 2 2.59695 2 3.33333V12.6667C2 13.403 2.59695 14 3.33333 14H12.6667C13.403 14 14 13.403 14 12.6667V3.33333C14 2.59695 13.403 2 12.6667 2Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>',
			wall: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 5.33333C13.9998 5.09952 13.938 4.86987 13.821 4.66744C13.704 4.46501 13.5358 4.29691 13.3333 4.18L8.66667 1.51333C8.46397 1.39631 8.23405 1.3347 8 1.3347C7.76595 1.3347 7.53603 1.39631 7.33333 1.51333L2.66667 4.18C2.46417 4.29691 2.29599 4.46501 2.17897 4.66744C2.06196 4.86987 2.00024 5.09952 2 5.33333V10.6667C2.00024 10.9005 2.06196 11.1301 2.17897 11.3326C2.29599 11.535 2.46417 11.7031 2.66667 11.82L7.33333 14.4867C7.53603 14.6037 7.76595 14.6653 8 14.6653C8.23405 14.6653 8.46397 14.6037 8.66667 14.4867L13.3333 11.82C13.5358 11.7031 13.704 11.535 13.821 11.3326C13.938 11.1301 13.9998 10.9005 14 10.6667V5.33333Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.2 4.66667L8 8L13.8 4.66667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 14.6667V8" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>',
			chevron: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>',
			bin: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#cro12357-bin-clip)"><path d="M4.75 4.5V9M7.25 4.5V9M4.25 2.25H1.25V2.375L1.37 2.9C1.95481 5.45845 2.24999 8.07456 2.25 10.699V11.25H9.75V10.699C9.75 8.0745 10.045 5.459 10.63 2.9L10.75 2.375V2.25H7.75M4.25 2.25V2C4.25 1.77019 4.29526 1.54262 4.38321 1.3303C4.47116 1.11798 4.60006 0.925066 4.76256 0.762563C4.92507 0.600061 5.11798 0.471157 5.3303 0.383211C5.54262 0.295265 5.77019 0.25 6 0.25C6.22981 0.25 6.45738 0.295265 6.6697 0.383211C6.88202 0.471157 7.07493 0.600061 7.23744 0.762563C7.39994 0.925066 7.52884 1.11798 7.61679 1.3303C7.70474 1.54262 7.75 1.77019 7.75 2V2.25M4.25 2.25H7.75" stroke="currentColor"/></g><defs><clipPath id="cro12357-bin-clip"><rect width="12" height="12" fill="white"/></clipPath></defs></svg>',
			cart: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#cro12357-cart-clip)"><path d="M6 16.5C6.41421 16.5 6.75 16.1642 6.75 15.75C6.75 15.3358 6.41421 15 6 15C5.58579 15 5.25 15.3358 5.25 15.75C5.25 16.1642 5.58579 16.5 6 16.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.25 16.5C14.6642 16.5 15 16.1642 15 15.75C15 15.3358 14.6642 15 14.25 15C13.8358 15 13.5 15.3358 13.5 15.75C13.5 16.1642 13.8358 16.5 14.25 16.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.5375 1.5375H3.0375L5.0325 10.8525C5.10568 11.1936 5.2955 11.4986 5.56928 11.7149C5.84306 11.9312 6.18368 12.0453 6.5325 12.0375H13.8675C14.2089 12.0369 14.5399 11.92 14.8058 11.7059C15.0717 11.4918 15.2566 11.1934 15.33 10.86L16.5675 5.2875H3.84" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="cro12357-cart-clip"><rect width="18" height="18" fill="white"/></clipPath></defs></svg>'
		};

		var availability = { floor: true, wall: true };
		var activeZone = "floor";
		var debounceTimer = null;

		/* floor / wall availability comes from the product heading text */
		function detectAvailability() {
			var titleEl = document.querySelector("h1.page-title .base");
			var title = titleEl ? titleEl.textContent.toLowerCase() : "";
			var hasFloor = title.indexOf("floor") !== -1;
			var hasWall = title.indexOf("wall") !== -1;
			if (hasFloor && !hasWall) return { floor: true, wall: false };
			if (hasWall && !hasFloor) return { floor: false, wall: true };
			return { floor: true, wall: true };
		}

		/* the calculator markup exists twice (desktop + mobile modal instances) */
		function getModals() {
			return document.querySelectorAll('.area-calculator-wrap [id="tile_calc_modal"]');
		}

		function isRowEmpty(row) {
			/* native-added rows have unclassed inputs, so select generically */
			var inputs = row.querySelectorAll(".area-input:not(.area-res) input");
			for (var i = 0; i < inputs.length; i++) {
				if (inputs[i].value !== "" && inputs[i].value !== null) return false;
			}
			return true;
		}

		function injectToggle(modal) {
			if (modal.querySelector(".cro-12357-toggle")) return;
			var desc = modal.querySelector(".description");
			if (!desc) return;
			var html = '<div class="cro-12357-toggle">';
			if (availability.floor) {
				html += '<button type="button" class="cro-12357-toggle-btn" data-zone="floor">' + icons.floor + "<span>Floor</span></button>";
			}
			if (availability.wall) {
				html += '<button type="button" class="cro-12357-toggle-btn" data-zone="wall">' + icons.wall + "<span>Wall</span></button>";
			}
			html += "</div>";
			desc.insertAdjacentHTML("afterend", html);
		}

		function injectChevron(modal) {
			var howTo = modal.querySelector(".how-to");
			if (!howTo || howTo.querySelector(".cro-12357-chevron")) return;
			var label = howTo.querySelector("label");
			if (label) {
				label.insertAdjacentHTML("afterend", '<span class="cro-12357-chevron">' + icons.chevron + "</span>");
			}
		}

		function decorateRows(modal) {
			var rows = modal.querySelectorAll(".area-calculator-input .sin-ro");
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				if (!row.getAttribute("data-cro12357-zone")) {
					row.setAttribute("data-cro12357-zone", activeZone);
				}
				if (!row.querySelector(".cro-12357-card-head")) {
					/* every card gets a bin; renumberRows hides it on each zone's first card */
					row.insertAdjacentHTML(
						"afterbegin",
						'<div class="cro-12357-card-head"><span class="cro-12357-card-title"></span>' +
						'<button type="button" class="cro-12357-bin" aria-label="Remove area">' + icons.bin + "</button>" +
						"</div>"
					);
				}
				var inputWraps = row.querySelectorAll(".area-input:not(.area-res) > div");
				for (var j = 0; j < inputWraps.length; j++) {
					/* native-added rows are built without labels — inject them so the Wall
					   zone's cards show "Width/Height in meters" like the original row (bug 19);
					   updateRowLabels() then keeps the second label in sync with the zone */
					if (!inputWraps[j].querySelector(".label-title")) {
						inputWraps[j].insertAdjacentHTML(
							"afterbegin",
							'<p class="label-title">' + (j === 0 ? "Width" : "Length") + ' in <span class="line-break">meters</span></p>'
						);
					}
					/* "m" unit marker inside each dimension field */
					if (!inputWraps[j].querySelector(".cro-12357-unit")) {
						inputWraps[j].insertAdjacentHTML("beforeend", '<span class="cro-12357-unit">m</span>');
					}
					/* the browser restores history form values into these fields on back
					   navigation — opt out, the calculator resets instead (bug 20) */
					var inp = inputWraps[j].querySelector("input");
					if (inp) inp.setAttribute("autocomplete", "off");
				}
			}
			renumberRows(modal);
			updateRowLabels(modal);
		}

		/* each zone numbers its own cards from 1 (bug 16); the first card of each zone hides its bin */
		function renumberRows(modal) {
			var counts = { floor: 0, wall: 0 };
			var rows = modal.querySelectorAll(".area-calculator-input .sin-ro");
			for (var i = 0; i < rows.length; i++) {
				var zone = rows[i].getAttribute("data-cro12357-zone") || "floor";
				counts[zone] = (counts[zone] || 0) + 1;
				var title = rows[i].querySelector(".cro-12357-card-title");
				if (title) title.textContent = "Area " + counts[zone];
				var bin = rows[i].querySelector(".cro-12357-bin");
				if (bin) bin.style.display = counts[zone] === 1 ? "none" : "";
			}
		}

		/* second field label follows the card's zone: Length (floor) / Height (wall) */
		function updateRowLabels(modal) {
			var rows = modal.querySelectorAll(".area-calculator-input .sin-ro");
			for (var i = 0; i < rows.length; i++) {
				var zone = rows[i].getAttribute("data-cro12357-zone") || "floor";
				var labels = rows[i].querySelectorAll(".area-input:not(.area-res) .label-title");
				if (labels.length > 1) {
					labels[1].innerHTML = (zone === "wall" ? "Height" : "Length") + ' in <span class="line-break">meters</span>';
				}
			}
		}

		function updateIntroText(modal) {
			var desc = modal.querySelector(".description strong");
			if (desc) {
				desc.textContent =
					"Enter the width and " +
					(activeZone === "wall" ? "height" : "length") +
					" of your area in meters to calculate the quantity needed.";
			}
		}

		function setZone(zone) {
			activeZone = zone;
			var modals = getModals();
			for (var m = 0; m < modals.length; m++) {
				var modal = modals[m];
				modal.classList.toggle("cro-12357-zone-floor", zone === "floor");
				modal.classList.toggle("cro-12357-zone-wall", zone === "wall");

				var btns = modal.querySelectorAll(".cro-12357-toggle-btn");
				for (var b = 0; b < btns.length; b++) {
					btns[b].classList.toggle("active", btns[b].getAttribute("data-zone") === zone);
				}

				/* Floor and Wall keep completely independent card lists — cards never move
				   between zones (bug 16). If the selected zone has no card yet, add a fresh
				   Area 1 so it starts with one by default and never shows blank (bug 14).
				   Only act on the visible modal instance to avoid desyncing the hidden one. */
				if (modal.closest(".area-calculator-wrap._show")) {
					var zoneRows = modal.querySelectorAll('.area-calculator-input .sin-ro[data-cro12357-zone="' + zone + '"]');
					if (zoneRows.length === 0) {
						var addBtn = modal.querySelector(".btn-add-room");
						if (addBtn) addBtn.click();
					}
				}

				renumberRows(modal);
				updateRowLabels(modal);
				updateIntroText(modal);
			}
		}

		/* reuse the native hidden "Add X boxes to my Cart" span so the count keeps updating natively */
		function fixCartButton(modal) {
			var btn = modal.querySelector(".to-cart_container .add-to-cart-btn");
			if (!btn || btn.getAttribute("data-cro12357-done")) return;
			var spans = btn.querySelectorAll(":scope > span");
			if (spans.length < 2) return;
			var boxesSpan = spans[1];
			if (boxesSpan.querySelector(".total-boxes-value")) {
				var nodes = boxesSpan.childNodes;
				for (var i = 0; i < nodes.length; i++) {
					if (nodes[i].nodeType === 3 && nodes[i].textContent.indexOf("my Cart") !== -1) {
						nodes[i].textContent = " boxes to cart";
					}
				}
				spans[0].classList.add("cro-12357-hide");
				boxesSpan.classList.add("cro-12357-boxes-label");
				boxesSpan.style.display = "inline";
				btn.insertAdjacentHTML("afterbegin", '<span class="cro-12357-cart-icon">' + icons.cart + "</span>");
				btn.setAttribute("data-cro12357-done", "1");
			}
		}

		/* lock the main popup's height while the summary sheet is open — lifting the
		   summary out of the flow would otherwise shrink the popup behind it (bug 21) */
		function setSummaryOpen(modal, open) {
			var wrap = modal.closest(".modal-inner-wrap");
			if (open && !modal.classList.contains("cro-12357-summary-open")) {
				if (wrap) wrap.style.setProperty("height", wrap.offsetHeight + "px", "important");
				modal.classList.add("cro-12357-summary-open");
			} else if (!open && modal.classList.contains("cro-12357-summary-open")) {
				modal.classList.remove("cro-12357-summary-open");
				if (wrap) wrap.style.removeProperty("height");
			}
		}

		/* swipe up / click opens the full summary in a separate popup sheet (bug 17) */
		function bindSummaryToggle(modal) {
			var swiper = modal.querySelector(".area-result .swiper");
			if (!swiper || swiper.getAttribute("data-cro12357-bound")) return;
			swiper.setAttribute("data-cro12357-bound", "1");

			/* dim backdrop behind the summary sheet; clicking it closes (handled in croEventHandler) */
			if (!modal.querySelector(".cro-12357-summary-backdrop")) {
				modal.insertAdjacentHTML("beforeend", '<div class="cro-12357-summary-backdrop"></div>');
			}

			swiper.addEventListener("click", function () {
				setSummaryOpen(modal, !modal.classList.contains("cro-12357-summary-open"));
			});

			var touchStartY = null;
			swiper.addEventListener("touchstart", function (e) {
				touchStartY = e.touches[0].clientY;
			}, { passive: true });
			swiper.addEventListener("touchend", function (e) {
				if (touchStartY === null) return;
				var delta = touchStartY - e.changedTouches[0].clientY;
				if (delta > 30) setSummaryOpen(modal, true);
				if (delta < -30) setSummaryOpen(modal, false);
				touchStartY = null;
			}, { passive: true });
		}

		/* the theme locks .area-calculator to a fixed height (sized for its old two-column
		   layout) via an #tile_calc_modal !important rule that out-specifies our stylesheet,
		   which leaves dead space between the inputs and the summary (bugs 5, 6, 8, 13).
		   Inline !important is the only thing that beats an ID + !important rule. */
		function fitHeights(modal) {
			modal.style.setProperty("height", "auto", "important");
			var ac = modal.querySelector(".area-calculator");
			if (ac) {
				ac.style.setProperty("height", "auto", "important");
				ac.style.setProperty("min-height", "0", "important");
				ac.style.setProperty("flex", "0 0 auto", "important");
				/* old two-column layout left a 56px column gutter (now a vertical gap above the
				   summary) and a 132px bottom padding (trailing gap under the CTA) */
				ac.style.setProperty("gap", "0", "important");
				ac.style.setProperty("padding-bottom", "0", "important");
			}
		}

		/* Returning from another page (e.g. the cart) the browser restores its history
		   form values — but only into fields that existed in the initial HTML, so the
		   original Floor row comes back filled while added Wall rows come back empty.
		   Per spec the calculator simply resets to 0 when returning (bug 20). */
		function resetCalculator() {
			var modals = getModals();
			for (var m = 0; m < modals.length; m++) {
				var modal = modals[m];
				/* drop rows the native JS added in the previous visit (bfcache restores) */
				var removes = modal.querySelectorAll(".area-calculator-input .sin-ro .remove_room_btn");
				for (var r = removes.length - 1; r >= 0; r--) {
					removes[r].click();
				}
				var inputs = modal.querySelectorAll(".area-calculator-input .sin-ro .area-input:not(.area-res) input");
				var dirty = false;
				for (var i = 0; i < inputs.length; i++) {
					if (inputs[i].value !== "") {
						inputs[i].value = "";
						dirty = true;
					}
				}
				if (dirty && inputs[0]) {
					inputs[0].dispatchEvent(new Event("input", { bubbles: true }));
					inputs[0].dispatchEvent(new Event("change", { bubbles: true }));
					inputs[0].dispatchEvent(new Event("keyup", { bubbles: true }));
				}
				renumberRows(modal);
			}
		}

		function decorateModal(modal) {
			injectToggle(modal);
			injectChevron(modal);
			decorateRows(modal);
			fixCartButton(modal);
			bindSummaryToggle(modal);
			fitHeights(modal);
		}

		function decorateAll() {
			var modals = getModals();
			for (var m = 0; m < modals.length; m++) {
				decorateModal(modals[m]);
			}
		}

		function observeRows(modal) {
			var container = modal.querySelector(".area-calculator-input");
			if (!container || container.getAttribute("data-cro12357-observed")) return;
			container.setAttribute("data-cro12357-observed", "1");
			new MutationObserver(function () {
				clearTimeout(debounceTimer);
				debounceTimer = setTimeout(decorateAll, 100);
			}).observe(container, { childList: true, subtree: true });
		}

		function croEventHandler() {
			document.addEventListener("click", function (e) {
				var target = e.target;

				/* floor / wall toggle */
				var toggleBtn = target.closest ? target.closest(".cro-12357-toggle-btn") : null;
				if (toggleBtn) {
					setZone(toggleBtn.getAttribute("data-zone"));
					return;
				}

				/* clicking the dim backdrop closes the summary sheet (bug 17) */
				var backdrop = target.closest ? target.closest(".cro-12357-summary-backdrop") : null;
				if (backdrop) {
					var sumModal = backdrop.closest('[id="tile_calc_modal"]');
					if (sumModal) setSummaryOpen(sumModal, false);
					return;
				}

				/* bin icon removes the card — reuse the native remove control when the row has one */
				var bin = target.closest ? target.closest(".cro-12357-bin") : null;
				if (bin) {
					var row = bin.closest(".sin-ro");
					var modal = bin.closest('[id="tile_calc_modal"]');
					var nativeRemove = row ? row.querySelector(".remove_room_btn") : null;
					if (nativeRemove) {
						nativeRemove.click();
					} else if (row) {
						row.parentNode.removeChild(row);
						if (modal) {
							var firstInput = modal.querySelector(".area-calculator-input .sin-ro .area-input:not(.area-res) input");
							if (firstInput) {
								firstInput.dispatchEvent(new Event("input", { bubbles: true }));
								firstInput.dispatchEvent(new Event("change", { bubbles: true }));
								firstInput.dispatchEvent(new Event("keyup", { bubbles: true }));
							}
						}
					}
					if (modal) renumberRows(modal);
					return;
				}

				/* click outside the calculator closes it */
				if (
					target.classList &&
					((target.classList.contains("area-calculator-wrap") && target.classList.contains("_show")) ||
						(target.classList.contains("modals-overlay") && document.querySelector(".area-calculator-wrap._show")))
				) {
					var openModal = document.querySelector(".area-calculator-wrap._show .action-close");
					if (openModal) openModal.click();
				}
			});
		}

		function init() {
			addClass("body", variation_name);
			availability = detectAvailability();
			activeZone = availability.floor ? "floor" : "wall";

			decorateAll();
			setZone(activeZone);

			var modals = getModals();
			for (var m = 0; m < modals.length; m++) {
				observeRows(modals[m]);
			}

			/* reset to 0 when arriving/returning (bug 20): once now, once after the
			   browser's late history form-restore at load, and on bfcache restores */
			resetCalculator();
			if (document.readyState === "complete") {
				setTimeout(resetCalculator, 500);
			} else {
				window.addEventListener("load", function () {
					setTimeout(resetCalculator, 500);
				});
			}
			window.addEventListener("pageshow", function (e) {
				if (e.persisted) resetCalculator();
			});
		}

		if (!window.cro_12357) {
			window.cro_12357 = true;
			waitForElement('.area-calculator-wrap [id="tile_calc_modal"]', init);
			croEventHandler();
		}
	} catch (e) {
		if (debug) console.log(e, "error in Test " + variation_name);
	}
})();