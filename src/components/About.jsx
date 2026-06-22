import SectionReveal from './SectionReveal';

export default function About() {
  return (
    <SectionReveal className="section about-section" id="about">
      <div className="about-panel">
        <div className="section-heading">
          <span>About</span>
          <h2>Grounded, job-ready, and useful across technical teams.</h2>
        </div>
        <div className="about-copy">
          <p>
            Rohan Rampersad is a recent BSc (Hons) Applied Computer Science graduate from SAMS / Anglia
            Ruskin University with hands-on project experience building web applications, database-backed
            systems, dashboards, reporting workflows, and technical documentation.
          </p>
          <p>
            He is open to opportunities in and outside his field, including software development, IT support,
            data/reporting, technical support, admin, operations, and general entry-level roles.
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}
