/**
 * sticky-cta.js
 * Toggles visibility of a floating "sticky" call-to-action bar once the
 * user has scrolled past a threshold.
 *
 * The original codebase had two versions of this (components.js used a
 * 400px threshold and a `.sticky-cta, .cta-float` selector; index.html's
 * inline script redefined the same global function name with a 600px
 * threshold and `#stickyCta`). Because both were plain global function
 * declarations loaded in the same document, the one parsed last silently
 * won — which in practice was always index.html's 600px version. This
 * module preserves that actual runtime behavior as the single source
 * of truth.
 */

/**
 * @param {Object} [options]
 * @param {string} [options.selector="#stickyCta"]
 * @param {number} [options.showAfterPx=600]
 */
export function initStickyCta({ selector = '#stickyCta', showAfterPx = 600 } = {}) {
  const cta = document.querySelector(selector);
  if (!cta) return;
  window.addEventListener('scroll', () => {
    cta.classList.toggle('visible', window.scrollY > showAfterPx);
  }, { passive: true });
}
