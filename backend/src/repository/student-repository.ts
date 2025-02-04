import { Prisma, Student } from "@prisma/client";

export interface IStudentRepository {
  getAll(): Promise<Student[]>;
  create(data: Prisma.StudentCreateInput): Promise<Student>;
  findByEmail(email: string): Promise<Student | null>;
  findByRa(ra: string): Promise<Student | null>;
  findByCpf(cpf: string): Promise<Student | null>;
}
