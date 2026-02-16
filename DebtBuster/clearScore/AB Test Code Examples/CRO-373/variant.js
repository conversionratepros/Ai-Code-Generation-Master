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

	  function insertHtml(selector, content, position) {
		var el = document.querySelector(selector);
		if (!position) {
		  position = "afterend";
		}
		if (el && content) {
		  el.insertAdjacentHTML(position, content);
		}
	  }

	  function live(selector, event, callback, context) {
        // helper for enabling IE 8 event bindings
        function addEvent(el, type, handler) {
          if (el.attachEvent) el.attachEvent("on" + type, handler);
          else el.addEventListener(type, handler);
        }
        // matches polyfill
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
        // live binding helper using matchesSelector
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

	  /* Variation html */
	  var croSubmitBtn = `<div class="cro-t-66_68-btn">
        <div class="cro-t-66_68-btn-wrapper">
            <div class="cro-t-66_68-btn-inner">
                <span class="cro-t-66_68-btn-content">Submit Application</span>
            </div>
        </div>
    </div>`;



	  /* Variation Init */
	  function init() {
		
		addClass("body","recipe-t-66-68");

		waitForElement('.hbspt-form .actions .hs-button', function () {
			if (!document.querySelector(".cro-t-66_68-btn")) {
				insertHtml('.hbspt-form .actions .hs-button', croSubmitBtn, "afterend");
			}
		});
        
	  }

	  live(".cro-t-66_68-btn-content","click",function(){
        var croThisBtnClick = document.querySelector(".hbspt-form .actions .hs-button");
        croThisBtnClick.click();
        
	  });
		
		/* Initialise variation */
			waitForElement('body', init);
	 
	} catch (e) {
	  if (debug) console.log(e, "error in Test" + variation_name);
	}
})();