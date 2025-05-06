import { eq } from "drizzle-orm";

import { database } from "./connect";
import { users } from "./schemas/user";
import { ICreateUser, IPostgresProvider } from "./interfaces/interfaces";

class PostgresProvider implements IPostgresProvider {
  async createUser(userData: ICreateUser): Promise<string> {
    const userId = await database
      .insert(users)
      .values(userData)
      .returning({ id: users.id });

    return userId[0].id;
  }

  async findByEmail(email: string): Promise<string> {
    const userId = await database
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email));

    return userId[0].id;
  }
}

export { PostgresProvider };
