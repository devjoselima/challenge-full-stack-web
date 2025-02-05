import { InMemoryStudentRepository } from "@/repository/in-memory/in-memory-student-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdateStudentUseCase } from "./update-student";
import { StudentNotFoundError, StudentEmailAlreadyExistsError } from "@/errors";

let studentRepository: InMemoryStudentRepository;
let sut: UpdateStudentUseCase;

const originalStudentName = 'John Doe';
const originalStudentEmail = "johndoe@example.com"

describe("Update Student Use Case", () => {
  beforeEach(async () => {
    studentRepository = new InMemoryStudentRepository();
    sut = new UpdateStudentUseCase(studentRepository);
    await studentRepository.create({
      ra: "123456",
      name: originalStudentName,
      email: originalStudentEmail,
      cpf: "12345678900",
    });
  });

  it("should update only a student's name", async () => {
    const { student } = await sut.execute({
      ra: "123456",
      name: "John Updated",
    });

    expect(student?.name).toBe("John Updated");
    expect(student?.email).toBe(originalStudentEmail);
  });

  it("should update only a student's email", async () => {
    const { student } = await sut.execute({
      ra: "123456",
      email: "johndoe@updated.com",
    });

    expect(student?.name).toBe(originalStudentName); 
    expect(student?.email).toBe("johndoe@updated.com");
  });

  it("should not update a non-existing student", async () => {
    await expect(() =>
      sut.execute({
        ra: "999999",
        name: "Non-existent Student",
      })
    ).rejects.toBeInstanceOf(StudentNotFoundError);
  });

  it("should not update a student's email to an already existing one", async () => { 
    await studentRepository.create({
      ra: "1234",
      name: "Jane Doe",
      email: "johndoe2@example.com",
      cpf: "98765432100",
    });

    await expect(() =>
      sut.execute({
        ra: "1234",
        email: originalStudentEmail,
      })
    ).rejects.toBeInstanceOf(StudentEmailAlreadyExistsError);
  })

});
