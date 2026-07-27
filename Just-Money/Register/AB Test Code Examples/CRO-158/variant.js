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


	  /* Variation html */
	  var newSec = `<section class="new-sec cro-DBCS-94">
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
      <div class="cards-part">
        <div class="first-card cro-review-card">
          <div class="back-part">
            <h3 class="card-header">"Great Service. Great Team"</h3>
            <p class="under-text">I have been using this platform for the past year, and honestly, I see myself using this platform for the foreseeable future. Great Service. Great Team. Great Coaches. Your dedication and client service sets you apart from the competition.</p>
            <img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
            <p class="clint-name">Matthew C</p>
  
          </div>
        </div>
        <div class="sec-card cro-review-card">
          <div class="back-part">
            <h3 class="card-header">"Very professional and friendly"</h3>
            <p class="under-text">I spoke to Allie on the phone and he was very professional and friendly. He took me through how to navigate their platform and also gave me a brief of my credit profile.</p>
            <img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
            <p class="clint-name">Nick</p>
  
          </div>
        </div>
        <div class="third-card cro-review-card">
          <div class="back-part">
            <h3 class="card-header">"On top of their game"</h3>
            <p class="under-text">I would recommend them to anyone who has queries about their credit score or what needs to be updated. keep up the great work guys.The best website  online platform I have dealt with in a very long time.</p>
            <img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
            <p class="clint-name">Ezzard</p>
  
          </div>
        </div>
        <div class="four-card cro-review-card">
          <div class="back-part">
            <h3 class="card-header">"Thanks to JustMoney"</h3>
            <p class="under-text">Thanks to JustMoney. I didn't know this company was so helpful in this manner. Your staff is excellent...your service is too. Thanks</p>
            <img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
            <p class="clint-name">Pryzene M</p>
          </div>
        </div>
      </div>
    </div>
  </section>`;

    var croOurScore = `<section class="cro-ourScore">
    <div class="cro-ourScore-wrapper">
        <div class="cro-ourScore-inner">
            <div class="cro-ourScore-img">
                <div class="cro-ourScore-img-inner relative container">
                    <img src="https://justmoneycreditsav.co.za/registrationbg.ce2761211190336d.webp" alt="" class="cro-ourScore-image">
                </div>
            </div>
            <div class="cro-ourScore-details">
                <div class="cro-ourScore-details-inner relative container">
                    <div class="cro-ourScore-details-text">
                        <h2 class="cro-ourScore-title">With us you can:</h2>
                        <p class="cro-ourScore-para">Access intelligent products and services, browse informative financial content, use money-savvy tools, join the JustMoney community, and be rewarded!</p>
                    </div>
                    <div class="cro-ourScore-details-img">
                        <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/DBCS-recipe-1_scoor-image%20(1).png" alt="" class="cro-ourScore-details-image">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`;

    var croHelp = `<div class="cro-needHelp">
    <div class="cro-needHelp-wrapper">
        <div class="cro-needHelp-inner relative container">
            <div _ngcontent-olr-c80="" class="d-flex align-items-center pt-md-4 sm-devicetop">
                <div _ngcontent-olr-c80=""><span _ngcontent-olr-c80="" class="border-orange p-2 rounded-circle"><svg _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="20px" height="20px" x="0" y="0" viewBox="0 0 473.806 473.806" xml:space="preserve" style="enable-background: new 0 0 512 512;">
                      <g _ngcontent-olr-c80="">
                        <g _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg">
                          <g _ngcontent-olr-c80="">
                            <path _ngcontent-olr-c80="" d="M374.456,293.506c-9.7-10.1-21.4-15.5-33.8-15.5c-12.3,0-24.1,5.3-34.2,15.4l-31.6,31.5c-2.6-1.4-5.2-2.7-7.7-4 c-3.6-1.8-7-3.5-9.9-5.3c-29.6-18.8-56.5-43.3-82.3-75c-12.5-15.8-20.9-29.1-27-42.6c8.2-7.5,15.8-15.3,23.2-22.8 c2.8-2.8,5.6-5.7,8.4-8.5c21-21,21-48.2,0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5c-6-6.2-12.3-12.6-18.8-18.6 c-9.7-9.6-21.3-14.7-33.5-14.7s-24,5.1-34,14.7c-0.1,0.1-0.1,0.1-0.2,0.2l-34,34.3c-12.8,12.8-20.1,28.4-21.7,46.5 c-2.4,29.2,6.2,56.4,12.8,74.2c16.2,43.7,40.4,84.2,76.5,127.6c43.8,52.3,96.5,93.6,156.7,122.7c23,10.9,53.7,23.8,88,26 c2.1,0.1,4.3,0.2,6.3,0.2c23.1,0,42.5-8.3,57.7-24.8c0.1-0.2,0.3-0.3,0.4-0.5c5.2-6.3,11.2-12,17.5-18.1c4.3-4.1,8.7-8.4,13-12.9 c9.9-10.3,15.1-22.3,15.1-34.6c0-12.4-5.3-24.3-15.4-34.3L374.456,293.506z M410.256,398.806 C410.156,398.806,410.156,398.906,410.256,398.806c-3.9,4.2-7.9,8-12.2,12.2c-6.5,6.2-13.1,12.7-19.3,20 c-10.1,10.8-22,15.9-37.6,15.9c-1.5,0-3.1,0-4.6-0.1c-29.7-1.9-57.3-13.5-78-23.4c-56.6-27.4-106.3-66.3-147.6-115.6 c-34.1-41.1-56.9-79.1-72-119.9c-9.3-24.9-12.7-44.3-11.2-62.6c1-11.7,5.5-21.4,13.8-29.7l34.1-34.1c4.9-4.6,10.1-7.1,15.2-7.1 c6.3,0,11.4,3.8,14.6,7c0.1,0.1,0.2,0.2,0.3,0.3c6.1,5.7,11.9,11.6,18,17.9c3.1,3.2,6.3,6.4,9.5,9.7l27.3,27.3 c10.6,10.6,10.6,20.4,0,31c-2.9,2.9-5.7,5.8-8.6,8.6c-8.4,8.6-16.4,16.6-25.1,24.4c-0.2,0.2-0.4,0.3-0.5,0.5 c-8.6,8.6-7,17-5.2,22.7c0.1,0.3,0.2,0.6,0.3,0.9c7.1,17.2,17.1,33.4,32.3,52.7l0.1,0.1c27.6,34,56.7,60.5,88.8,80.8 c4.1,2.6,8.3,4.7,12.3,6.7c3.6,1.8,7,3.5,9.9,5.3c0.4,0.2,0.8,0.5,1.2,0.7c3.4,1.7,6.6,2.5,9.9,2.5c8.3,0,13.5-5.2,15.2-6.9 l34.2-34.2c3.4-3.4,8.8-7.5,15.1-7.5c6.2,0,11.3,3.9,14.4,7.3c0.1,0.1,0.1,0.1,0.2,0.2l55.1,55.1 C420.456,377.706,420.456,388.206,410.256,398.806z" fill="#e59a2c" data-original="#000000"></path>
                            <path _ngcontent-olr-c80="" d="M256.056,112.706c26.2,4.4,50,16.8,69,35.8s31.3,42.8,35.8,69c1.1,6.6,6.8,11.2,13.3,11.2c0.8,0,1.5-0.1,2.3-0.2 c7.4-1.2,12.3-8.2,11.1-15.6c-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3,3.7-15.6,11 S248.656,111.506,256.056,112.706z" fill="#e59a2c" data-original="#000000"></path>
                            <path _ngcontent-olr-c80="" d="M473.256,209.006c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2,3.7-15.5,11 c-1.2,7.4,3.7,14.3,11.1,15.6c46.6,7.9,89.1,30,122.9,63.7c33.8,33.8,55.8,76.3,63.7,122.9c1.1,6.6,6.8,11.2,13.3,11.2 c0.8,0,1.5-0.1,2.3-0.2C469.556,223.306,474.556,216.306,473.256,209.006z" fill="#e59a2c" data-original="#000000"></path>
                          </g>
                        </g>
                        <g _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg"></g>
                        <g _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg"></g>
                        <g _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg"></g>
                        <g _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg"></g>
                        <g _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg"></g>
                        <g _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg"></g>
                        <g _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg"></g>
                        <g _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg"></g>
                        <g _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg"></g>
                        <g _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg"></g>
                        <g _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg"></g>
                        <g _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg"></g>
                        <g _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg"></g>
                        <g _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg"></g>
                        <g _ngcontent-olr-c80="" xmlns="http://www.w3.org/2000/svg"></g>
                      </g>
                    </svg></span></div>
                <div _ngcontent-olr-c80="" class="ps-2"><span _ngcontent-olr-c80="" class="d-block">Need Help?</span><a _ngcontent-olr-c80="" href="tel:0875376113" id="callme" class="callus">Call us on 0875376113</a></div>
            </div>
        </div>
    </div>
</div>`;

    var croCreditScore = `<div class="cro-creditScore">
    <div class="cro-creditScore-wrapper">
        <div class="cro-creditScore-inner">
            <div class="cro-creditScore-top">
                <h2 class="cro-creditScore-text">Check your credit score now and take control of your finances. It's instant and totally <span>FREE!</span></h2>
            </div>
            <div class="cro-creditScore-bottom">
                <div class="cro-creditScore-points">
                    <div class="cro-creditScore-point cro-creditScore-one">
                        <div class="cro-creditScore-point-img">
                            <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/orange%20check.png" alt="" class="cro-point-img">
                        </div>
                        <div class="cro-creditScore-point-text">
                            <p class="cro-creditScore-textPara">Get a personal loan and credit facility</p>
                        </div>
                    </div>
                    <div class="cro-creditScore-point cro-creditScore-two">
                        <div class="cro-creditScore-point-img">
                            <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/orange%20check.png" alt="" class="cro-point-img">
                        </div>
                        <div class="cro-creditScore-point-text">
                            <p class="cro-creditScore-textPara">Consolidate your debt</p>
                        </div>
                    </div>
                    <div class="cro-creditScore-point cro-creditScore-three">
                        <div class="cro-creditScore-point-img">
                            <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/orange%20check.png" alt="" class="cro-point-img">
                        </div>
                        <div class="cro-creditScore-point-text">
                            <p class="cro-creditScore-textPara">Save and invest</p>
                        </div>
                    </div>
                    <div class="cro-creditScore-point cro-creditScore-four">
                        <div class="cro-creditScore-point-img">
                            <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/orange%20check.png" alt="" class="cro-point-img">
                        </div>
                        <div class="cro-creditScore-point-text">
                            <p class="cro-creditScore-textPara">Protect your car</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;

    var croLog = `<div class="cro-logIn">
    <div class="cro-logIn-wrapper">
      <div class="cro-logIn-inner">
        <div _ngcontent-gyk-c80="" class="ms-md-5 d-flex column-reverse">
          <div _ngcontent-gyk-c80="" class="cro-navbar-nav custom-nav">
            <span class="cro-navbar-login">Already have a profile?</span>
            <span _ngcontent-gyk-c80="" class="cro-nav-item"><a _ngcontent-gyk-c80="" name="cro-btn_LoginRedirect_Register" href="javascript:void(0)" class="nav-link text-decoration-none" id="cro-btn_LoginRedirect_Register-2">Log In</a></span>
          </div>
        </div>
      </div>
    </div>
