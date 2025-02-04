import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { StudentEmailAlreadyExistsError } from "@/errors/student-email-already-exists";
import { StudentRaAlreadyExistsError } from "@/errors";
import { makeCreateStudentUseCase } from "@/use-cases/factories";

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
    const createStudentUseCase = makeCreateStudentUseCase();

    await createStudentUseCase.execute({ name, email, cpf, ra });
  } catch (error) {
    if (
      error instanceof StudentEmailAlreadyExistsError ||
      error instanceof StudentRaAlreadyExistsError
    ) {
      return reply.status(409).send({ message: error.message });
    }
    return reply.status(500).send();
  }

  return reply.code(201).send();
};
