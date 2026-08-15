/**
 * portfolio.js — portfolio.html
 *
 * Rebuilt from the original inline script with one structural change:
 * every interactive element used an inline `onclick="..."` attribute
 * (openLightbox, switchMain, switchSub, toggleMenu, lbNav, ...). These
 * are now `data-action` attributes handled by a single delegated click
 * listener. Same triggers, same behavior — but this file no longer
 * needs `script-src 'unsafe-inline'` in the CSP, and the gallery/tab
 * logic is no longer split across dozens of duplicated attribute
 * strings in the HTML.
 */

import { initReveal, triggerReveal } from '../core/reveal.js';

/** @type {Record<string, string[]>} gallery id -> ordered image paths */
const galleries = {
  'infantil-yulieth': [
    'img/infantil/yulieth/CMG_9684.webp', 'img/infantil/yulieth/CMG_9701.webp', 'img/infantil/yulieth/CMG_9704.webp',
    'img/infantil/yulieth/CMG_9711.webp', 'img/infantil/yulieth/CMG_9717.webp', 'img/infantil/yulieth/CMG_9738.webp',
    'img/infantil/yulieth/CMG_9744.webp', 'img/infantil/yulieth/CMG_9752.webp', 'img/infantil/yulieth/CMG_9782.webp',
    'img/infantil/yulieth/CMG_9813.webp',
  ],
  'empresas-roger-molinas': [
    'img/empresas/roger-molinas/CMG_9445.webp', 'img/empresas/roger-molinas/CMG_9447.webp', 'img/empresas/roger-molinas/CMG_9452.webp',
    'img/empresas/roger-molinas/CMG_9455.webp', 'img/empresas/roger-molinas/CMG_9459.webp', 'img/empresas/roger-molinas/CMG_9466.webp',
    'img/empresas/roger-molinas/CMG_9481.webp', 'img/empresas/roger-molinas/CMG_9486.webp', 'img/empresas/roger-molinas/CMG_9508.webp',
    'img/empresas/roger-molinas/CMG_9517.webp',
  ],
  'empresas-neolife': [
    'img/empresas/neolife/CMG_7317.webp', 'img/empresas/neolife/CMG_7323.webp', 'img/empresas/neolife/CMG_7325.webp',
    'img/empresas/neolife/CMG_7327.webp', 'img/empresas/neolife/CMG_7329.webp', 'img/empresas/neolife/CMG_7331.webp',
    'img/empresas/neolife/CMG_7333.webp', 'img/empresas/neolife/CMG_7335.webp', 'img/empresas/neolife/CMG_7338.webp',
    'img/empresas/neolife/CMG_7340.webp',
  ],
  'bautismo-arantza': [
    'img/bautismo/arantza/CMG_3311.webp', 'img/bautismo/arantza/CMG_3316.webp', 'img/bautismo/arantza/CMG_3320.webp',
    'img/bautismo/arantza/CMG_3324.webp', 'img/bautismo/arantza/CMG_3326.webp', 'img/bautismo/arantza/CMG_3327.webp',
    'img/bautismo/arantza/CMG_3332.webp', 'img/bautismo/arantza/CMG_3336.webp', 'img/bautismo/arantza/CMG_3344.webp',
    'img/bautismo/arantza/CMG_3390.webp',
  ],
  'quince-giannina-prexv': [
    'img/quince/giannina/giannina-prexv-01.webp', 'img/quince/giannina/giannina-prexv-02.webp', 'img/quince/giannina/giannina-prexv-03.webp',
    'img/quince/giannina/giannina-prexv-04.webp', 'img/quince/giannina/giannina-prexv-05.webp', 'img/quince/giannina/giannina-prexv-06.webp',
    'img/quince/giannina/giannina-prexv-07.webp', 'img/quince/giannina/giannina-prexv-08.webp', 'img/quince/giannina/giannina-prexv-09.webp',
    'img/quince/giannina/giannina-prexv-10.webp',
  ],
  'quince-jimena-prexv': [
    'img/quince/jimena/prexv/CMG_7760.webp', 'img/quince/jimena/prexv/CMG_7844.webp', 'img/quince/jimena/prexv/CMG_7869.webp',
    'img/quince/jimena/prexv/CMG_7881.webp', 'img/quince/jimena/prexv/CMG_7901.webp', 'img/quince/jimena/prexv/CMG_7910.webp',
    'img/quince/jimena/prexv/CMG_7942.webp', 'img/quince/jimena/prexv/CMG_7956.webp', 'img/quince/jimena/prexv/CMG_7974.webp',
    'img/quince/jimena/prexv/CMG_7990.webp',
  ],
  'quince-jimena-fiesta': [
    'img/quince/jimena/fiesta/CMG_8056.webp', 'img/quince/jimena/fiesta/CMG_8061.webp', 'img/quince/jimena/fiesta/CMG_8188.webp',
    'img/quince/jimena/fiesta/CMG_8193.webp', 'img/quince/jimena/fiesta/CMG_8195.webp', 'img/quince/jimena/fiesta/CMG_8203.webp',
    'img/quince/jimena/fiesta/CMG_8209.webp', 'img/quince/jimena/fiesta/CMG_8220.webp', 'img/quince/jimena/fiesta/CMG_8230.webp',
    'img/quince/jimena/fiesta/CMG_8243.webp',
  ],
  'quince-kevin': [
    'img/quince/julieta/CMG_7295.webp', 'img/quince/julieta/CMG_7326.webp', 'img/quince/julieta/CMG_7342.webp',
    'img/quince/julieta/CMG_7344.webp', 'img/quince/julieta/CMG_7359.webp', 'img/quince/julieta/CMG_7371.webp',
    'img/quince/julieta/CMG_7378.webp', 'img/quince/julieta/CMG_7385.webp', 'img/quince/julieta/CMG_7409.webp',
    'img/quince/julieta/CMG_7417.webp',
  ],
  'bodas-jimmy': [
    'img/bodas/boda-jimmy/boda-jimmy-01.webp', 'img/bodas/boda-jimmy/boda-jimmy-02.webp', 'img/bodas/boda-jimmy/boda-jimmy-03.webp',
    'img/bodas/boda-jimmy/boda-jimmy-04.webp', 'img/bodas/boda-jimmy/boda-jimmy-05.webp', 'img/bodas/boda-jimmy/boda-jimmy-06.webp',
    'img/bodas/boda-jimmy/boda-jimmy-07.webp', 'img/bodas/boda-jimmy/boda-jimmy-08.webp', 'img/bodas/boda-jimmy/boda-jimmy-09.webp',
    'img/bodas/boda-jimmy/boda-jimmy-10.webp',
  ],
  'empresas-a3vte': [
    'img/empresas/a3vte/a3vte-01.webp', 'img/empresas/a3vte/a3vte-03.webp', 'img/empresas/a3vte/a3vte-04.webp',
    'img/empresas/a3vte/a3vte-05.webp', 'img/empresas/a3vte/a3vte-08.webp', 'img/empresas/a3vte/a3vte-10.webp',
    'img/empresas/a3vte/a3vte-12.webp', 'img/empresas/a3vte/a3vte-13.webp', 'img/empresas/a3vte/a3vte-15.webp',
    'img/empresas/a3vte/a3vte-16.webp',
  ],
  'contenido-yolo': [
    'img/contenido/yolo/yolo-01.webp', 'img/contenido/yolo/yolo-02.webp', 'img/contenido/yolo/yolo-03.webp',
    'img/contenido/yolo/yolo-04.webp', 'img/contenido/yolo/yolo-05.webp', 'img/contenido/yolo/yolo-06.webp',
    'img/contenido/yolo/yolo-07.webp', 'img/contenido/yolo/yolo-08.webp', 'img/contenido/yolo/yolo-09.webp',
  ],
};

