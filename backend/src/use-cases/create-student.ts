import {
  StudentEmailAlreadyExistsError,
  StudentRaAlreadyExistsError,
} from "@/errors";
import { StudentRepository } from "@/repository/student-repository";

interface CreateStudentUseCaseRequest {
  name: string;
  email: string;
  cpf: string;
  ra: string;
}

export class CreateStudentUseCase {
  constructor(private studentsRepository: StudentRepository) {}

  async execute({ name, email, cpf, ra }: CreateStudentUseCaseRequest) {
    const studentWithSameEmail = await this.studentsRepository.findByEmail(
      email
    );

    if (studentWithSameEmail) {
      throw new StudentEmailAlreadyExistsError();
    }

    const studentWithSameRa = await this.studentsRepository.findByRa(ra);

    if (studentWithSameRa) {
      throw new StudentRaAlreadyExistsError();
    }

    await this.studentsRepository.create({
      name,
      email,
      cpf,
      ra,
    });
  }
}
