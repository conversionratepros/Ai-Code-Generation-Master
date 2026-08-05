
(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-12574_ab_homepage_redesign";

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

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        }

        /* ==================================================================
         * PLACEHOLDER LINK DESTINATIONS - confirm before this test goes live.
         * Spec: "Treat every link destination in this document as a
         * placeholder - final link destinations will be supplied before the
         * build." Every element below carries data-cro-placeholder=
         * "verify-destination" in the injected markup so they're easy to grep
         * for later. These 5 use the best real destination available since
         * nothing on the current live homepage confirms them:
         *   - "Log in" quick-link tile       -> https://www.oneplan.co.za/login
         *   - HelloPeter logo/rating/link x3 -> https://www.hellopeter.com/oneplan
         *   - "Chat on WhatsApp" tile         -> live floating WhatsApp number (api.whatsapp.com/send?phone=27837945452)
         * Everything else (quote pages, plan pages, claims process, the
         * "Prefer a call?" -> #homePageCallMePopUp modal) was cross-checked
         * against the live homepage's own nav/links/modals.
         * ================================================================== */

        var FRAGMENT_HTML = "<div id=\"cro-12574-redesign\">\n<section class=\"hero\">\n  <div class=\"wrap hero-in\">\n    <div class=\"hero-copy\">\n      <p class=\"eyebrow\">Health &middot; Pet &middot; Gap &middot; Car &amp; Home</p>\n      <h1>Insurance that pays your claims <span class=\"hl\">upfront</span>.</h1>\n      <p class=\"lead\">Settle your doctor, vet or hospital bill on the spot with your Oneplan Card - never weeks out of pocket. See your price online in 2 minutes. No agent call needed.</p>\n      <!-- price/product router lives IN the fold -->\n      <div class=\"hero-router\" id=\"router\">\n        <p class=\"router-q\">What would you like to cover? Pick one to start.</p>\n        <div class=\"router-grid\" role=\"radiogroup\" aria-label=\"Choose a product to quote\">\n          <button type=\"button\" class=\"rchip is-selected\" role=\"radio\" aria-checked=\"true\" data-label=\"Health\" data-url=\"https://health.oneplan.co.za/?referrer=homepagequote\">\n            <img src=\"https://www.oneplan.co.za/assets/homepage/img/resize/home-health-insurance.webp\" alt=\"\">\n            <span class=\"txt\"><span class=\"rname\">Health</span><span class=\"rprice\">from R250<small>/mo</small></span></span>\n            <span class=\"rtick\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 6L9 17l-5-5\"/></svg></span>\n          </button>\n          <button type=\"button\" class=\"rchip\" role=\"radio\" aria-checked=\"false\" data-label=\"Pet\" data-url=\"https://www.onepet.co.za?referrer=homepagequote\">\n            <img src=\"https://www.oneplan.co.za/assets/homepage/img/resize/home-pet-insurance.webp\" alt=\"\">\n            <span class=\"txt\"><span class=\"rname\">Pet</span><span class=\"rprice\">from R80<small>/mo</small></span></span>\n            <span class=\"rtick\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 6L9 17l-5-5\"/></svg></span>\n          </button>\n          <button type=\"button\" class=\"rchip\" role=\"radio\" aria-checked=\"false\" data-label=\"Gap\" data-url=\"https://gap.oneplan.co.za/?Referrer=homepagequote\">\n            <img src=\"https://www.oneplan.co.za/assets/homepage/img/resize/home-gap-cover.webp\" alt=\"\">\n            <span class=\"txt\"><span class=\"rname\">Gap</span><span class=\"rprice\">from R150<small>/mo</small></span></span>\n            <span class=\"rtick\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 6L9 17l-5-5\"/></svg></span>\n          </button>\n          <button type=\"button\" class=\"rchip\" role=\"radio\" aria-checked=\"false\" data-label=\"Car &amp; Home\" data-url=\"https://oneplanshortterm.co.za/?referrer=homepagequote\">\n            <img src=\"https://www.oneplan.co.za/assets/homepage/img/resize/home-shortterm-insurance.webp\" alt=\"\">\n            <span class=\"txt\"><span class=\"rname\">Car &amp; Home</span><span class=\"rprice\">Tailored</span></span>\n            <span class=\"rtick\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 6L9 17l-5-5\"/></svg></span>\n          </button>\n        </div>\n        <div class=\"hero-cta\">\n          <a class=\"btn btn-green\" id=\"quoteCta\" href=\"https://health.oneplan.co.za/?referrer=homepagequote\">\n            Get my Health quote\n            <span class=\"arw\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12h14M13 6l6 6-6 6\"/></svg></span>\n          </a>\n          <span class=\"time\">\n            <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#cfe0ff\" stroke-width=\"2\" width=\"16\" height=\"16\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/></svg>\n            About 2 minutes\n          </span>\n        </div>\n      </div>\n      <p class=\"hero-legal desktop-legal\">T&amp;Cs apply. Bryte licensed Insurer and Auth FSP(17703). Oneplan is a non-life Insurance product, not a medical aid.</p>\n    </div>\n    <div class=\"hero-art\">\n      <div class=\"hero-photo\">\n        <img src=\"https://crp-clients-images.s3.af-south-1.amazonaws.com/Oneplan/Dev+%7C+AB+Homepage+Redesign+%7C+All+%7C+CRO-12574/CRO-12574-Homepage_Redesign-1.png\" alt=\"A mum and baby at a Oneplan check-up\" onerror=\"this.classList.add('ph');this.removeAttribute('src');\">\n      </div>\n    </div>\n    <p class=\"hero-legal mobile-legal\">T&amp;Cs apply. Bryte licensed Insurer and Auth FSP(17703). Oneplan is a non-life Insurance product, not a medical aid.</p>\n  </div>\n</section>\n\n<!-- trust ribbon: stat bar, verifiable (logo links to the Hellopeter profile) -->\n<div class=\"wrap\">\n  <div class=\"trust-ribbon\">\n    <span class=\"tr-line tr-main\">\n      <a href=\"https://www.hellopeter.com/oneplan\" data-cro-placeholder=\"verify-destination\" target=\"_blank\" rel=\"noopener\"><img class=\"hp\" src=\"https://www.oneplan.co.za/assets/2025/hellopeter-blue.svg\" alt=\"Hellopeter\"></a>\n      <span class=\"tr-num\">4.59</span>\n      <img class=\"stars\" src=\"https://www.oneplan.co.za/assets/landings/img/hellopeterstars.svg\" alt=\"4.59 stars\">\n    </span>\n    <span class=\"tr-dot\"></span>\n    <span class=\"tr-line tr-stats\">\n      <span class=\"tr-stat\"><b>23,019</b>&nbsp;reviews</span>\n      <span class=\"tr-dot\"></span>\n      <span class=\"tr-stat\"><b>10/10</b>&nbsp;Trust Index</span>\n    </span>\n  </div>\n</div>\n\n<!-- ===================== PRODUCT DETAIL (what's covered - the router lives in the hero) ===================== -->\n<section class=\"products\" id=\"products\">\n  <div class=\"wrap\">\n    <div class=\"section-head\">\n      <h2>What each plan covers</h2>\n      <p>A quick look at what you get with each type of cover. Prices are a monthly starting point - your quote is tailored to you.</p>\n    </div>\n    <div class=\"card-grid\">\n\n      <!-- HEALTH first (CRO-7090 tested order), flagship = elevated + chip -->\n      <div class=\"pcard pcard-featured\">\n        <span class=\"featured-chip\">Most chosen</span>\n        <div class=\"picon\"><img src=\"https://www.oneplan.co.za/assets/homepage/img/resize/home-health-insurance.webp\" alt=\"Health insurance\"></div>\n        <div class=\"headwrap\">\n          <h3>Health Insurance</h3>\n          <div class=\"price\">from R250<small>/mo</small></div>\n        </div>\n        <p>Access to a wide range of benefits and private hospitals like Netcare, Life and Mediclinic - plus day-to-day claims paid upfront.</p>\n        <div class=\"pcta\">\n          <a class=\"btn btn-green\" href=\"https://health.oneplan.co.za/?referrer=homepagequote\">Get online quote</a>\n          <a class=\"seeplans\" href=\"https://www.oneplan.co.za/plans/HealthPlans\">See plans &amp; what's covered</a>\n        </div>\n      </div>\n\n      <!-- PET second -->\n      <div class=\"pcard\">\n        <div class=\"picon\"><img src=\"https://www.oneplan.co.za/assets/homepage/img/resize/home-pet-insurance.webp\" alt=\"Pet insurance\"></div>\n        <div class=\"headwrap\">\n          <h3>Pet Insurance</h3>\n          <div class=\"price\">from R80<small>/mo</small></div>\n        </div>\n        <p>We love pets as much as you do. Cover for your furry, four-legged family for accidents, illnesses and quick trips to the vet.</p>\n        <div class=\"pcta\">\n          <a class=\"btn btn-green\" href=\"https://www.onepet.co.za?referrer=homepagequote\">Get online quote</a>\n          <a class=\"seeplans\" href=\"https://www.oneplan.co.za/plans/PetPlans\">See plans &amp; what's covered</a>\n        </div>\n      </div>\n\n      <!-- GAP third -->\n      <div class=\"pcard\">\n        <div class=\"picon\"><img src=\"https://www.oneplan.co.za/assets/homepage/img/resize/home-gap-cover.webp\" alt=\"Gap cover\"></div>\n        <div class=\"headwrap\">\n          <h3>Gap Cover</h3>\n          <div class=\"price\">from R150<small>/mo</small></div>\n        </div>\n        <p>We double or quadruple scheme pay-outs, even within the MSA savings threshold - plus cover for cancer, mental health and more at no extra premium.</p>\n        <div class=\"pcta\">\n          <a class=\"btn btn-green\" href=\"https://gap.oneplan.co.za/?Referrer=homepagequote\">Get online quote</a>\n          <a class=\"seeplans\" href=\"https://www.oneplan.co.za/gap/plansandpricing\">See plans &amp; what's covered</a>\n        </div>\n      </div>\n\n      <!-- CAR & HOME fourth -->\n      <div class=\"pcard\">\n        <div class=\"picon\"><img src=\"https://www.oneplan.co.za/assets/homepage/img/resize/home-shortterm-insurance.webp\" alt=\"Car &amp; home insurance\"></div>\n        <div class=\"headwrap\">\n          <h3>Car &amp; Home</h3>\n          <div class=\"price price-tailored\">Tailored quote</div>\n        </div>\n        <p>We can never predict when things go wrong, but we can make sure you have flexible cover - because some cover is better than none.</p>\n        <div class=\"pcta\">\n          <a class=\"btn btn-green\" href=\"https://oneplanshortterm.co.za/?referrer=homepagequote\">Get online quote</a>\n          <a class=\"seeplans\" href=\"https://www.oneplan.co.za/about/shortterm-insurance\">See what's covered</a>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</section>\n\n<!-- ===================== REVIEWS (carousel) ===================== -->\n<section class=\"reviews\">\n    <div class=\"wrap\">\n      <h2>Making our <em>customers smile</em> is at the heart of what we do</h2>\n      <a class=\"hp-link\" href=\"https://www.hellopeter.com/oneplan\" data-cro-placeholder=\"verify-destination\" target=\"_blank\" rel=\"noopener\"><img class=\"hp-logo\" src=\"https://www.oneplan.co.za/assets/2025/hellopeter-white.svg\" alt=\"Hellopeter\"></a>\n    </div>\n    <div class=\"rev-carousel\">\n      <button class=\"rev-nav prev\" aria-label=\"Previous reviews\" type=\"button\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 18l-6-6 6-6\"/></svg>\n      </button>\n      <div class=\"rev-track\" id=\"revTrack\">\n        <div class=\"rev\"><div class=\"stars\">★★★★★</div><h5>I appreciate getting a reply from a real person</h5><p>\"I contacted Oneplan after hours on a Friday night and received a very prompt, informative reply from Keoagile Mosime. I really appreciate getting a reply from a real person instead of a machine like some companies.\"</p><div class=\"name\">Pauline van der Spuy</div></div>\n        <div class=\"rev\"><div class=\"stars\">★★★★★</div><h5>An amazing gesture with outstanding hospital bills</h5><p>\"The company amazed me and my family with the extended financial help for my late husband's hospital bills. Ronald and Renee literally held my hand in helping me with the shortfall.\"</p><div class=\"name\">Julianna</div></div>\n        <div class=\"rev\"><div class=\"stars\">★★★★★</div><h5>A good and effective medical plan</h5><p>\"It gives me as a fur baby mom breathing space in medical situations. I know I have a back-up plan. The service is exceptional, friendly and fast.\"</p><div class=\"name\">Rene N</div></div>\n        <div class=\"rev\"><div class=\"stars\">★★★★★</div><h5>Friendly and efficient service</h5><p>\"I've had medical insurance for all three of my dogs for a while now. To my delight the claim has been settled in full. I'm grateful for the cover and the friendly, efficient service from Kim Street!\"</p><div class=\"name\">Melanie V</div></div>\n        <div class=\"rev\"><div class=\"stars\">★★★★★</div><h5>Exceptional service</h5><p>\"Fantastic service from Razia Yousuf. Clear and to the point, very helpful and a pleasure to deal with. Thank you for helping me insure my little cat.\"</p><div class=\"name\">Doug T</div></div>\n        <div class=\"rev\"><div class=\"stars\">★★★★★</div><h5>One Plan came through</h5><p>\"This was the first time that I needed in-hospital treatment, and One Plan came through. I was admitted to the best private hospital and received the best care. I can sing their praises from the rooftops!\"</p><div class=\"name\">Erthney A</div></div>\n        <div class=\"rev\"><div class=\"stars\">★★★★★</div><h5>Top service from Oneplan Health Insurance</h5><p>\"I have been with Oneplan since 2014. This year has been a bad year with two accidents. Each time they have paid my hospital bill, and I am so grateful.\"</p><div class=\"name\">Justine H</div></div>\n        <div class=\"rev\"><div class=\"stars\">★★★★★</div><h5>Best car insurance for people who love their cars</h5><p>\"My car accident claim was attended to like a patient in a 5-star private hospital. Because I sent all the documents, my claim was approved. I have been with them since 2021.\"</p><div class=\"name\">Masello M</div></div>\n        <div class=\"rev\"><div class=\"stars\">★★★★★</div><h5>So friendly and approachable</h5><p>\"I cannot express enough gratitude for the incredible service from consultant Sweetness. She made what could have been a daunting process effortless and stress-free.\"</p><div class=\"name\">Watson C</div></div>\n        <div class=\"rev\"><div class=\"stars\">★★★★★</div><h5>Super customer service</h5><p>\"I had questions about my policy and contacted Oneplan via WhatsApp. The friendly Shannon McPherson was so helpful. I really felt like I got super customer service. Thank you Oneplan.\"</p><div class=\"name\">Colette</div></div>\n      </div>\n      <button class=\"rev-nav next\" aria-label=\"Next reviews\" type=\"button\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 18l6-6-6-6\"/></svg>\n      </button>\n    </div>\n    <p class=\"rev-all\"><a href=\"https://www.hellopeter.com/oneplan\" data-cro-placeholder=\"verify-destination\" target=\"_blank\" rel=\"noopener\">See all 23,019 reviews on Hellopeter &rarr;</a></p>\n</section>\n\n<!-- ===================== CLAIMS CARD USP (contrast) ===================== -->\n<section class=\"usp\">\n  <div class=\"wrap\">\n    <div class=\"section-head\">\n      <p class=\"usp-kicker\">The Oneplan Claim Card</p>\n      <h2>Most cover pays you back. We pay upfront.</h2>\n      <p class=\"usp-sub\">We load your claim onto your Oneplan Claim Card, so you tap and settle the bill on the spot - you're never out of pocket waiting for a refund.</p>\n    </div>\n    <!-- the actual product, so the claim isn't abstract -->\n    <div class=\"claimcard\" aria-hidden=\"true\">\n      <img class=\"cc-logo\" src=\"https://www.oneplan.co.za/assets/homepage/img/onelogowhite.png\" alt=\"\">\n      <span class=\"cc-chip\"></span>\n      <span class=\"cc-name\">ONEPLAN CLAIM CARD</span>\n    </div>\n    <div class=\"compare\">\n      <div class=\"cmp cmp-old\">\n        <div class=\"cmp-head\">The usual way</div>\n        <ol class=\"cmp-steps\">\n          <li><span class=\"s-n\">1</span>Pay the doctor or vet yourself</li>\n          <li><span class=\"s-n\">2</span>Submit a claim and wait</li>\n          <li><span class=\"s-n\">3</span>Get refunded weeks later - if approved</li>\n        </ol>\n      </div>\n      <div class=\"cmp-vs\">vs</div>\n      <div class=\"cmp cmp-new\">\n        <div class=\"cmp-head\">With your Oneplan Card</div>\n        <ol class=\"cmp-steps\">\n          <li><span class=\"s-n\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 6L9 17l-5-5\"/></svg></span>We load the claim onto your card</li>\n          <li><span class=\"s-n\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 6L9 17l-5-5\"/></svg></span>Tap to pay the bill on the spot</li>\n          <li><span class=\"s-n\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 6L9 17l-5-5\"/></svg></span>Done - never out of pocket</li>\n        </ol>\n      </div>\n    </div>\n    <p class=\"usp-foot\">Mastercard-based, so it works anywhere they do - you can even draw cash for emergencies.</p>\n    <div class=\"usp-cta\">\n      <a class=\"btn btn-green\" href=\"#router\">Get a free online quote <span class=\"arw\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12h14M13 6l6 6-6 6\"/></svg></span></a>\n    </div>\n  </div>\n</section>\n\n<!-- ===================== ANSWERS (exit-survey questions) ===================== -->\n<section class=\"answers\" id=\"answers\">\n  <div class=\"wrap\">\n    <div class=\"section-head\">\n      <h2>Everything you want to know before you decide</h2>\n      <p>The questions people ask us most, answered upfront, so you can read first and talk later (or not at all).</p>\n    </div>\n    <div class=\"ans-grid\">\n      <div class=\"ans\">\n        <h4><span class=\"dot\"></span>What does it cover?</h4>\n        <p>See exactly what each plan includes - day-to-day, hospital, chronic and more - in plain language, with a simple plan comparison.</p>\n        <a href=\"https://www.oneplan.co.za/plans/HealthPlans\">Compare plans &amp; benefits</a>\n      </div>\n      <div class=\"ans\">\n        <h4><span class=\"dot\"></span>How much does it cost?</h4>\n        <p>Health from R250, Pet from R80, Gap from R150 a month. Get a free online quote in about 2 minutes to see your own price - no agent call needed.</p>\n        <a class=\"btn btn-green btn-sm\" href=\"#router\">See your price</a>\n      </div>\n      <div class=\"ans\">\n        <h4><span class=\"dot\"></span>Is there a waiting period?</h4>\n        <p>Some benefits have a waiting period before you can claim. See how waiting periods work for each plan, including pre-existing conditions and maternity.</p>\n        <a href=\"https://www.oneplan.co.za/plans/HealthPlans\">Read about waiting periods</a>\n      </div>\n    </div>\n  </div>\n</section>\n\n<!-- ===================== FINAL CTA ===================== -->\n<section class=\"finalcta\">\n  <p class=\"eyebrow\">Health &middot; Pet &middot; Gap &middot; Car &amp; Home</p>\n  <h2>Ready when you are</h2>\n  <p>Work out an online quote and complete your Oneplan application in a few easy steps, in your own space. It only takes a few minutes - and we're on chat if you need us.</p>\n  <div class=\"row\">\n    <a class=\"btn btn-green\" href=\"#router\">Get a free online quote <span class=\"arw\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12h14M13 6l6 6-6 6\"/></svg></span></a>\n    <a class=\"calllink\" href=\"#\" data-toggle=\"modal\" data-target=\"#homePageCallMePopUp\">Prefer a call? We'll ring you</a>\n  </div>\n</section>\n\n<!-- ===================== SELF-SERVE STRIP (existing customers) ===================== -->\n<section class=\"selfserve\">\n  <div class=\"wrap\">\n    <p class=\"ss-head\">Already with Oneplan?</p>\n    <div class=\"ss-in\">\n      <a href=\"https://www.oneplan.co.za/login\" data-cro-placeholder=\"verify-destination\">\n        <span class=\"ss-ic\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 12a4 4 0 100-8 4 4 0 000 8z\"/><path d=\"M4 21a8 8 0 0116 0\"/></svg></span>\n        <span>Log in<small>Manage your policy</small></span>\n      </a>\n      <a href=\"#answers\">\n        <span class=\"ss-ic\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M9 12l2 2 4-4\"/><circle cx=\"12\" cy=\"12\" r=\"9\"/></svg></span>\n        <span>Make a claim<small>Start or track a claim</small></span>\n      </a>\n      <a class=\"wa\" href=\"https://api.whatsapp.com/send?phone=27837945452&text=Hello\" data-cro-placeholder=\"verify-destination\">\n        <span class=\"ss-ic\"><svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.6 6.6 0 01-1.9-1.2 7.3 7.3 0 01-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.4.2-.4v-.4c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11 11 0 004.3 3.8c.6.3 1.1.4 1.5.5a3.5 3.5 0 001.6.1 2.6 2.6 0 001.7-1.2 2.1 2.1 0 00.1-1.2c0-.1-.2-.2-.4-.3z\"/></svg></span>\n        <span>Chat on WhatsApp<small>Talk to us now</small></span>\n      </a>\n    </div>\n  </div>\n</section>\n</div>";

        /* the live homepage's body content sits between the top nav and the
           footer, but the client re-skins/restructures it periodically (seen
           first-hand: the wrapping markup changed between builds of this
           test), so don't hardcode a specific class name. Instead climb from
           the stable .jumbotron anchor up to whichever ancestor is a sibling
           of #footer, then hide everything from there up to (not including)
           the footer - this self-adjusts whether that's one wrapper or many
           top-level blocks. Hide, don't remove, so any live script still
           holding a reference to those nodes doesn't error. */
        function hideLiveHomepageBody() {
            var jumbo = document.querySelector('.jumbotron');
            var footer = document.querySelector('#footer');
            if (!jumbo || !footer) return false;
            var start = jumbo;
            while (start.parentElement && start.parentElement !== footer.parentElement) {
                start = start.parentElement;
            }
            if (start.parentElement !== footer.parentElement) return false;
            var node = start;
            while (node && node !== footer) {
                var next = node.nextElementSibling;
                node.style.display = 'none';
                node = next;
            }
            return true;
        }

        function injectRedesign() {
            if (document.getElementById('cro-12574-redesign')) return;
            var footer = document.querySelector('#footer');
            if (!footer) return;
            footer.insertAdjacentHTML('beforebegin', FRAGMENT_HTML);
        }

        /* review carousel: arrow buttons scroll one card-width and loop infinitely
           in both directions (spec: return to the first review after the last one,
           and to the last review from the first); no auto-advance - user-driven only */
        function initReviewCarousel() {
            var track = document.getElementById('revTrack');
            if (!track) return;
            var step = function () {
                var c = track.querySelector('.rev');
                return c ? c.getBoundingClientRect().width + 20 : 340;
            };
            var atEnd = function () { return track.scrollLeft + track.clientWidth >= track.scrollWidth - 4; };
            var atStart = function () { return track.scrollLeft <= 4; };
            var goNext = function () {
                if (atEnd()) track.scrollTo({ left: 0, behavior: 'smooth' });
                else track.scrollBy({ left: step(), behavior: 'smooth' });
            };
            var goPrev = function () {
                if (atStart()) track.scrollTo({ left: track.scrollWidth - track.clientWidth, behavior: 'smooth' });
                else track.scrollBy({ left: -step(), behavior: 'smooth' });
            };
            var prev = document.querySelector('.rev-nav.prev');
            var next = document.querySelector('.rev-nav.next');
            if (prev) prev.addEventListener('click', goPrev);
            if (next) next.addEventListener('click', goNext);
        }

        /* in-page anchor buttons ("Get a free online quote" -> #router, "Make a
           claim" -> #answers): smooth scroll with a sticky-header offset. The
           default hash jump is instant and parks the target under the site's
           nav (#header.sticky switches to position:fixed, 61px, once the page
           is scrolled - exactly the state these buttons are clicked in). */
        function scrollToTarget(target) {
            var header = document.querySelector('#header');
            function offset() {
                return 16 + (header ? header.getBoundingClientRect().height : 0);
            }
            function go() {
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset();
                window.scrollTo({ top: top > 0 ? top : 0, behavior: 'smooth' });
            }
            go();
            /* late-loading images above the target can shift layout while the
               animation runs - re-check once it settles and correct if off */
            setTimeout(function () {
                var top = target.getBoundingClientRect().top;
                if (top < offset() - 8 || top > offset() + 60) go();
            }, 800);
        }
        function initSmoothScroll() {
            var links = [].slice.call(document.querySelectorAll('#cro-12574-redesign a[href^="#"]'));
            links.forEach(function (link) {
                var sel = link.getAttribute('href');
                if (sel === '#') return; /* modal trigger, not a scroll link */
                link.addEventListener('click', function (e) {
                    var target = document.querySelector(sel);
                    if (!target) return;
                    e.preventDefault();
                    /* the picker sits mid-hero: landing on it exactly crops the
                       headline above it. For #router, scroll to the hero top so
                       the visitor gets headline + picker together. */
                    if (sel === '#router') {
                        target = document.querySelector('#cro-12574-redesign .hero') || target;
                    }
                    scrollToTarget(target);
                });
            });
        }

        /* hero router: pick a product (chips select), the single CTA updates its label + destination */
        function initHeroRouter() {
            var chips = [].slice.call(document.querySelectorAll('#router .rchip'));
            var cta = document.getElementById('quoteCta');
            if (!chips.length || !cta) return;
            function select(chip) {
                chips.forEach(function (c) {
                    c.classList.remove('is-selected');
                    c.setAttribute('aria-checked', 'false');
                });
                chip.classList.add('is-selected');
                chip.setAttribute('aria-checked', 'true');
                cta.setAttribute('href', chip.getAttribute('data-url'));
                cta.firstChild.nodeValue = 'Get my ' + chip.getAttribute('data-label') + ' quote ';
            }
            chips.forEach(function (chip) {
                chip.addEventListener('click', function () { select(chip); });
            });
        }

        function init() {
            addClass('body', variation_name);
            hideLiveHomepageBody();
            injectRedesign();
            initHeroRouter();
            initReviewCarousel();
            initSmoothScroll();
        }

        /* Initialise variation */
        waitForElement('.jumbotron', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test " + variation_name);
    }
})();
