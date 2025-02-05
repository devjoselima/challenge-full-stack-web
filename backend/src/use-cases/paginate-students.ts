import { IStudentRepository } from "@/repository/student-repository";

export class PaginateStudentsUseCase {
  constructor(private studentsRepository: IStudentRepository) {}

  async execute(page: string, itemsPerPage: string) {
    const students = await this.studentsRepository.paginate(Number(page), Number(itemsPerPage));

    return students;
  }
}
