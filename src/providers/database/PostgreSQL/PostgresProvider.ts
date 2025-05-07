import { eq } from "drizzle-orm";

import { database } from "./connect";
import { users } from "./schemas/user";
import { ICreateUser, IPostgresProvider, ReturnID } from "./interfaces/interfaces";

class PostgresProvider implements IPostgresProvider {
  async createUser(userData: ICreateUser): Promise<ReturnID> {
    const userId = await database
      .insert(users)
      .values(userData)
      .returning({ id: users.id });

    return userId;
  }

  async findByEmail(email: string): Promise<ReturnID> {
    const userId = await database
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email));

    return userId;
  }
}

export { PostgresProvider };
