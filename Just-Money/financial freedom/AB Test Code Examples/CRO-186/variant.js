(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "";
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
        var newpartadd = `
        <div class="cro-recipe-30-new-part">
        <div class="cro-recipe-30-new-part-wapper">
            <img class="cro-recipe-30-new-part-img"
                src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/ratings.png" alt="">
        </div>
    </div>`
        /* Variation Init */
        function init() {
            addClass("body", "cro-Recipe-30")
            waitForElement('section#call-to-action-and-form .lead', function () {
                if (!document.querySelector('.cro-recipe-30-new-part')) {
                    insertHtml('section#call-to-action-and-form .lead', newpartadd, "afterend");
                }
            });
        }
        /* Initialise variation */
        waitForElement('body', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();