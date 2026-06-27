"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
  variant?: "dark" | "light";
  hoverable?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: "div" | "motion";
}

export function Card({
  variant = "dark",
  hoverable = false,
  className,
  children,
}: CardProps) {
  const base = cn(
    "p-8 border rounded-none",
    variant === "dark" && "bg-surface-container-lowest border-border-dark text-text-on-dark",
    variant === "light" && "bg-surface-light border-border-light text-text-on-light",
    hoverable && "transition-colors duration-150",
    className
  );

  if (!hoverable) {
    return <div className={base}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(base, "cursor-default")}
      whileHover={{
        y: -4,
        borderColor: "rgba(218,132,10,0.4)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex justify-between items-start mb-4", className)}>
      {children}
    </div>
  );
}
