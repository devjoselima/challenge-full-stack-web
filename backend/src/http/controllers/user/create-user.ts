import { UserAlreadyExistsError } from "@/errors/user-already-exists";
import { CreateUserUseCase } from "@/use-cases/user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async execute(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
      name: z.string({ required_error: "Name is required" }),
      email: z.string({ required_error: "E-mail is required" }).email(),
      password: z.string({ required_error: "Password is required" }).min(6, "Password must have at least 6 characters"),
    })

    const { name, email, password } = createUserBodySchema.parse(request.body)

    try {
      await this.createUserUseCase.execute({ name, email, password })
      return reply.code(201).send()
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: error.message })
      }
      return reply.status(500).send()     
    }
  }
}
  