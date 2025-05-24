import { createUserSchema, loginSchema } from "./schemas/users";
import { FastifyTypedInstance } from "./types";

import { CreateUserService } from "../services/CreateUserService";
import { AppLogger } from "../providers/logger/winston";
import { PostgresProvider } from "../providers/database/PostgreSQL/PostgresProvider";
import { AuthenticateService } from "../services/AuthenticateService";

const createUser = new CreateUserService(
  new AppLogger(),
  new PostgresProvider(),
);

const authenticate = new AuthenticateService(
  new AppLogger(),
  new PostgresProvider(),
);

async function routes(app: FastifyTypedInstance) {
  app.post("/user/create", createUserSchema, async (request, reply) => {
    const { email, password } = request.body;

    const userId = await createUser.run({ email, password });

    return reply.send({ userId });
  });

  app.post("/user/login", loginSchema, async (request, reply) => {
    const { email, password } = request.body;

    const user = await authenticate.run({ email, password });

    const token = await reply.jwtSign(
      { role: user.role },
      {
        sign: { sub: user.id },
      },
    );

    const refreshToken = await reply.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
          expiresIn: "1d",
        },
      },
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  });
}

export { routes };
