(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-t-86_117";
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


    //     var newNavbar = `<div class="cro-t-86-hero-top-nav">
    // <div class="cro-t-86-top-nav-wrapper cro-container">
    //     <div class="cro-t-86-top-nav-inner">
    //         <div class="cro-t-86-top-nav-heading-text">
    //             ❤️ YOU HAD ME AT ONEPLAN
    //         </div>
    //         <div class="cro-t-86-top-nav-sub-heading-text">
    //             Show your love and care by joining the Oneplan Health, Gap or Pet Insurance Family
    //         </div>
    //     </div>

    // </div>
	// 						</div>`


        var heroBanner = `<div class="cro-t-86-hero-section">
        <div class="cro-t-86-hero-wrapper cro-container">
            <div class="cro-t-86-hero-inner">
                <div class="cro-t-86-hero-left">
                    <div class="cro-t-86-hero-left-wrapper">
                        <div class="cro-t-86-hero-left-header">
                            <div class="cro-t-86-hero-left-header-text text-1">
                                Affordable Cover FOR
                            </div>
                            <div class="cro-t-86-hero-left-header-text text-2">
                                Health, Home, car & Pet
                            </div>
                        </div>
                        <div class="cro-t-86-hero-left-sub-header">
                            <div class="cro-t-86-hero-left-sub-header-text">
                                Affordable insurance that fits your life and your budget, because peace of mind
                                shouldn’t cost a fortune.
                            </div>

                        </div>
                        <div class="cro-t-86-hero-left-Average-rating">
                            <div class="cro-t-86-hero-left-Average-rating-wrapper">
                                <div class="cro-t-86-hero-left-hellopeter-img">
                                    <img src="/assets/2025/hellopeter-blue.svg" alt="" class="cro-hellopeterlogo">
                                </div>
                                <div class="cro-t-86-hero-left-Average-rating-text">
                                    Average rating of <span>4.59</span> from <span>23,019</span> reviews
                                    |<span>10/10</span> Trust Index
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cro-t-86-hero-right">
        <div class="cro-t-86-hero-right-wrapper">
            <div class="cro-t-86-hero-right-background">
                <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Oneplan/Recipe+86.117/cro-one_plan-86_117-banner-img-1.png" alt="Frame-1" alt=""
                    class="cro-t-86-hero-background">
            </div>
        </div>
    </div>
            </div>
        </div>
        <div class="cro-t-86-hero-right-mobile" style="display:none">
        <div class="cro-t-86-hero-right-wrapper-mobile">
            <div class="cro-t-86-hero-right-background-mobile">
                <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Oneplan/Recipe+86.117/cro-one_plan-86_117-banner-img-2.png" alt="Frame-1" class="cro-t-86-hero-background-mobile">
                     
            </div>
        </div>
    </div>
    </div>`;

        var onlineQuote = `<div class="cro-t-86-Online-Quote-container" id="cro-t-86-free-online-quote">
        <div class="cro-t-86-Online-Quote-wrapper cro-container">
            <div class="cro-t-86-Online-Quote-secton-card-top-text">
                READY TO START YOUR FREE ONLINE QUOTE NOW?
            </div>
            <div class="cro-t-86-Online-Quote-card-container">
                <div class="cro-t-86-Online-Quote-card Online-Quote-1">
                    <div class="cro-t-86-Online-Quote-card-top-part">
                        <div class="cro-t-86-Online-Quote-card-icon">
                            <a href="https://www.onepet.co.za/?referrer=getquoteHomePageicon"><img
                                    src="/assets/homepage/img/home-pet-insurance.png" class="cro-usp-icon"
                                    alt="Oneplan Pet"></a>
                        </div>
                        <h3 class="cro-t-86-Online-Quote-card-header">PET INSURANCE</h3>
                        <div class="cro-t-86-Quote-card-price-part">
                            <div class="cro-t-86-Quote-card-price-from-text">
                                From
                            </div>
                            <div class="cro-t-86-Quote-card-Main-price-text">
                                From <Span>R80</Span>
                            </div>
                            <div class="cro-t-86-Quote-card-Main-price-textBottom">
                                <span>PER MONTH</span>
                            </div>
                        </div>
                        <div class="cro-t-86-Online-Quote-card-subheader">
                            <p class="cro-t-86-Online-Quote-card-subheader-text">We love pets as much as you do. That’s
                                why
                                we cover even the furry, four-legged family members for accidents, illnesses, and quick
                                trips to the vet.</p>
                        </div>

                    </div>
                    <div class="cro-t-86-Online-Quote-card-download-icon">
                        <a href="https://www.onepet.co.za/?referrer=getquoteHomePage" target="_blank">
                            <img src="/assets/homepage/img/btn-get-online-quote-green.png"
                                class="cro-img-get-online-quote-green">
                        </a>
                    </div>
                </div>
                <div class="cro-t-86-Online-Quote-card Online-Quote-2">
                    <div class="cro-t-86-Online-Quote-card-top-part">
                        <div class="cro-t-86-Online-Quote-card-icon">
                            <a href="https://health.oneplan.co.za/?referrer=getquoteHomePageicon" target="_blank"><img
                                    src="/assets/homepage/img/home-health-insurance.png" class="cro-usp-icon"
                                    alt="Health Signup"></a>
                        </div>
                        <h3 class="cro-t-86-Online-Quote-card-header">Health Insurance</h3>
                        <div class="cro-t-86-Quote-card-price-part">
                            <div class="cro-t-86-Quote-card-price-from-text">
                                From
                            </div>
                            <div class="cro-t-86-Quote-card-Main-price-text">
                                From <Span>R500</Span>
                            </div>
                            <div class="cro-t-86-Quote-card-Main-price-textBottom">
                                <span>PER MONTH</span>
                            </div>
                        </div>
                        <div class="cro-t-86-Online-Quote-card-subheader">
                            <p class="cro-t-86-Online-Quote-card-subheader-text">Access to a wide range of benefits and
                                Private Hospitals like Netcare, Life, Mediclinic, and more + Day-to-Day claims paid
                                upfront.
                            </p>
                        </div>

                    </div>
                    <div class="cro-t-86-Online-Quote-card-download-icon">
                        <a href="https://health.oneplan.co.za/?referrer=getquoteHomePage" target="_blank">
                            <img src="/assets/homepage/img/btn-get-online-quote-green.png"
                                class="cro-img-get-online-quote-green">
                        </a>
                    </div>
                </div>
                <div class="cro-t-86-Online-Quote-card Online-Quote-3">
                    <div class="cro-t-86-Online-Quote-card-top-part">
                        <div class="cro-t-86-Online-Quote-card-icon">
                            <a href="https://oneplanshortterm.co.za/?referrer=getquoteHomePageicon"><img
                                    src="/assets/homepage/img/home-shortterm-insurance.png" class="cro-usp-icon"
                                    alt="Short Term Home"></a>
                        </div>
                        <h3 class="cro-t-86-Online-Quote-card-header">Car & Home Insurance</h3>
                        <div class="cro-t-86-Quote-card-price-part">
                            <div class="cro-t-86-Quote-card-price-from-text">
                                From
                            </div>
                            <div class="cro-t-86-Quote-card-Main-price-text">
                                 <Span>FLEXIBLE COVER</Span>
                            </div>
                            <div class="cro-t-86-Quote-card-Main-price-textBottom">
                                <span>PER MONTH</span>
                            </div>
                        </div>
                        <div class="cro-t-86-Online-Quote-card-subheader">
                            <p class="cro-t-86-Online-Quote-card-subheader-text">We can never predict when things will
                                go wrong, but we can make sure you have flexible cover, because some cover is better than none
                            </p>
                        </div>

                    </div>


                    <div class="cro-t-86-Online-Quote-card-download-icon">
                        <a href="https://oneplanshortterm.co.za/?referrer=getquoteHomePage" target="_blank">
                            <img src="/assets/homepage/img/btn-get-online-quote-green.png"
                                class="cro-img-get-online-quote-green">
                        </a>
                    </div>
                </div>
                <div class="cro-t-86-Online-Quote-card Online-Quote-4">
                    <div class="cro-t-86-Online-Quote-card-top-part">
                        <div class="cro-t-86-Online-Quote-card-icon">
                            <a href="https://gap.oneplan.co.za/?Referrer=getquoteHomePageicon" target="_blank"><img
                                    src="/assets/homepage/img/home-gap-cover.png" class="cro-usp-icon"
                                    alt="Gap Cover"></a>
                        </div>
                        <h3 class="cro-t-86-Online-Quote-card-header">Gap Insurance</h3>
                        <div class="cro-t-86-Quote-card-price-part">
                            <div class="cro-t-86-Quote-card-price-from-text">
                                From
                            </div>
                            <div class="cro-t-86-Quote-card-Main-price-text">
                                <Span>R220</Span>
                            </div>
                            <div class="cro-t-86-Quote-card-Main-price-textBottom">
                                <span>PER MONTH</span>
                            </div>
                        </div>
                        <div class="cro-t-86-Online-Quote-card-subheader">
                            <p class="cro-t-86-Online-Quote-card-subheader-text">We double/quadruple scheme pay out,
                                even
                                within MSA Savings Threshold. Plus cover for all cancers + mental health conditions and
                                added Accidental Death & HIV cover at no extra premium.
                            </p>
                        </div>

                    </div>
                    <div class="cro-t-86-Online-Quote-card-download-icon">
                        <a href="https://gap.oneplan.co.za/?Referrer=getquoteHomePage" target="_blank">
                            <img src="/assets/homepage/img/btn-get-online-quote-green.png"
                                class="cro-img-get-online-quote-green">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

        var bannerContent = `<div class="col-md-6 cro-86_117-bannerContent">
        <div class="cro-86_117-bannerContent-wrapper">
            <div class="cro-86_117-bannerContent-inner">
                <div class="cro-t-86-hero-left-header-text text-1">
                    Affordable Cover FOR
                </div>
                <div class="cro-t-86-hero-left-header-text text-2">
                    Health, Pet, car &amp; Home
                </div>
                <div class="cro-t-86-hero-left-sub-header">
                    <div class="cro-t-86-hero-left-sub-header-text">
                        Insurance to make today better, with accessible and affordable cover for when you need it the most.
                    </div>
                    <p>T&Cs apply. Bryte Auth FSP & Insurer (17703). Oneplan is a non-life Insurance product, not a medical aid.</p>
                </div>
            </div>
        </div>
    </div>`;

        var badge = `<div class="cro_86-117-section">
        <div class="cro_86-117-section-wrapper container">
            <div class="cro_86-117-section-inner">
                <div class="cro_86-117-section-img">
                    <div class="cro_86-117-hellopeter">
                        <img src="https://oneplan.co.za/assets/2025/hellopeter-blue.svg" alt="Hellopeter" class="cro_86-117-logo-hellopeter" />
                    </div>
                    <div class="cro_86-117-stars">
                        <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Oneplan/Recipe+86.117/cro-onePlan-86_117_Starts.svg" alt="Stars" />
                    </div>
                </div>
                <div class="cro_86-117-section-content">
                    <span class="cro_86-117-text">Average rating of <b>4.59</b> from <a href="#">23,019 </a>reviews | <a href="#">10/10 </a>Trust Index</span>
                </div>
            </div>
        </div>
    </div>`;


        /* Variation Init */
        function init() {
            addClass("body", variation_name)

            
            // waitForElement('.cro-t-86-hero-section', function () {
            //     if (!document.querySelector('.cro-t-86-hero-top-nav')) {
            //         insertHtml('.cro-t-86-hero-section', newNavbar, "beforebegin");
            //     }
            // });

            waitForElement('.jumbotron .row .col-md-6 h1', function () {
                var parent = document.querySelector('.jumbotron .row .col-md-6 h1').closest('.col-md-6')
                var mainParent = document.querySelector('.jumbotron .row .col-md-6 h1').closest('.container-fuild')
                if(parent){
                    parent.classList.add('cro-t-86_117-content')
                }
                if(mainParent){
                    mainParent.classList.add('cro-t-86_117-mainBanner')
                }
            });

            // waitForElement('.cro-t-86_117-mainBanner', function () {
            //     if (!document.querySelector('.cro-t-86-hero-section')) {
            //         insertHtml('.cro-t-86_117-mainBanner', heroBanner, "afterend");
            //     }
            // });

            

            waitForElement('.cro-t-86_117-mainBanner', function () {
                if (!document.querySelector('.cro-86_117-bannerContent')) {
                    insertHtml('.cro-t-86_117-content', bannerContent, "beforebegin");
                }
            });

            waitForElement('.cro-t-86_117-mainBanner', function () {
                if (!document.querySelector('.cro_86-117-section')) {
                    insertHtml('.cro-t-86_117-mainBanner', badge, "afterend");
                }
            });

            waitForElement('.cro_86-117-section', function () {
                if (!document.querySelector('.cro-t-86-Online-Quote-container')) {
                    insertHtml('.cro_86-117-section', onlineQuote, "afterend");
                }
            });


        }


        /* Initialise variation */
        waitForElement('.jumbotron', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();