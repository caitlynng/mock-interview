import express from "express";
import "dotenv/config";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import userRouter from "./routes/userRoutes.js";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

//only when ready to deploy
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json({ limit: "16mb" }));
app.use("/api/v1/user", userRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });
app.get("*", (req, res) => {
  res.send("test");
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
