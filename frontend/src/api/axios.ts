import axios from "axios";
import { useAuthStore } from "@/store/auth";

const API_BASE_URL = "http://localhost:3333/";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  const excludedRoutes = ["/authenticate", "/register"];

  if (token && !excludedRoutes.some(route => config.url?.includes(route))) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
