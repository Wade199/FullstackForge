/* ============================================================
   IBRAHIMA WADE — PORTFOLIO  |  script.js
   ============================================================ */

/* ============================================================
   PROJECTS DATA
   ============================================================
   To add a new project, simply add a new object to this array.
   Each object supports:
     - title:       Project name (string)
     - description: Short description (string)
     - image:       Path to image (string)
     - tech:        Array of technology strings
     - github:      GitHub URL (string)
     - demo:        Live demo URL (string)
   ============================================================ */
const PROJECTS = [
  {
    title: "BeerMakers",
    description: "Application web de gestion brassicole permettant de gérer les recettes, les stocks et les processus de brassage.",
    image: "./assets/image11.png",
    tech: ["PHP", "HTML", "CSS", "Bootstrap"],
    github: "https://github.com/Wade199/beermakers",
    demo: "https://github.com/Wade199/beermakerss"
  },
  {
    title: "FullstackForge",
    description: "Portfolio personnel moderne développé avec HTML, CSS et JavaScript. Design glassmorphism avec thème sombre et effets néon.",
    image: "./assets/image222.png",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Wade199/FullstackForge",
    demo: "https://wade199.github.io/FullstackForge/"
  },
  {
    title: "Jeux de Dame",
    description: "Jeu de dames interactif entièrement développé en JavaScript vanilla avec une interface intuitive et des règles complètes.",
    image: "./assets/jeudedame.png",
    tech: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/Wade199/jeux_de_dame/",
    demo: "https://wade199.github.io/jeux_de_dame/"
  }
  /* ← ADD NEW PROJECTS HERE */
];

/* ============================================================
   TRANSLATIONS
   ============================================================ */
