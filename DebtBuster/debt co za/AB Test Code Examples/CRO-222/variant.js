(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro-t-dcz-153";
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

		// variation html
		 var croMobAtf = `<div class="cro-153-mobileAtf">
        <div class="cro-153-mobileAtf-wrapper container">
            <div class="cro-153-mobileAtf-inner">
                <div class="cro-153-mobileAtf-text"><p></p></div>
                <div class="cro-153-mobileAtf-points"><ol></ol></div>
            </div>
        </div>
    </div>`;
		
		function init() {
			addClass("body", variation_name);

			

			waitForElement("section.pb-0", function () {
				if (!document.querySelector(".cro-153-mobileAtf")) {
					insertHtml("section.pb-0", croMobAtf, "afterend");
				}
			});

			waitForElement(".cro-153-mobileAtf", function () {
				var previousContent = document.querySelector("section.pb-0 h1 + p");
				
				var previousList = document.querySelector("section.pb-0 ol");
				
				if (previousContent) {
					var targetElement = document.querySelector('.cro-153-mobileAtf-text p');
					if (targetElement) {
						targetElement.textContent = previousContent.textContent;
					}
				}
				
				if (previousList) {
					var targetElementList = document.querySelector('.cro-153-mobileAtf-points ol');
					if (targetElementList) {
						targetElementList.innerHTML = previousList.innerHTML;
						targetElementList.className = previousList.className;
					}
				}
			});
			
			
		}

		
		if (window.innerWidth < 1024) {
			waitForElement('body', init);
		}
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();