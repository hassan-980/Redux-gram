import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./server/config/mongodb.js";
import authRouter from "./server/routes/authRoutes.js";
import userRouter from "./server/routes/userRoutes.js";
import postRoutes from "./server/routes/postRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000;
connectDB();

const allowedOrigins = ["http://localhost:5173","https://reduxgram.vercel.app"];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser({ Credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API ENDPOINTS
app.get("/", (req, res) => {
  res.send("Welcome to the Reduxgram!!");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

