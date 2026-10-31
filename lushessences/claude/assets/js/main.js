/* Luscious Essence — one-page behaviour */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── Reveal on scroll ───────────────────────────────────── */
  (function reveal() {
    if (reduceMotion.matches || !('IntersectionObserver' in window)) return;

    var targets = document.querySelectorAll(
      '.head, .hero__lead, .hero__aside, .index, .service__body, .plate, .spec, ' +
      '.statement__quote, .statement__label, .statement__attr, .step, ' +
      '.contact__intro, .form'
    );

    var io = new IntersectionObserver(function (entries) {
      io.fired = true;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });

    // If the observer never fires at all, show everything.
    window.setTimeout(function () {
      if (io.fired) return;
      Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) {
        el.classList.add('is-in');
      });
    }, 2500);
  })();

  /* ── Contact form ───────────────────────────────────────── */
  var form = document.getElementById('enquiry');
  var status = document.getElementById('status');

  function setStatus(text, kind) {
    if (!status) return;
    status.textContent = text;
    status.className = 'form__status' + (kind ? ' is-' + kind : '');
  }

  if (form) {
    var endpoint = form.getAttribute('action');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        setStatus('Name, a valid email, and a description are required.', 'error');
        return;
      }

      var data = new FormData(form);
      data.append('_replyto', data.get('email') || '');

      form.setAttribute('aria-busy', 'true');
      setStatus('Sending');

      fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed: ' + res.status);
          return res.json().catch(function () { return {}; });
        })
        .then(function () {
          form.reset();
          setStatus('Sent. Reply within two business days.', 'ok');
        })
        .catch(function () {
          var subject = encodeURIComponent('Project enquiry');
          var body = encodeURIComponent(
            'Name: ' + (data.get('name') || '') +
            '\nEmail: ' + (data.get('email') || '') +
            '\nCompany: ' + (data.get('company') || '-') +
            '\nDiscipline: ' + (data.get('service') || '') +
            '\n\n' + (data.get('message') || '')
          );
          setStatus('Send failed. ', 'error');
          if (status) {
            var link = document.createElement('a');
            link.href = 'mailto:realwaterblanket@gmail.com?subject=' + subject + '&body=' + body;
            link.textContent = 'Use mail app instead';
            status.appendChild(link);
          }
        })
        .then(function () {
          form.removeAttribute('aria-busy');
        });
    });
  }

  /* ── Anchors clearing the sticky bar ────────────────────── */
  (function anchors() {
    var bar = document.querySelector('.bar');

    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (!link) return;

      var id = link.getAttribute('href');
      if (!id || id === '#') return;

      var target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();

      var offset = bar ? bar.offsetHeight + 1 : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: top,
        behavior: reduceMotion.matches ? 'auto' : 'smooth'
      });

      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      if (history.replaceState) history.replaceState(null, '', id);
    });
  })();

  /* ── Footer year ────────────────────────────────────────── */
  (function year() {
    var el = document.querySelector('.foot__legal p');
    if (!el) return;
    el.textContent = el.textContent.replace(/\d{4}/, String(new Date().getFullYear()));
  })();
})();
