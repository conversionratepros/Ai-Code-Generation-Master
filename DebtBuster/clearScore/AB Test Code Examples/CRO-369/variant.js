(function () {
	try {
	  /* main variables */
	  var debug = 0;
	  var variation_name = "";
  
	  /* all Pure helper functions */
  
	  function waitForElement(selector, trigger, delayInterval, delayTimeout) {
		var interval = setInterval(function () {
		  if (
			document &&
			document.querySelector(selector) &&
			document.querySelectorAll(selector).length > 0
		  ) {
			clearInterval(interval);
			trigger();
		  }
		}, delayInterval);
		setTimeout(function () {
		  clearInterval(interval);
		}, delayTimeout);
	  }
  
	  /* Variation functions */
  
	  // badges
	  var badge = ''+
	  `<div class="cro-75_79-idNumber">
	  <img src="https://crpimagebucket.s3.af-south-1.amazonaws.com/fa+-+lock+-+grey.png" alt="">
	  <span>Your ID number is secure and will only be used to check your credit history</span>
	  </div>`;
  
	  function contentAdd(){
		if(!document.querySelector('.cro-75_79-idNumber')){
			document.querySelector('.hs_id_number.hs-id_number').insertAdjacentHTML('beforeend', badge);
		}
	  }
	  /* Variation Init */
	  function init() {
		/* start your code here */
		document.body.classList.add('cro-t-75_76')
	  }
  
	  waitForElement(".hs_id_number.hs-id_number", contentAdd, 50, 15000);
	  waitForElement("body", init, 50, 15000);
	  /* Initialise variation */
	 
	} catch (e) {
	  if (debug) console.log(e, "error in Test" + variation_name);
	}
  })();