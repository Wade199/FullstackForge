/* ============================================================
   CONTACT FORM — soumission AJAX vers Netlify Forms.
   Ne fonctionne qu'une fois déployé sur Netlify (le formulaire est
   détecté au build). En local (serveur statique), l'envoi échoue
   normalement et affiche le message d'erreur réseau.
   ============================================================ */
import { getCurrentLang, getTranslations } from './i18n.js';

function encodeFormData(data) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

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

    const btn = form.querySelector('.form-submit');
    btn.disabled = true;
    btn.textContent = '⏳ Envoi...';

    // Capturer la langue actuelle pour l'utiliser dans les callbacks (évite le bug si langue change pendant l'envoi)
    const langAtSubmit = getCurrentLang();
    const payload = Object.fromEntries(new FormData(form).entries());

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        status.textContent = getTranslations(langAtSubmit)['form-success'];
        status.className = 'form-status success';
        form.reset();
      })
      .catch(() => {
        status.textContent = getTranslations(langAtSubmit)['form-error-network'];
        status.className = 'form-status error';
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = getTranslations(getCurrentLang())['form-send'];
        setTimeout(() => {
          status.textContent = '';
          status.className = 'form-status';
        }, 5000);
      });
  });
}
