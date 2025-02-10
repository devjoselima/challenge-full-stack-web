import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import {
  StudentRaAlreadyExistsError,
  StudentEmailAlreadyExistsError,
  StudentCpfAlreadyExistsError,
} from "@/errors";
import { CreateStudentUseCase } from "@/use-cases/student";

export class CreateStudentController {
  constructor(private createStudentUseCase: CreateStudentUseCase) {}

  async execute(request: FastifyRequest, reply: FastifyReply) {
    const createStudentBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      cpf: z.string(),
      ra: z.string(),
    });
    const { name, email, cpf, ra } = createStudentBodySchema.parse(request.body);

    try {
      await this.createStudentUseCase.execute({ name, email, cpf, ra });
      return reply.code(201).send();
    } catch (error) {
      if (
        error instanceof StudentEmailAlreadyExistsError ||
        error instanceof StudentRaAlreadyExistsError ||
        error instanceof StudentCpfAlreadyExistsError
      ) {
        return reply.status(409).send({ message: error.message });
      }
      return reply.status(500).send();
    }
  }
}
