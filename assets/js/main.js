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

    renderPrices();
    renderPractice();
  }

  /* ---------- Prices from config ----------
     Markup: [data-price="<slug>"] containing [data-offer-badge], [data-offer-old],
     [data-price-jd], [data-price-usd]. The HTML ships with the original price and
     the badge/old price hidden, so an expired offer price is never shown. */
  function renderPrices() {
    document.querySelectorAll('[data-price]').forEach(function (el) {
      var price = config.getPrice(el.getAttribute('data-price'));
      if (!price) return;

      var badge = el.querySelector('[data-offer-badge]');
      var old = el.querySelector('[data-offer-old]');
      var jd = el.querySelector('[data-price-jd]');
      var usd = el.querySelector('[data-price-usd]');

      if (jd) jd.textContent = price.jd + ' JD';
      if (usd) usd.textContent = '≈ $' + price.usd;

      if (old) {
        old.textContent = price.oldJD + ' JD';
        old.hidden = !price.onOffer;
      }
      if (badge) {
        badge.textContent = config.getOfferBadgeText();
        badge.hidden = !price.onOffer;
      }
    });
  }

  /* ---------- Practice count (تتضمن الدورة) from config ---------- */
  function renderPractice() {
    document.querySelectorAll('[data-practice]').forEach(function (el) {
      var course = config.getCourse(el.getAttribute('data-practice'));
      if (!course || !course.practice) return;

      var value = el.querySelector('[data-practice-value]');
      var label = el.querySelector('[data-practice-label]');
      if (value) value.textContent = course.practice.value;
      if (label) label.textContent = course.practice.label;
    });
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

  /* ---------- Scroll hint (course hero) ---------- */
  function initScrollHint() {
    var hint = document.querySelector('.scroll-hint');
    if (!hint) return;

    function update() {
      if (window.scrollY > 10) {
        hint.classList.add('is-hidden');
        window.removeEventListener('scroll', update);
      }
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyConfig();
    initNavToggle();
    initReveal();
    initScrollHint();
  });
})();
