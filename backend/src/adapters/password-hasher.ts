import { hash } from "bcryptjs";

export class PasswordHasherAdapter {
  execute(password: string) {
    return hash(password, 10);
  }
}