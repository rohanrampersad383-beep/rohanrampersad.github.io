const navItems = [
  ["Overview", "#home"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  return (
    <header className="nav-shell">
      <a className="brand" href="#home" aria-label="Rohan Rampersad home">
        <span className="brand-mark">RR</span>
        <span>
          <strong>Rohan Rampersad</strong>
          <small>Full-stack | AI | Technical Support</small>
        </span>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        {navItems.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>

      <a
        className="nav-action"
        href="/assets/documents/Rohan%20Rampersad%20Resume.pdf"
        target="_blank"
        rel="noreferrer"
        onClick={() => window.trackPortfolioClick?.("resume_click", "nav_resume")}
      >
        Resume
      </a>
    </header>
  );
}
