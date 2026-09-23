# FullstackForge — Portfolio Ibrahima Wade

Portfolio personnel moderne avec design **glassmorphism** et thème sombre néon.

## 🎨 Caractéristiques

- ✨ Design moderne avec effets glassmorphism et néon
- 🌐 Multilingue (Français, Anglais, Espagnol)
- 📱 Entièrement responsive (desktop, tablette, mobile)
- 🎭 Animations fluides et particules en arrière-plan
- ⚡ Performance optimisée
- 🎯 Section projets dynamique et facile à mettre à jour

## 📂 Structure

```
portfolio-fullstackforge/
├── index.html            # Structure HTML
├── style.css             # Styles principaux
├── mediaqueries.css      # Responsive design
├── tailwind.config.js    # Config Tailwind (couleurs néon, preflight désactivé)
├── tailwind.input.css    # Source Tailwind (@tailwind base/components/utilities)
├── tailwind.css          # CSS Tailwind buildé — généré par `npm run build:css`, committé
├── js/                   # Modules ES (main, i18n, nav, particles, reveal, projects, contact)
├── i18n/                 # Traductions fr.json / en.json / es.json
├── assets/               # Images, CV, icônes
└── README.md             # Ce fichier
```

## 💻 Développement local

```bash
npm install          # installe Tailwind CLI
npm run build:css    # (re)génère tailwind.css après une modif de classes Tailwind
npm run watch:css    # mode watch pendant le dev
```

⚠️ **Le site doit être servi via un serveur HTTP local**, pas ouvert directement en `file://` :
les traductions (`i18n/*.json`) et les modules JS (`js/*.js`, `type="module"`) sont chargés par `fetch`/`import`,
que Chrome bloque par défaut sur le protocole `file://`. Utilise par exemple l'extension VS Code **Live Server**,
ou `python -m http.server` / `npx serve` à la racine du projet.

⚠️ **Port 5500 déjà pris ?** Si VS Code a Live Server actif sur un autre projet (ex: InvoiceAI), il occupe
déjà le port 5500 par défaut — ton navigateur risque d'afficher le mauvais projet sans erreur visible.
Utilise un autre port (`python -m http.server 8090`) ou ferme l'autre Live Server.

## 🚀 Comment ajouter un nouveau projet

C'est très simple ! Ouvre le fichier `js/projects.js` et trouve le tableau `PROJECTS` en haut du fichier.

### Exemple :

```javascript
export const PROJECTS = [
  {
    title: "BeerMakers",
    description: "Application web de gestion brassicole...",
    image: "./assets/image11.png",
    tech: ["PHP", "HTML", "CSS", "Bootstrap"],
    github: "https://github.com/Wade199/beermakers",
    demo: "https://github.com/Wade199/beermakerss"
  },
  // ← AJOUTE TON NOUVEAU PROJET ICI
  {
    title: "Mon Nouveau Projet",
    description: "Description courte de ton projet",
    image: "./assets/mon-image.png",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/ton-username/ton-repo",
    demo: "https://ton-site.com"
  }
];
```

### Champs disponibles :

- **title** : Nom du projet
- **description** : Description courte (2-3 phrases)
- **image** : Chemin vers l'image (place-la dans `assets/`)
- **tech** : Array des technologies utilisées
- **github** : Lien vers le repo GitHub
- **demo** : Lien vers la démo live

C'est tout ! Le projet apparaîtra automatiquement sur le site. 🎉

## 🌐 Langues

Le site supporte 3 langues :
- 🇫🇷 Français (par défaut)
- 🇬🇧 Anglais
- 🇪🇸 Espagnol

La langue choisie est sauvegardée dans le navigateur.

## 🎨 Palette de couleurs

- **Background** : `#050816` (bleu très foncé)
- **Accent bleu** : `#00d9ff` (cyan électrique)
- **Accent violet** : `#7b2cbf`
- **Accent vert** : `#00ff88`
- **Texte** : `#f0f0f0` (blanc cassé)
- **Texte secondaire** : `#8892b0` (gris bleuté)

## 📱 Responsive

Le site s'adapte automatiquement à toutes les tailles d'écran :
- Desktop (> 1200px)
- Tablette (900px - 1200px)
- Mobile (< 900px)

## 🔧 Technologies utilisées

- HTML5
- CSS3 (Glassmorphism, animations, gradients) + Tailwind CSS (buildé via CLI, pas de CDN)
- JavaScript vanilla en modules ES (pas de framework)
- Canvas API (particules animées)
- IntersectionObserver (animations au scroll)

## 📄 Licence

© 2025 Ibrahima Wade — Tous droits réservés

---

**Développé avec ❤️ par Ibrahima Wade**
