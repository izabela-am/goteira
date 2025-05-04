import type { FastifyInstance } from "fastify";
import { fooSchema } from "./schemas/foo";

export async function routes(app: FastifyInstance) {
  app.get("/", fooSchema, async (request, response) => {
    return response.status(201).send({ message: "heyaa" });
  });
}
