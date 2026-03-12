import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://juanalcaraz.es',
  integrations: [sitemap()],
  prefetch: true,
  build: {
    inlineStylesheets: 'auto'
  },
  compressHTML: true
});
