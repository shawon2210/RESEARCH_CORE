import { connectToDatabase } from "@/lib/mongodb";
import { Node } from "@/lib/models/Node";
import { handleApiGet, OPTIONS as baseOptions } from "@/lib/api-utils";
import { generateDemoNodes } from "@/lib/demo-data";

export async function GET() {
  return handleApiGet(async () => {
    await connectToDatabase();
    const nodes = await Node.find().sort({ name: 1 }).lean();
    return nodes.length ? nodes : generateDemoNodes();
  }, generateDemoNodes());
}

export { baseOptions as OPTIONS };
