(function() {
	try {
	  /* main variables */
	  var debug = 0;
	  var variation_name = "";
	  /* all Pure helper functions */
  
	  function waitForElement(selector, trigger) {
		var interval = setInterval(function() {
		  if (
			document &&
			document.querySelector(selector) &&
			document.querySelectorAll(selector).length > 0
		  ) {
			clearInterval(interval);
			trigger();
		  }
		}, 50);
		setTimeout(function() {
		  clearInterval(interval);
		}, 15000);
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
		  (function(ElementPrototype) {
			ElementPrototype.matches =
			  ElementPrototype.matches ||
			  ElementPrototype.matchesSelector ||
			  ElementPrototype.webkitMatchesSelector ||
			  ElementPrototype.msMatchesSelector ||
			  function(selector) {
				var node = this,
				  nodes = (node.parentNode || node.document).querySelectorAll(selector),
				  i = -1;
				while (nodes[++i] && nodes[i] != node);
				return !!nodes[i];
			  };
		  })(Element.prototype);
		// live binding helper using matchesSelector
		function live(selector, event, callback, context) {
		  addEvent(context || document, event, function(e) {
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
  
	  function addClass(el, cls) {
		var el = document.querySelector(el);
		if (el) {
		  el.classList.add(cls);
		}
	  }
  
	  function removeClass(el, cls) {
		var el = document.querySelector(el);
		if (el) {
		  el.classList.contains(cls) && el.classList.remove(cls);
		}
	  }
  
  
	  /* Variation html */
	  var croIDCheck = `<div class="cro-id-btn">
		  <div class="cro-id-btn-wrapper">
			  <div class="cro-Id-check-btn" type="cro-check now">Check now</div>
		  </div>
	  </div>`;
  
	  var croLoader = `<div class="cro-jm-39-loader">
		  <div class="cro-jm-39-loader-wrapper">
			  <div class="cro-jm-39-loader-inner">
				  <div class="cro-jm-39-loader-gif">
					  <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Justmoney_recipe-39_2_loader.gif" alt="">
				  </div>
				  <div class="cro-jm-39-loader-content">
					  <h3 class="cro-jm-39-loader-text">Checking to see if you qualify...</h3>
				  </div>
			  </div>
		  </div>
	  </div>`;
  
	  var croNewHeader = `<div class="cro-jm-39-newHeader">
		  <div class="cro-jm-39-newHeader">
			  <div class="cro-jm-39-newHeader-inner">
				  <div class="cro-jm-39-newHeader-left">
					  <div class="cro-jm-39-newHeader-img">
						  <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Justmoney_recipe-39_2_loader_circle-check.png" alt="Justmoney_recipe-39_2_loader_circle-check">
						  <!-- <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
							  <path d="M0 10.5C0 4.99219 4.45312 0.5 10 0.5C15.5078 0.5 20 4.99219 20 10.5C20 16.0469 15.5078 20.5 10 20.5C4.45312 20.5 0 16.0469 0 10.5ZM14.4922 8.78125C14.9219 8.35156 14.9219 7.6875 14.4922 7.25781C14.0625 6.82812 13.3984 6.82812 12.9688 7.25781L8.75 11.4766L6.99219 9.75781C6.5625 9.32812 5.89844 9.32812 5.46875 9.75781C5.03906 10.1875 5.03906 10.8516 5.46875 11.2812L7.96875 13.7812C8.39844 14.2109 9.0625 14.2109 9.49219 13.7812L14.4922 8.78125Z" fill="#4AAEAC"/>
						   </svg> -->
					  </div>
				  </div>
				  <div class="cro-jm-39-newHeader-right">
					  <h4 class="cro-jm-39-newHeader-content">You qualify for our services</h4>
				  </div>
			  </div>
		  </div>
	  </div>`;
  
  
	  /* Variation Init */
	  function init() {
		//adding a class to body
		addClass("body", "cro-twoPartForm-t-1")
  
  
		waitForElement(".form-field", function() {
		  document.querySelector("#id_number").closest(".form-field").classList.add("cro-step1")
  
		  document.querySelectorAll('form[method="POST"] .form-field:not(.cro-step1)').forEach(function(e) {
			e.classList.add("cro-step2")
			addClass("body", "cro-formHeader")
		  })
		});
  
		//adding our own button
		waitForElement(".cro-step1", function() {
		  if (!document.querySelector(".cro-id-btn")) {
			insertHtml(".cro-step1", croIDCheck, "afterend");
		  }
		});
  
		waitForElement("#id_number", function() {
		  var croInputField = document.querySelector('#id_number');
		  if (croInputField) {
			croInputField.setAttribute('placeholder', 'ID Number');
		  }
		});
  
		waitForElement("#call-to-action-and-form h4", function() {
		  if (!document.querySelector(".cro-jm-39-loader")) {
			insertHtml("#call-to-action-and-form h4", croLoader, "afterend");
  
		  }
		});
  
		eventHandeler();
	  }
  
	  function croValuePass() {
		waitForElement("#id_number", function() {
		  var croInputValue = document.querySelector('#id_number').value;
		  if (isValidSouthAfricanId(croInputValue) == true) {
			// console.log("valid")
			addClass("body", "cro-formHeader2")
			var croWrong = document.querySelector('.cro-wrongId')
			if (croWrong) {
			  removeClass("body", "cro-wrongId")
			  setTimeout(function() {
				removeClass("body", "cro-formHeader2")
				removeClass("body", "cro-formHeader")
				addClass("body", "cro-formHeader3")
			  }, 2000);
			}
			setTimeout(function() {
			  removeClass("body", "cro-formHeader2")
			  removeClass("body", "cro-formHeader")
			  addClass("body", "cro-formHeader3")
			}, 2000);
			waitForElement("body.cro-twoPartForm-t-1.cro-formHeader3 #call-to-action-and-form h4", function() {
			  if (!document.querySelector(".cro-jm-39-newHeader")) {
				insertHtml("body.cro-twoPartForm-t-1.cro-formHeader3 #call-to-action-and-form h4", croNewHeader, "afterend");
			  }
			});
  
		  } else {
			addClass("body", "cro-wrongId")
		  }
  
		});
	  }
  
	  function eventHandeler() {
		live(".cro-Id-check-btn", "click", function() {
		  croValuePass()
		});
	  }
  
  
  
  
	  /* Initialise variation */
	  waitForElement('body', init);
  
	} catch (e) {
	  if (debug) console.log(e, "error in Test" + variation_name);
	}
  })();