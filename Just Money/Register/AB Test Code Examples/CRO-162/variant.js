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

		fromText = `<div class="cro-t-25-from-under-part">
        <div class="cro-t-25-from-under-text">
            Your ID numbers are secured and encrypted using Microsoft Azure's advanced security protocols, ensuring the
            highest level of data protection.
        </div>
    				</div>`

		fromTextMobile = `<div class="cro-t-25-from-under-part cro-t-25-from-under-part-mobile">
        <div class="cro-t-25-from-under-text">
            Your ID numbers are secured and encrypted using Microsoft Azure's advanced security protocols, ensuring the
            highest level of data protection.
        </div>
    				</div>`

		fromIcon = `<div class="cro-t-25-from-lock-icon">
    <div class="cro-t-25-from-lock-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
            <path d="M2.1875 6V4.6875C2.1875 2.52734 3.9375 0.75 6.125 0.75C8.28516 0.75 10.0625 2.52734 10.0625 4.6875V6H10.5C11.457 6 12.25 6.79297 12.25 7.75V13C12.25 13.9844 11.457 14.75 10.5 14.75H1.75C0.765625 14.75 0 13.9844 0 13V7.75C0 6.79297 0.765625 6 1.75 6H2.1875ZM3.9375 6H8.3125V4.6875C8.3125 3.48438 7.32812 2.5 6.125 2.5C4.89453 2.5 3.9375 3.48438 3.9375 4.6875V6Z" fill="#6D6D6D"/>
        </svg>
    </div>
</div>
`


		/* Variation Init */
		function init() {
			addClass('body', 'cro-t-25')

			waitForElement('#id-number-form> .custom-row.reg-mobile', function () {
				if (!document.querySelector('.cro-t-25-from-under-part')) {
					insertHtml('#id-number-form> .custom-row.reg-mobile', fromText, "afterend");
				}
			});
			waitForElement('#id-number-form> .custom-row.reg-mobile', function () {
				if (!document.querySelector('.cro-t-25-from-under-part-mobile')) {
					insertHtml('#id-number-form> .custom-row.reg-mobile', fromTextMobile, "beforebegin");
				}
			});
			waitForElement('#divIdNumber .position-relative>input', function () {
				if (!document.querySelector('.cro-t-25-from-lock-icon')) {
					insertHtml('#divIdNumber .position-relative>input', fromIcon, "afterend");
				}
			});

		}



		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();