import api from "@/utils/axios";
import { cookies } from "next/headers";

export async function getInprogressCourses() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await api.get("/courses/in-progress", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
