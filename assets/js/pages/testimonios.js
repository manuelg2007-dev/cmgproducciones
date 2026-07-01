/**
 * testimonios.js — testimonios.html
 */

import { initSiteChrome } from '../core/site-chrome.js';

const CLAMP_MIN_PCT = 5;
const CLAMP_MAX_PCT = 95;

function initBeforeAfterSlider() {
  const wrap = document.getElementById('sliderWrap');
  const after = document.getElementById('sliderAfter');
  const handle = document.getElementById('sliderHandle');
  if (!wrap || !after || !handle) return;

  let dragging = false;

  function setSlider(clientX) {
    const rect = wrap.getBoundingClientRect();
    const pct = Math.max(
      CLAMP_MIN_PCT,
      Math.min(CLAMP_MAX_PCT, ((clientX - rect.left) / rect.width) * 100)
    );
    after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = `${pct}%`;
  }

  handle.addEventListener('mousedown', () => { dragging = true; });
  window.addEventListener('mouseup', () => { dragging = false; });
  window.addEventListener('mousemove', (e) => { if (dragging) setSlider(e.clientX); });

  handle.addEventListener('touchstart', () => { dragging = true; }, { passive: true });
  window.addEventListener('touchend', () => { dragging = false; });
  window.addEventListener('touchmove', (e) => {
    if (dragging) setSlider(e.touches[0].clientX);
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  initSiteChrome('testimonios.html');
  initBeforeAfterSlider();
});
