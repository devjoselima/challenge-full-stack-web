export class StudentRaDoesNotExistsError extends Error {
  constructor() {
    super("RA not found.");
  }
}
