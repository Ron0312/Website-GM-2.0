## 2025-01-27 - Path Traversal in Server.js
**Vulnerability:** Found a Path Traversal (Local File Inclusion) vulnerability in `server.js` where user input (`req.originalUrl`) was used to construct a file path using `path.join` without sufficient validation, allowing access to files outside the intended static directory (e.g., `../../package.json`).
**Learning:** `path.join` resolves relative segments (`..`) and does not sandbox the path. Even with URI decoding, relying on `path.join` with user input is dangerous.
**Prevention:** Always use `path.resolve` to create an absolute path and then verify that the result starts with the expected root directory using `startsWith`. Additionally, sanitizing the input to remove traversal characters (`..`, `\0`) adds depth to the defense.
