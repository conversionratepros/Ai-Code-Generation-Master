(function () {
    try {
        /* ── Config ── */
        var debug = 0;
        var variation_name = "cro-12465";

        /* Formbricks (client API — public, no auth) */
        var FORMBRICKS_HOST = "https://app.formbricks.com";
        var FORMBRICKS_ENV_ID = "cmqt0crm26zlq01tt1vsyhfve";
        var FORMBRICKS_SURVEY_ID = "cmqt0l0usropz01vkuo96ihcv";
        var FORMBRICKS_QUESTION_ID = "d8awe4hpc5wtf428eoxnuc2u";

        var COOKIE_NAME = "jl_shopper_type";
        var COOKIE_DAYS = 180;
        var SESSION_KEY = "cro-12465-hidden";
        var GA4_EVENT = "audience_poll_answer";
        var GA4_ID = "G-W3QG4GQNB5";
        var HIDE_DELAY_MS = 1800;

        /* Survey order; label must match the Formbricks choice label exactly */
        var OPTIONS = [
            { label: "Home", segment: "home" },
            { label: "Office", segment: "office" },
            { label: "Startup", segment: "startup" },
            { label: "SME", segment: "sme" },
            { label: "Enterprise", segment: "enterprise" }
        ];

        var QUESTION = "Who are you shopping for today?";
        var THANKS_MSG = "Thanks, that helps us show you the right things.";
        var FAIL_MSG = "Submission failed";

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

        function setCookie(name, value, days) {
            var expires = new Date();
            expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
        }

        function getCookie(name) {
            var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
            return match ? match[1] : null;
        }

        function isSessionHidden() {
            try { return sessionStorage.getItem(SESSION_KEY) === "1"; } catch (e) { return false; }
        }

        function setSessionHidden() {
            try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (e) { /* storage blocked — strip just reappears next page */ }
        }

        /* ── Tracking ── */

        /* G-W3QG4GQNB5 is already registered on the default dataLayer (GTM + theme
           gtag.js), so push a gtag arguments object straight onto it. The site's own
           window.gtag closes over a stale queue and silently drops events — don't use it. */
        function trackGA4(eventName, segment) {
            window.dataLayer = window.dataLayer || [];
            if (!(window.google_tag_manager && window.google_tag_manager[GA4_ID]) && !window.cro12465GtagLoaded) {
                /* fallback only — every jasonl page loads the destination already */
                window.cro12465GtagLoaded = true;
                var script = document.createElement('script');
                script.async = true;
                script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
                document.head.appendChild(script);
                gtagPush('js', new Date());
                gtagPush('config', GA4_ID, { send_page_view: false });
            }
            gtagPush('event', eventName, { segment: segment, send_to: GA4_ID });
        }

        function gtagPush() {
            window.dataLayer.push(arguments);
        }

        function trackIntelligems(segment) {
            window.gems = window.gems || [];
            window.gems.push(["event", "audience_poll_" + segment]);
        }

        function submitToFormbricks(label) {
            var data = {};
            data[FORMBRICKS_QUESTION_ID] = [label];
            return fetch(FORMBRICKS_HOST + "/api/v1/client/" + FORMBRICKS_ENV_ID + "/responses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    surveyId: FORMBRICKS_SURVEY_ID,
                    finished: true,
                    data: data
                })
            }).then(function (res) {
                if (!res.ok) { throw new Error("Formbricks HTTP " + res.status); }
                return res.json();
            });
        }

        /* ── Poll strip ── */

        function buildPollHTML() {
            var buttonsHTML = OPTIONS.map(function (opt) {
                return '<button type="button" class="cro-12465-poll__btn" data-segment="' + opt.segment + '" data-label="' + opt.label + '">' + opt.label + '</button>';
            }).join('');

            return (
                '<div class="cro-12465-poll" id="cro-12465-poll">' +
                '<div class="cro-12465-poll__inner">' +
                '<p class="cro-12465-poll__q">' + QUESTION + '</p>' +
                '<div class="cro-12465-poll__opts">' + buttonsHTML + '</div>' +
                '<button type="button" class="cro-12465-poll__close" aria-label="Dismiss">&times;</button>' +
                '</div>' +
                '</div>'
            );
        }

        function hidePoll() {
            var poll = document.getElementById('cro-12465-poll');
            if (poll) { poll.style.display = 'none'; }
        }

        function showMessage(text) {
            var inner = document.querySelector('.cro-12465-poll__inner');
            if (inner) {
                inner.innerHTML = '<p class="cro-12465-poll__msg">' + text + '</p>';
            }
        }

        /* One shared routine for all answer buttons — cookie, GA4 and
           Intelligems fire first, independently of the Formbricks result */
        function handleAnswer(segment, label) {
            setSessionHidden();

            var buttons = document.querySelectorAll('.cro-12465-poll__btn');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].setAttribute('disabled', 'disabled');
            }

            setCookie(COOKIE_NAME, segment, COOKIE_DAYS);
            trackGA4(GA4_EVENT, segment);
            trackIntelligems(segment);

            submitToFormbricks(label).then(function () {
                showMessage(THANKS_MSG);
                setTimeout(hidePoll, HIDE_DELAY_MS);
            }).catch(function (err) {
                if (debug) { console.log(err, 'Formbricks submission failed in Test cro-12465'); }
                showMessage(FAIL_MSG);
                setTimeout(hidePoll, HIDE_DELAY_MS);
            });
        }

        function handleDismiss() {
            setSessionHidden();
            trackGA4("audience_poll_dismiss", "");
            hidePoll();
        }

        function bindEvents(poll) {
            poll.addEventListener('click', function (e) {
                var btn = e.target.closest('.cro-12465-poll__btn');
                if (btn && !btn.hasAttribute('disabled')) {
                    handleAnswer(btn.getAttribute('data-segment'), btn.getAttribute('data-label'));
                    return;
                }
                if (e.target.closest('.cro-12465-poll__close')) {
                    handleDismiss();
                }
            });
        }

        function injectPoll() {
            if (document.getElementById('cro-12465-poll')) { return; }
            var banner = document.querySelector('.pdp-header-banner');
            if (!banner) { return; }

            banner.insertAdjacentHTML('beforebegin', buildPollHTML());
            bindEvents(document.getElementById('cro-12465-poll'));
        }

        /* ── Init ── */

        function init() {
            addClass('body', variation_name);
            /* Answered visitors are excluded for the cookie's life (client-approved
               option B); closing without answering only hides for the session */
            if (isSessionHidden() || getCookie(COOKIE_NAME)) { return; }
            waitForElement('.pdp-header-banner', injectPoll);
        }

        if (!window.cro_t_12465) {
            window.cro_t_12465 = true;
            waitForElement('body', init);
        }

    } catch (e) {
        if (debug) { console.log(e, 'error in Test cro-12465'); }
    }
})();
