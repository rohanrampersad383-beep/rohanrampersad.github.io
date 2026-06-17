import ReactBitsGradientText from "./reactbits/GradientText/GradientText";

export default function GradientText({ children, className = "" }) {
  return (
    <ReactBitsGradientText
      className={`gradient-text rb-gradient-inline ${className}`.trim()}
      colors={["#e8fbff", "#22d3ee", "#8b5cf6", "#f0abfc"]}
      animationSpeed={9}
      direction="horizontal"
      pauseOnHover
    >
      {children}
    </ReactBitsGradientText>
  );
}
