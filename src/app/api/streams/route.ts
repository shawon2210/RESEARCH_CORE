import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Stream } from "@/lib/models/Stream";
import { handleApiGet, apiError, OPTIONS as baseOptions } from "@/lib/api-utils";

const fallback: Array<{ streamId: string; node: string; status: string; rate: string; rateMbps: number }> = [];

export async function GET() {
  return handleApiGet(async () => {
    await connectToDatabase();
    const streams = await Stream.find().sort({ lastActive: -1 }).lean();
    return streams;
  }, fallback);
}

export { baseOptions as OPTIONS };
