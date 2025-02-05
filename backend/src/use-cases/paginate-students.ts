import { IStudentRepository } from "@/repository/student-repository";

export class PaginateStudentsUseCase {
  constructor(private studentsRepository: IStudentRepository) {}

  async execute(page: number, itemsPerPage: number) {
    const students = await this.studentsRepository.paginate(page, itemsPerPage);
    const total = await this.studentsRepository.count();

    return {students, total};
  }
}
