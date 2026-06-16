# Rohan Rampersad Portfolio

Static HTML/CSS/JavaScript portfolio for Rohan Rampersad, a recent BSc (Hons) Applied Computer Science graduate showcasing full-stack projects, databases, AI/ML coursework, cloud foundations, IT support readiness, reporting, and academic project work.

Live site: https://rohanrampersad.vercel.app

## Project Structure

- `index.html` - main static portfolio page
- `style.css` - site styling and responsive layout
- `script.js` - browser-side interactions and animations
- `assets/` - screenshots, certificates, documents, and image assets
- `assets/documents/Rohan Rampersad Resume.pdf` - current resume PDF linked from the site
- `assets/documents/Rohan_Rampersad_Full_Redesigned_Portfolio.pdf` - current portfolio PDF linked from the site

This project does not use React, Next.js, Vite, npm, or a backend. It works by opening `index.html` directly in a browser.

## Deploying To Vercel

Use Vercel's GitHub import flow and keep the GitHub repository as the source code repo.

1. Go to the Vercel dashboard and choose **Add New > Project**.
2. Import the GitHub repository: `rohanrampersad383-beep/rohanrampersad.github.io`.
3. Use these settings:
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** leave empty / not required
   - **Install Command:** leave empty / not required
   - **Output Directory:** `.`
4. Deploy the project.
5. Production portfolio URL: `https://rohanrampersad.vercel.app`.

## Notes

- No `package.json` is required.
- No `vercel.json` is currently required because `index.html` is in the project root and all assets use relative paths.
- GitHub Pages can remain enabled until you manually disable it in GitHub repository settings.
- Future pushes to the connected GitHub repository can trigger automatic Vercel deployments.
