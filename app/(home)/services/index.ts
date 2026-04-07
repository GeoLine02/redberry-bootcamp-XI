import api from "@/utils/axios";
import axios from "axios";

export async function getFeaturedCourses() {
  try {
    const res = await api.get("/courses/featured");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getInprogressCourses() {
  try {
    const res = await axios.get("/api/courses/inprogress");

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
