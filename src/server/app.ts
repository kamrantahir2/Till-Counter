import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRouter from "./routes/users";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

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

app.use("/api/users", usersRouter);
export default app;
