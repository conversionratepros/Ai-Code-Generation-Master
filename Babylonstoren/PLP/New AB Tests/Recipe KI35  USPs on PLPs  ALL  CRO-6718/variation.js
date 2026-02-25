(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "croki35";
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


        function initMobileSlider() {
            if (window.innerWidth > 767) return;

            var slider = document.querySelector(".croki35-new-inner");
            var slides = document.querySelectorAll(".croki35-usp-item");

            if (!slider || slides.length === 0) return;

            var index = 0;

            slider.style.transform = "translateX(0%)"; // ✅ FIX

            setInterval(function () {
                index++;
                if (index >= slides.length) {
                    index = 0;
                }
                slider.style.transform = "translateX(-" + index * 100 + "%)";
            }, 3000);
        }


        var uspBanner = `<div class="croki35-new-secton" style="display: none;">
        <div class="croki35-new-wrapper">
            <div class="croki35-new-inner">
                <div class="croki35-usp-item">
                    <div class="croki35-usp-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
        <path d="M6.56836 11.8954L9.90301 15.1652C10.0863 15.3449 10.3837 15.3449 10.567 15.1652L17.5684 8.29999" stroke="#09223F" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
                    </div>
                    <div class="croki35-usp-text">
                        Delivered fresh to your door
                    </div>

                </div>
                <div class="croki35-usp-item">
                    <div class="croki35-usp-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
        <path d="M6.56836 11.8954L9.90301 15.1652C10.0863 15.3449 10.3837 15.3449 10.567 15.1652L17.5684 8.29999" stroke="#09223F" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
                    </div>
                    <div class="croki35-usp-text">
                        Guided by the seasons
                    </div>
                </div>
                <div class="croki35-usp-item">
                    <div class="croki35-usp-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
        <path d="M6.56836 11.8954L9.90301 15.1652C10.0863 15.3449 10.3837 15.3449 10.567 15.1652L17.5684 8.29999" stroke="#09223F" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
                    </div>
                    <div class="croki35-usp-text">
                        Local, farm-to-fork provisions
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        
        
        function init() {
           addClass("body", variation_name);

            waitForElement("section.body .x-page-row.my-lg-5", function () {
                if (!document.querySelector(".croki35-new-secton")) {
                    insertHtml("section.body .x-page-row.my-lg-5", uspBanner, "beforebegin");
                     initMobileSlider();
                }
            });
        }
        
        
        waitForElement('body', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();