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
		// var iconChange = `<div class="cro-score-img-part">
		// <div class="cro-score-img-wrapper">
		//     <div class="cro-score-img-inner">
		//         <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/justMoney-cro-t-8-11-Score.png" alt="" class="cro-score-img">
		//     </div>
		// </div>
		//                   </div>`


		/* Variation Init */
		function init() {
			addClass("body", "cro-t-8-11")



			// waitForElement('.loginbottompart .plist', function () {
			// 	if (!document.querySelector('.cro-score-img-part')) {
			// 		insertHtml('.loginbottompart .plist', iconChange, "afterend");
			// 	}
			// });


			waitForElement('.registerholder h1', function () {
				var parent = document.querySelector('.registerholder h1').closest('.col-lg-6')
				if (parent) {
					parent.classList.add('cro-headingParent')
				}
			});

			waitForElement('#FirstName', function () {
				var parent = document.querySelector('#FirstName').closest('.custom-row')
				if (parent) {
					parent.classList.add('cro-first-name-parent')
				}
			});

			waitForElement('#PhoneNumber', function () {
				var parent = document.querySelector('#PhoneNumber').closest('.custom-row')
				if (parent) {
					parent.classList.add('cro-phone-num-parent')
				}
			});

			waitForElement('.rightspace #ConfirmPassword', function () {
				var parent = document.querySelector('.rightspace #ConfirmPassword').closest('.custom-row')
				if (parent) {
					parent.classList.add('cro-password-parent')
				}
			});

			waitForElement('#registerForm>.custom-row .mobile-spcing', function () {
				document.querySelectorAll('#registerForm>.custom-row .mobile-spcing').forEach(function (e) {
					var parent = e.closest('.custom-row');
					if (parent && e.innerHTML.indexOf(' I have read and agree to ') !== -1) {
						parent.classList.add('cro-From-tnc');
					}
				});
			});

			waitForElement('#registerForm>.custom-row .mobile-spcing', function () {
				document.querySelectorAll('#registerForm>.custom-row .mobile-spcing').forEach(function (e) {
					var parent = e.closest('.custom-row');
					if (parent && e.innerHTML.indexOf('Already have a profile?') !== -1) {
						parent.classList.add('cro-From-btn-reg');
					}
				});
			});

			waitForElement('#registerForm>.custom-row .mobile-spcing', function () {
				document.querySelectorAll('#registerForm>.custom-row .mobile-spcing').forEach(function (e) {
					var parent = e.closest('.custom-row');
					if (parent && e.innerHTML.indexOf('Need Help?') !== -1) {
						parent.classList.add('cro-Help-and-call');
					}
				});
			});

		}

		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();