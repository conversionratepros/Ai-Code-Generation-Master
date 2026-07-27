(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "cro-12316";

    /* Files in testFiles/assets/ must be uploaded to the Convert.com media library (or another
       public host) before going live — update assetBase to wherever they end up. */
    var assetBase = "https://cdn-3.convertexperiments.com/uf/REPLACE_ACCOUNT_ID/REPLACE_PROJECT_ID/";
    var siteBase = "https://www.debtbusters.co.za";
    var waLink = "https://wa.me/27869990606";
    var googleReviewsLink = "https://www.google.com/search?q=DebtBusters+reviews"; // TODO: swap for the exact Google Business profile review URL if available

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

    function innerHTMLContent(selector, content) {
      var el = document.querySelector(selector);
      if (el) {
        el.innerHTML = content;
      }
    }

    function innerChildContent(selector, childNumber, content) {
      var el = document.querySelector(selector);
      if (el.hasChildNodes()) {
        el.childNodes[childNumber].textContent = content;
      }
    }

    function addClass(el, cls) {
      var el = document.querySelector(el);
      if (el) {
        el.classList.add(cls);
      }
    }

    function toggleClass(el, cls) {
      var el = document.querySelector(el);
      if (el) {
        el.classList.toggle(cls);
      }
    }

    function removeClass(el, cls) {
      var el = document.querySelector(el);
      if (el) {
        el.classList.contains(cls) && el.classList.remove(cls);
      }
    }

    function scroll(click, selector) {
      click.addEventListener('click', function (event) {
        event.preventDefault();
        var target = document.querySelector(selector);
        if (target) {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY,
            behavior: 'smooth'
          });
        }
      });
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

      var swiperCss = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.css" crossorigin="anonymous" referrerpolicy="no-referrer" />';
      document.querySelector("head").insertAdjacentHTML("beforeend", swiperCss);
    }

    function initializeSwiper() {
      var galleryThumb = new Swiper(".cro_12_32_47-swiper-thumb-wrapper", {
        slidesPerView: 5,
        spaceBetween: 10,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        slidesPerGroup: 1,
        breakpoints: {
          767: {
            spaceBetween: 12,
          },
        },
      });

      var galleryTop = new Swiper(".cro_12_32_47-swiper-wrapper", {
        slidesPerView: 1,
        loop: false,
        centeredSlides: false,
        navigation: {
          nextEl: ".cro_12_32_47-next",
          prevEl: ".cro_12_32_47-prev",
        },
        speed: 300,
        spaceBetween: 10,
        thumbs: {
          swiper: galleryThumb,
        },
      });
    }

    /* ---------------------------------------------------------------------
       Content builders — one function per section, returns an HTML string
       --------------------------------------------------------------------- */

    function starsSvg(extraClass) {
      var star = '<svg class="cro-12316-star ' + (extraClass || '') + '" viewBox="0 0 20 20" fill="#E8861A" xmlns="http://www.w3.org/2000/svg"><path d="M10 0l2.9 6.26L20 7.27l-5 4.97L16.18 20 10 16.27 3.82 20 5 12.24l-5-4.97 7.1-1.01L10 0z"/></svg>';
      return star + star + star + star + star;
    }

    function iconCustomerService() {
      return '<svg class="cro-12316-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 13a8 8 0 0116 0M4 13v4a2 2 0 002 2h1v-7H5a1 1 0 00-1 1zm16 0v4a2 2 0 01-2 2h-1v-7h1a1 1 0 011 1zm-9 7h2" stroke="#5BAC43" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }

    function iconSecurityCheck() {
      return '<svg class="cro-12316-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l8 3v6c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V5l8-3z" stroke="#5BAC43" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="#5BAC43" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }

    function iconWhatsapp() {
      return '<svg class="cro-12316-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2z" fill="#FFFFFF"/><path d="M8.5 7.6c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.7.7 1.8.1.2.1.3 0 .5-.1.2-.2.3-.3.5-.2.2-.3.3-.1.6.2.3.9 1.5 2 2.4 1.3 1.2 2.4 1.5 2.8 1.7.3.1.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.6.8 1.9 1 .3.1.5.2.5.3.1.2.1.9-.2 1.6-.3.8-1.6 1.5-2.3 1.6-.6.1-1.3.2-4.2-1-3.5-1.4-5.7-5-5.9-5.2-.2-.2-1.4-1.9-1.4-3.6 0-1.7.9-2.5 1.2-2.8z" fill="#5BAC43"/></svg>';
    }

    function iconChevron() {
      return '<svg class="cro-12316-chevron" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 6.75L9 11.25l4.5-4.5" stroke="#0E1216" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }

    function ndcaSeal() {
      return '' +
        '<svg class="cro-12316-ndca-seal" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<circle cx="64" cy="64" r="60" stroke="#FFFFFF" stroke-width="3"/>' +
        '<circle cx="64" cy="64" r="48" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="4 4"/>' +
        '</svg>' +
        '<div class="cro-12316-ndca-seal__text"><strong>NDCA</strong><span>Registered</span></div>';
    }

    function trustRow(modifier) {
      return '' +
        '<div class="cro-12316-trust-row ' + (modifier || '') + '">' +
        '<span class="cro-12316-trust-row__item">' + iconCustomerService() + 'Speak to a real person</span>' +
        '<span class="cro-12316-trust-row__item">' + iconSecurityCheck() + 'No upfront fees</span>' +
        '</div>';
    }

    function privacyNotice() {
      return '' +
        '<p class="cro-12316-form__privacy">By submitting this form you agree to our ' +
        '<a href="' + siteBase + '/privacy-policy/" target="_blank" rel="noopener">Privacy Policy</a> and ' +
        '<a href="' + siteBase + '/terms-and-conditions/" target="_blank" rel="noopener">Terms &amp; Conditions</a>. ' +
        'Your information is 100% encrypted &amp; confidential.</p>';
    }

    function callbackForm(formId, idPrefix) {
      return '' +
        '<form id="' + formId + '" name="' + formId + '" class="cro-12316-form" onsubmit="submitForm(event)">' +
        '<div class="cro-12316-form__row">' +
        '<div class="cro-12316-form__field">' +
        '<input type="text" id="name" name="name" placeholder="First Name*">' +
        '<p class="error cro-12316-form__error hidden"></p>' +
        '</div>' +
        '<div class="cro-12316-form__field">' +
        '<input type="text" id="surname" name="surname" placeholder="Last Name*">' +
        '<p class="error cro-12316-form__error hidden"></p>' +
        '</div>' +
        '</div>' +
        '<div class="cro-12316-form__field">' +
        '<input type="tel" id="contactNumber" name="contactNumber" placeholder="Contact number, e.g. 071 367 XXXX*">' +
        '<p class="error cro-12316-form__error hidden"></p>' +
        '</div>' +
        '<div class="cro-12316-form__field">' +
        '<input type="email" id="email" name="email" placeholder="Email, e.g. name@example.co.za*">' +
        '<p class="error cro-12316-form__error hidden"></p>' +
        '</div>' +
        '<div class="cro-12316-form__field">' +
        '<input type="text" id="idNumber" name="idNumber" placeholder="ID Number*">' +
        '<p class="error cro-12316-form__error hidden"></p>' +
        '</div>' +
        privacyNotice() +
        '<input type="submit" id="Online" class="cro-12316-form__submit" value="Apply Now">' +
        '<a href="' + waLink + '" target="_blank" rel="noopener" class="cro-12316-form__whatsapp">' + iconWhatsapp() + 'Or Prefer WhatsApp? Message us now</a>' +
        '</form>';
    }

    function heroHTML() {
      return '' +
        '<section class="cro-12316-hero" id="cro-12316-hero">' +
        '<div class="cro-12316-hero__logobar">' +
        '<div class="cro-12316-hero__logobar-left">' +
        '<img src="' + siteBase + '/uploads/72a82cc9-2cf1-4517-b91c-fa5d21b3c6cb.png" alt="DebtBusters logo" class="cro-12316-hero__logo">' +
        '<div class="cro-12316-hero__rating">' +
        '<span class="cro-12316-stars">' + starsSvg() + '</span>' +
        '<span class="cro-12316-hero__rating-text"><strong>4.4/5</strong> Rating &middot; ' +
        '<a href="' + googleReviewsLink + '" target="_blank" rel="noopener">3,103+ verified reviews</a></span>' +
        '</div>' +
        '</div>' +
        '<div class="cro-12316-hero__logobar-right" style="background-image:url(' + assetBase + 'hero-bg.jpg)"></div>' +
        '</div>' +
        '<div class="cro-12316-hero__photo" style="background-image:url(' + assetBase + 'hero-bg.jpg)">' +
        '<img src="' + assetBase + 'laurel-award.png" alt="9X Debt Review Award Winner" class="cro-12316-hero__laurel">' +
        '<div class="cro-12316-hero__panel" id="cro-12316-hero-form">' +
        '<div class="cro-12316-hero__panel-inner">' +
        '<h1 class="cro-12316-hero__heading">Like Erica did. Get immediate relief, expert guidance, and a clear plan to bust your debt.</h1>' +
        '<p class="cro-12316-hero__subheading"><strong>One free call. A clear plan.</strong> And a real chance to finally breathe again.</p>' +
        callbackForm('cro-12316-form-hero') +
        '</div>' +
        '</div>' +
        '</div>' +
        '<img src="' + assetBase + 'trust-badge.png" alt="Consistently rated highly for helpfulness, 1 min average response time" class="cro-12316-hero__trust-badge">' +
        '</section>';
    }

    function logosHTML() {
      var logos = [
        ['logo-702.png', '702'],
        ['logo-news24.png', 'News24'],
        ['logo-powerfm.png', 'Power FM'],
        ['logo-sowetan.png', 'The Sowetan'],
        ['logo-netwerk24.png', 'Netwerk24'],
        ['logo-etv.png', 'eTV']
      ];
      var cards = logos.map(function (l) {
        return '<div class="cro-12316-logos__card"><img src="' + assetBase + l[0] + '" alt="' + l[1] + '" loading="lazy"></div>';
      }).join('');

      return '' +
        '<section class="cro-12316-logos">' +
        '<h2 class="cro-12316-heading-2">Recognised by trusted media across South Africa.</h2>' +
        '<div class="cro-12316-logos__grid">' + cards + '</div>' +
        '<div class="cro-12316-logos__mobile-rating">' +
        '<span class="cro-12316-stars">' + starsSvg() + '</span>' +
        '<span class="cro-12316-hero__rating-text"><strong>4.4/5</strong> Rating &middot; ' +
        '<a href="' + googleReviewsLink + '" target="_blank" rel="noopener">3,103+ verified reviews</a></span>' +
        '</div>' +
        '</section>';
    }

    function storyHTML() {
      var panels = [
        ['story-panel-01.jpg', '01', 'R10,000 a month in debt.', 'The letters kept coming. The sleep stopped.'],
        ['story-panel-02.png', '02', 'One free call to DebtBusters.', 'No judgement, just someone listening.'],
        ['story-panel-03.png', '03', 'R10,000 became R3,000.', 'One payment, one date, one clear plan.'],
        ['story-panel-04.png', '04', 'She breathes easy now.', 'No more chasing payments.']
      ];
      var items = panels.map(function (p) {
        return '' +
          '<div class="cro-12316-story__panel">' +
          '<div class="cro-12316-story__image" style="background-image:url(' + assetBase + p[0] + ')">' +
          '<span class="cro-12316-story__badge">' + p[1] + '</span>' +
          '</div>' +
          '<p class="cro-12316-story__caption"><strong>' + p[2] + '</strong> ' + p[3] + '</p>' +
          '</div>';
      }).join('');

      return '' +
        '<section class="cro-12316-story">' +
        '<span class="cro-12316-pill">A True Story</span>' +
        '<h2 class="cro-12316-heading-2">This is how Erica got her life back.</h2>' +
        '<p class="cro-12316-subheading">Seven debts. One phone call. And a plan that changed everything.</p>' +
        '<div class="cro-12316-story__grid">' + items + '</div>' +
        '<button type="button" class="cro-12316-btn cro-12316-btn--orange cro-12316-scroll-to-form">Request a Free Callback</button>' +
        trustRow() +
        '</section>';
    }

    function quoteHTML() {
      return '' +
        '<section class="cro-12316-quote">' +
        '<div class="cro-12316-quote__inner">' +
        '<span class="cro-12316-quote__mark cro-12316-quote__mark--start">&ldquo;</span>' +
        '<span class="cro-12316-eyebrow">In Erica&rsquo;s own words</span>' +
        '<p class="cro-12316-quote__text">&ldquo;I wanted to give my children everything. I had taken different debts and was coming to work not knowing how to survive. DebtBusters brought my payments down from R10,000 a month to R3,000. Now I can breathe.&rdquo;</p>' +
        '<span class="cro-12316-quote__attribution">&mdash; Erica, mother of two</span>' +
        '<span class="cro-12316-quote__mark cro-12316-quote__mark--end">&rdquo;</span>' +
        '</div>' +
        '</section>';
    }

    function savingsCard(avatar, name, city, quote, saved, before, after, pct) {
      return '' +
        '<div class="cro-12316-savings__card">' +
        '<img src="' + assetBase + avatar + '" alt="' + name + '" class="cro-12316-savings__avatar">' +
        '<div class="cro-12316-savings__content">' +
        '<p class="cro-12316-savings__quote">&ldquo;' + quote + '&rdquo;</p>' +
        '<p class="cro-12316-savings__name">' + name + ' <span>| ' + city + '</span></p>' +
        '<p class="cro-12316-savings__saved">Saved ' + saved + '/month</p>' +
        '<div class="cro-12316-savings__bar"><span style="width:' + pct + '%"></span></div>' +
        '<p class="cro-12316-savings__before-after">' + before + '/month &rarr; ' + after + '/month</p>' +
        '</div>' +
        '</div>';
    }

    function savingsHTML() {
      var cards = '' +
        savingsCard('avatar-erica.png', 'Erica', 'Cape Town',
          'DebtBusters reduced my monthly instalment by more than half. I now tell all my friends and family about them. Life is exciting again.',
          'R7,000', 'R10,000', 'R3,000', 70) +
        savingsCard('avatar-renecia.png', 'Renecia', 'Johannesburg',
          'I now save monthly and have extra cash. I won&rsquo;t make the same mistakes again. I am hopeful for the future.',
          'R6,000', 'R10,000', 'R4,000', 60) +
        savingsCard('avatar-willem.png', 'Willem', 'Stilbaai',
          'The consultant was with me every step of the way, even after I cleared my debt. I cannot recommend DebtBusters enough.',
          'R4,300', 'R8,500', 'R4,200', 51);

      return '' +
        '<section class="cro-12316-savings">' +
        '<h2 class="cro-12316-heading-2">See exactly how much you could save.</h2>' +
        '<p class="cro-12316-subheading">On average our clients reduce monthly payments by 50%</p>' +
        '<div class="cro-12316-savings__list">' + cards + '</div>' +
        '<button type="button" class="cro-12316-btn cro-12316-btn--orange cro-12316-scroll-to-form">Request a Free Callback</button>' +
        trustRow() +
        '</section>';
    }

    function aboutHTML() {
      return '' +
        '<section class="cro-12316-about">' +
        '<div class="cro-12316-about__badges">' +
        '<img src="' + siteBase + '/uploads/0b30cc7a-6e4a-4435-9e16-b834a0e7827d.png" alt="9x Debt Counsellor of the Year award winner" class="cro-12316-about__award">' +
        '<div class="cro-12316-about__ndca">' + ndcaSeal() + '</div>' +
        '</div>' +
        '<div class="cro-12316-about__content">' +
        '<h2 class="cro-12316-heading-2 cro-12316-heading-2--white">90% of our clients become debt free.</h2>' +
        '<p class="cro-12316-about__text"><strong>DebtBusters is South Africa&rsquo;s leading and most trusted debt management company.</strong> We help South Africans bust debt for good, through expert advice, personalised plans, and real, lasting results. <strong>It gets better, and we&rsquo;re here to help you get there.</strong></p>' +
        '<p class="cro-12316-about__award-line"><strong>DebtBusters named Top National Debt Counsellor:</strong> 9-time winner at the Debt Review Awards</p>' +
        '</div>' +
        '</section>';
    }

    function howWeWorkHTML() {
      var steps = [
        ['#71A451', 'Financial assessment', "We'll review your finances with you."],
        ['#1F4C6D', 'Budget', "We'll help you draw up a realistic budget."],
        ['#707271', 'Savings calculation', "We'll estimate your new, single monthly debt instalment, leaving you with extra cash for living expenses."],
        ['#AACD6D', 'Negotiations with credit providers', "We'll negotiate for lower interest rates with your credit providers."],
        ['#71A451', 'Legal protection', "We'll protect your assets throughout your journey."],
        ['#AACD6D', 'Ongoing support', "We'll be with you every step of the way."],
        ['#1F4C6D', 'Debt freedom', "You'll bust your debt for good, in 60 months or less."]
      ];
      var cards = steps.map(function (s) {
        return '' +
          '<div class="cro-12316-how__card">' +
          '<div class="cro-12316-how__card-head" style="background-color:' + s[0] + '">' + s[1] + '</div>' +
          '<p class="cro-12316-how__card-desc">' + s[2] + '</p>' +
          '</div>';
      }).join('');

      return '' +
        '<section class="cro-12316-how">' +
        '<h2 class="cro-12316-heading-2">We can help you take control of your debt and your future. Here&rsquo;s how</h2>' +
        '<div class="cro-12316-how__grid">' + cards + '</div>' +
        '</section>';
    }

    function stepsHTML() {
      var steps = [
        ['01', 'Tell us about your debt', 'Fill in the form. Takes less than 1 minute.'],
        ['02', 'We call you back', 'A real debt counsellor calls you. No bots. No scripts.'],
        ['03', 'One affordable payment', 'We negotiate with your creditors and set up one reduced monthly payment.']
      ];
      var cards = steps.map(function (s) {
        return '' +
          '<div class="cro-12316-steps__card">' +
          '<span class="cro-12316-steps__number">' + s[0] + '</span>' +
          '<h3 class="cro-12316-steps__title">' + s[1] + '</h3>' +
          '<p class="cro-12316-steps__desc">' + s[2] + '</p>' +
          '</div>';
      }).join('');

      return '' +
        '<section class="cro-12316-steps">' +
        '<h2 class="cro-12316-heading-2">Get started in three simple steps</h2>' +
        '<p class="cro-12316-subheading">No paperwork. No judgement. Just a clear path forward.</p>' +
        '<div class="cro-12316-steps__grid">' + cards + '</div>' +
        '<button type="button" class="cro-12316-btn cro-12316-btn--orange cro-12316-scroll-to-form">Request a Free Callback</button>' +
        trustRow() +
        '</section>';
    }

    function testimonialsHTML() {
      var reviews = [
        ['TC', 'Thulile Chonco', '', 'Definitely the best financial decision I have ever made. When it all becomes too much Debt busters sure comes in like a super hero to save the day. The process was easy and straight forward, I would recommend them any day. Akhona Ngaleka was my consultant and she is a star employee. Thank you Debt Busters.'],
        ['ED', 'Emily Davis', 'Cape Town', 'My wife and I cannot thank you enough. Debt Busters brought peace into our lives and probably saved our marriage.'],
        ['MI', 'Michaela', 'Gauteng', 'Debt Busters managed to lower my payments so I can afford to pay back my debts every month. I have learned a valuable lesson and I am better because of them.'],
        ['DY', 'Dylan', 'Western Cape', 'A fantastic experience from start to finish. I highly recommend Debt Busters to anyone looking for quality service.']
      ];
      var cards = reviews.map(function (r) {
        return '' +
          '<div class="cro-12316-reviews__card">' +
          '<div class="cro-12316-reviews__head">' +
          '<span class="cro-12316-stars">' + starsSvg() + '</span>' +
          '<img src="' + assetBase + 'google-logo.png" alt="Google" class="cro-12316-reviews__google">' +
          '</div>' +
          '<p class="cro-12316-reviews__text">' + r[3] + '</p>' +
          '<div class="cro-12316-reviews__author">' +
          '<span class="cro-12316-reviews__initials">' + r[0] + '</span>' +
          '<div><p class="cro-12316-reviews__name">' + r[1] + (r[2] ? ', ' + r[2] : '') + '</p><p class="cro-12316-reviews__time">3 months ago</p></div>' +
          '</div>' +
          '</div>';
      }).join('');

      return '' +
        '<section class="cro-12316-reviews">' +
        '<h2 class="cro-12316-heading-2">Real results. Real people. Real stories of how it gets better.</h2>' +
        '<p class="cro-12316-subheading"><strong>Over 3,103 South Africans</strong> have rated us <strong>4.4/5 on Google.</strong> Here&rsquo;s what some of them had to say.</p>' +
        '<div class="cro-12316-reviews__row">' + cards + '</div>' +
        '<div class="cro-12316-reviews__progress"><span></span></div>' +
        '</section>';
    }

    function faqHTML() {
      var faqs = [
        ['Will debt counselling affect my credit score?', 'Yes, temporarily. While under debt counselling your credit score will reflect this. But once you complete the process and become debt free, the flag is removed and you can rebuild your credit.'],
        ['How long does the process take?', 'Debt counselling typically takes between 12 months and 5 years, depending on how much debt you have and how much you can afford to repay each month.'],
        ['Will I be protected from legal action?', 'Yes. Once your credit providers accept your debt counselling application, they must stop all legal action, repossessions and direct contact with you, as long as you stick to your agreed repayment plan.'],
        ['Can I still rent a property under debt counselling?', 'Yes. Debt review isn&rsquo;t a credit agreement, so it won&rsquo;t affect your ability to rent. Your debt counsellor can confirm your financial standing to a landlord if needed.'],
        ['Can I be protected from appearing in court?', 'In most cases, yes. Very few debt review clients ever need to appear in court themselves. Where a case does go to the Magistrate&rsquo;s Court or NCT, your debt counsellor or an attorney represents you.'],
        ['Do I qualify for debt counselling?', 'If you&rsquo;re a South African adult with a regular income and your monthly expenses and debt repayments exceed what you earn, you likely qualify. A free assessment with one of our debt counsellors will confirm it.']
      ];
      var items = faqs.map(function (f, i) {
        return '' +
          '<div class="cro-12316-faq__item' + (i === 0 ? ' cro-12316-faq__item--open' : '') + '">' +
          '<button type="button" class="cro-12316-faq__question">' +
          '<span>' + f[0] + '</span>' + iconChevron() +
          '</button>' +
          '<p class="cro-12316-faq__answer">' + f[1] + '</p>' +
          '</div>';
      }).join('');

      return '' +
        '<section class="cro-12316-faq">' +
        '<h2 class="cro-12316-heading-2">Questions we get asked every day.</h2>' +
        '<p class="cro-12316-subheading">Seven debts. One phone call. And a plan that changed everything.</p>' +
        '<div class="cro-12316-faq__list">' + items + '</div>' +
        '</section>';
    }

    function lastCtaHTML() {
      return '' +
        '<section class="cro-12316-lastcta" style="background-image:url(' + assetBase + 'last-cta-bg.png)">' +
        '<div class="cro-12316-lastcta__panel">' +
        '<h2 class="cro-12316-hero__heading">Take The First Step Towards Financial Freedom.</h2>' +
        '<p class="cro-12316-hero__subheading"><strong>You&rsquo;ve seen what Erica did with one phone call.</strong> 1 Million plus South Africans have done the same. Your turn starts here. Submit the form or call now ' +
        '<a href="tel:0869990606" class="cro-12316-lastcta__tel">086 999 0606</a>.</p>' +
        callbackForm('cro-12316-form-cta') +
        '</div>' +
        '</section>';
    }

    /* ---------------------------------------------------------------------
       Inject + wire interactions
       --------------------------------------------------------------------- */

    function injectPage() {
      if (document.querySelector('.cro-12316-page')) return; // double-inject guard

      var html = '<div class="cro-12316-page">' +
        heroHTML() +
        logosHTML() +
        storyHTML() +
        quoteHTML() +
        savingsHTML() +
        aboutHTML() +
        howWeWorkHTML() +
        stepsHTML() +
        testimonialsHTML() +
        faqHTML() +
        lastCtaHTML() +
        '</div>';

      var header = document.querySelector('header');
      if (header) {
        header.insertAdjacentHTML('afterend', html);
      }
    }

    function loadFont() {
      if (document.querySelector('link[data-cro-12316-font]')) return;
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap';
      link.setAttribute('data-cro-12316-font', '1');
      document.head.appendChild(link);
    }

    function wireScrollButtons() {
      document.querySelectorAll('.cro-12316-scroll-to-form').forEach(function (btn) {
        scroll(btn, '#cro-12316-hero-form');
      });
    }

    function wireFaqAccordion() {
      document.querySelectorAll('.cro-12316-faq__item').forEach(function (item) {
        var btn = item.querySelector('.cro-12316-faq__question');
        if (!btn) return;
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          item.classList.toggle('cro-12316-faq__item--open');
        });
      });
    }

    function wireReviewsProgressBar() {
      var row = document.querySelector('.cro-12316-reviews__row');
      var fill = document.querySelector('.cro-12316-reviews__progress span');
      if (!row || !fill) return;
      row.addEventListener('scroll', function () {
        var max = row.scrollWidth - row.clientWidth;
        var pct = max > 0 ? (row.scrollLeft / max) * 100 : 0;
        fill.style.width = Math.max(15, pct) + '%';
      });
    }

    function init() {
      injectPage();
      addClass('body', variation_name);
      loadFont();
      wireScrollButtons();
      wireFaqAccordion();
      wireReviewsProgressBar();
    }

    function croEventHandkler() {
      /* test logic goes here */
    }

    waitForElement('header', init);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
