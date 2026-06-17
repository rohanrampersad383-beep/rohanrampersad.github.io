import ReactBitsElectricBorder from "./reactbits/ElectricBorder/ElectricBorder";

export default function ElectricBorder({ children, className = "", intensity = "normal" }) {
  const strong = intensity === "strong";

  return (
    <ReactBitsElectricBorder
      className={className}
      color={strong ? "#22d3ee" : "#8b5cf6"}
      speed={strong ? 0.82 : 0.58}
      chaos={strong ? 0.11 : 0.08}
      borderRadius={strong ? 30 : 24}
    >
      {children}
    </ReactBitsElectricBorder>
  );
}
