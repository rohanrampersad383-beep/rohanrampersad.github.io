import SectionReveal from './SectionReveal';

export default function About() {
  return (
    <SectionReveal className="section about-section" id="about">
      <div className="about-panel">
        <div className="section-heading">
          <span>About</span>
          <h2>A little about me.</h2>
        </div>
        <div className="about-copy">
          <p>
            I'm a recent BSc (Hons) Applied Computer Science graduate from SAMS / Anglia
            Ruskin University, based in Trinidad &amp; Tobago. I've built and sold business software for
            CSM Enterprises and 1484 Performance Wrecking Service, as well as working on web apps,
            databases, and dashboards.
          </p>
          <p>
            I enjoy working through a problem with someone and building software they can use day to day.
            I'm open to opportunities in software development, IT support, data and reporting,
            administration, and operations.
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}
