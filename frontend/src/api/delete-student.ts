import { api } from "./axios"

interface DeleteStudentParams {
  ra: string;
}

interface DeleteStudentResponse {
  deletedRa: string
}

export const deleteStudent = async ({ ra }: DeleteStudentParams) => {
  const response = await api.delete<DeleteStudentResponse>(`/students/${ra}`);

  return response.data
}