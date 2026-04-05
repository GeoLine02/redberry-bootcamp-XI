import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    // return the actual status code (422) so axios throws in catch block
    return NextResponse.json(data, { status: res.status });
  }

  const response = NextResponse.json(data);

  response.cookies.set("accessToken", data.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
