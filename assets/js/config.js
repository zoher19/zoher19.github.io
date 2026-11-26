/* ==========================================================================
   ZOMEN — Global configuration
   Single source of truth for links, offer date, stats, course prices,
   practice counts and payment details.
   ========================================================================== */

(function (global) {
  'use strict';

  var WEEKDAYS_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  var ZOMEN_CONFIG = {
    instagramLink: 'https://www.instagram.com/zoher19_/',

    /* نهاية العرض بتوقيت الأردن. نص الشارة ("حتى الخميس 26/11") يتولّد منه تلقائياً. */
    offerEndDate: '2026-12-03T23:59:00+03:00',

    stats: {
      students: '+200',
      followers: '+18.5K',
      mentorship: '1:1'
    },

    /*
     * oldPriceJD / oldPriceUSD = السعر الأصلي (يظهر وحده بعد انتهاء العرض).
     * newPriceJD / newPriceUSD = سعر العرض (يظهر فقط قبل offerEndDate).
     * practice = الرقم والنص في كرت "تتضمن الدورة".
     */
    courses: {
      'cpp-fundamentals': {
        title: 'أساسيات C++',
        page: 'courses/cpp-fundamentals.html',
        oldPriceJD: 35,
        newPriceJD: 20,
        oldPriceUSD: 49,
        newPriceUSD: 28,
        practice: { value: '100', label: 'مشكلة برمجية محلولة' }
      },
      'cpp-oop': {
        title: 'البرمجة الكائنية OOP بلغة C++',
        page: 'courses/cpp-oop.html',
        oldPriceJD: 35,
        newPriceJD: 20,
        oldPriceUSD: 49,
        newPriceUSD: 28,
        practice: { value: '+20', label: 'تاسك عملي' }
      },
      'java-fundamentals': {
        title: 'أساسيات Java',
        page: 'courses/java-fundamentals.html',
        oldPriceJD: 40,
        newPriceJD: 25,
        oldPriceUSD: 56,
        newPriceUSD: 35,
        practice: { value: '50', label: 'مشكلة برمجية محلولة' }
      },
      'java-oop': {
        title: 'البرمجة الكائنية OOP بلغة Java',
        page: 'courses/java-oop.html',
        oldPriceJD: 40,
        newPriceJD: 25,
        oldPriceUSD: 56,
        newPriceUSD: 35,
        practice: { value: '+20', label: 'تاسك عملي' }
      },
      'python-fundamentals': {
        title: 'أساسيات Python',
        page: 'courses/python-fundamentals.html',
        oldPriceJD: 35,
        newPriceJD: 20,
        oldPriceUSD: 49,
        newPriceUSD: 28,
        practice: { value: '50', label: 'مشكلة برمجية محلولة' }
      }
    },

    payment: {
      cliq: {
        number: '+962 79 760 8378', /* يُعرض كما هو، وزر النسخ يحذف الفراغات */
        recipient: 'Zuhir Amer Alhallak'
      },
      westernUnion: {
        fullName: 'Zuhir Amer Alhallak',
        country: 'Jordan',
        city: 'Amman'
      }
    },

    /** Returns true while the limited-time offer is still active. */
    isOfferActive: function () {
      return Date.now() < new Date(this.offerEndDate).getTime();
    },

    /** Returns the course entry for a slug, or null if the slug is unknown. */
    getCourse: function (slug) {
      return Object.prototype.hasOwnProperty.call(this.courses, slug) ? this.courses[slug] : null;
    },

    /**
     * Prices to display right now for a course:
     * { onOffer, jd, usd, oldJD, oldUSD }. When the offer has ended,
     * jd/usd are the original prices and onOffer is false.
     */
    getPrice: function (slug) {
      var course = this.getCourse(slug);
      if (!course) return null;
      var onOffer = this.isOfferActive();
      return {
        onOffer: onOffer,
        jd: onOffer ? course.newPriceJD : course.oldPriceJD,
        usd: onOffer ? course.newPriceUSD : course.oldPriceUSD,
        oldJD: course.oldPriceJD,
        oldUSD: course.oldPriceUSD
      };
    },

    /**
     * Badge text built from offerEndDate, using the date and weekday as written
     * in its own UTC offset (Jordan time), e.g. "عرض لفترة محدودة · حتى الخميس 26/11".
     */
    getOfferBadgeText: function () {
      var match = /([+-])(\d{2}):(\d{2})$/.exec(this.offerEndDate);
      var offsetMinutes = match
        ? (match[1] === '-' ? -1 : 1) * (parseInt(match[2], 10) * 60 + parseInt(match[3], 10))
        : 0;
      var local = new Date(new Date(this.offerEndDate).getTime() + offsetMinutes * 60000);
      return 'عرض لفترة محدودة · حتى ' + WEEKDAYS_AR[local.getUTCDay()] + ' ' +
        local.getUTCDate() + '/' + (local.getUTCMonth() + 1);
    }
  };

  global.ZOMEN_CONFIG = ZOMEN_CONFIG;
})(window);
