import { NextResponse } from "next/server";

export function apiError(message: string, status: number = 500) {
  return NextResponse.json(
    {
      error: message,
      timestamp: new Date().toISOString(),
      status,
    },
    { status }
  );
}

export function apiSuccess<T>(data: T) {
  return NextResponse.json(data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function handleApiGet<T>(
  fetcher: () => Promise<T>,
  fallback: T
): Promise<NextResponse> {
  try {
    const data = await fetcher();
    return apiSuccess(data);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[API] Fallback triggered:", err instanceof Error ? err.message : err);
    }
    return apiSuccess(fallback);
  }
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
