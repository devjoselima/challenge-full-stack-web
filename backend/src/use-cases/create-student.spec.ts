import { InMemoryStudentRepository } from "@/repository/in-memory/in-memory-student-repository";
import { beforeEach, describe, expect, it, test } from "vitest";
import { CreateStudentUseCase } from "./create-student";
import {
  StudentCpfAlreadyExistsError,
  StudentEmailAlreadyExistsError,
  StudentRaAlreadyExistsError,
} from "@/errors";

let createStudentRepository: InMemoryStudentRepository;
let sut: CreateStudentUseCase;

describe("Create User Use Case", () => {
  beforeEach(() => {
    createStudentRepository = new InMemoryStudentRepository();
    sut = new CreateStudentUseCase(createStudentRepository);
  });

  it("should create a new student", async () => {
    const { student } = await sut.execute({
      ra: "123456",
      name: "John Doe",
      email: "Johndoe@example.com",
      cpf: "12345678900",
    });

    expect(student).toEqual({
      ra: "123456",
      name: "John Doe",
      email: "Johndoe@example.com",
      cpf: "12345678900",
    });
  });

  it("should not create a student with an existing email", async () => {
    const existingEmail = "johndoe@example.com";

    await sut.execute({
      ra: "123456",
      name: "John Doe",
      email: existingEmail,
      cpf: "12345678900",
    });

    await expect(() =>
      sut.execute({
        ra: "654321",
        name: "Jane Doe",
        email: existingEmail,
        cpf: "12345678900",
      })
    ).rejects.toBeInstanceOf(StudentEmailAlreadyExistsError);
  });

  it("should not create a student with an existing RA", async () => {
    const existingRa = "123456";

    await sut.execute({
      ra: existingRa,
      name: "John Doe",
      email: "johndoe@example.com",
      cpf: "12345678900",
    });

    await expect(() =>
      sut.execute({
        ra: existingRa,
        name: "Jane Doe",
        email: "johndoe2@example.com",
        cpf: "12345678900",
      })
    ).rejects.toBeInstanceOf(StudentRaAlreadyExistsError);
  });

  it("should not create a student with an existing CPF", async () => {
    const existingcpf = "12345678900";

    await sut.execute({
      ra: "12345",
      name: "John Doe",
      email: "johndoe@example.com",
      cpf: existingcpf,
    });

    await expect(() =>
      sut.execute({
        ra: "54321",
        name: "Jane Doe",
        email: "johndoe2@example.com",
        cpf: existingcpf,
      })
    ).rejects.toBeInstanceOf(StudentCpfAlreadyExistsError);
  });
});
