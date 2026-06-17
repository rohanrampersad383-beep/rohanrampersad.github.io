import ReactBitsStrands from "./reactbits/Strands/Strands";
import { useFinePointerMotion } from "./useMotionEnabled.js";

export default function Strands({ className = "" }) {
  const motionEnabled = useFinePointerMotion();

  if (!motionEnabled) return null;

  return (
    <div className={`strands ${className}`.trim()} aria-hidden="true">
      <ReactBitsStrands
        colors={["#22d3ee", "#8b5cf6", "#34d399", "#f472b6"]}
        count={3}
        speed={0.34}
        amplitude={0.72}
        waviness={0.86}
        thickness={0.56}
        glow={2.1}
        opacity={0.74}
        scale={1.22}
      />
    </div>
  );
}
