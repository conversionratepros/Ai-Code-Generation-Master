(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-ctm_238_240";
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

        var cro_238_toolTip = `<div class="cro-ctm_238_240-toolTip cro-ctm_238_240-toolTip-desktop">
        <div class="cro-ctm_238_240-toolTip-wrapper">
            <div class="cro-ctm_238_240-toolTip-inner">
                <div class="input-title cro-ctm_238_240-input-title">How much do you need?
                    <div class="pdp-tooltip">
                        <p class="pdp-info-icon"><img src="https://www.ctm.co.za/static/version1753191405/frontend/Vectra/ctmkenya/en_US/images/icons/pdp-info-icon.png" class=""></p>
                        <div class="pdp-info">
                            <span></span>
                            <div><p>Use the <b>"Tile Calculator"</b> button to help calculate how many boxes or square metres you need.</p>
                                <p>Don't forget to add an <b>extra 10%</b> for installation. </p>
                                <p>When you have entered your quantities, Click <b>"Add to cart"</b> to get a full quotation of everything you will need for a successful installation.</p></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cro-ctm_238_240-tileTooltip cro-ctm_238_240-toolTip-desktop">
                <div class="input-title cro-ctm_238_240-input-title">Tile calculator
                    <div class="pdp-tooltip">
                        <p class="pdp-info-icon"><img src="https://www.ctm.co.za/static/version1753191405/frontend/Vectra/ctmkenya/en_US/images/icons/pdp-info-icon.png" class=""></p>
                        <div class="pdp-info">
                            <span></span>
                            <div>
                                <p>Use the <b>"Tile Calculator" </b>button to help calculate how many boxes or square metres you need.</p>
                                <p>Enter the width and length of your area in meters to calculate the quantity needed.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

        var cro_238_tile = `<div class="cro-ctm_238_240-calculatorButton">
        <div class="cro-ctm_238_240-tileTooltip cro-ctm_238_240-toolTip-mobile">
            <div class="input-title cro-ctm_238_240-input-title">Tile calculator
                <div class="pdp-tooltip">
                    <p class="pdp-info-icon"><img src="https://www.ctm.co.za/static/version1753191405/frontend/Vectra/ctmkenya/en_US/images/icons/pdp-info-icon.png" class=""></p>
                    <div class="pdp-info">
                        <span></span>
                        <div>
                            <p>Use the <b>"Tile Calculator" </b>button to help calculate how many boxes or square metres you need.</p>
                            <p>Enter the width and length of your area in meters to calculate the quantity needed.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cro_238_240-calculator-wrapper">
            <div class="cro_238_240-calculator-inner">
                <span>Calculate tile quantity for me</span>
            </div>
        </div>
    </div>`;
        
        function init() {
            addClass("body", variation_name);

            // .catalog-product-view .page-wrapper .media-info-main .product-info-main .box-tocart .control
            waitForElement(".catalog-product-view .page-wrapper .media-info-main .product-info-main .box-tocart .control", function () {
                if (!document.querySelector(".cro-ctm_238_240-toolTip.cro-ctm_238_240-toolTip-desktop")) {
                    insertHtml(".catalog-product-view .page-wrapper .media-info-main .product-info-main .calc-container", cro_238_toolTip, "beforebegin");
                }
            });

            // .catalog-product-view .page-wrapper .media-info-main .product-info-main .calc-container button
            waitForElement(".catalog-product-view .page-wrapper .media-info-main .product-info-main .calc-container", function () {
                if (!document.querySelector(".cro-ctm_238_240-calculatorButton")) {
                    insertHtml(".catalog-product-view .page-wrapper .media-info-main .product-info-main .calc-container", cro_238_tile, "beforeend");
                }
            });            
        }
        
        function croEventHandkler() {
            live(".cro_238_240-calculator-inner", "click", function () {
                var calBtn = document.querySelector(".catalog-product-view .page-wrapper .media-info-main .product-info-main .calc-container button#calc_btn");
                if (calBtn) {
                    calBtn.click();
                }
            });
        }
        
        if (!window.cro_t_238_240) {
            croEventHandkler();
            window.cro_t_238_240 = true;
        }
        
        waitForElement('.catalog-product-view', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();