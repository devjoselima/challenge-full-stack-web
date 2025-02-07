import { FastifyInstance } from "fastify";
import {
  CreateStudentController,
  CreateUserController,
  DeleteStudentController,
  PaginateStudentsController,
  UpdateStudentController,
  AuthenticateController
} from "./controllers/";

export async function appRoutes(app: FastifyInstance) {
  app.get("/students", PaginateStudentsController);
  app.post("/students", CreateStudentController);
  app.patch("/students/:ra", UpdateStudentController);
  app.delete("/students/:ra", DeleteStudentController);

  app.post("/register", CreateUserController)
  app.post("/authenticate", AuthenticateController)
}
