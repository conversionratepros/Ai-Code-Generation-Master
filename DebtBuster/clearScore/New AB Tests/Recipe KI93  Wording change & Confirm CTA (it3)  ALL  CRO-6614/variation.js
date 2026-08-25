(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "CRO-test93-ID-4781";
		/* Convert IDs written into the HubSpot form's hidden fields
		   (experiment_id / variant_id — Confluent DB tracking). Hardcoded
		   per-variation; falls back to convert.currentData if blank. */
		var EXPERIMENT_ID = "1004171970";
		var VARIANT_ID = "1004405818";

		function populateConvertIds(doc) {
			try {
				var expField = doc.querySelector('input[name="experiment_id"]');
				var varField = doc.querySelector('input[name="variant_id"]');
				if (!expField || !varField) {
					if (debug) console.log('[CRO] experiment_id/variant_id hidden fields not found in HubSpot form');
					return;
				}
				var expId = EXPERIMENT_ID, varId = VARIANT_ID;
				if ((!expId || !varId) && window.convert && window.convert.currentData && window.convert.currentData.experiences) {
					var exps = window.convert.currentData.experiences;
					var ids = Object.keys(exps);
					if (ids.length) {
						expId = ids[0];
						varId = exps[expId].variation ? exps[expId].variation.id : (exps[expId].variation_id || '');
					}
				}
				/* HubSpot's form is React-driven: set via the native setter and
				   fire input+change so its state (and the POST payload) updates. */
				var setter = Object.getOwnPropertyDescriptor(doc.defaultView.HTMLInputElement.prototype, 'value').set;
				[[expField, expId], [varField, varId]].forEach(function (pair) {
					setter.call(pair[0], String(pair[1]));
					pair[0].dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
					pair[0].dispatchEvent(new doc.defaultView.Event('change', { bubbles: true }));
				});
				console.log('[CRO] experiment_id:', expId, '| variant_id:', varId);
			} catch (e) { if (debug) console.log(e, 'error in populateConvertIds'); }
		}
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

		var newHeading = `    <div class="cro-t-93-heading">
        <h2>You’re one step away!</h2>
        <p>Click the button below to complete your submission</p>
    </div>`;

		var footer = `<div class="cro-t-93-footer"><div class="hs-richtext hs-main-font-element"><p class="tcs">By continuing you accept our <a href="https://www.debtbusters.co.za/privacy-policy/" rel="noopener" target="_blank">Privacy Notice</a> and <a href="https://www.debtbusters.co.za/terms-and-conditions/" rel="noopener" target="_blank">Terms &amp; Conditions</a>.</p></div></div>`;



		function init() {
			addClass('body', variation_name);
			// .blurb [data-hs-cos-field="top_blurb"]
			waitForElement('#hs-form-iframe-0', function () {
				if (!document.querySelector('.cro-t-93-heading')) {
					document.querySelector('.blurb [data-hs-cos-field="top_blurb"]').insertAdjacentHTML('beforebegin', newHeading)
				}
			});

			waitForElement('#form-embed-placeholder + .blurb', function () {
				if (!document.querySelector('.cro-t-93-footer')) {
					document.querySelector('#form-embed-placeholder + .blurb').insertAdjacentHTML('afterend', footer)
				}
			});

			const iframe = document.querySelector('#hs-form-iframe-0');

			const waitForInputs = (cb) => {
				const names = ['firstname', 'lastname', 'email', 'phone', 'id_number'];
				const poll = setInterval(() => {
					const doc = iframe.contentWindow?.document;
					if (!doc) return;
					const inputs = names.map(n => doc.querySelector(`[name="${n}"]`));
					if (inputs.every(Boolean)) {
						clearInterval(poll);
						cb(doc, names, inputs);
					}
				}, 80);
				setTimeout(() => clearInterval(poll), 15000);
			};

			waitForInputs((doc, names, inputs) => {
				populateConvertIds(doc);
				const parents = inputs.map(i => i.closest('.hs-form-field')).filter(Boolean);

				const hideAll = () => {
					parents.forEach(p => p && (p.style.display = 'none'));
					iframe.classList.add('cro-fields-hidden');   // ✅ add class to iframe itself
				};
				const showAll = () => {
					parents.forEach(p => p && (p.style.display = ''));
					iframe.classList.remove('cro-fields-hidden'); // ✅ remove class from iframe
					iframe.classList.add('cro-fields-margin')
				};

				var btn = iframe.contentWindow?.document;
				btn.querySelector('input[type="submit"]').value = 'Confirm';

				btn.querySelector('input[type="submit"]').addEventListener('click', function () {
					console.log('----click')
					var doneTypingInterval = 3000;  //time in ms, 5 seconds for example
					var intervalCallAgain = setInterval(function () {
						if (btn.querySelector('input[type="submit"]')) {
							btn.querySelector('input[type="submit"]').value = 'Confirm';
						}

					}, 10);

					//start the countdown
					var Timer = setTimeout(function () {
						clearInterval(intervalCallAgain);
					}, doneTypingInterval);


					var doneTypingInterval2 = 7000;  //time in ms, 5 seconds for example
					var intervalCallAgain2 = setInterval(function () {
						if (!btn.querySelector('input[type="submit"]')) {
							document.querySelector('body').classList.add('CRO-test93-ID-4781-hide_form')
						}

					}, 50);

					//start the countdown
					var Timer = setTimeout(function () {
						clearInterval(intervalCallAgain2);
					}, doneTypingInterval2);

				})



				// 🔹 Inject CSS into iframe
				const style = doc.createElement('style');
				style.textContent = `
                    .hs-richtext.hs-main-font-element h4 {
                        display: none !important;
                    }
                    .hs-id_number + div {
                        display: none;
                    }

                    .hs_submit.hs-submit .actions {
                        padding: 0;
                    }

                     .hs_submit.hs-submit .actions input {
                        display: flex;
                        width: 225px;
                        justify-content: center;
                        align-items: flex-start;
                        font-size: 15px;
                    }
                    .hs_submit.hs-submit .actions input:hover{
                        font-size: 15px !important;
                    }
                    .hbspt-form .submitted-message{
                        color: #263648;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 27px;
                        font-size: 24px !important;
                        margin-top: 40px;
                    }

                     @media (max-width: 767px) {
                         .hs_submit.hs-submit .actions input {
                            width: 100%;
                        }

                        .hbspt-form .submitted-message{
                            font-size: 18px !important;
                            margin-top: 20px;
                            text-align: center;
                        }
                    }
                `;
				doc.head.appendChild(style);

				// --- Wait until all values are prefilled before hiding ---
				const waitForAllValues = (onReady) => {
					const start = Date.now();
					const maxWait = 12000;
					const t = setInterval(() => {
						const allFilled = inputs.every(i => i && i.value.trim() !== '');
						if (allFilled) { clearInterval(t); onReady(); }
						else if (Date.now() - start > maxWait) { clearInterval(t); }
					}, 150);
				};

				waitForAllValues(() => hideAll());

				// --- Show fields if HubSpot flags errors ---
				const checkAndRevealOnError = () => {
					setTimeout(() => {
						const hasAnyError = inputs.some(i =>
							i.classList.contains('error') ||
							i.closest('.hs-form-field')?.querySelector('.error')
						);
						if (hasAnyError) showAll();
					}, 120);
				};

				const form = doc.querySelector('form');
				const submitBtn = doc.querySelector('button[type="submit"], input[type="submit"]');
				if (form) form.addEventListener('submit', checkAndRevealOnError, true);
				if (submitBtn) submitBtn.addEventListener('click', checkAndRevealOnError, true);
			});

		}

		if (!window.cro_test93_ID_4781) {
			waitForElement('#hs-form-iframe-0', init);
			window.cro_test93_ID_4781 = true;
		}

		// https://start.debtbusters.co.za/custom-landing-pages-debt-counselling-clear-score-landing?utm_source=ClearScore&utm_medium=Web&utm_campaign=Clear%20score&firstname=QATest&lastname=test&email=test43212%40gmail.com&phone=27783745001&id_number=8104105044087
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();
