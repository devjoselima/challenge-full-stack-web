import { prisma } from "@/lib/prisma";

interface CreateStudentUseCaseRequest {
  name: string;
  email: string;
  cpf: string;
  ra: string;
}

export async function createStudentUseCase({
  name,
  email,
  cpf,
  ra,
}: CreateStudentUseCaseRequest) {
  const studentWithSameEmail = await prisma.student.findUnique({
    where: {
      email,
    },
  });

  const studentWithSameRa = await prisma.student.findUnique({
    where: {
      ra,
    },
  });

  if (studentWithSameEmail) {
    throw new Error("Email already in use");
  }

  if (studentWithSameRa) {
    throw new Error("RA already in use");
  }

  await prisma.student.create({
    data: {
      name,
      email,
      cpf,
      ra,
    },
  });
}
