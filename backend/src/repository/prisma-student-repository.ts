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

  async paginate(page: number, itemsPerPage: number, ra: string) {
    const filters = ra ? { ra: { contains: ra } } : {}
    const students = await prisma.student.findMany({
      where: filters,
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
    });
    return students;
  }

  async count(ra?: string) {
    const filters = ra ? { ra: { contains: ra } } : {};
    const total = await prisma.student.count({
      where: filters,
    });
    return total;
  }

  async delete(ra: string) {
    return await prisma.student.delete({
      where: {
        ra,
      },
    });
  }

  async update(ra: string, data: Prisma.StudentUpdateInput) {
    return await prisma.student.update({
      where: {
        ra,
      },
      data,
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