const TRANSLATIONS = {
  fr: {
    "nav-home":       "Accueil",
    "nav-about":      "À propos",
    "nav-experience": "Expériences",
    "nav-skills":     "Compétences",
    "nav-projects":   "Projets",
    "nav-contact":    "Contact",
    "greeting":       "Bonjour, je suis",
    "hero-seeking":   "🎯 Recherche une alternance — 2 semaines entreprise / 1 semaine école",
    "download-cv":    "Télécharger CV",
    "contact-btn":    "Contact",
    "about-sub":      "En savoir plus",
    "about-title":    "À propos de moi",
    "phone-label":    "Téléphone",
    "email-label":    "Email",
    "location-label": "Localisation",
    "about-bio":      "Fort de trois expériences significatives en développement web, j'ai pu développer des compétences en PHP, HTML et CSS. Je souhaite aujourd'hui progresser dans un environnement stimulant et professionnel, dans le cadre d'une alternance au rythme de deux semaines en entreprise et une semaine à l'école.",
    "education-title":"🎓 Formation",
    "edu1-title":     "Baccalauréat Scientifique (SERIE S2)",
    "edu1-school":    "Groupe Scolaire Seydou Nourou Tall Pikine, Sénégal",
    "edu2-title":     "BTS SIO option SLAM",
    "edu2-school":    "Lycée Polyvalent Guy Mollet, Arras",
    "edu3-title":     "Bachelor 3 DevOps-Fullstack",
    "edu3-school":    "École EPSI d'Arras",
    "edu4-title":     "Bachelor 3 Concepteur Développeur d'Applications",
    "edu4-school":    "YNOV CAMPUS Paris",
    "exp-sub":        "Mon parcours",
    "exp-title":      "Expériences Professionnelles",
    "exp1-role":      "Développeur web",
    "exp1-t1":        "Installation de l'application en local",
    "exp1-t2":        "Configuration de l'environnement WordPress",
    "exp1-t3":        "Ajout de fonctionnalités via WordPress",
    "exp1-t4":        "Développement de thèmes en HTML et CSS",
    "exp1-t5":        "Intégration de fonctionnalités avec PHP",
    "exp1-t6":        "Tests des nouvelles fonctionnalités",
    "exp1-t7":        "Documentation des modifications et processus",
    "exp2-role":      "Développeur web",
    "exp2-t1":        "Ajout de nouvelles fonctionnalités avec HTML, CSS et PHP",
    "exp2-t2":        "Installation et configuration d'une application en local",
    "exp2-t3":        "Intégration et ajustement des éléments de design sur le site",
    "exp2-t4":        "Tests et débogage des fonctionnalités ajoutées",
    "exp3-role":      "Développeur web",
    "exp3-t1":        "Développement d'une application de restauration en PHP",
    "exp3-t2":        "Création de l'interface utilisateur avec HTML et Bootstrap",
    "exp3-t3":        "Intégration du système de gestion des commandes",
    "exp3-t4":        "Optimisation des processus pour accélérer les commandes des clients",
    "skills-sub":     "Mon arsenal",
    "skills-title":   "Compétences Techniques",
    "skills-main-title": "⚡ Compétences Principales",
    "skill-h1":       "Création d'APIs RESTful avec PHP Symfony et API Platform",
    "skill-h2":       "Débogage et optimisation des applications web et mobile",
    "skill-h3":       "Développement d'applications mobiles avec Flutter (Provider, Bloc)",
    "skill-h4":       "Intégration d'APIs et tests fonctionnels",
    "languages-title":"🌍 Langues",
    "lang-fr":        "Français",
    "lang-es":        "Espagnol",
    "lang-en":        "Anglais",
    "lang-native":    "Natif",
    "hobbies-title":  "🎯 Loisirs",
    "projects-sub":   "Mes réalisations",
    "projects-title": "Projets",
    "project-github": "GitHub",
    "project-demo":   "Live Demo",
    "contact-sub":    "Travaillons ensemble",
    "contact-title":  "Contact",
    "form-name":      "Nom",
    "form-email":     "Email",
    "form-message":   "Message",
    "form-send":      "Envoyer le message",
    "form-success":   "✅ Message envoyé avec succès !",
    "form-error":     "❌ Veuillez remplir tous les champs."
  },
  en: {
    "nav-home":       "Home",
    "nav-about":      "About",
    "nav-experience": "Experience",
    "nav-skills":     "Skills",
    "nav-projects":   "Projects",
    "nav-contact":    "Contact",
    "greeting":       "Hello, I am",
    "hero-seeking":   "🎯 Looking for an apprenticeship — 2 weeks company / 1 week school",
    "download-cv":    "Download CV",
    "contact-btn":    "Contact",
    "about-sub":      "Learn more",
    "about-title":    "About Me",
    "phone-label":    "Phone",
    "email-label":    "Email",
    "location-label": "Location",
    "about-bio":      "With three significant web development experiences, I have built skills in PHP, HTML and CSS. I now want to grow in a stimulating and professional environment through an apprenticeship at a pace of two weeks in the company and one week at school.",
    "education-title":"🎓 Education",
    "edu1-title":     "Scientific Baccalaureate (SERIE S2)",
    "edu1-school":    "Groupe Scolaire Seydou Nourou Tall Pikine, Senegal",
    "edu2-title":     "BTS SIO option SLAM",
    "edu2-school":    "Lycée Polyvalent Guy Mollet, Arras",
    "edu3-title":     "Bachelor 3 DevOps-Fullstack",
    "edu3-school":    "EPSI School of Arras",
    "edu4-title":     "Bachelor 3 Application Developer Designer",
    "edu4-school":    "YNOV CAMPUS Paris",
    "exp-sub":        "My journey",
    "exp-title":      "Professional Experience",
    "exp1-role":      "Web Developer",
    "exp1-t1":        "Local application installation",
    "exp1-t2":        "WordPress environment configuration",
    "exp1-t3":        "Adding features via WordPress",
    "exp1-t4":        "Theme development in HTML and CSS",
    "exp1-t5":        "Feature integration with PHP",
    "exp1-t6":        "Testing new features",
    "exp1-t7":        "Documentation of changes and processes",
    "exp2-role":      "Web Developer",
    "exp2-t1":        "Adding new features with HTML, CSS and PHP",
    "exp2-t2":        "Local application installation and configuration",
    "exp2-t3":        "Integration and adjustment of design elements on the site",
    "exp2-t4":        "Testing and debugging added features",
    "exp3-role":      "Web Developer",
    "exp3-t1":        "Development of a restaurant application in PHP",
    "exp3-t2":        "User interface creation with HTML and Bootstrap",
    "exp3-t3":        "Order management system integration",
    "exp3-t4":        "Process optimization to speed up customer orders",
    "skills-sub":     "My arsenal",
    "skills-title":   "Technical Skills",
    "skills-main-title": "⚡ Core Skills",
    "skill-h1":       "RESTful API creation with PHP Symfony and API Platform",
    "skill-h2":       "Debugging and optimization of web and mobile applications",
    "skill-h3":       "Mobile application development with Flutter (Provider, Bloc)",
    "skill-h4":       "API integration and functional testing",
    "languages-title":"🌍 Languages",
    "lang-fr":        "French",
    "lang-es":        "Spanish",
    "lang-en":        "English",
    "lang-native":    "Native",
    "hobbies-title":  "🎯 Hobbies",
    "projects-sub":   "My work",
    "projects-title": "Projects",
    "project-github": "GitHub",
    "project-demo":   "Live Demo",
    "contact-sub":    "Let's work together",
    "contact-title":  "Contact",
    "form-name":      "Name",
    "form-email":     "Email",
    "form-message":   "Message",
    "form-send":      "Send message",
    "form-success":   "✅ Message sent successfully!",
    "form-error":     "❌ Please fill in all fields."
  },
  es: {
    "nav-home":       "Inicio",
    "nav-about":      "Sobre mí",
    "nav-experience": "Experiencia",
    "nav-skills":     "Habilidades",
    "nav-projects":   "Proyectos",
    "nav-contact":    "Contacto",
    "greeting":       "Hola, soy",
    "hero-seeking":   "🎯 Buscando alternancia — 2 semanas empresa / 1 semana escuela",
    "download-cv":    "Descargar CV",
    "contact-btn":    "Contacto",
    "about-sub":      "Saber más",
    "about-title":    "Sobre mí",
    "phone-label":    "Teléfono",
    "email-label":    "Email",
    "location-label": "Ubicación",
    "about-bio":      "Con tres experiencias significativas en desarrollo web, he desarrollado habilidades en PHP, HTML y CSS. Ahora quiero crecer en un entorno estimulante y profesional, en el marco de una alternancia a un ritmo de dos semanas en la empresa y una semana en la escuela.",
    "education-title":"🎓 Formación",
    "edu1-title":     "Bachillerato Científico (SERIE S2)",
    "edu1-school":    "Grupo Escolar Seydou Nourou Tall Pikine, Senegal",
    "edu2-title":     "BTS SIO opción SLAM",
    "edu2-school":    "Lycée Polyvalent Guy Mollet, Arras",
    "edu3-title":     "Bachelor 3 DevOps-Fullstack",
    "edu3-school":    "Escuela EPSI de Arras",
    "edu4-title":     "Bachelor 3 Diseñador Desarrollador de Aplicaciones",
    "edu4-school":    "YNOV CAMPUS París",
    "exp-sub":        "Mi trayectoria",
    "exp-title":      "Experiencia Profesional",
    "exp1-role":      "Desarrollador web",
    "exp1-t1":        "Instalación de la aplicación en local",
    "exp1-t2":        "Configuración del entorno WordPress",
    "exp1-t3":        "Adición de funcionalidades vía WordPress",
    "exp1-t4":        "Desarrollo de temas en HTML y CSS",
    "exp1-t5":        "Integración de funcionalidades con PHP",
    "exp1-t6":        "Pruebas de nuevas funcionalidades",
    "exp1-t7":        "Documentación de cambios y procesos",
    "exp2-role":      "Desarrollador web",
    "exp2-t1":        "Adición de nuevas funcionalidades con HTML, CSS y PHP",
    "exp2-t2":        "Instalación y configuración de una aplicación en local",
    "exp2-t3":        "Integración y ajuste de elementos de diseño en el sitio",
    "exp2-t4":        "Pruebas y depuración de funcionalidades añadidas",
    "exp3-role":      "Desarrollador web",
    "exp3-t1":        "Desarrollo de una aplicación de restauración en PHP",
    "exp3-t2":        "Creación de la interfaz de usuario con HTML y Bootstrap",
    "exp3-t3":        "Integración del sistema de gestión de pedidos",
    "exp3-t4":        "Optimización de procesos para acelerar los pedidos de clientes",
    "skills-sub":     "Mi arsenal",
    "skills-title":   "Habilidades Técnicas",
    "skills-main-title": "⚡ Habilidades Principales",
    "skill-h1":       "Creación de APIs RESTful con PHP Symfony y API Platform",
    "skill-h2":       "Depuración y optimización de aplicaciones web y móviles",
    "skill-h3":       "Desarrollo de aplicaciones móviles con Flutter (Provider, Bloc)",
    "skill-h4":       "Integración de APIs y pruebas funcionales",
    "languages-title":"🌍 Idiomas",
    "lang-fr":        "Francés",
    "lang-es":        "Español",
    "lang-en":        "Inglés",
    "lang-native":    "Nativo",
    "hobbies-title":  "🎯 Aficiones",
    "projects-sub":   "Mis trabajos",
    "projects-title": "Proyectos",
    "project-github": "GitHub",
    "project-demo":   "Demo en vivo",
    "contact-sub":    "Trabajemos juntos",
    "contact-title":  "Contacto",
    "form-name":      "Nombre",
    "form-email":     "Email",
    "form-message":   "Mensaje",
    "form-send":      "Enviar mensaje",
    "form-success":   "✅ ¡Mensaje enviado con éxito!",
    "form-error":     "❌ Por favor, rellena todos los campos."
  }
};

