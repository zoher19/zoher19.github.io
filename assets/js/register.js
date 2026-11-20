/* ==========================================================================
   ZOMEN — Register page (register.html?course=<slug>)
   Loaded after config.js and main.js, at the end of <body>, so it runs before
   DOMContentLoaded and main.js then renders the price card it marks up.
   ========================================================================== */

(function () {
  'use strict';

  var config = window.ZOMEN_CONFIG;
  if (!config) return;

  var picker = document.getElementById('registerPicker');
  var checkout = document.getElementById('registerCheckout');

  /* ---------- Course picker titles from config ---------- */
  document.querySelectorAll('[data-course-option]').forEach(function (link) {
    var course = config.getCourse(link.getAttribute('data-course-option'));
    var title = link.querySelector('[data-course-option-title]');
    if (course && title) title.textContent = course.title;
  });

  /* ---------- Payment details from config ---------- */
  document.querySelectorAll('[data-pay]').forEach(function (el) {
    var path = el.getAttribute('data-pay').split('.');
    var value = config.payment[path[0]] && config.payment[path[0]][path[1]];
    if (value) el.textContent = value;
  });

  /* ---------- Selected course ---------- */
  var slug = new URLSearchParams(window.location.search).get('course');
  var course = slug ? config.getCourse(slug) : null;

  if (course) {
    var price = config.getPrice(slug);

    document.querySelector('[data-register-title]').textContent = course.title;
    document.querySelector('[data-register-price]').setAttribute('data-price', slug);
    document.querySelector('[data-register-amount="jd"]').textContent = price.jd + ' JD';
    document.querySelector('[data-register-amount="usd"]').textContent = '$' + price.usd;
    document.title = 'التسجيل في ' + course.title + ' | ZOMEN';

    picker.hidden = true;
    checkout.hidden = false;
  }

  /* ---------- Copy buttons ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for file:// and older browsers
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(area);
      if (ok) { resolve(); } else { reject(new Error('copy failed')); }
    });
  }

  document.querySelectorAll('.copy-btn').forEach(function (button) {
    var field = button.closest('.pay-field');
    var valueEl = field && field.querySelector('.pay-field__value');
    var label = button.querySelector('.copy-btn__label');
    if (!valueEl || !label) return;

    var resetTimer;

    button.addEventListener('click', function () {
      var text = valueEl.textContent.trim();
      if (valueEl.hasAttribute('data-copy-compact')) {
        text = text.replace(/\s+/g, '');
      }

      copyText(text).then(function () {
        clearTimeout(resetTimer);
        button.classList.add('is-copied');
        label.textContent = 'تم النسخ ✓';
        resetTimer = setTimeout(function () {
          button.classList.remove('is-copied');
          label.textContent = 'نسخ';
        }, 2000);
      }).catch(function () {
        // Copy blocked: select the value so the student can copy it manually
        var range = document.createRange();
        range.selectNodeContents(valueEl);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      });
    });
  });
})();
