import { Prisma, Student } from "@prisma/client";

export interface StudentRepository {
  create(data: Prisma.StudentCreateInput): Promise<Student>;
  findByEmail(email: string): Promise<Student | null>;
  findByRa(ra: string): Promise<Student | null>;
}
