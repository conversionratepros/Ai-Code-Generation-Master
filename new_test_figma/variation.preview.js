/* ============================================================
   CRO-12173 — OnePlan Homepage Relook — Variant B (v2)
   Target: https://www.oneplan.co.za/ (homepage only)
   Native header, footer and CALL ME modals are kept; everything
   inside #main-content-rb > .container-fluid-rb is hidden and
   replaced with the redesigned page (spec: Figma 44:5710 / 56:101).

   ASSUMPTIONS FLAGGED FOR SIGN-OFF:
   - App store badges have no URLs on the live homepage -> href "#".
   - Car & Household picker CTA reads "Get my Car quote".
   - Native header kept as-is (design header not rebuilt).
   ============================================================ */
(function () {
  'use strict';

  var PREFIX = 'cro12173';
  /* TODO before Convert deploy: swap to S3 bucket URL */
  var BASE = 'http://localhost:8763'; /* PREVIEW build — deploy file uses S3 */

  var A = {
    heroPhoto:   BASE + '/assets/img_section_40-5493.png',
    iconHealth:  BASE + '/assets/icon_health-1_121-605.svg',
    iconPet:     BASE + '/assets/icon_hero-icon_121-609.svg',
    iconGap:     BASE + '/assets/icon_gap-1_121-540.svg',
    iconCar:     BASE + '/assets/icon_hero-icon_121-568.svg',
    hpWhite:     BASE + '/assets/icon_hellopeter-blue-1_44-5955.svg',
    starsRow:    BASE + '/assets/icon_frame-9_74-1191.svg',
    btnPrev:     BASE + '/assets/icon_button-previous-reviews_44-5968.svg',
    btnNext:     BASE + '/assets/icon_button-next-reviews-margin_44-6072.svg',
    claimCard:   BASE + '/assets/img_oneplan-claim-card-1-a-nkosi-3_194-2080.png',
    pattern:     BASE + '/assets/icon_frame-21_194-2145.svg',
    handDesktop: BASE + '/assets/img_oneplan-card-in-hand-2-1_189-1911.png',
    handMobile:  BASE + '/assets-mobile/img_oneplan-card-in-hand-2-2_194-2277.png',
    arrow:       BASE + '/assets/icon_arrow_16.svg',
    circleClaim: BASE + '/assets/icon_text_44-6610.svg',
    circleWa:    BASE + '/assets/icon_text_44-6620.svg',
    phone:       BASE + '/assets/img_image-11_354-661.png',
    badgePlay:   BASE + '/assets/img_image-12_354-697.png',
    badgeApple:  BASE + '/assets/img_image-13_354-698.png',
    badgeHuawei: BASE + '/assets/img_image-14_354-699.png',
    /* the site's own assets — no hosting needed */
    hpBlue:  '/assets/2025/hellopeter-blue.svg',
    hpStars: '/assets/landings/img/hellopeterstars.svg'
  };

  var URLS = {
    health: 'https://health.oneplan.co.za/?referrer=getquoteHomePage',
    pet:    'https://www.onepet.co.za/?referrer=getquoteHomePage',
    gap:    'https://gap.oneplan.co.za/?Referrer=getquoteHomePage',
    car:    'https://oneplanshortterm.co.za/?referrer=getquoteHomePage',
    signup:   '/home/SignUpOnline',
    claims:   '/claims/claimsprocess',
    whatsapp: 'https://api.whatsapp.com/send?phone=27837945452&text=Hello',
    plans:    '/plans/PetPlans'
  };

  var PRODUCTS = {
    health: { label: 'Health',          sub: 'from R250<span>/mo</span>', cta: 'Get my Health quote', icon: A.iconHealth },
    pet:    { label: 'Pet',             sub: 'from R80<span>/mo</span>',  cta: 'Get my Pet quote',    icon: A.iconPet },
    gap:    { label: 'Gap',             sub: 'from R150<span>/mo</span>', cta: 'Get my Gap quote',    icon: A.iconGap },
    car:    { label: 'Car &amp; Household', sub: 'Tailored',              cta: 'Get my Car quote',    icon: A.iconCar }
  };

  /* ---------- helpers ---------- */

  function waitForElement(selector, fn) {
    var el = document.querySelector(selector);
    if (el) return fn(el);
    var obs = new MutationObserver(function () {
      var found = document.querySelector(selector);
      if (found) { obs.disconnect(); fn(found); }
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  function injectFont() {
    if (document.getElementById(PREFIX + '-font')) return;
    var l = document.createElement('link');
    l.id = PREFIX + '-font';
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Anek+Devanagari:wght@400;500;600;700&display=swap';
    document.head.appendChild(l);
  }

  /* read live Hellopeter numbers from the native block (fallback: design values) */
  function readHellopeter() {
    var out = { rating: '4.59', reviews: '23,019', trust: '10/10' };
    var el = document.querySelector('#hellopeter');
    if (el) {
      var t = el.textContent || '';
      var m = t.match(/rating of\s*([\d.]+)\s*from\s*([\d,]+)\s*reviews/i);
      if (m) { out.rating = m[1]; out.reviews = m[2]; }
      var tr = t.match(/([\d]+\/[\d]+)\s*Trust Index/i);
      if (tr) out.trust = tr[1];
    }
    return out;
  }

  /* ---------- templates ---------- */

  function radioTile(key, selected) {
    var p = PRODUCTS[key];
    return '' +
      '<button type="button" class="radio-tile' + (selected ? ' selected' : '') + '" data-product="' + key + '">' +
        '<span class="check">✓</span>' +
        '<img src="' + p.icon + '" alt="" class="tile-icon">' +
        '<span class="tile-text"><strong>' + p.label + '</strong><small>' + p.sub.replace('<span>', '<span class="permo">') + '</small></span>' +
      '</button>';
  }

  function heroHtml(hp) {
    return '' +
    '<section class="hero">' +
      '<div class="hero-photo" style="background-image:url(\'' + A.heroPhoto + '\')" aria-hidden="true"></div>' +
      '<div class="hero-inner">' +
        '<div class="hero-content">' +
          '<p class="eyebrow">Health · Pet · Gap · Car &amp; Home</p>' +
          '<h1>Insurance that pays<br>your <span class="hl">claims</span> upfront.</h1>' +
          '<p class="hero-sub">Settle your doctor, vet or hospital bill on the spot with your Oneplan Claim Card, never weeks out of pocket. See your price online in 2 minutes. No agent call needed.</p>' +
          '<div class="quote-card">' +
            '<p class="quote-card-title">What would you like to cover? Pick one to start.</p>' +
            '<div class="product-picker">' +
              radioTile('health', true) + radioTile('pet', false) + radioTile('gap', false) + radioTile('car', false) +
            '</div>' +
            '<div class="quote-cta-row">' +
              '<a href="' + URLS.health + '" class="btn-cyan btn-hero" data-role="picker-cta">Get my Health quote <img class="arrow-ic" src="' + A.arrow + '" alt=""></a>' +
              '<span class="minutes"><span class="clock"></span> About 2 minutes</span>' +
            '</div>' +
          '</div>' +
          '<p class="tcs">Ts&amp;Cs apply. Bryte licensed Insurer and Auth FSP(17703). Oneplan is a non-life Insurance product, not a medical aid.</p>' +
        '</div>' +
        '<div class="hero-photo-mobile" style="background-image:url(\'' + A.heroPhoto + '\')"></div>' +
      '</div>' +

      '<div class="hp-bar">' +
        '<span class="hp-cluster">' +
          '<img class="hp-logo" src="' + A.hpBlue + '" alt="hellopeter">' +
          '<span class="hp-score">' + hp.rating + '</span>' +
          '<img class="hp-stars" src="' + A.hpStars + '" alt="' + hp.rating + ' stars">' +
        '</span>' +
        '<span class="hp-dot"></span>' +
        '<span class="hp-cluster"><strong>' + hp.reviews + '</strong><span class="hp-muted">reviews</span></span>' +
        '<span class="hp-dot"></span>' +
        '<span class="hp-cluster"><strong>' + hp.trust + '</strong><span class="hp-muted">Trust Index</span></span>' +
      '</div>' +

      '<div class="hp-card-mobile">' +
        '<div class="hp-m-top">' +
          '<img class="hp-logo" src="' + A.hpBlue + '" alt="hellopeter">' +
          '<span class="hp-badge">' + hp.trust + ' Trust Index</span>' +
        '</div>' +
        '<div class="hp-m-rating">' +
          '<span class="hp-m-score">' + hp.rating + '</span>' +
          '<span class="hp-m-stars">' +
            '<img src="' + A.hpStars + '" alt="' + hp.rating + ' stars">' +
            '<small>Based on <b>' + hp.reviews + '</b> reviews</small>' +
          '</span>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function planCard(opts) {
    return '' +
    '<article class="plan-card' + (opts.featured ? ' featured' : '') + '">' +
      (opts.featured ? '<span class="pill-chosen">Most chosen</span>' : '') +
      '<span class="plan-icon"><img src="' + opts.icon + '" alt=""></span>' +
      '<div class="plan-title-block">' +
        '<h3>' + opts.title + '</h3>' +
        '<p class="price-pill' + (opts.tailored ? ' tailored' : '') + '">' + opts.price + '</p>' +
      '</div>' +
      '<p class="plan-body">' + opts.body + '</p>' +
      '<div class="plan-actions">' +
        '<a href="' + opts.url + '" class="btn-cyan btn-plan">Get online quote <img class="arrow-ic" src="' + A.arrow + '" alt=""></a>' +
        '<a href="' + URLS.plans + '" class="plan-link">See plans &amp; what\'s covered</a>' +
      '</div>' +
    '</article>';
  }

  function plansHtml() {
    return '' +
    '<section class="plans">' +
      '<div class="section-head">' +
        '<h2>What each plan covers</h2>' +
        '<p class="section-sub">A quick look at what you get with each type of cover. Prices are a monthly starting point, and your quote is tailored to you.</p>' +
      '</div>' +
      '<div class="plan-grid">' +
      planCard({ featured: true, icon: A.iconHealth, title: 'Health Insurance', price: 'from R250 <small>/mo</small>', url: URLS.health,
        body: 'Access to a wide range of benefits and private hospitals like Netcare, Life and Mediclinic, plus day-to-day claims paid upfront.' }) +
      planCard({ icon: A.iconPet, title: 'Pet Insurance', price: 'from R80 <small>/mo</small>', url: URLS.pet,
        body: 'We love pets as much as you do. Cover for your furry, four-legged family for accidents, illnesses and quick trips to the vet.' }) +
      planCard({ icon: A.iconGap, title: 'Gap Cover', price: 'from R150 <small>/mo</small>', url: URLS.gap,
        body: 'We double or quadruple scheme pay-outs, even within the MSA savings threshold, plus cover for cancer, mental health and more at no extra premium.' }) +
      planCard({ tailored: true, icon: A.iconCar, title: 'Car &amp; Household', price: 'Tailored quote', url: URLS.car,
        body: 'We can never predict when things go wrong, but we can make sure you have flexible cover, because some cover is better than none.' }) +
      '</div>' +
    '</section>';
  }

  var REVIEWS = [
    { name: 'Pauline van der Spuy', title: 'I appreciate getting a reply from a real person',
      quote: '"I contacted Oneplan after hours on a Friday night and received a very prompt, informative reply from Keoagile Mosime. I really appreciate getting a reply from a real person instead of a machine like some companies."' },
    { name: 'Julianna', title: 'An amazing gesture with outstanding hospital bills',
      quote: '"The company amazed me and my family with the extended financial help for my late husband\'s hospital bills. Ronald and Renee literally held my hand in helping me with the shortfall."' },
    { name: 'Rene N', title: 'A good and effective medical plan',
      quote: '"It gives me as a fur baby mom breathing space in medical situations. I know I have a back-up plan. The service is exceptional, friendly and fast."' },
    { name: 'Melanie V', title: 'Friendly and efficient service',
      quote: '"I\'ve had medical insurance for all three of my dogs for a while now. To my delight the claim has been settled in full. I\'m grateful for the cover and the friendly, efficient service from Kim Street!"' },
    { name: 'Doug T', title: 'Exceptional service',
      quote: '"Fantastic service from Razia Yousuf. Clear and to the point, very helpful and a pleasure to deal with. Thank you for helping me insure my little cat."' }
  ];

  function reviewsHtml(hp) {
    var cards = REVIEWS.map(function (r) {
      return '' +
      '<article class="review-card">' +
        '<header><p class="rev-name">' + r.name + '</p><img class="rev-stars" src="' + A.starsRow + '" alt="5 stars"></header>' +
        '<p class="rev-title">' + r.title + '</p>' +
        '<p class="rev-quote">' + r.quote + '</p>' +
        '<span class="rev-scroll"><span></span></span>' +
      '</article>';
    }).join('');
    return '' +
    '<section class="reviews">' +
      '<div class="reviews-head">' +
        '<h2>Making our <span class="hl">customers smile</span> is at the heart of what we do</h2>' +
        '<img class="hp-white" src="' + A.hpWhite + '" alt="hellopeter">' +
      '</div>' +
      '<div class="carousel-row">' +
        '<button class="car-btn prev" aria-label="Previous reviews"><img src="' + A.btnPrev + '" alt=""></button>' +
        '<div class="review-track">' + cards + '</div>' +
        '<button class="car-btn next" aria-label="Next reviews"><img src="' + A.btnNext + '" alt=""></button>' +
      '</div>' +
      '<p class="reviews-all"><a href="https://www.hellopeter.com/oneplan" target="_blank" rel="noopener">See all ' + hp.reviews + ' reviews on Hellopeter →</a></p>' +
    '</section>';
  }

  function claimHtml() {
    return '' +
    '<section class="claim">' +
      '<div class="section-head">' +
        '<p class="eyebrow navy">The Oneplan Claim Card</p>' +
        '<h2>Most cover pays you back.<br>We pay upfront.</h2>' +
        '<p class="section-sub">We load your claim onto your Oneplan Claim Card, so you tap and settle the bill on the spot. You\'re never out of pocket waiting for a refund.</p>' +
      '</div>' +
      '<img class="claim-card-img" src="' + A.claimCard + '" alt="Oneplan Claim Card">' +
      '<div class="compare">' +
        '<div class="panel usual">' +
          '<p class="panel-title">The usual way</p>' +
          '<ol class="steps">' +
            '<li><span class="num">1</span>Pay the doctor or vet yourself</li>' +
            '<li><span class="num">2</span>Submit a claim and wait</li>' +
            '<li><span class="num">3</span>Get refunded weeks later - if approved</li>' +
          '</ol>' +
        '</div>' +
        '<div class="panel oneplan-way" style="background-image:url(\'' + A.pattern + '\')">' +
          '<p class="panel-title">With your Oneplan Card</p>' +
          '<ol class="steps">' +
            '<li><span class="num check-num">✓</span>We load the claim onto your card</li>' +
            '<li><span class="num check-num">✓</span>Tap to pay the bill on the spot</li>' +
            '<li><span class="num check-num">✓</span>Done - never out of pocket</li>' +
          '</ol>' +
        '</div>' +
        '<span class="vs">vs</span>' +
      '</div>' +
      '<p class="claim-note">Mastercard-based, so it works anywhere they do - you can even draw cash for emergencies.</p>' +
      '<a href="' + URLS.signup + '" class="btn-cyan btn-lg">Get a free online quote <img class="arrow-ic" src="' + A.arrow + '" alt=""></a>' +
    '</section>';
  }

  function faqHtml() {
    return '' +
    '<section class="faq">' +
      '<div class="section-head">' +
        '<h2>Everything you want to know<br>before you decide</h2>' +
        '<p class="section-sub">The questions people ask us most, answered upfront, so you can read first and talk later (or not at all).</p>' +
      '</div>' +
      '<div class="faq-grid">' +
        '<article class="faq-card">' +
          '<h4><span class="dot"></span>What does it cover?</h4>' +
          '<p>See exactly what each plan includes - day-to-day, hospital, chronic and more - in plain language, with a simple plan comparison.</p>' +
          '<a href="' + URLS.plans + '" class="plan-link">Compare plans &amp; benefits</a>' +
        '</article>' +
        '<article class="faq-card">' +
          '<h4><span class="dot"></span>How much does it cost?</h4>' +
          '<p>Health from R250, Pet from R80, Gap from R150 a month. Get a free online quote in about 2 minutes to see your own price - no agent call needed.</p>' +
          '<a href="' + URLS.signup + '" class="btn-cyan btn-price">See your price</a>' +
        '</article>' +
        '<article class="faq-card">' +
          '<h4><span class="dot"></span>Is there a waiting period?</h4>' +
          '<p>Some benefits have a waiting period before you can claim. See how waiting periods work for each plan, including pre-existing conditions and maternity.</p>' +
          '<a href="' + URLS.claims + '" class="plan-link">Read about waiting periods</a>' +
        '</article>' +
      '</div>' +
    '</section>';
  }

  function readyHtml() {
    return '' +
    '<section class="ready">' +
      '<span class="cro-pattern" style="background-image:url(\'' + A.pattern + '\')" aria-hidden="true"></span>' +
      '<div class="ready-cards" aria-hidden="true">' +
        '<img src="' + A.claimCard + '" alt="" class="rc rc1">' +
        '<img src="' + A.claimCard + '" alt="" class="rc rc2">' +
      '</div>' +
      '<div class="ready-content">' +
        '<p class="eyebrow">Health · Pet · Gap · Car &amp; Household</p>' +
        '<h2>Ready when you are</h2>' +
        '<p class="ready-sub">Work out an online quote and complete your Oneplan application in a few easy steps, in your own space. It only takes a few minutes, or chat to us if you need us.</p>' +
        '<a href="' + URLS.signup + '" class="btn-cyan btn-lg">Get a free online quote <img class="arrow-ic" src="' + A.arrow + '" alt=""></a>' +
        '<a href="#" class="prefer-call" data-toggle="modal" data-target="#homePageCallMePopUp">Prefer a call? We\'ll phone you.</a>' +
      '</div>' +
      '<img class="ready-hand ready-hand-d" src="' + A.handDesktop + '" alt="">' +
      '<img class="ready-hand ready-hand-m" src="' + A.handMobile + '" alt="">' +
    '</section>';
  }

  function alreadyHtml() {
    return '' +
    '<section class="already">' +
      '<p class="already-title">Already with Oneplan?</p>' +
      '<div class="already-row">' +
        '<a href="' + URLS.claims + '" class="already-card">' +
          '<img class="al-icon" src="' + A.circleClaim + '" alt="">' +
          '<span class="al-text"><strong>Make a claim</strong><small>Start or track a claim <span class="arrow-sm">→</span></small></span>' +
        '</a>' +
        '<a href="' + URLS.whatsapp + '" target="_blank" rel="noopener" class="already-card">' +
          '<img class="al-icon" src="' + A.circleWa + '" alt="">' +
          '<span class="al-text"><strong>Chat on WhatsApp</strong><small>Talk to us now <span class="arrow-sm">→</span></small></span>' +
        '</a>' +
      '</div>' +
    '</section>';
  }

  function appHtml() {
    return '' +
    '<section class="app">' +
      '<span class="cro-pattern" style="background-image:url(\'' + A.pattern + '\')" aria-hidden="true"></span>' +
      '<div class="app-content">' +
        '<p class="eyebrow navy">Oneplan Ecosystem</p>' +
        '<h2>DOWNLOAD THE APP!</h2>' +
        '<p class="section-sub left">Download the Oneplan App on the Apple or Android app store to load and manage your claims quickly and easily.</p>' +
        '<div class="badges">' +
          '<a href="#"><img src="' + A.badgePlay + '" alt="Get it on Google Play"></a>' +
          '<a href="#"><img src="' + A.badgeApple + '" alt="Download on the App Store"></a>' +
          '<a href="#"><img src="' + A.badgeHuawei + '" alt="Explore it on AppGallery"></a>' +
        '</div>' +
      '</div>' +
      '<img class="app-phone" src="' + A.phone + '" alt="Oneplan app">' +
    '</section>';
  }

  /* ---------- interactions ---------- */

  function wirePicker(root) {
    var tiles = root.querySelectorAll('.radio-tile');
    var cta = root.querySelector('[data-role="picker-cta"]');
    tiles.forEach(function (tile) {
      tile.addEventListener('click', function () {
        tiles.forEach(function (t) { t.classList.remove('selected'); });
        tile.classList.add('selected');
        var key = tile.getAttribute('data-product');
        cta.innerHTML = PRODUCTS[key].cta + ' <img class="arrow-ic" src="' + A.arrow + '" alt="">';
        cta.setAttribute('href', URLS[key]);
      });
    });
  }

  function wireCarousel(root) {
    var track = root.querySelector('.review-track');
    var step = 270; /* card 250 + gap 20 */
    root.querySelector('.car-btn.prev').addEventListener('click', function () {
      track.scrollBy({ left: -step, behavior: 'smooth' });
    });
    root.querySelector('.car-btn.next').addEventListener('click', function () {
      track.scrollBy({ left: step, behavior: 'smooth' });
    });
  }

  /* ---------- init ---------- */

  function init() {
    waitForElement('#main-content-rb', function (main) {
      if (document.querySelector('.' + PREFIX + '-page')) return;
      injectFont();
      var hp = readHellopeter();

      var page = document.createElement('div');
      page.className = PREFIX + '-page';
      page.innerHTML =
        heroHtml(hp) + plansHtml() + reviewsHtml(hp) + claimHtml() +
        faqHtml() + readyHtml() + alreadyHtml() + appHtml();

      main.insertBefore(page, main.firstChild);
      wirePicker(page);
      wireCarousel(page);

      document.body.classList.add(PREFIX + '-on');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
