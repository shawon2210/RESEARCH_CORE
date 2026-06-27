import mongoose from "mongoose";
import { Stream } from "../src/lib/models/Stream";
import { Node } from "../src/lib/models/Node";
import { Activity } from "../src/lib/models/Activity";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI environment variable is required");
  process.exit(1);
}

const streams = [
  { streamId: "str_alpha", node: "NODE_ALPHA", status: "ONLINE" as const, rate: "847mb/s", rateMbps: 847 },
  { streamId: "str_beta", node: "NODE_BETA", status: "ONLINE" as const, rate: "632mb/s", rateMbps: 632 },
  { streamId: "str_gamma", node: "NODE_GAMMA", status: "DEGRADED" as const, rate: "124mb/s", rateMbps: 124 },
  { streamId: "str_delta", node: "NODE_DELTA", status: "ONLINE" as const, rate: "2.1gb/s", rateMbps: 2100 },
  { streamId: "str_epsilon", node: "NODE_EPSILON", status: "ONLINE" as const, rate: "456mb/s", rateMbps: 456 },
  { streamId: "str_zeta", node: "NODE_ZETA", status: "OFFLINE" as const, rate: "0mb/s", rateMbps: 0 },
];

const nodes = [
  { name: "NODE_ALPHA", status: "ONLINE" as const, health: 98, ip: "192.168.1.10" },
  { name: "NODE_BETA", status: "ONLINE" as const, health: 87, ip: "192.168.1.11" },
  { name: "NODE_GAMMA", status: "DEGRADED" as const, health: 62, ip: "192.168.1.12" },
  { name: "NODE_DELTA", status: "ONLINE" as const, health: 94, ip: "192.168.1.13" },
  { name: "NODE_EPSILON", status: "ONLINE" as const, health: 91, ip: "192.168.1.14" },
  { name: "NODE_ZETA", status: "OFFLINE" as const, health: 0, ip: "192.168.1.15" },
];

function randomEvent(node: string): { event: string; status: "OK" | "ERR" | "WARN" } {
  const events = [
    { event: "QUANTUM_HASH_VERIFIED", status: "OK" as const },
    { event: "STREAM_SYNC_COMPLETE", status: "OK" as const },
    { event: "DATA_PARSE_ERROR", status: "ERR" as const },
    { event: "ROUTING_TABLE_UPDATED", status: "OK" as const },
    { event: "CONNECTION_ESTABLISHED", status: "OK" as const },
    { event: "DATA_PARSE_RETRY", status: "WARN" as const },
    { event: "HEARTBEAT_RECEIVED", status: "OK" as const },
    { event: "BUFFER_FLUSHED", status: "OK" as const },
  ];
  return events[Math.floor(Math.random() * events.length)];
}

const now = Date.now();

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("Connected to MongoDB");

    await Promise.all([
      Stream.deleteMany({}),
      Node.deleteMany({}),
      Activity.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    await Promise.all([
      Stream.insertMany(streams),
      Node.insertMany(nodes),
    ]);
    console.log("Seeded streams and nodes");

    const activities = [];
    for (let i = 0; i < 50; i++) {
      const node = nodes[Math.floor(Math.random() * nodes.length)];
      const { event, status } = randomEvent(node.name);
      activities.push({
        timestamp: new Date(now - i * 45000),
        node: node.name,
        event,
        status,
      });
    }

    await Activity.insertMany(activities);
    console.log(`Seeded ${activities.length} activity records`);

    console.log("Seed complete!");
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
