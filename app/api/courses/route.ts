import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
    headers: {
      Authorizaton: `Bearer ${token}`,
    },
  });

  const data = res.json();

  return data;
}
