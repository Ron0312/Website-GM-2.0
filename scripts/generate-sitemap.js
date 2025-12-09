import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tankDetails } from '../src/data/tanks.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const SITE_URL = 'https://www.gasmoeller.de';

const staticRoutes = [
  '',
  'tanks',
  'gas',
  'rechner',
  'gewerbe',
  'wissen',
  'ueber-uns',
  'kontakt',
  'pruefungen',
  'barrierefreiheit'
];

function generateSitemap() {
  const routes = [...staticRoutes];

  // Add dynamic tank routes
  tankDetails.forEach(tank => {
    routes.push(`tanks/${tank.slug}`);
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => {
    return `
  <url>
    <loc>${SITE_URL}/${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  }).join('')}
</urlset>`;

  // Ensure dist/client exists (for post-build) or public (for dev/pre-build)
  // We prefer writing to dist/client if it exists, otherwise public
  // But usually sitemap should be in public so it gets copied, OR generated into dist after build.

  // Let's write to public so it's there for dev and build copies it (if run before build)
  // OR write to dist if run after build.
  // The plan is to run it.

  fs.writeFileSync(path.join(PUBLIC_PATH, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated at public/sitemap.xml');
}

generateSitemap();
