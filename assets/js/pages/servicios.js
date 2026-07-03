/**
 * servicios.js — servicios.html
 */

import { initSiteChrome } from '../core/site-chrome.js';
import { initReveal, triggerReveal } from '../core/reveal.js';

/** Smooth-scrolls to a #hash target on load (e.g. arriving from a link like servicios.html#bodas). */
function scrollToHashTarget() {
  if (!location.hash) return;
  setTimeout(() => {
    const el = document.querySelector(location.hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 400);
}

/* ── Regalos Empresariales: category tabs + lightbox ── */

/** @type {Record<string, string[]>} category slug -> ordered image paths (kept in sync with servicios.html) */
const reGalleries = {
  'kit-matero': [
    'img/regalos-empresariales/kit-matero/kit-matero-claudia.webp',
  ],
  'mesa-marmol': [
    'img/regalos-empresariales/mesa-marmol/mesa-marmol-01.webp',
    'img/regalos-empresariales/mesa-marmol/mesa-marmol-02.webp',
    'img/regalos-empresariales/mesa-marmol/mesa-marmol-03.webp',
  ],
  'vasos-termicos': [
    'img/regalos-empresariales/vasos-grabado-laser/vasos-nombres-familia.webp',
    'img/regalos-empresariales/vasos-grabado-laser/vasos-shell-vikingo.webp',
    'img/regalos-empresariales/vasos-grabado-laser/vaso-sampdoria.webp',
    'img/regalos-empresariales/vasos-grabado-laser/vaso-zbs98.webp',
    'img/regalos-empresariales/vasos-grabado-laser/vaso-pioneros.webp',
    'img/regalos-empresariales/vasos-grabado-laser/vaso-psg.webp',
  ],
};

let reCurrentGallery = '';
let reCurrentIndex = 0;

function switchReTab(target, buttonEl) {
  document.querySelectorAll('.re-tab').forEach((b) => b.classList.remove('active'));
  document.querySelectorAll('[data-re-panel]').forEach((p) => p.classList.remove('active'));

  buttonEl.classList.add('active');
  const panel = document.getElementById(`re-${target}`);
  if (panel) panel.classList.add('active');

  triggerReveal();
}

function openReLightbox(gallery, index) {
  if (!reGalleries[gallery]) return;
  reCurrentGallery = gallery;
  reCurrentIndex = index;
  updateReLightbox();
  document.getElementById('reLightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeReLightbox() {
  document.getElementById('reLightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function navigateReLightbox(direction) {
  const images = reGalleries[reCurrentGallery];
  if (!images) return;
  reCurrentIndex = (reCurrentIndex + direction + images.length) % images.length;
  updateReLightbox();
}

function updateReLightbox() {
  const images = reGalleries[reCurrentGallery];
  if (!images) return;
  document.getElementById('reLbImg').src = images[reCurrentIndex];
  document.getElementById('reLbCounter').textContent = `${reCurrentIndex + 1} / ${images.length}`;
}

function initRegalosEmpresariales() {
  if (!document.getElementById('reTabs')) return; // section not on this page build

  document.addEventListener('click', (event) => {
    if (event.target.id === 'reLightbox') closeReLightbox();

    const el = event.target.closest('[data-action]');
    if (!el) return;

    switch (el.dataset.action) {
      case 're-switch-tab':
        switchReTab(el.dataset.target, el);
        break;
      case 're-open-lightbox':
        openReLightbox(el.dataset.gallery, Number(el.dataset.index));
        break;
      case 're-close-lightbox':
        closeReLightbox();
        break;
      case 're-lightbox-nav':
        navigateReLightbox(Number(el.dataset.dir));
        break;
      default:
        break;
    }
  });

  document.addEventListener('keydown', (event) => {
    // Enter/Space activates focusable thumbnail divs (role="button")
    if (event.key === 'Enter' || event.key === ' ') {
      const el = event.target.closest('[data-action][role="button"]');
      if (el) {
        event.preventDefault();
        el.click();
        return;
      }
    }
    if (!document.getElementById('reLightbox').classList.contains('open')) return;
    if (event.key === 'ArrowRight') navigateReLightbox(1);
    if (event.key === 'ArrowLeft') navigateReLightbox(-1);
    if (event.key === 'Escape') closeReLightbox();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSiteChrome('servicios.html');
  scrollToHashTarget();
  initRegalosEmpresariales();
  initReveal();
});
