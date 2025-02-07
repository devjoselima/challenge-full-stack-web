import { Prisma, User } from "@prisma/client";
import { IUserRepository } from "../user-repository";
import { randomUUID } from "crypto";

export class InMemoryUserRepository implements IUserRepository {
  public users: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
    };
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find((item) => item.email === email);

    if (!user) {
      return null;
    }
    return user;
  }
}
