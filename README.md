# Rohan Rampersad Portfolio

Vite + React portfolio for Rohan Rampersad, a recent BSc (Hons) Applied Computer Science graduate showcasing full-stack projects, AI-assisted workflows, databases, cloud foundations, technical support readiness, reporting, and academic project work.

Live site: https://rohanrampersad.vercel.app

## Project Structure

- `index.html` - Vite HTML entry and analytics scripts
- `src/main.jsx` - React app bootstrap
- `src/App.jsx` - page composition
- `src/components/` - portfolio sections and reusable UI components
- `src/data/` - project and skills content
- `src/styles/global.css` - design system, layout, animation, and responsive styling
- `assets/` - screenshots, certificates, documents, and image assets
- `assets/documents/Rohan Rampersad Resume.pdf` - current resume PDF linked from the site
- `assets/documents/Rohan_Rampersad_Full_Redesigned_Portfolio.pdf` - current portfolio PDF linked from the site

## Local Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deploying To Vercel

Use Vercel's GitHub import flow and keep the GitHub repository as the source code repo.

1. Go to the Vercel dashboard and choose **Add New > Project**.
2. Import the GitHub repository: `rohanrampersad383-beep/rohanrampersad.github.io`.
3. Use these settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `./`
   - **Install Command:** `npm install`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy the project.
5. Production portfolio URL: `https://rohanrampersad.vercel.app`.

GitHub Pages can remain enabled until it is manually disabled in GitHub repository settings. Future pushes to the connected GitHub repository can trigger automatic Vercel deployments.
