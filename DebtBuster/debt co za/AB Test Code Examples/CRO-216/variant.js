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

		var debtSupport = `<div class="cro-stopDebt">
        <div class="cro-stopDebt-wrapper container">
            <div class="cro-stopDebt-content stopDebt-content-img">
                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/cro-t-9-dad.png" alt="" class="stopDebt-content-img">
            </div>
            <div class="cro-stopDebt-content stopDebt-content-text">
                <div class="stopDebt-content-textTitle">
                    <h2 class="stopDebt-content-text-title">Get the best possible debt support</h2>
                </div>
                <div class="stopDebt-content-texPara">
                    <p class="stopDebt-content-text-para cro-header-1">Apply in 3 easy steps</p>
                    <p class="stopDebt-content-text-para crosubheader-1">No complicated paperwork.</p>

                    <p class="stopDebt-content-text-para cro-header-2">Customised solutions</p>
                    <p class="stopDebt-content-text-para crosubheader-2">Our team selects the most suitable debt solution, ensuring you get the support you need.</p>
                </div>
            </div>
        </div>
           </div>`

		var mobdebtSupport = `<div class="cro-ourScore">
        <div class="cro-ourScore-wrapper">
            <div class="cro-ourScore-inner">
                <div class="cro-ourScore-img">
                    <div class="cro-ourScore-img-inner relative container">
                        <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/cro-t-9-dad.png" alt="" class="stopDebt-content-img">
                    </div>
                </div>
                <div class="cro-ourScore-details">
                    <div class="cro-ourScore-details-inner relative container">
                        <div class="stopDebt-content-textTitle">
                            <h2 class="stopDebt-content-text-title">Get the best possible debt support</h2>
                        </div>
                        <div class="stopDebt-content-texPara">
                            <p class="stopDebt-content-text-para cro-header-1">Apply in 3 easy steps</p>
                            <p class="stopDebt-content-text-para crosubheader-1">No complicated paperwork.</p>

                            <p class="stopDebt-content-text-para cro-header-2">Customised solutions</p>
                            <p class="stopDebt-content-text-para crosubheader-2">Our team selects the most suitable debt
                                solution, ensuring you get the support you need.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

		var newfrompart = `<div class="cro-from-new-section">
	<div class="cro-from-new-section-wrapper">
		<h2 class="new-cro-form-heading my-0 py-3 px-5 lg:px-10 leading-tight text-3xl font-bold bg-gray-300">
			Calculate the best solution for you
		</h2>
	</div>
