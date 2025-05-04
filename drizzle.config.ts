import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { join } from "path";

export default defineConfig({
  out: "./drizzle",
  schema: join("src", "providers", "database", "schemas"),
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.PSQL_URL!,
  },
});
