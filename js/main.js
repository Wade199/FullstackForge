/* ============================================================
   IBRAHIMA WADE — PORTFOLIO  |  main.js (entry point)
   ============================================================ */
import { initParticles } from './particles.js';
import { initNavbar, initSmoothScroll } from './nav.js';
import { initI18n } from './i18n.js';
import { initReveal } from './reveal.js';
import { initContactForm } from './contact.js';
import { loadProjects } from './projects.js';
import { initVeille } from './veille.js';

document.addEventListener('DOMContentLoaded', async () => {
  initParticles();
  initNavbar();
  initSmoothScroll();
  initContactForm();

  // Charge les données projets avant la langue : changeLanguage() (dans initI18n)
  // appelle renderProjects()/initProjectDetail()/initDocsList(), qui ont besoin
  // des données déjà en mémoire.
  await loadProjects();

  // Applique la langue sauvegardée — initialise aussi projects/project-detail/docs
  // (via changeLanguage) et le typing, et refait le même rendu à chaque
  // changement de langue ultérieur (dropdown FR/EN/ES)
  await initI18n();

  // La veille n'est pas localisée (contenu généré en français par la routine
  // cloud), pas besoin de la relier au changement de langue
  await initVeille();

  // Initialise les animations de révélation au scroll
  initReveal();
});

// Enregistrement du service worker (PWA) — après le chargement pour ne pas
// retarder l'affichage initial de la page
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Pas grave si ça échoue (ex: navigateur sans support) — le site
      // fonctionne normalement sans le service worker
    });
  });
}
