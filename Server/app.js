import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { config } from "dotenv";
config();
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import courseRoutes from "./routes/course.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173" , // Check if the environment variable is set correctly
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:5173");
  next();
});

app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);

app.use("/ping", (req, res) => {
  res.send("pong");
});

app.use("*", (req, res) => {
  res.status(404).send("Oops! Page not found");
});

app.use(errorMiddleware);

export default app;
