import LogoLoop from './reactbits/LogoLoop/LogoLoop';
import { logoSkills } from '../data/skills';

export default function LogoLoopSection() {
  const logos = logoSkills.map(skill => {
    const Icon = skill.icon;
    return {
      node: <Icon style={{ color: skill.color }} />,
      title: skill.title,
      ariaLabel: skill.title
    };
  });

  return (
    <section className="logo-loop-section" aria-label="Technology stack">
      <LogoLoop
        logos={logos}
        speed={64}
        logoHeight={34}
        gap={46}
        pauseOnHover
        scaleOnHover
        ariaLabel="Technology logos"
      />
    </section>
  );
}
