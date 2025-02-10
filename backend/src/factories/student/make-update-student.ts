import { UpdateStudentController } from "@/http/controllers/student";
import { PrismaStudentsRepository } from "@/repositories/prisma-student-repository";
import { UpdateStudentUseCase } from "@/use-cases/student";

export const makeUpdateStudentController = () => {
  const studentRepository = new PrismaStudentsRepository();
  const updateStudentUseCase = new UpdateStudentUseCase(studentRepository);
  const updateStudentController = new UpdateStudentController(updateStudentUseCase);

  return updateStudentController;
};
