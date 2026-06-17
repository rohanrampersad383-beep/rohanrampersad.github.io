import Aurora from "./reactbits/Aurora/Aurora";
import { useReducedMotion } from "./useMotionEnabled.js";

export default function Background() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="site-bg" aria-hidden="true">
      <div className="rb-aurora-shell">
        {reducedMotion ? (
          <div className="rb-aurora-static" />
        ) : (
          <Aurora
            colorStops={["#22d3ee", "#8b5cf6", "#34d399"]}
            amplitude={0.78}
            blend={0.58}
            speed={0.44}
          />
        )}
      </div>
      <div className="grid-plane" />
      <div className="noise" />
    </div>
  );
}
