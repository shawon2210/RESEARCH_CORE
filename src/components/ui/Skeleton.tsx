import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "dark" | "light";
  style?: React.CSSProperties;
}

export function Skeleton({ className, variant = "dark", style }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-none",
        variant === "dark" ? "bg-white/8" : "bg-black/8",
        className
      )}
      style={style}
    />
  );
}

export function SkeletonCard({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <div className={cn(
      "p-8 border",
      variant === "dark" ? "border-white/15" : "border-black/15"
    )}>
      <Skeleton className="h-3 w-20 mb-4" variant={variant} />
      <Skeleton className="h-8 w-32 mb-2" variant={variant} />
      <Skeleton className="h-3 w-24" variant={variant} />
    </div>
  );
}

export function SkeletonTable({ rows = 5, variant = "dark" }: { rows?: number; variant?: "dark" | "light" }) {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className={cn("h-3 w-full max-w-[100px] mb-2", variant === "dark" ? "bg-white/20" : "bg-black/20")} />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className={cn("h-3 w-full", i % 3 === 0 ? "w-3/4" : i % 3 === 1 ? "w-1/2" : "w-2/3")} variant={variant} />
      ))}
    </div>
  );
}
