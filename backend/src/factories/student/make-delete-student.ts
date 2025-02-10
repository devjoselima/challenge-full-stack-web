import { DeleteStudentController } from "@/http/controllers/student/delete-student";
import { PrismaStudentsRepository } from "@/repository/prisma-student-repository";
import { DeleteStudentUseCase } from "@/use-cases";

export const makeDeleteStudentController = () => {
  const studentRepository = new PrismaStudentsRepository();
  const deleteStudentUseCase = new DeleteStudentUseCase(studentRepository);
  const deleteStudentController = new DeleteStudentController(deleteStudentUseCase);

  return deleteStudentController;
};
