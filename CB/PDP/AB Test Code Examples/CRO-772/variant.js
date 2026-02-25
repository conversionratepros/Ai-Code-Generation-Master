(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro-cb-t-546";
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
		
		// variation html
		var croUnique = `<div class="cro-546-uniqueProduct">
        <div class="cro-546-uniqueProduct-wrapper">
            <div class="cro-546-uniqueProduct-inner">
                <div class="cro-546-uniqueProduct-header">
                    <h3>Unique product qualities:</h3>
                </div>
                <div class="cro-546-uniqueProduct-list">
                    <ul>
                        <li class="cro-546-quality">High-quality craftsmanship</li>
                        <li class="cro-546-design">Art-driven design</li>
                        <li class="cro-546-material">Quality <span></span></li>
                        <li class="cro-546-designer">Designed by <span></span></li>
                    </ul>
                </div>
            </div>
        </div>
    	</div>`;


		// variation init
		function init() {

			addClass("body",variation_name);


			addingHtmlContent();
			replaceHtmlContent();
		}

		function addingHtmlContent(){
			if (window.innerWidth > 767) {
				waitForElement(".product-info-main .price-box", function () {
					if (!document.querySelector(".cro-546-uniqueProduct")) {
						insertHtml(".product-info-main .price-box", croUnique, "beforebegin");
					}
				});
			}else{
				waitForElement(".product-details-before", function () {
					if (!document.querySelector(".cro-546-uniqueProduct")) {
						insertHtml(".product-details-before", croUnique, "beforebegin");
					}
				});
			}
			
		}

		function replaceHtmlContent(){

			waitForElement('.cro-546-designer span', function () {
                var sourceTextDesign = document.querySelector('#product-attribute-specs-table [data-th="Designer"]').innerText;
                var targetElementDesign = document.querySelector('.cro-546-designer span');
                targetElementDesign.innerText = sourceTextDesign;
            });

			waitForElement('.cro-546-material', function () {
				var sourceTextMaterial = document.querySelector('#product-attribute-specs-table [data-th="Material"]').innerText;
                var targetElementMaterial = document.querySelector('.cro-546-material span');
                targetElementMaterial.innerText = sourceTextMaterial;
            });

			waitForElement('#product-attribute-specs-table [data-th="Designer"]', function () {
                var designerElement = document.querySelector('#product-attribute-specs-table [data-th="Designer"]');
				if (designerElement && (!designerElement.textContent.trim() || designerElement.textContent.trim() === "No Designer")) {
					addClass("body","cro-546-no-designer");
				}
            });

			waitForElement('li.cro-546-material span', function () {
				var materialElement = document.querySelector('li.cro-546-material span');
				// Check if the text content is empty or contains only whitespace
				if (!materialElement.textContent.trim()) {
					addClass("body", "cro-546-no-material");
				}
			});
		}
		
		
		
		waitForElement('.product-info-main .price-box', init);
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();