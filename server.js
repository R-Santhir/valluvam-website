/**
 * server.js — Static file server for DigitalOcean App Platform
 * Serves the built dist/ directory with proper routing.
 */

const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 8080;
const SITE = path.join(__dirname, 'dist');

// ── Startup check ──────────────────────────────────────────
// Fail immediately with a clear message if dist wasn't built
if (!fs.existsSync(SITE)) {
  console.error('❌ dist/ directory not found.');
  console.error('   Run "node build.js" before starting the server.');
  console.error(`   Expected path: ${SITE}`);
  process.exit(1);
}

if (!fs.existsSync(path.join(SITE, 'index.html'))) {
  console.error('❌ dist/index.html not found — build may have failed.');
  process.exit(1);
}

console.log(`📂 Serving static files from: ${SITE}`);

// ── Serve static assets ────────────────────────────────────
app.use(express.static(SITE, {
  extensions: ['html'],
  index: 'index.html',
  setHeaders: (res, filePath) => {
    // Cache static assets aggressively, HTML not at all
    if (filePath.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff2?)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// ── Clean URLs ─────────────────────────────────────────────
// /about      → dist/about.html
// /pages/xxx  → dist/pages/xxx.html
app.use((req, res, next) => {
  // Strip trailing slash
  const cleanPath = req.path.replace(/\/$/, '') || '/';

  const candidates = [
    path.join(SITE, cleanPath + '.html'),
    path.join(SITE, cleanPath, 'index.html'),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return res.sendFile(candidate);
    }
  }
  next();
});

// ── 404 ────────────────────────────────────────────────────
app.use((req, res) => {
  const notFound = path.join(SITE, '404.html');
  if (fs.existsSync(notFound)) {
    return res.status(404).sendFile(notFound);
  }
  res.status(404).send('Page not found');
});

// ── Start ──────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Valluvam site running → http://0.0.0.0:${PORT}`);
  console.log(`   Pages: ${fs.readdirSync(SITE).filter(f => f.endsWith('.html')).length} HTML files in root`);
});
