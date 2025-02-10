import { UserAlreadyExistsError } from "@/errors/user-already-exists";
import { IUserRepository } from "@/repositories/interfaces/user-repository";
import { PasswordHasherAdapter } from "@/adapters/password-hasher";

interface CreateUserBody {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: PasswordHasherAdapter
  ) {}

  async execute({ name, email, password }: CreateUserBody) {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await this.passwordHasher.execute(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return { user };
  }
}
