(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-ki103-pdp";    
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
        
        function removeClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.contains(cls) && el.classList.remove(cls);
            }
        }

        var pageImages = {
            "https://londondentalinstitute.com/orthodontics-dentofacial-orthopaedics/": [
                { type: "mob", url: "https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI103/orthodontics+mobile.svg"},
                { type: "desk", url: "https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI103/Orthodontics.svg"}
            ],
            "https://londondentalinstitute.com/dental-implantology-oral-surgery/": [
                { type: "mob", url: "https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI103/Implantology+mobile.svg" },
                { type: "desk", url: "https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI103/Implantology.svg" }
            ],
            "https://londondentalinstitute.com/aesthetic-restorative-dentistry/": [
                { type: "mob", url: "https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI103/Aesthetics+mobile.svg" },
                { type: "desk", url: "https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+KI103/Aesthetics.svg" }
            ]
        };


        var cro_103_prospectus = `<section class="cro-t-103-courseProspectus">
        <div class="cro-t-103-courseProspectus-wrapper">
            <div class="cro-t-103-courseProspectus-inner">
                
                <div class="cro-t-103-courseProspectus-content">

					<div class="elementor-element elementor-widget-heading" data-element_type="widget" data-widget_type="heading.default">
				        <div class="elementor-widget-container">
			                <h2 class="elementor-heading-title elementor-size-default">Course prospectus</h2>
                        </div>
				    </div>

                    <div class="elementor-element elementor-widget-text-editor" data-element_type="widget" data-widget_type="text-editor.default">
                        <div class="elementor-widget-container">
                            <div class="bb-theme-elementor-wrap bb-elementor-custom-color bb-elementor-custom-family bb-elementor-custom-size bb-elementor-tablet-custom-size bb-elementor-mobile-custom-size bb-elementor-custom-line-height bb-elementor-tablet-custom-line-height bb-elementor-mobile-custom-line-height">
                                <p class="cro-t-103-subHeader">Get the full course prospectus with everything you need, from modules and pricing to faculty and learning format.</p>
                                <p class="cro-t-103-pointHeader">What’s included</p>				
                            </div>
                            <div class="cro103-university-terms-right-feedback-part">
                                <div class="cro103-university-terms-right-icon-text-parent">
                                    <div class="cro103-university-terms-right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <g clip-path="url(#clip0_245_22)">
                                                <path d="M8.00141 16.292C12.4205 16.292 16.0028 12.7097 16.0028 8.2906C16.0028 3.87154 12.4205 0.289185 8.00141 0.289185C3.58235 0.289185 0 3.87154 0 8.2906C0 12.7097 3.58235 16.292 8.00141 16.292Z" fill="#00A9E0"></path>
                                                <path d="M6.6734 12.0048L3.55469 9.10623L4.48042 8.10994L6.6734 10.1477L11.5222 5.64319L12.448 6.63948L6.6734 12.0048Z" fill="white"></path>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_245_22">
                                                    <rect width="16" height="16" fill="white" transform="translate(0 0.289185)"></rect>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div class="cro103-university-terms-right-text">
                                        Course structure &amp; modules
                                    </div>
                                </div>
                                <div class="cro103-university-terms-right-icon-text-parent">
                                    <div class="cro103-university-terms-right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <g clip-path="url(#clip0_245_22)">
                                                <path d="M8.00141 16.292C12.4205 16.292 16.0028 12.7097 16.0028 8.2906C16.0028 3.87154 12.4205 0.289185 8.00141 0.289185C3.58235 0.289185 0 3.87154 0 8.2906C0 12.7097 3.58235 16.292 8.00141 16.292Z" fill="#00A9E0"></path>
                                                <path d="M6.6734 12.0048L3.55469 9.10623L4.48042 8.10994L6.6734 10.1477L11.5222 5.64319L12.448 6.63948L6.6734 12.0048Z" fill="white"></path>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_245_22">
                                                    <rect width="16" height="16" fill="white" transform="translate(0 0.289185)"></rect>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div class="cro103-university-terms-right-text">
                                        Learning outcomes &amp; timeline
                                    </div>
                                </div>
                                <div class="cro103-university-terms-right-icon-text-parent">
                                    <div class="cro103-university-terms-right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <g clip-path="url(#clip0_245_22)">
                                                <path d="M8.00141 16.292C12.4205 16.292 16.0028 12.7097 16.0028 8.2906C16.0028 3.87154 12.4205 0.289185 8.00141 0.289185C3.58235 0.289185 0 3.87154 0 8.2906C0 12.7097 3.58235 16.292 8.00141 16.292Z" fill="#00A9E0"></path>
                                                <path d="M6.6734 12.0048L3.55469 9.10623L4.48042 8.10994L6.6734 10.1477L11.5222 5.64319L12.448 6.63948L6.6734 12.0048Z" fill="white"></path>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_245_22">
                                                    <rect width="16" height="16" fill="white" transform="translate(0 0.289185)"></rect>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div class="cro103-university-terms-right-text">
                                        Pricing breakdown
                                    </div>
                                </div>
                                <div class="cro103-university-terms-right-icon-text-parent">
                                    <div class="cro103-university-terms-right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <g clip-path="url(#clip0_245_22)">
                                                <path d="M8.00141 16.292C12.4205 16.292 16.0028 12.7097 16.0028 8.2906C16.0028 3.87154 12.4205 0.289185 8.00141 0.289185C3.58235 0.289185 0 3.87154 0 8.2906C0 12.7097 3.58235 16.292 8.00141 16.292Z" fill="#00A9E0"></path>
                                                <path d="M6.6734 12.0048L3.55469 9.10623L4.48042 8.10994L6.6734 10.1477L11.5222 5.64319L12.448 6.63948L6.6734 12.0048Z" fill="white"></path>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_245_22">
                                                    <rect width="16" height="16" fill="white" transform="translate(0 0.289185)"></rect>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div class="cro103-university-terms-right-text">
                                        Faculty and accreditations
                                    </div>
                                </div>
                                <div class="cro103-university-terms-right-icon-text-parent">
                                    <div class="cro103-university-terms-right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <g clip-path="url(#clip0_245_22)">
                                                <path d="M8.00141 16.292C12.4205 16.292 16.0028 12.7097 16.0028 8.2906C16.0028 3.87154 12.4205 0.289185 8.00141 0.289185C3.58235 0.289185 0 3.87154 0 8.2906C0 12.7097 3.58235 16.292 8.00141 16.292Z" fill="#00A9E0"></path>
                                                <path d="M6.6734 12.0048L3.55469 9.10623L4.48042 8.10994L6.6734 10.1477L11.5222 5.64319L12.448 6.63948L6.6734 12.0048Z" fill="white"></path>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_245_22">
                                                    <rect width="16" height="16" fill="white" transform="translate(0 0.289185)"></rect>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div class="cro103-university-terms-right-text">
                                        FAQs &amp; support options
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="elementor-element elementor-mobile-align-left elementor-widget elementor-widget-button" data-element_type="widget" data-widget_type="button.default">
                        <div class="elementor-widget-container">
                            <div class="elementor-button-wrapper">
                                <a class="elementor-button elementor-button-link elementor-size-sm">
                                    <span class="elementor-button-content-wrapper">
                                        <span class="elementor-button-text">Download prospectus</span>
                                    </span>
                                </a>
                            </div>
                        </div>
				    </div>

				</div>

                <div class="cro-t-103-courseProspectus-img">

                    <div class="elementor-widget-container cro-t-103-courseProspectus-img">
                        <img src="" class="cro-103-courseProspectus-mob">
                        <img src="" class="cro-103-courseProspectus-des">
                    </div>

                </div>

            </div>
        </div>
    </section>`;

        
        function addingClassToSection() {
            waitForElement('h2.elementor-heading-title', function () {
                if (window.location.href.includes("orthodontics-dentofacial-orthopaedics")) {
                    document.querySelectorAll('h2.elementor-heading-title').forEach(function (e) {
                        if (e.textContent.includes('How will the Orthodontics & Dentofacial Orthopaedics PG Dip. benefit you?')) {
                            e.closest('section').classList.add('cro-t-103-benefit');
                        }
                        if (e.textContent.includes('Requirements and accreditation')) {
                            e.closest('section').classList.add('cro-t-103-requirements');
                        }
                        if (e.textContent.includes('Optional in-person training')) {
                            e.closest('section').classList.add('cro-t-103-training');
                        }
                        if (e.textContent.includes('Experience the VLE')) {
                            e.closest('section').classList.add('cro-t-103-experience');
                        }
                        if (e.textContent.includes('Download the app')) {
                            e.closest('section').classList.add('cro-t-103-downloadApp');
                        }
                        if (e.textContent.includes('Elevate your career with a PG Dip. in Orthodontics & Dentofacial Orthopaedics')) {
                            e.closest('section').classList.add('cro-t-103-elevate');
                        }
                        if (e.textContent.includes('Why dentists love our courses')) {
                            e.closest('section').classList.add('cro-t-103-courses');
                        }
                        if (e.textContent.includes('UK Accreditation for dentists from across the world')) {
                            e.closest('section').classList.add('cro-t-103-Accreditation');
                        }
                        if (e.textContent.includes('Pricing')) {
                            e.closest('section').classList.add('cro-t-103-Pricing');
                        }
                        if (e.textContent.includes('Course overview')) {
                            e.closest('section').classList.add('cro-t-103-courseOverview');
                        }
                    });
                    addClass("body", "cro-t-103-orthodonticsPage");
                }

                if (window.location.href.includes("dental-implantology-oral-surgery")) {
                    document.querySelectorAll('h2.elementor-heading-title').forEach(function (e) {
                        if (e.textContent.includes('How will the Dental Implantology and Oral Surgery PG Dip. benefit you?')) {
                            e.closest('section').classList.add('cro-t-103-benefit');
                        }
                        if (e.textContent.includes('Requirements and accreditation')) {
                            e.closest('section').classList.add('cro-t-103-requirements');
                        }
                        if (e.textContent.includes('Optional in-person training')) {
                            e.closest('section').classList.add('cro-t-103-training');
                        }
                        if (e.textContent.includes('Experience the VLE')) {
                            e.closest('section').classList.add('cro-t-103-experience');
                        }
                        if (e.textContent.includes('Download the app')) {
                            e.closest('section').classList.add('cro-t-103-downloadApp');
                        }
                        if (e.textContent.includes('Elevate your career with a PG Dip. in Dental Implantology and Oral Surgery')) {
                            e.closest('section').classList.add('cro-t-103-elevate');
                        }
                        if (e.textContent.includes('Why dentists love our courses')) {
                            e.closest('section').classList.add('cro-t-103-courses');
                        }
                        if (e.textContent.includes('UK Accreditation for dentists from across the world')) {
                            e.closest('section').classList.add('cro-t-103-Accreditation');
                        }
                        if (e.textContent.includes('Pricing')) {
                            e.closest('section').classList.add('cro-t-103-Pricing');
                        }
                        if (e.textContent.includes('Course overview')) {
                            e.closest('section').classList.add('cro-t-103-courseOverview');
                        }
                    });
                    addClass("body", "cro-t-103-implantologyPage");
                }

                if (window.location.href.includes("aesthetic-restorative-dentistry")) {
                    document.querySelectorAll('h2.elementor-heading-title').forEach(function (e) {
                        if (e.textContent.includes('How will the Aesthetic and Restorative PG Dip. benefit you?')) {
                            e.closest('section').classList.add('cro-t-103-benefit');
                        }
                        if (e.textContent.includes('Requirements and accreditation')) {
                            e.closest('section').classList.add('cro-t-103-requirements');
                        }
                        if (e.textContent.includes('Optional in-person training')) {
                            e.closest('section').classList.add('cro-t-103-training');
                        }
                        if (e.textContent.includes('Experience the VLE')) {
                            e.closest('section').classList.add('cro-t-103-experience');
                        }
                        if (e.textContent.includes('Download the app')) {
                            e.closest('section').classList.add('cro-t-103-downloadApp');
                        }
                        if (e.textContent.includes('Elevate your career with a PG Dip. in Aesthetic & Restorative Dentistry')) {
                            e.closest('section').classList.add('cro-t-103-elevate');
                        }
                        if (e.textContent.includes('Why dentists love our courses')) {
                            e.closest('section').classList.add('cro-t-103-courses');
                        }
                        if (e.textContent.includes('UK Accreditation for dentists from across the world')) {
                            e.closest('section').classList.add('cro-t-103-Accreditation');
                        }
                        if (e.textContent.includes('Pricing')) {
                            e.closest('section').classList.add('cro-t-103-Pricing');
                        }
                        if (e.textContent.includes('Course overview')) {
                            e.closest('section').classList.add('cro-t-103-courseOverview');
                        }
                    });
                    addClass("body", "cro-t-103-aestheticPage");
                }
                
            });
        }

        function addingSection(){
            waitForElement(".bb-elementor-content>.elementor", function () {
                if (!document.querySelector(".cro-t-103-courseProspectus")) {
                    insertHtml(".cro-t-103-courseOverview", cro_103_prospectus, "afterend");
                }
            });

            waitForElement(".cro-t-103-Pricing a span", function () {
                document.querySelectorAll('.cro-t-103-Pricing a span').forEach(function (e) {
                    if (e.textContent.includes('Download prospectus')) {
                        e.closest('.cro-t-103-Pricing a').classList.add('cro-t-103-downloadProspectus');
                    }
                });
            });
        }
        
        function init() {
            var currentUrl = window.location.href;

            Object.entries(pageImages).forEach(function([urlPart, images]) {
                if (currentUrl.includes(urlPart)) {
                    addClass("body", variation_name);
                    addingClassToSection();
                    addingSection();

                    images.forEach(function(imageObj) {
                        waitForElement(".cro-t-103-courseProspectus-img", function () {
                            if (imageObj.type === "mob") {
                                var mobImgEl = document.querySelector(".cro-t-103-courseProspectus-img .cro-103-courseProspectus-mob");
                                if (mobImgEl) mobImgEl.setAttribute("src", imageObj.url);
                            }
                            if (imageObj.type === "desk") {
                                var deskImgEl = document.querySelector(".cro-t-103-courseProspectus-img .cro-103-courseProspectus-des");
                                if (deskImgEl) deskImgEl.setAttribute("src", imageObj.url);
                            }
                        });
                    });
                }
            });
        }
        
        function croEventHandkler() {
            live(".cro-t-103-courseProspectus-inner .elementor-widget-container a", "click", function () {
                document.querySelector(".cro-t-103-Pricing .cro-t-103-downloadProspectus").click();
            });
        }
        
        if (!window.cro_t_103) {
            croEventHandkler();
            window.cro_t_103 = true;
        }
        
        waitForElement('h2.elementor-heading-title', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();