(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro-t-16";
		var currentOpen = null;
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

		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}

		function toggleClass(el, cls) {
			if (el) {
				el.classList.toggle(cls);
			}
		}

		function cardTextChange() {
			waitForElement('.cards-part .back-part .under-text', function () {
				document.querySelector('.cards-part .first-card .back-part .under-text').innerHTML = "It's helping a lot I wasn't aware about my credit score before but now i am up to date an its helping me with a healthy financial progress.";
				document.querySelector('.cards-part .sec-card .back-part .under-text').innerHTML = "Mathew has gone the extra mile by calling me to better understand my query and offered a helping hand to resolve my credit profile. I am looking forward to hearing from him as this is an ongoing process.";
				document.querySelector('.cards-part .third-card .back-part .under-text').innerHTML = "They are friendly and quick to respond. They cover every question you might have.";
				document.querySelector('.cards-part .four-card .back-part .under-text').innerHTML = "It was my first time chatting with Justmoney but I got help very fast I’m so happy with their service.";
			});
		}

		var keyFeatures = `<div class="cro-t-16-Key-features">
        <div class="cro-t-16-Key-features-wrapper container">
            <div class="cro-t-16-Key-features-inner">
                <div class="cro-t-16-Key-features-top-header">
                    Key features of the JustMoney platform
                </div>
                <div class="cro-t-16-Key-features-inner-main-parent">
                    <div class="cro-t-16-Key-features-part credit-score">
                        <div class="cro-t-16-Key-features-part-img">
                            <img class="cro-t-16-score"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/cro-t-16-credit-score-img.png"
                                alt="">
                        </div>
                        <div class="cro-t-16-Key-features-part-heading">
                            Track your credit score history
                        </div>
                        <div class="cro-t-16-Key-features-part-subheading">
                            The JustMoney platform allows you to monitor changes in your credit score over time, so you
                            can
                            keep a close eye on your performance, and track improvements or declines
                        </div>
                    </div>
                    <div class="cro-t-16-Key-features-part debt-balance">
                        <div class="cro-t-16-Key-features-part-img">
                            <img class="cro-t-16-balance"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/cro-t-16-debt-balance-img.png"
                                alt="">
                        </div>
                        <div class="cro-t-16-Key-features-part-heading">
                            Check your debt balance
                        </div>
                        <div class="cro-t-16-Key-features-part-subheading">
                            Stay informed about your outstanding debts by easily checking your balances. This helps you
                            keep
                            tabs on your financial obligations
                        </div>
                    </div>
                    <div class="cro-t-16-Key-features-part financial-product">
                        <div class="cro-t-16-Key-features-part-img">
                            <img class="cro-t-16-product"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/cro-t-16-debt-financial-img.png"
                                alt="">
                        </div>
                        <div class="cro-t-16-Key-features-part-heading">
                            Personalised financial product offers
                        </div>
                        <div class="cro-t-16-Key-features-part-subheading">
                            Gain access to a host of financial products tailored to your credit profile, making it
                            easier
                            for you to choose the financial products that suit your needs
                        </div>
                    </div>
                    <div class="cro-t-16-Key-features-part View-accounts">
                        <div class="cro-t-16-Key-features-part-img">
                            <img class="cro-t-16-accounts"
                                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/cro-t-16-accounts-img.png"
                                alt="">
                        </div>
                        <div class="cro-t-16-Key-features-part-heading">
                            View your accounts
                        </div>
                        <div class="cro-t-16-Key-features-part-subheading">
                            The platform allows you to view all your credit accounts in one place, providing a clear and
                            organised overview.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

		var faqSection = `<div class="cro-t-16-Faq-new-part">
        <div class="cro-t-16-Faq-new-part-wrapper">
            <div class="cro-t-16-faq-container container ">
                <div class="cro-t-16-header-part">
                    <p class="cro-t-16-header-part-text">FAQs about credit scores in South Africa
                    </p>
                </div>
                <div class="cro-t-16-faq-item-inner">
                    <div class="cro-t-16-faq-item" index="1">
                        <h2 class="cro-t-16-question"><span>What is a credit score, and why is it important in South
                                Africa?</span><span class="toggle-symbol"></span>
                        </h2>
                        <div class="cro-t-16-answer" style="max-height: 0px;">
                            <p class="cro-t-16-answer-text">A credit score is a numerical representation of your
                                creditworthiness, reflecting your history of managing credit and debt. Credit scores are
                                crucial as they help lenders assess the risk of lending to you.
                                <span>A high credit score indicates responsible financial behaviour and makes it easier
                                    to qualify for loans and better interest rates.</span>
                            </p>
                        </div>
                    </div>
                    <div class="cro-t-16-faq-item" index="2">
                        <h2 class="cro-t-16-question"><span>How is my credit score calculated in South
                                Africa?</span><span class="toggle-symbol"></span></h2>
                        <div class="cro-t-16-answer">
                            <p class="cro-t-16-answer-text">Credit scores are calculated based on various factors,
                                including your payment history, outstanding debt, length of credit history, types of
                                credit used, and recent credit applications. Credit bureaus compile this information to
                                generate your score.</p>
                        </div>
                    </div>
                    <div class="cro-t-16-faq-item" index="3">
                        <h2 class="cro-t-16-question"><span>How long does negative information stay on my credit report
                                in South Africa?</span><span class="toggle-symbol"></span></h2>
                        <div class="cro-t-16-answer">
                            <p class="cro-t-16-answer-text">Negative information, such as late payments or defaults, can
                                stay on your credit report for up to two years. More serious adverse information, such
                                as judgements or administration orders, may remain on your report for up to five years.
                                <span>It’s essential to maintain good financial habits to mitigate the impact of
                                    negative credit information.</span>
                            </p>
                        </div>
                    </div>
                    <div class="cro-t-16-faq-item" index="4">
                        <h2 class="cro-t-16-question"><span>Can I check my credit score for free in South Africa, and
                                how often should I do so?</span><span class="toggle-symbol"></span></h2>
                        <div class="cro-t-16-answer">
                            <p class="cro-t-16-answer-text">
                                Yes, you’re entitled to one free credit report a year from each credit bureau. You can
                                access your credit score as often as you like through various online portals, such as
                                the JustMoney platform.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>`


		/* Variation Init */
		function init() {
			addClass("body", variation_name);

			waitForElement('section#icons', function () {
				if (!document.querySelector('.cro-t-16-Key-features')) {
					insertHtml('section#icons', keyFeatures, "afterend");
				}
			});

			waitForElement("section#second-call-to-action", function () {
				if (!document.querySelector(".cro-t-16-Faq-new-part")) {
					insertHtml("section#second-call-to-action", faqSection, "beforebegin");
				}
			});

			waitForElement('.cro-t-16-faq-item[index="1"]', function () {
				document.querySelector('.cro-t-16-faq-item[index="1"]').click();
			});

			cardTextChange()
		}


		live(".cro-t-16-faq-item", "click", function () {
			var croIndex = this.getAttribute("index");
			toggleFaq(croIndex);
		});
		function toggleFaq(index) {
			var faqItems = document.querySelectorAll(".cro-t-16-faq-item");
			var clickedFaqItem = faqItems[index - 1];
			var clickedAnswer = clickedFaqItem.querySelector(".cro-t-16-answer");
			var toggleSymbol = clickedFaqItem.querySelector(".toggle-symbol");
			// Close any open answer
			if (currentOpen && currentOpen !== clickedAnswer) {
				currentOpen.style.maxHeight = "0px";
				document.querySelectorAll(".cro-t-16-faq-item").forEach(function (e) {
					if (e.classList.contains("clicked")) {
						e.classList.remove("clicked");
					}
				});
				toggleClass(currentOpen.previousElementSibling, "clicked");
				// currentOpen.previousElementSibling.querySelector(".toggle-symbol").textContent = "+";
			}
			// Toggle the display of the answer
			clickedAnswer.style.maxHeight = clickedAnswer.style.maxHeight === "500px" ? "0px" : "500px";
			// toggleSymbol.textContent = clickedAnswer.style.maxHeight === "500px" ? "-" : "+";
			toggleClass(clickedFaqItem, "clicked");
			currentOpen = clickedAnswer;
		}



		/* Initialise variation */
		waitForElement('body', init);

	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();