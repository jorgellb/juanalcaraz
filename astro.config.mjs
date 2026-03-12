import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://laoveja.es',
  integrations: [sitemap()],
  prefetch: true,
  build: {
    inlineStylesheets: 'auto'
  },
  compressHTML: true
});
