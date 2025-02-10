import { PaginateStudentsController } from "@/http/controllers/student";
import { PrismaStudentsRepository } from "@/repositories/prisma-student-repository";
import { PaginateStudentsUseCase } from "@/use-cases/student";

export const makePaginateStudentsController = () => {
  const studentRepository = new PrismaStudentsRepository();
  const paginateStudentsUseCase = new PaginateStudentsUseCase(studentRepository);
  const paginateStudentsController = new PaginateStudentsController(paginateStudentsUseCase);

  return paginateStudentsController;
};
