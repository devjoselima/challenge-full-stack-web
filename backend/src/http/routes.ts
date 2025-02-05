import { FastifyInstance } from "fastify";
import {
  CreateStudentController,
  DeleteStudentController,
  PaginateStudentsController,
  UpdateStudentController
} from "./controllers/";

export async function appRoutes(app: FastifyInstance) {
  app.get("/students", PaginateStudentsController);
  app.post("/students", CreateStudentController);
  app.patch("/students/:ra", UpdateStudentController);
  app.delete("/students/:ra", DeleteStudentController);
}
