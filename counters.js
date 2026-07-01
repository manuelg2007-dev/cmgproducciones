/**
 * counters.js
 * Animates elements with class `.counter` or a `data-counter` attribute
 * from 0 up to their target value when they scroll into view.
 *
 * NOTE: at the time of this refactor, no page markup actually contains
 * a `.counter` element (the "en números" sections use static `.num-n` /
 * `.stat-n` text instead), so this is currently a documented no-op. It
 * is kept — rather than deleted — because two independent, divergent
 * copies of it already existed in the original codebase (components.js
 * and an inline copy in index.html), which signals it's expected
 * infrastructure. This is the single canonical implementation; wire a
 * `.counter` class onto any element to activate it.
 */

/**
 * @param {Object} [options]
 * @param {string} [options.selector=".counter, [data-counter]"]
 * @param {number} [options.threshold=0.4]
 * @param {number} [options.durationMs=1800]
 */
export function initCounters({
  selector = '.counter, [data-counter]',
  threshold = 0.4,
  durationMs = 1800,
} = {}) {
  const counters = document.querySelectorAll(selector);
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.dataset.animated) return;
      el.dataset.animated = 'true';
      observer.unobserve(el);
      animateCounter(el, durationMs);
    });
  }, { threshold });

  counters.forEach((el) => {
    if (!el.dataset.target) {
      el.dataset.target = el.textContent.trim();
    }
    observer.observe(el);
  });
}

/**
 * @param {HTMLElement} el
 * @param {number} durationMs
 */
function animateCounter(el, durationMs) {
  const raw = el.getAttribute('data-target') || el.textContent || '';
  const target = parseInt(raw.replace(/\D/g, ''), 10);
  if (!target) return;

  const prefix = raw.includes('+') ? '+' : '';
  const suffix = raw.includes('%') ? '%' : '';
  const start = performance.now();

  function tick(now) {
    const t = Math.min((now - start) / durationMs, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    el.textContent = prefix + Math.floor(eased * target) + suffix;
    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = prefix + target + suffix;
    }
  }
  requestAnimationFrame(tick);
}
