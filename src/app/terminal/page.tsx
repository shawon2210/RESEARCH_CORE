"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Terminal } from "@/components/Terminal";
import { MotionSection } from "@/components/animations/MotionSection";

export default function TerminalPage() {
  return (
    <>
      <MotionSection>
        <section className="bg-surface-dark section-beam py-20 max-md:py-10 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)] border-b border-white/15">
          <div className="max-w-[var(--max-width)] mx-auto flex flex-wrap justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="heading-lg text-brand-gold">
                TERMINAL
              </h1>
              <p className="body-mono mt-2 opacity-60">
                INTERACTIVE SHELL // TYPE &apos;help&apos; FOR COMMANDS
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
                RESET
              </Button>
            </motion.div>
          </div>
        </section>
      </MotionSection>

      <MotionSection>
        <Terminal />
      </MotionSection>
    </>
  );
}
