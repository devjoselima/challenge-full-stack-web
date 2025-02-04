export class StudentEmailAlreadyExistsError extends Error {
  constructor() {
    super("E-mail already exists.");
  }
}
