import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Use dynamic imports for local source files to ensure we use the fresh versions or standard ES modules
// Note: We are assuming these files are pure JS and don't import CSS/Images which Node would fail on.
// If they did, we would need to rely on the built version or mock them.
// Checked: tanks.js and seoData.js are pure JS.
import { tankDetails } from './src/data/tanks.js';
import { getSeoForPath, getSchemaForPath } from './src/data/seoData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = await fs.readFile(toAbsolute('dist/client/index.html'), 'utf-8');
const { render } = await import('./dist/server/entry-server.js');

// Define routes to prerender
const routesToPrerender = [
    '/',
    '/start',
    '/tanks',
    '/gas',
    '/rechner',
    '/gewerbe',
    '/wissen',
    '/ueber-uns',
    '/kontakt',
    '/pruefungen'
];

// Add dynamic tank routes
tankDetails.forEach(tank => {
    routesToPrerender.push(`/tanks/${tank.slug}`);
});

console.log(`Starting prerender for ${routesToPrerender.length} routes...`);

(async () => {
  for (const url of routesToPrerender) {
    try {
        // 1. Render the app HTML
        const context = {};
        const appHtml = render(url, context);
        // Note: entry-server.jsx render returns { html } object
        const html = appHtml.html;

        // 2. Get SEO Data
        const seoInfo = getSeoForPath(url);
        const schemaJson = JSON.stringify(getSchemaForPath(url));

        // 3. Inject into template
        let rendered = template.replace('<!--app-html-->', html);

        // Replace Title
        // Use regex to be safe against existing title tag content
        rendered = rendered.replace(/<title>.*?<\/title>/, `<title>${seoInfo.title}</title>`);

        // Replace Description
        // If meta description exists, replace content. If not, append to head (though index.html usually has it).
        if (rendered.includes('<meta name="description"')) {
            rendered = rendered.replace(
                /<meta name="description" content=".*?"/,
                `<meta name="description" content="${seoInfo.description}"`
            );
        } else {
            rendered = rendered.replace('</head>', `<meta name="description" content="${seoInfo.description}"></head>`);
        }

        // Inject Schema.org JSON-LD
        // We append it before closing head
        rendered = rendered.replace('</head>', `<script type="application/ld+json">${schemaJson}</script></head>`);

        // 4. Determine output path
        let filePath = `dist/client${url === '/' ? '/index.html' : `${url}/index.html`}`;

        // Ensure directory exists
        const dir = path.dirname(toAbsolute(filePath));
        await fs.mkdir(dir, { recursive: true });

        // 5. Write file
        await fs.writeFile(toAbsolute(filePath), rendered);
        console.log(`Generated: ${filePath}`);

    } catch (e) {
        console.error(`Error prerendering ${url}:`, e);
    }
  }

  console.log('Prerender complete.');
  // Optional: Remove dist/server if you want a clean static output
  // await fs.rm(toAbsolute('dist/server'), { recursive: true, force: true });
})();
