/* ═══════════════════════════════════════════════════════════════
   C.M.G. PRODUCCIONES — components.js
   Nav, Footer, WhatsApp y scripts compartidos
   Sin dependencias externas. Funciona standalone.
   ═══════════════════════════════════════════════════════════════ */

/* ── CSS COMPARTIDO (se inyecta una sola vez) ─────────────────── */
function injectSharedStyles() {
  if (document.getElementById('cmg-shared-styles')) return;
  const style = document.createElement('style');
  style.id = 'cmg-shared-styles';
  style.textContent = `
    /* NAV */
    .cmg-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      display: flex; align-items: center; justify-content: space-between;
      padding: 22px 6vw;
      transition: background 0.35s ease, padding 0.35s ease, border-color 0.35s ease;
      border-bottom: 1px solid transparent;
    }
    .cmg-nav.scrolled {
      background: rgba(8, 8, 8, 0.97);
      padding: 14px 6vw;
      border-bottom-color: rgba(200,169,126,0.1);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
    .cmg-nav-logo {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1rem; font-weight: 400;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: #FDFAF5; text-decoration: none;
      transition: opacity 0.2s;
    }
    .cmg-nav-logo:hover { opacity: 0.75; }
    .cmg-nav-links {
      display: flex; align-items: center; gap: 2.25rem;
    }
    .cmg-nav-links a {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.65rem; font-weight: 400;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: rgba(255,255,255,0.45);
      text-decoration: none; transition: color 0.25s;
      position: relative;
    }
    .cmg-nav-links a::after {
      content: ''; position: absolute; bottom: -3px; left: 0; right: 0;
      height: 1px; background: #C8A35F;
      transform: scaleX(0); transition: transform 0.25s;
    }
    .cmg-nav-links a:hover,
    .cmg-nav-links a.active { color: #FDFAF5; }
    .cmg-nav-links a:hover::after,
    .cmg-nav-links a.active::after { transform: scaleX(1); }
    .cmg-nav-cta {
      font-family: 'Inter', system-ui, sans-serif !important;
      font-size: 0.65rem !important; font-weight: 500 !important;
      letter-spacing: 0.14em !important; text-transform: uppercase !important;
      color: rgba(8,8,8,0.9) !important;
      background: #C8A35F !important;
      padding: 9px 22px !important;
      text-decoration: none !important;
      border-radius: 1px;
      transition: background 0.25s !important;
    }
    .cmg-nav-cta::after { display: none !important; }
    .cmg-nav-cta:hover { background: #DFB95A !important; color: #000 !important; }
    .cmg-hamburger {
      display: none; flex-direction: column; gap: 5px;
      cursor: pointer; background: none; border: none; padding: 6px;
    }
    .cmg-hamburger span {
      width: 22px; height: 1px;
      background: rgba(255,255,255,0.75); display: block;
      transition: transform 0.3s, opacity 0.3s;
    }
    .cmg-hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
    .cmg-hamburger.open span:nth-child(2) { opacity: 0; }
    .cmg-hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

    /* MOBILE MENU */
    .cmg-mobile-menu {
      display: none;
      position: fixed; inset: 0; z-index: 999;
      background: rgba(6,6,6,0.98);
      flex-direction: column; align-items: center; justify-content: center;
      gap: 2.5rem;
    }
    .cmg-mobile-menu.open { display: flex; }
    .cmg-mobile-menu a {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(1.6rem, 5vw, 2.2rem); font-weight: 300;
      letter-spacing: 0.06em; color: rgba(255,255,255,0.6);
      text-decoration: none; transition: color 0.2s;
    }
    .cmg-mobile-menu a:hover,
    .cmg-mobile-menu a.active { color: #C8A35F; }
    .cmg-mobile-close {
      position: absolute; top: 1.5rem; right: 6vw;
      background: none; border: none; cursor: pointer;
      font-size: 1.4rem; color: rgba(255,255,255,0.4);
      transition: color 0.2s;
    }
    .cmg-mobile-close:hover { color: #C8A35F; }

    @media (max-width: 860px) {
      .cmg-nav-links { display: none; }
      .cmg-hamburger { display: flex; }
    }

    /* FOOTER */
    .cmg-footer {
      background: #050505;
      border-top: 1px solid rgba(200,169,126,0.08);
      padding: 2.5rem 6vw;
      display: flex; align-items: center;
      justify-content: space-between; flex-wrap: wrap; gap: 1.25rem;
    }
    .cmg-footer-logo {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1rem; letter-spacing: 0.1em;
      color: rgba(200,169,126,0.45);
    }
    .cmg-footer-copy {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.62rem; color: rgba(255,255,255,0.18);
      letter-spacing: 0.05em;
    }
    .cmg-footer-socials { display: flex; gap: 1.5rem; }
    .cmg-footer-socials a {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase;
      color: rgba(255,255,255,0.25); text-decoration: none; transition: color 0.25s;
    }
    .cmg-footer-socials a:hover { color: #C8A35F; }

    /* WHATSAPP FLOAT */
    .cmg-wa {
      position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 500;
      width: 54px; height: 54px; border-radius: 50%;
      background: #25D366;
      display: flex; align-items: center; justify-content: center;
      text-decoration: none;
      box-shadow: 0 4px 18px rgba(37,211,102,0.35);
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .cmg-wa:hover { transform: scale(1.1); box-shadow: 0 6px 26px rgba(37,211,102,0.5); }
    .cmg-wa svg { width: 27px; height: 27px; fill: white; }
  `;
  document.head.appendChild(style);
}

