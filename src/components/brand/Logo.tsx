interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 32, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="RESEARCH_CORE logo"
    >
      {/* Outer hexagon ring */}
      <polygon
        points="16,2 28,9 28,23 16,30 4,23 4,9"
        stroke="#DA840A"
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />
      {/* Inner hexagon */}
      <polygon
        points="16,6 24,10.5 24,19.5 16,24 8,19.5 8,10.5"
        stroke="#DA840A"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      {/* Center diamond core */}
      <polygon
        points="16,10 20,16 16,22 12,16"
        fill="#DA840A"
        opacity="0.9"
      />
      {/* Center dot */}
      <circle cx="16" cy="16" r="2" fill="#000" />
    </svg>
  );
}
