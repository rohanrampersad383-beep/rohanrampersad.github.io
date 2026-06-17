export default function ElectricBorder({ children, className = "", intensity = "normal" }) {
  return (
    <div className={`electric-border electric-border-${intensity} ${className}`.trim()}>
      <div className="electric-border-content">{children}</div>
    </div>
  );
}
