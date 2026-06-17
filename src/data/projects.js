export const projects = [
  {
    title: "Cash Compass",
    role: "Featured full-stack product",
    type: "Personal finance tracking web application",
    image: "/assets/projects/cash-compass-home.png",
    alt: "Cash Compass finance dashboard preview",
    liveUrl: "https://cash-compass-finance.vercel.app",
    repoUrl: "",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Vercel"],
    previewLabel: "cash-compass.app",
    metrics: [
      ["feature areas", "6+"],
      ["deployment", "Live"],
      ["database", "SQL"],
    ],
    description:
      "Cash Compass is a full-stack finance tracker for monitoring income, expenses, bills, savings goals, transaction history, uploads, and dashboard activity through a polished fintech interface.",
    highlights: [
      "Secure authentication and protected dashboard routes",
      "Income, expense, bill, savings goal, and transaction workflows",
      "CSV import, onboarding, export features, analytics, and tests",
    ],
  },
  {
    title: "MatchIQ",
    role: "AI job matching assistant",
    type: "AI-assisted job discovery and tracking system",
    image: "/assets/projects/ai-job-match-home.png",
    alt: "MatchIQ dashboard preview",
    liveUrl: "https://ai-job-match-assistant.vercel.app",
    repoUrl: "https://github.com/rohanrampersad383-beep/ai-job-match-assistant",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Dashboard Logic", "Testing"],
    previewLabel: "matchiq.workflow",
    metrics: [
      ["workflow", "AI"],
      ["review queue", "Ranked"],
      ["tracking", "Manual"],
    ],
    description:
      "MatchIQ helps organize job discovery, review queues, match scoring, and application tracking with a manual, user-controlled workflow.",
    highlights: [
      "Dashboard intelligence for ranked opportunities",
      "Discovery views, scoring calibration, and review workflows",
      "Focused on transparent matching and controlled application tracking",
    ],
  },
  {
    title: "Fitness Central",
    role: "Final-year academic project",
    type: "PHP/MySQL fitness tracking platform",
    image: "",
    alt: "",
    liveUrl: "",
    repoUrl: "https://github.com/rohanrampersad383-beep/fitness-central",
    stack: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "WAMPServer", "phpMyAdmin"],
    previewLabel: "academic-system",
    metrics: [
      ["project type", "Final-year"],
      ["database", "3NF"],
      ["stack", "PHP"],
    ],
    description:
      "Fitness Central is a final-year academic full-stack fitness tracking system with account flows, workout logging, weight tracking, goals, dashboards, and database-driven features.",
    highlights: [
      "Login and registration with MySQL-backed CRUD workflows",
      "Workout, weight, goal, and exercise guide modules",
      "3NF database design, system analysis, documentation, and evaluation",
    ],
  },
];
