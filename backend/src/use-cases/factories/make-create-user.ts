import { PrismaUserRepository } from "@/repository/prisma-user-repository";
import { CreateUserUseCase } from "../create-user";
import { PasswordHasherAdapter } from "@/adapters/password-hasher";

export const makeCreateUserUseCase = () => {
  const userRepository = new PrismaUserRepository();
  const passwordHasher = new PasswordHasherAdapter();
  const createUserUseCase = new CreateUserUseCase(userRepository, passwordHasher);

  return createUserUseCase;
};
