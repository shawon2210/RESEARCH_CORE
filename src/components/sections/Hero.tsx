"use client";

import { motion } from "framer-motion";
import { MotionSection } from "@/components/animations/MotionSection";
import { Button } from "@/components/ui/Button";
import { Scene } from "@/components/three/Scene";

const heading = "THE FUTURE OF RESEARCH.";
const words = heading.split(" ");

export function Hero() {
  return (
    <header
      className="bg-surface-dark hero-grid scanlines relative overflow-hidden"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Scene />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-surface-dark via-surface-dark/95 via-40% to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-surface-dark via-transparent to-surface-dark pointer-events-none" />
      <div className="relative z-10 w-full px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)]">
        <div className="max-w-[var(--max-width)] mx-auto">
          <MotionSection>
            <h1
              className="display-xl text-text-on-dark text-glow-strong flex flex-wrap gap-x-[0.3em]"
              style={{ wordBreak: "break-word" }}
            >
              {words.map((word, i) => (
                <span key={i} className="inline-flex overflow-hidden">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.08,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </MotionSection>
          <MotionSection delay={0.25}>
            <p
              className="body-mono text-brand-gold mt-6"
              style={{ maxWidth: "640px" }}
            >
              SYSTEM_INITIATED // ESTABLISHING SECURE PROTOCOLS // DATA STREAMS
              OPTIMIZED. WE ARE REDEFINING THE BOUNDARIES OF COMPUTATIONAL
              ANALYSIS THROUGH HIGH-FIDELITY, MONOCHROMATIC PRECISION.
            </p>
          </MotionSection>
          <MotionSection delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 md:mt-12">
              <Button variant="primary">INITIALIZE SEQUENCE</Button>
              <Button variant="ghost">VIEW LOGS</Button>
            </div>
          </MotionSection>
        </div>
      </div>
    </header>
  );
}
