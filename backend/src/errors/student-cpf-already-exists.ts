export class StudentCpfAlreadyExistsError extends Error {
  constructor() {
    super("CPF already exists.");
  }
}