let currentGallery = '';
let currentIndex = 0;

function openLightbox(gallery, index) {
  if (!galleries[gallery]) return;
  currentGallery = gallery;
  currentIndex = index;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  const images = galleries[currentGallery];
  if (!images) return;
  currentIndex = (currentIndex + direction + images.length) % images.length;
  updateLightbox();
}

function updateLightbox() {
  const images = galleries[currentGallery];
  if (!images) return;
  document.getElementById('lb-img').src = images[currentIndex];
  document.getElementById('lb-counter').textContent = `${currentIndex + 1} / ${images.length}`;
}

/** @param {string} categoryId */
function switchMainCategory(categoryId, buttonEl) {
  document.querySelectorAll('.cat-panel').forEach((p) => p.classList.remove('active'));
  document.querySelectorAll('.mtab').forEach((b) => b.classList.remove('active'));

  const categoryEl = document.getElementById(`cat-${categoryId}`);
  if (!categoryEl) return;
  categoryEl.classList.add('active');
  buttonEl.classList.add('active');

  // Reset sub-tabs within this category back to the first one.
  const subTabs = categoryEl.querySelectorAll('.stab');
  const panels = categoryEl.querySelectorAll('.event-panel');
  if (subTabs.length) {
    subTabs.forEach((b) => b.classList.remove('active'));
    subTabs[0].classList.add('active');
    panels.forEach((p, i) => p.classList.toggle('active', i === 0));
  }

  document.getElementById('mainTabs').scrollIntoView({ behavior: 'smooth', block: 'start' });
  triggerReveal();
}

/** @param {string} categoryId @param {string} subId */
function switchSubCategory(categoryId, subId, buttonEl) {
  const categoryEl = document.getElementById(`cat-${categoryId}`);
  if (!categoryEl) return;
  categoryEl.querySelectorAll('.stab').forEach((b) => b.classList.remove('active'));
  categoryEl.querySelectorAll('.event-panel').forEach((p) => p.classList.remove('active'));
  buttonEl.classList.add('active');

  const target = document.getElementById(`ev-${categoryId}-${subId}`);
  if (target) target.classList.add('active');
  triggerReveal();
}

function toggleMobileMenu() {
  document.getElementById('mobileMenu')?.classList.toggle('open');
}

function initDelegatedActions() {
  document.addEventListener('click', (event) => {
    const el = event.target.closest('[data-action]');

    // Clicking the lightbox backdrop (not its children) closes it.
    if (event.target.id === 'lightbox') {
      closeLightbox();
    }

    if (!el) return;
    const action = el.dataset.action;

    switch (action) {
      case 'open-lightbox':
        openLightbox(el.dataset.gallery, Number(el.dataset.index));
        break;
      case 'close-lightbox':
        closeLightbox();
        break;
      case 'lightbox-nav':
        navigateLightbox(Number(el.dataset.dir));
        break;
      case 'switch-main':
        switchMainCategory(el.dataset.target, el);
        break;
      case 'switch-sub':
        switchSubCategory(el.dataset.cat, el.dataset.sub, el);
        break;
      case 'toggle-menu':
        toggleMobileMenu();
        break;
      default:
        break;
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (event.key === 'ArrowRight') navigateLightbox(1);
    if (event.key === 'ArrowLeft') navigateLightbox(-1);
    if (event.key === 'Escape') closeLightbox();
  });

  // Several [data-action] triggers are <div role="button"> (thumbnails,
  // the hamburger icon) rather than real <button> elements, so Enter/Space
  // activation isn't free from the browser — wire it up explicitly.
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const el = event.target.closest('[data-action][role="button"]');
    if (!el) return;
    event.preventDefault();
    el.click();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initDelegatedActions();
  initReveal();
});
