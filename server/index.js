import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import { v2 as cloudinary } from "cloudinary";

import userRoutes from "./routes/user.js";
import photoRoutes from "./routes/photos.js";

dotenv.config();
const app = express();
connectDB();

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/photos", photoRoutes);

// Port
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`.cyan.underline.bold)
);
