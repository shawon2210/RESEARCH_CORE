import mongoose from "mongoose";
import { generateDemoNodes, generateDemoStreams, generateDemoActivity } from "../src/lib/demo-data";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/research-core";

async function seed() {
  console.log("[SEED] Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("[SEED] Connected.");

  const { Node } = await import("../src/lib/models/Node");
  const { Stream } = await import("../src/lib/models/Stream");
  const { Activity } = await import("../src/lib/models/Activity");

  const existingNodes = await Node.countDocuments();
  if (existingNodes > 0) {
    console.log(`[SEED] Database already has ${existingNodes} nodes. Skipping.`);
    await mongoose.disconnect();
    return;
  }

  console.log("[SEED] Seeding nodes...");
  await Node.insertMany(generateDemoNodes());

  console.log("[SEED] Seeding streams...");
  await Stream.insertMany(generateDemoStreams());

  console.log("[SEED] Seeding activity...");
  await Activity.insertMany(generateDemoActivity());

  console.log("[SEED] Done. Disconnecting.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("[SEED] Failed:", err);
  process.exit(1);
});
