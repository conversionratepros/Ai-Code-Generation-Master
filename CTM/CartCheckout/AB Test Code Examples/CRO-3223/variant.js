(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro206";
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

        function addClassToParentsByTextMap(selector, textClassMap) {
            document.querySelectorAll(selector).forEach(function (element) {
                var parent = element.closest('.mgz-panel'); // updated back to your original
                if (parent) {
                    for (var text in textClassMap) {
                        if (element.textContent.trim().includes(text.trim())) {
                            parent.classList.add(textClassMap[text].trim());
                        }
                    }
                }
            });
        }


        var htmlString = `
            <li class="cro-install vas-modal_button">
  <div class="vas-modal_icon"> <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/install%201.png" alt=""> </div>
  <div class="vas-modal-title"> <span>How to Install</span> </div>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.82841 2.99475C8.7289 2.99478 8.63167 3.02449 8.54914 3.08008C8.46661 3.13568 8.40255 3.21464 8.36515 3.30685C8.32775 3.39906 8.31871 3.50033 8.33919 3.59771C8.35966 3.69509 8.40873 3.78414 8.4801 3.85347L12.2933 7.66663H2.50029C2.43403 7.66569 2.36825 7.67793 2.30676 7.70264C2.24528 7.72734 2.18932 7.76402 2.14213 7.81055C2.09495 7.85707 2.05748 7.9125 2.03191 7.97363C2.00633 8.03476 1.99316 8.10036 1.99316 8.16663C1.99316 8.23289 2.00633 8.29849 2.03191 8.35962C2.05748 8.42075 2.09495 8.47618 2.14213 8.52271C2.18932 8.56923 2.24528 8.60591 2.30676 8.63062C2.36825 8.65532 2.43403 8.66756 2.50029 8.66663H12.2933L8.4801 12.4798C8.43212 12.5259 8.39381 12.581 8.36742 12.6421C8.34102 12.7032 8.32708 12.7689 8.32641 12.8354C8.32573 12.9019 8.33833 12.9679 8.36348 13.0295C8.38862 13.0911 8.4258 13.147 8.47284 13.1941C8.51988 13.2411 8.57583 13.2783 8.63742 13.3034C8.69901 13.3286 8.76499 13.3412 8.83151 13.3405C8.89803 13.3398 8.96375 13.3259 9.02481 13.2995C9.08588 13.2731 9.14106 13.2348 9.18713 13.1868L13.8538 8.52014C13.9475 8.42637 14.0002 8.29921 14.0002 8.16663C14.0002 8.03404 13.9475 7.90688 13.8538 7.81311L9.18713 3.14644C9.14053 3.09845 9.08477 3.06029 9.02315 3.03424C8.96153 3.00818 8.89531 2.99475 8.82841 2.99475Z" fill="#595959"></path>
  </svg>
				</li>`

        var modelTop = ` <div class="cro206-top-model">
        <div class="cro206-top-model-wrapper">
            <div class="cro206-top-model-inner">
                <div class="cro206-top-model-heading">
                    How to Install
                </div>
                <div class="cro206-top-model-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        class="cro206-close-icon">
                        <path
                            d="M20.7457 3.32853C20.3552 2.938 19.722 2.938 19.3315 3.32853L12.0371 10.6229L4.74274 3.32853C4.35222 2.938 3.71905 2.938 3.32853 3.32853C2.938 3.71905 2.938 4.35222 3.32853 4.74274L10.6229 12.0371L3.32855 19.3314C2.93802 19.722 2.93802 20.3551 3.32855 20.7457C3.71907 21.1362 4.35224 21.1362 4.74276 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74274C21.1362 4.35222 21.1362 3.71905 20.7457 3.32853Z"
                            fill="#0F0F0F" />
                    </svg>
                </div>
            </div>
        </div>
    </div>`;

        var newOverlay = ` <div class="cro206-new-overlay"></div>`;

        // 	var popup = `<div class="cro-206-lightBox">
        //     <div class="cro-206-lightBox-wrapper">
        //         <div class="cro-206-overlay"></div>
        //         <div class="cro-206-modal">
        //             <div class="cro-206-model-open">
        //                 <div class="cro-206-cross">
        //                     <img class="cro-206-cross-img"
        //                         src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/times.png" alt="">
        //                 </div>
        //                 <div class="cro-206-modal-top-part">
        //                     <div class="cro-206-modal-top-header">
        //                         <div class="cro-206-modal-top-header-text">
        //                             Limited time offer
        //                         </div>
        //                         <div class="cro-206-modal-top-sub-header-text">
        //                             Guaranteeing Your Tile Installation
        //                         </div>

        //                     </div>
        //                     <div class="cro-206-modal-main-image">
        //                         <div class="cro-206-modal-image">
        //                             <img src="https://i.ibb.co/whvF7YBW/Rectangle-4355.png" alt="">
        //                         </div>
        //                         <div class="cro-206-modal-image-icon">
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="121" height="121" viewBox="0 0 121 121"
        //                                 fill="none">
        //                                 <ellipse cx="60.4592" cy="60.4586" rx="60.4592" ry="60.4586" fill="#ED1C24"
        //                                     fill-opacity="0.5" />
        //                                 <path d="M91.605 60.4585L44.8865 87.4312L44.8865 33.4859L91.605 60.4585Z"
        //                                     fill="white" fill-opacity="0.68" />
        //                             </svg>
        //                         </div>

        //                     </div>
        //                     <div class="cro-206-modal-installation-icon-text">
        //                         <div class="cro-206-modal-installation-icon">
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18"
        //                                 fill="none">
        //                                 <rect y="0.5" width="17" height="17" rx="8.5" fill="#2D65CF" />
        //                                 <path d="M6 9.5L7.8189 11.3189C7.9189 11.4189 8.0811 11.4189 8.1811 11.3189L12 7.5"
        //                                     stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        //                             </svg>
        //                         </div>
        //                         <div class="cro-206-modal-installation-text">
        //                             <span>The required installation products</span> are needed for our tile guarantee.
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>`;


        var modalInfo = `<div class="cro206-info-box">
        <div class="cro206-info-box-wrapper">
            <div class="cro206-info-box-inner">
                <div class="cro206-info-box-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none"
                        class="cro206-info-icon">
                        <rect y="0.5" width="17" height="17" rx="8.5" fill="#2D65CF" />
                        <path d="M6 9.5L7.8189 11.3189C7.9189 11.4189 8.0811 11.4189 8.1811 11.3189L12 7.5"
                            stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div class="cro206-info-box-text">
                    <span>The required installation products</span> are needed for our tile guarantee.
                </div>
            </div>
        </div>
    </div>`;

        /* Variation Init */
        function init() {
            addClass("body", variation_name)
            // addClass('body', 'cro206-hide')

            waitForElement('#HowToInstall h4.mgz-panel-heading-title', function () {
                addClassToParentsByTextMap(
                    '#HowToInstall h4.mgz-panel-heading-title',
                    {
                        'How To Install Tiles': 'cro206_top_heading',
                        'Preparation': 'cro206_Preparation',
                        'Tile Purchasing': 'cro206_Tile_Purchasing',
                        'Guaranteeing Your Tile Installation': 'cro206_Guaranteeing',
                        'Start Tiling': 'cro206_Start_Tiling',
                        'Correct Spacing': 'cro206_Correct_Spacing',
                        'Grouting': 'cro206_Grouting',
                    }
                );
            });


            waitForElement('#HowToInstall .installation-heading', int_mosaic);

            waitForElement('#html-body', function () {
                if (!document.querySelector('.cro206-new-overlay')) {
                    insertHtml('#html-body', newOverlay, "afterbegin");
                }
            });

            waitForElement('.pdp-vas-modals .modal_1', function () {
                if (!document.querySelector('.cro-install')) {
                    insertHtml('.pdp-vas-modals .modal_1', htmlString, "afterend");
                }
            });

            waitForElement('#tab-HowToInstall', function () {
                if (document.querySelector('#tab-HowToInstall a')) {
                    document.querySelector('#tab-HowToInstall > a').href = '';
                }

                //     scroll(document.querySelector('#tab-HowToInstall'), '.cro-install')
            });

            waitForElement('#HowToInstall .cro206_Preparation', function () {
                if (!document.querySelector('.cro206-top-model')) {
                    insertHtml('#HowToInstall .cro206_Preparation', modelTop, "afterend");
                }
            });

            waitForElement('.mgz-panel.cro206_Guaranteeing', function () {
                if (!document.querySelector('.cro206-info-box')) {
                    insertHtml('.mgz-panel.cro206_Guaranteeing', modalInfo, "afterend");
                }
            });

            waitForElement('#HowToInstall img.mgz-hover-main', function () {
                document.querySelectorAll('#HowToInstall img.mgz-hover-main').forEach(function (e) {
                    if (e.getAttribute('data-amsrc')) {
                        var imgSrc = e.getAttribute('data-amsrc');
                        e.src = imgSrc;
                    }
                })
            });

            addEvent();
        }

        function scroll(click, selector) {
            click.addEventListener('click', function (event) {
                event.preventDefault();
                var target = document.querySelector(selector);
                if (target) {
                    window.scrollTo({
                        top: target.getBoundingClientRect().top - 140 + window.scrollY,
                        behavior: 'smooth'
                    });
                }
            });
        }

        function addEvent() {
            live('.cro-install.vas-modal_button', 'click', function (e) {
                e.preventDefault();
                // removeClass('body', 'cro-206-hide')
                addClass('html', 'cro-scroll-hide')
                addClass('body', 'cro_model')
                // addClass('body', 'cro206-hide')

                // document.querySelector(".cro206_top_heading>.mgz-icon-position-right .has-icon").click();
                // document.querySelector(".cro206_Guaranteeing .has-icon").click();

            })
            live(".cro206-close-icon, .cro206-new-overlay", "click", function () {
                removeClass('body', 'cro_model')
                removeClass('html', 'cro-scroll-hide')
                // document.querySelector(".cro206_top_heading>.mgz-icon-position-right .has-icon").click();
                // document.querySelector(".cro206_Guaranteeing .has-icon").click();
            });


            live("#tab-HowToInstall", "click", function (e) {
                e.preventDefault();
                e.stopImmediatePropagation()

                var target = document.querySelector('.cro-install');
                if (target) {
                    window.scrollTo({
                        top: target.getBoundingClientRect().top - 140 + window.scrollY,
                        behavior: 'smooth'
                    });
                }

            });



        }


        function int_mosaic() {
            // #HowToInstall .installation-heading

            if (!document.querySelector('.cro206-top-model')) {
                insertHtml('#HowToInstall .installation-heading', modelTop, "afterend");
            }

            if (document.querySelector('#HowToInstall #installation_heading').closest('.full_width_row')) {
                document.querySelector('#HowToInstall #installation_heading').closest('.full_width_row').classList.add('cro-t-206_207-mosaicHeading');

                document.querySelector('#HowToInstall #installation_heading').closest('.full_width_row').closest('.mgz-element-inner').classList.add('cro-t-206_207-mosaicParent');
            }



        }



        /* Initialise variation */

        if (!window.cro206_207) {
            waitForElement('.catalog-product-view .content-wrapper #HowToInstall', init);
            window.cro206_207 = true;
        }


    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();