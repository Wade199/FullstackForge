/* ============================================================
   PAGE VEILLE TECHNOLOGIQUE (pages/veille.html) — charge et affiche
   data/veille.json, paginé par jour. Alimenté automatiquement par
   la routine cloud "Veille technique quotidienne" (voir
   PROJECT_CONTEXT.md).
   ============================================================ */
const DAYS_PER_PAGE = 3;

function safeUrl(value) {
  try {
    const url = new URL(value, window.location.href);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '#';
  } catch (error) {
    return '#';
  }
}

function buildDayCard(day) {
  const dayEl = document.createElement('div');
  dayEl.className = 'veille-day glass-card reveal-item';

  const dateEl = document.createElement('span');
  dateEl.className = 'veille-date';
  dateEl.textContent = day.date || '';
  dayEl.appendChild(dateEl);

  (Array.isArray(day.items) ? day.items : []).forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'veille-item';

    if (item.topic) {
      const topicEl = document.createElement('span');
      topicEl.className = 'veille-topic';
      topicEl.textContent = item.topic;
      itemEl.appendChild(topicEl);
    }

    const titleEl = document.createElement('p');
    titleEl.className = 'veille-item-title';
    if (item.url) {
      const link = document.createElement('a');
      link.href = safeUrl(item.url);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = item.title || '';
      titleEl.appendChild(link);
    } else {
      titleEl.textContent = item.title || '';
    }
    itemEl.appendChild(titleEl);

    if (item.summary) {
      const summaryEl = document.createElement('p');
      summaryEl.className = 'veille-item-summary';
      summaryEl.textContent = item.summary;
      itemEl.appendChild(summaryEl);
    }

    dayEl.appendChild(itemEl);
  });

  return dayEl;
}

function observeReveal(list) {
  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        itemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0 });

  list.querySelectorAll('.reveal-item').forEach((el, i) => {
    setTimeout(() => itemObserver.observe(el), i * 80);
  });
}

export async function initVeille() {
  const list = document.getElementById('veille-list');
  const emptyMessage = document.getElementById('veille-empty');
  const pagination = document.getElementById('veille-pagination');
  if (!list) return; // pas sur pages/veille.html

  let days = [];
  try {
    const res = await fetch('./data/veille.json');
    if (res.ok) days = await res.json();
  } catch (error) {
    days = [];
  }

  if (!Array.isArray(days) || days.length === 0) {
    if (emptyMessage) emptyMessage.hidden = false;
    return;
  }

  // Plus récent en premier, peu importe l'ordre d'écriture dans le fichier
  const sorted = [...days].sort((a, b) => (a.date < b.date ? 1 : -1));
  const totalPages = Math.max(1, Math.ceil(sorted.length / DAYS_PER_PAGE));
  let currentPage = 1;

  function renderPage(page) {
    currentPage = Math.min(Math.max(1, page), totalPages);

    const start = (currentPage - 1) * DAYS_PER_PAGE;
    const pageDays = sorted.slice(start, start + DAYS_PER_PAGE);

    list.replaceChildren();
    pageDays.forEach(day => list.appendChild(buildDayCard(day)));
    observeReveal(list);

    renderPagination();

    // Remonte en haut de la section pour ne pas laisser l'utilisateur
    // scrollé au milieu d'une liste qui vient de changer sous ses yeux
    document.getElementById('veille')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderPagination() {
    if (!pagination) return;
    pagination.replaceChildren();
    if (totalPages <= 1) return;

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'btn btn-outline veille-page-btn';
    prevBtn.textContent = '← Précédent';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => renderPage(currentPage - 1));
    pagination.appendChild(prevBtn);

    const status = document.createElement('span');
    status.className = 'veille-page-status';
    status.textContent = `Page ${currentPage} / ${totalPages}`;
    pagination.appendChild(status);

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn btn-outline veille-page-btn';
    nextBtn.textContent = 'Suivant →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => renderPage(currentPage + 1));
    pagination.appendChild(nextBtn);
  }

  // Premier rendu : pas de scrollIntoView (on est déjà en haut de la page)
  const start = 0;
  const pageDays = sorted.slice(start, start + DAYS_PER_PAGE);
  list.replaceChildren();
  pageDays.forEach(day => list.appendChild(buildDayCard(day)));
  observeReveal(list);
  renderPagination();
}
