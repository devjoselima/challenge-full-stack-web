import { InvalidCredentialsError } from "@/errors";
import { makeAuthenticateUseCase } from "@/use-cases/factories";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const AuthenticateController = async (request: FastifyRequest, reply: FastifyReply) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must have at least 6 characters'),
  })

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    const { user } = await authenticateUseCase.execute({ email, password });

    const token = await reply.jwtSign({}, { sign: { sub: user.id, } })

    reply.status(200).send({ name: user.name, token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }
    reply.status(500).send()
  }
}