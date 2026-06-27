import { MotionSection } from "@/components/animations/MotionSection";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Card } from "@/components/ui/Card";

export function Mission() {
  return (
    <section className="bg-surface-light text-text-on-light section-beam py-20 max-md:py-10 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)]">
      <div className="max-w-[var(--max-width)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <MotionSection className="md:col-span-4 border-t border-border-light pt-2">
            <h2 className="heading-md text-text-on-light">Mission</h2>
            <p className="label-caps mt-1 opacity-60 text-text-on-light">
              01 // OBJECTIVE
            </p>
          </MotionSection>
          <MotionSection
            delay={0.15}
            className="md:col-span-8 border-t border-border-light pt-2"
          >
            <p
              className="body-mono text-text-on-light max-w-[720px]"
              style={{ lineHeight: "1.8" }}
            >
              To isolate signal from noise in increasingly complex data
              environments. We build structural frameworks that prioritize
              clarity, removing decorative elements to expose the underlying
              geometric logic of information architectures. Our approach is
              clinical, uncompromising, and designed for environments where
              precision is the only metric that matters.
            </p>
            <Card variant="light" className="mt-6 max-w-[400px] !p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="label-caps text-text-on-light">
                  DATA_INTEGRITY
                </span>
                <span className="body-mono-bold text-text-on-light">
                  99.9%
                </span>
              </div>
              <ProgressBar variant="light" value={99.9} />
            </Card>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
