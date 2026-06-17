export default function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="about-panel glass-card" data-reveal>
        <div>
          <p className="section-kicker">About</p>
          <h2>Recent Applied Computer Science graduate with a builder's mindset.</h2>
        </div>
        <p>
          I completed BSc (Hons) Applied Computer Science through SAMS in partnership with Anglia
          Ruskin University. My work combines web applications, database-backed systems, AI/ML
          coursework, image processing, cloud foundations, systems analysis, and data handling.
        </p>
        <p>
          I'm open to software development, IT support, technical support, database support,
          data/reporting, administration, operations, and general entry-level technical roles where
          practical problem-solving and reliable documentation matter.
        </p>
      </div>

      <div className="timeline">
        <article data-reveal>
          <span>Education</span>
          <h3>BSc (Hons) Applied Computer Science</h3>
          <p>
            SAMS / Anglia Ruskin University pathway, with project work across software engineering,
            databases, AI, cloud, image processing, and systems analysis.
          </p>
        </article>
        <article data-reveal>
          <span>Currently building</span>
          <h3>AI-assisted and full-stack web applications</h3>
          <p>
            Building and refining shipped portfolio systems including Cash Compass and MatchIQ, with
            emphasis on database design, dashboards, and usability.
          </p>
        </article>
        <article data-reveal>
          <span>Career direction</span>
          <h3>Junior technical roles</h3>
          <p>
            Targeting roles that combine practical software, support readiness, structured data,
            reporting, cloud foundations, and technical communication.
          </p>
        </article>
      </div>
    </section>
  );
}
