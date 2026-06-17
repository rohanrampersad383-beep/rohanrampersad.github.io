export default function LogoLoop({ items, className = "" }) {
  const loopItems = [...items, ...items];

  return (
    <div className={`logo-loop ${className}`.trim()} aria-label="Technology and tool loop">
      <div className="logo-loop-track">
        {loopItems.map((item, index) => (
          <span
            className="logo-pill"
            key={`${item.label}-${index}`}
            aria-hidden={index >= items.length}
            title={item.label}
            style={{ "--logo-color": item.color }}
          >
            <item.Icon aria-hidden="true" />
            <span>{item.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