/* ============================================================
   STATE
   ============================================================ */
let currentLang = localStorage.getItem('lang') || 'fr';
let lastScrollY = 0;
let typingInterval = null;

/* ============================================================
   PARTICLES BACKGROUND
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 80;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function createParticle() {
    return {
      x:     randomBetween(0, canvas.width),
      y:     randomBetween(0, canvas.height),
      r:     randomBetween(0.5, 2),
      vx:    randomBetween(-0.3, 0.3),
      vy:    randomBetween(-0.3, 0.3),
      alpha: randomBetween(0.2, 0.7),
      color: Math.random() > 0.5 ? '0,217,255' : '123,44,191'
    };
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());

  function drawLine(p1, p2, dist) {
    const alpha = (1 - dist / 120) * 0.15;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = `rgba(0,217,255,${alpha})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    });
    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) drawLine(particles[i], particles[j], dist);
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ============================================================
   NAVBAR — hide on scroll down, show on scroll up
   ============================================================ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.getElementById('lang-dropdown');

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

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      const bottom = top + sec.offsetHeight;
      const link = navLinks.querySelector(`a[href="#${sec.id}"]`);
      if (link) link.classList.toggle('active', currentY >= top && currentY < bottom);
    });
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
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
})();

/* ============================================================
   TYPING EFFECT
   ============================================================ */
