export default function SplitText({ children, className = "" }) {
  const words = String(children).split(" ");

  return (
    <span className={`split-text ${className}`.trim()}>
      {words.map((word, wordIndex) => (
        <span className="split-word" key={`${word}-${wordIndex}`}>
          {word.split("").map((letter, letterIndex) => (
            <span
              className="split-letter"
              key={`${word}-${letter}-${letterIndex}`}
              style={{ "--split-delay": `${(wordIndex * 4 + letterIndex) * 18}ms` }}
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
