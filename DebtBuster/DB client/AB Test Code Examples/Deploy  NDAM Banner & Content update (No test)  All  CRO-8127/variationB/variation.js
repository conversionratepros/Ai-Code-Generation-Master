(function () {
	try {
	  /* main variables */
	  var debug = 0;
	  var variation_name = "cro_8127";
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


	   var newSection = `<div class="cro_8127-debt-awareness">
  <div class="cro_8127-debt-awareness-wrapper">
    <div class="cro_8127-debt-awareness-inner">
      <div class="cro_8127-debt-awareness-left">
        <div class="cro_8127-badge">
          <span>NATIONAL<br>DEBT<br>AWARENESS<br>MONTH</span>
        </div>
      </div>
      <div class="cro_8127-debt-awareness-right">
        <h2>Did you know? R5,000 could be yours</h2>
        <p>
          Register, check your credit report, and automatically enter our
          weekly draw. It pays to know your debt.
        </p>
      </div>

    </div>
  </div>
                      </div>`;

     var footertext = `<div class="cro_8127-competition-terms">
  <a href="https://www.debtbusters.co.za/terms-and-conditions-ndam/"
    target="_blank"
    rel="noopener noreferrer"
    class=""cro_8127-competition-link">
    Competition Ts &amp; Cs apply
  </a>

  <div class="cro_8127-competition-powered">
    Powered by NCRCB29
  </div>
</div>`; 

function changeImageSrc() {
  waitForElement('img.phone1and2img-desktop', function(){
            var img = document.querySelector('img.phone1and2img-desktop');
  if (img) {
    img.setAttribute(
      'src',
      'https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Deploy+%7C+NDAM+Banner/cro-db-NDAM-Banner-1.png'
    );
  }
        })

  waitForElement('img.phone1and2img-mobile', function(){
      var img = document.querySelector('img.phone1and2img-mobile');
      if (img) {
          img.setAttribute(
            'src',
            'https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Deploy+%7C+NDAM+Banner/cro-db-NDAM-Banner-1.png'
          );
        }   
  })

   waitForElement('img.img-fluid.desktop-two', function(){
      var img = document.querySelector('img.img-fluid.desktop-two');
      if (img) {
          img.setAttribute(
            'src',
            'https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Deploy+%7C+NDAM+Banner/cro-db-NDAM-Banner-2.png'
          );
        }   
  })

  waitForElement('img.img-fluid.mobile-two', function(){
      var img = document.querySelector('img.img-fluid.mobile-two');
      if (img) {
          img.setAttribute(
            'src',
            'https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Deploy+%7C+NDAM+Banner/cro-db-NDAM-Banner-2.png'
          );
        }   
  })
  
}


	  /* Variation Init */
	  function init() {
      changeImageSrc();
      addClass("body", variation_name);

		    waitForElement('.register-hld', function(){
            if (!document.querySelector('.cro_8127-debt-awareness')) {
                insertHtml('.register-hld', newSection, "afterend");
            }
        })

        waitForElement('.footr .kudough-text', function(){
            if (!document.querySelector('.cro_8127-competition-terms')) {
                insertHtml('.footr .kudough-text', footertext, "afterend");
            }
        })

        waitForElement('.footr .col-.pe-md-2 h5', function () {
                                document.querySelectorAll('.footr .col-.pe-md-2 h5').forEach(function (e) {
                                        var parent = e.closest('.col-.pe-md-2');
                                        if (parent && e.innerHTML.indexOf('Contact Us') !== -1) {
                                                parent.classList.add('cro-Contact-Us');
                                        }
                                });
                        });

        
	  }
		

		/* Initialise variation */
			waitForElement('.register-hld', init);
	 
	} catch (e) {
	  if (debug) console.log(e, "error in Test" + variation_name);
	}
})();