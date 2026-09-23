/* ============================================================
   PROJECTS DATA + RENDER
   ============================================================
   To add a new project, simply add a new object to this array.
   Each object supports:
     - title:       Project name (string)
     - description: Short description (string)
     - image:       Path to image (string)
     - tech:        Array of technology strings
     - github:      GitHub URL (string)
     - demo:        Live demo URL (string)
   NOTE: cette liste sera remplacée par data/projects.json en Phase 3
   (case studies STAR) — structure volontairement simple pour l'instant.
   ============================================================ */
export const PROJECTS = [
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

function safeExternalUrl(value) {
  try {
    const url = new URL(value, window.location.href);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '#';
  } catch (error) {
    return '#';
  }
}

function safeAssetPath(value) {
  const path = String(value || '');
  return path.startsWith('./assets/') && !path.includes('..') ? path : '';
}

export function renderProjects(translations) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  const t = translations || {};

  grid.replaceChildren();

  PROJECTS.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'project-card glass-card reveal-item';
    card.style.transitionDelay = `${index * 0.1}s`;

    const imgWrap = document.createElement('div');
    imgWrap.className = 'project-img-wrap';

    const imagePath = safeAssetPath(project.image);
    if (imagePath) {
      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = project.title || '';
      img.className = 'project-img';
      img.loading = 'lazy';
      // Cacher l'image si erreur de chargement
      img.addEventListener('error', () => {
        img.style.display = 'none';
      });
      imgWrap.appendChild(img);
    }

    const info = document.createElement('div');
    info.className = 'project-info';

    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = project.title || 'Projet';

    const description = document.createElement('p');
    description.className = 'project-desc';
    description.textContent = project.description || '';

    const techList = document.createElement('div');
    techList.className = 'project-tech';
    const techItems = Array.isArray(project.tech) ? project.tech : [];
    techItems.forEach(tech => {
      const badge = document.createElement('span');
      badge.className = 'tech-badge';
      badge.textContent = tech;
      techList.appendChild(badge);
    });

    const links = document.createElement('div');
    links.className = 'project-links';

    const githubLink = document.createElement('a');
    githubLink.href = safeExternalUrl(project.github);
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.className = 'project-link github';
    githubLink.textContent = `🐙 ${t['project-github'] || 'GitHub'}`;

    const demoLink = document.createElement('a');
    demoLink.href = safeExternalUrl(project.demo);
    demoLink.target = '_blank';
    demoLink.rel = 'noopener noreferrer';
    demoLink.className = 'project-link demo';
    demoLink.textContent = `🚀 ${t['project-demo'] || 'Live Demo'}`;

    links.append(githubLink, demoLink);
    info.append(title, description, techList, links);
    card.append(imgWrap, info);
    grid.appendChild(card);
  });

  // Observer les nouvelles cards indépendamment (staggered)
  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        itemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  grid.querySelectorAll('.reveal-item').forEach((el, i) => {
    setTimeout(() => itemObserver.observe(el), i * 80);
  });
}
