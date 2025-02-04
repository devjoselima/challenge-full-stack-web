import { IStudentRepository } from "@/repository/student-repository";

export class GetAllStudentsUseCase {
  constructor(private studentsRepository: IStudentRepository) {}

  async execute() {
    const students = await this.studentsRepository.getAll();

    return students;
  }
}
