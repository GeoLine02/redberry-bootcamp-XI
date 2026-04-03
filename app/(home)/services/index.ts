import api from "@/utils/axios";

export async function getFeaturedCourses() {
  try {
    const res = await api.get("/courses/featured");
    return res.data;
  } catch (error) {
    throw error;
  }
}
