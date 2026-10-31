/* PLACEHOLDER TREE COMPANY — shared front-end JS
   Theme toggle, mobile menu, FAQ accordion, review carousel, estimate form. */
(function () {
  'use strict';

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('pt-theme', t); } catch (e) {}
    document.querySelectorAll('.theme-toggle').forEach(function (b) {
      b.setAttribute('aria-pressed', t === 'dark');
    });
  }
  (function initTheme() {
    var saved;
    try { saved = localStorage.getItem('pt-theme'); } catch (e) {}
    if (saved) { root.setAttribute('data-theme', saved); }
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.setAttribute('data-theme', 'dark');
    }
  })();
  document.addEventListener('click', function (e) {
    var t = e.target.closest('.theme-toggle');
    if (!t) return;
    var cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  });

  /* ---------- Mobile menu ---------- */
  var menu = document.getElementById('mobile-menu');
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    document.querySelectorAll('.menu-toggle').forEach(function (b) {
      b.setAttribute('aria-expanded', open);
    });
    if (open) {
      var first = menu.querySelector('a, button');
      if (first) first.focus();
    }
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('.menu-toggle')) { setMenu(!menu.classList.contains('open')); }
    if (e.target.closest('[data-close-menu]')) { setMenu(false); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu && menu.classList.contains('open')) setMenu(false);
  });
  // mobile submenu groups
  document.querySelectorAll('.m-group > button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var g = btn.parentElement;
      var open = g.getAttribute('aria-expanded') === 'true';
      g.setAttribute('aria-expanded', String(!open));
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var open = item.classList.contains('open');
      item.classList.toggle('open', !open);
      q.setAttribute('aria-expanded', String(!open));
    });
  });

  /* ---------- Review carousel ---------- */
  document.querySelectorAll('.carousel').forEach(function (car) {
    var track = car.querySelector('.carousel-track');
    if (!track) return;
    function step() {
      var card = track.querySelector('.review-card');
      return card ? card.getBoundingClientRect().width + 20 : 320;
    }
    var prev = car.querySelector('[data-prev]');
    var next = car.querySelector('[data-next]');
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
  });

  /* ---------- Estimate form validation ---------- */
  document.querySelectorAll('form[data-estimate]').forEach(function (form) {
    var success = form.parentElement.querySelector('.form-success');
    function validateField(field) {
      var input = field.querySelector('input, select, textarea');
      if (!input) return true;
      var val = (input.value || '').trim();
      var ok = true;
      if (input.hasAttribute('required') && !val) ok = false;
      if (ok && input.type === 'email' && val) ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (ok && input.type === 'tel' && val) ok = (val.replace(/\D/g, '').length >= 7);
      field.classList.toggle('invalid', !ok);
      return ok;
    }
    form.querySelectorAll('.field').forEach(function (field) {
      var input = field.querySelector('input, select, textarea');
      if (input) input.addEventListener('blur', function () { validateField(field); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allOk = true, firstBad = null;
      form.querySelectorAll('.field').forEach(function (field) {
        var ok = validateField(field);
        if (!ok && !firstBad) firstBad = field.querySelector('input, select, textarea');
        if (!ok) allOk = false;
      });
      if (!allOk) { if (firstBad) firstBad.focus(); return; }
      // No backend: show in-page success state.
      form.style.display = 'none';
      if (success) {
        success.classList.add('show');
        success.setAttribute('tabindex', '-1');
        success.focus();
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  /* ---------- Scroll reveal ---------- */
  if (!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Current year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
