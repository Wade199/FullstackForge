/* ============================================================
   PAGE PROJET INDIVIDUELLE (pages/project.html) — lit ?slug=xxx
   dans l'URL, affiche le projet correspondant depuis
   data/projects.json (déjà chargé par loadProjects() dans main.js).

   Les libellés (Situation/Tâche/Action/Résultat, "à venir", boutons
   GitHub/Demo) sont statiques dans le HTML via data-translate — ce
   module ne fait que remplir/masquer du contenu, jamais du texte
   d'interface, pour que le changement de langue continue de marcher
   sans code spécifique ici.
   ============================================================ */
import { getProjectBySlug, safeExternalUrl, safeAssetPath } from './projects.js';

const STAR_KEYS = ['situation', 'task', 'action', 'result'];

export function initProjectDetail() {
  const root = document.getElementById('project-detail');
  if (!root) return; // pas sur pages/project.html

  const notFound = document.getElementById('pd-not-found');
  const header = document.getElementById('pd-header');
  const caseStudySection = document.getElementById('pd-case-study');

  const slug = new URLSearchParams(window.location.search).get('slug');
  const project = slug ? getProjectBySlug(slug) : null;

  if (!project) {
    if (header) header.hidden = true;
    if (caseStudySection) caseStudySection.hidden = true;
    if (notFound) notFound.hidden = false;
    return;
  }

  document.title = `${project.title} — Ibrahima Wade`;

  const imageEl = document.getElementById('pd-image');
  const imagePath = safeAssetPath(project.image);
  if (imageEl) {
    if (imagePath) {
      imageEl.src = imagePath;
      imageEl.alt = project.title || '';
    } else {
      imageEl.hidden = true;
    }
  }

  const titleEl = document.getElementById('pd-title');
  if (titleEl) titleEl.textContent = project.title || '';

  const descEl = document.getElementById('pd-description');
  if (descEl) descEl.textContent = project.description || '';

  const techEl = document.getElementById('pd-tech');
  if (techEl) {
    techEl.replaceChildren();
    (Array.isArray(project.tech) ? project.tech : []).forEach(tech => {
      const badge = document.createElement('span');
      badge.className = 'tech-badge';
      badge.textContent = tech;
      techEl.appendChild(badge);
    });
  }

  const githubEl = document.getElementById('pd-github');
  if (githubEl) githubEl.href = safeExternalUrl(project.github);

  const demoEl = document.getElementById('pd-demo');
  if (demoEl) {
    if (project.demo) {
      demoEl.href = safeExternalUrl(project.demo);
      demoEl.hidden = false;
    } else {
      demoEl.hidden = true;
    }
  }

  renderCaseStudy(project.caseStudy || {});
}

function renderCaseStudy(caseStudy) {
  const placeholder = document.getElementById('pd-case-study-placeholder');
  const hasContent = STAR_KEYS.some(key => (caseStudy[key] || '').trim() !== '');

  if (placeholder) placeholder.hidden = hasContent;

  STAR_KEYS.forEach(key => {
    const block = document.querySelector(`[data-star="${key}"]`);
    if (!block) return;
    const text = (caseStudy[key] || '').trim();
    if (text) {
      const textEl = block.querySelector('[data-star-text]');
      if (textEl) textEl.textContent = text;
      block.hidden = false;
    } else {
      block.hidden = true;
    }
  });
}
