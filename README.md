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

### Adding images
Images are hosted on cloudinary, these assets are linked to this website.
They are stored in the following directory structure:
valluvam
├── communities
│   ├── bangkok
│   ├── kallaripu-verukal
│   ├── karungkali-cholai
│   ├── kuala-lumpur
│   ├── medan
│   ├── puthur-kathiraveli
├── directors
├── events
├── programs
│   ├── ara-vali
│   ├── kudil-mempadu
│   ├── kumaran-kudil
│   ├── malarum-mangaiyar

## Design System

Colors are defined as CSS variables in `css/design-system.css`:
- `--maroon-900` / `--maroon-950` — primary brand dark
- `--gold-400` / `--gold-500` — accent gold
- `--cream` / `--warm-white` — backgrounds

Fonts:
- **Cormorant Garamond** — headings (display serif, free via Google Fonts)
- **Outfit** — body text (clean, modern sans-serif, free via Google Fonts)
