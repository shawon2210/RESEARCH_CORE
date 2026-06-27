import { connectToDatabase } from "@/lib/mongodb";
import { Activity } from "@/lib/models/Activity";
import { handleApiGet, OPTIONS as baseOptions } from "@/lib/api-utils";
import { generateDemoActivity } from "@/lib/demo-data";

export async function GET() {
  return handleApiGet(async () => {
    await connectToDatabase();
    const activities = await Activity.find().sort({ timestamp: -1 }).limit(20).lean();
    return activities.length ? activities : generateDemoActivity();
  }, generateDemoActivity());
}

export { baseOptions as OPTIONS };
