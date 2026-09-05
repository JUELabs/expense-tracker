import { Pool } from "pg";
import { env } from "./env";

export const pool = new Pool({
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  database: env.DB_NAME,
  user: env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export const connectDB = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("PostgreSQL connected successfully");
  } catch (error) {
    console.error("PostgreSQL connection failed:", error);
    process.exit(1);
  }
};
