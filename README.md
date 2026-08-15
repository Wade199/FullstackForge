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
FullstackForge-main/
├── index.html          # Structure HTML
├── style.css           # Styles principaux
├── mediaqueries.css    # Responsive design
├── script.js           # Interactivité et animations
├── assets/             # Images, CV, icônes
└── README.md           # Ce fichier
```

## 🚀 Comment ajouter un nouveau projet

C'est très simple ! Ouvre le fichier `script.js` et trouve le tableau `PROJECTS` au début du fichier (lignes 10-40).

### Exemple :

```javascript
const PROJECTS = [
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
- CSS3 (Glassmorphism, animations, gradients)
- JavaScript vanilla (pas de framework)
- Canvas API (particules animées)
- IntersectionObserver (animations au scroll)

## 📄 Licence

© 2025 Ibrahima Wade — Tous droits réservés

---

**Développé avec ❤️ par Ibrahima Wade**
