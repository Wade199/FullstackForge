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
const SITE_URL = 'https://wade199.netlify.app';

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

function generateSitemap() {
  const dataPath = path.join(ROOT, 'data', 'projects.json');
  const projects = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const today = new Date().toISOString().slice(0, 10);

  const urls = [
    { loc: '/', priority: '1.0' },
    { loc: '/projects.html', priority: '0.8' },
    { loc: '/docs.html', priority: '0.6' },
    ...projects
      .filter(p => p.slug)
      .map(p => ({ loc: `/project.html?slug=${encodeURIComponent(p.slug)}`, priority: '0.5' })),
  ];

  const body = urls
    .map(u => `  <url>\n    <loc>${SITE_URL}${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml, 'utf8');
  console.log(`✓ sitemap.xml (${urls.length} URLs)`);
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
  generateSitemap();
  console.log(`\nBuild terminé : ${pageFiles.length} page(s) générée(s) à la racine.`);
}

main();
