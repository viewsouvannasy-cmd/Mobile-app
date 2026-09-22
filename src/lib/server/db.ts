import { neon } from "@neondatabase/serverless";

const neonUrl = process.env.NEON_URL;

if (!neonUrl) {
  throw new Error("NEON_URL is not set");
}

const sql = neon(neonUrl);

export default sql;
