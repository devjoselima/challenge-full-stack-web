import { StudentNotFoundError } from "@/errors";
import { IStudentRepository } from "@/repository/student-repository";

interface DeleteStudentUseCaseParams {
  ra: string;
}

export class DeleteStudentUseCase {
  constructor(private studentsRepository: IStudentRepository) {}

  async execute({ ra }: DeleteStudentUseCaseParams) {
    const existsRa = await this.studentsRepository.findByRa(ra);
    if (!existsRa) {
      throw new StudentNotFoundError();
    }

    const student = await this.studentsRepository.delete(ra);

    return student;
  }
}
