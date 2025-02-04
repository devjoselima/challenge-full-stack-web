export class StudentRaAlreadyExistsError extends Error {
  constructor() {
    super("RA already exists.");
  }
}
