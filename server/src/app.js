import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import { connectDB } from "./utils/db.js";
import createHttpError from "http-errors";
import morgan from "morgan";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MONGODB Database
(async () => {
  await connectDB();
})();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", async (req, res) => {
  res.json({
    success: true,
    message: "Server is on running...",
  });
});

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

app.use("*", async (req, res, next) => {
  next(createHttpError.NotFound());
});

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
