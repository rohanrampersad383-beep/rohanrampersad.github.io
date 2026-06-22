import ElectricBorder from './reactbits/ElectricBorder/ElectricBorder';
import SpotlightCard from './reactbits/SpotlightCard/SpotlightCard';
import SectionReveal from './SectionReveal';
import { skillGroups } from '../data/skills';

const electricSkillCards = new Set([0, 2, 4]);

export default function SkillsShowcase() {
  return (
    <SectionReveal className="section skills-section" id="skills">
      <div className="section-heading">
        <span>Capability map</span>
        <h2>Technical skills with an operational edge.</h2>
        <p>Honest, early-career strengths across web delivery, data, support, reporting, and documentation.</p>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group, index) => {
          const Icon = group.Icon;
          const card = (
            <SpotlightCard key={group.title} className="skill-card" spotlightColor="rgba(167, 139, 250, 0.16)">
              <Icon />
              <h3>{group.title}</h3>
              <div>
                {group.items.map(item => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </SpotlightCard>
          );

          if (!electricSkillCards.has(index)) return card;

          return (
            <ElectricBorder
              key={group.title}
              className="skill-electric-frame"
              color={index === 2 ? '#d66cff' : '#43f6e8'}
              speed={0.38}
              chaos={0.03}
              borderRadius={20}
            >
              {card}
            </ElectricBorder>
          );
        })}
      </div>
    </SectionReveal>
  );
}
