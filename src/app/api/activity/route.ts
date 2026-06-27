import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Activity } from "@/lib/models/Activity";
import { handleApiGet, apiError, OPTIONS as baseOptions } from "@/lib/api-utils";

const fallback = [
  { timestamp: "--", node: "--", event: "Awaiting connection...", status: "OK" },
];

export async function GET() {
  return handleApiGet(async () => {
    await connectToDatabase();
    const activities = await Activity.find()
      .sort({ timestamp: -1 })
      .limit(20)
      .lean();
    return activities.length ? activities : fallback;
  }, fallback);
}

export { baseOptions as OPTIONS };
