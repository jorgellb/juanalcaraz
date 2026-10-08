import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://juanalcaraz.es';

// Mapa de rutas por idioma, el mismo que usa la web (src/i18n/index.ts)
const ROUTES = JSON.parse(readFileSync(new URL('./src/i18n/routes.json', import.meta.url), 'utf8'));

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

// Qué ficheros determinan realmente el contenido de cada página. Cada vista
// lleva dentro sus textos en español e inglés, así que vale para los dos idiomas.
const SOURCES = {
  home: ['src/views/HomeView.astro'],
  projects: ['src/views/ProjectsView.astro', 'src/components/ProjectCard.astro', 'src/content/projects'],
  filmography: ['src/views/FilmographyView.astro', 'src/content/filmography'],
  contact: ['src/views/ContactView.astro'],
  legal: ['src/views/LegalNoticeView.astro', 'src/layouts/LegalLayout.astro'],
  privacy: ['src/views/PrivacyView.astro', 'src/layouts/LegalLayout.astro'],
  cookies: ['src/views/CookiesView.astro', 'src/layouts/LegalLayout.astro'],
};

// Ruta → página a la que corresponde, sea cual sea el idioma
const ROUTE_KEY_BY_PATH = Object.fromEntries(
  Object.entries(ROUTES).flatMap(([key, paths]) => Object.values(paths).map((path) => [path, key])),
);

export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      changefreq: 'monthly',
      serialize(item) {
        const path = new URL(item.url).pathname;
        const key = ROUTE_KEY_BY_PATH[path];

        if (key === 'home') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (key === 'projects') {
          item.priority = 0.9;
        } else if (key === 'filmography' || key === 'contact') {
          item.priority = 0.8;
        } else {
          // Páginas legales
          item.priority = 0.3;
          item.changefreq = 'yearly';
        }

        const sources = SOURCES[key];
        const lastmod = sources ? lastCommit(...sources) : null;
        if (lastmod) item.lastmod = lastmod;
        else delete item.lastmod;

        // Versiones de la página en cada idioma (hreflang), igual que en el <head>
        if (key) {
          item.links = [
            ...Object.entries(ROUTES[key]).map(([lang, href]) => ({ lang, url: new URL(href, SITE).href })),
            { lang: 'x-default', url: new URL(ROUTES[key].es, SITE).href },
          ];
        }

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
