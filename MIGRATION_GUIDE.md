# Migration Guide: Switching to Static Hosting on Plesk

This guide explains how to switch your **gasmöller** website from a Node.js/Passenger application to a pure Static Hosting configuration. This resolves the stability issues ("Web application could not be started") and ensures fast, reliable delivery.

## Why this change?

- **Stability**: Removes the Phusion Passenger Node.js process, eliminating startup crashes.
- **Performance**: Static files are served directly by Apache/Nginx, which is significantly faster.
- **SEO**: All pages are pre-rendered (Static Site Generation), ensuring Google can crawl them perfectly.

---

## Step 1: Prepare the Codebase

1. Ensure the new `public/.htaccess` file is included in your deployment.
   - This file contains all necessary Redirects, Security Headers, and Rewrite Rules for the static site.
2. Ensure your build script runs `npm run prerender`.
   - Your `package.json` already does this: `"build": "... && npm run prerender"`.

## Step 2: Configure Plesk

Follow these steps in your Plesk Control Panel:

1. **Disable Node.js**
   - Go to **Websites & Domains** -> **Node.js**.
   - Click **Disable Node.js** (or switch the "Node.js" toggle to off).
   - This prevents Passenger from trying to start `server.js`.

2. **Set Document Root**
   - Go to **Hosting Settings**.
   - Change **Document Root** to: `httpdocs` (or your deployment folder).
   - **Crucial**: Ensure the contents of `dist/client` are what ends up in this folder.
     - *Option A (Typical)*: Your deployment script copies `dist/client/*` to `httpdocs/`.
     - *Option B (Plesk Git)*: Point Document Root directly to `/httpdocs/dist/client` if you deploy the whole repo to `httpdocs`.
     - *Recommendation*: If you use Plesk's "Git" feature, the files are in a repo folder. Set the Document Root to match where the build output (`dist/client`) is located. E.g., `/httpdocs/dist/client` or simply copy the build artifacts to the root.

3. **Check Apache & Nginx Settings**
   - Go to **Apache & nginx Settings**.
   - Ensure **Proxy mode** is checked (Nginx proxies to Apache).
   - Ensure **Serve static files directly by nginx** is **checked** for extensions like `jpg, jpeg, png, webp, svg, css, js`.
     - *Note*: Do **not** include `html` in the list if you want Apache's `.htaccess` to handle the clean URL rewrites (e.g. `/kontakt` -> `/kontakt.html`). If Nginx handles HTML, it might skip `.htaccess`. Safest is to let Apache handle `.html` and extensionless requests.

## Step 3: Deployment Workflow

When you deploy (via Git or manually):

1. **Install Dependencies**: `npm ci`
2. **Build**: `npm run build`
   - This generates the static site in `dist/client`.
   - It also copies `public/.htaccess` to `dist/client/.htaccess`.
3. **Publish**:
   - Ensure the content of `dist/client` is served.
   - If using Plesk Git, you might need a "Post-deployment action" like:
     ```bash
     npm ci
     npm run build
     # Optional: Sync to public root if needed
     # rsync -av dist/client/ httpdocs/
     ```

## Verification

1. **Direct Link**: Visit `https://gasmoeller.de/kontakt`. It should load instantly without error.
2. **Redirects**: Visit `https://gasmoeller.de/impressum`. It should redirect to `/`.
3. **SEO**: Visit `https://gasmoeller.de/sitemap.xml`. It should exist.

---

**Troubleshooting**

- **404 on deep links?**
  - Check if `.htaccess` is present in the document root.
  - Ensure `AllowOverride All` is enabled in Apache (standard on Plesk).
- **"Forbidden" error?**
  - Ensure permissions on `dist/client` folders are 755 and files are 644.
