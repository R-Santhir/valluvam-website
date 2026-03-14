# Valluvam Website

Tamil Empowerment & Solidarity — valluvam.ca

## Project Structure

```
valluvam/
├── index.html              ← Homepage
├── about.html              ← About page (build next)
├── programs.html           ← Programs overview (build next)
├── activities.html         ← Activities & gallery (build next)
├── support.html            ← Support Us / Donate (build next)
├── pages/
│   ├── kudil-mempadu.html
│   ├── kumaran-kudil.html
│   ├── ara-vali.html
│   └── malarum-mangaiyar.html
├── css/
│   ├── design-system.css   ← Core tokens, typography, utilities
│   ├── nav-footer.css      ← Navigation & footer styles
│   └── home.css            ← Homepage-specific styles
├── js/
│   └── nav.js              ← Navigation behaviour, scroll reveals
└── assets/
    └── images/             ← Put all your photos here
        ├── community-hero.jpg
        ├── kudil-mempadu.jpg
        ├── kumaran-kudil.jpg
        ├── ara-vali.jpg
        ├── malarum-mangaiyar.jpg
        ├── gallery-1.jpg
        ├── gallery-2.jpg
        ├── gallery-3.jpg
        └── gallery-4.jpg
```

## Getting Started

### 1. Add your images
Export photos from Wix (Settings → Media Manager → download).
Rename and place them in `assets/images/` matching the filenames above.
Recommended dimensions: hero images at 1400×900px minimum, card images at 800×500px.

### 2. Open locally
Just open `index.html` in a browser — no build step needed for the base HTML/CSS.

### 3. Deploy to Netlify
1. Push this folder to a GitHub repository
2. Log in to netlify.com → "Add new site" → "Import from Git"
3. Select your repo, leave build settings blank (no build command needed for plain HTML)
4. Click Deploy — your site will be live in ~1 minute
5. Go to Domain Settings → add `valluvam.ca` as a custom domain
6. Update your DNS at your domain registrar: add a CNAME record pointing to your Netlify subdomain

### 4. Update charity number
In `index.html` footer, replace `[ADD YOUR NUMBER]` with your registered charity number.

### 5. Update social links
In `index.html` footer and nav, confirm the Instagram/Facebook/YouTube URLs are correct.

## Design System

Colors are defined as CSS variables in `css/design-system.css`:
- `--maroon-900` / `--maroon-950` — primary brand dark
- `--gold-400` / `--gold-500` — accent gold
- `--cream` / `--warm-white` — backgrounds

Fonts:
- **Cormorant Garamond** — headings (display serif, free via Google Fonts)
- **Outfit** — body text (clean, modern sans-serif, free via Google Fonts)

## Pages Still to Build
- [ ] about.html
- [ ] programs.html
- [ ] activities.html
- [ ] support.html
- [ ] pages/kudil-mempadu.html
- [ ] pages/kumaran-kudil.html
- [ ] pages/ara-vali.html
- [ ] pages/malarum-mangaiyar.html
