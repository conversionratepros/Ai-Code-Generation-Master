(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "cro-12316";
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
      /* not used in this test */
    }

    /* ─── Build section HTML ─── */
    function getSectionHtml() {
      return (
        '<section class="cro-12316-story" style="display:none">' +
          '<div class="cro-12316-story__container">' +

            /* Pill badge */
            '<div class="cro-12316-story__pill">A TRUE STORY</div>' +

            /* Heading */
            '<h2 class="cro-12316-story__heading">This is how Erica got her life back.</h2>' +

            /* Subtext */
            '<p class="cro-12316-story__subtext">Seven debts. One phone call. And a plan that changed everything.</p>' +

            /* 4 step cards */
            '<div class="cro-12316-story__cards">' +

              /* Card 01 */
              '<div class="cro-12316-story__card">' +
                '<div class="cro-12316-card__media">' +
                  '<span class="cro-12316-card__num">01</span>' +
                  '<img class="cro-12316-card__img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Panel-1.png" alt="Erica overwhelmed by debt letters" />' +
                  '<img class="cro-12316-card__img_mobile" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Panel-1-Mobile.png" alt="Erica overwhelmed by debt letters" />' +
                '</div>' +
                '<p class="cro-12316-card__text"><strong>R10,000 a month in debt.</strong> The letters kept coming. The sleep stopped.</p>' +
              '</div>' +

              /* Card 02 */
              '<div class="cro-12316-story__card">' +
                '<div class="cro-12316-card__media">' +
                  '<span class="cro-12316-card__num">02</span>' +
                  '<img class="cro-12316-card__img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Panel-2.png" alt="Erica on a free call to DebtBusters" />' +
                  '<img class="cro-12316-card__img_mobile" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Panel-2-Mobile.png" alt="Erica on a free call to DebtBusters" />' +
                '</div>' +
                '<p class="cro-12316-card__text"><strong>One free call to DebtBusters.</strong> No judgement, just someone listening.</p>' +
              '</div>' +

              /* Card 03 */
              '<div class="cro-12316-story__card">' +
                '<div class="cro-12316-card__media">' +
                  '<span class="cro-12316-card__num">03</span>' +
                  '<img class="cro-12316-card__img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Panel-3.png" alt="Erica reviewing her clear debt plan" />' +
                  '<img class="cro-12316-card__img_mobile" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Panel-3-Mobile.png" alt="Erica reviewing her clear debt plan" />' +
                '</div>' +
                '<p class="cro-12316-card__text"><strong>R10,000 became R3,000.</strong> One payment, one date, one clear plan.</p>' +
              '</div>' +

              /* Card 04 */
              '<div class="cro-12316-story__card">' +
                '<div class="cro-12316-card__media">' +
                  '<span class="cro-12316-card__num">04</span>' +
                  '<img class="cro-12316-card__img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Panel-4.png" alt="Erica relaxed and debt-free" />' +
                  '<img class="cro-12316-card__img_mobile" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Panel-4-Mobile.png" alt="Erica relaxed and debt-free" />' +
                '</div>' +
                '<p class="cro-12316-card__text"><strong>She breathes easy now.</strong> No more chasing payments.</p>' +
              '</div>' +

            '</div>' +

            /* CTA + trust badges */
            '<div class="cro-12316-story__cta">' +
              '<a href="#footer-callback" class="cro-12316-cta-btn">Request a Free Callback</a>' +
              '<div class="cro-12316-trust">' +
                '<span class="cro-12316-trust__item">' +
                  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.3333 9.203C11.3333 8.97253 11.3333 8.85733 11.368 8.75466C11.4688 8.45626 11.7345 8.34053 12.0007 8.21926C12.3 8.08293 12.4496 8.0148 12.5979 8.0028C12.7662 7.9892 12.9348 8.02546 13.0787 8.1062C13.2694 8.2132 13.4024 8.4166 13.5386 8.582C14.1675 9.34586 14.4819 9.72786 14.597 10.1491C14.6899 10.4889 14.6899 10.8444 14.597 11.1843C14.4292 11.7986 13.899 12.3136 13.5065 12.7903C13.3058 13.0341 13.2054 13.156 13.0787 13.2271C12.9348 13.3079 12.7662 13.3441 12.5979 13.3305C12.4496 13.3185 12.3 13.2504 12.0007 13.1141C11.7345 12.9928 11.4688 12.8771 11.368 12.5787C11.3333 12.476 11.3333 12.3608 11.3333 12.1303V9.203Z" stroke="#454E58"/><path d="M6.33334 14C7.25381 14.8889 8.74621 14.8889 9.66668 14" stroke="#454E58" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.66668 9.20298C4.66668 8.91285 4.65853 8.65211 4.42395 8.44811C4.33863 8.37391 4.22551 8.32238 3.99928 8.21931C3.70002 8.08305 3.55038 8.01491 3.40212 8.00291C2.95728 7.96691 2.71796 8.27051 2.46143 8.58205C1.83251 9.34591 1.51805 9.72785 1.40298 10.149C1.31013 10.4889 1.31013 10.8444 1.40298 11.1842C1.57081 11.7986 2.10102 12.3134 2.49348 12.7901C2.74087 13.0906 2.97719 13.3648 3.40212 13.3304C3.55038 13.3184 3.70002 13.2502 3.99928 13.1139C4.22551 13.0109 4.33863 12.9594 4.42395 12.8852C4.65853 12.6812 4.66668 12.4204 4.66668 12.1302V9.20298Z" stroke="#454E58"/><path d="M1.33334 10.6667V8.00001C1.33334 4.31811 4.31811 1.33334 8.00001 1.33334C11.6819 1.33334 14.6667 4.31811 14.6667 8.00001L14.6667 10.6667" stroke="#454E58" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                  'Speak to a real person' +
                '</span>' +
                '<span class="cro-12316-trust__item">' +
                  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12.4725 2.33024C11.211 1.70256 9.66727 1.33334 8 1.33334C6.33273 1.33334 4.789 1.70256 3.52744 2.33024C2.90879 2.63805 2.59946 2.79196 2.29973 3.27586C2 3.75978 2 4.22833 2 5.16544V7.49141C2 11.2803 5.02824 13.3869 6.782 14.2892C7.27113 14.5409 7.51567 14.6667 8 14.6667C8.48433 14.6667 8.72887 14.5409 9.21793 14.2892C10.9717 13.3869 14 11.2803 14 7.49141V5.16544C14 4.22834 14 3.75978 13.7003 3.27586C13.4005 2.79195 13.0912 2.63805 12.4725 2.33024Z" stroke="#454E58" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 7.66668C6 7.66668 6.9386 7.83461 7.33333 9.00001C7.33333 9.00001 8.33333 7.00001 10 6.33334" stroke="#454E58" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                  'No upfront fees' +
                '</span>' +
              '</div>' +
            '</div>' +

          '</div>' +
        '</section>'
      );
    }

    /* ─── Inject story section before section#footer-callback ─── */
    function injectStory() {
      if (document.querySelector('.cro-12316-story')) return;
      var target = document.querySelector('section#footer-callback');
      if (target) {
        target.insertAdjacentHTML('beforebegin', getSectionHtml());
      }
    }

    /* ─── Build media logos HTML ─── */
    function getMediaHtml() {
      return (
        '<section class="cro-12316-media" style="display:none">' +
          '<div class="cro-12316-media__container">' +
            '<h2 class="cro-12316-media__heading">Recognised by trusted media across South Africa.</h2>' +
            '<div class="cro-12316-media__logos">' +
              '<div class="cro-12316-media__logo-card"><img class="cro-12316-media__logo-img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Media-1.png" alt="702" /></div>' +
              '<div class="cro-12316-media__logo-card"><img class="cro-12316-media__logo-img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Media-2.png" alt="News24" /></div>' +
              '<div class="cro-12316-media__logo-card"><img class="cro-12316-media__logo-img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Media-3.png" alt="Power 98.7" /></div>' +
              '<div class="cro-12316-media__logo-card"><img class="cro-12316-media__logo-img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Media-4.png" alt="Sowetan" /></div>' +
              '<div class="cro-12316-media__logo-card"><img class="cro-12316-media__logo-img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Media-5.png" alt="Netwerk 24" /></div>' +
              '<div class="cro-12316-media__logo-card"><img class="cro-12316-media__logo-img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Media-6.png" alt="eNCA" /></div>' +
            '</div>' +
            '<div class="cro-12316-media__google">' +
              '<div class="cro-12316-media__google-top">' +
                '<div class="cro-12316-media__stars">' 
                  +review_Star_Svg+review_Star_Svg+review_Star_Svg+review_Star_Svg+review_Star_Svg_2+'' +
                '</div>' +
                '<span class="cro-12316-media__google-score">4.4/5</span>' +
                '<span class="cro-12316-media__google-wordmark">' +
                  '<img class="cro-12316-Google__logo-img" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-google.png" alt="Google logo">' +
                '</span>' +
              '</div>' +
              '<p class="cro-12316-media__google-text">Rating &middot; <a href="TODO_GOOGLE_REVIEWS_URL" target="_blank" rel="noopener noreferrer" class="cro-12316-media__google-link">3,103+ verified reviews</a></p>' +
            '</div>' +
          '</div>' +
        '</section>'
      );
    }

    /* ─── Inject media logos section after .cro-12316-story ─── */
    function injectMedia() {
      if (document.querySelector('.cro-12316-media')) return;
      var story = document.querySelector('.cro-12316-story');
      if (story) {
        story.insertAdjacentHTML('afterend', getMediaHtml());
      }
    }

    /* ─── Build Erica quote HTML ─── */
    function getQuoteHtml() {
      return (
        '<section class="cro-12316-quote" style="display:none">' +
        '<div class="cro-12316-quote-wrapper">'+
          '<span class="cro-12316-quote__deco cro-12316-quote__deco--open">&#8220;</span>' +
          '<div class="cro-12316-quote__inner">' +
            '<p class="cro-12316-quote__label">In Erica&#8217;s Own Words</p>' +
            '<p class="cro-12316-quote__text">&#8220;I wanted to give my children everything. I had taken different debts and was coming to work not knowing how to survive. DebtBusters brought my payments down from R10,000 a month to R3,000. Now I can breathe.&#8221;</p>' +
            '<p class="cro-12316-quote__cite">&#8212; Erica, Mother of Two</p>' +
          '</div>' +
          '<span class="cro-12316-quote__deco cro-12316-quote__deco--close">&#8221;</span>' +
          '</div>'+
        '</section>'
      );
    }

    /* ─── Inject quote section after .cro-12316-media ─── */
    function injectQuote() {
      if (document.querySelector('.cro-12316-quote')) return;
      var media = document.querySelector('.cro-12316-media');
      if (media) {
        media.insertAdjacentHTML('afterend', getQuoteHtml());
      }
    }

    var new_card= `<div class="cro-12316-savings__card card-1">
        <div class="cro-12316-savings__card-wrapper">
        <div class="cro-12316-savings__card-top_left">
            <img class="cro-12316-savings__photo" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Content-1.png" alt="Renecia">
        </div>
        <div class="cro-12316-savings__card-top_right">
            <p class="cro-12316-savings__quote"><strong>“DebtBusters reduced my monthly instalment by more than half. I </strong>now tell all my friends and family about them. Life is exciting again.”</p>
            <div class="cro-12316-savings__meta">
            <span class="cro-12316-savings__name">Erica 
                <span class="cro-12316-savings__sep">|</span><span class="cro-gray-text"> Cape Town</span></span>
                <span class="cro-12316-savings__saved">Saved R7,000/month</span>
            </div>
            <div class="cro-12316-savings__bar">
                <div class="cro-12316-savings__bar-fill" style="width:60%">

                </div>
            </div>
            <div class="cro-12316-savings__amounts">
                <span class="cro-12316-savings__before">R10,000/month</span>
                <span class="cro-12316-savings__arrow"><img class="cro-12316-right-arrow" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Arrow.png" alt=""></span>
                <span class="cro-12316-savings__after">R3,000/month</span>
            </div>
        </div>
        </div>
    </div>
    <div class="cro-12316-savings__card card-2">
        <div class="cro-12316-savings__card-wrapper">
        <div class="cro-12316-savings__card-top_left">
            <img class="cro-12316-savings__photo" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Content-2.png" alt="Renecia">
        </div>
        <div class="cro-12316-savings__card-top_right">
            <p class="cro-12316-savings__quote"><strong>“I now save monthly and have extra cash.</strong> I won’t make the same mistakes again. I am hopeful for the future.”</p>
            <div class="cro-12316-savings__meta">
            <span class="cro-12316-savings__name">Renecia 
                <span class="cro-12316-savings__sep">|</span><span class="cro-gray-text"> Johannesburg</span></span>
                <span class="cro-12316-savings__saved">Saved R6,000/month</span>
            </div>
            <div class="cro-12316-savings__bar">
                <div class="cro-12316-savings__bar-fill" style="width:60%">

                </div>
            </div>
            <div class="cro-12316-savings__amounts">
                <span class="cro-12316-savings__before">R10,000/month</span>
                <span class="cro-12316-savings__arrow"><img class="cro-12316-right-arrow" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Arrow.png" alt=""></span>
                <span class="cro-12316-savings__after">R4,000/month</span>
            </div>
        </div>
        </div>
    </div>
    <div class="cro-12316-savings__card card-3">
        <div class="cro-12316-savings__card-wrapper">
        <div class="cro-12316-savings__card-top_left">
            <img class="cro-12316-savings__photo" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Content-3.png" alt="Renecia">
        </div>
        <div class="cro-12316-savings__card-top_right">
            <p class="cro-12316-savings__quote">“The consultant was with me every step of the way, even after I cleared my debt.<strong> I cannot recommend DebtBusters enough.”</strong></p>
            <div class="cro-12316-savings__meta">
            <span class="cro-12316-savings__name">Willem 
                <span class="cro-12316-savings__sep">|</span><span class="cro-gray-text"> Stilbaai</span></span>
                <span class="cro-12316-savings__saved">Saved R4,300/month</span>
            </div>
            <div class="cro-12316-savings__bar">
                <div class="cro-12316-savings__bar-fill" style="width:60%">

                </div>
            </div>
            <div class="cro-12316-savings__amounts">
                <span class="cro-12316-savings__before">R8,500/month</span>
                <span class="cro-12316-savings__arrow"><img class="cro-12316-right-arrow" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Arrow.png" alt=""></span>
                <span class="cro-12316-savings__after">R4,200/month</span>
            </div>
        </div>
        </div>
    </div>`;

    var review_Star_Svg =`<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
  <g clip-path="url(#clip0_138_5545)">
    <path d="M22.7633 8.78731L14.4938 8.25375L11.3727 0.424438L8.25163 8.25375L0 8.78731L6.33099 14.1758L4.25028 22.3385L11.3727 17.8303L18.4951 22.3385L16.4144 14.1758L22.7633 8.78731Z" fill="#F6BE34"/>
    <path d="M16.4132 14.1758L18.4939 22.3385L11.3715 17.8303V0.424438L14.4925 8.25375L22.762 8.78731L16.4132 14.1758Z" fill="#F6BE33"/>
  </g>
  <defs>
    <clipPath id="clip0_138_5545">
      <rect width="22.7633" height="22.7633" fill="white"/>
    </clipPath>
  </defs>
</svg>`;

    /* ─── Build savings testimonials HTML ─── */
    function getSavingsHtml() {
      var headphoneIcon = '<svg class="cro-12316-trust__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.3333 9.203C11.3333 8.97253 11.3333 8.85733 11.368 8.75466C11.4688 8.45626 11.7345 8.34053 12.0007 8.21926C12.3 8.08293 12.4496 8.0148 12.5979 8.0028C12.7662 7.9892 12.9348 8.02546 13.0787 8.1062C13.2694 8.2132 13.4024 8.4166 13.5386 8.582C14.1675 9.34586 14.4819 9.72786 14.597 10.1491C14.6899 10.4889 14.6899 10.8444 14.597 11.1843C14.4292 11.7986 13.899 12.3136 13.5065 12.7903C13.3058 13.0341 13.2054 13.156 13.0787 13.2271C12.9348 13.3079 12.7662 13.3441 12.5979 13.3305C12.4496 13.3185 12.3 13.2504 12.0007 13.1141C11.7345 12.9928 11.4688 12.8771 11.368 12.5787C11.3333 12.476 11.3333 12.3608 11.3333 12.1303V9.203Z" stroke="#454E58"/><path d="M6.33334 14C7.25381 14.8889 8.74621 14.8889 9.66668 14" stroke="#454E58" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.66668 9.20298C4.66668 8.91285 4.65853 8.65211 4.42395 8.44811C4.33863 8.37391 4.22551 8.32238 3.99928 8.21931C3.70002 8.08305 3.55038 8.01491 3.40212 8.00291C2.95728 7.96691 2.71796 8.27051 2.46143 8.58205C1.83251 9.34591 1.51805 9.72785 1.40298 10.149C1.31013 10.4889 1.31013 10.8444 1.40298 11.1842C1.57081 11.7986 2.10102 12.3134 2.49348 12.7901C2.74087 13.0906 2.97719 13.3648 3.40212 13.3304C3.55038 13.3184 3.70002 13.2502 3.99928 13.1139C4.22551 13.0109 4.33863 12.9594 4.42395 12.8852C4.65853 12.6812 4.66668 12.4204 4.66668 12.1302V9.20298Z" stroke="#454E58"/><path d="M1.33334 10.6667V8.00001C1.33334 4.31811 4.31811 1.33334 8.00001 1.33334C11.6819 1.33334 14.6667 4.31811 14.6667 8.00001L14.6667 10.6667" stroke="#454E58" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      var shieldIcon = '<svg class="cro-12316-trust__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12.4725 2.33024C11.211 1.70256 9.66727 1.33334 8 1.33334C6.33273 1.33334 4.789 1.70256 3.52744 2.33024C2.90879 2.63805 2.59946 2.79196 2.29973 3.27586C2 3.75978 2 4.22833 2 5.16544V7.49141C2 11.2803 5.02824 13.3869 6.782 14.2892C7.27113 14.5409 7.51567 14.6667 8 14.6667C8.48433 14.6667 8.72887 14.5409 9.21793 14.2892C10.9717 13.3869 14 11.2803 14 7.49141V5.16544C14 4.22834 14 3.75978 13.7003 3.27586C13.4005 2.79195 13.0912 2.63805 12.4725 2.33024Z" stroke="#454E58" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 7.66668C6 7.66668 6.9386 7.83461 7.33333 9.00001C7.33333 9.00001 8.33333 7.00001 10 6.33334" stroke="#454E58" stroke-linecap="round" stroke-linejoin="round"/></svg>';

      return (
        '<section class="cro-12316-savings" style="display:none">' +
          '<div class="cro-12316-savings__container">' +
            '<h2 class="cro-12316-savings__heading">See exactly how much you could save.</h2>' +
            '<p class="cro-12316-savings__subtext">On average our clients reduce monthly payments by 50%</p>' +
            '<div class="cro-12316-savings__cards"> '+new_card+'' +
            '</div>' +
            '<div class="cro-12316-savings__progress"><div class="cro-12316-savings__progress-fill"></div></div>' +

            /* CTA reuses existing button + trust badge styles */
            '<div class="cro-12316-story__cta">' +
              '<a href="#footer-callback" class="cro-12316-cta-btn">Request a Free Callback</a>' +
              '<div class="cro-12316-trust">' +
                '<span class="cro-12316-trust__item">' + headphoneIcon + 'Speak to a real person</span>' +
                '<span class="cro-12316-trust__item">' + shieldIcon + 'No upfront fees</span>' +
              '</div>' +
            '</div>' +

          '</div>' +
        '</section>'
      );
    }

    var review_Star_Svg_2 = `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
  <g clip-path="url(#clip0_138_5561)">
    <path d="M22.764 8.78731L14.4945 8.25375L11.3735 0.424438L8.25237 8.25375L0.000732422 8.78731L6.33172 14.1758L4.25101 22.3385L11.3735 17.8303L18.4959 22.3385L16.4152 14.1758L22.764 8.78731Z" fill="#F7BE34"/>
    <path d="M16.4139 14.1758L18.4946 22.3385L11.3722 17.8303V0.424438L14.4932 8.25375L22.7627 8.78731L16.4139 14.1758Z" fill="#DADCE0"/>
  </g>
  <defs>
    <clipPath id="clip0_138_5561">
      <rect width="22.7633" height="22.7633" fill="white"/>
    </clipPath>
  </defs>
</svg>`;

    /* ─── Inject savings section after .cro-12316-quote ─── */
    function injectSavings() {
      if (document.querySelector('.cro-12316-savings')) return;
      var quote = document.querySelector('.cro-12316-quote');
      if (quote) {
        quote.insertAdjacentHTML('afterend', getSavingsHtml());
        var savingsTrack = document.querySelector('.cro-12316-savings__cards');
        var savingsFill  = document.querySelector('.cro-12316-savings__progress-fill');
        if (savingsTrack && savingsFill) {
          savingsFill.style.width = ((savingsTrack.clientWidth / savingsTrack.scrollWidth) * 100) + '%';
          savingsTrack.addEventListener('scroll', function () {
            savingsFill.style.width = (((savingsTrack.clientWidth + savingsTrack.scrollLeft) / savingsTrack.scrollWidth) * 100) + '%';
          });
        }
      }
    }

    /* ─── Build authority / trust bar HTML ─── */
    function getAuthorityHtml() {
      return (
        '<section class="cro-12316-authority" style="display:none">' +
          '<div class="cro-12316-authority__container">' +

            '<div class="cro-12316-authority__badges">' +
              '<div class="cro-12316-authority__badge-row">' +
                '<img class="cro-12316-authority__badge-img img-1" src="https://www.debtbusters.co.za/uploads/0b30cc7a-6e4a-4435-9e16-b834a0e7827d__ecio_240.webp" alt="9X Debt Review Award Winner" />' +
                '<img class="cro-12316-authority__badge-img img-2" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Cro-Nda-Registered_2.png" alt="NDCA Registered" />' +
              '</div>' +
            '</div>' +

            '<div class="cro-12316-authority__content">' +
              '<h2 class="cro-12316-authority__heading">Millions of South Africans trust us to help them take control</h2>' +
              '<p class="cro-12316-authority__text"><strong>DebtBusters is South Africa&#8217;s leading and most trusted debt management company.</strong> We help South Africans bust debt for good, through expert advice, personalised plans, and real, lasting results. <strong>It gets better, and we&#8217;re here to help you get there.</strong></p>' +
              '<p class="cro-12316-authority__text">We&#8217;ve helped thousands of South Africans stop drowning in debt and start living again. Expert advice, a personalised plan, and real results &#8212; not promises.</p>' +
              '<p class="cro-12316-authority__text"><strong>DebtBusters named Top National Debt Counsellor:</strong> 9-time winner at the Debt Review Awards</p>' +
            '</div>' +

          '</div>' +
        '</section>'
      );
    }

    function inject_Button(){
      return(`<div class="cro-12316-form-whatsapp" style="display:none">
        <div class="cro-12316-form-whatsapp-wrapper">
            <div class="cro-12316-form-whatsapp-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_138_5420)">
    <path d="M17.4715 14.3819C17.1745 14.2329 15.7135 13.5149 15.4415 13.4149C15.1685 13.3159 14.9705 13.2669 14.7715 13.5649C14.5745 13.8619 14.0045 14.5309 13.8315 14.7289C13.6585 14.9279 13.4845 14.9519 13.1875 14.8039C12.8905 14.6539 11.9325 14.3409 10.7975 13.3289C9.91453 12.5409 9.31753 11.5679 9.14453 11.2699C8.97153 10.9729 9.12653 10.8119 9.27453 10.6639C9.40853 10.5309 9.57253 10.3169 9.72053 10.1439C9.86953 9.9699 9.91853 9.8459 10.0185 9.6469C10.1175 9.4489 10.0685 9.2759 9.99353 9.1269C9.91853 8.9779 9.32453 7.5149 9.07753 6.9199C8.83553 6.3409 8.59053 6.4199 8.40853 6.4099C8.23553 6.4019 8.03753 6.3999 7.83853 6.3999C7.64053 6.3999 7.31853 6.4739 7.04653 6.7719C6.77453 7.0689 6.00653 7.7879 6.00653 9.2509C6.00653 10.7129 7.07153 12.1259 7.21953 12.3249C7.36853 12.5229 9.31553 15.5249 12.2965 16.8119C13.0055 17.1179 13.5585 17.3009 13.9905 17.4369C14.7025 17.6639 15.3505 17.6319 15.8615 17.5549C16.4325 17.4699 17.6195 16.8359 17.8675 16.1419C18.1155 15.4479 18.1155 14.8529 18.0405 14.7289C17.9665 14.6049 17.7695 14.5309 17.4715 14.3819Z" fill="white"/>
    <path d="M12 0C5.373 0 0 5.373 0 12C0 14.123 0.555 16.116 1.528 17.845L0.057 23.571C0.0337891 23.6561 0.0334783 23.7457 0.0560989 23.8309C0.0787196 23.9161 0.123468 23.9939 0.185806 24.0562C0.248145 24.1185 0.325858 24.1633 0.411067 24.1859C0.496275 24.2085 0.58595 24.2082 0.671 24.185L6.392 22.715C8.12851 23.5944 10.0538 24.0356 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM12 21.818C10.2381 21.8174 8.50896 21.3413 6.995 20.44L6.636 20.227L2.922 21.182L3.9 17.569L3.667 17.197C2.69418 15.6383 2.17957 13.8374 2.182 12C2.182 6.57 6.57 2.182 12 2.182C17.43 2.182 21.818 6.57 21.818 12C21.818 17.43 17.43 21.818 12 21.818Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_138_5420">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
            </div>
            <div class="cro-12316-form-whatsapp-text">
                Or Prefer WhatsApp? Message us now
            </div>


        </div>
    </div>`)
    }

    function inject_image(){
      return(`<div class="cro-12316-hero-banner-bottom" style="display:none">
        <div class="cro-12316-hero-banner-inner">
            <img class="cro-mobile-image" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/AB+Test+%7C+Debt+Solutions+cold-traffic+LP+%7C+CRO-12316/Bottom-Banner_Mobile.png" alt="">
        </div>
    </div>`)
    }

    /* ─── Inject authority section after .cro-12316-savings ─── */
    function injectAuthority() {
      if (document.querySelector('.cro-12316-authority')) return;
      var savings = document.querySelector('.cro-12316-savings');
      if (savings) {
        savings.insertAdjacentHTML('afterend', getAuthorityHtml());
      }
    }

    /* ─── Build 3-step process HTML ─── */
    function getStepsHtml() {
      var headphoneIcon = '<svg class="cro-12316-trust__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.3333 9.203C11.3333 8.97253 11.3333 8.85733 11.368 8.75466C11.4688 8.45626 11.7345 8.34053 12.0007 8.21926C12.3 8.08293 12.4496 8.0148 12.5979 8.0028C12.7662 7.9892 12.9348 8.02546 13.0787 8.1062C13.2694 8.2132 13.4024 8.4166 13.5386 8.582C14.1675 9.34586 14.4819 9.72786 14.597 10.1491C14.6899 10.4889 14.6899 10.8444 14.597 11.1843C14.4292 11.7986 13.899 12.3136 13.5065 12.7903C13.3058 13.0341 13.2054 13.156 13.0787 13.2271C12.9348 13.3079 12.7662 13.3441 12.5979 13.3305C12.4496 13.3185 12.3 13.2504 12.0007 13.1141C11.7345 12.9928 11.4688 12.8771 11.368 12.5787C11.3333 12.476 11.3333 12.3608 11.3333 12.1303V9.203Z" stroke="#454E58"/><path d="M6.33334 14C7.25381 14.8889 8.74621 14.8889 9.66668 14" stroke="#454E58" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.66668 9.20298C4.66668 8.91285 4.65853 8.65211 4.42395 8.44811C4.33863 8.37391 4.22551 8.32238 3.99928 8.21931C3.70002 8.08305 3.55038 8.01491 3.40212 8.00291C2.95728 7.96691 2.71796 8.27051 2.46143 8.58205C1.83251 9.34591 1.51805 9.72785 1.40298 10.149C1.31013 10.4889 1.31013 10.8444 1.40298 11.1842C1.57081 11.7986 2.10102 12.3134 2.49348 12.7901C2.74087 13.0906 2.97719 13.3648 3.40212 13.3304C3.55038 13.3184 3.70002 13.2502 3.99928 13.1139C4.22551 13.0109 4.33863 12.9594 4.42395 12.8852C4.65853 12.6812 4.66668 12.4204 4.66668 12.1302V9.20298Z" stroke="#454E58"/><path d="M1.33334 10.6667V8.00001C1.33334 4.31811 4.31811 1.33334 8.00001 1.33334C11.6819 1.33334 14.6667 4.31811 14.6667 8.00001L14.6667 10.6667" stroke="#454E58" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      var shieldIcon = '<svg class="cro-12316-trust__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12.4725 2.33024C11.211 1.70256 9.66727 1.33334 8 1.33334C6.33273 1.33334 4.789 1.70256 3.52744 2.33024C2.90879 2.63805 2.59946 2.79196 2.29973 3.27586C2 3.75978 2 4.22833 2 5.16544V7.49141C2 11.2803 5.02824 13.3869 6.782 14.2892C7.27113 14.5409 7.51567 14.6667 8 14.6667C8.48433 14.6667 8.72887 14.5409 9.21793 14.2892C10.9717 13.3869 14 11.2803 14 7.49141V5.16544C14 4.22834 14 3.75978 13.7003 3.27586C13.4005 2.79195 13.0912 2.63805 12.4725 2.33024Z" stroke="#454E58" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 7.66668C6 7.66668 6.9386 7.83461 7.33333 9.00001C7.33333 9.00001 8.33333 7.00001 10 6.33334" stroke="#454E58" stroke-linecap="round" stroke-linejoin="round"/></svg>';

      return (
        '<section class="cro-12316-steps" style="display:none">' +
          '<div class="cro-12316-steps__container">' +
            '<h2 class="cro-12316-steps__heading">Get started in three simple steps</h2>' +
            '<p class="cro-12316-steps__subtext">No paperwork. No judgement. Just a clear path forward.</p>' +
            '<div class="cro-12316-steps__cards">' +

              '<div class="cro-12316-steps__card">' +
                '<span class="cro-12316-steps__num">01</span>' +
                '<h3 class="cro-12316-steps__title">Tell us about your debt</h3>' +
                '<p class="cro-12316-steps__desc">Fill in the form. Takes less than 1 minute.</p>' +
              '</div>' +

              '<div class="cro-12316-steps__card">' +
                '<span class="cro-12316-steps__num">02</span>' +
                '<h3 class="cro-12316-steps__title">We call you back</h3>' +
                '<p class="cro-12316-steps__desc">A real debt counsellor calls you. No bots. No scripts.</p>' +
              '</div>' +

              '<div class="cro-12316-steps__card">' +
                '<span class="cro-12316-steps__num">03</span>' +
                '<h3 class="cro-12316-steps__title">One affordable payment</h3>' +
                '<p class="cro-12316-steps__desc">We negotiate with your creditors and set up one reduced monthly payment.</p>' +
              '</div>' +

            '</div>' +
            '<div class="cro-12316-story__cta">' +
              '<a href="#footer-callback" class="cro-12316-cta-btn">Request a Free Callback</a>' +
              '<div class="cro-12316-trust">' +
                '<span class="cro-12316-trust__item">' + headphoneIcon + 'Speak to a real person</span>' +
                '<span class="cro-12316-trust__item">' + shieldIcon + 'No upfront fees</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</section>'
      );
    }

    /* ─── Inject steps section after .cro-12316-authority ─── */
    function injectSteps() {
      if (document.querySelector('.cro-12316-steps')) return;
      var authority = document.querySelector('.cro-12316-authority');
      if (authority) {
        authority.insertAdjacentHTML('afterend', getStepsHtml());
      }
    }

    /* ─── Build Google reviews HTML ─── */
    function getReviewsHtml() {
      var star = '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none"><path d="M8.83182 0.208224C8.99349 -0.069344 9.39448 -0.0693441 9.55615 0.208224L12.3529 5.00989C12.4121 5.11157 12.5113 5.18367 12.6263 5.20857L18.0572 6.38461C18.3712 6.45259 18.4951 6.83396 18.281 7.07349L14.5786 11.2171C14.5002 11.3049 14.4623 11.4215 14.4742 11.5386L15.0339 17.0671C15.0663 17.3867 14.7419 17.6224 14.4479 17.4928L9.363 15.2521C9.25532 15.2046 9.13265 15.2046 9.02498 15.2521L3.94004 17.4928C3.6461 17.6224 3.32169 17.3867 3.35404 17.0671L3.9138 11.5386C3.92565 11.4215 3.88775 11.3049 3.80935 11.2171L0.106927 7.07349C-0.107098 6.83396 0.0168157 6.45259 0.330757 6.38461L5.76164 5.20857C5.87665 5.18367 5.97588 5.11157 6.0351 5.00989L8.83182 0.208224Z" fill="#FFC107"/></svg>';
      var stars5 = star + star + star + star + star;

      function goog(uid) {
        return '<svg xmlns="http://www.w3.org/2000/svg" width="73" height="24" viewBox="0 0 73 24" fill="none">' +
          '<g clip-path="url(#' + uid + ')">' +
          '<path d="M70.7262 14.6675L72.7513 16.0202C72.0941 16.9902 70.522 18.6545 67.804 18.6545C64.4289 18.6545 61.9154 16.038 61.9154 12.7096C61.9154 9.16775 64.4556 6.76489 67.5199 6.76489C70.6018 6.76489 72.1117 9.22104 72.6004 10.547L72.8668 11.2235L64.9264 14.5162C65.5303 15.7087 66.4719 16.3139 67.804 16.3139C69.1364 16.3139 70.06 15.6553 70.7262 14.6675ZM64.5001 12.5229L69.8025 10.3157C69.5094 9.57718 68.6391 9.05218 67.5997 9.05218C66.2764 9.05218 64.4379 10.2269 64.5001 12.5229Z" fill="#FF302F"/>' +
          '<path d="M58.0873 0.704346H60.6452V18.1115H58.0873V0.704346Z" fill="#20B15A"/>' +
          '<path d="M54.0549 7.22767H56.5241V17.8001C56.5241 22.1874 53.9394 23.994 50.884 23.994C48.0063 23.994 46.2744 22.054 45.626 20.4788L47.8908 19.5354C48.2993 20.5054 49.2853 21.6535 50.884 21.6535C52.8469 21.6535 54.0549 20.4342 54.0549 18.1561V17.3018H53.9661C53.3798 18.0137 52.2607 18.6544 50.8396 18.6544C47.873 18.6544 45.1551 16.0647 45.1551 12.7275C45.1551 9.37239 47.873 6.7561 50.8396 6.7561C52.2519 6.7561 53.3798 7.38796 53.9661 8.0821H54.0549V7.22767ZM54.2324 12.7275C54.2324 10.6272 52.838 9.09653 51.0616 9.09653C49.2674 9.09653 47.7575 10.6272 47.7575 12.7275C47.7575 14.801 49.2674 16.305 51.0616 16.305C52.8382 16.314 54.2326 14.801 54.2326 12.7275" fill="#3686F7"/>' +
          '<path d="M31.1128 12.6828C31.1128 16.1091 28.4483 18.6275 25.1797 18.6275C21.9113 18.6275 19.2466 16.1002 19.2466 12.6828C19.2466 9.23882 21.9113 6.72925 25.1797 6.72925C28.4483 6.72925 31.1128 9.23882 31.1128 12.6828ZM28.5193 12.6828C28.5193 10.5471 26.9738 9.07853 25.1797 9.07853C23.3857 9.07853 21.8401 10.5471 21.8401 12.6828C21.8401 14.8008 23.3857 16.2871 25.1797 16.2871C26.9739 16.2871 28.5193 14.8008 28.5193 12.6828Z" fill="#FF302F"/>' +
          '<path d="M44.0716 12.7096C44.0716 16.1359 41.407 18.6543 38.1385 18.6543C34.8699 18.6543 32.2054 16.1357 32.2054 12.7096C32.2054 9.26561 34.8699 6.76489 38.1385 6.76489C41.407 6.76489 44.0716 9.25675 44.0716 12.7096ZM41.4691 12.7096C41.4691 10.5739 39.9237 9.10532 38.1295 9.10532C36.3353 9.10532 34.7899 10.5739 34.7899 12.7096C34.7899 14.8276 36.3355 16.3139 38.1295 16.3139C39.9326 16.3139 41.4691 14.8187 41.4691 12.7096Z" fill="#FFBA40"/>' +
          '<path d="M9.49428 16.0469C5.7727 16.0469 2.85955 13.0389 2.85955 9.31001C2.85955 5.58129 5.7727 2.57329 9.49428 2.57329C11.5016 2.57329 12.9671 3.36529 14.0506 4.37987L15.836 2.59115C14.3261 1.14058 12.3099 0.0368652 9.49428 0.0368652C4.39611 0.0370081 0.106079 4.20201 0.106079 9.31001C0.106079 14.418 4.39611 18.5832 9.49428 18.5832C12.2477 18.5832 14.3261 17.6754 15.9515 15.9846C17.6212 14.3114 18.1364 11.962 18.1364 10.0576C18.1364 9.46129 18.0654 8.84729 17.9854 8.39344H9.49428V10.8674H15.5429C15.3652 12.416 14.8767 13.475 14.1573 14.1957C13.2869 15.0769 11.9103 16.0469 9.49428 16.0469Z" fill="#3686F7"/>' +
          '</g><defs><clipPath id="' + uid + '"><rect width="73" height="24" fill="white"/></clipPath></defs></svg>';
      }

      function card(initials, name, loc, text, uid) {
        return (
          '<div class="cro-12316-reviews__card">' +
            '<div class="cro-12316-reviews__card-head">' +
              '<div class="cro-12316-reviews__stars">' + stars5 + '</div>' +
              goog(uid) +
            '</div>' +
            '<p class="cro-12316-reviews__text">' + text + '</p>' +
            '<div class="cro-12316-reviews__author">' +
              '<div class="cro-12316-reviews__avatar">' + initials + '</div>' +
              '<div class="cro-12316-reviews__author-info">' +
                '<span class="cro-12316-reviews__name">' + name + (loc ? ', ' + loc : '') + '</span>' +
                '<span class="cro-12316-reviews__time">3 months ago</span>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      }

      return (
        '<section class="cro-12316-reviews" style="display:none">' +
          '<div class="cro-12316-reviews__container">' +
            '<h2 class="cro-12316-reviews__heading">Real results. Real people. Real stories of how it gets better.</h2>' +
            '<p class="cro-12316-reviews__subtext"><strong>Over 3,103 South Africans</strong> have rated us <strong>4.4/5 on Google.</strong> Here&#8217;s what some of them had to say.</p>' +
            '<div class="cro-12316-reviews__track">' +
              card('TC', 'Thulile Chonco', '', 'Definitely the best financial decision I have ever made. When it all becomes too much Debt busters sure comes in like a super hero to save the day. The process was easy and straightforward.', 'g12316a') +
              card('ED', 'Emily Davis', 'Cape Town', '&#8220;My wife and I cannot thank you enough. Debt Busters brought peace into our lives and probably saved our marriage.&#8221;', 'g12316b') +
              card('MI', 'Michaela', 'Gauteng', '&#8220;Debt Busters managed to lower my payments so I can afford to pay back my debts every month. I have learned a valuable lesson and I am better because of them.&#8221;', 'g12316c') +
              card('DY', 'Dylan', 'Western Cape', '&#8220;A fantastic experience from start to finish. I highly recommend Debt Busters to anyone looking for quality service.&#8221;', 'g12316d') +
            '</div>' +
            '<div class="cro-12316-reviews__progress"><div class="cro-12316-reviews__progress-fill"></div></div>' +
          '</div>' +
        '</section>'
      );
    }

    /* ─── Inject reviews section after .cro-12316-steps ─── */
    function injectReviews() {
      if (document.querySelector('.cro-12316-reviews')) return;
      var steps = document.querySelector('.cro-12316-steps');
      if (steps) {
        steps.insertAdjacentHTML('afterend', getReviewsHtml());
        var track = document.querySelector('.cro-12316-reviews__track');
        var fill  = document.querySelector('.cro-12316-reviews__progress-fill');
        if (track && fill) {
          fill.style.width = ((track.clientWidth / track.scrollWidth) * 100) + '%';
          track.addEventListener('scroll', function () {
            fill.style.width = (((track.clientWidth + track.scrollLeft) / track.scrollWidth) * 100) + '%';
          });
        }
      }
    }

    /* ─── Build FAQ accordion HTML ─── */
    function getFaqHtml() {
      var chevron = '<svg class="cro-12316-faq__chevron" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="#454E58" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

      function item(q, a, open) {
        return (
          '<div class="cro-12316-faq__item' + (open ? ' cro-12316-faq__item--open' : '') + '">' +
            '<button class="cro-12316-faq__q" type="button">' +
              '<span class="cro-12316-faq__q-text">' + q + '</span>' +
              chevron +
            '</button>' +
            '<div class="cro-12316-faq__a">' +
              '<div class="cro-12316-faq__a-inner">' +
                '<p class="cro-12316-faq__a-text">' + a + '</p>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      }

      return (
        '<section class="cro-12316-faq" style="display:none">' +
          '<div class="cro-12316-faq__container">' +
            '<h2 class="cro-12316-faq__heading">Questions we get asked every day.</h2>' +
            '<p class="cro-12316-faq__subtext">Seven debts. One phone call. And a plan that changed everything.</p>' +
            '<div class="cro-12316-faq__list">' +
              item(
                'Will debt counselling affect my credit score?',
                'Yes, temporarily. While under debt counselling your credit score will reflect this. But once you complete the process and become debt free, the flag is removed and you can rebuild your credit.',
                true
              ) +
              item(
                'How long does the process take?',
                'The process typically takes 3&#8211;5 years depending on your debt level and monthly payment amount. Your debt counsellor will give you a personalised timeline during your free consultation.'
              ) +
              item(
                'Will I be protected from legal action?',
                'Yes. Once you apply for debt counselling, you are legally protected from creditors taking legal action against you. This protection applies as long as you are under the process and making your monthly payments.'
              ) +
              item(
                'Can I still rent a property under debt counselling?',
                'Yes. Debt counselling does not prevent you from renting a property. Landlords may check your credit, but your counsellor can provide a letter explaining your situation to support your application.'
              ) +
              item(
                'Can I be protected from appearing in court?',
                'Yes. Debt counselling provides legal protection which typically prevents creditors from summoning you to court over outstanding debts. Your counsellor handles all negotiations directly with your creditors.'
              ) +
              item(
                'Do I qualify for debt counselling?',
                'You qualify if you are over-indebted &#8212; meaning your monthly income is not enough to cover all your debt repayments and living expenses. You must be a South African citizen or permanent resident with a regular income.'
              ) +
            '</div>' +
          '</div>' +
        '</section>'
      );
    }

    /* ─── Inject FAQ section after .cro-12316-reviews ─── */
    function injectFaq() {
      if (document.querySelector('.cro-12316-faq')) return;
      var reviews = document.querySelector('.cro-12316-reviews');
      if (reviews) {
        reviews.insertAdjacentHTML('afterend', getFaqHtml());
      }
    }

    function injectnewBtnWatsapp() {
      if (document.querySelector('.cro-12316-form-whatsapp')) return;
      var reviews = document.querySelector('.callback-form .submit-buttons');
      if (reviews) {
        reviews.insertAdjacentHTML('afterend', inject_Button());
      }
    }

    function injectnewBtn() {
      if (document.querySelector('.cro-12316-hero-banner-bottom')) return;
      var reviews = document.querySelector('section#footer-callback .container >div:first-child');
      if (reviews) {
        reviews.insertAdjacentHTML('afterend', inject_image());
      }
    }


    

    function init() {
      injectStory();
      injectMedia();
      injectQuote();
      injectSavings();
      injectAuthority();
      injectSteps();
      injectReviews();
      injectFaq();
      // injectnewBtnWatsapp();
      injectnewBtn();

      var formH2 = document.querySelector('section#footer-callback .container .md\\:px-5 h2');
      if (formH2) formH2.textContent = 'Take The First Step Towards Financial Freedom.';

      var formLead = document.querySelector('section#footer-callback .container .md\\:px-5 p.lead');
      if (formLead) formLead.innerHTML = '<strong>You\'ve seen what Erica did with one phone call.</strong> <span><strong>1 Million plus</strong> South Africans have done the same. Your turn starts here. Submit the form or call now <strong><a class="cro-number" href="tel:0861365910" target="_blank">086 999 0606</a></strong></span>';

      waitForElement('.callback-form #main-form-999 #name', function () {
        var parent = document.querySelector('#name').closest('div');
        if (parent) parent.classList.add('cro-12316-from-name-parent');
      });
      waitForElement('.callback-form #main-form-999 #surname', function () {
        var parent = document.querySelector('#surname').closest('div');
        if (parent) parent.classList.add('cro-12316-from-surname-parent');
      });
      waitForElement('.callback-form #main-form-999 #contactNumber', function () {
        var parent = document.querySelector('#contactNumber').closest('div');
        if (parent) parent.classList.add('cro-12316-from-conNumber-parent');
      });
      waitForElement('.callback-form #main-form-999 #email', function () {
        var parent = document.querySelector('#email').closest('div');
        if (parent) parent.classList.add('cro-12316-from-email-parent');
      });
      waitForElement('.callback-form #main-form-999 #idNumber', function () {
        var parent = document.querySelector('#idNumber').closest('div');
        if (parent) parent.classList.add('cro-12316-from-idNumber-parent');
      });

      waitForElement('.callback-form p.terms', function () {
        var terms = document.querySelector('.callback-form p.terms');
        if (terms) terms.innerHTML = 'By submitting this form you agree to our <a href="https://www.debtbusters.co.za/privacy-policy/" class="underline" target="_blank">Privacy Policy</a> and <a href="https://www.debtbusters.co.za/terms-and-conditions/" class="underline" target="_blank">Terms &amp; Conditions.</a>Your information is 100% encrypted &amp; confidential.';
      });

      addClass('body', variation_name);
    }

    function croEventHandkler() {
      /* Smooth scroll the CTA button down to the existing callback form */
      live('.cro-12316-cta-btn', 'click', function (e) {
        e.preventDefault();
        var target = document.querySelector('section#footer-callback');
        if (target) {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY,
            behavior: 'smooth'
          });
        }
      });

      /* FAQ accordion: close all, then open the clicked item (toggle) */
      live('.cro-12316-faq__q', 'click', function (e) {
        e.preventDefault();
        var item = this.parentElement;
        var isOpen = item.classList.contains('cro-12316-faq__item--open');
        var allItems = document.querySelectorAll('.cro-12316-faq__item');
        for (var i = 0; i < allItems.length; i++) {
          allItems[i].classList.remove('cro-12316-faq__item--open');
        }
        if (!isOpen) {
          item.classList.add('cro-12316-faq__item--open');
        }
      });
    }

    if (!window.cro_t_12316) {
      croEventHandkler();
      window.cro_t_12316 = true;
    }

    waitForElement('section#footer-callback', init);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();