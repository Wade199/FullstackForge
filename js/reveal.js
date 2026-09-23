/* ============================================================
   SCROLL REVEAL (IntersectionObserver) + SKILL BARS ANIMATION
   ============================================================ */

export function animateSkillBars(container) {
  const bars = (container || document).querySelectorAll('.skill-bar-fill');
  bars.forEach(bar => {
    const width = bar.dataset.width;
    if (width && bar.style.width === '') {
      bar.style.width = width + '%';
    }
  });
}

export function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate skill bars when skills section enters
        if (entry.target.classList.contains('skill-category') ||
            entry.target.closest('#skills')) {
          animateSkillBars(entry.target);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Staggered reveal for items — exclut les .project-card (gérées par projects.js) pour éviter double observation
  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.querySelectorAll('.reveal-item:not(.project-card)');
        siblings.forEach((sib, i) => {
          setTimeout(() => sib.classList.add('visible'), i * 120);
        });
        itemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Observer tous les reveal-item sauf les project-cards (gérés par renderProjects)
  document.querySelectorAll('.reveal-item:not(.project-card)').forEach(el => itemObserver.observe(el));

  // Trigger aussi dès que la section skills devient visible (au cas où elle est déjà à l'écran)
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
}
