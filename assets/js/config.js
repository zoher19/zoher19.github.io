/* ==========================================================================
   ZOMEN — Global configuration
   Single source of truth for links, offer date, stats and course prices.
   ========================================================================== */

(function (global) {
  'use strict';

  var ZOMEN_CONFIG = {
    instagramLink: 'https://www.instagram.com/zoher19_/',
    offerEndDate: '2026-11-19T23:59:00+03:00',

    stats: {
      students: '+200',
      followers: '+18.5K',
      mentorship: '1:1'
    },

    courses: {
      'cpp-fundamentals': {
        oldPriceJD: 35,
        newPriceJD: 20,
        oldPriceUSD: 49,
        newPriceUSD: 28
      },
      'cpp-oop': {
        oldPriceJD: 35,
        newPriceJD: 20,
        oldPriceUSD: 49,
        newPriceUSD: 28
      },
      'java-fundamentals': {
        oldPriceJD: 40,
        newPriceJD: 25,
        oldPriceUSD: 56,
        newPriceUSD: 35
      },
      'java-oop': {
        oldPriceJD: 40,
        newPriceJD: 25,
        oldPriceUSD: 56,
        newPriceUSD: 35
      },
      'python-fundamentals': {
        oldPriceJD: 35,
        newPriceJD: 20,
        oldPriceUSD: 49,
        newPriceUSD: 28
      }
    },

    /** Returns true while the limited-time offer is still active. */
    isOfferActive: function () {
      return Date.now() < new Date(this.offerEndDate).getTime();
    }
  };

  global.ZOMEN_CONFIG = ZOMEN_CONFIG;
})(window);
