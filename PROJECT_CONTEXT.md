# PROJECT_CONTEXT.md — Mémoire vivante du projet

> ⚠️ Ce fichier est la source de vérité du projet.
> Il doit être mis à jour après chaque décision importante.
> Jarvis le lit en priorité pour reprendre le contexte.
> Dernière mise à jour : 2026-09-23

---

## 🎯 Vision

**Nom du projet** : Portfolio FullstackForge (Ibrahima Wade)
**Objectif** : Vitrine professionnelle pour la recherche d'alternance/stage — présenter parcours, compétences, expériences et projets à des recruteurs.
**Valeur principale** : Portfolio statique, rapide, sécurisé par design (zéro backend = zéro surface d'attaque), maintenu via Claude Code + git comme InvoiceAI.

---

## 👥 Utilisateurs

| Profil | Besoins principaux | Priorité |
|--------|-------------------|----------|
| Recruteur / RH | Parcourir profil, compétences, projets rapidement, contacter | High |
| Ibrahima (moi) | Mettre à jour projets/doc facilement via Claude Code, zéro maintenance serveur | High |

---

## ✅ Fonctionnalités

### Implémentées (héritées de la V1)
- [x] Page unique (one-page) avec sections Accueil/À propos/Expériences/Compétences/Projets/Contact
- [x] Design glassmorphism thème sombre néon
- [x] Multilingue FR/EN/ES (traductions codées en dur dans script.js)
- [x] Section projets injectée dynamiquement depuis un tableau JS
- [x] Responsive (mediaqueries.css)
- [x] Particules animées en arrière-plan (Canvas)
- [x] CV téléchargeable en PDF

### En cours (refonte V2)
- [x] Retrait du CDN Tailwind → build local via Tailwind CLI — P1
- [x] Découpage script.js en modules ES + traductions en JSON — P1
- [ ] Petit script de build maison pour partager navbar/footer entre pages (HTML/CSS/JS pur, pas d'Eleventy) — reporté en P2 (voir §Décisions)
- [ ] Multi-pages (index/projects/docs/now) — P2
- [ ] data/projects.json structuré — P3
- [ ] Case studies STAR par projet — P3
- [ ] Déploiement Netlify + Forms + headers sécurité — P4
- [ ] SEO (JSON-LD, sitemap, robots.txt, og:image) + PWA + page "Now" — P5

### Planifiées (optionnel)
- [ ] Playground IA démo (Gemini free tier, rate limité) — P6

---

## 🏗️ Architecture

**Type** : Site statique, HTML/CSS/JS pur (pas de générateur/SSG)
**Pattern** : Pages HTML écrites à la main, navbar/footer partagés injectés via un petit script de build Node maison (évite la duplication sans ajouter de framework)

```
[build.js maison] ← includes/navbar.html + includes/footer.html + data/projects.json
        ↓ (injection à la construction, avant commit ou en pré-build Netlify)
   HTML statique (index.html, projects.html, projects/*.html, docs.html, now.html)
        ↓
   [Netlify] → hébergement + CDN + Forms + headers sécurité
        ↑
[Ibrahima + Claude Code] → édition contenu → git push → redeploy auto
```

Aucun backend, aucune base de données, aucun secret exposé côté client (sauf éventuellement en P6 via Netlify Function proxy).

**Pourquoi un script de build maison plutôt que copier-coller la navbar dans chaque fichier** : dès qu'on a 4-5 pages, un changement de navbar (ex: ajouter un lien) demanderait de modifier chaque fichier HTML manuellement — source d'erreurs et d'oublis. Le script (~50-80 lignes, zéro dépendance externe) lit `includes/navbar.html` et `includes/footer.html` et les injecte dans chaque page source au moment du build. Reste 100% HTML/CSS/JS vanilla, aucun framework appris.

---

## 🛠️ Stack technique

| Couche | Technologie | Version | Raison du choix |
|--------|-------------|---------|-----------------|
| Génération pages | HTML pur + script de build Node maison (partage navbar/footer) | — | Décision explicite d'Ibrahima : rester 100% HTML/CSS/JS, pas de générateur (2026-09-23) |
| Styles | Tailwind CLI (buildé) + CSS custom | latest | Retrait du CDN Tailwind (perf/prod), garde le design existant |
| JS | Vanilla JS (modules ES) | — | Cohérent avec l'existant, pas de framework nécessaire |
| i18n | Fichiers JSON (fr/en/es) | — | Sorti du JS pour lisibilité/maintenabilité |
| Hébergement | Netlify | — | Gratuit, Forms natifs, headers custom (`_headers`), deploy auto sur push |
| Formulaire contact | Netlify Forms | — | Gratuit (100/mois), anti-spam intégré, zéro backend |
| Analytics | Cloudflare Web Analytics | — | Gratuit, RGPD-friendly, sans cookies |
| CI/CD | Netlify (build auto sur push) | — | Intégré, gratuit |
| Playground IA (optionnel, P6) | Gemini free tier + Netlify Function | — | Gratuit, clé cachée côté serverless, rate limité |

**Coût total : 0 €/mois** (contrainte validée avec Ibrahima le 2026-09-22).

---

## 📁 Structure du repository

**État actuel (Phase 1 terminée)** :
```
portfolio-fullstackforge/
├── i18n/                       # fr.json, en.json, es.json (implémenté)
├── js/                         # main.js + modules ES : i18n, nav, particles, reveal, projects, contact (implémenté)
├── assets/                     # Images, CV, icônes
├── tailwind.config.js          # Config Tailwind (couleurs néon, preflight désactivé)
├── tailwind.input.css          # Source Tailwind (@tailwind base/components/utilities)
├── tailwind.css                # CSS Tailwind buildé (généré par `npm run build:css`, committé)
├── package.json                # devDependency tailwindcss + scripts build:css/watch:css
├── index.html
├── style.css
├── mediaqueries.css
├── PROJECT_CONTEXT.md           ← ce fichier
├── TASKS.md
└── README.md
```

**Cible visée (Phase 2+, pas encore implémenté)** :
```
├── includes/                  # Navbar/footer partagés (injectés par build.js) — Phase 2
│   ├── navbar.html
│   └── footer.html
├── pages/                     # Sources HTML avant injection (index, projects, docs, now) — Phase 2
├── data/
│   └── projects.json          # Données structurées des projets — Phase 3
├── docs/                      # Case studies STAR (.md) par projet — Phase 3
├── build.js                   # Script maison : injecte navbar/footer dans les pages HTML — Phase 2
├── projects.html               # Phase 2
├── docs.html                   # Phase 2
├── _headers                   # Headers sécurité Netlify (CSP, X-Frame-Options...) — Phase 4
└── netlify.toml                # Config build Netlify — Phase 4
```

---

## 🔑 Décisions importantes

| Date | Décision | Raison | ADR |
|------|----------|--------|-----|
| 2026-09-22 | Option A (portfolio statique) plutôt qu'admin sécurisé avec backend | Zéro surface d'attaque, ROI recruteur max ; la démo de compétences sécu/backend se fait sur InvoiceAI, pas ici | — |
| 2026-09-22 | Stack 100% gratuit (Netlify + Netlify Forms + Cloudflare Analytics) | Contrainte explicite d'Ibrahima : "je ne veux pas payer" | — |
| 2026-09-22 | Projet déplacé de `Downloads/FullstackForge-main/` vers `Claude-Code-Workspace/projets/actifs/` et cloné depuis le repo GitHub existant `Wade199/FullstackForge` (public) au lieu de repartir d'une copie locale sans historique | Cohérence avec la convention établie (InvoiceAI), préservation de l'historique Git existant | — |
| 2026-09-23 | **HTML/CSS/JS pur confirmé, PAS d'Eleventy** — partage navbar/footer via un petit script de build Node maison (`build.js`) | Ibrahima avait rejeté Eleventy une première fois, ma reco "stack gratuite" l'avait réintroduit par erreur, il a explicitement retranché pour l'option manuelle quand la contradiction a été soumise | — |
| 2026-09-23 | `build.js` (partage navbar/footer) reporté de Phase 1 à Phase 2 | Le site n'a qu'une seule page (`index.html`) tant que la Phase 2 n'est pas faite — un script d'injection navbar/footer n'a de consommateur qu'une fois qu'il existe plusieurs pages HTML. L'écrire en Phase 1 aurait été du code sans usage réel | — |
| 2026-09-23 | Traductions chargées au runtime via `fetch('./i18n/{lang}.json')` (pas de bundler) | Cohérent avec "HTML/CSS/JS pur" ; implique que le site doit être servi via un serveur HTTP local (Live Server, `python -m http.server`, `npx serve`) — `fetch` est bloqué sur `file://`. Documenté dans README.md | — |
| 2026-09-23 | CSS Tailwind buildé (`tailwind.css`) committé dans le repo, pas gitignoré | Le déploiement actuel (GitHub Pages, V1) sert les fichiers bruts sans étape de build — committer le CSS généré est nécessaire tant que la migration Netlify (Phase 4, avec build command) n'est pas faite | — |

---

## ⚠️ Contraintes

- **Budget** : 0 €/mois — aucun service payant
- **Sécurité** : zéro secret exposé côté client ; si Playground IA (P6), clé API cachée via Netlify Function serverless, jamais dans le JS client
- **Performance** : Lighthouse > 90 sur toutes les pages
- **Accessibilité** : contrastes suffisants, navigation clavier, alt text sur toutes les images

---

## 📐 Conventions de code

- **Langue** : Français pour la doc/commentaires, code (variables/fonctions) en anglais
- **Branches** : `main` uniquement pour un projet de cette taille (pas de `develop`)
- **Commits** : Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`)
- **Pas d'attribution IA dans les commits** — même règle que InvoiceAI (`Wade199/invoiceai`), auteur = Ibrahima Wade uniquement

---

## 🔒 Sécurité

- Aucun secret nécessaire en V1 (site 100% statique)
- Si Playground IA (P6) : clé Gemini uniquement côté Netlify Function (jamais exposée au client), rate limiting strict (5 req/jour/IP)
- Headers de sécurité via `_headers` Netlify : CSP, X-Frame-Options, Referrer-Policy, X-Content-Type-Options
- Compte GitHub : 2FA + Dependabot (à vérifier/activer si pas déjà fait)
- Repo **public** (contrairement à InvoiceAI) — c'est un portfolio, la visibilité est voulue

---

## 🚀 Déploiement

- **Environnements** : local (ouvrir index.html ou petit serveur statique) → production (Netlify, déploiement auto sur push `main`)
- **Méthode** : Netlify build (`node build.js`) + deploy auto
- **URL prod actuelle (V1)** : https://wade199.github.io/FullstackForge/ (GitHub Pages)
- **URL prod cible (V2)** : `wade199.netlify.app` (à confirmer, migration GitHub Pages → Netlify en Phase 4)

---

## 🐛 Problèmes connus (audit V1 du 2026-09-22)

| Problème | Impact | Priorité | Statut |
|----------|--------|----------|--------|
| Tailwind chargé via CDN | Perf (poids), pas de purge CSS, warning console en prod | High | ✅ Résolu (Phase 1) — build via Tailwind CLI |
| `script.js` monolithique (758 lignes) | Maintenabilité | Med | ✅ Résolu (Phase 1) — découpé en modules ES |
| Traductions codées en dur dans le JS | Maintenabilité | Med | ✅ Résolu (Phase 1) — sorties en JSON |
| Image `img2infomatique.png.png` (double extension) | Cosmétique | Low | ✅ Résolu (Phase 1) — renommée en `.png` |
| Formulaire contact non fonctionnel (pas de backend) | UX — le formulaire ne fait rien aujourd'hui | High | Prévu Phase 4 (Netlify Forms) |
| Pas de `og:image`, sitemap.xml, robots.txt | SEO | Med | Prévu Phase 5 |
| Pas de lazy loading sur les images | Perf | Low | Prévu Phase 5 (le lazy loading existe déjà sur les images de projets injectées par JS ; à étendre aux images statiques du HTML) |

---

## 📌 Prochaines étapes

1. [x] Clarifier Eleventy vs HTML/CSS/JS pur → tranché le 2026-09-23 : **HTML/CSS/JS pur**
2. [x] Phase 0 : `.gitignore`, PROJECT_CONTEXT.md, TASKS.md
3. [ ] Ouvrir le projet dans VS Code (demande explicite d'Ibrahima) — probablement déjà fait (`.vscode/settings.json` présent), à confirmer
4. [x] Vérifier 2FA + Dependabot sur le repo GitHub public `Wade199/FullstackForge` — Dependabot activé via API, 2FA non vérifiable par API (à contrôler manuellement)
5. [x] Phase 1 : Tailwind CLI + découpage script.js en modules ES + i18n en JSON + nettoyage CSS + renommage image — testé (Node --check sur les modules, cohérence des clés JSON, serveur HTTP local)
6. [ ] Démarrer Phase 2 : multi-pages (Accueil/Projets/Doc/Now) + `build.js` (partage navbar/footer)

---

## 🗒️ Notes & contexte additionnel

- Devis complet discuté et confirmé le 2026-09-22 : 6 phases (P0 à P5) + P6 optionnelle (Playground IA), ~10-17h réparties sur 4-5 sessions.
- Le repo GitHub `Wade199/FullstackForge` existait déjà (public, dernier push 2026-08-15) — le projet local a été **cloné depuis ce repo**, pas recréé de zéro. La copie initiale dans Downloads était une version locale légèrement différente (probablement antérieure) — non utilisée, le repo GitHub fait foi.
- Contenu du portfolio (identité, parcours, projets) **ne change pas** — seule l'architecture technique et l'organisation sont refondues (confirmé explicitement avec Ibrahima).
