/* ==========================================================================
   ZOMEN — Site behavior
   ========================================================================== */

(function () {
  'use strict';

  var config = window.ZOMEN_CONFIG;

  /* ---------- Instagram links + stats from config ---------- */
  function applyConfig() {
    if (!config) return;

    document.querySelectorAll('.js-instagram-link').forEach(function (link) {
      link.href = config.instagramLink;
    });

    document.querySelectorAll('[data-stat]').forEach(function (el) {
      var key = el.getAttribute('data-stat');
      if (config.stats[key]) {
        el.textContent = config.stats[key];
      }
    });

    if (!config.isOfferActive()) {
      document.querySelectorAll('[data-offer-badge]').forEach(function (el) {
        el.style.display = 'none';
      });
      document.querySelectorAll('[data-offer-old]').forEach(function (el) {
        el.style.display = 'none';
      });
      document.querySelectorAll('.price-card').forEach(function (el) {
        el.classList.add('is-offer-ended');
      });
    }
  }

  /* ---------- Mobile nav toggle ---------- */
  function initNavToggle() {
    var toggle = document.querySelector('.navbar__toggle');
    var menu = document.querySelector('.navbar__menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Sticky mobile price bar (course pages) ---------- */
  function initStickyPrice() {
    var bar = document.querySelector('.sticky-price-bar');
    var mainPriceCard = document.querySelector('.price-card');
    if (!bar || !mainPriceCard) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        bar.classList.toggle('is-visible', !entry.isIntersecting && entry.boundingClientRect.top < 0);
      });
    }, { threshold: 0 });

    observer.observe(mainPriceCard);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyConfig();
    initNavToggle();
    initReveal();
    initStickyPrice();
  });
})();
