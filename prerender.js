// Pre-render script for SSG
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tankDetails } from './src/data/tanks.js';
import { getSeoForPath, getSchemaForPath } from './src/data/seoData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

// Ensure dist/client exists
if (!fs.existsSync(toAbsolute('dist/client'))) {
    console.error("Error: dist/client does not exist. Please run 'npm run build:client' first.");
    process.exit(1);
}

const template = fs.readFileSync(toAbsolute('dist/client/index.html'), 'utf-8');
const { render } = await import('./dist/server/entry-server.js');

// Define routes to pre-render
const routesToPrerender = [
    '/',
    '/start',
    '/gas',
    '/tanks',
    '/wissen',
    '/gewerbe',
    '/ueber-uns',
    '/kontakt',
    '/rechner',
    '/pruefungen',
    '/barrierefreiheit',
    // Dynamic routes
    ...tankDetails.map(t => `/tanks/${t.slug}`)
];

// Add 404 route specifically
const routesWith404 = [...routesToPrerender, '/404'];

(async () => {
    // Determine output directory
    const distClient = toAbsolute('dist/client');
    const sitemapUrls = [];

    for (const url of routesWith404) {
        // Render app HTML
        // Note: '404' is not a valid section in App.jsx switch, so it falls to default (NotFound)
        const context = {};
        const { html } = render(url, context);

        // Get SEO Data
        const seoData = getSeoForPath(url);
        const schemaData = getSchemaForPath(url);

        // Inject into template
        let pageHtml = template.replace('<!--app-html-->', html);

        // --- SEO Injection ---

        // 1. Title
        if (seoData.title) {
            pageHtml = pageHtml.replace(/<title>.*?<\/title>/, `<title>${seoData.title}</title>`);
        }

        // 2. Meta Description
        if (seoData.description) {
            const descTag = `<meta name="description" content="${seoData.description}">`;
            if (pageHtml.includes('<meta name="description"')) {
                pageHtml = pageHtml.replace(/<meta name="description" content=".*?">/, descTag);
            } else {
                pageHtml = pageHtml.replace('</head>', `${descTag}</head>`);
            }
        }

        // 3. Open Graph & Twitter Cards
        const ogTags = `
    <meta property="og:type" content="${seoData.type || 'website'}" />
    <meta property="og:title" content="${seoData.title}" />
    <meta property="og:description" content="${seoData.description}" />
    <meta property="og:url" content="${seoData.url}" />
    <meta property="og:image" content="${seoData.image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${seoData.title}" />
    <meta name="twitter:description" content="${seoData.description}" />
    <meta name="twitter:image" content="${seoData.image}" />
    <link rel="canonical" href="${seoData.url}" />
        `;
        pageHtml = pageHtml.replace('</head>', `${ogTags}</head>`);

        // 4. Schema.org JSON-LD
        const schemaScript = `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>`;
        pageHtml = pageHtml.replace('</head>', `${schemaScript}</head>`);

        // --- File Writing ---

        // Determine file path
        let fileName = url === '/' ? 'index.html' : `${url === '/start' ? 'index' : url.substring(1)}.html`;

        // Handle nested routes (e.g. /tanks/slug)
        if (url.split('/').length > 2) {
             const parts = url.split('/').filter(p => p);
             const dir = parts.slice(0, -1).join('/');
             const file = parts[parts.length - 1];

             const targetDir = path.join(distClient, dir);
             if (!fs.existsSync(targetDir)) {
                 fs.mkdirSync(targetDir, { recursive: true });
             }
             fileName = `${dir}/${file}.html`;
        }

        const filePath = path.join(distClient, fileName);

        console.log(`Prerendering ${url} to ${fileName}...`);
        fs.writeFileSync(filePath, pageHtml);

        // Add to sitemap list (skip duplicate /start if / is present, or keep both? Canonical handles it)
        // We will prefer the cleaner URLs (no /start if / is there, but here we render both)
        // Let's rely on canonicals.
        // Also exclude 404 from sitemap
        if (url !== '/start' && url !== '/404') { // Skip /start as it is same as /
             sitemapUrls.push(seoData.url);
        } else if (url === '/' && !sitemapUrls.includes(seoData.url)) {
             sitemapUrls.push(seoData.url);
        }
    }

    // --- Generate Sitemap.xml ---
    console.log('Generating sitemap.xml...');
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url>
    <loc>${u}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u === 'https://www.gasmoeller.de' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(distClient, 'sitemap.xml'), sitemapContent);

    console.log('Prerendering complete.');
})();
