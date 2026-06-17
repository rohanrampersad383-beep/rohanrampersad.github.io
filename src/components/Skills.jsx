import { skills } from "../data/skills.js";
import LogoLoop from "./LogoLoop.jsx";
import ShinyText from "./ShinyText.jsx";
import {
  SiCss,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const logoLoopItems = [
  { label: "React", Icon: SiReact, color: "#61dafb" },
  { label: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { label: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
  { label: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
  { label: "HTML5", Icon: SiHtml5, color: "#e34f26" },
  { label: "CSS3", Icon: SiCss, color: "#1572b6" },
  { label: "Tailwind CSS", Icon: SiTailwindcss, color: "#38bdf8" },
  { label: "PHP", Icon: SiPhp, color: "#777bb4" },
  { label: "Python", Icon: SiPython, color: "#ffd43b" },
  { label: "MySQL", Icon: SiMysql, color: "#4479a1" },
  { label: "PostgreSQL", Icon: SiPostgresql, color: "#4169e1" },
  { label: "Prisma", Icon: SiPrisma, color: "#9be7ff" },
  { label: "GitHub", Icon: SiGithub, color: "#ffffff" },
  { label: "Vercel", Icon: SiVercel, color: "#ffffff" },
];

export default function Skills() {
  return (
    <section className="skills section-pad" id="skills">
      <div className="section-intro" data-reveal>
        <p className="section-kicker">Technical stack</p>
        <h2>
          <ShinyText>Tools grouped</ShinyText> around the roles I'm targeting.
        </h2>
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
