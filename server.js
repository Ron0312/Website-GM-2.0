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

  const siteData = {
    title: 'gasmöller - Ihr Partner für Flüssiggas im Norden',
    description: 'Unabhängig. Fair. Norddeutsch. Flüssiggastanks kaufen statt mieten. Ihr Experte seit 2005.',
    content: '<!--app-html-->'
  }

  app.use(async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template, render, templatePath

      if (!isProd) {
        templatePath = path.resolve(__dirname, 'views/index.ejs')
        template = fs.readFileSync(templatePath, 'utf-8')

        // Debugging: Ensure template is read
        // console.log("Template read:", template.substring(0, 100));

        // EJS Render
        try {
          template = ejs.render(template, siteData)
          // console.log("EJS Rendered:", template.substring(0, 100));
        } catch (err) {
            console.error("EJS Error:", err);
            throw err;
        }

        // Vite Transform
        template = await vite.transformIndexHtml(url, template)

        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        templatePath = path.resolve(__dirname, 'dist/client/index.html')
        template = fs.readFileSync(templatePath, 'utf-8')
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
