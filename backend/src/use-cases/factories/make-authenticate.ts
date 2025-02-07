import { PrismaUserRepository } from "@/repository/prisma-user-repository";
import { AuthenticateUseCase } from "../authenticate";
import { PasswordCompareAdapter } from "@/adapters/password-compare";

export const makeAuthenticateUseCase = () => {
  const userRepository = new PrismaUserRepository();
  const passwordCompare = new PasswordCompareAdapter()
  const authenticateUseCase = new AuthenticateUseCase(userRepository, passwordCompare);

  return authenticateUseCase;
}