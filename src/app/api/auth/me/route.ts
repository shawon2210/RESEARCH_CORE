import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = request.cookies.get("session");

  if (!session || !validateSession(session.value)) {
    return NextResponse.json(
      { authenticated: false, timestamp: new Date().toISOString() },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      authenticated: true,
      user: { username: "admin", role: "operator" },
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
