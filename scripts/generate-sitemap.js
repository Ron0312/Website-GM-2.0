import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tankDetails } from '../src/data/tanks.js';
import { cityData } from '../src/data/cityData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const ROOT_PATH = path.resolve(__dirname, '../');
const SITE_URL = 'https://gasmoeller.de';

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
  console.log('🔄 Starting Sitemap & Robots generation...');
  const routes = [...staticRoutes];

  // Add dynamic tank routes
  tankDetails.forEach(tank => {
    routes.push(`tanks/${tank.slug}`);
  });

  // Add dynamic city routes
  cityData.forEach(city => {
    routes.push(`liefergebiet/${city.slug}`);
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => {
    return `
  <url>
    <loc>${SITE_URL}/${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : (route.startsWith('liefergebiet/') ? '0.7' : '0.8')}</priority>
  </url>`;
  }).join('')}
</urlset>`;

  // 1. Write Sitemap to public/sitemap.xml
  fs.writeFileSync(path.join(PUBLIC_PATH, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated at public/sitemap.xml');

  // 2. Generate and Write Robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`;

  fs.writeFileSync(path.join(PUBLIC_PATH, 'robots.txt'), robotsTxt);
  console.log('✅ Robots.txt generated at public/robots.txt');

  // 3. Fallback: Copy to Root (often helps with certain deployment setups)
  try {
      fs.writeFileSync(path.join(ROOT_PATH, 'sitemap.xml'), sitemap);
      fs.writeFileSync(path.join(ROOT_PATH, 'robots.txt'), robotsTxt);
      console.log('✅ Copies created in project root.');
  } catch (e) {
      console.warn('⚠️ Could not copy to root (might be permission issue, but public/ is fine):', e.message);
  }
}

generateSitemap();
