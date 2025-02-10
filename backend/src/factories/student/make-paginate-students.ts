import { PaginateStudentsController } from "@/http/controllers/student";
import { PrismaStudentsRepository } from "@/repository/prisma-student-repository";
import { PaginateStudentsUseCase } from "@/use-cases";

export const makePaginateStudentsController = () => {
  const studentRepository = new PrismaStudentsRepository();
  const paginateStudentsUseCase = new PaginateStudentsUseCase(studentRepository);
  const paginateStudentsController = new PaginateStudentsController(paginateStudentsUseCase);

  return paginateStudentsController;
};
