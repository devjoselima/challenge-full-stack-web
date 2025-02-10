import { PasswordCompareAdapter } from "@/adapters/password-compare";
import { InvalidCredentialsError } from "@/errors";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { AuthenticateUseCase } from "@/use-cases/user";
import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";

let userRepository: InMemoryUserRepository;
let passwordCompare: PasswordCompareAdapter;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    passwordCompare = new PasswordCompareAdapter();
    sut = new AuthenticateUseCase(userRepository, passwordCompare);
  });

  it("should authenticate a user with correct credentials", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: await hash("password", 10),
    };

    await userRepository.create(user);

    const { user: authenticatedUser } = await sut.execute({
      email: user.email,
      password: "password",
    });
    expect(authenticatedUser.email).toEqual(user.email);
  });

  it("should throw InvalidCredentialsError if email is incorrect", async () => {
    await expect(() =>
      sut.execute({
        email: "wrong@example.com",
        password: "password",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should throw InvalidCredentialsError if password is incorrect", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
    };

    await userRepository.create(user);

    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "wrongPassword",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should throw InvalidCredentialsError if user does not exist", async () => {
    await expect(() =>
      sut.execute({
        email: "nonexistent@example.com",
        password: "password",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
