import { projects } from "../data/projects.js";
import ProjectCard from "./ProjectCard.jsx";

export default function Projects() {
  const [featured, ...secondary] = projects;

  return (
    <section className="projects section-pad" id="projects">
      <div className="section-intro section-intro-wide" data-reveal>
        <p className="section-kicker">Selected work</p>
        <h2>Case-study projects with real product, database, and workflow depth.</h2>
        <p>
          The strongest work is presented as shipped software, with academic systems kept focused
          and easy to scan.
        </p>
      </div>

      <ProjectCard project={featured} featured />

      <div className="project-grid">
        {secondary.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
