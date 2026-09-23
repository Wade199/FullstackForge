/* ============================================================
   CONTACT FORM
   ============================================================ */
import { getCurrentLang, getTranslations } from './i18n.js';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.querySelector('#form-name').value.trim();
    const email   = form.querySelector('#form-email').value.trim();
    const message = form.querySelector('#form-message').value.trim();
    const t = getTranslations(getCurrentLang());

    // Vérification champs vides
    if (!name || !email || !message) {
      status.textContent = t['form-error'];
      status.className = 'form-status error';
      return;
    }

    // Validation du format email côté JS
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      status.textContent = t['form-error-email'];
      status.className = 'form-status error';
      return;
    }

    // Simuler l'envoi (remplacé par Netlify Forms en Phase 4)
    const btn = form.querySelector('.form-submit');
    btn.disabled = true;
    btn.textContent = '⏳ Envoi...';

    // Capturer la langue actuelle pour l'utiliser dans le callback (évite le bug si langue change pendant le timeout)
    const langAtSubmit = getCurrentLang();

    setTimeout(() => {
      const tCallback = getTranslations(langAtSubmit);
      status.textContent = tCallback['form-success'];
      status.className = 'form-status success';
      form.reset();
      btn.disabled = false;
      btn.textContent = getTranslations(getCurrentLang())['form-send'];
      setTimeout(() => {
        status.textContent = '';
        status.className = 'form-status';
      }, 5000);
    }, 1200);
  });
}
