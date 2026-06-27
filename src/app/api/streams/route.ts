import { connectToDatabase } from "@/lib/mongodb";
import { Stream } from "@/lib/models/Stream";
import { handleApiGet, OPTIONS as baseOptions } from "@/lib/api-utils";
import { generateDemoStreams } from "@/lib/demo-data";

export async function GET() {
  return handleApiGet(async () => {
    await connectToDatabase();
    const streams = await Stream.find().sort({ lastActive: -1 }).lean();
    return streams.length ? streams : generateDemoStreams();
  }, generateDemoStreams());
}

export { baseOptions as OPTIONS };
