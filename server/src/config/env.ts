import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,

  BREVO_API_KEY: process.env.BREVO_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,

  FRONTEND_URL: process.env.FRONTEND_URL,
  JWT_SECRET: process.env.JWT_SECRET,

  NODE_ENV: process.env.NODE_ENV,
};

