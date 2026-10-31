type MonogramProps = {
  className?: string;
  size?: number;
};

// Custom JDL monogram. Editorial serif feel, geometric, single color via currentColor.
export default function Monogram({ className = "", size = 40 }: MonogramProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 60"
      width={size * 2}
      height={size}
      className={className}
      role="img"
      aria-label="Joey De Leon monogram"
      fill="none"
    >
      {/* Top hairline */}
      <line x1="6" y1="6" x2="114" y2="6" stroke="currentColor" strokeWidth="0.6" />
      {/* Bottom hairline */}
      <line x1="6" y1="54" x2="114" y2="54" stroke="currentColor" strokeWidth="0.6" />

      {/* J */}
      <path
        d="M 22 16 L 38 16 M 30 16 L 30 38 C 30 43 27 46 22 46 C 18 46 15 44 14 41"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />

      {/* D */}
      <path
        d="M 48 16 L 56 16 C 64 16 70 22 70 30 C 70 38 64 44 56 44 L 48 44 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="miter"
        fill="none"
      />

      {/* L */}
      <path
        d="M 86 16 L 86 44 L 104 44"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        fill="none"
      />

      {/* Center dot, gold accent style */}
      <circle cx="60" cy="6" r="1.3" fill="currentColor" />
      <circle cx="60" cy="54" r="1.3" fill="currentColor" />
    </svg>
  );
}
