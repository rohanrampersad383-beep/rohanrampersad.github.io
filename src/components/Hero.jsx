import HeroVisual from "./HeroVisual.jsx";
import GradientText from "./GradientText.jsx";
import ShinyText from "./ShinyText.jsx";
import Strands from "./Strands.jsx";

const roles = ["full-stack apps", "AI workflows", "database systems", "support-ready tools"];

export default function Hero() {
  return (
    <section className="hero section-pad" id="home">
      <Strands className="hero-strands" />
      <div className="hero-copy" data-reveal>
        <p className="availability">
          <span /> Available for junior developer, IT, data, support, and operations roles
        </p>
        <h1>
          Building practical <GradientText>AI-assisted</GradientText> and{" "}
          <span className="text-nowrap">full-stack web</span> systems.
        </h1>
        <p className="hero-lead blur-text">
          Recent BSc (Hons) Applied Computer Science graduate from Trinidad & Tobago, completed
          through SAMS / Anglia Ruskin University. I build database-backed applications, technical
          dashboards, and workflow tools that turn messy processes into usable software.
        </p>

        <div className="hero-actions" aria-label="Primary actions">
          <a className="btn btn-primary magnetic-btn" href="#projects">
            View Projects
          </a>
          <a
            className="btn btn-secondary magnetic-btn"
            href="/assets/documents/Rohan%20Rampersad%20Resume.pdf"
            target="_blank"
            rel="noreferrer"
            onClick={() => window.trackPortfolioClick?.("resume_click", "hero_resume")}
          >
            Resume Download
          </a>
          <a className="btn btn-ghost magnetic-btn" href="https://github.com/rohanrampersad383-beep" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="btn btn-ghost magnetic-btn" href="https://cash-compass-finance.vercel.app" target="_blank" rel="noreferrer">
            Live Demo
          </a>
        </div>

        <div className="hero-roles" aria-label="Portfolio focus areas">
          {roles.map((role) => (
            <span key={role}>
              <ShinyText>{role}</ShinyText>
            </span>
          ))}
        </div>
      </div>

      <HeroVisual />
    </section>
  );
}
