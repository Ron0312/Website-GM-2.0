import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tankDetails } from '../src/data/tanks.js';
import { cityData } from '../src/data/cityData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const ROOT_PATH = path.resolve(__dirname, '../');
const SITE_URL = 'https://gasmoeller.de';
const CONTENT_PATH = path.resolve(__dirname, '../src/data/content.jsx');
const LOG_PREFIX = '[SitemapGenerator]';

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

function log(message) {
    console.log(`${LOG_PREFIX} ${message}`);
}

function getKnowledgeRoutes() {
  try {
    const content = fs.readFileSync(CONTENT_PATH, 'utf-8');
    const idRegex = /id:\s*['"]([^'"]+)['"]/g;
    let match;
    const ids = [];
    while ((match = idRegex.exec(content)) !== null) {
      ids.push(match[1]);
    }
    const categoryIds = ['tank-technik', 'heizung', 'gewerbe', 'service', 'basis'];
    return ids.filter(id => !categoryIds.includes(id)).map(id => `wissen/${id}`);
  } catch (e) {
    console.warn('⚠️ Could not parse content.jsx for sitemap:', e.message);
    return [];
  }
}

// Helper to get last modified date of a file or use now
function getLastModified(route) {
    // In a real scenario, we would map routes to source files and check fs.stat
    // For now, we use today's date, but the structure allows expansion.
    // Ideally, we would check the git history or file mtime.
    return new Date().toISOString().split('T')[0];
}

function generateSitemap() {
  log('🔄 Starting Sitemap & Robots generation...');
  const routes = [...staticRoutes];

  // Add dynamic tank routes
  tankDetails.forEach(tank => {
    routes.push(`tanks/${tank.slug}`);
  });

  // Add dynamic knowledge routes
  const knowledgeRoutes = getKnowledgeRoutes();
  routes.push(...knowledgeRoutes);
  log(`✅ Added ${knowledgeRoutes.length} knowledge routes to sitemap.`);

  // Add dynamic city routes
  cityData.forEach(city => {
    routes.push(`liefergebiet/${city.slug}`);
  });
  log(`✅ Added ${cityData.length} city routes to sitemap.`);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${routes.map(route => {
    const isWissen = route.startsWith('wissen/');
    const isLiefergebiet = route.startsWith('liefergebiet/');
    const isTank = route.startsWith('tanks/');

    let priority = '0.8';
    let imageInfo = '';

    if (route === '') {
        priority = '1.0';
        imageInfo = `
    <image:image>
      <image:loc>${SITE_URL}/images/gas-order-hero.webp</image:loc>
      <image:title>Gas-Service Möller - Flüssiggas & Tanks</image:title>
    </image:image>`;
    }
    else if (isTank) {
        priority = '0.9';
        const slug = route.split('/')[1];
        const tank = tankDetails.find(t => t.slug === slug);
        if (tank) {
             const imgUrl = tank.type === 'oberirdisch'
                ? `${SITE_URL}/images/tanks/oberirdisch.webp`
                : `${SITE_URL}/images/tanks/unterirdisch.webp`;
             imageInfo = `
    <image:image>
      <image:loc>${imgUrl}</image:loc>
      <image:title>Flüssiggastank ${tank.name} - ${tank.type}</image:title>
    </image:image>`;
        }
    }
    else if (isWissen) priority = '0.8';
    else if (isLiefergebiet) priority = '0.7';

    return `
  <url>
    <loc>${SITE_URL}/${route}</loc>
    <lastmod>${getLastModified(route)}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${priority}</priority>${imageInfo}
  </url>`;
  }).join('')}
</urlset>`;

  // 1. Write Sitemap to public/sitemap.xml
  fs.writeFileSync(path.join(PUBLIC_PATH, 'sitemap.xml'), sitemap);
  log('✅ Sitemap generated at public/sitemap.xml');

  // 2. Generate and Write Robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Sitemap: ${SITE_URL}/sitemap.xml
`;

  fs.writeFileSync(path.join(PUBLIC_PATH, 'robots.txt'), robotsTxt);
  log('✅ Robots.txt generated at public/robots.txt');

  // 3. Fallback: Copy to Root
  try {
      fs.writeFileSync(path.join(ROOT_PATH, 'sitemap.xml'), sitemap);
      fs.writeFileSync(path.join(ROOT_PATH, 'robots.txt'), robotsTxt);
      log('✅ Copies created in project root.');
  } catch (e) {
      console.warn('⚠️ Could not copy to root:', e.message);
  }
}

generateSitemap();
