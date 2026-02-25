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


	  var registerCopy = `<section class="clientSnapshot">
        <div class="clientContainer containerOne">
            <div class="floatLeft text">
                <h3>Get Your Credit Snapshot</h3>
                <h4 class="green">Gain a Clear View of Your Financial Health</h4>
                <p>With our credit snapshot, you can effortlessly monitor your credit score, spot any issues like late payments or unusual activity, and stay updated on your balances and credit limits. This tool empowers you to make informed financial decisions, enhances your credit awareness, and helps you plan confidently for future goals.</p>
            </div>
            <div class="floatRight image">
               <img class="imgRight" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/UC1_img1.png" />
            </div>
			<div class="clearfix"></div>
        </div>
        <div class="clientContainer containerTwo hideMobile">
            <div class="floatLeft image">
               <img class="imgLeft" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/UC1_Img2.png" />
            </div>
            <div class="floatRight text">
               <h3>Debt Affordability Indicator</h3>
               <h4 class="green">Easily See What Percentage of Your Income Goes to Debt Repayment</h4>
               <p>Get a clear view of your financial commitments with our debt affordability indicator. This valuable insight helps you manage your budget more effectively, track your progress toward financial goals, and uncover opportunities to reduce debt for a stronger, healthier financial future.</p>
            </div>
			<div class="clearfix"></div>
        </div>
		<div class="clientContainer containerTwo hideDesktop">
            <div class="floatLeft text">
               <h3>Debt Affordability Indicator</h3>
               <h4 class="green">Easily See What Percentage of Your Income Goes to Debt Repayment</h4>
               <p>Get a clear view of your financial commitments with our debt affordability indicator. This valuable insight helps you manage your budget more effectively, track your progress toward financial goals, and uncover opportunities to reduce debt for a stronger, healthier financial future.</p>
            </div>
            <div class="floatRight image">
               <img class="imgLeft" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/UC1_Img2.png" />
            </div>
			<div class="clearfix"></div>
        </div>
        <div class="clientContainer containerThree">
            <div class="floatLeft text">
                <h3>Accounts Overview</h3>
                <h4 class="green">Easily View All Your Open Accounts at a Glance</h4>
                <p>With the Accounts Overview, you can quickly see all your open accounts, check for any in arrears, and get a clear view of your credit limits. Stay updated on new accounts and manage your financial status with ease, all in one place.</p>
            </div>
            <div class="floatRight image">
               <img class="imgRight" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/UC1_Img3.png" />
            </div>
			<div class="clearfix"></div>
        </div>
        <button _ngcontent-snv-c91="" type="button" id="idBottom" name="btnRegisterRegisterPage" class="registerButton">Get credit score now</button>
    </section>`;


	  /* Variation Init */
	  function register() {
			document.querySelector('footer').classList.add('footerRegistration');
          insertHtml("footer", registerCopy, "beforebegin");

          centerDivs();

		  document.getElementById('idBottom').addEventListener('click', function (e) {
		    const target = document.getElementById('btn-partical-register');
        const targetPosition = target.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
		  });

	  }

    function centerDivs() {
      
      // vertical 

      var clientSnapshot = document.querySelector('.clientSnapshot').clientWidth;
      var containerOne = document.querySelector('.containerOne').clientWidth;         

      var marginLeft  = ( clientSnapshot  - containerOne ) / 2;

      var one = document.querySelector('.containerOne');
      var oneText = document.querySelector('.containerOne .text');
      var two = document.querySelector('.containerTwo');
      var three = document.querySelector('.containerThree');

      one.style.marginLeft = `${marginLeft}px`;
      two.style.marginLeft = `${marginLeft}px`;
      three.style.marginLeft = `${marginLeft}px`;

    }

        /* Initialise variation */
        var url = window.location.pathname;

        if (url === '/register') {
            waitForElement('body', register);
        }


	} catch (e) {
	  if (debug) console.log(e, "error in Test" + variation_name);
	}
})();