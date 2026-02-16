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
            addClass("body", "cro-t-74");
			jsonData.forEach(function(item) {
				var url = item.url;
				var text = item.text;
				if(path.indexOf(url) != -1){
					if (!document.querySelector(".cro-t-74-Heading")) {
						insertHtml(".hs_cos_wrapper_widget > .container", "<h2 class='cro-t-74-Heading'>"+text+"</h2>", "afterbegin");
					}
					
				}
			});
        }
        
        /* Initialise variation */
            waitForElement('.hs_cos_wrapper_widget > .container', init);
     
    } catch (e) {
      if (debug) console.log(e, "error in Test" + variation_name);
    }
})();