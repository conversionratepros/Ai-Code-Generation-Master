(function () {
  try {
    /* main variables */
    var debug = 0;
    /* all Pure helper functions */

    function waitForElement(selector, trigger) {
      var interval = setInterval(function () {
        if (document && document.querySelector(selector) && document.querySelectorAll(selector).length > 0) {
          clearInterval(interval);
          trigger();
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 15000);
    }

    function forceInsertion(trigger) {
      var interval = setInterval(function () {
        trigger();
      }, 100);
      setTimeout(function () {
        clearInterval(interval);
      }, 7000);
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

    function addClass(el, cls) {
      var el = document.querySelector(el);
      if (el) {
        el.classList.add(cls);
      }
    }
    function removeClass(el, cls) {
      var element = document.querySelector(el);
      if (element) {
        cls.split(",").forEach(function (className) {
          var trimmedClass = className.trim();
          if (element.classList.contains(trimmedClass)) {
            element.classList.remove(trimmedClass);
          }
        });
      }
    }
    function addClassToClosest(elementSelector, closestSelector, className) {
      waitForElement(
        elementSelector,
        function () {
          var element = document.querySelector(elementSelector);
          if (element) {
            var closestElement = element.closest(closestSelector);
            if (closestElement) {
              closestElement.classList.add(className);
            }
          }
        },
        50,
        30000
      );
    }

    function addClassToElement(selector, className) {
      waitForElement(selector, function () {
        var targetElement = document.querySelector(selector);
        if (targetElement) {
          targetElement.classList.add(className);
        }
      });
    }

    function updateTextContent(sourceSelector, targetSelector) {
      waitForElement(sourceSelector, function () {
        var targetElement = document.querySelector(targetSelector);
        var sourceElement = document.querySelector(sourceSelector);
        if (targetElement && sourceElement && sourceElement.textContent.trim() !== "") {
          targetElement.textContent = sourceElement.textContent;
        }
      });
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
    function waitForSwiper(trigger) {
      var interval = setInterval(function () {
        if (typeof window.Swiper != "undefined") {
          clearInterval(interval);
          trigger();
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 15000);
    }

    function addScript() {
      var scriptOne = document.createElement("script");
      scriptOne.src = "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.min.js";
      document.querySelector("head").appendChild(scriptOne);

      var swiperCss = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.css" integrity="sha512-ipO1yoQyZS3BeIuv2A8C5AwQChWt2Pi4KU3nUvXxc4TKr8QgG8dPexPAj2JGsJD6yelwKa4c7Y2he9TTkPM4Dg==" crossorigin="anonymous" referrerpolicy="no-referrer" />';
      document.querySelector("head").insertAdjacentHTML("beforeend", swiperCss);
    }
    // addScript();

    var checkMark = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
        <path d="M12.9766 0.648438C13.332 0.976562 13.332 1.55078 12.9766 1.87891L5.97656 8.87891C5.64844 9.23438 5.07422 9.23438 4.74609 8.87891L1.24609 5.37891C0.890625 5.05078 0.890625 4.47656 1.24609 4.14844C1.57422 3.79297 2.14844 3.79297 2.47656 4.14844L5.34766 7.01953L11.7461 0.648438C12.0742 0.292969 12.6484 0.292969 12.9766 0.648438Z" fill="#00A9E0" />
      </svg>
    `;

    var newPricingSection1 = `
      <div class="cro51-pricing-container">
        <div class="cro51-pricing-wrapper">
          <div class="cro51-course-overview-container">
            <div class="cro51-course-overview-header">Course overview</div>
            <div class="cro51-course-overview-info">
              <p>The <strong>Diploma in Orthodontics &amp; Dentofacial Orthopaedics</strong> delivers a comprehensive curriculum suitable for all dentists, from those beginning their first orthodontic cases to experienced practitioners looking to advance their skills. This programme provides essential foundational knowledge alongside advanced techniques, empowering you to confidently begin treating patients immediately and elevate your orthodontic expertise.</p>
              <p>Designed to fit the needs of dentists worldwide, our innovative online learning platform paired with a Clinical Simulation Kit and the LDi app ensures you gain both hands-on experience and theoretical knowledge, all while fitting seamlessly into your busy schedule.</p>
              <p>With personalised 1:1 case support from expert tutors and an emphasis on immediate practical application, this programme will help you excel in providing safe and successful orthodontic treatments for your patients from day one.</p>
            </div>
          </div>
          <div class="cro51-pricing-main">
            <div class="cro51-pricing-content cro51-pricing-content1">
              <div class="cro51-pricing-info1">
                <div class="cro51-pricing-info-text1">12 monthly instalments</div>
                <div class="cro51-pricing-info-text2">£785 pm</div>
              </div>
              <div class="cro51-pricing-hr"></div>
              <div class="cro51-pricing-info2">
                <div class="cro51-pricing-info-text1"><span class="cro51-text1">Or once off</span><span class="cro51-text2">&nbsp;5% discount</span></div>
                <div class="cro51-pricing-info-text2">£9,495.25</div>
              </div>
            </div>
            <div class="cro51-pricing-content cro51-pricing-content2">
              <div class="cro51-pricing-list-items">
                <div class="cro51-pricing-list-item cro51-pricing-list-item1">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">12-month online programme</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item2">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">EduQual-Accredited Level 7 Diploma qualification</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item3">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">Flexible 24/7 online learning through our innovative Virtual Learning Environment</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item4">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">Comprehensive evidence-based orthodontic curriculum</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item5">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">Expert instruction from our world-leading faculty of orthodontic educators</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item6">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">Hands-on training in foundational and advanced orthodontic techniques</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item7">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">1:1 case support to help you apply new skills immediately</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item8">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">Membership in a community of like-minded UK dental professionals</div>
                </div>
              </div>
            </div>
            <div class="cro51-pricing-content cro51-pricing-content3">
              <a href="https://vle.londondentalinstitute.com/orthodontics-and-dentofacial-orthopaedics-registration/" class="cro51-enroll-now">Enrol Now</a>
              <a href="https://londondentalinstitute.com/ortho-prospectus-download/" class="cro51-prospectus">Download prospectus</a>
            </div>
            <div class="cro51-pricing-content cro51-pricing-content4">
              <p>Secure your place with an initial payment of £575, covering the first module’s tuition. The remaining course fee can be spread over 12 monthly instalments of £785.</p>
              <p><em>Pay in full and receive a 5% discount. UK applicants are subject to VAT.</em></p>
            </div>
          </div>
        </div>
      </div>
    `;
    var newPricingSection2 = `
      <div class="cro51-pricing-container">
        <div class="cro51-pricing-wrapper">
          <div class="cro51-course-overview-container">
            <div class="cro51-course-overview-header">Course overview</div>
            <div class="cro51-course-overview-info">
              <p>The <strong>Diploma in Aesthetic &amp; Restorative Dentistry</strong> offers a comprehensive curriculum designed to enhance your clinical skills and help you excel with confidence in complex restorative cases.</p>
              <p>Designed to fit the needs of dentists worldwide, our innovative online learning platform paired with a practical training kit and the LDi app, ensures you gain both hands-on experience and theoretical knowledge, all while fitting seamlessly into your busy schedule.</p>
              <p>With 1:1 case support from expert tutors, alongside an immediate focus on practical application, you will elevate your practice and deliver exceptional patient outcomes in the latest restorative techniques from the start.</p>
            </div>
          </div>
          <div class="cro51-pricing-main">
            <div class="cro51-pricing-content cro51-pricing-content1">
              <div class="cro51-pricing-info1">
                <div class="cro51-pricing-info-text1">12 monthly instalments</div>
                <div class="cro51-pricing-info-text2">£785 pm</div>
              </div>
              <div class="cro51-pricing-hr"></div>
              <div class="cro51-pricing-info2">
                <div class="cro51-pricing-info-text1"><span class="cro51-text1">Or once off</span><span class="cro51-text2">&nbsp;5% discount</span></div>
                <div class="cro51-pricing-info-text2">£9,495.25</div>
              </div>
            </div>
            <div class="cro51-pricing-content cro51-pricing-content2">
              <div class="cro51-pricing-list-items">
                <div class="cro51-pricing-list-item cro51-pricing-list-item1">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">12 month online programme</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item2">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">EduQual-Accredited Level 7 Diploma qualification</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item3">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">Flexible 24/7 online learning through our innovative Virtual Learning Environment</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item4">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">Comprehensive evidence-based clinical teaching</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item5">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">Expert tuition from our world-leading faculty of clinical educators</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item6">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">Hands-on training in advanced restorative techniques</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item7">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">1:1 case support from expert tutors to help you apply new skills immediately</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item8">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">Membership in a community of like-minded UK dental professionals</div>
                </div>
              </div>
            </div>
            <div class="cro51-pricing-content cro51-pricing-content3">
              <a href="https://vle.londondentalinstitute.com/aesthetic-and-restorative-dentistry-registration/" class="cro51-enroll-now">Enrol Now</a>
              <a href="https://londondentalinstitute.com/ARD-prospectus-download/" class="cro51-prospectus">Download prospectus</a>
            </div>
            <div class="cro51-pricing-content cro51-pricing-content4">
              <p>Secure your place with an initial payment of £575, covering the first module’s tuition. The remaining course fee can be spread over 12 monthly instalments of £785.</p>
              <p>Pay in full and receive a 5% discount. UK applicants are subject to VAT.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    var newPricingSection3 = `
      <div class="cro51-pricing-container">
        <div class="cro51-pricing-wrapper">
          <div class="cro51-course-overview-container">
            <div class="cro51-course-overview-header">Course overview</div>
            <div class="cro51-course-overview-info">
              <p>The <strong>Diploma in Dental Implantology and Oral Surgery</strong> delivers a comprehensive curriculum suitable for all dentists, from those beginning their first cases to experienced practitioners looking to advance their skills. This programme provides essential foundational knowledge alongside advanced techniques, empowering you to treat patients with confidence as you elevate your implant surgical expertise.</p>
              <p>Our innovative online learning platform paired with a Clinical Simulation Kit and the LDi app ensures you gain both hands-on experience and theoretical knowledge, all while fitting seamlessly into your busy schedule.</p>
              <p>With personalised 1:1 case support from expert tutors and an emphasis on clinical practical application, this programme will help you excel in providing safe and successful implant treatments for your patients from the start.</p>
            </div>
          </div>
          <div class="cro51-pricing-main">
            <div class="cro51-pricing-content cro51-pricing-content1">
              <div class="cro51-pricing-info1">
                <div class="cro51-pricing-info-text1">12 monthly instalments</div>
                <div class="cro51-pricing-info-text2">£785 pm</div>
              </div>
              <div class="cro51-pricing-hr"></div>
              <div class="cro51-pricing-info2">
                <div class="cro51-pricing-info-text1"><span class="cro51-text1">Or once off</span><span class="cro51-text2">&nbsp;5% discount</span></div>
                <div class="cro51-pricing-info-text2">£9,495.25</div>
              </div>
            </div>
            <div class="cro51-pricing-content cro51-pricing-content2">
              <div class="cro51-pricing-list-items">
                <div class="cro51-pricing-list-item cro51-pricing-list-item1">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">12-month online programme</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item2">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">UK-Accredited Level 7 Diploma qualification</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item3">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">Flexible 24/7 online learning through our innovative Virtual Learning Environment</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item4">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">Comprehensive evidence-based surgical curriculum</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item5">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">Expert instruction from our world-leading faculty of implant educators</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item6">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">Hands-on training in foundational and advanced surgical techniques</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item7">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">1:1 case support to help you apply new skills immediately</div>
                </div>
                <div class="cro51-pricing-list-item cro51-pricing-list-item8">
                  <div class="cro51-pricing-list-icon">${checkMark}</div>
                  <div class="cro51-pricing-list-text">Membership in a global community of like-minded dental professionals</div>
                </div>
              </div>
            </div>
            <div class="cro51-pricing-content cro51-pricing-content3">
              <a href="https://vle.londondentalinstitute.com/diploma-in-dental-implantology-oral-surgery-registration" class="cro51-enroll-now">Enrol Now</a>
              <a href="https://londondentalinstitute.com/dios-prospectus-download/" class="cro51-prospectus">Download prospectus</a>
            </div>
            <div class="cro51-pricing-content cro51-pricing-content4">
              <p>Secure your place with an initial payment of £575, covering the first module’s tuition. The remaining course fee can be spread over 12 monthly instalments of £785.</p>
              <p><em>Pay in full and receive a 5% discount. UK applicants are subject to VAT.</em></p>
            </div>
          </div>
        </div>
      </div>
    `;

    var requirementsSection1 = `
      <div class="cro51-requirement-container">
        <div class="cro51-requirement-wrapper">
          <div class="cro51-requirement-header">Requirements</div>
          <div class="cro51-requirement-subheader">To enrol in the Diploma in Orthodontics & Dentofacial Orthopaedics course, applicants must:</div>
          <div class="cro51-requirement-list">
            <div class="cro51-requirement-list-item1">
              <div class="cro51-requirement-list-icon">${checkMark}</div>
              <div class="cro51-requirement-list-text">Possess a primary dental qualification (e.g., BDS or equivalent).</div>
            </div>
            <div class="cro51-requirement-list-item2">
              <div class="cro51-requirement-list-icon">${checkMark}</div>
              <div class="cro51-requirement-list-text">Hold a minimum of one year's experience as a registered dental practitioner.</div>
            </div>
          </div>
        </div>
      </div>
    `;
    var requirementsSection2 = `
      <div class="cro51-requirement-container">
        <div class="cro51-requirement-wrapper">
          <div class="cro51-requirement-header">Requirements</div>
          <div class="cro51-requirement-subheader">To enrol in the Diploma in Aesthetic & Restorative Dentistry course, applicants must:</div>
          <div class="cro51-requirement-list">
            <div class="cro51-requirement-list-item1">
              <div class="cro51-requirement-list-icon">${checkMark}</div>
              <div class="cro51-requirement-list-text">Possess a primary dental qualification (e.g., BDS or equivalent).</div>
            </div>
            <div class="cro51-requirement-list-item2">
              <div class="cro51-requirement-list-icon">${checkMark}</div>
              <div class="cro51-requirement-list-text">Hold a minimum of one year's experience as a registered dental practitioner.</div>
            </div>
          </div>
        </div>
      </div>
    `;
    var requirementsSection3 = `
      <div class="cro51-requirement-container">
        <div class="cro51-requirement-wrapper">
          <div class="cro51-requirement-header">Requirements</div>
          <div class="cro51-requirement-subheader">To enrol in the Diploma in Dental Implantology and Oral Surgery course, applicants must:</div>
          <div class="cro51-requirement-list">
            <div class="cro51-requirement-list-item1">
              <div class="cro51-requirement-list-icon">${checkMark}</div>
              <div class="cro51-requirement-list-text">Possess a primary dental qualification (e.g., BDS or equivalent).</div>
            </div>
            <div class="cro51-requirement-list-item2">
              <div class="cro51-requirement-list-icon">${checkMark}</div>
              <div class="cro51-requirement-list-text">Hold a minimum of one year's experience as a registered dental practitioner.</div>
            </div>
          </div>
        </div>
      </div>
    `;

    var bookIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
        <path d="M15.75 12.0625C15.75 12.5898 15.5039 13.0117 15.1875 13.3633V16.2109C15.5039 16.4219 15.75 16.7734 15.75 17.1602C15.75 17.7578 15.2227 18.25 14.625 18.25H3.375C1.47656 18.25 0 16.7734 0 14.875V3.625C0 1.76172 1.47656 0.25 3.375 0.25H14.0625C14.9766 0.25 15.75 1.02344 15.75 1.9375V12.0625ZM5.02734 4.75C4.74609 4.75 4.5 5.03125 4.5 5.3125C4.5 5.62891 4.74609 5.875 5.02734 5.875H11.8125C12.0938 5.875 12.375 5.62891 12.375 5.3125C12.375 5.03125 12.0938 4.75 11.7773 4.75H5.02734ZM5.02734 7C4.74609 7 4.5 7.28125 4.5 7.5625C4.5 7.87891 4.74609 8.125 5.02734 8.125H11.8125C12.0938 8.125 12.375 7.87891 12.375 7.5625C12.375 7.28125 12.0938 7 11.7773 7H5.02734ZM13.5 16V13.75H3.375C2.74219 13.75 2.25 14.2773 2.25 14.875C2.25 15.5078 2.74219 16 3.375 16H13.5Z" fill="#1E1A34" fill-opacity="0.75" />
      </svg>
    `;
    var expandIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
        <circle cx="6.26257" cy="7" r="6.26257" fill="#00A9E0" />
        <path d="M6.26257 4.24744V9.91846" stroke="#F2F2F2" stroke-width="2" stroke-miterlimit="10" />
        <path d="M3.42676 7.08301H9.09778" stroke="#F2F2F2" stroke-width="2" stroke-miterlimit="10" />
      </svg>
    `;
    var expandIcon2 = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
        <circle cx="11.1066" cy="11.7777" r="10.8934" fill="#00A9E0"></circle>
        <path d="M6.07129 14.7397L11.1057 8.81589L16.1418 14.7397" stroke="white" stroke-width="2" stroke-miterlimit="10"></path>
      </svg>
    `;

    var moduleOverview1 = `
      <div class="cro51-module-container">
        <div class="cro51-module-wrapper">
          <div class="cro51-module-header">Module overview</div>
          <div class="cro51-module-subheader">The Diploma in Orthodontics & Dentofacial Orthopaedics comprises six online learning units, each containing multiple teaching modules offering 25 taught modules. The course is delivered by an international faculty of over 30 expert lecturers, ensuring a comprehensive and high-quality learning experience.</div>
          <div class="cro51-module-contents">
            <div class="cro51-module-content-wrapper">
              <div class="cro51-module-content cro51-module-content1">
                <div class="cro51-module-content-name">Unit 1 / Principles of Orthodontic Assessment and Diagnosis</div>
                <div class="cro51-module-content-duration">Est Duration: 8 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>
                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">This unit lays the foundations for an in-depth understanding of orthodontic principles, whether you are a beginner looking to build confidence or an experienced practitioner seeking to refine your expertise. By understanding orthodontic assessment, biological foundations, research interpretation, and essential clinical skills, you’ll be well-prepared to implement effective, evidence-based orthodontic care.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Orthodontic Assessment and Diagnosis:</strong> Master the step-by-step approach to comprehensive patient assessment, including record-taking, diagnosis, and treatment planning. Through expert-led webinars, you’ll learn how to manage patient expectations, perform extraoral and intraoral examinations, and select appropriate records for each case. This module equips you with a repeatable approach for effective orthodontic evaluation.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>The Biological Basis of Orthodontics:</strong> Dive into the science of craniofacial growth, development, and the biological processes that drive tooth movement.This series explores embryology, bone biology, and the causes of malocclusion, connecting these concepts to clinical practice. You’ll gain insights into how normal and abnormal dental development impacts orthodontic outcomes, enhancing your understanding of patient-specific treatment approaches.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Clinical Research Skills:</strong> Refresh your skills and ability to read, interpret, and apply scientific research with confidence. This module introduces essential research methods, basic statistics, and strategies for critically appraising orthodontic literature. You’ll leave with an evidence-based approach that informs your practice and helps your skills in critical appraisal of information and research.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item4">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Clinical Photography:</strong> Learn the fundamentals of dental photography, from camera setup to patient positioning, to ensure consistently high-quality images for accurate records and treatment planning. This module covers exposure, lighting, and composition, along with legal and ethical considerations, such as obtaining patient consent and maintaining comprehensive documentation.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item5">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Cephalometry:</strong> Gain a deep understanding of cephalometric analysis and its role in orthodontic diagnosis and treatment planning. Through practical exercises and expert-led webinars, you’ll learn core principles in traditional tracing, explore AI-driven platforms like WebCeph, and how to apply cephalometric tracing techniques to your own real-world cases.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cro51-module-content cro51-module-content2">
                <div class="cro51-module-content-name">Unit 2 / Treatment Planning and Essential Clinical Skills</div>
                <div class="cro51-module-content-duration">Est Duration: 10 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>
                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">This unit equips you with the essential skills needed for successful orthodontic treatment planning and execution, from understanding foundational concepts to mastering fixed appliance techniques. By the end of this unit, you’ll be well-prepared to confidently plan and deliver comprehensive orthodontic treatments for your patients under the guidance of our tutors.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Treatment Planning:</strong> Gain a comprehensive understanding into the methodology of predictable orthodontic treatment planning with a focus on cast analysis, Bolton Ratios, and calculations for dental spacing and crowding. Learn how to approach early orthodontic treatment, set treatment aims, and revisit the biomechanics of tooth movement. Benefit from our faculty providing real-world insights on effective patient communication and strategic treatment planning to enhance clinical outcomes.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Foundations of Orthodontic Treatment:</strong> Gain a solid grounding in essential orthodontic principles, from the science of orthodontic materials to strategies for integrating orthodontics into your practice. This module covers the treatment of Class I malocclusions and prepares you to manage common clinical challenges, serving as a comprehensive introduction before tackling more complex cases.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Fixed Appliances I:</strong> Master the fundamentals of fixed appliance treatment, the backbone of comprehensive orthodontic care. This module covers the components of fixed appliances—brackets, archwires, and auxiliaries—and provides practical guidance on levelling, aligning, and preparing your dental surgery for appliance appointments. Hands-on exercises, including bonding up fixed appliances, ensure you’re ready to apply these techniques confidently.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item4">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Fixed Appliances II:</strong> Build on your foundational knowledge with advanced techniques for using various brackets, including labial, lingual, and self-ligating systems. Explore the biomechanics, aesthetic considerations, and clinical intricacies of fixed appliance treatment to achieve optimal results in more complex orthodontic cases.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cro51-module-content cro51-module-content3">
                <div class="cro51-module-content-name">Unit 3 / Orthodontic Appliances</div>
                <div class="cro51-module-content-duration">Est Duration: 8 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>
                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">This unit dives into the essential orthodontic appliances used in modern practice, from removable and functional devices to clear aligners and the vital importance of effective retention techniques. Skilled and independent clinicians should never be limited to one product or system, and the teaching in these modules reinforces this and ensures you will be confident in discussing all options with your patients. By mastering these appliances, you’ll gain the confidence to treat a wide range of malocclusions and deliver high-quality, stable results for your patients.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Removable and Functional Appliances:</strong> Understand the commonly used removable and functional orthodontic appliances, and learn to identify appropriate clinical scenarios for their use. This module covers the critical appraisal of appliance efficacy and equips you to make evidence-based decisions in selecting the best approach for treating different malocclusions.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Clear Aligners I:</strong> Acquire foundational knowledge for incorporating clear aligners into your practice. This module covers diagnostic records, treatment planning basics, and strategies for treating straightforward cases. You’ll also learn how to seamlessly integrate clear aligners into your clinical workflow, setting the stage for more advanced treatments.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Clear Aligners II:</strong> Advance your expertise in clear aligner therapy, focusing on complex cases and advanced techniques. Explore the management of anterior-posterior and vertical discrepancies using elastics, sequential distalisation, and auxiliary appliances. This module enhances your understanding of biomechanics and case selection, preparing you for challenging clinical situations.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item4">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Detailing, Finishing and Retention:</strong> Master the final stages of orthodontic treatment, including techniques for refining tooth alignment and achieving optimal occlusion. Learn about the stability and maintenance of treatment results, and review popular retainer options, their fabrication, and their respective benefits and drawbacks.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cro51-module-content cro51-module-content4">
                <div class="cro51-module-content-name">Unit 4 / Advanced Clinical Skills in Orthodontics</div>
                <div class="cro51-module-content-duration">Est Duration: 10 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>
                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">This unit builds upon your foundational knowledge now established by introducing advanced clinical skills essential for managing more complex orthodontic cases. From mastering temporary anchorage devices to integrating digital technology and understanding advanced imaging techniques, you’ll be equipped to deliver contemporary orthodontic treatments safely and predictably.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Temporary Anchorage Devices (TADs):</strong> Discover the principles and clinical applications of Temporary Anchorage Devices (TADs) in managing moderate to complex cases. Alongside practical training on TAD insertion, this module covers biomechanical considerations for controlling tooth movement with TADs, providing you with the skills to enhance treatment outcomes and manage challenging cases more effectively.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Digital Orthodontics:</strong> Explore the transformative impact of digital technology in orthodontics. Learn how to integrate CAD/CAM software into your clinic to create clear aligners and indirect bonding trays, and discover the role of 3D printing in enhancing efficiency and precision. This module ensures you are at the forefront of modern orthodontic practice.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>CBCT in Orthodontics:</strong> Gain essential knowledge on using Cone-Beam Computed Tomography (CBCT) safely and effectively in clinical practice. This module covers the principles of CBCT technology, its advantages over traditional 2D imaging, and real-world applications to improve diagnostic accuracy and treatment planning in complex cases.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item4">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Class II &amp; III Malocclusions:</strong> Delve into the diagnosis and treatment of Class II and Class III malocclusions. This module highlights key strategies for managing these challenging cases, including anchorage management and case-specific treatment approaches. Through detailed case studies, you’ll gain insights into practical, evidence-based solutions that can be applied in your practice.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cro51-module-content cro51-module-content5">
                <div class="cro51-module-content-name">Unit 5 / Applied Principles of Orthodontics & Dentofacial Orthopaedics</div>
                <div class="cro51-module-content-duration">Est Duration: 8 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>
                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">Expanding your expertise, this unit covers the applied principles of orthodontics and dentofacial orthopaedics in a variety of cases, equipping you with the skills to manage both growing and adult patients effectively. Building on the in-depth knowledge and clinical experience already acquired in the programme, you will be well prepared for advanced teaching on biomechanics and develop the ability to tailor treatment plans to the specific needs of every individual patient. This further ensures you will be able to select the appropriate appliances and techniques to achieve the best possible outcome for each case.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Growing Patients:</strong> Understand the strategic use of removable and functional appliances to guide facial growth and correct malocclusions in young patients. This module covers critical stages of growth and development, offering opportunities for timely intervention. You’ll also learn practical strategies to maintain patient motivation during long-term treatment, ensuring successful outcomes in child and adolescent cases.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Adult Treatment:</strong> Explore the unique challenges and considerations involved in treating adult patients, including the management of TMD, periodontal health, and the orthodontic-restorative interface. This module provides insights into the preparation and ongoing care needed to address these complexities, ensuring smooth and successful treatment processes for adult orthodontic patients.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Biomechanics:</strong> Gain an in-depth understanding of the forces acting on teeth and the periodontium during orthodontic treatment. This module equips you to apply the fundamental principles of biomechanics to create highly tailored treatment plans, allowing you to select the most effective appliances and techniques for optimal patient outcomes.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cro51-module-content cro51-module-content6">
                <div class="cro51-module-content-name">Unit 6 / Advanced Orthodontic Treatment</div>
                <div class="cro51-module-content-duration">Est Duration: 8 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>
                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">The final unit provides an in-depth exploration of advanced orthodontic techniques, surgical considerations, and practice management. From handling complex cases and mastering facial aesthetics to effectively marketing your orthodontic practice, you’ll be equipped to elevate your clinical expertise and watch your clinical practice grow in reflection of the skills and techniques mastered through the programme.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Advanced Orthodontic Treatment I:</strong> Tackle challenging clinical scenarios, focusing on the mechanics of space closure, and the management of open bite, deep bite, and transverse issues. This module offers a comprehensive understanding of the techniques required to deliver evidence-based effective solutions for these complex cases.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Advanced Orthodontic Treatment II:</strong> Dive into the intricacies of managing impacted teeth and hypodontia. Learn contemporary approaches and predictable techniques to handle these nuanced conditions, equipping you to deliver exceptional orthodontic care in even more complex scenarios.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Surgical Considerations:</strong> Explore the principles of oral surgery and orthognathic procedures critical for managing skeletal discrepancies. This module emphasises the importance of a multidisciplinary approach, covering everything from pre-operative planning to post-operative care, and highlights the collaboration required between orthodontists and surgical teams. Understanding the processes involved is essential for any discussions with your patients in referral cases.</div>
                      </div>

                      <div class="cro51-module-list-item cro51-module-list-item-bonus">Bonus modules:</div>

                      <div class="cro51-module-list-item cro51-module-list-item4">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Facial Aesthetics:</strong> Develop foundational knowledge in delivering non-surgical facial aesthetic treatments. Master safe and effective techniques to achieve natural-looking results, understand facial anatomy, and learn to manage risks and complications ethically.</div>
                      </div>

                      <div class="cro51-module-list-item cro51-module-list-item5">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Marketing an Orthodontic Practice:</strong> Master marketing and practice management approaches tailored for orthodontics. This module covers essential digital strategies , from website optimization to social media and search engine marketing, and provides practical advice on enhancing efficiency, improving patient experience, and effectively managing complaints to boost your practice’s success.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    var moduleOverview2 = `
      <div class="cro51-module-container">
        <div class="cro51-module-wrapper">
          <div class="cro51-module-header">Module overview</div>
          <div class="cro51-module-subheader">The Diploma in Aesthetic & Restorative Dentistry comprises six online learning units, each containing multiple teaching modules. The course is delivered by an international faculty of over 30 expert lecturers, ensuring a comprehensive and high-quality learning experience.</div>
          <div class="cro51-module-contents">
            <div class="cro51-module-content-wrapper">
              <div class="cro51-module-content cro51-module-content1">
                <div class="cro51-module-content-name">Unit 1 /  Foundations of Restorative Dentistry</div>
                <div class="cro51-module-content-duration">Est Duration: 6 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>
                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">This foundational unit equips you with the essential knowledge to excel in aesthetic and restorative dentistry. Through a deep exploration of craniofacial anatomy, biomimetic principles, and clinical research skills, you’ll develop the expertise necessary for advanced practice. By mastering these foundational concepts, you will be able to create natural-looking restorations and confidently integrate evidence-based practices into your clinical work.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Craniofacial Anatomy:</strong> Gain an in-depth understanding of craniofacial structures and tooth morphology, enhancing your ability to create precise, aesthetically accurate dental restorations. You’ll master artistic shading techniques and the detailed depiction of natural teeth, elevating the quality of your clinical outcomes.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Biomimetic Dentistry:</strong> Explore cutting-edge biomimetic techniques that replicate the natural structure and function of teeth. These methods allow you to preserve tooth vitality while providing durable, high-quality restorations that blend seamlessly with the patient’s natural dentition</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Clinical Research Skills:</strong> Learn to critically evaluate and apply scientific research to your practice. This module will build your confidence in assessing clinical evidence, enabling you to make informed, evidence-based decisions that improve both patient care and long-term outcomes as well as preparing you for the appraising and evaluating the scientific information and research papers that will be studied through the Diploma programme</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cro51-module-content cro51-module-content2">
                <div class="cro51-module-content-name">Unit 2 / Principles of Assessment and Diagnosis</div>
                <div class="cro51-module-content-duration">Est Duration: 8 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>
                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">In this unit, you will master the essential skills of patient assessment and diagnosis, empowering you to approach complex cases with confidence. You will learn how to carry out comprehensive clinical examinations, develop a systematic approach to treatment planning, and use advanced tools like aesthetic photography and digital smile design to deliver exceptional results. By the end of this unit, you’ll be prepared to make accurate diagnoses and create customised, interdisciplinary treatment plans that enhance both function and aesthetics.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Assessment and Diagnosis:</strong> Build a thorough understanding of clinical assessment and diagnosis techniques, from history-taking to examinations and radiological evaluations. Guided by our expert faculty, you’ll learn how to conduct comprehensive assessments, communicate effectively with patients, and make informed, evidence-based decisions. By mastering these skills, you’ll be well-equipped to prepare for even the most complex cases with confidence.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Aesthetic Clinical Photography:</strong> Gain expert knowledge in dental photography, from selecting the right equipment to mastering both intraoral and extraoral techniques. This module teaches you how to capture precise, high-quality images that are crucial for treatment planning, patient communication, and case documentation.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Smile Design:</strong> Learn the art and science of crafting aesthetically pleasing smiles. You’ll explore smile design principles, Digital Smile Design techniques, and how to customise treatment plans based on tooth shape, colour, and alignment. This module ensures you can deliver beautiful, balanced smiles that align with both dental functionality and patient preferences.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item4">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Comprehensive Treatment Planning:</strong> Master the complete process of interdisciplinary treatment planning, ensuring a balance between aesthetics and function. You’ll learn to create detailed, individualised treatment plans by combining aesthetic principles with restorative and functional considerations, while keeping long-term maintenance and patient satisfaction in mind. Case studies and practical applications are utilised to further reinforce your skills and confidence in developing treatment plans for your own patients.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cro51-module-content cro51-module-content3">
                <div class="cro51-module-content-name">Unit 3 / Fundamental Clinical Skills</div>
                <div class="cro51-module-content-duration">Est Duration: 8 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>
                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">This unit provides you with the essential clinical skills needed for advanced restorative dentistry. You will gain a deep understanding of occlusion, contemporary dental materials, bonding and isolation techniques, and shade analysis—critical competencies that will enhance both the function and aesthetics of your restorations. By mastering these skills, you’ll be prepared to deliver superior dental care and achieve consistent, high-quality outcomes for your patients.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Fundamentals of Occlusion:</strong> Develop a comprehensive understanding of occlusal concepts, including the impact of occlusion on temporomandibular disorders (TMD) and the importance of occlusal adjustments. You’ll learn essential recording techniques and gain insights into movements from Retruded Contact Position (RCP) to Intercuspal Position (ICP), ensuring you can manage occlusion in a variety of clinical scenarios with confidence, including the most complex restorative cases.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Contemporary Dental Materials:</strong> Explore the properties and applications of modern dental materials, from restorative to prosthetic. This module equips you to make informed decisions about material selection based on clinical needs, ensuring durability, functionality, and aesthetic excellence. Through case studies, you’ll learn how to apply these materials effectively in practice and solve common challenges.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Bonding and Isolation:</strong> Master the principles of dental adhesion and isolation techniques, essential for successful restorative dentistry. You’ll explore bonding systems, learn how to select the appropriate method for each clinical situation, and understand the importance of effective dental isolation, with a special focus on Rubber Dam Isolation. This module ensures you can routinely deliver long-lasting restorations while maintaining patient safety and comfort with ease.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item4">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Mastering Shade Analysis:</strong> Gain expert knowledge in shade matching and analysis to achieve aesthetic perfection in your restorations. You’ll learn how to navigate different shade guide systems, apply visual and instrumental techniques, and communicate effectively with your lab for optimal results. By mastering shade analysis, you’ll enhance your ability to provide aesthetically pleasing outcomes that meet your patients' expectations.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cro51-module-content cro51-module-content4">
                <div class="cro51-module-content-name">Unit 4 / Aesthetic Dental Restorations</div>
                <div class="cro51-module-content-duration">Est Duration: 10 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>
                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">This unit equips you with the advanced knowledge and techniques required to deliver exceptional aesthetic dental restorations. Through a detailed exploration of teeth whitening, direct and indirect restorations, and the application of modern dental materials, you’ll master the skills necessary to create beautiful, long-lasting outcomes for your patients. By the end of this unit, you’ll be well-prepared in the preparations and restorative techniques required to offer high-quality treatments for your patients that meet both functional and aesthetic demands.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Teeth Whitening:</strong> Gain a comprehensive understanding of the biology behind tooth discolouration and the evolution of teeth whitening techniques. You’ll explore in-office and at-home treatments, including hydrogen peroxide and carbamide peroxide applications, while also covering safety considerations, legal regulations, and ethical implications. This module ensures you can provide effective, safe, and legally compliant whitening treatments tailored to your patients' needs.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Direct Restorations I:</strong> Master the art of minimally invasive aesthetic dentistry through the use of composite materials. You’ll gain a deep understanding of the factors that affect restoration longevity and aesthetics, such as material selection, layering, and polishing. This module provides you with the skills needed to predictably deliver aesthetic composite restorations, and develop your confidence in providing successful class IV restorations in the anterior region.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Direct Restorations II:</strong> This module builds on your knowledge of direct restorations by focusing on posterior restorations. Learn advanced composite placement techniques, preservation of tooth structure, and management of occlusal stresses to enhance the functionality and appearance of your restorations. Evidence-based insights and research will deepen your understanding of the latest advancements in restorative dentistry, with an added emphasis on achieving the optimum aesthetic result in your work.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item4">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Indirect Restorations I:</strong> Explore the fundamentals of ceramic restorations, with a focus on material selection, crown preparations, and achieving aesthetic harmony. This module covers everything from the preparation techniques to impressions, including temporisation protocols and more, ensuring you can deliver high-quality ceramic restorations with confidence and precision.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item5">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Indirect Restorations II:</strong> Delve into the complexities of veneer applications and learn to strike the perfect balance between strength and aesthetics. This module provides hands-on demonstrations and expert guidance on the use of the different materials available, ensuring you can choose the best options for each clinical scenario that you will face in your clinical practice.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cro51-module-content cro51-module-content5">
                <div class="cro51-module-content-name">Unit 5 / Complex and Multidisciplinary Treatment</div>
                <div class="cro51-module-content-duration">Est Duration: 8 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>
                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">This unit equips you with the knowledge and skills to manage complex dental cases that require a multidisciplinary approach. You will explore key topics such as tooth surface loss, periodontology, endodontic restoration, and the orthodontic-restorative interface. By mastering these areas, you’ll be prepared to tackle challenging cases and offer comprehensive treatment plans that combine aesthetic and functional outcomes for your patients.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Tooth Surface Loss:</strong> Gain expert knowledge in managing various degrees of dental wear, from mild cases to severe tooth structure loss. This module covers effective restoration techniques, material choices, and preventive strategies to help you restore function and aesthetics in cases of tooth wear.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Periodontology:</strong> Dive into the complexities of periodontal disease management, including advanced diagnostic strategies and treatment techniques. You’ll learn how to classify, diagnose, and treat periodontal conditions while understanding the key risk factors that influence disease progression, ensuring you can confidently provide comprehensive restorative care for patients with oral health concerns.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Restoration of Endodontically Compromised Teeth:</strong> Master the essential procedures for restoring endodontically compromised teeth, including vital pulp therapy, cuspal coverage, and the treatment of cracked teeth. This module emphasises the importance of coronal sealing, details the use of posts where appropriate, and ensuring the presence of a ferrule to achieve long-term success in challenging restorations.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item4">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Orthodontic Restorative Interface:</strong> Explore the synergy between orthodontics and restorative dentistry to achieve optimal aesthetic and functional outcomes. You’ll learn how to address common post-orthodontic challenges such as black triangles and enameloplasty while integrating restorative techniques like composite bonding. This module ensures you can align treatment goals and deliver comprehensive care in multidisciplinary cases that are now seen routinely in general practice.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cro51-module-content cro51-module-content6">
                <div class="cro51-module-content-name">Unit 6 / Advanced Aesthetic & Restorative Dentistry</div>
                <div class="cro51-module-content-duration">Est Duration: 10 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>

                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">This unit explores advanced techniques and technologies that elevate aesthetic and restorative dental practice to the next level. Covering everything from removable prostheses to digital dentistry and marketing, this unit equips you with the knowledge and skills needed to deliver outstanding patient outcomes and grow your practice. By mastering these concepts, you’ll be able to provide cutting-edge treatments while enhancing your clinic’s presence and appeal.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Aesthetic Removable Prostheses:</strong> Learn advanced techniques for creating natural-looking removable prostheses, including the use of 3D printing and precision staining methods. This module covers every step, from impression-taking to designing partial dentures, ensuring you can deliver aesthetically pleasing and functional results. Teaching is delivered from both dental and lab perspectives to ensure a comprehensive understanding of the whole process is gained.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Aesthetic Implant Restorations:</strong> Gain in-depth insights into minimally invasive tooth extraction and implant placement. Led by renowned oral surgeons, this module covers strategies to preserve bone integrity and achieve optimal implant stability, ensuring long-term success and aesthetic harmony in implant restorations.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Digital Dentistry:</strong> Explore the transformative impact of digital technologies in dental practice. You’ll learn how to integrate tools such as intraoral scanners, Digital Smile Design, and AI-driven technologies to enhance accuracy, patient care, and efficiency in both restorative and aesthetic treatments.</div>
                      </div>

                      <div class="cro51-module-list-item cro51-module-list-item-bonus">Bonus modules:</div>

                      <div class="cro51-module-list-item cro51-module-list-item4">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Facial Aesthetics:</strong> Master the key techniques in facial aesthetics, including dermal fillers, lip augmentation, and wrinkle reduction. This module focuses on delivering natural-looking results while incorporating the latest techniques for patient safety and satisfaction.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item5">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Marketing an Aesthetic Dental Practice:</strong> Discover essential marketing strategies to grow your dental practice. This module covers the fundamentals of marketing versus advertising, how to enhance the patient experience, and tips for creating a clinic environment that makes a lasting positive impression. You’ll learn how to effectively promote your services and elevate your clinic's reputation in the competitive field of aesthetic dentistry.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    var moduleOverview3 = `
      <div class="cro51-module-container">
        <div class="cro51-module-wrapper">
          <div class="cro51-module-header">Module overview</div>
          <div class="cro51-module-subheader">The Diploma in Dental Implantology and Oral Surgery comprises six online learning units, each containing multiple teaching modules offering 25 taught modules. The course is delivered by a world-leading lecturing faculty, ensuring a comprehensive and high-quality learning experience.</div>
          <div class="cro51-module-contents">
            <div class="cro51-module-content-wrapper">
              <div class="cro51-module-content cro51-module-content1">
                <div class="cro51-module-content-name">Unit 1 / Fundamentals of Implant Dentistry & Oral Surgery</div>
                <div class="cro51-module-content-duration">Est Duration: 10 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>
                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">This comprehensive unit equips you with the foundational skills and knowledge required for effective implant dentistry and oral surgery. Covering everything from patient assessment to advanced surgical techniques, this unit ensures you are well-prepared to manage a wide range of clinical scenarios with confidence and precision.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Surgical Patient Assessment:</strong> Master comprehensive patient assessment, including clinical examinations, medical history review, and risk stratification. Learn to implement appropriate imaging protocols, assess bleeding and anaesthesia risks, and ensure psychological preparedness. Additionally, gain critical pharmacological knowledge to make informed prescribing decisions, manage pain and infection, and understand antibiotic prophylaxis and drug interactions, all while adhering to evidence-based practices.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Implant and Surgical Anatomy:</strong> Refresh essential knowledge of oral and maxillofacial anatomy, covering skeletal, neurovascular, and soft tissue structures critical for implant placement and oral surgery. This module emphasises the identification of anatomical risk factors and the interpretation of radiographic images to ensure precise and safe surgical planning.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>CBCT and Radiology:</strong> Learn the principles of CBCT imaging and radiological diagnosis. This module will teach you how to plan, perform and interpret radiographic examinations, helping you make informed surgical decisions and enhance diagnostic accuracy.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item4">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Essential Surgical Skills:</strong> Develop proficiency in the fundamental skills required in oral surgical procedures including asepsis, surgical gowning, anaesthesia administration, and atraumatic extraction techniques. You’ll also master ridge preservation, flap design, and suturing techniques, ensuring optimal healing and patient outcomes. Practical guidelines for post-operative care and management of complications are also covered.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item5">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Clinical Research:</strong> Enhance your ability to critically evaluate and apply research findings in your clinical practice, building on research methodologies introduced in earlier units. This module reinforces the importance of evidence-based decision-making in surgical and implant dentistry.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cro51-module-content cro51-module-content2">
                <div class="cro51-module-content-name">Unit 2 / Dental Implant Treatment Planning</div>
                <div class="cro51-module-content-duration">Est Duration: 6 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>
                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">This unit dives deep into the critical aspects of planning and executing successful dental implant treatments. From understanding the biological and biomechanical foundations of implantology to mastering effective communication and legal principles, you will gain the expertise needed to deliver exceptional outcomes for your patients.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Introduction to Dental Implantology:</strong> Gain a thorough understanding of the biology of osseointegration and the factors influencing implant success, including implant materials, design, and biomechanics. Learn to evaluate healing phases, manage complications, and apply pharmacological knowledge to optimise surgical outcomes.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Implant Treatment Planning:</strong> Master restorative-driven planning by integrating surgical and prosthetic considerations for optimal functional and aesthetic results. Develop comprehensive treatment plans, assess surgical parameters, and use the ITI’s SAC Classification to determine case complexity. This module also covers effective strategies for presenting plans to patients, ensuring clear communication and informed consent.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Clinical Photography:</strong> Learn the fundamentals of dental photography, from camera setup to patient positioning, to ensure consistently high-quality images for accurate records and treatment planning. This module covers exposure, lighting, and composition, along with legal and ethical considerations, such as obtaining patient consent and maintaining comprehensive documentation.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cro51-module-content cro51-module-content3">
                <div class="cro51-module-content-name">Unit 3 / Clinical Implant Surgery</div>
                <div class="cro51-module-content-duration">Est Duration: 8 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>
                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">This unit equips you with the surgical expertise needed to perform successful implant procedures, from foundational techniques to advanced bone and soft tissue management. You’ll gain in depth knowledge on patient care, implant placement, and tissue augmentation to deliver optimal results in complex clinical scenarios.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Implant Surgical Techniques I:</strong> Master the fundamentals of implant placement, patient care, and the use of healing abutments. This module provides essential training to ensure precise surgical execution and proper patient management, laying the groundwork for predictable implant outcomes.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Implant Surgical Techniques II:</strong> Delve into advanced surgical concepts, including the use of short implants and immediate loading protocols. Learn to adapt these techniques to enhance efficiency and stability in challenging clinical cases, optimising both patient comfort and treatment success.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Bone Augmentation:</strong> Explore comprehensive bone grafting techniques, such as Guided Bone Regeneration (GBR), block grafting, and sinus augmentation procedures. This module covers advanced concepts and materials, providing the knowledge needed to manage complex cases where bone volume is insufficient for implant placement.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item4">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Soft Tissue Surgery:</strong> Develop expertise in soft tissue management to achieve optimal aesthetic and functional outcomes. Learn advanced surgical techniques and material selection to enhance peri-implant soft tissue health and ensure long-term implant success.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cro51-module-content cro51-module-content4">
                <div class="cro51-module-content-name">Unit 4 / Restorative Techniques in Implant Dentistry</div>
                <div class="cro51-module-content-duration">Est Duration: 8 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>
                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">This unit focuses on mastering restorative procedures in implant dentistry, from single-tooth restorations to complex full-arch rehabilitations. You’ll learn to integrate digital technology into your planning and collaborate effectively with dental laboratories to achieve exceptional results.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Digital Implantology:</strong> Discover how to use digital tools for precise implant planning and smile design. Learn to create surgical templates and leverage digital workflows to enhance accuracy and predictability in implant procedures, revolutionising the way you approach restorative planning.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Dental Implant Restorations:</strong> Gain in-depth knowledge of restoring dental implants, covering everything from occlusion to impression techniques and bite registration. Explore options for single-tooth and bridge restorations, understand transitional restorations, and learn how to select and manage abutments. This module also covers effective communication with dental labs to ensure high-quality outcomes.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Full Arch Restorations I:</strong> Dive into the planning and surgical execution of full-arch restorations using "All on X" techniques. This module provides a comprehensive guide to pre-surgical planning and surgical steps, equipping you with the confidence to manage complex full-arch implant cases.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item4">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Full Arch Restorations II:</strong> Build on your full-arch knowledge by exploring both fixed and removable restoration options, from provisional to definitive solutions. Understand the lab’s role in creating successful outcomes, and master techniques for managing removable restorations and overdentures.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cro51-module-content cro51-module-content5">
                <div class="cro51-module-content-name">Unit 5 / Advanced Implant Dentistry</div>
                <div class="cro51-module-content-duration">Est Duration: 6 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>
                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">This unit focuses on advanced concepts and specialised techniques in implant dentistry. From managing complications and ensuring long-term implant success to exploring complex implant cases and more atypical implant placements, you’ll gain confidence in understanding the wide range of options that are available to treat such cases.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Implant Maintenance:</strong> Master the management of peri-implant diseases and failing restorations to ensure long-term implant success. Learn to navigate the medico-legal aspects of implant maintenance, developing best practices for patient care and risk management in complex cases.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Case Demonstrations:</strong> Gain valuable insights from real-world complex cases in implant dentistry. This module features detailed case studies that illustrate advanced treatment planning, execution, and problem-solving strategies, providing a practical understanding of how to approach clinical situations.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Zygomatic and Pterygoid Implants:</strong> Explore the rationale and treatment techniques for zygomatic and pterygoid implants. This module offers an overview of these advanced procedures, complete with case examples, to expand your knowledge and understanding of these procedures, and when they may be appropriate.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cro51-module-content cro51-module-content6">
                <div class="cro51-module-content-name">Unit 6 / Oral Surgery in Clinical Practice</div>
                <div class="cro51-module-content-duration">Est Duration: 12 Weeks</div>
                <div class="cro51-module-dropdown">
                  <div class="cro51-module-dropdown-header">
                    <div class="cro51-module-dropdown-text">View Breakdown</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon1">${expandIcon}</div>
                    <div class="cro51-module-dropdown-icon cro51-module-dropdown-icon2">${expandIcon2}</div>
                  </div>

                  <div class="cro51-module-dropdown-contents">
                    <div class="cro51-module-item-info">This unit provides a comprehensive understanding of oral surgery, from the principles of tooth extraction to the surgical management of dental trauma. By exploring complex cases and multidisciplinary approaches, you’ll develop the skills to handle a wide range of clinical scenarios confidently.</div>
                    <div class="cro51-module-lists">
                      <div class="cro51-module-list-item cro51-module-list-item1">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Principles of Exodontia:</strong> Master the techniques for managing both straightforward and complex extractions, including impacted teeth. This module provides an update of foundations of exodontia, equipping you with the practical skills needed to handle various extraction cases with precision and confidence.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item2">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Surgical Medicine in Dental Practice:</strong> Understand the implications of human disease and oral medicine in the context of dental surgery. This module covers relevant medical conditions and how they influence treatment planning and surgical procedures, ensuring safe and effective patient care.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item3">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Dental Trauma:</strong> Learn the surgical management of dental trauma, including best practices for immediate intervention and long-term treatment planning. This module prepares you to handle traumatic dental injuries confidently, ensuring optimal outcomes for your patients.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item4">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Multidisciplinary Treatment:</strong> Explore complex oral surgery cases that require a multidisciplinary approach. This module emphasises collaboration with other dental and medical specialists, teaching you how to coordinate care effectively for comprehensive patient management.</div>
                      </div>

                      <div class="cro51-module-list-item cro51-module-list-item-bonus">Bonus modules:</div>

                      <div class="cro51-module-list-item cro51-module-list-item5">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Facial Aesthetics:</strong> Expand your skill set with an introduction to facial aesthetic treatments and non-surgical rejuvenation techniques. Learn to deliver these procedures safely and effectively, with a focus on natural-looking results and ethical considerations.</div>
                      </div>
                      <div class="cro51-module-list-item cro51-module-list-item6">
                        <div class="cro51-module-list-icon">${bookIcon}</div>
                        <div class="cro51-module-list-text"><strong>Marketing:</strong> Develop strategies to market your dental practice successfully. This module covers everything from building an online presence to managing patient relations and practice growth, providing the tools you need to attract and retain patients in a competitive landscape.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    var badgeIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
        <path d="M3.87303 7.27977C3.87303 6.43685 4.20788 5.62846 4.80391 5.03242C5.39994 4.43639 6.20833 4.10154 7.05125 4.10154H8.4959C9.33509 4.10106 10.14 3.7687 10.7351 3.17697L11.7464 2.16572C12.0417 1.8687 12.3929 1.63299 12.7796 1.47215C13.1664 1.31132 13.5811 1.22852 14 1.22852C14.4189 1.22852 14.8336 1.31132 15.2204 1.47215C15.6071 1.63299 15.9583 1.8687 16.2536 2.16572L17.2649 3.17697C17.8601 3.76928 18.6662 4.10154 19.5041 4.10154H20.9487C21.7917 4.10154 22.6001 4.43639 23.1961 5.03242C23.7921 5.62846 24.127 6.43685 24.127 7.27977V8.72441C24.127 9.56231 24.4592 10.3684 25.0515 10.9636L26.0628 11.9749C26.3598 12.2702 26.5955 12.6214 26.7564 13.0081C26.9172 13.3949 27 13.8096 27 14.2285C27 14.6474 26.9172 15.0621 26.7564 15.4489C26.5955 15.8357 26.3598 16.1868 26.0628 16.4822L25.0515 17.4934C24.4598 18.0885 24.1275 18.8934 24.127 19.7326V21.1773C24.127 22.0202 23.7921 22.8286 23.1961 23.4246C22.6001 24.0206 21.7917 24.3555 20.9487 24.3555H19.5041C18.6649 24.356 17.86 24.6883 17.2649 25.2801L16.2536 26.2913C15.9583 26.5883 15.6071 26.824 15.2204 26.9849C14.8336 27.1457 14.4189 27.2285 14 27.2285C13.5811 27.2285 13.1664 27.1457 12.7796 26.9849C12.3929 26.824 12.0417 26.5883 11.7464 26.2913L10.7351 25.2801C10.14 24.6883 9.33509 24.356 8.4959 24.3555H7.05125C6.20833 24.3555 5.39994 24.0206 4.80391 23.4246C4.20788 22.8286 3.87303 22.0202 3.87303 21.1773V19.7326C3.87255 18.8934 3.54019 18.0885 2.94846 17.4934L1.9372 16.4822C1.64018 16.1868 1.40448 15.8357 1.24364 15.4489C1.0828 15.0621 1 14.6474 1 14.2285C1 13.8096 1.0828 13.3949 1.24364 13.0081C1.40448 12.6214 1.64018 12.2702 1.9372 11.9749L2.94846 10.9636C3.54019 10.3686 3.87255 9.56361 3.87303 8.72441V7.27977Z" fill="#7AE1BF" ></path>
        <path d="M3.87303 7.27977C3.87303 6.43685 4.20788 5.62846 4.80391 5.03242C5.39994 4.43639 6.20833 4.10154 7.05125 4.10154H8.4959C9.33509 4.10106 10.14 3.7687 10.7351 3.17697L11.7464 2.16572C12.0417 1.8687 12.3929 1.63299 12.7796 1.47215C13.1664 1.31132 13.5811 1.22852 14 1.22852C14.4189 1.22852 14.8336 1.31132 15.2204 1.47215C15.6071 1.63299 15.9583 1.8687 16.2536 2.16572L17.2649 3.17697C17.8601 3.76928 18.6662 4.10154 19.5041 4.10154H20.9487C21.7917 4.10154 22.6001 4.43639 23.1961 5.03242C23.7921 5.62846 24.127 6.43685 24.127 7.27977V8.72441C24.127 9.56231 24.4592 10.3684 25.0515 10.9636L26.0628 11.9749C26.3598 12.2702 26.5955 12.6214 26.7564 13.0081C26.9172 13.3949 27 13.8096 27 14.2285C27 14.6474 26.9172 15.0621 26.7564 15.4489C26.5955 15.8357 26.3598 16.1868 26.0628 16.4822L25.0515 17.4934C24.4598 18.0885 24.1275 18.8934 24.127 19.7326V21.1773C24.127 22.0202 23.7921 22.8286 23.1961 23.4246C22.6001 24.0206 21.7917 24.3555 20.9487 24.3555H19.5041C18.6649 24.356 17.86 24.6883 17.2649 25.2801L16.2536 26.2913C15.9583 26.5883 15.6071 26.824 15.2204 26.9849C14.8336 27.1457 14.4189 27.2285 14 27.2285C13.5811 27.2285 13.1664 27.1457 12.7796 26.9849C12.3929 26.824 12.0417 26.5883 11.7464 26.2913L10.7351 25.2801C10.14 24.6883 9.33509 24.356 8.4959 24.3555H7.05125C6.20833 24.3555 5.39994 24.0206 4.80391 23.4246C4.20788 22.8286 3.87303 22.0202 3.87303 21.1773V19.7326C3.87255 18.8934 3.54019 18.0885 2.94846 17.4934L1.9372 16.4822C1.64018 16.1868 1.40448 15.8357 1.24364 15.4489C1.0828 15.0621 1 14.6474 1 14.2285C1 13.8096 1.0828 13.3949 1.24364 13.0081C1.40448 12.6214 1.64018 12.2702 1.9372 11.9749L2.94846 10.9636C3.54019 10.3686 3.87255 9.56361 3.87303 8.72441V7.27977" stroke="#7AE1BF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ></path>
        <path d="M10 14.2285L12.6667 17.2285L18 11.2285" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    `;

    var benefitSectionHtml = `
      <div class="cro-51-benefit-container">
        <div class="cro-51-benefit-wrapper">
          <div class="cro-51-benefit-header">How will the Orthodontics & Dentofacial Orthopaedics PG Dip. benefit you?</div>
          <div class="cro-51-benefit-contents">
            <div class="cro-51-benefit-content cro-51-benefit-content1">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text"><strong>Gain confidence</strong> with clinically-directed teaching on the cases you will be treating in your own practice</div>
              </div>
            </div>
            <div class="cro-51-benefit-content cro-51-benefit-content2">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text">Begin treating cases straight away with <strong>1:1 clinical support</strong> from our expert team of clinical tutors</div>
              </div>
            </div>
            <div class="cro-51-benefit-content cro-51-benefit-content3">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text">Discover <strong>strategies for integrating orthodontic treatments</strong> into your practice, to grow your orthodontic patient list</div>
              </div>
            </div>
            <div class="cro-51-benefit-content cro-51-benefit-content4">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text"><strong>Increase your treatment income</strong> through the provision of high value orthodontic treatments</div>
              </div>
            </div>
            <div class="cro-51-benefit-content cro-51-benefit-content5">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text"><strong>Reduce the need to refer patients</strong> whilst retaining more cases in-house</div>
              </div>
            </div>
            <div class="cro-51-benefit-content cro-51-benefit-content6">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text">Learn an <strong>evidence-based approach</strong> to providing orthodontic treatments in general practice</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    var benefitSectionHtml2 = `
      <div class="cro-51-benefit-container">
        <div class="cro-51-benefit-wrapper">
          <div class="cro-51-benefit-header">How will the Aesthetic and Restorative PG Dip. benefit you?</div>
          <div class="cro-51-benefit-contents">
            <div class="cro-51-benefit-content cro-51-benefit-content1">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text"><strong>Gain confidence</strong> with clinically-focussed teaching on the cases you will be treating in your own practice</div>
              </div>
            </div>
            <div class="cro-51-benefit-content cro-51-benefit-content2">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text"><strong>Treat more complex cases</strong> straight away with 1:1 clinical support from our expert team of clinical tutors</div>
              </div>
            </div>
            <div class="cro-51-benefit-content cro-51-benefit-content3">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text"><strong>Increase your treatment income</strong> by offering high-value, complex treatment plans</div>
              </div>
            </div>
            <div class="cro-51-benefit-content cro-51-benefit-content4">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text"><strong>Meet growing patient demand</strong> for aesthetic and restorative dental techniques</div>
              </div>
            </div>
            <div class="cro-51-benefit-content cro-51-benefit-content5">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text"><strong>Reduce the need to refer patients</strong> whilst retaining more cases in-house</div>
              </div>
            </div>
            <div class="cro-51-benefit-content cro-51-benefit-content6">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text"><strong>Deliver advanced restorative treatments</strong> that improve both function and aesthetic outcomes for your patients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    var benefitSectionHtml3 = `
      <div class="cro-51-benefit-container">
        <div class="cro-51-benefit-wrapper">
          <div class="cro-51-benefit-header">How will the Dental Implantology and Oral Surgery PG Dip. benefit you?</div>
          <div class="cro-51-benefit-contents">
            <div class="cro-51-benefit-content cro-51-benefit-content1">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text">Begin treating cases straight away with <strong>1:1 clinical support</strong> from our expert team of clinical tutors</div>
              </div>
            </div>
            <div class="cro-51-benefit-content cro-51-benefit-content2">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text"><strong>Gain confidence</strong> with clinically-directed teaching on the cases you will be treating in your own practice</div>
              </div>
            </div>
            <div class="cro-51-benefit-content cro-51-benefit-content3">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text">Discover <strong>strategies for integrating implant treatments</strong> into your practice, to grow your surgical patient list</div>
              </div>
            </div>
            <div class="cro-51-benefit-content cro-51-benefit-content4">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text"><strong>Increase your treatment income</strong> through the provision of high value dental implant treatments</div>
              </div>
            </div>
            <div class="cro-51-benefit-content cro-51-benefit-content5">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text"><strong>Reduce the need to refer patients</strong> whilst retaining more cases in-house</div>
              </div>
            </div>
            <div class="cro-51-benefit-content cro-51-benefit-content6">
              <div class="cro-51-benefit-content-header">
                <div class="cro-51-benefit-content-icon">${badgeIcon}</div>
                <div class="cro-51-benefit-content-text">Learn an <strong>evidence-based approach</strong> to providing oral surgery and dental implants in general practice</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    function addingClassToParentElement() {
      // Function to add classes to the target element and its siblings
      waitForElement("#CourseOverview", function () {
        var targetElement = document.querySelector("#CourseOverview");
        if (targetElement) {
          targetElement.classList.add("cro51-target");
          if (targetElement.previousElementSibling) {
            targetElement.previousElementSibling.classList.add("cro51-sub-nav");
          }
          if (targetElement.nextElementSibling) {
            targetElement.nextElementSibling.classList.add("cro51-pricing");
          }
        }
      });
      waitForElement("#CourseReviews", function () {
        var targetElement2 = document.querySelector("#CourseReviews");
        if (targetElement2) {
          targetElement2.classList.add("cro51-reviews");
          if (targetElement2.nextElementSibling) {
            targetElement2.nextElementSibling.classList.add("cro51-benefit");
          }
        }
      });

      addClassToElement(".bb-elementor-content > [class*='elementor elementor'] > section:first-child + section", "cro51-hero");
      addClassToElement(".bb-elementor-content > [class*='elementor elementor'] > section:first-child + section + section", "cro51-background");
      addClassToElement("#FAQ + .elementor-section", "cro51-partners");

      addClassToClosest("#membership_countdown_container", ".elementor-shortcode", "cro51-membership-countdown-parent");

      addClassToClosest("#content .cro51-hero .has_eae_slider  h2.elementor-heading-title", ".elementor-element", "cro51-course-name");

      addClassToClosest("#content .cro51-hero .has_eae_slider .bb-theme-elementor-wrap p span", ".elementor-element", "cro51-course-info");

      // addClassToClosest(".section-container > .rate-calculator", "section.section", "cro-3-calculator-section");

      forceInsertion(function () {
        document.querySelectorAll("section#EntryRequirements .elementor-widget-wrap > .elementor-element h3").forEach(function (e) {
          if (e.textContent.trim().toLowerCase() === "assessment") {
            var closestElement = e.closest(".elementor-element");
            if (closestElement) {
              closestElement.classList.add("cro51-assessment");
            }
          }
          if (e.textContent.trim().toLowerCase() === "qualification") {
            var closestElement1 = e.closest(".elementor-element");
            if (closestElement1) {
              closestElement1.classList.add("cro51-qualification");
            }
          }
        });
      });
      waitForElement(".cro51-course-name", function () {
        var targetElement4 = document.querySelector(".cro51-course-name").parentElement;
        if (targetElement4) {
          targetElement4.classList.add("cro51-course-name-parent");
        }
      });
    }

    function updateLink(selector, newUrl) {
      waitForElement(selector, function () {
        document.querySelector(selector).href = newUrl;
      });
    }

    function htmlInsertion() {
      if (window.location.pathname === "/orthodontics-dentofacial-orthopaedics/") {
        waitForElement(".cro51-hero .elementor-container", function () {
          if (!document.querySelector(".cro51-pricing-container")) {
            document.querySelector(".cro51-hero .elementor-container").insertAdjacentHTML("beforeend", newPricingSection1);
          }
        });

        // adding href for enroll cta
        // updateLink(".cro51-enroll-now", "https://vle.londondentalinstitute.com/orthodontics-and-dentofacial-orthopaedics-registration/");

        // adding requirementsSection
        waitForElement(".cro51-pricing", function () {
          if (!document.querySelector(".cro51-requirement-container")) {
            document.querySelector(".cro51-pricing").insertAdjacentHTML("afterend", requirementsSection1);
          }
        });
        // adding module overview section
        waitForElement(".cro51-requirement-container", function () {
          if (!document.querySelector(".cro51-module-container")) {
            document.querySelector(".cro51-requirement-container").insertAdjacentHTML("afterend", moduleOverview1);
          }
          waitForElement("#EntryRequirements", function () {
            document.querySelector(".cro51-module-container") && document.querySelector(".cro51-module-container").insertAdjacentElement("afterend", document.querySelector("#EntryRequirements"));
          });
        });
        // adding benefitSection
        waitForElement("#Modules", function () {
          if (!document.querySelector(".cro-51-benefit-container")) {
            document.querySelector("#Modules").insertAdjacentHTML("beforebegin", benefitSectionHtml);
          }
        });
      } else if (window.location.pathname === "/aesthetic-restorative-dentistry/") {
        waitForElement(".cro51-hero .elementor-container", function () {
          if (!document.querySelector(".cro51-pricing-container")) {
            document.querySelector(".cro51-hero .elementor-container").insertAdjacentHTML("beforeend", newPricingSection2);
          }
        });
        // adding href for enroll cta
        // updateLink(".cro51-enroll-now", "https://vle.londondentalinstitute.com/aesthetic-and-restorative-dentistry-registration/");

        // adding requirementsSection
        waitForElement(".cro51-pricing", function () {
          if (!document.querySelector(".cro51-requirement-container")) {
            document.querySelector(".cro51-pricing").insertAdjacentHTML("afterend", requirementsSection2);
          }
        });

        // adding module overview section
        waitForElement(".cro51-requirement-container", function () {
          if (!document.querySelector(".cro51-module-container")) {
            document.querySelector(".cro51-requirement-container").insertAdjacentHTML("afterend", moduleOverview2);
          }
          waitForElement("#EntryRequirements", function () {
            document.querySelector(".cro51-module-container") && document.querySelector(".cro51-module-container").insertAdjacentElement("afterend", document.querySelector("#EntryRequirements"));
          });
        });
        // adding benefitSection
        waitForElement("#Modules", function () {
          if (!document.querySelector(".cro-51-benefit-container")) {
            document.querySelector("#Modules").insertAdjacentHTML("beforebegin", benefitSectionHtml2);
          }
        });
      } else if (window.location.pathname === "/dental-implantology-oral-surgery/") {
        waitForElement(".cro51-hero .elementor-container", function () {
          if (!document.querySelector(".cro51-pricing-container")) {
            document.querySelector(".cro51-hero .elementor-container").insertAdjacentHTML("beforeend", newPricingSection3);
          }
        });
        // adding href for enroll cta
        // updateLink(".cro51-enroll-now", "https://vle.londondentalinstitute.com/aesthetic-and-restorative-dentistry-registration/");
        // adding requirementsSection
        waitForElement(".cro51-pricing", function () {
          if (!document.querySelector(".cro51-requirement-container")) {
            document.querySelector(".cro51-pricing").insertAdjacentHTML("afterend", requirementsSection3);
          }
        });
        // adding module overview section
        waitForElement(".cro51-requirement-container", function () {
          if (!document.querySelector(".cro51-module-container")) {
            document.querySelector(".cro51-requirement-container").insertAdjacentHTML("afterend", moduleOverview3);
          }
          waitForElement("#EntryRequirements", function () {
            document.querySelector(".cro51-module-container") && document.querySelector(".cro51-module-container").insertAdjacentElement("afterend", document.querySelector("#EntryRequirements"));
          });
        });
        // adding benefitSection
        waitForElement("#Modules", function () {
          if (!document.querySelector(".cro-51-benefit-container")) {
            document.querySelector("#Modules").insertAdjacentHTML("beforebegin", benefitSectionHtml3);
          }
        });
      }
    }

    var swiperNextAndPrev = `
      <div class="swiper-button-next cro51-next">
        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
          <rect x="0.832031" y="0.65918" width="40" height="40" rx="5" fill="#00A9E0" />
          <path d="M18.3977 28.8559C18.0756 28.8559 17.7893 28.7504 17.5745 28.5395C17.1093 28.1178 17.1093 27.3796 17.5745 26.9579L23.6232 20.9826L17.5745 15.0425C17.1093 14.6208 17.1093 13.8826 17.5745 13.4609C18.004 13.0039 18.7556 13.0039 19.1851 13.4609L26.057 20.2094C26.5222 20.6311 26.5222 21.3693 26.057 21.791L19.1851 28.5395C18.9704 28.7504 18.6841 28.8559 18.3977 28.8559Z" fill="white" />
        </svg>
      </div>

      <div class="swiper-button-prev cro51-prev">
        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
          <rect width="40" height="40" rx="5" transform="matrix(-1 0 0 1 40.168 0.65918)" fill="#00A9E0" />
          <path d="M22.6024 28.8559C22.9245 28.8559 23.2108 28.7504 23.4256 28.5395C23.8909 28.1178 23.8909 27.3796 23.4256 26.9579L17.3769 20.9826L23.4256 15.0425C23.8909 14.6208 23.8909 13.8826 23.4256 13.4609C22.9961 13.0039 22.2445 13.0039 21.815 13.4609L14.9432 20.2094C14.4779 20.6311 14.4779 21.3693 14.9432 21.791L21.815 28.5395C22.0297 28.7504 22.3161 28.8559 22.6024 28.8559Z" fill="white" />
        </svg>
      </div>
    `;

    function intializeSwiper() {
      waitForElement(".cro51-partners", function () {
        document.querySelector(".cro51-partners") && document.querySelector(".cro51-partners").insertAdjacentElement("afterend", document.querySelector("#Faculty"));
      });
      // Select the swiper container
      var swiperContainer = document.querySelector("section#Faculty .elementor-widget-wrap > .has_eae_slider.elementor-element .swiper");

      // Add buttons after the Swiper container
      if (!document.querySelector(".cro51-next")) {
        swiperContainer.insertAdjacentHTML("afterend", swiperNextAndPrev);
      }

      // Check if a Swiper instance already exists and destroy it
      if (swiperContainer.swiper) {
        swiperContainer.swiper.destroy(true, true); // Remove styles and listeners
      }

      // Initialize Swiper with navigation enabled
      var swiper = new Swiper("section#Faculty .elementor-widget-wrap > .has_eae_slider.elementor-element .swiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next.cro51-next",
          prevEl: ".swiper-button-prev.cro51-prev",
        },
        pagination: {
          el: "section#Faculty .elementor-widget-wrap > .has_eae_slider.elementor-element .swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          375: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        },
      });
    }

    function eventHandler() {
      live(".cro51-module-dropdown-header", "click", function () {
        var parent = this.parentElement;
        if (parent) {
          if (parent.classList.contains("cro51-show-dropdown")) {
            parent.classList.remove("cro51-show-dropdown");
          } else {
            parent.classList.add("cro51-show-dropdown");
          }
        }
      });
    }

    /* Variation Init */
    function init() {
      // addClass("body", "cro51");
      addClass("body", "cro51-redesign");

      if (window.location.pathname === "/orthodontics-dentofacial-orthopaedics/") {
        addClass("body", "cro51-orthodontics");
        waitForSwiper(
          function () {
            waitForElement("section#Faculty .elementor-widget-wrap > .has_eae_slider.elementor-element .swiper", intializeSwiper);
          },
          50,
          15000
        );
      } else if (window.location.pathname === "/aesthetic-restorative-dentistry/") {
        addClass("body", "cro51-aesthetic");
        waitForSwiper(
          function () {
            waitForElement("section#Faculty .elementor-widget-wrap > .has_eae_slider.elementor-element .swiper", intializeSwiper);
          },
          50,
          15000
        );
      } else if (window.location.pathname === "/dental-implantology-oral-surgery/") {
        addClass("body", "cro51-implantology");
        waitForSwiper(
          function () {
            waitForElement("#Faculty .swiper-container-wrap .swiper", function () {
              var facultySlider = document.querySelector("#Faculty .swiper-container-wrap").closest(".elementor-hidden-desktop");

              if (facultySlider) {
                var facultySliderParent = document.querySelector("#Faculty .swiper-container-wrap").closest(".elementor-hidden-desktop");
                if (facultySliderParent) {
                  facultySliderParent.classList.add("cro51-faculty-swiper-container");

                  //   waitForElement("#Faculty >  .elementor-container > .elementor-column >.elementor-widget-wrap", function () {
                  // document.querySelector("#Faculty >  .elementor-container > .elementor-column >.elementor-widget-wrap ").insertAdjacentElement("beforeend", document.querySelector(".cro51-faculty-swiper-container"));
                  intializeSwiper();
                  //   });
                }
              }
            });
          },
          50,
          15000
        );
      }
      addingClassToParentElement();
      htmlInsertion();

      if (!window.creEvent51) {
        eventHandler();
        window.creEvent51 = true;
      }
    }

    /* Initialise variation */
    waitForElement("body #page", function () {
      var pathName = window.location.pathname;
      if (pathName === "/orthodontics-dentofacial-orthopaedics/" || pathName === "/aesthetic-restorative-dentistry/" || pathName === "/dental-implantology-oral-surgery/") {
        init();
      }
    });
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();