import { PrismaStudentsRepository } from "@/repository/prisma-student-repository";
import { CreateStudentUseCase } from "@/use-cases";

export const makeCreateStudentUseCase = () => {
  const studentRepository = new PrismaStudentsRepository();
  const createStudentUseCase = new CreateStudentUseCase(studentRepository);

  return createStudentUseCase;
};
