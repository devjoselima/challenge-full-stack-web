import { PrismaUserRepository } from "@/repository/prisma-user-repository";
import { AuthenticateUseCase } from "../authenticate";

export const makeAuthenticateUseCase = () => {
  const userRepository = new PrismaUserRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository);

  return authenticateUseCase;
}