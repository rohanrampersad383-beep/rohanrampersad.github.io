import ReactBitsMagicBento from "./reactbits/MagicBento/MagicBento";
import { useReducedMotion } from "./useMotionEnabled.js";

export default function MagicBento({ items, className = "" }) {
  const reducedMotion = useReducedMotion();
  const cards = items.map((item, index) => ({
    color: index === 0 ? "#081525" : "#0b1022",
    label: String(index + 1).padStart(2, "0"),
    title: item.title,
    description: item.text,
  }));

  return (
    <ReactBitsMagicBento
      cards={cards}
      className={`magic-bento ${className}`.trim()}
      enableStars
      enableSpotlight
      enableBorderGlow
      enableTilt
      disableAnimations={reducedMotion}
      enableMagnetism={false}
      clickEffect={false}
      particleCount={8}
      glowColor="34, 211, 238"
      spotlightRadius={360}
    />
  );
}
