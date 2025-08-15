import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import { usersTable } from "./schema";

config({ path: ".env.local" });

export const db = drizzle(`${process.env.DATABASE_URL}`);