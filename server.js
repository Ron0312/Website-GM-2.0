import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import compression from 'compression'
import ejs from 'ejs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()
  const port = process.env.PORT || 5173

  const isProd = process.env.NODE_ENV === 'production'

  let vite
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite')
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })
    app.use(vite.middlewares)
  } else {
    app.use(compression())
    app.use(
      '/',
      express.static(path.resolve(__dirname, 'dist/client'), {
        index: false,
      })
    )
  }

  // Import SEO Data
  // Dynamic import to handle module context
  const { getSeoForPath, getSchemaForPath } = await import('./src/data/seoData.js');

  app.use(async (req, res) => {
    const url = req.originalUrl

    try {
        // Determine SEO Data based on URL
        let seoInfo;
        let schemaJson;
        try {
            seoInfo = getSeoForPath(url);
            schemaJson = JSON.stringify(getSchemaForPath(url));
        } catch (err) {
            console.error('SEO Data Error:', err);
            seoInfo = {
                title: 'gasmöller',
                description: '',
                image: '',
                url: '',
                type: 'website'
            };
            schemaJson = '{}';
        }

    // Construct Meta Tags
    const metaTags = `
    <meta property="og:type" content="${seoInfo.type || 'website'}" />
    <meta property="og:title" content="${seoInfo.title}" />
    <meta property="og:description" content="${seoInfo.description}" />
    <meta property="og:url" content="${seoInfo.url}" />
    <meta property="og:image" content="${seoInfo.image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${seoInfo.title}" />
    <meta name="twitter:description" content="${seoInfo.description}" />
    <meta name="twitter:image" content="${seoInfo.image}" />
    <link rel="canonical" href="${seoInfo.url}" />
    `;

    const siteData = {
      title: seoInfo.title,
      description: seoInfo.description,
      content: '<!--app-html-->',
      schema: schemaJson,
      metaTags: metaTags
    }

      let template, render, templatePath

      if (!isProd) {
        templatePath = path.resolve(__dirname, 'views/index.ejs')
        // Check if ejs view exists, otherwise fallback to index.html pattern
        if (fs.existsSync(templatePath)) {
             template = fs.readFileSync(templatePath, 'utf-8')
             // EJS Render logic...
             // For brevity and consistency, let's assume index.html via Vite is the main path for Dev as well,
             // unless views/index.ejs is specifically used.
             // The original code tried ejs first.
             // If we use index.html in dev, we need to inject manually like in prerender.
        } else {
            // Fallback to src/index.html
            template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
        }

        // Inject logic for Dev (simulating Prerender logic)
        // 1. Title
        template = template.replace(/<title>.*?<\/title>/, `<title>${siteData.title}</title>`);

        // 2. Meta Desc (Regex replace or append)
        if (template.includes('<meta name="description"')) {
            template = template.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${siteData.description}">`);
        } else {
            template = template.replace('</head>', `<meta name="description" content="${siteData.description}"></head>`);
        }

        // 3. Meta Tags (OG/Twitter)
        template = template.replace('</head>', `${siteData.metaTags}</head>`);

        // 4. Schema
        template = template.replace('</head>', `<script type="application/ld+json">${siteData.schema}</script></head>`);

        // Vite Transform
        template = await vite.transformIndexHtml(url, template)

        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        templatePath = path.resolve(__dirname, 'dist/client/index.html')
        template = fs.readFileSync(templatePath, 'utf-8')

        // In Prod with SSG, the HTML might already be pre-rendered.
        // If we are using this server to serve dynamic content or fallback, we might need to inject.
        // However, if we use `express.static` above for dist/client, this block might only be reached for 404s or non-static routes.
        // But the `express.static` has `index: false`, so root / hits this handler.
        // So we are serving the file, but we want to potentially Hydrate it?
        // Actually, for SSG, we should just serve the file from disk if it exists.
        // But `server.js` here seems to be designed for SSR (rendering on demand).
        // If we want "High-End SEO" with SSG, we should trust the pre-rendered HTML files.
        // BUT, the existing logic re-renders.

        // If the file exists in dist/client (e.g. gas.html), we should serve it directly?
        // The current logic loads `dist/client/index.html` (the template) and re-renders using SSR.
        // This defeats the purpose of SSG if we do it for every request.
        // Ideally: Check if pre-rendered file exists -> Serve it.
        // If not -> SSR.

        // Let's implement that check for "High End" performance.
        let tryFile = url === '/' ? 'index.html' : (url.endsWith('/') ? url + 'index.html' : url + '.html');
        // Handle tank slugs /tanks/slug -> /tanks/slug.html
        if (!tryFile.endsWith('.html') && !tryFile.includes('.')) tryFile += '.html';

        const possibleStaticPath = path.join(__dirname, 'dist/client', tryFile.replace(/^\//, ''));
        if (fs.existsSync(possibleStaticPath)) {
            return res.sendFile(possibleStaticPath);
        }

        // If not found statically, proceed to SSR (e.g. for dynamic routes not pre-rendered)
        render = (await import('./dist/server/entry-server.js')).render

        // We need to inject tags into the template again if we are SSR-ing
        template = template.replace(/<title>.*?<\/title>/, `<title>${siteData.title}</title>`);
        if (template.includes('<meta name="description"')) {
            template = template.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${siteData.description}">`);
        } else {
            template = template.replace('</head>', `<meta name="description" content="${siteData.description}"></head>`);
        }
        template = template.replace('</head>', `${siteData.metaTags}</head>`);
        template = template.replace('</head>', `<script type="application/ld+json">${siteData.schema}</script></head>`);
      }

      const { html } = render(url)
      const htmlResponse = template.replace('<!--app-html-->', html)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlResponse)
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })
}

createServer()
