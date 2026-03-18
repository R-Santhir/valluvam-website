#!/usr/bin/env node

/**
 * Valluvam Static Site Builder
 * Reads _data/ JSON files and injects content into HTML templates.
 * Run: node build.js
 * Netlify runs this automatically on every deploy via package.json build script.
 */

const fs   = require('fs');
const path = require('path');

const ROOT = __dirname;
const DATA = path.join(ROOT, '_data');
const DIST = path.join(ROOT, 'public');

/* ─── Helpers ─────────────────────────────────────────────── */

function readJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.warn(`  ⚠ Could not read ${filePath}: ${e.message}`);
    return null;
  }
}

function readDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => readJSON(path.join(dir, f)))
    .filter(Boolean);
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach(file => {
    const srcPath  = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

function readHTML(relPath) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) {
    console.warn(`  ⚠ Template not found: ${relPath}`);
    return null;
  }
  return fs.readFileSync(full, 'utf8');
}

function writeHTML(relPath, content) {
  const full = path.join(DIST, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  console.log(`  ✓ ${relPath}`);
}

/* Escape text safely for HTML output */
function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* Simple token replacement: {{token}} */
function inject(html, tokens) {
  return html.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    key in tokens ? tokens[key] : `{{${key}}}`
  );
}

/* ─── Load all data ────────────────────────────────────────── */

console.log('\n🔨 Valluvam build starting…\n');

const settings  = readJSON(path.join(DATA, 'settings.json')) || {};
const directors = readDir(path.join(DATA, 'directors')).sort((a, b) => (a.order || 99) - (b.order || 99));
const events    = readDir(path.join(DATA, 'events')).sort((a, b) => new Date(b.date) - new Date(a.date));
const stories   = readDir(path.join(DATA, 'stories')).filter(s => s.published !== false);
const gallery   = readDir(path.join(DATA, 'gallery'));

const programs = {
  'kudil-mempadu':    readJSON(path.join(DATA, 'programs/kudil-mempadu.json'))    || {},
  'kumaran-kudil':    readJSON(path.join(DATA, 'programs/kumaran-kudil.json'))    || {},
  'ara-vali':         readJSON(path.join(DATA, 'programs/ara-vali.json'))         || {},
  'malarum-mangaiyar':readJSON(path.join(DATA, 'programs/malarum-mangaiyar.json'))|| {},
};

const communities = {
  'puthur-kathiraveli': readJSON(path.join(DATA, 'communities/puthur-kathiraveli.json')) || {},
  'karungkali-cholai':  readJSON(path.join(DATA, 'communities/karungkali-cholai.json'))  || {},
  'kallaripu-verukal':  readJSON(path.join(DATA, 'communities/kallaripu-verukal.json'))  || {},
  'medan':              readJSON(path.join(DATA, 'communities/medan.json'))              || {},
  'bangkok':            readJSON(path.join(DATA, 'communities/bangkok.json'))            || {},
  'kuala-lumpur':       readJSON(path.join(DATA, 'communities/kuala-lumpur.json'))       || {},
};

/* ─── Snippet generators ───────────────────────────────────── */

function buildDirectorCard(d, delay) {
  const delayClass = delay ? ` animate-delay-${delay}` : '';
  const photo = d.photo
    ? `<img src="${esc(d.photo)}" alt="${esc(d.name)}" />`
    : `<div class="director-photo-placeholder"><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`;
  const linkedin = d.linkedin
    ? `<div class="director-social"><a href="${esc(d.linkedin)}" aria-label="LinkedIn" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a></div>`
    : '';
  return `
      <div class="director-card reveal${delayClass}">
        <div class="director-photo">${photo}</div>
        <h4>${esc(d.name)}</h4>
        <p class="role">${esc(d.role)}</p>
        <p>${esc(d.bio)}</p>
        ${linkedin}
      </div>`;
}

function buildDirectorsGrid(directors) {
  const delays = [0, 1, 2, 3, 0, 1, 2, 3];
  return directors.map((d, i) => buildDirectorCard(d, delays[i])).join('\n');
}

