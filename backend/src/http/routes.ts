import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  PaginateStudentsController
} from "./controllers/";
import { makeCreateUserController, makeAuthenticateController } from "@/factories/user";
import { makeCreateStudentController, makeDeleteStudentController, makeUpdateStudentController } from "@/factories/student";

export async function appRoutes(app: FastifyInstance) {
  app.get("/students", PaginateStudentsController);
  app.post("/students", (request: FastifyRequest, reply: FastifyReply) => {
    return makeCreateStudentController().execute(request, reply);
  });
  app.patch("/students/:ra", (request: FastifyRequest, reply: FastifyReply) => {
    return makeUpdateStudentController().execute(request, reply);
  });
  app.delete("/students/:ra", (request: FastifyRequest, reply: FastifyReply) => {
    return makeDeleteStudentController().execute(request, reply)
  });

  app.post("/register", (request: FastifyRequest, reply: FastifyReply) => {
    return makeCreateUserController().execute(request, reply);
  })
  app.post("/authenticate", (request: FastifyRequest, reply: FastifyReply) => {
    return makeAuthenticateController().execute(request, reply);
  })
}
