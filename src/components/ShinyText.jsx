import ReactBitsShinyText from "./reactbits/ShinyText/ShinyText";
import { useReducedMotion } from "./useMotionEnabled.js";

export default function ShinyText({ children, as: Component = "span", className = "" }) {
  const reducedMotion = useReducedMotion();

  return (
    <Component className={className}>
      <ReactBitsShinyText
        text={String(children)}
        color="#dbeafe"
        shineColor="#ffffff"
        speed={6}
        spread={110}
        yoyo
        delay={0.8}
        disabled={reducedMotion}
      />
    </Component>
  );
}
