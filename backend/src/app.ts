import fastify from "fastify";
import cors from '@fastify/cors'

import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
export const app = fastify();

app.register(cors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
})
app.register(appRoutes);
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: error.errors[0].message, issues: error.format() });
  }
})
