"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { Tag } from "@/components/ui/Tag";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { MotionSection } from "@/components/animations/MotionSection";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Counter } from "@/components/animations/Counter";
import type { StreamData, NodeData, ActivityData, MetricsData } from "@/lib/types";

const activityColumns = [
  { key: "timestamp", header: "TIMESTAMP" },
  { key: "node", header: "NODE" },
  { key: "event", header: "EVENT" },
  {
    key: "status",
    header: "STATUS",
    render: (item: ActivityData) => (
      <Tag
        variant={
          item.status === "OK" ? "ok" : item.status === "WARN" ? "warn" : "err"
        }
      >
        {item.status}
      </Tag>
    ),
  },
];

const streamColumns = [
  { key: "streamId", header: "STREAM ID" },
  { key: "node", header: "NODE" },
  {
    key: "status",
    header: "STATUS",
    render: (item: StreamData) => (
      <span
        className={
          item.status === "ONLINE"
            ? "text-[#4ecdc4]"
            : item.status === "DEGRADED"
              ? "text-brand-gold"
              : "text-[#ff6b6b]"
        }
      >
        {item.status}
      </span>
    ),
  },
  { key: "rate", header: "RATE" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [activity, setActivity] = useState<ActivityData[]>([]);
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [streams, setStreams] = useState<StreamData[]>([]);
  const [clock, setClock] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setFetchError(false);
      try {
        const [mRes, aRes, nRes, sRes] = await Promise.all([
          fetch("/api/metrics"),
          fetch("/api/activity"),
          fetch("/api/nodes"),
          fetch("/api/streams"),
        ]);

        if (cancelled) return;

        if (mRes.ok) setMetrics(await mRes.json());
        if (aRes.ok) setActivity(await aRes.json());
        if (nRes.ok) setNodes(await nRes.json());
        if (sRes.ok) setStreams(await sRes.json());
      } catch {
        if (!cancelled) setFetchError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();

    const interval = setInterval(() => {
      setClock(new Date().toTimeString().slice(0, 8));
    }, 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (fetchError && !loading) {
    return (
      <section className="bg-surface-dark py-20 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)] min-h-[60vh] flex items-center">
        <div className="max-w-[var(--max-width)] mx-auto w-full">
          <EmptyState
            icon="wifi_off"
            title="CONNECTION LOST"
            description="Unable to reach the monitoring cluster. Stream data may be delayed."
            action={
              <Button variant="primary" onClick={() => window.location.reload()}>
                RECONNECT
              </Button>
            }
          />
        </div>
      </section>
    );
  }

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
              <h1 className="heading-lg text-brand-gold">STREAMS</h1>
              <p className="body-mono mt-2 opacity-60">
                ACTIVE MONITORING // {loading ? "..." : `${nodes.length} NODES ONLINE`} // 0 ALERTS
              </p>
            </motion.div>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
                REFRESH
              </Button>
              <Button variant="primary" size="sm">
                NEW STREAM
              </Button>
            </motion.div>
          </div>
        </section>
      </MotionSection>

      {metrics && (
        <MotionSection>
          <section className="bg-surface-dark-alt py-8 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)]">
            <StaggerContainer className="max-w-[var(--max-width)] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              <StaggerItem>
                <Card variant="dark" className="card-glow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="label-caps opacity-60">THROUGHPUT</span>
                    <span className="material-symbols-outlined text-brand-gold text-[18px]">
                      arrow_upward
                    </span>
                  </div>
                  <div className="font-display text-[36px] leading-none text-text-on-dark">
                    {metrics.throughput}
                  </div>
                  <div className="body-mono text-brand-gold mt-2">
                    {metrics.throughputDelta}
                  </div>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card variant="dark" className="card-glow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="label-caps opacity-60">LATENCY</span>
                    <span className="material-symbols-outlined text-[#4ecdc4] text-[18px]">
                      arrow_downward
                    </span>
                  </div>
                  <Counter value={parseInt(metrics.latency)} suffix="ms" />
                  <div className="body-mono text-[#4ecdc4] mt-2">
                    {metrics.latencyDelta}
                  </div>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card variant="dark" className="card-glow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="label-caps opacity-60">NODES</span>
                    <span className="material-symbols-outlined text-brand-gold text-[18px]">
                      check_circle
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <Counter value={metrics.nodesOnline} />
                    <span className="text-[16px] text-text-on-dark opacity-70">/{metrics.nodesTotal}</span>
                  </div>
                  <div className="body-mono text-brand-gold mt-2">
                    All operational
                  </div>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card variant="dark" className="card-glow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="label-caps opacity-60">UPTIME</span>
                    <span className="material-symbols-outlined text-brand-gold text-[18px]">
                      schedule
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <Counter value={Math.round(metrics.uptimePercent * 10) / 10} decimals={1} />
                    <span className="text-[16px] text-text-on-dark opacity-70">%</span>
                  </div>
                  <div className="body-mono text-brand-gold mt-2">
                    {metrics.uptime} online
                  </div>
                </Card>
              </StaggerItem>
            </StaggerContainer>
          </section>
        </MotionSection>
      )}

      <MotionSection>
        <section className="bg-surface-dark section-beam py-20 max-md:py-10 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)]">
          <motion.div
            className="max-w-[var(--max-width)] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div className="md:col-span-8" variants={itemVariants}>
              <Card variant="dark" className="p-6 card-glow" hoverable>
                <CardHeader>
                  <h3 className="body-mono-bold text-brand-gold">STREAM ACTIVITY</h3>
                  <Tag variant="gold">LIVE</Tag>
                </CardHeader>
                {activity.length > 0 ? (
                  <Table columns={activityColumns} data={activity} hoverable />
                ) : (
                  <div className="body-mono text-center py-8 opacity-50">
                    {loading ? "LOADING..." : "NO RECENT ACTIVITY"}
                  </div>
                )}
              </Card>
            </motion.div>

            <motion.div className="md:col-span-4" variants={itemVariants}>
              <Card variant="dark" className="p-6 card-glow">
                <CardHeader>
                  <h3 className="body-mono-bold text-brand-gold">NODE HEALTH</h3>
                </CardHeader>
                {nodes.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {nodes.map((node) => (
                      <div key={node.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="body-mono-bold">{node.name}</span>
                          <span
                            className={
                              node.status === "ONLINE"
                                ? "text-[#4ecdc4]"
                                : node.status === "DEGRADED"
                                  ? "text-brand-gold"
                                  : "text-[#ff6b6b]"
                            }
                          >
                            {node.status}
                          </span>
                        </div>
                        <ProgressBar value={node.health} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="body-mono text-center py-8 opacity-50">
                    {loading ? "SCANNING..." : "NO NODES REGISTERED"}
                  </div>
                )}
              </Card>
            </motion.div>

            <motion.div className="md:col-span-12" variants={itemVariants}>
              <Card variant="dark" className="p-6 card-glow" hoverable>
                <CardHeader>
                  <h3 className="body-mono-bold text-brand-gold">DATA PIPELINE</h3>
                  <span className="body-mono opacity-50">
                    UPDATED: {clock || "HH:MM:SS"}
                  </span>
                </CardHeader>
                {streams.length > 0 ? (
                  <Table columns={streamColumns} data={streams} hoverable />
                ) : (
                  <div className="body-mono text-center py-8 opacity-50">
                    {loading ? "CONNECTING TO PIPELINE..." : "NO STREAM DATA AVAILABLE"}
                  </div>
                )}
              </Card>
            </motion.div>
          </motion.div>
        </section>
      </MotionSection>
    </>
  );
}
