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

	  function addClass(el, cls) {
		var el = document.querySelector(el);
		if (el) {
		  el.classList.add(cls);
		}
	  }
	  
	  /* Variation Init */
	  function init() {

		addClass('body','croAddTitle')
        
	  }
		
		/* Initialise variation */
			waitForElement('body', init);
	 
	} catch (e) {
	  if (debug) console.log(e, "error in Test" + variation_name);
	}
})();