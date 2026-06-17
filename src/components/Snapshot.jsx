import MagicBento from "./MagicBento.jsx";
import ShinyText from "./ShinyText.jsx";
import { FiCpu, FiDatabase, FiFileText, FiTool, FiZap } from "react-icons/fi";

const snapshot = [
  {
    title: "Web Applications",
    Icon: FiZap,
    text: "React, Next.js, PHP, authentication, dashboards, CRUD workflows, and deployment-aware interfaces.",
  },
  {
    title: "Databases & Reporting",
    Icon: FiDatabase,
    text: "Schema design, normalization, Prisma, PostgreSQL, MySQL, ERDs, reporting flows, and query-driven features.",
  },
  {
    title: "IT / Technical Support",
    Icon: FiTool,
    text: "Troubleshooting mindset across web apps, cloud foundations, documentation, user flows, and operations.",
  },
  {
    title: "AI & Automation Projects",
    Icon: FiCpu,
    text: "Practical AI-assisted workflows, job scoring logic, notebook-based ML work, and structured data handling.",
  },
  {
    title: "Documentation & System Analysis",
    Icon: FiFileText,
    text: "OOAD, use cases, sequence diagrams, DFDs, database documentation, and clear project evaluation.",
  },
];

export default function Snapshot() {
  return (
    <section className="snapshot section-pad" aria-label="Portfolio snapshot">
      <div className="section-intro" data-reveal>
        <p className="section-kicker">Snapshot</p>
        <h2>
          A practical technical profile built around <ShinyText>shipping usable systems.</ShinyText>
        </h2>
      </div>
      <MagicBento items={snapshot} />
    </section>
  );
}
