import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const { PSQL_URL } = process.env;

if (!PSQL_URL) {
  throw new Error("Missing environment variable: PSQL_URL");
}

const database = drizzle({
  connection: {
    connectionString: PSQL_URL,
  },
});

export { database };
