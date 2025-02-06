import { api } from "./axios"

interface UpdateStudentBody {
  name?: string;
  email?: string;
}

export const updateStudent = async (ra: string, body: UpdateStudentBody) => {
  console.log(ra)
  console.log(body)
  const response = await api.patch(`/students/${ra}`, body);

  return response.data
}