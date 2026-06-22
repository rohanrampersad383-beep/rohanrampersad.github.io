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
  SiVercel
} from 'react-icons/si';
import { Bot, Database, FileText, Headphones, LineChart, Workflow } from 'lucide-react';

export const logoSkills = [
  { title: 'React', icon: SiReact, color: '#61dafb' },
  { title: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { title: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
  { title: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
  { title: 'HTML5', icon: SiHtml5, color: '#e34f26' },
  { title: 'CSS3', icon: SiCss, color: '#1572b6' },
  { title: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8' },
  { title: 'PHP', icon: SiPhp, color: '#777bb4' },
  { title: 'Python', icon: SiPython, color: '#ffd43b' },
  { title: 'MySQL', icon: SiMysql, color: '#4479a1' },
  { title: 'PostgreSQL', icon: SiPostgresql, color: '#4169e1' },
  { title: 'Prisma', icon: SiPrisma, color: '#ffffff' },
  { title: 'GitHub', icon: SiGithub, color: '#ffffff' },
  { title: 'Vercel', icon: SiVercel, color: '#ffffff' }
];

export const skillGroups = [
  {
    title: 'Frontend delivery',
    Icon: Workflow,
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS']
  },
  {
    title: 'Databases & reporting',
    Icon: Database,
    items: ['MySQL', 'PostgreSQL', 'Prisma', 'database design', 'reporting']
  },
  {
    title: 'AI & automation projects',
    Icon: Bot,
    items: ['AI/ML coursework', 'dashboard intelligence', 'practical automation']
  },
  {
    title: 'IT / technical support',
    Icon: Headphones,
    items: ['technical support', 'documentation', 'systems thinking', 'user workflows']
  },
  {
    title: 'Analysis & documentation',
    Icon: FileText,
    items: ['system analysis', '3NF design', 'project documentation', 'handover notes']
  },
  {
    title: 'Operations mindset',
    Icon: LineChart,
    items: ['admin support', 'data cleanup', 'process reporting', 'clear communication']
  }
];

export const valueCards = [
  {
    color: '#0b1220',
    title: 'Web Applications',
    description: 'Responsive interfaces and database-backed workflows built around real user tasks.',
    label: 'Build'
  },
  {
    color: '#101426',
    title: 'Databases & Reporting',
    description: 'Dashboards, reports, and structured data models for clearer operational decisions.',
    label: 'Data'
  },
  {
    color: '#111827',
    title: 'IT / Technical Support',
    description: 'Grounded troubleshooting, user support, and clear handover notes.',
    label: 'Support'
  },
  {
    color: '#151129',
    title: 'AI & Automation Projects',
    description: 'AI/ML coursework and prototypes for practical automation and decision support.',
    label: 'AI'
  },
  {
    color: '#0d1825',
    title: 'Documentation & Analysis',
    description: 'System analysis, 3NF design, and technical documentation that supports handover.',
    label: 'Clarity'
  }
];
