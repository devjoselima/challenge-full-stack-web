import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { createStudentUseCase } from "@/use-cases/create-student";

export const createStudentController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const createStudentBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cpf: z.string(),
    ra: z.string(),
  });

  const { name, email, cpf, ra } = createStudentBodySchema.parse(request.body);

  try {
    await createStudentUseCase({ name, email, cpf, ra });
  } catch {
    return reply.status(400).send();
  }

  return reply.code(201).send();
};
