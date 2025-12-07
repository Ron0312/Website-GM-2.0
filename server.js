import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import compression from 'compression'

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

        // Check if 404
        // If the returned URL is the homepage (SITE_URL), but the requested URL is NOT the homepage, it's a 404 fallback.
        // Valid homepage URLs: /, /start, /index.html
        // We assume SITE_URL is 'https://www.gasmoeller.de' as per memory/code.
        // We can check if seoInfo.url ends with the path or is just the base.

        const isHomeUrl = seoInfo.url === 'https://www.gasmoeller.de' || seoInfo.url === 'https://www.gasmoeller.de/';
        const isRequestHome = url === '/' || url === '/start' || url === '/index.html' || url.startsWith('/?');

        let is404 = false;
        if (isHomeUrl && !isRequestHome) {
             is404 = true;
        }

        // If 404, we prefer serving the static 404.html if in production
        if (isProd && is404) {
             const path404 = path.join(__dirname, 'dist/client', '404.html');
             if (fs.existsSync(path404)) {
                 const html404 = fs.readFileSync(path404, 'utf-8');
                 return res.status(404).set({ 'Content-Type': 'text/html' }).end(html404);
             }
        }

    // Construct Meta Tags
    const isHomePage = url === '/' || url === '/index.html';
    const preloadLink = isHomePage ? '<link rel="preload" as="image" href="/images/gas-order-hero.webp" fetchpriority="high">' : '';

    const metaTags = `
    ${preloadLink}
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
        if (fs.existsSync(templatePath)) {
             template = fs.readFileSync(templatePath, 'utf-8')
        } else {
            template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
        }

        template = template.replace(/<title>.*?<\/title>/, `<title>${siteData.title}</title>`);
        if (template.includes('<meta name="description"')) {
            template = template.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${siteData.description}">`);
        } else {
            template = template.replace('</head>', `<meta name="description" content="${siteData.description}"></head>`);
        }
        template = template.replace('</head>', `${siteData.metaTags}</head>`);
        template = template.replace('</head>', `<script type="application/ld+json">${siteData.schema}</script></head>`);

        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        templatePath = path.resolve(__dirname, 'dist/client/index.html')
        template = fs.readFileSync(templatePath, 'utf-8')

        // Optimization: Try to find pre-rendered file first (if express.static didn't catch it)
        // This handles cases like /tanks/slug where express.static might miss if not configured with extensions
        // But we rely on SSR for dynamic things or if file missing.

        render = (await import('./dist/server/entry-server.js')).render

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

      // Set 404 status if we determined it's a 404
      if (is404) {
          res.status(404).set({ 'Content-Type': 'text/html' }).end(htmlResponse)
      } else {
          res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlResponse)
      }

    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      // Even in error, try to send a valid response if possible, or just 500
      res.status(500).end(e.stack)
    }
  })

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })
}

createServer()
