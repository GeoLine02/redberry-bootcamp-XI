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
    const res = await axios.post("api/auth/register", formData);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.data?.errors) {
      throw error.response.data; // { message, errors: { username: [...] } }
    }
    throw error;
  }
}

export async function signIn(data: { email: string; password: string }) {
  try {
    const res = await axios.post("/api/auth/login", data);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    if (error.response?.data?.message) {
      throw error.response.data; // { message, errors: { username: [...] } }
    }
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
