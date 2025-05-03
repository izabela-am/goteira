import type { FastifyInstance } from "fastify";
import z from "zod";

export async function routes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: {
        response: {
          200: { message: z.string() },
        },
      },
    },
    () => {
      return { message: "Heya" };
    },
  );
}
