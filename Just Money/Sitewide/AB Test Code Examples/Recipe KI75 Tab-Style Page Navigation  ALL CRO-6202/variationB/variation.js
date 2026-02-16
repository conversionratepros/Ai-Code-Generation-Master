(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-jm-ki75";
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

        var topBar = `<div class="cro-ki75-topBarMain">
        <div class="cro-ki75-topBar-wrapper">
            <div class="cro-ki75-topBar-inner">
                <div class="cro-ki75-topBar-title">
                    <span>What's on this page</span>
                </div>
                <div class="cro-ki75-topBar-content">
                </div>
            </div>
        </div>
    </div>`;

        function init() {
            addClass("body", variation_name);

            waitForElement(".silo-page", function () {
                if (!document.querySelector(".cro-ki75-topBar")) {
                    insertHtml("#masthead", topBar, "afterend");
                }
            });

            waitForElement(".sidebar", function () {
                var parent = document.querySelector('.sidebar').closest('.mt-10')
                if (parent) {
                    parent.classList.add('cro-ki75-topBar')
                }
            });

            // ul li.mb-1 a
            waitForElement("ul li.mb-1 a", function () {
                var listItems = document.querySelectorAll('ul li.mb-1');
                listItems.forEach(function(li) {
                var a = li.querySelector('a');
                    if (a && !a.textContent.trim()) {
                        li.classList.add('cro-ki75-empty-link');
                    }
                });
            });


            moveTertiaryIntoTopBar();

        }

        function moveTertiaryIntoTopBar() {
            waitForElement("#tertiary ul", function () {
                var tertiary = document.querySelector('#tertiary ul');
                var target = document.querySelector('.cro-ki75-topBar-content');

                if (tertiary && target) {
                    target.appendChild(tertiary);
                }
            });

            waitForElement("ul li.mb-1 a", function () {
                window.addEventListener('scroll', function () {
                    var yellowLink = document.querySelector('ul li.mb-1 a.border-yellow');
                    var body = document.body;

                    if (yellowLink) {
                        body.classList.add('cro-has-border-yellow');
                    } else {
                        body.classList.remove('cro-has-border-yellow');
                    }
                });

            });

        }



        function croEventHandler() {
            live('ul li.mb-1', 'click', function(e) {
                var link = this.querySelector('a');
                if (link) {
                    link.click();
                }
            });

        }

        if (!window.cro_t_20) {
            croEventHandler();
            window.cro_t_20 = true;
        }

        waitForElement('.silo-page', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();