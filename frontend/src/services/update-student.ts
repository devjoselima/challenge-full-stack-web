import { api } from "./axios"
interface UpdateStudentBody {
  name?: string;
  email?: string;
}

export const updateStudent = async (ra: string, body: UpdateStudentBody) => {
  const response = await api.patch(`/students/${ra}`, body);
  return response.data;
}
