import type { Metadata } from "next";
import { MotionSection } from "@/components/animations/MotionSection";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

export const metadata: Metadata = {
  title: "Protocols",
  description: "System protocols, security layers, and cryptographic infrastructure powering RESEARCH_CORE.",
};

const protocols = [
  {
    id: "QRT-001",
    name: "QUANTUM RESISTANT TUNNELING",
    status: "ACTIVE",
    version: "v3.2.1",
    description:
      "Post-quantum cryptographic tunnel ensuring data integrity across all node communications. Implements lattice-based key encapsulation.",
    specs: ["256-bit security", "<2ms overhead", "Zero-trust architecture"],
  },
  {
    id: "STR-002",
    name: "STREAM REBALANCING PROTOCOL",
    status: "ACTIVE",
    version: "v2.8.4",
    description:
      "Dynamic load distribution across the node topology. Automatically reroutes streams during node degradation or network partition events.",
    specs: ["<50ms failover", "21-node quorum", "Real-time telemetry"],
  },
  {
    id: "AUD-003",
    name: "AUDIT TRAIL VERIFICATION",
    status: "ACTIVE",
    version: "v4.0.0",
    description:
      "Immutable ledger for all system mutations. Every state change is cryptographically signed and verified by the node cluster.",
    specs: ["Append-only log", "Merkle tree hashing", "7-year retention"],
  },
  {
    id: "SEC-004",
    name: "SECURE ENCLAVE INIT",
    status: "ACTIVE",
    version: "v1.9.2",
    description:
      "Hardware-backed secure enclave initialization for sensitive computation. Isolates cryptographic operations from the main processing pipeline.",
    specs: ["TPM 2.0 attestation", "Memory encryption", "Side-channel hardened"],
  },
  {
    id: "SYN-005",
    name: "SYNTAX PARSING LAYER",
    status: "DEGRADED",
    version: "v5.1.0",
    description:
      "Deep structural analysis of incoming data streams. Extracts schema, detects anomalies, and normalizes formats before processing.",
    specs: ["1M events/sec", "Auto-schema discovery", "Anomaly scoring"],
  },
  {
    id: "COM-006",
    name: "COMPRESSION CORE",
    status: "ACTIVE",
    version: "v2.3.7",
    description:
      "Lossless compression engine for inter-node data transfer. Reduces bandwidth consumption while maintaining full data fidelity.",
    specs: ["4:1 avg ratio", "<100μs latency", "Streaming compatible"],
  },
];

export default function ProtocolsPage() {
  return (
    <>
      <MotionSection>
        <section className="bg-surface-dark py-20 max-md:py-10 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)] border-b border-white/15">
          <div className="max-w-[var(--max-width)] mx-auto">
            <div className="border-t border-brand-gold pt-4">
              <p className="body-mono text-brand-gold mb-2 tracking-[0.1em]">
                04 // INFRASTRUCTURE
              </p>
              <h1 className="heading-lg text-text-on-dark text-glow">
                PROTOCOLS
              </h1>
              <p className="body-mono text-text-on-dark opacity-60 mt-4 max-w-xl leading-relaxed">
                The system backbone — encryption, routing, auditing, and
                computation layers that ensure data integrity and operational
                continuity across all nodes.
              </p>
            </div>
          </div>
        </section>
      </MotionSection>

      <MotionSection>
        <section className="bg-surface-dark-alt py-20 max-md:py-10 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)]">
          <div className="max-w-[var(--max-width)] mx-auto">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {protocols.map((protocol) => (
                <StaggerItem key={protocol.id}>
                  <Card variant="dark" className="card-glow" hoverable>
                    <div className="flex items-start justify-between mb-3">
                      <span className="body-mono text-brand-gold opacity-60">
                        {protocol.id}
                      </span>
                      <Tag
                        variant={
                          protocol.status === "ACTIVE"
                            ? "ok"
                            : "warn"
                        }
                      >
                        {protocol.status}
                      </Tag>
                    </div>
                    <h3 className="body-mono-bold text-brand-gold mb-1">
                      {protocol.name}
                    </h3>
                    <p className="body-mono opacity-60 text-text-on-dark mb-4 leading-relaxed">
                      {protocol.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {protocol.specs.map((spec) => (
                        <span
                          key={spec}
                          className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono border border-white/20 text-text-on-dark opacity-70"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="body-mono text-text-on-dark opacity-40 text-[10px]">
                      {protocol.version}
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </MotionSection>
    </>
  );
}