function buildEventCard(ev) {
  const d    = new Date(ev.date + 'T00:00:00');
  const mon  = d.toLocaleString('en', { month: 'short' }).toUpperCase();
  const day  = d.getDate();
  const year = d.getFullYear();
  const statusClass = ev.status === 'upcoming' ? 'event-tag--upcoming' : 'event-tag--past';
  const statusLabel = ev.status === 'upcoming' ? 'Upcoming' : 'Past';
  const typeTag     = ev.type === 'virtual' ? '<span class="event-tag event-tag--virtual" style="margin-left:var(--space-2);">Virtual</span>' : '';
  const featured    = ev.status === 'upcoming' ? ' style="border-color:rgba(240,192,64,0.3); background:var(--cream);"' : '';
  const darkDate    = ev.status === 'past' ? ' style="background:var(--maroon-800); opacity:0.7;"' : '';
  const signup      = ev.signup_url
    ? `<a href="${esc(ev.signup_url)}" class="btn btn-primary" target="_blank" rel="noopener" style="margin-top:var(--space-3); padding:0.5rem 1.25rem; font-size:0.8125rem;">Sign Up</a>`
    : '';
  // Photo strip — supports single image or multiple photos array
  let photos = [];
  if (ev.photos) {
    photos = Array.isArray(ev.photos) ? ev.photos : [ev.photos];
  }
  if (!photos.length && ev.image) {
    photos = Array.isArray(ev.image) ? ev.image : [ev.image];
  }

  let eventMedia = '';
  if (photos.length === 1) {
    eventMedia = `
      <div style="height:160px;overflow:hidden;border-radius:6px 6px 0 0;margin:-24px -24px 16px;background:var(--maroon-800);">
        <img src="${esc(photos[0])}" alt="${esc(ev.title)}" style="width:100%;height:100%;object-fit:cover;opacity:0.85;" loading="lazy" />
      </div>`;
  } else if (photos.length > 1) {
    const thumbs = photos.map(p => `
      <div style="flex:0 0 120px;height:90px;overflow:hidden;border-radius:4px;background:var(--maroon-800);">
        <img src="${esc(p)}" alt="${esc(ev.title)}" style="width:100%;height:100%;object-fit:cover;opacity:0.85;" loading="lazy" />
      </div>`).join('');
    eventMedia = `
      <div style="display:flex;gap:6px;overflow-x:auto;margin:-24px -24px 16px;padding:0 16px;scrollbar-width:none;-webkit-overflow-scrolling:touch;">
        ${thumbs}
      </div>`;
  }
  return `
        <div class="event-card reveal"${featured}>
          ${eventMedia}
          <div class="event-date-block"${darkDate}>
            <span class="month">${mon}</span>
            <span class="day">${day}</span>
            <span class="year">${year}</span>
          </div>
          <div class="event-info">
            <span class="event-tag ${statusClass}">${statusLabel}</span>${typeTag}
            <h4>${esc(ev.title)}</h4>
            <p>${esc(ev.description)}</p>
            <div class="event-meta">
              <span class="event-meta-item">
                <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ${esc(ev.location)}
              </span>
            </div>
            ${signup}
          </div>
        </div>`;
}

function buildEventsHTML(events) {
  if (!events.length) return '<p style="color:var(--text-muted); padding:var(--space-8) 0;">No events at this time — check back soon.</p>';
  return events.map(buildEventCard).join('\n');
}

function buildGalleryHTML(gallery) {
  const items = gallery.map(item => `
        <div class="photo-gallery-item reveal" data-category="${esc(item.category)}">
          <img src="${esc(item.image)}" alt="${esc(item.alt || item.title)}" loading="lazy" />
          <div class="photo-gallery-item-overlay">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
        </div>`).join('\n');

  const placeholder = `
      <div class="gallery-add-note">
        <strong>To add photos:</strong> use the CMS at <code>/admin</code> → Photo Gallery, or place images in <code>assets/images/gallery/</code> and add entries via the CMS.
      </div>`;

  return items + (gallery.length === 0 ? placeholder : '');
}

function buildProgramStats(stats) {
  if (!stats || !stats.length) return '';
  return stats.map(s => `
        <div class="program-stat">
          <span class="stat-number">${esc(s.number)}</span>
          <p class="stat-label">${esc(s.label)}</p>
        </div>`).join('\n');
}

function buildFooterLinks(settings) {
  return `
        <span>© ${new Date().getFullYear()} Valluvam. Registered non-profit, Canada.</span>
        <span>Registered Charity No. ${esc(settings.charity_number || '726289739RR0001')}</span>`;
}

/* ─── Replace injection markers in HTML ───────────────────── */
/*
 * HTML pages contain special comment markers:
 *   <!-- CMS:directors -->
 *   <!-- CMS:events -->
 *   <!-- CMS:gallery -->
 *   <!-- CMS:program-stats:kudil-mempadu -->
 *   <!-- CMS:footer-bottom -->
 * The build script replaces everything between
 *   <!-- CMS:key --> ... <!-- /CMS:key -->
 * with fresh generated content.
 */