</div>`;


	  /* Variation Init */
	  function init() {
		
      addClass("body","cro-CreditSav-t-1") 
      addClass("body","recipe-t-review-1")

      waitForElement('.ng-star-inserted .register-hld.register', function () {
          if (!document.querySelector('.new-sec')) {
            insertHtml('.ng-star-inserted .register-hld.register', newSec, "afterend");
            console.log('NEw added')
          }else{
            insertHtml('.new-sec', newSec, "afterend");
            console.log('2 added')
          }
      });

      waitForElement('.new-sec', function () {
        if (!document.querySelector('.cro-ourScore')) {
          insertHtml('.new-sec', croOurScore, "beforebegin");
        }
      });

      waitForElement('#id-number-form', function () {
        if (!document.querySelector('.cro-needHelp')) {
          insertHtml('#id-number-form', croHelp, "afterend");
        }
      });

      waitForElement('#id-number-form', function () {
        if (!document.querySelector('.cro-creditScore')) {
          insertHtml('#id-number-form', croCreditScore, "beforebegin");
        }
      });

      waitForElement('.registerholder #btnRegisterRegisterPage', function () {
        var croButton = document.querySelector('.registerholder #btnRegisterRegisterPage');
          if (croButton) {
            croButton.textContent = 'Continue';
          }
      });

      waitForElement('#id-number-form .custom-row:nth-child(2)', function () {
          if (!document.querySelector('.cro-logIn')) {
            insertHtml('#id-number-form .custom-row:nth-child(2)', croLog, "afterend");
          }
      });

      waitForElement('#id-number-form .custom-row:nth-child(2)', function () {
          var idNumberInput = document.getElementById("IdNumber");
          if (idNumberInput) {
            idNumberInput.placeholder = "Enter your ID Number";
          }
      });

      waitForElement('#registerForm #btnRegisterRegisterPage-3', function () {
        var croButton = document.querySelector('#registerForm #btnRegisterRegisterPage-3');
          if (croButton) {
            croButton.textContent = 'Sign up';
          }

          croButton.closest('.custom-row').classList.add('cro-RegisterBTN')

          if(!document.querySelector('#cro-btnRegisterRegisterPage-3')){
            document.querySelector('#registerForm #btnRegisterRegisterPage-3').insertAdjacentHTML('afterend', '<span class="btn btn-custom mb-md-0 mt-auto subresponsive subreswidth mb-3" id="cro-btnRegisterRegisterPage-3">Sign up</span>')
          }

          // 
      });
       
      // #AcceptTerms-2
      waitForElement('#AcceptTerms-2', function () {
        document.querySelector('#AcceptTerms-2').closest('.switch').classList.add('cro-Switch')
      });
      

	  }


    function validate(){
      var firstName = document.querySelector('#FirstName').value
      var surName = document.querySelector('#Surname').value

      var phoneNumber = document.querySelector('#PhoneNumber').value
      var email = document.querySelector('#Email').value
      var password = document.querySelector('#Password').value
      // var confirmPassword = document.querySelector('#ConfirmPassword').value
      // AcceptTerms-2
      var switchBTN = document.querySelector('#AcceptTerms-2')

      if(firstName != '' && surName != '' && phoneNumber != '' && email != '' && password != '' && switchBTN.checked && !document.querySelector('.invalid-feedback .ng-star-inserted')){
        document.querySelector('#cro-btnRegisterRegisterPage-3').classList.add('cro-active')
      }else{
        if(document.querySelector('.cro-active')){
          document.querySelector('#cro-btnRegisterRegisterPage-3').classList.remove('cro-active')
        } 
      }

    }



    live("#cro-btn_LoginRedirect_Register-2","click",function(){
      var croLogInButton = document.querySelector(".navbar-expand-md .navbar-nav .nav-link");
      croLogInButton.click();
      
    });

    live("#FirstName, #Surname, #PhoneNumber, #Email, #Password, #ConfirmPassword","keyup",function(){
      setTimeout(function(){
        validate();
      },500)
    });

    live(".cro-Switch","click",function(){
      setTimeout(function(){
        validate();
      },500)
    });

    // btnRegisterRegisterPage-3
    live("#cro-btnRegisterRegisterPage-3.cro-active","click",function(){
     document.querySelector('#btnRegisterRegisterPage-3').click();
    });
		
		/* Initialise variation */
			waitForElement('body', init);
	 
	} catch (e) {
	  if (debug) console.log(e, "error in Test" + variation_name);
	}
})();