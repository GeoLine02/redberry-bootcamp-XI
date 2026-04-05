import api from "@/utils/axios";
import { cookies } from "next/headers";

export async function getCourseDetails(courseId: number) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    console.log(token);
    const res = await api.get(`/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}
