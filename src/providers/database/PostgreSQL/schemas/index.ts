import { pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar({ length: 255 }).notNull().unique(),
  password_hash: varchar().notNull(),
  role: varchar()
    .notNull()
    .$defaultFn(() => {
      return "user";
    }),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow(),
});

