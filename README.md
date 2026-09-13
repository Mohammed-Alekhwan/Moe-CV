# Moe — Mohammed Alekhwan

A completely rebuilt portfolio in **Next.js App Router**, React, Three.js, and GSAP.

**Live:** https://mohammed-alekhwan.github.io/Moe-CV/

## Development

Requires Node.js 22 or later.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000/Moe-CV/`.

```sh
npm run check
npm run build
npm run preview
```

The production preview is at `http://127.0.0.1:4173/Moe-CV/`.

With the preview running, install a browser once with `npx playwright install chromium`, then run `npm run test:browser`. The smoke suite covers project filters and galleries, dialogs and focus restoration, motion preferences, sculpture controls, clipboard access, CV download, mobile navigation, five responsive widths, WebGL fallback, and an axe accessibility scan. Screenshots and results are written to the ignored `artifacts/` folder. `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` can point to an existing Chromium installation; `PORTFOLIO_TEST_URL` can target the deployed site.

## Experience

- Custom chrome sculpture, real-time lighting, orbiting details, and chrome/lime/wireframe materials.
- Pointer, touch, and keyboard rotation, plus a reset control.
- GSAP entrances, scroll reveals, magnetic links, and a continuous typography strip.
- Five selected projects: Efad Wheelchair System, EFADgrp Website, Mercato Maintenance Website, SaChat, and Rasmi Rewards. Filterable cards and accessible native case-study dialogs.
- Responsive navigation, expandable expertise, CV download, email copying, and social links.
- Live reduced-motion support, a persistent pause control, keyboard focus states, and a static fallback when WebGL is unavailable.
- Self-hosted fonts and optimized WebP project imagery.

## Content

The page content lives in `src/app/page.js`, metadata in `src/app/layout.js`, and the five selected projects in `src/data/projects.js`. Project cards are rendered by `src/components/ProjectCard.js`; interactions live in `src/main.js` and 3D rendering in `src/scene.js`. Styles are in `src/style.css` and `src/projects.css`.

The downloadable CV is the exact updated file supplied by Mohammed. His name, contact address, professional experience, certifications, and education follow that CV. The selected-work section remains limited to the five projects he requested. Project selection and reference links were supplied by Mohammed. Public screenshots show the actual EFADgrp, Mercato Maintenance, and Rasmi Rewards websites; the wheelchair and SaChat cards use illustrative vector artwork. Case studies summarize the relevant product overviews without publishing private source code. All previous HTML/CSS pages and obsolete project assets have been replaced; Git history remains available. No testimonials, client outcomes, or professional awards have been invented.

## GitHub Pages

The site uses `output: 'export'` with `basePath: '/Moe-CV'`. A push to `main` runs `.github/workflows/deploy.yml`, builds the static `out/` directory, and deploys it through GitHub Actions. Repository **Settings → Pages → Source** should be **GitHub Actions**.

No server, API key, database, or external font service is required. Contact opens an email client; the portfolio does not collect messages.

## Design reference

UI/UX Pro Max was used for design-system and Three.js guidance: [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill). The final visual treatment combines editorial typography, open spacing, charcoal and warm paper surfaces, and a lime accent. See `docs/design-system.md`.
