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

		var topBannerpart = `
		<section class="Cro-top-banner-parts">
        <div class="cro-new-section">
            <div class="cro-new-sec-first">
                <div class="cro-top-header-part">
                    <h1 class="cro-header-text">Congratulations!</h1>
                    <p class="cro-header-sub-text">This is your first step towards financial freedom. Clear your credit
                        record and become debt-free.</p>
                </div>
                <div class="cro-top-header-sec-part">
                    <h5 class="cro-header-sub-text-section">
                        By applying you can:
                    </h5>
                    <div class="cro-first-icon-text">
                        <div class="cro-first-icon">
                            <img class="cro-cash-icon"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/link%201.png" alt="">
                            <p class="cro-icon-text">Unlock cash</p>
                        </div>
                        <div class="cro-secend-icon">
                            <img class="cro-intant-icon"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/link%201%20(1).png"
                                alt="">
                            <p class="cro-icon-text">Get instant debt relief</p>
                        </div>
                        <div class="cro-third-icon">
                            <img class="cro-pay-icon"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/pay%201.png" alt="">
                            <p class="cro-icon-text">Pay ONE, affordable instalment</p>
                        </div>
                        <div class="cro-fourth-icon">
                            <img class="cro-Secure-icon"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/law%201.png" alt="">
                            <p class="cro-icon-text">Secure legal protection</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>




    </section>

		`
		var secBannerpart = `
		<section class="cro-secend-banner relative">
		<picture class="absolute top-0 w-full left-0 h-full"><source type="image/webp" srcset="/uploads/83cb6c44-6770-4387-8255-695263d99421__ecio_240.webp 240w, /uploads/83cb6c44-6770-4387-8255-695263d99421__ecio_320.webp 320w, /uploads/83cb6c44-6770-4387-8255-695263d99421__ecio_480.webp 480w, /uploads/83cb6c44-6770-4387-8255-695263d99421__ecio_560.webp 560w, /uploads/83cb6c44-6770-4387-8255-695263d99421__ecio_640.webp 640w, /uploads/83cb6c44-6770-4387-8255-695263d99421__ecio_768.webp 768w, /uploads/83cb6c44-6770-4387-8255-695263d99421__ecio_1024.webp 1024w, /uploads/83cb6c44-6770-4387-8255-695263d99421__ecio_1366.webp 1366w, /uploads/83cb6c44-6770-4387-8255-695263d99421__ecio_1600.webp 1600w, /uploads/83cb6c44-6770-4387-8255-695263d99421__ecio_1920.webp 1920w" sizes="100vw">
              
              
              <img src="/uploads/83cb6c44-6770-4387-8255-695263d99421.jpg" alt="" class="w-full h-full object-cover                
                object-left                
                ">
            </picture>
        <div class="cro-bnr-sec relative container">
		<div class="cro-brn-first-parent">
            <div class="cro-brn-first">
                <div class="cro-bnr-header-sec">
                    <h1 class="cro-sec-header-text">Why debt counselling might be for you</h1>
                    <p class="cro-header-sec-sub-text cro-bullet-subText">If you answer yes to any of these questions, debt counselling can
                        help you take back control of your finances.</p>
                </div>
                <div class="cro-icon-section">
                    <img class="cro-icon-right" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/click-01.png" alt="">
                    <p class="cro-header-sec-sub-text">Are you struggling to pay your debt or have payments in arrears?
                    </p>
                </div>
                <div class="cro-icon-section">
                    <img class="cro-icon-right" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/click-01.png" alt="">
                    <p class="cro-header-sec-sub-text">You do not qualify for a consolidation loan?
                    </p>
                </div>
                <div class="cro-icon-section">
                    <img class="cro-icon-right" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/click-01.png" alt="">
                    <p class="cro-header-sec-sub-text">Do you need to take out Payday loans to make it through the
					month?
                    </p>
                </div>
                <div class="cro-icon-section">
                    <img class="cro-icon-right" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/click-01.png" alt="">
					<p class="cro-header-sec-sub-text">Are you employed but still unable to manage expenses?
                    </p>
                    
                </div>
                <div class="cro-icon-section">
                    <img class="cro-icon-right" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/click-01.png" alt="">
                    <p class="cro-header-sec-sub-text">Do you feel financially stressed?
                    </p>
                </div>
                <div class="cro-icon-section">
                    <img class="cro-icon-right" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/click-01.png" alt="">
                    <p class="cro-header-sec-sub-text">Is most of your salary or wages going towards debt?
                    </p>
                </div>
            	</div>
				</div>
  			</div>
			<div class="cro-t-3_20-mobileImg"><img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/mobile 1.png"></div>
    	</section>`


		/* Variation Init */
		function init() {
			addClass('body', 'cro-t-3_20')


			waitForElement('section#call-to-action-and-form h1', function () {
				document.querySelector('section#call-to-action-and-form h1').closest('div').classList.add('cro-t-3_20-leftSection')
			});



			waitForElement('.cro-t-3_20-leftSection', function () {
				if (!document.querySelector('.Cro-top-banner-parts')) {
					insertHtml('.cro-t-3_20-leftSection', topBannerpart, "beforeend");
				}
			});

			waitForElement('section#icons', function () {
				if (!document.querySelector('.cro-secend-banner')) {
					insertHtml('section#icons', secBannerpart, "afterend");
				}
			});

            // form.w-full > .form-field.notice

            waitForElement('form.w-full #id_number', function () {
				document.querySelector('form.w-full #id_number').closest('.form-field').classList.add('cro-idNbr')
			});


		}

		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();