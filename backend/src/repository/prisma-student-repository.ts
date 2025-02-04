import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { IStudentRepository } from "./student-repository";

export class PrismaStudentsRepository implements IStudentRepository {
  async create(data: Prisma.StudentCreateInput) {
    const student = await prisma.student.create({
      data,
    });
    return student;
  }

  async getAll() {
    const students = await prisma.student.findMany();
    return students;
  }

  async delete(ra: string) {
    return await prisma.student.delete({
      where: {
        ra,
      },
    });
  }

  async findByEmail(email: string) {
    const student = await prisma.student.findUnique({
      where: {
        email,
      },
    });
    return student;
  }

  async findByRa(ra: string) {
    const student = await prisma.student.findUnique({
      where: {
        ra,
      },
    });
    return student;
  }

  async findByCpf(cpf: string) {
    const student = await prisma.student.findUnique({
      where: {
        cpf,
      },
    });
    return student;
  }
}
