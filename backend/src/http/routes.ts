import { FastifyInstance } from "fastify";
import {
  createStudentController,
  GetAllStudentsController,
} from "./controllers/";

export async function appRoutes(app: FastifyInstance) {
  app.get("/students", GetAllStudentsController);
  app.post("/students", createStudentController);
}
