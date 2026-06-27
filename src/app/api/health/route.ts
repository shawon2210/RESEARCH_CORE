import { NextResponse } from "next/server";

export async function GET() {
  const start = Date.now();
  const checks: Record<string, string> = {};

  checks["timestamp"] = new Date().toISOString();

  try {
    const mongoose = await import("mongoose");
    const state = mongoose.default.connection.readyState;
    checks["database"] =
      state === 1 ? "connected" : state === 2 ? "connecting" : "disconnected";
  } catch {
    checks["database"] = "unavailable";
  }

  const elapsed = Date.now() - start;
  checks["response_time_ms"] = `${elapsed}`;

  const healthy = checks["database"] === "connected" || checks["database"] === "unavailable";

  return NextResponse.json(
    {
      status: healthy ? "healthy" : "degraded",
      version: process.env.npm_package_version || "0.1.0",
      environment: process.env.NODE_ENV || "development",
      checks,
    },
    { status: healthy ? 200 : 503 }
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
