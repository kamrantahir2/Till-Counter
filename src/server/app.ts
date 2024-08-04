import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const url = process.env.MONGODB_URI;

if (typeof url === "string") {
  mongoose
    .connect(url)
    .then((_result) => {
      console.log("connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB: ", error.message);
    });
}

export default app;
