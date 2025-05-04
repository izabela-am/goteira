import {
  pgTable,
  varchar,
  uuid,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

const usersTable = pgTable("users", {
  id: uuid().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  password_hash: varchar().notNull(),
  is_active: boolean().notNull().default(true),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow(),
});

export { usersTable };
