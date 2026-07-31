import { execFileSync } from 'node:child_process';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://juanalcaraz.es';

// Fecha del último commit que tocó alguno de estos ficheros, en ISO 8601.
// Google recomienda omitir lastmod antes que poner uno poco fiable, así que si
// git no está disponible (o el fichero aún no se ha commiteado) devuelve null.
const lastCommit = (...paths) => {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...paths], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out || null;
  } catch {
    return null;
  }
};

// Qué ficheros determinan realmente el contenido de cada página
const SOURCES = {
  '/': ['src/pages/index.astro'],
  '/proyectos/': ['src/pages/proyectos.astro', 'src/components/ProjectCard.astro', 'src/content/projects'],
  '/biofilmografia/': ['src/pages/biofilmografia.astro', 'src/content/filmography'],
  '/contacto/': ['src/pages/contacto.astro'],
  '/aviso-legal/': ['src/pages/aviso-legal.astro', 'src/layouts/LegalLayout.astro'],
  '/politica-privacidad/': ['src/pages/politica-privacidad.astro', 'src/layouts/LegalLayout.astro'],
  '/politica-cookies/': ['src/pages/politica-cookies.astro', 'src/layouts/LegalLayout.astro'],
};

export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      changefreq: 'monthly',
      serialize(item) {
        const path = new URL(item.url).pathname;

        if (path === '/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (path.startsWith('/proyectos')) {
          item.priority = 0.9;
        } else if (path.startsWith('/biofilmografia') || path.startsWith('/contacto')) {
          item.priority = 0.8;
        } else {
          // Páginas legales
          item.priority = 0.3;
          item.changefreq = 'yearly';
        }

        const sources = SOURCES[path];
        const lastmod = sources ? lastCommit(...sources) : null;
        if (lastmod) item.lastmod = lastmod;
        else delete item.lastmod;

        return item;
      },
    }),
  ],
  prefetch: true,
  build: {
    inlineStylesheets: 'auto'
  },
  compressHTML: true
});
