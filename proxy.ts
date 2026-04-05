// middleware.ts  (project root)
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();

  return NextResponse.next();
}

export const config = {
  matcher: "/api/anthropic/:path*",
};
