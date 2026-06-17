export default function DecryptedText({ children, className = "" }) {
  return (
    <span className={`decrypted-text ${className}`.trim()} data-text={children}>
      {children}
    </span>
  );
}
