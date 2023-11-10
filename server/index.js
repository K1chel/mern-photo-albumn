import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";

dotenv.config();
const app = express();
connectDB();

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Routes

// Port
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`.cyan.underline.bold)
);
