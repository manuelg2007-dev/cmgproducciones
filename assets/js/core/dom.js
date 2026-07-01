/**
 * dom.js
 * Small, dependency-free DOM and string helpers shared across pages.
 */

/** @param {string} selector @param {ParentNode} [root] @returns {Element|null} */
export const qs = (selector, root = document) => root.querySelector(selector);

/** @param {string} selector @param {ParentNode} [root] @returns {Element[]} */
export const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

/**
 * Strips HTML tags and characters that could enable HTML/script injection
 * when a value is later interpolated into a URL (e.g. a WhatsApp deep
 * link). This is a defense-in-depth measure for values that leave the
 * page, not a substitute for output-encoding on the receiving end.
 * @param {string} value
 * @param {number} [maxLength]
 * @returns {string}
 */
export function sanitizeInput(value, maxLength = 500) {
  return String(value ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"'`]/g, '')
    .trim()
    .substring(0, maxLength);
}

/**
 * Simple client-side submit throttle to discourage accidental
 * double-submits and casual spam. Not a security control — a
 * determined actor can bypass localStorage — only a UX/spam-reduction
 * measure, same as the original implementation.
 * @param {string} storageKey
 * @param {number} cooldownMs
 * @returns {boolean} true if the action is allowed right now
 */
export function throttleBy(storageKey, cooldownMs = 30000) {
  const last = localStorage.getItem(storageKey);
  const now = Date.now();
  if (last && now - parseInt(last, 10) < cooldownMs) {
    return false;
  }
  localStorage.setItem(storageKey, String(now));
  return true;
}

/**
 * Builds a wa.me deep link with a URL-encoded, pre-filled message.
 * @param {string} phoneNumber E.164 digits, no punctuation (e.g. "595986249592")
 * @param {string} message
 * @returns {string}
 */
export function buildWhatsAppLink(phoneNumber, message) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
