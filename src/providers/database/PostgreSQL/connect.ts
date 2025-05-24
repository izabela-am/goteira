import "dotenv/config";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schemas/index";

const { PSQL_URL } = process.env;

if (!PSQL_URL) {
  throw new Error("Missing environment variable: PSQL_URL");
}

const pool = new Pool({
  connectionString: PSQL_URL,
});

const database: NodePgDatabase<typeof schema> = drizzle(pool, { schema });

export { database };
