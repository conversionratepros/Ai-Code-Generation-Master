(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "CRO-8175";
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
        
        function innerHTMLContent(selector, content) {
            var el = document.querySelector(selector);
            if (el) {
                el.innerHTML = content;
            }
        }
        
        function innerChildContent(selector, childNumber, content) {
            var el = document.querySelector(selector);
            if (el.hasChildNodes()) {
                el.childNodes[childNumber].textContent = content;
            }
        }
        
        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        }
        
        function toggleClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.toggle(cls);
            }
        }
        
        function removeClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.contains(cls) && el.classList.remove(cls);
            }
        }
        
        function scroll(click, selector) {
            click.addEventListener('click', function (event) {
                event.preventDefault();
                var target = document.querySelector(selector);
                if (target) {
                    window.scrollTo({
                        top: target.getBoundingClientRect().top + window.scrollY,
                        behavior: 'smooth'
                    });
                }
            });
        }

        var sicky_Banner = `<div class="CRO-8175-Sticky-Course">
            <div class="CRO-8175-Sticky-Course-wrapper">
                <div class="CRO-8175-Sticky-Course-inner">
                    <div class="CRO-8175-Sticky-Course-left">
                        <div class="CRO-8175-Sticky-Course-left-text">
                            Course starts 29 May 2026
                        </div>
                    </div>
                    <div class="CRO-8175-Sticky-Course-right">
                        <a class="CRO-8175-Sticky-Course-right-button" href="">Apply Now</a>
                    </div>
                </div>
            </div>
            </div>`;

        
        var courseData = {
    "aesthetic-restorative-dentistry": "https://vle.londondentalinstitute.com/aesthetic-and-restorative-dentistry-programme-summary/",
    "orthodontics-dentofacial-orthopaedics": "https://vle.londondentalinstitute.com/orthodontics-and-dentofacial-orthopaedics-programme-summary/",
    "dental-implantology-oral-surgery": "https://vle.londondentalinstitute.com/diploma-in-dental-implantology-oral-surgery-programme-summary/"
};
        
        
        function init() {
            addClass("body", variation_name)

            waitForElement("body", function () {
                if (!document.querySelector(".CRO-8175-Sticky-Course")) {
                    insertHtml("body", sicky_Banner, "beforebegin");
                }

                // var banner = document.querySelector('.CRO-8175-Sticky-Course');
                // if (!banner) return;

                // window.addEventListener('scroll', function () {
                //     if (window.scrollY > 500) {
                //         banner.classList.add('active');
                //     } else {
                //         banner.classList.remove('active');
                //     }
                // });


                var banner = document.querySelector('.CRO-8175-Sticky-Course');
                var html = document.documentElement;

                if (!banner) return;

                window.addEventListener('scroll', function () {
                    if (window.scrollY > 500) {
                        banner.classList.add('active');
                        html.classList.add('CRO-8175-Sticky-active');
                    } else {
                        banner.classList.remove('active');
                        html.classList.remove('CRO-8175-Sticky-active');
                    }
                });

            });


             waitForElement(".CRO-8175-Sticky-Course-right-button", function (){
                var currentUrl = window.location.href;
                var applyBtn = document.querySelector('.CRO-8175-Sticky-Course-right-button');

                if (applyBtn) {
                    for (var key in courseData) {
                        if (currentUrl.includes(key)) {
                            applyBtn.setAttribute('href', courseData[key]);
                            applyBtn.setAttribute('target', '_self'); // optional
                            break;
                        }
                    }
                }
            });


        }
        
        function croEventHandkler() {
            live("selector", "click", function () {});
        }
        
        if (!window.cro_t_20) {
            croEventHandkler();
            window.cro_t_20 = true;
        }
        
        waitForElement('body', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();