</div>`


		var iconAndtext = `<div class="cro-t-9-solve-new-part">
        <div class="cro-t-9-solve-new-part-wrapper">
            <div class="container text-center">
                <div class="cro-t-9-solve-title-part">
                    <p class="cro-t-9-solve-title-part-text">Make your money work for you</p>
                </div>
                <div class="cro-t-9-icon-text-all-parts">
                    <div class="cro-t-9-icon-text-first-part cro-container-all">
                        <div class="cro-t-9-icon-">
                            <img class="cro-t-9-icon-first"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/cro-t-9-multiple-partners.png" alt="">
                        </div>
                        <div class="cro-t-9-icon-text-header-part">
                            <p class="cro-t-9-icon-text-header">Multiple Partners</p>
                        </div>
                        <div class="cro-t-9-icon-sub-header">
                            <p class="cro-t-9-icon-sub-header-text">
                                We pick the best partner for your needs from our group of reputable partners.
                            </p>
                        </div>
                    </div>
                    <div class="cro-t-9-icon-text-second-part cro-container-all">
                        <div class="cro-t-9-icon-first">
                            <img class="cro-t-9-icon-second"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/cro-t-9-interest-rate.png"
                                alt="">
                        </div>
                        <div class="cro-t-9-icon-text-header-part">
                            <p class="cro-t-9-icon-text-header">Broad range of interest rates</p>
                        </div>
                        <div class="cro-t-9-icon-sub-header">
                            <p class="cro-t-9-icon-sub-header-text">
                                The interest rates charged on our partner's loans range between 20.25% and 24.50%.
                            </p>
                        </div>
                    </div>
                    <div class="cro-t-9-icon-text-third-part cro-container-all">
                        <div class="cro-t-9-icon-first">
                            <img class="cro-t-9-icon-third"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/cro-t-9-term-options.png" alt="">
                        </div>
                        <div class="cro-t-9-icon-text-header-part">
                            <p class="cro-t-9-icon-text-header">Multiple term options</p>
                        </div>
                        <div class="cro-t-9-icon-sub-header">
                            <p class="cro-t-9-icon-sub-header-text">
                                Our partner's payment terms are between 24 to 72 months.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

		var bannertext = `<div class="cro-t-9-banner-header">
        <div class="cro-t-9-banner-header-wrapper">
            <h1 class="cro-t-9-text"><span>Free Loan Calculator
            </span><br>Consolidate your debt now
        </h1>
        </div>
    </div>`

		var bulletPointMobile = `<div class="cro-t-9-mobile-bullet-point" style= "display:none">
        <div class="cro-t-9-mobile-bullet-point-wrapper">
            <p class="cro-t-9-mobile-decorated-top-text">There are just 3 simple steps to clearing your debt burden:</p>
            <ol class="cro-decorated">
                <li class="lg:items-center"><span class="bullet">1</span> <span>Answer a few short questions about your
                        current
                        debt situation.</span></li>
                <li class="lg:items-center"><span class="bullet">2</span> <span>Use our free calculator to find the best
                        solution customised to your financial needs.</span></li>
                <li class="lg:items-center"><span class="bullet">3</span> <span>We will pick the best solution for your
                        specific
                        situation.</span></li>
            </ol>
        </div>
    </div>`


		function waitForAndAddClass(selector, closestSelector, className) {
			waitForElement(selector, function () {
				var parent = document.querySelector(selector);
				if (parent) {
					parent = parent.closest(closestSelector);
					if (parent) {
						parent.classList.add(className);
					}
				}
			});
		}

		function applyModifications() {
			var elementsToModify = [
				{ selector: ".main-form #first_name", closest: ".grid", className: "cro-from-name-parent" },
				{ selector: ".main-form #phone_mobile", closest: ".grid", className: "cro-from-number-parent" },
				{ selector: ".main-form #id_number", closest: ".grid", className: "cro-from-id-number-parent" },
				{ selector: ".main-form #Callback", closest: ".grid", className: "cro-from-button-parent" },
				{ selector: 'section>.container [alt="Fincheck"]', closest: 'a', className: 'cro-Fincheck-logo' },
				{ selector: 'section>.container [alt="Sanlam"]', closest: 'a', className: 'cro-Sanlam-logo' },
				{ selector: 'section>.container [alt="DebtBusters"]', closest: 'a', className: 'cro-DebtBusters-logo' },
				{ selector: 'section>.container [alt="JustMoney"]', closest: 'a', className: 'cro-JustMoney-logo' },
				{ selector: 'section>.container [alt="Intelligent Debt Management (IDM)"]', closest: 'a', className: 'cro-IDM-logo' },
				{ selector: '.cro-DebtBusters-logo', closest: '.grid', className: 'cro-icon-parent' },
				{ selector: '.cro-icon-parent', closest: 'section', className: 'cro-icon-section-parent' }
			];

			elementsToModify.forEach(function (item) {
				waitForAndAddClass(item.selector, item.closest, item.className);
			});
		}

		/* Variation Init */
		function init() {
			addClass('body', 'cro-t-9');

			applyModifications()

			waitForElement('.main-form> p', function () {
				document.querySelectorAll('.main-form> p').forEach(function (e) {
					var parent = e.closest('p');
					if (parent && e.innerHTML.indexOf('By continuing you accept our') !== -1) {
						parent.classList.add('cro-From-tnc');
					}
				});
			});

			waitForElement('.pt-10.pb-0>.grid>div h1', function () {
				if (!document.querySelector('.cro-t-9-banner-header')) {
					insertHtml('.pt-10.pb-0>.grid>div h1', bannertext, "afterend");
				}
			});


			waitForElement('.pt-10 .border', function () {
				if (!document.querySelector('.cro-t-9-mobile-bullet-point')) {
					insertHtml('.pt-10 .border', bulletPointMobile, "afterend");
				}
			});



			waitForElement(".border form.py-5", function () {
				if (!document.querySelector(".cro-from-new-section")) {
					insertHtml(".border form.py-5", newfrompart, "afterbegin");
				}
			});
			waitForElement(".pt-10.pb-0", function () {
				if (!document.querySelector(".cro-stopDebt")) {
					insertHtml(".pt-10.pb-0", debtSupport, "afterend");
				}
			})
			waitForElement(".pt-10.pb-0", function () {
				if (!document.querySelector(".cro-ourScore")) {
					insertHtml(".pt-10.pb-0", mobdebtSupport, "afterend");
				}
			})

			waitForElement('section.bg-gray', function () {
				if (!document.querySelector('.cro-t-9-solve-new-part')) {
					insertHtml('section.bg-gray', iconAndtext, "afterend");
				}
			});


		}

		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();