(function () {
    try {
        /* ── Config ── */
        var debug = 0;
        var variation_name = "cro-12327";

        /* Exact SVGs from Figma */
        var FULL_STAR = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.68323 1.52997C7.71245 1.47094 7.75758 1.42126 7.81353 1.38652C7.86949 1.35178 7.93404 1.33337 7.9999 1.33337C8.06576 1.33337 8.13031 1.35178 8.18626 1.38652C8.24222 1.42126 8.28735 1.47094 8.31656 1.52997L9.85656 4.6493C9.95802 4.85461 10.1078 5.03224 10.293 5.16694C10.4782 5.30164 10.6933 5.38938 10.9199 5.42264L14.3639 5.92664C14.4292 5.93609 14.4905 5.96362 14.5409 6.0061C14.5913 6.04859 14.6289 6.10434 14.6492 6.16704C14.6696 6.22975 14.6721 6.29691 14.6563 6.36093C14.6405 6.42495 14.6071 6.48327 14.5599 6.5293L12.0692 8.95464C11.905 9.1147 11.7821 9.31229 11.7111 9.53039C11.6402 9.74849 11.6233 9.98056 11.6619 10.2066L12.2499 13.6333C12.2614 13.6985 12.2544 13.7657 12.2296 13.8271C12.2048 13.8885 12.1632 13.9417 12.1096 13.9806C12.056 14.0196 11.9926 14.0426 11.9265 14.0472C11.8604 14.0518 11.7944 14.0378 11.7359 14.0066L8.65723 12.388C8.45438 12.2815 8.22868 12.2258 7.99956 12.2258C7.77044 12.2258 7.54475 12.2815 7.3419 12.388L4.2639 14.0066C4.20545 14.0376 4.1395 14.0515 4.07353 14.0468C4.00757 14.0421 3.94424 14.019 3.89076 13.9801C3.83728 13.9412 3.79579 13.8881 3.771 13.8268C3.74622 13.7655 3.73914 13.6984 3.75056 13.6333L4.3379 10.2073C4.3767 9.98112 4.35989 9.7489 4.28892 9.53067C4.21796 9.31243 4.09497 9.11474 3.93056 8.95464L1.4399 6.52997C1.39229 6.48399 1.35856 6.42557 1.34254 6.36135C1.32652 6.29714 1.32886 6.22971 1.34928 6.16676C1.36971 6.10381 1.40741 6.04786 1.45808 6.00529C1.50876 5.96272 1.57037 5.93524 1.6359 5.92597L5.07923 5.42264C5.30607 5.38964 5.52149 5.30201 5.70695 5.16729C5.89242 5.03258 6.04237 4.85482 6.1439 4.6493L7.68323 1.52997Z" fill="#FF9F17" stroke="#FF9F17" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        var HALF_STAR = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M7.68323 1.52997C7.71245 1.47094 7.75758 1.42126 7.81353 1.38652C7.86949 1.35178 7.93404 1.33337 7.9999 1.33337C8.06576 1.33337 8.13031 1.35178 8.18626 1.38652C8.24222 1.42126 8.28735 1.47094 8.31656 1.52997L9.85656 4.6493C9.95802 4.85461 10.1078 5.03224 10.293 5.16694C10.4782 5.30164 10.6933 5.38938 10.9199 5.42264L14.3639 5.92664C14.4292 5.93609 14.4905 5.96362 14.5409 6.0061C14.5913 6.04859 14.6289 6.10434 14.6492 6.16704C14.6696 6.22975 14.6721 6.29691 14.6563 6.36093C14.6405 6.42495 14.6071 6.48327 14.5599 6.5293L12.0692 8.95464C11.905 9.1147 11.7821 9.31229 11.7111 9.53039C11.6402 9.74849 11.6233 9.98056 11.6619 10.2066L12.2499 13.6333C12.2614 13.6985 12.2544 13.7657 12.2296 13.8271C12.2048 13.8885 12.1632 13.9417 12.1096 13.9806C12.056 14.0196 11.9926 14.0426 11.9265 14.0472C11.8604 14.0518 11.7944 14.0378 11.7359 14.0066L8.65723 12.388C8.45438 12.2815 8.22868 12.2258 7.99956 12.2258C7.77044 12.2258 7.54475 12.2815 7.3419 12.388L4.2639 14.0066C4.20545 14.0376 4.1395 14.0515 4.07353 14.0468C4.00757 14.0421 3.94424 14.019 3.89076 13.9801C3.83728 13.9412 3.79579 13.8881 3.771 13.8268C3.74622 13.7655 3.73914 13.6984 3.75056 13.6333L4.3379 10.2073C4.3767 9.98112 4.35989 9.7489 4.28892 9.53067C4.21796 9.31243 4.09497 9.11474 3.93056 8.95464L1.4399 6.52997C1.39229 6.48399 1.35856 6.42557 1.34254 6.36135C1.32652 6.29714 1.32886 6.22972 1.34928 6.16676C1.36971 6.10381 1.40741 6.04786 1.45808 6.00529C1.50876 5.96272 1.57037 5.93524 1.6359 5.92597L5.07923 5.42264C5.30607 5.38964 5.52149 5.30201 5.70695 5.16729C5.89242 5.03258 6.04237 4.85482 6.1439 4.6493L7.68323 1.52997Z" stroke="#FF9F17" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

        var STARS_HTML = (
            '<span class="cro-12327-stars" aria-hidden="true">' +
            FULL_STAR + FULL_STAR + FULL_STAR + FULL_STAR + HALF_STAR +
            '</span>'
        );

        /* Messages as raw HTML — msg1 has stars + bold, msg2 is plain */
        var MESSAGES = [
            STARS_HTML + '<span class="cro-12327-bar__text"><strong>Rated 4.6/5 on Google</strong> &middot; 2,534+ happy customers</span>',
            '<span class="cro-12327-bar__text">Fitouts delivered in under 10 days &middot; anywhere in Australia</span>'
        ];
        var ROTATION_MS = 4000;
        var ANIM_MS = 400;
        var MOBILE_BP = 768;

        /* ── Helpers ── */

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
            setTimeout(function () { clearInterval(interval); }, 15000);
        }

        function addClass(el, cls) {
            var node = document.querySelector(el);
            if (node) { node.classList.add(cls); }
        }

        /* ── Trust bar ── */

        function buildTrustBarHTML() {
            var msgsHTML = MESSAGES.map(function (msg) {
                return '<div class="cro-12327-bar__msg">' + msg + '</div>';
            }).join('');
            /* Clone of first message keeps the reel looping seamlessly on desktop */
            msgsHTML += '<div class="cro-12327-bar__msg cro-12327-bar__msg--clone">' + MESSAGES[0] + '</div>';

            return (
                '<div class="cro-12327-bar" aria-live="polite">' +
                '<div class="cro-12327-bar__viewport">' +
                '<div class="cro-12327-bar__reel">' +
                msgsHTML +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }

        function startRotation() {
            var reel = document.querySelector('.cro-12327-bar__reel');
            var allMsgs = document.querySelectorAll('.cro-12327-bar__msg:not(.cro-12327-bar__msg--clone)');
            if (!reel || !allMsgs.length) { return; }

            var total = allMsgs.length;   /* 2 */
            var current = 0;

            function isMobile() {
                return window.innerWidth < MOBILE_BP;
            }

            /* Set first message active on mobile */
            if (isMobile()) {
                allMsgs[0].classList.add('cro-12327-bar__msg--mobile-active');
            }

            setInterval(function () {
                if (isMobile()) {
                    /* Mobile: instant swap using display toggle */
                    allMsgs[current].classList.remove('cro-12327-bar__msg--mobile-active');
                    current = (current + 1) % total;
                    allMsgs[current].classList.add('cro-12327-bar__msg--mobile-active');
                } else {
                    /* Desktop: reel slides up */
                    current++;
                    reel.style.transition = 'transform ' + ANIM_MS + 'ms ease-in-out';
                    reel.style.transform = 'translateY(calc(-' + current + ' * 64px))';

                    /* After reaching the clone (index === total), snap back invisibly */
                    if (current >= total) {
                        setTimeout(function () {
                            reel.style.transition = 'none';
                            reel.style.transform = 'translateY(0)';
                            current = 0;
                        }, ANIM_MS + 50);
                    }
                }
            }, ROTATION_MS);
        }

        /* ── Init ── */

        function injectTrustBar() {
            if (document.querySelector('.cro-12327-bar')) { return; }
            var banner = document.querySelector('.pdp-header-banner');
            if (!banner) { return; }

            banner.insertAdjacentHTML('beforebegin', buildTrustBarHTML());
            startRotation();
        }

        function init() {
            addClass('body', variation_name);
            waitForElement('.pdp-header-banner', injectTrustBar);
        }

        function croEventHandler() {
            /* no click events for this test */
        }

        if (!window.cro_t_12327) {
            croEventHandler();
            window.cro_t_12327 = true;
        }

        waitForElement('body', init);

    } catch (e) {
        if (debug) { console.log(e, 'error in Test cro-12327'); }
    }
})();
