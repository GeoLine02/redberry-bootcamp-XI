import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookeiStore = await cookies();
  const token = cookeiStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  const response = NextResponse.json(data);

  return response;
}
