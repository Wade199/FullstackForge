# TASKS.md — Backlog & Suivi des tâches

> Mis à jour à chaque session de travail.
> Format : [PRIORITÉ] [STATUT] Description — Estimation

---

## 🔥 En cours (Sprint actuel — Phase 0 terminée)

| # | Tâche | Priorité | Statut | Estimation |
|---|-------|----------|--------|------------|
| 1 | Setup workspace (clone repo, PROJECT_CONTEXT.md, TASKS.md, .gitignore) | High | ✅ Done | 45 min |
| 2 | Clarifier choix Eleventy vs HTML/CSS/JS pur | 🔴 Critical | ✅ Done | 5 min |

---

## 📋 À faire (Backlog priorisé par phase)

### Phase 1 — Nettoyage / architecture (3.5-4.5h)
| # | Tâche | Priorité | Dépendances | Estimation |
|---|-------|----------|-------------|------------|
| 3 | Retirer Tailwind CDN → build local via Tailwind CLI | High | — | 1h |
| 3b | Écrire `build.js` maison (injecte includes/navbar.html + footer.html dans chaque page) | High | — | 1h |
| 4 | Découper script.js en modules (i18n, projects, nav, particles, contact) | High | — | 1.5h |
| 5 | Sortir les traductions FR/EN/ES en fichiers JSON | Med | #4 | 1h |
| 6 | Nettoyer style.css (doublons, variables CSS custom properties) | Med | — | 1h |

### Phase 2 — Multi-pages (2-3h)
| # | Tâche | Priorité | Dépendances | Estimation |
|---|-------|----------|-------------|------------|
| 7 | Structurer navigation multi-pages (Accueil/Projets/Doc/Now) | High | #3-6 | 2h |
| 8 | Créer includes/navbar.html + footer.html, brancher sur build.js | High | #3b | 1h |

### Phase 3 — Data + case studies (2-3h + 1h/projet)
| # | Tâche | Priorité | Dépendances | Estimation |
|---|-------|----------|-------------|------------|
| 9 | Créer data/projects.json structuré | High | — | 30 min |
| 10 | Case study STAR — BeerMakers | Med | #9 | 1h |
| 11 | Case study STAR — FullstackForge | Med | #9 | 1h |
| 12 | Case study STAR — Jeux de Dame | Med | #9 | 1h |
| 13 | Page projet individuelle (template) | High | #9 | 1h |

### Phase 4 — Déploiement (1-1.5h)
| # | Tâche | Priorité | Dépendances | Estimation |
|---|-------|----------|-------------|------------|
| 14 | Créer compte/site Netlify, connecter repo GitHub | High | Phase 1-3 | 20 min |
| 15 | Configurer Netlify Forms sur le formulaire contact | High | #14 | 20 min |
| 16 | Fichier `_headers` (CSP, X-Frame-Options, Referrer-Policy) | High | #14 | 20 min |
| 17 | Brancher Cloudflare Web Analytics | Med | #14 | 15 min |
| 18 | Vérifier 2FA + Dependabot activés sur le repo GitHub public | High | — | 10 min |

### Phase 5 — SEO / PWA / Now (2h)
| # | Tâche | Priorité | Dépendances | Estimation |
|---|-------|----------|-------------|------------|
| 19 | JSON-LD schema.org/Person | Med | — | 30 min |
| 20 | sitemap.xml + robots.txt | Med | Phase 2 | 20 min |
| 21 | og:image custom par page | Low | Phase 2 | 30 min |
| 22 | Page "Now" | Low | — | 20 min |
| 23 | manifest.json PWA + service worker basique | Low | — | 30 min |

### Phase 6 — Playground IA (optionnelle, 3-4h)
| # | Tâche | Priorité | Dépendances | Estimation |
|---|-------|----------|-------------|------------|
| 24 | Netlify Function proxy Gemini (clé cachée) | Low | Phase 4 | 1.5h |
| 25 | UI démo playground + rate limiting | Low | #24 | 1.5h |
| 26 | Fake data / mode démo (pas de vraies données) | Low | #24 | 30 min |

---

## ✅ Terminé

| # | Tâche | Date | Notes |
|---|-------|------|-------|
| 0 | Audit du code V1 existant (index.html, script.js, style.css) | 2026-09-22 | Voir PROJECT_CONTEXT.md §Problèmes connus |
| 0b | Projet cloné depuis Wade199/FullstackForge (GitHub) dans le workspace | 2026-09-22 | Repo public existant préservé, pas de nouvelle création |

---

## 🚫 Bloqué

| # | Tâche | Bloquant | Action requise |
|---|-------|----------|-----------------|
| — | — | — | — |

---

## 💡 Idées / Future

- [ ] Domaine perso `.dev` (~10€/an) si le budget change un jour
- [ ] Blog technique en plus des case studies STAR
- [ ] Traduction du contenu par un locuteur natif EN/ES

---

## 📊 Légende

| Statut | Signification |
|--------|--------------|
| 📋 TODO | Pas encore commencé |
| 🔄 In Progress | En cours de développement |
| 🧪 Testing | En cours de test |
| 👁️ Review | En attente de review |
| ✅ Done | Terminé et validé |
| 🚫 Blocked | Bloqué, action requise |
| ❌ Cancelled | Annulé |

| Priorité | Signification |
|----------|--------------|
| 🔴 Critical | Bloque tout le reste |
| 🟠 High | Important pour le sprint |
| 🟡 Med | Planifié mais pas urgent |
| 🟢 Low | Nice to have |
