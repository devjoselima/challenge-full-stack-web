import { Prisma, Student } from "@prisma/client";

export interface IStudentRepository {
  paginate(page: number, itemsPerPage: number, ra: string | undefined): Promise<Student[]>;
  count():Promise<number>;
  create(data: Prisma.StudentCreateInput): Promise<Student>;
  delete(ra: string): Promise<Student | null>;
  update(ra:string, updateDataParams: Prisma.StudentUpdateInput): Promise<Student | null>;
  findByEmail(email: string): Promise<Student | null>;
  findByRa(ra: string): Promise<Student | null>;
  findByCpf(cpf: string): Promise<Student | null>;
}
