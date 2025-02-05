import type { Student } from "@/@types/student";
import { api } from "./axios"

interface PaginateStudentsQuery {
  page: number;
  itemsPerPage: number;
}

interface PaginateStudentResponse {
  students: Student[];
  page: number;
  itemsPerPage: number
  total: number
}

export const paginateStudents = async ({page, itemsPerPage}: PaginateStudentsQuery) => {
  const response = await api.get<PaginateStudentResponse>("/students", {
    params: {
      page,
      itemsPerPage
    }
  });

  return response.data
}