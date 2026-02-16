(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "CRO-test91-ID-4781";
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

        var newHeading = `    <div class="cro-t-91-heading">
        <h2>Congratulations!</h2>
        <p>You are one step closer to reducing your monthly instalments with DebtBusters.</p>
    </div>`;

        function init() {
            addClass('body', variation_name);
            // .blurb [data-hs-cos-field="top_blurb"]
            waitForElement('#hs-form-iframe-0', function () {
                if (!document.querySelector('.cro-t-91-heading')) {
                    document.querySelector('.blurb [data-hs-cos-field="top_blurb"]').insertAdjacentHTML('beforebegin', newHeading)
                }
            });

            // const iframe = document.querySelector('#hs-form-iframe-0');

            // const waitForInputs = (cb) => {
            //     const names = ['firstname', 'lastname', 'email', 'phone', 'id_number'];
            //     const poll = setInterval(() => {
            //         const doc = iframe.contentWindow?.document;
            //         if (!doc) return;
            //         const inputs = names.map(n => doc.querySelector(`[name="${n}"]`));
            //         if (inputs.every(Boolean)) {
            //             clearInterval(poll);
            //             cb(doc, names, inputs);
            //         }
            //     }, 80);
            //     setTimeout(() => clearInterval(poll), 15000);
            // };

            // waitForInputs((doc, names, inputs) => {
            //     const parents = inputs.map(i => i.closest('.hs-form-field')).filter(Boolean);
            //     const hideAll = () => parents.forEach(p => p && (p.style.display = 'none'));
            //     const showAll = () => parents.forEach(p => p && (p.style.display = ''));

            //     // NEW: wait until values are actually populated (handles 1–3s delays)
            //     const waitForAllValues = (onReady) => {
            //         const start = Date.now();
            //         const maxWait = 5000; // 10s safety cap
            //         const t = setInterval(() => {
            //             const allFilled = inputs.every(i => i && i.value.trim() !== '');
            //             if (allFilled) { clearInterval(t); onReady(); }
            //             else if (Date.now() - start > maxWait) { clearInterval(t); /* give up silently */ }
            //         }, 150);
            //     };

            //     waitForAllValues(() => hideAll());

            //     // On submit: after HS validation, show if ANY has .error
            //     const checkAndRevealOnError = () => {
            //         setTimeout(() => {
            //             const hasAnyError = inputs.some(i => i.classList.contains('error'));
            //             if (hasAnyError) showAll();
            //         }, 120); // give HS time to apply .error
            //     };

            //     const form = doc.querySelector('form');
            //     const submitBtn = doc.querySelector('button[type="submit"], input[type="submit"]');
            //     if (form) form.addEventListener('submit', checkAndRevealOnError, true);
            //     if (submitBtn) submitBtn.addEventListener('click', checkAndRevealOnError, true);
            // });

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
                const parents = inputs.map(i => i.closest('.hs-form-field')).filter(Boolean);

                const hideAll = () => {
                    parents.forEach(p => p && (p.style.display = 'none'));
                    iframe.classList.add('cro-fields-hidden');   // ✅ add class to iframe itself
                };
                const showAll = () => {
                    parents.forEach(p => p && (p.style.display = ''));
                    iframe.classList.remove('cro-fields-hidden'); // ✅ remove class from iframe
                };

                // 🔹 Inject CSS into iframe
                const style = doc.createElement('style');
                style.textContent = `
        .hs-richtext.hs-main-font-element h4 {
            display: none !important;
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

        if (!window.cro_test91_ID_4781) {
            waitForElement('#hs-form-iframe-0', init);
            window.cro_test91_ID_4781 = true;
        }

        // https://start.debtbusters.co.za/custom-landing-pages-debt-counselling-clear-score-landing?utm_source=ClearScore&utm_medium=Web&utm_campaign=Clear%20score&firstname=QATest&lastname=test&email=test43212%40gmail.com&phone=27783745001&id_number=8104105044087
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();