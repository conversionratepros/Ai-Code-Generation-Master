(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro-db-15-form";
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

		var cro_15_btn = `<div class="cro-15-continueBtn cro-t-15-step1">
        <div class="cro-15-continueBtn-wrapper">
            <div class="cro-15-continueBtn-inner">
                <div>
                    <div id="cro-15-continue" value="Continue" class="cro-15-continuebtn md secondary w-full mb-5">CONTINUE</div>
                </div>
            </div>
        </div>
    </div>  `;

		var cro_15_loader = `<div class="cro-db-15-loader">
		  <div class="cro-db-15-loader-wrapper">
			  <div class="cro-db-15-loader-inner">
				  <div class="cro-db-15-loader-gif">
					  <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Justmoney_recipe-39_2_loader.gif" alt="">
				  </div>
				  <div class="cro-db-15-loader-content">
					  <h3 class="cro-db-15-loader-text">Checking to see if you qualify...</h3>
				  </div>
			  </div>
		  </div>
	  </div>`;
		
		function init() {
			
			addClass("body", variation_name);

			addClassName_15();
			addSection_15();
			

		}


		function addClassName_15(){
			waitForElement("#main-form .gap-5", function () {
				var parent = document.querySelector('#main-form .gap-5 #first_name').closest('.gap-5')
				if(parent){
					parent.classList.add('cro-t-15-step3')
				}
				var parentTwo = document.querySelector('#main-form .gap-5 #phone_mobile').closest('.gap-5')
				if(parentTwo){
					parentTwo.classList.add('cro-t-15-step3')
				}
				var parentThree = document.querySelector('#main-form .gap-5 #id_number').closest('.gap-5')
				if(parentThree){
					parentThree.classList.add('cro-t-15-step1')
				}
				var parentFour = document.querySelector('#main-form .gap-5 #Online').closest('.gap-5')
				if(parentFour){
					parentFour.classList.add('cro-t-15-step3')
				}
			});

			waitForElement("#main-form p .link[href='https://www.debt.co.za/privacy/']", function () {
				var parentFive = document.querySelector("#main-form p .link[href='https://www.debt.co.za/privacy/']").closest('p')
				if(parentFive){
					parentFive.classList.add('cro-t-15-policyTerms')
				}
			});
		}

		function addSection_15(){
			waitForElement("#main-form", function () {
				if (!document.querySelector(".cro-15-continueBtn")) {
					insertHtml("#main-form", cro_15_btn, "beforeend");
				}
				
			});
		}

		function croValidationForm_15(){
			waitForElement("#main-form", function () {
				var croInputValue = document.querySelector('#id_number').value;
				if (validateID(croInputValue) == true) {
					addClass("body", "cro-t-15-step2")
					removeClass("body", "cro-t-15-wrongId")
					setTimeout(function() {
						removeClass("body", "cro-t-15-step2")
						addClass("body", "cro-t-15-step4")
					}, 1000);
					if (!document.querySelector(".cro-db-15-loader")) {
					insertHtml("#main-form", cro_15_loader, "beforeend");
					}
				} else {
					addClass("body", "cro-t-15-wrongId")
				}
				
			});
		}

		function cro_step_15(){
			setTimeout(function() {
				removeClass("body", "cro-t-15-step_5");
			}, 5000);
		}
		
		function croEventHandkler() {
			live("#cro-15-continue", "click", function () {
				croValidationForm_15();
			});

			live("#Callback, #Online", "click", function () {
				addClass("body", "cro-t-15-step_5");
				// cro_step_15();
			});
		}
		
		if (!window.cro_t_db_15) {
			croEventHandkler();
			window.cro_t_db_15 = true;
		}
		
		waitForElement('#main-form', init);
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();