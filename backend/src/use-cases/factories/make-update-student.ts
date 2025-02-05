import { PrismaStudentsRepository } from "@/repository/prisma-student-repository";
import { UpdateStudentUseCase } from "@/use-cases";

export const makeUpdateStudentUseCase = () => {
  const studentRepository = new PrismaStudentsRepository();
  const updateStudentUseCase = new UpdateStudentUseCase(studentRepository);

  return updateStudentUseCase;
};
