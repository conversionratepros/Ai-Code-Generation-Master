/* ============================================================
   CRO-HP — Homepage Redesign | All (JasonL)
   Shared behaviour for all cro-hp-* sections.
   Referenced (defer) by several sections — guard makes the
   duplicate executions no-ops.
   ============================================================ */
(function () {
  'use strict';
  if (window.__croHp) return;
  window.__croHp = true;

  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EST_KEY = 'croHpEstimator';
  var EST_ENTRY_POINT = 'homepage-estimator';
  var EST_FIELDS = ['headcount', 'city', 'timeframe'];

  /* ---------- Estimator state (S6 → Typeform hidden fields) ---------- */
  function getEstimator() {
    try { return JSON.parse(sessionStorage.getItem(EST_KEY) || 'null'); } catch (e) { return null; }
  }
  function setEstimator(data) {
    try { sessionStorage.setItem(EST_KEY, JSON.stringify(data)); } catch (e) { /* private mode */ }
    syncHiddenAttrs();
  }

  /* Dropdown options are display labels ("11–30", "Within a month", "30+");
     the client's Typeform expects URL-slug values ("11-30",
     "within-a-month", "30-plus"). */
  function slugify(value) {
    return String(value)
      .toLowerCase()
      .replace(/\+/g, ' plus')
      .replace(/[–—]/g, '-')
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /* Hidden-field payload: only the dropdowns actually answered (empty ones
     are omitted entirely) plus a constant entry_point tag. null until the
     estimator has been submitted at least once. */
  function estimatorHidden() {
    var est = getEstimator();
    if (!est) return null;
    var hidden = {};
    EST_FIELDS.forEach(function (key) {
      if (est[key]) hidden[key] = est[key];
    });
    hidden.entry_point = EST_ENTRY_POINT;
    return hidden;
  }

  /* Best-effort: also mirror answers onto data-tf-hidden so the native
     embed binding picks them up if our click interception is unavailable. */
  function syncHiddenAttrs() {
    var hidden = estimatorHidden();
    if (!hidden) return;
    var attr = Object.keys(hidden).map(function (key) {
      return key + '=' + hidden[key];
    }).join(',');
    document.querySelectorAll('[data-crohp-typeform]').forEach(function (el) {
      el.setAttribute('data-tf-hidden', attr);
    });
  }

  /* Capture-phase interception: when estimator answers exist and the
     Typeform JS API is available, open the popup ourselves with hidden
     fields (embed.js captures its config at bind time, so attribute
     edits alone are not reliable). Without answers or without window.tf
     we do nothing and the native typeform-share binding runs untouched. */
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest ? e.target.closest('[data-crohp-typeform]') : null;
    if (!trigger) return;
    var hidden = estimatorHidden();
    if (!hidden || !window.tf || !window.tf.createPopup) return;
    var formId = trigger.getAttribute('data-tf-popup');
    if (!formId) return;
    e.preventDefault();
    e.stopPropagation();
    window.tf.createPopup(formId, { hidden: hidden }).open();
  }, true);

  /* ---------- One-shot in-view helper ---------- */
  function onceInView(el, fn, threshold) {
    if (!('IntersectionObserver' in window)) { fn(el); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { io.unobserve(entry.target); fn(entry.target); }
      });
    }, { threshold: threshold || 0.35 });
    io.observe(el);
  }

  /* ---------- Stat counters (S2) — tick once on scroll-in ---------- */
  function initCounters() {
    document.querySelectorAll('[data-crohp-count]').forEach(function (el) {
      var raw = el.getAttribute('data-crohp-count');
      var target = parseFloat(String(raw).replace(/[^0-9.]/g, ''));
      if (isNaN(target)) return;
      onceInView(el, function () {
        if (REDUCED) { return; } /* markup already contains the final value */
        var decimals = (String(raw).split('.')[1] || '').length;
        var start = null, DURATION = 900;
        var prefix = el.getAttribute('data-crohp-prefix') || '';
        var suffix = el.getAttribute('data-crohp-suffix') || '';
        function frame(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / DURATION, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = target * eased;
          el.textContent = prefix + (decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString('en-AU')) + suffix;
          if (p < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      });
    });
  }

  /* ---------- Timeline draw (S3) — draws itself once ---------- */
  function initTimeline() {
    document.querySelectorAll('[data-crohp-timeline]').forEach(function (el) {
      if (REDUCED) { el.classList.add('is-drawn'); return; }
      /* Hidden start state only applies once JS is confirmed running,
         so a script failure never leaves the steps invisible */
      el.classList.add('crohp-anim-ready');
      onceInView(el, function () { el.classList.add('is-drawn'); }, 0.25);
    });
  }

  /* ---------- Sticky mobile bar — hides while final ask in view ---------- */
  function initStickyBar() {
    var bar = document.querySelector('[data-crohp-sticky]');
    if (!bar) return;
    var finalAsk = document.querySelector('[data-crohp-final-ask]');
    if (finalAsk && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          bar.classList.toggle('crohp-sticky--hidden', entry.isIntersecting);
        });
      }, { threshold: 0.05 }).observe(finalAsk);
    }
  }

  /* ---------- Estimator panel (S6) ---------- */
  function initEstimator() {
    var panel = document.querySelector('[data-crohp-estimator]');
    if (!panel) return;
    var form = panel.querySelector('form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      /* Only answered dropdowns are stored — submit always proceeds,
         even with none selected. */
      var data = {};
      EST_FIELDS.forEach(function (key) {
        var field = form.querySelector('[name="crohp-' + key + '"]');
        if (field && field.value) data[key] = slugify(field.value);
      });
      setEstimator(data);
      /* Route to the pre-filled Typeform: reuse the panel's own trigger */
      var trigger = panel.querySelector('[data-crohp-typeform]');
      if (trigger) trigger.click();
    });
  }

  /* ---------- Mobile accordions (S9 showrooms, footer menu) ---------- */
  function isMobile() { return window.matchMedia('(max-width: 749px)').matches; }

  function initAccordions() {
    document.querySelectorAll('.crohp-rooms__row').forEach(function (row) {
      row.addEventListener('click', function (e) {
        if (!isMobile()) return;
        var interactive = e.target.closest && e.target.closest('a, button, modal-opener');
        if (row.classList.contains('is-open') && interactive) return; /* let links work once open */
        if (interactive) e.preventDefault();
        var wasOpen = row.classList.contains('is-open');
        row.parentElement.querySelectorAll('.crohp-rooms__row.is-open').forEach(function (r) { r.classList.remove('is-open'); });
        if (!wasOpen) row.classList.add('is-open');
      });
    });
    document.querySelectorAll('.crohp-footer__col-title').forEach(function (title) {
      title.addEventListener('click', function () {
        if (!isMobile()) return;
        title.parentElement.classList.toggle('is-open');
      });
    });
    /* Comp default state: first showroom row open on mobile load */
    if (isMobile()) {
      var firstRow = document.querySelector('.crohp-rooms__row');
      if (firstRow) firstRow.classList.add('is-open');
    }
  }

  /* ---------- Case-card rail scroll progress (mobile) ----------
     Fixed-width thumb travels the 179px track proportionally to
     rail scroll position; re-measured on scroll AND resize so it
     works regardless of which viewport the page loaded at. */
  function initCaseRail() {
    var rail = document.querySelector('.crohp-cases__grid');
    if (!rail) return;
    var track = document.createElement('div');
    track.className = 'crohp-cases__progress';
    var bar = document.createElement('div');
    bar.className = 'crohp-cases__progress-bar';
    track.appendChild(bar);
    rail.insertAdjacentElement('afterend', track);
    function update() {
      var max = rail.scrollWidth - rail.clientWidth;
      var trackW = track.clientWidth;
      if (max <= 0 || trackW <= 0) { bar.style.transform = 'translateX(0)'; return; }
      var thumbW = Math.max(30, Math.round(trackW * rail.clientWidth / rail.scrollWidth));
      var p = Math.min(1, Math.max(0, rail.scrollLeft / max));
      bar.style.width = thumbW + 'px';
      bar.style.transform = 'translateX(' + Math.round(p * (trackW - thumbW)) + 'px)';
    }
    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ---------- Showrooms (ported from CRO-12526 v2, QA bug 56 etc.) ----
     Visible 360° pill forwards to the row's hidden native modal trigger;
     side image shows the active row's photo; hover/focus activates on
     desktop, tap-accordion with single-open + toggle-off on mobile. */
  function initShowrooms12526() {
    var rows = document.querySelectorAll('[data-cro12526v2-showroom-row]');
    if (!rows.length) return;
    var imagePane = document.querySelector('[data-cro12526v2-showroom-image]');

    function activate(row) {
      rows.forEach(function (r) {
        r.classList.toggle('is-active', r === row);
      });
      if (!imagePane) return;
      var tpl = row.querySelector('template[data-cro12526v2-showroom-img]');
      imagePane.innerHTML = '';
      if (tpl) imagePane.appendChild(tpl.content.cloneNode(true));
    }

    rows.forEach(function (row) {
      var tourBtn = row.querySelector('[data-cro12526v2-tour-btn]');
      if (tourBtn) {
        tourBtn.addEventListener('click', function () {
          var nativeWrap = row.querySelector('.cro12526v2-showrooms__tour-native');
          if (nativeWrap && nativeWrap.hasAttribute('hidden')) {
            var dialog = nativeWrap.querySelector('modal-dialog');
            if (dialog) document.body.appendChild(dialog);
            nativeWrap.removeAttribute('hidden');
            nativeWrap.style.display = 'none';
          }
          var nativeBtn = nativeWrap ? nativeWrap.querySelector('modal-opener button') : null;
          if (nativeBtn) nativeBtn.click();
        });
      }
      row.addEventListener('mouseenter', function () {
        if (window.matchMedia('(hover: hover)').matches) activate(row);
      });
      row.addEventListener('focusin', function () {
        activate(row);
      });
      row.addEventListener('click', function (e) {
        if (e.target.closest('a, button')) return;
        var mobile = window.matchMedia('(max-width: 749px)').matches;
        if (mobile && row.classList.contains('is-active')) {
          row.classList.remove('is-active');
          return;
        }
        activate(row);
      });
    });

    var first = document.querySelector('[data-cro12526v2-showroom-row].is-active') || rows[0];
    activate(first);
  }

  function init() {
    syncHiddenAttrs();
    initCounters();
    initTimeline();
    initStickyBar();
    initEstimator();
    initAccordions();
    initCaseRail();
    initShowrooms12526();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
