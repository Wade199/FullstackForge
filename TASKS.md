# TASKS.md — Backlog & Suivi des tâches

> Mis à jour à chaque session de travail.
> Format : [PRIORITÉ] [STATUT] Description — Estimation

---

## 🔥 En cours (Phases 1 à 5 terminées — V2 déployée sur wade199.netlify.app)

Backlog restant : Cloudflare Web Analytics (#17, optionnel), Phase 6 Playground IA (optionnelle), relecture native EN/ES (#27), vérif manuelle 2FA GitHub.

---

## 📋 À faire (Backlog priorisé par phase)

### Phase 4 — Déploiement (1-1.5h)
| # | Tâche | Priorité | Dépendances | Estimation |
|---|-------|----------|-------------|------------|
| 17 | Brancher Cloudflare Web Analytics — nécessite un compte Cloudflare (à créer par Ibrahima) | Med | #14 | 15 min |

### Phase 5 — SEO / PWA / Veille (2h)

✅ **Terminée** — toutes les tâches sont dans la section "Terminé" ci-dessous.

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
| — | Section "Détails techniques" sur chaque page projet | 2026-09-23 | Nouveau champ `technical` (tableau de strings) par projet dans `data/projects.json`, affiché entre le header et l'étude de cas STAR — contenu factuel basé sur l'inspection GitHub déjà faite (BeerMakers/Jeux de Dame) et la connaissance directe de FullstackForge, pas de contenu STAR ni personnel. Corrigé au passage : `caseStudy.result` de FullstackForge mentionnait encore GitHub Pages (désactivé) |
| 13b | Créer `pages/docs.html` + lien "Doc" dans navbar/footer | 2026-09-23 | `pages/docs.html` + `js/docs.js` : liste les 3 projets, lien vers leur étude de cas |
| — | Ajouter un lien vers la vraie doc GitHub sur chaque carte de `docs.html` | 2026-09-23 | Nouveau champ `hasDocs` (bool) par projet dans `data/projects.json` : `true` → bouton "Documentation technique" (FullstackForge, vrais PROJECT_CONTEXT.md/TASKS.md/README.md), `false` → bouton "Code source" (BeerMakers/Jeux de Dame, README par défaut ou absent). Carte plus cliquable en entier (conflit d'`<a>` imbriqués) : 2 boutons distincts, étude de cas + doc/code. Corrigé au passage : `demo` de FullstackForge pointait encore vers l'ancienne URL GitHub Pages désactivée |
| 15 | Configurer Netlify Forms sur le formulaire contact | 2026-09-23 | `data-netlify="true"` + `form-name` caché + honeypot `bot-field` (recommandé par Netlify) sur le formulaire dans `pages/index.html` ; `js/contact.js` fait un vrai POST AJAX vers `/` au lieu de simuler l'envoi. Ne marchera réellement qu'une fois déployé sur Netlify (testé en local : échec attendu, 501, le serveur statique Python ne gère pas POST) |
| 16 | Fichier `_headers` (CSP, X-Frame-Options, Referrer-Policy) | 2026-09-23 | `_headers` + `netlify.toml` (`command = "npm run build"`, `publish = "."`) créés. Les 5 `style=""` inline restants (position navbar, honeypot) retirés au passage et remplacés par des classes CSS, pour un CSP sans `'unsafe-inline'` sur `style-src` |
| 14 | Connecter le repo GitHub à Netlify | 2026-09-23 | Fait par Ibrahima dans le navigateur (Add new site → Import from GitHub → `Wade199/FullstackForge`). Site créé : `wade199.netlify.app`, équipe "Inou", build/publish détectés depuis `netlify.toml` sans rien à remplir. Déploiement `ready` (commit `51c3e6e`, 37 fichiers, header rule appliquée). Détection Netlify Forms : bascule "Forms" du site trouvée désactivée par défaut (`extraFeatures.forms: "not enabled"` malgré `data-netlify="true"` déjà présent dans le HTML) — activée via le connecteur MCP, nécessite un nouveau déploiement pour rescanner le formulaire (la bascule seule ne rescane pas un déploiement déjà fait) |
| — | Vérifier bout en bout le formulaire de contact | 2026-09-23 | Testé par Ibrahima (vrai navigateur) ET par un POST curl — les deux soumissions confirmées dans Netlify Forms (`manage-form-submissions`), soumission de test supprimée après vérification |
| — | Audit headers de sécurité + URLs sur le site en ligne | 2026-09-23 | CSP/X-Frame-Options/Referrer-Policy/Permissions-Policy/X-Content-Type-Options confirmés sur les 4 pages, HSTS ajouté automatiquement par Netlify, redirection HTTP→HTTPS active. **Bug trouvé** : `publish = "."` rendait `pages/*.html`/`includes/*.html` accessibles bruts et cassés (marqueurs `#include` non résolus), plus `PROJECT_CONTEXT.md`/`TASKS.md`/`package.json`/`build.js`/`tailwind.config.js`/`tailwind.input.css` exposés sans raison. Corrigé par des règles `[[redirects]]` (404, `force = true`) dans `netlify.toml` |
| — | GitHub Pages désactivé | 2026-09-23 | `wade199.netlify.app` seule URL de prod désormais (voir PROJECT_CONTEXT.md) |
| 19 | JSON-LD schema.org/Person | 2026-09-23 | Ajouté sur `pages/index.html` uniquement (identité du site). CSP stricte (`script-src 'self'`, pas de `'unsafe-inline'`) : autorisé via un hash `sha256-` calculé sur le contenu réellement déployé (pas localement, pour éviter un décalage LF/CRLF Windows), ajouté à `_headers` après le déploiement. Au passage : `og:url` corrigé partout (pointait encore vers l'ancienne URL GitHub Pages) et balises og:/twitter: manquantes ajoutées sur `docs.html`/`project.html` |
| 20 | sitemap.xml + robots.txt | 2026-09-23 | `sitemap.xml` généré par `build.js` à partir de `data/projects.json` (reste synchronisé automatiquement si un projet est ajouté/retiré) — 6 URLs (index, projects, docs, 3 pages projet). `robots.txt` statique à la racine, référence le sitemap |
| 28 | Automatiser la routine "Veille technique quotidienne" pour qu'elle publie sur `data/veille.json` | 2026-09-23 | `sources` (repo GitHub) + prompt étendu ajoutés à la routine (`trig_01Q7ib5zeriLK321aLeF69S9`) via le connecteur MCP `schedule`. 1er test : push refusé (403, app GitHub Claude pas autorisée sur le repo) — corrigé par Ibrahima via claude.ai/connect-github. 2e test réussi : commit + push automatique (`1039563`), contenu vérifié propre (factuel, aucune mention personnelle). Prochain déclenchement auto : 07:12 Paris chaque matin |
| 27 | Traduire le contenu des projets en EN/ES | 2026-09-23 | Sur demande d'Ibrahima (pas via un locuteur natif comme prévu initialement — traduction faite par moi, à faire relire si souhaité). `data/projects.json` restructuré : `title`/`description`/`technical`/`caseStudy.*` sont maintenant des objets `{fr, en, es}` (titre "Jeux de Dame" localisé en "Checkers Game"/"Juego de Damas", les autres titres restent identiques, ce sont des noms propres). `js/projects.js` expose `pickLocale(field, lang)` (repli sur `fr` si une langue manque). `i18n.js` orchestre le re-rendu : `renderProjects`/`initProjectDetail`/`initDocsList` sont maintenant appelés à chaque `changeLanguage()`, pas juste au chargement — aucune dépendance circulaire (`i18n.js` → `project-detail.js`/`docs.js` → `projects.js`, jamais l'inverse) |
| 21 | og:image custom | 2026-09-23 | **v1** (texte + logo, sans photo) générée via le connecteur Canva (`create-design`), export manuel par Ibrahima suite à un refus d'accès du connecteur (`Not allowed to access design`, 3 tentatives), recadrée en local avec Pillow au format standard 1200×630. **v2** (le jour même, sur demande d'Ibrahima) : composée entièrement en local avec Pillow plutôt que de repartir sur Canva — vraie photo (`assets/image111.png`, recadrée en cercle comme le hero du site) entourée d'un anneau dégradé cyan→violet, texte Segoe UI Bold/Regular (pas de police Poppins disponible localement). **v3** (Ibrahima a signalé un flou sur l'aperçu LinkedIn) : régénérée en **2400×1260** (2×, même ratio) pour rester nette sur les écrans haute densité — `og:image:width`/`og:image:height` mis à jour en conséquence sur les 5 pages. Au passage, l'anneau dégradé a été recalculé **pixel par pixel avec numpy** (angle/distance par rapport au centre) au lieu de segments de ligne dessinés un par un : la version par segments laissait de petites dents de scie sur les bords, invisibles en 1200×630 mais nettement visibles une fois agrandi en 2400×1260 |
| — | Nom affiché "FullstackForge" retiré, remplacé par "Ibrahima Wade" seul | 2026-09-23 | Recommandation explicite donnée sur demande d'Ibrahima ("à ton avis") : un nom de marque/projet ne colle pas à un portfolio perso, surtout après le passage à "Développeur Junior". Footer (`includes/footer.html`) mis à jour, année du copyright corrigée au passage (2025 → 2026). `manifest.json` disait déjà "Ibrahima Wade", rien à changer là |
| — | Poste passé de "Développeur Full Stack" à "Développeur Junior" sur tout le site | 2026-09-23 | L'image générée par Ibrahima disait "Développeur Junior", en décalage avec le reste du site — il a choisi d'harmoniser tout le site sur "Junior" plutôt que de changer l'image. Remplacé : `<title>`, meta description/og/twitter des 5 pages, JSON-LD (`jobTitle`), `typing` FR/EN/ES dans `i18n/*.json`. Hash CSP du JSON-LD à recalculer après déploiement (contenu changé) |
| 22 | Créer `pages/now.html` + lien "Now" dans navbar/footer | 2026-09-23 | Contenu réel (apprentissages, projets en cours hors série YouTube, certifications visées) fourni par Ibrahima à partir de `context.md`/`history.md`, validé avant rédaction. **Remplacée le jour même** (voir tâche suivante) : Ibrahima ne voulait plus exposer ses idées de projet publiquement |
| — | `now.html` → `veille.html` (page "Now" remplacée par une page de veille technologique) | 2026-09-23 | Sur demande explicite d'Ibrahima : les infos "projets en cours" (dont l'idée SaaS PME) exposaient trop. Nouvelle page qui affiche `data/veille.json` (vide pour l'instant) via `js/veille.js` — pensée pour être alimentée par la routine cloud "Veille technique quotidienne" existante (`trig_01Q7ib5zeriLK321aLeF69S9`, cron 07:00 Paris), qu'il faut encore modifier pour qu'elle écrive et push dans ce repo (tâche #28, automatisation choisie explicitement par Ibrahima malgré l'absence de relecture avant publication) |
| 23 | manifest.json PWA + service worker basique | 2026-09-23 | Icône carrée générée via Canva (badge "IW" seul, sans texte — illisible en petit), export réussi cette fois via le connecteur (contrairement à l'og:image). 4 tailles dérivées en local avec Pillow : `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (180), `favicon-32.png`. `manifest.json` (`display: standalone`, couleurs du thème). `sw.js` : cache-first pour le CSS/JS statique, network-first pour le HTML/JSON (important pour `data/veille.json`, qui change chaque matin — un cache-first aurait montré une veille périmée). Balises `<link rel="manifest">`/icônes/`theme-color` ajoutées sur les 5 pages, service worker enregistré depuis `js/main.js` |
| — | Thème clair envisagé puis écarté | 2026-09-24 | Ibrahima a demandé un avis tranché ; recommandation : le néon sombre est l'identité visuelle du site (glow/blur/particules), pas une palette — un mode clair serait un second design complet, pas un toggle de couleurs. Coût jugé disproportionné pour ce portfolio, décision suivie |
| — | Ajouter InvoiceAI (Projet 1) aux projets du portfolio | 2026-09-25 | Repo `Wade199/invoiceai` vérifié via `gh api` avant rédaction (maintenant public, tag `v1.0`, README détaillé) plutôt que de se fier uniquement à la mémoire globale — stack, sécurité et statut confirmés à jour (Docker/CI ajoutés depuis, repo passé public). Capture d'écran réelle récupérée depuis `docs/screenshots/result.png` du repo (branche `master`, pas `main`) → `assets/invoiceai.png`. Placé en tête de la grille projets (le plus abouti techniquement : backend réel, sécurité, IA). `demo` volontairement vide : l'app est conçue pour un usage local mono-utilisateur (127.0.0.1 only, pas de TLS), l'exposer publiquement contredirait son propre design de sécurité. Compteur "Projets" du hero mis à jour 3+ → 4+ |

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
