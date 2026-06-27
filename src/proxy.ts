import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRequiredPaths = [
  "/dashboard/protected",
  "/api/admin",
];

function isAuthRequired(pathname: string): boolean {
  return authRequiredPaths.some((p) => pathname.startsWith(p));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isAuthRequired(pathname)) {
    return NextResponse.next();
  }

  const session = request.cookies.get("session");

  if (!session || !session.value) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Unauthorized", timestamp: new Date().toISOString() },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|favicon.svg).*)"],
};
