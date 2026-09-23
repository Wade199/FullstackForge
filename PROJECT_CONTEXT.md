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

### Implémentées (héritées de la V1, adaptées en V2)
- [x] 4 pages : `index.html` (one-page Accueil/À propos/Expériences/Compétences/Contact), `projects.html`, `project.html` (détail par projet), `docs.html` (index des études de cas)
- [x] Design glassmorphism thème sombre néon
- [x] Multilingue FR/EN/ES (traductions codées en dur dans script.js)
- [x] Section projets injectée dynamiquement depuis un tableau JS
- [x] Responsive (mediaqueries.css)
- [x] Particules animées en arrière-plan (Canvas)
- [x] CV téléchargeable en PDF

### En cours (refonte V2)
- [x] Retrait du CDN Tailwind → build local via Tailwind CLI — P1
- [x] Découpage script.js en modules ES + traductions en JSON — P1
- [x] Petit script de build maison pour partager navbar/footer entre pages (`build.js`) — P2
- [x] Multi-pages **partiel** : index + projects (Accueil/Projets/Contact dans la nav) — Doc/Now reportés en P3/P5, voir §Décisions
- [x] data/projects.json structuré (chargé via fetch, comme l'i18n) — P3
- [x] Case studies STAR par projet (BeerMakers, FullstackForge, Jeux de Dame) + page projet individuelle (`project.html?slug=...`) + `docs.html` — P3
- [x] Netlify Forms (formulaire contact) + `_headers` sécurité + `netlify.toml` — P4, déployé et vérifié en ligne
- [x] JSON-LD schema.org/Person + sitemap.xml (généré depuis data/projects.json) + robots.txt — P5
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

**État actuel (Phase 4 — code prêt, connexion Netlify restante)** :
```
portfolio-fullstackforge/
├── netlify.toml                # command = "npm run build", publish = "." (implémenté)
├── _headers                    # CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy (implémenté)
├── includes/                   # Navbar/footer partagés, injectés par build.js (implémenté)
│   ├── navbar.html
│   └── footer.html
├── pages/                      # Sources HTML avant injection (implémenté)
│   ├── index.html               # Hero/About/Experience/Skills/Contact (pas de section Projets)
│   ├── projects.html            # Grille des projets (cartes cliquables → project.html)
│   ├── project.html             # Template unique de détail projet, lit ?slug= dans l'URL
│   └── docs.html                # Index des études de cas, liste les 3 projets
├── data/
│   └── projects.json           # Projets structurés (slug, tech, liens, case study STAR) — chargé via fetch
├── i18n/                       # fr.json, en.json, es.json (implémenté)
├── js/                         # main.js + modules ES : i18n, nav, particles, reveal, projects, project-detail, docs, contact
├── assets/                     # Images, CV, icônes
├── build.js                    # Script maison : injecte navbar/footer dans pages/*.html → racine (implémenté)
├── tailwind.config.js          # Config Tailwind (couleurs néon, preflight désactivé, scan pages/+includes/)
├── tailwind.input.css          # Source Tailwind (@tailwind base/components/utilities)
├── tailwind.css                # CSS Tailwind buildé (généré par `npm run build:css`, committé)
├── package.json                # scripts build:css / build:html / build (les deux), devDependency tailwindcss
├── index.html / projects.html / project.html / docs.html
│                                # Générés par `node build.js` à partir de pages/*.html — committés (voir §Décisions)
├── style.css
├── mediaqueries.css
├── PROJECT_CONTEXT.md           ← ce fichier
├── TASKS.md
└── README.md
```

**Cible restante (pas encore implémenté)** :
```
├── docs/                      # Case studies au format .md par projet — abandonné, voir §Décisions
└── pages/now.html               # Page "Now" + lien nav "Now" — Phase 5
```
Cloudflare Web Analytics (Phase 4, tâche #17) nécessite un compte Cloudflare à créer par Ibrahima — pas encore fait.

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
| 2026-09-23 | Phase 2 réduite à Accueil + Projets (pas Doc/Now) — choix explicite d'Ibrahima face à une contradiction entre PROJECT_CONTEXT.md ("index/projects/docs/now" en P2) et TASKS.md (Now en P5, Doc avec contenu réel en P3) | Suivre TASKS.md à la lettre plutôt que le résumé plus large de PROJECT_CONTEXT.md ; évite de créer des pages vides ("bientôt disponible") avant d'avoir du contenu réel | — |
| 2026-09-23 | `index.html`/`projects.html` à la racine sont des **fichiers générés** par `node build.js` à partir de `pages/*.html` — ne jamais les éditer directement, éditer `pages/` ou `includes/` puis relancer `npm run build` | Même logique que `tailwind.css` : GitHub Pages sert les fichiers racine bruts sans étape de build tant que Netlify (Phase 4) n'est pas branché | — |
| 2026-09-23 | Case studies STAR stockées comme champ `caseStudy` dans `data/projects.json` (un seul template `pages/project.html?slug=...`), plutôt que des fichiers `.md` séparés dans `docs/` comme envisagé initialement dans l'architecture | Plus simple pour 3 projets : une seule page HTML à maintenir au lieu de N fichiers Markdown + un rendu Markdown→HTML à écrire ; cohérent avec le pattern déjà en place (JSON chargé via `fetch`) | — |
| 2026-09-23 | Avant de rédiger le contenu STAR, inspection réelle des repos GitHub (`gh api`) de BeerMakers et Jeux de Dame plutôt que d'inventer le contexte/actions/résultats | Ce sont des affirmations professionnelles sur un portfolio public — les inventer serait présenter de fausses informations comme vraies. Deux erreurs factuelles trouvées et corrigées au passage : BeerMakers est une appli **Flutter/Dart** (pas "PHP/HTML/CSS/Bootstrap" ni "application web" comme c'était écrit), et son lien "démo" (`beermakerss`) était mort (404, appli mobile non déployée) — supprimé, le bouton Demo est maintenant masqué quand `demo` est vide | — |
| 2026-09-23 | Contenu des projets (titre/description/case study) laissé en français uniquement pour l'instant, traduction EN/ES rattachée à la Phase 5 (tâche #27) | Décision explicite d'Ibrahima après avoir remarqué que `docs.html` ne traduisait pas le contenu (limite connue, pas un bug — `data/projects.json` n'a qu'une version FR contrairement aux libellés d'interface dans `i18n/*.json`) | — |
| 2026-09-23 | Le site Netlify n'est **pas créé via l'API/connecteur MCP** (`create-new-project`), la connexion GitHub↔Netlify se fait par Ibrahima dans le navigateur (Netlify UI → Import from GitHub) | Le compte Netlify existe déjà (vérifié via le connecteur : `site_count: 0`, `connect-git-provider` en attente dans l'onboarding), mais l'outil MCP de création de site n'accepte pas de repo Git en paramètre — créer un site "à vide" via l'API risquerait de laisser un site orphelin non lié au repo, séparé de celui qu'Ibrahima créerait ensuite correctement via l'UI. L'autorisation OAuth GitHub↔Netlify est de toute façon une action qui doit venir de lui | — |
| 2026-09-23 | Formulaire de contact câblé pour Netlify Forms : `data-netlify="true"` + champ caché `form-name` + honeypot `bot-field` (recommandé par le contexte Netlify officiel), `js/contact.js` fait un vrai `fetch POST` vers `/` au lieu de simuler l'envoi avec un `setTimeout` | Le formulaire était visuellement fonctionnel mais n'envoyait rien nulle part depuis la V1 (problème connu listé dans l'audit). Ne marche réellement qu'une fois déployé sur Netlify (le formulaire est détecté au build) — testé en local : échec propre avec message d'erreur, pas de crash, cohérent avec l'absence de backend en local | — |
| 2026-09-23 | Les 5 `style=""` inline restants (position navbar `140px`, wrapper honeypot) retirés et remplacés par des classes CSS (`.section-offset-top`, `.docs-intro`, `.visually-hidden`) | Permet un `Content-Security-Policy` sans `'unsafe-inline'` sur `style-src` dans `_headers` — CSP plus stricte | — |
| 2026-09-23 | JSON-LD (schema.org/Person) autorisé dans la CSP via un hash `sha256-` calculé sur le contenu **réellement déployé** (fetché après le push), pas sur le fichier source local | `script-src` n'a pas de `'unsafe-inline'` (choix déjà fait), et un `<script type="application/ld+json">` est quand même soumis à `script-src` par les navigateurs. Calculer le hash en local aurait été fragile : ce repo a `core.autocrlf` actif sur Windows (avertissements LF→CRLF vus à chaque commit), donc les octets réellement commités/servis peuvent différer de ceux du fichier local | — |
| 2026-09-23 | `sitemap.xml` généré par `build.js` à partir de `data/projects.json` (pas un fichier statique à maintenir à la main) | Reste automatiquement synchronisé si un projet est ajouté/retiré/renommé (`slug`) — évite le risque d'un sitemap qui devient obsolète en silence | — |

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
- Headers de sécurité via `_headers` Netlify : CSP (sans `'unsafe-inline'`), X-Frame-Options, Referrer-Policy, X-Content-Type-Options, Permissions-Policy — implémenté, actif seulement une fois le site connecté à Netlify
- Compte GitHub : 2FA + Dependabot (à vérifier/activer si pas déjà fait)
- Repo **public** (contrairement à InvoiceAI) — c'est un portfolio, la visibilité est voulue

---

## 🚀 Déploiement

- **Environnements** : local (ouvrir index.html ou petit serveur statique) → production (Netlify, déploiement auto sur push `main`)
- **Méthode** : Netlify build (`npm run build` — voir `netlify.toml`) + deploy auto
- **URL de production** : https://wade199.netlify.app — seule URL live depuis le 2026-09-23
- **GitHub Pages désactivé** le 2026-09-23 (`DELETE /repos/Wade199/FullstackForge/pages`, confirmé 404), sur demande explicite d'Ibrahima : migration V1→V2 terminée. Raison : GitHub Pages ne supporte ni `_headers` ni les redirects de `netlify.toml`, donc aucun header de sécurité et les fichiers internes (`TASKS.md`, `pages/*.html` bruts, etc.) y restaient exposés sans possibilité de les bloquer comme sur Netlify — et le formulaire de contact n'y fonctionne pas (pas de backend Forms). ⚠️ Si l'ancien lien `wade199.github.io/FullstackForge` a été partagé quelque part (CV, LinkedIn, candidatures), le remplacer par `wade199.netlify.app` — pas vérifié explicitement avec Ibrahima avant suppression
- **Site Netlify** : `wade199.netlify.app` (https://wade199.netlify.app), équipe "Inou", connecté au repo `Wade199/FullstackForge` (branche `main`) le 2026-09-23 par Ibrahima. Déploiement `ready`, build/publish lus depuis `netlify.toml` sans configuration manuelle. Netlify Forms était désactivé par défaut au niveau du site (bascule distincte du HTML) — activé via le connecteur MCP, un nouveau déploiement est nécessaire pour que le formulaire soit détecté (voir TASKS.md #14)

---

## 🐛 Problèmes connus (audit V1 du 2026-09-22)

| Problème | Impact | Priorité | Statut |
|----------|--------|----------|--------|
| Tailwind chargé via CDN | Perf (poids), pas de purge CSS, warning console en prod | High | ✅ Résolu (Phase 1) — build via Tailwind CLI |
| `script.js` monolithique (758 lignes) | Maintenabilité | Med | ✅ Résolu (Phase 1) — découpé en modules ES |
| Traductions codées en dur dans le JS | Maintenabilité | Med | ✅ Résolu (Phase 1) — sorties en JSON |
| Image `img2infomatique.png.png` (double extension) | Cosmétique | Low | ✅ Résolu (Phase 1) — renommée en `.png` |
| Formulaire contact non fonctionnel (pas de backend) | UX — le formulaire ne fait rien aujourd'hui | High | ✅ Résolu côté code (Phase 4) — Netlify Forms câblé, actif une fois le site connecté à Netlify |
| Pas de `og:image`, sitemap.xml, robots.txt | SEO | Med | Prévu Phase 5 |
| Pas de lazy loading sur les images | Perf | Low | Prévu Phase 5 (le lazy loading existe déjà sur les images de projets injectées par JS ; à étendre aux images statiques du HTML) |
| Contenu des projets (titre/description/case study STAR) non traduit : `data/projects.json` n'a qu'une version française, contrairement aux libellés d'interface (`i18n/*.json`) | UX — le contenu reste en français même en EN/ES sur `projects.html`/`docs.html`/`project.html` | Low | Connu, pas un bug. Prévu Phase 5 (tâche #27) : traduction par un locuteur natif puis restructuration de `data/projects.json` en `{ fr, en, es }` par champ |

---

## 📌 Prochaines étapes

1. [x] Clarifier Eleventy vs HTML/CSS/JS pur → tranché le 2026-09-23 : **HTML/CSS/JS pur**
2. [x] Phase 0 : `.gitignore`, PROJECT_CONTEXT.md, TASKS.md
3. [ ] Ouvrir le projet dans VS Code (demande explicite d'Ibrahima) — probablement déjà fait (`.vscode/settings.json` présent), à confirmer
4. [x] Vérifier 2FA + Dependabot sur le repo GitHub public `Wade199/FullstackForge` — Dependabot activé via API, 2FA non vérifiable par API (à contrôler manuellement)
5. [x] Phase 1 : Tailwind CLI + découpage script.js en modules ES + i18n en JSON + nettoyage CSS + renommage image — testé (Node --check sur les modules, cohérence des clés JSON, serveur HTTP local)
6. [x] Phase 2 : `build.js` + `includes/navbar.html`/`footer.html` + `pages/index.html`/`projects.html` — nav réduite à Accueil/Projets/Contact (choix explicite d'Ibrahima) — testé (build sans erreur, marqueurs résolus, aucun href orphelin, clés i18n couvertes, serveur HTTP local) **et vérifié par Ibrahima dans un vrai navigateur le 2026-09-23** (nav multi-pages, langues, typing, particules, contact — tout OK)
7. [x] Phase 3 : `data/projects.json` + case studies STAR (BeerMakers, FullstackForge, Jeux de Dame, validées par Ibrahima) + `pages/project.html` (template) + `pages/docs.html` + lien nav "Doc" — testé (build, JSON valide, cohérence i18n sur 4 pages, serveur HTTP local)
8. [x] Phase 4 (code) : Netlify Forms câblé (`data-netlify` + honeypot + vrai POST AJAX), `_headers` + `netlify.toml`, 5 `style=""` inline retirés — testé (build sans erreur, aucun style inline restant, 501 attendu en local sans backend Netlify)
9. [x] Repo GitHub connecté à Netlify par Ibrahima (`wade199.netlify.app`, équipe "Inou") — déploiement `ready`, build/publish lus depuis `netlify.toml` sans rien à remplir manuellement
10. [ ] Netlify Forms activé au niveau du site (bascule séparée du HTML, voir note ci-dessous) — attend un nouveau déploiement pour rescanner le formulaire, puis vérifier un vrai envoi en ligne
11. [ ] Brancher Cloudflare Web Analytics (compte Cloudflare à créer par Ibrahima)

---

## 🗒️ Notes & contexte additionnel

- Devis complet discuté et confirmé le 2026-09-22 : 6 phases (P0 à P5) + P6 optionnelle (Playground IA), ~10-17h réparties sur 4-5 sessions.
- **Piège Netlify Forms** : avoir `data-netlify="true"` + un champ `form-name` caché dans le HTML déployé ne suffit pas — Netlify a une bascule "Forms" au niveau du site (désactivée par défaut sur ce compte), séparée de la détection HTML. Et cette bascule ne rescane pas rétroactivement un déploiement déjà fait : il faut un nouveau déploiement après l'avoir activée pour que le formulaire apparaisse dans Site settings → Forms.
- **Piège `publish = "."`** : avec tout le repo publié tel quel, des fichiers non destinés au public étaient accessibles en ligne une fois le site connecté — dont `pages/*.html`/`includes/*.html` servis **bruts et cassés** (marqueurs `<!--#include:navbar-->` non résolus, car ces fichiers sont les sources AVANT injection par `build.js`, pas les pages générées). Trouvé en auditant les headers/URLs après connexion à Netlify. Corrigé avec des règles `[[redirects]]` (`force = true`) dans `netlify.toml` qui renvoient un 404 sur ces chemins. Rien de sensible n'a fuité (pas de secret dans ce projet), mais c'était un problème de présentation/professionnalisme pour un portfolio public.
- Le repo GitHub `Wade199/FullstackForge` existait déjà (public, dernier push 2026-08-15) — le projet local a été **cloné depuis ce repo**, pas recréé de zéro. La copie initiale dans Downloads était une version locale légèrement différente (probablement antérieure) — non utilisée, le repo GitHub fait foi.
- Contenu du portfolio (identité, parcours, projets) **ne change pas** — seule l'architecture technique et l'organisation sont refondues (confirmé explicitement avec Ibrahima). Exception assumée : la description et le tech stack de BeerMakers ont été corrigés en Phase 3 (c'était factuellement faux, pas un choix de contenu — voir §Décisions du 2026-09-23).
