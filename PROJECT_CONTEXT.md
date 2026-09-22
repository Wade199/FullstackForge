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
- [ ] Petit script de build maison pour partager navbar/footer entre pages (HTML/CSS/JS pur, pas d'Eleventy) — P1
- [ ] Découpage script.js en modules + traductions en JSON — P1
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

```
portfolio-fullstackforge/
├── includes/                  # Navbar/footer partagés (injectés par build.js)
│   ├── navbar.html
│   └── footer.html
├── pages/                     # Sources HTML avant injection (index, projects, docs, now)
├── i18n/                      # fr.json, en.json, es.json
├── data/
│   └── projects.json          # Données structurées des projets
├── docs/                      # Case studies STAR (.md) par projet
├── assets/                    # Images, CV, icônes (existant)
├── js/                        # script.js découpé en modules (nav, i18n, projects, particles, contact)
├── build.js                   # Script maison : injecte navbar/footer dans les pages HTML
├── index.html                 # Sortie générée (à la racine pour Netlify/GitHub Pages)
├── projects.html
├── docs.html
├── _headers                   # Headers sécurité Netlify (CSP, X-Frame-Options...)
├── netlify.toml                # Config build Netlify
├── PROJECT_CONTEXT.md          ← ce fichier
├── DECISIONS.md
├── TASKS.md
└── README.md
```

---

## 🔑 Décisions importantes

| Date | Décision | Raison | ADR |
|------|----------|--------|-----|
| 2026-09-22 | Option A (portfolio statique) plutôt qu'admin sécurisé avec backend | Zéro surface d'attaque, ROI recruteur max ; la démo de compétences sécu/backend se fait sur InvoiceAI, pas ici | — |
| 2026-09-22 | Stack 100% gratuit (Netlify + Netlify Forms + Cloudflare Analytics) | Contrainte explicite d'Ibrahima : "je ne veux pas payer" | — |
| 2026-09-22 | Projet déplacé de `Downloads/FullstackForge-main/` vers `Claude-Code-Workspace/projets/actifs/` et cloné depuis le repo GitHub existant `Wade199/FullstackForge` (public) au lieu de repartir d'une copie locale sans historique | Cohérence avec la convention établie (InvoiceAI), préservation de l'historique Git existant | — |
| 2026-09-23 | **HTML/CSS/JS pur confirmé, PAS d'Eleventy** — partage navbar/footer via un petit script de build Node maison (`build.js`) | Ibrahima avait rejeté Eleventy une première fois, ma reco "stack gratuite" l'avait réintroduit par erreur, il a explicitement retranché pour l'option manuelle quand la contradiction a été soumise | — |

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

| Problème | Impact | Priorité | Solution envisagée |
|----------|--------|----------|--------------------|
| Tailwind chargé via CDN | Perf (poids), pas de purge CSS, warning console en prod | High | Build Tailwind via CLI en Phase 1 |
| `script.js` monolithique (758 lignes) | Maintenabilité | Med | Découpage en modules en Phase 1 |
| Traductions codées en dur dans le JS | Maintenabilité | Med | Sortie en JSON en Phase 1 |
| Formulaire contact non fonctionnel (pas de backend) | UX — le formulaire ne fait rien aujourd'hui | High | Netlify Forms en Phase 4 |
| Image `img2infomatique.png.png` (double extension) | Cosmétique | Low | Renommer en Phase 1 ou 5 |
| Pas de `og:image`, sitemap.xml, robots.txt | SEO | Med | Phase 5 |
| Pas de lazy loading sur les images | Perf | Low | Phase 5 |

---

## 📌 Prochaines étapes

1. [x] Clarifier Eleventy vs HTML/CSS/JS pur → tranché le 2026-09-23 : **HTML/CSS/JS pur**
2. [x] Phase 0 : `.gitignore`, PROJECT_CONTEXT.md, TASKS.md
3. [ ] Ouvrir le projet dans VS Code (demande explicite d'Ibrahima)
4. [ ] Vérifier 2FA + Dependabot sur le repo GitHub public `Wade199/FullstackForge`
5. [ ] Démarrer Phase 1 : script de build maison + découpage script.js + i18n en JSON

---

## 🗒️ Notes & contexte additionnel

- Devis complet discuté et confirmé le 2026-09-22 : 6 phases (P0 à P5) + P6 optionnelle (Playground IA), ~10-17h réparties sur 4-5 sessions.
- Le repo GitHub `Wade199/FullstackForge` existait déjà (public, dernier push 2026-08-15) — le projet local a été **cloné depuis ce repo**, pas recréé de zéro. La copie initiale dans Downloads était une version locale légèrement différente (probablement antérieure) — non utilisée, le repo GitHub fait foi.
- Contenu du portfolio (identité, parcours, projets) **ne change pas** — seule l'architecture technique et l'organisation sont refondues (confirmé explicitement avec Ibrahima).
