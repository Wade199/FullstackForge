/* ============================================================
   PAGE DOC (pages/docs.html) — liste les projets avec un lien vers
   leur étude de cas (project.html?slug=...) et un lien vers leur
   documentation technique réelle (README GitHub), quand elle existe.
   ============================================================ */
import { getAllProjects, safeAssetPath, safeExternalUrl } from './projects.js';
import { getCurrentLang, getTranslations } from './i18n.js';

export function initDocsList() {
  const list = document.getElementById('docs-list');
  if (!list) return; // pas sur pages/docs.html

  const t = getTranslations(getCurrentLang());
  list.replaceChildren();

  getAllProjects().forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card glass-card reveal-item docs-card';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'project-img-wrap';
    const imagePath = safeAssetPath(project.image);
    if (imagePath) {
      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = project.title || '';
      img.className = 'project-img';
      img.loading = 'lazy';
      img.addEventListener('error', () => { img.style.display = 'none'; });
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

    const links = document.createElement('div');
    links.className = 'project-links';

    if (project.slug) {
      const caseStudyLink = document.createElement('a');
      caseStudyLink.href = `project.html?slug=${encodeURIComponent(project.slug)}`;
      caseStudyLink.className = 'project-link github';
      caseStudyLink.textContent = `📖 ${t['docs-case-study-link'] || 'Étude de cas'}`;
      links.appendChild(caseStudyLink);
    }

    if (project.github) {
      const docsLink = document.createElement('a');
      docsLink.href = safeExternalUrl(project.github);
      docsLink.target = '_blank';
      docsLink.rel = 'noopener noreferrer';
      docsLink.className = 'project-link demo';
      docsLink.textContent = project.hasDocs
        ? `📄 ${t['docs-full-docs'] || 'Documentation technique'}`
        : `💻 ${t['docs-source-code'] || 'Code source'}`;
      links.appendChild(docsLink);
    }

    info.append(title, description, links);
    card.append(imgWrap, info);
    list.appendChild(card);
  });

  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        itemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  list.querySelectorAll('.reveal-item').forEach((el, i) => {
    setTimeout(() => itemObserver.observe(el), i * 80);
  });
}
