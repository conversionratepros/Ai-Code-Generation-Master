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

		function scroll(click, selector) {
			click.addEventListener('click', function (event) {
				event.preventDefault(); // Prevent default behavior of the anchor tag
				var target = document.querySelector(selector);
				if (target) {
					window.scrollTo({
						top: target.getBoundingClientRect().top + window.scrollY,
						behavior: 'smooth'
					});
				}
			});
		}

		var croNewPart = `<div class="cro-recipe-78-new-part">
        <div class="cro-recipe-78-new-part-wapper">
            <div class="cro-recipe-78-text-icon-part">
                <div class="cro-recipe-78-text-left-part">
                    <p class="cro-recipe-text">Application results <br><strong>within <span>2</span> minutes</strong>
                    </p>
                </div>
                <div class="cro-recipe-78-text-right-part">
                    <img class="cro-recipe-78-image-part"
                        src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/clocklogo-01.png" alt="">
                </div>

            </div>
        </div>
    </div>`


		/* Variation Init */
		function init() {
			addClass("body", "cro-recipe-78")


			waitForElement('.container .blurb:first-child', function () {
				if (!document.querySelector('cro-recipe-78-new-part')) {
					insertHtml('.container .blurb:first-child', croNewPart, "afterend");
				}
			});

		}


		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();