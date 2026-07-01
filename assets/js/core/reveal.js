/**
 * reveal.js
 * Fades/slides elements with class `.reveal` into view as they enter the
 * viewport. Canonical replacement for the ~6 near-identical copies of
 * this logic that used to live inline in every page.
 */

/**
 * @param {Object} [options]
 * @param {string} [options.selector=".reveal"]
 * @param {number} [options.threshold=0.08]
 * @returns {IntersectionObserver|null}
 */
export function initReveal({ selector = '.reveal', threshold = 0.08 } = {}) {
  const els = document.querySelectorAll(selector);
  if (!els.length) return null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold });

  els.forEach((el) => observer.observe(el));
  return observer;
}

/**
 * Immediately reveals any `.reveal` element already inside the viewport.
 * Used by portfolio.html after switching gallery tabs, since newly
 * shown thumbnails may already be on-screen and won't get a fresh
 * "intersection" event.
 * @param {string} [selector=".reveal:not(.visible)"]
 */
export function triggerReveal(selector = '.reveal:not(.visible)') {
  setTimeout(() => {
    document.querySelectorAll(selector).forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 60) {
        el.classList.add('visible');
      }
    });
  }, 50);
}
