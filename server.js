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

  // Import SEO Data (Dynamically loaded to avoid build step issues in server file if possible,
  // but since we are using import/export in server.js (type: module), we can import relative to src if configured,
  // OR we just duplicate the logic/require it.
  // Ideally, we read the JSON or JS file. Since server.js is at root and src is nearby:

  // Note: Direct import from src might fail if not compiled, but in Vite 'type: module' environments it often works.
  // However, for safety in this specific environment, I will use dynamic import logic or read the file.
  // Let's try importing directly as we are in a module environment.
  const { getSeoForPath, getSchemaForPath } = await import('./src/data/seoData.js');

  // Ensure we catch all other routes for SPA/SSR
  app.use(async (req, res, next) => {
    const url = req.originalUrl

    try {
        // Determine SEO Data based on URL
        // Wrap in try-catch to prevent SEO logic from crashing the request
        let seoInfo;
        let schemaJson;
        try {
            seoInfo = getSeoForPath(url);
            schemaJson = JSON.stringify(getSchemaForPath(url));
        } catch (err) {
            console.error('SEO Data Error:', err);
            seoInfo = { title: 'gasmöller', description: '' };
            schemaJson = '{}';
        }

    const siteData = {
      title: seoInfo ? seoInfo.title : 'gasmöller',
      description: seoInfo ? seoInfo.description : '',
      content: '<!--app-html-->',
      schema: schemaJson // We will need to inject this into the template
    }

      let template, render, templatePath

      if (!isProd) {
        templatePath = path.resolve(__dirname, 'views/index.ejs')
        template = fs.readFileSync(templatePath, 'utf-8')

        // Inject Schema placeholder if not present in EJS (it might not be, so we might need to string replace)
        // Check if template has a place for schema. If not, we append it to head.
        if (!template.includes('<!--schema-json-->')) {
            template = template.replace('</head>', '<script type="application/ld+json"><!--schema-json--></script></head>');
        }

        // EJS Render
        try {
          // We render EJS with siteData.
          // Note: If index.ejs uses <%= title %>, this works.
          template = ejs.render(template, siteData)
        } catch (err) {
            console.error("EJS Error:", err);
            throw err;
        }

        // Manual Schema Injection if EJS didn't do it (or if we used the placeholder strategy above)
        template = template.replace('<!--schema-json-->', siteData.schema);

        // Vite Transform
        template = await vite.transformIndexHtml(url, template)

        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        templatePath = path.resolve(__dirname, 'dist/client/index.html')
        template = fs.readFileSync(templatePath, 'utf-8')

        // Production: We need to replace the placeholders.
        // Assuming dist/client/index.html is static, we replace the title/desc.
        // This is tricky if the static HTML already has a title.
        // Typically Vite SSG/SSR replaces <!--app-head--> or similar.
        // Here we will do simple string replacements.

        // Regex replace title
        template = template.replace(/<title>.*?<\/title>/, `<title>${siteData.title}</title>`);
        template = template.replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${siteData.description}"`);

        // Inject Schema
        if (!template.includes('<script type="application/ld+json">')) {
             template = template.replace('</head>', `<script type="application/ld+json">${siteData.schema}</script></head>`);
        }

        render = (await import('./dist/server/entry-server.js')).render
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
