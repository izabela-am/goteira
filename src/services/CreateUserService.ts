import argon2 from "argon2";

import { IAppLogger } from "../providers/logger/interfaces";
import { IPostgresProvider } from "../providers/database/PostgreSQL/interfaces/interfaces";

interface ICreateUser {
  email: string;
  password: string;
}

class CreateUserService {
  private logger: IAppLogger;
  private postgresProvider: IPostgresProvider;

  constructor(logger: IAppLogger, postgresProvider: IPostgresProvider) {
    this.logger = logger;
    this.postgresProvider = postgresProvider;
  }

  async run({ email, password }: ICreateUser): Promise<string> {
    const user = await this.postgresProvider.findByEmail(email);

    if (user) {
      this.logger.log({
        level: "error",
        message: `[${Date.now()}] User Registration Failure :: Email ${email} already in use`,
      });

      throw new Error("Email is already being used");
    }

    const password_hash = await argon2.hash(password);

    const userId = await this.postgresProvider.createUser({
      email,
      password_hash,
    });

    this.logger.log({
      level: "info",
      message: `[${Date.now()}] User <${userId[0].id}> created successfully`,
    });

    return userId[0].id;
  }
}

export { CreateUserService };
