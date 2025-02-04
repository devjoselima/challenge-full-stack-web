import { PrismaStudentsRepository } from "@/repository/prisma-student-repository";
import { DeleteStudentUseCase } from "@/use-cases";

export const makeDeleteStudentUseCase = () => {
  const studentRepository = new PrismaStudentsRepository();
  const deleteStudentUseCase = new DeleteStudentUseCase(studentRepository);

  return deleteStudentUseCase;
};
