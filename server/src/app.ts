import { env } from "./config/env";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import expenseRoutes from "./routes/expense.routes";
import { errorHandler } from "./middlewares/error.middleware";
const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/auth", userRoutes);
app.use("/expenses", expenseRoutes);

app.use(errorHandler);
export default app;