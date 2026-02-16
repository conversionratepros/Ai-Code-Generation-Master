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
    //        <div  class="mobilebgreg px-md-0 px-3" id="cro-bgcontrol">
    //            <div class="topcap">
    //              <h1 class="page-caption">Need a credit check?</h1>
    //              <p  class="page-text">We'll get it <br class="d-md-none d-block cro-br"> sorted.</p>
    //              <div class="cro-new-banner-leftText">
    //                <p class="cro-new-banner-left-para">Get your Credit Report, view your score and track your payments as often as you like. Free!</p>
    //              </div>
    //            </div>
    //            <!---->
    //            <div  class="frmhold">
    //              <form id="cro-genregister" novalidate="" class="ng-untouched ng-pristine ng-invalid">
    //                <!---->
    //                <div class="custom-row idrow row mb-28 required" id="cro-divIdNumber">
    //                  <div class="col cro-col cro-col-one"><input class="form-control frm-fld ng-untouched ng-pristine ng-invalid" formcontrolname="IdNumber" id="cro-IdNumber" maxlength="13" numeric-field="" placeholder="ID Number" type="tel"><label class="d-none" for="IdNumber">ID Number</label>
    //                    <!---->
    //                  </div>
    //                  <div class="col- cro-col cro-col-two"><button class="btn btn-custom mb-md-0 spacetop" id="cro-one-btn-partical-register" name="btnRegisterRegisterPage" type="button">Get credit score</button></div>
    //                </div>
    //                <div class="cro-custome">
    //                    <ul class="cro-banner-bullet">
    //                        <li>View your credit snapshot</li>
    //                        <li>Monitor payments</li>
    //                        <li>Understand your financial position</li>
    //                    </ul>
    //                </div>
    //                <div class="custom-row row">
    //                  <div class="col d-flex flex-wrap align-items-center justify-content-between"><button class="btn btn-custom mb-md-0 mb-3" id="cro-btn-register" name="btnRegisterRegisterPage" style="display: none;" type="submit">Submit and Send OTP</button>
    //                    <div class="btn-responsive login-button"><span class="text-md text-dark d-md-inline-block pr-1 login-button">Already have an account?</span><a  class="cro-login-link" href="javascript:void(0)">Log in </a></div>
    //                  </div>
    //                </div>
    //              </form>
    //            </div>
                  
    //        </div>                  
    //    </div>
    //    <div class="cro-new-banner-right">
    //        <div class="cro-banner-rightImg">
    //            <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Banner-top.png" alt="" class="cro-new-banner-right-img">
    //        </div>
    //    </div>
    //   </div>
    // </section>`;
        var creditMaster = `<section class="cro-credit-master">
        <div class="cro-credit-master-wrapper container">
            <div class="cro-credit-master-left">
                <div class="cro-credit-master-leftImg">
                    <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/banner-desktop%20(1).png" alt="" class="cro-credit-master-left-img-desktop">
                    <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/banner-mobile.png" alt="" class="cro-credit-master-left-img-mobile">
                </div>
            </div>
            <div class="cro-credit-master-right">
                <div class="cro-credit-master-right-top">
                    <div class="cro-credit-master-right-topHeader">
                        <h3 class="cro-credit-master-right-top-heading">Become a master of your credit score</h3>
                    </div>
                </div>
                <div class="cro-credit-master-right-bottom">
                    <div class="cro-credit-master-right-bottom-points">
                        <div class="cro-right-bottom-points right-bottom-points-one">
                            <div class="cro-right-bottom-pointsImg">
                                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/debt_Recipe%202_chart-pie.png" alt="" class="cro-right-bottom-points-img">
                            </div>
                            <div class="cro-right-bottom-pointsText">
                                <div class="cro-right-bottom-points-text">View your debt breakdown</div>
                            </div>
                        </div>
                        <div class="cro-right-bottom-points right-bottom-points-two">
                            <div class="cro-right-bottom-pointsImg">
                                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/debt_Recipe%202_file-invoice.png" alt="" class="cro-right-bottom-points-img">
                            </div>
                            <div class="cro-right-bottom-pointsText">
                                <div class="cro-right-bottom-points-text">Summary of all your open accounts</div>
                            </div>
                        </div>
                        <div class="cro-right-bottom-points right-bottom-points-three">
                            <div class="cro-right-bottom-pointsImg">
                                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/debt_Recipe%202_undo-alt.png" alt="" class="cro-right-bottom-points-img">
                            </div>
                            <div class="cro-right-bottom-pointsText">
                                <div class="cro-right-bottom-points-text">Overview of your accounts that are in arrears</div>
                            </div>
                        </div>
                        <div class="cro-right-bottom-points right-bottom-points-four">
                            <div class="cro-right-bottom-pointsImg">
                                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/money-bill.png" alt="" class="cro-right-bottom-points-img">
                            </div>
                            <div class="cro-right-bottom-pointsText">
                                <div class="cro-right-bottom-points-text">Summary of your remaining balances of your accounts</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
        var croFooterpart = `<div class="new-section-footer">
    <div class="cro-t-rec-2-wrapper container">
   <div class="cro-t-2-footer-part">
     <div class="cro-t-2-text-part">
       <p class="cro-footer-text">Get your credit report now</p>
     </div>
     <div class="custom-row idrow row mb-28 required" id="cro-divIdNumber2">
         <div class="col cro-col cro-col-one"><input class="form-control cro-form-control frm-fld ng-untouched ng-pristine ng-invalid" formcontrolname="IdNumber" id="cro-IdNumber2" maxlength="13" numeric-field="" placeholder="ID Number" type="tel"><label class="d-none" for="IdNumber">ID Number</label>
           <!---->
         </div>
         <div class="col- cro-button-part cro-col cro-col-two"><button class="btn btn-custom mb-md-0 spacetop cro-button-style" id="cro-two-btn-partical-register2" name="btnRegisterRegisterPage" type="button">Get credit score</button></div>
     </div>              
   </div>
 </div>
    </div>`
    var croTop =''+ 
    '  <div class="cro-topPara">'+ 
    '      <div class="cro-topPara-wrapeer">'+ 
    '          <div class="cro-new-banner-leftText">'+ 
    '              <p class="cro-new-banner-left-para">Get your Credit Report, view your score and track your payments as often as you like. Free!</p>'+ 
    '          </div>'+ 
    '      </div>'+ 
    '  </div>';
    var croTopPoint =''+ 
    '  <div class="cro-topPoint">'+ 
    '      <div class="cro-topPoint-wrapper">'+ 
    '          <div class="cro-custome">'+ 
    '              <ul class="cro-banner-bullet">'+ 
    '                  <li>View your credit snapshot</li>'+ 
    '                  <li>Monitor payments</li>'+ 
    '                  <li>Understand your financial position</li>'+ 
    '              </ul>'+ 
    '          </div>'+ 
    '      </div>'+ 
    '  </div>';
    var croTopImg =''+ 
    '  <div class="cro-newImg">'+ 
    '      <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Banner-top.png">'+ 
    '  </div>';
    var croValditation =''+ 
    '  <div class="cro-t-2-footer-valid">'+ 
    '      <p class="cro-t-2-footer-validText"></p>'+ 
    '  </div>';
    
        /* Variation Init */
        function init() {
            addClass("body", "cro-t-rec-2")
            waitForElement(".registerholder", function () {
                addClass(".registerholder", "container")
            });
            waitForElement(".register.register-hld", function () {
                if (!document.querySelector(".cro-credit-master")) {
                    insertHtml(".register.register-hld", creditMaster, "afterend");
                }
            });
            waitForElement(".cro-credit-master", function () {
                if (!document.querySelector(".new-section-footer")) {
                    insertHtml(".cro-credit-master", croFooterpart, "afterend");
                }
            });
            waitForElement(".topcap", function () {
                if (!document.querySelector(".cro-topPara")) {
                    insertHtml(".topcap", croTop, "afterend");
                }
            });
            waitForElement(".btn-responsive.login-button", function () {
                if (!document.querySelector(".cro-topPoint")) {
                    insertHtml(".btn-responsive.login-button", croTopPoint, "beforebegin");
                }
            });
            waitForElement(".needflex", function () {
                if (!document.querySelector(".cro-newImg")) {
                    insertHtml(".needflex", croTopImg, "beforeend");
                }
            });
            waitForElement(".cro-col-one", function () {
                if (!document.querySelector(".cro-t-2-footer-valid")) {
                    insertHtml(".cro-col-one", croValditation, "beforeend");
                }
            });
        }
        live("#cro-two-btn-partical-register2","click",function(){
            var target = document.querySelector('.nav-cutom');
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY,
                    behavior: 'smooth'
                });
            }
        });
        live("#btn-partical-register","click",function(){
            var cro_body = document.querySelector(".register-body");
            if (!cro_body.classList.contains("cro-register-body")) {
                cro_body.classList.add("cro-register-body");
            }
        });
        /* Initialise variation */
        waitForElement('body', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();