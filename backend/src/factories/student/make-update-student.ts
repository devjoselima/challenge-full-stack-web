import { UpdateStudentController } from "@/http/controllers/student";
import { PrismaStudentsRepository } from "@/repository/prisma-student-repository";
import { UpdateStudentUseCase } from "@/use-cases";

export const makeUpdateStudentController = () => {
  const studentRepository = new PrismaStudentsRepository();
  const updateStudentUseCase = new UpdateStudentUseCase(studentRepository);
  const updateStudentController = new UpdateStudentController(updateStudentUseCase);

  return updateStudentController;
};
