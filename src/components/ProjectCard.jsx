import ElectricBorder from "./ElectricBorder.jsx";

export default function ProjectCard({ project, featured = false }) {
  const card = (
    <article className={featured ? "project-card project-featured" : "project-card"} data-reveal>
      <div className="project-content">
        <div className="project-labels">
          <span>{project.role}</span>
          <span>{project.type}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <ul className="feature-list">
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="chips">
          {project.stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <div className="project-actions">
          {project.liveUrl ? (
            <a className="btn btn-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
              Live Demo
            </a>
          ) : null}
          {project.repoUrl ? (
            <a className="btn btn-secondary" href={project.repoUrl} target="_blank" rel="noreferrer">
              GitHub Repo
            </a>
          ) : null}
        </div>
      </div>

      <div className="project-media" aria-hidden={!project.image}>
        {project.image ? (
          <img src={project.image} alt={project.alt} loading={featured ? "eager" : "lazy"} />
        ) : (
          <div className="system-diagram">
            <span>Account</span>
            <i />
            <span>Workout Log</span>
            <i />
            <span>MySQL</span>
            <i />
            <span>Dashboard</span>
          </div>
        )}
      </div>
    </article>
  );

  if (!featured) return card;

  return (
    <ElectricBorder className="project-featured-shell" intensity="strong">
      {card}
    </ElectricBorder>
  );
}
