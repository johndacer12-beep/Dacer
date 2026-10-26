# Portfolio

Personal portfolio of John Paul Dacer, a fourth year BSIT student in Digos City, Davao del Sur, Philippines. It presents a hero, a short bio, three React/GSAP projects and contact links in a single mobile-first page, structured with React Router so more pages can be added later.

**Live site:** https://YOUR-URL.vercel.app <!-- replace after deploying -->

![Portfolio screenshot](./public/screenshots/portfolio.png) <!-- add a screenshot of the deployed site -->

## Tech stack

- React 18 + Vite
- React Router 6
- GSAP + ScrollTrigger (hero entrance, project card reveal)
- Plain CSS, mobile-first (dark editorial design)

## Setup

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # preview the build
```

## Customize

- Text, links and projects live in `src/data.js`.
- Add screenshots to `public/screenshots/` and set each project's `shot` path.
- Add your photo as `public/avatar.jpg` (a portrait is included; replace it with your own).

## Deploy

Import the repo on Vercel or Netlify. Defaults work: build `npm run build`, output `dist`. `vercel.json` and `public/_redirects` handle client-side routing.
