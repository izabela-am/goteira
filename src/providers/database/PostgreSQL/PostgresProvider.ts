import { eq } from "drizzle-orm";

import { database } from "./connect";
import { users } from "./schemas/index";
import {
  ICreateUser,
  IFindByEmail,
  IPostgresProvider,
  ReturnID,
} from "./interfaces/interfaces";

class PostgresProvider implements IPostgresProvider {
  async createUser(userData: ICreateUser): Promise<ReturnID> {
    const userId = await database
      .insert(users)
      .values(userData)
      .returning({ id: users.id });

    return userId;
  }

  async findByEmail(email: string): Promise<IFindByEmail | undefined> {
    const user = await database.query.users.findFirst({
      where: eq(users.email, email),
      columns: { id: true, password_hash: true, role: true },
    });

    return user;
  }
}

export { PostgresProvider };
