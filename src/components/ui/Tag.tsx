import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "gold" | "ok" | "warn" | "err";
  className?: string;
}

const variantStyles: Record<string, string> = {
  gold: "text-brand-gold border-brand-gold",
  ok: "text-status-ok border-status-ok",
  warn: "text-brand-gold border-brand-gold",
  err: "text-status-err border-status-err",
};

export function Tag({
  children,
  variant = "gold",
  className,
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 font-mono text-[10px] font-bold leading-none tracking-[0.1em] uppercase border rounded-none",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
