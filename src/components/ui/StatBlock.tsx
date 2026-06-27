"use client";

interface StatBlockProps {
  value: string;
  unit: string;
  label: string;
  variant?: "dark" | "light";
}

export function StatBlock({
  value,
  unit,
  label,
  variant = "light",
}: StatBlockProps) {
  const textColor = variant === "light" ? "text-text-on-light" : "text-text-on-dark";

  return (
    <div>
      <div className={`stat-value ${textColor} tracking-tight`}>
        {value}
        <span className="stat-unit">{unit}</span>
      </div>
      <div className={`stat-label mt-1 ${textColor} opacity-80`}>
        {label}
      </div>
    </div>
  );
}
