/**
 * testimonios.js — testimonios.html
 */

import { initSiteChrome } from '../core/site-chrome.js';

const REAL_GALLERY_AUTOPLAY_MS = 4500;

/** Carrusel de fotos reales (sección "Bodas Reales" en testimonios.html). */
function initRealGallery() {
  const track = document.getElementById('realTrack');
  const dotsWrap = document.getElementById('realDots');
  if (!track || !dotsWrap) return;

  const slideCount = track.children.length;
  if (slideCount === 0) return;

  let index = 0;

  dotsWrap.innerHTML = Array.from({ length: slideCount })
    .map((_, i) => `<div class="real-dot${i === 0 ? ' active' : ''}" data-real-dot="${i}"></div>`)
    .join('');
  const dots = dotsWrap.querySelectorAll('.real-dot');

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  function goTo(i) {
    index = (i + slideCount) % slideCount;
    update();
  }

  document.querySelector('[data-real-prev]')?.addEventListener('click', () => goTo(index - 1));
  document.querySelector('[data-real-next]')?.addEventListener('click', () => goTo(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  setInterval(() => goTo(index + 1), REAL_GALLERY_AUTOPLAY_MS);
}

document.addEventListener('DOMContentLoaded', () => {
  initSiteChrome('testimonios.html');
  initRealGallery();
});
