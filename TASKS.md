# TASKS.md — Backlog & Suivi des tâches

> Mis à jour à chaque session de travail.
> Format : [PRIORITÉ] [STATUT] Description — Estimation

---

## 🔥 En cours (Sprint actuel — Phase 3 terminée)

| # | Tâche | Priorité | Statut | Estimation |
|---|-------|----------|--------|------------|
| 1 | Setup workspace (clone repo, PROJECT_CONTEXT.md, TASKS.md, .gitignore) | High | ✅ Done | 45 min |
| 2 | Clarifier choix Eleventy vs HTML/CSS/JS pur | 🔴 Critical | ✅ Done | 5 min |
| — | Vérifier 2FA + Dependabot sur le repo GitHub public | High | ✅ Done | 5 min |

Prochaine étape : Phase 4 (déploiement Netlify), voir ci-dessous.

---

## 📋 À faire (Backlog priorisé par phase)

### Phase 4 — Déploiement (1-1.5h)
| # | Tâche | Priorité | Dépendances | Estimation |
|---|-------|----------|-------------|------------|
| 14 | Connecter le repo GitHub à Netlify (compte déjà existant, `site_count: 0`) — **à faire par Ibrahima dans le navigateur** (autorisation OAuth GitHub↔Netlify) | High | Phase 1-3 | 20 min |
| 17 | Brancher Cloudflare Web Analytics — nécessite un compte Cloudflare (à créer par Ibrahima) | Med | #14 | 15 min |

### Phase 5 — SEO / PWA / Now (2h)
| # | Tâche | Priorité | Dépendances | Estimation |
|---|-------|----------|-------------|------------|
| 19 | JSON-LD schema.org/Person | Med | — | 30 min |
| 20 | sitemap.xml + robots.txt | Med | Phase 2 | 20 min |
| 21 | og:image custom par page | Low | Phase 2 | 30 min |
| 22 | Créer `pages/now.html` + ajouter le lien "Now" dans `includes/navbar.html`/`footer.html` | Low | — | 20 min |
| 23 | manifest.json PWA + service worker basique | Low | — | 30 min |
| 27 | Traduire le contenu des projets en EN/ES (titre, description, case study STAR dans `data/projects.json`) par un locuteur natif, puis restructurer `data/projects.json` en `{ fr, en, es }` par champ | Low | — | — |

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
| — | Dependabot alerts + automated security fixes activés sur le repo public | 2026-09-23 | Via `gh api` (2FA non vérifiable par API, à contrôler manuellement dans Settings GitHub) |
| 3 | Retirer Tailwind CDN → build local via Tailwind CLI | 2026-09-23 | `tailwind.config.js` + `tailwind.input.css` → `tailwind.css` (committé, généré par `npm run build:css`) |
| 4 | Découper script.js en modules (i18n, projects, nav, particles, contact) | 2026-09-23 | `script.js` supprimé, remplacé par `js/main.js` + 6 modules ES ; chargé en `<script type="module">` |
| 5 | Sortir les traductions FR/EN/ES en fichiers JSON | 2026-09-23 | `i18n/{fr,en,es}.json` (75 clés chacun, vérifié aucune clé manquante), chargés via `fetch` dans `js/i18n.js` |
| 6 | Nettoyer style.css (doublons, variables CSS custom properties) | 2026-09-23 | Retrait de l'`@import` Google Fonts en double (déjà chargé via `<link>` HTML) + règle `.nav-links.mobile-open` dupliquée avec mediaqueries.css |
| — | Renommer `img2infomatique.png.png` → `.png` (double extension) | 2026-09-23 | `git mv` + référence mise à jour dans index.html |
| 3b | Écrire `build.js` maison (injecte includes/navbar.html + footer.html) | 2026-09-23 | Marqueurs `<!--#include:navbar/footer-->` dans `pages/*.html`, résolus par `node build.js` → écrit à la racine (`npm run build:html`, ou `npm run build` avec le CSS) |
| 7 | Structurer navigation multi-pages | 2026-09-23 | **Partiel, par choix explicite d'Ibrahima** : seulement Accueil/Projets/Contact (pas Doc/Now, voir Phase 3/5). Nav "Projets" pointe vers `projects.html` ; About/Expériences/Compétences/Contact restent des ancres sur `index.html#...` |
| 8 | Créer includes/navbar.html + footer.html, brancher sur build.js | 2026-09-23 | `includes/navbar.html`, `includes/footer.html`, `pages/index.html` (sans la section Projets), `pages/projects.html` (nouvelle page) |
| 9 | Créer data/projects.json structuré | 2026-09-23 | `js/projects.js` recodé pour charger via `fetch` (comme l'i18n) au lieu du tableau codé en dur ; `slug` ajouté par projet |
| 10 | Case study STAR — BeerMakers | 2026-09-23 | Repo GitHub inspecté avant rédaction (voir §Décisions) — tech stack et description corrigés au passage (Flutter/Dart, pas PHP web), lien démo mort supprimé |
| 11 | Case study STAR — FullstackForge | 2026-09-23 | Rédigé à partir de l'historique réel de cette refonte (V1→V2) |
| 12 | Case study STAR — Jeux de Dame | 2026-09-23 | Repo GitHub inspecté avant rédaction (3 commits, moteur de règles avec prises en chaîne + PWA) |
| 13 | Page projet individuelle (template) | 2026-09-23 | `pages/project.html` : template unique, lit `?slug=` dans l'URL, `js/project-detail.js`. Bouton Demo masqué si absent (cas BeerMakers) |
| 13b | Créer `pages/docs.html` + lien "Doc" dans navbar/footer | 2026-09-23 | `pages/docs.html` + `js/docs.js` : liste les 3 projets, lien vers leur étude de cas |
| 15 | Configurer Netlify Forms sur le formulaire contact | 2026-09-23 | `data-netlify="true"` + `form-name` caché + honeypot `bot-field` (recommandé par Netlify) sur le formulaire dans `pages/index.html` ; `js/contact.js` fait un vrai POST AJAX vers `/` au lieu de simuler l'envoi. Ne marchera réellement qu'une fois déployé sur Netlify (testé en local : échec attendu, 501, le serveur statique Python ne gère pas POST) |
| 16 | Fichier `_headers` (CSP, X-Frame-Options, Referrer-Policy) | 2026-09-23 | `_headers` + `netlify.toml` (`command = "npm run build"`, `publish = "."`) créés. Les 5 `style=""` inline restants (position navbar, honeypot) retirés au passage et remplacés par des classes CSS, pour un CSP sans `'unsafe-inline'` sur `style-src` |

---

## 🚫 Bloqué

| # | Tâche | Bloquant | Action requise |
|---|-------|----------|-----------------|
| — | — | — | — |

---

## 💡 Idées / Future

- [ ] Domaine perso `.dev` (~10€/an) si le budget change un jour
- [ ] Blog technique en plus des case studies STAR

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
