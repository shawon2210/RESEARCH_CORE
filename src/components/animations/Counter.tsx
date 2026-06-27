"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface CounterProps {
  from?: number;
  value: number;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
  decimals?: number;
  label?: string;
}

export function Counter({
  from = 0,
  value,
  suffix = "",
  className = "",
  suffixClassName = "",
  decimals = 0,
  label,
}: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const spring = useSpring(from, {
    stiffness: 80,
    damping: 15,
    restDelta: 0.5,
  });
  const display = useTransform(spring, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
      const unsubscribe = spring.on("change", (latest) => {
        if (Math.abs(latest - value) < 0.01) {
          setIsComplete(true);
          unsubscribe();
        }
      });
      return unsubscribe;
    }
  }, [isInView, spring, value, hasAnimated]);

  return (
    <div ref={ref} className={className}>
      <div className="relative inline-flex flex-col items-start">
        <span className="relative">
          <motion.span
            className="font-display text-[36px] leading-none text-text-on-dark"
            animate={
              isComplete
                ? { color: ["#f5f5f5", "#DA840A", "#f5f5f5"] }
                : {}
            }
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
          >
            {display}
          </motion.span>
          {suffix && <span className={`text-[16px] text-text-on-dark opacity-70 ${suffixClassName}`}>{suffix}</span>}
        </span>
        {label && (
          <span className="label-caps opacity-60 mt-1">{label}</span>
        )}
        <motion.span
          className="absolute -bottom-1 left-0 h-[2px] bg-brand-gold origin-left"
          initial={{ scaleX: 0 }}
          animate={isComplete ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%" }}
        />
      </div>
      {isComplete && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background:
              "radial-gradient(circle at center, rgba(218,132,10,0.15) 0%, transparent 70%)",
            borderRadius: "4px",
          }}
        />
      )}
    </div>
  );
}
