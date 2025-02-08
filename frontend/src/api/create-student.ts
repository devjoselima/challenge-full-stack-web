
import { api } from "./axios"

interface CreateStudentBody {
  ra: string;
  name: string;
  email: string;
  cpf: string;
}

export const createStudent = async ({ ra, name, email, cpf }: CreateStudentBody) => {
  const response = await api.post('/students', { ra, name, email, cpf });
  return response.data;
}
