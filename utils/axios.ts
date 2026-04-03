import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // withCredentials: true, // send cookies if backend uses them
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
