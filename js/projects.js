/* ============================================================
   PROJECTS DATA (chargées depuis ./data/projects.json) + RENDER
   ============================================================ */

let PROJECTS = [];

export async function loadProjects() {
  const res = await fetch('./data/projects.json');
  if (!res.ok) throw new Error('Impossible de charger data/projects.json');
  PROJECTS = await res.json();
  return PROJECTS;
}

export function getProjectBySlug(slug) {
  return PROJECTS.find(p => p.slug === slug);
}

export function getAllProjects() {
  return PROJECTS;
}

export function safeExternalUrl(value) {
  try {
    const url = new URL(value, window.location.href);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '#';
  } catch (error) {
    return '#';
  }
}

export function safeAssetPath(value) {
  const path = String(value || '');
  return path.startsWith('./assets/') && !path.includes('..') ? path : '';
}

// Les champs de contenu (title, description, technical, caseStudy.*) sont
// des objets { fr, en, es } ; on prend la langue demandée avec repli sur le
// français si la traduction manque pour une raison ou une autre.
export function pickLocale(field, lang) {
  if (!field) return '';
  if (typeof field === 'string') return field; // rétrocompatibilité éventuelle
  return field[lang] || field.fr || '';
}

export function renderProjects(translations, lang) {
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

    const localizedTitle = pickLocale(project.title, lang);
    const imagePath = safeAssetPath(project.image);
    if (imagePath) {
      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = localizedTitle;
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
    title.textContent = localizedTitle || 'Projet';

    const description = document.createElement('p');
    description.className = 'project-desc';
    description.textContent = pickLocale(project.description, lang);

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

    links.append(githubLink);

    // Pas de bouton Demo si le projet n'a pas de démo en ligne (ex: appli mobile non publiée)
    if (project.demo) {
      const demoLink = document.createElement('a');
      demoLink.href = safeExternalUrl(project.demo);
      demoLink.target = '_blank';
      demoLink.rel = 'noopener noreferrer';
      demoLink.className = 'project-link demo';
      demoLink.textContent = `🚀 ${t['project-demo'] || 'Live Demo'}`;
      links.append(demoLink);
    }
    info.append(title, description, techList, links);
    card.append(imgWrap, info);

    // La carte (hors liens externes) mène vers l'étude de cas détaillée du projet
    if (project.slug) {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return; // ne pas intercepter les clics sur GitHub/Demo
        window.location.href = `project.html?slug=${encodeURIComponent(project.slug)}`;
      });
    }

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
