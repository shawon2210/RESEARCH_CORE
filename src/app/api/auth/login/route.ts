import { NextRequest, NextResponse } from "next/server";
import { LoginSchema } from "@/lib/validations";

const AUTH_USERNAME = process.env.AUTH_USERNAME || "admin";
const AUTH_PASSWORD = process.env.AUTH_PASSWORD || "research_core";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid credentials format", timestamp: new Date().toISOString() },
        { status: 400 }
      );
    }

    const { username, password } = parsed.data;

    if (username !== AUTH_USERNAME || password !== AUTH_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid credentials", timestamp: new Date().toISOString() },
        { status: 401 }
      );
    }

    const token = Buffer.from(`${username}:${Date.now()}`).toString("base64");

    const response = NextResponse.json(
      { success: true, token, timestamp: new Date().toISOString() },
      { status: 200 }
    );

    response.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body", timestamp: new Date().toISOString() },
      { status: 400 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
