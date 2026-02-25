(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-cb-70_71";
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

        var croStock = `<div class="cro-70_71-stock">
        <div class="cro-stock-wrapper">
            <div class="cro-stock-inner">
                <div class="cro-stock-img">
                    <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Carrol+boyes/Recipe+70.71/cro_cb_70_71.svg" alt="">
                </div>
                <div class="cro-stock-content">
                    <span>Currently In Stock</span>
                </div>
            </div>
        </div>
    </div>`;
        
        function init() {
            addClass("body", variation_name);
            
        }
        
        waitForElement('.product-info-main .stock.available', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();