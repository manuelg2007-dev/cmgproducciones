/**
 * contacto.js — contacto.html
 */

import { initSiteChrome } from '../core/site-chrome.js';
import { sanitizeInput, throttleBy, buildWhatsAppLink } from '../core/dom.js';

const WHATSAPP_NUMBER = '595986249592';

function initContactForm() {
  const submitBtn = document.querySelector('[data-submit-contact]');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', () => {
    const nombre = sanitizeInput(document.getElementById('f-nombre').value) || 'Sin nombre';
    const tel = sanitizeInput(document.getElementById('f-tel').value) || 'No indicado';
    const servicio = sanitizeInput(document.getElementById('f-servicio').value) || 'No seleccionado';
    const fecha = sanitizeInput(document.getElementById('f-fecha').value) || 'A confirmar';
    const ciudad = sanitizeInput(document.getElementById('f-ciudad').value) || 'No indicada';
    const detalle = sanitizeInput(document.getElementById('f-detalle').value) || '';

    if (!throttleBy('cmg_last_submit', 30000)) {
      alert('Por favor esperá 30 segundos antes de enviar otro mensaje.');
      return;
    }

    const text = [
      'Hola! Les escribo desde su web 👋',
      '',
      `*Nombre:* ${nombre}`,
      `*Tel:* ${tel}`,
      `*Servicio:* ${servicio}`,
      `*Fecha:* ${fecha}`,
      `*Ciudad:* ${ciudad}`,
      `*Detalle:* ${detalle}`,
    ].join('\n');

    window.open(buildWhatsAppLink(WHATSAPP_NUMBER, text), '_blank');
  });
}

function initFaqAccordion() {
  document.querySelectorAll('[data-faq-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSiteChrome('contacto.html');
  initContactForm();
  initFaqAccordion();
});
