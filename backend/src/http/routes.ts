import { FastifyInstance } from "fastify";
import {
  createStudentController,
  DeleteStudentController,
  GetAllStudentsController,
} from "./controllers/";

export async function appRoutes(app: FastifyInstance) {
  app.get("/students", GetAllStudentsController);
  app.post("/students", createStudentController);
  app.delete("/students/:ra", DeleteStudentController);
}
