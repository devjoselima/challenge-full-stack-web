import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  DeleteStudentController,
  PaginateStudentsController,
  UpdateStudentController
} from "./controllers/";
import { makeCreateUserController, makeAuthenticateController } from "@/factories/user";
import { makeCreateStudentController } from "@/factories/student";

export async function appRoutes(app: FastifyInstance) {
  app.get("/students", PaginateStudentsController);
  app.post("/students", (request: FastifyRequest, reply: FastifyReply) => {
    return makeCreateStudentController().execute(request, reply);
  });
  app.patch("/students/:ra", UpdateStudentController);
  app.delete("/students/:ra", DeleteStudentController);

  app.post("/register", (request: FastifyRequest, reply: FastifyReply) => {
    return makeCreateUserController().execute(request, reply);
  })
  app.post("/authenticate", (request: FastifyRequest, reply: FastifyReply) => {
    return makeAuthenticateController().execute(request, reply);
  })
}
