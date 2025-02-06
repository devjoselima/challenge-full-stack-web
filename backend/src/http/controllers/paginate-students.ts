import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makePaginateStudentsUseCase } from "@/use-cases/factories";

export const PaginateStudentsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const paginateStudentsParamsSchema = z.object({
    page: z.string().transform((val) => Number(val)),
    itemsPerPage: z.string().transform((val) => Number(val)),
    ra: z.string().optional(),
  })
  const { page, itemsPerPage, ra } = paginateStudentsParamsSchema.parse(request.query);

  if(!page || !itemsPerPage) {
    return reply.code(400).send("Missing page or itemsPerPage param");
  }

  try {
    const paginateStudentsUseCase = makePaginateStudentsUseCase();
    const { students, total } = await paginateStudentsUseCase.execute(page, itemsPerPage, ra);

    return reply.code(200).send({ students, page, itemsPerPage, total });
    
  } catch (error) {
    return reply.code(500).send();
  }
};
