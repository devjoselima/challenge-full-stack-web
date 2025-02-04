import { FastifyReply, FastifyRequest } from "fastify";

import { makeGetAllStudentsUseCase } from "@/use-cases/factories";

export const GetAllStudentsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const getAllStudentsUseCase = makeGetAllStudentsUseCase();

  const students = await getAllStudentsUseCase.execute();

  return reply.code(200).send({ students });
};
