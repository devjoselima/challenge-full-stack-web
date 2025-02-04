import { PrismaStudentsRepository } from "@/repository/prisma-student-repository";
import { GetAllStudentsUseCase } from "@/use-cases";

export const makeGetAllStudentsUseCase = () => {
  const studentRepository = new PrismaStudentsRepository();
  const createStudentUseCase = new GetAllStudentsUseCase(studentRepository);

  return createStudentUseCase;
};
