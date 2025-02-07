import { prisma } from "@/lib/prisma";
import { IUserRepository } from "./user-repository";
import { Prisma } from "@prisma/client";

export class PrismaUserRepository implements IUserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}