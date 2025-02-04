import { FastifyInstance } from "fastify";
import {
  CreateStudentController,
  DeleteStudentController,
  GetAllStudentsController,
} from "./controllers/";

export async function appRoutes(app: FastifyInstance) {
  app.get("/students", GetAllStudentsController);
  app.post("/students", CreateStudentController);
  app.delete("/students/:ra", DeleteStudentController);
}
