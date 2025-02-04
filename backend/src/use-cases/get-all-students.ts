import { StudentRepository } from "@/repository/student-repository";

export class GetAllStudentsUseCase {
  constructor(private studentsRepository: StudentRepository) {}

  async execute() {
    const students = await this.studentsRepository.getAll();

    return students;
  }
}
