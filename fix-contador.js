/* ════════════════════════════════════════════════════════
   FIX: Contador animado "+0" → números reales
   Pegar este script antes de </body> en index.html
   O agregar al final de tu components.js / script.js existente
   ════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  // Busca todos los elementos que muestran números animados
  // Ajusta el selector si tus números usan otra clase
  function animateCounters() {
    const counters = document.querySelectorAll('[data-counter], .stat-num, .counter-num');

    counters.forEach(function (el) {
      // Si ya está marcado como animado, no repetir
      if (el.dataset.animated === 'true') return;

      // Extrae el número objetivo desde el texto o atributo data-target
      const rawText = el.getAttribute('data-target') || el.textContent;
      const target = parseInt(rawText.replace(/[^\d]/g, ''), 10);
      if (isNaN(target) || target === 0) return;

      const prefix = rawText.includes('+') ? '+' : '';
      const suffix = rawText.includes('%') ? '%' : '';

      const duration = 1600; // ms
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        // easeOutQuad para que desacelere al final
        const eased = 1 - Math.pow(1 - progress, 2);
        const current = Math.floor(eased * target);
        el.textContent = prefix + current + suffix;

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = prefix + target + suffix;
          el.dataset.animated = 'true';
        }
      }
      requestAnimationFrame(tick);
    });
  }

  // Dispara la animación cuando el bloque de estadísticas entra en pantalla
  const statsSections = document.querySelectorAll(
    '.hero-stats, .stats-section, [data-stats], .resultados'
  );

  if (statsSections.length === 0) {
    // Si no encuentra contenedor específico, anima apenas carga la página
    animateCounters();
  } else {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    statsSections.forEach(function (section) { observer.observe(section); });
  }
});
