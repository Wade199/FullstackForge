/* ============================================================
   PAGE DOC (pages/docs.html) — liste les projets avec un lien
   vers leur étude de cas (pages/project.html?slug=...).
   ============================================================ */
import { getAllProjects, safeAssetPath } from './projects.js';

export function initDocsList() {
  const list = document.getElementById('docs-list');
  if (!list) return; // pas sur pages/docs.html

  list.replaceChildren();

  getAllProjects().forEach(project => {
    const card = document.createElement('a');
    card.className = 'project-card glass-card reveal-item docs-card';
    card.href = project.slug ? `project.html?slug=${encodeURIComponent(project.slug)}` : 'projects.html';

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

    info.append(title, description);
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
