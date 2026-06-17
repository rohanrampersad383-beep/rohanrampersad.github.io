import { skills } from "../data/skills.js";
import LogoLoop from "./LogoLoop.jsx";

const logoLoopItems = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "PHP",
  "Python",
  "MySQL",
  "PostgreSQL",
  "Prisma",
  "GitHub",
  "Vercel",
];

export default function Skills() {
  return (
    <section className="skills section-pad" id="skills">
      <div className="section-intro" data-reveal>
        <p className="section-kicker">Technical stack</p>
        <h2>Tools grouped around the roles I'm targeting.</h2>
      </div>

      <LogoLoop items={logoLoopItems} />

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <article className="skill-card" data-reveal key={skill.group}>
            <span className="skill-card-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{skill.group}</h3>
            <div className="chips chips-soft">
              {skill.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
