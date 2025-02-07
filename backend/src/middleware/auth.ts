import { FastifyRequest, FastifyReply } from "fastify";

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    if (request.url === "/register" || request.url === "/authenticate") {
      return
    }
    await request.jwtVerify()
  } catch (error) {
    return reply.status(401).send({ message: "Unauthorized" })
  }
};
