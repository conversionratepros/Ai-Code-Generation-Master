(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "";

        /* all Pure helper functions */

        function waitForElement(selector, trigger, delayInterval, delayTimeout) {
            var interval = setInterval(function () {
                if (
                    document &&
                    document.querySelector(selector) &&
                    document.querySelectorAll(selector).length > 0
                ) {
                    clearInterval(interval);
                    trigger();
                }
            }, delayInterval);
            setTimeout(function () {
                clearInterval(interval);
            }, delayTimeout);
        }

        function insertElement(selector, content, position) {
            var el = document.querySelector(selector);
            // if(document.querySelectorAll(selector).length < 2){
            if (!position) {
                position = "afterend";
            }
            if (el && content) {
                el.insertAdjacentElement(position, content);
            }
            // }

        }

        function insertHtml(selector, content, position) {
            var el = document.querySelector(selector);
            if (!position) {
                position = "afterend";
            }
            if (el && content) {
                el.insertAdjacentElement(position, content);
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

        function removeClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.contains(cls) && el.classList.remove(cls);
            }
        }

        /* Variation html */
        var croReview = `<div class="cro-reviewText">
        <div class="cro-reviewText-wrapper">
            <div class="cro-reviewText-img">
                <img src="" alt="" class="cro-reviewTextimgImg">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13" fill="none">
                    <path d="M5.58761 6.5C3.92355 6.5 2.58761 5.16406 2.58761 3.5C2.58761 1.85938 3.92355 0.5 5.58761 0.5C7.22824 0.5 8.58761 1.85938 8.58761 3.5C8.58761 5.16406 7.22824 6.5 5.58761 6.5ZM7.67355 7.25C9.40792 7.25 10.8376 8.67969 10.8376 10.4141V11.375C10.8376 12.0078 10.322 12.5 9.71261 12.5H1.46261C0.829798 12.5 0.33761 12.0078 0.33761 11.375V10.4141C0.33761 8.67969 1.74386 7.25 3.47824 7.25H3.87667C4.3923 7.50781 4.97824 7.625 5.58761 7.625C6.19699 7.625 6.75949 7.50781 7.27511 7.25H7.67355Z" fill="#0B0B0B"/>
                </svg>
            </div>
            <div class="cro-reviewText-section">
                <p class="cro-reviewText-para"><a href="https://carrolboyes.com/za/customer/account/login/referer/aHR0cHM6Ly9jYXJyb2xib3llcy5jb20vemEvY2F0YWxvZy9wcm9kdWN0L3ZpZXcvaWQvNTI0Mi8jcmV2aWV3LWZvcm0%2C/" class="cro-reviewText-link">Sign in</a> or <a href="https://carrolboyes.com/usa/customer/account/create/" class="cro-reviewText-link">create an account</a> to submit a review.</p>
            </div>
        </div>
    </div>`;

        var croBuyNow = `<div class="cro-buyNow">
	<div class="cro-buyNow-wrapper">
	  <div class="cro-buyNow-top">
		<div class="cro-buyNow-text">
		  <p class="cro-buyNow-para">Buy Now. Pay Later. <span class="cro-buyNow-span">From R<span class="cro-buyNow-price"></span> per month</span></p>
		</div>
		<div class="cro-buyNow-img">
		  <div class="cro-buyNow-imgIcon buyNow-imgOne">
			<img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/plus.png" alt="" class="cro-buyNow-imgPlus">
		  </div>
		  <div class="cro-buyNow-imgIcon buyNow-imgTwo">
			<img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/minus.png" alt="" class="cro-buyNow-imgMinus">
		  </div>
		</div>
	  </div>
	</div>
	<div class="cro-buyNow-bottom">
		<div class="cro-buyNow-bottom-wrapper">
			<div class="cro-buyNow-bottomDetails bottomDetailsOne">
				<div class="cro-buyNow-bottomDetails-text">
				  <p class="cro-buyNow-bottomDetails-textPara"><span class="cro-buyNow-bottomDetails-textPriceOne textPriceOne-Payflix">4x</span> monthly payments </p>
				  <p>of <span class="cro-buyNow-bottomDetails-textPriceTwo textPriceTwo-Payflix">R000</span> with</p>
				</div>
				<div class="cro-buyNow-bottomDetails-img">
				  <img src="https://widgets.payflex.co.za/assets/Payflex_purple.png" alt="" class="cro-buyNow-bottomDetails-imgIcon">
				</div>
				<div class="cro-buyNow-bottomDetails-lastText">
				  <span class="cro-buyNow-bottomDetails-lastText-icon">?</span>
				</div>
			  </div>
			  <div class="cro-buyNow-bottomDetails bottomDetailsTwo">
				<div class="cro-buyNow-bottomDetails-text">
				  <p class="cro-buyNow-bottomDetails-textPara"><span class="cro-buyNow-bottomDetails-textPriceOne textPriceOne-mobicred">12x</span> monthly payments </p>
				  <p>of <span class="cro-buyNow-bottomDetails-textPriceTwo textPriceTwo-mobicred">R000</span> with</p>
				</div>
				<div class="cro-buyNow-bottomDetails-img">
				  <img src="https://mobicred.co.za/images/logo-mobicred-grey.png" alt="" class="cro-buyNow-bottomDetails-imgIcon">
				</div>
				<div class="cro-buyNow-bottomDetails-lastText">
				  <span class="cro-buyNow-bottomDetails-lastText-icon">?</span>
				</div>
			  </div>
			  <div class="cro-buyNow-bottomDetails bottomDetailsThree">
				<div class="cro-buyNow-bottomDetails-text">
				  <p class="cro-buyNow-bottomDetails-textPara"><span class="cro-buyNow-bottomDetails-textPriceOne textPriceOne-carrol-boyes">12x</span> monthly payments </p>
				  <p>of <span class="cro-buyNow-bottomDetails-textPriceTwo textPriceTwo-carrol-boyes">R000</span> with</p>
				</div>
				<div class="cro-buyNow-bottomDetails-img">
				  <img src="https://carrolboyes.com/static/version1721193527/frontend/Codazon/unlimited_ceramics/en_US/CarrolBoyes_Checkout/images/carrolboyes-credit.png" alt="" class="cro-buyNow-bottomDetails-imgIcon">
				</div>
				<div class="cro-buyNow-bottomDetails-lastText">
				  <span class="cro-buyNow-bottomDetails-lastText-icon">?</span>
				</div>
			  </div>
			  <div class="cro-buyNow-bottomDetails bottomDetailsFour">
				<div class="cro-buyNow-bottomDetails-text">
				  <p class="cro-buyNow-bottomDetails-textPara"><span class="cro-buyNow-bottomDetails-textPriceOne textPriceOne-PayJust">3x</span> monthly payments </p>
				  <p>of <span class="cro-buyNow-bottomDetails-textPriceTwo textPriceTwo-PayJust">000</span> with</p>
				</div>
				<div class="cro-buyNow-bottomDetails-img">
				  <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041601/image%201.png" alt="" class="cro-buyNow-bottomDetails-imgIcon">
				</div>
				<div class="cro-buyNow-bottomDetails-lastText">
				  <span class="cro-buyNow-bottomDetails-lastText-icon">?</span>
				</div>
			  </div>
		</div>
	</div>
</div>`;

        var croModal = `<div class="cro-modalSection">
	  <div class="cro-modalSection-wrapper"></div>
  </div>`;

        var croPayFl = `<div class="cro-payFlex">
	  <div class="cro-payFlex-wrapper">
		  <div class="cro-payFlex-top">
			  <div class="cro-payFlex-top-cross">
				  <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/times.png" alt="" class="cro-payFlex-top-crossImg">
			  </div>
			  <div class="cro-payFlex-top-logo">
				  <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/payflex.png" alt="" class="cro-payFlex-top-logoImg">
			  </div>
		  </div>
		  <div class="cro-payFlex-bottom">
			  <h2 class="cro-payFlex-bottom-title">How it works</h2>
			  <p class="cro-payFlex-bottom-para">Payflex lets you get what you need now but pay for it later!<span class='cro-playflex-bottom-3pay'>Pay over 3 pay days interest free</span><span class="cro-payFlex-bottom-Newpara">Or</span> Pay in 4 instalments over 6 weeks interest free.</p>
			  <div class="cro-payFlex-bottom-acc">
				  <div class="cro-payFlex-bottom-acc-des">
					  <div class="cro-payFlex-bottom-account bottom-accountOne">
						  <div class="cro-payFlex-bottom-accTop">
							  <div class="cro-payFlex-bottom-accTop-num accTop-numOne">1</div>
						  </div>
						  <div class="cro-payFlex-bottom-accBot">
							  <h3 class="cro-payFlex-bottom-accBot-text">Create an account</h3>
						  </div>
					  </div>
					  <div class="cro-payFlex-bottom-account bottom-accountOne">
						  <div class="cro-payFlex-bottom-accTop">
							  <div class="cro-payFlex-bottom-accTop-num accTop-numOne">2</div>
						  </div>
						  <div class="cro-payFlex-bottom-accBot">
							  <h3 class="cro-payFlex-bottom-accBot-text">Add Items to your cart</h3>
						  </div>
					  </div>
					  <div class="cro-payFlex-bottom-account bottom-accountOne">
						  <div class="cro-payFlex-bottom-accTop">
							  <div class="cro-payFlex-bottom-accTop-num accTop-numOne">3</div>
						  </div>
						  <div class="cro-payFlex-bottom-accBot">
							  <h3 class="cro-payFlex-bottom-accBot-text">Select “Payflex” on checkout</h3>
						  </div>
					  </div>
					  <div class="cro-payFlex-bottom-account bottom-accountOne">
						  <div class="cro-payFlex-bottom-accTop">
							  <div class="cro-payFlex-bottom-accTop-num accTop-numOne">4</div>
						  </div>
						  <div class="cro-payFlex-bottom-accBot">
							  <h3 class="cro-payFlex-bottom-accBot-text">Add your Payflex Details</h3>
						  </div>
					  </div>
				  </div>
				  <div class="cro-payFlex-bottom-acc-btn">
					  <h2 class="cro-payFlex-bottom-acc-btnBtn"><a href="https://payflex.co.za/customer-registration/">Create Payflex Account</a></h2>
				  </div>
			  </div>
			  <p class="cro-payFlex-bottom-lastPara-one">Payflex offers you the ability to purchase your products now and pay in 4 interest-free payments over 6 weeks OR 3 interest-free payments over 3 paydays - all at 0% interest.</p>
		  </div>
	  </div>
  </div>`;

        var croMobi = `<div class="cro-mobicred">
	  <div class="cro-payFlex-wrapper">
		  <div class="cro-payFlex-top">
			  <div class="cro-payFlex-top-cross">
				  <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/times.png" alt="" class="cro-payFlex-top-crossImg">
			  </div>
			  <div class="cro-payFlex-top-logo">
				  <img src="https://mobicred.co.za/images/logo-mobicred-grey.png" alt="" class="cro-payFlex-top-logoImg">
			  </div>
		  </div>
		  <div class="cro-payFlex-bottom">
			  <h2 class="cro-payFlex-bottom-title">How it works</h2>
			  <p class="cro-payFlex-bottom-para">Mobicred is digital credit that allows you to shop safely at over 55,000 places, both online and in-store* – with us being one of these. You could qualify for up to R50,000* credit in less than 15 minutes*.</p>
			  <div class="cro-payFlex-bottom-acc">
				  <div class="cro-payFlex-bottom-acc-des">
					  <div class="cro-payFlex-bottom-account bottom-accountOne">
						  <div class="cro-payFlex-bottom-accTop">
							  <div class="cro-payFlex-bottom-accTop-num accTop-numOne">1</div>
						  </div>
						  <div class="cro-payFlex-bottom-accBot">
							  <h3 class="cro-payFlex-bottom-accBot-text">Create an account</h3>
						  </div>
					  </div>
					  <div class="cro-payFlex-bottom-account bottom-accountOne">
						  <div class="cro-payFlex-bottom-accTop">
							  <div class="cro-payFlex-bottom-accTop-num accTop-numOne">2</div>
						  </div>
						  <div class="cro-payFlex-bottom-accBot">
							  <h3 class="cro-payFlex-bottom-accBot-text">Add Items to your cart</h3>
						  </div>
					  </div>
					  <div class="cro-payFlex-bottom-account bottom-accountOne">
						  <div class="cro-payFlex-bottom-accTop">
							  <div class="cro-payFlex-bottom-accTop-num accTop-numOne">3</div>
						  </div>
						  <div class="cro-payFlex-bottom-accBot">
							  <h3 class="cro-payFlex-bottom-accBot-text">Select Mobicred on checkout</h3>
						  </div>
					  </div>
					  <div class="cro-payFlex-bottom-account bottom-accountOne">
						  <div class="cro-payFlex-bottom-accTop">
							  <div class="cro-payFlex-bottom-accTop-num accTop-numOne">4</div>
						  </div>
						  <div class="cro-payFlex-bottom-accBot">
							  <h3 class="cro-payFlex-bottom-accBot-text">Add your Mobicred Details</h3>
						  </div>
					  </div>
				  </div>
				  <div class="cro-payFlex-bottom-acc-btn">
					  <h2 class="cro-payFlex-bottom-acc-btnBtn"><a href="https://mobicred.co.za/customer/mobicred/register?merchantID=3140&returnUrl=https://carrolboyes.com/za/">Create Mobicred Account</a></h2>
				  </div>
			  </div>
			  <p class="cro-payFlex-bottom-lastPara-one">Repay your balance via a convenient debit order, where your monthly minimum repayment is just 10% of your outstanding balance.</p>
			  <div class="cro-payFlex-bottom-lastPara-two">*Ts & Cs apply. Select automated income verification and accept pre-agreement.The application process is simple, easy and can be done anywhere & anytime; but Mobicred has support staff ready to help you if you get stuck in the process. Contact them <a href="https://mobicred.co.za/customer/mobicred/register?merchantID=3140&returnUrl=https://carrolboyes.com/za/">here:</a></div>
		  </div>
	  </div>
  </div>`;

        var croCarrol = `<div class="cro-carrolBoyes">
	  <div class="cro-payFlex-wrapper">
		  <div class="cro-payFlex-top">
			  <div class="cro-payFlex-top-cross">
				  <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/times.png" alt="" class="cro-payFlex-top-crossImg">
			  </div>
			  <div class="cro-payFlex-top-logo">
				  <img src="https://carrolboyes.com/static/version1721193527/frontend/Codazon/unlimited_ceramics/en_US/CarrolBoyes_Checkout/images/carrolboyes-credit.png" alt="" class="cro-payFlex-top-logoImg">
			  </div>
		  </div>
		  <div class="cro-payFlex-bottom">
			  <h2 class="cro-payFlex-bottom-title">How it works</h2>
			  <p class="cro-payFlex-bottom-para">With your Carrol Boyes Account you can shop in-store and online at Carrol Boyes and pay for your purchase over 12 months. The application process is quick and easy with pre-approval in seconds.</p>
			  <div class="cro-payFlex-bottom-acc">
				  <div class="cro-payFlex-bottom-acc-des">
					  <div class="cro-payFlex-bottom-account bottom-accountOne">
						  <div class="cro-payFlex-bottom-accTop">
							  <div class="cro-payFlex-bottom-accTop-num accTop-numOne">1</div>
						  </div>
						  <div class="cro-payFlex-bottom-accBot">
							  <h3 class="cro-payFlex-bottom-accBot-text">Create an account</h3>
						  </div>
					  </div>
					  <div class="cro-payFlex-bottom-account bottom-accountOne">
						  <div class="cro-payFlex-bottom-accTop">
							  <div class="cro-payFlex-bottom-accTop-num accTop-numOne">2</div>
						  </div>
						  <div class="cro-payFlex-bottom-accBot">
							  <h3 class="cro-payFlex-bottom-accBot-text">Upload or email required documents</h3>
						  </div>
					  </div>
					  <div class="cro-payFlex-bottom-account bottom-accountOne">
						  <div class="cro-payFlex-bottom-accTop">
							  <div class="cro-payFlex-bottom-accTop-num accTop-numOne">3</div>
						  </div>
						  <div class="cro-payFlex-bottom-accBot">
							  <h3 class="cro-payFlex-bottom-accBot-text">Select this option on checkout</h3>
						  </div>
					  </div>
					  <div class="cro-payFlex-bottom-account bottom-accountOne">
						  <div class="cro-payFlex-bottom-accTop">
							  <div class="cro-payFlex-bottom-accTop-num accTop-numOne">4</div>
						  </div>
						  <div class="cro-payFlex-bottom-accBot">
							  <h3 class="cro-payFlex-bottom-accBot-text">Enter OTP to Complete payment</h3>
						  </div>
					  </div>
				  </div>
				  <div class="cro-payFlex-bottom-acc-btn">
					  <h2 class="cro-payFlex-bottom-acc-btnBtn"><a href="https://www.ftapp.co.za/app/CB?source=CBOnline">Create Carrol Boyes Account</a></h2>
				  </div>
			  </div>
			  <p class="cro-payFlex-bottom-lastPara-one">No interest or extra fees charged, simple sign-up process, easy account access. Find out if you qualify within 30 seconds - simply SMS RSA ID Number*Gross Monthly Income to 32472 and follow the prompts. SMS charged at R1.50.For enquiries, contact <a href="tel:087 2100 336">087 2100 336</a> or email  <a href="mailto:enquiries@fevertreefinance.co.za">enquiries@fevertreefinance.co.za</a></p>
			  <!-- <div class="cro-payFlex-bottom-lastPara-two">To apply for Payflex, you must be a South African citizen 18 years+ with a South African issued debit or credit card.</div> -->
		  </div>
	  </div>
  </div>`;

        var croPay = `<div class="cro-pay">
	  <div class="cro-payFlex-wrapper">
		  <div class="cro-payFlex-top">
			  <div class="cro-payFlex-top-cross">
				  <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/times.png" alt="" class="cro-payFlex-top-crossImg">
			  </div>
			  <div class="cro-payFlex-top-logo">
				  <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041601/image%201.png" alt="" class="cro-payFlex-top-logoImg">
			  </div>
		  </div>
		  <div class="cro-payFlex-bottom">
			  <h2 class="cro-payFlex-bottom-title">How it works</h2>
			  <p class="cro-payFlex-bottom-para">PayJustNow is an independent and registered credit provider that has partnered with Carrol Boyes to allow you to easily pay for your purchase in three equal, interest free instalments.</p>
			  <div class="cro-payFlex-bottom-acc">
				  <div class="cro-payFlex-bottom-acc-des">
					  <div class="cro-payFlex-bottom-account bottom-accountOne">
						  <div class="cro-payFlex-bottom-accTop">
							  <div class="cro-payFlex-bottom-accTop-num accTop-numOne">1</div>
						  </div>
						  <div class="cro-payFlex-bottom-accBot">
							  <h3 class="cro-payFlex-bottom-accBot-text">Download the app & sign up</h3>
						  </div>
					  </div>
					  <div class="cro-payFlex-bottom-account bottom-accountOne">
						  <div class="cro-payFlex-bottom-accTop">
							  <div class="cro-payFlex-bottom-accTop-num accTop-numOne">2</div>
						  </div>
						  <div class="cro-payFlex-bottom-accBot">
							  <h3 class="cro-payFlex-bottom-accBot-text">Add debit or credit card</h3>
						  </div>
					  </div>
					  <div class="cro-payFlex-bottom-account bottom-accountOne">
						  <div class="cro-payFlex-bottom-accTop">
							  <div class="cro-payFlex-bottom-accTop-num accTop-numOne">3</div>
						  </div>
						  <div class="cro-payFlex-bottom-accBot">
							  <h3 class="cro-payFlex-bottom-accBot-text">Scan the in-store QR code</h3>
						  </div>
					  </div>
					  <div class="cro-payFlex-bottom-account bottom-accountOne">
						  <div class="cro-payFlex-bottom-accTop">
							  <div class="cro-payFlex-bottom-accTop-num accTop-numOne">4</div>
						  </div>
						  <div class="cro-payFlex-bottom-accBot">
							  <h3 class="cro-payFlex-bottom-accBot-text">Insert the sale amount.</h3>
						  </div>
					  </div>
				  </div>
				  <div class="cro-payFlex-bottom-acc-btn">
					  <h2 class="cro-payFlex-bottom-acc-btnBtn"><a href="https://payjustnow.com/register/overview">Download PayJustNow</a></h2>
				  </div>
			  </div>
			  <p class="cro-payFlex-bottom-lastPara-one">Easy application & payment process, interest-free instalments, 3 equal instalments, enjoy your purchase immediately. To qualify for PayJustNow, you must be a South African citizen, 18 years or older, with a valid debit or credit card as well as a valid email address and mobile number.</p>
			  <!-- <div class="cro-payFlex-bottom-lastPara-two">To apply for Payflex, you must be a South African citizen 18 years+ with a South African issued debit or credit card.</div> -->
		  </div>
	  </div>
  </div>`;

        var cro30DayReturn =
            "" +
            '  <div id="cro30-day-return" class="cro-30day-return">' +
            '      <div class="cro30-wrapper">' +
            '          <div class="cro30-right">' +
            '              <img class="cro30-return-icon" src="https://crpimagebucket.s3.af-south-1.amazonaws.com/return+blue.png" alt="Return Icon" />' +
            "          </div>" +
            '          <div class="cro30-left">' +
            '              <div class="cro30-left-top"><span class="cro30-bold">30 Day </span><span class="cro30-normal">Returns Policy</span></div>' +
            '              <div class="cro30-left-bottom">' +
            '                  <div class="cro30-tooltip">' +
            '                      <div class="cro30-tooltip-text">Find out more</div>' +
            '                      <div class="cro30-tooltip-content">' +
            '                          <div class="cro30-tooltip-arrow"></div>' +
            '                          <div class="cro30-tooltip-inner">If for any reason, you are unhappy with your purchase or product, you have 30 days to return your product from the date of purchase, provided the product is unused and in its original packaging.</div>' +
            "                      </div>" +
            "                  </div>" +
            "              </div>" +
            "          </div>" +
            "      </div>" +
            "  </div>";

        var croView = `<div class="cro-viewBtn">
	  <div class="cro-viewBtn-wrapper">
		  <span class="cro-viewBtn-span">View more reviews</span>
	  </div>
  </div>`;

        /* Variation Init */
        function test_33() {
            console.log("Test-33");
            document.querySelector("body").classList.add("CRO_Test33");

            waitForElement(".product-info-main-inner .product-info-price", function () {
                if (document.querySelector('.box-tocart')) {
                    document.querySelector('.product-info-main-inner .product-info-price').insertAdjacentElement('afterend', document.querySelector('.box-tocart'))
                }

            }, 50, 15000);
        }

        function test_69() {
            console.log('Test-69')

            if (!document.querySelector('.cro_details_section')) {
                document.querySelector('.main-inner').insertAdjacentHTML('afterend', '<div class="cro_details_section"><div class="block related cro_details"><div class="block-title title"><strong id="block-related-heading" role="heading">Details</strong></div></div></div> <div class="cro_review_section"><div class="block related cro_review"></div></div> <div class="cro_moreInfo_section"><div class="block related cro_moreInfo"><div class="block-title title"><strong id="block-related-heading" role="heading">More Information</strong></div></div></div>')
            }


            if (!document.querySelector('.cro_review .product-review-wrap')) {
                insertElement('.cro_review', document.querySelector('.product-review-wrap'), 'beforeend');
            }

            if (!document.querySelector('.cro_details .product.description')) {
                insertElement('.cro_details', document.querySelector('.product.description'), 'beforeend');
            }

            if (!document.querySelector('.cro_moreInfo .additional-attributes-wrapper')) {
                insertElement('.cro_moreInfo', document.querySelector('.additional-attributes-wrapper'), 'beforeend');
            }

            if (!document.querySelector('.items.review-items .review-add')) {
                insertElement('.items.review-items', document.querySelector('.review-add'), 'beforeend');
            }

            if (!document.querySelector('.CRO_Test33')) {
                document.querySelector("body").classList.add("CRO_Test33");
                helper.waitForElement(".product-info-main-inner .product-info-price", function () {
                    document.querySelector('.product-info-main-inner .product-info-price').insertAdjacentElement('afterend', document.querySelector('.box-tocart'))
                    // .product-social-links
                });
            }
        }

        function test_68() {
            console.log('Test-68')
            document.querySelector('body').classList.add('Test-68')

            waitForElement("#partPayCalculatorWidget1", function () {
                waitForElement("#instalmentCalc", function () {
                    insertHtml('#rd2 ~.tab-CB-accordion-content', document.querySelector('#instalmentCalc'), "beforeend");
                }, 50, 15000);

                waitForElement("#partPayCalculatorWidget1", function () {
                    insertHtml('.box-tocart', document.querySelector('#partPayCalculatorWidget1'), "afterend");
                }, 50, 15000);

                waitForElement(".fevertree-credit-text", function () {
                    insertHtml('#rd2 ~.tab-CB-accordion-content', document.querySelector('.fevertree-credit-text'), "beforeend");
                }, 50, 15000);

                waitForElement(".fever-credit-img", function () {
                    insertHtml('#rd2 ~.tab-CB-accordion-content', document.querySelector('.fever-credit-img'), "beforeend");
                }, 50, 15000);
            }, 50, 15000);

        }

        function main() {
            addClass('body', 'cro-t-newPDP')
            // document.body.classList.add("modal-open");
            if (!document.querySelector(".cro-modalSection")) {
                document.querySelector('body').insertAdjacentHTML('afterbegin', croModal)
            }

            if (!document.querySelector(".cro-payFlex")) {
                document.querySelector('body').insertAdjacentHTML('afterbegin', croPayFl)
            }

            if (!document.querySelector(".cro-mobicred")) {
                document.querySelector('body').insertAdjacentHTML('afterbegin', croMobi)
            }

            if (!document.querySelector(".cro-carrolBoyes")) {
                document.querySelector('body').insertAdjacentHTML('afterbegin', croCarrol)
            }

            if (!document.querySelector(".cro-pay")) {
                document.querySelector('body').insertAdjacentHTML('afterbegin', croPay)
            }

            waitForElement("#review-form.message.info", function () {
                if (!document.querySelector(".cro-iconImg")) {
                    document.querySelector("#review-form.message.info").insertAdjacentHTML("afterbegin", croReview)
                }
            }, 50, 15000);

            waitForElement(".product-social-links", function () {
                if (!document.querySelector(".cro-buyNow")) {
                    document.querySelector(".product-social-links").insertAdjacentHTML("beforebegin", croBuyNow)
                }
            }, 50, 15000);

            waitForElement("#partPayCalculatorWidget1 #partPayCalculatorWidgetTextFromCopy span", playfix, 50, 15000);
            waitForElement("#instalmentCalc .mobicred-logo", mobicred, 50, 15000);

            waitForElement(".product-static-text", function () {
                var modal = document.querySelector(".cro-modalSection");
                window.addEventListener("click", function (event) {
                    if (event.target === modal) {
                        removeClass("body", "croModal-open")
                        removeClass("body", "croModal-show")
                        removeClass("body", "croModal-open2")
                        removeClass("body", "croModal-show2")
                        removeClass("body", "croModal-open3")
                        removeClass("body", "croModal-show3")
                        removeClass("body", "croModal-open4")
                        removeClass("body", "croModal-show4")

                        if (document.querySelector('._has-modal button[data-role="closeBtn"]')) {
                            document.querySelectorAll('._has-modal button[data-role="closeBtn"]').forEach(function (e) {
                                e && e.click()
                            })
                        }
                    }
                });
            }, 50, 15000);

            waitForElement(".items.review-items", function () {
                if (!document.querySelector(".cro-viewBtn")) {
                    document.querySelector(".items.review-items").insertAdjacentHTML("beforeend", croView)
                }

                if (document.querySelector(".review-add")) {
                    document.querySelector(".cro-viewBtn").insertAdjacentElement('afterend', document.querySelector('.review-add'))
                }
            }, 50, 15000);


            waitForElement(".items.review-items li", function () {
                var liElements = document.querySelectorAll('.items.review-items li');
                if (liElements.length > 3) {
                    for (var i = 3; i < liElements.length; i++) {
                        liElements[i].classList.toggle('croHide');
                    }
                } else {
                    console.log('liElements: ', liElements)
                    addClass(".cro-viewBtn", "croHide")
                }

            }, 50, 15000);


            waitForElement('.product-info-main-inner [data-price-type="finalPrice"] > .price', function () {
                var mainPrice = document.querySelector('.product-info-main-inner [data-price-type="finalPrice"] > .price').innerHTML
                processAndDivideBy3(mainPrice)
            }, 50, 15000);

        }

        function playfix() {

            var price = document.querySelector('#partPayCalculatorWidget1 #partPayCalculatorWidgetTextFromCopy span');
            if (price && document.querySelector('.textPriceTwo-Payflix')) {
                document.querySelector('.textPriceTwo-Payflix').innerHTML = price.innerHTML
            }
        }

        function mobicred() {
            var str = document.querySelector('#instalmentCalc').childNodes[0].textContent;
            if (document.querySelector('#instalmentCalc')) {
                var match = str.match(/\bR\d+\b/);
                console.log(str);
                if (match && document.querySelector('.textPriceTwo-mobicred')) {
                    document.querySelector('.textPriceTwo-mobicred').innerHTML = match[0]
                    console.log(match[0]); // Output: R480
                }
            }

        }

        function toggleClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.toggle(cls);
            }
        }

        live('.cro-buyNow-bottom', 'click', function (e) {
            // addClass(".cro-buyNow-wrapper","croSHOW")
            // addClass(".cro-buyNow-imgIcon.buyNow-imgTwo","croShow")
            // addClass(".cro-buyNow-imgIcon.buyNow-imgOne","croHide")
        })


        live('.cro-buyNow-imgIcon.buyNow-imgTwo', 'click', function (e) {
            // removeClass(".cro-buyNow-bottom","croShow")
            // removeClass(".cro-buyNow-imgIcon.buyNow-imgTwo","croShow")
            // removeClass(".cro-buyNow-imgIcon.buyNow-imgOne","croHide")
        })

        live('.cro-buyNow-wrapper', 'click', function (e) {
            // addClass(".cro-buyNow-bottom","croShow")
            toggleClass('.cro-buyNow-wrapper', 'croSHOW')
            toggleClass('.cro-buyNow-bottom', 'croSHOW')
        })

        live('.cro-viewBtn', 'click', function (e) {
            addClass(".cro-viewBtn", "croHide")
            var liElements = document.querySelectorAll('.items.review-items li');
            for (var i = 3; i < liElements.length; i++) {
                liElements[i].classList.toggle('croShow');
            }
        })



        live('.cro-buyNow-bottomDetails.bottomDetailsOne .cro-buyNow-bottomDetails-lastText', 'click', function (e) {
            addClass("body", "croModal-open")
            addClass("body", "croModal-show")
        })

        live('.cro-buyNow-bottomDetails.bottomDetailsTwo .cro-buyNow-bottomDetails-lastText', 'click', function (e) {
            addClass("body", "croModal-open2")
            addClass("body", "croModal-show2")
        })

        live('.cro-buyNow-bottomDetails.bottomDetailsThree .cro-buyNow-bottomDetails-lastText', 'click', function (e) {
            addClass("body", "croModal-open3")
            addClass("body", "croModal-show3")
        })

        live('.cro-buyNow-bottomDetails.bottomDetailsFour .cro-buyNow-bottomDetails-lastText', 'click', function (e) {
            addClass("body", "croModal-open4")
            addClass("body", "croModal-show4")
        })

        // live('.cro30-tooltip', 'mouseover', function(e){
        // 	addClass(".cro30-tooltip","cro-hover")
        // })

        live('.tab-CB-accordion-label', 'click', function (e) {
            setTimeout(function () {
                // if(this.getAttribute('for') == "rd3"){
                // var parent = this.closest('.tab-CB-accordion')
                var inputId = document.querySelector('#rd3')
                var parent = inputId.closest('.tab-CB-accordion')
                var grandParent = inputId.closest('.tabs-CB-accordion')
                if (inputId && inputId.checked) {
                    // console.log('addddeed')
                    parent.classList.add("croHover")
                    grandParent.classList.add("croHover")
                } else {
                    // console.log('removed')
                    parent.classList.remove("croHover")
                    grandParent.classList.remove("croHover")
                }

                // }
            }, 300)

            // removeClass(".cro30-tooltip","cro-hover")
        })

        // tab-CB-accordion-label

        live('.cro-payFlex-top-cross', 'click', function (e) {
            removeClass("body", "croModal-open")
            removeClass("body", "croModal-show")
            removeClass("body", "croModal-open2")
            removeClass("body", "croModal-show2")
            removeClass("body", "croModal-open3")
            removeClass("body", "croModal-show3")
            removeClass("body", "croModal-open4")
            removeClass("body", "croModal-show4")

            if (document.querySelector('._has-modal button[data-role="closeBtn"]')) {
                document.querySelectorAll('._has-modal button[data-role="closeBtn"]').forEach(function (e) {
                    e && e.click()
                })
            }
        })


        function test_30() {
            addClass("body", "recipe-30");
            if (!document.querySelector("#cro30-day-return")) {
                //   insertHtml(".product-static-text", cro30DayReturn, "afterend");

                document.querySelector('.tab-CB-accordion #rd3 + label + .tab-CB-accordion-content').insertAdjacentHTML('beforeend', cro30DayReturn)
            }
        }

        function lowestPrice() {
            function playfixPrice() {
                var priceElement = document.querySelector('#partPayCalculatorWidget1 #partPayCalculatorWidgetTextFromCopy span');
                if (priceElement) {
                    var price

                    if (priceElement.innerHTML.indexOf('R') != -1) {
                        price = parseFloat(priceElement.innerHTML.replace(/[^\d.-]/g, ''));
                    } else {
                        price = parseFloat(priceElement.innerHTML);
                    }

                    return isNaN(price) ? Infinity : price;
                }
                return Infinity;
            }

            function mobicredPrice() {
                var str = document.querySelector('#instalmentCalc').childNodes[0].textContent;
                if (document.querySelector('#instalmentCalc')) {
                    var match = str.match(/\bR(\d+)\b/);
                    if (match) {
                        var numericPart = parseFloat(match[1]);
                        return isNaN(numericPart) ? Infinity : numericPart;
                    }
                }
                return Infinity;
            }

            function carrolBoyesPrice() {
                // waitForElement(".fevertree-credit-text strong", function(){
                var priceElement = document.querySelector('.fevertree-credit-text strong');
                if (priceElement) {
                    var price

                    if (priceElement.innerHTML.indexOf('R') != -1) {
                        price = parseFloat(priceElement.innerHTML.replace(/[^\d.-]/g, ''));
                    } else {
                        price = parseFloat(priceElement.innerHTML);
                    }

                    return isNaN(price) ? Infinity : price;
                }
                return Infinity;
                // }, 50, 30000);

            }

            // Now, you can compare the results of these functions to find the lowest amount
            waitForElement(".fevertree-credit-text strong, #instalmentCalc, #partPayCalculatorWidget1 #partPayCalculatorWidgetTextFromCopy span ", function () {
                console.log('playfixPrice: ', playfixPrice())
                console.log('carrolBoyesPrice: ', carrolBoyesPrice())
                var lowestAmount = Math.min(playfixPrice(), mobicredPrice(), carrolBoyesPrice());
                // var lowestAmount = Math.min(playfixPrice(), carrolBoyesPrice());

                // Check if lowestAmount is finite before using it
                if (isFinite(lowestAmount)) {
                    console.log("The lowest amount is: " + lowestAmount);
                    if (document.querySelector('.cro-buyNow-price')) {
                        document.querySelector('.cro-buyNow-price').innerHTML = lowestAmount.toFixed(2)
                    }



                    if (document.querySelector('.fevertree-credit-text strong') && document.querySelector('.textPriceTwo-carrol-boyes')) {
                        var str = document.querySelector('.fevertree-credit-text strong').innerHTML
                        str = str.replace(/\s+/g, '').trim()
                        console.log('--------STR:', str)
                        document.querySelector('.textPriceTwo-carrol-boyes').innerHTML = str
                    }


                } else {
                    console.log("No valid amount found.");
                }
            }, 50, 30000);

        }

        function trigger() {
            var doneTypingInterval = 6000;  //time in ms, 5 seconds for example
            var intervalCallAgain = setInterval(function () {
                // if(!document.querySelector('.fevertree-credit-text strong') || !document.querySelector('#instalmentCalc') || !document.querySelector('#partPayCalculatorWidget1 #partPayCalculatorWidgetTextFromCopy span ')){
                lowestPrice()
                waitForElement("#partPayCalculatorWidget1 #partPayCalculatorWidgetTextFromCopy span", playfix, 50, 15000);
                waitForElement("#instalmentCalc .mobicred-logo", mobicred, 50, 15000);
                // }
            }, 400);

            //start the countdown
            var Timer = setTimeout(function () {
                clearInterval(intervalCallAgain);
            }, doneTypingInterval);

        }

        function processAndDivideBy3(inputString) {
            // Extract the numeric part using a regular expression
            var match = inputString.match(/[\d,]+/);

            if (match) {
                // Remove commas and convert the string to a number
                var numericValue = parseFloat(match[0].replace(/,/g, ''));

                // Check if the conversion is successful and numericValue is a finite number
                if (!isNaN(numericValue) && isFinite(numericValue)) {
                    // Divide by 3 and add '.00' at the end
                    var result = (numericValue / 3).toFixed(2);
                    // console.log(result);

                    if (document.querySelector('.textPriceTwo-PayJust')) {
                        document.querySelector('.textPriceTwo-PayJust').innerHTML = 'R' + result
                    }
                } else {
                    console.log("Invalid numeric value in the string:", inputString);
                }
            } else {
                console.log("No numeric value found in the string:", inputString);
            }
        }




        /* Initialise variation */
        waitForElement("body", function () {
            main();
            if (!document.querySelector('.CRO_Test33')) {
                test_33();
            }

            if (!document.querySelector('.Test-68')) {
                test_68();
            }

            if (!document.querySelector('.Test-69')) {
                document.querySelector('body').classList.add('Test-69')
                waitForElement(".product-review-wrap", test_69, 50, 15000);
            }

            if (!document.querySelector('.recipe-30')) {
                waitForElement(".tab-CB-accordion #rd3 + label + .tab-CB-accordion-content", test_30, 50, 30000);
            }

            trigger();
        }, 50, 15000);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();