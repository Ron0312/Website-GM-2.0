import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tankDetails } from '../src/data/tanks.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const ROOT_PATH = path.resolve(__dirname, '../');
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

  // Write to public folder (for Dev and Vite copy)
  fs.writeFileSync(path.join(PUBLIC_PATH, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated at public/sitemap.xml');

  // Write to Root folder (for Production fallback and Nginx/Passenger serving)
  fs.writeFileSync(path.join(ROOT_PATH, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap copied to root/sitemap.xml');

  // Also copy robots.txt to root if it exists
  const robotsSrc = path.join(PUBLIC_PATH, 'robots.txt');
  const robotsDest = path.join(ROOT_PATH, 'robots.txt');
  if (fs.existsSync(robotsSrc)) {
    fs.copyFileSync(robotsSrc, robotsDest);
    console.log('✅ Robots.txt copied to root/robots.txt');
  }
}

generateSitemap();
