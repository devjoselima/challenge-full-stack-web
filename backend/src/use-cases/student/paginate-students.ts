import { IStudentRepository } from "@/repositories/student-repository";

export class PaginateStudentsUseCase {
  constructor(private studentsRepository: IStudentRepository) {}

  async execute(page: number, itemsPerPage: number, ra?: string) {
    const students = await this.studentsRepository.paginate(page, itemsPerPage, ra);
    const total = await this.studentsRepository.count(ra);

    return {students, total};
  }
}
