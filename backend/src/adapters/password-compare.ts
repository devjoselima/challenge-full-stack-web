import { compare } from "bcryptjs";

export class PasswordCompareAdapter {
  execute(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }
}