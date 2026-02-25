(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-t-85";
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

        var newPartsNavbar = `<div class="cro-t-85-active-users">
        <div class="cro-t-85-active-users-wrapper">
            <div class="cro-t-85-active-users-inner">
                <div class="cro-t-85-active-users-left">
                    <div class="cro-t-85-active-users-left-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="32" viewBox="0 0 27 32" fill="none"
                            class="cro-user-icon">
                            <path
                                d="M16.3061 18.9388C22.1212 18.9388 26.8571 23.6748 26.8571 29.4898C26.8571 30.5689 25.9579 31.4082 24.9388 31.4082H1.91837C0.839286 31.4082 0 30.5689 0 29.4898C0 23.6748 4.67602 18.9388 10.551 18.9388H16.3061ZM2.87755 28.5306H23.9196C23.4401 24.7538 20.2028 21.8163 16.3061 21.8163H10.551C6.59439 21.8163 3.35714 24.7538 2.87755 28.5306ZM13.4286 16.0612C9.17219 16.0612 5.7551 12.6441 5.7551 8.38776C5.7551 4.19134 9.17219 0.714294 13.4286 0.714294C17.625 0.714294 21.102 4.19134 21.102 8.38776C21.102 12.6441 17.625 16.0612 13.4286 16.0612ZM13.4286 3.59185C10.7309 3.59185 8.63265 5.75001 8.63265 8.38776C8.63265 11.0855 10.7309 13.1837 13.4286 13.1837C16.0663 13.1837 18.2245 11.0855 18.2245 8.38776C18.2245 5.75001 16.0663 3.59185 13.4286 3.59185Z"
                                fill="white" />
                        </svg>
                    </div>
                    <div class="cro-t-85-active-users-text-container">
                        <div class="cro-t-85-active-users-header-text header-1">
                            Over
                        </div>
                        <div class="cro-t-85-active-users-subheader-text subheader-1">
                            <span>1 Million</span> Active users
                        </div>
                    </div>
                </div>
                <hr>
                <div class="cro-t-85-active-users-right">
                    <div class="cro-t-85-active-users-right-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none"
                            class="cro-results-icon">
                            <circle cx="15" cy="15" r="13.5" stroke="white" stroke-width="3" />
                            <circle cx="15" cy="15" r="10.8824" fill="#263648" />
                            <rect x="14.1176" y="3.52942" width="1.17647" height="14.1176" rx="0.588235"
                                fill="#48A57E" />
                            <rect x="15.2071" y="17.3958" width="1.17647" height="11.4668" rx="0.588235"
                                transform="rotate(159.709 15.2071 17.3958)" fill="#48A57E" />
                        </svg>
                    </div>
                    <div class="cro-t-85-active-users-text-container">
                        <div class="cro-t-85-active-users-header-text header-2">
                            Application results
                        </div>
                        <div class="cro-t-85-active-users-subheader-text subheader-2">
                            <span>within 2 minutes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

        var newPartsNavbarMob = `<div class="cro-t-85-active-users-mob">
        <div class="cro-t-85-active-users-wrapper-mob">
            <div class="cro-t-85-active-users-inner-mob">
                <div class="cro-t-85-active-users-left-mob">
                    <div class="cro-t-85-active-users-left-icon-mob">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="32" viewBox="0 0 27 32" fill="none"
                            class="cro-user-icon-mob">
                            <path
                                d="M16.3061 18.9388C22.1212 18.9388 26.8571 23.6748 26.8571 29.4898C26.8571 30.5689 25.9579 31.4082 24.9388 31.4082H1.91837C0.839286 31.4082 0 30.5689 0 29.4898C0 23.6748 4.67602 18.9388 10.551 18.9388H16.3061ZM2.87755 28.5306H23.9196C23.4401 24.7538 20.2028 21.8163 16.3061 21.8163H10.551C6.59439 21.8163 3.35714 24.7538 2.87755 28.5306ZM13.4286 16.0612C9.17219 16.0612 5.7551 12.6441 5.7551 8.38776C5.7551 4.19134 9.17219 0.714294 13.4286 0.714294C17.625 0.714294 21.102 4.19134 21.102 8.38776C21.102 12.6441 17.625 16.0612 13.4286 16.0612ZM13.4286 3.59185C10.7309 3.59185 8.63265 5.75001 8.63265 8.38776C8.63265 11.0855 10.7309 13.1837 13.4286 13.1837C16.0663 13.1837 18.2245 11.0855 18.2245 8.38776C18.2245 5.75001 16.0663 3.59185 13.4286 3.59185Z"
                                fill="white" />
                        </svg>
                    </div>
                    <div class="cro-t-85-active-users-text-container-mob">
                        <div class="cro-t-85-active-users-header-text-mob header-1">
                            Over <span>1 million</span>
                        </div>
                        <div class="cro-t-85-active-users-subheader-text-mob subheader-1">
                            active users
                        </div>
                    </div>
                </div>
                <hr>
                <div class="cro-t-85-active-users-right-mob">
                    <div class="cro-t-85-active-users-right-icon-mob">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none"
                            class="cro-results-icon-mob">
                            <circle cx="15" cy="15" r="13.5" stroke="white" stroke-width="3" />
                            <circle cx="15" cy="15" r="10.8824" fill="#263648" />
                            <rect x="14.1176" y="3.52942" width="1.17647" height="14.1176" rx="0.588235"
                                fill="#48A57E" />
                            <rect x="15.2071" y="17.3958" width="1.17647" height="11.4668" rx="0.588235"
                                transform="rotate(159.709 15.2071 17.3958)" fill="#48A57E" />
                        </svg>
                    </div>
                    <div class="cro-t-85-active-users-text-container-mob">
                        <div class="cro-t-85-active-users-header-text-mob header-2">
                            Application results
                        </div>
                        <div class="cro-t-85-active-users-subheader-text-mob subheader-2">
                            <span>within 2 minutes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`


        /* Variation Init */
        function init() {
            addClass('body', variation_name)
            waitForElement('.body-container-wrapper .logos-wrapper .logos.container', function () {
                if (!document.querySelector('.cro-t-85-active-users')) {
                    insertHtml('.body-container-wrapper .logos-wrapper .logos.container', newPartsNavbar, "beforeend");
                }
                if (!document.querySelector('.cro-t-85-active-users-mob')) {
                    insertHtml('.body-container-wrapper .logos-wrapper', newPartsNavbarMob, "afterend");
                }
            });
        }



        /* Initialise variation */
        waitForElement('body', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();