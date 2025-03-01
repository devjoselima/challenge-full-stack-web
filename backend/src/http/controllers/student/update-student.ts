import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { StudentEmailAlreadyExistsError, StudentNotFoundError } from "@/errors";
import { UpdateStudentUseCase } from "@/use-cases/student";

export class UpdateStudentController {
  constructor(private updateStudentUseCase: UpdateStudentUseCase) {}

  async execute(request:FastifyRequest ,reply: FastifyReply) {
    const updateStudentParamsSchema = z.object({
      ra: z.string(),
    });

    const updateStudentBodySchema = z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
    })
    .strict();

    const { ra } = updateStudentParamsSchema.parse(request.params);
    const { name, email } = updateStudentBodySchema.parse(request.body);

    try {
      const updatedStudent = await this.updateStudentUseCase.execute({ ra, name, email });

      return reply.status(200).send(updatedStudent);
    } catch (error) {
      if (error instanceof StudentNotFoundError) {
        return reply.status(404).send({ message: error.message });
      }

      if (error instanceof StudentEmailAlreadyExistsError) {
        return reply.status(409).send({ message: error.message });
      }

      return reply.status(500).send();
    }
  }
}