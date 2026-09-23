/* ============================================================
   IBRAHIMA WADE — PORTFOLIO  |  main.js (entry point)
   ============================================================ */
import { initParticles } from './particles.js';
import { initNavbar, initSmoothScroll } from './nav.js';
import { initI18n } from './i18n.js';
import { initReveal } from './reveal.js';
import { initContactForm } from './contact.js';
import { loadProjects } from './projects.js';
import { initProjectDetail } from './project-detail.js';
import { initDocsList } from './docs.js';

document.addEventListener('DOMContentLoaded', async () => {
  initParticles();
  initNavbar();
  initSmoothScroll();
  initContactForm();

  // Charge les données projets avant la langue : changeLanguage() (dans initI18n)
  // appelle renderProjects(), qui a besoin des données déjà en mémoire.
  await loadProjects();

  // Applique la langue sauvegardée (initialise aussi les projects et le typing)
  await initI18n();

  // Remplit la page projet individuelle / la liste docs si on y est (no-op sinon)
  initProjectDetail();
  initDocsList();

  // Initialise les animations de révélation au scroll
  initReveal();
});
