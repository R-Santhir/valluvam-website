/**
 * server.js — Static file server for DigitalOcean App Platform
 * Serves the built _site/ directory with proper routing.
 */

const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 8080;
const SITE = path.join(__dirname, '_site');

// Serve static files from _site/
app.use(express.static(SITE, {
  extensions: ['html'],   // try .html if no extension given
  index: 'index.html',
}));

// Clean URLs — /about → /about.html
app.use((req, res, next) => {
  const filePath = path.join(SITE, req.path + '.html');
  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }
  // Try /path/index.html
  const indexPath = path.join(SITE, req.path, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  next();
});

// 404 fallback
app.use((req, res) => {
  const notFound = path.join(SITE, '404.html');
  if (fs.existsSync(notFound)) {
    return res.status(404).sendFile(notFound);
  }
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`Valluvam site running on port ${PORT}`);
});
