import { UserAlreadyExistsError } from "@/errors/user-already-exists";
import { IUserRepository } from "@/repository/user-repository";
import { hash } from "bcryptjs";

interface CreateUserBody {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, email, password }: CreateUserBody) {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return { user };
  }
}
