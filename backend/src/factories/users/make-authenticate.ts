import { PrismaUserRepository } from "@/repository/prisma-user-repository";
import { AuthenticateUseCase } from "@/use-cases";
import { PasswordCompareAdapter } from "@/adapters";
import { AuthenticateController } from "@/http/controllers/user";

export const makeAuthenticateController = () => {
  const userRepository = new PrismaUserRepository();
  const passwordCompare = new PasswordCompareAdapter()
  const authenticateUseCase = new AuthenticateUseCase(userRepository, passwordCompare);
  const authenticateController = new AuthenticateController(authenticateUseCase);

  return authenticateController;
}