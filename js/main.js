/* ============================================================
   IBRAHIMA WADE — PORTFOLIO  |  main.js (entry point)
   ============================================================ */
import { initParticles } from './particles.js';
import { initNavbar, initSmoothScroll } from './nav.js';
import { initI18n } from './i18n.js';
import { initReveal } from './reveal.js';
import { initContactForm } from './contact.js';

document.addEventListener('DOMContentLoaded', async () => {
  initParticles();
  initNavbar();
  initSmoothScroll();
  initContactForm();

  // Applique la langue sauvegardée (initialise aussi les projects et le typing)
  await initI18n();

  // Initialise les animations de révélation au scroll
  initReveal();
});
