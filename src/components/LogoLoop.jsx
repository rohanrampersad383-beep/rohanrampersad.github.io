import ReactBitsLogoLoop from "./reactbits/LogoLoop/LogoLoop";

export default function LogoLoop({ items, className = "" }) {
  const logos = items.map((item) => ({
    title: item.label,
    ariaLabel: item.label,
    node: (
      <span className="logo-pill" title={item.label} style={{ "--logo-color": item.color }}>
        <item.Icon aria-hidden="true" />
        <span>{item.label}</span>
      </span>
    ),
  }));

  return (
    <div className={`logo-loop ${className}`.trim()}>
      <ReactBitsLogoLoop
        logos={logos}
        speed={92}
        logoHeight={50}
        gap={10}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#050713"
        ariaLabel="Technology and tool loop"
      />
    </div>
  );
}
