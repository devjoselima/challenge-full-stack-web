import { useAuthStore } from "@/store/auth";
import { api } from "./axios"

interface DeleteStudentParams {
  ra: string;
}

interface DeleteStudentResponse {
  deletedRa: string;
}

export const deleteStudent = async ({ ra }: DeleteStudentParams) => {
  const authStore = useAuthStore();
  const token = authStore.token;

  const response = await api.delete<DeleteStudentResponse>(`/students/${ra}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}
