(function () {
	try {
	  /* main variables */
	  var debug = 0;
	  var variation_name = "cro166";
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

	  function removeClass(el, cls) {
		var el = document.querySelector(el);
		if (el) {
		  el.classList.contains(cls) && el.classList.remove(cls);
		}
	  }

	  var newCallicon = `<div class="cro166-need-help">
    <div class="cro166-need-help-wrapper">
        <div class="cro166-need-help-inner">
            <div class="cro166-need-help-right">
                <div class="cro166-need-help-right-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="20px" height="20px" x="0" y="0" viewBox="0 0 473.806 473.806" xml:space="preserve" style="enable-background: new 0 0 512 512;">
                <g>
                    <g xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M374.456,293.506c-9.7-10.1-21.4-15.5-33.8-15.5c-12.3,0-24.1,5.3-34.2,15.4l-31.6,31.5c-2.6-1.4-5.2-2.7-7.7-4 c-3.6-1.8-7-3.5-9.9-5.3c-29.6-18.8-56.5-43.3-82.3-75c-12.5-15.8-20.9-29.1-27-42.6c8.2-7.5,15.8-15.3,23.2-22.8 c2.8-2.8,5.6-5.7,8.4-8.5c21-21,21-48.2,0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5c-6-6.2-12.3-12.6-18.8-18.6 c-9.7-9.6-21.3-14.7-33.5-14.7s-24,5.1-34,14.7c-0.1,0.1-0.1,0.1-0.2,0.2l-34,34.3c-12.8,12.8-20.1,28.4-21.7,46.5 c-2.4,29.2,6.2,56.4,12.8,74.2c16.2,43.7,40.4,84.2,76.5,127.6c43.8,52.3,96.5,93.6,156.7,122.7c23,10.9,53.7,23.8,88,26 c2.1,0.1,4.3,0.2,6.3,0.2c23.1,0,42.5-8.3,57.7-24.8c0.1-0.2,0.3-0.3,0.4-0.5c5.2-6.3,11.2-12,17.5-18.1c4.3-4.1,8.7-8.4,13-12.9 c9.9-10.3,15.1-22.3,15.1-34.6c0-12.4-5.3-24.3-15.4-34.3L374.456,293.506z M410.256,398.806 C410.156,398.806,410.156,398.906,410.256,398.806c-3.9,4.2-7.9,8-12.2,12.2c-6.5,6.2-13.1,12.7-19.3,20 c-10.1,10.8-22,15.9-37.6,15.9c-1.5,0-3.1,0-4.6-0.1c-29.7-1.9-57.3-13.5-78-23.4c-56.6-27.4-106.3-66.3-147.6-115.6 c-34.1-41.1-56.9-79.1-72-119.9c-9.3-24.9-12.7-44.3-11.2-62.6c1-11.7,5.5-21.4,13.8-29.7l34.1-34.1c4.9-4.6,10.1-7.1,15.2-7.1 c6.3,0,11.4,3.8,14.6,7c0.1,0.1,0.2,0.2,0.3,0.3c6.1,5.7,11.9,11.6,18,17.9c3.1,3.2,6.3,6.4,9.5,9.7l27.3,27.3 c10.6,10.6,10.6,20.4,0,31c-2.9,2.9-5.7,5.8-8.6,8.6c-8.4,8.6-16.4,16.6-25.1,24.4c-0.2,0.2-0.4,0.3-0.5,0.5 c-8.6,8.6-7,17-5.2,22.7c0.1,0.3,0.2,0.6,0.3,0.9c7.1,17.2,17.1,33.4,32.3,52.7l0.1,0.1c27.6,34,56.7,60.5,88.8,80.8 c4.1,2.6,8.3,4.7,12.3,6.7c3.6,1.8,7,3.5,9.9,5.3c0.4,0.2,0.8,0.5,1.2,0.7c3.4,1.7,6.6,2.5,9.9,2.5c8.3,0,13.5-5.2,15.2-6.9 l34.2-34.2c3.4-3.4,8.8-7.5,15.1-7.5c6.2,0,11.3,3.9,14.4,7.3c0.1,0.1,0.1,0.1,0.2,0.2l55.1,55.1 C420.456,377.706,420.456,388.206,410.256,398.806z" fill="#e59a2c" data-original="#000000"></path>
                            <path d="M256.056,112.706c26.2,4.4,50,16.8,69,35.8s31.3,42.8,35.8,69c1.1,6.6,6.8,11.2,13.3,11.2c0.8,0,1.5-0.1,2.3-0.2 c7.4-1.2,12.3-8.2,11.1-15.6c-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3,3.7-15.6,11 S248.656,111.506,256.056,112.706z" fill="#e59a2c" data-original="#000000"></path>
                            <path d="M473.256,209.006c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2,3.7-15.5,11 c-1.2,7.4,3.7,14.3,11.1,15.6c46.6,7.9,89.1,30,122.9,63.7c33.8,33.8,55.8,76.3,63.7,122.9c1.1,6.6,6.8,11.2,13.3,11.2 c0.8,0,1.5-0.1,2.3-0.2C469.556,223.306,474.556,216.306,473.256,209.006z" fill="#e59a2c" data-original="#000000"></path>
                        </g>
                    </g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                </g>
            </svg>
                </div>

            </div>
            <div class="cro166-need-help-left">
                <div class="cro166-need-help-left-wrapper">
                <span class="cro166-need-help-left-text help">Need Help?</span>
                <span class="cro166-need-help-left-text call">Call us 0875376113</span>
            </div>
            </div>
        </div>
    </div>
</div>`;

      var newCalliconMob = `<div class="cro166-need-help mobile">
    <div class="cro166-need-help-wrapper">
        <div class="cro166-need-help-inner">
            <div class="cro166-need-help-right">
                <div class="cro166-need-help-right-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="20px" height="20px" x="0" y="0" viewBox="0 0 473.806 473.806" xml:space="preserve" style="enable-background: new 0 0 512 512;">
                <g>
                    <g xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M374.456,293.506c-9.7-10.1-21.4-15.5-33.8-15.5c-12.3,0-24.1,5.3-34.2,15.4l-31.6,31.5c-2.6-1.4-5.2-2.7-7.7-4 c-3.6-1.8-7-3.5-9.9-5.3c-29.6-18.8-56.5-43.3-82.3-75c-12.5-15.8-20.9-29.1-27-42.6c8.2-7.5,15.8-15.3,23.2-22.8 c2.8-2.8,5.6-5.7,8.4-8.5c21-21,21-48.2,0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5c-6-6.2-12.3-12.6-18.8-18.6 c-9.7-9.6-21.3-14.7-33.5-14.7s-24,5.1-34,14.7c-0.1,0.1-0.1,0.1-0.2,0.2l-34,34.3c-12.8,12.8-20.1,28.4-21.7,46.5 c-2.4,29.2,6.2,56.4,12.8,74.2c16.2,43.7,40.4,84.2,76.5,127.6c43.8,52.3,96.5,93.6,156.7,122.7c23,10.9,53.7,23.8,88,26 c2.1,0.1,4.3,0.2,6.3,0.2c23.1,0,42.5-8.3,57.7-24.8c0.1-0.2,0.3-0.3,0.4-0.5c5.2-6.3,11.2-12,17.5-18.1c4.3-4.1,8.7-8.4,13-12.9 c9.9-10.3,15.1-22.3,15.1-34.6c0-12.4-5.3-24.3-15.4-34.3L374.456,293.506z M410.256,398.806 C410.156,398.806,410.156,398.906,410.256,398.806c-3.9,4.2-7.9,8-12.2,12.2c-6.5,6.2-13.1,12.7-19.3,20 c-10.1,10.8-22,15.9-37.6,15.9c-1.5,0-3.1,0-4.6-0.1c-29.7-1.9-57.3-13.5-78-23.4c-56.6-27.4-106.3-66.3-147.6-115.6 c-34.1-41.1-56.9-79.1-72-119.9c-9.3-24.9-12.7-44.3-11.2-62.6c1-11.7,5.5-21.4,13.8-29.7l34.1-34.1c4.9-4.6,10.1-7.1,15.2-7.1 c6.3,0,11.4,3.8,14.6,7c0.1,0.1,0.2,0.2,0.3,0.3c6.1,5.7,11.9,11.6,18,17.9c3.1,3.2,6.3,6.4,9.5,9.7l27.3,27.3 c10.6,10.6,10.6,20.4,0,31c-2.9,2.9-5.7,5.8-8.6,8.6c-8.4,8.6-16.4,16.6-25.1,24.4c-0.2,0.2-0.4,0.3-0.5,0.5 c-8.6,8.6-7,17-5.2,22.7c0.1,0.3,0.2,0.6,0.3,0.9c7.1,17.2,17.1,33.4,32.3,52.7l0.1,0.1c27.6,34,56.7,60.5,88.8,80.8 c4.1,2.6,8.3,4.7,12.3,6.7c3.6,1.8,7,3.5,9.9,5.3c0.4,0.2,0.8,0.5,1.2,0.7c3.4,1.7,6.6,2.5,9.9,2.5c8.3,0,13.5-5.2,15.2-6.9 l34.2-34.2c3.4-3.4,8.8-7.5,15.1-7.5c6.2,0,11.3,3.9,14.4,7.3c0.1,0.1,0.1,0.1,0.2,0.2l55.1,55.1 C420.456,377.706,420.456,388.206,410.256,398.806z" fill="#e59a2c" data-original="#000000"></path>
                            <path d="M256.056,112.706c26.2,4.4,50,16.8,69,35.8s31.3,42.8,35.8,69c1.1,6.6,6.8,11.2,13.3,11.2c0.8,0,1.5-0.1,2.3-0.2 c7.4-1.2,12.3-8.2,11.1-15.6c-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3,3.7-15.6,11 S248.656,111.506,256.056,112.706z" fill="#e59a2c" data-original="#000000"></path>
                            <path d="M473.256,209.006c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2,3.7-15.5,11 c-1.2,7.4,3.7,14.3,11.1,15.6c46.6,7.9,89.1,30,122.9,63.7c33.8,33.8,55.8,76.3,63.7,122.9c1.1,6.6,6.8,11.2,13.3,11.2 c0.8,0,1.5-0.1,2.3-0.2C469.556,223.306,474.556,216.306,473.256,209.006z" fill="#e59a2c" data-original="#000000"></path>
                        </g>
                    </g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                </g>
            </svg>
                </div>

            </div>
            <div class="cro166-need-help-left">
                <div class="cro166-need-help-left-wrapper">
                <span class="cro166-need-help-left-text help">Need Help?</span>
                <span class="cro166-need-help-left-text call">Call us 0875376113</span>
            </div>
            </div>
        </div>
    </div>
</div>`;

      var creditScore = `<div class="cro-t-1-personal-loan-img-text">
        <div class="cro-t-1-personal-loan-img-text-wrapper container">
            <div class="cro-t-1-personal-loan-img-text-inner">
                <div class="cro-t-1-personal-loan-main-img">
                    <div class="cro-t-1-personal-img">

                    </div>
                </div>
                <div class="cro-t-1-personal-loan-text-icon">
                    <div class="cro-t-1-personal-loan-text-icon-wrapper">
                        <div class="cro-t-1-personal-loan-text">
                            <h3 class="text-white youcan">With us you can:</h3>
                            <div class="cro-t-1-personal-loan-subheading">
                                With JustMoney, you can make good money choices — see your credit report, explore financial solutions you qualify for, and get free guidance from our credit coaches.
                            </div>
                        </div>
                        <div class="cro-t-1-personal-loan-icon-score">
                            <img class="cro-icon-score" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Debt-co-za/Recipe_1/cro-jm-1-1.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    					</div>`;

    var creditScoreMobile = `<div class="cro-t-1-personal-loan-img-text-mobile">
        <div class="cro-t-1-personal-loan-img-text-mobile-wrapper">
            <div class="cro-t-1-personal-loan-main-img-mobile">
                <div class="cro-t-1-personal-img-mobile">

                </div>
            </div>
            <div class="cro-t-1-personal-loan-text-icon-mobile">
                <div class="cro-t-1-personal-loan-text-icon-mobile-wrapper container">
                    <div class="cro-t-1-personal-loan-text-mobile">
                            <h3 class="text-white youcan">With us you can:</h3>
                            <div class="cro-t-1-personal-loan-subheading">
                                With JustMoney, you can make good money choices — see your credit report, explore financial solutions you qualify for, and get free guidance from our credit coaches.
                            </div>
                        </div>
                    <div class="cro-t-1-personal-loan-icon-score">
                            <img class="cro-icon-score" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Debt-co-za/Recipe_1/cro-jm-1-1.png" alt="">
                        </div>
                </div>
            </div>
        </div>
    					</div>`;

      var cards = `<section class="new-sec">
    <div class="cro-new-sec-wrapper relative container">
      <div class="cro-header-part">
        <h2 class="top-header">What our clients say about us</h2>
        <div class="sec-part">
          <div class="sec-header-part">
            <p class="sec-frst-text">Rated 5/5</p>
            <img class="top-icon" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
            <p class="sec-sec-text">out of <strong>461</strong> Reviews on Hellopeter</p>
          </div>
        </div>
      </div>
<div class="cro-1-reviews-part">
    <div class="cro-1-review-wrapper">
       
            <div class="cro-1-review-card card-1">
                <h3>"How to handle my credit"</h3>
                <p class="cro-1-review-text">
                JustMoney has been updating me with all the changes on my profile and
                they teach me about how to handle my credit to keep my name in a high
                score.
                </p>
                <span class="author">Kwenza M</span>
            </div>

            <div class="cro-1-review-card card-2">
                <h3>"Cover every question"</h3>
                <p class="cro-1-review-text">
                Mathew has gone the extra mile by calling me to better understand my
                query and offered a helping hand to resolve my credit profile. I am
                looking forward to hearing from him as this is an ongoing process.
                </p>
                <span class="author">Rollen</span>
            </div>

            <div class="cro-1-review-card card-3">
                <h3>"Offered a helping hand"</h3>
                <p class="cro-1-review-text">
                They're friendly and quick to respond. They cover every question you
                might have.
                </p>
                <span class="author">Thembalethu M</span>
            </div>

            <div class="cro-1-review-card card-4">
                <h3>"Quick service"</h3>
                <p class="cro-1-review-text">
                It was my first time chatting with Justmoney but I got help very fast.
                I'm so happy with their service.
                </p>
                <span class="author">Kamohelo</span>
            </div>
    </div>
</div>
      
    </div>
  					</section>`;

      var loginText = `<div class="cro-1-login">
    <div class="cro-1-login-text">
        Already have a profile? <span>Login</span>
    </div>
</div>`;  


      var terms = `<div class="cro-1-tnc-button">
        <div class="cro-1-tnc-button-wrapper">
            <div class="cro-1-tnc-button-inner">
                <div class="cro-1-tnc-button-left">
                    <div class="cro-1-tnc-button-left-text">No</div>
                </div>
                <div class="cro-1-tnc-button-right">
                    <div class="cro-1-tnc-button-right-text">
                        Yes
                    </div>

                </div>
            </div>

            <div class="cro-1-tnc-text-wrapper">
            <span class="cro-1-tnc-text">
        I have read and agree to
        <a href="/terms">Terms and Conditions</a> and
        <a href="/policy">Privacy Policy</a>
    </span>
    </div>
        </div>
    </div>`;
 

	  /* Variation Init */
	  function init() {
		addClass("body", variation_name);

		waitForElement(".registerholder .rating-badge", function () {
            var parent = document.querySelector('.registerholder .rating-badge').closest('.d-flex')
            if (parent) {
                parent.classList.add('cro-hero-banner-flex')
            }
        });


		waitForElement(".registerform", function () {
            var parent = document.querySelector('.registerform').closest('.col-lg-8')
            if (parent) {
                parent.classList.add('cro166-from-parent')
            }
        });

		waitForElement("h1.topcaption", function () {
            var parent = document.querySelector('h1.topcaption').closest('.col-12.mt-3')
            if (parent) {
                parent.classList.add('cro166-banner-left')
            }
        });


        waitForElement('#registerForm .custom-row .switch + .ps-2', function () {
                                document.querySelectorAll('#registerForm .custom-row .switch + .ps-2').forEach(function (e) {
                                        var parent = e.closest('.col-md-12');
                                        if (parent && e.innerHTML.indexOf('I accept the') !== -1) {
                                                parent.classList.add('cro-1-From-tnc');
                                        }
                                });
                        });

        waitForElement(".custom-row .cro-1-From-tnc", function () {
            var parent = document.querySelector('.custom-row .cro-1-From-tnc').closest('.custom-row')
            if (parent) {
                    parent.classList.add('cro-1-From-tnc-parent')
            }
        });

        waitForElement("#registerForm #Password", function () {
            var parent = document.querySelector('#registerForm #Password').closest('.custom-row')
            if (parent) {
                    parent.classList.add('cro-1-password-input')
            }
        });

        waitForElement("#registerForm button#btn_userJourney_registrationSubmit_registration", function () {
            var parent = document.querySelector('#registerForm button#btn_userJourney_registrationSubmit_registration').closest('.custom-row')
            if (parent) {
                    parent.classList.add('cro-1-2_button-parent')
            }
        });

		  waitForElement('h1.topcaption', function(){
            if (!document.querySelector('.cro166-need-help')) {
                insertHtml('h1.topcaption', newCallicon, "afterend");
            }
        });

        waitForElement('section.register-hld', function () {
                if (!document.querySelector('.cro-t-1-personal-loan-img-text:not(.mobile)')) {
                    insertHtml('section.register-hld', creditScore, "afterend");
                }
            });

            waitForElement('section.register-hld', function () {
                if (!document.querySelector('.cro-t-1-personal-loan-img-text-mobile')) {
                    insertHtml('section.register-hld', creditScoreMobile, "afterend");
                }
            });

            waitForElement('.cro-t-1-personal-loan-img-text', function () {
                if (!document.querySelector('.new-sec')) {
                    insertHtml('.cro-t-1-personal-loan-img-text', cards, "afterend");
                }
            });

            waitForElement('#id-number-form .custom-row.reg-mobile', function () {
                if (!document.querySelector('.cro-1-login')) {
                    insertHtml('#id-number-form .custom-row.reg-mobile', loginText, "afterend");
                }
            });

            waitForElement('#registerForm .custom-row .cro-1-From-tnc', function () {
                if (!document.querySelector('.cro-1-tnc-button')) {
                    insertHtml('#registerForm .custom-row .cro-1-From-tnc', terms, "afterend");
                }
            });

            waitForElement('.cro166-from-parent .registerform', function () {
                if (!document.querySelector('.cro166-need-help.mobile')) {
                    insertHtml('.cro166-from-parent .registerform', newCalliconMob, "afterend");
                }
            });   
	  }

      function croEventHandkler(){	
	live(".cro-1-login-text span","click",function(){
      var parent = document.querySelector('a[name="btn_LoginRedirect_Register"].nav-link')
      if(parent){
        parent.click();
      }	
	})

    live('.cro-1-tnc-button-right', 'click', function () {
        addClass('body', 'active');
        document.querySelector('.cro-1-From-tnc .switch input[type="checkbox"]').click()
    });

    live('.cro-1-tnc-button-left', 'click', function () {
        removeClass('body', 'active');
        document.querySelector('.cro-1-From-tnc .switch input[type="checkbox"]').click()
    });

    live(".cro166-need-help-left-text.call","click",function(){
      var parent = document.querySelector('.registerholder a#callme')
      if(parent){
        parent.click();
      }
			
	})
}


        if (!window.cro_t_1) {
            waitForElement('.registerholder', init);
            croEventHandkler();
            window.cro_t_1 = true;
        }
			
	 
	} catch (e) {
	  if (debug) console.log(e, "error in Test" + variation_name);
	}
})();