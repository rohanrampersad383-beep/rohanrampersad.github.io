const paths = [
  "M -20 80 C 180 0, 330 190, 560 82 S 880 -8, 1110 122",
  "M -10 160 C 170 78, 350 245, 555 146 S 880 60, 1120 210",
  "M 20 245 C 220 170, 345 318, 575 238 S 900 154, 1100 292",
  "M -20 330 C 210 238, 390 408, 625 310 S 920 235, 1125 370",
];

export default function Strands({ className = "" }) {
  return (
    <div className={`strands ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 1100 420" role="presentation" focusable="false">
        {paths.map((d, index) => (
          <path className={`strand strand-${index + 1}`} d={d} key={d} />
        ))}
      </svg>
    </div>
  );
}
