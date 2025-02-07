import { InMemoryUserRepository } from "@/repository/in-memory/in-memory-user-repository";
import { PasswordHasherAdapter } from "@/adapters/password-hasher";
import { CreateUserUseCase } from "./create-user";
import { UserAlreadyExistsError } from "@/errors/user-already-exists";
import { beforeEach, describe, expect, it } from "vitest";

let userRepository: InMemoryUserRepository;
let passwordHasher: PasswordHasherAdapter;
let sut: CreateUserUseCase;

describe("Create User Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    passwordHasher = new PasswordHasherAdapter();
    sut = new CreateUserUseCase(userRepository, passwordHasher);
  });

  it("should create a new user", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
    });

    expect(user).toHaveProperty("id");
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("johndoe@example.com");
    expect(user.password).not.toBe("password");
  });

  it("should not create a user with an existing email", async () => {
    const email = "johndoe@example.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "password",
    });

    await expect(() =>
      sut.execute({
        name: "Jane Doe",
        email,
        password: "password",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should hash the user password before saving", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
    });

    expect(user.password).not.toBe("password");
  });
});
