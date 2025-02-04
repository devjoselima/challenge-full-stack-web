import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeDeleteStudentUseCase } from "@/use-cases/factories";
import { StudentNotFoundError } from "@/errors";

export const DeleteStudentController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const deleteStudentParamsSchema = z.object({
    ra: z.string(),
  });

  const { ra } = deleteStudentParamsSchema.parse(request.params);

  if (!ra) {
    return reply.code(400).send("Missing RA");
  }

  try {
    const deleteStudentUseCase = makeDeleteStudentUseCase();
    const { ra: deletedRa } = await deleteStudentUseCase.execute({ ra });

    return reply.code(200).send({ deletedRa: deletedRa });
  } catch (error) {
    if (error instanceof StudentNotFoundError) {
      return reply.code(400).send({ message: error.message });
    }
  }
};
