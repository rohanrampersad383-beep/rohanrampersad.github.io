import { useCallback } from "react";

export default function MagicBento({ items, className = "" }) {
  const handlePointerMove = useCallback((event) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--glow-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty("--glow-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    card.style.setProperty("--glow-strength", "1");
  }, []);

  const handlePointerLeave = useCallback((event) => {
    event.currentTarget.style.setProperty("--glow-strength", "0");
  }, []);

  return (
    <div className={`magic-bento ${className}`.trim()}>
      {items.map((item, index) => (
        <article
          className={`magic-bento-card magic-bento-${index + 1}`}
          data-reveal
          key={item.title}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className="magic-bento-topline">
            <span className="magic-bento-index">{String(index + 1).padStart(2, "0")}</span>
            {item.Icon ? <item.Icon className="magic-bento-icon" aria-hidden="true" /> : null}
          </div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}
