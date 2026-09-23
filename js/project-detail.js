/* ============================================================
   PAGE PROJET INDIVIDUELLE (pages/project.html) — lit ?slug=xxx
   dans l'URL, affiche le projet correspondant depuis
   data/projects.json (déjà chargé par loadProjects() dans main.js).

   Les libellés d'interface (Situation/Tâche/Action/Résultat, "à
   venir", boutons GitHub/Demo) sont statiques dans le HTML via
   data-translate. Le contenu (titre/description/technical/caseStudy)
   est localisé via `lang`, passé par i18n.js à chaque changement de
   langue (voir changeLanguage) — pas d'import de i18n.js ici pour
   éviter une dépendance circulaire.
   ============================================================ */
import { getProjectBySlug, safeExternalUrl, safeAssetPath, pickLocale } from './projects.js';

const STAR_KEYS = ['situation', 'task', 'action', 'result'];

export function initProjectDetail(lang) {
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

  const localizedTitle = pickLocale(project.title, lang);
  document.title = `${localizedTitle} — Ibrahima Wade`;

  const imageEl = document.getElementById('pd-image');
  const imagePath = safeAssetPath(project.image);
  if (imageEl) {
    if (imagePath) {
      imageEl.src = imagePath;
      imageEl.alt = localizedTitle;
    } else {
      imageEl.hidden = true;
    }
  }

  const titleEl = document.getElementById('pd-title');
  if (titleEl) titleEl.textContent = localizedTitle;

  const descEl = document.getElementById('pd-description');
  if (descEl) descEl.textContent = pickLocale(project.description, lang);

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

  renderTechnical(project.technical, lang);
  renderCaseStudy(project.caseStudy || {}, lang);
}

function renderTechnical(technical, lang) {
  const section = document.getElementById('pd-technical');
  const list = document.getElementById('pd-technical-list');
  if (!section || !list) return;

  const items = pickLocale(technical, lang);
  const validItems = Array.isArray(items) ? items.filter(Boolean) : [];
  if (validItems.length === 0) {
    section.hidden = true;
    return;
  }

  list.replaceChildren();
  validItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
  section.hidden = false;
}

function renderCaseStudy(caseStudy, lang) {
  const placeholder = document.getElementById('pd-case-study-placeholder');
  const hasContent = STAR_KEYS.some(key => pickLocale(caseStudy[key], lang).trim() !== '');

  if (placeholder) placeholder.hidden = hasContent;

  STAR_KEYS.forEach(key => {
    const block = document.querySelector(`[data-star="${key}"]`);
    if (!block) return;
    const text = pickLocale(caseStudy[key], lang).trim();
    if (text) {
      const textEl = block.querySelector('[data-star-text]');
      if (textEl) textEl.textContent = text;
      block.hidden = false;
    } else {
      block.hidden = true;
    }
  });
}
