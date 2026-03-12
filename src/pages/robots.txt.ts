import type { APIRoute } from 'astro';

export const prerender = true;

const site = 'https://laoveja.es';

const robotsTxt = `
User-agent: *
Allow: /
Sitemap: ${site}/sitemap-index.xml
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
};
