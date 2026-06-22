import { FiArrowUpRight, FiCode, FiMonitor } from 'react-icons/fi';
import SpotlightCard from './reactbits/SpotlightCard/SpotlightCard';
import StarBorder from './reactbits/StarBorder/StarBorder';
import SectionReveal from './SectionReveal';
import { projects } from '../data/projects';

function ProjectVisual({ project }) {
  return (
    <div className={`project-visual ${project.accent}`}>
      <div className="visual-toolbar">
        <span />
        <span />
        <span />
      </div>
      <div className="visual-canvas">
        <div className="visual-chart">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="visual-panel">
          {project.features.slice(0, 4).map(feature => (
            <span key={feature}>{feature}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, featured = false }) {
  return (
    <SpotlightCard
      className={`project-card ${featured ? 'project-card-featured' : ''}`}
      spotlightColor="rgba(61, 247, 230, 0.18)"
    >
      <div className="project-content">
        <div>
          <p className="project-type">{project.type}</p>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
        </div>
        <div className="tag-row">
          {project.features.map(feature => (
            <span key={feature}>{feature}</span>
          ))}
        </div>
        <div className="stack-row" aria-label={`${project.title} stack`}>
          {project.stack.map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="project-links">
          {project.links.live && (
            <a href={project.links.live} aria-label={`View ${project.title} live`} target="_blank" rel="noreferrer">
              <FiMonitor /> Live project
            </a>
          )}
          {project.links.code && (
            <a href={project.links.code} aria-label={`View ${project.title} source code`} target="_blank" rel="noreferrer">
              <FiCode /> View code
            </a>
          )}
        </div>
      </div>
      <ProjectVisual project={project} />
    </SpotlightCard>
  );
}

export default function FeaturedProjects() {
  return (
    <SectionReveal className="section projects-section" id="projects">
      <div className="section-heading wide">
        <span>Selected work</span>
        <h2>Projects presented like product case studies.</h2>
        <p>Each project has its own shape so Cash Compass, MatchIQ, and Fitness Central do not collapse into identical resume cards.</p>
      </div>
      <div className="projects-grid">
        <ProjectCard project={projects[0]} featured />
        {projects.slice(1).map(project => (
          <ProjectCard project={project} key={project.title} />
        ))}
        <StarBorder as="div" className="future-card" color="#8b5cf6" thickness={1}>
          <div>
            <p className="project-type">Future Projects</p>
            <h3>More builds can slot in here.</h3>
            <p>Reserved space for new live work, screenshots, repositories, or role-specific portfolio updates.</p>
            <FiArrowUpRight />
          </div>
        </StarBorder>
      </div>
    </SectionReveal>
  );
}
