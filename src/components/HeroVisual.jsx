import ElectricBorder from "./ElectricBorder.jsx";

export default function HeroVisual() {
  return (
    <div className="hero-visual" data-reveal>
      <div className="visual-ring" />
      <ElectricBorder className="terminal-shell" intensity="strong">
        <div className="terminal-card glass-card">
          <div className="terminal-top">
            <span />
            <span />
            <span />
            <small>portfolio.runtime</small>
          </div>
          <pre>
{`const focus = [
  "full-stack apps",
  "AI workflows",
  "database systems",
  "technical support"
];

ship({
  project: "Cash Compass",
  status: "live",
  mindset: "practical"
});`}
          </pre>
        </div>
      </ElectricBorder>

      <div className="floating-card card-one">
        <small>Main Project</small>
        <strong>Cash Compass</strong>
        <span>Finance tracking, CSV import, analytics, Prisma, PostgreSQL.</span>
      </div>

      <div className="floating-card card-two">
        <small>AI Workflow</small>
        <strong>MatchIQ</strong>
        <span>Job discovery, scoring calibration, dashboard intelligence.</span>
      </div>

      <div className="orbit-list glass-card">
        <span>2+ full-stack projects</span>
        <span>2 live deployed apps</span>
        <span>10+ technologies used</span>
      </div>
    </div>
  );
}
