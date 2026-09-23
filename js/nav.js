/* ============================================================
   NAVBAR — hide on scroll down, show on scroll up, mobile menu,
   language dropdown, smooth scroll for anchor links.
   ============================================================ */
import { changeLanguage } from './i18n.js';

export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.getElementById('lang-dropdown');

  let lastScrollY = 0;

  // Marque comme actif le lien de nav dont le href correspond exactement à la page
  // courante (ex: "projects.html", "docs.html") — indépendant du scroll-spy ci-dessous,
  // qui ne s'applique qu'aux hrefs avec ancre ("index.html#about").
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const pageLink = [...navLinks.querySelectorAll('a[href]')]
    .find(a => a.getAttribute('href') === currentPage);
  if (pageLink) pageLink.classList.add('active');

  // Scroll behaviour
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 100) {
      navbar.classList.add('hidden');
    } else {
      navbar.classList.remove('hidden');
    }
    navbar.classList.toggle('scrolled', currentY > 50);
    lastScrollY = currentY;

    // Active nav link (scroll-spy) — les hrefs sont de la forme "index.html#about",
    // on compare sur la partie après le "#" pour retrouver le lien de chaque section.
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      const bottom = top + sec.offsetHeight;
      const link = [...navLinks.querySelectorAll('a[href]')]
        .find(a => a.getAttribute('href').split('#')[1] === sec.id);
      if (link) link.classList.toggle('active', currentY >= top && currentY < bottom);
    });
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Language dropdown
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = langDropdown.classList.toggle('open');
    langBtn.classList.toggle('open', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
      langDropdown.classList.remove('open');
      langBtn.classList.remove('open');
    }
  });

  // Utiliser dataset.lang au lieu de lire le textContent (plus robuste avec les emojis)
  langDropdown.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', () => {
      changeLanguage(option.dataset.lang);
    });
  });
}

export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