function injectBlock(html, key, newContent) {
  const open  = `<!-- CMS:${key} -->`;
  const close = `<!-- /CMS:${key} -->`;
  const start = html.indexOf(open);
  const end   = html.indexOf(close);
  if (start === -1 || end === -1) return html; // marker not present — skip
  return html.slice(0, start + open.length) + '\n' + newContent + '\n      ' + html.slice(end);
}

/* ─── Copy static assets ───────────────────────────────────── */

console.log('📁 Copying static files…');
fs.mkdirSync(DIST, { recursive: true });

// Copy all HTML, CSS, JS, assets — but skip _data, admin source, node_modules, _site
const SKIP = new Set(['_data', '_site', 'dist', 'public', 'node_modules', '.git', 'build.js', 'package.json', 'package-lock.json', 'server.js', '.do']);

fs.readdirSync(ROOT).forEach(item => {
  if (SKIP.has(item)) return;
  const src  = path.join(ROOT, item);
  const dest = path.join(DIST, item);
  if (fs.statSync(src).isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
});

/* ─── Process HTML files ───────────────────────────────────── */

console.log('\n📄 Processing HTML pages…');

/* Helper: process a single HTML file with injections */
function processPage(srcRel, destRel, injections) {
  let html = readHTML(srcRel);
  if (!html) return;

  // Apply all CMS block injections
  Object.entries(injections).forEach(([key, content]) => {
    html = injectBlock(html, key, content);
  });

  // Always inject footer bottom
  html = injectBlock(html, 'footer-bottom', buildFooterLinks(settings));

  writeHTML(destRel, html);
}

/* about.html — directors grid */
processPage('about.html', 'about.html', {
  'directors': buildDirectorsGrid(directors),
});

/* activities.html — events + gallery */
processPage('activities.html', 'activities.html', {
  'events':  buildEventsHTML(events),
  'gallery': buildGalleryHTML(gallery),
});

/* Program pages — stats */
['kudil-mempadu', 'kumaran-kudil', 'ara-vali', 'malarum-mangaiyar'].forEach(slug => {
  const prog = programs[slug];
  processPage(`pages/${slug}.html`, `pages/${slug}.html`, {
    [`program-stats:${slug}`]: buildProgramStats(prog.stats),
  });
});

/* Community pages — about text */
Object.entries(communities).forEach(([slug, data]) => {
  processPage(`pages/${slug}.html`, `pages/${slug}.html`, {
    'community-about': data.about
      ? `<p>${esc(data.about)}</p>`
      : '<p>Content about this community is being gathered. Check back soon.</p>',
  });
});

/* All remaining HTML pages — just inject footer */
const processed = new Set([
  'about.html', 'activities.html',
  ...['kudil-mempadu','kumaran-kudil','ara-vali','malarum-mangaiyar'].map(s => `pages/${s}.html`),
  ...Object.keys(communities).map(s => `pages/${s}.html`),
]);

function findHTML(dir, base) {
  const results = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    const rel  = path.relative(ROOT, full);
    if (fs.statSync(full).isDirectory()) {
      if (!SKIP.has(f)) results.push(...findHTML(full, base));
    } else if (f.endsWith('.html') && !processed.has(rel)) {
      results.push(rel);
    }
  });
  return results;
}

findHTML(ROOT, ROOT).forEach(rel => {
  let html = readHTML(rel);
  if (!html) return;
  html = injectBlock(html, 'footer-bottom', buildFooterLinks(settings));
  writeHTML(rel, html);
});

// Validate build output
const siteIndex = path.join(DIST, 'index.html');
const siteCss   = path.join(DIST, 'css', 'design-system.css');
const siteAssets = path.join(DIST, 'assets');

if (!fs.existsSync(siteIndex)) {
  console.error('❌ Build failed: public/index.html missing');
  process.exit(1);
}
if (!fs.existsSync(siteCss)) {
  console.error('❌ Build failed: public/css/design-system.css missing');
  process.exit(1);
}
if (!fs.existsSync(siteAssets)) {
  console.error('❌ Build failed: public/assets/ missing');
  process.exit(1);
}

const pageCount = fs.readdirSync(DIST).filter(f => f.endsWith('.html')).length;
console.log(`\n✅ Build complete → public/  (${pageCount} root pages, assets copied)\n`);
