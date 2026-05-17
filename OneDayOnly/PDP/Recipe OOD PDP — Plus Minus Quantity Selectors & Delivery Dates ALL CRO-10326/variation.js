(function () {
    try {
        var VARIATION = 'cro-t-odo-10326';

        var WORDS = [
            '', 'one', 'two', 'three', 'four', 'five',
            'six', 'seven', 'eight', 'nine', 'ten',
            'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
            'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
            'twenty one', 'twenty two', 'twenty three', 'twenty four', 'twenty five'
        ];

        function waitForElement(selector, cb) {
            var tries = 0;
            var timer = setInterval(function () {
                if (document.querySelector(selector)) {
                    clearInterval(timer);
                    cb();
                } else if (++tries >= 200) {
                    clearInterval(timer);
                }
            }, 100);
        }

        function qtyWord(n) {
            if (n >= 1 && n <= 25) return WORDS[n];
            return '[to be confirmed]';
        }

        // Read min/max directly from #product-quantity-select options
        function getSelectLimits() {
            var sel = document.querySelector('#product-quantity-select');
            var values = [];
            for (var i = 0; i < sel.options.length; i++) {
                var v = parseInt(sel.options[i].value, 10);
                if (!isNaN(v)) values.push(v);
            }
            return {
                min: Math.min.apply(null, values),
                max: Math.max.apply(null, values)
            };
        }

        var currentQty = 1;
        var QTY_MIN = 1;
        var QTY_MAX = 10;

        function updateNativeSelect(qty) {
            var sel = document.querySelector('#product-quantity-select');
            if (!sel) return;
            sel.value = qty;
            sel.dispatchEvent(new Event('change', { bubbles: true }));
            sel.dispatchEvent(new Event('input', { bubbles: true }));
        }

        function findIWantBtn() {
            var els = document.querySelectorAll('button, a');
            for (var i = 0; i < els.length; i++) {
                if (/i want/i.test(els[i].textContent)) return els[i];
            }
            return null;
        }

        function updateButtonText(qty) {
            var btn = findIWantBtn();
            if (!btn) return;
            var word = qtyWord(qty);
            var span = btn.querySelector('span');
            if (span && /i want/i.test(span.textContent)) {
                span.textContent = 'I want ' + word;
            } else if (span) {
                span.textContent = word;
            } else {
                btn.textContent = 'I want ' + word;
            }
        }

        function buildStepper() {
            if (document.querySelector('.crp-10326-stepper')) return;

            var sel = document.querySelector('#product-quantity-select');
            if (!sel) return;

            var wrapper = document.createElement('div');
            wrapper.className = 'crp-10326-qty-wrapper';
            wrapper.innerHTML =
                // '<label class="crp-10326-qty-label">Quantity</label>' +
                '<div class="crp-10326-stepper">' +
                '<button class="crp-10326-btn crp-10326-minus" type="button" disabled aria-label="Decrease quantity">&#8722;</button>' +
                '<input class="crp-10326-input" type="text" value="' + QTY_MIN + '" readonly aria-label="Quantity">' +
                '<button class="crp-10326-btn crp-10326-plus" type="button"' + (QTY_MIN >= QTY_MAX ? ' disabled' : '') + ' aria-label="Increase quantity">&#43;</button>' +
                '</div>';

            sel.parentNode.insertBefore(wrapper, sel.nextSibling);

            var minusBtn = wrapper.querySelector('.crp-10326-minus');
            var plusBtn = wrapper.querySelector('.crp-10326-plus');
            var input = wrapper.querySelector('.crp-10326-input');

            plusBtn.addEventListener('click', function () {
                if (currentQty >= QTY_MAX) return;
                currentQty++;
                input.value = currentQty;
                if (currentQty <= QTY_MIN) minusBtn.setAttribute('disabled', 'disabled');
                else minusBtn.removeAttribute('disabled');
                if (currentQty >= QTY_MAX) plusBtn.setAttribute('disabled', 'disabled');
                else plusBtn.removeAttribute('disabled');
                updateNativeSelect(currentQty);
                updateButtonText(currentQty);
            });

            minusBtn.addEventListener('click', function () {
                if (currentQty <= QTY_MIN) return;
                currentQty--;
                input.value = currentQty;
                if (currentQty <= QTY_MIN) minusBtn.setAttribute('disabled', 'disabled');
                else minusBtn.removeAttribute('disabled');
                if (currentQty >= QTY_MAX) plusBtn.setAttribute('disabled', 'disabled');
                else plusBtn.removeAttribute('disabled');
                updateNativeSelect(currentQty);
                updateButtonText(currentQty);
            });
        }

        function init() {
            document.body.classList.add(VARIATION);

            var limits = getSelectLimits();
            QTY_MIN = limits.min;
            QTY_MAX = limits.max;
            currentQty = QTY_MIN;

            waitForElement('[data-action="add-to-cart"]', function () {
                buildStepper();
                updateNativeSelect(currentQty);
                updateButtonText(currentQty);
            });
        }

        if (!window.cro_10326) {
            window.cro_10326 = true;
            waitForElement('#product-quantity-select', init);
        }

    } catch (e) { }
})();
