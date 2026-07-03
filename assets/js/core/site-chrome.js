/**
 * site-chrome.js
 * Renders the shared nav / footer / WhatsApp float button into their
 * placeholder elements and wires up their interactive behavior.
 *
 * This replaces components.js. Functionally equivalent output (same
 * markup, same class names, same CSS in site-chrome.css) with two
 * intentional improvements:
 *   1. Event handlers are attached via addEventListener instead of
 *      inline `onclick="..."` attributes, so the CSP no longer needs
 *      `script-src 'unsafe-inline'` for this to work.
 *   2. It's an ES module — no globals are created just by loading it.
 */

const WHATSAPP_NUMBER = '595986249592';
const WHATSAPP_DEFAULT_MESSAGE = 'Hola! Vi su web y me gustaría consultar.';

const NAV_PAGES = [
  { href: 'index.html', label: 'Inicio' },
  { href: 'servicios.html', label: 'Servicios' },
  { href: 'portfolio.html', label: 'Portfolio' },
  { href: 'nosotros.html', label: 'Nosotros' },
  { href: 'testimonios.html', label: 'Testimonios' },
];

/** @param {string} currentPage @returns {string} */
function navLinksHTML(currentPage) {
  return NAV_PAGES.map(({ href, label }) => {
    const active = href === currentPage ? ' class="active"' : '';
    return `<a href="${href}"${active}>${label}</a>`;
  }).join('\n    ');
}

/** @param {string} currentPage @returns {string} */
function navHTML(currentPage) {
  const links = navLinksHTML(currentPage);
  return `
<nav class="cmg-nav" id="cmgNav">
  <a href="index.html" class="cmg-nav-logo">C.M.G. Producciones</a>
  <div class="cmg-nav-links">
    ${links}
    <a href="contacto.html" class="cmg-nav-cta">Reservar fecha</a>
  </div>
  <button class="cmg-hamburger" id="cmgHamburger" aria-label="Abrir menú" aria-expanded="false" aria-controls="cmgMobileMenu">
    <span></span><span></span><span></span>
  </button>
</nav>

<div class="cmg-mobile-menu" id="cmgMobileMenu">
  <button class="cmg-mobile-close" id="cmgMobileClose" aria-label="Cerrar menú">✕</button>
  ${links}
  <a href="contacto.html" style="color:#C8A35F;">Reservar fecha</a>
</div>`;
}

/** @returns {string} */
function footerHTML() {
  const year = new Date().getFullYear();
  return `
<footer class="cmg-footer">
  <div class="cmg-footer-logo">C.M.G. Producciones</div>
  <div class="cmg-footer-copy">© ${year} · Paraguay · Todos los derechos reservados</div>
  <div class="cmg-footer-socials">
    <a href="https://www.instagram.com/c.m.g.producciones/" target="_blank" rel="noopener">Instagram</a>
    <a href="https://www.youtube.com/@C.M.G.PRODUCCIONES" target="_blank" rel="noopener">YouTube</a>
    <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener">WhatsApp</a>
  </div>
</footer>`;
}

/** @returns {string} */
function waFloatHTML() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;
  return `
<a href="${href}" class="cmg-wa" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>`;
}

/** Toggles the mobile nav menu open/closed and updates aria-expanded. */
function toggleMobileMenu() {
  const menu = document.getElementById('cmgMobileMenu');
  const btn = document.getElementById('cmgHamburger');
  if (!menu) return;
  const isOpen = menu.classList.toggle('open');
  if (btn) {
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  }
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileMenu() {
  const menu = document.getElementById('cmgMobileMenu');
  const btn = document.getElementById('cmgHamburger');
  if (!menu || !menu.classList.contains('open')) return;
  menu.classList.remove('open');
  if (btn) {
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';
}

/** Adds/removes `.scrolled` on the nav past a small scroll threshold. */
function initNavScroll() {
  const nav = document.getElementById('cmgNav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * Injects the shared nav/footer/WhatsApp button into their placeholder
 * elements (if present on the page) and wires up all interactivity.
 * Safe to call on any page — sections with no matching placeholder are
 * simply skipped.
 * @param {string} currentPage e.g. "index.html"
 */
export function initSiteChrome(currentPage) {
  const navEl = document.getElementById('nav-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  const waEl = document.getElementById('wa-placeholder');

  try {
    if (navEl) navEl.outerHTML = navHTML(currentPage);
  } catch (err) {
    console.error('CMG nav render error:', err);
  }

  try {
    if (footerEl) footerEl.outerHTML = footerHTML();
  } catch (err) {
    console.error('CMG footer render error:', err);
  }

  try {
    if (waEl) waEl.outerHTML = waFloatHTML();
  } catch (err) {
    console.error('CMG WhatsApp button render error:', err);
  }

  try {
    document.getElementById('cmgHamburger')?.addEventListener('click', toggleMobileMenu);
    document.getElementById('cmgMobileClose')?.addEventListener('click', closeMobileMenu);
  } catch (err) {
    console.error('CMG mobile menu wiring error:', err);
  }

  try {
    initNavScroll();
  } catch (err) {
    console.error('CMG nav scroll error:', err);
  }
}
