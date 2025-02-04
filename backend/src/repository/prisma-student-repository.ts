import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { StudentRepository } from "./student-repository";

export class PrismaStudentsRepository implements StudentRepository {
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
}
