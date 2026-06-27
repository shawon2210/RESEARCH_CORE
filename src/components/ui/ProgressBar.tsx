"use client";

import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

interface ProgressBarProps {
  value: number;
  variant?: "dark" | "light";
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  variant = "dark",
  label,
  showValue = false,
  className,
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.3 });

  const ValueDisplay = () => {
    if (!showValue && !label) return null;
    return (
      <div className="flex justify-between items-center mb-2">
        {label && (
          <span className="label-caps">{label}</span>
        )}
        {showValue && (
          <span className="body-mono-bold">{value}%</span>
        )}
      </div>
    );
  };

  return (
    <div className={cn("w-full", className)} ref={ref}>
      <ValueDisplay />
      <div
        className={cn(
          "w-full h-[2px]",
          variant === "dark" ? "bg-white/15" : "bg-surface-variant"
        )}
      >
        <div
          className={cn(
            "h-full transition-all duration-1000 ease-out",
            variant === "dark" ? "bg-brand-gold" : "bg-surface-dark"
          )}
          style={{ width: isVisible ? `${Math.min(value, 100)}%` : "0%" }}
        />
      </div>
    </div>
  );
}
