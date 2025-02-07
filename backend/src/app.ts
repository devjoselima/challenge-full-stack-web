import fastify from "fastify";
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { authMiddleware } from "./middleware/auth";

export const app = fastify();

app.register(cors, {
  origin: env.CORS_ORIGIN,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.addHook("onRequest", async (request, reply) => {
  await authMiddleware(request, reply);
})

app.register(appRoutes);
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: error.errors[0].message, issues: error.format() });
  }
})
