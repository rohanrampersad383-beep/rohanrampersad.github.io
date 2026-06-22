# Rohan Rampersad Portfolio V2

Premium cinematic Vite + React portfolio for Rohan Rampersad.

## Setup

```bash
npm install
npm run dev
```

Production preview:

```bash
npm run build
npm run preview
```

Quality checks:

```bash
npm run check
```

## Content Sources

- Email, phone, GitHub, LinkedIn, portfolio, and resume links: `src/data/links.js`
- Project details, live links, and code links: `src/data/projects.js`
- Skills, logo loop, and value cards: `src/data/skills.js`
- Resume and portfolio documents: `public/assets/documents/`
- Project screenshots and supporting visuals: `public/assets/`

## React Bits Sources

Official React Bits JS/CSS source was copied from `DavidHDev/react-bits`:

- `src/content/Backgrounds/FloatingLines/FloatingLines.jsx` and `FloatingLines.css`
- `src/content/Backgrounds/Lightfall/Lightfall.jsx` and `Lightfall.css`
- `src/content/Animations/ElectricBorder/ElectricBorder.jsx` and `ElectricBorder.css`
- `src/content/TextAnimations/GradientText/GradientText.jsx` and `GradientText.css`
- `src/content/TextAnimations/ShinyText/ShinyText.jsx` and `ShinyText.css`
- `src/content/Animations/LogoLoop/LogoLoop.jsx` and `LogoLoop.css`
- `src/content/Components/MagicBento/MagicBento.jsx` and `MagicBento.css`
- `src/content/Components/SpotlightCard/SpotlightCard.jsx` and `SpotlightCard.css`
- `src/content/Animations/Magnet/Magnet.jsx`
- `src/content/Animations/StarBorder/StarBorder.jsx` and `StarBorder.css`

Adaptations:

- `MagicBento` accepts a `cards` prop so it renders Rohan's real value cards instead of React Bits demo content.
- `Background` lazy-loads Floating Lines with WebGL support detection and a static mobile/reduced-motion fallback.
- `ContactCTA` uses Lightfall only inside the contact card, with a static mobile/reduced-motion fallback.
- `ElectricBorder` disables its canvas animation on mobile and for reduced-motion users.
- ESLint disables two React hook lint rules only inside copied React Bits files because the official components intentionally use refs and effect state patterns that React 19's strict lint flags.

## Notes

The portfolio intentionally avoids fake metrics, client claims, seniority claims, current-student wording, and awaiting-results wording.
