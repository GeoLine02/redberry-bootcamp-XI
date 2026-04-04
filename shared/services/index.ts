import api from "@/utils/axios";

export const updateProfile = async (formData: FormData, token: string) => {
  try {
    const res = await api.put("/profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
