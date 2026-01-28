## 2025-01-27 - Path Traversal in Server.js
**Vulnerability:** Found a Path Traversal (Local File Inclusion) vulnerability in `server.js` where user input (`req.originalUrl`) was used to construct a file path using `path.join` without sufficient validation, allowing access to files outside the intended static directory (e.g., `../../package.json`).
**Learning:** `path.join` resolves relative segments (`..`) and does not sandbox the path. Even with URI decoding, relying on `path.join` with user input is dangerous.
**Prevention:** Always use `path.resolve` to create an absolute path and then verify that the result starts with the expected root directory using `startsWith`. Additionally, sanitizing the input to remove traversal characters (`..`, `\0`) adds depth to the defense.

## 2026-01-28 - Reflected XSS in Server-Side Rendering
**Vulnerability:** Found a Reflected Cross-Site Scripting (XSS) vulnerability in `server.js` where `req.originalUrl` was directly reflected into Open Graph meta tags and JSON-LD schema without sanitization. An attacker could craft a URL containing `"><script>alert(1)</script>` (or `</script>` for JSON-LD) to execute arbitrary JavaScript in the victim's browser.
**Learning:** Even in SSR contexts, reflecting the URL into the HTML template requires strict escaping. `JSON.stringify` is insufficient for embedding JSON into `<script>` tags because it does not escape `<` characters, allowing attackers to break out of the script block using `</script>`.
**Prevention:** Always use an HTML escaping function (like `escapeXml`) for any variable interpolated into HTML attributes. For JSON-LD or data embedded in `<script>` tags, sanitize the JSON string by replacing `<` with `\u003c` to prevent tag breakout.
