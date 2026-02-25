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
    var topButton = `<div class="cro-top-button-sec">
      <div class="top-button">
          <div class="main-icon">
              <img class="img-icon" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/DebtBustersRecipy%2057.58%20credit%20score%20simplified%20%7Bcup].png" alt="">
          </div>
          <div class="btn-text-sec">
              <div class="btn-first-top">
                  <p class="btn-first-text">Rated</p>
              </div>
              <div class="btn-sec-part">
                  <p class="btn-sec-text">5/5</p>
                  <img class="btn-star-sec" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202a.png" alt="">
              </div>
              <div class="btn-last-bottom">
                  <p class="btn-last-text">On Hellopeter</p>
              </div>
        </div>
      </div>
    </div>`;
    var topButtonMob = `<div class="cro-top-button-sec-mob">
    <div class="top-button">
        <div class="main-icon">
            <img class="img-icon" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/DebtBustersRecipy%2057.58%20credit%20score%20simplified%20%7Bcup].png" alt="">
        </div>
        <div class="btn-text-sec">
            <div class="btn-first-top">
                <!-- <p class="btn-first-text">Rated</p> -->
            </div>
            <div class="btn-sec-part">
                <p class="btn-first-text">Rated</p>
                <p class="btn-sec-text">5/5</p>
                <img class="btn-star-sec" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202a.png" alt="">
            </div>
            <div class="btn-last-bottom">
                <p class="btn-last-text">On Hellopeter</p>
            </div>
      </div>
    </div>
</div>`;
    var newSec = `<section class="new-sec">
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
            <p class="under-text">I would recommend them to anyone who has queries about their credit score or what needs to be updated. keep up the great work guys. the best website  online platform I have dealt with in a very long time.</p>
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
      /* Variation Init */
      function init() {
        addClass("body","recipe-t-review-1")
        waitForElement('.ng-star-inserted .navbar .navbar-collapse', function () {
            if (!document.querySelector('.cro-top-button-sec')) {
                insertHtml('.ng-star-inserted .navbar .navbar-collapse', topButton, "afterbegin");
            }
        });
        waitForElement('.ng-star-inserted .register-hld.register .topcaption', function () {
            if (!document.querySelector('.cro-top-button-sec-mob')) {
                insertHtml('.ng-star-inserted .register-hld.register .topcaption', topButtonMob, "beforebegin");
            }
        });
        waitForElement('.ng-star-inserted .register-hld.register', function () {
            if (!document.querySelector('.new-sec')) {
                insertHtml('.ng-star-inserted .register-hld.register', newSec, "Afterend");
            }
        });
        
      }
        
        /* Initialise variation */
            waitForElement('body', init);
     
    } catch (e) {
      if (debug) console.log(e, "error in Test" + variation_name);
    }
})();