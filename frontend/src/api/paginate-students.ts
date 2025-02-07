import type { Student } from "@/@types/student";
import { api } from "./axios"
import { useAuthStore } from "@/store/auth";

interface PaginateStudentsQuery {
  page: number;
  itemsPerPage: number;
  ra?: string
}

interface PaginateStudentResponse {
  students: Student[];
  page: number;
  itemsPerPage: number
  total: number
}

export const paginateStudents = async ({ page, itemsPerPage, ra }: PaginateStudentsQuery) => {
  const authStore = useAuthStore()
  const response = await api.get<PaginateStudentResponse>("/students", {
    params: {
      page,
      itemsPerPage,
      ra,
    },
    headers: {
      Authorization: `Bearer ${authStore.token}`
    }
  });

  return response.data
}