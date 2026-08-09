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

  /* ---------- Estimator state (S6 → Typeform hidden fields) ---------- */
  function getEstimator() {
    try { return JSON.parse(sessionStorage.getItem(EST_KEY) || 'null'); } catch (e) { return null; }
  }
  function setEstimator(data) {
    try { sessionStorage.setItem(EST_KEY, JSON.stringify(data)); } catch (e) { /* private mode */ }
    syncHiddenAttrs();
  }

  /* Best-effort: also mirror answers onto data-tf-hidden so the native
     embed binding picks them up if our click interception is unavailable. */
  function syncHiddenAttrs() {
    var est = getEstimator();
    if (!est) return;
    var hidden = 'headcount=' + (est.headcount || '') + ',city=' + (est.city || '') + ',timeframe=' + (est.timeframe || '');
    document.querySelectorAll('[data-crohp-typeform]').forEach(function (el) {
      el.setAttribute('data-tf-hidden', hidden);
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
    var est = getEstimator();
    if (!est || !window.tf || !window.tf.createPopup) return;
    var formId = trigger.getAttribute('data-tf-popup');
    if (!formId) return;
    e.preventDefault();
    e.stopPropagation();
    window.tf.createPopup(formId, {
      hidden: {
        headcount: est.headcount || '',
        city: est.city || '',
        timeframe: est.timeframe || ''
      }
    }).open();
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
      var data = {
        headcount: (form.querySelector('[name="crohp-headcount"]') || {}).value || '',
        city: (form.querySelector('[name="crohp-city"]') || {}).value || '',
        timeframe: (form.querySelector('[name="crohp-timeframe"]') || {}).value || ''
      };
      setEstimator(data);
      /* Route to the pre-filled Typeform: reuse the panel's own trigger */
      var trigger = panel.querySelector('[data-crohp-typeform]');
      if (trigger) trigger.click();
    });
  }

  function init() {
    syncHiddenAttrs();
    initCounters();
    initTimeline();
    initStickyBar();
    initEstimator();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
