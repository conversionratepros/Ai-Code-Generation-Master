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
      var croNav = `<div class="cro-navbar">
      <div class="cro-navbar-wrapper container mt-5 lg:mt-10 lg:w-256">
          <div class="cro-navbar-logo">
              <img src="https://www.debt.co.za/img/TznxU2Ei2O7TiT0PFOQMgsx9IU1thXsl-290.webp" alt="" class="cro-nav-logo">
          </div>
          <div class="cro-navbar-nav">
              <nav id="primary cro-navbar-primary">
                  <ul class="cro-navbar-ul">
                    <li><a href="/" class="border-transparent">Home</a></li>
                    <li><a href="/our-partners/debtbusters/" class="border-transparent">Our partners</a></li>
                    <li><a href="/our-debt-solutions/debt-counselling/" class="border-transparent">Our debt solutions</a></li>
                    <li><a href="/how-we-work/" class="border-transparent">How we work</a></li>
                    <li><a href="/free-calculator/" class="border-tertiary">Free calculator</a></li>
                  </ul>
              </nav>
          </div>
      </div>
  </div>`;
      var croLogo = `<div class="cro-logo">
      <div class="cro-logo-wrapper container">
          <div class="cro-logo-div my-5 py-5 border-t-2 border-b-2 border-tertiary grid grid-cols-2 lg:grid-cols-6 gap-5 lg:items-center text-white">
              <a href="/our-partners/debtbusters/" title="Our partner DebtBusters" class="cro-logo-div-link cro-dbt">
                  <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/logo_debtbusters.png" alt="" class="cro-logo-div-img">
                  </a>
              <a href="/our-partners/justmoney/" title="Our partner JustMoney" class="cro-money">
                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/logo_Justmoney.png" alt="" class="cro-logo-div-img">
              </a>
              <a href="/our-partners/idm/" title="Our partner IDM" class="cro-IDM">
                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/logo_idm.png" alt="" class="cro-logo-div-img">
              </a>
              <a href="/our-partners/sanlam/" title="Our partner Sanlam" class="cro-sanlam">
                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/logo-sanlam%20(1).png" alt="" class="cro-logo-div-img">
              </a>
              <a href="/our-partners/fincheck/" title="Our partner Fincheck" class="cro-fincheck">
                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/logo_fincheck.png" alt="" class="cro-logo-div-img">
              </a>
          </div>
      </div>
  </div>`;
    var solveProblem = `<div class="cro-solve">
      <h2 class="cro-solve-mainTitle">Solve your debt problem with us</h2>
      <div class="cro-solve-wrapper container mt-5 lg:mt-10 lg:w-256">
          <div class="cro-solve-problem cro-solve-one">
              <div class="cro-solve-img">
                  <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/icon-hands.png" alt="" class="cro-solve-img-img">
              </div>
              <div class="cro-solve-title">
                  <h2 class="cro-solve-title-main">Multiple Partners</h2>
              </div>
              <div class="cro-solve-subTitle">
                  <h2 class="cro-solve-subTitle-sub">The interest rates charged on our partner's loans range between 20.25% and 24.50%</h2>
              </div>
          </div>
          <div class="cro-solve-problem cro-solve-two">
              <div class="cro-solve-img">
                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/icon-rates.png" alt="" class="cro-solve-img-img">                     
              </div>
              <div class="cro-solve-title">
                  <h2 class="cro-solve-title-main">Broad range of interest rates</h2>
              </div>
              <div class="cro-solve-subTitle">
                  <h2 class="cro-solve-subTitle-sub">The interest rates charged on our partner's loans range between 20.25% and 24.50%</h2>
              </div>
          </div>
          <div class="cro-solve-problem cro-solve-three">
              <div class="cro-solve-img">
                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/icon-calendar.png" alt="" class="cro-solve-img-img">
              </div>
              <div class="cro-solve-title">
                  <h2 class="cro-solve-title-main">Multiple term options</h2>
              </div>
              <div class="cro-solve-subTitle">
                  <h2 class="cro-solve-subTitle-sub">Our partner's payment terms are between 24 to 72 months.</h2>
              </div>
          </div>
      </div>
  </div>
  <nav id="secondary" class="text-white text-sm">Copyright © 2023 Debt.co.za - For every debt solution. All rights reserved.<br><a href="/">Home</a> | <a href="/our-partners/debtbusters/">Our partners</a> | <a href="/our-debt-solutions/debt-counselling/">Our debt solutions</a> | <a href="/how-we-work/">How we work</a> | <a href="/free-calculator/">Free calculator</a> | <a href="/contact-us/">Contact us</a> | <a href="/privacy/">Privacy</a></nav>`;
    
  var leftContent = `<div class="cro-t-02 left-content">
  <div class="cro-wrapper">
      <div class="cro-t-02-title">
          <h2 class="cro-t-02-title-main">Free Loan Calculator</h2>
          <h2 class="cro-t-02-title-sub">Consolidate all your Debt Now</h2>
      </div>
      <div class="cro-t-02-subHead">
          <h2 class="cro-t-02-subHead-sub">There are just 3 simple steps to clearing your debt burden</h2>
      </div>
      <div class="crolistItems">
          <div class="crolistItems-item">
              <div class="circle-nbr">
                  <h2 class="circle-nbr-nbr">1</h2>
              </div>
              <div class="circle-des">
                  <h2 class="circle-description">Answer a few short questions about your current debt situation.</h2>
              </div>
          </div>
          <div class="crolistItems-item">
              <div class="circle-nbr">
                  <h2 class="circle-nbr-nbr">2</h2>
              </div>
              <div class="circle-des">
                  <h2 class="circle-description">Use our free calculator to find the best solution customised to your financial needs.</h2>
              </div>
          </div>
          <div class="crolistItems-item">
              <div class="circle-nbr">
                  <h2 class="circle-nbr-nbr">3</h2>
              </div>
              <div class="circle-des">
                  <h2 class="circle-description">We will pick the best solution for your specific situation.</h2>
              </div>
          </div>
      </div>
  </div>
</div>`;
    var mblLogo = `<div class="cro-mbl-logo">
    <div class="cro-mbl-logo-wrapper container">
        <div class="cro-mbl-logo-div mbl-logo-div-one">
            <a href="/our-partners/debtbusters/" title="Our partner DebtBusters" class="cro-logo-div-link">
                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/logo_debtbusters.png" alt="" class="cro-logo-div-img croDebt">
            </a>
            <a href="/our-partners/justmoney/" title="Our partner JustMoney">
              <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/logo_Justmoney.png" alt="" class="cro-logo-div-img croMoney">
            </a>
            <a href="/our-partners/idm/" title="Our partner IDM">
                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/logo_idm.png" alt="" class="cro-logo-div-img croIdm">
            </a>
        </div>
        <div class="cro-mbl-logo-div mbl-logo-div-two">
            <a href="/our-partners/sanlam/" title="Our partner Sanlam">
                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/logo-sanlam%20(1).png" alt="" class="cro-logo-div-img croSanlam">
            </a>
            <a href="/our-partners/fincheck/" title="Our partner Fincheck">
                <img src="https://cdn-3.convertexperiments.com/uf/1004973/10041244/logo_fincheck.png" alt="" class="cro-logo-div-img croFin">
            </a>
        </div>
    </div>
</div>`;
  /* Variation Init */
      function init() {
          addClass("body", "cro-recipe-2");
          
          waitForElement("body", function () {
              if (!document.querySelector(".cro-navbar")) {
                  insertHtml("body", croNav, "afterbegin");
                  
              }
          });
          
          waitForElement(".text-white", function () {
              document.querySelectorAll('.text-white').forEach(function(e){
                  // Our partners:
                  if(e.innerHTML.indexOf('Our partners:') != -1){
                      var parent = e.closest('.border-tertiary')
                      parent.classList.add('cro-t-01-partner')
                     
                  }
              })
          });
          
          waitForElement(".cro-t-01-partner", function () {
              if (!document.querySelector(".cro-logo")) {
                  insertHtml(".cro-t-01-partner", croLogo, "beforebegin");
                 
              }
          });
          
          waitForElement(".relative.container.mt-5", function () {
              if (!document.querySelector(".cro-solve")) {
                  insertHtml(".relative.container.mt-5", solveProblem, "afterend");
                  
              }
          });
          waitForElement(".box", function () {
            if (!document.querySelector(".cro-t-02")) {
              insertHtml(".box", leftContent, "afterbegin");
              
            }
          });
          waitForElement('[for="id_number"]', function () {
              document.querySelector('[for="id_number"]').innerHTML = 'RSA ID number'
          });
          waitForElement(".cro-logo", function () {
            if (!document.querySelector(".cro-mbl-logo")) {
              insertHtml(".cro-logo", mblLogo, "afterend");
              
            }
          });
          waitForElement('.box >form', function () {
            if (!document.querySelector('.croFormHeading')) {
              document.querySelector('.box >form').insertAdjacentHTML('afterbegin', '<div class="croFormHeading">Calculate the best solution for you</div>')
            }
          });
      
      }

      
      /* Initialise variation */
          waitForElement('body', init);
   
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();