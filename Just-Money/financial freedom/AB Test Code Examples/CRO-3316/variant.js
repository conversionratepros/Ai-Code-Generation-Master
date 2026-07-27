(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "cro-26-formRepresentation";
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

    function removeClass(el, cls) {
      var el = document.querySelector(el);
      if (el) {
        el.classList.contains(cls) && el.classList.remove(cls);
      }
    }

    var croForm = `<div class="cro-26-form">
        <div class="cro-26-form-wrapper">
            <div class="cro-26-form-inner">
                <div id="cro-26-formMain" class="cro-26-formMain">
                    <div class="cro-jm-26-newHeader">
                            <div class="cro-jm-26-newHeader">
                                <div class="cro-jm-26-newHeader-inner">
                                    <div class="cro-jm-26-newHeader-left">
                                        <div class="cro-jm-26-newHeader-img">
                                            <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Justmoney_recipe-39_2_loader_circle-check.png" alt="Justmoney_recipe-39_2_loader_circle-check">
                                            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                                <path d="M0 10.5C0 4.99219 4.45312 0.5 10 0.5C15.5078 0.5 20 4.99219 20 10.5C20 16.0469 15.5078 20.5 10 20.5C4.45312 20.5 0 16.0469 0 10.5ZM14.4922 8.78125C14.9219 8.35156 14.9219 7.6875 14.4922 7.25781C14.0625 6.82812 13.3984 6.82812 12.9688 7.25781L8.75 11.4766L6.99219 9.75781C6.5625 9.32812 5.89844 9.32812 5.46875 9.75781C5.03906 10.1875 5.03906 10.8516 5.46875 11.2812L7.96875 13.7812C8.39844 14.2109 9.0625 14.2109 9.49219 13.7812L14.4922 8.78125Z" fill="#4AAEAC"/>
                                            </svg> -->
                                        </div>
                                    </div>
                                    <div class="cro-jm-26-newHeader-right">
                                        <h4 class="cro-jm-26-newHeader-content">You qualify for our services</h4>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <form class="cro-26-formFields">
                        <p class="cro-26-id cro-26-step-2"><strong>Enter your ID number to see if you qualify</strong></p>
                        
                        <input type="text" class="cro-26-input cro-26-firstName cro-26-step-1" placeholder="First name" name="firstName" required />
                        <input type="text" class="cro-26-input cro-26-lastName cro-26-step-1" placeholder="Last name" name="lastName" required />
                        <input type="email" class="cro-26-input cro-26-email cro-26-step-1" placeholder="Email address" required />
                        <input type="text" class="cro-26-input cro-26-idNumber cro-26-step-2" placeholder="ID Number" name="idNumber" required />
                        <input type="tel" class="cro-26-input cro-26-phone cro-26-step-1" placeholder="Phone number" required />
                        
                        <p class="cro-26-terms cro-26-step-1">By continuing you accept our <a href="https://www.justmoney.co.za/privacy-policy/" target="_blank">Privacy Policy</a> and <a href="https://www.justmoney.co.za/terms-conditions/" target="_blank">Terms &amp; Conditions</a></p>

                        <div class="cro-26-form-btn cro-26-step-2">
                            <div class="cro-26-form-btn-wrapper">
                                <div class="cro-26-form-btn-check-btn cro-26-btnClick" type="cro-check now">Check now</div>
                            </div>
                        </div>

                        <div class="cro-26-form-btn cro-26-step-1">
                            <div class="cro-26-form-btn-wrapper">
                                <button id="cro-26-form-btn-apply-btn_ID" class="cro-26-form-btn-apply-btn cro-26-btnClick" type="submit">Apply now</button>
                            </div>
                        </div>
                    </form>
                    <div class="cro-jm-26-loader">
                        <div class="cro-jm-26-loader-wrapper">
                            <div class="cro-jm-26-loader-inner">
                                <div class="cro-jm-26-loader-gif">
                                    <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Justmoney_recipe-39_2_loader.gif" alt="">
                                </div>
                                <div class="cro-jm-26-loader-content">
                                    <h3 class="cro-jm-26-loader-text">Checking to see if you qualify...</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    function init() {
      addClass("body", variation_name);

      cro_26_twoStep();

    }

    function validateEmail(field) {
      const emailRegex = /.+@.+\..+/;
      if (field && field.value && !emailRegex.test(field.value)) {
        field.classList.add('error');
        // return false;
      } else if (field) {
        field.classList.remove('error');
        // return true;
      }
    }

    function validatePhone(field) {
      const phoneRegex = /^[\d+-.s]+$/;
      const phoneNumberNumericOnly = field?.value?.replace(/[^0-9]/g, '') || '';
      if (
        field &&
        field.value &&
        (!phoneRegex.test(field.value) ||
          phoneNumberNumericOnly.length < 9 ||
          phoneNumberNumericOnly.length > 13)
      ) {
        field.classList.add('error');
        // return false;
      } else if (field) {
        field.classList.remove('error');
        // return true;
      }
    }


    function cro_26_twoStep() {
      waitForElement("#second-call-to-action", function () {
        var parent = document.querySelector('#second-call-to-action h2').closest('div')
        if (parent) {
          parent.classList.add('cro-t-26-call-to-action')
        }
      });

      waitForElement(".cro-t-26-call-to-action", function () {
        if (!document.querySelector(".cro-26-form")) {
          insertHtml(".cro-t-26-call-to-action", croForm, "afterend");
        }
      });

      waitForElement("#id_number, #first_name, #last_name, #email, #phone", function () {
        valuePassing();
      });

    }

    function valuePassing() {
      document.querySelector('.cro-26-idNumber').value = document.querySelector('#id_number').value;
      document.querySelector('.cro-26-firstName').value = document.querySelector('#first_name').value;
      document.querySelector('.cro-26-lastName').value = document.querySelector('#last_name').value;
      document.querySelector('.cro-26-email').value = document.querySelector('#email').value;
      document.querySelector('.cro-26-phone').value = document.querySelector('#phone').value
    }

    function cro_26_formValidation() {
      waitForElement(".cro-26-idNumber", function () {
        var croInputValue = document.querySelector('.cro-26-idNumber').value;
        if (isValidSouthAfricanId(croInputValue) == true) {
          // console.log("valid")
          addClass("body", "cro-26-form-2")
          var croWrong = document.querySelector('.cro-26-wrongId')
          if (croWrong) {
            removeClass("body", "cro-26-wrongId")


          }
          setTimeout(function () {
            removeClass("body", "cro-26-form-2")
            addClass("body", "cro-26-form-3")
          }, 2000);


        } else {
          addClass("body", "cro-26-wrongId")
        }
      });
    }

    function croEventHandkler() {
      live(".cro-26-form-btn-check-btn", "click", function () {
        cro_26_formValidation();
      });

      live("#cro-26-form-btn-apply-btn_ID", "click", function (e) {
        // e.preventDefault();
        var iDNumber = document.querySelector('.cro-26-idNumber').value
        var fName = document.querySelector('.cro-26-firstName').value
        var lName = document.querySelector('.cro-26-lastName').value
        var uEmail = document.querySelector('.cro-26-email').value
        var uPhn = document.querySelector('.cro-26-phone').value

        if (fName != '' && lName != '' && uEmail != '' && uPhn != '') {
          e.preventDefault();

          document.querySelector('#id_number').value = document.querySelector('.cro-26-idNumber').value;
          document.querySelector('#first_name').value = document.querySelector('.cro-26-firstName').value;
          document.querySelector('#last_name').value = document.querySelector('.cro-26-lastName').value;
          document.querySelector('#email').value = document.querySelector('.cro-26-email').value;
          document.querySelector('#phone').value = document.querySelector('.cro-26-phone').value;

          validateEmail(document.querySelector('.cro-26-email'))
          validatePhone(document.querySelector('.cro-26-phone'))

          if (!document.querySelector('.cro-26-input.error')) {
            document.querySelector('.btn.primary[type="submit"]') && document.querySelector('.btn.primary[type="submit"]').click();
          }

          setTimeout(function () {
            if (document.querySelector('#phone.error')) {
              document.querySelector('.cro-26-phone').classList.add('error')
            }
          }, 200)
        }

      });
    }

    if (!window.cro_t_26) {
      croEventHandkler();
      window.cro_t_26 = true;
    }

    waitForElement('#second-call-to-action', init);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();