import { DeleteStudentController } from "@/http/controllers/student";
import { PrismaStudentsRepository } from "@/repositories/prisma-student-repository";
import { DeleteStudentUseCase } from "@/use-cases/student";

export const makeDeleteStudentController = () => {
  const studentRepository = new PrismaStudentsRepository();
  const deleteStudentUseCase = new DeleteStudentUseCase(studentRepository);
  const deleteStudentController = new DeleteStudentController(deleteStudentUseCase);

  return deleteStudentController;
};
