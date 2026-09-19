import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const neonUrl = process.env.NODE_ENV;

if (!neonUrl) {
  throw new Error("NEON_URL is not set");
}

const sql = neon(neonUrl);

export const db = drizzle({ client: sql, schema });
