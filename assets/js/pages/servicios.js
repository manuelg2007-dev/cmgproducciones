/**
 * servicios.js — servicios.html
 */

import { initSiteChrome } from '../core/site-chrome.js';

/** Smooth-scrolls to a #hash target on load (e.g. arriving from a link like servicios.html#bodas). */
function scrollToHashTarget() {
  if (!location.hash) return;
  setTimeout(() => {
    const el = document.querySelector(location.hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
  initSiteChrome('servicios.html');
  scrollToHashTarget();
});
