(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "";
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
		function insertHtml(selector, content, position) {
			var el = document.querySelector(selector);
			if (!position) {
				position = "afterend";
			}
			if (el && content) {
				el.insertAdjacentHTML(position, content);
			}
		}
		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}
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
		function toggleClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.toggle(cls);
			}
		}
		function removeClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.contains(cls) && el.classList.remove(cls);
			}
		}

		function mutationCheck() {
			waitForElement(".product-items", function () {
				console.log("product-items Check")
				let mList = document.querySelector('.product-items'),
					options = {
						childList: true
					},
					observer = new MutationObserver(mCallback);
				function mCallback(mutations) {
					console.log("mutations Check")
					for (let mutation of mutations) {
						if (mutation.type === 'childList') {
							// console.log(`The ${mutation.attributeName} attribute was modified.`);
							console.log("Price Update")

						}
					}
				}
				observer.observe(mList, options);
			});
		}
		function observerSelectors() {
			// Select the node that will be observed for mutations
			const targetNode = document.querySelector('.product-items');
			// Options for the observer (which mutations to observe)
			const config = {
				attributes: true,
				childList: true,
				subtree: true,
				characterData: true
			};
			// Callback function to execute when mutations are observed
			const callback = function (mutationsList, observer) {
				// Use this function to handle the mutations
				for (let mutation of mutationsList) {
					if (mutation.type === 'attributes') {
						console.log('Working')
					}
				}
			};
			// Create an observer instance linked to the callback function
			const observer = new MutationObserver(callback);
			// Start observing the target node for configured mutations
			observer.observe(targetNode, config);
			// To stop observing, use:
			// observer.disconnect();
		}

		var newpart_120 = `<div class="cro-120-new-part-icon-text">
        <div class="cro-120-new-part-icon-text-wrapper">
            <div class="cro-120-new-part-icon-text-inner">
                <div class="cro-120-new-top-icon-text cro-120-first">
                    <div class="cro-120-new-top-icon" cro-data-id="#rd2 ~ .tab-CB-accordion-content">
                        <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/CB-120-AR-Icon4Dani_4Ways2Pay.png" alt="" class="cro-120-Ways-To-Pay">
                    </div>
                </div>
                <div class="cro-120-new-top-icon-text cro-120-secend">
                    <div class="cro-120-new-top-icon" cro-data-id="#rd3 ~ .tab-CB-accordion-content">
                        <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/CB-120-AR-Icon4Dani_30DaysReturn.png" alt="" class="cro-120-Return-Policy">
                    </div>
                </div>
                <div class="cro-120-new-top-icon-text cro-120-Three">
                    <div class="cro-120-new-top-icon" cro-data-id="#rd1 ~ .tab-CB-accordion-content">
                        <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/CB-120-AR-Icon4Dani_DeliveryPromise.png" alt="" class="cro-120-delivery-promise">
                    </div>
                </div>
                <div class="cro-120-new-top-icon-text cro-120-Four">
                    <div class="cro-120-new-top-icon" cro-data-id="#rd4 ~ .tab-CB-accordion-content">
                        <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/CB-120-AR-Icon4Dani_SafeSecurePayment.png" alt="" class="cro-120-Secure">
                    </div>
                </div>
            </div>
        </div>
    </div>`;
		var croCbModal_120 = `<div class="cro-cb-120-lightBox">
        <div class="cro-cb-120-overlay"></div>
        <div class="cro-cb-120-modal">
            <div class="cro-recipe-cb-120-model-open">
                <div class="cro-cb-120-cross">
                    <img class="cro-cb-120-cross-img"src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/times.png" alt="">
                </div>
                <div class="cro-recipe-cb-120-modal-top-part">
                    <div class="cro-recipe-cb-120-modal-content">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>`;
		var cro_120_li = `<div class="cro-t-120-payNow-li">
    <div class="cro-t-120-payNow-li-wrapper">
      <span class="cro-t-120-payNow-li-header"></span>
      <div class="cro-t-120-payNow-li-inner">
        <ul>
          <li><a class="cro-t-120-payflex" href="">Payflex (Interest free)</a></li>
          <li><a class="cro-t-120-mobicred" href="">Mobicred</a></li>
          <li><a class="cro-t-120-carrolBoys" href="">Carrol Boyes Account – offered by Fever Tree Finance (Pty) Ltd</a></li>
          <li><a class="cro-t-120-payJustNow" href="">Pay Just Now</a></li>
        </ul>
      </div>
    </div>
  </div>`;
		/* Variation Init */
		function init() {
			addClass('body', 'cro-t-120')
			waitForElement('.catalog-product-view', function () {
				if (!document.querySelector('.cro-cb-120-lightBox')) {
					insertHtml('.catalog-product-view', croCbModal_120, "afterbegin");
				}
			});
			waitForElement('.product-info-main .product-right .product-social-links', function () {
				if (!document.querySelector('.cro-120-new-part-icon-text')) {
					insertHtml('.product-info-main .product-right .product-social-links', newpart_120, "afterend");
				}
			});




		}
		live(".cro-120-new-top-icon", "click", function () {
			var croDataId = this.getAttribute("cro-data-id");

			document.querySelector('.cro-recipe-cb-120-modal-content').innerHTML = document.querySelector(croDataId).innerHTML
			var checkCB_120_modal = document.querySelector("body.cro-cb-120-modalShow");
			if (checkCB_120_modal) {
				document.querySelector("body").classList.remove("cro-cb-120-modalShow");
			}
			toggleClass("body", "cro-cb-120-modalShow")
			toggleClass("html", "cro-cb-120-modalShow-overflow")

			waitForElement('.cro-recipe-cb-120-modal-content #instalmentCalc', function () {
				if (!document.querySelector('.cro-t-120-payNow-li')) {
					insertHtml('.cro-recipe-cb-120-modal-content #instalmentCalc', cro_120_li, "beforebegin");
				}
			});

			// waitForElement('.cro-recipe-cb-120-modal-content ul:nth-child(5)', function () {
			//     document.querySelector('.cro-recipe-cb-120-modal-content ul:nth-child(5)').classList.add('cro-t-120-ul');
			// });
		});

		live(".cro-cb-120-cross-img, .cro-cb-120-overlay", "click", function () {
			removeClass("body", "cro-cb-120-modalShow")
			removeClass("html", "cro-cb-120-modalShow-overflow")
			removeClass("body", "cro-t-120-first-clicked")
			if (document.querySelector('._has-modal button[data-role="closeBtn"]')) {
				document.querySelectorAll('._has-modal button[data-role="closeBtn"]').forEach(function (e) {
					e && e.click()
				})
			}
		})

		live(".cro-t-120-payflex", "click", function (e) {
			e.preventDefault();
			removeClass("body", "cro-cb-120-modalShow")
			removeClass("html", "cro-cb-120-modalShow-overflow")
			removeClass("body", "cro-t-120-first-clicked")

			document.querySelector('.bottomDetailsOne .cro-buyNow-bottomDetails-lastText') && document.querySelector('.bottomDetailsOne .cro-buyNow-bottomDetails-lastText').click()

		})

		live(".cro-t-120-mobicred", "click", function (e) {
			e.preventDefault();
			removeClass("body", "cro-cb-120-modalShow")
			removeClass("html", "cro-cb-120-modalShow-overflow")
			removeClass("body", "cro-t-120-first-clicked")

			document.querySelector('.bottomDetailsTwo .cro-buyNow-bottomDetails-lastText') && document.querySelector('.bottomDetailsTwo .cro-buyNow-bottomDetails-lastText').click()
		})

		live(".cro-t-120-carrolBoys", "click", function (e) {
			e.preventDefault();
			removeClass("body", "cro-cb-120-modalShow")
			removeClass("html", "cro-cb-120-modalShow-overflow")
			removeClass("body", "cro-t-120-first-clicked")

			document.querySelector('.bottomDetailsThree .cro-buyNow-bottomDetails-lastText') && document.querySelector('.bottomDetailsThree .cro-buyNow-bottomDetails-lastText').click()
		})

		live(".cro-t-120-payJustNow", "click", function (e) {
			e.preventDefault();
			removeClass("body", "cro-cb-120-modalShow")
			removeClass("html", "cro-cb-120-modalShow-overflow")
			removeClass("body", "cro-t-120-first-clicked")

			document.querySelector('.bottomDetailsFour .cro-buyNow-bottomDetails-lastText') && document.querySelector('.bottomDetailsFour .cro-buyNow-bottomDetails-lastText').click()

		})

		/* Initialise variation */
		waitForElement('body', init);
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();