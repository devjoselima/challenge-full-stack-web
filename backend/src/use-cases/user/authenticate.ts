import { PasswordCompareAdapter } from "@/adapters/password-compare";
import { InvalidCredentialsError } from "@/errors";
import { IUserRepository } from "@/repository/user-repository";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: IUserRepository, 
    private passwordCompare: PasswordCompareAdapter
  ) {}

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await this.passwordCompare.execute(password, user.password);

    if(!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
