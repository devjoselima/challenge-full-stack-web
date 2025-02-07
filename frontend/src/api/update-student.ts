import { useAuthStore } from "@/store/auth";
import { api } from "./axios"

interface UpdateStudentBody {
  name?: string;
  email?: string;
}

export const updateStudent = async (ra: string, body: UpdateStudentBody) => {
  const authStore = useAuthStore();
  const token = authStore.token;

  const response = await api.patch(`/students/${ra}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}
