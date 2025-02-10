import { InvalidCredentialsError } from "@/errors";
import { AuthenticateUseCase } from "@/use-cases/user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class AuthenticateController {
  constructor(private authenticateUseCase: AuthenticateUseCase) {}

  async execute(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6, 'Password must have at least 6 characters'),
    })

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
      const { user } = await this.authenticateUseCase.execute({ email, password });

      const token = await reply.jwtSign({}, { sign: { sub: user.id, } })

      reply.status(200).send({ token })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: error.message })
      }
      reply.status(500).send()
    }
  }
}