import { describe, it, expect } from "vitest";
import { generateDemoNodes, generateDemoStreams, generateDemoActivity, generateDemoMetrics } from "@/lib/demo-data";

describe("demo data generators", () => {
  it("generates nodes with correct shape", () => {
    const nodes = generateDemoNodes();
    expect(nodes.length).toBeGreaterThan(0);
    expect(nodes[0]).toHaveProperty("name");
    expect(nodes[0]).toHaveProperty("status");
    expect(nodes[0]).toHaveProperty("health");
    expect(nodes[0]).toHaveProperty("ip");
  });

  it("generates streams with correct shape", () => {
    const streams = generateDemoStreams(5);
    expect(streams).toHaveLength(5);
    expect(streams[0]).toHaveProperty("streamId");
    expect(streams[0]).toHaveProperty("rateMbps");
  });

  it("generates activity with correct shape", () => {
    const activity = generateDemoActivity(10);
    expect(activity).toHaveLength(10);
    expect(activity[0]).toHaveProperty("event");
    expect(activity[0]).toHaveProperty("status");
  });

  it("generates metrics with correct shape", () => {
    const metrics = generateDemoMetrics();
    expect(metrics).toHaveProperty("throughput");
    expect(metrics).toHaveProperty("latency");
    expect(metrics).toHaveProperty("nodesOnline");
  });
});
