import ElectricBorder from "./ElectricBorder.jsx";

const contactLinks = [
  ["Email", "mailto:rohanrampersad383@gmail.com"],
  ["GitHub", "https://github.com/rohanrampersad383-beep"],
  ["LinkedIn", "https://www.linkedin.com/in/rohan-rampersad-a18ab1401"],
  ["Portfolio PDF", "/assets/documents/Rohan_Rampersad_Full_Redesigned_Portfolio.pdf"],
  ["Cover Letter", "/assets/documents/Rohan_Rampersad_Cover_Letter.pdf"],
];

export default function Contact() {
  return (
    <section className="contact section-pad" id="contact">
      <ElectricBorder className="contact-panel-shell">
        <div className="contact-panel" data-reveal>
          <p className="section-kicker">Contact</p>
          <h2>Open to practical technical work where I can build, support, and improve systems.</h2>
          <p>
            Based in Trinidad & Tobago and available for junior developer, IT support, database
            support, data/reporting, technical support, admin, operations, and general entry-level
            roles.
          </p>

          <div className="contact-actions">
            <a className="btn btn-primary" href="mailto:rohanrampersad383@gmail.com">
              Email Me
            </a>
            <a
              className="btn btn-secondary"
              href="/assets/documents/Rohan%20Rampersad%20Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => window.trackPortfolioClick?.("resume_click", "contact_resume")}
            >
              Resume Download
            </a>
          </div>
        </div>
      </ElectricBorder>

      <div className="contact-grid">
        {contactLinks.map(([label, href]) => (
          <a
            className="contact-link"
            href={href}
            key={label}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
            data-reveal
          >
            <span>{label}</span>
            <small>{href.replace("mailto:", "")}</small>
          </a>
        ))}
      </div>
    </section>
  );
}
