import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://juanalcaraz.es',
  integrations: [
    sitemap({
      changefreq: 'monthly',
      lastmod: new Date(),
      serialize(item) {
        const url = item.url;
        if (url === 'https://juanalcaraz.es/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (url.includes('/proyectos')) {
          item.priority = 0.9;
        } else if (url.includes('/biofilmografia') || url.includes('/contacto')) {
          item.priority = 0.8;
        } else {
          // Páginas legales
          item.priority = 0.3;
          item.changefreq = 'yearly';
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
