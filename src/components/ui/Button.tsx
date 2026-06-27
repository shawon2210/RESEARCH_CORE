"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "sm";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-gold text-surface-dark hover:bg-brand-gold-hover active:bg-brand-gold-active border-0",
  secondary:
    "bg-surface-light text-text-on-light hover:bg-surface-light-alt border border-border-light",
  ghost:
    "bg-transparent text-text-on-dark hover:bg-white/[0.08] hover:text-brand-gold hover:border-brand-gold border border-border-dark",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-[48px] px-6",
  sm: "h-9 px-4 font-mono text-body font-bold tracking-[0.1em] uppercase",
};

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      className={cn(
        "inline-flex items-center justify-center rounded-none border border-solid transition-colors duration-150 select-none",
        variantStyles[variant],
        sizeStyles[size],
        size === "default" && "label-ui",
        className,
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
