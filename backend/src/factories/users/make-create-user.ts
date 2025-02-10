import { PrismaUserRepository } from "@/repository/prisma-user-repository";
import { PasswordHasherAdapter } from "@/adapters/password-hasher";
import { CreateUserUseCase } from "@/use-cases";
import { CreateUserController } from "@/http/controllers/user";

export const makeCreateUserController = () => {
  const userRepository = new PrismaUserRepository();
  const passwordHasher = new PasswordHasherAdapter();
  const createUserUseCase = new CreateUserUseCase(userRepository, passwordHasher);
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};
