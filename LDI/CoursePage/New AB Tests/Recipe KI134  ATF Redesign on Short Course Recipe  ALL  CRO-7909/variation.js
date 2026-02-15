(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro_ki134";
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
        
        var education = `<div class="croki134-dental-education" style="display: none;">
        <div class="croki134-dental-education-wrapper">
            <div class="croki134-dental-education-inner">
                <div class="croki134-dental-education-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1490" height="215" viewBox="0 0 1490 215" fill="none">
  <path opacity="0.25" d="M23.821 839.969C69.036 1008.74 186.547 1023.85 344.14 981.611C344.14 981.627 344.164 981.627 344.212 981.611C585.566 916.943 782.569 1031.77 851.675 1071.68C943.232 1124.52 1092.89 1228.75 1207.54 1162.54C1328.46 1092.74 1364.92 1037.76 1411.96 960.287C1492.36 827.784 1510.83 666.761 1466.17 518.259C1414.14 345.267 1360.55 124.109 1184.68 22.5495C890.798 -147.109 383.814 135.719 383.814 135.719C383.814 135.719 -112.999 329.244 23.845 839.945L23.821 839.969Z" fill="white"/>
</svg>
                </div>
                <div class="croki134-dental-education-top-part">
                    <div class="croki134-dental-education-top-logo">
                        <img class="cro-adee-logo" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe_KI134/cro-ld-KI134-1.png" alt="">
                    </div>
                    <div class="croki134-dental-education-text">
                        Member of The Association for Dental Education in Europe
                    </div>

                </div>
                <div class="croki134-dental-education-icon-parent">
                    <div class="croki134-dental-education-icon-text icon-1">
                        <div class="croki134-dental-education-icon-wrapper">
                            <div class="croki134-dental-education-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M13.4552 22H3.50012C3.50012 22 3.50012 25.5 7.04031 25.5H25.4599C29.0001 25.5 29.0001 22 29.0001 22H19.045L18.667 22.8843H13.8332L13.4552 22Z" stroke="#330499" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
    <path d="M13.5002 8H19.0002" stroke="#0090C0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5.50024 22V7.04208C5.50024 6.46656 5.96217 6 6.53199 6H25.9685C26.5383 6 27.0002 6.46656 27.0002 7.04208V22" stroke="#330499" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
    </svg>
                            </div>
                            <div class="croki134-dental-education-text">
                            Flexible online study from anywhere in the world
                        </div>
                        </div>

                    </div>
                    <div class="croki134-dental-education-icon-text icon-2">
                        <div class="croki134-dental-education-icon-wrapper">
                            <div class="croki134-dental-education-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16.0006 6L29.0006 11.75L16.0006 17.5L3.00061 11.75L16.0006 6Z" stroke="#210066" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
    <path d="M25.0003 14V21.8488C25.0003 24.1744 20.2003 26.5 16.0003 26.5C11.8003 26.5 7.00034 24.1744 7.00034 21.8488V14" stroke="#210066" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
    <path d="M4.50058 15V20" stroke="#0090C0" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
    </svg>
                            </div>
                            <div class="croki134-dental-education-text">
                            Upgrade pathway to a UK-accredited Level-7 Diploma
                        </div>
                        </div>
                    </div>
                    <div class="croki134-dental-education-icon-text icon-3">
                        <div class="croki134-dental-education-icon-wrapper">
                            <div class="croki134-dental-education-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M14.6667 28H5.33333C5.33333 23.298 8.81027 19.4081 13.3333 18.7612M26.4968 20.2717C26.4059 20.2772 26.3143 20.28 26.2223 20.28C24.8563 20.28 23.6103 19.6699 22.6667 18.6667C21.7231 19.6699 20.4771 20.2799 19.1111 20.2799C19.0191 20.2799 18.9275 20.2771 18.8365 20.2716C18.7256 20.7804 18.6667 21.314 18.6667 21.8639C18.6667 24.8161 20.3664 27.2967 22.6667 28C24.9669 27.2967 26.6667 24.8161 26.6667 21.8639C26.6667 21.314 26.6077 20.7804 26.4968 20.2717ZM20 9.33333C20 12.2789 17.6121 14.6667 14.6667 14.6667C11.7211 14.6667 9.33333 12.2789 9.33333 9.33333C9.33333 6.38781 11.7211 4 14.6667 4C17.6121 4 20 6.38781 20 9.33333Z" stroke="#210066" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
                            </div>
                            <div class="croki134-dental-education-text">
                            Taught by our leading global composite dentistry experts
                        </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>`;

    var educationMob = `<div class="croki134-dental-education cro-mobile" style="display: none;">
        <div class="croki134-dental-education-wrapper">
            <div class="croki134-dental-education-inner">
                <div class="croki134-dental-education-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1490" height="215" viewBox="0 0 1490 215" fill="none">
  <path opacity="0.25" d="M23.821 839.969C69.036 1008.74 186.547 1023.85 344.14 981.611C344.14 981.627 344.164 981.627 344.212 981.611C585.566 916.943 782.569 1031.77 851.675 1071.68C943.232 1124.52 1092.89 1228.75 1207.54 1162.54C1328.46 1092.74 1364.92 1037.76 1411.96 960.287C1492.36 827.784 1510.83 666.761 1466.17 518.259C1414.14 345.267 1360.55 124.109 1184.68 22.5495C890.798 -147.109 383.814 135.719 383.814 135.719C383.814 135.719 -112.999 329.244 23.845 839.945L23.821 839.969Z" fill="white"/>
</svg>
                </div>
                <div class="croki134-dental-education-top-part">
                    <div class="croki134-dental-education-top-logo">
                        <img class="cro-adee-logo" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe_KI134/cro-ld-KI134-1.png" alt="">
                    </div>
                    <div class="croki134-dental-education-text">
                        Member of The Association for Dental Education in Europe
                    </div>

                </div>
                <div class="croki134-dental-education-icon-parent">
                    <div class="croki134-dental-education-icon-text icon-1">
                        <div class="croki134-dental-education-icon-wrapper">
                            <div class="croki134-dental-education-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M13.4552 22H3.50012C3.50012 22 3.50012 25.5 7.04031 25.5H25.4599C29.0001 25.5 29.0001 22 29.0001 22H19.045L18.667 22.8843H13.8332L13.4552 22Z" stroke="#330499" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
    <path d="M13.5002 8H19.0002" stroke="#0090C0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5.50024 22V7.04208C5.50024 6.46656 5.96217 6 6.53199 6H25.9685C26.5383 6 27.0002 6.46656 27.0002 7.04208V22" stroke="#330499" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
    </svg>
                            </div>
                            <div class="croki134-dental-education-text">
                            Flexible online study from anywhere in the world
                        </div>
                        </div>

                    </div>
                    <div class="croki134-dental-education-icon-text icon-2">
                        <div class="croki134-dental-education-icon-wrapper">
                            <div class="croki134-dental-education-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16.0006 6L29.0006 11.75L16.0006 17.5L3.00061 11.75L16.0006 6Z" stroke="#210066" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
    <path d="M25.0003 14V21.8488C25.0003 24.1744 20.2003 26.5 16.0003 26.5C11.8003 26.5 7.00034 24.1744 7.00034 21.8488V14" stroke="#210066" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
    <path d="M4.50058 15V20" stroke="#0090C0" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
    </svg>
                            </div>
                            <div class="croki134-dental-education-text">
                            Upgrade pathway to a UK-accredited Level-7 Diploma
                        </div>
                        </div>
                    </div>
                    <div class="croki134-dental-education-icon-text icon-3">
                        <div class="croki134-dental-education-icon-wrapper">
                            <div class="croki134-dental-education-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M14.6667 28H5.33333C5.33333 23.298 8.81027 19.4081 13.3333 18.7612M26.4968 20.2717C26.4059 20.2772 26.3143 20.28 26.2223 20.28C24.8563 20.28 23.6103 19.6699 22.6667 18.6667C21.7231 19.6699 20.4771 20.2799 19.1111 20.2799C19.0191 20.2799 18.9275 20.2771 18.8365 20.2716C18.7256 20.7804 18.6667 21.314 18.6667 21.8639C18.6667 24.8161 20.3664 27.2967 22.6667 28C24.9669 27.2967 26.6667 24.8161 26.6667 21.8639C26.6667 21.314 26.6077 20.7804 26.4968 20.2717ZM20 9.33333C20 12.2789 17.6121 14.6667 14.6667 14.6667C11.7211 14.6667 9.33333 12.2789 9.33333 9.33333C9.33333 6.38781 11.7211 4 14.6667 4C17.6121 4 20 6.38781 20 9.33333Z" stroke="#210066" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
                            </div>
                            <div class="croki134-dental-education-text">
                            Taught by our leading global composite dentistry experts
                        </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>`;


    
        
        function init() {
            addClass("body", variation_name)

            waitForElement('.has_eae_slider h1.elementor-heading-title', function () {
            document.querySelectorAll('.has_eae_slider h1.elementor-heading-title').forEach(function (e) {
                var parent = e.closest('.has_eae_slider.e-child');
                    if (parent && e.innerHTML.indexOf('COMPLETE COMPOSITES') !== -1) {
                            parent.classList.add('cro-complete-text-parent');
                        }
                });
            });
            
            waitForElement("#CourseOverview", function () {
                if (!document.querySelector(".croki134-dental-education")) {
                    insertHtml("#CourseOverview", education, "beforebegin");
                }
            });

            waitForElement(".cro-complete-text-parent", function () {
                if (!document.querySelector(".cro-mobile")) {
                    insertHtml(".cro-complete-text-parent", educationMob, "afterend");
                }
            });
        }
        
       
        
        waitForElement('#CourseOverview', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();