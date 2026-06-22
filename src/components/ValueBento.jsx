import ElectricBorder from './reactbits/ElectricBorder/ElectricBorder';
import MagicBento from './reactbits/MagicBento/MagicBento';
import SectionReveal from './SectionReveal';
import { valueCards } from '../data/skills';

const electricCards = new Set([0, 3]);

function renderValueCard(cardNode, card, index, reducedEffects) {
  if (!electricCards.has(index)) return cardNode;

  return (
    <ElectricBorder
      key={card.title}
      className="value-electric-frame"
      color={index === 0 ? '#43f6e8' : '#d66cff'}
      speed={0.42}
      chaos={0.035}
      borderRadius={12}
      disabled={reducedEffects}
    >
      {cardNode}
    </ElectricBorder>
  );
}

export default function ValueBento() {
  return (
    <SectionReveal className="section value-section">
      <MagicBento
        cards={valueCards}
        textAutoHide={false}
        glowColor="56, 241, 226"
        spotlightRadius={260}
        particleCount={8}
        enableTilt
        clickEffect={false}
        enableMagnetism={false}
        renderCard={renderValueCard}
      />
    </SectionReveal>
  );
}
