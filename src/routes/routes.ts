import { fooSchema } from "./schemas/foo";
import { FastifyTypedInstance } from "./types";

export async function routes(app: FastifyTypedInstance) {
  app.get("/", fooSchema, async (request, response) => {
    return response.status(201).send({ message: "heyaa" });
  });
}
