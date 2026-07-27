/**
 * CRO Shared Utilities
 * Copy only the functions you need into your variant.js.
 * Do not import this file directly — AB test platforms run isolated JS.
 */

/* ─── DOM POLLING ─────────────────────────────────────────────────────────── */

function waitForElement(selector, trigger) {
    var interval = setInterval(function () {
        if (document && document.querySelector(selector) && document.querySelectorAll(selector).length > 0) {
            clearInterval(interval);
            trigger();
        }
    }, 50);
    setTimeout(function () { clearInterval(interval); }, 15000);
}

/* ─── CLASS HELPERS ───────────────────────────────────────────────────────── */

function addClass(el, cls) {
    var node = document.querySelector(el);
    if (node) node.classList.add(cls);
}

function removeClass(el, cls) {
    var node = document.querySelector(el);
    if (node) node.classList.remove(cls);
}

/* ─── HTML INJECTION ──────────────────────────────────────────────────────── */

function insertHtml(selector, content, position) {
    var el = document.querySelector(selector);
    if (el && content) el.insertAdjacentHTML(position || 'afterend', content);
}

function innerHTMLContent(selector, content) {
    var el = document.querySelector(selector);
    if (el) el.innerHTML = content;
}

/* ─── MUTATION OBSERVER ───────────────────────────────────────────────────── */

/**
 * Watch a container for DOM changes and call callback when it fires.
 * Uses a flag on the observer instance to prevent double-attaching.
 *
 * Usage:
 *   observeChanges('.price-box', '_myObserved', function(mutations) { ... });
 */
function observeChanges(selector, flagKey, callback) {
    var el = document.querySelector(selector);
    if (!el || el[flagKey]) return;
    el[flagKey] = true;
    var observer = new MutationObserver(function (mutations) {
        callback(mutations);
    });
    observer.observe(el, { childList: true, subtree: true, characterData: true });
}

/* ─── LATE HYDRATION RESTORE GUARD (React / Next.js) ─────────────────────── */

/**
 * React can wipe injected HTML ~2s after page load during hydration.
 * Call this after your init() to re-run restoreFn every 300ms for 8s.
 *
 * Usage:
 *   hydrationGuard('body', variation_name, function() { init(); });
 */
function hydrationGuard(bodyClass, variationName, restoreFn) {
    var attempts = 0;
    var guard = setInterval(function () {
        attempts++;
        if (attempts > 26) { clearInterval(guard); return; } // 8s ceiling
        var bodyHasClass = document.body && document.body.classList.contains(bodyClass || variationName);
        if (!bodyHasClass) restoreFn();
    }, 300);
}

/* ─── EVENT DELEGATION (non-React pages only) ─────────────────────────────── */

/**
 * WARNING: Do NOT use live() on React-rendered pages — triggers infinite loops.
 * Safe only on server-rendered / Magento / plain HTML pages.
 */
function live(selector, event, callback, context) {
    function addEvent(el, type, handler) {
        if (el.attachEvent) el.attachEvent('on' + type, handler);
        else el.addEventListener(type, handler);
    }
    if (this && this.Element) {
        (function (P) {
            P.matches = P.matches || P.matchesSelector || P.webkitMatchesSelector || P.msMatchesSelector || function (s) {
                var node = this, nodes = (node.parentNode || node.document).querySelectorAll(s), i = -1;
                while (nodes[++i] && nodes[i] !== node);
                return !!nodes[i];
            };
        })(Element.prototype);
    }
    addEvent(context || document, event, function (e) {
        var found, el = e.target || e.srcElement;
        while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
        if (found) callback.call(el, e);
    });
}

/* ─── SWIPER DOM INJECTION ────────────────────────────────────────────────── */

/**
 * On React pages with Swiper, always inject BEFORE the Swiper container
 * (beforebegin), never inside it. Inserting inside triggers MutationObserver
 * → React orphans the element → fiber keys are gone → .click() silently fails.
 */
function injectBeforeSwiper(swiperSelector, html) {
    var swiper = document.querySelector(swiperSelector);
    if (swiper) swiper.insertAdjacentHTML('beforebegin', html);
}
