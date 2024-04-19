import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listRouter from "./routes/list.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();

app.use(cookieParser());
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());


app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/list", listRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
