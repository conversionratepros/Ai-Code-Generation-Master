(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-t-ctm-114";
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

        function init() {
            addClass("body", variation_name);
            waitForElement('.grouped-item.addoncount.has-addon', trigger);
        }

        function cro_114_count() {
            waitForElement(".grouped-item.addoncount.has-addon .addon-product", function () {
                var addonGroups = document.querySelectorAll(".grouped-item.addoncount.has-addon");
                var addonSpans = document.querySelectorAll(".cro-114-addons");

                addonGroups.forEach(function (group, index) {
                    var count = group.querySelectorAll(".addon-product").length;
                    if (addonSpans[index]) {
                        addonSpans[index].textContent = count;
                    }
                });
            });
        }

        function trigger() {
            var doneTypingInterval = 3000;  //time in ms, 5 seconds for example
            var intervalCallAgain = setInterval(function () {
                newInit();
            }, 400);

            //start the countdown
            var Timer = setTimeout(function () {
                clearInterval(intervalCallAgain);
            }, doneTypingInterval);

        }

        function newInit() {

            document.querySelectorAll('.grouped-item.addoncount.has-addon').forEach(function (e) {
                var numberOfAddons = e.querySelectorAll('.cart.item.addon-product');
                var instalationText = e.querySelector('.installation-span');
                var checkdropdown = e.querySelector('.installation.install-view.flip');
                if (!checkdropdown) {
                    e.querySelector('.installation.install-view').click();
                }
                var cro_114_installation = `<div class="cro-114-minimizing-installation">
                    <div class="cro-114-minimizing-installation-wrapper">
                        <div class="cro-114-minimizing-installation-inner">
                            <div class="cro-114-minimizing-installation-img">
                                <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/CTM/Recipe+114+_CTM_hammerIcon.svg" alt="">
                            </div>
                            <div class="cro-114-minimizing-installation-content">
                                <p>Required Installation Products (<span class="cro-114-addons">${numberOfAddons.length}</span>): </p>
                            </div>
                        </div>
                    </div>
                </div>`;

                if (instalationText && !e.querySelector('.cro-114-minimizing-installation')) {
                    instalationText.insertAdjacentHTML('beforebegin', cro_114_installation);
                }
            })
        }


        function observer() {
            function observeCartTotalItems(callback) {
                var targetSelector = '.cart-summary-wrapper #cart-totals .grand.totals .price';
                var targetNode = document.querySelector(targetSelector);

                if (!targetNode) {
                    console.warn("Target element not found: " + targetSelector);
                    return;
                }

                var observer = new MutationObserver(function (mutationsList) {
                    for (var i = 0; i < mutationsList.length; i++) {
                        var mutation = mutationsList[i];
                        if (mutation.type === "childList" || mutation.type === "characterData") {
                            callback(targetNode.textContent.trim());
                        }
                    }
                });

                observer.observe(targetNode, { childList: true, subtree: true, characterData: true });

                return observer;
            }

            // Example usage
            var observerInstance = observeCartTotalItems(function (newValue) {
                if (!document.querySelector('.cro-114-minimizing-installation')) {
                    trigger();
                    console.log('-------Updated')
                } else {
                    cro_114_count();
                }
            });
        }

        if (!window.cro_t_ctm_114) {
            waitForElement('.cart-summary-wrapper #cart-totals .grand.totals .price', observer);
            window.cro_t_ctm_114 = true;
        }

        waitForElement('.cart-container', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();
