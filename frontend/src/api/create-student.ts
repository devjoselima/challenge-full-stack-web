import { useAuthStore } from "@/store/auth";
import { api } from "./axios"

interface CreateStudentBody {
  ra: string;
  name: string;
  email: string;
  cpf: string;
}

export const createStudent = async ({ ra, name, email, cpf }: CreateStudentBody) => {
  const authStore = useAuthStore();
  const token = authStore.token;

  const response = await api.post('/students', { ra, name, email, cpf }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}
