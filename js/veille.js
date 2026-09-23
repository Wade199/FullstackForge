/* ============================================================
   PAGE VEILLE TECHNOLOGIQUE (pages/veille.html) — charge et affiche
   data/veille.json. Alimenté automatiquement par la routine cloud
   "Veille technique quotidienne" (voir PROJECT_CONTEXT.md).
   ============================================================ */
function safeUrl(value) {
  try {
    const url = new URL(value, window.location.href);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '#';
  } catch (error) {
    return '#';
  }
}

export async function initVeille() {
  const list = document.getElementById('veille-list');
  const emptyMessage = document.getElementById('veille-empty');
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

  list.replaceChildren();
  sorted.forEach(day => {
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

    list.appendChild(dayEl);
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
