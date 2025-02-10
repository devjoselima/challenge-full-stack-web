import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  CreateStudentController,
  CreateUserController,
  DeleteStudentController,
  PaginateStudentsController,
  UpdateStudentController,
  AuthenticateController
} from "./controllers/";
import { makeCreateUserController } from "@/factories/users";

export async function appRoutes(app: FastifyInstance) {
  app.get("/students", PaginateStudentsController);
  app.post("/students", CreateStudentController);
  app.patch("/students/:ra", UpdateStudentController);
  app.delete("/students/:ra", DeleteStudentController);

  app.post("/register", (request: FastifyRequest, reply: FastifyReply) => {
    return makeCreateUserController().execute(request, reply);
  })
  app.post("/authenticate", AuthenticateController)
}
