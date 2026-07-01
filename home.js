/**
 * home.js — index.html
 *
 * Note on scope: the original inline script also contained a photo
 * lightbox (`openLB`/`closeLB`/`lbNav`, an `lbItems` placeholder array)
 * and CSS for a masonry gallery + an Instagram grid. None of it was
 * reachable from this page — the #galeria section here is just a CTA
 * button to portfolio.html, there's no Instagram section in the markup
 * at all, and nothing ever calls openLB(). It's been removed as dead
 * code per the refactor brief. The real, working photo gallery with
 * its own lightbox lives on portfolio.html (see pages/portfolio.js).
 */

import { initSiteChrome } from '../core/site-chrome.js';
import { initReveal } from '../core/reveal.js';
import { initStickyCta } from '../core/sticky-cta.js';
import { initCounters } from '../core/counters.js';
import { sanitizeInput, throttleBy, buildWhatsAppLink } from '../core/dom.js';

const WHATSAPP_NUMBER = '595986249592';
const TESTIMONIAL_COUNT = 3;
const TESTIMONIAL_AUTOPLAY_MS = 5000;

function initTestimonialSlider() {
  const track = document.getElementById('testiTrack');
  const dots = document.querySelectorAll('.testi-dot');
  if (!track) return;

  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  function slideBy(delta) {
    index = Math.max(0, Math.min(TESTIMONIAL_COUNT - 1, index + delta));
    update();
  }

  function goTo(i) {
    index = i;
    update();
  }

  document.querySelectorAll('[data-testi-prev]').forEach((btn) =>
    btn.addEventListener('click', () => slideBy(-1)));
  document.querySelectorAll('[data-testi-next]').forEach((btn) =>
    btn.addEventListener('click', () => slideBy(1)));
  dots.forEach((dot, i) =>
    dot.addEventListener('click', () => goTo(i)));

  setInterval(() => {
    index = (index + 1) % TESTIMONIAL_COUNT;
    update();
  }, TESTIMONIAL_AUTOPLAY_MS);
}

function initBudgetForm() {
  const submitBtn = document.querySelector('[data-submit-budget]');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', () => {
    const nombre = sanitizeInput(document.getElementById('f-nombre').value) || 'Sin nombre';
    const wa = sanitizeInput(document.getElementById('f-wa').value) || 'No indicado';
    const email = sanitizeInput(document.getElementById('f-email').value) || 'No indicado';
    const fecha = sanitizeInput(document.getElementById('f-fecha').value) || 'A confirmar';
    const ciudad = sanitizeInput(document.getElementById('f-ciudad').value) || 'No indicada';
    const tipo = sanitizeInput(document.getElementById('f-tipo').value) || 'No seleccionado';
    const mensaje = sanitizeInput(document.getElementById('f-msg').value) || '';

    if (!throttleBy('cmg_last', 30000)) {
      alert('Esperá 30 segundos antes de enviar otro mensaje.');
      return;
    }

    const text = [
      'Hola! 👋 Les escribo desde su web.',
      '',
      `*Nombre:* ${nombre}`,
      `*WhatsApp:* ${wa}`,
      `*Email:* ${email}`,
      `*Evento:* ${tipo}`,
      `*Fecha:* ${fecha}`,
      `*Ciudad:* ${ciudad}`,
      `*Mensaje:* ${mensaje}`,
    ].join('\n');

    document.getElementById('formSuccess').classList.add('show');
    document.querySelector('.form-grid').style.display = 'none';
    document.querySelector('.btn-submit').style.display = 'none';
    document.querySelector('.form-note').style.display = 'none';

    setTimeout(() => {
      window.open(buildWhatsAppLink(WHATSAPP_NUMBER, text), '_blank');
    }, 800);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSiteChrome('index.html');
  initReveal();
  initStickyCta();
  initCounters();
  initTestimonialSlider();
  initBudgetForm();
});
