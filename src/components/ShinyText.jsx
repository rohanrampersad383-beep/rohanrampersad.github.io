export default function ShinyText({ children, as: Component = "span", className = "" }) {
  return <Component className={`shiny-text ${className}`.trim()}>{children}</Component>;
}
