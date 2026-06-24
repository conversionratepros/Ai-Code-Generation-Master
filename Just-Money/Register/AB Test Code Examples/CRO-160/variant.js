(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "croUc1_mobile";
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
        };

        function insertHtml(selector, content, position) {
            var el = document.querySelector(selector);
            if (!position) {
                position = "afterend";
            }
            if (el && content) {
                el.insertAdjacentHTML(position, content);
            }
        };

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        };

        var newPartAdd = `<div class="cro-loginbottompart" style="display:none;">
        <div class="cro-loginbottompart-wrapper">
            <div class="cro-loginbottom-top-image">
                <div class="cro-loginbottom-image">

                </div>
            </div>
            <div class="cro-loginbottom-mid-part-container">
                <div class="cro-loginbottom-mid-part">
                    <div class="cro-top-icon-part">
                        <div data-percentage="83" class="cro-gauge-cont cro-mx-auto">
                            <div class="cro-score">
                                <div class="cro-score_inner">
                                    <p class="cro-mb-0">YOUR SCORE</p>
                                    <h2 class="cro-text-yellow cro-font-weight-bold cro-mb-0">
                                        <span class="cro-value">922</span>
                                    </h2>
                                </div>
                            </div>
                            <div class="cro-gauge">
                                <div class="cro-inner"></div>
                                <div class="cro-spinner" style="transform: rotate(224.1deg);"></div>
                            </div>
                            <div class="cro-pointer" style="transform: rotate(110deg);"></div>
                            <div class="cro-pointer-knob"></div>
                            <div class="cro-arc cro-arc_start"></div>
                            <p class="cro-average cro-text-white cro-md">Average</p>
                            <div class="cro-average_line"></div>
                            <p class="cro-bad cro-text-white cro-md">Bad</p>
                            <div class="cro-bad_line"></div>
                            <p class="cro-good cro-text-white cro-md">Good</p>
                            <div class="cro-good_line"></div>
                            <div class="cro-risk_block cro-text-center">
                                <p class="cro-average cro-text-dark cro-sm">Last Updated 17.06.2025</p>
                            </div>
                        </div>
                    </div>
                    <div class="cro-top-bottom-part">
                        <div class="cro-top-bottom-wrapper">
                            <div class="cro-top-bottom-heading">
                                You can:
                            </div>
                            <div class="cro-top-bottom-icon-wrapper">
                                <div class="cro-top-bottom-icon-text-parent part-1">
                                    <div class="cro-top-bottom-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                                                fill="#22222C" />
                                        </svg>
                                    </div>
                                    <div class="cro-top-bottom-icon-text">
                                        Get a personal loan and credit facility
                                    </div>

                                </div>
                                <div class="cro-top-bottom-icon-text-parent part-2">
                                    <div class="cro-top-bottom-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                                                fill="#22222C" />
                                        </svg>
                                    </div>
                                    <div class="cro-top-bottom-icon-text">
                                        Consolidate your debt
                                    </div>
                                </div>
                                <div class="cro-top-bottom-icon-text-parent part-3">
                                    <div class="cro-top-bottom-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                                                fill="#22222C" />
                                        </svg>
                                    </div>
                                    <div class="cro-top-bottom-icon-text">
                                        Save and invest
                                    </div>
                                </div>
                                <div class="cro-top-bottom-icon-text-parent part-4">
                                    <div class="cro-top-bottom-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                                                fill="#22222C" />
                                        </svg>
                                    </div>
                                    <div class="cro-top-bottom-icon-text">
                                        Protect your car
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="cro-loginbottom-last-bottom">
                    <div class="cro-loginbottom-last-container">
                        <div class="cro-loginbottom-last-left">
                            <div class="cro-callme-button-text-parent">
                                <div><span class="cro-border-orange cro-rounded-circle"><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                            xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="20px"
                                            height="20px" x="0" y="0" viewBox="0 0 473.806 473.806" xml:space="preserve"
                                            style="enable-background: new 0 0 512 512;">
                                            <g>
                                                <g xmlns="http://www.w3.org/2000/svg">
                                                    <g>
                                                        <path
                                                            d="M374.456,293.506c-9.7-10.1-21.4-15.5-33.8-15.5c-12.3,0-24.1,5.3-34.2,15.4l-31.6,31.5c-2.6-1.4-5.2-2.7-7.7-4 c-3.6-1.8-7-3.5-9.9-5.3c-29.6-18.8-56.5-43.3-82.3-75c-12.5-15.8-20.9-29.1-27-42.6c8.2-7.5,15.8-15.3,23.2-22.8 c2.8-2.8,5.6-5.7,8.4-8.5c21-21,21-48.2,0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5c-6-6.2-12.3-12.6-18.8-18.6 c-9.7-9.6-21.3-14.7-33.5-14.7s-24,5.1-34,14.7c-0.1,0.1-0.1,0.1-0.2,0.2l-34,34.3c-12.8,12.8-20.1,28.4-21.7,46.5 c-2.4,29.2,6.2,56.4,12.8,74.2c16.2,43.7,40.4,84.2,76.5,127.6c43.8,52.3,96.5,93.6,156.7,122.7c23,10.9,53.7,23.8,88,26 c2.1,0.1,4.3,0.2,6.3,0.2c23.1,0,42.5-8.3,57.7-24.8c0.1-0.2,0.3-0.3,0.4-0.5c5.2-6.3,11.2-12,17.5-18.1c4.3-4.1,8.7-8.4,13-12.9 c9.9-10.3,15.1-22.3,15.1-34.6c0-12.4-5.3-24.3-15.4-34.3L374.456,293.506z M410.256,398.806 C410.156,398.806,410.156,398.906,410.256,398.806c-3.9,4.2-7.9,8-12.2,12.2c-6.5,6.2-13.1,12.7-19.3,20 c-10.1,10.8-22,15.9-37.6,15.9c-1.5,0-3.1,0-4.6-0.1c-29.7-1.9-57.3-13.5-78-23.4c-56.6-27.4-106.3-66.3-147.6-115.6 c-34.1-41.1-56.9-79.1-72-119.9c-9.3-24.9-12.7-44.3-11.2-62.6c1-11.7,5.5-21.4,13.8-29.7l34.1-34.1c4.9-4.6,10.1-7.1,15.2-7.1 c6.3,0,11.4,3.8,14.6,7c0.1,0.1,0.2,0.2,0.3,0.3c6.1,5.7,11.9,11.6,18,17.9c3.1,3.2,6.3,6.4,9.5,9.7l27.3,27.3 c10.6,10.6,10.6,20.4,0,31c-2.9,2.9-5.7,5.8-8.6,8.6c-8.4,8.6-16.4,16.6-25.1,24.4c-0.2,0.2-0.4,0.3-0.5,0.5 c-8.6,8.6-7,17-5.2,22.7c0.1,0.3,0.2,0.6,0.3,0.9c7.1,17.2,17.1,33.4,32.3,52.7l0.1,0.1c27.6,34,56.7,60.5,88.8,80.8 c4.1,2.6,8.3,4.7,12.3,6.7c3.6,1.8,7,3.5,9.9,5.3c0.4,0.2,0.8,0.5,1.2,0.7c3.4,1.7,6.6,2.5,9.9,2.5c8.3,0,13.5-5.2,15.2-6.9 l34.2-34.2c3.4-3.4,8.8-7.5,15.1-7.5c6.2,0,11.3,3.9,14.4,7.3c0.1,0.1,0.1,0.1,0.2,0.2l55.1,55.1 C420.456,377.706,420.456,388.206,410.256,398.806z"
                                                            fill="#e59a2c" data-original="#000000"></path>
                                                        <path
                                                            d="M256.056,112.706c26.2,4.4,50,16.8,69,35.8s31.3,42.8,35.8,69c1.1,6.6,6.8,11.2,13.3,11.2c0.8,0,1.5-0.1,2.3-0.2 c7.4-1.2,12.3-8.2,11.1-15.6c-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3,3.7-15.6,11 S248.656,111.506,256.056,112.706z"
                                                            fill="#e59a2c" data-original="#000000"></path>
                                                        <path
                                                            d="M473.256,209.006c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2,3.7-15.5,11 c-1.2,7.4,3.7,14.3,11.1,15.6c46.6,7.9,89.1,30,122.9,63.7c33.8,33.8,55.8,76.3,63.7,122.9c1.1,6.6,6.8,11.2,13.3,11.2 c0.8,0,1.5-0.1,2.3-0.2C469.556,223.306,474.556,216.306,473.256,209.006z"
                                                            fill="#e59a2c" data-original="#000000"></path>
                                                    </g>
                                                </g>
                                                <g xmlns="http://www.w3.org/2000/svg"></g>
                                                <g xmlns="http://www.w3.org/2000/svg"></g>
                                                <g xmlns="http://www.w3.org/2000/svg"></g>
                                                <g xmlns="http://www.w3.org/2000/svg"></g>
                                                <g xmlns="http://www.w3.org/2000/svg"></g>
                                                <g xmlns="http://www.w3.org/2000/svg"></g>
                                                <g xmlns="http://www.w3.org/2000/svg"></g>
                                                <g xmlns="http://www.w3.org/2000/svg"></g>
                                                <g xmlns="http://www.w3.org/2000/svg"></g>
                                                <g xmlns="http://www.w3.org/2000/svg"></g>
                                                <g xmlns="http://www.w3.org/2000/svg"></g>
                                                <g xmlns="http://www.w3.org/2000/svg"></g>
                                                <g xmlns="http://www.w3.org/2000/svg"></g>
                                                <g xmlns="http://www.w3.org/2000/svg"></g>
                                                <g xmlns="http://www.w3.org/2000/svg"></g>
                                            </g>
                                        </svg></span></div>
                                <div class="cro-number-text"><span class="cro-d-block">Need Help?</span><a href="tel:0875376113"
                                        id="cro-callme" class="cro-callus">Call us on 0875376113</a></div>
                            </div>
                        </div>
                        <div class="cro-loginbottom-last-right">
                            <div class="cro-google-play-parent"><a
                                    href="https://play.google.com/store/apps/details?id=za.co.justmoneycreditsav.twa&amp;pcampaignid=web_sharewebsource=JmPlatformRegistrationTopDesktop&amp;utm_source=PlatformJm&amp;utm_medium=PlayStoreBtn&amp;utm_campaign=Registration_top_desktop&amp;utm_content=GetItOnGooglePlay"
                                    class="cro-gplayimage" id="cro-dAnchor-registerfecliactivate--2"><img
                                        src="../../assets/images/gplay.png" alt="" class="img-fluid"></a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;


        function classAdding() {
            waitForElement('#registerForm #btn_TermsCondition_Register-2', function () {
                document.querySelectorAll('#registerForm #btn_TermsCondition_Register-2').forEach(function (e) {
                    var parent = e.closest('.custom-row');
                    if (parent && e.innerHTML.indexOf('Terms and Conditions') !== -1) {
                        parent.classList.add('cro-term-and-condition');
                    }
                });
            });

            waitForElement('.testimonials', function () {
                if (!document.querySelector('.cro-loginbottompart')) {
                    insertHtml('.testimonials', newPartAdd, "beforebegin");
                }
            });
        }

        /* Variation Init */
        function init() {
            addClass("body", variation_name);
            classAdding();

        }

        if (window.innerWidth < 768) {
            waitForElement('.registerform', init);
            // waitForElement('.footer a.gplayimage', init);

            // .footer a.gplayimage
        }


    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();