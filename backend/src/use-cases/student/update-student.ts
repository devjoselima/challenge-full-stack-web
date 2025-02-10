import { StudentNotFoundError, StudentEmailAlreadyExistsError } from "@/errors";
import { IStudentRepository } from "@/repositories/student-repository";

interface UpdateStudentUseCaseRequest {
  ra: string;
  name?: string;
  email?: string;
}

export class UpdateStudentUseCase {
  constructor(private studentsRepository: IStudentRepository) {}

  async execute({ ra, name, email }: UpdateStudentUseCaseRequest) {
    const student = await this.studentsRepository.findByRa(ra);

    if (!student) {
      throw new StudentNotFoundError();
    }

    if (email) {
      const studentWithSameEmail = await this.studentsRepository.findByEmail(email);
      if (studentWithSameEmail && studentWithSameEmail.ra !== ra) {
        throw new StudentEmailAlreadyExistsError();
      }
    }

    const updatedStudent = await this.studentsRepository.update(ra, {
      name: name ?? student.name,
      email: email ?? student.email,
    });

    return { student: updatedStudent };
  }
}
