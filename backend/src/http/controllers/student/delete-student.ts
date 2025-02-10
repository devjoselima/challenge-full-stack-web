import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { StudentNotFoundError } from "@/errors";
import { DeleteStudentUseCase } from "@/use-cases";

export class DeleteStudentController {
  constructor(private deleteStudentUseCase: DeleteStudentUseCase) {}
  
  async execute(request: FastifyRequest, reply: FastifyReply) {
    const deleteStudentParamsSchema = z.object({
      ra: z.string(),
    });

    const { ra } = deleteStudentParamsSchema.parse(request.params);

    if (!ra) {
      return reply.code(400).send("Missing RA");
    }

    try {
      const result = await this.deleteStudentUseCase.execute({ ra });

      const { ra: deletedRa } = result;

      return reply.code(200).send({ deletedRa });
    } catch (error) {
      if (error instanceof StudentNotFoundError) {
        return reply.code(404).send({ message: error.message });
      }

      return reply.code(500).send();
    }
  }
}