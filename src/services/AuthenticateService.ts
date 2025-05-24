import argon2 from "argon2";

import { IFindByEmail, IPostgresProvider } from "../providers/database/PostgreSQL/interfaces/interfaces";
import { IAppLogger } from "../providers/logger/interfaces";

interface ILogin {
  email: string;
  password: string;
}

class AuthenticateService {
  private logger: IAppLogger;
  private postgresProvider: IPostgresProvider;

  constructor(logger: IAppLogger, postgresProvider: IPostgresProvider) {
    this.logger = logger;
    this.postgresProvider = postgresProvider;
  }

  async run({ email, password }: ILogin): Promise<IFindByEmail> {
    const user = await this.postgresProvider.findByEmail(email);

    if (!user) {
      throw new Error("blablabla");
    }

    const doPasswordsMatch = await argon2.verify(user.password_hash, password);

    if (!doPasswordsMatch) {
      throw new Error("bblababal");
    }

    return user;
  }
}

export { AuthenticateService };
