#!/usr/bin/env node
/* ============================================================
   build.js — injecte includes/navbar.html + includes/footer.html
   dans chaque page source de pages/*.html, et écrit le résultat
   à la racine du projet (servi tel quel par GitHub Pages/Netlify).

   Usage : node build.js
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PAGES_DIR = path.join(ROOT, 'pages');
const INCLUDES_DIR = path.join(ROOT, 'includes');

const MARKERS = {
  navbar: '<!--#include:navbar-->',
  footer: '<!--#include:footer-->',
};

function readInclude(name) {
  const file = path.join(INCLUDES_DIR, `${name}.html`);
  if (!fs.existsSync(file)) {
    throw new Error(`Include introuvable : ${file}`);
  }
  return fs.readFileSync(file, 'utf8').trimEnd();
}

function buildPage(fileName, includes) {
  const sourcePath = path.join(PAGES_DIR, fileName);
  let html = fs.readFileSync(sourcePath, 'utf8');

  for (const [name, marker] of Object.entries(MARKERS)) {
    if (html.includes(marker)) {
      html = html.replaceAll(marker, includes[name]);
    }
  }

  // Sécurité : repère un marqueur mal orthographié qui n'aurait pas été injecté
  const leftover = html.match(/<!--#include:[a-z]+-->/);
  if (leftover) {
    throw new Error(`${fileName} : marqueur non résolu "${leftover[0]}" (include manquant ?)`);
  }

  const outPath = path.join(ROOT, fileName);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`✓ ${fileName}`);
}

function main() {
  if (!fs.existsSync(PAGES_DIR)) {
    throw new Error(`Dossier introuvable : ${PAGES_DIR}`);
  }

  const includes = {
    navbar: readInclude('navbar'),
    footer: readInclude('footer'),
  };

  const pageFiles = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.html'));
  if (pageFiles.length === 0) {
    console.warn('Aucune page trouvée dans pages/.');
    return;
  }

  pageFiles.forEach(fileName => buildPage(fileName, includes));
  console.log(`\nBuild terminé : ${pageFiles.length} page(s) générée(s) à la racine.`);
}

main();
