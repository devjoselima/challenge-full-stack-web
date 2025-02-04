import { FastifyInstance } from "fastify";
import { createStudentController } from "./controllers/";

export async function appRoutes(app: FastifyInstance) {
  app.post("/students", createStudentController);
}
