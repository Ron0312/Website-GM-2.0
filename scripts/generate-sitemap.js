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

// Helper to extract knowledge IDs from JSX content
function getKnowledgeRoutes() {
  try {
    const content = fs.readFileSync(CONTENT_PATH, 'utf-8');
    // Regex to match id: '...' or id: "..."
    // We strictly want article IDs, but the file structure is nested.
    // However, since all IDs are unique in the app context (assumed), we can grab all of them
    // and filter out the known category IDs.
    const idRegex = /id:\s*['"]([^'"]+)['"]/g;
    let match;
    const ids = [];
    while ((match = idRegex.exec(content)) !== null) {
      ids.push(match[1]);
    }

    // Known category IDs to exclude (these are just containers, not pages)
    // Actually, in the current app, clicking a category just scrolls or filters?
    // Wait, the KnowledgeCenter.jsx uses categories to Switch tabs.
    // The Route /wissen/:slug expects an ARTICLE slug.
    // If we pass a category slug, findArticleBySlug might fail or return null.
    // Let's filter out the top-level category IDs.
    const categoryIds = ['tank-technik', 'heizung', 'gewerbe', 'service', 'basis'];

    return ids.filter(id => !categoryIds.includes(id)).map(id => `wissen/${id}`);
  } catch (e) {
    console.warn('⚠️ Could not parse content.jsx for sitemap:', e.message);
    return [];
  }
}

function generateSitemap() {
  console.log('🔄 Starting Sitemap & Robots generation...');
  const routes = [...staticRoutes];

  // Add dynamic tank routes
  tankDetails.forEach(tank => {
    routes.push(`tanks/${tank.slug}`);
  });

  // Add dynamic knowledge routes
  const knowledgeRoutes = getKnowledgeRoutes();
  routes.push(...knowledgeRoutes);
  console.log(`✅ Added ${knowledgeRoutes.length} knowledge routes to sitemap.`);

  // Add dynamic city routes
  cityData.forEach(city => {
    routes.push(`liefergebiet/${city.slug}`);
  });
  console.log(`✅ Added ${cityData.length} city routes to sitemap.`);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => {
    const isWissen = route.startsWith('wissen/');
    const isLiefergebiet = route.startsWith('liefergebiet/');
    const isTank = route.startsWith('tanks/');

    let priority = '0.8';
    if (route === '') priority = '1.0';
    else if (isTank) priority = '0.9';
    else if (isWissen) priority = '0.8';
    else if (isLiefergebiet) priority = '0.7';

    return `
  <url>
    <loc>${SITE_URL}/${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${priority}</priority>
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

  // 3. Fallback: Copy to Root
  try {
      fs.writeFileSync(path.join(ROOT_PATH, 'sitemap.xml'), sitemap);
      fs.writeFileSync(path.join(ROOT_PATH, 'robots.txt'), robotsTxt);
      console.log('✅ Copies created in project root.');
  } catch (e) {
      console.warn('⚠️ Could not copy to root:', e.message);
  }
}

generateSitemap();
