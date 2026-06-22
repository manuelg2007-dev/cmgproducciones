// Shared components for CMG web
const WA_NUM = "595986249592";
const WA_BASE = `https://wa.me/${WA_NUM}`;

function navHTML(activePage) {
  const pages = [
    { href: 'index.html', label: 'Inicio' },
    { href: 'portfolio.html', label: 'Portfolio' },
    { href: 'servicios.html', label: 'Servicios' },
    { href: 'nosotros.html', label: 'Nosotros' },
    { href: 'testimonios.html', label: 'Testimonios' },
    { href: 'contacto.html', label: 'Contacto' },
  ];
  const links = pages.map(p =>
    `<li><a href="${p.href}" class="${p.href === activePage ? 'active' : ''}">${p.label}</a></li>`
  ).join('');
  const mobileLinks = pages.map(p =>
    `<a href="${p.href}" class="${p.href === activePage ? 'active' : ''}">${p.label}</a>`
  ).join('');
  return `
<nav id="navbar">
  <a href="index.html" class="nav-logo">C.M.G. Producciones</a>
  <ul class="nav-links">${links}</ul>
  <a href="${WA_BASE}?text=Hola%2C%20quiero%20reservar%20mi%20fecha%20%F0%9F%93%B8" target="_blank" class="nav-cta">Reservar Fecha</a>
  <button class="nav-toggle" onclick="toggleMobileMenu()" aria-label="Menú">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="mobile-menu" id="mobileMenu">${mobileLinks}</div>`;
}

function footerHTML() {
  return `
<footer>
  <div class="footer-inner">
    <div>
      <div class="footer-brand-name">C.M.G. Producciones</div>
      <p class="footer-brand-desc">Fotografía y producción audiovisual premium para eventos irrepetibles. Bodas, 15 años, eventos corporativos y marketing digital en Paraguay.</p>
      <div class="footer-social">
        <a href="https://www.instagram.com/c.m.g.producciones/" target="_blank" class="footer-soc-btn" title="Instagram">📷</a>
        <a href="https://www.facebook.com/C.M.G.PRODUCCIONES" target="_blank" class="footer-soc-btn" title="Facebook">📘</a>
        <a href="https://www.youtube.com/@C.M.G.PRODUCCIONES" target="_blank" class="footer-soc-btn" title="YouTube">▶️</a>
        <a href="https://wa.me/${WA_NUM}" target="_blank" class="footer-soc-btn" title="WhatsApp">💬</a>
        <a href="https://www.linkedin.com/in/manuelgonz%C3%A1lezesp%C3%ADnola/" target="_blank" class="footer-soc-btn" title="LinkedIn">💼</a>
      </div>
    </div>
    <div>
      <div class="footer-col-title">Páginas</div>
      <ul class="footer-links">
        <li><a href="index.html">Inicio</a></li>
        <li><a href="portfolio.html">Portfolio</a></li>
        <li><a href="servicios.html">Servicios</a></li>
        <li><a href="nosotros.html">Nosotros</a></li>
        <li><a href="testimonios.html">Testimonios</a></li>
        <li><a href="contacto.html">Contacto</a></li>
      </ul>
    </div>
    <div>
      <div class="footer-col-title">Contacto</div>
      <ul class="footer-links">
        <li><a href="https://wa.me/${WA_NUM}" target="_blank">+595 986 249 592</a></li>
        <li><a href="https://www.instagram.com/c.m.g.producciones/" target="_blank">@c.m.g.producciones</a></li>
        <li><a href="contacto.html">Formulario de contacto</a></li>
        <li><a href="contacto.html#faq">Preguntas frecuentes</a></li>
      </ul>
      <div style="margin-top:1.5rem;font-size:0.75rem;color:var(--gray);">📍 Paraguay · Todo el país</div>
      <div style="margin-top:0.3rem;font-size:0.75rem;color:var(--gray);">⏰ Lun–Sáb · 9:00 – 20:00</div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-copy">© 2025 C.M.G. Producciones. Todos los derechos reservados.</div>
    <div class="footer-country">Hecho con visión en Paraguay 🇵🇾</div>
  </div>
</footer>`;
}

function waFloat() {
  return `
<div class="wa-float">
  <div class="wa-tooltip">¡Reservá tu fecha! 📸</div>
  <a href="${WA_BASE}?text=Hola%2C%20vi%20su%20portfolio%20y%20quiero%20consultar%20%F0%9F%93%B8" target="_blank" class="wa-btn" aria-label="WhatsApp">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
</div>`;
}

function sharedScripts() {
  return `
<script>
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});
function toggleMobileMenu(){
  document.getElementById('mobileMenu').classList.toggle('open');
}
const fus = document.querySelectorAll('.fu');
const obs = new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{ if(e.isIntersecting) setTimeout(()=>e.target.classList.add('vis'), i*80); });
},{threshold:0.08});
fus.forEach(el=>obs.observe(el));
<\/script>`;
}