const TYPING_STRINGS = {
  fr: ["Développeur Full Stack", "Bachelor DevOps Fullstack", "Passionné de code 💻"],
  en: ["Full Stack Developer", "DevOps Fullstack Bachelor", "Code enthusiast 💻"],
  es: ["Desarrollador Full Stack", "Bachelor DevOps Fullstack", "Apasionado del código 💻"]
};

function startTyping(lang) {
  const el = document.getElementById('typing-text');
  if (!el) return;
  if (typingInterval) clearTimeout(typingInterval);

  const strings = TYPING_STRINGS[lang] || TYPING_STRINGS.fr;
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
        typingInterval = setTimeout(tick, 2000);
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
    typingInterval = setTimeout(tick, deleting ? 50 : 90);
  }
  tick();
}

/* ============================================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
          // Animate skill bars when skills section enters
          if (entry.target.classList.contains('skill-category') ||
              entry.target.closest('#skills')) {
            animateSkillBars(entry.target);
          }
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Staggered reveal for items
  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.querySelectorAll('.reveal-item');
        siblings.forEach((sib, i) => {
          setTimeout(() => sib.classList.add('visible'), i * 120);
        });
        itemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-item').forEach(el => itemObserver.observe(el));
}

/* ============================================================
   SKILL BARS ANIMATION
   ============================================================ */
