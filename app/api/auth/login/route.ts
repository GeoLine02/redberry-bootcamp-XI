import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // call your backend login
  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await backendRes.json();
  const response = NextResponse.json(data);

  // ✅ SET COOKIE HERE
  response.cookies.set("accessToken", data.data.token, {
    httpOnly: true, // 🔥 cannot be accessed by JS
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}
