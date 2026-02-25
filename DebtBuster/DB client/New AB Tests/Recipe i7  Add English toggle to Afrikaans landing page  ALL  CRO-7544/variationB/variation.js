(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "db-lang-toggle-af-en";

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
			function _live(selector, event, callback, context) {
				addEvent(context || document, event, function (e) {
					var found,
						el = e.target || e.srcElement;
					while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
					if (found) callback.call(el, e);
				});
			}
			_live(selector, event, callback, context);
		}

		function addClass(el, cls) {
			var node = document.querySelector(el);
			if (node) {
				node.classList.add(cls);
			}
		}

		function removeClass(el, cls) {
			var node = document.querySelector(el);
			if (node) {
				node.classList.contains(cls) && node.classList.remove(cls);
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

		/* --------------------------
		   Page detection + copy maps
		---------------------------*/

		function pageKeyFromPath(path) {
			if (/2024-11-new-db-afrikaans-lp-1/i.test(path)) return "p1";
			if (/2024-11-new-db-afrikaans-lp-3-ericav2/i.test(path)) return "p3v2";
			if (/2024-11-new-db-afrikaans-lp-3/i.test(path)) return "p3";
			return "p1";
		}

		var COPY = {
			p1: {
				af: {
					heading:
						"Ons het Willem se skuldpaaiemente halveer.<br> <span class='font-light'>Ons kan dieselfde vir jou ook doen. Klop skuld vir goed.</span>",
					helper:
						"Deur voort te gaan aanvaar jy ons <a href='https://www.debtbusters.co.za/privacy-policy/' target='_blank' class='underline'>Privaatheidskennisgewing</a> en <a href='https://www.debtbusters.co.za/terms-and-conditions/' target='_blank' class='underline'>Bepalings en Voorwaardes</a>",
					cta: "Stuur",
				},
				en: {
					heading:
						"We cut Willem's payments by more than half.<br> <span class='font-light'>Discover if we can assist you in the same way.</span>",
					helper:
						"By continuing, you accept our <a href='https://www.debtbusters.co.za/privacy-policy/' target='_blank' class='underline'>Privacy Notice</a> and <a href='https://www.debtbusters.co.za/terms-and-conditions/' target='_blank' class='underline'>Terms and Conditions</a>",
					cta: "Send",
				},
			},
			p3: {
				af: {
					heading:
						"Ons het Erica se skuldpaaiemente met as 50% verminder.<br> <span class='font-light'> Kan jy jou voorstel wat ons vir JOU kan doen?</span>",
					helper:
						"Deur voort te gaan aanvaar jy ons  <a href='https://www.debtbusters.co.za/privacy-policy/' target='_blank' class='underline'>Privaatheidskennisgewing</a> en <a href='https://www.debtbusters.co.za/terms-and-conditions/' target='_blank' class='underline'>Bepalings en Voorwaardes</a>",
					cta: "Stuur",
				},
				en: {
					heading:
						"We cut Erica's debt by 50%.<br> <span class='font-light'> Imagine what we can do for you.</span>",
					helper:
						"By continuing, you accept our <a href='https://www.debtbusters.co.za/privacy-policy/' target='_blank' class='underline'>Privacy Notice</a> and <a href='https://www.debtbusters.co.za/terms-and-conditions/' target='_blank' class='underline'>Terms and Conditions</a>",
					cta: "Send",
				},
			},
			p3v2: {
				af: {
					heading: "Dit word beter.<br> <span class='font-light'> Regtig, dit word beter.</span>",
					helper:
						"Deur voort te gaan aanvaar jy ons <a href='https://www.debtbusters.co.za/privacy-policy/' target='_blank' class='underline'>Privaatheidskennisgewing</a> en <a href='https://www.debtbusters.co.za/terms-and-conditions/' target='_blank' class='underline'>Bepalings en Voorwaardes</a>",
					cta: "Stuur",
				},
				en: {
					heading: "It gets better - for good.<br> <span class='font-light'> We'll help you get there.</span>",
					helper:
						"By continuing, you accept our <a href='https://www.debtbusters.co.za/privacy-policy/' target='_blank' class='underline'>Privacy Notice</a> and <a href='https://www.debtbusters.co.za/terms-and-conditions/' target='_blank' class='underline'>Terms and Conditions</a>",
					cta: "Send",
				},
			},
		};

		var PLACEHOLDER = {
			af: {
				name: "Naam*",
				surname: "Van*",
				contact: "Kontaknommer bv. 071 367 xxx*",
				email: "Epos, bv.naam@voorbeeld.co.za*",
				id: "ID Nommer*",
			},
			en: {
				name: "Name*",
				surname: "Surname*",
				contact: "Contact number, e.g. 071 367 XXXX*",
				email: "Email, e.g. name@example.co.za*",
				id: "ID Number*",
			},
		};

		/* --------------------------
		   Local DOM utilities
		---------------------------*/

		function setHTMLAll(selector, html) {
			var nodes = document.querySelectorAll(selector);
			if (!nodes || !nodes.length) return;
			nodes.forEach(function (n) {
				n.innerHTML = html;
			});
		}

		function setPlaceholder(sel, val) {
			var el = document.querySelector(sel);
			if (el) el.setAttribute("placeholder", val);
		}

		function applyContent(lang, pageKey) {
			// body class swap for any CSS you want to run
			document.body.classList.remove("db-lang-af", "db-lang-en");
			document.body.classList.add(lang === "af" ? "db-lang-af" : "db-lang-en");

			var dict = (COPY[pageKey] && COPY[pageKey][lang]) || null;
			if (dict) {
				// Heading supports HTML
				setHTMLAll("#callback-form > h1", dict.heading);

				// Helper text
				var helper = document.querySelector("#callback-form form > .button:not(:last-child)");
				if (helper) helper.innerHTML = dict.helper;

				// CTA input
				var cta = document.querySelector("#callback-form form > .button input");
				if (cta) cta.value = dict.cta;
			}

			// Placeholders
			var ph = PLACEHOLDER[lang];
			setPlaceholder("#callback-form form #name", ph.name);
			setPlaceholder("#callback-form form #surname", ph.surname);
			setPlaceholder("#callback-form form #contactNumber", ph.contact);
			setPlaceholder("#callback-form form #email", ph.email);
			setPlaceholder("#callback-form form #idNumber", ph.id);
		}

		/* --------------------------
		   UI (styles, toggle, loader)
		---------------------------*/

		var STYLE = '\
      <style id="db-lang-toggle-style">\
        .db-lang-toggle{display:inline-flex;border-radius:100px;background:#F2F2F2;gap:4px;padding: 1px;align-items:center;}\
        .db-lang-toggle button{border:0;padding:10px 16px;border-radius:100px;background:transparent;cursor:pointer;font-weight:600;line-height:1;transition:transform .12s ease,background .2s ease}\
        .db-lang-toggle button[aria-pressed="true"]{background:#51a33b;color:#fff}\
        .db-lang-toggle button:active{transform:scale(.98)}\
        .db-lang-loader{position:fixed;inset:0;background:rgba(255,255,255,.75);display:none;align-items:center;justify-content:center;z-index:99999;backdrop-filter:blur(1px)}\
        .db-lang-loader.active{display:flex}\
        .db-spinner{width:38px;height:38px;border-radius:50%;border:4px solid rgba(0,0,0,.15);border-top-color:rgba(0,0,0,.55);animation:dbspin 1s linear infinite}\
        @keyframes dbspin{to{transform:rotate(360deg)}}\
      </style>';

		var TOGGLE_HTML = '\
      <div class="db-lang-toggle" aria-label="Language toggle">\
        <button type="button" class="db-lang-btn" data-lang="af" aria-pressed="true">Afrikaans</button>\
        <button type="button" class="db-lang-btn" data-lang="en" aria-pressed="false">English</button>\
      </div>';


		var engFooter = `<div class="cro-i7-footer" style="display: none;">
        <div class="cro-i7-footer-wrapper">
            <div class="cro-i7-footer-inner">
                <div class="container grid grid-cols-2 items-center pt-5">
                    <div class="pr-3 md:pr-10 text-xs md:grid md:grid-cols-2 md:grid-gap-10 border-dark-grey-new border-r">
                        <div>
                            <strong>Contact Us</strong>
                            <p class="mb-0">4th floor Mutual Park, Jan Smuts Drive,<br class="hidden md:block">Pinelands, 7405<br>info@debtbusters.co.za</p>
                        </div>
                        <div>
                            <strong>Operating Hours:</strong>
                            <p class="mb-0">Mon-Thu: 07:00 - 21:00<br>Fri: 07:00 - 18:00<br>Sat: 09:00 - 12:30</p>
                        </div>
                    </div>
                    <div class="pl-5 md:pl-10 grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-5 items-center">
                        <a href="tel:0861365910" class="col-span-2 md:col-span-1 cro-i7-footer-number">
                            <picture>
                                <source type="image/webp" 
                                    srcset="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Recipe+i7/cro-i7-call.png"
                                    sizes="100vw">

                                <source type="image/jpeg" 
                                    srcset="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Recipe+i7/cro-i7-call.png"
                                    sizes="100vw">

                                <img class="h-12 object-contain" 
                                    alt="DebtBusters Call" 
                                    loading="lazy" 
                                    decoding="async"
                                    src="https://crp-clients-images.s3.af-south-1.amazonaws.com/DebtBusters/Recipe+i7/cro-i7-call.png">
                            </picture>
                        </a>
                        <picture>
                            <source type="image/webp" srcset="/img/fwIDSUNLD9-640.webp 640w" sizes="100vw">
                            <img class="h-20 lg:h-24 object-contain md:mx-auto" alt="Registered debt counsellor NCRDC1801 NCRDC2374" loading="lazy" decoding="async" src="/img/fwIDSUNLD9-640.jpeg" width="640" height="874">
                        </picture>
                        <picture>
                            <source type="image/webp" srcset="/img/8mh-5ArIRo-640.webp 640w, /img/8mh-5ArIRo-768.webp 768w, /img/8mh-5ArIRo-1024.webp 1024w, /img/8mh-5ArIRo-1280.webp 1280w" sizes="100vw">
                            <source type="image/jpeg" srcset="/img/8mh-5ArIRo-640.jpeg 640w, /img/8mh-5ArIRo-768.jpeg 768w, /img/8mh-5ArIRo-1024.jpeg 1024w, /img/8mh-5ArIRo-1280.jpeg 1280w" sizes="100vw">
                            <img class="h-12 object-contain md:mx-auto" alt="A member of the National Debt Counsellors Association" loading="eager" decoding="sync" src="/img/8mh-5ArIRo-640.jpeg" width="1280" height="493">
                        </picture>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

		function injectLoaderOnce() {
			if (!document.querySelector("#db-lang-toggle-style")) {
				document.head.insertAdjacentHTML("beforeend", STYLE);
			}
			if (!document.querySelector(".db-lang-loader")) {
				var ld = document.createElement("div");
				ld.className = "db-lang-loader";
				ld.innerHTML = '<div class="db-spinner" role="status" aria-label="Loading"></div>';
				document.body.appendChild(ld);
			}
		}

		function setButtonsState(container, lang) {
			var btns = container.querySelectorAll(".db-lang-btn");
			btns.forEach(function (b) {
				b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
			});
		}

		/* --------------------------
		   Init
		---------------------------*/

		function init() {
			document.body.classList.add('db-langi7-toggle');

			waitForElement('.landing', function () {
				if (!document.querySelector('.cro-i7-footer')) {
					insertHtml('.landing', engFooter, "beforeend");
				}
			});

			// if (window.cro_db_lang_toggle) return; // guard
			// window.cro_db_lang_toggle = true;

			var pageKey = pageKeyFromPath(location.pathname);
			injectLoaderOnce();

			// Place the toggle inside .py-8
			var holder = document.querySelector(".py-8");
			// if (!holder) return;

			var wrap = document.createElement("div");
			wrap.style.display = "flex";
			wrap.style.justifyContent = "center";
			wrap.style.margin = "8px 0";
			wrap.innerHTML = TOGGLE_HTML;
			if (!document.querySelector('.db-lang-toggle')) {
				holder.prepend(wrap);
			}
			// holder.prepend(wrap);

			var loader = document.querySelector(".db-lang-loader");

			// Restore persisted selection (default Afrikaans)
			var saved = sessionStorage.getItem("db_lang");
			var startLang = saved === "en" ? "en" : "af";
			setButtonsState(wrap, startLang);
			applyContent(startLang, pageKey);

			// Events via live()
			live(".db-lang-btn", "click", function () {
				var lang = this.getAttribute("data-lang");
				if (this.getAttribute("aria-pressed") === "true") return; // already active

				// 3s loader, then apply
				addClass(".db-lang-loader", "active");
				setTimeout(function () {
					setButtonsState(wrap, lang);
					applyContent(lang, pageKey);
					sessionStorage.setItem("db_lang", lang);
					removeClass(".db-lang-loader", "active");
				}, 3000);
			});
		}

		waitForElement(".py-8", init);
	} catch (e) {
		if (debug) console.log(e, "error in Test " + variation_name);
	}
})();