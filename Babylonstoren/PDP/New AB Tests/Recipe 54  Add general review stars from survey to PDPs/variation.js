(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro54";
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

        var newParts = `<div class="cro54-rating-bar">
  <div class="cro54-rating-content">
    <div class="cro54-rating-icon-star">
        <img src="https://i.ibb.co.com/Sw4BXBPw/Frame-6.png" alt="stars" class="stars">
    </div>
    <div class="cro54-rating-text-parent">
      <div class="cro54-rating-text"><span>Rated 4.86/5</span> by 5,000+ happy customers across all products on our online shop.</div>
    </div>
  </div>
</div>`;
        

        function init() {
            addClass("body", variation_name);

            waitForElement('.d-block.ng-star-inserted h3.heading', function () {
                document.querySelectorAll('.d-block.ng-star-inserted h3.heading').forEach(function (e) {
                    var parent = e.closest('.d-block.ng-star-inserted');
                        if (parent && e.innerHTML.indexOf('You May Also Like') !== -1) {
                            parent.classList.add('cro-product-detail');
                        }
                });
            });

            waitForElement(".x-page-row.ng-star-inserted", function () {
                if (!document.querySelector(".cro54-rating-bar")) {
                    insertHtml(".x-page-row.ng-star-inserted", newParts, "beforebegin");
                }
            });

        }
        
        waitForElement('body', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();