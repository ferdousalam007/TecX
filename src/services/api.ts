import axios from "axios";
import { cookies } from "next/headers";
// Set up axios with the base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

// Interceptor: Attach authorization token if present in cookies
api.interceptors.request.use((config) => {
  const token = cookies().get("token")?.value;
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default api;
