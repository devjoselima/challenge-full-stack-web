import { CreateStudentController } from "@/http/controllers/student";
import { PrismaStudentsRepository } from "@/repositories/prisma-student-repository";
import { CreateStudentUseCase } from "@/use-cases/student";

export const makeCreateStudentController = () => {
  const studentRepository = new PrismaStudentsRepository();
  const createStudentUseCase = new CreateStudentUseCase(studentRepository);
  const createStudentController = new CreateStudentController(createStudentUseCase);

  return createStudentController;
};
