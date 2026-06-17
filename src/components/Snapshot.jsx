import MagicBento from "./MagicBento.jsx";

const snapshot = [
  {
    title: "Web Applications",
    text: "React, Next.js, PHP, authentication, dashboards, CRUD workflows, and deployment-aware interfaces.",
  },
  {
    title: "Databases & Reporting",
    text: "Schema design, normalization, Prisma, PostgreSQL, MySQL, ERDs, reporting flows, and query-driven features.",
  },
  {
    title: "IT / Technical Support",
    text: "Troubleshooting mindset across web apps, cloud foundations, documentation, user flows, and operations.",
  },
  {
    title: "AI & Automation Projects",
    text: "Practical AI-assisted workflows, job scoring logic, notebook-based ML work, and structured data handling.",
  },
  {
    title: "Documentation & System Analysis",
    text: "OOAD, use cases, sequence diagrams, DFDs, database documentation, and clear project evaluation.",
  },
];

export default function Snapshot() {
  return (
    <section className="snapshot section-pad" aria-label="Portfolio snapshot">
      <div className="section-intro" data-reveal>
        <p className="section-kicker">Snapshot</p>
        <h2>A practical technical profile built around shipping usable systems.</h2>
      </div>
      <MagicBento items={snapshot} />
    </section>
  );
}
