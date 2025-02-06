import { InMemoryStudentRepository } from "@/repository/in-memory/in-memory-student-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { PaginateStudentsUseCase } from "./paginate-students";

let studentRepository: InMemoryStudentRepository;
let sut: PaginateStudentsUseCase;

describe("Paginate Students Use Case", () => {
  beforeEach(() => {
    studentRepository = new InMemoryStudentRepository();
    sut = new PaginateStudentsUseCase(studentRepository);

    studentRepository.create({
      ra: "123456",
      name: "John Doe",
      email: "johndoe@example.com",
      cpf: "12345678900",
    });

    studentRepository.create({
      ra: "654321",
      name: "Jane Doe",
      email: "janedoe@example.com",
      cpf: "98765432100",
    });
  });

  it("should paginate students correctly", async () => {
    const page = 1;
    const itemsPerPage = 1;

    const { students, total } = await sut.execute(page, itemsPerPage);

    expect(students).toHaveLength(1);
    expect(students[0].ra).toBe("123456");
    expect(total).toBe(2);
  });

  it("should paginate students on the second page", async () => {
    const page = 2;
    const itemsPerPage = 1;

    const { students, total } = await sut.execute(page, itemsPerPage);

    expect(students).toHaveLength(1);
    expect(students[0].ra).toBe("654321");
    expect(total).toBe(2);
  });

  it("should return an empty array if page exceeds total pages", async () => {
    const page = 2;
    const itemsPerPage = 2;

    const { students, total } = await sut.execute(page, itemsPerPage);

    expect(students).toHaveLength(0);
    expect(total).toBe(2);
  });

  it("should return all students if page and itemsPerPage are set to cover all data", async () => {
    const page = 1;
    const itemsPerPage = 10;

    const { students, total } = await sut.execute(page, itemsPerPage);

    expect(students).toHaveLength(2);
    expect(total).toBe(2);
  });

  it("should filter students by RA", async () => { 
    const page = 1
    const itemsPerPage = 10
    const raFilter = "123"

    const { students, total } = await sut.execute(page, itemsPerPage, raFilter)

    expect(students).toHaveLength(1)
    expect(total).toBe(1)
  });

  it("should return 0 students if RA filter does not match any student", async () => {
    const page = 1
    const itemsPerPage = 10
    const raFilter = "999"

    const { students, total } = await sut.execute(page, itemsPerPage, raFilter)

    expect(students).toHaveLength(0)
    expect(total).toBe(0)
  })
});
