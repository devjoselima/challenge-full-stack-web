import { InMemoryStudentRepository } from "@/repository/in-memory/in-memory-student-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteStudentUseCase } from "@/use-cases/student";
import { StudentNotFoundError } from "@/errors";

let studentRepository: InMemoryStudentRepository;
let sut: DeleteStudentUseCase;

describe("Delete Student Use Case", () => {
  beforeEach(() => {
    studentRepository = new InMemoryStudentRepository();
    sut = new DeleteStudentUseCase(studentRepository);
  });

  it("should delete a student", async () => {
    await studentRepository.create({
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

  it("should throw StudentNotFoundError if RA does not exists", async () => {
    await expect(() => sut.execute({ ra: "54321" })).rejects.toBeInstanceOf(
      StudentNotFoundError
    );
  });
});