/* ── NAV HTML ─────────────────────────────────────────────────── */
function navHTML(currentPage) {
  injectSharedStyles();

  const pages = [
    { href: 'index.html',       label: 'Inicio'      },
    { href: 'portfolio.html',   label: 'Portfolio'   },
    { href: 'servicios.html',   label: 'Servicios'   },
    { href: 'nosotros.html',    label: 'Nosotros'    },
    { href: 'testimonios.html', label: 'Testimonios' },
  ];

  const links = pages.map(p => {
    const active = p.href === currentPage ? ' class="active"' : '';
    return `<a href="${p.href}"${active}>${p.label}</a>`;
  }).join('\n    ');

  const mobileLinks = pages.map(p => {
    const active = p.href === currentPage ? ' class="active"' : '';
    return `<a href="${p.href}"${active}>${p.label}</a>`;
  }).join('\n    ');

  return `
<nav class="cmg-nav" id="cmgNav">
  <a href="index.html" class="cmg-nav-logo">C.M.G. Producciones</a>
  <div class="cmg-nav-links">
    ${links}
    <a href="contacto.html" class="cmg-nav-cta">Reservar fecha</a>
  </div>
  <button class="cmg-hamburger" id="cmgHamburger" aria-label="Menú" onclick="cmgToggleMenu()">
    <span></span><span></span><span></span>
  </button>
</nav>

<div class="cmg-mobile-menu" id="cmgMobileMenu">
  <button class="cmg-mobile-close" onclick="cmgToggleMenu()" aria-label="Cerrar">✕</button>
  ${mobileLinks}
  <a href="contacto.html" style="color:#C8A35F;">Reservar fecha</a>
</div>`;
}

/* ── FOOTER HTML ──────────────────────────────────────────────── */
function footerHTML() {
  const year = new Date().getFullYear();
  return `
<footer class="cmg-footer">
  <div class="cmg-footer-logo">C.M.G. Producciones</div>
  <div class="cmg-footer-copy">© ${year} · Paraguay · Todos los derechos reservados</div>
  <div class="cmg-footer-socials">
    <a href="https://www.instagram.com/c.m.g.producciones/" target="_blank" rel="noopener">Instagram</a>
    <a href="https://www.youtube.com/@C.M.G.PRODUCCIONES"   target="_blank" rel="noopener">YouTube</a>
    <a href="https://wa.me/595986249592"                    target="_blank" rel="noopener">WhatsApp</a>
  </div>
</footer>`;
}

/* ── WHATSAPP FLOAT ───────────────────────────────────────────── */
function waFloat() {
  return `
<a href="https://wa.me/595986249592?text=Hola!%20Vi%20su%20web%20y%20me%20gustar%C3%ADa%20consultar."
   class="cmg-wa" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>`;
}

/* ── SCRIPTS COMPARTIDOS ──────────────────────────────────────── */
function sharedScripts() {
  return ''; // los scripts van inline para evitar dependencia de orden
}

/* ── TOGGLE MENU MOBILE (global) ──────────────────────────────── */
function cmgToggleMenu() {
  const menu  = document.getElementById('cmgMobileMenu');
  const btn   = document.getElementById('cmgHamburger');
  if (!menu) return;
  menu.classList.toggle('open');
  if (btn) btn.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

/* ── NAV SCROLL (se llama desde cada página) ──────────────────── */
function initNavScroll() {
  const nav = document.getElementById('cmgNav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // estado inicial
}

/* ── REVEAL ON SCROLL ─────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
}

/* ── STICKY CTA ───────────────────────────────────────────────── */
function initStickyCta() {
  const cta = document.querySelector('.sticky-cta, .cta-float');
  if (!cta) return;
  window.addEventListener('scroll', () => {
    cta.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

/* ── CONTADORES ANIMADOS ──────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.counter, [data-counter]');
  if (!counters.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.dataset.animated) return;
      el.dataset.animated = 'true';
      obs.unobserve(el);

      // Leer el valor objetivo del texto o del atributo
      const raw    = el.getAttribute('data-target') || el.textContent || '';
      const target = parseInt(raw.replace(/\D/g, ''), 10);
      if (!target) return;

      const prefix   = raw.includes('+') ? '+' : '';
      const suffix   = raw.includes('%') ? '%' : '';
      const duration = 1800;
      const start    = performance.now();

      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        el.textContent = prefix + Math.floor(eased * target) + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + target + suffix;
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });

  counters.forEach(el => {
    // Guardar valor original antes de pisarlo
    if (!el.dataset.target) {
      el.dataset.target = el.textContent.trim();
    }
    obs.observe(el);
  });
}

/* ── INIT AUTOMÁTICO AL CARGAR ────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Si la página usa placeholders, rellenarlos
  const navEl     = document.getElementById('nav-placeholder');
  const footerEl  = document.getElementById('footer-placeholder');
  const waEl      = document.getElementById('wa-placeholder');

  // Detectar página actual automáticamente
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  try {
    if (navEl)    navEl.outerHTML    = navHTML(currentPage);
  } catch(e) { console.error('CMG nav error:', e); }

  try {
    if (footerEl) footerEl.outerHTML = footerHTML();
  } catch(e) { console.error('CMG footer error:', e); }

  try {
    if (waEl)     waEl.outerHTML     = waFloat();
  } catch(e) { console.error('CMG wa error:', e); }

  // Scripts siempre corren aunque fallen los placeholders
  try { initNavScroll(); } catch(e) { console.error('CMG navScroll:', e); }
  try { initReveal();    } catch(e) { console.error('CMG reveal:', e);    }
  try { initStickyCta(); } catch(e) { console.error('CMG stickyCta:', e); }
  try { initCounters();  } catch(e) { console.error('CMG counters:', e);  }
});
