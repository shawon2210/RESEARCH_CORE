import { MotionSection } from "@/components/animations/MotionSection";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { StatBlock } from "@/components/ui/StatBlock";

const stats = [
  { value: "14", unit: "ms", label: "AVERAGE LATENCY" },
  { value: "9", unit: "pb", label: "DATA PROCESSED" },
  { value: "0", unit: "%", label: "MARGIN OF ERROR" },
  { value: "24", unit: "/7", label: "NODE UPTIME" },
];

export function Impact() {
  return (
    <section className="bg-surface-light text-text-on-light section-beam py-20 max-md:py-10 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)]">
      <div className="max-w-[var(--max-width)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <MotionSection className="md:col-span-4 border-t border-border-light pt-2">
            <h2 className="heading-md text-text-on-light">Impact</h2>
            <p className="label-caps mt-1 opacity-60 text-text-on-light">
              03 // METRICS
            </p>
          </MotionSection>
          <MotionSection
            delay={0.15}
            className="md:col-span-8 border-t border-border-light pt-2"
          >
            <p
              className="body-mono text-text-on-light max-w-[720px] mb-12"
              style={{ lineHeight: "1.8" }}
            >
              Quantifiable results delivered through stark contrast and rigorous
              methodology. We do not rely on ornamental UI; we rely on truth
              encoded in geometry and typography.
            </p>
            <StaggerContainer
              className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6"
              staggerDelay={0.12}
            >
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <StatBlock
                    value={stat.value}
                    unit={stat.unit}
                    label={stat.label}
                    variant="light"
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
