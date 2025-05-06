import { createUserSchema } from "./schemas/users";
import { FastifyTypedInstance } from "./types";

import { CreateUserService } from "../services/CreateUserService";
import { AppLogger } from "../providers/logger/winston";
import { PostgresProvider } from "../providers/database/PostgreSQL/PostgresProvider";

const createUser = new CreateUserService(
  new AppLogger(),
  new PostgresProvider()
);

async function routes(app: FastifyTypedInstance) {
  app.post("/user/create", createUserSchema, async (request, reply) => {
    const { email, password } = request.body;
    
    const userId = await createUser.run({ email, password });

    return reply.send({ userId })
  });
}

export { routes };