function animateSkillBars(container) {
  const bars = (container || document).querySelectorAll('.skill-bar-fill');
  bars.forEach(bar => {
    const width = bar.dataset.width;
    if (width && bar.style.width === '') {
      bar.style.width = width + '%';
    }
  });
}

// Also trigger when skills section becomes visible
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars(skillsSection);
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  skillsObserver.observe(skillsSection);
}

/* ============================================================
   PROJECTS — render from data array
   ============================================================ */
function renderProjects(lang) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;

  grid.innerHTML = PROJECTS.map((p, i) => `
    <div class="project-card glass-card reveal-item" style="transition-delay:${i * 0.1}s">
      <div class="project-img-wrap">
        <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy"
             onerror="this.style.display='none'" />
      </div>
      <div class="project-info">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-tech">
          ${p.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${p.github}" target="_blank" rel="noopener" class="project-link github">
            🐙 ${t['project-github'] || 'GitHub'}
          </a>
          <a href="${p.demo}" target="_blank" rel="noopener" class="project-link demo">
            🚀 ${t['project-demo'] || 'Live Demo'}
          </a>
        </div>
      </div>
    </div>
  `).join('');

  // Re-observe new cards
  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        itemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  grid.querySelectorAll('.reveal-item').forEach(el => itemObserver.observe(el));
}

/* ============================================================
   LANGUAGE SYSTEM
   ============================================================ */
function changeLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);

  // Update all data-translate elements
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    const val = TRANSLATIONS[lang][key];
    if (val !== undefined) el.textContent = val;
  });

  // Update lang indicator
  const indicator = document.getElementById('lang-current');
  if (indicator) indicator.textContent = lang.toUpperCase();

  // Mark active option
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.textContent.toLowerCase().includes(
      lang === 'fr' ? 'français' : lang === 'en' ? 'english' : 'español'
    ));
  });

  // Close dropdown
  const dd = document.getElementById('lang-dropdown');
  const btn = document.getElementById('lang-btn');
  if (dd) dd.classList.remove('open');
  if (btn) btn.classList.remove('open');

  // Re-render projects with new language
  renderProjects(lang);

  // Restart typing with new language
  startTyping(lang);
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.querySelector('#form-name').value.trim();
    const email   = form.querySelector('#form-email').value.trim();
    const message = form.querySelector('#form-message').value.trim();
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.fr;

    if (!name || !email || !message) {
      status.textContent = t['form-error'];
      status.className = 'form-status error';
      return;
    }

    // Simulate send (replace with real backend/EmailJS if needed)
    const btn = form.querySelector('.form-submit');
    btn.disabled = true;
    btn.textContent = '⏳ Envoi...';

    setTimeout(() => {
      status.textContent = t['form-success'];
      status.className = 'form-status success';
      form.reset();
      btn.disabled = false;
      btn.textContent = t['form-send'];
      setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 5000);
    }, 1200);
  });
})();

/* ============================================================
   SMOOTH SCROLL for anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved language
  changeLanguage(currentLang);
  // Start typing
  startTyping(currentLang);
  // Init scroll reveal
  initReveal();
  // Render projects
  renderProjects(currentLang);
});
