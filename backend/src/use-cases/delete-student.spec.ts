import { InMemoryStudentRepository } from "@/repository/in-memory/in-memory-student-repository";
import { beforeEach, describe, expect, it, test } from "vitest";
import { DeleteStudentUseCase } from "./delete-student";
import { CreateStudentUseCase } from "./create-student";
import { StudentRaDoesNotExistsError } from "@/errors";

let studentRepository: InMemoryStudentRepository;
let createStudentUseCase: CreateStudentUseCase;
let sut: DeleteStudentUseCase;

describe("Delete Student Use Case", () => {
  beforeEach(() => {
    studentRepository = new InMemoryStudentRepository();
    createStudentUseCase = new CreateStudentUseCase(studentRepository);
    sut = new DeleteStudentUseCase(studentRepository);
  });

  it("should delete a student", async () => {
    await createStudentUseCase.execute({
      ra: "123456",
      name: "John Doe",
      email: "johndow@example.com",
      cpf: "12345678900",
    });
    const result = await sut.execute({ ra: "123456" });

    if (result) {
      const { ra: deletedRa } = result;
      expect(deletedRa).toBe("123456");
    }
  });

  it("should throw StudentRaDoesNotExistsError if RA does not exists", async () => {
    await expect(() => sut.execute({ ra: "54321" })).rejects.toBeInstanceOf(
      StudentRaDoesNotExistsError
    );
  });
});
