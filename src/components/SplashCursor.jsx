import { useEffect, useRef } from "react";

function motionAllowed() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function SplashCursor() {
  const layerRef = useRef(null);

  useEffect(() => {
    if (!motionAllowed() || !layerRef.current) return undefined;

    const layer = layerRef.current;
    let lastSplash = 0;
    let colorIndex = 0;
    const colors = ["34, 211, 238", "139, 92, 246", "52, 211, 153"];

    const addSplash = (event, strong = false) => {
      const now = performance.now();
      if (!strong && now - lastSplash < 72) return;
      lastSplash = now;

      const splash = document.createElement("span");
      splash.className = strong ? "cursor-splash cursor-splash-strong" : "cursor-splash";
      splash.style.left = `${event.clientX}px`;
      splash.style.top = `${event.clientY}px`;
      splash.style.setProperty("--splash-color", colors[colorIndex % colors.length]);
      colorIndex += 1;

      layer.appendChild(splash);
      window.setTimeout(() => splash.remove(), strong ? 760 : 560);
    };

    const handlePointerMove = (event) => addSplash(event);
    const handlePointerDown = (event) => addSplash(event, true);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      layer.replaceChildren();
    };
  }, []);

  return <div className="splash-cursor-layer" ref={layerRef} aria-hidden="true" />;
}
