import { Prisma, Student } from "@prisma/client";
import { IStudentRepository } from "../student-repository";

export class InMemoryStudentRepository implements IStudentRepository {
  public students: Student[] = [];

  async getAll() {
    return this.students;
  }

  async create(data: Prisma.StudentCreateInput) {
    const student = {
      ra: data.ra,
      name: data.name,
      email: data.email,
      cpf: data.cpf,
    };
    this.students.push(student);
    return student;
  }

  async delete(ra: string) {
    const deletedStudent = this.students.find((student) => student.ra === ra);
    if (!deletedStudent) {
      return null;
    }

    return deletedStudent;
  }

  async update(ra: string, data: { name?: string; email?: string }) {
    const student = await this.findByRa(ra);
    if (!student) {
      return null;
    }
    if (data.name) student.name = data.name;
    if (data.email) student.email = data.email;

    return student;
  }

  async findByEmail(email: string) {
    const student = this.students.find((item) => item.email === email);
    if (!student) {
      return null;
    }
    return student;
  }

  async findByRa(ra: string) {
    const student = this.students.find((item) => item.ra === ra);

    if (!student) {
      return null;
    }
    return student;
  }

  async findByCpf(cpf: string) {
    const student = this.students.find((item) => item.cpf === cpf);

    if (!student) {
      return null;
    }
    return student;
  }
}
