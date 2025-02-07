import { PrismaStudentsRepository } from "@/repository/prisma-student-repository";
import { PrismaUserRepository } from "@/repository/prisma-user-repository";
import { CreateUserUseCase } from "../create-user";

export const makeCreateUserUseCase = () => {
  const userRepository = new PrismaUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);

  return createUserUseCase;
};
