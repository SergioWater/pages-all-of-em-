/* ═══════════════════════════════════════════════
   MAIN.JS — Golden Bay Tint
   Rules: No window/document at top level
          All browser APIs inside DOMContentLoaded
          No Math.random() outside effects
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ──────────────────────────────────────────
     1. NAV — Scroll shadow + hamburger
  ────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  // Nav scroll shadow
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('nav--scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.setAttribute('aria-hidden', String(isOpen));
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // Close mobile menu on outside click
  document.addEventListener('click', function (e) {
    if (
      mobileMenu &&
      hamburger &&
      !nav.contains(e.target) &&
      mobileMenu.getAttribute('aria-hidden') === 'false'
    ) {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });


  /* ──────────────────────────────────────────
     2. SMOOTH SCROLL — anchor links
  ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });


  /* ──────────────────────────────────────────
     3. SCROLL ANIMATIONS — fade up on enter
     Uses IntersectionObserver (no layout cost)
  ────────────────────────────────────────── */
  const fadeElements = document.querySelectorAll(
    '.service-card, .review-card, .gallery__item, .section-header'
  );

  fadeElements.forEach(function (el) {
    el.classList.add('fade-up');
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }


  /* ──────────────────────────────────────────
     4. CAL.COM EMBED — fallback detection
     If the embed doesn't load in 5s, show
     the fallback booking button instead
  ────────────────────────────────────────── */
  var calEmbed = document.getElementById('my-cal-inline-30min');
  var calFallback = document.getElementById('booking-fallback');

  if (calEmbed && calFallback) {
    setTimeout(function () {
      // Check if Cal.com injected an iframe
      var hasIframe = calEmbed.querySelector('iframe');
      if (!hasIframe) {
        calEmbed.style.display = 'none';
        calFallback.style.display = 'flex';
      }
    }, 5000);
  }


  /* ──────────────────────────────────────────
     5. ACTIVE NAV LINK — highlight on scroll
  ────────────────────────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

  if (sections.length && navLinks.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              link.removeAttribute('data-active');
              if (link.getAttribute('href') === '#' + entry.target.id) {
                link.setAttribute('data-active', 'true');
              }
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

});
