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
        function live(selector, event, callback, context) {
            // helper for enabling IE 8 event bindings
            function addEvent(el, type, handler) {
                if (el.attachEvent) el.attachEvent("on" + type, handler);
                else el.addEventListener(type, handler);
            }
            // matches polyfill
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
            // live binding helper using matchesSelector
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
                event.preventDefault(); // Prevent default behavior of the anchor tag
                var target = document.querySelector(selector);
                if (target) {
                    window.scrollTo({
                        top: target.getBoundingClientRect().top + window.scrollY,
                        behavior: 'smooth'
                    });
                }
            });
        }
        var topButton = `<div class="cro-top-button-sec">
        <div class="top-button">
            <div class="main-icon">
                <img class="img-icon" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Vector.png" alt="">
            </div>
            <div class="btn-text-sec">
                <p class="btn-first-text">Rated</p>
                <div class="btn-sec-part">
                    <p class="btn-sec-text">5/5</p>
                    <img class="btn-star-sec"
                        src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202a.png" alt="">
                </div>
                <p class="btn-last-text">On Hellopeter</p>
            </div>
        </div>
                        </div>`
        var newcards = `<section class="new-sec">
        <div class="cro-new-sec-wrapper relative container">
        <div class="cro-header-part">
            <h2 class="top-header">What our clients say about us</h2>
            <div class="sec-part">
                <div class="sec-header-part">
                    <p class="sec-frst-text">Rated 5/5</p>
                    <img class="top-icon" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
                    <p class="sec-sec-text">out of <strong>461</strong> Reviews on Hellopeter</p>
                </div>
            </div>
        </div>
        <div class="cards-part">
            
            <div class="first-card">
            <div class="back-part">
                <h3 class="card-header">"How to handle my credit"</h3>
                <p class="under-text">JustMoney has been updating me with all the changes on my profile and they teach me about how to handle my credit to keep my name in a high score.</p>
                <img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
                <p class="clint-name">Kwenza M</p>
                
            </div>
            </div>
            <div class="sec-card">
            <div class="back-part">
                <h3 class="card-header">"Offered a helping hand"</h3>
                <p class="under-text">Mathew has gone the extra mile by calling me to better understand my query and offered a helping hand to resolve my credit profile. I am looking forward to hearing from him as this is an ongoing process.</p>
                <img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
                <p class="clint-name">Rollen</p>
                
            </div>
            </div>
            <div class="third-card">
            <div class="back-part">
                <h3 class="card-header">"Cover every question"</h3>
                <p class="under-text">They're friendly and quick to respond. They cover every question you might have.</p>
                <img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
                <p class="clint-name">Thembalethu M</p>
                
                </div>
            </div>
            <div class="four-card">
            <div class="back-part">
                <h3 class="card-header">"Quick service"</h3>
                <p class="under-text">It was my first time chatting with Justmoney but I got help very fast I’m so happy with their service.</p>
                <img class="card-img-1" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202.png" alt="">
                <p class="clint-name">Kamohelo</p>
                
            </div>
            </div>
        </div>
        </div>
                        </section>`;
        var mobile = `<div class="cro-top-button-sec-mobile">
    <div class="top-button">
        <div class="main-icon">
            <img class="img-icon" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Vector.png" alt="">
        </div>
        <div class="btn-text-sec">
            <p class="btn-first-text">Rated</p>
            <div class="btn-sec-part">
                <p class="btn-sec-text">5/5</p>
                <img class="btn-star-sec" src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/Group%202a.png" alt="">
            </div>
            
            <p class="btn-last-text">On Hellopeter</p>
        </div>
    </div>
                        </div>`;
        function onscrollSticky() {
            var stickyClass = document.querySelector('body');
            window.onscroll = function () {
                if (window.pageYOffset > 400) {
                    stickyClass.classList.add("cro-sticky");
                }
                else {
                    stickyClass.classList.remove("cro-sticky");
                }
            }
        }
        /* Variation Init */
        function init() {
            addClass("body", "cro-review-test-1")
            waitForElement('.cro-header-tag', function () {
                if (!document.querySelector('.cro-top-button-sec')) {
                    insertHtml('.cro-header-tag', topButton, "beforeend");
                }
            });
            waitForElement('#second-call-to-action', function () {
                if (!document.querySelector('.new-sec')) {
                    insertHtml('#second-call-to-action', newcards, "beforebegin");
                }
            });
            waitForElement('#landing-page-justmoney-logo-white-header-global-section .relative>div', function () {
                var croNewClass = document.querySelector('#landing-page-justmoney-logo-white-header-global-section .relative>div');
                croNewClass.classList.add('cro-header-tag')
            });
            waitForElement('#second-call-to-action', function () {
                if (!document.querySelector('.new-sec')) {
                    insertHtml('#second-call-to-action', newcards, "beforebegin");
                }
            });
            waitForElement('#call-to-action-and-form', function () {
                if (!document.querySelector('.cro-top-button-sec-mobile')) {
                    insertHtml('#call-to-action-and-form', mobile, "afterbegin");
                    onscrollSticky()
                }
            });
        }
        waitForElement('body', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();