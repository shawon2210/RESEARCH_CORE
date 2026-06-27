import { MotionSection } from "@/components/animations/MotionSection";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { Card } from "@/components/ui/Card";

const technologies = [
  {
    icon: "memory",
    title: "QUANTUM ARRAYS",
    description:
      "Utilizing fixed-grid topologies to manage concurrent processing streams with zero latency tolerance.",
  },
  {
    icon: "data_object",
    title: "SYNTAX PARSING",
    description:
      "Deep tonal layering applied to monolithic datasets, extracting structural metadata efficiently.",
  },
  {
    icon: "network_node",
    title: "NEURAL LINKS",
    description:
      "Aggressive whitespace algorithms optimize the signal path between decentralized node clusters.",
  },
  {
    icon: "shield",
    title: "CRYPTOGRAPHIC CORES",
    description:
      "Level 2 active focus state protocols ensure immutable transaction ledgers across the network.",
  },
];

export function Technology() {
  return (
    <section className="bg-surface-dark section-beam py-20 max-md:py-10 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)]">
      <div className="max-w-[var(--max-width)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <MotionSection className="md:col-span-4 border-t border-border-accent pt-2">
            <h2 className="heading-md text-brand-gold">Technology</h2>
            <p className="label-caps mt-1 text-brand-gold opacity-60">
              02 // SYSTEMS
            </p>
          </MotionSection>
          <MotionSection
            delay={0.15}
            className="md:col-span-8 border-t border-border-accent pt-2"
          >
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {technologies.map((tech) => (
                <StaggerItem key={tech.title}>
                  <Card variant="dark" hoverable className="card-glow">
                    <span className="material-symbols-outlined text-brand-gold text-[28px] block mb-2">
                      {tech.icon}
                    </span>
                    <h3 className="body-mono-bold text-brand-gold mb-2">
                      {tech.title}
                    </h3>
                    <p className="body-mono opacity-70">{tech.description}</p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
