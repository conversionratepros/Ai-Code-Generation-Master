(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-LDi-t-52_53";
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

		function scroll(selector, targetSelector) {
			var element = document.querySelector(selector);
			if (element) {
				element.addEventListener('click', function (event) {
					event.preventDefault();
					var target = document.querySelector(targetSelector);
					if (target) {
						window.scrollTo({
							top: target.getBoundingClientRect().top + window.scrollY,
							behavior: 'smooth'
						});
					}
				});
			}
		}
		

        // variation html
        var cro_52_53 = `<section class="cro-LDi-t-52-53-section">
        <div class="cro-LDi-t-52-53-wrapper">
            <div class="cro-LDi-t-52-53-inner">
                <h2>What’s on this page</h2>
                <ul>
                    <li class="cro-LDi-t-52-Requirements">
                        
                        <a href="#cro-LDi-t-52-53-accreditation"><p>Entry Requirements</p><img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+52.53+/cro-LDi-52_53-arrowIcon.svg" alt="Arrow"></a>
                    </li>
                    <li class="cro-LDi-t-52-Modules">
                        
                        <a href="#cro-LDi-t-52-53-Module"><p>Modules</p><img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+52.53+/cro-LDi-52_53-arrowIcon.svg" alt="Arrow"></a>
                    </li>
                    <li class="cro-LDi-t-52-Reviews">
                        
                        <a href="#cro-LDi-t-52-53-ourCourses"><p>Course Reviews</p><img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+52.53+/cro-LDi-52_53-arrowIcon.svg" alt="Arrow"></a>
                    </li>
                    <li class="cro-LDi-t-52-Faculty">
                        
                        <a href="#cro-LDi-t-52-53-faculty"><p>Faculty</p><img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+52.53+/cro-LDi-52_53-arrowIcon.svg" alt="Arrow"></a>
                    </li>
                    <li class="cro-LDi-t-52-Overview">
                        
                        <a href="#cro-LDi-t-52-53-courseOverview"><p>Overview &amp; Pricing</p><img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+52.53+/cro-LDi-52_53-arrowIcon.svg" alt="Arrow"></a>
                    </li>
                    <li class="cro-LDi-t-52-FAQs">
                        
                        <a href="#cro-LDi-t-52-53-Frequently"><p>FAQs</p><img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/Recipe+52.53+/cro-LDi-52_53-arrowIcon.svg" alt="Arrow"></a>
                    </li>
                </ul>
            </div>
        </div>
    </section>`;

        function init() {
            addClass("body", variation_name);
            addingClassName();
            addingSection();

        }

        function addingClassName() {
            waitForElement("h2.elementor-heading-title", function () {
                document.querySelectorAll('h2.elementor-heading-title').forEach(function (e) {
                    var parent = e.closest('section')
                    if (e.innerHTML.indexOf("What's on this page") != -1) {
                        parent.id = 'cro-LDi-t-52-53-whatsOnPage';
                        parent.classList.add('cro-LDi-t-52-53-whatsOnPage');
                    }
                    if (e.innerHTML.indexOf("Course overview") != -1) {
                        parent.id = 'cro-LDi-t-52-53-courseOverview';
                        parent.classList.add('cro-LDi-t-52-53-courseOverview');
                    }
                    if (e.innerHTML.indexOf("Requirements and accreditation") != -1) {
                        parent.id = 'cro-LDi-t-52-53-accreditation';
                        parent.classList.add('cro-LDi-t-52-53-accreditation');
                    }
                    if (e.innerHTML.indexOf("Module overview") != -1) {
                        parent.id = 'cro-LDi-t-52-53-Module';
                        parent.classList.add('cro-LDi-t-52-53-Module');
                    }
                    if (e.innerHTML.indexOf("Why dentists love our courses") != -1) {
                        parent.id = 'cro-LDi-t-52-53-ourCourses';
                        parent.classList.add('cro-LDi-t-52-53-ourCourses');
                    }
                    if (e.innerHTML.indexOf("Meet our faculty") != -1) {
                        parent.id = 'cro-LDi-t-52-53-faculty';
                        parent.classList.add('cro-LDi-t-52-53-faculty');
                    }
                    if (e.innerHTML.indexOf("Frequently asked questions") != -1) {
                        parent.id = 'cro-LDi-t-52-53-Frequently';
                        parent.classList.add('cro-LDi-t-52-53-Frequently');
                    }
                    if (e.innerHTML.indexOf("Pricing") != -1) {
                        parent.id = 'cro-LDi-t-52-53-Pricing';
                        parent.classList.add('cro-LDi-t-52-53-Pricing');
                    }
                    if (e.innerHTML.indexOf("UK Accreditation for dentists from across the world") != -1) {
                        parent.id = 'cro-LDi-t-52-53-UKAccreditation';
                        parent.classList.add('cro-LDi-t-52-53-UKAccreditation');
                    }
                })
            });
        }

        function addingSection() {
            waitForElement(".cro-LDi-t-52-53-whatsOnPage", function () {
                if (!document.querySelector(".cro-LDi-t-52-53-section")) {
                    insertHtml(".cro-LDi-t-52-53-whatsOnPage", cro_52_53, "afterend");
                }
            });
        }

		

        function croEventHandkler() {
            
        }



        // if (!window.cro_t_52_53) {
            // if(window.innerWidth < 768){
                // croEventHandkler();
                waitForElement('h2.elementor-heading-title', init);
                // window.cro_t_52_53 = true;
            // }

        // }
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();