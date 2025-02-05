import { PrismaStudentsRepository } from "@/repository/prisma-student-repository";
import { PaginateStudentsUseCase } from "@/use-cases";

export const makePaginateStudentsUseCase = () => {
  const studentRepository = new PrismaStudentsRepository();
  const createStudentUseCase = new PaginateStudentsUseCase(studentRepository);

  return createStudentUseCase;
};
