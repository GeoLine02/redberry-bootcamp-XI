import api from "@/utils/axios";
import axios from "axios";

export async function fetchMe() {
  try {
    const res = await axios.get("/api/me");

    return res.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

export async function signUp(formData: FormData) {
  try {
    const res = await api.post("/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function signIn(data: { email: string; password: string }) {
  try {
    // call NEXT.JS route handler (not backend)
    const res = await axios.post("/api/auth/login", data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function logOut() {
  try {
    const res = await api.post("/logout");
    return res.data;
  } catch (error) {
    throw error;
  }
}
