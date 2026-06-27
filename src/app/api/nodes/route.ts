import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Node } from "@/lib/models/Node";
import { handleApiGet, apiError, OPTIONS as baseOptions } from "@/lib/api-utils";

const fallback: Array<{ name: string; status: string; health: number }> = [];

export async function GET() {
  return handleApiGet(async () => {
    await connectToDatabase();
    const nodes = await Node.find().sort({ name: 1 }).lean();
    return nodes;
  }, fallback);
}

export { baseOptions as OPTIONS };
