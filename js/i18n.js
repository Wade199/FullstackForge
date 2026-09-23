/* ============================================================
   LANGUAGE SYSTEM — translations loaded from ./i18n/*.json,
   typing effect, and DOM text updates.
   ============================================================ */
import { renderProjects } from './projects.js';
import { initProjectDetail } from './project-detail.js';
import { initDocsList } from './docs.js';

const SUPPORTED_LANGS = ['fr', 'en', 'es'];

let translations = {};
let currentLang = localStorage.getItem('lang') || 'fr';
let typingTimeout = null;

async function loadTranslations() {
  const entries = await Promise.all(SUPPORTED_LANGS.map(async (lang) => {
    const res = await fetch(`./i18n/${lang}.json`);
    if (!res.ok) throw new Error(`Impossible de charger i18n/${lang}.json`);
    return [lang, await res.json()];
  }));
  translations = Object.fromEntries(entries);
}

export function getTranslations(lang) {
  return translations[lang] || translations.fr || {};
}

export function getCurrentLang() {
  return currentLang;
}

function startTyping(lang) {
  const el = document.getElementById('typing-text');
  if (!el) return;
  // Annuler le timeout précédent proprement
  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }

  const strings = getTranslations(lang).typing || [];
  if (strings.length === 0) return;
  let strIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = strings[strIndex];
    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        typingTimeout = setTimeout(tick, 2000);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        strIndex = (strIndex + 1) % strings.length;
      }
    }
    typingTimeout = setTimeout(tick, deleting ? 50 : 90);
  }
  tick();
}

export function changeLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);

  // Mettre à jour l'attribut lang du document HTML pour l'accessibilité
  document.documentElement.lang = lang;

  // Update all data-translate elements
  const t = translations[lang];
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    const val = t[key];
    if (val !== undefined) el.textContent = val;
  });

  // Update lang indicator
  const indicator = document.getElementById('lang-current');
  if (indicator) indicator.textContent = lang.toUpperCase();

  // Marquer l'option active par data-lang (fiable avec les emojis)
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  // Close dropdown
  const dd = document.getElementById('lang-dropdown');
  const btn = document.getElementById('lang-btn');
  if (dd) dd.classList.remove('open');
  if (btn) btn.classList.remove('open');

  // Re-render le contenu localisé des projets sur les pages concernées
  // (no-op automatique sur les pages où les éléments ciblés n'existent pas)
  renderProjects(t, lang);
  initProjectDetail(lang);
  initDocsList(lang, t);

  // Restart typing with new language
  startTyping(lang);
}

export async function initI18n() {
  await loadTranslations();
  changeLanguage(currentLang);
}
