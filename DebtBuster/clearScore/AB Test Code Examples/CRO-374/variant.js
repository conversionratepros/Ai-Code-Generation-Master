(function () {
    try {
      /* main variables */
      var debug = 0;
      var variation_name = "";
	  var path = window.location.href;

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

	  var jsonData = [
		{
		  "url": "scoreLP",
		  "text": "The Simpler Loan Alternative"
		},
		{
		  "url": "scoreCC",
		  "text": "The Simpler Card Alternative"
		},
		{
		  "url": "scoreDC",
		  "text": "Simple Debt Consolidation"
		},
		{
		  "url": "scoreCO",
		  "text": "Get Your Debt Coaching Plan"
		}
	  ];
	  
      /* Variation Init */
        function init() {
            addClass("body", "cro-t-74-v2");
			jsonData.forEach(function(item) {
				var url = item.url;
				var text = item.text;
				if(path.indexOf(url) != -1){
          console.log('----------------Matched')
					document.querySelector('.cro-form-leftText-title').innerHTML = text;
				}else{
           console.log('----------------NOT Matched: ', path)
        }
			});
        }
        
        /* Initialise variation */
            waitForElement('.cro-form-leftText-title', init);
     
    } catch (e) {
      if (debug) console.log(e, "error in Test" + variation_name);
    }
})();