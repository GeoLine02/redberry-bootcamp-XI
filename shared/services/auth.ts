import api from "@/utils/axios";

export async function signUp(formData: FormData) {
  try {
    const res = await api.post("/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function signIn(data: { email: string; password: string }) {
  try {
    const res = await api.post("/login", data);
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
