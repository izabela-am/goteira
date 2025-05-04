import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const database = drizzle({
  connection: {
    connectionString: process.env.PSQL_URL!,
  },
});

export { database };
