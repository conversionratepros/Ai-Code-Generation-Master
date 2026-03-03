(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "croki14";
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

    var newNavbar = `<div class="cro_ki14-top-nav-Stripe content-row__item rowItemContent-39590  dw-mod" style="background-color: #212121 ; color: #212121">
                <div class="u-full-width u-align-center  u-align-self-center  dw-mod">
    <a href="/brands/dior" target="_self" class="u-overlay">&nbsp;</a>
    <div class="content-row__item__body  padding-size-sm padding-position-around  margin-sm  margin-position-lr card-paragraph dw-mod" style="background-color: #212121;">
<div style="font-style: italic;"><span style="color:#FFFFFF;"><span style="font-size:18px;"><strong><span style="font-family:arial,helvetica,sans-serif;">The Wait Is Over! The Iconic Dior Brand Has Landed</span></strong></span></span></div>
    </div>
                </div>
            </div>`;

    //         var heroBanner = `<section class="beauty-banner">
    //   <div class="banner-container">
    //     <div class="banner-content">
    //       <h1>For the Love of Beauty</h1>
    //       <p>
    //         The destination for beauty’s most-wanted, from Huda Beauty,
    //         Paula's Choice, Drunk Elephant and CHANEL. Global heavyweights.
    //         Cult classics. And brands you’ll only find at ARC.
    //       </p>
    //       <a href="https://www.arcstore.co.za/brands" class="banner-btn">
    //         Explore Brands
    //       </a>
    //     </div>
    //   </div>
    // </section>`;

    var heroBanner = `<section class="croki14-beauty-banner">
  <div class="croki14-banner-container">
    <div class="croki14-banner-content">
      <h1>For the Love of Beauty</h1>
      <p>
        The destination for beauty’s most-wanted, from Huda Beauty,
        Paula's Choice, Drunk Elephant and CHANEL. Global heavyweights.
        Cult classics. And brands you’ll only find at ARC.
      </p>
      <a href="https://www.arcstore.co.za/brands" class="croki14-banner-btn">
        Explore Brands
      </a>
    </div>
  </div>
</section>`;


    function trigger() {
    var doneTypingInterval = 9000;  //time in ms, 5 seconds for example
    var intervalCallAgain = setInterval(function () {
        addingClasses();
    }, 400);

    //start the countdown
    var Timer = setTimeout(function () {
        clearInterval(intervalCallAgain);
    }, doneTypingInterval);

    }

    function addingClasses() {
    // Bottom Carosel section
    waitForElement("#content > .content-container h2", function () {
        document.querySelectorAll('#content > .content-container h2').forEach(function (e) {
        if (e.innerText == "Featured Brands") {
            e.closest('.content-container').classList.add('cro_featured_brands')
        }
        })
    });

    waitForElement("#Paragraph_53030", function () {
        // Bottom Carosel Heading
        document.querySelector('#Paragraph_53030').closest('.content-container').classList.add('cro_featured_brands_slider')
    });

    waitForElement(".rowItemContent-55206", function () {
        // Top Carosel section
        document.querySelector('.rowItemContent-55206').closest('.content-container').classList.add('cro_Top_slider')
    });

    // ----New for Mobile-- 
    waitForElement("#Paragraph_53031", function () {
        // Bottom Carosel Heading
        document.querySelector('#Paragraph_53031').closest('.content-container').classList.add('cro_featured_brands_slider')
    });

    // waitForElement("#Paragraph_39551", function () {
    //     // Top Carosel section
    //     document.querySelector('#Paragraph_39551').closest('.content-container').classList.add('cro_Top_slider')
    // });
    // ----New for Mobile-- 

    }

    function movingSection() {
    waitForElement(".cro_featured_brands_slider", function () {
        document.querySelector('.cro_Top_slider').insertAdjacentElement('afterend', document.querySelector('.cro_featured_brands_slider'))
    });

    waitForElement(".cro_featured_brands", function () {
        document.querySelector('.cro_Top_slider').insertAdjacentElement('afterend', document.querySelector('.cro_featured_brands'))
    });
    }

    function init() {
      addClass("body", variation_name);

      trigger();
        movingSection();

      waitForElement('.content-row__item:not(.cro_ki14-top-nav-Stripe) [href="/brands/dior"].u-overlay', function () {
        var parent = document.querySelector('.content-row__item:not(.cro_ki14-top-nav-Stripe) [href="/brands/dior"].u-overlay').closest('.content-container')
        if (parent) {
          parent.classList.add('cro-Site-Navbar')
        }
      });


      waitForElement("header.top-container", function () {
        if (!document.querySelector(".cro_ki14-top-nav-Stripe")) {
          insertHtml("header.top-container", newNavbar, "afterbegin");
        }
      });

      if (window.innerWidth >= 1024) {

        waitForElement(".site .main-navigation", function () {
          if (!document.querySelector(".croki14-beauty-banner")) {
            insertHtml(".site .main-navigation", heroBanner, "afterend");
          }
        });

      } else {

        // waitForElement("nav.main-navigation-mobile", function () {
        //   if (!document.querySelector(".croki14-beauty-banner")) {
        //     insertHtml("nav.main-navigation-mobile", heroBanner, "afterend");
        //   }
        // });
        // #content

        waitForElement("#content", function () {
          if (!document.querySelector(".croki14-beauty-banner")) {
            insertHtml("#content", heroBanner, "afterbegin");
          }
        });
      }

        

    }

    waitForElement('body', init);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();