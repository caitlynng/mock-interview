import express from "express";
import "dotenv/config";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import authenticateUser from "./middleware/auth.js";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

//only when ready to deploy
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json({ limit: "16mb" }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authenticateUser, userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
