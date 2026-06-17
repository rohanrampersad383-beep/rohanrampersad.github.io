export default function LogoLoop({ items, className = "" }) {
  const loopItems = [...items, ...items];

  return (
    <div className={`logo-loop ${className}`.trim()} aria-label="Technology and tool loop">
      <div className="logo-loop-track">
        {loopItems.map((item, index) => (
          <span className="logo-pill" key={`${item}-${index}`} aria-hidden={index >= items.length}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
