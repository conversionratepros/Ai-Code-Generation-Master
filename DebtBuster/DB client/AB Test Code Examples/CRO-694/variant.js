(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "";
		/* all Pure helper functions */
		function waitForElement(selector, trigger) {
			var interval = setInterval(function () {
				if (document && document.querySelector(selector) && document.querySelectorAll(selector).length > 0) {
					clearInterval(interval);
					trigger();
				}
			}, 50);
			setTimeout(function () {
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
			click.addEventListener("click", function (event) {
				event.preventDefault(); // Prevent default behavior of the anchor tag
				var target = document.querySelector(selector);
				if (target) {
					window.scrollTo({
						top: target.getBoundingClientRect().top + window.scrollY,
						behavior: "smooth",
					});
				}
			});
		}
		var croStopDebt = `
        <section class="cro-stopDebt">
          <div class="cro-stopDebt-wrapper container">
            <div class="cro-stopDebt-content stopDebt-content-img">
              <img class="stopDebt-content-img" src="https://cdn-3.convertexperiments.com/uf/1004973/10041243/family1%201.png" alt="" />
            </div>
            <div class="cro-stopDebt-content stopDebt-content-text">
              <div class="stopDebt-content-textTitle">
                <h2 class="stopDebt-content-text-title">Ever wonder why your credit record matters?</h2>
              </div>
              <div class="stopDebt-content-text">
                <p class="stopDebt-content-text-para">Your credit record is like your pass to your financial world. Whether you're eyeing that dream apartment or aiming for a loan, your credit record is the ticket everyone is checking out.</p>
                <p class="stopDebt-content-text-para-one">Keep tabs on your credit by staying on top of errors, detect potential fraud, and take steps to improve your financial standing.</p>
                <p class="stopDebt-content-text-para-two">Take charge of your financial journey and get your <span>free </span>credit report today.</p>
              </div>
            </div>
          </div>
        </section>
      `;

		var croStopDebtMobile = `<section class="cro-stopDebt cro-stopDebt-mobile">
        <div class="cro-stopDebt-wrapper">
            <div class="cro-stopDebt-content stopDebt-content-img">
                <img class="stopDebt-content-img"
                    src="https://cdn-3.convertexperiments.com/uf/1004973/10041243/family1%201.png" alt="">
            </div>
            <div class="cro-stopDebt-content-text-parent">
                <div class="cro-stopDebt-content-text-wrapper container">
                    <div class="cro-stopDebt-content stopDebt-content-text">
                        <div class="stopDebt-content-textTitle">
                            <h2 class="stopDebt-content-text-title">Ever wonder why your credit record matters?</h2>
                        </div>
                        <div class="stopDebt-content-text">
                            <p class="stopDebt-content-text-para">Your credit record is like your pass to your financial
                                world.
                                Whether you're eyeing that dream apartment or aiming for a loan, your credit record is
                                the
                                ticket everyone is checking out.</p>
                            <p class="stopDebt-content-text-para-one">Keep tabs on your credit by staying on top of
                                errors,
                                detect potential fraud, and take steps to improve your financial standing.</p>
                            <p class="stopDebt-content-text-para-two">Take charge of your financial journey and get your
                                <span>free </span>credit report today.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
      `;
		var croClientheader = `
        ${croStopDebt}
		${croStopDebtMobile}
        <section class="cro-client-say">
          <div class="cro-wapper-part container">
            <div class="cro-client-say-header">
              <div class="cro-client-say-header-wapper">
                <p class="client-header-title">What our clients say</p>
              </div>
              <div class="cro-cards">
                <div class="cro-card-one croCliCard">
                  <div class="cro-img-content">
                    <div class="card-image">
                      <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/ashley.jpg" alt="" class="card-img" />
                    </div>
                  </div>
                  <div class="card-content">
                    <p class="card-text-first">"The phone calls (from my creditors) just stopped because the DebtBusters consultant contacted the creditors. And some did try, but then I just told them, don't talk to me, talk to my debt consultant at DebtBusters."</p>
                    <p class="client-name">Ashley</p>
                    <p class="sub-text">DebtBusters client</p>
                  </div>
                </div>
                <div class="cro-card-two croCliCard">
                  <div class="cro-img-content">
                    <div class="card-image">
                      <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/josh.jpg" alt="" class="card-img" />
                    </div>
                  </div>
                  <div class="card-content">
                    <p class="card-text-first">"The beautiful thing about this solution is you learn how to manage your cash better. You are able to start on a clear slate."</p>
                    <p class="client-name">Josh</p>
                    <p class="sub-text">DebtBusters client</p>
                  </div>
                </div>
                <div class="cro-card-three croCliCard">
                  <div class="cro-img-content">
                    <div class="card-image">
                      <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/mawande.jpg" alt="" class="card-img" />
                    </div>
                  </div>
                  <div class="card-content">
                    <p class="card-text-first">"I knew by that time and at the end of that period I'll be debt-free. That's when I gained trust in DebtBusters. They are present and here for their clients."</p>
                    <p class="client-name">Mawande</p>
                    <p class="sub-text">DebtBusters client</p>
                  </div>
                </div>
                <div class="cro-card-four croCliCard">
                  <div class="cro-img-content">
                    <div class="card-image">
                      <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/chantel.jpg" alt="" class="card-img" />
                    </div>
                  </div>
                  <div class="card-content">
                    <p class="card-text-first">"It was really a pleasant experience. No hassles. No more phone calls (from creditors). No more worries"</p>
                    <p class="client-name">Chantal</p>
                    <p class="sub-text">DebtBusters client</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
		var croTopContent =
			"" +
			'  <div class="cro-content-section">' +
			'      <div class="cro-content-wrapper">' +
			'          <div class="cro-topHeading">' +
			'              <h1 class="cro-page-caption">Need a credit check?</h1>' +
			'              <p class="cro-page-text">We’ll get it sorted.</p>' +
			"          </div>" +
			"  " +
			'          <div class="cro-bullet-section">' +
			'              <ul class="cro-bullet-list">' +
			"                  <li>" +
			"  " +
			'                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
			"              <defs>" +
			'                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" id="a"></path>' +
			"              </defs>" +
			'              <use fill="#60a845" fill-rule="nonzero" xlink:href="#a"></use>' +
			"            </svg> Get your <strong>free </strong>credit report" +
			"                  </li>" +
			"                  <li>" +
			"  " +
			'                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
			"              <defs>" +
			'                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" id="a"></path>' +
			"              </defs>" +
			'              <use fill="#60a845" fill-rule="nonzero" xlink:href="#a"></use>' +
			"            </svg> View your credit snapshot" +
			"                  </li>" +
			"                  <li>" +
			"  " +
			'                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
			"              <defs>" +
			'                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" id="a"></path>' +
			"              </defs>" +
			'              <use fill="#60a845" fill-rule="nonzero" xlink:href="#a"></use>' +
			"            </svg> Understand your financial position" +
			"                  </li>" +
			"              </ul>" +
			"          </div>" +
			"  " +
			'          <div class="custom-row row">' +
			'              <div class="col d-flex flex-wrap align-items-center justify-content-between">' +
			'                  <div class="btn-responsive login-button">' +
			'                      <span class="text-md text-dark d-md-inline-block pr-1 login-button">Already have an account?</span>' +
			'                      <a id="cro-register-Log_in" class="login-link">Log in </a></div>' +
			"              </div>" +
			"          </div>" +
			"      </div>" +
			"  </div>";
		/* Variation Init */
		var croLoginCTA = `
        <div id="cro-partical-log-in" class="btn btn-custom mb-md-0 spacetop">
          <a href="/login">Log in</a>
        </div>
      `;
		function croEventHandler() {
			live("#IdNumber", "keydown", function (e) {
				setTimeout(function () {
					//show
				}, 500);
			});
			live("#IdNumber", "keyup", function (e) {
				setTimeout(function () {
					//
				}, 500);
			});
		}
		function init() {
			addClass("body", "cro-t-31");
			waitForElement(".footr", function () {
				if (!document.querySelector(".cro-client-say")) {
					insertHtml(".footr", croClientheader, "beforebegin");
				}
			});
			waitForElement(".p-md-0 .needflex ", function () {
				if (!document.querySelector(".cro-content-section")) {
					insertHtml(".p-md-0 .needflex", croTopContent, "afterbegin");
				}
			});
			// .register .registerholder
			waitForElement(".register .registerholder", function () {
				addClass(".register .registerholder", "container");
			});
			waitForElement("button#btn-partical-register", function () {
				if (!document.querySelector("#cro-partical-log-in")) {
					document.querySelector("button#btn-partical-register").insertAdjacentHTML("afterend", croLoginCTA);
				}
			});
			waitForElement("#cro-partical-log-in", function () {
				if (!document.querySelector(".cro-invalid-feedback")) {
					document.querySelector("#cro-partical-log-in").insertAdjacentHTML("beforebegin", '<div class="cro-invalid-feedback"><div>ID Number already exists on our system. Please click “Log In” below</div></div>');
				}
			});

			waitForElement("#btn-register", function () {
				var parent = document.querySelector('#btn-register').closest('.col')
				if (parent) {
					parent.classList.add('cro-t-31-btn-register')
				}
			});
		}
		live("#cro-register-Log_in", "click", function () {
			document.querySelector(".login-button #dAnchor-register-Log_in") && document.querySelector(".login-button #dAnchor-register-Log_in").click();
		});
		live("#divIdNumber #btn-partical-register", "click", function (e) {
			waitForElement('.alert.alert-danger[role="alert"]', function () {
				setTimeout(function () {
					document.body.classList.add("cro-id-exists");
				}, 300);
			});
		});
		live("#IdNumber", "keydown", function (e) {
			setTimeout(function () {
				if (document.body.classList.contains("cro-id-exists")) {
					document.body.classList.remove("cro-id-exists");
				}
			}, 300);
		});
		live("#IdNumber", "keyup", function (e) {
			setTimeout(function () {
				if (document.body.classList.contains("cro-id-exists")) {
					document.body.classList.remove("cro-id-exists");
				}
			}, 300);
		});
		/* Initialise variation */
		waitForElement("body", init);
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();