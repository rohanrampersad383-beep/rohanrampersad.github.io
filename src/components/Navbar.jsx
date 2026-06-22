import { FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { links, navItems } from '../data/links';

export default function Navbar() {
  return (
    <header className="nav-shell">
      <a className="nav-brand" href="#top" aria-label="Rohan Rampersad home">
        <span className="brand-mark">RR</span>
        <span className="brand-name">Rohan Rampersad</span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a className="active" href="#top">
          Home
        </a>
        {navItems.map(item => (
          <a href={item.href} key={item.label}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="nav-actions" aria-label="Social and resume links">
        <a href={links.github} aria-label="GitHub profile" target="_blank" rel="noreferrer">
          <FiGithub />
        </a>
        <a href={links.linkedin} aria-label="LinkedIn profile" target="_blank" rel="noreferrer">
          <FiLinkedin />
        </a>
        <a href={links.email} aria-label="Email Rohan">
          <FiMail />
        </a>
        <span className="nav-divider" aria-hidden="true" />
        <a className="resume-link" href={links.resume} aria-label="Download resume">
          <FiDownload />
          <span>Download Resume</span>
        </a>
      </div>
    </header>
  );
}
